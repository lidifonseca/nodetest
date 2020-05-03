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
import { getEntities } from './cid-x-pta-novo-pad-item-indicadores.reducer';
import { ICidXPtaNovoPadItemIndicadores } from 'app/shared/model/cid-x-pta-novo-pad-item-indicadores.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IPadItemIndicadores } from 'app/shared/model/pad-item-indicadores.model';
import { getEntities as getPadItemIndicadores } from 'app/entities/pad-item-indicadores/pad-item-indicadores.reducer';
import { ICategoria } from 'app/shared/model/categoria.model';
import { getEntities as getCategorias } from 'app/entities/categoria/categoria.reducer';
import { ICidXPtaNovo } from 'app/shared/model/cid-x-pta-novo.model';
import { getEntities as getCidXPtaNovos } from 'app/entities/cid-x-pta-novo/cid-x-pta-novo.reducer';

export interface ICidXPtaNovoPadItemIndicadoresProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ICidXPtaNovoPadItemIndicadoresBaseState {
  meta: any;
  maximo: any;
  minimo: any;
  unidadeMedidaExtra: any;
  unidadeMedidaId: any;
  score: any;
  alertasIndicadores: any;
  padItemIndicadoresId: any;
  categoriasId: any;
  cidXPtaNovoId: any;
}
export interface ICidXPtaNovoPadItemIndicadoresState extends ICidXPtaNovoPadItemIndicadoresBaseState, IPaginationBaseState {}

export class CidXPtaNovoPadItemIndicadores extends React.Component<
  ICidXPtaNovoPadItemIndicadoresProps,
  ICidXPtaNovoPadItemIndicadoresState
