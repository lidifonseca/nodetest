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
import { getPadPtaState, IPadPtaBaseState, getEntities } from './pad-pta.reducer';
import { IPadPta } from 'app/shared/model/pad-pta.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPadPtaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPadPtaState extends IPadPtaBaseState, IPaginationBaseState {}

export class PadPta extends React.Component<IPadPtaProps, IPadPtaState> {
  private myFormRef: any;

  constructor(props: IPadPtaProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getPadPtaState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idPad: '',
        idDescPta: '',
        idCid: '',
        idCidXPtaNovo: ''
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
      'idPad=' +
      this.state.idPad +
      '&' +
      'idDescPta=' +
      this.state.idDescPta +
      '&' +
      'idCid=' +
      this.state.idCid +
      '&' +
      'idCidXPtaNovo=' +
      this.state.idCidXPtaNovo +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idPad, idDescPta, idCid, idCidXPtaNovo, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(idPad, idDescPta, idCid, idCidXPtaNovo, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { padPtaList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Pad Ptas</span>
          <Button id="togglerFilterPadPta" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.padPta.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.padPta.home.createLabel">Create a new Pad Pta</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Ptas</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPadPta">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idPad' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idPadLabel" for="pad-pta-idPad">
                              <Translate contentKey="generadorApp.padPta.idPad">Id Pad</Translate>
                            </Label>

                            <AvInput type="text" name="idPad" id="pad-pta-idPad" value={this.state.idPad} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idDescPta' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idDescPtaLabel" for="pad-pta-idDescPta">
                              <Translate contentKey="generadorApp.padPta.idDescPta">Id Desc Pta</Translate>
                            </Label>

                            <AvInput type="text" name="idDescPta" id="pad-pta-idDescPta" value={this.state.idDescPta} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idCid' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idCidLabel" for="pad-pta-idCid">
                              <Translate contentKey="generadorApp.padPta.idCid">Id Cid</Translate>
                            </Label>

                            <AvInput type="text" name="idCid" id="pad-pta-idCid" value={this.state.idCid} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idCidXPtaNovo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idCidXPtaNovoLabel" for="pad-pta-idCidXPtaNovo">
                              <Translate contentKey="generadorApp.padPta.idCidXPtaNovo">Id Cid X Pta Novo</Translate>
                            </Label>
                            <AvInput type="string" name="idCidXPtaNovo" id="pad-pta-idCidXPtaNovo" value={this.state.idCidXPtaNovo} />
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.padPta.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.padPta.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {padPtaList && padPtaList.length > 0 ? (
                <Table responsive aria-describedby="pad-pta-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'idPad' ? (
                        <th className="hand" onClick={this.sort('idPad')}>
                          <Translate contentKey="generadorApp.padPta.idPad">Id Pad</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idDescPta' ? (
                        <th className="hand" onClick={this.sort('idDescPta')}>
                          <Translate contentKey="generadorApp.padPta.idDescPta">Id Desc Pta</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idCid' ? (
                        <th className="hand" onClick={this.sort('idCid')}>
                          <Translate contentKey="generadorApp.padPta.idCid">Id Cid</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idCidXPtaNovo' ? (
                        <th className="hand" onClick={this.sort('idCidXPtaNovo')}>
                          <Translate contentKey="generadorApp.padPta.idCidXPtaNovo">Id Cid X Pta Novo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {padPtaList.map((padPta, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${padPta.id}`} color="link" size="sm">
                            {padPta.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'idPad' ? <td>{padPta.idPad}</td> : null}

                        {this.state.baseFilters !== 'idDescPta' ? <td>{padPta.idDescPta}</td> : null}

                        {this.state.baseFilters !== 'idCid' ? <td>{padPta.idCid}</td> : null}

                        {this.state.baseFilters !== 'idCidXPtaNovo' ? <td>{padPta.idCidXPtaNovo}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${padPta.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${padPta.id}/edit?${this.getFiltersURL()}`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${padPta.id}/delete?${this.getFiltersURL()}`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.padPta.home.notFound">No Pad Ptas found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={padPtaList && padPtaList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ padPta, ...storeState }: IRootState) => ({
  padPtaList: padPta.entities,
  totalItems: padPta.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadPta);
