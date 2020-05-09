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
import { getPadCidState, IPadCidBaseState, getEntities } from './pad-cid.reducer';
import { IPadCid } from 'app/shared/model/pad-cid.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IPad } from 'app/shared/model/pad.model';
import { getEntities as getPads } from 'app/entities/pad/pad.reducer';
import { ICid } from 'app/shared/model/cid.model';
import { getEntities as getCids } from 'app/entities/cid/cid.reducer';

export interface IPadCidProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPadCidState extends IPadCidBaseState, IPaginationBaseState {}

export class PadCid extends React.Component<IPadCidProps, IPadCidState> {
  private myFormRef: any;

  constructor(props: IPadCidProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getPadCidState(this.props.location)
    };
  }

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
        pad: '',
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
      'observacao=' +
      this.state.observacao +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'pad=' +
      this.state.pad +
      '&' +
      'cid=' +
      this.state.cid +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { observacao, ativo, pad, cid, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(observacao, ativo, pad, cid, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { pads, cids, padCidList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Pad Cids</span>
          <Button id="togglerFilterPadCid" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.padCid.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.padCid.home.createLabel">Create a new Pad Cid</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Cids</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPadCid">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'observacao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="observacaoLabel" for="pad-cid-observacao">
                              <Translate contentKey="generadorApp.padCid.observacao">Observacao</Translate>
                            </Label>

                            <AvInput type="text" name="observacao" id="pad-cid-observacao" value={this.state.observacao} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ativo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ativoLabel" check>
                              <AvInput id="pad-cid-ativo" type="checkbox" className="form-control" name="ativo" />
                              <Translate contentKey="generadorApp.padCid.ativo">Ativo</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'pad' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="pad-cid-pad">
                                <Translate contentKey="generadorApp.padCid.pad">Pad</Translate>
                              </Label>
                              <Select
                                id="pad-cid-pad"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  pads
                                    ? pads.map(p => (this.state.pad.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null))
                                    : null
                                }
                                options={pads ? pads.map(option => ({ value: option.id, label: option.id })) : null}
                                onChange={options => this.setState({ pad: options.map(option => option['value']).join(',') })}
                                name={'pad'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cid' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="pad-cid-cid">
                                <Translate contentKey="generadorApp.padCid.cid">Cid</Translate>
                              </Label>
                              <Select
                                id="pad-cid-cid"
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
                        <Translate contentKey="generadorApp.padCid.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.padCid.home.btn_filter_clean">Clean</Translate>
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
                      {this.state.baseFilters !== 'observacao' ? (
                        <th className="hand" onClick={this.sort('observacao')}>
                          <Translate contentKey="generadorApp.padCid.observacao">Observacao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ativo' ? (
                        <th className="hand" onClick={this.sort('ativo')}>
                          <Translate contentKey="generadorApp.padCid.ativo">Ativo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'pad' ? (
                        <th>
                          <Translate contentKey="generadorApp.padCid.pad">Pad</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'cid' ? (
                        <th>
                          <Translate contentKey="generadorApp.padCid.cid">Cid</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

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

                        {this.state.baseFilters !== 'observacao' ? <td>{padCid.observacao}</td> : null}

                        {this.state.baseFilters !== 'ativo' ? <td>{padCid.ativo ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'pad' ? (
                          <td>{padCid.pad ? <Link to={`pad/${padCid.pad.id}`}>{padCid.pad.id}</Link> : ''}</td>
                        ) : null}

                        {this.state.baseFilters !== 'cid' ? (
                          <td>{padCid.cid ? <Link to={`cid/${padCid.cid.id}`}>{padCid.cid.id}</Link> : ''}</td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${padCid.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${padCid.id}/edit?${this.getFiltersURL()}`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${padCid.id}/delete?${this.getFiltersURL()}`} color="danger" size="sm">
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
