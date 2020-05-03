/* eslint complexity: ["error", 100] */
import React from 'react';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { connect } from 'react-redux';
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
import { getEntities } from './usuario.reducer';
import { IUsuario } from 'app/shared/model/usuario.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { getEntities as getUnidadeEasies } from 'app/entities/unidade-easy/unidade-easy.reducer';
import { ITipoUsuario } from 'app/shared/model/tipo-usuario.model';
import { getEntities as getTipoUsuarios } from 'app/entities/tipo-usuario/tipo-usuario.reducer';

export interface IUsuarioProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IUsuarioBaseState {
  idOperadora: any;
  senha: any;
  nome: any;
  email: any;
  telefone: any;
  celular: any;
  cpf: any;
  rg: any;
  sexo: any;
  nascimento: any;
  verAtendimento: any;
  cadAtendimento: any;
  ediAtendimento: any;
  baixaManualAtendimento: any;
  delAtendimento: any;
  relAtendimento: any;
  verPad: any;
  cadPad: any;
  ediPad: any;
  delPad: any;
  relPad: any;
  verDiario: any;
  cadDiario: any;
  ediDiario: any;
  delDiario: any;
  relDiario: any;
  verCategoria: any;
  cadCategoria: any;
  ediCategoria: any;
  delCategoria: any;
  verEspecialidade: any;
  cadEspecialidade: any;
  ediEspecialidade: any;
  delEspecialidade: any;
  relEspecialidade: any;
  verEspecialidadeValor: any;
  cadEspecialidadeValor: any;
  ediEspecialidadeValor: any;
  delEspecialidadeValor: any;
  relEspecialidadeValor: any;
  verOperadora: any;
  cadOperadora: any;
  ediOperadora: any;
  delOperadora: any;
  verPaciente: any;
  cadPaciente: any;
  ediPaciente: any;
  delPaciente: any;
  relPaciente: any;
  verProfissional: any;
  cadProfissional: any;
  ediProfissional: any;
  delProfissional: any;
  ativProfissional: any;
  relProfissional: any;
  verPush: any;
  cadPushPaciente: any;
  cadPushProfissional: any;
  verTermoPaciente: any;
  ediTermoPaciente: any;
  verTermoProfissional: any;
  ediTermoProfissional: any;
  verOutros: any;
  cadOutros: any;
  ediOutros: any;
  delOutros: any;
  relOutros: any;
  verUnidadeEasy: any;
  cadUnidadeEasy: any;
  ediUnidadeEasy: any;
  delUnidadeEasy: any;
  verUsuario: any;
  cadUsuario: any;
  ediUsuario: any;
  delUsuario: any;
  verPtaResultado: any;
  cadPtaResultado: any;
  delPtaResultado: any;
  verPtaAtividade: any;
  cadPtaAtividade: any;
  delPtaAtividade: any;
  permissaoUsuario: any;
  verProntuario: any;
  cadProntuario: any;
  ediProntuario: any;
  delProntuario: any;
  delProntuarioFoto: any;
  valoresFinanceiro: any;
  autorizacaoValorFinanceiro: any;
  confirmarPagamentoFinanceiro: any;
  gerenciarSorteios: any;
  envioRecusa: any;
  envioIntercorrencia: any;
  envioCancelamento: any;
  envioAvaliacao: any;
  envioPedido: any;
  alertaAtendimento: any;
  ativo: any;
  envioGlosado: any;
  emergencia: any;
  token: any;
  editAtendimento: any;
  ouvirLigacao: any;
  verPainelIndicadores: any;
  prorrogarPad: any;
  cancelarAtendMassa: any;
  cadMatMed: any;
  ediMatMed: any;
  delMatMed: any;
  verColPta: any;
  verColFoto: any;
  verColLc: any;
  verAtendCancelado: any;
  verAtendAgConfirmacao: any;
  ediGeoLocalizacaoAtendimento: any;
  copiarEvolucao: any;
  copiarNomeProf: any;
  copiarRegistroProf: any;
  idAreaAtuacao: any;
  envioCidSemPta: any;
  envioAnaliseResultadoEsperado: any;
  envioDescumprimento: any;
  envioMelhoraTempo: any;
  senhaChat: any;
  diario: any;
  pacienteDiario: any;
  unidade: any;
  idTipoUsuario: any;
}
export interface IUsuarioState extends IUsuarioBaseState, IPaginationBaseState {}

export class Usuario extends React.Component<IUsuarioProps, IUsuarioState> {
  private myFormRef: any;

