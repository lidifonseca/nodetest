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
import { getCidXPtaNovoPadItemIndiState, ICidXPtaNovoPadItemIndiBaseState, getEntities } from './cid-x-pta-novo-pad-item-indi.reducer';
import { ICidXPtaNovoPadItemIndi } from 'app/shared/model/cid-x-pta-novo-pad-item-indi.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IPadItemIndicadores } from 'app/shared/model/pad-item-indicadores.model';
import { getEntities as getPadItemIndicadores } from 'app/entities/pad-item-indicadores/pad-item-indicadores.reducer';
import { ICategoria } from 'app/shared/model/categoria.model';
import { getEntities as getCategorias } from 'app/entities/categoria/categoria.reducer';
import { ICidXPtaNovo } from 'app/shared/model/cid-x-pta-novo.model';
import { getEntities as getCidXPtaNovos } from 'app/entities/cid-x-pta-novo/cid-x-pta-novo.reducer';

export interface ICidXPtaNovoPadItemIndiProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ICidXPtaNovoPadItemIndiState extends ICidXPtaNovoPadItemIndiBaseState, IPaginationBaseState {}

export class CidXPtaNovoPadItemIndi extends React.Component<ICidXPtaNovoPadItemIndiProps, ICidXPtaNovoPadItemIndiState> {
  private myFormRef: any;

  constructor(props: ICidXPtaNovoPadItemIndiProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getCidXPtaNovoPadItemIndiState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getPadItemIndicadores();
    this.props.getCategorias();
    this.props.getCidXPtaNovos();
  }

