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
import { getEntities } from './paciente.reducer';
import { IPaciente } from 'app/shared/model/paciente.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPacienteProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPacienteBaseState {
  idUnidade: any;
  idFranquia: any;
  idCidade: any;
  idCidadeFamiliar: any;
  idGrauParentesco: any;
  senha: any;
  nome: any;
  email: any;
  cpf: any;
  rg: any;
  registro: any;
  nascimento: any;
  sexo: any;
  telefone: any;
  telefone2: any;
  celular: any;
  celular1: any;
  cep: any;
  endereco: any;
  numero: any;
  complemento: any;
  bairro: any;
  cidade: any;
  uf: any;
  latitude: any;
  longitude: any;
  responsavelFamiliar: any;
  emailFamiliar: any;
  cpfFamiliar: any;
  rgFamiliar: any;
  nascimentoFamiliar: any;
  sexoFamiliar: any;
  telefoneFamiliar: any;
  telefone2Familiar: any;
  celularFamiliar: any;
  celular2Familiar: any;
  cepFamiliar: any;
  enderecoFamiliar: any;
  numeroFamiliar: any;
  complementoFamiliar: any;
  bairroFamiliar: any;
  cidadeFamiliar: any;
  ufFamiliar: any;
  latitudeFamiliar: any;
  longitudeFamiliar: any;
  observacao: any;
  aph: any;
  nivelComplexidade: any;
  passagemPs: any;
  obsPs: any;
  passagemInternacao: any;
  obsInternacao: any;
  custoTotal: any;
  observacaoFamiliar: any;
  mesmoEndereco: any;
  acessoFamiliar: any;
  comResponsavel: any;
  cadastroCompleto: any;
  ativo: any;
  dataPost: any;
  detalhes: any;
  tipohospital: any;
  liminar: any;
  expoToken: any;
  profissionalPref: any;
  senhaChat: any;
  atendimento: any;
  atendimentoAssinaturas: any;
  diario: any;
  pacienteDadosCartao: any;
  pacienteDiagnostico: any;
  pacienteDiario: any;
  pacienteEnqueteApp: any;
  pacienteOperadora: any;
  pacientePedido: any;
  pacientePush: any;
  pacienteStatusAtual: any;
  pad: any;
  questionarios: any;
}
export interface IPacienteState extends IPacienteBaseState, IPaginationBaseState {}

export class Paciente extends React.Component<IPacienteProps, IPacienteState> {
  private myFormRef: any;