  constructor(props: IUsuarioProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getUsuarioState(this.props.location)
    };
  }

  getUsuarioState = (location): IUsuarioBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const idOperadora = url.searchParams.get('idOperadora') || '';
    const senha = url.searchParams.get('senha') || '';
    const nome = url.searchParams.get('nome') || '';
    const email = url.searchParams.get('email') || '';
    const telefone = url.searchParams.get('telefone') || '';
    const celular = url.searchParams.get('celular') || '';
    const cpf = url.searchParams.get('cpf') || '';
    const rg = url.searchParams.get('rg') || '';
    const sexo = url.searchParams.get('sexo') || '';
    const nascimento = url.searchParams.get('nascimento') || '';
    const verAtendimento = url.searchParams.get('verAtendimento') || '';
    const cadAtendimento = url.searchParams.get('cadAtendimento') || '';
    const ediAtendimento = url.searchParams.get('ediAtendimento') || '';
    const baixaManualAtendimento = url.searchParams.get('baixaManualAtendimento') || '';
    const delAtendimento = url.searchParams.get('delAtendimento') || '';
    const relAtendimento = url.searchParams.get('relAtendimento') || '';
    const verPad = url.searchParams.get('verPad') || '';
    const cadPad = url.searchParams.get('cadPad') || '';
    const ediPad = url.searchParams.get('ediPad') || '';
    const delPad = url.searchParams.get('delPad') || '';
    const relPad = url.searchParams.get('relPad') || '';
    const verDiario = url.searchParams.get('verDiario') || '';
    const cadDiario = url.searchParams.get('cadDiario') || '';
    const ediDiario = url.searchParams.get('ediDiario') || '';
    const delDiario = url.searchParams.get('delDiario') || '';
    const relDiario = url.searchParams.get('relDiario') || '';
    const verCategoria = url.searchParams.get('verCategoria') || '';
    const cadCategoria = url.searchParams.get('cadCategoria') || '';
    const ediCategoria = url.searchParams.get('ediCategoria') || '';
    const delCategoria = url.searchParams.get('delCategoria') || '';
    const verEspecialidade = url.searchParams.get('verEspecialidade') || '';
    const cadEspecialidade = url.searchParams.get('cadEspecialidade') || '';
    const ediEspecialidade = url.searchParams.get('ediEspecialidade') || '';
    const delEspecialidade = url.searchParams.get('delEspecialidade') || '';
    const relEspecialidade = url.searchParams.get('relEspecialidade') || '';
    const verEspecialidadeValor = url.searchParams.get('verEspecialidadeValor') || '';
    const cadEspecialidadeValor = url.searchParams.get('cadEspecialidadeValor') || '';
    const ediEspecialidadeValor = url.searchParams.get('ediEspecialidadeValor') || '';
    const delEspecialidadeValor = url.searchParams.get('delEspecialidadeValor') || '';
    const relEspecialidadeValor = url.searchParams.get('relEspecialidadeValor') || '';
    const verOperadora = url.searchParams.get('verOperadora') || '';
    const cadOperadora = url.searchParams.get('cadOperadora') || '';
    const ediOperadora = url.searchParams.get('ediOperadora') || '';
    const delOperadora = url.searchParams.get('delOperadora') || '';
    const verPaciente = url.searchParams.get('verPaciente') || '';
    const cadPaciente = url.searchParams.get('cadPaciente') || '';
    const ediPaciente = url.searchParams.get('ediPaciente') || '';
    const delPaciente = url.searchParams.get('delPaciente') || '';
    const relPaciente = url.searchParams.get('relPaciente') || '';
    const verProfissional = url.searchParams.get('verProfissional') || '';
    const cadProfissional = url.searchParams.get('cadProfissional') || '';
    const ediProfissional = url.searchParams.get('ediProfissional') || '';
    const delProfissional = url.searchParams.get('delProfissional') || '';
    const ativProfissional = url.searchParams.get('ativProfissional') || '';
    const relProfissional = url.searchParams.get('relProfissional') || '';
    const verPush = url.searchParams.get('verPush') || '';
    const cadPushPaciente = url.searchParams.get('cadPushPaciente') || '';
    const cadPushProfissional = url.searchParams.get('cadPushProfissional') || '';
    const verTermoPaciente = url.searchParams.get('verTermoPaciente') || '';
    const ediTermoPaciente = url.searchParams.get('ediTermoPaciente') || '';
    const verTermoProfissional = url.searchParams.get('verTermoProfissional') || '';
    const ediTermoProfissional = url.searchParams.get('ediTermoProfissional') || '';
    const verOutros = url.searchParams.get('verOutros') || '';
    const cadOutros = url.searchParams.get('cadOutros') || '';
    const ediOutros = url.searchParams.get('ediOutros') || '';
    const delOutros = url.searchParams.get('delOutros') || '';
    const relOutros = url.searchParams.get('relOutros') || '';
    const verUnidadeEasy = url.searchParams.get('verUnidadeEasy') || '';
    const cadUnidadeEasy = url.searchParams.get('cadUnidadeEasy') || '';
    const ediUnidadeEasy = url.searchParams.get('ediUnidadeEasy') || '';
    const delUnidadeEasy = url.searchParams.get('delUnidadeEasy') || '';
    const verUsuario = url.searchParams.get('verUsuario') || '';
    const cadUsuario = url.searchParams.get('cadUsuario') || '';
    const ediUsuario = url.searchParams.get('ediUsuario') || '';
    const delUsuario = url.searchParams.get('delUsuario') || '';
    const verPtaResultado = url.searchParams.get('verPtaResultado') || '';
    const cadPtaResultado = url.searchParams.get('cadPtaResultado') || '';
    const delPtaResultado = url.searchParams.get('delPtaResultado') || '';
    const verPtaAtividade = url.searchParams.get('verPtaAtividade') || '';
    const cadPtaAtividade = url.searchParams.get('cadPtaAtividade') || '';
    const delPtaAtividade = url.searchParams.get('delPtaAtividade') || '';
    const permissaoUsuario = url.searchParams.get('permissaoUsuario') || '';
    const verProntuario = url.searchParams.get('verProntuario') || '';
    const cadProntuario = url.searchParams.get('cadProntuario') || '';
    const ediProntuario = url.searchParams.get('ediProntuario') || '';
    const delProntuario = url.searchParams.get('delProntuario') || '';
    const delProntuarioFoto = url.searchParams.get('delProntuarioFoto') || '';
    const valoresFinanceiro = url.searchParams.get('valoresFinanceiro') || '';
    const autorizacaoValorFinanceiro = url.searchParams.get('autorizacaoValorFinanceiro') || '';
    const confirmarPagamentoFinanceiro = url.searchParams.get('confirmarPagamentoFinanceiro') || '';
    const gerenciarSorteios = url.searchParams.get('gerenciarSorteios') || '';
    const envioRecusa = url.searchParams.get('envioRecusa') || '';
    const envioIntercorrencia = url.searchParams.get('envioIntercorrencia') || '';
    const envioCancelamento = url.searchParams.get('envioCancelamento') || '';
    const envioAvaliacao = url.searchParams.get('envioAvaliacao') || '';
    const envioPedido = url.searchParams.get('envioPedido') || '';
    const alertaAtendimento = url.searchParams.get('alertaAtendimento') || '';
    const ativo = url.searchParams.get('ativo') || '';
    const envioGlosado = url.searchParams.get('envioGlosado') || '';
    const emergencia = url.searchParams.get('emergencia') || '';
    const token = url.searchParams.get('token') || '';
    const editAtendimento = url.searchParams.get('editAtendimento') || '';
    const ouvirLigacao = url.searchParams.get('ouvirLigacao') || '';
    const verPainelIndicadores = url.searchParams.get('verPainelIndicadores') || '';
    const prorrogarPad = url.searchParams.get('prorrogarPad') || '';
    const cancelarAtendMassa = url.searchParams.get('cancelarAtendMassa') || '';
    const cadMatMed = url.searchParams.get('cadMatMed') || '';
    const ediMatMed = url.searchParams.get('ediMatMed') || '';
    const delMatMed = url.searchParams.get('delMatMed') || '';
    const verColPta = url.searchParams.get('verColPta') || '';
    const verColFoto = url.searchParams.get('verColFoto') || '';
    const verColLc = url.searchParams.get('verColLc') || '';
    const verAtendCancelado = url.searchParams.get('verAtendCancelado') || '';
    const verAtendAgConfirmacao = url.searchParams.get('verAtendAgConfirmacao') || '';
    const ediGeoLocalizacaoAtendimento = url.searchParams.get('ediGeoLocalizacaoAtendimento') || '';
    const copiarEvolucao = url.searchParams.get('copiarEvolucao') || '';
    const copiarNomeProf = url.searchParams.get('copiarNomeProf') || '';
    const copiarRegistroProf = url.searchParams.get('copiarRegistroProf') || '';
    const idAreaAtuacao = url.searchParams.get('idAreaAtuacao') || '';
    const envioCidSemPta = url.searchParams.get('envioCidSemPta') || '';
    const envioAnaliseResultadoEsperado = url.searchParams.get('envioAnaliseResultadoEsperado') || '';
    const envioDescumprimento = url.searchParams.get('envioDescumprimento') || '';
    const envioMelhoraTempo = url.searchParams.get('envioMelhoraTempo') || '';
    const senhaChat = url.searchParams.get('senhaChat') || '';

    const diario = url.searchParams.get('diario') || '';
    const pacienteDiario = url.searchParams.get('pacienteDiario') || '';
    const unidade = url.searchParams.get('unidade') || '';
    const idTipoUsuario = url.searchParams.get('idTipoUsuario') || '';

    return {
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
      senhaChat,
      diario,
      pacienteDiario,
      unidade,
      idTipoUsuario
    };
  };

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
        senhaChat: '',
        diario: '',
        pacienteDiario: '',
        unidade: '',
        idTipoUsuario: ''
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
      'senhaChat=' +
      this.state.senhaChat +
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
      'idTipoUsuario=' +
      this.state.idTipoUsuario +
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
      senhaChat,
      diario,
      pacienteDiario,
      unidade,
      idTipoUsuario,
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
      senhaChat,
      diario,
      pacienteDiario,
      unidade,
      idTipoUsuario,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { unidadeEasies, tipoUsuarios, usuarioList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Usuarios</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Usuarios</span>
              <Button id="togglerFilterUsuario" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.usuario.home.createLabel">Create a new Usuario</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterUsuario">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="idOperadoraLabel" for="usuario-idOperadora">
                            <Translate contentKey="generadorApp.usuario.idOperadora">Id Operadora</Translate>
                          </Label>

                          <AvInput type="text" name="idOperadora" id="usuario-idOperadora" value={this.state.idOperadora} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="senhaLabel" for="usuario-senha">
                            <Translate contentKey="generadorApp.usuario.senha">Senha</Translate>
                          </Label>

                          <AvInput type="text" name="senha" id="usuario-senha" value={this.state.senha} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="nomeLabel" for="usuario-nome">
                            <Translate contentKey="generadorApp.usuario.nome">Nome</Translate>
                          </Label>

                          <AvInput type="text" name="nome" id="usuario-nome" value={this.state.nome} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="emailLabel" for="usuario-email">
                            <Translate contentKey="generadorApp.usuario.email">Email</Translate>
                          </Label>

                          <AvInput type="text" name="email" id="usuario-email" value={this.state.email} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="telefoneLabel" for="usuario-telefone">
                            <Translate contentKey="generadorApp.usuario.telefone">Telefone</Translate>
                          </Label>

                          <AvInput type="text" name="telefone" id="usuario-telefone" value={this.state.telefone} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="celularLabel" for="usuario-celular">
                            <Translate contentKey="generadorApp.usuario.celular">Celular</Translate>
                          </Label>

                          <AvInput type="text" name="celular" id="usuario-celular" value={this.state.celular} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cpfLabel" for="usuario-cpf">
                            <Translate contentKey="generadorApp.usuario.cpf">Cpf</Translate>
                          </Label>

                          <AvInput type="text" name="cpf" id="usuario-cpf" value={this.state.cpf} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="rgLabel" for="usuario-rg">
                            <Translate contentKey="generadorApp.usuario.rg">Rg</Translate>
                          </Label>

                          <AvInput type="text" name="rg" id="usuario-rg" value={this.state.rg} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="sexoLabel" for="usuario-sexo">
                            <Translate contentKey="generadorApp.usuario.sexo">Sexo</Translate>
                          </Label>
                          <AvInput type="string" name="sexo" id="usuario-sexo" value={this.state.sexo} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="nascimentoLabel" for="usuario-nascimento">
                            <Translate contentKey="generadorApp.usuario.nascimento">Nascimento</Translate>
                          </Label>
                          <AvInput type="date" name="nascimento" id="usuario-nascimento" value={this.state.nascimento} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="verAtendimentoLabel" for="usuario-verAtendimento">
                            <Translate contentKey="generadorApp.usuario.verAtendimento">Ver Atendimento</Translate>
                          </Label>
                          <AvInput type="string" name="verAtendimento" id="usuario-verAtendimento" value={this.state.verAtendimento} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cadAtendimentoLabel" for="usuario-cadAtendimento">
                            <Translate contentKey="generadorApp.usuario.cadAtendimento">Cad Atendimento</Translate>
                          </Label>
                          <AvInput type="string" name="cadAtendimento" id="usuario-cadAtendimento" value={this.state.cadAtendimento} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ediAtendimentoLabel" for="usuario-ediAtendimento">
                            <Translate contentKey="generadorApp.usuario.ediAtendimento">Edi Atendimento</Translate>
                          </Label>
                          <AvInput type="string" name="ediAtendimento" id="usuario-ediAtendimento" value={this.state.ediAtendimento} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
                          <Label id="delAtendimentoLabel" for="usuario-delAtendimento">
                            <Translate contentKey="generadorApp.usuario.delAtendimento">Del Atendimento</Translate>
                          </Label>
                          <AvInput type="string" name="delAtendimento" id="usuario-delAtendimento" value={this.state.delAtendimento} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="relAtendimentoLabel" for="usuario-relAtendimento">
                            <Translate contentKey="generadorApp.usuario.relAtendimento">Rel Atendimento</Translate>
                          </Label>
                          <AvInput type="string" name="relAtendimento" id="usuario-relAtendimento" value={this.state.relAtendimento} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="verPadLabel" for="usuario-verPad">
                            <Translate contentKey="generadorApp.usuario.verPad">Ver Pad</Translate>
                          </Label>
                          <AvInput type="string" name="verPad" id="usuario-verPad" value={this.state.verPad} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cadPadLabel" for="usuario-cadPad">
                            <Translate contentKey="generadorApp.usuario.cadPad">Cad Pad</Translate>
                          </Label>
                          <AvInput type="string" name="cadPad" id="usuario-cadPad" value={this.state.cadPad} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ediPadLabel" for="usuario-ediPad">
                            <Translate contentKey="generadorApp.usuario.ediPad">Edi Pad</Translate>
                          </Label>
                          <AvInput type="string" name="ediPad" id="usuario-ediPad" value={this.state.ediPad} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="delPadLabel" for="usuario-delPad">
                            <Translate contentKey="generadorApp.usuario.delPad">Del Pad</Translate>
                          </Label>
                          <AvInput type="string" name="delPad" id="usuario-delPad" value={this.state.delPad} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="relPadLabel" for="usuario-relPad">
                            <Translate contentKey="generadorApp.usuario.relPad">Rel Pad</Translate>
                          </Label>
                          <AvInput type="string" name="relPad" id="usuario-relPad" value={this.state.relPad} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="verDiarioLabel" for="usuario-verDiario">
                            <Translate contentKey="generadorApp.usuario.verDiario">Ver Diario</Translate>
                          </Label>
                          <AvInput type="string" name="verDiario" id="usuario-verDiario" value={this.state.verDiario} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cadDiarioLabel" for="usuario-cadDiario">
                            <Translate contentKey="generadorApp.usuario.cadDiario">Cad Diario</Translate>
                          </Label>
                          <AvInput type="string" name="cadDiario" id="usuario-cadDiario" value={this.state.cadDiario} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ediDiarioLabel" for="usuario-ediDiario">
                            <Translate contentKey="generadorApp.usuario.ediDiario">Edi Diario</Translate>
                          </Label>
                          <AvInput type="string" name="ediDiario" id="usuario-ediDiario" value={this.state.ediDiario} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="delDiarioLabel" for="usuario-delDiario">
                            <Translate contentKey="generadorApp.usuario.delDiario">Del Diario</Translate>
                          </Label>
                          <AvInput type="string" name="delDiario" id="usuario-delDiario" value={this.state.delDiario} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="relDiarioLabel" for="usuario-relDiario">
                            <Translate contentKey="generadorApp.usuario.relDiario">Rel Diario</Translate>
                          </Label>
                          <AvInput type="string" name="relDiario" id="usuario-relDiario" value={this.state.relDiario} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="verCategoriaLabel" for="usuario-verCategoria">
                            <Translate contentKey="generadorApp.usuario.verCategoria">Ver Categoria</Translate>
                          </Label>
                          <AvInput type="string" name="verCategoria" id="usuario-verCategoria" value={this.state.verCategoria} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cadCategoriaLabel" for="usuario-cadCategoria">
                            <Translate contentKey="generadorApp.usuario.cadCategoria">Cad Categoria</Translate>
                          </Label>
                          <AvInput type="string" name="cadCategoria" id="usuario-cadCategoria" value={this.state.cadCategoria} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ediCategoriaLabel" for="usuario-ediCategoria">
                            <Translate contentKey="generadorApp.usuario.ediCategoria">Edi Categoria</Translate>
                          </Label>
                          <AvInput type="string" name="ediCategoria" id="usuario-ediCategoria" value={this.state.ediCategoria} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="delCategoriaLabel" for="usuario-delCategoria">
                            <Translate contentKey="generadorApp.usuario.delCategoria">Del Categoria</Translate>
                          </Label>
                          <AvInput type="string" name="delCategoria" id="usuario-delCategoria" value={this.state.delCategoria} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
                          <Label id="verOperadoraLabel" for="usuario-verOperadora">
                            <Translate contentKey="generadorApp.usuario.verOperadora">Ver Operadora</Translate>
                          </Label>
                          <AvInput type="string" name="verOperadora" id="usuario-verOperadora" value={this.state.verOperadora} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cadOperadoraLabel" for="usuario-cadOperadora">
                            <Translate contentKey="generadorApp.usuario.cadOperadora">Cad Operadora</Translate>
                          </Label>
                          <AvInput type="string" name="cadOperadora" id="usuario-cadOperadora" value={this.state.cadOperadora} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ediOperadoraLabel" for="usuario-ediOperadora">
                            <Translate contentKey="generadorApp.usuario.ediOperadora">Edi Operadora</Translate>
                          </Label>
                          <AvInput type="string" name="ediOperadora" id="usuario-ediOperadora" value={this.state.ediOperadora} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="delOperadoraLabel" for="usuario-delOperadora">
                            <Translate contentKey="generadorApp.usuario.delOperadora">Del Operadora</Translate>
                          </Label>
                          <AvInput type="string" name="delOperadora" id="usuario-delOperadora" value={this.state.delOperadora} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="verPacienteLabel" for="usuario-verPaciente">
                            <Translate contentKey="generadorApp.usuario.verPaciente">Ver Paciente</Translate>
                          </Label>
                          <AvInput type="string" name="verPaciente" id="usuario-verPaciente" value={this.state.verPaciente} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cadPacienteLabel" for="usuario-cadPaciente">
                            <Translate contentKey="generadorApp.usuario.cadPaciente">Cad Paciente</Translate>
                          </Label>
                          <AvInput type="string" name="cadPaciente" id="usuario-cadPaciente" value={this.state.cadPaciente} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ediPacienteLabel" for="usuario-ediPaciente">
                            <Translate contentKey="generadorApp.usuario.ediPaciente">Edi Paciente</Translate>
                          </Label>
                          <AvInput type="string" name="ediPaciente" id="usuario-ediPaciente" value={this.state.ediPaciente} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="delPacienteLabel" for="usuario-delPaciente">
                            <Translate contentKey="generadorApp.usuario.delPaciente">Del Paciente</Translate>
                          </Label>
                          <AvInput type="string" name="delPaciente" id="usuario-delPaciente" value={this.state.delPaciente} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="relPacienteLabel" for="usuario-relPaciente">
                            <Translate contentKey="generadorApp.usuario.relPaciente">Rel Paciente</Translate>
                          </Label>
                          <AvInput type="string" name="relPaciente" id="usuario-relPaciente" value={this.state.relPaciente} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="verProfissionalLabel" for="usuario-verProfissional">
                            <Translate contentKey="generadorApp.usuario.verProfissional">Ver Profissional</Translate>
                          </Label>
                          <AvInput type="string" name="verProfissional" id="usuario-verProfissional" value={this.state.verProfissional} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cadProfissionalLabel" for="usuario-cadProfissional">
                            <Translate contentKey="generadorApp.usuario.cadProfissional">Cad Profissional</Translate>
                          </Label>
                          <AvInput type="string" name="cadProfissional" id="usuario-cadProfissional" value={this.state.cadProfissional} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ediProfissionalLabel" for="usuario-ediProfissional">
                            <Translate contentKey="generadorApp.usuario.ediProfissional">Edi Profissional</Translate>
                          </Label>
                          <AvInput type="string" name="ediProfissional" id="usuario-ediProfissional" value={this.state.ediProfissional} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="delProfissionalLabel" for="usuario-delProfissional">
                            <Translate contentKey="generadorApp.usuario.delProfissional">Del Profissional</Translate>
                          </Label>
                          <AvInput type="string" name="delProfissional" id="usuario-delProfissional" value={this.state.delProfissional} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
                          <Label id="relProfissionalLabel" for="usuario-relProfissional">
                            <Translate contentKey="generadorApp.usuario.relProfissional">Rel Profissional</Translate>
                          </Label>
                          <AvInput type="string" name="relProfissional" id="usuario-relProfissional" value={this.state.relProfissional} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="verPushLabel" for="usuario-verPush">
                            <Translate contentKey="generadorApp.usuario.verPush">Ver Push</Translate>
                          </Label>
                          <AvInput type="string" name="verPush" id="usuario-verPush" value={this.state.verPush} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cadPushPacienteLabel" for="usuario-cadPushPaciente">
                            <Translate contentKey="generadorApp.usuario.cadPushPaciente">Cad Push Paciente</Translate>
                          </Label>
                          <AvInput type="string" name="cadPushPaciente" id="usuario-cadPushPaciente" value={this.state.cadPushPaciente} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
                          <Label id="verOutrosLabel" for="usuario-verOutros">
                            <Translate contentKey="generadorApp.usuario.verOutros">Ver Outros</Translate>
                          </Label>
                          <AvInput type="string" name="verOutros" id="usuario-verOutros" value={this.state.verOutros} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cadOutrosLabel" for="usuario-cadOutros">
                            <Translate contentKey="generadorApp.usuario.cadOutros">Cad Outros</Translate>
                          </Label>
                          <AvInput type="string" name="cadOutros" id="usuario-cadOutros" value={this.state.cadOutros} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ediOutrosLabel" for="usuario-ediOutros">
                            <Translate contentKey="generadorApp.usuario.ediOutros">Edi Outros</Translate>
                          </Label>
                          <AvInput type="string" name="ediOutros" id="usuario-ediOutros" value={this.state.ediOutros} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="delOutrosLabel" for="usuario-delOutros">
                            <Translate contentKey="generadorApp.usuario.delOutros">Del Outros</Translate>
                          </Label>
                          <AvInput type="string" name="delOutros" id="usuario-delOutros" value={this.state.delOutros} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="relOutrosLabel" for="usuario-relOutros">
                            <Translate contentKey="generadorApp.usuario.relOutros">Rel Outros</Translate>
                          </Label>
                          <AvInput type="string" name="relOutros" id="usuario-relOutros" value={this.state.relOutros} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="verUnidadeEasyLabel" for="usuario-verUnidadeEasy">
                            <Translate contentKey="generadorApp.usuario.verUnidadeEasy">Ver Unidade Easy</Translate>
                          </Label>
                          <AvInput type="string" name="verUnidadeEasy" id="usuario-verUnidadeEasy" value={this.state.verUnidadeEasy} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cadUnidadeEasyLabel" for="usuario-cadUnidadeEasy">
                            <Translate contentKey="generadorApp.usuario.cadUnidadeEasy">Cad Unidade Easy</Translate>
                          </Label>
                          <AvInput type="string" name="cadUnidadeEasy" id="usuario-cadUnidadeEasy" value={this.state.cadUnidadeEasy} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ediUnidadeEasyLabel" for="usuario-ediUnidadeEasy">
                            <Translate contentKey="generadorApp.usuario.ediUnidadeEasy">Edi Unidade Easy</Translate>
                          </Label>
                          <AvInput type="string" name="ediUnidadeEasy" id="usuario-ediUnidadeEasy" value={this.state.ediUnidadeEasy} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="delUnidadeEasyLabel" for="usuario-delUnidadeEasy">
                            <Translate contentKey="generadorApp.usuario.delUnidadeEasy">Del Unidade Easy</Translate>
                          </Label>
                          <AvInput type="string" name="delUnidadeEasy" id="usuario-delUnidadeEasy" value={this.state.delUnidadeEasy} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="verUsuarioLabel" for="usuario-verUsuario">
                            <Translate contentKey="generadorApp.usuario.verUsuario">Ver Usuario</Translate>
                          </Label>
                          <AvInput type="string" name="verUsuario" id="usuario-verUsuario" value={this.state.verUsuario} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cadUsuarioLabel" for="usuario-cadUsuario">
                            <Translate contentKey="generadorApp.usuario.cadUsuario">Cad Usuario</Translate>
                          </Label>
                          <AvInput type="string" name="cadUsuario" id="usuario-cadUsuario" value={this.state.cadUsuario} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ediUsuarioLabel" for="usuario-ediUsuario">
                            <Translate contentKey="generadorApp.usuario.ediUsuario">Edi Usuario</Translate>
                          </Label>
                          <AvInput type="string" name="ediUsuario" id="usuario-ediUsuario" value={this.state.ediUsuario} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="delUsuarioLabel" for="usuario-delUsuario">
                            <Translate contentKey="generadorApp.usuario.delUsuario">Del Usuario</Translate>
                          </Label>
                          <AvInput type="string" name="delUsuario" id="usuario-delUsuario" value={this.state.delUsuario} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="verPtaResultadoLabel" for="usuario-verPtaResultado">
                            <Translate contentKey="generadorApp.usuario.verPtaResultado">Ver Pta Resultado</Translate>
                          </Label>
                          <AvInput type="string" name="verPtaResultado" id="usuario-verPtaResultado" value={this.state.verPtaResultado} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cadPtaResultadoLabel" for="usuario-cadPtaResultado">
                            <Translate contentKey="generadorApp.usuario.cadPtaResultado">Cad Pta Resultado</Translate>
                          </Label>
                          <AvInput type="string" name="cadPtaResultado" id="usuario-cadPtaResultado" value={this.state.cadPtaResultado} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="delPtaResultadoLabel" for="usuario-delPtaResultado">
                            <Translate contentKey="generadorApp.usuario.delPtaResultado">Del Pta Resultado</Translate>
                          </Label>
                          <AvInput type="string" name="delPtaResultado" id="usuario-delPtaResultado" value={this.state.delPtaResultado} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="verPtaAtividadeLabel" for="usuario-verPtaAtividade">
                            <Translate contentKey="generadorApp.usuario.verPtaAtividade">Ver Pta Atividade</Translate>
                          </Label>
                          <AvInput type="string" name="verPtaAtividade" id="usuario-verPtaAtividade" value={this.state.verPtaAtividade} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cadPtaAtividadeLabel" for="usuario-cadPtaAtividade">
                            <Translate contentKey="generadorApp.usuario.cadPtaAtividade">Cad Pta Atividade</Translate>
                          </Label>
                          <AvInput type="string" name="cadPtaAtividade" id="usuario-cadPtaAtividade" value={this.state.cadPtaAtividade} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="delPtaAtividadeLabel" for="usuario-delPtaAtividade">
                            <Translate contentKey="generadorApp.usuario.delPtaAtividade">Del Pta Atividade</Translate>
                          </Label>
                          <AvInput type="string" name="delPtaAtividade" id="usuario-delPtaAtividade" value={this.state.delPtaAtividade} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
                          <Label id="verProntuarioLabel" for="usuario-verProntuario">
                            <Translate contentKey="generadorApp.usuario.verProntuario">Ver Prontuario</Translate>
                          </Label>
                          <AvInput type="string" name="verProntuario" id="usuario-verProntuario" value={this.state.verProntuario} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cadProntuarioLabel" for="usuario-cadProntuario">
                            <Translate contentKey="generadorApp.usuario.cadProntuario">Cad Prontuario</Translate>
                          </Label>
                          <AvInput type="string" name="cadProntuario" id="usuario-cadProntuario" value={this.state.cadProntuario} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ediProntuarioLabel" for="usuario-ediProntuario">
                            <Translate contentKey="generadorApp.usuario.ediProntuario">Edi Prontuario</Translate>
                          </Label>
                          <AvInput type="string" name="ediProntuario" id="usuario-ediProntuario" value={this.state.ediProntuario} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="delProntuarioLabel" for="usuario-delProntuario">
                            <Translate contentKey="generadorApp.usuario.delProntuario">Del Prontuario</Translate>
                          </Label>
                          <AvInput type="string" name="delProntuario" id="usuario-delProntuario" value={this.state.delProntuario} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
                          <Label id="autorizacaoValorFinanceiroLabel" for="usuario-autorizacaoValorFinanceiro">
                            <Translate contentKey="generadorApp.usuario.autorizacaoValorFinanceiro">Autorizacao Valor Financeiro</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="autorizacaoValorFinanceiro"
                            id="usuario-autorizacaoValorFinanceiro"
                            value={this.state.autorizacaoValorFinanceiro}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
                          <Label id="envioRecusaLabel" for="usuario-envioRecusa">
                            <Translate contentKey="generadorApp.usuario.envioRecusa">Envio Recusa</Translate>
                          </Label>
                          <AvInput type="string" name="envioRecusa" id="usuario-envioRecusa" value={this.state.envioRecusa} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
                          <Label id="envioAvaliacaoLabel" for="usuario-envioAvaliacao">
                            <Translate contentKey="generadorApp.usuario.envioAvaliacao">Envio Avaliacao</Translate>
                          </Label>
                          <AvInput type="string" name="envioAvaliacao" id="usuario-envioAvaliacao" value={this.state.envioAvaliacao} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="envioPedidoLabel" for="usuario-envioPedido">
                            <Translate contentKey="generadorApp.usuario.envioPedido">Envio Pedido</Translate>
                          </Label>
                          <AvInput type="string" name="envioPedido" id="usuario-envioPedido" value={this.state.envioPedido} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="usuario-ativo">
                            <Translate contentKey="generadorApp.usuario.ativo">Ativo</Translate>
                          </Label>
                          <AvInput type="string" name="ativo" id="usuario-ativo" value={this.state.ativo} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="envioGlosadoLabel" for="usuario-envioGlosado">
                            <Translate contentKey="generadorApp.usuario.envioGlosado">Envio Glosado</Translate>
                          </Label>
                          <AvInput type="string" name="envioGlosado" id="usuario-envioGlosado" value={this.state.envioGlosado} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="emergenciaLabel" for="usuario-emergencia">
                            <Translate contentKey="generadorApp.usuario.emergencia">Emergencia</Translate>
                          </Label>
                          <AvInput type="string" name="emergencia" id="usuario-emergencia" value={this.state.emergencia} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="tokenLabel" for="usuario-token">
                            <Translate contentKey="generadorApp.usuario.token">Token</Translate>
                          </Label>
                          <AvInput type="string" name="token" id="usuario-token" value={this.state.token} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="editAtendimentoLabel" for="usuario-editAtendimento">
                            <Translate contentKey="generadorApp.usuario.editAtendimento">Edit Atendimento</Translate>
                          </Label>
                          <AvInput type="string" name="editAtendimento" id="usuario-editAtendimento" value={this.state.editAtendimento} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ouvirLigacaoLabel" for="usuario-ouvirLigacao">
                            <Translate contentKey="generadorApp.usuario.ouvirLigacao">Ouvir Ligacao</Translate>
                          </Label>
                          <AvInput type="string" name="ouvirLigacao" id="usuario-ouvirLigacao" value={this.state.ouvirLigacao} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
                          <Label id="prorrogarPadLabel" for="usuario-prorrogarPad">
                            <Translate contentKey="generadorApp.usuario.prorrogarPad">Prorrogar Pad</Translate>
                          </Label>
                          <AvInput type="string" name="prorrogarPad" id="usuario-prorrogarPad" value={this.state.prorrogarPad} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
                          <Label id="cadMatMedLabel" for="usuario-cadMatMed">
                            <Translate contentKey="generadorApp.usuario.cadMatMed">Cad Mat Med</Translate>
                          </Label>
                          <AvInput type="string" name="cadMatMed" id="usuario-cadMatMed" value={this.state.cadMatMed} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ediMatMedLabel" for="usuario-ediMatMed">
                            <Translate contentKey="generadorApp.usuario.ediMatMed">Edi Mat Med</Translate>
                          </Label>
                          <AvInput type="string" name="ediMatMed" id="usuario-ediMatMed" value={this.state.ediMatMed} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="delMatMedLabel" for="usuario-delMatMed">
                            <Translate contentKey="generadorApp.usuario.delMatMed">Del Mat Med</Translate>
                          </Label>
                          <AvInput type="string" name="delMatMed" id="usuario-delMatMed" value={this.state.delMatMed} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="verColPtaLabel" for="usuario-verColPta">
                            <Translate contentKey="generadorApp.usuario.verColPta">Ver Col Pta</Translate>
                          </Label>
                          <AvInput type="string" name="verColPta" id="usuario-verColPta" value={this.state.verColPta} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="verColFotoLabel" for="usuario-verColFoto">
                            <Translate contentKey="generadorApp.usuario.verColFoto">Ver Col Foto</Translate>
                          </Label>
                          <AvInput type="string" name="verColFoto" id="usuario-verColFoto" value={this.state.verColFoto} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="verColLcLabel" for="usuario-verColLc">
                            <Translate contentKey="generadorApp.usuario.verColLc">Ver Col Lc</Translate>
                          </Label>
                          <AvInput type="string" name="verColLc" id="usuario-verColLc" value={this.state.verColLc} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
                          <Label id="copiarEvolucaoLabel" for="usuario-copiarEvolucao">
                            <Translate contentKey="generadorApp.usuario.copiarEvolucao">Copiar Evolucao</Translate>
                          </Label>
                          <AvInput type="string" name="copiarEvolucao" id="usuario-copiarEvolucao" value={this.state.copiarEvolucao} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="copiarNomeProfLabel" for="usuario-copiarNomeProf">
                            <Translate contentKey="generadorApp.usuario.copiarNomeProf">Copiar Nome Prof</Translate>
                          </Label>
                          <AvInput type="string" name="copiarNomeProf" id="usuario-copiarNomeProf" value={this.state.copiarNomeProf} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
                          <Label id="idAreaAtuacaoLabel" for="usuario-idAreaAtuacao">
                            <Translate contentKey="generadorApp.usuario.idAreaAtuacao">Id Area Atuacao</Translate>
                          </Label>

                          <AvInput type="text" name="idAreaAtuacao" id="usuario-idAreaAtuacao" value={this.state.idAreaAtuacao} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="envioCidSemPtaLabel" for="usuario-envioCidSemPta">
                            <Translate contentKey="generadorApp.usuario.envioCidSemPta">Envio Cid Sem Pta</Translate>
                          </Label>
                          <AvInput type="string" name="envioCidSemPta" id="usuario-envioCidSemPta" value={this.state.envioCidSemPta} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
                          <Label id="envioMelhoraTempoLabel" check>
                            <AvInput id="usuario-envioMelhoraTempo" type="checkbox" className="form-control" name="envioMelhoraTempo" />
                            <Translate contentKey="generadorApp.usuario.envioMelhoraTempo">Envio Melhora Tempo</Translate>
                          </Label>
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="senhaChatLabel" for="usuario-senhaChat">
                            <Translate contentKey="generadorApp.usuario.senhaChat">Senha Chat</Translate>
                          </Label>

                          <AvInput type="text" name="senhaChat" id="usuario-senhaChat" value={this.state.senhaChat} />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="usuario-unidade">
                              <Translate contentKey="generadorApp.usuario.unidade">Unidade</Translate>
                            </Label>
                            <AvInput id="usuario-unidade" type="select" className="form-control" name="unidadeId">
                              <option value="" key="0" />
                              {unidadeEasies
                                ? unidadeEasies.map(otherEntity => (
                                    <option value={otherEntity.id} key={otherEntity.id}>
                                      {otherEntity.razaoSocial}
                                    </option>
                                  ))
                                : null}
                            </AvInput>
                          </div>
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="usuario-idTipoUsuario">
                              <Translate contentKey="generadorApp.usuario.idTipoUsuario">Id Tipo Usuario</Translate>
                            </Label>
                            <AvInput id="usuario-idTipoUsuario" type="select" className="form-control" name="idTipoUsuarioId">
                              <option value="" key="0" />
                              {tipoUsuarios
                                ? tipoUsuarios.map(otherEntity => (
                                    <option value={otherEntity.id} key={otherEntity.id}>
                                      {otherEntity.id}
                                    </option>
                                  ))
                                : null}
                            </AvInput>
                          </div>
                        </Row>
                      </Col>
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="entity.validation.filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="entity.validation.clean">Clean</Translate>
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
                      <th className="hand" onClick={this.sort('idOperadora')}>
                        <Translate contentKey="generadorApp.usuario.idOperadora">Id Operadora</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('senha')}>
                        <Translate contentKey="generadorApp.usuario.senha">Senha</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('nome')}>
                        <Translate contentKey="generadorApp.usuario.nome">Nome</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('email')}>
                        <Translate contentKey="generadorApp.usuario.email">Email</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('telefone')}>
                        <Translate contentKey="generadorApp.usuario.telefone">Telefone</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('celular')}>
                        <Translate contentKey="generadorApp.usuario.celular">Celular</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cpf')}>
                        <Translate contentKey="generadorApp.usuario.cpf">Cpf</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('rg')}>
                        <Translate contentKey="generadorApp.usuario.rg">Rg</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('sexo')}>
                        <Translate contentKey="generadorApp.usuario.sexo">Sexo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('nascimento')}>
                        <Translate contentKey="generadorApp.usuario.nascimento">Nascimento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('verAtendimento')}>
                        <Translate contentKey="generadorApp.usuario.verAtendimento">Ver Atendimento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cadAtendimento')}>
                        <Translate contentKey="generadorApp.usuario.cadAtendimento">Cad Atendimento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ediAtendimento')}>
                        <Translate contentKey="generadorApp.usuario.ediAtendimento">Edi Atendimento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('baixaManualAtendimento')}>
                        <Translate contentKey="generadorApp.usuario.baixaManualAtendimento">Baixa Manual Atendimento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('delAtendimento')}>
                        <Translate contentKey="generadorApp.usuario.delAtendimento">Del Atendimento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('relAtendimento')}>
                        <Translate contentKey="generadorApp.usuario.relAtendimento">Rel Atendimento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('verPad')}>
                        <Translate contentKey="generadorApp.usuario.verPad">Ver Pad</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cadPad')}>
                        <Translate contentKey="generadorApp.usuario.cadPad">Cad Pad</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ediPad')}>
                        <Translate contentKey="generadorApp.usuario.ediPad">Edi Pad</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('delPad')}>
                        <Translate contentKey="generadorApp.usuario.delPad">Del Pad</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('relPad')}>
                        <Translate contentKey="generadorApp.usuario.relPad">Rel Pad</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('verDiario')}>
                        <Translate contentKey="generadorApp.usuario.verDiario">Ver Diario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cadDiario')}>
                        <Translate contentKey="generadorApp.usuario.cadDiario">Cad Diario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ediDiario')}>
                        <Translate contentKey="generadorApp.usuario.ediDiario">Edi Diario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('delDiario')}>
                        <Translate contentKey="generadorApp.usuario.delDiario">Del Diario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('relDiario')}>
                        <Translate contentKey="generadorApp.usuario.relDiario">Rel Diario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('verCategoria')}>
                        <Translate contentKey="generadorApp.usuario.verCategoria">Ver Categoria</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cadCategoria')}>
                        <Translate contentKey="generadorApp.usuario.cadCategoria">Cad Categoria</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ediCategoria')}>
                        <Translate contentKey="generadorApp.usuario.ediCategoria">Edi Categoria</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('delCategoria')}>
                        <Translate contentKey="generadorApp.usuario.delCategoria">Del Categoria</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('verEspecialidade')}>
                        <Translate contentKey="generadorApp.usuario.verEspecialidade">Ver Especialidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cadEspecialidade')}>
                        <Translate contentKey="generadorApp.usuario.cadEspecialidade">Cad Especialidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ediEspecialidade')}>
                        <Translate contentKey="generadorApp.usuario.ediEspecialidade">Edi Especialidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('delEspecialidade')}>
                        <Translate contentKey="generadorApp.usuario.delEspecialidade">Del Especialidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('relEspecialidade')}>
                        <Translate contentKey="generadorApp.usuario.relEspecialidade">Rel Especialidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('verEspecialidadeValor')}>
                        <Translate contentKey="generadorApp.usuario.verEspecialidadeValor">Ver Especialidade Valor</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cadEspecialidadeValor')}>
                        <Translate contentKey="generadorApp.usuario.cadEspecialidadeValor">Cad Especialidade Valor</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ediEspecialidadeValor')}>
                        <Translate contentKey="generadorApp.usuario.ediEspecialidadeValor">Edi Especialidade Valor</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('delEspecialidadeValor')}>
                        <Translate contentKey="generadorApp.usuario.delEspecialidadeValor">Del Especialidade Valor</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('relEspecialidadeValor')}>
                        <Translate contentKey="generadorApp.usuario.relEspecialidadeValor">Rel Especialidade Valor</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('verOperadora')}>
                        <Translate contentKey="generadorApp.usuario.verOperadora">Ver Operadora</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cadOperadora')}>
                        <Translate contentKey="generadorApp.usuario.cadOperadora">Cad Operadora</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ediOperadora')}>
                        <Translate contentKey="generadorApp.usuario.ediOperadora">Edi Operadora</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('delOperadora')}>
                        <Translate contentKey="generadorApp.usuario.delOperadora">Del Operadora</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('verPaciente')}>
                        <Translate contentKey="generadorApp.usuario.verPaciente">Ver Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cadPaciente')}>
                        <Translate contentKey="generadorApp.usuario.cadPaciente">Cad Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ediPaciente')}>
                        <Translate contentKey="generadorApp.usuario.ediPaciente">Edi Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('delPaciente')}>
                        <Translate contentKey="generadorApp.usuario.delPaciente">Del Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('relPaciente')}>
                        <Translate contentKey="generadorApp.usuario.relPaciente">Rel Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('verProfissional')}>
                        <Translate contentKey="generadorApp.usuario.verProfissional">Ver Profissional</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cadProfissional')}>
                        <Translate contentKey="generadorApp.usuario.cadProfissional">Cad Profissional</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ediProfissional')}>
                        <Translate contentKey="generadorApp.usuario.ediProfissional">Edi Profissional</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('delProfissional')}>
                        <Translate contentKey="generadorApp.usuario.delProfissional">Del Profissional</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativProfissional')}>
                        <Translate contentKey="generadorApp.usuario.ativProfissional">Ativ Profissional</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('relProfissional')}>
                        <Translate contentKey="generadorApp.usuario.relProfissional">Rel Profissional</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('verPush')}>
                        <Translate contentKey="generadorApp.usuario.verPush">Ver Push</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cadPushPaciente')}>
                        <Translate contentKey="generadorApp.usuario.cadPushPaciente">Cad Push Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cadPushProfissional')}>
                        <Translate contentKey="generadorApp.usuario.cadPushProfissional">Cad Push Profissional</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('verTermoPaciente')}>
                        <Translate contentKey="generadorApp.usuario.verTermoPaciente">Ver Termo Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ediTermoPaciente')}>
                        <Translate contentKey="generadorApp.usuario.ediTermoPaciente">Edi Termo Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('verTermoProfissional')}>
                        <Translate contentKey="generadorApp.usuario.verTermoProfissional">Ver Termo Profissional</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ediTermoProfissional')}>
                        <Translate contentKey="generadorApp.usuario.ediTermoProfissional">Edi Termo Profissional</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('verOutros')}>
                        <Translate contentKey="generadorApp.usuario.verOutros">Ver Outros</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cadOutros')}>
                        <Translate contentKey="generadorApp.usuario.cadOutros">Cad Outros</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ediOutros')}>
                        <Translate contentKey="generadorApp.usuario.ediOutros">Edi Outros</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('delOutros')}>
                        <Translate contentKey="generadorApp.usuario.delOutros">Del Outros</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('relOutros')}>
                        <Translate contentKey="generadorApp.usuario.relOutros">Rel Outros</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('verUnidadeEasy')}>
                        <Translate contentKey="generadorApp.usuario.verUnidadeEasy">Ver Unidade Easy</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cadUnidadeEasy')}>
                        <Translate contentKey="generadorApp.usuario.cadUnidadeEasy">Cad Unidade Easy</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ediUnidadeEasy')}>
                        <Translate contentKey="generadorApp.usuario.ediUnidadeEasy">Edi Unidade Easy</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('delUnidadeEasy')}>
                        <Translate contentKey="generadorApp.usuario.delUnidadeEasy">Del Unidade Easy</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('verUsuario')}>
                        <Translate contentKey="generadorApp.usuario.verUsuario">Ver Usuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cadUsuario')}>
                        <Translate contentKey="generadorApp.usuario.cadUsuario">Cad Usuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ediUsuario')}>
                        <Translate contentKey="generadorApp.usuario.ediUsuario">Edi Usuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('delUsuario')}>
                        <Translate contentKey="generadorApp.usuario.delUsuario">Del Usuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('verPtaResultado')}>
                        <Translate contentKey="generadorApp.usuario.verPtaResultado">Ver Pta Resultado</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cadPtaResultado')}>
                        <Translate contentKey="generadorApp.usuario.cadPtaResultado">Cad Pta Resultado</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('delPtaResultado')}>
                        <Translate contentKey="generadorApp.usuario.delPtaResultado">Del Pta Resultado</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('verPtaAtividade')}>
                        <Translate contentKey="generadorApp.usuario.verPtaAtividade">Ver Pta Atividade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cadPtaAtividade')}>
                        <Translate contentKey="generadorApp.usuario.cadPtaAtividade">Cad Pta Atividade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('delPtaAtividade')}>
                        <Translate contentKey="generadorApp.usuario.delPtaAtividade">Del Pta Atividade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('permissaoUsuario')}>
                        <Translate contentKey="generadorApp.usuario.permissaoUsuario">Permissao Usuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('verProntuario')}>
                        <Translate contentKey="generadorApp.usuario.verProntuario">Ver Prontuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cadProntuario')}>
                        <Translate contentKey="generadorApp.usuario.cadProntuario">Cad Prontuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ediProntuario')}>
                        <Translate contentKey="generadorApp.usuario.ediProntuario">Edi Prontuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('delProntuario')}>
                        <Translate contentKey="generadorApp.usuario.delProntuario">Del Prontuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('delProntuarioFoto')}>
                        <Translate contentKey="generadorApp.usuario.delProntuarioFoto">Del Prontuario Foto</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('valoresFinanceiro')}>
                        <Translate contentKey="generadorApp.usuario.valoresFinanceiro">Valores Financeiro</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('autorizacaoValorFinanceiro')}>
                        <Translate contentKey="generadorApp.usuario.autorizacaoValorFinanceiro">Autorizacao Valor Financeiro</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('confirmarPagamentoFinanceiro')}>
                        <Translate contentKey="generadorApp.usuario.confirmarPagamentoFinanceiro">Confirmar Pagamento Financeiro</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('gerenciarSorteios')}>
                        <Translate contentKey="generadorApp.usuario.gerenciarSorteios">Gerenciar Sorteios</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('envioRecusa')}>
                        <Translate contentKey="generadorApp.usuario.envioRecusa">Envio Recusa</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('envioIntercorrencia')}>
                        <Translate contentKey="generadorApp.usuario.envioIntercorrencia">Envio Intercorrencia</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('envioCancelamento')}>
                        <Translate contentKey="generadorApp.usuario.envioCancelamento">Envio Cancelamento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('envioAvaliacao')}>
                        <Translate contentKey="generadorApp.usuario.envioAvaliacao">Envio Avaliacao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('envioPedido')}>
                        <Translate contentKey="generadorApp.usuario.envioPedido">Envio Pedido</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('alertaAtendimento')}>
                        <Translate contentKey="generadorApp.usuario.alertaAtendimento">Alerta Atendimento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.usuario.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('envioGlosado')}>
                        <Translate contentKey="generadorApp.usuario.envioGlosado">Envio Glosado</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('emergencia')}>
                        <Translate contentKey="generadorApp.usuario.emergencia">Emergencia</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('token')}>
                        <Translate contentKey="generadorApp.usuario.token">Token</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('editAtendimento')}>
                        <Translate contentKey="generadorApp.usuario.editAtendimento">Edit Atendimento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ouvirLigacao')}>
                        <Translate contentKey="generadorApp.usuario.ouvirLigacao">Ouvir Ligacao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('verPainelIndicadores')}>
                        <Translate contentKey="generadorApp.usuario.verPainelIndicadores">Ver Painel Indicadores</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('prorrogarPad')}>
                        <Translate contentKey="generadorApp.usuario.prorrogarPad">Prorrogar Pad</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cancelarAtendMassa')}>
                        <Translate contentKey="generadorApp.usuario.cancelarAtendMassa">Cancelar Atend Massa</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cadMatMed')}>
                        <Translate contentKey="generadorApp.usuario.cadMatMed">Cad Mat Med</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ediMatMed')}>
                        <Translate contentKey="generadorApp.usuario.ediMatMed">Edi Mat Med</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('delMatMed')}>
                        <Translate contentKey="generadorApp.usuario.delMatMed">Del Mat Med</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('verColPta')}>
                        <Translate contentKey="generadorApp.usuario.verColPta">Ver Col Pta</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('verColFoto')}>
                        <Translate contentKey="generadorApp.usuario.verColFoto">Ver Col Foto</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('verColLc')}>
                        <Translate contentKey="generadorApp.usuario.verColLc">Ver Col Lc</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('verAtendCancelado')}>
                        <Translate contentKey="generadorApp.usuario.verAtendCancelado">Ver Atend Cancelado</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('verAtendAgConfirmacao')}>
                        <Translate contentKey="generadorApp.usuario.verAtendAgConfirmacao">Ver Atend Ag Confirmacao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ediGeoLocalizacaoAtendimento')}>
                        <Translate contentKey="generadorApp.usuario.ediGeoLocalizacaoAtendimento">
                          Edi Geo Localizacao Atendimento
                        </Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('copiarEvolucao')}>
                        <Translate contentKey="generadorApp.usuario.copiarEvolucao">Copiar Evolucao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('copiarNomeProf')}>
                        <Translate contentKey="generadorApp.usuario.copiarNomeProf">Copiar Nome Prof</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('copiarRegistroProf')}>
                        <Translate contentKey="generadorApp.usuario.copiarRegistroProf">Copiar Registro Prof</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idAreaAtuacao')}>
                        <Translate contentKey="generadorApp.usuario.idAreaAtuacao">Id Area Atuacao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('envioCidSemPta')}>
                        <Translate contentKey="generadorApp.usuario.envioCidSemPta">Envio Cid Sem Pta</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('envioAnaliseResultadoEsperado')}>
                        <Translate contentKey="generadorApp.usuario.envioAnaliseResultadoEsperado">
                          Envio Analise Resultado Esperado
                        </Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('envioDescumprimento')}>
                        <Translate contentKey="generadorApp.usuario.envioDescumprimento">Envio Descumprimento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('envioMelhoraTempo')}>
                        <Translate contentKey="generadorApp.usuario.envioMelhoraTempo">Envio Melhora Tempo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('senhaChat')}>
                        <Translate contentKey="generadorApp.usuario.senhaChat">Senha Chat</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.usuario.unidade">Unidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.usuario.idTipoUsuario">Id Tipo Usuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

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

                        <td>{usuario.idOperadora}</td>

                        <td>{usuario.senha}</td>

                        <td>{usuario.nome}</td>

                        <td>{usuario.email}</td>

                        <td>{usuario.telefone}</td>

                        <td>{usuario.celular}</td>

                        <td>{usuario.cpf}</td>

                        <td>{usuario.rg}</td>

                        <td>{usuario.sexo}</td>

                        <td>
                          <TextFormat type="date" value={usuario.nascimento} format={APP_LOCAL_DATE_FORMAT} />
                        </td>

                        <td>{usuario.verAtendimento}</td>

                        <td>{usuario.cadAtendimento}</td>

                        <td>{usuario.ediAtendimento}</td>

                        <td>{usuario.baixaManualAtendimento}</td>

                        <td>{usuario.delAtendimento}</td>

                        <td>{usuario.relAtendimento}</td>

                        <td>{usuario.verPad}</td>

                        <td>{usuario.cadPad}</td>

                        <td>{usuario.ediPad}</td>

                        <td>{usuario.delPad}</td>

                        <td>{usuario.relPad}</td>

                        <td>{usuario.verDiario}</td>

                        <td>{usuario.cadDiario}</td>

                        <td>{usuario.ediDiario}</td>

                        <td>{usuario.delDiario}</td>

                        <td>{usuario.relDiario}</td>

                        <td>{usuario.verCategoria}</td>

                        <td>{usuario.cadCategoria}</td>

                        <td>{usuario.ediCategoria}</td>

                        <td>{usuario.delCategoria}</td>

                        <td>{usuario.verEspecialidade}</td>

                        <td>{usuario.cadEspecialidade}</td>

                        <td>{usuario.ediEspecialidade}</td>

                        <td>{usuario.delEspecialidade}</td>

                        <td>{usuario.relEspecialidade}</td>

                        <td>{usuario.verEspecialidadeValor}</td>

                        <td>{usuario.cadEspecialidadeValor}</td>

                        <td>{usuario.ediEspecialidadeValor}</td>

                        <td>{usuario.delEspecialidadeValor}</td>

                        <td>{usuario.relEspecialidadeValor}</td>

                        <td>{usuario.verOperadora}</td>

                        <td>{usuario.cadOperadora}</td>

                        <td>{usuario.ediOperadora}</td>

                        <td>{usuario.delOperadora}</td>

                        <td>{usuario.verPaciente}</td>

                        <td>{usuario.cadPaciente}</td>

                        <td>{usuario.ediPaciente}</td>

                        <td>{usuario.delPaciente}</td>

                        <td>{usuario.relPaciente}</td>

                        <td>{usuario.verProfissional}</td>

                        <td>{usuario.cadProfissional}</td>

                        <td>{usuario.ediProfissional}</td>

                        <td>{usuario.delProfissional}</td>

                        <td>{usuario.ativProfissional}</td>

                        <td>{usuario.relProfissional}</td>

                        <td>{usuario.verPush}</td>

                        <td>{usuario.cadPushPaciente}</td>

                        <td>{usuario.cadPushProfissional}</td>

                        <td>{usuario.verTermoPaciente}</td>

                        <td>{usuario.ediTermoPaciente}</td>

                        <td>{usuario.verTermoProfissional}</td>

                        <td>{usuario.ediTermoProfissional}</td>

                        <td>{usuario.verOutros}</td>

                        <td>{usuario.cadOutros}</td>

                        <td>{usuario.ediOutros}</td>

                        <td>{usuario.delOutros}</td>

                        <td>{usuario.relOutros}</td>

                        <td>{usuario.verUnidadeEasy}</td>

                        <td>{usuario.cadUnidadeEasy}</td>

                        <td>{usuario.ediUnidadeEasy}</td>

                        <td>{usuario.delUnidadeEasy}</td>

                        <td>{usuario.verUsuario}</td>

                        <td>{usuario.cadUsuario}</td>

                        <td>{usuario.ediUsuario}</td>

                        <td>{usuario.delUsuario}</td>

                        <td>{usuario.verPtaResultado}</td>

                        <td>{usuario.cadPtaResultado}</td>

                        <td>{usuario.delPtaResultado}</td>

                        <td>{usuario.verPtaAtividade}</td>

                        <td>{usuario.cadPtaAtividade}</td>

                        <td>{usuario.delPtaAtividade}</td>

                        <td>{usuario.permissaoUsuario}</td>

                        <td>{usuario.verProntuario}</td>

                        <td>{usuario.cadProntuario}</td>

                        <td>{usuario.ediProntuario}</td>

                        <td>{usuario.delProntuario}</td>

                        <td>{usuario.delProntuarioFoto}</td>

                        <td>{usuario.valoresFinanceiro}</td>

                        <td>{usuario.autorizacaoValorFinanceiro}</td>

                        <td>{usuario.confirmarPagamentoFinanceiro}</td>

                        <td>{usuario.gerenciarSorteios}</td>

                        <td>{usuario.envioRecusa}</td>

                        <td>{usuario.envioIntercorrencia}</td>

                        <td>{usuario.envioCancelamento}</td>

                        <td>{usuario.envioAvaliacao}</td>

                        <td>{usuario.envioPedido}</td>

                        <td>{usuario.alertaAtendimento}</td>

                        <td>{usuario.ativo}</td>

                        <td>{usuario.envioGlosado}</td>

                        <td>{usuario.emergencia}</td>

                        <td>{usuario.token}</td>

                        <td>{usuario.editAtendimento}</td>

                        <td>{usuario.ouvirLigacao}</td>

                        <td>{usuario.verPainelIndicadores}</td>

                        <td>{usuario.prorrogarPad}</td>

                        <td>{usuario.cancelarAtendMassa}</td>

                        <td>{usuario.cadMatMed}</td>

                        <td>{usuario.ediMatMed}</td>

                        <td>{usuario.delMatMed}</td>

                        <td>{usuario.verColPta}</td>

                        <td>{usuario.verColFoto}</td>

                        <td>{usuario.verColLc}</td>

                        <td>{usuario.verAtendCancelado}</td>

                        <td>{usuario.verAtendAgConfirmacao}</td>

                        <td>{usuario.ediGeoLocalizacaoAtendimento}</td>

                        <td>{usuario.copiarEvolucao}</td>

                        <td>{usuario.copiarNomeProf}</td>

                        <td>{usuario.copiarRegistroProf}</td>

                        <td>{usuario.idAreaAtuacao}</td>

                        <td>{usuario.envioCidSemPta}</td>

                        <td>{usuario.envioAnaliseResultadoEsperado}</td>

                        <td>{usuario.envioDescumprimento}</td>

                        <td>{usuario.envioMelhoraTempo ? 'true' : 'false'}</td>

                        <td>{usuario.senhaChat}</td>
                        <td>{usuario.unidade ? <Link to={`unidade-easy/${usuario.unidade.id}`}>{usuario.unidade.id}</Link> : ''}</td>
                        <td>
                          {usuario.idTipoUsuario ? (
                            <Link to={`tipo-usuario/${usuario.idTipoUsuario.id}`}>{usuario.idTipoUsuario.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${usuario.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${usuario.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${usuario.id}/delete`} color="danger" size="sm">
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
