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
import { getModulosPadConfigState, IModulosPadConfigBaseState, getEntities } from './modulos-pad-config.reducer';
import { IModulosPadConfig } from 'app/shared/model/modulos-pad-config.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IModulosPadConfigProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IModulosPadConfigState extends IModulosPadConfigBaseState, IPaginationBaseState {}

export class ModulosPadConfig extends React.Component<IModulosPadConfigProps, IModulosPadConfigState> {
  private myFormRef: any;

  constructor(props: IModulosPadConfigProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getModulosPadConfigState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idModulosPad: '',
        idEspecialidade: '',
        idPeriodicidade: ''
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
      'idModulosPad=' +
      this.state.idModulosPad +
      '&' +
      'idEspecialidade=' +
      this.state.idEspecialidade +
      '&' +
      'idPeriodicidade=' +
      this.state.idPeriodicidade +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idModulosPad, idEspecialidade, idPeriodicidade, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(idModulosPad, idEspecialidade, idPeriodicidade, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { modulosPadConfigList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Modulos Pad Configs</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Modulos Pad Configs</span>
              <Button id="togglerFilterModulosPadConfig" className="btn btn-primary float-right jh-create-entity">
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
                <Translate contentKey="generadorApp.modulosPadConfig.home.createLabel">Create a new Modulos Pad Config</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterModulosPadConfig">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idModulosPad' ? (
                        <Col md="3">
                          <Row>
                            <Label id="idModulosPadLabel" for="modulos-pad-config-idModulosPad">
                              <Translate contentKey="generadorApp.modulosPadConfig.idModulosPad">Id Modulos Pad</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idModulosPad"
                              id="modulos-pad-config-idModulosPad"
                              value={this.state.idModulosPad}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idEspecialidade' ? (
                        <Col md="3">
                          <Row>
                            <Label id="idEspecialidadeLabel" for="modulos-pad-config-idEspecialidade">
                              <Translate contentKey="generadorApp.modulosPadConfig.idEspecialidade">Id Especialidade</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idEspecialidade"
                              id="modulos-pad-config-idEspecialidade"
                              value={this.state.idEspecialidade}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idPeriodicidade' ? (
                        <Col md="3">
                          <Row>
                            <Label id="idPeriodicidadeLabel" for="modulos-pad-config-idPeriodicidade">
                              <Translate contentKey="generadorApp.modulosPadConfig.idPeriodicidade">Id Periodicidade</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idPeriodicidade"
                              id="modulos-pad-config-idPeriodicidade"
                              value={this.state.idPeriodicidade}
                            />
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

              {modulosPadConfigList && modulosPadConfigList.length > 0 ? (
                <Table responsive aria-describedby="modulos-pad-config-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'idModulosPad' ? (
                        <th className="hand" onClick={this.sort('idModulosPad')}>
                          <Translate contentKey="generadorApp.modulosPadConfig.idModulosPad">Id Modulos Pad</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idEspecialidade' ? (
                        <th className="hand" onClick={this.sort('idEspecialidade')}>
                          <Translate contentKey="generadorApp.modulosPadConfig.idEspecialidade">Id Especialidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idPeriodicidade' ? (
                        <th className="hand" onClick={this.sort('idPeriodicidade')}>
                          <Translate contentKey="generadorApp.modulosPadConfig.idPeriodicidade">Id Periodicidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {modulosPadConfigList.map((modulosPadConfig, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${modulosPadConfig.id}`} color="link" size="sm">
                            {modulosPadConfig.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'idModulosPad' ? <td>{modulosPadConfig.idModulosPad}</td> : null}

                        {this.state.baseFilters !== 'idEspecialidade' ? <td>{modulosPadConfig.idEspecialidade}</td> : null}

                        {this.state.baseFilters !== 'idPeriodicidade' ? <td>{modulosPadConfig.idPeriodicidade}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${modulosPadConfig.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${modulosPadConfig.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${modulosPadConfig.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.modulosPadConfig.home.notFound">No Modulos Pad Configs found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={modulosPadConfigList && modulosPadConfigList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ modulosPadConfig, ...storeState }: IRootState) => ({
  modulosPadConfigList: modulosPadConfig.entities,
  totalItems: modulosPadConfig.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ModulosPadConfig);