  constructor(props: IPacienteProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getPacienteState(this.props.location)
    };
  }

  getPacienteState = (location): IPacienteBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const idUnidade = url.searchParams.get('idUnidade') || '';
    const idFranquia = url.searchParams.get('idFranquia') || '';
    const idCidade = url.searchParams.get('idCidade') || '';
    const idCidadeFamiliar = url.searchParams.get('idCidadeFamiliar') || '';
    const idGrauParentesco = url.searchParams.get('idGrauParentesco') || '';
    const senha = url.searchParams.get('senha') || '';
    const nome = url.searchParams.get('nome') || '';
    const email = url.searchParams.get('email') || '';
    const cpf = url.searchParams.get('cpf') || '';
    const rg = url.searchParams.get('rg') || '';
    const registro = url.searchParams.get('registro') || '';
    const nascimento = url.searchParams.get('nascimento') || '';
    const sexo = url.searchParams.get('sexo') || '';
    const telefone = url.searchParams.get('telefone') || '';
    const telefone2 = url.searchParams.get('telefone2') || '';
    const celular = url.searchParams.get('celular') || '';
    const celular1 = url.searchParams.get('celular1') || '';
    const cep = url.searchParams.get('cep') || '';
    const endereco = url.searchParams.get('endereco') || '';
    const numero = url.searchParams.get('numero') || '';
    const complemento = url.searchParams.get('complemento') || '';
    const bairro = url.searchParams.get('bairro') || '';
    const cidade = url.searchParams.get('cidade') || '';
    const uf = url.searchParams.get('uf') || '';
    const latitude = url.searchParams.get('latitude') || '';
    const longitude = url.searchParams.get('longitude') || '';
    const responsavelFamiliar = url.searchParams.get('responsavelFamiliar') || '';
    const emailFamiliar = url.searchParams.get('emailFamiliar') || '';
    const cpfFamiliar = url.searchParams.get('cpfFamiliar') || '';
    const rgFamiliar = url.searchParams.get('rgFamiliar') || '';
    const nascimentoFamiliar = url.searchParams.get('nascimentoFamiliar') || '';
    const sexoFamiliar = url.searchParams.get('sexoFamiliar') || '';
    const telefoneFamiliar = url.searchParams.get('telefoneFamiliar') || '';
    const telefone2Familiar = url.searchParams.get('telefone2Familiar') || '';
    const celularFamiliar = url.searchParams.get('celularFamiliar') || '';
    const celular2Familiar = url.searchParams.get('celular2Familiar') || '';
    const cepFamiliar = url.searchParams.get('cepFamiliar') || '';
    const enderecoFamiliar = url.searchParams.get('enderecoFamiliar') || '';
    const numeroFamiliar = url.searchParams.get('numeroFamiliar') || '';
    const complementoFamiliar = url.searchParams.get('complementoFamiliar') || '';
    const bairroFamiliar = url.searchParams.get('bairroFamiliar') || '';
    const cidadeFamiliar = url.searchParams.get('cidadeFamiliar') || '';
    const ufFamiliar = url.searchParams.get('ufFamiliar') || '';
    const latitudeFamiliar = url.searchParams.get('latitudeFamiliar') || '';
    const longitudeFamiliar = url.searchParams.get('longitudeFamiliar') || '';
    const observacao = url.searchParams.get('observacao') || '';
    const aph = url.searchParams.get('aph') || '';
    const nivelComplexidade = url.searchParams.get('nivelComplexidade') || '';
    const passagemPs = url.searchParams.get('passagemPs') || '';
    const obsPs = url.searchParams.get('obsPs') || '';
    const passagemInternacao = url.searchParams.get('passagemInternacao') || '';
    const obsInternacao = url.searchParams.get('obsInternacao') || '';
    const custoTotal = url.searchParams.get('custoTotal') || '';
    const observacaoFamiliar = url.searchParams.get('observacaoFamiliar') || '';
    const mesmoEndereco = url.searchParams.get('mesmoEndereco') || '';
    const acessoFamiliar = url.searchParams.get('acessoFamiliar') || '';
    const comResponsavel = url.searchParams.get('comResponsavel') || '';
    const cadastroCompleto = url.searchParams.get('cadastroCompleto') || '';
    const ativo = url.searchParams.get('ativo') || '';
    const dataPost = url.searchParams.get('dataPost') || '';
    const detalhes = url.searchParams.get('detalhes') || '';
    const tipohospital = url.searchParams.get('tipohospital') || '';
    const liminar = url.searchParams.get('liminar') || '';
    const expoToken = url.searchParams.get('expoToken') || '';
    const profissionalPref = url.searchParams.get('profissionalPref') || '';
    const senhaChat = url.searchParams.get('senhaChat') || '';

    const atendimento = url.searchParams.get('atendimento') || '';
    const atendimentoAssinaturas = url.searchParams.get('atendimentoAssinaturas') || '';
    const diario = url.searchParams.get('diario') || '';
    const pacienteDadosCartao = url.searchParams.get('pacienteDadosCartao') || '';
    const pacienteDiagnostico = url.searchParams.get('pacienteDiagnostico') || '';
    const pacienteDiario = url.searchParams.get('pacienteDiario') || '';
    const pacienteEnqueteApp = url.searchParams.get('pacienteEnqueteApp') || '';
    const pacienteOperadora = url.searchParams.get('pacienteOperadora') || '';
    const pacientePedido = url.searchParams.get('pacientePedido') || '';
    const pacientePush = url.searchParams.get('pacientePush') || '';
    const pacienteStatusAtual = url.searchParams.get('pacienteStatusAtual') || '';
    const pad = url.searchParams.get('pad') || '';
    const questionarios = url.searchParams.get('questionarios') || '';

    return {
      idUnidade,
      idFranquia,
      idCidade,
      idCidadeFamiliar,
      idGrauParentesco,
      senha,
      nome,
      email,
      cpf,
      rg,
      registro,
      nascimento,
      sexo,
      telefone,
      telefone2,
      celular,
      celular1,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      latitude,
      longitude,
      responsavelFamiliar,
      emailFamiliar,
      cpfFamiliar,
      rgFamiliar,
      nascimentoFamiliar,
      sexoFamiliar,
      telefoneFamiliar,
      telefone2Familiar,
      celularFamiliar,
      celular2Familiar,
      cepFamiliar,
      enderecoFamiliar,
      numeroFamiliar,
      complementoFamiliar,
      bairroFamiliar,
      cidadeFamiliar,
      ufFamiliar,
      latitudeFamiliar,
      longitudeFamiliar,
      observacao,
      aph,
      nivelComplexidade,
      passagemPs,
      obsPs,
      passagemInternacao,
      obsInternacao,
      custoTotal,
      observacaoFamiliar,
      mesmoEndereco,
      acessoFamiliar,
      comResponsavel,
      cadastroCompleto,
      ativo,
      dataPost,
      detalhes,
      tipohospital,
      liminar,
      expoToken,
      profissionalPref,
      senhaChat,
      atendimento,
      atendimentoAssinaturas,
      diario,
      pacienteDadosCartao,
      pacienteDiagnostico,
      pacienteDiario,
      pacienteEnqueteApp,
      pacienteOperadora,
      pacientePedido,
      pacientePush,
      pacienteStatusAtual,
      pad,
      questionarios
    };
  };

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idUnidade: '',
        idFranquia: '',
        idCidade: '',
        idCidadeFamiliar: '',
        idGrauParentesco: '',
        senha: '',
        nome: '',
        email: '',
        cpf: '',
        rg: '',
        registro: '',
        nascimento: '',
        sexo: '',
        telefone: '',
        telefone2: '',
        celular: '',
        celular1: '',
        cep: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',
        latitude: '',
        longitude: '',
        responsavelFamiliar: '',
        emailFamiliar: '',
        cpfFamiliar: '',
        rgFamiliar: '',
        nascimentoFamiliar: '',
        sexoFamiliar: '',
        telefoneFamiliar: '',
        telefone2Familiar: '',
        celularFamiliar: '',
        celular2Familiar: '',
        cepFamiliar: '',
        enderecoFamiliar: '',
        numeroFamiliar: '',
        complementoFamiliar: '',
        bairroFamiliar: '',
        cidadeFamiliar: '',
        ufFamiliar: '',
        latitudeFamiliar: '',
        longitudeFamiliar: '',
        observacao: '',
        aph: '',
        nivelComplexidade: '',
        passagemPs: '',
        obsPs: '',
        passagemInternacao: '',
        obsInternacao: '',
        custoTotal: '',
        observacaoFamiliar: '',
        mesmoEndereco: '',
        acessoFamiliar: '',
        comResponsavel: '',
        cadastroCompleto: '',
        ativo: '',
        dataPost: '',
        detalhes: '',
        tipohospital: '',
        liminar: '',
        expoToken: '',
        profissionalPref: '',
        senhaChat: '',
        atendimento: '',
        atendimentoAssinaturas: '',
        diario: '',
        pacienteDadosCartao: '',
        pacienteDiagnostico: '',
        pacienteDiario: '',
        pacienteEnqueteApp: '',
        pacienteOperadora: '',
        pacientePedido: '',
        pacientePush: '',
        pacienteStatusAtual: '',
        pad: '',
        questionarios: ''
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
      'idUnidade=' +
      this.state.idUnidade +
      '&' +
      'idFranquia=' +
      this.state.idFranquia +
      '&' +
      'idCidade=' +
      this.state.idCidade +
      '&' +
      'idCidadeFamiliar=' +
      this.state.idCidadeFamiliar +
      '&' +
      'idGrauParentesco=' +
      this.state.idGrauParentesco +
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
      'cpf=' +
      this.state.cpf +
      '&' +
      'rg=' +
      this.state.rg +
      '&' +
      'registro=' +
      this.state.registro +
      '&' +
      'nascimento=' +
      this.state.nascimento +
      '&' +
      'sexo=' +
      this.state.sexo +
      '&' +
      'telefone=' +
      this.state.telefone +
      '&' +
      'telefone2=' +
      this.state.telefone2 +
      '&' +
      'celular=' +
      this.state.celular +
      '&' +
      'celular1=' +
      this.state.celular1 +
      '&' +
      'cep=' +
      this.state.cep +
      '&' +
      'endereco=' +
      this.state.endereco +
      '&' +
      'numero=' +
      this.state.numero +
      '&' +
      'complemento=' +
      this.state.complemento +
      '&' +
      'bairro=' +
      this.state.bairro +
      '&' +
      'cidade=' +
      this.state.cidade +
      '&' +
      'uf=' +
      this.state.uf +
      '&' +
      'latitude=' +
      this.state.latitude +
      '&' +
      'longitude=' +
      this.state.longitude +
      '&' +
      'responsavelFamiliar=' +
      this.state.responsavelFamiliar +
      '&' +
      'emailFamiliar=' +
      this.state.emailFamiliar +
      '&' +
      'cpfFamiliar=' +
      this.state.cpfFamiliar +
      '&' +
      'rgFamiliar=' +
      this.state.rgFamiliar +
      '&' +
      'nascimentoFamiliar=' +
      this.state.nascimentoFamiliar +
      '&' +
      'sexoFamiliar=' +
      this.state.sexoFamiliar +
      '&' +
      'telefoneFamiliar=' +
      this.state.telefoneFamiliar +
      '&' +
      'telefone2Familiar=' +
      this.state.telefone2Familiar +
      '&' +
      'celularFamiliar=' +
      this.state.celularFamiliar +
      '&' +
      'celular2Familiar=' +
      this.state.celular2Familiar +
      '&' +
      'cepFamiliar=' +
      this.state.cepFamiliar +
      '&' +
      'enderecoFamiliar=' +
      this.state.enderecoFamiliar +
      '&' +
      'numeroFamiliar=' +
      this.state.numeroFamiliar +
      '&' +
      'complementoFamiliar=' +
      this.state.complementoFamiliar +
      '&' +
      'bairroFamiliar=' +
      this.state.bairroFamiliar +
      '&' +
      'cidadeFamiliar=' +
      this.state.cidadeFamiliar +
      '&' +
      'ufFamiliar=' +
      this.state.ufFamiliar +
      '&' +
      'latitudeFamiliar=' +
      this.state.latitudeFamiliar +
      '&' +
      'longitudeFamiliar=' +
      this.state.longitudeFamiliar +
      '&' +
      'observacao=' +
      this.state.observacao +
      '&' +
      'aph=' +
      this.state.aph +
      '&' +
      'nivelComplexidade=' +
      this.state.nivelComplexidade +
      '&' +
      'passagemPs=' +
      this.state.passagemPs +
      '&' +
      'obsPs=' +
      this.state.obsPs +
      '&' +
      'passagemInternacao=' +
      this.state.passagemInternacao +
      '&' +
      'obsInternacao=' +
      this.state.obsInternacao +
      '&' +
      'custoTotal=' +
      this.state.custoTotal +
      '&' +
      'observacaoFamiliar=' +
      this.state.observacaoFamiliar +
      '&' +
      'mesmoEndereco=' +
      this.state.mesmoEndereco +
      '&' +
      'acessoFamiliar=' +
      this.state.acessoFamiliar +
      '&' +
      'comResponsavel=' +
      this.state.comResponsavel +
      '&' +
      'cadastroCompleto=' +
      this.state.cadastroCompleto +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'dataPost=' +
      this.state.dataPost +
      '&' +
      'detalhes=' +
      this.state.detalhes +
      '&' +
      'tipohospital=' +
      this.state.tipohospital +
      '&' +
      'liminar=' +
      this.state.liminar +
      '&' +
      'expoToken=' +
      this.state.expoToken +
      '&' +
      'profissionalPref=' +
      this.state.profissionalPref +
      '&' +
      'senhaChat=' +
      this.state.senhaChat +
      '&' +
      'atendimento=' +
      this.state.atendimento +
      '&' +
      'atendimentoAssinaturas=' +
      this.state.atendimentoAssinaturas +
      '&' +
      'diario=' +
      this.state.diario +
      '&' +
      'pacienteDadosCartao=' +
      this.state.pacienteDadosCartao +
      '&' +
      'pacienteDiagnostico=' +
      this.state.pacienteDiagnostico +
      '&' +
      'pacienteDiario=' +
      this.state.pacienteDiario +
      '&' +
      'pacienteEnqueteApp=' +
      this.state.pacienteEnqueteApp +
      '&' +
      'pacienteOperadora=' +
      this.state.pacienteOperadora +
      '&' +
      'pacientePedido=' +
      this.state.pacientePedido +
      '&' +
      'pacientePush=' +
      this.state.pacientePush +
      '&' +
      'pacienteStatusAtual=' +
      this.state.pacienteStatusAtual +
      '&' +
      'pad=' +
      this.state.pad +
      '&' +
      'questionarios=' +
      this.state.questionarios +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      idUnidade,
      idFranquia,
      idCidade,
      idCidadeFamiliar,
      idGrauParentesco,
      senha,
      nome,
      email,
      cpf,
      rg,
      registro,
      nascimento,
      sexo,
      telefone,
      telefone2,
      celular,
      celular1,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      latitude,
      longitude,
      responsavelFamiliar,
      emailFamiliar,
      cpfFamiliar,
      rgFamiliar,
      nascimentoFamiliar,
      sexoFamiliar,
      telefoneFamiliar,
      telefone2Familiar,
      celularFamiliar,
      celular2Familiar,
      cepFamiliar,
      enderecoFamiliar,
      numeroFamiliar,
      complementoFamiliar,
      bairroFamiliar,
      cidadeFamiliar,
      ufFamiliar,
      latitudeFamiliar,
      longitudeFamiliar,
      observacao,
      aph,
      nivelComplexidade,
      passagemPs,
      obsPs,
      passagemInternacao,
      obsInternacao,
      custoTotal,
      observacaoFamiliar,
      mesmoEndereco,
      acessoFamiliar,
      comResponsavel,
      cadastroCompleto,
      ativo,
      dataPost,
      detalhes,
      tipohospital,
      liminar,
      expoToken,
      profissionalPref,
      senhaChat,
      atendimento,
      atendimentoAssinaturas,
      diario,
      pacienteDadosCartao,
      pacienteDiagnostico,
      pacienteDiario,
      pacienteEnqueteApp,
      pacienteOperadora,
      pacientePedido,
      pacientePush,
      pacienteStatusAtual,
      pad,
      questionarios,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      idUnidade,
      idFranquia,
      idCidade,
      idCidadeFamiliar,
      idGrauParentesco,
      senha,
      nome,
      email,
      cpf,
      rg,
      registro,
      nascimento,
      sexo,
      telefone,
      telefone2,
      celular,
      celular1,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      latitude,
      longitude,
      responsavelFamiliar,
      emailFamiliar,
      cpfFamiliar,
      rgFamiliar,
      nascimentoFamiliar,
      sexoFamiliar,
      telefoneFamiliar,
      telefone2Familiar,
      celularFamiliar,
      celular2Familiar,
      cepFamiliar,
      enderecoFamiliar,
      numeroFamiliar,
      complementoFamiliar,
      bairroFamiliar,
      cidadeFamiliar,
      ufFamiliar,
      latitudeFamiliar,
      longitudeFamiliar,
      observacao,
      aph,
      nivelComplexidade,
      passagemPs,
      obsPs,
      passagemInternacao,
      obsInternacao,
      custoTotal,
      observacaoFamiliar,
      mesmoEndereco,
      acessoFamiliar,
      comResponsavel,
      cadastroCompleto,
      ativo,
      dataPost,
      detalhes,
      tipohospital,
      liminar,
      expoToken,
      profissionalPref,
      senhaChat,
      atendimento,
      atendimentoAssinaturas,
      diario,
      pacienteDadosCartao,
      pacienteDiagnostico,
      pacienteDiario,
      pacienteEnqueteApp,
      pacienteOperadora,
      pacientePedido,
      pacientePush,
      pacienteStatusAtual,
      pad,
      questionarios,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { pacienteList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pacientes</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Pacientes</span>
              <Button id="togglerFilterPaciente" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.paciente.home.createLabel">Create a new Paciente</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPaciente">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="idUnidadeLabel" for="paciente-idUnidade">
                            <Translate contentKey="generadorApp.paciente.idUnidade">Id Unidade</Translate>
                          </Label>

                          <AvInput type="text" name="idUnidade" id="paciente-idUnidade" value={this.state.idUnidade} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idFranquiaLabel" for="paciente-idFranquia">
                            <Translate contentKey="generadorApp.paciente.idFranquia">Id Franquia</Translate>
                          </Label>

                          <AvInput type="text" name="idFranquia" id="paciente-idFranquia" value={this.state.idFranquia} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idCidadeLabel" for="paciente-idCidade">
                            <Translate contentKey="generadorApp.paciente.idCidade">Id Cidade</Translate>
                          </Label>

                          <AvInput type="text" name="idCidade" id="paciente-idCidade" value={this.state.idCidade} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idCidadeFamiliarLabel" for="paciente-idCidadeFamiliar">
                            <Translate contentKey="generadorApp.paciente.idCidadeFamiliar">Id Cidade Familiar</Translate>
                          </Label>

                          <AvInput type="text" name="idCidadeFamiliar" id="paciente-idCidadeFamiliar" value={this.state.idCidadeFamiliar} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idGrauParentescoLabel" for="paciente-idGrauParentesco">
                            <Translate contentKey="generadorApp.paciente.idGrauParentesco">Id Grau Parentesco</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="idGrauParentesco"
                            id="paciente-idGrauParentesco"
                            value={this.state.idGrauParentesco}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="senhaLabel" for="paciente-senha">
                            <Translate contentKey="generadorApp.paciente.senha">Senha</Translate>
                          </Label>

                          <AvInput type="text" name="senha" id="paciente-senha" value={this.state.senha} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="nomeLabel" for="paciente-nome">
                            <Translate contentKey="generadorApp.paciente.nome">Nome</Translate>
                          </Label>

                          <AvInput type="text" name="nome" id="paciente-nome" value={this.state.nome} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="emailLabel" for="paciente-email">
                            <Translate contentKey="generadorApp.paciente.email">Email</Translate>
                          </Label>

                          <AvInput type="text" name="email" id="paciente-email" value={this.state.email} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cpfLabel" for="paciente-cpf">
                            <Translate contentKey="generadorApp.paciente.cpf">Cpf</Translate>
                          </Label>

                          <AvInput type="text" name="cpf" id="paciente-cpf" value={this.state.cpf} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="rgLabel" for="paciente-rg">
                            <Translate contentKey="generadorApp.paciente.rg">Rg</Translate>
                          </Label>

                          <AvInput type="text" name="rg" id="paciente-rg" value={this.state.rg} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="registroLabel" for="paciente-registro">
                            <Translate contentKey="generadorApp.paciente.registro">Registro</Translate>
                          </Label>

                          <AvInput type="text" name="registro" id="paciente-registro" value={this.state.registro} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="nascimentoLabel" for="paciente-nascimento">
                            <Translate contentKey="generadorApp.paciente.nascimento">Nascimento</Translate>
                          </Label>
                          <AvInput type="date" name="nascimento" id="paciente-nascimento" value={this.state.nascimento} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="sexoLabel" for="paciente-sexo">
                            <Translate contentKey="generadorApp.paciente.sexo">Sexo</Translate>
                          </Label>
                          <AvInput type="string" name="sexo" id="paciente-sexo" value={this.state.sexo} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="telefoneLabel" for="paciente-telefone">
                            <Translate contentKey="generadorApp.paciente.telefone">Telefone</Translate>
                          </Label>

                          <AvInput type="text" name="telefone" id="paciente-telefone" value={this.state.telefone} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="telefone2Label" for="paciente-telefone2">
                            <Translate contentKey="generadorApp.paciente.telefone2">Telefone 2</Translate>
                          </Label>

                          <AvInput type="text" name="telefone2" id="paciente-telefone2" value={this.state.telefone2} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="celularLabel" for="paciente-celular">
                            <Translate contentKey="generadorApp.paciente.celular">Celular</Translate>
                          </Label>

                          <AvInput type="text" name="celular" id="paciente-celular" value={this.state.celular} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="celular1Label" for="paciente-celular1">
                            <Translate contentKey="generadorApp.paciente.celular1">Celular 1</Translate>
                          </Label>

                          <AvInput type="text" name="celular1" id="paciente-celular1" value={this.state.celular1} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cepLabel" for="paciente-cep">
                            <Translate contentKey="generadorApp.paciente.cep">Cep</Translate>
                          </Label>

                          <AvInput type="text" name="cep" id="paciente-cep" value={this.state.cep} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="enderecoLabel" for="paciente-endereco">
                            <Translate contentKey="generadorApp.paciente.endereco">Endereco</Translate>
                          </Label>

                          <AvInput type="text" name="endereco" id="paciente-endereco" value={this.state.endereco} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="numeroLabel" for="paciente-numero">
                            <Translate contentKey="generadorApp.paciente.numero">Numero</Translate>
                          </Label>

                          <AvInput type="text" name="numero" id="paciente-numero" value={this.state.numero} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="complementoLabel" for="paciente-complemento">
                            <Translate contentKey="generadorApp.paciente.complemento">Complemento</Translate>
                          </Label>

                          <AvInput type="text" name="complemento" id="paciente-complemento" value={this.state.complemento} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="bairroLabel" for="paciente-bairro">
                            <Translate contentKey="generadorApp.paciente.bairro">Bairro</Translate>
                          </Label>

                          <AvInput type="text" name="bairro" id="paciente-bairro" value={this.state.bairro} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cidadeLabel" for="paciente-cidade">
                            <Translate contentKey="generadorApp.paciente.cidade">Cidade</Translate>
                          </Label>

                          <AvInput type="text" name="cidade" id="paciente-cidade" value={this.state.cidade} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ufLabel" for="paciente-uf">
                            <Translate contentKey="generadorApp.paciente.uf">Uf</Translate>
                          </Label>

                          <AvInput type="text" name="uf" id="paciente-uf" value={this.state.uf} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="latitudeLabel" for="paciente-latitude">
                            <Translate contentKey="generadorApp.paciente.latitude">Latitude</Translate>
                          </Label>

                          <AvInput type="text" name="latitude" id="paciente-latitude" value={this.state.latitude} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="longitudeLabel" for="paciente-longitude">
                            <Translate contentKey="generadorApp.paciente.longitude">Longitude</Translate>
                          </Label>

                          <AvInput type="text" name="longitude" id="paciente-longitude" value={this.state.longitude} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="responsavelFamiliarLabel" for="paciente-responsavelFamiliar">
                            <Translate contentKey="generadorApp.paciente.responsavelFamiliar">Responsavel Familiar</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="responsavelFamiliar"
                            id="paciente-responsavelFamiliar"
                            value={this.state.responsavelFamiliar}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="emailFamiliarLabel" for="paciente-emailFamiliar">
                            <Translate contentKey="generadorApp.paciente.emailFamiliar">Email Familiar</Translate>
                          </Label>

                          <AvInput type="text" name="emailFamiliar" id="paciente-emailFamiliar" value={this.state.emailFamiliar} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cpfFamiliarLabel" for="paciente-cpfFamiliar">
                            <Translate contentKey="generadorApp.paciente.cpfFamiliar">Cpf Familiar</Translate>
                          </Label>

                          <AvInput type="text" name="cpfFamiliar" id="paciente-cpfFamiliar" value={this.state.cpfFamiliar} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="rgFamiliarLabel" for="paciente-rgFamiliar">
                            <Translate contentKey="generadorApp.paciente.rgFamiliar">Rg Familiar</Translate>
                          </Label>

                          <AvInput type="text" name="rgFamiliar" id="paciente-rgFamiliar" value={this.state.rgFamiliar} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="nascimentoFamiliarLabel" for="paciente-nascimentoFamiliar">
                            <Translate contentKey="generadorApp.paciente.nascimentoFamiliar">Nascimento Familiar</Translate>
                          </Label>
                          <AvInput
                            type="date"
                            name="nascimentoFamiliar"
                            id="paciente-nascimentoFamiliar"
                            value={this.state.nascimentoFamiliar}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="sexoFamiliarLabel" for="paciente-sexoFamiliar">
                            <Translate contentKey="generadorApp.paciente.sexoFamiliar">Sexo Familiar</Translate>
                          </Label>
                          <AvInput type="string" name="sexoFamiliar" id="paciente-sexoFamiliar" value={this.state.sexoFamiliar} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="telefoneFamiliarLabel" for="paciente-telefoneFamiliar">
                            <Translate contentKey="generadorApp.paciente.telefoneFamiliar">Telefone Familiar</Translate>
                          </Label>

                          <AvInput type="text" name="telefoneFamiliar" id="paciente-telefoneFamiliar" value={this.state.telefoneFamiliar} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="telefone2FamiliarLabel" for="paciente-telefone2Familiar">
                            <Translate contentKey="generadorApp.paciente.telefone2Familiar">Telefone 2 Familiar</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="telefone2Familiar"
                            id="paciente-telefone2Familiar"
                            value={this.state.telefone2Familiar}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="celularFamiliarLabel" for="paciente-celularFamiliar">
                            <Translate contentKey="generadorApp.paciente.celularFamiliar">Celular Familiar</Translate>
                          </Label>

                          <AvInput type="text" name="celularFamiliar" id="paciente-celularFamiliar" value={this.state.celularFamiliar} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="celular2FamiliarLabel" for="paciente-celular2Familiar">
                            <Translate contentKey="generadorApp.paciente.celular2Familiar">Celular 2 Familiar</Translate>
                          </Label>

                          <AvInput type="text" name="celular2Familiar" id="paciente-celular2Familiar" value={this.state.celular2Familiar} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cepFamiliarLabel" for="paciente-cepFamiliar">
                            <Translate contentKey="generadorApp.paciente.cepFamiliar">Cep Familiar</Translate>
                          </Label>

                          <AvInput type="text" name="cepFamiliar" id="paciente-cepFamiliar" value={this.state.cepFamiliar} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="enderecoFamiliarLabel" for="paciente-enderecoFamiliar">
                            <Translate contentKey="generadorApp.paciente.enderecoFamiliar">Endereco Familiar</Translate>
                          </Label>

                          <AvInput type="text" name="enderecoFamiliar" id="paciente-enderecoFamiliar" value={this.state.enderecoFamiliar} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="numeroFamiliarLabel" for="paciente-numeroFamiliar">
                            <Translate contentKey="generadorApp.paciente.numeroFamiliar">Numero Familiar</Translate>
                          </Label>

                          <AvInput type="text" name="numeroFamiliar" id="paciente-numeroFamiliar" value={this.state.numeroFamiliar} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="complementoFamiliarLabel" for="paciente-complementoFamiliar">
                            <Translate contentKey="generadorApp.paciente.complementoFamiliar">Complemento Familiar</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="complementoFamiliar"
                            id="paciente-complementoFamiliar"
                            value={this.state.complementoFamiliar}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="bairroFamiliarLabel" for="paciente-bairroFamiliar">
                            <Translate contentKey="generadorApp.paciente.bairroFamiliar">Bairro Familiar</Translate>
                          </Label>

                          <AvInput type="text" name="bairroFamiliar" id="paciente-bairroFamiliar" value={this.state.bairroFamiliar} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cidadeFamiliarLabel" for="paciente-cidadeFamiliar">
                            <Translate contentKey="generadorApp.paciente.cidadeFamiliar">Cidade Familiar</Translate>
                          </Label>

                          <AvInput type="text" name="cidadeFamiliar" id="paciente-cidadeFamiliar" value={this.state.cidadeFamiliar} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ufFamiliarLabel" for="paciente-ufFamiliar">
                            <Translate contentKey="generadorApp.paciente.ufFamiliar">Uf Familiar</Translate>
                          </Label>

                          <AvInput type="text" name="ufFamiliar" id="paciente-ufFamiliar" value={this.state.ufFamiliar} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="latitudeFamiliarLabel" for="paciente-latitudeFamiliar">
                            <Translate contentKey="generadorApp.paciente.latitudeFamiliar">Latitude Familiar</Translate>
                          </Label>

                          <AvInput type="text" name="latitudeFamiliar" id="paciente-latitudeFamiliar" value={this.state.latitudeFamiliar} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="longitudeFamiliarLabel" for="paciente-longitudeFamiliar">
                            <Translate contentKey="generadorApp.paciente.longitudeFamiliar">Longitude Familiar</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="longitudeFamiliar"
                            id="paciente-longitudeFamiliar"
                            value={this.state.longitudeFamiliar}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="observacaoLabel" for="paciente-observacao">
                            <Translate contentKey="generadorApp.paciente.observacao">Observacao</Translate>
                          </Label>

                          <AvInput type="text" name="observacao" id="paciente-observacao" value={this.state.observacao} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="aphLabel" for="paciente-aph">
                            <Translate contentKey="generadorApp.paciente.aph">Aph</Translate>
                          </Label>
                          <AvInput type="string" name="aph" id="paciente-aph" value={this.state.aph} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="nivelComplexidadeLabel" for="paciente-nivelComplexidade">
                            <Translate contentKey="generadorApp.paciente.nivelComplexidade">Nivel Complexidade</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="nivelComplexidade"
                            id="paciente-nivelComplexidade"
                            value={this.state.nivelComplexidade}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="passagemPsLabel" for="paciente-passagemPs">
                            <Translate contentKey="generadorApp.paciente.passagemPs">Passagem Ps</Translate>
                          </Label>
                          <AvInput type="string" name="passagemPs" id="paciente-passagemPs" value={this.state.passagemPs} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="obsPsLabel" for="paciente-obsPs">
                            <Translate contentKey="generadorApp.paciente.obsPs">Obs Ps</Translate>
                          </Label>

                          <AvInput type="text" name="obsPs" id="paciente-obsPs" value={this.state.obsPs} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="passagemInternacaoLabel" for="paciente-passagemInternacao">
                            <Translate contentKey="generadorApp.paciente.passagemInternacao">Passagem Internacao</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="passagemInternacao"
                            id="paciente-passagemInternacao"
                            value={this.state.passagemInternacao}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="obsInternacaoLabel" for="paciente-obsInternacao">
                            <Translate contentKey="generadorApp.paciente.obsInternacao">Obs Internacao</Translate>
                          </Label>

                          <AvInput type="text" name="obsInternacao" id="paciente-obsInternacao" value={this.state.obsInternacao} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="custoTotalLabel" for="paciente-custoTotal">
                            <Translate contentKey="generadorApp.paciente.custoTotal">Custo Total</Translate>
                          </Label>
                          <AvInput type="string" name="custoTotal" id="paciente-custoTotal" value={this.state.custoTotal} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="observacaoFamiliarLabel" for="paciente-observacaoFamiliar">
                            <Translate contentKey="generadorApp.paciente.observacaoFamiliar">Observacao Familiar</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="observacaoFamiliar"
                            id="paciente-observacaoFamiliar"
                            value={this.state.observacaoFamiliar}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="mesmoEnderecoLabel" for="paciente-mesmoEndereco">
                            <Translate contentKey="generadorApp.paciente.mesmoEndereco">Mesmo Endereco</Translate>
                          </Label>
                          <AvInput type="string" name="mesmoEndereco" id="paciente-mesmoEndereco" value={this.state.mesmoEndereco} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="acessoFamiliarLabel" for="paciente-acessoFamiliar">
                            <Translate contentKey="generadorApp.paciente.acessoFamiliar">Acesso Familiar</Translate>
                          </Label>
                          <AvInput type="string" name="acessoFamiliar" id="paciente-acessoFamiliar" value={this.state.acessoFamiliar} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="comResponsavelLabel" for="paciente-comResponsavel">
                            <Translate contentKey="generadorApp.paciente.comResponsavel">Com Responsavel</Translate>
                          </Label>
                          <AvInput type="string" name="comResponsavel" id="paciente-comResponsavel" value={this.state.comResponsavel} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cadastroCompletoLabel" for="paciente-cadastroCompleto">
                            <Translate contentKey="generadorApp.paciente.cadastroCompleto">Cadastro Completo</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="cadastroCompleto"
                            id="paciente-cadastroCompleto"
                            value={this.state.cadastroCompleto}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="paciente-ativo">
                            <Translate contentKey="generadorApp.paciente.ativo">Ativo</Translate>
                          </Label>
                          <AvInput type="string" name="ativo" id="paciente-ativo" value={this.state.ativo} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataPostLabel" for="paciente-dataPost">
                            <Translate contentKey="generadorApp.paciente.dataPost">Data Post</Translate>
                          </Label>
                          <AvInput
                            id="paciente-dataPost"
                            type="datetime-local"
                            className="form-control"
                            name="dataPost"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.dataPost ? convertDateTimeFromServer(this.state.dataPost) : null}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="detalhesLabel" for="paciente-detalhes">
                            <Translate contentKey="generadorApp.paciente.detalhes">Detalhes</Translate>
                          </Label>

                          <AvInput type="text" name="detalhes" id="paciente-detalhes" value={this.state.detalhes} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="tipohospitalLabel" for="paciente-tipohospital">
                            <Translate contentKey="generadorApp.paciente.tipohospital">Tipohospital</Translate>
                          </Label>
                          <AvInput type="string" name="tipohospital" id="paciente-tipohospital" value={this.state.tipohospital} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="liminarLabel" for="paciente-liminar">
                            <Translate contentKey="generadorApp.paciente.liminar">Liminar</Translate>
                          </Label>

                          <AvInput type="text" name="liminar" id="paciente-liminar" value={this.state.liminar} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="expoTokenLabel" for="paciente-expoToken">
                            <Translate contentKey="generadorApp.paciente.expoToken">Expo Token</Translate>
                          </Label>

                          <AvInput type="text" name="expoToken" id="paciente-expoToken" value={this.state.expoToken} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="profissionalPrefLabel" for="paciente-profissionalPref">
                            <Translate contentKey="generadorApp.paciente.profissionalPref">Profissional Pref</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="profissionalPref"
                            id="paciente-profissionalPref"
                            value={this.state.profissionalPref}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="senhaChatLabel" for="paciente-senhaChat">
                            <Translate contentKey="generadorApp.paciente.senhaChat">Senha Chat</Translate>
                          </Label>

                          <AvInput type="text" name="senhaChat" id="paciente-senhaChat" value={this.state.senhaChat} />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
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

              {pacienteList && pacienteList.length > 0 ? (
                <Table responsive aria-describedby="paciente-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idUnidade')}>
                        <Translate contentKey="generadorApp.paciente.idUnidade">Id Unidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idFranquia')}>
                        <Translate contentKey="generadorApp.paciente.idFranquia">Id Franquia</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idCidade')}>
                        <Translate contentKey="generadorApp.paciente.idCidade">Id Cidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idCidadeFamiliar')}>
                        <Translate contentKey="generadorApp.paciente.idCidadeFamiliar">Id Cidade Familiar</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idGrauParentesco')}>
                        <Translate contentKey="generadorApp.paciente.idGrauParentesco">Id Grau Parentesco</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('senha')}>
                        <Translate contentKey="generadorApp.paciente.senha">Senha</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('nome')}>
                        <Translate contentKey="generadorApp.paciente.nome">Nome</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('email')}>
                        <Translate contentKey="generadorApp.paciente.email">Email</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cpf')}>
                        <Translate contentKey="generadorApp.paciente.cpf">Cpf</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('rg')}>
                        <Translate contentKey="generadorApp.paciente.rg">Rg</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('registro')}>
                        <Translate contentKey="generadorApp.paciente.registro">Registro</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('nascimento')}>
                        <Translate contentKey="generadorApp.paciente.nascimento">Nascimento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('sexo')}>
                        <Translate contentKey="generadorApp.paciente.sexo">Sexo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('telefone')}>
                        <Translate contentKey="generadorApp.paciente.telefone">Telefone</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('telefone2')}>
                        <Translate contentKey="generadorApp.paciente.telefone2">Telefone 2</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('celular')}>
                        <Translate contentKey="generadorApp.paciente.celular">Celular</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('celular1')}>
                        <Translate contentKey="generadorApp.paciente.celular1">Celular 1</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cep')}>
                        <Translate contentKey="generadorApp.paciente.cep">Cep</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('endereco')}>
                        <Translate contentKey="generadorApp.paciente.endereco">Endereco</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('numero')}>
                        <Translate contentKey="generadorApp.paciente.numero">Numero</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('complemento')}>
                        <Translate contentKey="generadorApp.paciente.complemento">Complemento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('bairro')}>
                        <Translate contentKey="generadorApp.paciente.bairro">Bairro</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cidade')}>
                        <Translate contentKey="generadorApp.paciente.cidade">Cidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('uf')}>
                        <Translate contentKey="generadorApp.paciente.uf">Uf</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('latitude')}>
                        <Translate contentKey="generadorApp.paciente.latitude">Latitude</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('longitude')}>
                        <Translate contentKey="generadorApp.paciente.longitude">Longitude</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('responsavelFamiliar')}>
                        <Translate contentKey="generadorApp.paciente.responsavelFamiliar">Responsavel Familiar</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('emailFamiliar')}>
                        <Translate contentKey="generadorApp.paciente.emailFamiliar">Email Familiar</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cpfFamiliar')}>
                        <Translate contentKey="generadorApp.paciente.cpfFamiliar">Cpf Familiar</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('rgFamiliar')}>
                        <Translate contentKey="generadorApp.paciente.rgFamiliar">Rg Familiar</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('nascimentoFamiliar')}>
                        <Translate contentKey="generadorApp.paciente.nascimentoFamiliar">Nascimento Familiar</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('sexoFamiliar')}>
                        <Translate contentKey="generadorApp.paciente.sexoFamiliar">Sexo Familiar</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('telefoneFamiliar')}>
                        <Translate contentKey="generadorApp.paciente.telefoneFamiliar">Telefone Familiar</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('telefone2Familiar')}>
                        <Translate contentKey="generadorApp.paciente.telefone2Familiar">Telefone 2 Familiar</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('celularFamiliar')}>
                        <Translate contentKey="generadorApp.paciente.celularFamiliar">Celular Familiar</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('celular2Familiar')}>
                        <Translate contentKey="generadorApp.paciente.celular2Familiar">Celular 2 Familiar</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cepFamiliar')}>
                        <Translate contentKey="generadorApp.paciente.cepFamiliar">Cep Familiar</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('enderecoFamiliar')}>
                        <Translate contentKey="generadorApp.paciente.enderecoFamiliar">Endereco Familiar</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('numeroFamiliar')}>
                        <Translate contentKey="generadorApp.paciente.numeroFamiliar">Numero Familiar</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('complementoFamiliar')}>
                        <Translate contentKey="generadorApp.paciente.complementoFamiliar">Complemento Familiar</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('bairroFamiliar')}>
                        <Translate contentKey="generadorApp.paciente.bairroFamiliar">Bairro Familiar</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cidadeFamiliar')}>
                        <Translate contentKey="generadorApp.paciente.cidadeFamiliar">Cidade Familiar</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ufFamiliar')}>
                        <Translate contentKey="generadorApp.paciente.ufFamiliar">Uf Familiar</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('latitudeFamiliar')}>
                        <Translate contentKey="generadorApp.paciente.latitudeFamiliar">Latitude Familiar</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('longitudeFamiliar')}>
                        <Translate contentKey="generadorApp.paciente.longitudeFamiliar">Longitude Familiar</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('observacao')}>
                        <Translate contentKey="generadorApp.paciente.observacao">Observacao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('aph')}>
                        <Translate contentKey="generadorApp.paciente.aph">Aph</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('nivelComplexidade')}>
                        <Translate contentKey="generadorApp.paciente.nivelComplexidade">Nivel Complexidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('passagemPs')}>
                        <Translate contentKey="generadorApp.paciente.passagemPs">Passagem Ps</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('obsPs')}>
                        <Translate contentKey="generadorApp.paciente.obsPs">Obs Ps</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('passagemInternacao')}>
                        <Translate contentKey="generadorApp.paciente.passagemInternacao">Passagem Internacao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('obsInternacao')}>
                        <Translate contentKey="generadorApp.paciente.obsInternacao">Obs Internacao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('custoTotal')}>
                        <Translate contentKey="generadorApp.paciente.custoTotal">Custo Total</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('observacaoFamiliar')}>
                        <Translate contentKey="generadorApp.paciente.observacaoFamiliar">Observacao Familiar</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('mesmoEndereco')}>
                        <Translate contentKey="generadorApp.paciente.mesmoEndereco">Mesmo Endereco</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('acessoFamiliar')}>
                        <Translate contentKey="generadorApp.paciente.acessoFamiliar">Acesso Familiar</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('comResponsavel')}>
                        <Translate contentKey="generadorApp.paciente.comResponsavel">Com Responsavel</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cadastroCompleto')}>
                        <Translate contentKey="generadorApp.paciente.cadastroCompleto">Cadastro Completo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.paciente.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataPost')}>
                        <Translate contentKey="generadorApp.paciente.dataPost">Data Post</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('detalhes')}>
                        <Translate contentKey="generadorApp.paciente.detalhes">Detalhes</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('tipohospital')}>
                        <Translate contentKey="generadorApp.paciente.tipohospital">Tipohospital</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('liminar')}>
                        <Translate contentKey="generadorApp.paciente.liminar">Liminar</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('expoToken')}>
                        <Translate contentKey="generadorApp.paciente.expoToken">Expo Token</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('profissionalPref')}>
                        <Translate contentKey="generadorApp.paciente.profissionalPref">Profissional Pref</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('senhaChat')}>
                        <Translate contentKey="generadorApp.paciente.senhaChat">Senha Chat</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {pacienteList.map((paciente, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${paciente.id}`} color="link" size="sm">
                            {paciente.id}
                          </Button>
                        </td>

                        <td>{paciente.idUnidade}</td>

                        <td>{paciente.idFranquia}</td>

                        <td>{paciente.idCidade}</td>

                        <td>{paciente.idCidadeFamiliar}</td>

                        <td>{paciente.idGrauParentesco}</td>

                        <td>{paciente.senha}</td>

                        <td>{paciente.nome}</td>

                        <td>{paciente.email}</td>

                        <td>{paciente.cpf}</td>

                        <td>{paciente.rg}</td>

                        <td>{paciente.registro}</td>

                        <td>
                          <TextFormat type="date" value={paciente.nascimento} format={APP_LOCAL_DATE_FORMAT} />
                        </td>

                        <td>{paciente.sexo}</td>

                        <td>{paciente.telefone}</td>

                        <td>{paciente.telefone2}</td>

                        <td>{paciente.celular}</td>

                        <td>{paciente.celular1}</td>

                        <td>{paciente.cep}</td>

                        <td>{paciente.endereco}</td>

                        <td>{paciente.numero}</td>

                        <td>{paciente.complemento}</td>

                        <td>{paciente.bairro}</td>

                        <td>{paciente.cidade}</td>

                        <td>{paciente.uf}</td>

                        <td>{paciente.latitude}</td>

                        <td>{paciente.longitude}</td>

                        <td>{paciente.responsavelFamiliar}</td>

                        <td>{paciente.emailFamiliar}</td>

                        <td>{paciente.cpfFamiliar}</td>

                        <td>{paciente.rgFamiliar}</td>

                        <td>
                          <TextFormat type="date" value={paciente.nascimentoFamiliar} format={APP_LOCAL_DATE_FORMAT} />
                        </td>

                        <td>{paciente.sexoFamiliar}</td>

                        <td>{paciente.telefoneFamiliar}</td>

                        <td>{paciente.telefone2Familiar}</td>

                        <td>{paciente.celularFamiliar}</td>

                        <td>{paciente.celular2Familiar}</td>

                        <td>{paciente.cepFamiliar}</td>

                        <td>{paciente.enderecoFamiliar}</td>

                        <td>{paciente.numeroFamiliar}</td>

                        <td>{paciente.complementoFamiliar}</td>

                        <td>{paciente.bairroFamiliar}</td>

                        <td>{paciente.cidadeFamiliar}</td>

                        <td>{paciente.ufFamiliar}</td>

                        <td>{paciente.latitudeFamiliar}</td>

                        <td>{paciente.longitudeFamiliar}</td>

                        <td>{paciente.observacao}</td>

                        <td>{paciente.aph}</td>

                        <td>{paciente.nivelComplexidade}</td>

                        <td>{paciente.passagemPs}</td>

                        <td>{paciente.obsPs}</td>

                        <td>{paciente.passagemInternacao}</td>

                        <td>{paciente.obsInternacao}</td>

                        <td>{paciente.custoTotal}</td>

                        <td>{paciente.observacaoFamiliar}</td>

                        <td>{paciente.mesmoEndereco}</td>

                        <td>{paciente.acessoFamiliar}</td>

                        <td>{paciente.comResponsavel}</td>

                        <td>{paciente.cadastroCompleto}</td>

                        <td>{paciente.ativo}</td>

                        <td>
                          <TextFormat type="date" value={paciente.dataPost} format={APP_DATE_FORMAT} />
                        </td>

                        <td>{paciente.detalhes}</td>

                        <td>{paciente.tipohospital}</td>

                        <td>{paciente.liminar}</td>

                        <td>{paciente.expoToken}</td>

                        <td>{paciente.profissionalPref}</td>

                        <td>{paciente.senhaChat}</td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${paciente.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${paciente.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${paciente.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.paciente.home.notFound">No Pacientes found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={pacienteList && pacienteList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ paciente, ...storeState }: IRootState) => ({
  pacienteList: paciente.entities,
  totalItems: paciente.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Paciente);
