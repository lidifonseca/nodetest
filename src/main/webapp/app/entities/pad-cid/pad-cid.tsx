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
import { getEntities } from './pad-cid.reducer';
import { IPadCid } from 'app/shared/model/pad-cid.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IPad } from 'app/shared/model/pad.model';
import { getEntities as getPads } from 'app/entities/pad/pad.reducer';
import { ICid } from 'app/shared/model/cid.model';
import { getEntities as getCids } from 'app/entities/cid/cid.reducer';

export interface IPadCidProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPadCidBaseState {
  observacao: any;
  ativo: any;
  idPad: any;
  idCid: any;
}
export interface IPadCidState extends IPadCidBaseState, IPaginationBaseState {}

export class PadCid extends React.Component<IPadCidProps, IPadCidState> {
  private myFormRef: any;

  constructor(props: IPadCidProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getPadCidState(this.props.location)
    };
  }

  getPadCidState = (location): IPadCidBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const observacao = url.searchParams.get('observacao') || '';
    const ativo = url.searchParams.get('ativo') || '';

    const idPad = url.searchParams.get('idPad') || '';
    const idCid = url.searchParams.get('idCid') || '';

    return {
      observacao,
      ativo,
      idPad,
      idCid
    };
  };

  componentDidMount() {
    this.getEntities();

    this.props.getPads();
    this.props.getCids();
  }

  cancelCourse = () => {
    this.setState(
      {
        observacao: '',
        ativo: '',
        idPad: '',
        idCid: ''
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
      'observacao=' +
      this.state.observacao +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'idPad=' +
      this.state.idPad +
      '&' +
      'idCid=' +
      this.state.idCid +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { observacao, ativo, idPad, idCid, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(observacao, ativo, idPad, idCid, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { pads, cids, padCidList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Cids</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Pad Cids</span>
              <Button id="togglerFilterPadCid" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.padCid.home.createLabel">Create a new Pad Cid</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPadCid">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="observacaoLabel" for="pad-cid-observacao">
                            <Translate contentKey="generadorApp.padCid.observacao">Observacao</Translate>
                          </Label>

                          <AvInput type="text" name="observacao" id="pad-cid-observacao" value={this.state.observacao} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="pad-cid-ativo">
                            <Translate contentKey="generadorApp.padCid.ativo">Ativo</Translate>
                          </Label>
                          <AvInput type="string" name="ativo" id="pad-cid-ativo" value={this.state.ativo} />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="pad-cid-idPad">
                              <Translate contentKey="generadorApp.padCid.idPad">Id Pad</Translate>
                            </Label>
                            <AvInput id="pad-cid-idPad" type="select" className="form-control" name="idPadId">
                              <option value="" key="0" />
                              {pads
                                ? pads.map(otherEntity => (
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
                            <Label for="pad-cid-idCid">
                              <Translate contentKey="generadorApp.padCid.idCid">Id Cid</Translate>
                            </Label>
                            <AvInput id="pad-cid-idCid" type="select" className="form-control" name="idCidId">
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

              {padCidList && padCidList.length > 0 ? (
                <Table responsive aria-describedby="pad-cid-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('observacao')}>
                        <Translate contentKey="generadorApp.padCid.observacao">Observacao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.padCid.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.padCid.idPad">Id Pad</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.padCid.idCid">Id Cid</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {padCidList.map((padCid, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${padCid.id}`} color="link" size="sm">
                            {padCid.id}
                          </Button>
                        </td>

                        <td>{padCid.observacao}</td>

                        <td>{padCid.ativo}</td>
                        <td>{padCid.idPad ? <Link to={`pad/${padCid.idPad.id}`}>{padCid.idPad.id}</Link> : ''}</td>
                        <td>{padCid.idCid ? <Link to={`cid/${padCid.idCid.id}`}>{padCid.idCid.id}</Link> : ''}</td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${padCid.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${padCid.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${padCid.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.padCid.home.notFound">No Pad Cids found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={padCidList && padCidList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ padCid, ...storeState }: IRootState) => ({
  pads: storeState.pad.entities,
  cids: storeState.cid.entities,
  padCidList: padCid.entities,
  totalItems: padCid.totalItems
});

const mapDispatchToProps = {
  getPads,
  getCids,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadCid);