> {
  private myFormRef: any;

  constructor(props: ICidXPtaNovoPadItemIndicadoresProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getCidXPtaNovoPadItemIndicadoresState(this.props.location)
    };
  }

  getCidXPtaNovoPadItemIndicadoresState = (location): ICidXPtaNovoPadItemIndicadoresBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const meta = url.searchParams.get('meta') || '';
    const maximo = url.searchParams.get('maximo') || '';
    const minimo = url.searchParams.get('minimo') || '';
    const unidadeMedidaExtra = url.searchParams.get('unidadeMedidaExtra') || '';
    const unidadeMedidaId = url.searchParams.get('unidadeMedidaId') || '';
    const score = url.searchParams.get('score') || '';

    const alertasIndicadores = url.searchParams.get('alertasIndicadores') || '';
    const padItemIndicadoresId = url.searchParams.get('padItemIndicadoresId') || '';
    const categoriasId = url.searchParams.get('categoriasId') || '';
    const cidXPtaNovoId = url.searchParams.get('cidXPtaNovoId') || '';

    return {
      meta,
      maximo,
      minimo,
      unidadeMedidaExtra,
      unidadeMedidaId,
      score,
      alertasIndicadores,
      padItemIndicadoresId,
      categoriasId,
      cidXPtaNovoId
    };
  };

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
        padItemIndicadoresId: '',
        categoriasId: '',
        cidXPtaNovoId: ''
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
      'padItemIndicadoresId=' +
      this.state.padItemIndicadoresId +
      '&' +
      'categoriasId=' +
      this.state.categoriasId +
      '&' +
      'cidXPtaNovoId=' +
      this.state.cidXPtaNovoId +
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
      padItemIndicadoresId,
      categoriasId,
      cidXPtaNovoId,
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
      padItemIndicadoresId,
      categoriasId,
      cidXPtaNovoId,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { padItemIndicadores, categorias, cidXPtaNovos, cidXPtaNovoPadItemIndicadoresList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Cid X Pta Novo Pad Item Indicadores</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Cid X Pta Novo Pad Item Indicadores</span>
              <Button id="togglerFilterCidXPtaNovoPadItemIndicadores" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.home.createLabel">
                  Create a new Cid X Pta Novo Pad Item Indicadores
                </Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterCidXPtaNovoPadItemIndicadores">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="metaLabel" for="cid-x-pta-novo-pad-item-indicadores-meta">
                            <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.meta">Meta</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="meta"
                            id="cid-x-pta-novo-pad-item-indicadores-meta"
                            value={this.state.meta}
                            validate={{
                              maxLength: { value: 145, errorMessage: translate('entity.validation.maxlength', { max: 145 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="maximoLabel" for="cid-x-pta-novo-pad-item-indicadores-maximo">
                            <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.maximo">Maximo</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="maximo"
                            id="cid-x-pta-novo-pad-item-indicadores-maximo"
                            value={this.state.maximo}
                            validate={{
                              maxLength: { value: 145, errorMessage: translate('entity.validation.maxlength', { max: 145 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="minimoLabel" for="cid-x-pta-novo-pad-item-indicadores-minimo">
                            <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.minimo">Minimo</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="minimo"
                            id="cid-x-pta-novo-pad-item-indicadores-minimo"
                            value={this.state.minimo}
                            validate={{
                              maxLength: { value: 145, errorMessage: translate('entity.validation.maxlength', { max: 145 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="unidadeMedidaExtraLabel" for="cid-x-pta-novo-pad-item-indicadores-unidadeMedidaExtra">
                            <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.unidadeMedidaExtra">
                              Unidade Medida Extra
                            </Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="unidadeMedidaExtra"
                            id="cid-x-pta-novo-pad-item-indicadores-unidadeMedidaExtra"
                            value={this.state.unidadeMedidaExtra}
                            validate={{
                              maxLength: { value: 145, errorMessage: translate('entity.validation.maxlength', { max: 145 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="unidadeMedidaIdLabel" for="cid-x-pta-novo-pad-item-indicadores-unidadeMedidaId">
                            <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.unidadeMedidaId">Unidade Medida Id</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="unidadeMedidaId"
                            id="cid-x-pta-novo-pad-item-indicadores-unidadeMedidaId"
                            value={this.state.unidadeMedidaId}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="scoreLabel" for="cid-x-pta-novo-pad-item-indicadores-score">
                            <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.score">Score</Translate>
                          </Label>
                          <AvInput type="string" name="score" id="cid-x-pta-novo-pad-item-indicadores-score" value={this.state.score} />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="cid-x-pta-novo-pad-item-indicadores-padItemIndicadoresId">
                              <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.padItemIndicadoresId">
                                Pad Item Indicadores Id
                              </Translate>
                            </Label>
                            <AvInput
                              id="cid-x-pta-novo-pad-item-indicadores-padItemIndicadoresId"
                              type="select"
                              className="form-control"
                              name="padItemIndicadoresIdId"
                            >
                              <option value="" key="0" />
                              {padItemIndicadores
                                ? padItemIndicadores.map(otherEntity => (
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
                            <Label for="cid-x-pta-novo-pad-item-indicadores-categoriasId">
                              <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.categoriasId">Categorias Id</Translate>
                            </Label>
                            <AvInput
                              id="cid-x-pta-novo-pad-item-indicadores-categoriasId"
                              type="select"
                              className="form-control"
                              name="categoriasIdId"
                            >
                              <option value="" key="0" />
                              {categorias
                                ? categorias.map(otherEntity => (
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
                            <Label for="cid-x-pta-novo-pad-item-indicadores-cidXPtaNovoId">
                              <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.cidXPtaNovoId">Cid X Pta Novo Id</Translate>
                            </Label>
                            <AvInput
                              id="cid-x-pta-novo-pad-item-indicadores-cidXPtaNovoId"
                              type="select"
                              className="form-control"
                              name="cidXPtaNovoIdId"
                            >
                              <option value="" key="0" />
                              {cidXPtaNovos
                                ? cidXPtaNovos.map(otherEntity => (
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

              {cidXPtaNovoPadItemIndicadoresList && cidXPtaNovoPadItemIndicadoresList.length > 0 ? (
                <Table
                  responsive
                  aria-describedby="cid-x-pta-novo-pad-item-indicadores-heading"
                  className={'table-hover table-striped mt-4'}
                >
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('meta')}>
                        <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.meta">Meta</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('maximo')}>
                        <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.maximo">Maximo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('minimo')}>
                        <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.minimo">Minimo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('unidadeMedidaExtra')}>
                        <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.unidadeMedidaExtra">
                          Unidade Medida Extra
                        </Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('unidadeMedidaId')}>
                        <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.unidadeMedidaId">Unidade Medida Id</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('score')}>
                        <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.score">Score</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.padItemIndicadoresId">
                          Pad Item Indicadores Id
                        </Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.categoriasId">Categorias Id</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.cidXPtaNovoId">Cid X Pta Novo Id</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {cidXPtaNovoPadItemIndicadoresList.map((cidXPtaNovoPadItemIndicadores, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${cidXPtaNovoPadItemIndicadores.id}`} color="link" size="sm">
                            {cidXPtaNovoPadItemIndicadores.id}
                          </Button>
                        </td>

                        <td>{cidXPtaNovoPadItemIndicadores.meta}</td>

                        <td>{cidXPtaNovoPadItemIndicadores.maximo}</td>

                        <td>{cidXPtaNovoPadItemIndicadores.minimo}</td>

                        <td>{cidXPtaNovoPadItemIndicadores.unidadeMedidaExtra}</td>

                        <td>{cidXPtaNovoPadItemIndicadores.unidadeMedidaId}</td>

                        <td>{cidXPtaNovoPadItemIndicadores.score}</td>
                        <td>
                          {cidXPtaNovoPadItemIndicadores.padItemIndicadoresId ? (
                            <Link to={`pad-item-indicadores/${cidXPtaNovoPadItemIndicadores.padItemIndicadoresId.id}`}>
                              {cidXPtaNovoPadItemIndicadores.padItemIndicadoresId.id}
                            </Link>
                          ) : (
                            ''
                          )}
                        </td>
                        <td>
                          {cidXPtaNovoPadItemIndicadores.categoriasId ? (
                            <Link to={`categoria/${cidXPtaNovoPadItemIndicadores.categoriasId.id}`}>
                              {cidXPtaNovoPadItemIndicadores.categoriasId.id}
                            </Link>
                          ) : (
                            ''
                          )}
                        </td>
                        <td>
                          {cidXPtaNovoPadItemIndicadores.cidXPtaNovoId ? (
                            <Link to={`cid-x-pta-novo/${cidXPtaNovoPadItemIndicadores.cidXPtaNovoId.id}`}>
                              {cidXPtaNovoPadItemIndicadores.cidXPtaNovoId.id}
                            </Link>
                          ) : (
                            ''
                          )}
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${cidXPtaNovoPadItemIndicadores.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${cidXPtaNovoPadItemIndicadores.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${cidXPtaNovoPadItemIndicadores.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.home.notFound">
                    No Cid X Pta Novo Pad Item Indicadores found
                  </Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={cidXPtaNovoPadItemIndicadoresList && cidXPtaNovoPadItemIndicadoresList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ cidXPtaNovoPadItemIndicadores, ...storeState }: IRootState) => ({
  padItemIndicadores: storeState.padItemIndicadores.entities,
  categorias: storeState.categoria.entities,
  cidXPtaNovos: storeState.cidXPtaNovo.entities,
  cidXPtaNovoPadItemIndicadoresList: cidXPtaNovoPadItemIndicadores.entities,
  totalItems: cidXPtaNovoPadItemIndicadores.totalItems
});

const mapDispatchToProps = {
  getPadItemIndicadores,
  getCategorias,
  getCidXPtaNovos,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CidXPtaNovoPadItemIndicadores);
