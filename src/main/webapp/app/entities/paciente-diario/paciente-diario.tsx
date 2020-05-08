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
import { Translate, translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';

import { IRootState } from 'app/shared/reducers';
import { getPacienteDiarioState, IPacienteDiarioBaseState, getEntities } from './paciente-diario.reducer';
import { IPacienteDiario } from 'app/shared/model/paciente-diario.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';
import { IUsuario } from 'app/shared/model/usuario.model';
import { getEntities as getUsuarios } from 'app/entities/usuario/usuario.reducer';

export interface IPacienteDiarioProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPacienteDiarioState extends IPacienteDiarioBaseState, IPaginationBaseState {}

export class PacienteDiario extends React.Component<IPacienteDiarioProps, IPacienteDiarioState> {
  private myFormRef: any;

  constructor(props: IPacienteDiarioProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getPacienteDiarioState(this.props.location)
    };
  }

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
        paciente: '',
        usuario: ''
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
      'idOperadora=' +
      this.state.idOperadora +
      '&' +
      'historico=' +
      this.state.historico +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'paciente=' +
      this.state.paciente +
      '&' +
      'usuario=' +
      this.state.usuario +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idOperadora, historico, ativo, paciente, usuario, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(idOperadora, historico, ativo, paciente, usuario, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { pacientes, usuarios, pacienteDiarioList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Paciente Diarios</span>
          <Button id="togglerFilterPacienteDiario" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.pacienteDiario.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.pacienteDiario.home.createLabel">Create a new Paciente Diario</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Diarios</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPacienteDiario">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idOperadora' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idOperadoraLabel" for="paciente-diario-idOperadora">
                              <Translate contentKey="generadorApp.pacienteDiario.idOperadora">Id Operadora</Translate>
                            </Label>
                            <AvInput type="string" name="idOperadora" id="paciente-diario-idOperadora" value={this.state.idOperadora} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'historico' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="historicoLabel" for="paciente-diario-historico">
                              <Translate contentKey="generadorApp.pacienteDiario.historico">Historico</Translate>
                            </Label>
                            <AvInput id="paciente-diario-historico" type="textarea" name="historico" />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ativo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ativoLabel" for="paciente-diario-ativo">
                              <Translate contentKey="generadorApp.pacienteDiario.ativo">Ativo</Translate>
                            </Label>
                            <AvInput type="string" name="ativo" id="paciente-diario-ativo" value={this.state.ativo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'paciente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="paciente-diario-paciente">
                                <Translate contentKey="generadorApp.pacienteDiario.paciente">Paciente</Translate>
                              </Label>
                              <Select
                                id="paciente-diario-paciente"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  pacientes
                                    ? pacientes.map(p =>
                                        this.state.paciente.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null
                                      )
                                    : null
                                }
                                options={pacientes ? pacientes.map(option => ({ value: option.id, label: option.id })) : null}
                                onChange={options => this.setState({ paciente: options.map(option => option['value']).join(',') })}
                                name={'paciente'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'usuario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="paciente-diario-usuario">
                                <Translate contentKey="generadorApp.pacienteDiario.usuario">Usuario</Translate>
                              </Label>
                              <Select
                                id="paciente-diario-usuario"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  usuarios
                                    ? usuarios.map(p =>
                                        this.state.usuario.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null
                                      )
                                    : null
                                }
                                options={usuarios ? usuarios.map(option => ({ value: option.id, label: option.id })) : null}
                                onChange={options => this.setState({ usuario: options.map(option => option['value']).join(',') })}
                                name={'usuario'}
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
                        <Translate contentKey="generadorApp.pacienteDiario.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.pacienteDiario.home.btn_filter_clean">Clean</Translate>
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
                      {this.state.baseFilters !== 'idOperadora' ? (
                        <th className="hand" onClick={this.sort('idOperadora')}>
                          <Translate contentKey="generadorApp.pacienteDiario.idOperadora">Id Operadora</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'historico' ? (
                        <th className="hand" onClick={this.sort('historico')}>
                          <Translate contentKey="generadorApp.pacienteDiario.historico">Historico</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ativo' ? (
                        <th className="hand" onClick={this.sort('ativo')}>
                          <Translate contentKey="generadorApp.pacienteDiario.ativo">Ativo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'paciente' ? (
                        <th>
                          <Translate contentKey="generadorApp.pacienteDiario.paciente">Paciente</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'usuario' ? (
                        <th>
                          <Translate contentKey="generadorApp.pacienteDiario.usuario">Usuario</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

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

                        {this.state.baseFilters !== 'idOperadora' ? <td>{pacienteDiario.idOperadora}</td> : null}

                        {this.state.baseFilters !== 'historico' ? (
                          <td>{pacienteDiario.historico ? Buffer.from(pacienteDiario.historico).toString() : null}</td>
                        ) : null}

                        {this.state.baseFilters !== 'ativo' ? <td>{pacienteDiario.ativo}</td> : null}

                        {this.state.baseFilters !== 'paciente' ? (
                          <td>
                            {pacienteDiario.paciente ? (
                              <Link to={`paciente/${pacienteDiario.paciente.id}`}>{pacienteDiario.paciente.id}</Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'usuario' ? (
                          <td>
                            {pacienteDiario.usuario ? (
                              <Link to={`usuario/${pacienteDiario.usuario.id}`}>{pacienteDiario.usuario.id}</Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${pacienteDiario.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${pacienteDiario.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${pacienteDiario.id}/delete?${this.getFiltersURL()}`}
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
