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
import { getEntities } from './log-user-franquia.reducer';
import { ILogUserFranquia } from 'app/shared/model/log-user-franquia.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IAcao } from 'app/shared/model/acao.model';
import { getEntities as getAcaos } from 'app/entities/acao/acao.reducer';
import { ITela } from 'app/shared/model/tela.model';
import { getEntities as getTelas } from 'app/entities/tela/tela.reducer';
import { IFranquiaUsuario } from 'app/shared/model/franquia-usuario.model';
import { getEntities as getFranquiaUsuarios } from 'app/entities/franquia-usuario/franquia-usuario.reducer';

export interface ILogUserFranquiaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ILogUserFranquiaBaseState {
  descricao: any;
  dataPost: any;
  idAcao: any;
  idTela: any;
  idUsuario: any;
}
export interface ILogUserFranquiaState extends ILogUserFranquiaBaseState, IPaginationBaseState {}

export class LogUserFranquia extends React.Component<ILogUserFranquiaProps, ILogUserFranquiaState> {
  private myFormRef: any;

  constructor(props: ILogUserFranquiaProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getLogUserFranquiaState(this.props.location)
    };
  }

  getLogUserFranquiaState = (location): ILogUserFranquiaBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const descricao = url.searchParams.get('descricao') || '';
    const dataPost = url.searchParams.get('dataPost') || '';

    const idAcao = url.searchParams.get('idAcao') || '';
    const idTela = url.searchParams.get('idTela') || '';
    const idUsuario = url.searchParams.get('idUsuario') || '';

    return {
      descricao,
      dataPost,
      idAcao,
      idTela,
      idUsuario
    };
  };

  componentDidMount() {
    this.getEntities();

    this.props.getAcaos();
    this.props.getTelas();
    this.props.getFranquiaUsuarios();
  }

  cancelCourse = () => {
    this.setState(
      {
        descricao: '',
        dataPost: '',
        idAcao: '',
        idTela: '',
        idUsuario: ''
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
      'idUsuario=' +
      this.state.idUsuario +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { descricao, dataPost, idAcao, idTela, idUsuario, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(descricao, dataPost, idAcao, idTela, idUsuario, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { acaos, telas, franquiaUsuarios, logUserFranquiaList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Log User Franquias</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Log User Franquias</span>
              <Button id="togglerFilterLogUserFranquia" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.logUserFranquia.home.createLabel">Create a new Log User Franquia</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterLogUserFranquia">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="descricaoLabel" for="log-user-franquia-descricao">
                            <Translate contentKey="generadorApp.logUserFranquia.descricao">Descricao</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="descricao"
                            id="log-user-franquia-descricao"
                            value={this.state.descricao}
                            validate={{
                              maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataPostLabel" for="log-user-franquia-dataPost">
                            <Translate contentKey="generadorApp.logUserFranquia.dataPost">Data Post</Translate>
                          </Label>
                          <AvInput
                            id="log-user-franquia-dataPost"
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
                            <Label for="log-user-franquia-idAcao">
                              <Translate contentKey="generadorApp.logUserFranquia.idAcao">Id Acao</Translate>
                            </Label>
                            <AvInput id="log-user-franquia-idAcao" type="select" className="form-control" name="idAcaoId">
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
                            <Label for="log-user-franquia-idTela">
                              <Translate contentKey="generadorApp.logUserFranquia.idTela">Id Tela</Translate>
                            </Label>
                            <AvInput id="log-user-franquia-idTela" type="select" className="form-control" name="idTelaId">
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

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="log-user-franquia-idUsuario">
                              <Translate contentKey="generadorApp.logUserFranquia.idUsuario">Id Usuario</Translate>
                            </Label>
                            <AvInput id="log-user-franquia-idUsuario" type="select" className="form-control" name="idUsuarioId">
                              <option value="" key="0" />
                              {franquiaUsuarios
                                ? franquiaUsuarios.map(otherEntity => (
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

              {logUserFranquiaList && logUserFranquiaList.length > 0 ? (
                <Table responsive aria-describedby="log-user-franquia-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('descricao')}>
                        <Translate contentKey="generadorApp.logUserFranquia.descricao">Descricao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataPost')}>
                        <Translate contentKey="generadorApp.logUserFranquia.dataPost">Data Post</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.logUserFranquia.idAcao">Id Acao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.logUserFranquia.idTela">Id Tela</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.logUserFranquia.idUsuario">Id Usuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {logUserFranquiaList.map((logUserFranquia, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${logUserFranquia.id}`} color="link" size="sm">
                            {logUserFranquia.id}
                          </Button>
                        </td>

                        <td>{logUserFranquia.descricao}</td>

                        <td>
                          <TextFormat type="date" value={logUserFranquia.dataPost} format={APP_DATE_FORMAT} />
                        </td>
                        <td>
                          {logUserFranquia.idAcao ? <Link to={`acao/${logUserFranquia.idAcao.id}`}>{logUserFranquia.idAcao.id}</Link> : ''}
                        </td>
                        <td>
                          {logUserFranquia.idTela ? <Link to={`tela/${logUserFranquia.idTela.id}`}>{logUserFranquia.idTela.id}</Link> : ''}
                        </td>
                        <td>
                          {logUserFranquia.idUsuario ? (
                            <Link to={`franquia-usuario/${logUserFranquia.idUsuario.id}`}>{logUserFranquia.idUsuario.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${logUserFranquia.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${logUserFranquia.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${logUserFranquia.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.logUserFranquia.home.notFound">No Log User Franquias found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={logUserFranquiaList && logUserFranquiaList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ logUserFranquia, ...storeState }: IRootState) => ({
  acaos: storeState.acao.entities,
  telas: storeState.tela.entities,
  franquiaUsuarios: storeState.franquiaUsuario.entities,
  logUserFranquiaList: logUserFranquia.entities,
  totalItems: logUserFranquia.totalItems
});

const mapDispatchToProps = {
  getAcaos,
  getTelas,
  getFranquiaUsuarios,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LogUserFranquia);
