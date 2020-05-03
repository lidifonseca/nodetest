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
import { getEntities } from './phinxlog.reducer';
import { IPhinxlog } from 'app/shared/model/phinxlog.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPhinxlogProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPhinxlogBaseState {
  version: any;
  migrationName: any;
  startTime: any;
  endTime: any;
  breakpoint: any;
}
export interface IPhinxlogState extends IPhinxlogBaseState, IPaginationBaseState {}

export class Phinxlog extends React.Component<IPhinxlogProps, IPhinxlogState> {
  private myFormRef: any;

  constructor(props: IPhinxlogProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getPhinxlogState(this.props.location)
    };
  }

  getPhinxlogState = (location): IPhinxlogBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const version = url.searchParams.get('version') || '';
    const migrationName = url.searchParams.get('migrationName') || '';
    const startTime = url.searchParams.get('startTime') || '';
    const endTime = url.searchParams.get('endTime') || '';
    const breakpoint = url.searchParams.get('breakpoint') || '';

    return {
      version,
      migrationName,
      startTime,
      endTime,
      breakpoint
    };
  };

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        version: '',
        migrationName: '',
        startTime: '',
        endTime: '',
        breakpoint: ''
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
      'version=' +
      this.state.version +
      '&' +
      'migrationName=' +
      this.state.migrationName +
      '&' +
      'startTime=' +
      this.state.startTime +
      '&' +
      'endTime=' +
      this.state.endTime +
      '&' +
      'breakpoint=' +
      this.state.breakpoint +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { version, migrationName, startTime, endTime, breakpoint, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(version, migrationName, startTime, endTime, breakpoint, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { phinxlogList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Phinxlogs</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Phinxlogs</span>
              <Button id="togglerFilterPhinxlog" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.phinxlog.home.createLabel">Create a new Phinxlog</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPhinxlog">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="versionLabel" for="phinxlog-version">
                            <Translate contentKey="generadorApp.phinxlog.version">Version</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="version"
                            id="phinxlog-version"
                            value={this.state.version}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="migrationNameLabel" for="phinxlog-migrationName">
                            <Translate contentKey="generadorApp.phinxlog.migrationName">Migration Name</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="migrationName"
                            id="phinxlog-migrationName"
                            value={this.state.migrationName}
                            validate={{
                              maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="startTimeLabel" for="phinxlog-startTime">
                            <Translate contentKey="generadorApp.phinxlog.startTime">Start Time</Translate>
                          </Label>
                          <AvInput
                            id="phinxlog-startTime"
                            type="datetime-local"
                            className="form-control"
                            name="startTime"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.startTime ? convertDateTimeFromServer(this.state.startTime) : null}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="endTimeLabel" for="phinxlog-endTime">
                            <Translate contentKey="generadorApp.phinxlog.endTime">End Time</Translate>
                          </Label>
                          <AvInput
                            id="phinxlog-endTime"
                            type="datetime-local"
                            className="form-control"
                            name="endTime"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.endTime ? convertDateTimeFromServer(this.state.endTime) : null}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="breakpointLabel" check>
                            <AvInput id="phinxlog-breakpoint" type="checkbox" className="form-control" name="breakpoint" />
                            <Translate contentKey="generadorApp.phinxlog.breakpoint">Breakpoint</Translate>
                          </Label>
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

              {phinxlogList && phinxlogList.length > 0 ? (
                <Table responsive aria-describedby="phinxlog-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('version')}>
                        <Translate contentKey="generadorApp.phinxlog.version">Version</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('migrationName')}>
                        <Translate contentKey="generadorApp.phinxlog.migrationName">Migration Name</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('startTime')}>
                        <Translate contentKey="generadorApp.phinxlog.startTime">Start Time</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('endTime')}>
                        <Translate contentKey="generadorApp.phinxlog.endTime">End Time</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('breakpoint')}>
                        <Translate contentKey="generadorApp.phinxlog.breakpoint">Breakpoint</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {phinxlogList.map((phinxlog, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${phinxlog.id}`} color="link" size="sm">
                            {phinxlog.id}
                          </Button>
                        </td>

                        <td>{phinxlog.version}</td>

                        <td>{phinxlog.migrationName}</td>

                        <td>
                          <TextFormat type="date" value={phinxlog.startTime} format={APP_DATE_FORMAT} />
                        </td>

                        <td>
                          <TextFormat type="date" value={phinxlog.endTime} format={APP_DATE_FORMAT} />
                        </td>

                        <td>{phinxlog.breakpoint ? 'true' : 'false'}</td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${phinxlog.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${phinxlog.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${phinxlog.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.phinxlog.home.notFound">No Phinxlogs found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={phinxlogList && phinxlogList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ phinxlog, ...storeState }: IRootState) => ({
  phinxlogList: phinxlog.entities,
  totalItems: phinxlog.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Phinxlog);
