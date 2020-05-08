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
import { getAtendimentoState, IAtendimentoBaseState, getEntities } from './atendimento.reducer';
import { IAtendimento } from 'app/shared/model/atendimento.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { getEntities as getUnidadeEasies } from 'app/entities/unidade-easy/unidade-easy.reducer';

export interface IAtendimentoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IAtendimentoState extends IAtendimentoBaseState, IPaginationBaseState {}

export class Atendimento extends React.Component<IAtendimentoProps, IAtendimentoState> {
  private myFormRef: any;

  constructor(props: IAtendimentoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getAtendimentoState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getUnidadeEasies();
  }

  cancelCourse = () => {
    this.setState(
      {
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
        unidade: ''
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
      'unidade=' +
      this.state.unidade +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
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
      unidade,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
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
      unidade,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { unidadeEasies, atendimentoList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Atendimentos</span>
          <Button id="togglerFilterAtendimento" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.atendimento.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.atendimento.home.createLabel">Create a new Atendimento</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Atendimentos</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterAtendimento">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idFranquia' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idFranquiaLabel" for="atendimento-idFranquia">
                              <Translate contentKey="generadorApp.atendimento.idFranquia">Id Franquia</Translate>
                            </Label>

                            <AvInput type="text" name="idFranquia" id="atendimento-idFranquia" value={this.state.idFranquia} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idProfissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idProfissionalLabel" for="atendimento-idProfissional">
                              <Translate contentKey="generadorApp.atendimento.idProfissional">Id Profissional</Translate>
                            </Label>

                            <AvInput type="text" name="idProfissional" id="atendimento-idProfissional" value={this.state.idProfissional} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cep' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cepLabel" for="atendimento-cep">
                              <Translate contentKey="generadorApp.atendimento.cep">Cep</Translate>
                            </Label>

                            <AvInput type="text" name="cep" id="atendimento-cep" value={this.state.cep} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'endereco' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="enderecoLabel" for="atendimento-endereco">
                              <Translate contentKey="generadorApp.atendimento.endereco">Endereco</Translate>
                            </Label>

                            <AvInput type="text" name="endereco" id="atendimento-endereco" value={this.state.endereco} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'numero' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="numeroLabel" for="atendimento-numero">
                              <Translate contentKey="generadorApp.atendimento.numero">Numero</Translate>
                            </Label>

                            <AvInput type="text" name="numero" id="atendimento-numero" value={this.state.numero} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'complemento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="complementoLabel" for="atendimento-complemento">
                              <Translate contentKey="generadorApp.atendimento.complemento">Complemento</Translate>
                            </Label>

                            <AvInput type="text" name="complemento" id="atendimento-complemento" value={this.state.complemento} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'bairro' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="bairroLabel" for="atendimento-bairro">
                              <Translate contentKey="generadorApp.atendimento.bairro">Bairro</Translate>
                            </Label>

                            <AvInput type="text" name="bairro" id="atendimento-bairro" value={this.state.bairro} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cidadeLabel" for="atendimento-cidade">
                              <Translate contentKey="generadorApp.atendimento.cidade">Cidade</Translate>
                            </Label>

                            <AvInput type="text" name="cidade" id="atendimento-cidade" value={this.state.cidade} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'uf' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ufLabel" for="atendimento-uf">
                              <Translate contentKey="generadorApp.atendimento.uf">Uf</Translate>
                            </Label>

                            <AvInput type="text" name="uf" id="atendimento-uf" value={this.state.uf} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'latitude' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="latitudeLabel" for="atendimento-latitude">
                              <Translate contentKey="generadorApp.atendimento.latitude">Latitude</Translate>
                            </Label>

                            <AvInput type="text" name="latitude" id="atendimento-latitude" value={this.state.latitude} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'longitude' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="longitudeLabel" for="atendimento-longitude">
                              <Translate contentKey="generadorApp.atendimento.longitude">Longitude</Translate>
                            </Label>

                            <AvInput type="text" name="longitude" id="atendimento-longitude" value={this.state.longitude} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dataAgenda' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'horario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="horarioLabel" for="atendimento-horario">
                              <Translate contentKey="generadorApp.atendimento.horario">Horario</Translate>
                            </Label>

                            <AvInput type="text" name="horario" id="atendimento-horario" value={this.state.horario} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dataChegada' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'latitudeChegada' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="latitudeChegadaLabel" for="atendimento-latitudeChegada">
                              <Translate contentKey="generadorApp.atendimento.latitudeChegada">Latitude Chegada</Translate>
                            </Label>

                            <AvInput
                              type="text"
                              name="latitudeChegada"
                              id="atendimento-latitudeChegada"
                              value={this.state.latitudeChegada}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'longitudeChegada' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'dataSaida' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'latitudeSaida' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="latitudeSaidaLabel" for="atendimento-latitudeSaida">
                              <Translate contentKey="generadorApp.atendimento.latitudeSaida">Latitude Saida</Translate>
                            </Label>

                            <AvInput type="text" name="latitudeSaida" id="atendimento-latitudeSaida" value={this.state.latitudeSaida} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'longitudeSaida' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="longitudeSaidaLabel" for="atendimento-longitudeSaida">
                              <Translate contentKey="generadorApp.atendimento.longitudeSaida">Longitude Saida</Translate>
                            </Label>

                            <AvInput type="text" name="longitudeSaida" id="atendimento-longitudeSaida" value={this.state.longitudeSaida} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'evolucao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="evolucaoLabel" for="atendimento-evolucao">
                              <Translate contentKey="generadorApp.atendimento.evolucao">Evolucao</Translate>
                            </Label>

                            <AvInput type="text" name="evolucao" id="atendimento-evolucao" value={this.state.evolucao} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'observacao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="observacaoLabel" for="atendimento-observacao">
                              <Translate contentKey="generadorApp.atendimento.observacao">Observacao</Translate>
                            </Label>

                            <AvInput type="text" name="observacao" id="atendimento-observacao" value={this.state.observacao} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'intercorrencia' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="intercorrenciaLabel" for="atendimento-intercorrencia">
                              <Translate contentKey="generadorApp.atendimento.intercorrencia">Intercorrencia</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="intercorrencia"
                              id="atendimento-intercorrencia"
                              value={this.state.intercorrencia}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'avaliacao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="avaliacaoLabel" for="atendimento-avaliacao">
                              <Translate contentKey="generadorApp.atendimento.avaliacao">Avaliacao</Translate>
                            </Label>
                            <AvInput type="string" name="avaliacao" id="atendimento-avaliacao" value={this.state.avaliacao} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'aceito' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="aceitoLabel" for="atendimento-aceito">
                              <Translate contentKey="generadorApp.atendimento.aceito">Aceito</Translate>
                            </Label>
                            <AvInput type="string" name="aceito" id="atendimento-aceito" value={this.state.aceito} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'motivo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="motivoLabel" for="atendimento-motivo">
                              <Translate contentKey="generadorApp.atendimento.motivo">Motivo</Translate>
                            </Label>

                            <AvInput type="text" name="motivo" id="atendimento-motivo" value={this.state.motivo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'valor' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="valorLabel" for="atendimento-valor">
                              <Translate contentKey="generadorApp.atendimento.valor">Valor</Translate>
                            </Label>
                            <AvInput type="string" name="valor" id="atendimento-valor" value={this.state.valor} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ordemAtendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'ativo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ativoLabel" for="atendimento-ativo">
                              <Translate contentKey="generadorApp.atendimento.ativo">Ativo</Translate>
                            </Label>
                            <AvInput type="string" name="ativo" id="atendimento-ativo" value={this.state.ativo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dataForaHora' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'idUsuarioCancelamento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'dataCancelamento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'tipoUsuarioCancelamento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'confidencialProfissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="confidencialProfissionalLabel" for="atendimento-confidencialProfissional">
                              <Translate contentKey="generadorApp.atendimento.confidencialProfissional">
                                Confidencial Profissional
                              </Translate>
                            </Label>

                            <AvInput
                              type="text"
                              name="confidencialProfissional"
                              id="atendimento-confidencialProfissional"
                              value={this.state.confidencialProfissional}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'confidencialPaciente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'imagemAssinatura' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'unidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="atendimento-unidade">
                                <Translate contentKey="generadorApp.atendimento.unidade">Unidade</Translate>
                              </Label>
                              <Select
                                id="atendimento-unidade"
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
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.atendimento.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.atendimento.home.btn_filter_clean">Clean</Translate>
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
                      {this.state.baseFilters !== 'idFranquia' ? (
                        <th className="hand" onClick={this.sort('idFranquia')}>
                          <Translate contentKey="generadorApp.atendimento.idFranquia">Id Franquia</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idProfissional' ? (
                        <th className="hand" onClick={this.sort('idProfissional')}>
                          <Translate contentKey="generadorApp.atendimento.idProfissional">Id Profissional</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cep' ? (
                        <th className="hand" onClick={this.sort('cep')}>
                          <Translate contentKey="generadorApp.atendimento.cep">Cep</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'endereco' ? (
                        <th className="hand" onClick={this.sort('endereco')}>
                          <Translate contentKey="generadorApp.atendimento.endereco">Endereco</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'numero' ? (
                        <th className="hand" onClick={this.sort('numero')}>
                          <Translate contentKey="generadorApp.atendimento.numero">Numero</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'complemento' ? (
                        <th className="hand" onClick={this.sort('complemento')}>
                          <Translate contentKey="generadorApp.atendimento.complemento">Complemento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'bairro' ? (
                        <th className="hand" onClick={this.sort('bairro')}>
                          <Translate contentKey="generadorApp.atendimento.bairro">Bairro</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cidade' ? (
                        <th className="hand" onClick={this.sort('cidade')}>
                          <Translate contentKey="generadorApp.atendimento.cidade">Cidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'uf' ? (
                        <th className="hand" onClick={this.sort('uf')}>
                          <Translate contentKey="generadorApp.atendimento.uf">Uf</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'latitude' ? (
                        <th className="hand" onClick={this.sort('latitude')}>
                          <Translate contentKey="generadorApp.atendimento.latitude">Latitude</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'longitude' ? (
                        <th className="hand" onClick={this.sort('longitude')}>
                          <Translate contentKey="generadorApp.atendimento.longitude">Longitude</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'dataAgenda' ? (
                        <th className="hand" onClick={this.sort('dataAgenda')}>
                          <Translate contentKey="generadorApp.atendimento.dataAgenda">Data Agenda</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'horario' ? (
                        <th className="hand" onClick={this.sort('horario')}>
                          <Translate contentKey="generadorApp.atendimento.horario">Horario</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'dataChegada' ? (
                        <th className="hand" onClick={this.sort('dataChegada')}>
                          <Translate contentKey="generadorApp.atendimento.dataChegada">Data Chegada</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'latitudeChegada' ? (
                        <th className="hand" onClick={this.sort('latitudeChegada')}>
                          <Translate contentKey="generadorApp.atendimento.latitudeChegada">Latitude Chegada</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'longitudeChegada' ? (
                        <th className="hand" onClick={this.sort('longitudeChegada')}>
                          <Translate contentKey="generadorApp.atendimento.longitudeChegada">Longitude Chegada</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'dataSaida' ? (
                        <th className="hand" onClick={this.sort('dataSaida')}>
                          <Translate contentKey="generadorApp.atendimento.dataSaida">Data Saida</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'latitudeSaida' ? (
                        <th className="hand" onClick={this.sort('latitudeSaida')}>
                          <Translate contentKey="generadorApp.atendimento.latitudeSaida">Latitude Saida</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'longitudeSaida' ? (
                        <th className="hand" onClick={this.sort('longitudeSaida')}>
                          <Translate contentKey="generadorApp.atendimento.longitudeSaida">Longitude Saida</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'evolucao' ? (
                        <th className="hand" onClick={this.sort('evolucao')}>
                          <Translate contentKey="generadorApp.atendimento.evolucao">Evolucao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'observacao' ? (
                        <th className="hand" onClick={this.sort('observacao')}>
                          <Translate contentKey="generadorApp.atendimento.observacao">Observacao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'intercorrencia' ? (
                        <th className="hand" onClick={this.sort('intercorrencia')}>
                          <Translate contentKey="generadorApp.atendimento.intercorrencia">Intercorrencia</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'avaliacao' ? (
                        <th className="hand" onClick={this.sort('avaliacao')}>
                          <Translate contentKey="generadorApp.atendimento.avaliacao">Avaliacao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'aceito' ? (
                        <th className="hand" onClick={this.sort('aceito')}>
                          <Translate contentKey="generadorApp.atendimento.aceito">Aceito</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'motivo' ? (
                        <th className="hand" onClick={this.sort('motivo')}>
                          <Translate contentKey="generadorApp.atendimento.motivo">Motivo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'valor' ? (
                        <th className="hand" onClick={this.sort('valor')}>
                          <Translate contentKey="generadorApp.atendimento.valor">Valor</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ordemAtendimento' ? (
                        <th className="hand" onClick={this.sort('ordemAtendimento')}>
                          <Translate contentKey="generadorApp.atendimento.ordemAtendimento">Ordem Atendimento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ativo' ? (
                        <th className="hand" onClick={this.sort('ativo')}>
                          <Translate contentKey="generadorApp.atendimento.ativo">Ativo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'dataForaHora' ? (
                        <th className="hand" onClick={this.sort('dataForaHora')}>
                          <Translate contentKey="generadorApp.atendimento.dataForaHora">Data Fora Hora</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idUsuarioCancelamento' ? (
                        <th className="hand" onClick={this.sort('idUsuarioCancelamento')}>
                          <Translate contentKey="generadorApp.atendimento.idUsuarioCancelamento">Id Usuario Cancelamento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'dataCancelamento' ? (
                        <th className="hand" onClick={this.sort('dataCancelamento')}>
                          <Translate contentKey="generadorApp.atendimento.dataCancelamento">Data Cancelamento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'tipoUsuarioCancelamento' ? (
                        <th className="hand" onClick={this.sort('tipoUsuarioCancelamento')}>
                          <Translate contentKey="generadorApp.atendimento.tipoUsuarioCancelamento">Tipo Usuario Cancelamento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'confidencialProfissional' ? (
                        <th className="hand" onClick={this.sort('confidencialProfissional')}>
                          <Translate contentKey="generadorApp.atendimento.confidencialProfissional">Confidencial Profissional</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'confidencialPaciente' ? (
                        <th className="hand" onClick={this.sort('confidencialPaciente')}>
                          <Translate contentKey="generadorApp.atendimento.confidencialPaciente">Confidencial Paciente</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'imagemAssinatura' ? (
                        <th className="hand" onClick={this.sort('imagemAssinatura')}>
                          <Translate contentKey="generadorApp.atendimento.imagemAssinatura">Imagem Assinatura</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'unidade' ? (
                        <th>
                          <Translate contentKey="generadorApp.atendimento.unidade">Unidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

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

                        {this.state.baseFilters !== 'idFranquia' ? <td>{atendimento.idFranquia}</td> : null}

                        {this.state.baseFilters !== 'idProfissional' ? <td>{atendimento.idProfissional}</td> : null}

                        {this.state.baseFilters !== 'cep' ? <td>{atendimento.cep}</td> : null}

                        {this.state.baseFilters !== 'endereco' ? <td>{atendimento.endereco}</td> : null}

                        {this.state.baseFilters !== 'numero' ? <td>{atendimento.numero}</td> : null}

                        {this.state.baseFilters !== 'complemento' ? <td>{atendimento.complemento}</td> : null}

                        {this.state.baseFilters !== 'bairro' ? <td>{atendimento.bairro}</td> : null}

                        {this.state.baseFilters !== 'cidade' ? <td>{atendimento.cidade}</td> : null}

                        {this.state.baseFilters !== 'uf' ? <td>{atendimento.uf}</td> : null}

                        {this.state.baseFilters !== 'latitude' ? <td>{atendimento.latitude}</td> : null}

                        {this.state.baseFilters !== 'longitude' ? <td>{atendimento.longitude}</td> : null}

                        {this.state.baseFilters !== 'dataAgenda' ? (
                          <td>
                            <TextFormat type="date" value={atendimento.dataAgenda} format={APP_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'horario' ? <td>{atendimento.horario}</td> : null}

                        {this.state.baseFilters !== 'dataChegada' ? (
                          <td>
                            <TextFormat type="date" value={atendimento.dataChegada} format={APP_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'latitudeChegada' ? <td>{atendimento.latitudeChegada}</td> : null}

                        {this.state.baseFilters !== 'longitudeChegada' ? <td>{atendimento.longitudeChegada}</td> : null}

                        {this.state.baseFilters !== 'dataSaida' ? (
                          <td>
                            <TextFormat type="date" value={atendimento.dataSaida} format={APP_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'latitudeSaida' ? <td>{atendimento.latitudeSaida}</td> : null}

                        {this.state.baseFilters !== 'longitudeSaida' ? <td>{atendimento.longitudeSaida}</td> : null}

                        {this.state.baseFilters !== 'evolucao' ? <td>{atendimento.evolucao}</td> : null}

                        {this.state.baseFilters !== 'observacao' ? <td>{atendimento.observacao}</td> : null}

                        {this.state.baseFilters !== 'intercorrencia' ? <td>{atendimento.intercorrencia}</td> : null}

                        {this.state.baseFilters !== 'avaliacao' ? <td>{atendimento.avaliacao}</td> : null}

                        {this.state.baseFilters !== 'aceito' ? <td>{atendimento.aceito}</td> : null}

                        {this.state.baseFilters !== 'motivo' ? <td>{atendimento.motivo}</td> : null}

                        {this.state.baseFilters !== 'valor' ? <td>{atendimento.valor}</td> : null}

                        {this.state.baseFilters !== 'ordemAtendimento' ? <td>{atendimento.ordemAtendimento}</td> : null}

                        {this.state.baseFilters !== 'ativo' ? <td>{atendimento.ativo}</td> : null}

                        {this.state.baseFilters !== 'dataForaHora' ? (
                          <td>
                            <TextFormat type="date" value={atendimento.dataForaHora} format={APP_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'idUsuarioCancelamento' ? <td>{atendimento.idUsuarioCancelamento}</td> : null}

                        {this.state.baseFilters !== 'dataCancelamento' ? (
                          <td>
                            <TextFormat type="date" value={atendimento.dataCancelamento} format={APP_LOCAL_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'tipoUsuarioCancelamento' ? <td>{atendimento.tipoUsuarioCancelamento}</td> : null}

                        {this.state.baseFilters !== 'confidencialProfissional' ? <td>{atendimento.confidencialProfissional}</td> : null}

                        {this.state.baseFilters !== 'confidencialPaciente' ? <td>{atendimento.confidencialPaciente}</td> : null}

                        {this.state.baseFilters !== 'imagemAssinatura' ? <td>{atendimento.imagemAssinatura}</td> : null}

                        {this.state.baseFilters !== 'unidade' ? (
                          <td>
                            {atendimento.unidade ? <Link to={`unidade-easy/${atendimento.unidade.id}`}>{atendimento.unidade.id}</Link> : ''}
                          </td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${atendimento.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${atendimento.id}/edit?${this.getFiltersURL()}`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${atendimento.id}/delete?${this.getFiltersURL()}`}
                              color="danger"
                              size="sm"
                            >
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
  unidadeEasies: storeState.unidadeEasy.entities,
  atendimentoList: atendimento.entities,
  totalItems: atendimento.totalItems
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Atendimento);
