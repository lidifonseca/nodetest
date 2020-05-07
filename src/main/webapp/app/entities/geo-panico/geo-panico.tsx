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
import { getGeoPanicoState, IGeoPanicoBaseState, getEntities } from './geo-panico.reducer';
import { IGeoPanico } from 'app/shared/model/geo-panico.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IGeoPanicoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IGeoPanicoState extends IGeoPanicoBaseState, IPaginationBaseState {}

export class GeoPanico extends React.Component<IGeoPanicoProps, IGeoPanicoState> {
  private myFormRef: any;

  constructor(props: IGeoPanicoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getGeoPanicoState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idPanico: '',
        idPaciente: '',
        latitude: '',
        longitude: ''
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
      'idPanico=' +
      this.state.idPanico +
      '&' +
      'idPaciente=' +
      this.state.idPaciente +
      '&' +
      'latitude=' +
      this.state.latitude +
      '&' +
      'longitude=' +
      this.state.longitude +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idPanico, idPaciente, latitude, longitude, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(idPanico, idPaciente, latitude, longitude, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { geoPanicoList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Geo Panicos</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Geo Panicos</span>
              <Button id="togglerFilterGeoPanico" className="btn btn-primary float-right jh-create-entity">
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
                <Translate contentKey="generadorApp.geoPanico.home.createLabel">Create a new Geo Panico</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterGeoPanico">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idPanico' ? (
                        <Col md="3">
                          <Row>
                            <Label id="idPanicoLabel" for="geo-panico-idPanico">
                              <Translate contentKey="generadorApp.geoPanico.idPanico">Id Panico</Translate>
                            </Label>
                            <AvInput type="string" name="idPanico" id="geo-panico-idPanico" value={this.state.idPanico} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idPaciente' ? (
                        <Col md="3">
                          <Row>
                            <Label id="idPacienteLabel" for="geo-panico-idPaciente">
                              <Translate contentKey="generadorApp.geoPanico.idPaciente">Id Paciente</Translate>
                            </Label>
                            <AvInput type="string" name="idPaciente" id="geo-panico-idPaciente" value={this.state.idPaciente} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'latitude' ? (
                        <Col md="3">
                          <Row>
                            <Label id="latitudeLabel" for="geo-panico-latitude">
                              <Translate contentKey="generadorApp.geoPanico.latitude">Latitude</Translate>
                            </Label>

                            <AvInput type="text" name="latitude" id="geo-panico-latitude" value={this.state.latitude} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'longitude' ? (
                        <Col md="3">
                          <Row>
                            <Label id="longitudeLabel" for="geo-panico-longitude">
                              <Translate contentKey="generadorApp.geoPanico.longitude">Longitude</Translate>
                            </Label>

                            <AvInput type="text" name="longitude" id="geo-panico-longitude" value={this.state.longitude} />
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

              {geoPanicoList && geoPanicoList.length > 0 ? (
                <Table responsive aria-describedby="geo-panico-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'idPanico' ? (
                        <th className="hand" onClick={this.sort('idPanico')}>
                          <Translate contentKey="generadorApp.geoPanico.idPanico">Id Panico</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idPaciente' ? (
                        <th className="hand" onClick={this.sort('idPaciente')}>
                          <Translate contentKey="generadorApp.geoPanico.idPaciente">Id Paciente</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'latitude' ? (
                        <th className="hand" onClick={this.sort('latitude')}>
                          <Translate contentKey="generadorApp.geoPanico.latitude">Latitude</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'longitude' ? (
                        <th className="hand" onClick={this.sort('longitude')}>
                          <Translate contentKey="generadorApp.geoPanico.longitude">Longitude</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {geoPanicoList.map((geoPanico, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${geoPanico.id}`} color="link" size="sm">
                            {geoPanico.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'idPanico' ? <td>{geoPanico.idPanico}</td> : null}

                        {this.state.baseFilters !== 'idPaciente' ? <td>{geoPanico.idPaciente}</td> : null}

                        {this.state.baseFilters !== 'latitude' ? <td>{geoPanico.latitude}</td> : null}

                        {this.state.baseFilters !== 'longitude' ? <td>{geoPanico.longitude}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${geoPanico.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${geoPanico.id}/edit?${this.getFiltersURL()}`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${geoPanico.id}/delete?${this.getFiltersURL()}`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.geoPanico.home.notFound">No Geo Panicos found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={geoPanicoList && geoPanicoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ geoPanico, ...storeState }: IRootState) => ({
  geoPanicoList: geoPanico.entities,
  totalItems: geoPanico.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GeoPanico);
