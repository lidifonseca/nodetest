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
import { getPadItemTempState, IPadItemTempBaseState, getEntities } from './pad-item-temp.reducer';
import { IPadItemTemp } from 'app/shared/model/pad-item-temp.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPadItemTempProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPadItemTempState extends IPadItemTempBaseState, IPaginationBaseState {}

export class PadItemTemp extends React.Component<IPadItemTempProps, IPadItemTempState> {
  private myFormRef: any;

  constructor(props: IPadItemTempProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getPadItemTempState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        sessionId: '',
        idEspecialidade: '',
        idPeriodicidade: '',
        idPeriodo: '',
        dataInicio: '',
        dataFim: '',
        qtdSessoes: '',
        observacao: '',
        cidXPtaNovoId: '',
        categoriaId: '',
        numGhc: ''
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
      'sessionId=' +
      this.state.sessionId +
      '&' +
      'idEspecialidade=' +
      this.state.idEspecialidade +
      '&' +
      'idPeriodicidade=' +
      this.state.idPeriodicidade +
      '&' +
      'idPeriodo=' +
      this.state.idPeriodo +
      '&' +
      'dataInicio=' +
      this.state.dataInicio +
      '&' +
      'dataFim=' +
      this.state.dataFim +
      '&' +
      'qtdSessoes=' +
      this.state.qtdSessoes +
      '&' +
      'observacao=' +
      this.state.observacao +
      '&' +
      'cidXPtaNovoId=' +
      this.state.cidXPtaNovoId +
      '&' +
      'categoriaId=' +
      this.state.categoriaId +
      '&' +
      'numGhc=' +
      this.state.numGhc +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      sessionId,
      idEspecialidade,
      idPeriodicidade,
      idPeriodo,
      dataInicio,
      dataFim,
      qtdSessoes,
      observacao,
      cidXPtaNovoId,
      categoriaId,
      numGhc,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      sessionId,
      idEspecialidade,
      idPeriodicidade,
      idPeriodo,
      dataInicio,
      dataFim,
      qtdSessoes,
      observacao,
      cidXPtaNovoId,
      categoriaId,
      numGhc,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { padItemTempList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Pad Item Temps</span>
          <Button id="togglerFilterPadItemTemp" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.padItemTemp.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.padItemTemp.home.createLabel">Create a new Pad Item Temp</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Item Temps</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPadItemTemp">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'sessionId' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="sessionIdLabel" for="pad-item-temp-sessionId">
                              <Translate contentKey="generadorApp.padItemTemp.sessionId">Session Id</Translate>
                            </Label>

                            <AvInput type="text" name="sessionId" id="pad-item-temp-sessionId" value={this.state.sessionId} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idEspecialidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idEspecialidadeLabel" for="pad-item-temp-idEspecialidade">
                              <Translate contentKey="generadorApp.padItemTemp.idEspecialidade">Id Especialidade</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idEspecialidade"
                              id="pad-item-temp-idEspecialidade"
                              value={this.state.idEspecialidade}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idPeriodicidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idPeriodicidadeLabel" for="pad-item-temp-idPeriodicidade">
                              <Translate contentKey="generadorApp.padItemTemp.idPeriodicidade">Id Periodicidade</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idPeriodicidade"
                              id="pad-item-temp-idPeriodicidade"
                              value={this.state.idPeriodicidade}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idPeriodo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idPeriodoLabel" for="pad-item-temp-idPeriodo">
                              <Translate contentKey="generadorApp.padItemTemp.idPeriodo">Id Periodo</Translate>
                            </Label>
                            <AvInput type="string" name="idPeriodo" id="pad-item-temp-idPeriodo" value={this.state.idPeriodo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dataInicio' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="dataInicioLabel" for="pad-item-temp-dataInicio">
                              <Translate contentKey="generadorApp.padItemTemp.dataInicio">Data Inicio</Translate>
                            </Label>
                            <AvInput type="date" name="dataInicio" id="pad-item-temp-dataInicio" value={this.state.dataInicio} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dataFim' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="dataFimLabel" for="pad-item-temp-dataFim">
                              <Translate contentKey="generadorApp.padItemTemp.dataFim">Data Fim</Translate>
                            </Label>
                            <AvInput type="date" name="dataFim" id="pad-item-temp-dataFim" value={this.state.dataFim} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'qtdSessoes' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="qtdSessoesLabel" for="pad-item-temp-qtdSessoes">
                              <Translate contentKey="generadorApp.padItemTemp.qtdSessoes">Qtd Sessoes</Translate>
                            </Label>
                            <AvInput type="string" name="qtdSessoes" id="pad-item-temp-qtdSessoes" value={this.state.qtdSessoes} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'observacao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="observacaoLabel" for="pad-item-temp-observacao">
                              <Translate contentKey="generadorApp.padItemTemp.observacao">Observacao</Translate>
                            </Label>

                            <AvInput type="text" name="observacao" id="pad-item-temp-observacao" value={this.state.observacao} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cidXPtaNovoId' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cidXPtaNovoIdLabel" for="pad-item-temp-cidXPtaNovoId">
                              <Translate contentKey="generadorApp.padItemTemp.cidXPtaNovoId">Cid X Pta Novo Id</Translate>
                            </Label>
                            <AvInput type="string" name="cidXPtaNovoId" id="pad-item-temp-cidXPtaNovoId" value={this.state.cidXPtaNovoId} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'categoriaId' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="categoriaIdLabel" for="pad-item-temp-categoriaId">
                              <Translate contentKey="generadorApp.padItemTemp.categoriaId">Categoria Id</Translate>
                            </Label>
                            <AvInput type="string" name="categoriaId" id="pad-item-temp-categoriaId" value={this.state.categoriaId} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'numGhc' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="numGhcLabel" for="pad-item-temp-numGhc">
                              <Translate contentKey="generadorApp.padItemTemp.numGhc">Num Ghc</Translate>
                            </Label>

                            <AvInput type="text" name="numGhc" id="pad-item-temp-numGhc" value={this.state.numGhc} />
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.padItemTemp.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.padItemTemp.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {padItemTempList && padItemTempList.length > 0 ? (
                <Table responsive aria-describedby="pad-item-temp-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'sessionId' ? (
                        <th className="hand" onClick={this.sort('sessionId')}>
                          <Translate contentKey="generadorApp.padItemTemp.sessionId">Session Id</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idEspecialidade' ? (
                        <th className="hand" onClick={this.sort('idEspecialidade')}>
                          <Translate contentKey="generadorApp.padItemTemp.idEspecialidade">Id Especialidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idPeriodicidade' ? (
                        <th className="hand" onClick={this.sort('idPeriodicidade')}>
                          <Translate contentKey="generadorApp.padItemTemp.idPeriodicidade">Id Periodicidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idPeriodo' ? (
                        <th className="hand" onClick={this.sort('idPeriodo')}>
                          <Translate contentKey="generadorApp.padItemTemp.idPeriodo">Id Periodo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'dataInicio' ? (
                        <th className="hand" onClick={this.sort('dataInicio')}>
                          <Translate contentKey="generadorApp.padItemTemp.dataInicio">Data Inicio</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'dataFim' ? (
                        <th className="hand" onClick={this.sort('dataFim')}>
                          <Translate contentKey="generadorApp.padItemTemp.dataFim">Data Fim</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'qtdSessoes' ? (
                        <th className="hand" onClick={this.sort('qtdSessoes')}>
                          <Translate contentKey="generadorApp.padItemTemp.qtdSessoes">Qtd Sessoes</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'observacao' ? (
                        <th className="hand" onClick={this.sort('observacao')}>
                          <Translate contentKey="generadorApp.padItemTemp.observacao">Observacao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cidXPtaNovoId' ? (
                        <th className="hand" onClick={this.sort('cidXPtaNovoId')}>
                          <Translate contentKey="generadorApp.padItemTemp.cidXPtaNovoId">Cid X Pta Novo Id</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'categoriaId' ? (
                        <th className="hand" onClick={this.sort('categoriaId')}>
                          <Translate contentKey="generadorApp.padItemTemp.categoriaId">Categoria Id</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'numGhc' ? (
                        <th className="hand" onClick={this.sort('numGhc')}>
                          <Translate contentKey="generadorApp.padItemTemp.numGhc">Num Ghc</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {padItemTempList.map((padItemTemp, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${padItemTemp.id}`} color="link" size="sm">
                            {padItemTemp.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'sessionId' ? <td>{padItemTemp.sessionId}</td> : null}

                        {this.state.baseFilters !== 'idEspecialidade' ? <td>{padItemTemp.idEspecialidade}</td> : null}

                        {this.state.baseFilters !== 'idPeriodicidade' ? <td>{padItemTemp.idPeriodicidade}</td> : null}

                        {this.state.baseFilters !== 'idPeriodo' ? <td>{padItemTemp.idPeriodo}</td> : null}

                        {this.state.baseFilters !== 'dataInicio' ? (
                          <td>
                            <TextFormat type="date" value={padItemTemp.dataInicio} format={APP_LOCAL_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'dataFim' ? (
                          <td>
                            <TextFormat type="date" value={padItemTemp.dataFim} format={APP_LOCAL_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'qtdSessoes' ? <td>{padItemTemp.qtdSessoes}</td> : null}

                        {this.state.baseFilters !== 'observacao' ? <td>{padItemTemp.observacao}</td> : null}

                        {this.state.baseFilters !== 'cidXPtaNovoId' ? <td>{padItemTemp.cidXPtaNovoId}</td> : null}

                        {this.state.baseFilters !== 'categoriaId' ? <td>{padItemTemp.categoriaId}</td> : null}

                        {this.state.baseFilters !== 'numGhc' ? <td>{padItemTemp.numGhc}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${padItemTemp.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${padItemTemp.id}/edit?${this.getFiltersURL()}`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${padItemTemp.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.padItemTemp.home.notFound">No Pad Item Temps found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={padItemTempList && padItemTempList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ padItemTemp, ...storeState }: IRootState) => ({
  padItemTempList: padItemTemp.entities,
  totalItems: padItemTemp.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadItemTemp);
