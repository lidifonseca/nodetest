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
import { getEntities } from './notificacao-config.reducer';
import { INotificacaoConfig } from 'app/shared/model/notificacao-config.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface INotificacaoConfigProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface INotificacaoConfigBaseState {
  criadoEm: any;
  titulo: any;
  referencia: any;
  descricao: any;
  ativo: any;
  envioObrigatorio: any;
  serveProfissional: any;
  servePaciente: any;
}
export interface INotificacaoConfigState extends INotificacaoConfigBaseState, IPaginationBaseState {}

export class NotificacaoConfig extends React.Component<INotificacaoConfigProps, INotificacaoConfigState> {
  private myFormRef: any;

  constructor(props: INotificacaoConfigProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getNotificacaoConfigState(this.props.location)
    };
  }

  getNotificacaoConfigState = (location): INotificacaoConfigBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const criadoEm = url.searchParams.get('criadoEm') || '';
    const titulo = url.searchParams.get('titulo') || '';
    const referencia = url.searchParams.get('referencia') || '';
    const descricao = url.searchParams.get('descricao') || '';
    const ativo = url.searchParams.get('ativo') || '';
    const envioObrigatorio = url.searchParams.get('envioObrigatorio') || '';
    const serveProfissional = url.searchParams.get('serveProfissional') || '';
    const servePaciente = url.searchParams.get('servePaciente') || '';

    return {
      criadoEm,
      titulo,
      referencia,
      descricao,
      ativo,
      envioObrigatorio,
      serveProfissional,
      servePaciente
    };
  };

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        criadoEm: '',
        titulo: '',
        referencia: '',
        descricao: '',
        ativo: '',
        envioObrigatorio: '',
        serveProfissional: '',
        servePaciente: ''
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
      'criadoEm=' +
      this.state.criadoEm +
      '&' +
      'titulo=' +
      this.state.titulo +
      '&' +
      'referencia=' +
      this.state.referencia +
      '&' +
      'descricao=' +
      this.state.descricao +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'envioObrigatorio=' +
      this.state.envioObrigatorio +
      '&' +
      'serveProfissional=' +
      this.state.serveProfissional +
      '&' +
      'servePaciente=' +
      this.state.servePaciente +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      criadoEm,
      titulo,
      referencia,
      descricao,
      ativo,
      envioObrigatorio,
      serveProfissional,
      servePaciente,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      criadoEm,
      titulo,
      referencia,
      descricao,
      ativo,
      envioObrigatorio,
      serveProfissional,
      servePaciente,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { notificacaoConfigList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Notificacao Configs</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Notificacao Configs</span>
              <Button id="togglerFilterNotificacaoConfig" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.notificacaoConfig.home.createLabel">Create a new Notificacao Config</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterNotificacaoConfig">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="criadoEmLabel" for="notificacao-config-criadoEm">
                            <Translate contentKey="generadorApp.notificacaoConfig.criadoEm">Criado Em</Translate>
                          </Label>
                          <AvInput
                            id="notificacao-config-criadoEm"
                            type="datetime-local"
                            className="form-control"
                            name="criadoEm"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.criadoEm ? convertDateTimeFromServer(this.state.criadoEm) : null}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="tituloLabel" for="notificacao-config-titulo">
                            <Translate contentKey="generadorApp.notificacaoConfig.titulo">Titulo</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="titulo"
                            id="notificacao-config-titulo"
                            value={this.state.titulo}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="referenciaLabel" for="notificacao-config-referencia">
                            <Translate contentKey="generadorApp.notificacaoConfig.referencia">Referencia</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="referencia"
                            id="notificacao-config-referencia"
                            value={this.state.referencia}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) }
                            }}
                          />
                          <UncontrolledTooltip target="referenciaLabel">
                            <Translate contentKey="generadorApp.notificacaoConfig.help.referencia" />
                          </UncontrolledTooltip>
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="descricaoLabel" for="notificacao-config-descricao">
                            <Translate contentKey="generadorApp.notificacaoConfig.descricao">Descricao</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="descricao"
                            id="notificacao-config-descricao"
                            value={this.state.descricao}
                            validate={{
                              maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" check>
                            <AvInput id="notificacao-config-ativo" type="checkbox" className="form-control" name="ativo" />
                            <Translate contentKey="generadorApp.notificacaoConfig.ativo">Ativo</Translate>
                          </Label>
                          <UncontrolledTooltip target="ativoLabel">
                            <Translate contentKey="generadorApp.notificacaoConfig.help.ativo" />
                          </UncontrolledTooltip>
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="envioObrigatorioLabel" check>
                            <AvInput
                              id="notificacao-config-envioObrigatorio"
                              type="checkbox"
                              className="form-control"
                              name="envioObrigatorio"
                            />
                            <Translate contentKey="generadorApp.notificacaoConfig.envioObrigatorio">Envio Obrigatorio</Translate>
                          </Label>
                          <UncontrolledTooltip target="envioObrigatorioLabel">
                            <Translate contentKey="generadorApp.notificacaoConfig.help.envioObrigatorio" />
                          </UncontrolledTooltip>
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="serveProfissionalLabel" check>
                            <AvInput
                              id="notificacao-config-serveProfissional"
                              type="checkbox"
                              className="form-control"
                              name="serveProfissional"
                            />
                            <Translate contentKey="generadorApp.notificacaoConfig.serveProfissional">Serve Profissional</Translate>
                          </Label>
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="servePacienteLabel" check>
                            <AvInput id="notificacao-config-servePaciente" type="checkbox" className="form-control" name="servePaciente" />
                            <Translate contentKey="generadorApp.notificacaoConfig.servePaciente">Serve Paciente</Translate>
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

              {notificacaoConfigList && notificacaoConfigList.length > 0 ? (
                <Table responsive aria-describedby="notificacao-config-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('criadoEm')}>
                        <Translate contentKey="generadorApp.notificacaoConfig.criadoEm">Criado Em</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('titulo')}>
                        <Translate contentKey="generadorApp.notificacaoConfig.titulo">Titulo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('referencia')}>
                        <Translate contentKey="generadorApp.notificacaoConfig.referencia">Referencia</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('descricao')}>
                        <Translate contentKey="generadorApp.notificacaoConfig.descricao">Descricao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.notificacaoConfig.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('envioObrigatorio')}>
                        <Translate contentKey="generadorApp.notificacaoConfig.envioObrigatorio">Envio Obrigatorio</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('serveProfissional')}>
                        <Translate contentKey="generadorApp.notificacaoConfig.serveProfissional">Serve Profissional</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('servePaciente')}>
                        <Translate contentKey="generadorApp.notificacaoConfig.servePaciente">Serve Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {notificacaoConfigList.map((notificacaoConfig, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${notificacaoConfig.id}`} color="link" size="sm">
                            {notificacaoConfig.id}
                          </Button>
                        </td>

                        <td>
                          <TextFormat type="date" value={notificacaoConfig.criadoEm} format={APP_DATE_FORMAT} />
                        </td>

                        <td>{notificacaoConfig.titulo}</td>

                        <td>{notificacaoConfig.referencia}</td>

                        <td>{notificacaoConfig.descricao}</td>

                        <td>{notificacaoConfig.ativo ? 'true' : 'false'}</td>

                        <td>{notificacaoConfig.envioObrigatorio ? 'true' : 'false'}</td>

                        <td>{notificacaoConfig.serveProfissional ? 'true' : 'false'}</td>

                        <td>{notificacaoConfig.servePaciente ? 'true' : 'false'}</td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${notificacaoConfig.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${notificacaoConfig.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${notificacaoConfig.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.notificacaoConfig.home.notFound">No Notificacao Configs found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={notificacaoConfigList && notificacaoConfigList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ notificacaoConfig, ...storeState }: IRootState) => ({
  notificacaoConfigList: notificacaoConfig.entities,
  totalItems: notificacaoConfig.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NotificacaoConfig);
