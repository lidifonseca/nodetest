/* eslint complexity: ["error", 300] */
import React from 'react';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Link, RouteComponentProps } from 'react-router-dom';
import {
  Button,
  Col,
  Row,
  Table,
  Label,
  UncontrolledTooltip,
  UncontrolledCollapse,
  CardHeader,
  CardBody,
  UncontrolledAlert
} from 'reactstrap';
import { AvForm, div, AvInput } from 'availity-reactstrap-validation';
import {
  Translate,
  translate,
  ICrudGetAllAction,
  TextFormat,
  getSortState,
  IPaginationBaseState,
  JhiPagination,
  JhiItemCount
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';

import { IRootState } from 'app/shared/reducers';
import { getUsuarioState, IUsuarioBaseState, getEntities } from './usuario.reducer';
import { IUsuario } from 'app/shared/model/usuario.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { getEntities as getUnidadeEasies } from 'app/entities/unidade-easy/unidade-easy.reducer';
import { ITipoUsuario } from 'app/shared/model/tipo-usuario.model';
import { getEntities as getTipoUsuarios } from 'app/entities/tipo-usuario/tipo-usuario.reducer';

export interface IUsuarioProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IUsuarioState extends IUsuarioBaseState, IPaginationBaseState {}

export class Usuario extends React.Component<IUsuarioProps, IUsuarioState> {
  private myFormRef: any;

  constructor(props: IUsuarioProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getUsuarioState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getUnidadeEasies();
    this.props.getTipoUsuarios();
  }

  cancelCourse = () => {
    this.setState(
      {
        idOperadora: '',
        senha: '',
        nome: '',
        email: '',
        telefone: '',
        celular: '',
        cpf: '',
        rg: '',
        sexo: '',
        nascimento: '',
        verAtendimento: '',
        cadAtendimento: '',
        ediAtendimento: '',
        baixaManualAtendimento: '',
        delAtendimento: '',
        relAtendimento: '',
        verPad: '',
        cadPad: '',
        ediPad: '',
        delPad: '',
        relPad: '',
        verDiario: '',
        cadDiario: '',
        ediDiario: '',
        delDiario: '',
        relDiario: '',
        verCategoria: '',
        cadCategoria: '',
        ediCategoria: '',
        delCategoria: '',
        verEspecialidade: '',
        cadEspecialidade: '',
        ediEspecialidade: '',
        delEspecialidade: '',
        relEspecialidade: '',
        verEspecialidadeValor: '',
        cadEspecialidadeValor: '',
        ediEspecialidadeValor: '',
        delEspecialidadeValor: '',
        relEspecialidadeValor: '',
        verOperadora: '',
        cadOperadora: '',
        ediOperadora: '',
        delOperadora: '',
        verPaciente: '',
        cadPaciente: '',
        ediPaciente: '',
        delPaciente: '',
        relPaciente: '',
        verProfissional: '',
        cadProfissional: '',
        ediProfissional: '',
        delProfissional: '',
        ativProfissional: '',
        relProfissional: '',
        verPush: '',
        cadPushPaciente: '',
        cadPushProfissional: '',
        verTermoPaciente: '',
        ediTermoPaciente: '',
        verTermoProfissional: '',
        ediTermoProfissional: '',
        verOutros: '',
        cadOutros: '',
        ediOutros: '',
        delOutros: '',
        relOutros: '',
        verUnidadeEasy: '',
        cadUnidadeEasy: '',
        ediUnidadeEasy: '',
        delUnidadeEasy: '',
        verUsuario: '',
        cadUsuario: '',
        ediUsuario: '',
        delUsuario: '',
        verPtaResultado: '',
        cadPtaResultado: '',
        delPtaResultado: '',
        verPtaAtividade: '',
        cadPtaAtividade: '',
        delPtaAtividade: '',
        permissaoUsuario: '',
        verProntuario: '',
        cadProntuario: '',
        ediProntuario: '',
        delProntuario: '',
        delProntuarioFoto: '',
        valoresFinanceiro: '',
        autorizacaoValorFinanceiro: '',
        confirmarPagamentoFinanceiro: '',
        gerenciarSorteios: '',
        envioRecusa: '',
        envioIntercorrencia: '',
        envioCancelamento: '',
        envioAvaliacao: '',
        envioPedido: '',
        alertaAtendimento: '',
        ativo: '',
        envioGlosado: '',
        emergencia: '',
        token: '',
        editAtendimento: '',
        ouvirLigacao: '',
        verPainelIndicadores: '',
        prorrogarPad: '',
        cancelarAtendMassa: '',
        cadMatMed: '',
        ediMatMed: '',
        delMatMed: '',
        verColPta: '',
        verColFoto: '',
        verColLc: '',
        verAtendCancelado: '',
        verAtendAgConfirmacao: '',
        ediGeoLocalizacaoAtendimento: '',
        copiarEvolucao: '',
        copiarNomeProf: '',
        copiarRegistroProf: '',
        idAreaAtuacao: '',
        diario: '',
        pacienteDiario: '',
        unidade: '',
        tipoUsuario: ''
      },
      () => this.sortEntities()
    );
  };

  filterEntity = (event, errors, values) => {
    this.setState(
      {
        ...this.state,
        ...values
      },
      () => this.sortEntities()
    );
  };

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(this.props.location.pathname + '?' + this.getFiltersURL());
  }

  getFiltersURL = (offset = null) => {
    return (
      'baseFilters=' +
      this.state.baseFilters +
      '&page=' +
      this.state.activePage +
      '&' +
      'size=' +
      this.state.itemsPerPage +
      '&' +
      (offset !== null ? 'offset=' + offset + '&' : '') +
      'sort=' +
      this.state.sort +
      ',' +
      this.state.order +
      '&' +
      'idOperadora=' +
      this.state.idOperadora +
      '&' +
      'senha=' +
      this.state.senha +
      '&' +
      'nome=' +
      this.state.nome +
      '&' +
      'email=' +
      this.state.email +
      '&' +
      'telefone=' +
      this.state.telefone +
      '&' +
      'celular=' +
      this.state.celular +
      '&' +
      'cpf=' +
      this.state.cpf +
      '&' +
      'rg=' +
      this.state.rg +
      '&' +
      'sexo=' +
      this.state.sexo +
      '&' +
      'nascimento=' +
      this.state.nascimento +
      '&' +
      'verAtendimento=' +
      this.state.verAtendimento +
      '&' +
      'cadAtendimento=' +
      this.state.cadAtendimento +
      '&' +
      'ediAtendimento=' +
      this.state.ediAtendimento +
      '&' +
      'baixaManualAtendimento=' +
      this.state.baixaManualAtendimento +
      '&' +
      'delAtendimento=' +
      this.state.delAtendimento +
      '&' +
      'relAtendimento=' +
      this.state.relAtendimento +
      '&' +
      'verPad=' +
      this.state.verPad +
      '&' +
      'cadPad=' +
      this.state.cadPad +
      '&' +
      'ediPad=' +
      this.state.ediPad +
      '&' +
      'delPad=' +
      this.state.delPad +
      '&' +
      'relPad=' +
      this.state.relPad +
      '&' +
      'verDiario=' +
      this.state.verDiario +
      '&' +
      'cadDiario=' +
      this.state.cadDiario +
      '&' +
      'ediDiario=' +
      this.state.ediDiario +
      '&' +
      'delDiario=' +
      this.state.delDiario +
      '&' +
      'relDiario=' +
      this.state.relDiario +
      '&' +
      'verCategoria=' +
      this.state.verCategoria +
      '&' +
      'cadCategoria=' +
      this.state.cadCategoria +
      '&' +
      'ediCategoria=' +
      this.state.ediCategoria +
      '&' +
      'delCategoria=' +
      this.state.delCategoria +
      '&' +
      'verEspecialidade=' +
      this.state.verEspecialidade +
      '&' +
      'cadEspecialidade=' +
      this.state.cadEspecialidade +
      '&' +
      'ediEspecialidade=' +
      this.state.ediEspecialidade +
      '&' +
      'delEspecialidade=' +
      this.state.delEspecialidade +
      '&' +
      'relEspecialidade=' +
      this.state.relEspecialidade +
      '&' +
      'verEspecialidadeValor=' +
      this.state.verEspecialidadeValor +
      '&' +
      'cadEspecialidadeValor=' +
      this.state.cadEspecialidadeValor +
      '&' +
      'ediEspecialidadeValor=' +
      this.state.ediEspecialidadeValor +
      '&' +
      'delEspecialidadeValor=' +
      this.state.delEspecialidadeValor +
      '&' +
      'relEspecialidadeValor=' +
      this.state.relEspecialidadeValor +
      '&' +
      'verOperadora=' +
      this.state.verOperadora +
      '&' +
      'cadOperadora=' +
      this.state.cadOperadora +
      '&' +
      'ediOperadora=' +
      this.state.ediOperadora +
      '&' +
      'delOperadora=' +
      this.state.delOperadora +
      '&' +
      'verPaciente=' +
      this.state.verPaciente +
      '&' +
      'cadPaciente=' +
      this.state.cadPaciente +
      '&' +
      'ediPaciente=' +
      this.state.ediPaciente +
      '&' +
      'delPaciente=' +
      this.state.delPaciente +
      '&' +
      'relPaciente=' +
      this.state.relPaciente +
      '&' +
      'verProfissional=' +
      this.state.verProfissional +
      '&' +
      'cadProfissional=' +
      this.state.cadProfissional +
      '&' +
      'ediProfissional=' +
      this.state.ediProfissional +
      '&' +
      'delProfissional=' +
      this.state.delProfissional +
      '&' +
      'ativProfissional=' +
      this.state.ativProfissional +
      '&' +
      'relProfissional=' +
      this.state.relProfissional +
      '&' +
      'verPush=' +
      this.state.verPush +
      '&' +
      'cadPushPaciente=' +
      this.state.cadPushPaciente +
      '&' +
      'cadPushProfissional=' +
      this.state.cadPushProfissional +
      '&' +
      'verTermoPaciente=' +
      this.state.verTermoPaciente +
      '&' +
      'ediTermoPaciente=' +
      this.state.ediTermoPaciente +
      '&' +
      'verTermoProfissional=' +
      this.state.verTermoProfissional +
      '&' +
      'ediTermoProfissional=' +
      this.state.ediTermoProfissional +
      '&' +
      'verOutros=' +
      this.state.verOutros +
      '&' +
      'cadOutros=' +
      this.state.cadOutros +
      '&' +
      'ediOutros=' +
      this.state.ediOutros +
      '&' +
      'delOutros=' +
      this.state.delOutros +
      '&' +
      'relOutros=' +
      this.state.relOutros +
      '&' +
      'verUnidadeEasy=' +
      this.state.verUnidadeEasy +
      '&' +
      'cadUnidadeEasy=' +
      this.state.cadUnidadeEasy +
      '&' +
      'ediUnidadeEasy=' +
      this.state.ediUnidadeEasy +
      '&' +
      'delUnidadeEasy=' +
      this.state.delUnidadeEasy +
      '&' +
      'verUsuario=' +
      this.state.verUsuario +
      '&' +
      'cadUsuario=' +
      this.state.cadUsuario +
      '&' +
      'ediUsuario=' +
      this.state.ediUsuario +
      '&' +
      'delUsuario=' +
      this.state.delUsuario +
      '&' +
      'verPtaResultado=' +
      this.state.verPtaResultado +
      '&' +
      'cadPtaResultado=' +
      this.state.cadPtaResultado +
      '&' +
      'delPtaResultado=' +
      this.state.delPtaResultado +
      '&' +
      'verPtaAtividade=' +
      this.state.verPtaAtividade +
      '&' +
      'cadPtaAtividade=' +
      this.state.cadPtaAtividade +
      '&' +
      'delPtaAtividade=' +
      this.state.delPtaAtividade +
      '&' +
      'permissaoUsuario=' +
      this.state.permissaoUsuario +
      '&' +
      'verProntuario=' +
      this.state.verProntuario +
      '&' +
      'cadProntuario=' +
      this.state.cadProntuario +
      '&' +
      'ediProntuario=' +
      this.state.ediProntuario +
      '&' +
      'delProntuario=' +
      this.state.delProntuario +
      '&' +
      'delProntuarioFoto=' +
      this.state.delProntuarioFoto +
      '&' +
      'valoresFinanceiro=' +
      this.state.valoresFinanceiro +
      '&' +
      'autorizacaoValorFinanceiro=' +
      this.state.autorizacaoValorFinanceiro +
      '&' +
      'confirmarPagamentoFinanceiro=' +
      this.state.confirmarPagamentoFinanceiro +
      '&' +
      'gerenciarSorteios=' +
      this.state.gerenciarSorteios +
      '&' +
      'envioRecusa=' +
      this.state.envioRecusa +
      '&' +
      'envioIntercorrencia=' +
      this.state.envioIntercorrencia +
      '&' +
      'envioCancelamento=' +
      this.state.envioCancelamento +
      '&' +
      'envioAvaliacao=' +
      this.state.envioAvaliacao +
      '&' +
      'envioPedido=' +
      this.state.envioPedido +
      '&' +
      'alertaAtendimento=' +
      this.state.alertaAtendimento +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'envioGlosado=' +
      this.state.envioGlosado +
      '&' +
      'emergencia=' +
      this.state.emergencia +
      '&' +
      'token=' +
      this.state.token +
      '&' +
      'editAtendimento=' +
      this.state.editAtendimento +
      '&' +
      'ouvirLigacao=' +
      this.state.ouvirLigacao +
      '&' +
      'verPainelIndicadores=' +
      this.state.verPainelIndicadores +
      '&' +
      'prorrogarPad=' +
      this.state.prorrogarPad +
      '&' +
      'cancelarAtendMassa=' +
      this.state.cancelarAtendMassa +
      '&' +
      'cadMatMed=' +
      this.state.cadMatMed +
      '&' +
      'ediMatMed=' +
      this.state.ediMatMed +
      '&' +
      'delMatMed=' +
      this.state.delMatMed +
      '&' +
      'verColPta=' +
      this.state.verColPta +
      '&' +
      'verColFoto=' +
      this.state.verColFoto +
      '&' +
      'verColLc=' +
      this.state.verColLc +
      '&' +
      'verAtendCancelado=' +
      this.state.verAtendCancelado +
      '&' +
      'verAtendAgConfirmacao=' +
      this.state.verAtendAgConfirmacao +
      '&' +
      'ediGeoLocalizacaoAtendimento=' +
      this.state.ediGeoLocalizacaoAtendimento +
      '&' +
      'copiarEvolucao=' +
      this.state.copiarEvolucao +
      '&' +
      'copiarNomeProf=' +
      this.state.copiarNomeProf +
      '&' +
      'copiarRegistroProf=' +
      this.state.copiarRegistroProf +
      '&' +
      'idAreaAtuacao=' +
      this.state.idAreaAtuacao +
      '&' +
      'diario=' +
      this.state.diario +
      '&' +
      'pacienteDiario=' +
      this.state.pacienteDiario +
      '&' +
      'unidade=' +
      this.state.unidade +
      '&' +
      'tipoUsuario=' +
      this.state.tipoUsuario +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      idOperadora,
      senha,
      nome,
      email,
      telefone,
      celular,
      cpf,
      rg,
      sexo,
      nascimento,
      verAtendimento,
      cadAtendimento,
      ediAtendimento,
      baixaManualAtendimento,
      delAtendimento,
      relAtendimento,
      verPad,
      cadPad,
      ediPad,
      delPad,
      relPad,
      verDiario,
      cadDiario,
      ediDiario,
      delDiario,
      relDiario,
      verCategoria,
      cadCategoria,
      ediCategoria,
      delCategoria,
      verEspecialidade,
      cadEspecialidade,
      ediEspecialidade,
      delEspecialidade,
      relEspecialidade,
      verEspecialidadeValor,
      cadEspecialidadeValor,
      ediEspecialidadeValor,
      delEspecialidadeValor,
      relEspecialidadeValor,
      verOperadora,
      cadOperadora,
      ediOperadora,
      delOperadora,
      verPaciente,
      cadPaciente,
      ediPaciente,
      delPaciente,
      relPaciente,
      verProfissional,
      cadProfissional,
      ediProfissional,
      delProfissional,
      ativProfissional,
      relProfissional,
      verPush,
      cadPushPaciente,
      cadPushProfissional,
      verTermoPaciente,
      ediTermoPaciente,
      verTermoProfissional,
      ediTermoProfissional,
      verOutros,
      cadOutros,
      ediOutros,
      delOutros,
      relOutros,
      verUnidadeEasy,
      cadUnidadeEasy,
      ediUnidadeEasy,
      delUnidadeEasy,
      verUsuario,
      cadUsuario,
      ediUsuario,
      delUsuario,
      verPtaResultado,
      cadPtaResultado,
      delPtaResultado,
      verPtaAtividade,
      cadPtaAtividade,
      delPtaAtividade,
      permissaoUsuario,
      verProntuario,
      cadProntuario,
      ediProntuario,
      delProntuario,
      delProntuarioFoto,
      valoresFinanceiro,
      autorizacaoValorFinanceiro,
      confirmarPagamentoFinanceiro,
      gerenciarSorteios,
      envioRecusa,
      envioIntercorrencia,
      envioCancelamento,
      envioAvaliacao,
      envioPedido,
      alertaAtendimento,
      ativo,
      envioGlosado,
      emergencia,
      token,
      editAtendimento,
      ouvirLigacao,
      verPainelIndicadores,
      prorrogarPad,
      cancelarAtendMassa,
      cadMatMed,
      ediMatMed,
      delMatMed,
      verColPta,
      verColFoto,
      verColLc,
      verAtendCancelado,
      verAtendAgConfirmacao,
      ediGeoLocalizacaoAtendimento,
      copiarEvolucao,
      copiarNomeProf,
      copiarRegistroProf,
      idAreaAtuacao,
      diario,
      pacienteDiario,
      unidade,
      tipoUsuario,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      idOperadora,
      senha,
      nome,
      email,
      telefone,
      celular,
      cpf,
      rg,
      sexo,
      nascimento,
      verAtendimento,
      cadAtendimento,
      ediAtendimento,
      baixaManualAtendimento,
      delAtendimento,
      relAtendimento,
      verPad,
      cadPad,
      ediPad,
      delPad,
      relPad,
      verDiario,
      cadDiario,
      ediDiario,
      delDiario,
      relDiario,
      verCategoria,
      cadCategoria,
      ediCategoria,
      delCategoria,
      verEspecialidade,
      cadEspecialidade,
      ediEspecialidade,
      delEspecialidade,
      relEspecialidade,
      verEspecialidadeValor,
      cadEspecialidadeValor,
      ediEspecialidadeValor,
      delEspecialidadeValor,
      relEspecialidadeValor,
      verOperadora,
      cadOperadora,
      ediOperadora,
      delOperadora,
      verPaciente,
      cadPaciente,
      ediPaciente,
      delPaciente,
      relPaciente,
      verProfissional,
      cadProfissional,
      ediProfissional,
      delProfissional,
      ativProfissional,
      relProfissional,
      verPush,
      cadPushPaciente,
      cadPushProfissional,
      verTermoPaciente,
      ediTermoPaciente,
      verTermoProfissional,
      ediTermoProfissional,
      verOutros,
      cadOutros,
      ediOutros,
      delOutros,
      relOutros,
      verUnidadeEasy,
      cadUnidadeEasy,
      ediUnidadeEasy,
      delUnidadeEasy,
      verUsuario,
      cadUsuario,
      ediUsuario,
      delUsuario,
      verPtaResultado,
      cadPtaResultado,
      delPtaResultado,
      verPtaAtividade,
      cadPtaAtividade,
      delPtaAtividade,
      permissaoUsuario,
      verProntuario,
      cadProntuario,
      ediProntuario,
      delProntuario,
      delProntuarioFoto,
      valoresFinanceiro,
      autorizacaoValorFinanceiro,
      confirmarPagamentoFinanceiro,
      gerenciarSorteios,
      envioRecusa,
      envioIntercorrencia,
      envioCancelamento,
      envioAvaliacao,
      envioPedido,
      alertaAtendimento,
      ativo,
      envioGlosado,
      emergencia,
      token,
      editAtendimento,
      ouvirLigacao,
      verPainelIndicadores,
      prorrogarPad,
      cancelarAtendMassa,
      cadMatMed,
      ediMatMed,
      delMatMed,
      verColPta,
      verColFoto,
      verColLc,
      verAtendCancelado,
      verAtendAgConfirmacao,
      ediGeoLocalizacaoAtendimento,
      copiarEvolucao,
      copiarNomeProf,
      copiarRegistroProf,
      idAreaAtuacao,
      diario,
      pacienteDiario,
      unidade,
      tipoUsuario,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { unidadeEasies, tipoUsuarios, usuarioList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Usuarios</span>
          <Button id="togglerFilterUsuario" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.usuario.home.btn_filter_open">Filters</Translate>
            &nbsp;
            <FontAwesomeIcon icon="caret-down" />
          </Button>{' '}
          &nbsp;
          <Link
            to={`${match.url}/new?${this.getFiltersURL()}`}
            className="btn btn-primary float-right jh-create-entity"
            id="jh-create-entity"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="generadorApp.usuario.home.createLabel">Create a new Usuario</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Usuarios</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterUsuario">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idOperadora' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idOperadoraLabel" for="usuario-idOperadora">
                              <Translate contentKey="generadorApp.usuario.idOperadora">Id Operadora</Translate>
                            </Label>

                            <AvInput type="text" name="idOperadora" id="usuario-idOperadora" value={this.state.idOperadora} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'senha' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="senhaLabel" for="usuario-senha">
                              <Translate contentKey="generadorApp.usuario.senha">Senha</Translate>
                            </Label>

                            <AvInput type="text" name="senha" id="usuario-senha" value={this.state.senha} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'nome' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="nomeLabel" for="usuario-nome">
                              <Translate contentKey="generadorApp.usuario.nome">Nome</Translate>
                            </Label>

                            <AvInput type="text" name="nome" id="usuario-nome" value={this.state.nome} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'email' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="emailLabel" for="usuario-email">
                              <Translate contentKey="generadorApp.usuario.email">Email</Translate>
                            </Label>

                            <AvInput type="text" name="email" id="usuario-email" value={this.state.email} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'telefone' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="telefoneLabel" for="usuario-telefone">
                              <Translate contentKey="generadorApp.usuario.telefone">Telefone</Translate>
                            </Label>

                            <AvInput type="text" name="telefone" id="usuario-telefone" value={this.state.telefone} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'celular' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="celularLabel" for="usuario-celular">
                              <Translate contentKey="generadorApp.usuario.celular">Celular</Translate>
                            </Label>

                            <AvInput type="text" name="celular" id="usuario-celular" value={this.state.celular} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cpf' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cpfLabel" for="usuario-cpf">
                              <Translate contentKey="generadorApp.usuario.cpf">Cpf</Translate>
                            </Label>

                            <AvInput type="text" name="cpf" id="usuario-cpf" value={this.state.cpf} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'rg' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="rgLabel" for="usuario-rg">
                              <Translate contentKey="generadorApp.usuario.rg">Rg</Translate>
                            </Label>

                            <AvInput type="text" name="rg" id="usuario-rg" value={this.state.rg} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'sexo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="sexoLabel" for="usuario-sexo">
                              <Translate contentKey="generadorApp.usuario.sexo">Sexo</Translate>
                            </Label>
                            <AvInput type="string" name="sexo" id="usuario-sexo" value={this.state.sexo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'nascimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="nascimentoLabel" for="usuario-nascimento">
                              <Translate contentKey="generadorApp.usuario.nascimento">Nascimento</Translate>
                            </Label>
                            <AvInput type="date" name="nascimento" id="usuario-nascimento" value={this.state.nascimento} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verAtendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verAtendimentoLabel" check>
                              <AvInput id="usuario-verAtendimento" type="checkbox" className="form-control" name="verAtendimento" />
                              <Translate contentKey="generadorApp.usuario.verAtendimento">Ver Atendimento</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadAtendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadAtendimentoLabel" check>
                              <AvInput id="usuario-cadAtendimento" type="checkbox" className="form-control" name="cadAtendimento" />
                              <Translate contentKey="generadorApp.usuario.cadAtendimento">Cad Atendimento</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediAtendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediAtendimentoLabel" check>
                              <AvInput id="usuario-ediAtendimento" type="checkbox" className="form-control" name="ediAtendimento" />
                              <Translate contentKey="generadorApp.usuario.ediAtendimento">Edi Atendimento</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'baixaManualAtendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="baixaManualAtendimentoLabel" check>
                              <AvInput
                                id="usuario-baixaManualAtendimento"
                                type="checkbox"
                                className="form-control"
                                name="baixaManualAtendimento"
                              />
                              <Translate contentKey="generadorApp.usuario.baixaManualAtendimento">Baixa Manual Atendimento</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delAtendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delAtendimentoLabel" check>
                              <AvInput id="usuario-delAtendimento" type="checkbox" className="form-control" name="delAtendimento" />
                              <Translate contentKey="generadorApp.usuario.delAtendimento">Del Atendimento</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'relAtendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="relAtendimentoLabel" check>
                              <AvInput id="usuario-relAtendimento" type="checkbox" className="form-control" name="relAtendimento" />
                              <Translate contentKey="generadorApp.usuario.relAtendimento">Rel Atendimento</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verPad' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verPadLabel" check>
                              <AvInput id="usuario-verPad" type="checkbox" className="form-control" name="verPad" />
                              <Translate contentKey="generadorApp.usuario.verPad">Ver Pad</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadPad' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadPadLabel" check>
                              <AvInput id="usuario-cadPad" type="checkbox" className="form-control" name="cadPad" />
                              <Translate contentKey="generadorApp.usuario.cadPad">Cad Pad</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediPad' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediPadLabel" check>
                              <AvInput id="usuario-ediPad" type="checkbox" className="form-control" name="ediPad" />
                              <Translate contentKey="generadorApp.usuario.ediPad">Edi Pad</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delPad' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delPadLabel" check>
                              <AvInput id="usuario-delPad" type="checkbox" className="form-control" name="delPad" />
                              <Translate contentKey="generadorApp.usuario.delPad">Del Pad</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'relPad' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="relPadLabel" check>
                              <AvInput id="usuario-relPad" type="checkbox" className="form-control" name="relPad" />
                              <Translate contentKey="generadorApp.usuario.relPad">Rel Pad</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verDiario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verDiarioLabel" check>
                              <AvInput id="usuario-verDiario" type="checkbox" className="form-control" name="verDiario" />
                              <Translate contentKey="generadorApp.usuario.verDiario">Ver Diario</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadDiario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadDiarioLabel" check>
                              <AvInput id="usuario-cadDiario" type="checkbox" className="form-control" name="cadDiario" />
                              <Translate contentKey="generadorApp.usuario.cadDiario">Cad Diario</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediDiario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediDiarioLabel" check>
                              <AvInput id="usuario-ediDiario" type="checkbox" className="form-control" name="ediDiario" />
                              <Translate contentKey="generadorApp.usuario.ediDiario">Edi Diario</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delDiario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delDiarioLabel" check>
                              <AvInput id="usuario-delDiario" type="checkbox" className="form-control" name="delDiario" />
                              <Translate contentKey="generadorApp.usuario.delDiario">Del Diario</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'relDiario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="relDiarioLabel" check>
                              <AvInput id="usuario-relDiario" type="checkbox" className="form-control" name="relDiario" />
                              <Translate contentKey="generadorApp.usuario.relDiario">Rel Diario</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verCategoria' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verCategoriaLabel" check>
                              <AvInput id="usuario-verCategoria" type="checkbox" className="form-control" name="verCategoria" />
                              <Translate contentKey="generadorApp.usuario.verCategoria">Ver Categoria</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadCategoria' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadCategoriaLabel" check>
                              <AvInput id="usuario-cadCategoria" type="checkbox" className="form-control" name="cadCategoria" />
                              <Translate contentKey="generadorApp.usuario.cadCategoria">Cad Categoria</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediCategoria' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediCategoriaLabel" check>
                              <AvInput id="usuario-ediCategoria" type="checkbox" className="form-control" name="ediCategoria" />
                              <Translate contentKey="generadorApp.usuario.ediCategoria">Edi Categoria</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delCategoria' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delCategoriaLabel" check>
                              <AvInput id="usuario-delCategoria" type="checkbox" className="form-control" name="delCategoria" />
                              <Translate contentKey="generadorApp.usuario.delCategoria">Del Categoria</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verEspecialidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verEspecialidadeLabel" check>
                              <AvInput id="usuario-verEspecialidade" type="checkbox" className="form-control" name="verEspecialidade" />
                              <Translate contentKey="generadorApp.usuario.verEspecialidade">Ver Especialidade</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadEspecialidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadEspecialidadeLabel" check>
                              <AvInput id="usuario-cadEspecialidade" type="checkbox" className="form-control" name="cadEspecialidade" />
                              <Translate contentKey="generadorApp.usuario.cadEspecialidade">Cad Especialidade</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediEspecialidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediEspecialidadeLabel" check>
                              <AvInput id="usuario-ediEspecialidade" type="checkbox" className="form-control" name="ediEspecialidade" />
                              <Translate contentKey="generadorApp.usuario.ediEspecialidade">Edi Especialidade</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delEspecialidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delEspecialidadeLabel" check>
                              <AvInput id="usuario-delEspecialidade" type="checkbox" className="form-control" name="delEspecialidade" />
                              <Translate contentKey="generadorApp.usuario.delEspecialidade">Del Especialidade</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'relEspecialidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="relEspecialidadeLabel" check>
                              <AvInput id="usuario-relEspecialidade" type="checkbox" className="form-control" name="relEspecialidade" />
                              <Translate contentKey="generadorApp.usuario.relEspecialidade">Rel Especialidade</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verEspecialidadeValor' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verEspecialidadeValorLabel" check>
                              <AvInput
                                id="usuario-verEspecialidadeValor"
                                type="checkbox"
                                className="form-control"
                                name="verEspecialidadeValor"
                              />
                              <Translate contentKey="generadorApp.usuario.verEspecialidadeValor">Ver Especialidade Valor</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadEspecialidadeValor' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadEspecialidadeValorLabel" check>
                              <AvInput
                                id="usuario-cadEspecialidadeValor"
                                type="checkbox"
                                className="form-control"
                                name="cadEspecialidadeValor"
                              />
                              <Translate contentKey="generadorApp.usuario.cadEspecialidadeValor">Cad Especialidade Valor</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediEspecialidadeValor' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediEspecialidadeValorLabel" check>
                              <AvInput
                                id="usuario-ediEspecialidadeValor"
                                type="checkbox"
                                className="form-control"
                                name="ediEspecialidadeValor"
                              />
                              <Translate contentKey="generadorApp.usuario.ediEspecialidadeValor">Edi Especialidade Valor</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delEspecialidadeValor' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delEspecialidadeValorLabel" check>
                              <AvInput
                                id="usuario-delEspecialidadeValor"
                                type="checkbox"
                                className="form-control"
                                name="delEspecialidadeValor"
                              />
                              <Translate contentKey="generadorApp.usuario.delEspecialidadeValor">Del Especialidade Valor</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'relEspecialidadeValor' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="relEspecialidadeValorLabel" check>
                              <AvInput
                                id="usuario-relEspecialidadeValor"
                                type="checkbox"
                                className="form-control"
                                name="relEspecialidadeValor"
                              />
                              <Translate contentKey="generadorApp.usuario.relEspecialidadeValor">Rel Especialidade Valor</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verOperadora' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verOperadoraLabel" check>
                              <AvInput id="usuario-verOperadora" type="checkbox" className="form-control" name="verOperadora" />
                              <Translate contentKey="generadorApp.usuario.verOperadora">Ver Operadora</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadOperadora' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadOperadoraLabel" check>
                              <AvInput id="usuario-cadOperadora" type="checkbox" className="form-control" name="cadOperadora" />
                              <Translate contentKey="generadorApp.usuario.cadOperadora">Cad Operadora</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediOperadora' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediOperadoraLabel" check>
                              <AvInput id="usuario-ediOperadora" type="checkbox" className="form-control" name="ediOperadora" />
                              <Translate contentKey="generadorApp.usuario.ediOperadora">Edi Operadora</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delOperadora' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delOperadoraLabel" check>
                              <AvInput id="usuario-delOperadora" type="checkbox" className="form-control" name="delOperadora" />
                              <Translate contentKey="generadorApp.usuario.delOperadora">Del Operadora</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verPaciente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verPacienteLabel" check>
                              <AvInput id="usuario-verPaciente" type="checkbox" className="form-control" name="verPaciente" />
                              <Translate contentKey="generadorApp.usuario.verPaciente">Ver Paciente</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadPaciente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadPacienteLabel" check>
                              <AvInput id="usuario-cadPaciente" type="checkbox" className="form-control" name="cadPaciente" />
                              <Translate contentKey="generadorApp.usuario.cadPaciente">Cad Paciente</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediPaciente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediPacienteLabel" check>
                              <AvInput id="usuario-ediPaciente" type="checkbox" className="form-control" name="ediPaciente" />
                              <Translate contentKey="generadorApp.usuario.ediPaciente">Edi Paciente</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delPaciente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delPacienteLabel" check>
                              <AvInput id="usuario-delPaciente" type="checkbox" className="form-control" name="delPaciente" />
                              <Translate contentKey="generadorApp.usuario.delPaciente">Del Paciente</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'relPaciente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="relPacienteLabel" check>
                              <AvInput id="usuario-relPaciente" type="checkbox" className="form-control" name="relPaciente" />
                              <Translate contentKey="generadorApp.usuario.relPaciente">Rel Paciente</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verProfissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verProfissionalLabel" check>
                              <AvInput id="usuario-verProfissional" type="checkbox" className="form-control" name="verProfissional" />
                              <Translate contentKey="generadorApp.usuario.verProfissional">Ver Profissional</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadProfissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadProfissionalLabel" check>
                              <AvInput id="usuario-cadProfissional" type="checkbox" className="form-control" name="cadProfissional" />
                              <Translate contentKey="generadorApp.usuario.cadProfissional">Cad Profissional</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediProfissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediProfissionalLabel" check>
                              <AvInput id="usuario-ediProfissional" type="checkbox" className="form-control" name="ediProfissional" />
                              <Translate contentKey="generadorApp.usuario.ediProfissional">Edi Profissional</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delProfissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delProfissionalLabel" check>
                              <AvInput id="usuario-delProfissional" type="checkbox" className="form-control" name="delProfissional" />
                              <Translate contentKey="generadorApp.usuario.delProfissional">Del Profissional</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ativProfissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ativProfissionalLabel" check>
                              <AvInput id="usuario-ativProfissional" type="checkbox" className="form-control" name="ativProfissional" />
                              <Translate contentKey="generadorApp.usuario.ativProfissional">Ativ Profissional</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'relProfissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="relProfissionalLabel" check>
                              <AvInput id="usuario-relProfissional" type="checkbox" className="form-control" name="relProfissional" />
                              <Translate contentKey="generadorApp.usuario.relProfissional">Rel Profissional</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verPush' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verPushLabel" check>
                              <AvInput id="usuario-verPush" type="checkbox" className="form-control" name="verPush" />
                              <Translate contentKey="generadorApp.usuario.verPush">Ver Push</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadPushPaciente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadPushPacienteLabel" check>
                              <AvInput id="usuario-cadPushPaciente" type="checkbox" className="form-control" name="cadPushPaciente" />
                              <Translate contentKey="generadorApp.usuario.cadPushPaciente">Cad Push Paciente</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadPushProfissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadPushProfissionalLabel" check>
                              <AvInput
                                id="usuario-cadPushProfissional"
                                type="checkbox"
                                className="form-control"
                                name="cadPushProfissional"
                              />
                              <Translate contentKey="generadorApp.usuario.cadPushProfissional">Cad Push Profissional</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verTermoPaciente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verTermoPacienteLabel" check>
                              <AvInput id="usuario-verTermoPaciente" type="checkbox" className="form-control" name="verTermoPaciente" />
                              <Translate contentKey="generadorApp.usuario.verTermoPaciente">Ver Termo Paciente</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediTermoPaciente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediTermoPacienteLabel" check>
                              <AvInput id="usuario-ediTermoPaciente" type="checkbox" className="form-control" name="ediTermoPaciente" />
                              <Translate contentKey="generadorApp.usuario.ediTermoPaciente">Edi Termo Paciente</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verTermoProfissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verTermoProfissionalLabel" check>
                              <AvInput
                                id="usuario-verTermoProfissional"
                                type="checkbox"
                                className="form-control"
                                name="verTermoProfissional"
                              />
                              <Translate contentKey="generadorApp.usuario.verTermoProfissional">Ver Termo Profissional</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediTermoProfissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediTermoProfissionalLabel" check>
                              <AvInput
                                id="usuario-ediTermoProfissional"
                                type="checkbox"
                                className="form-control"
                                name="ediTermoProfissional"
                              />
                              <Translate contentKey="generadorApp.usuario.ediTermoProfissional">Edi Termo Profissional</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verOutros' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verOutrosLabel" check>
                              <AvInput id="usuario-verOutros" type="checkbox" className="form-control" name="verOutros" />
                              <Translate contentKey="generadorApp.usuario.verOutros">Ver Outros</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadOutros' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadOutrosLabel" check>
                              <AvInput id="usuario-cadOutros" type="checkbox" className="form-control" name="cadOutros" />
                              <Translate contentKey="generadorApp.usuario.cadOutros">Cad Outros</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediOutros' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediOutrosLabel" check>
                              <AvInput id="usuario-ediOutros" type="checkbox" className="form-control" name="ediOutros" />
                              <Translate contentKey="generadorApp.usuario.ediOutros">Edi Outros</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delOutros' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delOutrosLabel" check>
                              <AvInput id="usuario-delOutros" type="checkbox" className="form-control" name="delOutros" />
                              <Translate contentKey="generadorApp.usuario.delOutros">Del Outros</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'relOutros' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="relOutrosLabel" check>
                              <AvInput id="usuario-relOutros" type="checkbox" className="form-control" name="relOutros" />
                              <Translate contentKey="generadorApp.usuario.relOutros">Rel Outros</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verUnidadeEasy' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verUnidadeEasyLabel" check>
                              <AvInput id="usuario-verUnidadeEasy" type="checkbox" className="form-control" name="verUnidadeEasy" />
                              <Translate contentKey="generadorApp.usuario.verUnidadeEasy">Ver Unidade Easy</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadUnidadeEasy' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadUnidadeEasyLabel" check>
                              <AvInput id="usuario-cadUnidadeEasy" type="checkbox" className="form-control" name="cadUnidadeEasy" />
                              <Translate contentKey="generadorApp.usuario.cadUnidadeEasy">Cad Unidade Easy</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediUnidadeEasy' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediUnidadeEasyLabel" check>
                              <AvInput id="usuario-ediUnidadeEasy" type="checkbox" className="form-control" name="ediUnidadeEasy" />
                              <Translate contentKey="generadorApp.usuario.ediUnidadeEasy">Edi Unidade Easy</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delUnidadeEasy' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delUnidadeEasyLabel" check>
                              <AvInput id="usuario-delUnidadeEasy" type="checkbox" className="form-control" name="delUnidadeEasy" />
                              <Translate contentKey="generadorApp.usuario.delUnidadeEasy">Del Unidade Easy</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verUsuario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verUsuarioLabel" check>
                              <AvInput id="usuario-verUsuario" type="checkbox" className="form-control" name="verUsuario" />
                              <Translate contentKey="generadorApp.usuario.verUsuario">Ver Usuario</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadUsuario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadUsuarioLabel" check>
                              <AvInput id="usuario-cadUsuario" type="checkbox" className="form-control" name="cadUsuario" />
                              <Translate contentKey="generadorApp.usuario.cadUsuario">Cad Usuario</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediUsuario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediUsuarioLabel" check>
                              <AvInput id="usuario-ediUsuario" type="checkbox" className="form-control" name="ediUsuario" />
                              <Translate contentKey="generadorApp.usuario.ediUsuario">Edi Usuario</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delUsuario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delUsuarioLabel" check>
                              <AvInput id="usuario-delUsuario" type="checkbox" className="form-control" name="delUsuario" />
                              <Translate contentKey="generadorApp.usuario.delUsuario">Del Usuario</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verPtaResultado' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verPtaResultadoLabel" check>
                              <AvInput id="usuario-verPtaResultado" type="checkbox" className="form-control" name="verPtaResultado" />
                              <Translate contentKey="generadorApp.usuario.verPtaResultado">Ver Pta Resultado</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadPtaResultado' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadPtaResultadoLabel" check>
                              <AvInput id="usuario-cadPtaResultado" type="checkbox" className="form-control" name="cadPtaResultado" />
                              <Translate contentKey="generadorApp.usuario.cadPtaResultado">Cad Pta Resultado</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delPtaResultado' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delPtaResultadoLabel" check>
                              <AvInput id="usuario-delPtaResultado" type="checkbox" className="form-control" name="delPtaResultado" />
                              <Translate contentKey="generadorApp.usuario.delPtaResultado">Del Pta Resultado</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verPtaAtividade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verPtaAtividadeLabel" check>
                              <AvInput id="usuario-verPtaAtividade" type="checkbox" className="form-control" name="verPtaAtividade" />
                              <Translate contentKey="generadorApp.usuario.verPtaAtividade">Ver Pta Atividade</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadPtaAtividade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadPtaAtividadeLabel" check>
                              <AvInput id="usuario-cadPtaAtividade" type="checkbox" className="form-control" name="cadPtaAtividade" />
                              <Translate contentKey="generadorApp.usuario.cadPtaAtividade">Cad Pta Atividade</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delPtaAtividade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delPtaAtividadeLabel" check>
                              <AvInput id="usuario-delPtaAtividade" type="checkbox" className="form-control" name="delPtaAtividade" />
                              <Translate contentKey="generadorApp.usuario.delPtaAtividade">Del Pta Atividade</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'permissaoUsuario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="permissaoUsuarioLabel" check>
                              <AvInput id="usuario-permissaoUsuario" type="checkbox" className="form-control" name="permissaoUsuario" />
                              <Translate contentKey="generadorApp.usuario.permissaoUsuario">Permissao Usuario</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verProntuario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verProntuarioLabel" check>
                              <AvInput id="usuario-verProntuario" type="checkbox" className="form-control" name="verProntuario" />
                              <Translate contentKey="generadorApp.usuario.verProntuario">Ver Prontuario</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadProntuario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadProntuarioLabel" check>
                              <AvInput id="usuario-cadProntuario" type="checkbox" className="form-control" name="cadProntuario" />
                              <Translate contentKey="generadorApp.usuario.cadProntuario">Cad Prontuario</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediProntuario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediProntuarioLabel" check>
                              <AvInput id="usuario-ediProntuario" type="checkbox" className="form-control" name="ediProntuario" />
                              <Translate contentKey="generadorApp.usuario.ediProntuario">Edi Prontuario</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delProntuario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delProntuarioLabel" check>
                              <AvInput id="usuario-delProntuario" type="checkbox" className="form-control" name="delProntuario" />
                              <Translate contentKey="generadorApp.usuario.delProntuario">Del Prontuario</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delProntuarioFoto' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delProntuarioFotoLabel" check>
                              <AvInput id="usuario-delProntuarioFoto" type="checkbox" className="form-control" name="delProntuarioFoto" />
                              <Translate contentKey="generadorApp.usuario.delProntuarioFoto">Del Prontuario Foto</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'valoresFinanceiro' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="valoresFinanceiroLabel" check>
                              <AvInput id="usuario-valoresFinanceiro" type="checkbox" className="form-control" name="valoresFinanceiro" />
                              <Translate contentKey="generadorApp.usuario.valoresFinanceiro">Valores Financeiro</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'autorizacaoValorFinanceiro' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="autorizacaoValorFinanceiroLabel" check>
                              <AvInput
                                id="usuario-autorizacaoValorFinanceiro"
                                type="checkbox"
                                className="form-control"
                                name="autorizacaoValorFinanceiro"
                              />
                              <Translate contentKey="generadorApp.usuario.autorizacaoValorFinanceiro">
                                Autorizacao Valor Financeiro
                              </Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'confirmarPagamentoFinanceiro' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="confirmarPagamentoFinanceiroLabel" check>
                              <AvInput
                                id="usuario-confirmarPagamentoFinanceiro"
                                type="checkbox"
                                className="form-control"
                                name="confirmarPagamentoFinanceiro"
                              />
                              <Translate contentKey="generadorApp.usuario.confirmarPagamentoFinanceiro">
                                Confirmar Pagamento Financeiro
                              </Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'gerenciarSorteios' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="gerenciarSorteiosLabel" check>
                              <AvInput id="usuario-gerenciarSorteios" type="checkbox" className="form-control" name="gerenciarSorteios" />
                              <Translate contentKey="generadorApp.usuario.gerenciarSorteios">Gerenciar Sorteios</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'envioRecusa' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="envioRecusaLabel" check>
                              <AvInput id="usuario-envioRecusa" type="checkbox" className="form-control" name="envioRecusa" />
                              <Translate contentKey="generadorApp.usuario.envioRecusa">Envio Recusa</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'envioIntercorrencia' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="envioIntercorrenciaLabel" check>
                              <AvInput
                                id="usuario-envioIntercorrencia"
                                type="checkbox"
                                className="form-control"
                                name="envioIntercorrencia"
                              />
                              <Translate contentKey="generadorApp.usuario.envioIntercorrencia">Envio Intercorrencia</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'envioCancelamento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="envioCancelamentoLabel" check>
                              <AvInput id="usuario-envioCancelamento" type="checkbox" className="form-control" name="envioCancelamento" />
                              <Translate contentKey="generadorApp.usuario.envioCancelamento">Envio Cancelamento</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'envioAvaliacao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="envioAvaliacaoLabel" check>
                              <AvInput id="usuario-envioAvaliacao" type="checkbox" className="form-control" name="envioAvaliacao" />
                              <Translate contentKey="generadorApp.usuario.envioAvaliacao">Envio Avaliacao</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'envioPedido' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="envioPedidoLabel" check>
                              <AvInput id="usuario-envioPedido" type="checkbox" className="form-control" name="envioPedido" />
                              <Translate contentKey="generadorApp.usuario.envioPedido">Envio Pedido</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'alertaAtendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="alertaAtendimentoLabel" check>
                              <AvInput id="usuario-alertaAtendimento" type="checkbox" className="form-control" name="alertaAtendimento" />
                              <Translate contentKey="generadorApp.usuario.alertaAtendimento">Alerta Atendimento</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ativo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ativoLabel" check>
                              <AvInput id="usuario-ativo" type="checkbox" className="form-control" name="ativo" />
                              <Translate contentKey="generadorApp.usuario.ativo">Ativo</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'envioGlosado' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="envioGlosadoLabel" check>
                              <AvInput id="usuario-envioGlosado" type="checkbox" className="form-control" name="envioGlosado" />
                              <Translate contentKey="generadorApp.usuario.envioGlosado">Envio Glosado</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'emergencia' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="emergenciaLabel" check>
                              <AvInput id="usuario-emergencia" type="checkbox" className="form-control" name="emergencia" />
                              <Translate contentKey="generadorApp.usuario.emergencia">Emergencia</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'token' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="tokenLabel" check>
                              <AvInput id="usuario-token" type="checkbox" className="form-control" name="token" />
                              <Translate contentKey="generadorApp.usuario.token">Token</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'editAtendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="editAtendimentoLabel" check>
                              <AvInput id="usuario-editAtendimento" type="checkbox" className="form-control" name="editAtendimento" />
                              <Translate contentKey="generadorApp.usuario.editAtendimento">Edit Atendimento</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ouvirLigacao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ouvirLigacaoLabel" check>
                              <AvInput id="usuario-ouvirLigacao" type="checkbox" className="form-control" name="ouvirLigacao" />
                              <Translate contentKey="generadorApp.usuario.ouvirLigacao">Ouvir Ligacao</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verPainelIndicadores' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verPainelIndicadoresLabel" check>
                              <AvInput
                                id="usuario-verPainelIndicadores"
                                type="checkbox"
                                className="form-control"
                                name="verPainelIndicadores"
                              />
                              <Translate contentKey="generadorApp.usuario.verPainelIndicadores">Ver Painel Indicadores</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'prorrogarPad' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="prorrogarPadLabel" check>
                              <AvInput id="usuario-prorrogarPad" type="checkbox" className="form-control" name="prorrogarPad" />
                              <Translate contentKey="generadorApp.usuario.prorrogarPad">Prorrogar Pad</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cancelarAtendMassa' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cancelarAtendMassaLabel" check>
                              <AvInput id="usuario-cancelarAtendMassa" type="checkbox" className="form-control" name="cancelarAtendMassa" />
                              <Translate contentKey="generadorApp.usuario.cancelarAtendMassa">Cancelar Atend Massa</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadMatMed' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadMatMedLabel" check>
                              <AvInput id="usuario-cadMatMed" type="checkbox" className="form-control" name="cadMatMed" />
                              <Translate contentKey="generadorApp.usuario.cadMatMed">Cad Mat Med</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediMatMed' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediMatMedLabel" check>
                              <AvInput id="usuario-ediMatMed" type="checkbox" className="form-control" name="ediMatMed" />
                              <Translate contentKey="generadorApp.usuario.ediMatMed">Edi Mat Med</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delMatMed' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delMatMedLabel" check>
                              <AvInput id="usuario-delMatMed" type="checkbox" className="form-control" name="delMatMed" />
                              <Translate contentKey="generadorApp.usuario.delMatMed">Del Mat Med</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verColPta' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verColPtaLabel" check>
                              <AvInput id="usuario-verColPta" type="checkbox" className="form-control" name="verColPta" />
                              <Translate contentKey="generadorApp.usuario.verColPta">Ver Col Pta</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verColFoto' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verColFotoLabel" check>
                              <AvInput id="usuario-verColFoto" type="checkbox" className="form-control" name="verColFoto" />
                              <Translate contentKey="generadorApp.usuario.verColFoto">Ver Col Foto</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verColLc' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verColLcLabel" check>
                              <AvInput id="usuario-verColLc" type="checkbox" className="form-control" name="verColLc" />
                              <Translate contentKey="generadorApp.usuario.verColLc">Ver Col Lc</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verAtendCancelado' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verAtendCanceladoLabel" check>
                              <AvInput id="usuario-verAtendCancelado" type="checkbox" className="form-control" name="verAtendCancelado" />
                              <Translate contentKey="generadorApp.usuario.verAtendCancelado">Ver Atend Cancelado</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verAtendAgConfirmacao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verAtendAgConfirmacaoLabel" check>
                              <AvInput
                                id="usuario-verAtendAgConfirmacao"
                                type="checkbox"
                                className="form-control"
                                name="verAtendAgConfirmacao"
                              />
                              <Translate contentKey="generadorApp.usuario.verAtendAgConfirmacao">Ver Atend Ag Confirmacao</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediGeoLocalizacaoAtendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediGeoLocalizacaoAtendimentoLabel" check>
                              <AvInput
                                id="usuario-ediGeoLocalizacaoAtendimento"
                                type="checkbox"
                                className="form-control"
                                name="ediGeoLocalizacaoAtendimento"
                              />
                              <Translate contentKey="generadorApp.usuario.ediGeoLocalizacaoAtendimento">
                                Edi Geo Localizacao Atendimento
                              </Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'copiarEvolucao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="copiarEvolucaoLabel" check>
                              <AvInput id="usuario-copiarEvolucao" type="checkbox" className="form-control" name="copiarEvolucao" />
                              <Translate contentKey="generadorApp.usuario.copiarEvolucao">Copiar Evolucao</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'copiarNomeProf' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="copiarNomeProfLabel" check>
                              <AvInput id="usuario-copiarNomeProf" type="checkbox" className="form-control" name="copiarNomeProf" />
                              <Translate contentKey="generadorApp.usuario.copiarNomeProf">Copiar Nome Prof</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'copiarRegistroProf' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="copiarRegistroProfLabel" check>
                              <AvInput id="usuario-copiarRegistroProf" type="checkbox" className="form-control" name="copiarRegistroProf" />
                              <Translate contentKey="generadorApp.usuario.copiarRegistroProf">Copiar Registro Prof</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idAreaAtuacao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idAreaAtuacaoLabel" for="usuario-idAreaAtuacao">
                              <Translate contentKey="generadorApp.usuario.idAreaAtuacao">Id Area Atuacao</Translate>
                            </Label>

                            <AvInput type="text" name="idAreaAtuacao" id="usuario-idAreaAtuacao" value={this.state.idAreaAtuacao} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'diario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'pacienteDiario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'unidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="usuario-unidade">
                                <Translate contentKey="generadorApp.usuario.unidade">Unidade</Translate>
                              </Label>
                              <Select
                                id="usuario-unidade"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  unidadeEasies
                                    ? unidadeEasies.map(p =>
                                        this.state.unidade.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.razaoSocial } : null
                                      )
                                    : null
                                }
                                options={
                                  unidadeEasies ? unidadeEasies.map(option => ({ value: option.id, label: option.razaoSocial })) : null
                                }
                                onChange={options => this.setState({ unidade: options.map(option => option['value']).join(',') })}
                                name={'unidade'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'tipoUsuario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="usuario-tipoUsuario">
                                <Translate contentKey="generadorApp.usuario.tipoUsuario">Tipo Usuario</Translate>
                              </Label>
                              <Select
                                id="usuario-tipoUsuario"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  tipoUsuarios
                                    ? tipoUsuarios.map(p =>
                                        this.state.tipoUsuario.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null
                                      )
                                    : null
                                }
                                options={tipoUsuarios ? tipoUsuarios.map(option => ({ value: option.id, label: option.id })) : null}
                                onChange={options => this.setState({ tipoUsuario: options.map(option => option['value']).join(',') })}
                                name={'tipoUsuario'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.usuario.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.usuario.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {usuarioList && usuarioList.length > 0 ? (
                <Table responsive aria-describedby="usuario-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'idOperadora' ? (
                        <th className="hand" onClick={this.sort('idOperadora')}>
                          <Translate contentKey="generadorApp.usuario.idOperadora">Id Operadora</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'senha' ? (
                        <th className="hand" onClick={this.sort('senha')}>
                          <Translate contentKey="generadorApp.usuario.senha">Senha</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'nome' ? (
                        <th className="hand" onClick={this.sort('nome')}>
                          <Translate contentKey="generadorApp.usuario.nome">Nome</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'email' ? (
                        <th className="hand" onClick={this.sort('email')}>
                          <Translate contentKey="generadorApp.usuario.email">Email</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'telefone' ? (
                        <th className="hand" onClick={this.sort('telefone')}>
                          <Translate contentKey="generadorApp.usuario.telefone">Telefone</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'celular' ? (
                        <th className="hand" onClick={this.sort('celular')}>
                          <Translate contentKey="generadorApp.usuario.celular">Celular</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cpf' ? (
                        <th className="hand" onClick={this.sort('cpf')}>
                          <Translate contentKey="generadorApp.usuario.cpf">Cpf</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'rg' ? (
                        <th className="hand" onClick={this.sort('rg')}>
                          <Translate contentKey="generadorApp.usuario.rg">Rg</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'sexo' ? (
                        <th className="hand" onClick={this.sort('sexo')}>
                          <Translate contentKey="generadorApp.usuario.sexo">Sexo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'nascimento' ? (
                        <th className="hand" onClick={this.sort('nascimento')}>
                          <Translate contentKey="generadorApp.usuario.nascimento">Nascimento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verAtendimento' ? (
                        <th className="hand" onClick={this.sort('verAtendimento')}>
                          <Translate contentKey="generadorApp.usuario.verAtendimento">Ver Atendimento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cadAtendimento' ? (
                        <th className="hand" onClick={this.sort('cadAtendimento')}>
                          <Translate contentKey="generadorApp.usuario.cadAtendimento">Cad Atendimento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ediAtendimento' ? (
                        <th className="hand" onClick={this.sort('ediAtendimento')}>
                          <Translate contentKey="generadorApp.usuario.ediAtendimento">Edi Atendimento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'baixaManualAtendimento' ? (
                        <th className="hand" onClick={this.sort('baixaManualAtendimento')}>
                          <Translate contentKey="generadorApp.usuario.baixaManualAtendimento">Baixa Manual Atendimento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'delAtendimento' ? (
                        <th className="hand" onClick={this.sort('delAtendimento')}>
                          <Translate contentKey="generadorApp.usuario.delAtendimento">Del Atendimento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'relAtendimento' ? (
                        <th className="hand" onClick={this.sort('relAtendimento')}>
                          <Translate contentKey="generadorApp.usuario.relAtendimento">Rel Atendimento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verPad' ? (
                        <th className="hand" onClick={this.sort('verPad')}>
                          <Translate contentKey="generadorApp.usuario.verPad">Ver Pad</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cadPad' ? (
                        <th className="hand" onClick={this.sort('cadPad')}>
                          <Translate contentKey="generadorApp.usuario.cadPad">Cad Pad</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ediPad' ? (
                        <th className="hand" onClick={this.sort('ediPad')}>
                          <Translate contentKey="generadorApp.usuario.ediPad">Edi Pad</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'delPad' ? (
                        <th className="hand" onClick={this.sort('delPad')}>
                          <Translate contentKey="generadorApp.usuario.delPad">Del Pad</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'relPad' ? (
                        <th className="hand" onClick={this.sort('relPad')}>
                          <Translate contentKey="generadorApp.usuario.relPad">Rel Pad</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verDiario' ? (
                        <th className="hand" onClick={this.sort('verDiario')}>
                          <Translate contentKey="generadorApp.usuario.verDiario">Ver Diario</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cadDiario' ? (
                        <th className="hand" onClick={this.sort('cadDiario')}>
                          <Translate contentKey="generadorApp.usuario.cadDiario">Cad Diario</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ediDiario' ? (
                        <th className="hand" onClick={this.sort('ediDiario')}>
                          <Translate contentKey="generadorApp.usuario.ediDiario">Edi Diario</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'delDiario' ? (
                        <th className="hand" onClick={this.sort('delDiario')}>
                          <Translate contentKey="generadorApp.usuario.delDiario">Del Diario</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'relDiario' ? (
                        <th className="hand" onClick={this.sort('relDiario')}>
                          <Translate contentKey="generadorApp.usuario.relDiario">Rel Diario</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verCategoria' ? (
                        <th className="hand" onClick={this.sort('verCategoria')}>
                          <Translate contentKey="generadorApp.usuario.verCategoria">Ver Categoria</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cadCategoria' ? (
                        <th className="hand" onClick={this.sort('cadCategoria')}>
                          <Translate contentKey="generadorApp.usuario.cadCategoria">Cad Categoria</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ediCategoria' ? (
                        <th className="hand" onClick={this.sort('ediCategoria')}>
                          <Translate contentKey="generadorApp.usuario.ediCategoria">Edi Categoria</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'delCategoria' ? (
                        <th className="hand" onClick={this.sort('delCategoria')}>
                          <Translate contentKey="generadorApp.usuario.delCategoria">Del Categoria</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verEspecialidade' ? (
                        <th className="hand" onClick={this.sort('verEspecialidade')}>
                          <Translate contentKey="generadorApp.usuario.verEspecialidade">Ver Especialidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cadEspecialidade' ? (
                        <th className="hand" onClick={this.sort('cadEspecialidade')}>
                          <Translate contentKey="generadorApp.usuario.cadEspecialidade">Cad Especialidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ediEspecialidade' ? (
                        <th className="hand" onClick={this.sort('ediEspecialidade')}>
                          <Translate contentKey="generadorApp.usuario.ediEspecialidade">Edi Especialidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'delEspecialidade' ? (
                        <th className="hand" onClick={this.sort('delEspecialidade')}>
                          <Translate contentKey="generadorApp.usuario.delEspecialidade">Del Especialidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'relEspecialidade' ? (
                        <th className="hand" onClick={this.sort('relEspecialidade')}>
                          <Translate contentKey="generadorApp.usuario.relEspecialidade">Rel Especialidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verEspecialidadeValor' ? (
                        <th className="hand" onClick={this.sort('verEspecialidadeValor')}>
                          <Translate contentKey="generadorApp.usuario.verEspecialidadeValor">Ver Especialidade Valor</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cadEspecialidadeValor' ? (
                        <th className="hand" onClick={this.sort('cadEspecialidadeValor')}>
                          <Translate contentKey="generadorApp.usuario.cadEspecialidadeValor">Cad Especialidade Valor</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ediEspecialidadeValor' ? (
                        <th className="hand" onClick={this.sort('ediEspecialidadeValor')}>
                          <Translate contentKey="generadorApp.usuario.ediEspecialidadeValor">Edi Especialidade Valor</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'delEspecialidadeValor' ? (
                        <th className="hand" onClick={this.sort('delEspecialidadeValor')}>
                          <Translate contentKey="generadorApp.usuario.delEspecialidadeValor">Del Especialidade Valor</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'relEspecialidadeValor' ? (
                        <th className="hand" onClick={this.sort('relEspecialidadeValor')}>
                          <Translate contentKey="generadorApp.usuario.relEspecialidadeValor">Rel Especialidade Valor</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verOperadora' ? (
                        <th className="hand" onClick={this.sort('verOperadora')}>
                          <Translate contentKey="generadorApp.usuario.verOperadora">Ver Operadora</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cadOperadora' ? (
                        <th className="hand" onClick={this.sort('cadOperadora')}>
                          <Translate contentKey="generadorApp.usuario.cadOperadora">Cad Operadora</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ediOperadora' ? (
                        <th className="hand" onClick={this.sort('ediOperadora')}>
                          <Translate contentKey="generadorApp.usuario.ediOperadora">Edi Operadora</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'delOperadora' ? (
                        <th className="hand" onClick={this.sort('delOperadora')}>
                          <Translate contentKey="generadorApp.usuario.delOperadora">Del Operadora</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verPaciente' ? (
                        <th className="hand" onClick={this.sort('verPaciente')}>
                          <Translate contentKey="generadorApp.usuario.verPaciente">Ver Paciente</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cadPaciente' ? (
                        <th className="hand" onClick={this.sort('cadPaciente')}>
                          <Translate contentKey="generadorApp.usuario.cadPaciente">Cad Paciente</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ediPaciente' ? (
                        <th className="hand" onClick={this.sort('ediPaciente')}>
                          <Translate contentKey="generadorApp.usuario.ediPaciente">Edi Paciente</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'delPaciente' ? (
                        <th className="hand" onClick={this.sort('delPaciente')}>
                          <Translate contentKey="generadorApp.usuario.delPaciente">Del Paciente</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'relPaciente' ? (
                        <th className="hand" onClick={this.sort('relPaciente')}>
                          <Translate contentKey="generadorApp.usuario.relPaciente">Rel Paciente</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verProfissional' ? (
                        <th className="hand" onClick={this.sort('verProfissional')}>
                          <Translate contentKey="generadorApp.usuario.verProfissional">Ver Profissional</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cadProfissional' ? (
                        <th className="hand" onClick={this.sort('cadProfissional')}>
                          <Translate contentKey="generadorApp.usuario.cadProfissional">Cad Profissional</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ediProfissional' ? (
                        <th className="hand" onClick={this.sort('ediProfissional')}>
                          <Translate contentKey="generadorApp.usuario.ediProfissional">Edi Profissional</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'delProfissional' ? (
                        <th className="hand" onClick={this.sort('delProfissional')}>
                          <Translate contentKey="generadorApp.usuario.delProfissional">Del Profissional</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ativProfissional' ? (
                        <th className="hand" onClick={this.sort('ativProfissional')}>
                          <Translate contentKey="generadorApp.usuario.ativProfissional">Ativ Profissional</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'relProfissional' ? (
                        <th className="hand" onClick={this.sort('relProfissional')}>
                          <Translate contentKey="generadorApp.usuario.relProfissional">Rel Profissional</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verPush' ? (
                        <th className="hand" onClick={this.sort('verPush')}>
                          <Translate contentKey="generadorApp.usuario.verPush">Ver Push</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cadPushPaciente' ? (
                        <th className="hand" onClick={this.sort('cadPushPaciente')}>
                          <Translate contentKey="generadorApp.usuario.cadPushPaciente">Cad Push Paciente</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cadPushProfissional' ? (
                        <th className="hand" onClick={this.sort('cadPushProfissional')}>
                          <Translate contentKey="generadorApp.usuario.cadPushProfissional">Cad Push Profissional</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verTermoPaciente' ? (
                        <th className="hand" onClick={this.sort('verTermoPaciente')}>
                          <Translate contentKey="generadorApp.usuario.verTermoPaciente">Ver Termo Paciente</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ediTermoPaciente' ? (
                        <th className="hand" onClick={this.sort('ediTermoPaciente')}>
                          <Translate contentKey="generadorApp.usuario.ediTermoPaciente">Edi Termo Paciente</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verTermoProfissional' ? (
                        <th className="hand" onClick={this.sort('verTermoProfissional')}>
                          <Translate contentKey="generadorApp.usuario.verTermoProfissional">Ver Termo Profissional</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ediTermoProfissional' ? (
                        <th className="hand" onClick={this.sort('ediTermoProfissional')}>
                          <Translate contentKey="generadorApp.usuario.ediTermoProfissional">Edi Termo Profissional</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verOutros' ? (
                        <th className="hand" onClick={this.sort('verOutros')}>
                          <Translate contentKey="generadorApp.usuario.verOutros">Ver Outros</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cadOutros' ? (
                        <th className="hand" onClick={this.sort('cadOutros')}>
                          <Translate contentKey="generadorApp.usuario.cadOutros">Cad Outros</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ediOutros' ? (
                        <th className="hand" onClick={this.sort('ediOutros')}>
                          <Translate contentKey="generadorApp.usuario.ediOutros">Edi Outros</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'delOutros' ? (
                        <th className="hand" onClick={this.sort('delOutros')}>
                          <Translate contentKey="generadorApp.usuario.delOutros">Del Outros</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'relOutros' ? (
                        <th className="hand" onClick={this.sort('relOutros')}>
                          <Translate contentKey="generadorApp.usuario.relOutros">Rel Outros</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verUnidadeEasy' ? (
                        <th className="hand" onClick={this.sort('verUnidadeEasy')}>
                          <Translate contentKey="generadorApp.usuario.verUnidadeEasy">Ver Unidade Easy</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cadUnidadeEasy' ? (
                        <th className="hand" onClick={this.sort('cadUnidadeEasy')}>
                          <Translate contentKey="generadorApp.usuario.cadUnidadeEasy">Cad Unidade Easy</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ediUnidadeEasy' ? (
                        <th className="hand" onClick={this.sort('ediUnidadeEasy')}>
                          <Translate contentKey="generadorApp.usuario.ediUnidadeEasy">Edi Unidade Easy</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'delUnidadeEasy' ? (
                        <th className="hand" onClick={this.sort('delUnidadeEasy')}>
                          <Translate contentKey="generadorApp.usuario.delUnidadeEasy">Del Unidade Easy</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verUsuario' ? (
                        <th className="hand" onClick={this.sort('verUsuario')}>
                          <Translate contentKey="generadorApp.usuario.verUsuario">Ver Usuario</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cadUsuario' ? (
                        <th className="hand" onClick={this.sort('cadUsuario')}>
                          <Translate contentKey="generadorApp.usuario.cadUsuario">Cad Usuario</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ediUsuario' ? (
                        <th className="hand" onClick={this.sort('ediUsuario')}>
                          <Translate contentKey="generadorApp.usuario.ediUsuario">Edi Usuario</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'delUsuario' ? (
                        <th className="hand" onClick={this.sort('delUsuario')}>
                          <Translate contentKey="generadorApp.usuario.delUsuario">Del Usuario</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verPtaResultado' ? (
                        <th className="hand" onClick={this.sort('verPtaResultado')}>
                          <Translate contentKey="generadorApp.usuario.verPtaResultado">Ver Pta Resultado</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cadPtaResultado' ? (
                        <th className="hand" onClick={this.sort('cadPtaResultado')}>
                          <Translate contentKey="generadorApp.usuario.cadPtaResultado">Cad Pta Resultado</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'delPtaResultado' ? (
                        <th className="hand" onClick={this.sort('delPtaResultado')}>
                          <Translate contentKey="generadorApp.usuario.delPtaResultado">Del Pta Resultado</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verPtaAtividade' ? (
                        <th className="hand" onClick={this.sort('verPtaAtividade')}>
                          <Translate contentKey="generadorApp.usuario.verPtaAtividade">Ver Pta Atividade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cadPtaAtividade' ? (
                        <th className="hand" onClick={this.sort('cadPtaAtividade')}>
                          <Translate contentKey="generadorApp.usuario.cadPtaAtividade">Cad Pta Atividade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'delPtaAtividade' ? (
                        <th className="hand" onClick={this.sort('delPtaAtividade')}>
                          <Translate contentKey="generadorApp.usuario.delPtaAtividade">Del Pta Atividade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'permissaoUsuario' ? (
                        <th className="hand" onClick={this.sort('permissaoUsuario')}>
                          <Translate contentKey="generadorApp.usuario.permissaoUsuario">Permissao Usuario</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verProntuario' ? (
                        <th className="hand" onClick={this.sort('verProntuario')}>
                          <Translate contentKey="generadorApp.usuario.verProntuario">Ver Prontuario</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cadProntuario' ? (
                        <th className="hand" onClick={this.sort('cadProntuario')}>
                          <Translate contentKey="generadorApp.usuario.cadProntuario">Cad Prontuario</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ediProntuario' ? (
                        <th className="hand" onClick={this.sort('ediProntuario')}>
                          <Translate contentKey="generadorApp.usuario.ediProntuario">Edi Prontuario</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'delProntuario' ? (
                        <th className="hand" onClick={this.sort('delProntuario')}>
                          <Translate contentKey="generadorApp.usuario.delProntuario">Del Prontuario</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'delProntuarioFoto' ? (
                        <th className="hand" onClick={this.sort('delProntuarioFoto')}>
                          <Translate contentKey="generadorApp.usuario.delProntuarioFoto">Del Prontuario Foto</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'valoresFinanceiro' ? (
                        <th className="hand" onClick={this.sort('valoresFinanceiro')}>
                          <Translate contentKey="generadorApp.usuario.valoresFinanceiro">Valores Financeiro</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'autorizacaoValorFinanceiro' ? (
                        <th className="hand" onClick={this.sort('autorizacaoValorFinanceiro')}>
                          <Translate contentKey="generadorApp.usuario.autorizacaoValorFinanceiro">Autorizacao Valor Financeiro</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'confirmarPagamentoFinanceiro' ? (
                        <th className="hand" onClick={this.sort('confirmarPagamentoFinanceiro')}>
                          <Translate contentKey="generadorApp.usuario.confirmarPagamentoFinanceiro">
                            Confirmar Pagamento Financeiro
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'gerenciarSorteios' ? (
                        <th className="hand" onClick={this.sort('gerenciarSorteios')}>
                          <Translate contentKey="generadorApp.usuario.gerenciarSorteios">Gerenciar Sorteios</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'envioRecusa' ? (
                        <th className="hand" onClick={this.sort('envioRecusa')}>
                          <Translate contentKey="generadorApp.usuario.envioRecusa">Envio Recusa</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'envioIntercorrencia' ? (
                        <th className="hand" onClick={this.sort('envioIntercorrencia')}>
                          <Translate contentKey="generadorApp.usuario.envioIntercorrencia">Envio Intercorrencia</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'envioCancelamento' ? (
                        <th className="hand" onClick={this.sort('envioCancelamento')}>
                          <Translate contentKey="generadorApp.usuario.envioCancelamento">Envio Cancelamento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'envioAvaliacao' ? (
                        <th className="hand" onClick={this.sort('envioAvaliacao')}>
                          <Translate contentKey="generadorApp.usuario.envioAvaliacao">Envio Avaliacao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'envioPedido' ? (
                        <th className="hand" onClick={this.sort('envioPedido')}>
                          <Translate contentKey="generadorApp.usuario.envioPedido">Envio Pedido</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'alertaAtendimento' ? (
                        <th className="hand" onClick={this.sort('alertaAtendimento')}>
                          <Translate contentKey="generadorApp.usuario.alertaAtendimento">Alerta Atendimento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ativo' ? (
                        <th className="hand" onClick={this.sort('ativo')}>
                          <Translate contentKey="generadorApp.usuario.ativo">Ativo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'envioGlosado' ? (
                        <th className="hand" onClick={this.sort('envioGlosado')}>
                          <Translate contentKey="generadorApp.usuario.envioGlosado">Envio Glosado</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'emergencia' ? (
                        <th className="hand" onClick={this.sort('emergencia')}>
                          <Translate contentKey="generadorApp.usuario.emergencia">Emergencia</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'token' ? (
                        <th className="hand" onClick={this.sort('token')}>
                          <Translate contentKey="generadorApp.usuario.token">Token</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'editAtendimento' ? (
                        <th className="hand" onClick={this.sort('editAtendimento')}>
                          <Translate contentKey="generadorApp.usuario.editAtendimento">Edit Atendimento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ouvirLigacao' ? (
                        <th className="hand" onClick={this.sort('ouvirLigacao')}>
                          <Translate contentKey="generadorApp.usuario.ouvirLigacao">Ouvir Ligacao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verPainelIndicadores' ? (
                        <th className="hand" onClick={this.sort('verPainelIndicadores')}>
                          <Translate contentKey="generadorApp.usuario.verPainelIndicadores">Ver Painel Indicadores</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'prorrogarPad' ? (
                        <th className="hand" onClick={this.sort('prorrogarPad')}>
                          <Translate contentKey="generadorApp.usuario.prorrogarPad">Prorrogar Pad</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cancelarAtendMassa' ? (
                        <th className="hand" onClick={this.sort('cancelarAtendMassa')}>
                          <Translate contentKey="generadorApp.usuario.cancelarAtendMassa">Cancelar Atend Massa</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cadMatMed' ? (
                        <th className="hand" onClick={this.sort('cadMatMed')}>
                          <Translate contentKey="generadorApp.usuario.cadMatMed">Cad Mat Med</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ediMatMed' ? (
                        <th className="hand" onClick={this.sort('ediMatMed')}>
                          <Translate contentKey="generadorApp.usuario.ediMatMed">Edi Mat Med</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'delMatMed' ? (
                        <th className="hand" onClick={this.sort('delMatMed')}>
                          <Translate contentKey="generadorApp.usuario.delMatMed">Del Mat Med</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verColPta' ? (
                        <th className="hand" onClick={this.sort('verColPta')}>
                          <Translate contentKey="generadorApp.usuario.verColPta">Ver Col Pta</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verColFoto' ? (
                        <th className="hand" onClick={this.sort('verColFoto')}>
                          <Translate contentKey="generadorApp.usuario.verColFoto">Ver Col Foto</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verColLc' ? (
                        <th className="hand" onClick={this.sort('verColLc')}>
                          <Translate contentKey="generadorApp.usuario.verColLc">Ver Col Lc</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verAtendCancelado' ? (
                        <th className="hand" onClick={this.sort('verAtendCancelado')}>
                          <Translate contentKey="generadorApp.usuario.verAtendCancelado">Ver Atend Cancelado</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verAtendAgConfirmacao' ? (
                        <th className="hand" onClick={this.sort('verAtendAgConfirmacao')}>
                          <Translate contentKey="generadorApp.usuario.verAtendAgConfirmacao">Ver Atend Ag Confirmacao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ediGeoLocalizacaoAtendimento' ? (
                        <th className="hand" onClick={this.sort('ediGeoLocalizacaoAtendimento')}>
                          <Translate contentKey="generadorApp.usuario.ediGeoLocalizacaoAtendimento">
                            Edi Geo Localizacao Atendimento
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'copiarEvolucao' ? (
                        <th className="hand" onClick={this.sort('copiarEvolucao')}>
                          <Translate contentKey="generadorApp.usuario.copiarEvolucao">Copiar Evolucao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'copiarNomeProf' ? (
                        <th className="hand" onClick={this.sort('copiarNomeProf')}>
                          <Translate contentKey="generadorApp.usuario.copiarNomeProf">Copiar Nome Prof</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'copiarRegistroProf' ? (
                        <th className="hand" onClick={this.sort('copiarRegistroProf')}>
                          <Translate contentKey="generadorApp.usuario.copiarRegistroProf">Copiar Registro Prof</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idAreaAtuacao' ? (
                        <th className="hand" onClick={this.sort('idAreaAtuacao')}>
                          <Translate contentKey="generadorApp.usuario.idAreaAtuacao">Id Area Atuacao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'unidade' ? (
                        <th>
                          <Translate contentKey="generadorApp.usuario.unidade">Unidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'tipoUsuario' ? (
                        <th>
                          <Translate contentKey="generadorApp.usuario.tipoUsuario">Tipo Usuario</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {usuarioList.map((usuario, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${usuario.id}`} color="link" size="sm">
                            {usuario.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'idOperadora' ? <td>{usuario.idOperadora}</td> : null}

                        {this.state.baseFilters !== 'senha' ? <td>{usuario.senha}</td> : null}

                        {this.state.baseFilters !== 'nome' ? <td>{usuario.nome}</td> : null}

                        {this.state.baseFilters !== 'email' ? <td>{usuario.email}</td> : null}

                        {this.state.baseFilters !== 'telefone' ? <td>{usuario.telefone}</td> : null}

                        {this.state.baseFilters !== 'celular' ? <td>{usuario.celular}</td> : null}

                        {this.state.baseFilters !== 'cpf' ? <td>{usuario.cpf}</td> : null}

                        {this.state.baseFilters !== 'rg' ? <td>{usuario.rg}</td> : null}

                        {this.state.baseFilters !== 'sexo' ? <td>{usuario.sexo}</td> : null}

                        {this.state.baseFilters !== 'nascimento' ? (
                          <td>
                            <TextFormat type="date" value={usuario.nascimento} format={APP_LOCAL_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'verAtendimento' ? <td>{usuario.verAtendimento ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'cadAtendimento' ? <td>{usuario.cadAtendimento ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'ediAtendimento' ? <td>{usuario.ediAtendimento ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'baixaManualAtendimento' ? (
                          <td>{usuario.baixaManualAtendimento ? 'true' : 'false'}</td>
                        ) : null}

                        {this.state.baseFilters !== 'delAtendimento' ? <td>{usuario.delAtendimento ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'relAtendimento' ? <td>{usuario.relAtendimento ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'verPad' ? <td>{usuario.verPad ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'cadPad' ? <td>{usuario.cadPad ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'ediPad' ? <td>{usuario.ediPad ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'delPad' ? <td>{usuario.delPad ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'relPad' ? <td>{usuario.relPad ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'verDiario' ? <td>{usuario.verDiario ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'cadDiario' ? <td>{usuario.cadDiario ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'ediDiario' ? <td>{usuario.ediDiario ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'delDiario' ? <td>{usuario.delDiario ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'relDiario' ? <td>{usuario.relDiario ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'verCategoria' ? <td>{usuario.verCategoria ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'cadCategoria' ? <td>{usuario.cadCategoria ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'ediCategoria' ? <td>{usuario.ediCategoria ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'delCategoria' ? <td>{usuario.delCategoria ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'verEspecialidade' ? <td>{usuario.verEspecialidade ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'cadEspecialidade' ? <td>{usuario.cadEspecialidade ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'ediEspecialidade' ? <td>{usuario.ediEspecialidade ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'delEspecialidade' ? <td>{usuario.delEspecialidade ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'relEspecialidade' ? <td>{usuario.relEspecialidade ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'verEspecialidadeValor' ? (
                          <td>{usuario.verEspecialidadeValor ? 'true' : 'false'}</td>
                        ) : null}

                        {this.state.baseFilters !== 'cadEspecialidadeValor' ? (
                          <td>{usuario.cadEspecialidadeValor ? 'true' : 'false'}</td>
                        ) : null}

                        {this.state.baseFilters !== 'ediEspecialidadeValor' ? (
                          <td>{usuario.ediEspecialidadeValor ? 'true' : 'false'}</td>
                        ) : null}

                        {this.state.baseFilters !== 'delEspecialidadeValor' ? (
                          <td>{usuario.delEspecialidadeValor ? 'true' : 'false'}</td>
                        ) : null}

                        {this.state.baseFilters !== 'relEspecialidadeValor' ? (
                          <td>{usuario.relEspecialidadeValor ? 'true' : 'false'}</td>
                        ) : null}

                        {this.state.baseFilters !== 'verOperadora' ? <td>{usuario.verOperadora ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'cadOperadora' ? <td>{usuario.cadOperadora ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'ediOperadora' ? <td>{usuario.ediOperadora ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'delOperadora' ? <td>{usuario.delOperadora ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'verPaciente' ? <td>{usuario.verPaciente ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'cadPaciente' ? <td>{usuario.cadPaciente ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'ediPaciente' ? <td>{usuario.ediPaciente ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'delPaciente' ? <td>{usuario.delPaciente ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'relPaciente' ? <td>{usuario.relPaciente ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'verProfissional' ? <td>{usuario.verProfissional ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'cadProfissional' ? <td>{usuario.cadProfissional ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'ediProfissional' ? <td>{usuario.ediProfissional ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'delProfissional' ? <td>{usuario.delProfissional ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'ativProfissional' ? <td>{usuario.ativProfissional ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'relProfissional' ? <td>{usuario.relProfissional ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'verPush' ? <td>{usuario.verPush ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'cadPushPaciente' ? <td>{usuario.cadPushPaciente ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'cadPushProfissional' ? (
                          <td>{usuario.cadPushProfissional ? 'true' : 'false'}</td>
                        ) : null}

                        {this.state.baseFilters !== 'verTermoPaciente' ? <td>{usuario.verTermoPaciente ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'ediTermoPaciente' ? <td>{usuario.ediTermoPaciente ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'verTermoProfissional' ? (
                          <td>{usuario.verTermoProfissional ? 'true' : 'false'}</td>
                        ) : null}

                        {this.state.baseFilters !== 'ediTermoProfissional' ? (
                          <td>{usuario.ediTermoProfissional ? 'true' : 'false'}</td>
                        ) : null}

                        {this.state.baseFilters !== 'verOutros' ? <td>{usuario.verOutros ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'cadOutros' ? <td>{usuario.cadOutros ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'ediOutros' ? <td>{usuario.ediOutros ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'delOutros' ? <td>{usuario.delOutros ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'relOutros' ? <td>{usuario.relOutros ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'verUnidadeEasy' ? <td>{usuario.verUnidadeEasy ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'cadUnidadeEasy' ? <td>{usuario.cadUnidadeEasy ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'ediUnidadeEasy' ? <td>{usuario.ediUnidadeEasy ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'delUnidadeEasy' ? <td>{usuario.delUnidadeEasy ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'verUsuario' ? <td>{usuario.verUsuario ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'cadUsuario' ? <td>{usuario.cadUsuario ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'ediUsuario' ? <td>{usuario.ediUsuario ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'delUsuario' ? <td>{usuario.delUsuario ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'verPtaResultado' ? <td>{usuario.verPtaResultado ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'cadPtaResultado' ? <td>{usuario.cadPtaResultado ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'delPtaResultado' ? <td>{usuario.delPtaResultado ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'verPtaAtividade' ? <td>{usuario.verPtaAtividade ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'cadPtaAtividade' ? <td>{usuario.cadPtaAtividade ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'delPtaAtividade' ? <td>{usuario.delPtaAtividade ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'permissaoUsuario' ? <td>{usuario.permissaoUsuario ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'verProntuario' ? <td>{usuario.verProntuario ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'cadProntuario' ? <td>{usuario.cadProntuario ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'ediProntuario' ? <td>{usuario.ediProntuario ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'delProntuario' ? <td>{usuario.delProntuario ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'delProntuarioFoto' ? <td>{usuario.delProntuarioFoto ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'valoresFinanceiro' ? <td>{usuario.valoresFinanceiro ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'autorizacaoValorFinanceiro' ? (
                          <td>{usuario.autorizacaoValorFinanceiro ? 'true' : 'false'}</td>
                        ) : null}

                        {this.state.baseFilters !== 'confirmarPagamentoFinanceiro' ? (
                          <td>{usuario.confirmarPagamentoFinanceiro ? 'true' : 'false'}</td>
                        ) : null}

                        {this.state.baseFilters !== 'gerenciarSorteios' ? <td>{usuario.gerenciarSorteios ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'envioRecusa' ? <td>{usuario.envioRecusa ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'envioIntercorrencia' ? (
                          <td>{usuario.envioIntercorrencia ? 'true' : 'false'}</td>
                        ) : null}

                        {this.state.baseFilters !== 'envioCancelamento' ? <td>{usuario.envioCancelamento ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'envioAvaliacao' ? <td>{usuario.envioAvaliacao ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'envioPedido' ? <td>{usuario.envioPedido ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'alertaAtendimento' ? <td>{usuario.alertaAtendimento ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'ativo' ? <td>{usuario.ativo ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'envioGlosado' ? <td>{usuario.envioGlosado ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'emergencia' ? <td>{usuario.emergencia ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'token' ? <td>{usuario.token ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'editAtendimento' ? <td>{usuario.editAtendimento ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'ouvirLigacao' ? <td>{usuario.ouvirLigacao ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'verPainelIndicadores' ? (
                          <td>{usuario.verPainelIndicadores ? 'true' : 'false'}</td>
                        ) : null}

                        {this.state.baseFilters !== 'prorrogarPad' ? <td>{usuario.prorrogarPad ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'cancelarAtendMassa' ? <td>{usuario.cancelarAtendMassa ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'cadMatMed' ? <td>{usuario.cadMatMed ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'ediMatMed' ? <td>{usuario.ediMatMed ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'delMatMed' ? <td>{usuario.delMatMed ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'verColPta' ? <td>{usuario.verColPta ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'verColFoto' ? <td>{usuario.verColFoto ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'verColLc' ? <td>{usuario.verColLc ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'verAtendCancelado' ? <td>{usuario.verAtendCancelado ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'verAtendAgConfirmacao' ? (
                          <td>{usuario.verAtendAgConfirmacao ? 'true' : 'false'}</td>
                        ) : null}

                        {this.state.baseFilters !== 'ediGeoLocalizacaoAtendimento' ? (
                          <td>{usuario.ediGeoLocalizacaoAtendimento ? 'true' : 'false'}</td>
                        ) : null}

                        {this.state.baseFilters !== 'copiarEvolucao' ? <td>{usuario.copiarEvolucao ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'copiarNomeProf' ? <td>{usuario.copiarNomeProf ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'copiarRegistroProf' ? <td>{usuario.copiarRegistroProf ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'idAreaAtuacao' ? <td>{usuario.idAreaAtuacao}</td> : null}

                        {this.state.baseFilters !== 'unidade' ? (
                          <td>
                            {usuario.unidade ? <Link to={`unidade-easy/${usuario.unidade.id}`}>{usuario.unidade.razaoSocial}</Link> : ''}
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'tipoUsuario' ? (
                          <td>
                            {usuario.tipoUsuario ? <Link to={`tipo-usuario/${usuario.tipoUsuario.id}`}>{usuario.tipoUsuario.id}</Link> : ''}
                          </td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${usuario.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${usuario.id}/edit?${this.getFiltersURL()}`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${usuario.id}/delete?${this.getFiltersURL()}`} color="danger" size="sm">
                              <FontAwesomeIcon icon="trash" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.delete">Delete</Translate>
                              </span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="alert alert-warning">
                  <Translate contentKey="generadorApp.usuario.home.notFound">No Usuarios found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={usuarioList && usuarioList.length > 0 ? '' : 'd-none'}>
              <Row className="justify-content-center">
                <JhiItemCount page={this.state.activePage} total={totalItems} itemsPerPage={this.state.itemsPerPage} i18nEnabled />
              </Row>
              <Row className="justify-content-center">
                <JhiPagination
                  activePage={this.state.activePage}
                  onSelect={this.handlePagination}
                  maxButtons={5}
                  itemsPerPage={this.state.itemsPerPage}
                  totalItems={this.props.totalItems}
                />
              </Row>
            </div>
          </PanelFooter>
        </Panel>
      </div>
    );
  }
}

const mapStateToProps = ({ usuario, ...storeState }: IRootState) => ({
  unidadeEasies: storeState.unidadeEasy.entities,
  tipoUsuarios: storeState.tipoUsuario.entities,
  usuarioList: usuario.entities,
  totalItems: usuario.totalItems
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getTipoUsuarios,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Usuario);
