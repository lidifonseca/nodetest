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
import { getPadItemMetaState, IPadItemMetaBaseState, getEntities } from './pad-item-meta.reducer';
import { IPadItemMeta } from 'app/shared/model/pad-item-meta.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPadItemMetaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPadItemMetaState extends IPadItemMetaBaseState, IPaginationBaseState {}

export class PadItemMeta extends React.Component<IPadItemMetaProps, IPadItemMetaState> {
  private myFormRef: any;

  constructor(props: IPadItemMetaProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getPadItemMetaState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        unidadeMedidaId: '',
        indicadorId: '',
        idPaciente: '',
        idPad: '',
        idPadItem: '',
        minimo: '',
        maximo: '',
        meta: '',
        valorAtual: '',
        atualizadoEm: '',
        dataLimite: '',
        frequenciaMedicaoHoras: '',
        tipoAcompanhamento: '',
        atendimentoId: '',
        email: '',
        minimoSistolica: '',
        maximoSistolica: '',
        minimoDiastolica: '',
        maximoDiastolica: '',
        score: '',
        alteracaoEsperada: ''
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
      'unidadeMedidaId=' +
      this.state.unidadeMedidaId +
      '&' +
      'indicadorId=' +
      this.state.indicadorId +
      '&' +
      'idPaciente=' +
      this.state.idPaciente +
      '&' +
      'idPad=' +
      this.state.idPad +
      '&' +
      'idPadItem=' +
      this.state.idPadItem +
      '&' +
      'minimo=' +
      this.state.minimo +
      '&' +
      'maximo=' +
      this.state.maximo +
      '&' +
      'meta=' +
      this.state.meta +
      '&' +
      'valorAtual=' +
      this.state.valorAtual +
      '&' +
      'atualizadoEm=' +
      this.state.atualizadoEm +
      '&' +
      'dataLimite=' +
      this.state.dataLimite +
      '&' +
      'frequenciaMedicaoHoras=' +
      this.state.frequenciaMedicaoHoras +
      '&' +
      'tipoAcompanhamento=' +
      this.state.tipoAcompanhamento +
      '&' +
      'atendimentoId=' +
      this.state.atendimentoId +
      '&' +
      'email=' +
      this.state.email +
      '&' +
      'minimoSistolica=' +
      this.state.minimoSistolica +
      '&' +
      'maximoSistolica=' +
      this.state.maximoSistolica +
      '&' +
      'minimoDiastolica=' +
      this.state.minimoDiastolica +
      '&' +
      'maximoDiastolica=' +
      this.state.maximoDiastolica +
      '&' +
      'score=' +
      this.state.score +
      '&' +
      'alteracaoEsperada=' +
      this.state.alteracaoEsperada +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      unidadeMedidaId,
      indicadorId,
      idPaciente,
      idPad,
      idPadItem,
      minimo,
      maximo,
      meta,
      valorAtual,
      atualizadoEm,
      dataLimite,
      frequenciaMedicaoHoras,
      tipoAcompanhamento,
      atendimentoId,
      email,
      minimoSistolica,
      maximoSistolica,
      minimoDiastolica,
      maximoDiastolica,
      score,
      alteracaoEsperada,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      unidadeMedidaId,
      indicadorId,
      idPaciente,
      idPad,
      idPadItem,
      minimo,
      maximo,
      meta,
      valorAtual,
      atualizadoEm,
      dataLimite,
      frequenciaMedicaoHoras,
      tipoAcompanhamento,
      atendimentoId,
      email,
      minimoSistolica,
      maximoSistolica,
      minimoDiastolica,
      maximoDiastolica,
      score,
      alteracaoEsperada,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { padItemMetaList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Item Metas</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Pad Item Metas</span>
              <Button id="togglerFilterPadItemMeta" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link
                to={`${match.url}/new?${this.getFiltersURL()}`}
                className="btn btn-primary float-right jh-create-entity"
                id="jh-create-entity"
              >
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.padItemMeta.home.createLabel">Create a new Pad Item Meta</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPadItemMeta">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'unidadeMedidaId' ? (
                        <Col md="3">
                          <Row>
                            <Label id="unidadeMedidaIdLabel" for="pad-item-meta-unidadeMedidaId">
                              <Translate contentKey="generadorApp.padItemMeta.unidadeMedidaId">Unidade Medida Id</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="unidadeMedidaId"
                              id="pad-item-meta-unidadeMedidaId"
                              value={this.state.unidadeMedidaId}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'indicadorId' ? (
                        <Col md="3">
                          <Row>
                            <Label id="indicadorIdLabel" for="pad-item-meta-indicadorId">
                              <Translate contentKey="generadorApp.padItemMeta.indicadorId">Indicador Id</Translate>
                            </Label>
                            <AvInput type="string" name="indicadorId" id="pad-item-meta-indicadorId" value={this.state.indicadorId} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idPaciente' ? (
                        <Col md="3">
                          <Row>
                            <Label id="idPacienteLabel" for="pad-item-meta-idPaciente">
                              <Translate contentKey="generadorApp.padItemMeta.idPaciente">Id Paciente</Translate>
                            </Label>
                            <AvInput type="string" name="idPaciente" id="pad-item-meta-idPaciente" value={this.state.idPaciente} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idPad' ? (
                        <Col md="3">
                          <Row>
                            <Label id="idPadLabel" for="pad-item-meta-idPad">
                              <Translate contentKey="generadorApp.padItemMeta.idPad">Id Pad</Translate>
                            </Label>
                            <AvInput type="string" name="idPad" id="pad-item-meta-idPad" value={this.state.idPad} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idPadItem' ? (
                        <Col md="3">
                          <Row>
                            <Label id="idPadItemLabel" for="pad-item-meta-idPadItem">
                              <Translate contentKey="generadorApp.padItemMeta.idPadItem">Id Pad Item</Translate>
                            </Label>
                            <AvInput type="string" name="idPadItem" id="pad-item-meta-idPadItem" value={this.state.idPadItem} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'minimo' ? (
                        <Col md="3">
                          <Row>
                            <Label id="minimoLabel" for="pad-item-meta-minimo">
                              <Translate contentKey="generadorApp.padItemMeta.minimo">Minimo</Translate>
                            </Label>

                            <AvInput type="text" name="minimo" id="pad-item-meta-minimo" value={this.state.minimo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'maximo' ? (
                        <Col md="3">
                          <Row>
                            <Label id="maximoLabel" for="pad-item-meta-maximo">
                              <Translate contentKey="generadorApp.padItemMeta.maximo">Maximo</Translate>
                            </Label>

                            <AvInput type="text" name="maximo" id="pad-item-meta-maximo" value={this.state.maximo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'meta' ? (
                        <Col md="3">
                          <Row>
                            <Label id="metaLabel" for="pad-item-meta-meta">
                              <Translate contentKey="generadorApp.padItemMeta.meta">Meta</Translate>
                            </Label>

                            <AvInput type="text" name="meta" id="pad-item-meta-meta" value={this.state.meta} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'valorAtual' ? (
                        <Col md="3">
                          <Row>
                            <Label id="valorAtualLabel" for="pad-item-meta-valorAtual">
                              <Translate contentKey="generadorApp.padItemMeta.valorAtual">Valor Atual</Translate>
                            </Label>

                            <AvInput type="text" name="valorAtual" id="pad-item-meta-valorAtual" value={this.state.valorAtual} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'atualizadoEm' ? (
                        <Col md="3">
                          <Row>
                            <Label id="atualizadoEmLabel" for="pad-item-meta-atualizadoEm">
                              <Translate contentKey="generadorApp.padItemMeta.atualizadoEm">Atualizado Em</Translate>
                            </Label>
                            <AvInput
                              id="pad-item-meta-atualizadoEm"
                              type="datetime-local"
                              className="form-control"
                              name="atualizadoEm"
                              placeholder={'YYYY-MM-DD HH:mm'}
                              value={this.state.atualizadoEm ? convertDateTimeFromServer(this.state.atualizadoEm) : null}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dataLimite' ? (
                        <Col md="3">
                          <Row>
                            <Label id="dataLimiteLabel" for="pad-item-meta-dataLimite">
                              <Translate contentKey="generadorApp.padItemMeta.dataLimite">Data Limite</Translate>
                            </Label>
                            <AvInput
                              id="pad-item-meta-dataLimite"
                              type="datetime-local"
                              className="form-control"
                              name="dataLimite"
                              placeholder={'YYYY-MM-DD HH:mm'}
                              value={this.state.dataLimite ? convertDateTimeFromServer(this.state.dataLimite) : null}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'frequenciaMedicaoHoras' ? (
                        <Col md="3">
                          <Row>
                            <Label id="frequenciaMedicaoHorasLabel" for="pad-item-meta-frequenciaMedicaoHoras">
                              <Translate contentKey="generadorApp.padItemMeta.frequenciaMedicaoHoras">Frequencia Medicao Horas</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="frequenciaMedicaoHoras"
                              id="pad-item-meta-frequenciaMedicaoHoras"
                              value={this.state.frequenciaMedicaoHoras}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'tipoAcompanhamento' ? (
                        <Col md="3">
                          <Row>
                            <Label id="tipoAcompanhamentoLabel" for="pad-item-meta-tipoAcompanhamento">
                              <Translate contentKey="generadorApp.padItemMeta.tipoAcompanhamento">Tipo Acompanhamento</Translate>
                            </Label>

                            <AvInput
                              type="text"
                              name="tipoAcompanhamento"
                              id="pad-item-meta-tipoAcompanhamento"
                              value={this.state.tipoAcompanhamento}
                            />
                            <UncontrolledTooltip target="tipoAcompanhamentoLabel">
                              <Translate contentKey="generadorApp.padItemMeta.help.tipoAcompanhamento" />
                            </UncontrolledTooltip>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'atendimentoId' ? (
                        <Col md="3">
                          <Row>
                            <Label id="atendimentoIdLabel" for="pad-item-meta-atendimentoId">
                              <Translate contentKey="generadorApp.padItemMeta.atendimentoId">Atendimento Id</Translate>
                            </Label>
                            <AvInput type="string" name="atendimentoId" id="pad-item-meta-atendimentoId" value={this.state.atendimentoId} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'email' ? (
                        <Col md="3">
                          <Row>
                            <Label id="emailLabel" for="pad-item-meta-email">
                              <Translate contentKey="generadorApp.padItemMeta.email">Email</Translate>
                            </Label>
                            <AvInput type="string" name="email" id="pad-item-meta-email" value={this.state.email} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'minimoSistolica' ? (
                        <Col md="3">
                          <Row>
                            <Label id="minimoSistolicaLabel" for="pad-item-meta-minimoSistolica">
                              <Translate contentKey="generadorApp.padItemMeta.minimoSistolica">Minimo Sistolica</Translate>
                            </Label>

                            <AvInput
                              type="text"
                              name="minimoSistolica"
                              id="pad-item-meta-minimoSistolica"
                              value={this.state.minimoSistolica}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'maximoSistolica' ? (
                        <Col md="3">
                          <Row>
                            <Label id="maximoSistolicaLabel" for="pad-item-meta-maximoSistolica">
                              <Translate contentKey="generadorApp.padItemMeta.maximoSistolica">Maximo Sistolica</Translate>
                            </Label>

                            <AvInput
                              type="text"
                              name="maximoSistolica"
                              id="pad-item-meta-maximoSistolica"
                              value={this.state.maximoSistolica}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'minimoDiastolica' ? (
                        <Col md="3">
                          <Row>
                            <Label id="minimoDiastolicaLabel" for="pad-item-meta-minimoDiastolica">
                              <Translate contentKey="generadorApp.padItemMeta.minimoDiastolica">Minimo Diastolica</Translate>
                            </Label>

                            <AvInput
                              type="text"
                              name="minimoDiastolica"
                              id="pad-item-meta-minimoDiastolica"
                              value={this.state.minimoDiastolica}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'maximoDiastolica' ? (
                        <Col md="3">
                          <Row>
                            <Label id="maximoDiastolicaLabel" for="pad-item-meta-maximoDiastolica">
                              <Translate contentKey="generadorApp.padItemMeta.maximoDiastolica">Maximo Diastolica</Translate>
                            </Label>

                            <AvInput
                              type="text"
                              name="maximoDiastolica"
                              id="pad-item-meta-maximoDiastolica"
                              value={this.state.maximoDiastolica}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'score' ? (
                        <Col md="3">
                          <Row>
                            <Label id="scoreLabel" for="pad-item-meta-score">
                              <Translate contentKey="generadorApp.padItemMeta.score">Score</Translate>
                            </Label>
                            <AvInput type="string" name="score" id="pad-item-meta-score" value={this.state.score} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'alteracaoEsperada' ? (
                        <Col md="3">
                          <Row>
                            <Label id="alteracaoEsperadaLabel" check>
                              <AvInput
                                id="pad-item-meta-alteracaoEsperada"
                                type="checkbox"
                                className="form-control"
                                name="alteracaoEsperada"
                              />
                              <Translate contentKey="generadorApp.padItemMeta.alteracaoEsperada">Alteracao Esperada</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}
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

              {padItemMetaList && padItemMetaList.length > 0 ? (
                <Table responsive aria-describedby="pad-item-meta-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'unidadeMedidaId' ? (
                        <th className="hand" onClick={this.sort('unidadeMedidaId')}>
                          <Translate contentKey="generadorApp.padItemMeta.unidadeMedidaId">Unidade Medida Id</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'indicadorId' ? (
                        <th className="hand" onClick={this.sort('indicadorId')}>
                          <Translate contentKey="generadorApp.padItemMeta.indicadorId">Indicador Id</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idPaciente' ? (
                        <th className="hand" onClick={this.sort('idPaciente')}>
                          <Translate contentKey="generadorApp.padItemMeta.idPaciente">Id Paciente</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idPad' ? (
                        <th className="hand" onClick={this.sort('idPad')}>
                          <Translate contentKey="generadorApp.padItemMeta.idPad">Id Pad</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idPadItem' ? (
                        <th className="hand" onClick={this.sort('idPadItem')}>
                          <Translate contentKey="generadorApp.padItemMeta.idPadItem">Id Pad Item</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'minimo' ? (
                        <th className="hand" onClick={this.sort('minimo')}>
                          <Translate contentKey="generadorApp.padItemMeta.minimo">Minimo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'maximo' ? (
                        <th className="hand" onClick={this.sort('maximo')}>
                          <Translate contentKey="generadorApp.padItemMeta.maximo">Maximo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'meta' ? (
                        <th className="hand" onClick={this.sort('meta')}>
                          <Translate contentKey="generadorApp.padItemMeta.meta">Meta</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'valorAtual' ? (
                        <th className="hand" onClick={this.sort('valorAtual')}>
                          <Translate contentKey="generadorApp.padItemMeta.valorAtual">Valor Atual</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'atualizadoEm' ? (
                        <th className="hand" onClick={this.sort('atualizadoEm')}>
                          <Translate contentKey="generadorApp.padItemMeta.atualizadoEm">Atualizado Em</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'dataLimite' ? (
                        <th className="hand" onClick={this.sort('dataLimite')}>
                          <Translate contentKey="generadorApp.padItemMeta.dataLimite">Data Limite</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'frequenciaMedicaoHoras' ? (
                        <th className="hand" onClick={this.sort('frequenciaMedicaoHoras')}>
                          <Translate contentKey="generadorApp.padItemMeta.frequenciaMedicaoHoras">Frequencia Medicao Horas</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'tipoAcompanhamento' ? (
                        <th className="hand" onClick={this.sort('tipoAcompanhamento')}>
                          <Translate contentKey="generadorApp.padItemMeta.tipoAcompanhamento">Tipo Acompanhamento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'atendimentoId' ? (
                        <th className="hand" onClick={this.sort('atendimentoId')}>
                          <Translate contentKey="generadorApp.padItemMeta.atendimentoId">Atendimento Id</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'email' ? (
                        <th className="hand" onClick={this.sort('email')}>
                          <Translate contentKey="generadorApp.padItemMeta.email">Email</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'minimoSistolica' ? (
                        <th className="hand" onClick={this.sort('minimoSistolica')}>
                          <Translate contentKey="generadorApp.padItemMeta.minimoSistolica">Minimo Sistolica</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'maximoSistolica' ? (
                        <th className="hand" onClick={this.sort('maximoSistolica')}>
                          <Translate contentKey="generadorApp.padItemMeta.maximoSistolica">Maximo Sistolica</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'minimoDiastolica' ? (
                        <th className="hand" onClick={this.sort('minimoDiastolica')}>
                          <Translate contentKey="generadorApp.padItemMeta.minimoDiastolica">Minimo Diastolica</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'maximoDiastolica' ? (
                        <th className="hand" onClick={this.sort('maximoDiastolica')}>
                          <Translate contentKey="generadorApp.padItemMeta.maximoDiastolica">Maximo Diastolica</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'score' ? (
                        <th className="hand" onClick={this.sort('score')}>
                          <Translate contentKey="generadorApp.padItemMeta.score">Score</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'alteracaoEsperada' ? (
                        <th className="hand" onClick={this.sort('alteracaoEsperada')}>
                          <Translate contentKey="generadorApp.padItemMeta.alteracaoEsperada">Alteracao Esperada</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {padItemMetaList.map((padItemMeta, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${padItemMeta.id}`} color="link" size="sm">
                            {padItemMeta.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'unidadeMedidaId' ? <td>{padItemMeta.unidadeMedidaId}</td> : null}

                        {this.state.baseFilters !== 'indicadorId' ? <td>{padItemMeta.indicadorId}</td> : null}

                        {this.state.baseFilters !== 'idPaciente' ? <td>{padItemMeta.idPaciente}</td> : null}

                        {this.state.baseFilters !== 'idPad' ? <td>{padItemMeta.idPad}</td> : null}

                        {this.state.baseFilters !== 'idPadItem' ? <td>{padItemMeta.idPadItem}</td> : null}

                        {this.state.baseFilters !== 'minimo' ? <td>{padItemMeta.minimo}</td> : null}

                        {this.state.baseFilters !== 'maximo' ? <td>{padItemMeta.maximo}</td> : null}

                        {this.state.baseFilters !== 'meta' ? <td>{padItemMeta.meta}</td> : null}

                        {this.state.baseFilters !== 'valorAtual' ? <td>{padItemMeta.valorAtual}</td> : null}

                        {this.state.baseFilters !== 'atualizadoEm' ? (
                          <td>
                            <TextFormat type="date" value={padItemMeta.atualizadoEm} format={APP_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'dataLimite' ? (
                          <td>
                            <TextFormat type="date" value={padItemMeta.dataLimite} format={APP_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'frequenciaMedicaoHoras' ? <td>{padItemMeta.frequenciaMedicaoHoras}</td> : null}

                        {this.state.baseFilters !== 'tipoAcompanhamento' ? <td>{padItemMeta.tipoAcompanhamento}</td> : null}

                        {this.state.baseFilters !== 'atendimentoId' ? <td>{padItemMeta.atendimentoId}</td> : null}

                        {this.state.baseFilters !== 'email' ? <td>{padItemMeta.email}</td> : null}

                        {this.state.baseFilters !== 'minimoSistolica' ? <td>{padItemMeta.minimoSistolica}</td> : null}

                        {this.state.baseFilters !== 'maximoSistolica' ? <td>{padItemMeta.maximoSistolica}</td> : null}

                        {this.state.baseFilters !== 'minimoDiastolica' ? <td>{padItemMeta.minimoDiastolica}</td> : null}

                        {this.state.baseFilters !== 'maximoDiastolica' ? <td>{padItemMeta.maximoDiastolica}</td> : null}

                        {this.state.baseFilters !== 'score' ? <td>{padItemMeta.score}</td> : null}

                        {this.state.baseFilters !== 'alteracaoEsperada' ? (
                          <td>{padItemMeta.alteracaoEsperada ? 'true' : 'false'}</td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${padItemMeta.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${padItemMeta.id}/edit?${this.getFiltersURL()}`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${padItemMeta.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.padItemMeta.home.notFound">No Pad Item Metas found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={padItemMetaList && padItemMetaList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ padItemMeta, ...storeState }: IRootState) => ({
  padItemMetaList: padItemMeta.entities,
  totalItems: padItemMeta.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadItemMeta);
