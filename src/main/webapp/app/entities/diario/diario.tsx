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
import { getEntities } from './diario.reducer';
import { IDiario } from 'app/shared/model/diario.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IUsuario } from 'app/shared/model/usuario.model';
import { getEntities as getUsuarios } from 'app/entities/usuario/usuario.reducer';
import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';

export interface IDiarioProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IDiarioBaseState {
  historico: any;
  gerarPdf: any;
  idUsuario: any;
  idPaciente: any;
}
export interface IDiarioState extends IDiarioBaseState, IPaginationBaseState {}

export class Diario extends React.Component<IDiarioProps, IDiarioState> {
  private myFormRef: any;

  constructor(props: IDiarioProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getDiarioState(this.props.location)
    };
  }

  getDiarioState = (location): IDiarioBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const historico = url.searchParams.get('historico') || '';
    const gerarPdf = url.searchParams.get('gerarPdf') || '';

    const idUsuario = url.searchParams.get('idUsuario') || '';
    const idPaciente = url.searchParams.get('idPaciente') || '';

    return {
      historico,
      gerarPdf,
      idUsuario,
      idPaciente
    };
  };

  componentDidMount() {
    this.getEntities();

    this.props.getUsuarios();
    this.props.getPacientes();
  }

  cancelCourse = () => {
    this.setState(
      {
        historico: '',
        gerarPdf: '',
        idUsuario: '',
        idPaciente: ''
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
      'historico=' +
      this.state.historico +
      '&' +
      'gerarPdf=' +
      this.state.gerarPdf +
      '&' +
      'idUsuario=' +
      this.state.idUsuario +
      '&' +
      'idPaciente=' +
      this.state.idPaciente +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { historico, gerarPdf, idUsuario, idPaciente, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(historico, gerarPdf, idUsuario, idPaciente, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { usuarios, pacientes, diarioList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Diarios</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Diarios</span>
              <Button id="togglerFilterDiario" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.diario.home.createLabel">Create a new Diario</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterDiario">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="historicoLabel" for="diario-historico">
                            <Translate contentKey="generadorApp.diario.historico">Historico</Translate>
                          </Label>

                          <AvInput type="text" name="historico" id="diario-historico" value={this.state.historico} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="gerarPdfLabel" for="diario-gerarPdf">
                            <Translate contentKey="generadorApp.diario.gerarPdf">Gerar Pdf</Translate>
                          </Label>
                          <AvInput type="string" name="gerarPdf" id="diario-gerarPdf" value={this.state.gerarPdf} />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="diario-idUsuario">
                              <Translate contentKey="generadorApp.diario.idUsuario">Id Usuario</Translate>
                            </Label>
                            <AvInput id="diario-idUsuario" type="select" className="form-control" name="idUsuarioId">
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

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="diario-idPaciente">
                              <Translate contentKey="generadorApp.diario.idPaciente">Id Paciente</Translate>
                            </Label>
                            <AvInput id="diario-idPaciente" type="select" className="form-control" name="idPacienteId">
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

              {diarioList && diarioList.length > 0 ? (
                <Table responsive aria-describedby="diario-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('historico')}>
                        <Translate contentKey="generadorApp.diario.historico">Historico</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('gerarPdf')}>
                        <Translate contentKey="generadorApp.diario.gerarPdf">Gerar Pdf</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.diario.idUsuario">Id Usuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.diario.idPaciente">Id Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {diarioList.map((diario, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${diario.id}`} color="link" size="sm">
                            {diario.id}
                          </Button>
                        </td>

                        <td>{diario.historico}</td>

                        <td>{diario.gerarPdf}</td>
                        <td>{diario.idUsuario ? <Link to={`usuario/${diario.idUsuario.id}`}>{diario.idUsuario.id}</Link> : ''}</td>
                        <td>{diario.idPaciente ? <Link to={`paciente/${diario.idPaciente.id}`}>{diario.idPaciente.id}</Link> : ''}</td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${diario.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${diario.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${diario.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.diario.home.notFound">No Diarios found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={diarioList && diarioList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ diario, ...storeState }: IRootState) => ({
  usuarios: storeState.usuario.entities,
  pacientes: storeState.paciente.entities,
  diarioList: diario.entities,
  totalItems: diario.totalItems
});

const mapDispatchToProps = {
  getUsuarios,
  getPacientes,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Diario);