  cancelCourse = () => {
    this.setState(
      {
        meta: '',
        maximo: '',
        minimo: '',
        unidadeMedidaExtra: '',
        unidadeMedidaId: '',
        score: '',
        alertasIndicadores: '',
        padItemIndicadores: '',
        categorias: '',
        cidXPtaNovo: ''
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
      'meta=' +
      this.state.meta +
      '&' +
      'maximo=' +
      this.state.maximo +
      '&' +
      'minimo=' +
      this.state.minimo +
      '&' +
      'unidadeMedidaExtra=' +
      this.state.unidadeMedidaExtra +
      '&' +
      'unidadeMedidaId=' +
      this.state.unidadeMedidaId +
      '&' +
      'score=' +
      this.state.score +
      '&' +
      'alertasIndicadores=' +
      this.state.alertasIndicadores +
      '&' +
      'padItemIndicadores=' +
      this.state.padItemIndicadores +
      '&' +
      'categorias=' +
      this.state.categorias +
      '&' +
      'cidXPtaNovo=' +
      this.state.cidXPtaNovo +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      meta,
      maximo,
      minimo,
      unidadeMedidaExtra,
      unidadeMedidaId,
      score,
      alertasIndicadores,
      padItemIndicadores,
      categorias,
      cidXPtaNovo,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      meta,
      maximo,
      minimo,
      unidadeMedidaExtra,
      unidadeMedidaId,
      score,
      alertasIndicadores,
      padItemIndicadores,
      categorias,
      cidXPtaNovo,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { padItemIndicadores, categorias, cidXPtaNovos, cidXPtaNovoPadItemIndiList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Cid X Pta Novo Pad Item Indis</span>
          <Button id="togglerFilterCidXPtaNovoPadItemIndi" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.home.createLabel">
              Create a new Cid X Pta Novo Pad Item Indi
            </Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Cid X Pta Novo Pad Item Indis</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterCidXPtaNovoPadItemIndi">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'meta' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="metaLabel" for="cid-x-pta-novo-pad-item-indi-meta">
                              <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.meta">Meta</Translate>
                            </Label>

                            <AvInput type="text" name="meta" id="cid-x-pta-novo-pad-item-indi-meta" value={this.state.meta} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'maximo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="maximoLabel" for="cid-x-pta-novo-pad-item-indi-maximo">
                              <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.maximo">Maximo</Translate>
                            </Label>

                            <AvInput type="text" name="maximo" id="cid-x-pta-novo-pad-item-indi-maximo" value={this.state.maximo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'minimo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="minimoLabel" for="cid-x-pta-novo-pad-item-indi-minimo">
                              <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.minimo">Minimo</Translate>
                            </Label>

                            <AvInput type="text" name="minimo" id="cid-x-pta-novo-pad-item-indi-minimo" value={this.state.minimo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'unidadeMedidaExtra' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="unidadeMedidaExtraLabel" for="cid-x-pta-novo-pad-item-indi-unidadeMedidaExtra">
                              <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.unidadeMedidaExtra">
                                Unidade Medida Extra
                              </Translate>
                            </Label>

                            <AvInput
                              type="text"
                              name="unidadeMedidaExtra"
                              id="cid-x-pta-novo-pad-item-indi-unidadeMedidaExtra"
                              value={this.state.unidadeMedidaExtra}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'unidadeMedidaId' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="unidadeMedidaIdLabel" for="cid-x-pta-novo-pad-item-indi-unidadeMedidaId">
                              <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.unidadeMedidaId">Unidade Medida Id</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="unidadeMedidaId"
                              id="cid-x-pta-novo-pad-item-indi-unidadeMedidaId"
                              value={this.state.unidadeMedidaId}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'score' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="scoreLabel" for="cid-x-pta-novo-pad-item-indi-score">
                              <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.score">Score</Translate>
                            </Label>
                            <AvInput type="string" name="score" id="cid-x-pta-novo-pad-item-indi-score" value={this.state.score} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'alertasIndicadores' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'padItemIndicadores' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="cid-x-pta-novo-pad-item-indi-padItemIndicadores">
                                <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.padItemIndicadores">
                                  Pad Item Indicadores
                                </Translate>
                              </Label>
                              <Select
                                id="cid-x-pta-novo-pad-item-indi-padItemIndicadores"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  padItemIndicadores
                                    ? padItemIndicadores.map(p =>
                                        this.state.padItemIndicadores.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null
                                      )
                                    : null
                                }
                                options={
                                  padItemIndicadores ? padItemIndicadores.map(option => ({ value: option.id, label: option.id })) : null
                                }
                                onChange={options =>
                                  this.setState({ padItemIndicadores: options.map(option => option['value']).join(',') })
                                }
                                name={'padItemIndicadores'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'categorias' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="cid-x-pta-novo-pad-item-indi-categorias">
                                <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.categorias">Categorias</Translate>
                              </Label>
                              <Select
                                id="cid-x-pta-novo-pad-item-indi-categorias"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  categorias
                                    ? categorias.map(p =>
                                        this.state.categorias.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null
                                      )
                                    : null
                                }
                                options={categorias ? categorias.map(option => ({ value: option.id, label: option.id })) : null}
                                onChange={options => this.setState({ categorias: options.map(option => option['value']).join(',') })}
                                name={'categorias'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cidXPtaNovo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="cid-x-pta-novo-pad-item-indi-cidXPtaNovo">
                                <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.cidXPtaNovo">Cid X Pta Novo</Translate>
                              </Label>
                              <Select
                                id="cid-x-pta-novo-pad-item-indi-cidXPtaNovo"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  cidXPtaNovos
                                    ? cidXPtaNovos.map(p =>
                                        this.state.cidXPtaNovo.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null
                                      )
                                    : null
                                }
                                options={cidXPtaNovos ? cidXPtaNovos.map(option => ({ value: option.id, label: option.id })) : null}
                                onChange={options => this.setState({ cidXPtaNovo: options.map(option => option['value']).join(',') })}
                                name={'cidXPtaNovo'}
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
                        <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {cidXPtaNovoPadItemIndiList && cidXPtaNovoPadItemIndiList.length > 0 ? (
                <Table responsive aria-describedby="cid-x-pta-novo-pad-item-indi-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'meta' ? (
                        <th className="hand" onClick={this.sort('meta')}>
                          <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.meta">Meta</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'maximo' ? (
                        <th className="hand" onClick={this.sort('maximo')}>
                          <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.maximo">Maximo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'minimo' ? (
                        <th className="hand" onClick={this.sort('minimo')}>
                          <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.minimo">Minimo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'unidadeMedidaExtra' ? (
                        <th className="hand" onClick={this.sort('unidadeMedidaExtra')}>
                          <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.unidadeMedidaExtra">Unidade Medida Extra</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'unidadeMedidaId' ? (
                        <th className="hand" onClick={this.sort('unidadeMedidaId')}>
                          <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.unidadeMedidaId">Unidade Medida Id</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'score' ? (
                        <th className="hand" onClick={this.sort('score')}>
                          <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.score">Score</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'padItemIndicadores' ? (
                        <th>
                          <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.padItemIndicadores">Pad Item Indicadores</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'categorias' ? (
                        <th>
                          <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.categorias">Categorias</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'cidXPtaNovo' ? (
                        <th>
                          <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.cidXPtaNovo">Cid X Pta Novo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {cidXPtaNovoPadItemIndiList.map((cidXPtaNovoPadItemIndi, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${cidXPtaNovoPadItemIndi.id}`} color="link" size="sm">
                            {cidXPtaNovoPadItemIndi.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'meta' ? <td>{cidXPtaNovoPadItemIndi.meta}</td> : null}

                        {this.state.baseFilters !== 'maximo' ? <td>{cidXPtaNovoPadItemIndi.maximo}</td> : null}

                        {this.state.baseFilters !== 'minimo' ? <td>{cidXPtaNovoPadItemIndi.minimo}</td> : null}

                        {this.state.baseFilters !== 'unidadeMedidaExtra' ? <td>{cidXPtaNovoPadItemIndi.unidadeMedidaExtra}</td> : null}

                        {this.state.baseFilters !== 'unidadeMedidaId' ? <td>{cidXPtaNovoPadItemIndi.unidadeMedidaId}</td> : null}

                        {this.state.baseFilters !== 'score' ? <td>{cidXPtaNovoPadItemIndi.score}</td> : null}

                        {this.state.baseFilters !== 'padItemIndicadores' ? (
                          <td>
                            {cidXPtaNovoPadItemIndi.padItemIndicadores ? (
                              <Link to={`pad-item-indicadores/${cidXPtaNovoPadItemIndi.padItemIndicadores.id}`}>
                                {cidXPtaNovoPadItemIndi.padItemIndicadores.id}
                              </Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'categorias' ? (
                          <td>
                            {cidXPtaNovoPadItemIndi.categorias ? (
                              <Link to={`categoria/${cidXPtaNovoPadItemIndi.categorias.id}`}>{cidXPtaNovoPadItemIndi.categorias.id}</Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'cidXPtaNovo' ? (
                          <td>
                            {cidXPtaNovoPadItemIndi.cidXPtaNovo ? (
                              <Link to={`cid-x-pta-novo/${cidXPtaNovoPadItemIndi.cidXPtaNovo.id}`}>
                                {cidXPtaNovoPadItemIndi.cidXPtaNovo.id}
                              </Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button
                              tag={Link}
                              to={`${match.url}/${cidXPtaNovoPadItemIndi.id}?${this.getFiltersURL()}`}
                              color="info"
                              size="sm"
                            >
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${cidXPtaNovoPadItemIndi.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${cidXPtaNovoPadItemIndi.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.home.notFound">
                    No Cid X Pta Novo Pad Item Indis found
                  </Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={cidXPtaNovoPadItemIndiList && cidXPtaNovoPadItemIndiList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ cidXPtaNovoPadItemIndi, ...storeState }: IRootState) => ({
  padItemIndicadores: storeState.padItemIndicadores.entities,
  categorias: storeState.categoria.entities,
  cidXPtaNovos: storeState.cidXPtaNovo.entities,
  cidXPtaNovoPadItemIndiList: cidXPtaNovoPadItemIndi.entities,
  totalItems: cidXPtaNovoPadItemIndi.totalItems
});

const mapDispatchToProps = {
  getPadItemIndicadores,
  getCategorias,
  getCidXPtaNovos,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CidXPtaNovoPadItemIndi);
