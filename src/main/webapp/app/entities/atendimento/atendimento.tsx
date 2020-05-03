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
import { getEntities } from './atendimento.reducer';
import { IAtendimento } from 'app/shared/model/atendimento.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';
import { IOperadora } from 'app/shared/model/operadora.model';
import { getEntities as getOperadoras } from 'app/entities/operadora/operadora.reducer';
import { IEspecialidade } from 'app/shared/model/especialidade.model';
import { getEntities as getEspecialidades } from 'app/entities/especialidade/especialidade.reducer';
import { IPadItem } from 'app/shared/model/pad-item.model';
import { getEntities as getPadItems } from 'app/entities/pad-item/pad-item.reducer';
import { IStatusAtendimento } from 'app/shared/model/status-atendimento.model';
import { getEntities as getStatusAtendimentos } from 'app/entities/status-atendimento/status-atendimento.reducer';
import { IPeriodo } from 'app/shared/model/periodo.model';
import { getEntities as getPeriodos } from 'app/entities/periodo/periodo.reducer';
import { ICidade } from 'app/shared/model/cidade.model';
import { getEntities as getCidades } from 'app/entities/cidade/cidade.reducer';

export interface IAtendimentoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IAtendimentoBaseState {
  idUnidade: any;
  idFranquia: any;
  idProfissional: any;
  cep: any;
  endereco: any;
  numero: any;
  complemento: any;
  bairro: any;
  cidade: any;
  uf: any;
  latitude: any;
  longitude: any;
  dataAgenda: any;
  horario: any;
  dataChegada: any;
  latitudeChegada: any;
  longitudeChegada: any;
  dataSaida: any;
  latitudeSaida: any;
  longitudeSaida: any;
  evolucao: any;
  observacao: any;
  intercorrencia: any;
  avaliacao: any;
  aceito: any;
  motivo: any;
  valor: any;
  ordemAtendimento: any;
  ativo: any;
  dataForaHora: any;
  idUsuarioCancelamento: any;
  dataCancelamento: any;
  tipoUsuarioCancelamento: any;
  confidencialProfissional: any;
  confidencialPaciente: any;
  imagemAssinatura: any;
  atendimentoAceite: any;
  atendimentoAssinaturas: any;
  atendimentoAtividades: any;
  idPaciente: any;
  idOperadora: any;
  idEspecialidade: any;
  idPadItem: any;
  idStatusAtendimento: any;
  idPeriodo: any;
  idCidade: any;
}
export interface IAtendimentoState extends IAtendimentoBaseState, IPaginationBaseState {}

export class Atendimento extends React.Component<IAtendimentoProps, IAtendimentoState> {
  private myFormRef: any;

