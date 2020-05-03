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
import { getEntities } from './log-user.reducer';
import { ILogUser } from 'app/shared/model/log-user.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IAcao } from 'app/shared/model/acao.model';
import { getEntities as getAcaos } from 'app/entities/acao/acao.reducer';
import { ITela } from 'app/shared/model/tela.model';
import { getEntities as getTelas } from 'app/entities/tela/tela.reducer';

export interface ILogUserProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ILogUserBaseState {
  idUsuario: any;
  descricao: any;
  dataPost: any;
  idAcao: any;
  idTela: any;
}
export interface ILogUserState extends ILogUserBaseState, IPaginationBaseState {}

export class LogUser extends React.Component<ILogUserProps, ILogUserState> {
  private myFormRef: any;

  constructor(props: ILogUserProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getLogUserState(this.props.location)
    };
  }

  getLogUserState = (location): ILogUserBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const idUsuario = url.searchParams.get('idUsuario') || '';
    const descricao = url.searchParams.get('descricao') || '';
    const dataPost = url.searchParams.get('dataPost') || '';

    const idAcao = url.searchParams.get('idAcao') || '';
    const idTela = url.searchParams.get('idTela') || '';

    return {
      idUsuario,
      descricao,
      dataPost,
      idAcao,
      idTela
    };
  };

  componentDidMount() {
    this.getEntities();

    this.props.getAcaos();
    this.props.getTelas();
  }

  cancelCourse = () => {
    this.setState(
      {
        idUsuario: '',
        descricao: '',
        dataPost: '',
        idAcao: '',
        idTela: ''
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
      'idUsuario=' +
      this.state.idUsuario +
      '&' +
      'descricao=' +
      this.state.descricao +
      '&' +
      'dataPost=' +
      this.state.dataPost +
      '&' +
      'idAcao=' +
      this.state.idAcao +
      '&' +
      'idTela=' +
      this.state.idTela +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idUsuario, descricao, dataPost, idAcao, idTela, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(idUsuario, descricao, dataPost, idAcao, idTela, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { acaos, telas, logUserList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Log Users</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Log Users</span>
              <Button id="togglerFilterLogUser" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.logUser.home.createLabel">Create a new Log User</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterLogUser">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="idUsuarioLabel" for="log-user-idUsuario">
                            <Translate contentKey="generadorApp.logUser.idUsuario">Id Usuario</Translate>
                          </Label>

                          <AvInput type="text" name="idUsuario" id="log-user-idUsuario" value={this.state.idUsuario} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="descricaoLabel" for="log-user-descricao">
                            <Translate contentKey="generadorApp.logUser.descricao">Descricao</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="descricao"
                            id="log-user-descricao"
                            value={this.state.descricao}
                            validate={{
                              maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataPostLabel" for="log-user-dataPost">
                            <Translate contentKey="generadorApp.logUser.dataPost">Data Post</Translate>
                          </Label>
                          <AvInput
                            id="log-user-dataPost"
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

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="log-user-idAcao">
                              <Translate contentKey="generadorApp.logUser.idAcao">Id Acao</Translate>
                            </Label>
                            <AvInput id="log-user-idAcao" type="select" className="form-control" name="idAcaoId">
                              <option value="" key="0" />
                              {acaos
                                ? acaos.map(otherEntity => (
                                    <option value={otherEntity.id} key={otherEntity.id}>
                                      {otherEntity.id}
                                    </option>
                                  ))
                                : null}
                            </AvInput>
                          </div>
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="log-user-idTela">
                              <Translate contentKey="generadorApp.logUser.idTela">Id Tela</Translate>
                            </Label>
                            <AvInput id="log-user-idTela" type="select" className="form-control" name="idTelaId">
                              <option value="" key="0" />
                              {telas
                                ? telas.map(otherEntity => (
                                    <option value={otherEntity.id} key={otherEntity.id}>
                                      {otherEntity.id}
                                    </option>
                                  ))
                                : null}
                            </AvInput>
                          </div>
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

              {logUserList && logUserList.length > 0 ? (
                <Table responsive aria-describedby="log-user-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idUsuario')}>
                        <Translate contentKey="generadorApp.logUser.idUsuario">Id Usuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('descricao')}>
                        <Translate contentKey="generadorApp.logUser.descricao">Descricao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataPost')}>
                        <Translate contentKey="generadorApp.logUser.dataPost">Data Post</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.logUser.idAcao">Id Acao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.logUser.idTela">Id Tela</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {logUserList.map((logUser, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${logUser.id}`} color="link" size="sm">
                            {logUser.id}
                          </Button>
                        </td>

                        <td>{logUser.idUsuario}</td>

                        <td>{logUser.descricao}</td>

                        <td>
                          <TextFormat type="date" value={logUser.dataPost} format={APP_DATE_FORMAT} />
                        </td>
                        <td>{logUser.idAcao ? <Link to={`acao/${logUser.idAcao.id}`}>{logUser.idAcao.id}</Link> : ''}</td>
                        <td>{logUser.idTela ? <Link to={`tela/${logUser.idTela.id}`}>{logUser.idTela.id}</Link> : ''}</td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${logUser.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${logUser.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${logUser.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.logUser.home.notFound">No Log Users found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={logUserList && logUserList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ logUser, ...storeState }: IRootState) => ({
  acaos: storeState.acao.entities,
  telas: storeState.tela.entities,
  logUserList: logUser.entities,
  totalItems: logUser.totalItems
});

const mapDispatchToProps = {
  getAcaos,
  getTelas,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LogUser);
