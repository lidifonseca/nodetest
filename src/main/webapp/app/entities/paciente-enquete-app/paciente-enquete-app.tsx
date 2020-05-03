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
import { getEntities } from './paciente-enquete-app.reducer';
import { IPacienteEnqueteApp } from 'app/shared/model/paciente-enquete-app.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';

export interface IPacienteEnqueteAppProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPacienteEnqueteAppBaseState {
  votacao: any;
  dataPost: any;
  idPaciente: any;
}
export interface IPacienteEnqueteAppState extends IPacienteEnqueteAppBaseState, IPaginationBaseState {}

export class PacienteEnqueteApp extends React.Component<IPacienteEnqueteAppProps, IPacienteEnqueteAppState> {
  private myFormRef: any;

  constructor(props: IPacienteEnqueteAppProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getPacienteEnqueteAppState(this.props.location)
    };
  }

  getPacienteEnqueteAppState = (location): IPacienteEnqueteAppBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const votacao = url.searchParams.get('votacao') || '';
    const dataPost = url.searchParams.get('dataPost') || '';

    const idPaciente = url.searchParams.get('idPaciente') || '';

    return {
      votacao,
      dataPost,
      idPaciente
    };
  };

  componentDidMount() {
    this.getEntities();

    this.props.getPacientes();
  }

  cancelCourse = () => {
    this.setState(
      {
        votacao: '',
        dataPost: '',
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
      'votacao=' +
      this.state.votacao +
      '&' +
      'dataPost=' +
      this.state.dataPost +
      '&' +
      'idPaciente=' +
      this.state.idPaciente +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { votacao, dataPost, idPaciente, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(votacao, dataPost, idPaciente, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { pacientes, pacienteEnqueteAppList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Enquete Apps</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Paciente Enquete Apps</span>
              <Button id="togglerFilterPacienteEnqueteApp" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.pacienteEnqueteApp.home.createLabel">Create a new Paciente Enquete App</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPacienteEnqueteApp">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="votacaoLabel" for="paciente-enquete-app-votacao">
                            <Translate contentKey="generadorApp.pacienteEnqueteApp.votacao">Votacao</Translate>
                          </Label>
                          <AvInput type="string" name="votacao" id="paciente-enquete-app-votacao" value={this.state.votacao} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataPostLabel" for="paciente-enquete-app-dataPost">
                            <Translate contentKey="generadorApp.pacienteEnqueteApp.dataPost">Data Post</Translate>
                          </Label>
                          <AvInput
                            id="paciente-enquete-app-dataPost"
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
                            <Label for="paciente-enquete-app-idPaciente">
                              <Translate contentKey="generadorApp.pacienteEnqueteApp.idPaciente">Id Paciente</Translate>
                            </Label>
                            <AvInput id="paciente-enquete-app-idPaciente" type="select" className="form-control" name="idPacienteId">
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

              {pacienteEnqueteAppList && pacienteEnqueteAppList.length > 0 ? (
                <Table responsive aria-describedby="paciente-enquete-app-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('votacao')}>
                        <Translate contentKey="generadorApp.pacienteEnqueteApp.votacao">Votacao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataPost')}>
                        <Translate contentKey="generadorApp.pacienteEnqueteApp.dataPost">Data Post</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.pacienteEnqueteApp.idPaciente">Id Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {pacienteEnqueteAppList.map((pacienteEnqueteApp, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${pacienteEnqueteApp.id}`} color="link" size="sm">
                            {pacienteEnqueteApp.id}
                          </Button>
                        </td>

                        <td>{pacienteEnqueteApp.votacao}</td>

                        <td>
                          <TextFormat type="date" value={pacienteEnqueteApp.dataPost} format={APP_DATE_FORMAT} />
                        </td>
                        <td>
                          {pacienteEnqueteApp.idPaciente ? (
                            <Link to={`paciente/${pacienteEnqueteApp.idPaciente.id}`}>{pacienteEnqueteApp.idPaciente.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${pacienteEnqueteApp.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${pacienteEnqueteApp.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${pacienteEnqueteApp.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.pacienteEnqueteApp.home.notFound">No Paciente Enquete Apps found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={pacienteEnqueteAppList && pacienteEnqueteAppList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ pacienteEnqueteApp, ...storeState }: IRootState) => ({
  pacientes: storeState.paciente.entities,
  pacienteEnqueteAppList: pacienteEnqueteApp.entities,
  totalItems: pacienteEnqueteApp.totalItems
});

const mapDispatchToProps = {
  getPacientes,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteEnqueteApp);