  constructor(props: IAtendimentoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getAtendimentoState(this.props.location)
    };
  }

  getAtendimentoState = (location): IAtendimentoBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const idUnidade = url.searchParams.get('idUnidade') || '';
    const idFranquia = url.searchParams.get('idFranquia') || '';
    const idProfissional = url.searchParams.get('idProfissional') || '';
    const cep = url.searchParams.get('cep') || '';
    const endereco = url.searchParams.get('endereco') || '';
    const numero = url.searchParams.get('numero') || '';
    const complemento = url.searchParams.get('complemento') || '';
    const bairro = url.searchParams.get('bairro') || '';
    const cidade = url.searchParams.get('cidade') || '';
    const uf = url.searchParams.get('uf') || '';
    const latitude = url.searchParams.get('latitude') || '';
    const longitude = url.searchParams.get('longitude') || '';
    const dataAgenda = url.searchParams.get('dataAgenda') || '';
    const horario = url.searchParams.get('horario') || '';
    const dataChegada = url.searchParams.get('dataChegada') || '';
    const latitudeChegada = url.searchParams.get('latitudeChegada') || '';
    const longitudeChegada = url.searchParams.get('longitudeChegada') || '';
    const dataSaida = url.searchParams.get('dataSaida') || '';
    const latitudeSaida = url.searchParams.get('latitudeSaida') || '';
    const longitudeSaida = url.searchParams.get('longitudeSaida') || '';
    const evolucao = url.searchParams.get('evolucao') || '';
    const observacao = url.searchParams.get('observacao') || '';
    const intercorrencia = url.searchParams.get('intercorrencia') || '';
    const avaliacao = url.searchParams.get('avaliacao') || '';
    const aceito = url.searchParams.get('aceito') || '';
    const motivo = url.searchParams.get('motivo') || '';
    const valor = url.searchParams.get('valor') || '';
    const ordemAtendimento = url.searchParams.get('ordemAtendimento') || '';
    const ativo = url.searchParams.get('ativo') || '';
    const dataForaHora = url.searchParams.get('dataForaHora') || '';
    const idUsuarioCancelamento = url.searchParams.get('idUsuarioCancelamento') || '';
    const dataCancelamento = url.searchParams.get('dataCancelamento') || '';
    const tipoUsuarioCancelamento = url.searchParams.get('tipoUsuarioCancelamento') || '';
    const confidencialProfissional = url.searchParams.get('confidencialProfissional') || '';
    const confidencialPaciente = url.searchParams.get('confidencialPaciente') || '';
    const imagemAssinatura = url.searchParams.get('imagemAssinatura') || '';

    const atendimentoAceite = url.searchParams.get('atendimentoAceite') || '';
    const atendimentoAssinaturas = url.searchParams.get('atendimentoAssinaturas') || '';
    const atendimentoAtividades = url.searchParams.get('atendimentoAtividades') || '';
    const idPaciente = url.searchParams.get('idPaciente') || '';
    const idOperadora = url.searchParams.get('idOperadora') || '';
    const idEspecialidade = url.searchParams.get('idEspecialidade') || '';
    const idPadItem = url.searchParams.get('idPadItem') || '';
    const idStatusAtendimento = url.searchParams.get('idStatusAtendimento') || '';
    const idPeriodo = url.searchParams.get('idPeriodo') || '';
    const idCidade = url.searchParams.get('idCidade') || '';

    return {
      idUnidade,
      idFranquia,
      idProfissional,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      latitude,
      longitude,
      dataAgenda,
      horario,
      dataChegada,
      latitudeChegada,
      longitudeChegada,
      dataSaida,
      latitudeSaida,
      longitudeSaida,
      evolucao,
      observacao,
      intercorrencia,
      avaliacao,
      aceito,
      motivo,
      valor,
      ordemAtendimento,
      ativo,
      dataForaHora,
      idUsuarioCancelamento,
      dataCancelamento,
      tipoUsuarioCancelamento,
      confidencialProfissional,
      confidencialPaciente,
      imagemAssinatura,
      atendimentoAceite,
      atendimentoAssinaturas,
      atendimentoAtividades,
      idPaciente,
      idOperadora,
      idEspecialidade,
      idPadItem,
      idStatusAtendimento,
      idPeriodo,
      idCidade
    };
  };

  componentDidMount() {
    this.getEntities();

    this.props.getPacientes();
    this.props.getOperadoras();
    this.props.getEspecialidades();
    this.props.getPadItems();
    this.props.getStatusAtendimentos();
    this.props.getPeriodos();
    this.props.getCidades();
  }

  cancelCourse = () => {
    this.setState(
      {
        idUnidade: '',
        idFranquia: '',
        idProfissional: '',
        cep: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',
        latitude: '',
        longitude: '',
        dataAgenda: '',
        horario: '',
        dataChegada: '',
        latitudeChegada: '',
        longitudeChegada: '',
        dataSaida: '',
        latitudeSaida: '',
        longitudeSaida: '',
        evolucao: '',
        observacao: '',
        intercorrencia: '',
        avaliacao: '',
        aceito: '',
        motivo: '',
        valor: '',
        ordemAtendimento: '',
        ativo: '',
        dataForaHora: '',
        idUsuarioCancelamento: '',
        dataCancelamento: '',
        tipoUsuarioCancelamento: '',
        confidencialProfissional: '',
        confidencialPaciente: '',
        imagemAssinatura: '',
        atendimentoAceite: '',
        atendimentoAssinaturas: '',
        atendimentoAtividades: '',
        idPaciente: '',
        idOperadora: '',
        idEspecialidade: '',
        idPadItem: '',
        idStatusAtendimento: '',
        idPeriodo: '',
        idCidade: ''
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
      'idProfissional=' +
      this.state.idProfissional +
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
      'dataAgenda=' +
      this.state.dataAgenda +
      '&' +
      'horario=' +
      this.state.horario +
      '&' +
      'dataChegada=' +
      this.state.dataChegada +
      '&' +
      'latitudeChegada=' +
      this.state.latitudeChegada +
      '&' +
      'longitudeChegada=' +
      this.state.longitudeChegada +
      '&' +
      'dataSaida=' +
      this.state.dataSaida +
      '&' +
      'latitudeSaida=' +
      this.state.latitudeSaida +
      '&' +
      'longitudeSaida=' +
      this.state.longitudeSaida +
      '&' +
      'evolucao=' +
      this.state.evolucao +
      '&' +
      'observacao=' +
      this.state.observacao +
      '&' +
      'intercorrencia=' +
      this.state.intercorrencia +
      '&' +
      'avaliacao=' +
      this.state.avaliacao +
      '&' +
      'aceito=' +
      this.state.aceito +
      '&' +
      'motivo=' +
      this.state.motivo +
      '&' +
      'valor=' +
      this.state.valor +
      '&' +
      'ordemAtendimento=' +
      this.state.ordemAtendimento +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'dataForaHora=' +
      this.state.dataForaHora +
      '&' +
      'idUsuarioCancelamento=' +
      this.state.idUsuarioCancelamento +
      '&' +
      'dataCancelamento=' +
      this.state.dataCancelamento +
      '&' +
      'tipoUsuarioCancelamento=' +
      this.state.tipoUsuarioCancelamento +
      '&' +
      'confidencialProfissional=' +
      this.state.confidencialProfissional +
      '&' +
      'confidencialPaciente=' +
      this.state.confidencialPaciente +
      '&' +
      'imagemAssinatura=' +
      this.state.imagemAssinatura +
      '&' +
      'atendimentoAceite=' +
      this.state.atendimentoAceite +
      '&' +
      'atendimentoAssinaturas=' +
      this.state.atendimentoAssinaturas +
      '&' +
      'atendimentoAtividades=' +
      this.state.atendimentoAtividades +
      '&' +
      'idPaciente=' +
      this.state.idPaciente +
      '&' +
      'idOperadora=' +
      this.state.idOperadora +
      '&' +
      'idEspecialidade=' +
      this.state.idEspecialidade +
      '&' +
      'idPadItem=' +
      this.state.idPadItem +
      '&' +
      'idStatusAtendimento=' +
      this.state.idStatusAtendimento +
      '&' +
      'idPeriodo=' +
      this.state.idPeriodo +
      '&' +
      'idCidade=' +
      this.state.idCidade +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      idUnidade,
      idFranquia,
      idProfissional,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      latitude,
      longitude,
      dataAgenda,
      horario,
      dataChegada,
      latitudeChegada,
      longitudeChegada,
      dataSaida,
      latitudeSaida,
      longitudeSaida,
      evolucao,
      observacao,
      intercorrencia,
      avaliacao,
      aceito,
      motivo,
      valor,
      ordemAtendimento,
      ativo,
      dataForaHora,
      idUsuarioCancelamento,
      dataCancelamento,
      tipoUsuarioCancelamento,
      confidencialProfissional,
      confidencialPaciente,
      imagemAssinatura,
      atendimentoAceite,
      atendimentoAssinaturas,
      atendimentoAtividades,
      idPaciente,
      idOperadora,
      idEspecialidade,
      idPadItem,
      idStatusAtendimento,
      idPeriodo,
      idCidade,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      idUnidade,
      idFranquia,
      idProfissional,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      latitude,
      longitude,
      dataAgenda,
      horario,
      dataChegada,
      latitudeChegada,
      longitudeChegada,
      dataSaida,
      latitudeSaida,
      longitudeSaida,
      evolucao,
      observacao,
      intercorrencia,
      avaliacao,
      aceito,
      motivo,
      valor,
      ordemAtendimento,
      ativo,
      dataForaHora,
      idUsuarioCancelamento,
      dataCancelamento,
      tipoUsuarioCancelamento,
      confidencialProfissional,
      confidencialPaciente,
      imagemAssinatura,
      atendimentoAceite,
      atendimentoAssinaturas,
      atendimentoAtividades,
      idPaciente,
      idOperadora,
      idEspecialidade,
      idPadItem,
      idStatusAtendimento,
      idPeriodo,
      idCidade,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const {
      pacientes,
      operadoras,
      especialidades,
      padItems,
      statusAtendimentos,
      periodos,
      cidades,
      atendimentoList,
      match,
      totalItems
    } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Atendimentos</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Atendimentos</span>
              <Button id="togglerFilterAtendimento" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.atendimento.home.createLabel">Create a new Atendimento</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterAtendimento">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="idUnidadeLabel" for="atendimento-idUnidade">
                            <Translate contentKey="generadorApp.atendimento.idUnidade">Id Unidade</Translate>
                          </Label>

                          <AvInput type="text" name="idUnidade" id="atendimento-idUnidade" value={this.state.idUnidade} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idFranquiaLabel" for="atendimento-idFranquia">
                            <Translate contentKey="generadorApp.atendimento.idFranquia">Id Franquia</Translate>
                          </Label>

                          <AvInput type="text" name="idFranquia" id="atendimento-idFranquia" value={this.state.idFranquia} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idProfissionalLabel" for="atendimento-idProfissional">
                            <Translate contentKey="generadorApp.atendimento.idProfissional">Id Profissional</Translate>
                          </Label>

                          <AvInput type="text" name="idProfissional" id="atendimento-idProfissional" value={this.state.idProfissional} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cepLabel" for="atendimento-cep">
                            <Translate contentKey="generadorApp.atendimento.cep">Cep</Translate>
                          </Label>

                          <AvInput type="text" name="cep" id="atendimento-cep" value={this.state.cep} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="enderecoLabel" for="atendimento-endereco">
                            <Translate contentKey="generadorApp.atendimento.endereco">Endereco</Translate>
                          </Label>

                          <AvInput type="text" name="endereco" id="atendimento-endereco" value={this.state.endereco} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="numeroLabel" for="atendimento-numero">
                            <Translate contentKey="generadorApp.atendimento.numero">Numero</Translate>
                          </Label>

                          <AvInput type="text" name="numero" id="atendimento-numero" value={this.state.numero} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="complementoLabel" for="atendimento-complemento">
                            <Translate contentKey="generadorApp.atendimento.complemento">Complemento</Translate>
                          </Label>

                          <AvInput type="text" name="complemento" id="atendimento-complemento" value={this.state.complemento} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="bairroLabel" for="atendimento-bairro">
                            <Translate contentKey="generadorApp.atendimento.bairro">Bairro</Translate>
                          </Label>

                          <AvInput type="text" name="bairro" id="atendimento-bairro" value={this.state.bairro} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cidadeLabel" for="atendimento-cidade">
                            <Translate contentKey="generadorApp.atendimento.cidade">Cidade</Translate>
                          </Label>

                          <AvInput type="text" name="cidade" id="atendimento-cidade" value={this.state.cidade} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ufLabel" for="atendimento-uf">
                            <Translate contentKey="generadorApp.atendimento.uf">Uf</Translate>
                          </Label>

                          <AvInput type="text" name="uf" id="atendimento-uf" value={this.state.uf} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="latitudeLabel" for="atendimento-latitude">
                            <Translate contentKey="generadorApp.atendimento.latitude">Latitude</Translate>
                          </Label>

                          <AvInput type="text" name="latitude" id="atendimento-latitude" value={this.state.latitude} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="longitudeLabel" for="atendimento-longitude">
                            <Translate contentKey="generadorApp.atendimento.longitude">Longitude</Translate>
                          </Label>

                          <AvInput type="text" name="longitude" id="atendimento-longitude" value={this.state.longitude} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataAgendaLabel" for="atendimento-dataAgenda">
                            <Translate contentKey="generadorApp.atendimento.dataAgenda">Data Agenda</Translate>
                          </Label>
                          <AvInput
                            id="atendimento-dataAgenda"
                            type="datetime-local"
                            className="form-control"
                            name="dataAgenda"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.dataAgenda ? convertDateTimeFromServer(this.state.dataAgenda) : null}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="horarioLabel" for="atendimento-horario">
                            <Translate contentKey="generadorApp.atendimento.horario">Horario</Translate>
                          </Label>

                          <AvInput type="text" name="horario" id="atendimento-horario" value={this.state.horario} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataChegadaLabel" for="atendimento-dataChegada">
                            <Translate contentKey="generadorApp.atendimento.dataChegada">Data Chegada</Translate>
                          </Label>
                          <AvInput
                            id="atendimento-dataChegada"
                            type="datetime-local"
                            className="form-control"
                            name="dataChegada"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.dataChegada ? convertDateTimeFromServer(this.state.dataChegada) : null}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="latitudeChegadaLabel" for="atendimento-latitudeChegada">
                            <Translate contentKey="generadorApp.atendimento.latitudeChegada">Latitude Chegada</Translate>
                          </Label>

                          <AvInput type="text" name="latitudeChegada" id="atendimento-latitudeChegada" value={this.state.latitudeChegada} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="longitudeChegadaLabel" for="atendimento-longitudeChegada">
                            <Translate contentKey="generadorApp.atendimento.longitudeChegada">Longitude Chegada</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="longitudeChegada"
                            id="atendimento-longitudeChegada"
                            value={this.state.longitudeChegada}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataSaidaLabel" for="atendimento-dataSaida">
                            <Translate contentKey="generadorApp.atendimento.dataSaida">Data Saida</Translate>
                          </Label>
                          <AvInput
                            id="atendimento-dataSaida"
                            type="datetime-local"
                            className="form-control"
                            name="dataSaida"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.dataSaida ? convertDateTimeFromServer(this.state.dataSaida) : null}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="latitudeSaidaLabel" for="atendimento-latitudeSaida">
                            <Translate contentKey="generadorApp.atendimento.latitudeSaida">Latitude Saida</Translate>
                          </Label>

                          <AvInput type="text" name="latitudeSaida" id="atendimento-latitudeSaida" value={this.state.latitudeSaida} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="longitudeSaidaLabel" for="atendimento-longitudeSaida">
                            <Translate contentKey="generadorApp.atendimento.longitudeSaida">Longitude Saida</Translate>
                          </Label>

                          <AvInput type="text" name="longitudeSaida" id="atendimento-longitudeSaida" value={this.state.longitudeSaida} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="evolucaoLabel" for="atendimento-evolucao">
                            <Translate contentKey="generadorApp.atendimento.evolucao">Evolucao</Translate>
                          </Label>

                          <AvInput type="text" name="evolucao" id="atendimento-evolucao" value={this.state.evolucao} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="observacaoLabel" for="atendimento-observacao">
                            <Translate contentKey="generadorApp.atendimento.observacao">Observacao</Translate>
                          </Label>

                          <AvInput type="text" name="observacao" id="atendimento-observacao" value={this.state.observacao} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="intercorrenciaLabel" for="atendimento-intercorrencia">
                            <Translate contentKey="generadorApp.atendimento.intercorrencia">Intercorrencia</Translate>
                          </Label>
                          <AvInput type="string" name="intercorrencia" id="atendimento-intercorrencia" value={this.state.intercorrencia} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="avaliacaoLabel" for="atendimento-avaliacao">
                            <Translate contentKey="generadorApp.atendimento.avaliacao">Avaliacao</Translate>
                          </Label>
                          <AvInput type="string" name="avaliacao" id="atendimento-avaliacao" value={this.state.avaliacao} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="aceitoLabel" for="atendimento-aceito">
                            <Translate contentKey="generadorApp.atendimento.aceito">Aceito</Translate>
                          </Label>
                          <AvInput type="string" name="aceito" id="atendimento-aceito" value={this.state.aceito} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="motivoLabel" for="atendimento-motivo">
                            <Translate contentKey="generadorApp.atendimento.motivo">Motivo</Translate>
                          </Label>

                          <AvInput type="text" name="motivo" id="atendimento-motivo" value={this.state.motivo} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="valorLabel" for="atendimento-valor">
                            <Translate contentKey="generadorApp.atendimento.valor">Valor</Translate>
                          </Label>
                          <AvInput type="string" name="valor" id="atendimento-valor" value={this.state.valor} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ordemAtendimentoLabel" for="atendimento-ordemAtendimento">
                            <Translate contentKey="generadorApp.atendimento.ordemAtendimento">Ordem Atendimento</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="ordemAtendimento"
                            id="atendimento-ordemAtendimento"
                            value={this.state.ordemAtendimento}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="atendimento-ativo">
                            <Translate contentKey="generadorApp.atendimento.ativo">Ativo</Translate>
                          </Label>
                          <AvInput type="string" name="ativo" id="atendimento-ativo" value={this.state.ativo} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataForaHoraLabel" for="atendimento-dataForaHora">
                            <Translate contentKey="generadorApp.atendimento.dataForaHora">Data Fora Hora</Translate>
                          </Label>
                          <AvInput
                            id="atendimento-dataForaHora"
                            type="datetime-local"
                            className="form-control"
                            name="dataForaHora"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.dataForaHora ? convertDateTimeFromServer(this.state.dataForaHora) : null}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idUsuarioCancelamentoLabel" for="atendimento-idUsuarioCancelamento">
                            <Translate contentKey="generadorApp.atendimento.idUsuarioCancelamento">Id Usuario Cancelamento</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="idUsuarioCancelamento"
                            id="atendimento-idUsuarioCancelamento"
                            value={this.state.idUsuarioCancelamento}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataCancelamentoLabel" for="atendimento-dataCancelamento">
                            <Translate contentKey="generadorApp.atendimento.dataCancelamento">Data Cancelamento</Translate>
                          </Label>
                          <AvInput
                            type="date"
                            name="dataCancelamento"
                            id="atendimento-dataCancelamento"
                            value={this.state.dataCancelamento}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="tipoUsuarioCancelamentoLabel" for="atendimento-tipoUsuarioCancelamento">
                            <Translate contentKey="generadorApp.atendimento.tipoUsuarioCancelamento">Tipo Usuario Cancelamento</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="tipoUsuarioCancelamento"
                            id="atendimento-tipoUsuarioCancelamento"
                            value={this.state.tipoUsuarioCancelamento}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="confidencialProfissionalLabel" for="atendimento-confidencialProfissional">
                            <Translate contentKey="generadorApp.atendimento.confidencialProfissional">Confidencial Profissional</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="confidencialProfissional"
                            id="atendimento-confidencialProfissional"
                            value={this.state.confidencialProfissional}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="confidencialPacienteLabel" for="atendimento-confidencialPaciente">
                            <Translate contentKey="generadorApp.atendimento.confidencialPaciente">Confidencial Paciente</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="confidencialPaciente"
                            id="atendimento-confidencialPaciente"
                            value={this.state.confidencialPaciente}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="imagemAssinaturaLabel" for="atendimento-imagemAssinatura">
                            <Translate contentKey="generadorApp.atendimento.imagemAssinatura">Imagem Assinatura</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="imagemAssinatura"
                            id="atendimento-imagemAssinatura"
                            value={this.state.imagemAssinatura}
                          />
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
                        <Row>
                          <div>
                            <Label for="atendimento-idPaciente">
                              <Translate contentKey="generadorApp.atendimento.idPaciente">Id Paciente</Translate>
                            </Label>
                            <AvInput id="atendimento-idPaciente" type="select" className="form-control" name="idPacienteId">
                              <option value="" key="0" />
                              {pacientes
                                ? pacientes.map(otherEntity => (
                                    <option value={otherEntity.id} key={otherEntity.id}>
                                      {otherEntity.id}
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
                            <Label for="atendimento-idOperadora">
                              <Translate contentKey="generadorApp.atendimento.idOperadora">Id Operadora</Translate>
                            </Label>
                            <AvInput id="atendimento-idOperadora" type="select" className="form-control" name="idOperadoraId">
                              <option value="" key="0" />
                              {operadoras
                                ? operadoras.map(otherEntity => (
                                    <option value={otherEntity.id} key={otherEntity.id}>
                                      {otherEntity.id}
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
                            <Label for="atendimento-idEspecialidade">
                              <Translate contentKey="generadorApp.atendimento.idEspecialidade">Id Especialidade</Translate>
                            </Label>
                            <AvInput id="atendimento-idEspecialidade" type="select" className="form-control" name="idEspecialidadeId">
                              <option value="" key="0" />
                              {especialidades
                                ? especialidades.map(otherEntity => (
                                    <option value={otherEntity.id} key={otherEntity.id}>
                                      {otherEntity.id}
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
                            <Label for="atendimento-idPadItem">
                              <Translate contentKey="generadorApp.atendimento.idPadItem">Id Pad Item</Translate>
                            </Label>
                            <AvInput id="atendimento-idPadItem" type="select" className="form-control" name="idPadItemId">
                              <option value="" key="0" />
                              {padItems
                                ? padItems.map(otherEntity => (
                                    <option value={otherEntity.id} key={otherEntity.id}>
                                      {otherEntity.id}
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
                            <Label for="atendimento-idStatusAtendimento">
                              <Translate contentKey="generadorApp.atendimento.idStatusAtendimento">Id Status Atendimento</Translate>
                            </Label>
                            <AvInput
                              id="atendimento-idStatusAtendimento"
                              type="select"
                              className="form-control"
                              name="idStatusAtendimentoId"
                            >
                              <option value="" key="0" />
                              {statusAtendimentos
                                ? statusAtendimentos.map(otherEntity => (
                                    <option value={otherEntity.id} key={otherEntity.id}>
                                      {otherEntity.id}
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
                            <Label for="atendimento-idPeriodo">
                              <Translate contentKey="generadorApp.atendimento.idPeriodo">Id Periodo</Translate>
                            </Label>
                            <AvInput id="atendimento-idPeriodo" type="select" className="form-control" name="idPeriodoId">
                              <option value="" key="0" />
                              {periodos
                                ? periodos.map(otherEntity => (
                                    <option value={otherEntity.id} key={otherEntity.id}>
                                      {otherEntity.id}
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
                            <Label for="atendimento-idCidade">
                              <Translate contentKey="generadorApp.atendimento.idCidade">Id Cidade</Translate>
                            </Label>
                            <AvInput id="atendimento-idCidade" type="select" className="form-control" name="idCidadeId">
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

              {atendimentoList && atendimentoList.length > 0 ? (
                <Table responsive aria-describedby="atendimento-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idUnidade')}>
                        <Translate contentKey="generadorApp.atendimento.idUnidade">Id Unidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idFranquia')}>
                        <Translate contentKey="generadorApp.atendimento.idFranquia">Id Franquia</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idProfissional')}>
                        <Translate contentKey="generadorApp.atendimento.idProfissional">Id Profissional</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cep')}>
                        <Translate contentKey="generadorApp.atendimento.cep">Cep</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('endereco')}>
                        <Translate contentKey="generadorApp.atendimento.endereco">Endereco</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('numero')}>
                        <Translate contentKey="generadorApp.atendimento.numero">Numero</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('complemento')}>
                        <Translate contentKey="generadorApp.atendimento.complemento">Complemento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('bairro')}>
                        <Translate contentKey="generadorApp.atendimento.bairro">Bairro</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cidade')}>
                        <Translate contentKey="generadorApp.atendimento.cidade">Cidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('uf')}>
                        <Translate contentKey="generadorApp.atendimento.uf">Uf</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('latitude')}>
                        <Translate contentKey="generadorApp.atendimento.latitude">Latitude</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('longitude')}>
                        <Translate contentKey="generadorApp.atendimento.longitude">Longitude</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataAgenda')}>
                        <Translate contentKey="generadorApp.atendimento.dataAgenda">Data Agenda</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('horario')}>
                        <Translate contentKey="generadorApp.atendimento.horario">Horario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataChegada')}>
                        <Translate contentKey="generadorApp.atendimento.dataChegada">Data Chegada</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('latitudeChegada')}>
                        <Translate contentKey="generadorApp.atendimento.latitudeChegada">Latitude Chegada</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('longitudeChegada')}>
                        <Translate contentKey="generadorApp.atendimento.longitudeChegada">Longitude Chegada</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataSaida')}>
                        <Translate contentKey="generadorApp.atendimento.dataSaida">Data Saida</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('latitudeSaida')}>
                        <Translate contentKey="generadorApp.atendimento.latitudeSaida">Latitude Saida</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('longitudeSaida')}>
                        <Translate contentKey="generadorApp.atendimento.longitudeSaida">Longitude Saida</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('evolucao')}>
                        <Translate contentKey="generadorApp.atendimento.evolucao">Evolucao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('observacao')}>
                        <Translate contentKey="generadorApp.atendimento.observacao">Observacao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('intercorrencia')}>
                        <Translate contentKey="generadorApp.atendimento.intercorrencia">Intercorrencia</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('avaliacao')}>
                        <Translate contentKey="generadorApp.atendimento.avaliacao">Avaliacao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('aceito')}>
                        <Translate contentKey="generadorApp.atendimento.aceito">Aceito</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('motivo')}>
                        <Translate contentKey="generadorApp.atendimento.motivo">Motivo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('valor')}>
                        <Translate contentKey="generadorApp.atendimento.valor">Valor</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ordemAtendimento')}>
                        <Translate contentKey="generadorApp.atendimento.ordemAtendimento">Ordem Atendimento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.atendimento.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataForaHora')}>
                        <Translate contentKey="generadorApp.atendimento.dataForaHora">Data Fora Hora</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idUsuarioCancelamento')}>
                        <Translate contentKey="generadorApp.atendimento.idUsuarioCancelamento">Id Usuario Cancelamento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataCancelamento')}>
                        <Translate contentKey="generadorApp.atendimento.dataCancelamento">Data Cancelamento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('tipoUsuarioCancelamento')}>
                        <Translate contentKey="generadorApp.atendimento.tipoUsuarioCancelamento">Tipo Usuario Cancelamento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('confidencialProfissional')}>
                        <Translate contentKey="generadorApp.atendimento.confidencialProfissional">Confidencial Profissional</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('confidencialPaciente')}>
                        <Translate contentKey="generadorApp.atendimento.confidencialPaciente">Confidencial Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('imagemAssinatura')}>
                        <Translate contentKey="generadorApp.atendimento.imagemAssinatura">Imagem Assinatura</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.atendimento.idPaciente">Id Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.atendimento.idOperadora">Id Operadora</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.atendimento.idEspecialidade">Id Especialidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.atendimento.idPadItem">Id Pad Item</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.atendimento.idStatusAtendimento">Id Status Atendimento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.atendimento.idPeriodo">Id Periodo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.atendimento.idCidade">Id Cidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {atendimentoList.map((atendimento, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${atendimento.id}`} color="link" size="sm">
                            {atendimento.id}
                          </Button>
                        </td>

                        <td>{atendimento.idUnidade}</td>

                        <td>{atendimento.idFranquia}</td>

                        <td>{atendimento.idProfissional}</td>

                        <td>{atendimento.cep}</td>

                        <td>{atendimento.endereco}</td>

                        <td>{atendimento.numero}</td>

                        <td>{atendimento.complemento}</td>

                        <td>{atendimento.bairro}</td>

                        <td>{atendimento.cidade}</td>

                        <td>{atendimento.uf}</td>

                        <td>{atendimento.latitude}</td>

                        <td>{atendimento.longitude}</td>

                        <td>
                          <TextFormat type="date" value={atendimento.dataAgenda} format={APP_DATE_FORMAT} />
                        </td>

                        <td>{atendimento.horario}</td>

                        <td>
                          <TextFormat type="date" value={atendimento.dataChegada} format={APP_DATE_FORMAT} />
                        </td>

                        <td>{atendimento.latitudeChegada}</td>

                        <td>{atendimento.longitudeChegada}</td>

                        <td>
                          <TextFormat type="date" value={atendimento.dataSaida} format={APP_DATE_FORMAT} />
                        </td>

                        <td>{atendimento.latitudeSaida}</td>

                        <td>{atendimento.longitudeSaida}</td>

                        <td>{atendimento.evolucao}</td>

                        <td>{atendimento.observacao}</td>

                        <td>{atendimento.intercorrencia}</td>

                        <td>{atendimento.avaliacao}</td>

                        <td>{atendimento.aceito}</td>

                        <td>{atendimento.motivo}</td>

                        <td>{atendimento.valor}</td>

                        <td>{atendimento.ordemAtendimento}</td>

                        <td>{atendimento.ativo}</td>

                        <td>
                          <TextFormat type="date" value={atendimento.dataForaHora} format={APP_DATE_FORMAT} />
                        </td>

                        <td>{atendimento.idUsuarioCancelamento}</td>

                        <td>
                          <TextFormat type="date" value={atendimento.dataCancelamento} format={APP_LOCAL_DATE_FORMAT} />
                        </td>

                        <td>{atendimento.tipoUsuarioCancelamento}</td>

                        <td>{atendimento.confidencialProfissional}</td>

                        <td>{atendimento.confidencialPaciente}</td>

                        <td>{atendimento.imagemAssinatura}</td>
                        <td>
                          {atendimento.idPaciente ? (
                            <Link to={`paciente/${atendimento.idPaciente.id}`}>{atendimento.idPaciente.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>
                        <td>
                          {atendimento.idOperadora ? (
                            <Link to={`operadora/${atendimento.idOperadora.id}`}>{atendimento.idOperadora.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>
                        <td>
                          {atendimento.idEspecialidade ? (
                            <Link to={`especialidade/${atendimento.idEspecialidade.id}`}>{atendimento.idEspecialidade.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>
                        <td>
                          {atendimento.idPadItem ? <Link to={`pad-item/${atendimento.idPadItem.id}`}>{atendimento.idPadItem.id}</Link> : ''}
                        </td>
                        <td>
                          {atendimento.idStatusAtendimento ? (
                            <Link to={`status-atendimento/${atendimento.idStatusAtendimento.id}`}>
                              {atendimento.idStatusAtendimento.id}
                            </Link>
                          ) : (
                            ''
                          )}
                        </td>
                        <td>
                          {atendimento.idPeriodo ? <Link to={`periodo/${atendimento.idPeriodo.id}`}>{atendimento.idPeriodo.id}</Link> : ''}
                        </td>
                        <td>
                          {atendimento.idCidade ? <Link to={`cidade/${atendimento.idCidade.id}`}>{atendimento.idCidade.id}</Link> : ''}
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${atendimento.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${atendimento.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${atendimento.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.atendimento.home.notFound">No Atendimentos found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={atendimentoList && atendimentoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ atendimento, ...storeState }: IRootState) => ({
  pacientes: storeState.paciente.entities,
  operadoras: storeState.operadora.entities,
  especialidades: storeState.especialidade.entities,
  padItems: storeState.padItem.entities,
  statusAtendimentos: storeState.statusAtendimento.entities,
  periodos: storeState.periodo.entities,
  cidades: storeState.cidade.entities,
  atendimentoList: atendimento.entities,
  totalItems: atendimento.totalItems
});

const mapDispatchToProps = {
  getPacientes,
  getOperadoras,
  getEspecialidades,
  getPadItems,
  getStatusAtendimentos,
  getPeriodos,
  getCidades,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Atendimento);
