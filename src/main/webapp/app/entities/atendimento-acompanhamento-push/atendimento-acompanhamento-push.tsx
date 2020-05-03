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
import { getEntities } from './atendimento-acompanhamento-push.reducer';
import { IAtendimentoAcompanhamentoPush } from 'app/shared/model/atendimento-acompanhamento-push.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IAtendimentoAcompanhamentoPushProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IAtendimentoAcompanhamentoPushBaseState {
  atendimentoId: any;
  pacienteId: any;
  profissionalId: any;
  timestampAtendimento: any;
  nomePaciente: any;
  nomeProfissioinal: any;
  timestampConfirmacao: any;
}
export interface IAtendimentoAcompanhamentoPushState extends IAtendimentoAcompanhamentoPushBaseState, IPaginationBaseState {}

export class AtendimentoAcompanhamentoPush extends React.Component<
  IAtendimentoAcompanhamentoPushProps,
  IAtendimentoAcompanhamentoPushState
> {
  private myFormRef: any;

  constructor(props: IAtendimentoAcompanhamentoPushProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getAtendimentoAcompanhamentoPushState(this.props.location)
    };
  }

  getAtendimentoAcompanhamentoPushState = (location): IAtendimentoAcompanhamentoPushBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const atendimentoId = url.searchParams.get('atendimentoId') || '';
    const pacienteId = url.searchParams.get('pacienteId') || '';
    const profissionalId = url.searchParams.get('profissionalId') || '';
    const timestampAtendimento = url.searchParams.get('timestampAtendimento') || '';
    const nomePaciente = url.searchParams.get('nomePaciente') || '';
    const nomeProfissioinal = url.searchParams.get('nomeProfissioinal') || '';
    const timestampConfirmacao = url.searchParams.get('timestampConfirmacao') || '';

    return {
      atendimentoId,
      pacienteId,
      profissionalId,
      timestampAtendimento,
      nomePaciente,
      nomeProfissioinal,
      timestampConfirmacao
    };
  };

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        atendimentoId: '',
        pacienteId: '',
        profissionalId: '',
        timestampAtendimento: '',
        nomePaciente: '',
        nomeProfissioinal: '',
        timestampConfirmacao: ''
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
      'atendimentoId=' +
      this.state.atendimentoId +
      '&' +
      'pacienteId=' +
      this.state.pacienteId +
      '&' +
      'profissionalId=' +
      this.state.profissionalId +
      '&' +
      'timestampAtendimento=' +
      this.state.timestampAtendimento +
      '&' +
      'nomePaciente=' +
      this.state.nomePaciente +
      '&' +
      'nomeProfissioinal=' +
      this.state.nomeProfissioinal +
      '&' +
      'timestampConfirmacao=' +
      this.state.timestampConfirmacao +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      atendimentoId,
      pacienteId,
      profissionalId,
      timestampAtendimento,
      nomePaciente,
      nomeProfissioinal,
      timestampConfirmacao,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      atendimentoId,
      pacienteId,
      profissionalId,
      timestampAtendimento,
      nomePaciente,
      nomeProfissioinal,
      timestampConfirmacao,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { atendimentoAcompanhamentoPushList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Atendimento Acompanhamento Pushes</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Atendimento Acompanhamento Pushes</span>
              <Button id="togglerFilterAtendimentoAcompanhamentoPush" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.atendimentoAcompanhamentoPush.home.createLabel">
                  Create a new Atendimento Acompanhamento Push
                </Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterAtendimentoAcompanhamentoPush">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="atendimentoIdLabel" for="atendimento-acompanhamento-push-atendimentoId">
                            <Translate contentKey="generadorApp.atendimentoAcompanhamentoPush.atendimentoId">Atendimento Id</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="atendimentoId"
                            id="atendimento-acompanhamento-push-atendimentoId"
                            value={this.state.atendimentoId}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="pacienteIdLabel" for="atendimento-acompanhamento-push-pacienteId">
                            <Translate contentKey="generadorApp.atendimentoAcompanhamentoPush.pacienteId">Paciente Id</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="pacienteId"
                            id="atendimento-acompanhamento-push-pacienteId"
                            value={this.state.pacienteId}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="profissionalIdLabel" for="atendimento-acompanhamento-push-profissionalId">
                            <Translate contentKey="generadorApp.atendimentoAcompanhamentoPush.profissionalId">Profissional Id</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="profissionalId"
                            id="atendimento-acompanhamento-push-profissionalId"
                            value={this.state.profissionalId}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="timestampAtendimentoLabel" for="atendimento-acompanhamento-push-timestampAtendimento">
                            <Translate contentKey="generadorApp.atendimentoAcompanhamentoPush.timestampAtendimento">
                              Timestamp Atendimento
                            </Translate>
                          </Label>
                          <AvInput
                            id="atendimento-acompanhamento-push-timestampAtendimento"
                            type="datetime-local"
                            className="form-control"
                            name="timestampAtendimento"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.timestampAtendimento ? convertDateTimeFromServer(this.state.timestampAtendimento) : null}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="nomePacienteLabel" for="atendimento-acompanhamento-push-nomePaciente">
                            <Translate contentKey="generadorApp.atendimentoAcompanhamentoPush.nomePaciente">Nome Paciente</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="nomePaciente"
                            id="atendimento-acompanhamento-push-nomePaciente"
                            value={this.state.nomePaciente}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="nomeProfissioinalLabel" for="atendimento-acompanhamento-push-nomeProfissioinal">
                            <Translate contentKey="generadorApp.atendimentoAcompanhamentoPush.nomeProfissioinal">
                              Nome Profissioinal
                            </Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="nomeProfissioinal"
                            id="atendimento-acompanhamento-push-nomeProfissioinal"
                            value={this.state.nomeProfissioinal}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="timestampConfirmacaoLabel" for="atendimento-acompanhamento-push-timestampConfirmacao">
                            <Translate contentKey="generadorApp.atendimentoAcompanhamentoPush.timestampConfirmacao">
                              Timestamp Confirmacao
                            </Translate>
                          </Label>
                          <AvInput
                            id="atendimento-acompanhamento-push-timestampConfirmacao"
                            type="datetime-local"
                            className="form-control"
                            name="timestampConfirmacao"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.timestampConfirmacao ? convertDateTimeFromServer(this.state.timestampConfirmacao) : null}
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

              {atendimentoAcompanhamentoPushList && atendimentoAcompanhamentoPushList.length > 0 ? (
                <Table responsive aria-describedby="atendimento-acompanhamento-push-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('atendimentoId')}>
                        <Translate contentKey="generadorApp.atendimentoAcompanhamentoPush.atendimentoId">Atendimento Id</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('pacienteId')}>
                        <Translate contentKey="generadorApp.atendimentoAcompanhamentoPush.pacienteId">Paciente Id</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('profissionalId')}>
                        <Translate contentKey="generadorApp.atendimentoAcompanhamentoPush.profissionalId">Profissional Id</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('timestampAtendimento')}>
                        <Translate contentKey="generadorApp.atendimentoAcompanhamentoPush.timestampAtendimento">
                          Timestamp Atendimento
                        </Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('nomePaciente')}>
                        <Translate contentKey="generadorApp.atendimentoAcompanhamentoPush.nomePaciente">Nome Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('nomeProfissioinal')}>
                        <Translate contentKey="generadorApp.atendimentoAcompanhamentoPush.nomeProfissioinal">Nome Profissioinal</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('timestampConfirmacao')}>
                        <Translate contentKey="generadorApp.atendimentoAcompanhamentoPush.timestampConfirmacao">
                          Timestamp Confirmacao
                        </Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {atendimentoAcompanhamentoPushList.map((atendimentoAcompanhamentoPush, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${atendimentoAcompanhamentoPush.id}`} color="link" size="sm">
                            {atendimentoAcompanhamentoPush.id}
                          </Button>
                        </td>

                        <td>{atendimentoAcompanhamentoPush.atendimentoId}</td>

                        <td>{atendimentoAcompanhamentoPush.pacienteId}</td>

                        <td>{atendimentoAcompanhamentoPush.profissionalId}</td>

                        <td>
                          <TextFormat type="date" value={atendimentoAcompanhamentoPush.timestampAtendimento} format={APP_DATE_FORMAT} />
                        </td>

                        <td>{atendimentoAcompanhamentoPush.nomePaciente}</td>

                        <td>{atendimentoAcompanhamentoPush.nomeProfissioinal}</td>

                        <td>
                          <TextFormat type="date" value={atendimentoAcompanhamentoPush.timestampConfirmacao} format={APP_DATE_FORMAT} />
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${atendimentoAcompanhamentoPush.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${atendimentoAcompanhamentoPush.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${atendimentoAcompanhamentoPush.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.atendimentoAcompanhamentoPush.home.notFound">
                    No Atendimento Acompanhamento Pushes found
                  </Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={atendimentoAcompanhamentoPushList && atendimentoAcompanhamentoPushList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ atendimentoAcompanhamentoPush, ...storeState }: IRootState) => ({
  atendimentoAcompanhamentoPushList: atendimentoAcompanhamentoPush.entities,
  totalItems: atendimentoAcompanhamentoPush.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AtendimentoAcompanhamentoPush);
