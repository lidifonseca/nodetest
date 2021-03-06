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
import { getApiReturnState, IApiReturnBaseState, getEntities } from './api-return.reducer';
import { IApiReturn } from 'app/shared/model/api-return.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IApiReturnProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IApiReturnState extends IApiReturnBaseState, IPaginationBaseState {}

export class ApiReturn extends React.Component<IApiReturnProps, IApiReturnState> {
  private myFormRef: any;

  constructor(props: IApiReturnProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getApiReturnState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idApiName: '',
        apiReturn: '',
        apiType: '',
        obs: '',
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
      'idApiName=' +
      this.state.idApiName +
      '&' +
      'apiReturn=' +
      this.state.apiReturn +
      '&' +
      'apiType=' +
      this.state.apiType +
      '&' +
      'obs=' +
      this.state.obs +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idApiName, apiReturn, apiType, obs, ativo, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(idApiName, apiReturn, apiType, obs, ativo, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { apiReturnList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Api Returns</span>
          <Button id="togglerFilterApiReturn" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.apiReturn.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.apiReturn.home.createLabel">Create a new Api Return</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Api Returns</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterApiReturn">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idApiName' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idApiNameLabel" for="api-return-idApiName">
                              <Translate contentKey="generadorApp.apiReturn.idApiName">Id Api Name</Translate>
                            </Label>
                            <AvInput type="string" name="idApiName" id="api-return-idApiName" value={this.state.idApiName} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'apiReturn' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="apiReturnLabel" for="api-return-apiReturn">
                              <Translate contentKey="generadorApp.apiReturn.apiReturn">Api Return</Translate>
                            </Label>

                            <AvInput type="text" name="apiReturn" id="api-return-apiReturn" value={this.state.apiReturn} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'apiType' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="apiTypeLabel" for="api-return-apiType">
                              <Translate contentKey="generadorApp.apiReturn.apiType">Api Type</Translate>
                            </Label>

                            <AvInput type="text" name="apiType" id="api-return-apiType" value={this.state.apiType} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'obs' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="obsLabel" for="api-return-obs">
                              <Translate contentKey="generadorApp.apiReturn.obs">Obs</Translate>
                            </Label>

                            <AvInput type="text" name="obs" id="api-return-obs" value={this.state.obs} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ativo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ativoLabel" check>
                              <AvInput id="api-return-ativo" type="checkbox" className="form-control" name="ativo" />
                              <Translate contentKey="generadorApp.apiReturn.ativo">Ativo</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.apiReturn.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.apiReturn.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {apiReturnList && apiReturnList.length > 0 ? (
                <Table responsive aria-describedby="api-return-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'idApiName' ? (
                        <th className="hand" onClick={this.sort('idApiName')}>
                          <Translate contentKey="generadorApp.apiReturn.idApiName">Id Api Name</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'apiReturn' ? (
                        <th className="hand" onClick={this.sort('apiReturn')}>
                          <Translate contentKey="generadorApp.apiReturn.apiReturn">Api Return</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'apiType' ? (
                        <th className="hand" onClick={this.sort('apiType')}>
                          <Translate contentKey="generadorApp.apiReturn.apiType">Api Type</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'obs' ? (
                        <th className="hand" onClick={this.sort('obs')}>
                          <Translate contentKey="generadorApp.apiReturn.obs">Obs</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ativo' ? (
                        <th className="hand" onClick={this.sort('ativo')}>
                          <Translate contentKey="generadorApp.apiReturn.ativo">Ativo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {apiReturnList.map((apiReturn, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${apiReturn.id}`} color="link" size="sm">
                            {apiReturn.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'idApiName' ? <td>{apiReturn.idApiName}</td> : null}

                        {this.state.baseFilters !== 'apiReturn' ? <td>{apiReturn.apiReturn}</td> : null}

                        {this.state.baseFilters !== 'apiType' ? <td>{apiReturn.apiType}</td> : null}

                        {this.state.baseFilters !== 'obs' ? <td>{apiReturn.obs}</td> : null}

                        {this.state.baseFilters !== 'ativo' ? <td>{apiReturn.ativo ? 'true' : 'false'}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${apiReturn.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${apiReturn.id}/edit?${this.getFiltersURL()}`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${apiReturn.id}/delete?${this.getFiltersURL()}`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.apiReturn.home.notFound">No Api Returns found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={apiReturnList && apiReturnList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ apiReturn, ...storeState }: IRootState) => ({
  apiReturnList: apiReturn.entities,
  totalItems: apiReturn.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApiReturn);
