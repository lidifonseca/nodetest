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
import { getEntities } from './api-return.reducer';
import { IApiReturn } from 'app/shared/model/api-return.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IApiReturnProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IApiReturnBaseState {
  idApiName: any;
  apiReturn: any;
  apiType: any;
  obs: any;
  ativo: any;
  dataPost: any;
}
export interface IApiReturnState extends IApiReturnBaseState, IPaginationBaseState {}

export class ApiReturn extends React.Component<IApiReturnProps, IApiReturnState> {
  private myFormRef: any;

  constructor(props: IApiReturnProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getApiReturnState(this.props.location)
    };
  }

  getApiReturnState = (location): IApiReturnBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const idApiName = url.searchParams.get('idApiName') || '';
    const apiReturn = url.searchParams.get('apiReturn') || '';
    const apiType = url.searchParams.get('apiType') || '';
    const obs = url.searchParams.get('obs') || '';
    const ativo = url.searchParams.get('ativo') || '';
    const dataPost = url.searchParams.get('dataPost') || '';

    return {
      idApiName,
      apiReturn,
      apiType,
      obs,
      ativo,
      dataPost
    };
  };

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
        ativo: '',
        dataPost: ''
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
      'dataPost=' +
      this.state.dataPost +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idApiName, apiReturn, apiType, obs, ativo, dataPost, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(idApiName, apiReturn, apiType, obs, ativo, dataPost, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { apiReturnList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Api Returns</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Api Returns</span>
              <Button id="togglerFilterApiReturn" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.apiReturn.home.createLabel">Create a new Api Return</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterApiReturn">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="idApiNameLabel" for="api-return-idApiName">
                            <Translate contentKey="generadorApp.apiReturn.idApiName">Id Api Name</Translate>
                          </Label>
                          <AvInput type="string" name="idApiName" id="api-return-idApiName" value={this.state.idApiName} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="apiReturnLabel" for="api-return-apiReturn">
                            <Translate contentKey="generadorApp.apiReturn.apiReturn">Api Return</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="apiReturn"
                            id="api-return-apiReturn"
                            value={this.state.apiReturn}
                            validate={{
                              maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="apiTypeLabel" for="api-return-apiType">
                            <Translate contentKey="generadorApp.apiReturn.apiType">Api Type</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="apiType"
                            id="api-return-apiType"
                            value={this.state.apiType}
                            validate={{
                              maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="obsLabel" for="api-return-obs">
                            <Translate contentKey="generadorApp.apiReturn.obs">Obs</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="obs"
                            id="api-return-obs"
                            value={this.state.obs}
                            validate={{
                              maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="api-return-ativo">
                            <Translate contentKey="generadorApp.apiReturn.ativo">Ativo</Translate>
                          </Label>
                          <AvInput type="string" name="ativo" id="api-return-ativo" value={this.state.ativo} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataPostLabel" for="api-return-dataPost">
                            <Translate contentKey="generadorApp.apiReturn.dataPost">Data Post</Translate>
                          </Label>
                          <AvInput
                            id="api-return-dataPost"
                            type="datetime-local"
                            className="form-control"
                            name="dataPost"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.dataPost ? convertDateTimeFromServer(this.state.dataPost) : null}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') }
                            }}
                          />
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

              {apiReturnList && apiReturnList.length > 0 ? (
                <Table responsive aria-describedby="api-return-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idApiName')}>
                        <Translate contentKey="generadorApp.apiReturn.idApiName">Id Api Name</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('apiReturn')}>
                        <Translate contentKey="generadorApp.apiReturn.apiReturn">Api Return</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('apiType')}>
                        <Translate contentKey="generadorApp.apiReturn.apiType">Api Type</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('obs')}>
                        <Translate contentKey="generadorApp.apiReturn.obs">Obs</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.apiReturn.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataPost')}>
                        <Translate contentKey="generadorApp.apiReturn.dataPost">Data Post</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

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

                        <td>{apiReturn.idApiName}</td>

                        <td>{apiReturn.apiReturn}</td>

                        <td>{apiReturn.apiType}</td>

                        <td>{apiReturn.obs}</td>

                        <td>{apiReturn.ativo}</td>

                        <td>
                          <TextFormat type="date" value={apiReturn.dataPost} format={APP_DATE_FORMAT} />
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${apiReturn.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${apiReturn.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${apiReturn.id}/delete`} color="danger" size="sm">
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
