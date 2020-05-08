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
import { getPacienteDiagnosticoTempState, IPacienteDiagnosticoTempBaseState, getEntities } from './paciente-diagnostico-temp.reducer';
import { IPacienteDiagnosticoTemp } from 'app/shared/model/paciente-diagnostico-temp.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPacienteDiagnosticoTempProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPacienteDiagnosticoTempState extends IPacienteDiagnosticoTempBaseState, IPaginationBaseState {}

export class PacienteDiagnosticoTemp extends React.Component<IPacienteDiagnosticoTempProps, IPacienteDiagnosticoTempState> {
  private myFormRef: any;

  constructor(props: IPacienteDiagnosticoTempProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getPacienteDiagnosticoTempState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idCid: '',
        cidPrimario: '',
        complexidade: '',
        createdAt: '',
        sessionId: '',
        observacao: ''
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
      'idCid=' +
      this.state.idCid +
      '&' +
      'cidPrimario=' +
      this.state.cidPrimario +
      '&' +
      'complexidade=' +
      this.state.complexidade +
      '&' +
      'createdAt=' +
      this.state.createdAt +
      '&' +
      'sessionId=' +
      this.state.sessionId +
      '&' +
      'observacao=' +
      this.state.observacao +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idCid, cidPrimario, complexidade, createdAt, sessionId, observacao, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(
      idCid,
      cidPrimario,
      complexidade,
      createdAt,
      sessionId,
      observacao,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { pacienteDiagnosticoTempList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Paciente Diagnostico Temps</span>
          <Button id="togglerFilterPacienteDiagnosticoTemp" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.home.createLabel">Create a new Paciente Diagnostico Temp</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Diagnostico Temps</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPacienteDiagnosticoTemp">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idCid' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idCidLabel" for="paciente-diagnostico-temp-idCid">
                              <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.idCid">Id Cid</Translate>
                            </Label>
                            <AvInput type="string" name="idCid" id="paciente-diagnostico-temp-idCid" value={this.state.idCid} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cidPrimario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cidPrimarioLabel" check>
                              <AvInput
                                id="paciente-diagnostico-temp-cidPrimario"
                                type="checkbox"
                                className="form-control"
                                name="cidPrimario"
                              />
                              <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.cidPrimario">Cid Primario</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'complexidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="complexidadeLabel" for="paciente-diagnostico-temp-complexidade">
                              <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.complexidade">Complexidade</Translate>
                            </Label>

                            <AvInput
                              type="text"
                              name="complexidade"
                              id="paciente-diagnostico-temp-complexidade"
                              value={this.state.complexidade}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'createdAt' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="createdAtLabel" for="paciente-diagnostico-temp-createdAt">
                              <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.createdAt">Created At</Translate>
                            </Label>
                            <AvInput type="date" name="createdAt" id="paciente-diagnostico-temp-createdAt" value={this.state.createdAt} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'sessionId' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="sessionIdLabel" for="paciente-diagnostico-temp-sessionId">
                              <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.sessionId">Session Id</Translate>
                            </Label>

                            <AvInput type="text" name="sessionId" id="paciente-diagnostico-temp-sessionId" value={this.state.sessionId} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'observacao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="observacaoLabel" for="paciente-diagnostico-temp-observacao">
                              <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.observacao">Observacao</Translate>
                            </Label>

                            <AvInput
                              type="text"
                              name="observacao"
                              id="paciente-diagnostico-temp-observacao"
                              value={this.state.observacao}
                            />
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {pacienteDiagnosticoTempList && pacienteDiagnosticoTempList.length > 0 ? (
                <Table responsive aria-describedby="paciente-diagnostico-temp-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'idCid' ? (
                        <th className="hand" onClick={this.sort('idCid')}>
                          <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.idCid">Id Cid</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cidPrimario' ? (
                        <th className="hand" onClick={this.sort('cidPrimario')}>
                          <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.cidPrimario">Cid Primario</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'complexidade' ? (
                        <th className="hand" onClick={this.sort('complexidade')}>
                          <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.complexidade">Complexidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'createdAt' ? (
                        <th className="hand" onClick={this.sort('createdAt')}>
                          <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.createdAt">Created At</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'sessionId' ? (
                        <th className="hand" onClick={this.sort('sessionId')}>
                          <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.sessionId">Session Id</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'observacao' ? (
                        <th className="hand" onClick={this.sort('observacao')}>
                          <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.observacao">Observacao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {pacienteDiagnosticoTempList.map((pacienteDiagnosticoTemp, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${pacienteDiagnosticoTemp.id}`} color="link" size="sm">
                            {pacienteDiagnosticoTemp.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'idCid' ? <td>{pacienteDiagnosticoTemp.idCid}</td> : null}

                        {this.state.baseFilters !== 'cidPrimario' ? (
                          <td>{pacienteDiagnosticoTemp.cidPrimario ? 'true' : 'false'}</td>
                        ) : null}

                        {this.state.baseFilters !== 'complexidade' ? <td>{pacienteDiagnosticoTemp.complexidade}</td> : null}

                        {this.state.baseFilters !== 'createdAt' ? (
                          <td>
                            <TextFormat type="date" value={pacienteDiagnosticoTemp.createdAt} format={APP_LOCAL_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'sessionId' ? <td>{pacienteDiagnosticoTemp.sessionId}</td> : null}

                        {this.state.baseFilters !== 'observacao' ? <td>{pacienteDiagnosticoTemp.observacao}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button
                              tag={Link}
                              to={`${match.url}/${pacienteDiagnosticoTemp.id}?${this.getFiltersURL()}`}
                              color="info"
                              size="sm"
                            >
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${pacienteDiagnosticoTemp.id}/edit?${this.getFiltersURL()}`}
                              color="primary"
                              size="sm"
                            >
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${pacienteDiagnosticoTemp.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.home.notFound">No Paciente Diagnostico Temps found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={pacienteDiagnosticoTempList && pacienteDiagnosticoTempList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ pacienteDiagnosticoTemp, ...storeState }: IRootState) => ({
  pacienteDiagnosticoTempList: pacienteDiagnosticoTemp.entities,
  totalItems: pacienteDiagnosticoTemp.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteDiagnosticoTemp);
