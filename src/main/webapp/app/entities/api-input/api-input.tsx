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
import { getEntities } from './api-input.reducer';
import { IApiInput } from 'app/shared/model/api-input.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IApiInputProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IApiInputBaseState {
  idApiName: any;
  apiInput: any;
  apiType: any;
  obs: any;
  ativo: any;
}
export interface IApiInputState extends IApiInputBaseState, IPaginationBaseState {}

export class ApiInput extends React.Component<IApiInputProps, IApiInputState> {
  private myFormRef: any;

  constructor(props: IApiInputProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getApiInputState(this.props.location)
    };
  }

  getApiInputState = (location): IApiInputBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const idApiName = url.searchParams.get('idApiName') || '';
    const apiInput = url.searchParams.get('apiInput') || '';
    const apiType = url.searchParams.get('apiType') || '';
    const obs = url.searchParams.get('obs') || '';
    const ativo = url.searchParams.get('ativo') || '';

    return {
      idApiName,
      apiInput,
      apiType,
      obs,
      ativo
    };
  };

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idApiName: '',
        apiInput: '',
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
      'apiInput=' +
      this.state.apiInput +
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
    const { idApiName, apiInput, apiType, obs, ativo, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(idApiName, apiInput, apiType, obs, ativo, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { apiInputList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Api Inputs</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Api Inputs</span>
              <Button id="togglerFilterApiInput" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.apiInput.home.createLabel">Create a new Api Input</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterApiInput">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="idApiNameLabel" for="api-input-idApiName">
                            <Translate contentKey="generadorApp.apiInput.idApiName">Id Api Name</Translate>
                          </Label>
                          <AvInput type="string" name="idApiName" id="api-input-idApiName" value={this.state.idApiName} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="apiInputLabel" for="api-input-apiInput">
                            <Translate contentKey="generadorApp.apiInput.apiInput">Api Input</Translate>
                          </Label>

                          <AvInput type="text" name="apiInput" id="api-input-apiInput" value={this.state.apiInput} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="apiTypeLabel" for="api-input-apiType">
                            <Translate contentKey="generadorApp.apiInput.apiType">Api Type</Translate>
                          </Label>

                          <AvInput type="text" name="apiType" id="api-input-apiType" value={this.state.apiType} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="obsLabel" for="api-input-obs">
                            <Translate contentKey="generadorApp.apiInput.obs">Obs</Translate>
                          </Label>

                          <AvInput type="text" name="obs" id="api-input-obs" value={this.state.obs} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="api-input-ativo">
                            <Translate contentKey="generadorApp.apiInput.ativo">Ativo</Translate>
                          </Label>
                          <AvInput type="string" name="ativo" id="api-input-ativo" value={this.state.ativo} />
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

              {apiInputList && apiInputList.length > 0 ? (
                <Table responsive aria-describedby="api-input-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idApiName')}>
                        <Translate contentKey="generadorApp.apiInput.idApiName">Id Api Name</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('apiInput')}>
                        <Translate contentKey="generadorApp.apiInput.apiInput">Api Input</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('apiType')}>
                        <Translate contentKey="generadorApp.apiInput.apiType">Api Type</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('obs')}>
                        <Translate contentKey="generadorApp.apiInput.obs">Obs</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.apiInput.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {apiInputList.map((apiInput, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${apiInput.id}`} color="link" size="sm">
                            {apiInput.id}
                          </Button>
                        </td>

                        <td>{apiInput.idApiName}</td>

                        <td>{apiInput.apiInput}</td>

                        <td>{apiInput.apiType}</td>

                        <td>{apiInput.obs}</td>

                        <td>{apiInput.ativo}</td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${apiInput.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${apiInput.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${apiInput.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.apiInput.home.notFound">No Api Inputs found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={apiInputList && apiInputList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ apiInput, ...storeState }: IRootState) => ({
  apiInputList: apiInput.entities,
  totalItems: apiInput.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApiInput);
