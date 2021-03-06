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
import { getNotificacaoConfigUsuarioState, INotificacaoConfigUsuarioBaseState, getEntities } from './notificacao-config-usuario.reducer';
import { INotificacaoConfigUsuario } from 'app/shared/model/notificacao-config-usuario.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface INotificacaoConfigUsuarioProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface INotificacaoConfigUsuarioState extends INotificacaoConfigUsuarioBaseState, IPaginationBaseState {}

export class NotificacaoConfigUsuario extends React.Component<INotificacaoConfigUsuarioProps, INotificacaoConfigUsuarioState> {
  private myFormRef: any;

  constructor(props: INotificacaoConfigUsuarioProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getNotificacaoConfigUsuarioState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        notificacaoConfigId: '',
        profissionalId: '',
        pacienteId: '',
        atualizadoEm: '',
        atualizadoPor: '',
        enviarPush: '',
        enviarEmail: '',
        observacao: ''
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
      'notificacaoConfigId=' +
      this.state.notificacaoConfigId +
      '&' +
      'profissionalId=' +
      this.state.profissionalId +
      '&' +
      'pacienteId=' +
      this.state.pacienteId +
      '&' +
      'atualizadoEm=' +
      this.state.atualizadoEm +
      '&' +
      'atualizadoPor=' +
      this.state.atualizadoPor +
      '&' +
      'enviarPush=' +
      this.state.enviarPush +
      '&' +
      'enviarEmail=' +
      this.state.enviarEmail +
      '&' +
      'observacao=' +
      this.state.observacao +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      notificacaoConfigId,
      profissionalId,
      pacienteId,
      atualizadoEm,
      atualizadoPor,
      enviarPush,
      enviarEmail,
      observacao,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      notificacaoConfigId,
      profissionalId,
      pacienteId,
      atualizadoEm,
      atualizadoPor,
      enviarPush,
      enviarEmail,
      observacao,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { notificacaoConfigUsuarioList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Notificacao Config Usuarios</span>
          <Button id="togglerFilterNotificacaoConfigUsuario" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.notificacaoConfigUsuario.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.notificacaoConfigUsuario.home.createLabel">
              Create a new Notificacao Config Usuario
            </Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Notificacao Config Usuarios</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterNotificacaoConfigUsuario">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'notificacaoConfigId' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="notificacaoConfigIdLabel" for="notificacao-config-usuario-notificacaoConfigId">
                              <Translate contentKey="generadorApp.notificacaoConfigUsuario.notificacaoConfigId">
                                Notificacao Config Id
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="notificacaoConfigId"
                              id="notificacao-config-usuario-notificacaoConfigId"
                              value={this.state.notificacaoConfigId}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'profissionalId' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="profissionalIdLabel" for="notificacao-config-usuario-profissionalId">
                              <Translate contentKey="generadorApp.notificacaoConfigUsuario.profissionalId">Profissional Id</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="profissionalId"
                              id="notificacao-config-usuario-profissionalId"
                              value={this.state.profissionalId}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'pacienteId' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="pacienteIdLabel" for="notificacao-config-usuario-pacienteId">
                              <Translate contentKey="generadorApp.notificacaoConfigUsuario.pacienteId">Paciente Id</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="pacienteId"
                              id="notificacao-config-usuario-pacienteId"
                              value={this.state.pacienteId}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'atualizadoEm' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="atualizadoEmLabel" for="notificacao-config-usuario-atualizadoEm">
                              <Translate contentKey="generadorApp.notificacaoConfigUsuario.atualizadoEm">Atualizado Em</Translate>
                            </Label>
                            <AvInput
                              id="notificacao-config-usuario-atualizadoEm"
                              type="datetime-local"
                              className="form-control"
                              name="atualizadoEm"
                              placeholder={'YYYY-MM-DD HH:mm'}
                              value={this.state.atualizadoEm ? convertDateTimeFromServer(this.state.atualizadoEm) : null}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'atualizadoPor' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="atualizadoPorLabel" for="notificacao-config-usuario-atualizadoPor">
                              <Translate contentKey="generadorApp.notificacaoConfigUsuario.atualizadoPor">Atualizado Por</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="atualizadoPor"
                              id="notificacao-config-usuario-atualizadoPor"
                              value={this.state.atualizadoPor}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'enviarPush' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="enviarPushLabel" check>
                              <AvInput
                                id="notificacao-config-usuario-enviarPush"
                                type="checkbox"
                                className="form-control"
                                name="enviarPush"
                              />
                              <Translate contentKey="generadorApp.notificacaoConfigUsuario.enviarPush">Enviar Push</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'enviarEmail' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="enviarEmailLabel" check>
                              <AvInput
                                id="notificacao-config-usuario-enviarEmail"
                                type="checkbox"
                                className="form-control"
                                name="enviarEmail"
                              />
                              <Translate contentKey="generadorApp.notificacaoConfigUsuario.enviarEmail">Enviar Email</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'observacao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="observacaoLabel" for="notificacao-config-usuario-observacao">
                              <Translate contentKey="generadorApp.notificacaoConfigUsuario.observacao">Observacao</Translate>
                            </Label>

                            <AvInput
                              type="text"
                              name="observacao"
                              id="notificacao-config-usuario-observacao"
                              value={this.state.observacao}
                            />
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.notificacaoConfigUsuario.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.notificacaoConfigUsuario.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {notificacaoConfigUsuarioList && notificacaoConfigUsuarioList.length > 0 ? (
                <Table responsive aria-describedby="notificacao-config-usuario-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'notificacaoConfigId' ? (
                        <th className="hand" onClick={this.sort('notificacaoConfigId')}>
                          <Translate contentKey="generadorApp.notificacaoConfigUsuario.notificacaoConfigId">
                            Notificacao Config Id
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'profissionalId' ? (
                        <th className="hand" onClick={this.sort('profissionalId')}>
                          <Translate contentKey="generadorApp.notificacaoConfigUsuario.profissionalId">Profissional Id</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'pacienteId' ? (
                        <th className="hand" onClick={this.sort('pacienteId')}>
                          <Translate contentKey="generadorApp.notificacaoConfigUsuario.pacienteId">Paciente Id</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'atualizadoEm' ? (
                        <th className="hand" onClick={this.sort('atualizadoEm')}>
                          <Translate contentKey="generadorApp.notificacaoConfigUsuario.atualizadoEm">Atualizado Em</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'atualizadoPor' ? (
                        <th className="hand" onClick={this.sort('atualizadoPor')}>
                          <Translate contentKey="generadorApp.notificacaoConfigUsuario.atualizadoPor">Atualizado Por</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'enviarPush' ? (
                        <th className="hand" onClick={this.sort('enviarPush')}>
                          <Translate contentKey="generadorApp.notificacaoConfigUsuario.enviarPush">Enviar Push</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'enviarEmail' ? (
                        <th className="hand" onClick={this.sort('enviarEmail')}>
                          <Translate contentKey="generadorApp.notificacaoConfigUsuario.enviarEmail">Enviar Email</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'observacao' ? (
                        <th className="hand" onClick={this.sort('observacao')}>
                          <Translate contentKey="generadorApp.notificacaoConfigUsuario.observacao">Observacao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {notificacaoConfigUsuarioList.map((notificacaoConfigUsuario, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${notificacaoConfigUsuario.id}`} color="link" size="sm">
                            {notificacaoConfigUsuario.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'notificacaoConfigId' ? <td>{notificacaoConfigUsuario.notificacaoConfigId}</td> : null}

                        {this.state.baseFilters !== 'profissionalId' ? <td>{notificacaoConfigUsuario.profissionalId}</td> : null}

                        {this.state.baseFilters !== 'pacienteId' ? <td>{notificacaoConfigUsuario.pacienteId}</td> : null}

                        {this.state.baseFilters !== 'atualizadoEm' ? (
                          <td>
                            <TextFormat type="date" value={notificacaoConfigUsuario.atualizadoEm} format={APP_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'atualizadoPor' ? <td>{notificacaoConfigUsuario.atualizadoPor}</td> : null}

                        {this.state.baseFilters !== 'enviarPush' ? <td>{notificacaoConfigUsuario.enviarPush ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'enviarEmail' ? (
                          <td>{notificacaoConfigUsuario.enviarEmail ? 'true' : 'false'}</td>
                        ) : null}

                        {this.state.baseFilters !== 'observacao' ? <td>{notificacaoConfigUsuario.observacao}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button
                              tag={Link}
                              to={`${match.url}/${notificacaoConfigUsuario.id}?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${notificacaoConfigUsuario.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${notificacaoConfigUsuario.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.notificacaoConfigUsuario.home.notFound">
                    No Notificacao Config Usuarios found
                  </Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={notificacaoConfigUsuarioList && notificacaoConfigUsuarioList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ notificacaoConfigUsuario, ...storeState }: IRootState) => ({
  notificacaoConfigUsuarioList: notificacaoConfigUsuario.entities,
  totalItems: notificacaoConfigUsuario.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NotificacaoConfigUsuario);
