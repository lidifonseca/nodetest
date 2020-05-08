/* eslint complexity: ["error", 100] */
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
import { getPadItemIndicadoresState, IPadItemIndicadoresBaseState, getEntities } from './pad-item-indicadores.reducer';
import { IPadItemIndicadores } from 'app/shared/model/pad-item-indicadores.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPadItemIndicadoresProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPadItemIndicadoresState extends IPadItemIndicadoresBaseState, IPaginationBaseState {}

export class PadItemIndicadores extends React.Component<IPadItemIndicadoresProps, IPadItemIndicadoresState> {
  private myFormRef: any;

  constructor(props: IPadItemIndicadoresProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getPadItemIndicadoresState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idUnidadeMedida: '',
        titulo: '',
        descricao: '',
        meta: '',
        maximoSt: '',
        minimoSt: '',
        cidXPtaNovoPadItemIndi: ''
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
      'idUnidadeMedida=' +
      this.state.idUnidadeMedida +
      '&' +
      'titulo=' +
      this.state.titulo +
      '&' +
      'descricao=' +
      this.state.descricao +
      '&' +
      'meta=' +
      this.state.meta +
      '&' +
      'maximoSt=' +
      this.state.maximoSt +
      '&' +
      'minimoSt=' +
      this.state.minimoSt +
      '&' +
      'cidXPtaNovoPadItemIndi=' +
      this.state.cidXPtaNovoPadItemIndi +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      idUnidadeMedida,
      titulo,
      descricao,
      meta,
      maximoSt,
      minimoSt,
      cidXPtaNovoPadItemIndi,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      idUnidadeMedida,
      titulo,
      descricao,
      meta,
      maximoSt,
      minimoSt,
      cidXPtaNovoPadItemIndi,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { padItemIndicadoresList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Pad Item Indicadores</span>
          <Button id="togglerFilterPadItemIndicadores" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.padItemIndicadores.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.padItemIndicadores.home.createLabel">Create a new Pad Item Indicadores</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Item Indicadores</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPadItemIndicadores">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idUnidadeMedida' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idUnidadeMedidaLabel" for="pad-item-indicadores-idUnidadeMedida">
                              <Translate contentKey="generadorApp.padItemIndicadores.idUnidadeMedida">Id Unidade Medida</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idUnidadeMedida"
                              id="pad-item-indicadores-idUnidadeMedida"
                              value={this.state.idUnidadeMedida}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'titulo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="tituloLabel" for="pad-item-indicadores-titulo">
                              <Translate contentKey="generadorApp.padItemIndicadores.titulo">Titulo</Translate>
                            </Label>

                            <AvInput type="text" name="titulo" id="pad-item-indicadores-titulo" value={this.state.titulo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'descricao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="descricaoLabel" for="pad-item-indicadores-descricao">
                              <Translate contentKey="generadorApp.padItemIndicadores.descricao">Descricao</Translate>
                            </Label>
                            <AvInput id="pad-item-indicadores-descricao" type="textarea" name="descricao" />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'meta' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="metaLabel" for="pad-item-indicadores-meta">
                              <Translate contentKey="generadorApp.padItemIndicadores.meta">Meta</Translate>
                            </Label>
                            <AvInput type="string" name="meta" id="pad-item-indicadores-meta" value={this.state.meta} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'maximoSt' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="maximoStLabel" for="pad-item-indicadores-maximoSt">
                              <Translate contentKey="generadorApp.padItemIndicadores.maximoSt">Maximo St</Translate>
                            </Label>
                            <AvInput type="string" name="maximoSt" id="pad-item-indicadores-maximoSt" value={this.state.maximoSt} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'minimoSt' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="minimoStLabel" for="pad-item-indicadores-minimoSt">
                              <Translate contentKey="generadorApp.padItemIndicadores.minimoSt">Minimo St</Translate>
                            </Label>
                            <AvInput type="string" name="minimoSt" id="pad-item-indicadores-minimoSt" value={this.state.minimoSt} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cidXPtaNovoPadItemIndi' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.padItemIndicadores.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.padItemIndicadores.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {padItemIndicadoresList && padItemIndicadoresList.length > 0 ? (
                <Table responsive aria-describedby="pad-item-indicadores-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'idUnidadeMedida' ? (
                        <th className="hand" onClick={this.sort('idUnidadeMedida')}>
                          <Translate contentKey="generadorApp.padItemIndicadores.idUnidadeMedida">Id Unidade Medida</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'titulo' ? (
                        <th className="hand" onClick={this.sort('titulo')}>
                          <Translate contentKey="generadorApp.padItemIndicadores.titulo">Titulo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'descricao' ? (
                        <th className="hand" onClick={this.sort('descricao')}>
                          <Translate contentKey="generadorApp.padItemIndicadores.descricao">Descricao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'meta' ? (
                        <th className="hand" onClick={this.sort('meta')}>
                          <Translate contentKey="generadorApp.padItemIndicadores.meta">Meta</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'maximoSt' ? (
                        <th className="hand" onClick={this.sort('maximoSt')}>
                          <Translate contentKey="generadorApp.padItemIndicadores.maximoSt">Maximo St</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'minimoSt' ? (
                        <th className="hand" onClick={this.sort('minimoSt')}>
                          <Translate contentKey="generadorApp.padItemIndicadores.minimoSt">Minimo St</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {padItemIndicadoresList.map((padItemIndicadores, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${padItemIndicadores.id}`} color="link" size="sm">
                            {padItemIndicadores.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'idUnidadeMedida' ? <td>{padItemIndicadores.idUnidadeMedida}</td> : null}

                        {this.state.baseFilters !== 'titulo' ? <td>{padItemIndicadores.titulo}</td> : null}

                        {this.state.baseFilters !== 'descricao' ? (
                          <td>{padItemIndicadores.descricao ? Buffer.from(padItemIndicadores.descricao).toString() : null}</td>
                        ) : null}

                        {this.state.baseFilters !== 'meta' ? <td>{padItemIndicadores.meta}</td> : null}

                        {this.state.baseFilters !== 'maximoSt' ? <td>{padItemIndicadores.maximoSt}</td> : null}

                        {this.state.baseFilters !== 'minimoSt' ? <td>{padItemIndicadores.minimoSt}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${padItemIndicadores.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${padItemIndicadores.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${padItemIndicadores.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.padItemIndicadores.home.notFound">No Pad Item Indicadores found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={padItemIndicadoresList && padItemIndicadoresList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ padItemIndicadores, ...storeState }: IRootState) => ({
  padItemIndicadoresList: padItemIndicadores.entities,
  totalItems: padItemIndicadores.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadItemIndicadores);
