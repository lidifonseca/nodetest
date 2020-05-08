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
import { getPushnotificationEnviosState, IPushnotificationEnviosBaseState, getEntities } from './pushnotification-envios.reducer';
import { IPushnotificationEnvios } from 'app/shared/model/pushnotification-envios.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPushnotificationEnviosProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPushnotificationEnviosState extends IPushnotificationEnviosBaseState, IPaginationBaseState {}

export class PushnotificationEnvios extends React.Component<IPushnotificationEnviosProps, IPushnotificationEnviosState> {
  private myFormRef: any;

  constructor(props: IPushnotificationEnviosProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getPushnotificationEnviosState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        referencia: '',
        ultimoEnvio: ''
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
      'referencia=' +
      this.state.referencia +
      '&' +
      'ultimoEnvio=' +
      this.state.ultimoEnvio +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { referencia, ultimoEnvio, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(referencia, ultimoEnvio, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { pushnotificationEnviosList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Pushnotification Envios</span>
          <Button id="togglerFilterPushnotificationEnvios" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.pushnotificationEnvios.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.pushnotificationEnvios.home.createLabel">Create a new Pushnotification Envios</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pushnotification Envios</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPushnotificationEnvios">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'referencia' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="referenciaLabel" for="pushnotification-envios-referencia">
                              <Translate contentKey="generadorApp.pushnotificationEnvios.referencia">Referencia</Translate>
                            </Label>

                            <AvInput type="text" name="referencia" id="pushnotification-envios-referencia" value={this.state.referencia} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ultimoEnvio' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ultimoEnvioLabel" for="pushnotification-envios-ultimoEnvio">
                              <Translate contentKey="generadorApp.pushnotificationEnvios.ultimoEnvio">Ultimo Envio</Translate>
                            </Label>
                            <AvInput
                              id="pushnotification-envios-ultimoEnvio"
                              type="datetime-local"
                              className="form-control"
                              name="ultimoEnvio"
                              placeholder={'YYYY-MM-DD HH:mm'}
                              value={this.state.ultimoEnvio ? convertDateTimeFromServer(this.state.ultimoEnvio) : null}
                            />
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.pushnotificationEnvios.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.pushnotificationEnvios.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {pushnotificationEnviosList && pushnotificationEnviosList.length > 0 ? (
                <Table responsive aria-describedby="pushnotification-envios-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'referencia' ? (
                        <th className="hand" onClick={this.sort('referencia')}>
                          <Translate contentKey="generadorApp.pushnotificationEnvios.referencia">Referencia</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ultimoEnvio' ? (
                        <th className="hand" onClick={this.sort('ultimoEnvio')}>
                          <Translate contentKey="generadorApp.pushnotificationEnvios.ultimoEnvio">Ultimo Envio</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {pushnotificationEnviosList.map((pushnotificationEnvios, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${pushnotificationEnvios.id}`} color="link" size="sm">
                            {pushnotificationEnvios.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'referencia' ? <td>{pushnotificationEnvios.referencia}</td> : null}

                        {this.state.baseFilters !== 'ultimoEnvio' ? (
                          <td>
                            <TextFormat type="date" value={pushnotificationEnvios.ultimoEnvio} format={APP_DATE_FORMAT} />
                          </td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button
                              tag={Link}
                              to={`${match.url}/${pushnotificationEnvios.id}?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${pushnotificationEnvios.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${pushnotificationEnvios.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.pushnotificationEnvios.home.notFound">No Pushnotification Envios found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={pushnotificationEnviosList && pushnotificationEnviosList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ pushnotificationEnvios, ...storeState }: IRootState) => ({
  pushnotificationEnviosList: pushnotificationEnvios.entities,
  totalItems: pushnotificationEnvios.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PushnotificationEnvios);
