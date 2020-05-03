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
import { getEntities } from './usuario-panico.reducer';
import { IUsuarioPanico } from 'app/shared/model/usuario-panico.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IUsuarioPanicoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IUsuarioPanicoBaseState {
  idPaciente: any;
  idUsuario: any;
  idProfissional: any;
  observacao: any;
  resolvido: any;
  idUserResolvido: any;
  dataPost: any;
}
export interface IUsuarioPanicoState extends IUsuarioPanicoBaseState, IPaginationBaseState {}

export class UsuarioPanico extends React.Component<IUsuarioPanicoProps, IUsuarioPanicoState> {
  private myFormRef: any;

  constructor(props: IUsuarioPanicoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getUsuarioPanicoState(this.props.location)
    };
  }

  getUsuarioPanicoState = (location): IUsuarioPanicoBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const idPaciente = url.searchParams.get('idPaciente') || '';
    const idUsuario = url.searchParams.get('idUsuario') || '';
    const idProfissional = url.searchParams.get('idProfissional') || '';
    const observacao = url.searchParams.get('observacao') || '';
    const resolvido = url.searchParams.get('resolvido') || '';
    const idUserResolvido = url.searchParams.get('idUserResolvido') || '';
    const dataPost = url.searchParams.get('dataPost') || '';

    return {
      idPaciente,
      idUsuario,
      idProfissional,
      observacao,
      resolvido,
      idUserResolvido,
      dataPost
    };
  };

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idPaciente: '',
        idUsuario: '',
        idProfissional: '',
        observacao: '',
        resolvido: '',
        idUserResolvido: '',
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
      'idPaciente=' +
      this.state.idPaciente +
      '&' +
      'idUsuario=' +
      this.state.idUsuario +
      '&' +
      'idProfissional=' +
      this.state.idProfissional +
      '&' +
      'observacao=' +
      this.state.observacao +
      '&' +
      'resolvido=' +
      this.state.resolvido +
      '&' +
      'idUserResolvido=' +
      this.state.idUserResolvido +
      '&' +
      'dataPost=' +
      this.state.dataPost +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      idPaciente,
      idUsuario,
      idProfissional,
      observacao,
      resolvido,
      idUserResolvido,
      dataPost,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      idPaciente,
      idUsuario,
      idProfissional,
      observacao,
      resolvido,
      idUserResolvido,
      dataPost,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { usuarioPanicoList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Usuario Panicos</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Usuario Panicos</span>
              <Button id="togglerFilterUsuarioPanico" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.usuarioPanico.home.createLabel">Create a new Usuario Panico</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterUsuarioPanico">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="idPacienteLabel" for="usuario-panico-idPaciente">
                            <Translate contentKey="generadorApp.usuarioPanico.idPaciente">Id Paciente</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="idPaciente"
                            id="usuario-panico-idPaciente"
                            value={this.state.idPaciente}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idUsuarioLabel" for="usuario-panico-idUsuario">
                            <Translate contentKey="generadorApp.usuarioPanico.idUsuario">Id Usuario</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="idUsuario"
                            id="usuario-panico-idUsuario"
                            value={this.state.idUsuario}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idProfissionalLabel" for="usuario-panico-idProfissional">
                            <Translate contentKey="generadorApp.usuarioPanico.idProfissional">Id Profissional</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="idProfissional"
                            id="usuario-panico-idProfissional"
                            value={this.state.idProfissional}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="observacaoLabel" for="usuario-panico-observacao">
                            <Translate contentKey="generadorApp.usuarioPanico.observacao">Observacao</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="observacao"
                            id="usuario-panico-observacao"
                            value={this.state.observacao}
                            validate={{
                              maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="resolvidoLabel" for="usuario-panico-resolvido">
                            <Translate contentKey="generadorApp.usuarioPanico.resolvido">Resolvido</Translate>
                          </Label>
                          <AvInput type="string" name="resolvido" id="usuario-panico-resolvido" value={this.state.resolvido} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idUserResolvidoLabel" for="usuario-panico-idUserResolvido">
                            <Translate contentKey="generadorApp.usuarioPanico.idUserResolvido">Id User Resolvido</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="idUserResolvido"
                            id="usuario-panico-idUserResolvido"
                            value={this.state.idUserResolvido}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataPostLabel" for="usuario-panico-dataPost">
                            <Translate contentKey="generadorApp.usuarioPanico.dataPost">Data Post</Translate>
                          </Label>
                          <AvInput
                            id="usuario-panico-dataPost"
                            type="datetime-local"
                            className="form-control"
                            name="dataPost"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.dataPost ? convertDateTimeFromServer(this.state.dataPost) : null}
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

              {usuarioPanicoList && usuarioPanicoList.length > 0 ? (
                <Table responsive aria-describedby="usuario-panico-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idPaciente')}>
                        <Translate contentKey="generadorApp.usuarioPanico.idPaciente">Id Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idUsuario')}>
                        <Translate contentKey="generadorApp.usuarioPanico.idUsuario">Id Usuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idProfissional')}>
                        <Translate contentKey="generadorApp.usuarioPanico.idProfissional">Id Profissional</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('observacao')}>
                        <Translate contentKey="generadorApp.usuarioPanico.observacao">Observacao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('resolvido')}>
                        <Translate contentKey="generadorApp.usuarioPanico.resolvido">Resolvido</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idUserResolvido')}>
                        <Translate contentKey="generadorApp.usuarioPanico.idUserResolvido">Id User Resolvido</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataPost')}>
                        <Translate contentKey="generadorApp.usuarioPanico.dataPost">Data Post</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {usuarioPanicoList.map((usuarioPanico, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${usuarioPanico.id}`} color="link" size="sm">
                            {usuarioPanico.id}
                          </Button>
                        </td>

                        <td>{usuarioPanico.idPaciente}</td>

                        <td>{usuarioPanico.idUsuario}</td>

                        <td>{usuarioPanico.idProfissional}</td>

                        <td>{usuarioPanico.observacao}</td>

                        <td>{usuarioPanico.resolvido}</td>

                        <td>{usuarioPanico.idUserResolvido}</td>

                        <td>
                          <TextFormat type="date" value={usuarioPanico.dataPost} format={APP_DATE_FORMAT} />
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${usuarioPanico.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${usuarioPanico.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${usuarioPanico.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.usuarioPanico.home.notFound">No Usuario Panicos found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={usuarioPanicoList && usuarioPanicoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ usuarioPanico, ...storeState }: IRootState) => ({
  usuarioPanicoList: usuarioPanico.entities,
  totalItems: usuarioPanico.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UsuarioPanico);
