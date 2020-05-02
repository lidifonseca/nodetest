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

import { ICidade } from 'app/shared/model/cidade.model';
import { getEntities as getCidades } from 'app/entities/cidade/cidade.reducer';

export interface IPacienteProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPacienteBaseState {
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
  cidade: any;
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

    const cidade = url.searchParams.get('cidade') || '';

    return {
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
      cidade
    };
  };

  componentDidMount() {
    this.getEntities();

    this.props.getCidades();
  }

  cancelCourse = () => {
    this.setState(
      {
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
        cidade: ''
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
      'cidade=' +
      this.state.cidade +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
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
      cidade,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
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
      cidade,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { cidades, pacienteList, match, totalItems } = this.props;
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
                      <Col md="6">
                        <Row>
                          <div>
                            <Label for="paciente-cidade">
                              <Translate contentKey="generadorApp.paciente.cidade">Cidade</Translate>
                            </Label>
                            <AvInput id="paciente-cidade" type="select" className="form-control" name="cidadeId">
                              <option value="" key="0" />
                              {cidades
                                ? cidades.map(otherEntity => (
                                    <option value={otherEntity.id} key={otherEntity.id}>
                                      {otherEntity.id}
                                    </option>
                                  ))
                                : null}
                            </AvInput>
                          </div>
                        </Row>
                      </Col>

                      <Col md="6">
                        <Row>
                          <Label id="nomeLabel" for="paciente-nome">
                            <Translate contentKey="generadorApp.paciente.nome">Nome</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="nome"
                            id="paciente-nome"
                            value={this.state.nome}
                            validate={{
                              maxLength: { value: 60, errorMessage: translate('entity.validation.maxlength', { max: 60 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="6">
                        <Row>
                          <Label id="emailLabel" for="paciente-email">
                            <Translate contentKey="generadorApp.paciente.email">Email</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="email"
                            id="paciente-email"
                            value={this.state.email}
                            validate={{
                              maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="6">
                        <Row>
                          <Label id="cpfLabel" for="paciente-cpf">
                            <Translate contentKey="generadorApp.paciente.cpf">Cpf</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="cpf"
                            id="paciente-cpf"
                            value={this.state.cpf}
                            validate={{
                              maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="6">
                        <Row>
                          <Label id="rgLabel" for="paciente-rg">
                            <Translate contentKey="generadorApp.paciente.rg">Rg</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="rg"
                            id="paciente-rg"
                            value={this.state.rg}
                            validate={{
                              maxLength: { value: 30, errorMessage: translate('entity.validation.maxlength', { max: 30 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="6">
                        <Row>
                          <Label id="registroLabel" for="paciente-registro">
                            <Translate contentKey="generadorApp.paciente.registro">Registro</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="registro"
                            id="paciente-registro"
                            value={this.state.registro}
                            validate={{
                              maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) }
                            }}
                          />
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

              {pacienteList && pacienteList.length > 0 ? (
                <Table responsive aria-describedby="paciente-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.paciente.cidade">Cidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('nome')}>
                        <Translate contentKey="generadorApp.paciente.nome"></Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('email')}>
                        <Translate contentKey="generadorApp.paciente.email"></Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cpf')}>
                        <Translate contentKey="generadorApp.paciente.cpf"></Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('rg')}>
                        <Translate contentKey="generadorApp.paciente.rg"></Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('registro')}>
                        <Translate contentKey="generadorApp.paciente.registro"></Translate>
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
                        <td>{paciente.cidade ? <Link to={`cidade/${paciente.cidade.id}`}>{paciente.cidade.id}</Link> : ''}</td>

                        <td>{paciente.nome}</td>

                        <td>{paciente.email}</td>

                        <td>{paciente.cpf}</td>

                        <td>{paciente.rg}</td>

                        <td>{paciente.registro}</td>

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
  cidades: storeState.cidade.entities,
  pacienteList: paciente.entities,
  totalItems: paciente.totalItems
});

const mapDispatchToProps = {
  getCidades,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Paciente);
