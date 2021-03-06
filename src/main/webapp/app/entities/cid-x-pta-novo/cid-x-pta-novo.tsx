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
import { getCidXPtaNovoState, ICidXPtaNovoBaseState, getEntities } from './cid-x-pta-novo.reducer';
import { ICidXPtaNovo } from 'app/shared/model/cid-x-pta-novo.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { ICid } from 'app/shared/model/cid.model';
import { getEntities as getCids } from 'app/entities/cid/cid.reducer';

export interface ICidXPtaNovoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ICidXPtaNovoState extends ICidXPtaNovoBaseState, IPaginationBaseState {}

export class CidXPtaNovo extends React.Component<ICidXPtaNovoProps, ICidXPtaNovoState> {
  private myFormRef: any;

  constructor(props: ICidXPtaNovoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getCidXPtaNovoState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getCids();
  }

  cancelCourse = () => {
    this.setState(
      {
        complexidade: '',
        versao: '',
        score: '',
        titulo: '',
        cidXPtaNovoPadItemIndi: '',
        cid: ''
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
      'cidXPtaNovoPadItemIndi=' +
      this.state.cidXPtaNovoPadItemIndi +
      '&' +
      'cid=' +
      this.state.cid +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { complexidade, versao, score, titulo, cidXPtaNovoPadItemIndi, cid, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(
      complexidade,
      versao,
      score,
      titulo,
      cidXPtaNovoPadItemIndi,
      cid,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { cids, cidXPtaNovoList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Cid X Pta Novos</span>
          <Button id="togglerFilterCidXPtaNovo" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.cidXPtaNovo.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.cidXPtaNovo.home.createLabel">Create a new Cid X Pta Novo</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Cid X Pta Novos</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterCidXPtaNovo">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'complexidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="complexidadeLabel" for="cid-x-pta-novo-complexidade">
                              <Translate contentKey="generadorApp.cidXPtaNovo.complexidade">Complexidade</Translate>
                            </Label>

                            <AvInput type="text" name="complexidade" id="cid-x-pta-novo-complexidade" value={this.state.complexidade} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'versao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="versaoLabel" for="cid-x-pta-novo-versao">
                              <Translate contentKey="generadorApp.cidXPtaNovo.versao">Versao</Translate>
                            </Label>
                            <AvInput type="string" name="versao" id="cid-x-pta-novo-versao" value={this.state.versao} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'score' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="scoreLabel" for="cid-x-pta-novo-score">
                              <Translate contentKey="generadorApp.cidXPtaNovo.score">Score</Translate>
                            </Label>
                            <AvInput type="string" name="score" id="cid-x-pta-novo-score" value={this.state.score} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'titulo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="tituloLabel" for="cid-x-pta-novo-titulo">
                              <Translate contentKey="generadorApp.cidXPtaNovo.titulo">Titulo</Translate>
                            </Label>

                            <AvInput type="text" name="titulo" id="cid-x-pta-novo-titulo" value={this.state.titulo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cidXPtaNovoPadItemIndi' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cid' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="cid-x-pta-novo-cid">
                                <Translate contentKey="generadorApp.cidXPtaNovo.cid">Cid</Translate>
                              </Label>
                              <Select
                                id="cid-x-pta-novo-cid"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  cids
                                    ? cids.map(p => (this.state.cid.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null))
                                    : null
                                }
                                options={cids ? cids.map(option => ({ value: option.id, label: option.id })) : null}
                                onChange={options => this.setState({ cid: options.map(option => option['value']).join(',') })}
                                name={'cid'}
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
                        <Translate contentKey="generadorApp.cidXPtaNovo.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.cidXPtaNovo.home.btn_filter_clean">Clean</Translate>
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
                      {this.state.baseFilters !== 'complexidade' ? (
                        <th className="hand" onClick={this.sort('complexidade')}>
                          <Translate contentKey="generadorApp.cidXPtaNovo.complexidade">Complexidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'versao' ? (
                        <th className="hand" onClick={this.sort('versao')}>
                          <Translate contentKey="generadorApp.cidXPtaNovo.versao">Versao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'score' ? (
                        <th className="hand" onClick={this.sort('score')}>
                          <Translate contentKey="generadorApp.cidXPtaNovo.score">Score</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'titulo' ? (
                        <th className="hand" onClick={this.sort('titulo')}>
                          <Translate contentKey="generadorApp.cidXPtaNovo.titulo">Titulo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'cid' ? (
                        <th>
                          <Translate contentKey="generadorApp.cidXPtaNovo.cid">Cid</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

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

                        {this.state.baseFilters !== 'complexidade' ? <td>{cidXPtaNovo.complexidade}</td> : null}

                        {this.state.baseFilters !== 'versao' ? <td>{cidXPtaNovo.versao}</td> : null}

                        {this.state.baseFilters !== 'score' ? <td>{cidXPtaNovo.score}</td> : null}

                        {this.state.baseFilters !== 'titulo' ? <td>{cidXPtaNovo.titulo}</td> : null}

                        {this.state.baseFilters !== 'cid' ? (
                          <td>{cidXPtaNovo.cid ? <Link to={`cid/${cidXPtaNovo.cid.id}`}>{cidXPtaNovo.cid.id}</Link> : ''}</td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${cidXPtaNovo.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${cidXPtaNovo.id}/edit?${this.getFiltersURL()}`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${cidXPtaNovo.id}/delete?${this.getFiltersURL()}`}
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
  cids: storeState.cid.entities,
  cidXPtaNovoList: cidXPtaNovo.entities,
  totalItems: cidXPtaNovo.totalItems
});

const mapDispatchToProps = {
  getCids,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CidXPtaNovo);
