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
import { getEntities } from './paciente-diario.reducer';
import { IPacienteDiario } from 'app/shared/model/paciente-diario.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';
import { IUsuario } from 'app/shared/model/usuario.model';
import { getEntities as getUsuarios } from 'app/entities/usuario/usuario.reducer';

export interface IPacienteDiarioProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPacienteDiarioBaseState {
  idOperadora: any;
  historico: any;
  ativo: any;
  dataPost: any;
  idPaciente: any;
  idUsuario: any;
}
export interface IPacienteDiarioState extends IPacienteDiarioBaseState, IPaginationBaseState {}

export class PacienteDiario extends React.Component<IPacienteDiarioProps, IPacienteDiarioState> {
  private myFormRef: any;

  constructor(props: IPacienteDiarioProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getPacienteDiarioState(this.props.location)
    };
  }

  getPacienteDiarioState = (location): IPacienteDiarioBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const idOperadora = url.searchParams.get('idOperadora') || '';
    const historico = url.searchParams.get('historico') || '';
    const ativo = url.searchParams.get('ativo') || '';
    const dataPost = url.searchParams.get('dataPost') || '';

    const idPaciente = url.searchParams.get('idPaciente') || '';
    const idUsuario = url.searchParams.get('idUsuario') || '';

    return {
      idOperadora,
      historico,
      ativo,
      dataPost,
      idPaciente,
      idUsuario
    };
  };

  componentDidMount() {
    this.getEntities();

    this.props.getPacientes();
    this.props.getUsuarios();
  }

  cancelCourse = () => {
    this.setState(
      {
        idOperadora: '',
        historico: '',
        ativo: '',
        dataPost: '',
        idPaciente: '',
        idUsuario: ''
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
      'historico=' +
      this.state.historico +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'dataPost=' +
      this.state.dataPost +
      '&' +
      'idPaciente=' +
      this.state.idPaciente +
      '&' +
      'idUsuario=' +
      this.state.idUsuario +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idOperadora, historico, ativo, dataPost, idPaciente, idUsuario, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(
      idOperadora,
      historico,
      ativo,
      dataPost,
      idPaciente,
      idUsuario,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { pacientes, usuarios, pacienteDiarioList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Diarios</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Paciente Diarios</span>
              <Button id="togglerFilterPacienteDiario" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.pacienteDiario.home.createLabel">Create a new Paciente Diario</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPacienteDiario">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="idOperadoraLabel" for="paciente-diario-idOperadora">
                            <Translate contentKey="generadorApp.pacienteDiario.idOperadora">Id Operadora</Translate>
                          </Label>
                          <AvInput type="string" name="idOperadora" id="paciente-diario-idOperadora" value={this.state.idOperadora} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="historicoLabel" for="paciente-diario-historico">
                            <Translate contentKey="generadorApp.pacienteDiario.historico">Historico</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="historico"
                            id="paciente-diario-historico"
                            value={this.state.historico}
                            validate={{
                              maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="paciente-diario-ativo">
                            <Translate contentKey="generadorApp.pacienteDiario.ativo">Ativo</Translate>
                          </Label>
                          <AvInput type="string" name="ativo" id="paciente-diario-ativo" value={this.state.ativo} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataPostLabel" for="paciente-diario-dataPost">
                            <Translate contentKey="generadorApp.pacienteDiario.dataPost">Data Post</Translate>
                          </Label>
                          <AvInput
                            id="paciente-diario-dataPost"
                            type="datetime-local"
                            className="form-control"
                            name="dataPost"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.dataPost ? convertDateTimeFromServer(this.state.dataPost) : null}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') }
                            }}
                          />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="paciente-diario-idPaciente">
                              <Translate contentKey="generadorApp.pacienteDiario.idPaciente">Id Paciente</Translate>
                            </Label>
                            <AvInput id="paciente-diario-idPaciente" type="select" className="form-control" name="idPacienteId">
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
                            <Label for="paciente-diario-idUsuario">
                              <Translate contentKey="generadorApp.pacienteDiario.idUsuario">Id Usuario</Translate>
                            </Label>
                            <AvInput id="paciente-diario-idUsuario" type="select" className="form-control" name="idUsuarioId">
                              <option value="" key="0" />
                              {usuarios
                                ? usuarios.map(otherEntity => (
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

              {pacienteDiarioList && pacienteDiarioList.length > 0 ? (
                <Table responsive aria-describedby="paciente-diario-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idOperadora')}>
                        <Translate contentKey="generadorApp.pacienteDiario.idOperadora">Id Operadora</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('historico')}>
                        <Translate contentKey="generadorApp.pacienteDiario.historico">Historico</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.pacienteDiario.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataPost')}>
                        <Translate contentKey="generadorApp.pacienteDiario.dataPost">Data Post</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.pacienteDiario.idPaciente">Id Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.pacienteDiario.idUsuario">Id Usuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {pacienteDiarioList.map((pacienteDiario, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${pacienteDiario.id}`} color="link" size="sm">
                            {pacienteDiario.id}
                          </Button>
                        </td>

                        <td>{pacienteDiario.idOperadora}</td>

                        <td>{pacienteDiario.historico}</td>

                        <td>{pacienteDiario.ativo}</td>

                        <td>
                          <TextFormat type="date" value={pacienteDiario.dataPost} format={APP_DATE_FORMAT} />
                        </td>
                        <td>
                          {pacienteDiario.idPaciente ? (
                            <Link to={`paciente/${pacienteDiario.idPaciente.id}`}>{pacienteDiario.idPaciente.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>
                        <td>
                          {pacienteDiario.idUsuario ? (
                            <Link to={`usuario/${pacienteDiario.idUsuario.id}`}>{pacienteDiario.idUsuario.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${pacienteDiario.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${pacienteDiario.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${pacienteDiario.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.pacienteDiario.home.notFound">No Paciente Diarios found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={pacienteDiarioList && pacienteDiarioList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ pacienteDiario, ...storeState }: IRootState) => ({
  pacientes: storeState.paciente.entities,
  usuarios: storeState.usuario.entities,
  pacienteDiarioList: pacienteDiario.entities,
  totalItems: pacienteDiario.totalItems
});

const mapDispatchToProps = {
  getPacientes,
  getUsuarios,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteDiario);
