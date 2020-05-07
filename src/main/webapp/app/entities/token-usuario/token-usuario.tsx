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
import { getTokenUsuarioState, ITokenUsuarioBaseState, getEntities } from './token-usuario.reducer';
import { ITokenUsuario } from 'app/shared/model/token-usuario.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ITokenUsuarioProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ITokenUsuarioState extends ITokenUsuarioBaseState, IPaginationBaseState {}

export class TokenUsuario extends React.Component<ITokenUsuarioProps, ITokenUsuarioState> {
  private myFormRef: any;

  constructor(props: ITokenUsuarioProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getTokenUsuarioState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idPaciente: '',
        token: '',
        dataValida: ''
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
      'idPaciente=' +
      this.state.idPaciente +
      '&' +
      'token=' +
      this.state.token +
      '&' +
      'dataValida=' +
      this.state.dataValida +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idPaciente, token, dataValida, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(idPaciente, token, dataValida, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { tokenUsuarioList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Token Usuarios</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Token Usuarios</span>
              <Button id="togglerFilterTokenUsuario" className="btn btn-primary float-right jh-create-entity">
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
                <Translate contentKey="generadorApp.tokenUsuario.home.createLabel">Create a new Token Usuario</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterTokenUsuario">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idPaciente' ? (
                        <Col md="3">
                          <Row>
                            <Label id="idPacienteLabel" for="token-usuario-idPaciente">
                              <Translate contentKey="generadorApp.tokenUsuario.idPaciente">Id Paciente</Translate>
                            </Label>
                            <AvInput type="string" name="idPaciente" id="token-usuario-idPaciente" value={this.state.idPaciente} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'token' ? (
                        <Col md="3">
                          <Row>
                            <Label id="tokenLabel" for="token-usuario-token">
                              <Translate contentKey="generadorApp.tokenUsuario.token">Token</Translate>
                            </Label>

                            <AvInput type="text" name="token" id="token-usuario-token" value={this.state.token} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dataValida' ? (
                        <Col md="3">
                          <Row>
                            <Label id="dataValidaLabel" for="token-usuario-dataValida">
                              <Translate contentKey="generadorApp.tokenUsuario.dataValida">Data Valida</Translate>
                            </Label>
                            <AvInput
                              id="token-usuario-dataValida"
                              type="datetime-local"
                              className="form-control"
                              name="dataValida"
                              placeholder={'YYYY-MM-DD HH:mm'}
                              value={this.state.dataValida ? convertDateTimeFromServer(this.state.dataValida) : null}
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

              {tokenUsuarioList && tokenUsuarioList.length > 0 ? (
                <Table responsive aria-describedby="token-usuario-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'idPaciente' ? (
                        <th className="hand" onClick={this.sort('idPaciente')}>
                          <Translate contentKey="generadorApp.tokenUsuario.idPaciente">Id Paciente</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'token' ? (
                        <th className="hand" onClick={this.sort('token')}>
                          <Translate contentKey="generadorApp.tokenUsuario.token">Token</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'dataValida' ? (
                        <th className="hand" onClick={this.sort('dataValida')}>
                          <Translate contentKey="generadorApp.tokenUsuario.dataValida">Data Valida</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {tokenUsuarioList.map((tokenUsuario, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${tokenUsuario.id}`} color="link" size="sm">
                            {tokenUsuario.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'idPaciente' ? <td>{tokenUsuario.idPaciente}</td> : null}

                        {this.state.baseFilters !== 'token' ? <td>{tokenUsuario.token}</td> : null}

                        {this.state.baseFilters !== 'dataValida' ? (
                          <td>
                            <TextFormat type="date" value={tokenUsuario.dataValida} format={APP_DATE_FORMAT} />
                          </td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${tokenUsuario.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${tokenUsuario.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${tokenUsuario.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.tokenUsuario.home.notFound">No Token Usuarios found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={tokenUsuarioList && tokenUsuarioList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ tokenUsuario, ...storeState }: IRootState) => ({
  tokenUsuarioList: tokenUsuario.entities,
  totalItems: tokenUsuario.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TokenUsuario);
