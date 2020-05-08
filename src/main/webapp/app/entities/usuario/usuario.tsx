/* eslint complexity: ["error", 100] */
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
        envioCidSemPta: '',
        envioAnaliseResultadoEsperado: '',
        envioDescumprimento: '',
        envioMelhoraTempo: '',
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
      'envioCidSemPta=' +
      this.state.envioCidSemPta +
      '&' +
      'envioAnaliseResultadoEsperado=' +
      this.state.envioAnaliseResultadoEsperado +
      '&' +
      'envioDescumprimento=' +
      this.state.envioDescumprimento +
      '&' +
      'envioMelhoraTempo=' +
      this.state.envioMelhoraTempo +
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
      envioCidSemPta,
      envioAnaliseResultadoEsperado,
      envioDescumprimento,
      envioMelhoraTempo,
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
      envioCidSemPta,
      envioAnaliseResultadoEsperado,
      envioDescumprimento,
      envioMelhoraTempo,
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
                            <Label id="verAtendimentoLabel" for="usuario-verAtendimento">
                              <Translate contentKey="generadorApp.usuario.verAtendimento">Ver Atendimento</Translate>
                            </Label>
                            <AvInput type="string" name="verAtendimento" id="usuario-verAtendimento" value={this.state.verAtendimento} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadAtendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadAtendimentoLabel" for="usuario-cadAtendimento">
                              <Translate contentKey="generadorApp.usuario.cadAtendimento">Cad Atendimento</Translate>
                            </Label>
                            <AvInput type="string" name="cadAtendimento" id="usuario-cadAtendimento" value={this.state.cadAtendimento} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediAtendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediAtendimentoLabel" for="usuario-ediAtendimento">
                              <Translate contentKey="generadorApp.usuario.ediAtendimento">Edi Atendimento</Translate>
                            </Label>
                            <AvInput type="string" name="ediAtendimento" id="usuario-ediAtendimento" value={this.state.ediAtendimento} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'baixaManualAtendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="baixaManualAtendimentoLabel" for="usuario-baixaManualAtendimento">
                              <Translate contentKey="generadorApp.usuario.baixaManualAtendimento">Baixa Manual Atendimento</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="baixaManualAtendimento"
                              id="usuario-baixaManualAtendimento"
                              value={this.state.baixaManualAtendimento}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delAtendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delAtendimentoLabel" for="usuario-delAtendimento">
                              <Translate contentKey="generadorApp.usuario.delAtendimento">Del Atendimento</Translate>
                            </Label>
                            <AvInput type="string" name="delAtendimento" id="usuario-delAtendimento" value={this.state.delAtendimento} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'relAtendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="relAtendimentoLabel" for="usuario-relAtendimento">
                              <Translate contentKey="generadorApp.usuario.relAtendimento">Rel Atendimento</Translate>
                            </Label>
                            <AvInput type="string" name="relAtendimento" id="usuario-relAtendimento" value={this.state.relAtendimento} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verPad' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verPadLabel" for="usuario-verPad">
                              <Translate contentKey="generadorApp.usuario.verPad">Ver Pad</Translate>
                            </Label>
                            <AvInput type="string" name="verPad" id="usuario-verPad" value={this.state.verPad} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadPad' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadPadLabel" for="usuario-cadPad">
                              <Translate contentKey="generadorApp.usuario.cadPad">Cad Pad</Translate>
                            </Label>
                            <AvInput type="string" name="cadPad" id="usuario-cadPad" value={this.state.cadPad} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediPad' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediPadLabel" for="usuario-ediPad">
                              <Translate contentKey="generadorApp.usuario.ediPad">Edi Pad</Translate>
                            </Label>
                            <AvInput type="string" name="ediPad" id="usuario-ediPad" value={this.state.ediPad} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delPad' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delPadLabel" for="usuario-delPad">
                              <Translate contentKey="generadorApp.usuario.delPad">Del Pad</Translate>
                            </Label>
                            <AvInput type="string" name="delPad" id="usuario-delPad" value={this.state.delPad} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'relPad' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="relPadLabel" for="usuario-relPad">
                              <Translate contentKey="generadorApp.usuario.relPad">Rel Pad</Translate>
                            </Label>
                            <AvInput type="string" name="relPad" id="usuario-relPad" value={this.state.relPad} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verDiario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verDiarioLabel" for="usuario-verDiario">
                              <Translate contentKey="generadorApp.usuario.verDiario">Ver Diario</Translate>
                            </Label>
                            <AvInput type="string" name="verDiario" id="usuario-verDiario" value={this.state.verDiario} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadDiario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadDiarioLabel" for="usuario-cadDiario">
                              <Translate contentKey="generadorApp.usuario.cadDiario">Cad Diario</Translate>
                            </Label>
                            <AvInput type="string" name="cadDiario" id="usuario-cadDiario" value={this.state.cadDiario} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediDiario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediDiarioLabel" for="usuario-ediDiario">
                              <Translate contentKey="generadorApp.usuario.ediDiario">Edi Diario</Translate>
                            </Label>
                            <AvInput type="string" name="ediDiario" id="usuario-ediDiario" value={this.state.ediDiario} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delDiario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delDiarioLabel" for="usuario-delDiario">
                              <Translate contentKey="generadorApp.usuario.delDiario">Del Diario</Translate>
                            </Label>
                            <AvInput type="string" name="delDiario" id="usuario-delDiario" value={this.state.delDiario} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'relDiario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="relDiarioLabel" for="usuario-relDiario">
                              <Translate contentKey="generadorApp.usuario.relDiario">Rel Diario</Translate>
                            </Label>
                            <AvInput type="string" name="relDiario" id="usuario-relDiario" value={this.state.relDiario} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verCategoria' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verCategoriaLabel" for="usuario-verCategoria">
                              <Translate contentKey="generadorApp.usuario.verCategoria">Ver Categoria</Translate>
                            </Label>
                            <AvInput type="string" name="verCategoria" id="usuario-verCategoria" value={this.state.verCategoria} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadCategoria' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadCategoriaLabel" for="usuario-cadCategoria">
                              <Translate contentKey="generadorApp.usuario.cadCategoria">Cad Categoria</Translate>
                            </Label>
                            <AvInput type="string" name="cadCategoria" id="usuario-cadCategoria" value={this.state.cadCategoria} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediCategoria' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediCategoriaLabel" for="usuario-ediCategoria">
                              <Translate contentKey="generadorApp.usuario.ediCategoria">Edi Categoria</Translate>
                            </Label>
                            <AvInput type="string" name="ediCategoria" id="usuario-ediCategoria" value={this.state.ediCategoria} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delCategoria' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delCategoriaLabel" for="usuario-delCategoria">
                              <Translate contentKey="generadorApp.usuario.delCategoria">Del Categoria</Translate>
                            </Label>
                            <AvInput type="string" name="delCategoria" id="usuario-delCategoria" value={this.state.delCategoria} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verEspecialidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verEspecialidadeLabel" for="usuario-verEspecialidade">
                              <Translate contentKey="generadorApp.usuario.verEspecialidade">Ver Especialidade</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="verEspecialidade"
                              id="usuario-verEspecialidade"
                              value={this.state.verEspecialidade}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadEspecialidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadEspecialidadeLabel" for="usuario-cadEspecialidade">
                              <Translate contentKey="generadorApp.usuario.cadEspecialidade">Cad Especialidade</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="cadEspecialidade"
                              id="usuario-cadEspecialidade"
                              value={this.state.cadEspecialidade}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediEspecialidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediEspecialidadeLabel" for="usuario-ediEspecialidade">
                              <Translate contentKey="generadorApp.usuario.ediEspecialidade">Edi Especialidade</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="ediEspecialidade"
                              id="usuario-ediEspecialidade"
                              value={this.state.ediEspecialidade}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delEspecialidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delEspecialidadeLabel" for="usuario-delEspecialidade">
                              <Translate contentKey="generadorApp.usuario.delEspecialidade">Del Especialidade</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="delEspecialidade"
                              id="usuario-delEspecialidade"
                              value={this.state.delEspecialidade}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'relEspecialidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="relEspecialidadeLabel" for="usuario-relEspecialidade">
                              <Translate contentKey="generadorApp.usuario.relEspecialidade">Rel Especialidade</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="relEspecialidade"
                              id="usuario-relEspecialidade"
                              value={this.state.relEspecialidade}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verEspecialidadeValor' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verEspecialidadeValorLabel" for="usuario-verEspecialidadeValor">
                              <Translate contentKey="generadorApp.usuario.verEspecialidadeValor">Ver Especialidade Valor</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="verEspecialidadeValor"
                              id="usuario-verEspecialidadeValor"
                              value={this.state.verEspecialidadeValor}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadEspecialidadeValor' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadEspecialidadeValorLabel" for="usuario-cadEspecialidadeValor">
                              <Translate contentKey="generadorApp.usuario.cadEspecialidadeValor">Cad Especialidade Valor</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="cadEspecialidadeValor"
                              id="usuario-cadEspecialidadeValor"
                              value={this.state.cadEspecialidadeValor}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediEspecialidadeValor' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediEspecialidadeValorLabel" for="usuario-ediEspecialidadeValor">
                              <Translate contentKey="generadorApp.usuario.ediEspecialidadeValor">Edi Especialidade Valor</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="ediEspecialidadeValor"
                              id="usuario-ediEspecialidadeValor"
                              value={this.state.ediEspecialidadeValor}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delEspecialidadeValor' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delEspecialidadeValorLabel" for="usuario-delEspecialidadeValor">
                              <Translate contentKey="generadorApp.usuario.delEspecialidadeValor">Del Especialidade Valor</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="delEspecialidadeValor"
                              id="usuario-delEspecialidadeValor"
                              value={this.state.delEspecialidadeValor}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'relEspecialidadeValor' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="relEspecialidadeValorLabel" for="usuario-relEspecialidadeValor">
                              <Translate contentKey="generadorApp.usuario.relEspecialidadeValor">Rel Especialidade Valor</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="relEspecialidadeValor"
                              id="usuario-relEspecialidadeValor"
                              value={this.state.relEspecialidadeValor}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verOperadora' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verOperadoraLabel" for="usuario-verOperadora">
                              <Translate contentKey="generadorApp.usuario.verOperadora">Ver Operadora</Translate>
                            </Label>
                            <AvInput type="string" name="verOperadora" id="usuario-verOperadora" value={this.state.verOperadora} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadOperadora' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadOperadoraLabel" for="usuario-cadOperadora">
                              <Translate contentKey="generadorApp.usuario.cadOperadora">Cad Operadora</Translate>
                            </Label>
                            <AvInput type="string" name="cadOperadora" id="usuario-cadOperadora" value={this.state.cadOperadora} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediOperadora' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediOperadoraLabel" for="usuario-ediOperadora">
                              <Translate contentKey="generadorApp.usuario.ediOperadora">Edi Operadora</Translate>
                            </Label>
                            <AvInput type="string" name="ediOperadora" id="usuario-ediOperadora" value={this.state.ediOperadora} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delOperadora' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delOperadoraLabel" for="usuario-delOperadora">
                              <Translate contentKey="generadorApp.usuario.delOperadora">Del Operadora</Translate>
                            </Label>
                            <AvInput type="string" name="delOperadora" id="usuario-delOperadora" value={this.state.delOperadora} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verPaciente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verPacienteLabel" for="usuario-verPaciente">
                              <Translate contentKey="generadorApp.usuario.verPaciente">Ver Paciente</Translate>
                            </Label>
                            <AvInput type="string" name="verPaciente" id="usuario-verPaciente" value={this.state.verPaciente} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadPaciente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadPacienteLabel" for="usuario-cadPaciente">
                              <Translate contentKey="generadorApp.usuario.cadPaciente">Cad Paciente</Translate>
                            </Label>
                            <AvInput type="string" name="cadPaciente" id="usuario-cadPaciente" value={this.state.cadPaciente} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediPaciente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediPacienteLabel" for="usuario-ediPaciente">
                              <Translate contentKey="generadorApp.usuario.ediPaciente">Edi Paciente</Translate>
                            </Label>
                            <AvInput type="string" name="ediPaciente" id="usuario-ediPaciente" value={this.state.ediPaciente} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delPaciente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delPacienteLabel" for="usuario-delPaciente">
                              <Translate contentKey="generadorApp.usuario.delPaciente">Del Paciente</Translate>
                            </Label>
                            <AvInput type="string" name="delPaciente" id="usuario-delPaciente" value={this.state.delPaciente} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'relPaciente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="relPacienteLabel" for="usuario-relPaciente">
                              <Translate contentKey="generadorApp.usuario.relPaciente">Rel Paciente</Translate>
                            </Label>
                            <AvInput type="string" name="relPaciente" id="usuario-relPaciente" value={this.state.relPaciente} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verProfissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verProfissionalLabel" for="usuario-verProfissional">
                              <Translate contentKey="generadorApp.usuario.verProfissional">Ver Profissional</Translate>
                            </Label>
                            <AvInput type="string" name="verProfissional" id="usuario-verProfissional" value={this.state.verProfissional} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadProfissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadProfissionalLabel" for="usuario-cadProfissional">
                              <Translate contentKey="generadorApp.usuario.cadProfissional">Cad Profissional</Translate>
                            </Label>
                            <AvInput type="string" name="cadProfissional" id="usuario-cadProfissional" value={this.state.cadProfissional} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediProfissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediProfissionalLabel" for="usuario-ediProfissional">
                              <Translate contentKey="generadorApp.usuario.ediProfissional">Edi Profissional</Translate>
                            </Label>
                            <AvInput type="string" name="ediProfissional" id="usuario-ediProfissional" value={this.state.ediProfissional} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delProfissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delProfissionalLabel" for="usuario-delProfissional">
                              <Translate contentKey="generadorApp.usuario.delProfissional">Del Profissional</Translate>
                            </Label>
                            <AvInput type="string" name="delProfissional" id="usuario-delProfissional" value={this.state.delProfissional} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ativProfissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ativProfissionalLabel" for="usuario-ativProfissional">
                              <Translate contentKey="generadorApp.usuario.ativProfissional">Ativ Profissional</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="ativProfissional"
                              id="usuario-ativProfissional"
                              value={this.state.ativProfissional}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'relProfissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="relProfissionalLabel" for="usuario-relProfissional">
                              <Translate contentKey="generadorApp.usuario.relProfissional">Rel Profissional</Translate>
                            </Label>
                            <AvInput type="string" name="relProfissional" id="usuario-relProfissional" value={this.state.relProfissional} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verPush' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verPushLabel" for="usuario-verPush">
                              <Translate contentKey="generadorApp.usuario.verPush">Ver Push</Translate>
                            </Label>
                            <AvInput type="string" name="verPush" id="usuario-verPush" value={this.state.verPush} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadPushPaciente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadPushPacienteLabel" for="usuario-cadPushPaciente">
                              <Translate contentKey="generadorApp.usuario.cadPushPaciente">Cad Push Paciente</Translate>
                            </Label>
                            <AvInput type="string" name="cadPushPaciente" id="usuario-cadPushPaciente" value={this.state.cadPushPaciente} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadPushProfissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadPushProfissionalLabel" for="usuario-cadPushProfissional">
                              <Translate contentKey="generadorApp.usuario.cadPushProfissional">Cad Push Profissional</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="cadPushProfissional"
                              id="usuario-cadPushProfissional"
                              value={this.state.cadPushProfissional}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verTermoPaciente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verTermoPacienteLabel" for="usuario-verTermoPaciente">
                              <Translate contentKey="generadorApp.usuario.verTermoPaciente">Ver Termo Paciente</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="verTermoPaciente"
                              id="usuario-verTermoPaciente"
                              value={this.state.verTermoPaciente}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediTermoPaciente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediTermoPacienteLabel" for="usuario-ediTermoPaciente">
                              <Translate contentKey="generadorApp.usuario.ediTermoPaciente">Edi Termo Paciente</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="ediTermoPaciente"
                              id="usuario-ediTermoPaciente"
                              value={this.state.ediTermoPaciente}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verTermoProfissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verTermoProfissionalLabel" for="usuario-verTermoProfissional">
                              <Translate contentKey="generadorApp.usuario.verTermoProfissional">Ver Termo Profissional</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="verTermoProfissional"
                              id="usuario-verTermoProfissional"
                              value={this.state.verTermoProfissional}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediTermoProfissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediTermoProfissionalLabel" for="usuario-ediTermoProfissional">
                              <Translate contentKey="generadorApp.usuario.ediTermoProfissional">Edi Termo Profissional</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="ediTermoProfissional"
                              id="usuario-ediTermoProfissional"
                              value={this.state.ediTermoProfissional}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verOutros' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verOutrosLabel" for="usuario-verOutros">
                              <Translate contentKey="generadorApp.usuario.verOutros">Ver Outros</Translate>
                            </Label>
                            <AvInput type="string" name="verOutros" id="usuario-verOutros" value={this.state.verOutros} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadOutros' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadOutrosLabel" for="usuario-cadOutros">
                              <Translate contentKey="generadorApp.usuario.cadOutros">Cad Outros</Translate>
                            </Label>
                            <AvInput type="string" name="cadOutros" id="usuario-cadOutros" value={this.state.cadOutros} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediOutros' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediOutrosLabel" for="usuario-ediOutros">
                              <Translate contentKey="generadorApp.usuario.ediOutros">Edi Outros</Translate>
                            </Label>
                            <AvInput type="string" name="ediOutros" id="usuario-ediOutros" value={this.state.ediOutros} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delOutros' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delOutrosLabel" for="usuario-delOutros">
                              <Translate contentKey="generadorApp.usuario.delOutros">Del Outros</Translate>
                            </Label>
                            <AvInput type="string" name="delOutros" id="usuario-delOutros" value={this.state.delOutros} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'relOutros' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="relOutrosLabel" for="usuario-relOutros">
                              <Translate contentKey="generadorApp.usuario.relOutros">Rel Outros</Translate>
                            </Label>
                            <AvInput type="string" name="relOutros" id="usuario-relOutros" value={this.state.relOutros} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verUnidadeEasy' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verUnidadeEasyLabel" for="usuario-verUnidadeEasy">
                              <Translate contentKey="generadorApp.usuario.verUnidadeEasy">Ver Unidade Easy</Translate>
                            </Label>
                            <AvInput type="string" name="verUnidadeEasy" id="usuario-verUnidadeEasy" value={this.state.verUnidadeEasy} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadUnidadeEasy' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadUnidadeEasyLabel" for="usuario-cadUnidadeEasy">
                              <Translate contentKey="generadorApp.usuario.cadUnidadeEasy">Cad Unidade Easy</Translate>
                            </Label>
                            <AvInput type="string" name="cadUnidadeEasy" id="usuario-cadUnidadeEasy" value={this.state.cadUnidadeEasy} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediUnidadeEasy' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediUnidadeEasyLabel" for="usuario-ediUnidadeEasy">
                              <Translate contentKey="generadorApp.usuario.ediUnidadeEasy">Edi Unidade Easy</Translate>
                            </Label>
                            <AvInput type="string" name="ediUnidadeEasy" id="usuario-ediUnidadeEasy" value={this.state.ediUnidadeEasy} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delUnidadeEasy' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delUnidadeEasyLabel" for="usuario-delUnidadeEasy">
                              <Translate contentKey="generadorApp.usuario.delUnidadeEasy">Del Unidade Easy</Translate>
                            </Label>
                            <AvInput type="string" name="delUnidadeEasy" id="usuario-delUnidadeEasy" value={this.state.delUnidadeEasy} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verUsuario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verUsuarioLabel" for="usuario-verUsuario">
                              <Translate contentKey="generadorApp.usuario.verUsuario">Ver Usuario</Translate>
                            </Label>
                            <AvInput type="string" name="verUsuario" id="usuario-verUsuario" value={this.state.verUsuario} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadUsuario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadUsuarioLabel" for="usuario-cadUsuario">
                              <Translate contentKey="generadorApp.usuario.cadUsuario">Cad Usuario</Translate>
                            </Label>
                            <AvInput type="string" name="cadUsuario" id="usuario-cadUsuario" value={this.state.cadUsuario} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediUsuario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediUsuarioLabel" for="usuario-ediUsuario">
                              <Translate contentKey="generadorApp.usuario.ediUsuario">Edi Usuario</Translate>
                            </Label>
                            <AvInput type="string" name="ediUsuario" id="usuario-ediUsuario" value={this.state.ediUsuario} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delUsuario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delUsuarioLabel" for="usuario-delUsuario">
                              <Translate contentKey="generadorApp.usuario.delUsuario">Del Usuario</Translate>
                            </Label>
                            <AvInput type="string" name="delUsuario" id="usuario-delUsuario" value={this.state.delUsuario} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verPtaResultado' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verPtaResultadoLabel" for="usuario-verPtaResultado">
                              <Translate contentKey="generadorApp.usuario.verPtaResultado">Ver Pta Resultado</Translate>
                            </Label>
                            <AvInput type="string" name="verPtaResultado" id="usuario-verPtaResultado" value={this.state.verPtaResultado} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadPtaResultado' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadPtaResultadoLabel" for="usuario-cadPtaResultado">
                              <Translate contentKey="generadorApp.usuario.cadPtaResultado">Cad Pta Resultado</Translate>
                            </Label>
                            <AvInput type="string" name="cadPtaResultado" id="usuario-cadPtaResultado" value={this.state.cadPtaResultado} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delPtaResultado' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delPtaResultadoLabel" for="usuario-delPtaResultado">
                              <Translate contentKey="generadorApp.usuario.delPtaResultado">Del Pta Resultado</Translate>
                            </Label>
                            <AvInput type="string" name="delPtaResultado" id="usuario-delPtaResultado" value={this.state.delPtaResultado} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verPtaAtividade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verPtaAtividadeLabel" for="usuario-verPtaAtividade">
                              <Translate contentKey="generadorApp.usuario.verPtaAtividade">Ver Pta Atividade</Translate>
                            </Label>
                            <AvInput type="string" name="verPtaAtividade" id="usuario-verPtaAtividade" value={this.state.verPtaAtividade} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadPtaAtividade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadPtaAtividadeLabel" for="usuario-cadPtaAtividade">
                              <Translate contentKey="generadorApp.usuario.cadPtaAtividade">Cad Pta Atividade</Translate>
                            </Label>
                            <AvInput type="string" name="cadPtaAtividade" id="usuario-cadPtaAtividade" value={this.state.cadPtaAtividade} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delPtaAtividade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delPtaAtividadeLabel" for="usuario-delPtaAtividade">
                              <Translate contentKey="generadorApp.usuario.delPtaAtividade">Del Pta Atividade</Translate>
                            </Label>
                            <AvInput type="string" name="delPtaAtividade" id="usuario-delPtaAtividade" value={this.state.delPtaAtividade} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'permissaoUsuario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="permissaoUsuarioLabel" for="usuario-permissaoUsuario">
                              <Translate contentKey="generadorApp.usuario.permissaoUsuario">Permissao Usuario</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="permissaoUsuario"
                              id="usuario-permissaoUsuario"
                              value={this.state.permissaoUsuario}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verProntuario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verProntuarioLabel" for="usuario-verProntuario">
                              <Translate contentKey="generadorApp.usuario.verProntuario">Ver Prontuario</Translate>
                            </Label>
                            <AvInput type="string" name="verProntuario" id="usuario-verProntuario" value={this.state.verProntuario} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadProntuario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadProntuarioLabel" for="usuario-cadProntuario">
                              <Translate contentKey="generadorApp.usuario.cadProntuario">Cad Prontuario</Translate>
                            </Label>
                            <AvInput type="string" name="cadProntuario" id="usuario-cadProntuario" value={this.state.cadProntuario} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediProntuario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediProntuarioLabel" for="usuario-ediProntuario">
                              <Translate contentKey="generadorApp.usuario.ediProntuario">Edi Prontuario</Translate>
                            </Label>
                            <AvInput type="string" name="ediProntuario" id="usuario-ediProntuario" value={this.state.ediProntuario} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delProntuario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delProntuarioLabel" for="usuario-delProntuario">
                              <Translate contentKey="generadorApp.usuario.delProntuario">Del Prontuario</Translate>
                            </Label>
                            <AvInput type="string" name="delProntuario" id="usuario-delProntuario" value={this.state.delProntuario} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delProntuarioFoto' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delProntuarioFotoLabel" for="usuario-delProntuarioFoto">
                              <Translate contentKey="generadorApp.usuario.delProntuarioFoto">Del Prontuario Foto</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="delProntuarioFoto"
                              id="usuario-delProntuarioFoto"
                              value={this.state.delProntuarioFoto}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'valoresFinanceiro' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="valoresFinanceiroLabel" for="usuario-valoresFinanceiro">
                              <Translate contentKey="generadorApp.usuario.valoresFinanceiro">Valores Financeiro</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="valoresFinanceiro"
                              id="usuario-valoresFinanceiro"
                              value={this.state.valoresFinanceiro}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'autorizacaoValorFinanceiro' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="autorizacaoValorFinanceiroLabel" for="usuario-autorizacaoValorFinanceiro">
                              <Translate contentKey="generadorApp.usuario.autorizacaoValorFinanceiro">
                                Autorizacao Valor Financeiro
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="autorizacaoValorFinanceiro"
                              id="usuario-autorizacaoValorFinanceiro"
                              value={this.state.autorizacaoValorFinanceiro}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'confirmarPagamentoFinanceiro' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="confirmarPagamentoFinanceiroLabel" for="usuario-confirmarPagamentoFinanceiro">
                              <Translate contentKey="generadorApp.usuario.confirmarPagamentoFinanceiro">
                                Confirmar Pagamento Financeiro
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="confirmarPagamentoFinanceiro"
                              id="usuario-confirmarPagamentoFinanceiro"
                              value={this.state.confirmarPagamentoFinanceiro}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'gerenciarSorteios' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="gerenciarSorteiosLabel" for="usuario-gerenciarSorteios">
                              <Translate contentKey="generadorApp.usuario.gerenciarSorteios">Gerenciar Sorteios</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="gerenciarSorteios"
                              id="usuario-gerenciarSorteios"
                              value={this.state.gerenciarSorteios}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'envioRecusa' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="envioRecusaLabel" for="usuario-envioRecusa">
                              <Translate contentKey="generadorApp.usuario.envioRecusa">Envio Recusa</Translate>
                            </Label>
                            <AvInput type="string" name="envioRecusa" id="usuario-envioRecusa" value={this.state.envioRecusa} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'envioIntercorrencia' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="envioIntercorrenciaLabel" for="usuario-envioIntercorrencia">
                              <Translate contentKey="generadorApp.usuario.envioIntercorrencia">Envio Intercorrencia</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="envioIntercorrencia"
                              id="usuario-envioIntercorrencia"
                              value={this.state.envioIntercorrencia}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'envioCancelamento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="envioCancelamentoLabel" for="usuario-envioCancelamento">
                              <Translate contentKey="generadorApp.usuario.envioCancelamento">Envio Cancelamento</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="envioCancelamento"
                              id="usuario-envioCancelamento"
                              value={this.state.envioCancelamento}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'envioAvaliacao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="envioAvaliacaoLabel" for="usuario-envioAvaliacao">
                              <Translate contentKey="generadorApp.usuario.envioAvaliacao">Envio Avaliacao</Translate>
                            </Label>
                            <AvInput type="string" name="envioAvaliacao" id="usuario-envioAvaliacao" value={this.state.envioAvaliacao} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'envioPedido' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="envioPedidoLabel" for="usuario-envioPedido">
                              <Translate contentKey="generadorApp.usuario.envioPedido">Envio Pedido</Translate>
                            </Label>
                            <AvInput type="string" name="envioPedido" id="usuario-envioPedido" value={this.state.envioPedido} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'alertaAtendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="alertaAtendimentoLabel" for="usuario-alertaAtendimento">
                              <Translate contentKey="generadorApp.usuario.alertaAtendimento">Alerta Atendimento</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="alertaAtendimento"
                              id="usuario-alertaAtendimento"
                              value={this.state.alertaAtendimento}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ativo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ativoLabel" for="usuario-ativo">
                              <Translate contentKey="generadorApp.usuario.ativo">Ativo</Translate>
                            </Label>
                            <AvInput type="string" name="ativo" id="usuario-ativo" value={this.state.ativo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'envioGlosado' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="envioGlosadoLabel" for="usuario-envioGlosado">
                              <Translate contentKey="generadorApp.usuario.envioGlosado">Envio Glosado</Translate>
                            </Label>
                            <AvInput type="string" name="envioGlosado" id="usuario-envioGlosado" value={this.state.envioGlosado} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'emergencia' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="emergenciaLabel" for="usuario-emergencia">
                              <Translate contentKey="generadorApp.usuario.emergencia">Emergencia</Translate>
                            </Label>
                            <AvInput type="string" name="emergencia" id="usuario-emergencia" value={this.state.emergencia} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'token' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="tokenLabel" for="usuario-token">
                              <Translate contentKey="generadorApp.usuario.token">Token</Translate>
                            </Label>
                            <AvInput type="string" name="token" id="usuario-token" value={this.state.token} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'editAtendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="editAtendimentoLabel" for="usuario-editAtendimento">
                              <Translate contentKey="generadorApp.usuario.editAtendimento">Edit Atendimento</Translate>
                            </Label>
                            <AvInput type="string" name="editAtendimento" id="usuario-editAtendimento" value={this.state.editAtendimento} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ouvirLigacao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ouvirLigacaoLabel" for="usuario-ouvirLigacao">
                              <Translate contentKey="generadorApp.usuario.ouvirLigacao">Ouvir Ligacao</Translate>
                            </Label>
                            <AvInput type="string" name="ouvirLigacao" id="usuario-ouvirLigacao" value={this.state.ouvirLigacao} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verPainelIndicadores' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verPainelIndicadoresLabel" for="usuario-verPainelIndicadores">
                              <Translate contentKey="generadorApp.usuario.verPainelIndicadores">Ver Painel Indicadores</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="verPainelIndicadores"
                              id="usuario-verPainelIndicadores"
                              value={this.state.verPainelIndicadores}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'prorrogarPad' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="prorrogarPadLabel" for="usuario-prorrogarPad">
                              <Translate contentKey="generadorApp.usuario.prorrogarPad">Prorrogar Pad</Translate>
                            </Label>
                            <AvInput type="string" name="prorrogarPad" id="usuario-prorrogarPad" value={this.state.prorrogarPad} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cancelarAtendMassa' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cancelarAtendMassaLabel" for="usuario-cancelarAtendMassa">
                              <Translate contentKey="generadorApp.usuario.cancelarAtendMassa">Cancelar Atend Massa</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="cancelarAtendMassa"
                              id="usuario-cancelarAtendMassa"
                              value={this.state.cancelarAtendMassa}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cadMatMed' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cadMatMedLabel" for="usuario-cadMatMed">
                              <Translate contentKey="generadorApp.usuario.cadMatMed">Cad Mat Med</Translate>
                            </Label>
                            <AvInput type="string" name="cadMatMed" id="usuario-cadMatMed" value={this.state.cadMatMed} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediMatMed' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediMatMedLabel" for="usuario-ediMatMed">
                              <Translate contentKey="generadorApp.usuario.ediMatMed">Edi Mat Med</Translate>
                            </Label>
                            <AvInput type="string" name="ediMatMed" id="usuario-ediMatMed" value={this.state.ediMatMed} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'delMatMed' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="delMatMedLabel" for="usuario-delMatMed">
                              <Translate contentKey="generadorApp.usuario.delMatMed">Del Mat Med</Translate>
                            </Label>
                            <AvInput type="string" name="delMatMed" id="usuario-delMatMed" value={this.state.delMatMed} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verColPta' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verColPtaLabel" for="usuario-verColPta">
                              <Translate contentKey="generadorApp.usuario.verColPta">Ver Col Pta</Translate>
                            </Label>
                            <AvInput type="string" name="verColPta" id="usuario-verColPta" value={this.state.verColPta} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verColFoto' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verColFotoLabel" for="usuario-verColFoto">
                              <Translate contentKey="generadorApp.usuario.verColFoto">Ver Col Foto</Translate>
                            </Label>
                            <AvInput type="string" name="verColFoto" id="usuario-verColFoto" value={this.state.verColFoto} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verColLc' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verColLcLabel" for="usuario-verColLc">
                              <Translate contentKey="generadorApp.usuario.verColLc">Ver Col Lc</Translate>
                            </Label>
                            <AvInput type="string" name="verColLc" id="usuario-verColLc" value={this.state.verColLc} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verAtendCancelado' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verAtendCanceladoLabel" for="usuario-verAtendCancelado">
                              <Translate contentKey="generadorApp.usuario.verAtendCancelado">Ver Atend Cancelado</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="verAtendCancelado"
                              id="usuario-verAtendCancelado"
                              value={this.state.verAtendCancelado}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verAtendAgConfirmacao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="verAtendAgConfirmacaoLabel" for="usuario-verAtendAgConfirmacao">
                              <Translate contentKey="generadorApp.usuario.verAtendAgConfirmacao">Ver Atend Ag Confirmacao</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="verAtendAgConfirmacao"
                              id="usuario-verAtendAgConfirmacao"
                              value={this.state.verAtendAgConfirmacao}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ediGeoLocalizacaoAtendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ediGeoLocalizacaoAtendimentoLabel" for="usuario-ediGeoLocalizacaoAtendimento">
                              <Translate contentKey="generadorApp.usuario.ediGeoLocalizacaoAtendimento">
                                Edi Geo Localizacao Atendimento
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="ediGeoLocalizacaoAtendimento"
                              id="usuario-ediGeoLocalizacaoAtendimento"
                              value={this.state.ediGeoLocalizacaoAtendimento}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'copiarEvolucao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="copiarEvolucaoLabel" for="usuario-copiarEvolucao">
                              <Translate contentKey="generadorApp.usuario.copiarEvolucao">Copiar Evolucao</Translate>
                            </Label>
                            <AvInput type="string" name="copiarEvolucao" id="usuario-copiarEvolucao" value={this.state.copiarEvolucao} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'copiarNomeProf' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="copiarNomeProfLabel" for="usuario-copiarNomeProf">
                              <Translate contentKey="generadorApp.usuario.copiarNomeProf">Copiar Nome Prof</Translate>
                            </Label>
                            <AvInput type="string" name="copiarNomeProf" id="usuario-copiarNomeProf" value={this.state.copiarNomeProf} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'copiarRegistroProf' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="copiarRegistroProfLabel" for="usuario-copiarRegistroProf">
                              <Translate contentKey="generadorApp.usuario.copiarRegistroProf">Copiar Registro Prof</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="copiarRegistroProf"
                              id="usuario-copiarRegistroProf"
                              value={this.state.copiarRegistroProf}
                            />
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

                      {this.state.baseFilters !== 'envioCidSemPta' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="envioCidSemPtaLabel" for="usuario-envioCidSemPta">
                              <Translate contentKey="generadorApp.usuario.envioCidSemPta">Envio Cid Sem Pta</Translate>
                            </Label>
                            <AvInput type="string" name="envioCidSemPta" id="usuario-envioCidSemPta" value={this.state.envioCidSemPta} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'envioAnaliseResultadoEsperado' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="envioAnaliseResultadoEsperadoLabel" for="usuario-envioAnaliseResultadoEsperado">
                              <Translate contentKey="generadorApp.usuario.envioAnaliseResultadoEsperado">
                                Envio Analise Resultado Esperado
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="envioAnaliseResultadoEsperado"
                              id="usuario-envioAnaliseResultadoEsperado"
                              value={this.state.envioAnaliseResultadoEsperado}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'envioDescumprimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="envioDescumprimentoLabel" for="usuario-envioDescumprimento">
                              <Translate contentKey="generadorApp.usuario.envioDescumprimento">Envio Descumprimento</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="envioDescumprimento"
                              id="usuario-envioDescumprimento"
                              value={this.state.envioDescumprimento}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'envioMelhoraTempo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="envioMelhoraTempoLabel" check>
                              <AvInput id="usuario-envioMelhoraTempo" type="checkbox" className="form-control" name="envioMelhoraTempo" />
                              <Translate contentKey="generadorApp.usuario.envioMelhoraTempo">Envio Melhora Tempo</Translate>
                            </Label>
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
                      {this.state.baseFilters !== 'envioCidSemPta' ? (
                        <th className="hand" onClick={this.sort('envioCidSemPta')}>
                          <Translate contentKey="generadorApp.usuario.envioCidSemPta">Envio Cid Sem Pta</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'envioAnaliseResultadoEsperado' ? (
                        <th className="hand" onClick={this.sort('envioAnaliseResultadoEsperado')}>
                          <Translate contentKey="generadorApp.usuario.envioAnaliseResultadoEsperado">
                            Envio Analise Resultado Esperado
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'envioDescumprimento' ? (
                        <th className="hand" onClick={this.sort('envioDescumprimento')}>
                          <Translate contentKey="generadorApp.usuario.envioDescumprimento">Envio Descumprimento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'envioMelhoraTempo' ? (
                        <th className="hand" onClick={this.sort('envioMelhoraTempo')}>
                          <Translate contentKey="generadorApp.usuario.envioMelhoraTempo">Envio Melhora Tempo</Translate>
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

                        {this.state.baseFilters !== 'verAtendimento' ? <td>{usuario.verAtendimento}</td> : null}

                        {this.state.baseFilters !== 'cadAtendimento' ? <td>{usuario.cadAtendimento}</td> : null}

                        {this.state.baseFilters !== 'ediAtendimento' ? <td>{usuario.ediAtendimento}</td> : null}

                        {this.state.baseFilters !== 'baixaManualAtendimento' ? <td>{usuario.baixaManualAtendimento}</td> : null}

                        {this.state.baseFilters !== 'delAtendimento' ? <td>{usuario.delAtendimento}</td> : null}

                        {this.state.baseFilters !== 'relAtendimento' ? <td>{usuario.relAtendimento}</td> : null}

                        {this.state.baseFilters !== 'verPad' ? <td>{usuario.verPad}</td> : null}

                        {this.state.baseFilters !== 'cadPad' ? <td>{usuario.cadPad}</td> : null}

                        {this.state.baseFilters !== 'ediPad' ? <td>{usuario.ediPad}</td> : null}

                        {this.state.baseFilters !== 'delPad' ? <td>{usuario.delPad}</td> : null}

                        {this.state.baseFilters !== 'relPad' ? <td>{usuario.relPad}</td> : null}

                        {this.state.baseFilters !== 'verDiario' ? <td>{usuario.verDiario}</td> : null}

                        {this.state.baseFilters !== 'cadDiario' ? <td>{usuario.cadDiario}</td> : null}

                        {this.state.baseFilters !== 'ediDiario' ? <td>{usuario.ediDiario}</td> : null}

                        {this.state.baseFilters !== 'delDiario' ? <td>{usuario.delDiario}</td> : null}

                        {this.state.baseFilters !== 'relDiario' ? <td>{usuario.relDiario}</td> : null}

                        {this.state.baseFilters !== 'verCategoria' ? <td>{usuario.verCategoria}</td> : null}

                        {this.state.baseFilters !== 'cadCategoria' ? <td>{usuario.cadCategoria}</td> : null}

                        {this.state.baseFilters !== 'ediCategoria' ? <td>{usuario.ediCategoria}</td> : null}

                        {this.state.baseFilters !== 'delCategoria' ? <td>{usuario.delCategoria}</td> : null}

                        {this.state.baseFilters !== 'verEspecialidade' ? <td>{usuario.verEspecialidade}</td> : null}

                        {this.state.baseFilters !== 'cadEspecialidade' ? <td>{usuario.cadEspecialidade}</td> : null}

                        {this.state.baseFilters !== 'ediEspecialidade' ? <td>{usuario.ediEspecialidade}</td> : null}

                        {this.state.baseFilters !== 'delEspecialidade' ? <td>{usuario.delEspecialidade}</td> : null}

                        {this.state.baseFilters !== 'relEspecialidade' ? <td>{usuario.relEspecialidade}</td> : null}

                        {this.state.baseFilters !== 'verEspecialidadeValor' ? <td>{usuario.verEspecialidadeValor}</td> : null}

                        {this.state.baseFilters !== 'cadEspecialidadeValor' ? <td>{usuario.cadEspecialidadeValor}</td> : null}

                        {this.state.baseFilters !== 'ediEspecialidadeValor' ? <td>{usuario.ediEspecialidadeValor}</td> : null}

                        {this.state.baseFilters !== 'delEspecialidadeValor' ? <td>{usuario.delEspecialidadeValor}</td> : null}

                        {this.state.baseFilters !== 'relEspecialidadeValor' ? <td>{usuario.relEspecialidadeValor}</td> : null}

                        {this.state.baseFilters !== 'verOperadora' ? <td>{usuario.verOperadora}</td> : null}

                        {this.state.baseFilters !== 'cadOperadora' ? <td>{usuario.cadOperadora}</td> : null}

                        {this.state.baseFilters !== 'ediOperadora' ? <td>{usuario.ediOperadora}</td> : null}

                        {this.state.baseFilters !== 'delOperadora' ? <td>{usuario.delOperadora}</td> : null}

                        {this.state.baseFilters !== 'verPaciente' ? <td>{usuario.verPaciente}</td> : null}

                        {this.state.baseFilters !== 'cadPaciente' ? <td>{usuario.cadPaciente}</td> : null}

                        {this.state.baseFilters !== 'ediPaciente' ? <td>{usuario.ediPaciente}</td> : null}

                        {this.state.baseFilters !== 'delPaciente' ? <td>{usuario.delPaciente}</td> : null}

                        {this.state.baseFilters !== 'relPaciente' ? <td>{usuario.relPaciente}</td> : null}

                        {this.state.baseFilters !== 'verProfissional' ? <td>{usuario.verProfissional}</td> : null}

                        {this.state.baseFilters !== 'cadProfissional' ? <td>{usuario.cadProfissional}</td> : null}

                        {this.state.baseFilters !== 'ediProfissional' ? <td>{usuario.ediProfissional}</td> : null}

                        {this.state.baseFilters !== 'delProfissional' ? <td>{usuario.delProfissional}</td> : null}

                        {this.state.baseFilters !== 'ativProfissional' ? <td>{usuario.ativProfissional}</td> : null}

                        {this.state.baseFilters !== 'relProfissional' ? <td>{usuario.relProfissional}</td> : null}

                        {this.state.baseFilters !== 'verPush' ? <td>{usuario.verPush}</td> : null}

                        {this.state.baseFilters !== 'cadPushPaciente' ? <td>{usuario.cadPushPaciente}</td> : null}

                        {this.state.baseFilters !== 'cadPushProfissional' ? <td>{usuario.cadPushProfissional}</td> : null}

                        {this.state.baseFilters !== 'verTermoPaciente' ? <td>{usuario.verTermoPaciente}</td> : null}

                        {this.state.baseFilters !== 'ediTermoPaciente' ? <td>{usuario.ediTermoPaciente}</td> : null}

                        {this.state.baseFilters !== 'verTermoProfissional' ? <td>{usuario.verTermoProfissional}</td> : null}

                        {this.state.baseFilters !== 'ediTermoProfissional' ? <td>{usuario.ediTermoProfissional}</td> : null}

                        {this.state.baseFilters !== 'verOutros' ? <td>{usuario.verOutros}</td> : null}

                        {this.state.baseFilters !== 'cadOutros' ? <td>{usuario.cadOutros}</td> : null}

                        {this.state.baseFilters !== 'ediOutros' ? <td>{usuario.ediOutros}</td> : null}

                        {this.state.baseFilters !== 'delOutros' ? <td>{usuario.delOutros}</td> : null}

                        {this.state.baseFilters !== 'relOutros' ? <td>{usuario.relOutros}</td> : null}

                        {this.state.baseFilters !== 'verUnidadeEasy' ? <td>{usuario.verUnidadeEasy}</td> : null}

                        {this.state.baseFilters !== 'cadUnidadeEasy' ? <td>{usuario.cadUnidadeEasy}</td> : null}

                        {this.state.baseFilters !== 'ediUnidadeEasy' ? <td>{usuario.ediUnidadeEasy}</td> : null}

                        {this.state.baseFilters !== 'delUnidadeEasy' ? <td>{usuario.delUnidadeEasy}</td> : null}

                        {this.state.baseFilters !== 'verUsuario' ? <td>{usuario.verUsuario}</td> : null}

                        {this.state.baseFilters !== 'cadUsuario' ? <td>{usuario.cadUsuario}</td> : null}

                        {this.state.baseFilters !== 'ediUsuario' ? <td>{usuario.ediUsuario}</td> : null}

                        {this.state.baseFilters !== 'delUsuario' ? <td>{usuario.delUsuario}</td> : null}

                        {this.state.baseFilters !== 'verPtaResultado' ? <td>{usuario.verPtaResultado}</td> : null}

                        {this.state.baseFilters !== 'cadPtaResultado' ? <td>{usuario.cadPtaResultado}</td> : null}

                        {this.state.baseFilters !== 'delPtaResultado' ? <td>{usuario.delPtaResultado}</td> : null}

                        {this.state.baseFilters !== 'verPtaAtividade' ? <td>{usuario.verPtaAtividade}</td> : null}

                        {this.state.baseFilters !== 'cadPtaAtividade' ? <td>{usuario.cadPtaAtividade}</td> : null}

                        {this.state.baseFilters !== 'delPtaAtividade' ? <td>{usuario.delPtaAtividade}</td> : null}

                        {this.state.baseFilters !== 'permissaoUsuario' ? <td>{usuario.permissaoUsuario}</td> : null}

                        {this.state.baseFilters !== 'verProntuario' ? <td>{usuario.verProntuario}</td> : null}

                        {this.state.baseFilters !== 'cadProntuario' ? <td>{usuario.cadProntuario}</td> : null}

                        {this.state.baseFilters !== 'ediProntuario' ? <td>{usuario.ediProntuario}</td> : null}

                        {this.state.baseFilters !== 'delProntuario' ? <td>{usuario.delProntuario}</td> : null}

                        {this.state.baseFilters !== 'delProntuarioFoto' ? <td>{usuario.delProntuarioFoto}</td> : null}

                        {this.state.baseFilters !== 'valoresFinanceiro' ? <td>{usuario.valoresFinanceiro}</td> : null}

                        {this.state.baseFilters !== 'autorizacaoValorFinanceiro' ? <td>{usuario.autorizacaoValorFinanceiro}</td> : null}

                        {this.state.baseFilters !== 'confirmarPagamentoFinanceiro' ? <td>{usuario.confirmarPagamentoFinanceiro}</td> : null}

                        {this.state.baseFilters !== 'gerenciarSorteios' ? <td>{usuario.gerenciarSorteios}</td> : null}

                        {this.state.baseFilters !== 'envioRecusa' ? <td>{usuario.envioRecusa}</td> : null}

                        {this.state.baseFilters !== 'envioIntercorrencia' ? <td>{usuario.envioIntercorrencia}</td> : null}

                        {this.state.baseFilters !== 'envioCancelamento' ? <td>{usuario.envioCancelamento}</td> : null}

                        {this.state.baseFilters !== 'envioAvaliacao' ? <td>{usuario.envioAvaliacao}</td> : null}

                        {this.state.baseFilters !== 'envioPedido' ? <td>{usuario.envioPedido}</td> : null}

                        {this.state.baseFilters !== 'alertaAtendimento' ? <td>{usuario.alertaAtendimento}</td> : null}

                        {this.state.baseFilters !== 'ativo' ? <td>{usuario.ativo}</td> : null}

                        {this.state.baseFilters !== 'envioGlosado' ? <td>{usuario.envioGlosado}</td> : null}

                        {this.state.baseFilters !== 'emergencia' ? <td>{usuario.emergencia}</td> : null}

                        {this.state.baseFilters !== 'token' ? <td>{usuario.token}</td> : null}

                        {this.state.baseFilters !== 'editAtendimento' ? <td>{usuario.editAtendimento}</td> : null}

                        {this.state.baseFilters !== 'ouvirLigacao' ? <td>{usuario.ouvirLigacao}</td> : null}

                        {this.state.baseFilters !== 'verPainelIndicadores' ? <td>{usuario.verPainelIndicadores}</td> : null}

                        {this.state.baseFilters !== 'prorrogarPad' ? <td>{usuario.prorrogarPad}</td> : null}

                        {this.state.baseFilters !== 'cancelarAtendMassa' ? <td>{usuario.cancelarAtendMassa}</td> : null}

                        {this.state.baseFilters !== 'cadMatMed' ? <td>{usuario.cadMatMed}</td> : null}

                        {this.state.baseFilters !== 'ediMatMed' ? <td>{usuario.ediMatMed}</td> : null}

                        {this.state.baseFilters !== 'delMatMed' ? <td>{usuario.delMatMed}</td> : null}

                        {this.state.baseFilters !== 'verColPta' ? <td>{usuario.verColPta}</td> : null}

                        {this.state.baseFilters !== 'verColFoto' ? <td>{usuario.verColFoto}</td> : null}

                        {this.state.baseFilters !== 'verColLc' ? <td>{usuario.verColLc}</td> : null}

                        {this.state.baseFilters !== 'verAtendCancelado' ? <td>{usuario.verAtendCancelado}</td> : null}

                        {this.state.baseFilters !== 'verAtendAgConfirmacao' ? <td>{usuario.verAtendAgConfirmacao}</td> : null}

                        {this.state.baseFilters !== 'ediGeoLocalizacaoAtendimento' ? <td>{usuario.ediGeoLocalizacaoAtendimento}</td> : null}

                        {this.state.baseFilters !== 'copiarEvolucao' ? <td>{usuario.copiarEvolucao}</td> : null}

                        {this.state.baseFilters !== 'copiarNomeProf' ? <td>{usuario.copiarNomeProf}</td> : null}

                        {this.state.baseFilters !== 'copiarRegistroProf' ? <td>{usuario.copiarRegistroProf}</td> : null}

                        {this.state.baseFilters !== 'idAreaAtuacao' ? <td>{usuario.idAreaAtuacao}</td> : null}

                        {this.state.baseFilters !== 'envioCidSemPta' ? <td>{usuario.envioCidSemPta}</td> : null}

                        {this.state.baseFilters !== 'envioAnaliseResultadoEsperado' ? (
                          <td>{usuario.envioAnaliseResultadoEsperado}</td>
                        ) : null}

                        {this.state.baseFilters !== 'envioDescumprimento' ? <td>{usuario.envioDescumprimento}</td> : null}

                        {this.state.baseFilters !== 'envioMelhoraTempo' ? <td>{usuario.envioMelhoraTempo ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'unidade' ? (
                          <td>{usuario.unidade ? <Link to={`unidade-easy/${usuario.unidade.id}`}>{usuario.unidade.id}</Link> : ''}</td>
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
