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
import { getEntities } from './cid-x-pta-novo.reducer';
import { ICidXPtaNovo } from 'app/shared/model/cid-x-pta-novo.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { getEntities as getCidXPtaNovos } from 'app/entities/cid-x-pta-novo/cid-x-pta-novo.reducer';
import { ICid } from 'app/shared/model/cid.model';
import { getEntities as getCids } from 'app/entities/cid/cid.reducer';

export interface ICidXPtaNovoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ICidXPtaNovoBaseState {
  complexidade: any;
  versao: any;
  score: any;
  titulo: any;
  cidXPtaNovo: any;
  cidXPtaNovoPadItemIndi: any;
  cidId: any;
  cidXPtaNovoId: any;
}
export interface ICidXPtaNovoState extends ICidXPtaNovoBaseState, IPaginationBaseState {}

export class CidXPtaNovo extends React.Component<ICidXPtaNovoProps, ICidXPtaNovoState> {
  private myFormRef: any;

  constructor(props: ICidXPtaNovoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getCidXPtaNovoState(this.props.location)
    };
  }

  getCidXPtaNovoState = (location): ICidXPtaNovoBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const complexidade = url.searchParams.get('complexidade') || '';
    const versao = url.searchParams.get('versao') || '';
    const score = url.searchParams.get('score') || '';
    const titulo = url.searchParams.get('titulo') || '';

    const cidXPtaNovo = url.searchParams.get('cidXPtaNovo') || '';
    const cidXPtaNovoPadItemIndi = url.searchParams.get('cidXPtaNovoPadItemIndi') || '';
    const cidId = url.searchParams.get('cidId') || '';
    const cidXPtaNovoId = url.searchParams.get('cidXPtaNovoId') || '';

    return {
      complexidade,
      versao,
      score,
      titulo,
      cidXPtaNovo,
      cidXPtaNovoPadItemIndi,
      cidId,
      cidXPtaNovoId
    };
  };

  componentDidMount() {
    this.getEntities();

    this.props.getCidXPtaNovos();
    this.props.getCids();
  }

  cancelCourse = () => {
    this.setState(
      {
        complexidade: '',
        versao: '',
        score: '',
        titulo: '',
        cidXPtaNovo: '',
        cidXPtaNovoPadItemIndi: '',
        cidId: '',
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
      'complexidade=' +
      this.state.complexidade +
      '&' +
      'versao=' +
      this.state.versao +
      '&' +
      'score=' +
      this.state.score +
      '&' +
      'titulo=' +
      this.state.titulo +
      '&' +
      'cidXPtaNovo=' +
      this.state.cidXPtaNovo +
      '&' +
      'cidXPtaNovoPadItemIndi=' +
      this.state.cidXPtaNovoPadItemIndi +
      '&' +
      'cidId=' +
      this.state.cidId +
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
      complexidade,
      versao,
      score,
      titulo,
      cidXPtaNovo,
      cidXPtaNovoPadItemIndi,
      cidId,
      cidXPtaNovoId,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      complexidade,
      versao,
      score,
      titulo,
      cidXPtaNovo,
      cidXPtaNovoPadItemIndi,
      cidId,
      cidXPtaNovoId,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { cidXPtaNovos, cids, cidXPtaNovoList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Cid X Pta Novos</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Cid X Pta Novos</span>
              <Button id="togglerFilterCidXPtaNovo" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.cidXPtaNovo.home.createLabel">Create a new Cid X Pta Novo</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterCidXPtaNovo">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="complexidadeLabel" for="cid-x-pta-novo-complexidade">
                            <Translate contentKey="generadorApp.cidXPtaNovo.complexidade">Complexidade</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="complexidade"
                            id="cid-x-pta-novo-complexidade"
                            value={this.state.complexidade}
                            validate={{
                              maxLength: { value: 45, errorMessage: translate('entity.validation.maxlength', { max: 45 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="versaoLabel" for="cid-x-pta-novo-versao">
                            <Translate contentKey="generadorApp.cidXPtaNovo.versao">Versao</Translate>
                          </Label>
                          <AvInput type="string" name="versao" id="cid-x-pta-novo-versao" value={this.state.versao} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="scoreLabel" for="cid-x-pta-novo-score">
                            <Translate contentKey="generadorApp.cidXPtaNovo.score">Score</Translate>
                          </Label>
                          <AvInput type="string" name="score" id="cid-x-pta-novo-score" value={this.state.score} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="tituloLabel" for="cid-x-pta-novo-titulo">
                            <Translate contentKey="generadorApp.cidXPtaNovo.titulo">Titulo</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="titulo"
                            id="cid-x-pta-novo-titulo"
                            value={this.state.titulo}
                            validate={{
                              maxLength: { value: 245, errorMessage: translate('entity.validation.maxlength', { max: 245 }) }
                            }}
                          />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="cid-x-pta-novo-cidId">
                              <Translate contentKey="generadorApp.cidXPtaNovo.cidId">Cid Id</Translate>
                            </Label>
                            <AvInput id="cid-x-pta-novo-cidId" type="select" className="form-control" name="cidIdId">
                              <option value="" key="0" />
                              {cids
                                ? cids.map(otherEntity => (
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
                            <Label for="cid-x-pta-novo-cidXPtaNovoId">
                              <Translate contentKey="generadorApp.cidXPtaNovo.cidXPtaNovoId">Cid X Pta Novo Id</Translate>
                            </Label>
                            <AvInput id="cid-x-pta-novo-cidXPtaNovoId" type="select" className="form-control" name="cidXPtaNovoIdId">
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

              {cidXPtaNovoList && cidXPtaNovoList.length > 0 ? (
                <Table responsive aria-describedby="cid-x-pta-novo-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('complexidade')}>
                        <Translate contentKey="generadorApp.cidXPtaNovo.complexidade">Complexidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('versao')}>
                        <Translate contentKey="generadorApp.cidXPtaNovo.versao">Versao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('score')}>
                        <Translate contentKey="generadorApp.cidXPtaNovo.score">Score</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('titulo')}>
                        <Translate contentKey="generadorApp.cidXPtaNovo.titulo">Titulo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.cidXPtaNovo.cidId">Cid Id</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.cidXPtaNovo.cidXPtaNovoId">Cid X Pta Novo Id</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {cidXPtaNovoList.map((cidXPtaNovo, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${cidXPtaNovo.id}`} color="link" size="sm">
                            {cidXPtaNovo.id}
                          </Button>
                        </td>

                        <td>{cidXPtaNovo.complexidade}</td>

                        <td>{cidXPtaNovo.versao}</td>

                        <td>{cidXPtaNovo.score}</td>

                        <td>{cidXPtaNovo.titulo}</td>
                        <td>{cidXPtaNovo.cidId ? <Link to={`cid/${cidXPtaNovo.cidId.id}`}>{cidXPtaNovo.cidId.id}</Link> : ''}</td>
                        <td>
                          {cidXPtaNovo.cidXPtaNovoId ? (
                            <Link to={`cid-x-pta-novo/${cidXPtaNovo.cidXPtaNovoId.id}`}>{cidXPtaNovo.cidXPtaNovoId.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${cidXPtaNovo.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${cidXPtaNovo.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${cidXPtaNovo.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.cidXPtaNovo.home.notFound">No Cid X Pta Novos found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={cidXPtaNovoList && cidXPtaNovoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ cidXPtaNovo, ...storeState }: IRootState) => ({
  cidXPtaNovos: storeState.cidXPtaNovo.entities,
  cids: storeState.cid.entities,
  cidXPtaNovoList: cidXPtaNovo.entities,
  totalItems: cidXPtaNovo.totalItems
});

const mapDispatchToProps = {
  getCidXPtaNovos,
  getCids,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CidXPtaNovo);
