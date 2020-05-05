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
import { Translate, translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './paciente-operadora.reducer';
import { IPacienteOperadora } from 'app/shared/model/paciente-operadora.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';
import { IOperadora } from 'app/shared/model/operadora.model';
import { getEntities as getOperadoras } from 'app/entities/operadora/operadora.reducer';

export interface IPacienteOperadoraProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPacienteOperadoraBaseState {
  registro: any;
  ativo: any;
  idPaciente: any;
  idOperadora: any;
}
export interface IPacienteOperadoraState extends IPacienteOperadoraBaseState, IPaginationBaseState {}

export class PacienteOperadora extends React.Component<IPacienteOperadoraProps, IPacienteOperadoraState> {
  private myFormRef: any;

  constructor(props: IPacienteOperadoraProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getPacienteOperadoraState(this.props.location)
    };
  }

  getPacienteOperadoraState = (location): IPacienteOperadoraBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const registro = url.searchParams.get('registro') || '';
    const ativo = url.searchParams.get('ativo') || '';

    const idPaciente = url.searchParams.get('idPaciente') || '';
    const idOperadora = url.searchParams.get('idOperadora') || '';

    return {
      registro,
      ativo,
      idPaciente,
      idOperadora
    };
  };

  componentDidMount() {
    this.getEntities();

    this.props.getPacientes();
    this.props.getOperadoras();
  }

  cancelCourse = () => {
    this.setState(
      {
        registro: '',
        ativo: '',
        idPaciente: '',
        idOperadora: ''
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
      'registro=' +
      this.state.registro +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'idPaciente=' +
      this.state.idPaciente +
      '&' +
      'idOperadora=' +
      this.state.idOperadora +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { registro, ativo, idPaciente, idOperadora, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(registro, ativo, idPaciente, idOperadora, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { pacientes, operadoras, pacienteOperadoraList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Operadoras</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Paciente Operadoras</span>
              <Button id="togglerFilterPacienteOperadora" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.pacienteOperadora.home.createLabel">Create a new Paciente Operadora</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPacienteOperadora">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="registroLabel" for="paciente-operadora-registro">
                            <Translate contentKey="generadorApp.pacienteOperadora.registro">Registro</Translate>
                          </Label>

                          <AvInput type="text" name="registro" id="paciente-operadora-registro" value={this.state.registro} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="paciente-operadora-ativo">
                            <Translate contentKey="generadorApp.pacienteOperadora.ativo">Ativo</Translate>
                          </Label>
                          <AvInput type="string" name="ativo" id="paciente-operadora-ativo" value={this.state.ativo} />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="paciente-operadora-idPaciente">
                              <Translate contentKey="generadorApp.pacienteOperadora.idPaciente">Id Paciente</Translate>
                            </Label>
                            <AvInput id="paciente-operadora-idPaciente" type="select" className="form-control" name="idPacienteId">
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
                            <Label for="paciente-operadora-idOperadora">
                              <Translate contentKey="generadorApp.pacienteOperadora.idOperadora">Id Operadora</Translate>
                            </Label>
                            <AvInput id="paciente-operadora-idOperadora" type="select" className="form-control" name="idOperadoraId">
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

              {pacienteOperadoraList && pacienteOperadoraList.length > 0 ? (
                <Table responsive aria-describedby="paciente-operadora-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('registro')}>
                        <Translate contentKey="generadorApp.pacienteOperadora.registro">Registro</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.pacienteOperadora.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.pacienteOperadora.idPaciente">Id Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.pacienteOperadora.idOperadora">Id Operadora</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {pacienteOperadoraList.map((pacienteOperadora, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${pacienteOperadora.id}`} color="link" size="sm">
                            {pacienteOperadora.id}
                          </Button>
                        </td>

                        <td>{pacienteOperadora.registro}</td>

                        <td>{pacienteOperadora.ativo}</td>
                        <td>
                          {pacienteOperadora.idPaciente ? (
                            <Link to={`paciente/${pacienteOperadora.idPaciente.id}`}>{pacienteOperadora.idPaciente.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>
                        <td>
                          {pacienteOperadora.idOperadora ? (
                            <Link to={`operadora/${pacienteOperadora.idOperadora.id}`}>{pacienteOperadora.idOperadora.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${pacienteOperadora.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${pacienteOperadora.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${pacienteOperadora.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.pacienteOperadora.home.notFound">No Paciente Operadoras found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={pacienteOperadoraList && pacienteOperadoraList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ pacienteOperadora, ...storeState }: IRootState) => ({
  pacientes: storeState.paciente.entities,
  operadoras: storeState.operadora.entities,
  pacienteOperadoraList: pacienteOperadora.entities,
  totalItems: pacienteOperadora.totalItems
});

const mapDispatchToProps = {
  getPacientes,
  getOperadoras,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteOperadora);