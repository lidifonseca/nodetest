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
import { getDiarioState, IDiarioBaseState, getEntities } from './diario.reducer';
import { IDiario } from 'app/shared/model/diario.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IUsuario } from 'app/shared/model/usuario.model';
import { getEntities as getUsuarios } from 'app/entities/usuario/usuario.reducer';
import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';

export interface IDiarioProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IDiarioState extends IDiarioBaseState, IPaginationBaseState {}

export class Diario extends React.Component<IDiarioProps, IDiarioState> {
  private myFormRef: any;

  constructor(props: IDiarioProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getDiarioState(this.props.location)
    };
  }

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
        usuario: '',
        paciente: ''
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
      'historico=' +
      this.state.historico +
      '&' +
      'gerarPdf=' +
      this.state.gerarPdf +
      '&' +
      'usuario=' +
      this.state.usuario +
      '&' +
      'paciente=' +
      this.state.paciente +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { historico, gerarPdf, usuario, paciente, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(historico, gerarPdf, usuario, paciente, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { usuarios, pacientes, diarioList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Diarios</span>
          <Button id="togglerFilterDiario" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.diario.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.diario.home.createLabel">Create a new Diario</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Diarios</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterDiario">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'historico' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="historicoLabel" for="diario-historico">
                              <Translate contentKey="generadorApp.diario.historico">Historico</Translate>
                            </Label>

                            <AvInput type="text" name="historico" id="diario-historico" value={this.state.historico} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'gerarPdf' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="gerarPdfLabel" for="diario-gerarPdf">
                              <Translate contentKey="generadorApp.diario.gerarPdf">Gerar Pdf</Translate>
                            </Label>
                            <AvInput type="string" name="gerarPdf" id="diario-gerarPdf" value={this.state.gerarPdf} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'usuario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="diario-usuario">
                                <Translate contentKey="generadorApp.diario.usuario">Usuario</Translate>
                              </Label>
                              <Select
                                id="diario-usuario"
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

                      {this.state.baseFilters !== 'paciente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="diario-paciente">
                                <Translate contentKey="generadorApp.diario.paciente">Paciente</Translate>
                              </Label>
                              <Select
                                id="diario-paciente"
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
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.diario.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.diario.home.btn_filter_clean">Clean</Translate>
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
                      {this.state.baseFilters !== 'historico' ? (
                        <th className="hand" onClick={this.sort('historico')}>
                          <Translate contentKey="generadorApp.diario.historico">Historico</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'gerarPdf' ? (
                        <th className="hand" onClick={this.sort('gerarPdf')}>
                          <Translate contentKey="generadorApp.diario.gerarPdf">Gerar Pdf</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'usuario' ? (
                        <th>
                          <Translate contentKey="generadorApp.diario.usuario">Usuario</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'paciente' ? (
                        <th>
                          <Translate contentKey="generadorApp.diario.paciente">Paciente</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

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

                        {this.state.baseFilters !== 'historico' ? <td>{diario.historico}</td> : null}

                        {this.state.baseFilters !== 'gerarPdf' ? <td>{diario.gerarPdf}</td> : null}

                        {this.state.baseFilters !== 'usuario' ? (
                          <td>{diario.usuario ? <Link to={`usuario/${diario.usuario.id}`}>{diario.usuario.id}</Link> : ''}</td>
                        ) : null}

                        {this.state.baseFilters !== 'paciente' ? (
                          <td>{diario.paciente ? <Link to={`paciente/${diario.paciente.id}`}>{diario.paciente.id}</Link> : ''}</td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${diario.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${diario.id}/edit?${this.getFiltersURL()}`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${diario.id}/delete?${this.getFiltersURL()}`} color="danger" size="sm">
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
