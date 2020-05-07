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
import {
  Translate,
  translate,
  ICrudGetAllAction,
  TextFormat,
  getSortState,
  IPaginationBaseState,
  JhiPagination,
  JhiItemCount
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';

import { IRootState } from 'app/shared/reducers';
import { getPadItemHistDataIncCompState, IPadItemHistDataIncCompBaseState, getEntities } from './pad-item-hist-data-inc-comp.reducer';
import { IPadItemHistDataIncComp } from 'app/shared/model/pad-item-hist-data-inc-comp.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPadItemHistDataIncCompProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPadItemHistDataIncCompState extends IPadItemHistDataIncCompBaseState, IPaginationBaseState {}

export class PadItemHistDataIncComp extends React.Component<IPadItemHistDataIncCompProps, IPadItemHistDataIncCompState> {
  private myFormRef: any;

  constructor(props: IPadItemHistDataIncCompProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getPadItemHistDataIncCompState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idPadItem: '',
        dataPadItemIncompleto: '',
        dataPadItemCompleto: ''
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
      'idPadItem=' +
      this.state.idPadItem +
      '&' +
      'dataPadItemIncompleto=' +
      this.state.dataPadItemIncompleto +
      '&' +
      'dataPadItemCompleto=' +
      this.state.dataPadItemCompleto +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idPadItem, dataPadItemIncompleto, dataPadItemCompleto, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(idPadItem, dataPadItemIncompleto, dataPadItemCompleto, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { padItemHistDataIncCompList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Item Hist Data Inc Comps</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Pad Item Hist Data Inc Comps</span>
              <Button id="togglerFilterPadItemHistDataIncComp" className="btn btn-primary float-right jh-create-entity">
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
                <Translate contentKey="generadorApp.padItemHistDataIncComp.home.createLabel">
                  Create a new Pad Item Hist Data Inc Comp
                </Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPadItemHistDataIncComp">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idPadItem' ? (
                        <Col md="3">
                          <Row>
                            <Label id="idPadItemLabel" for="pad-item-hist-data-inc-comp-idPadItem">
                              <Translate contentKey="generadorApp.padItemHistDataIncComp.idPadItem">Id Pad Item</Translate>
                            </Label>

                            <AvInput type="text" name="idPadItem" id="pad-item-hist-data-inc-comp-idPadItem" value={this.state.idPadItem} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dataPadItemIncompleto' ? (
                        <Col md="3">
                          <Row>
                            <Label id="dataPadItemIncompletoLabel" for="pad-item-hist-data-inc-comp-dataPadItemIncompleto">
                              <Translate contentKey="generadorApp.padItemHistDataIncComp.dataPadItemIncompleto">
                                Data Pad Item Incompleto
                              </Translate>
                            </Label>
                            <AvInput
                              id="pad-item-hist-data-inc-comp-dataPadItemIncompleto"
                              type="datetime-local"
                              className="form-control"
                              name="dataPadItemIncompleto"
                              placeholder={'YYYY-MM-DD HH:mm'}
                              value={this.state.dataPadItemIncompleto ? convertDateTimeFromServer(this.state.dataPadItemIncompleto) : null}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dataPadItemCompleto' ? (
                        <Col md="3">
                          <Row>
                            <Label id="dataPadItemCompletoLabel" for="pad-item-hist-data-inc-comp-dataPadItemCompleto">
                              <Translate contentKey="generadorApp.padItemHistDataIncComp.dataPadItemCompleto">
                                Data Pad Item Completo
                              </Translate>
                            </Label>
                            <AvInput
                              id="pad-item-hist-data-inc-comp-dataPadItemCompleto"
                              type="datetime-local"
                              className="form-control"
                              name="dataPadItemCompleto"
                              placeholder={'YYYY-MM-DD HH:mm'}
                              value={this.state.dataPadItemCompleto ? convertDateTimeFromServer(this.state.dataPadItemCompleto) : null}
                            />
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

              {padItemHistDataIncCompList && padItemHistDataIncCompList.length > 0 ? (
                <Table responsive aria-describedby="pad-item-hist-data-inc-comp-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'idPadItem' ? (
                        <th className="hand" onClick={this.sort('idPadItem')}>
                          <Translate contentKey="generadorApp.padItemHistDataIncComp.idPadItem">Id Pad Item</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'dataPadItemIncompleto' ? (
                        <th className="hand" onClick={this.sort('dataPadItemIncompleto')}>
                          <Translate contentKey="generadorApp.padItemHistDataIncComp.dataPadItemIncompleto">
                            Data Pad Item Incompleto
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'dataPadItemCompleto' ? (
                        <th className="hand" onClick={this.sort('dataPadItemCompleto')}>
                          <Translate contentKey="generadorApp.padItemHistDataIncComp.dataPadItemCompleto">Data Pad Item Completo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {padItemHistDataIncCompList.map((padItemHistDataIncComp, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${padItemHistDataIncComp.id}`} color="link" size="sm">
                            {padItemHistDataIncComp.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'idPadItem' ? <td>{padItemHistDataIncComp.idPadItem}</td> : null}

                        {this.state.baseFilters !== 'dataPadItemIncompleto' ? (
                          <td>
                            <TextFormat type="date" value={padItemHistDataIncComp.dataPadItemIncompleto} format={APP_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'dataPadItemCompleto' ? (
                          <td>
                            <TextFormat type="date" value={padItemHistDataIncComp.dataPadItemCompleto} format={APP_DATE_FORMAT} />
                          </td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button
                              tag={Link}
                              to={`${match.url}/${padItemHistDataIncComp.id}?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${padItemHistDataIncComp.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${padItemHistDataIncComp.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.padItemHistDataIncComp.home.notFound">
                    No Pad Item Hist Data Inc Comps found
                  </Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={padItemHistDataIncCompList && padItemHistDataIncCompList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ padItemHistDataIncComp, ...storeState }: IRootState) => ({
  padItemHistDataIncCompList: padItemHistDataIncComp.entities,
  totalItems: padItemHistDataIncComp.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadItemHistDataIncComp);
