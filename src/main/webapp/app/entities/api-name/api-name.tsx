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
import { getApiNameState, IApiNameBaseState, getEntities } from './api-name.reducer';
import { IApiName } from 'app/shared/model/api-name.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IApiNameProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IApiNameState extends IApiNameBaseState, IPaginationBaseState {}

export class ApiName extends React.Component<IApiNameProps, IApiNameState> {
  private myFormRef: any;

  constructor(props: IApiNameProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getApiNameState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        apiName: '',
        apiReceiver: '',
        apiObs: '',
        ativo: ''
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
      'apiName=' +
      this.state.apiName +
      '&' +
      'apiReceiver=' +
      this.state.apiReceiver +
      '&' +
      'apiObs=' +
      this.state.apiObs +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { apiName, apiReceiver, apiObs, ativo, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(apiName, apiReceiver, apiObs, ativo, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { apiNameList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Api Names</span>
          <Button id="togglerFilterApiName" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.apiName.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.apiName.home.createLabel">Create a new Api Name</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Api Names</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterApiName">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'apiName' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="apiNameLabel" for="api-name-apiName">
                              <Translate contentKey="generadorApp.apiName.apiName">Api Name</Translate>
                            </Label>

                            <AvInput type="text" name="apiName" id="api-name-apiName" value={this.state.apiName} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'apiReceiver' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="apiReceiverLabel" for="api-name-apiReceiver">
                              <Translate contentKey="generadorApp.apiName.apiReceiver">Api Receiver</Translate>
                            </Label>

                            <AvInput type="text" name="apiReceiver" id="api-name-apiReceiver" value={this.state.apiReceiver} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'apiObs' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="apiObsLabel" for="api-name-apiObs">
                              <Translate contentKey="generadorApp.apiName.apiObs">Api Obs</Translate>
                            </Label>

                            <AvInput type="text" name="apiObs" id="api-name-apiObs" value={this.state.apiObs} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ativo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ativoLabel" for="api-name-ativo">
                              <Translate contentKey="generadorApp.apiName.ativo">Ativo</Translate>
                            </Label>
                            <AvInput type="string" name="ativo" id="api-name-ativo" value={this.state.ativo} />
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.apiName.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.apiName.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {apiNameList && apiNameList.length > 0 ? (
                <Table responsive aria-describedby="api-name-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'apiName' ? (
                        <th className="hand" onClick={this.sort('apiName')}>
                          <Translate contentKey="generadorApp.apiName.apiName">Api Name</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'apiReceiver' ? (
                        <th className="hand" onClick={this.sort('apiReceiver')}>
                          <Translate contentKey="generadorApp.apiName.apiReceiver">Api Receiver</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'apiObs' ? (
                        <th className="hand" onClick={this.sort('apiObs')}>
                          <Translate contentKey="generadorApp.apiName.apiObs">Api Obs</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ativo' ? (
                        <th className="hand" onClick={this.sort('ativo')}>
                          <Translate contentKey="generadorApp.apiName.ativo">Ativo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {apiNameList.map((apiName, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${apiName.id}`} color="link" size="sm">
                            {apiName.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'apiName' ? <td>{apiName.apiName}</td> : null}

                        {this.state.baseFilters !== 'apiReceiver' ? <td>{apiName.apiReceiver}</td> : null}

                        {this.state.baseFilters !== 'apiObs' ? <td>{apiName.apiObs}</td> : null}

                        {this.state.baseFilters !== 'ativo' ? <td>{apiName.ativo}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${apiName.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${apiName.id}/edit?${this.getFiltersURL()}`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${apiName.id}/delete?${this.getFiltersURL()}`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.apiName.home.notFound">No Api Names found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={apiNameList && apiNameList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ apiName, ...storeState }: IRootState) => ({
  apiNameList: apiName.entities,
  totalItems: apiName.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApiName);
