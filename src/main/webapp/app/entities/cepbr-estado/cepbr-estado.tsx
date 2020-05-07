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
import { getCepbrEstadoState, ICepbrEstadoBaseState, getEntities } from './cepbr-estado.reducer';
import { ICepbrEstado } from 'app/shared/model/cepbr-estado.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ICepbrEstadoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ICepbrEstadoState extends ICepbrEstadoBaseState, IPaginationBaseState {}

export class CepbrEstado extends React.Component<ICepbrEstadoProps, ICepbrEstadoState> {
  private myFormRef: any;

  constructor(props: ICepbrEstadoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getCepbrEstadoState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        uf: '',
        estado: '',
        codIbge: ''
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
      'uf=' +
      this.state.uf +
      '&' +
      'estado=' +
      this.state.estado +
      '&' +
      'codIbge=' +
      this.state.codIbge +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { uf, estado, codIbge, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(uf, estado, codIbge, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { cepbrEstadoList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Cepbr Estados</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Cepbr Estados</span>
              <Button id="togglerFilterCepbrEstado" className="btn btn-primary float-right jh-create-entity">
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
                <Translate contentKey="generadorApp.cepbrEstado.home.createLabel">Create a new Cepbr Estado</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterCepbrEstado">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'uf' ? (
                        <Col md="3">
                          <Row>
                            <Label id="ufLabel" for="cepbr-estado-uf">
                              <Translate contentKey="generadorApp.cepbrEstado.uf">Uf</Translate>
                            </Label>

                            <AvInput type="text" name="uf" id="cepbr-estado-uf" value={this.state.uf} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'estado' ? (
                        <Col md="3">
                          <Row>
                            <Label id="estadoLabel" for="cepbr-estado-estado">
                              <Translate contentKey="generadorApp.cepbrEstado.estado">Estado</Translate>
                            </Label>

                            <AvInput type="text" name="estado" id="cepbr-estado-estado" value={this.state.estado} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'codIbge' ? (
                        <Col md="3">
                          <Row>
                            <Label id="codIbgeLabel" for="cepbr-estado-codIbge">
                              <Translate contentKey="generadorApp.cepbrEstado.codIbge">Cod Ibge</Translate>
                            </Label>

                            <AvInput type="text" name="codIbge" id="cepbr-estado-codIbge" value={this.state.codIbge} />
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

              {cepbrEstadoList && cepbrEstadoList.length > 0 ? (
                <Table responsive aria-describedby="cepbr-estado-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'uf' ? (
                        <th className="hand" onClick={this.sort('uf')}>
                          <Translate contentKey="generadorApp.cepbrEstado.uf">Uf</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'estado' ? (
                        <th className="hand" onClick={this.sort('estado')}>
                          <Translate contentKey="generadorApp.cepbrEstado.estado">Estado</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'codIbge' ? (
                        <th className="hand" onClick={this.sort('codIbge')}>
                          <Translate contentKey="generadorApp.cepbrEstado.codIbge">Cod Ibge</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {cepbrEstadoList.map((cepbrEstado, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${cepbrEstado.id}`} color="link" size="sm">
                            {cepbrEstado.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'uf' ? <td>{cepbrEstado.uf}</td> : null}

                        {this.state.baseFilters !== 'estado' ? <td>{cepbrEstado.estado}</td> : null}

                        {this.state.baseFilters !== 'codIbge' ? <td>{cepbrEstado.codIbge}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${cepbrEstado.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${cepbrEstado.id}/edit?${this.getFiltersURL()}`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${cepbrEstado.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.cepbrEstado.home.notFound">No Cepbr Estados found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={cepbrEstadoList && cepbrEstadoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ cepbrEstado, ...storeState }: IRootState) => ({
  cepbrEstadoList: cepbrEstado.entities,
  totalItems: cepbrEstado.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CepbrEstado);
