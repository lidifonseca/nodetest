/* eslint-disable require-await */

/* eslint complexity: ["error", 100] */
import React from 'react';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { connect } from 'react-redux';
import { CSVDownload } from 'react-csv';
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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
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
import { getUsuarioState, IUsuarioBaseState, getEntitiesExport } from '../usuario.reducer';
import { IUsuario } from 'app/shared/model/usuario.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { getEntities as getUnidadeEasies } from 'app/entities/unidade-easy/unidade-easy.reducer';
import { ITipoUsuario } from 'app/shared/model/tipo-usuario.model';
import { getEntities as getTipoUsuarios } from 'app/entities/tipo-usuario/tipo-usuario.reducer';

export interface IUsuarioProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IUsuarioState extends IUsuarioBaseState, IPaginationBaseState {
  exportData: [] | null;
}

export class Usuario extends React.Component<IUsuarioProps, IUsuarioState> {
  private myFormRef: any;

  constructor(props: IUsuarioProps) {
    super(props);
    this.state = {
      exportData: null,
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
      'page=' +
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
    this.props.getEntitiesExport(
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

  confirmExport() {}
  //  async confirmExport() {
  //    /* eslint-disable require-await */
  //    const result = await this.getEntities();
  //    this.setState({
  //      exportData: result['value']['data']
  //    })
  //  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    return this.state.exportData !== null ? (
      <div>
        <CSVDownload filename={'my-file.csv'} data={this.state.exportData} target="_blank" />
        {this.props.history.goBack()}
      </div>
    ) : (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="generadorApp.paciente.delete.question">
          <Translate contentKey="generadorApp.paciente.delete.question">Are you sure you want to delete this Paciente?</Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-paciente" color="danger" onClick={this.confirmExport}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Export CSV</Translate>
          </Button>
        </ModalFooter>
      </Modal>
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
  getEntitiesExport
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Usuario);
