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
  byteSize,
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
import { getPacienteStatusAtualState, IPacienteStatusAtualBaseState, getEntities } from './paciente-status-atual.reducer';
import { IPacienteStatusAtual } from 'app/shared/model/paciente-status-atual.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';
import { IStatusAtual } from 'app/shared/model/status-atual.model';
import { getEntities as getStatusAtuals } from 'app/entities/status-atual/status-atual.reducer';

export interface IPacienteStatusAtualProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPacienteStatusAtualState extends IPacienteStatusAtualBaseState, IPaginationBaseState {}

export class PacienteStatusAtual extends React.Component<IPacienteStatusAtualProps, IPacienteStatusAtualState> {
  private myFormRef: any;

  constructor(props: IPacienteStatusAtualProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getPacienteStatusAtualState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getPacientes();
    this.props.getStatusAtuals();
  }

  cancelCourse = () => {
    this.setState(
      {
        dataStatus: '',
        observacao: '',
        ativo: '',
        idUsuario: '',
        paciente: '',
        status: ''
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
      'dataStatus=' +
      this.state.dataStatus +
      '&' +
      'observacao=' +
      this.state.observacao +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'idUsuario=' +
      this.state.idUsuario +
      '&' +
      'paciente=' +
      this.state.paciente +
      '&' +
      'status=' +
      this.state.status +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { dataStatus, observacao, ativo, idUsuario, paciente, status, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(dataStatus, observacao, ativo, idUsuario, paciente, status, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { pacientes, statusAtuals, pacienteStatusAtualList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Status Atuals</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Paciente Status Atuals</span>
              <Button id="togglerFilterPacienteStatusAtual" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.pacienteStatusAtual.home.createLabel">Create a new Paciente Status Atual</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPacienteStatusAtual">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="dataStatusLabel" for="paciente-status-atual-dataStatus">
                            <Translate contentKey="generadorApp.pacienteStatusAtual.dataStatus">Data Status</Translate>
                          </Label>
                          <AvInput type="date" name="dataStatus" id="paciente-status-atual-dataStatus" value={this.state.dataStatus} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="observacaoLabel" for="paciente-status-atual-observacao">
                            <Translate contentKey="generadorApp.pacienteStatusAtual.observacao">Observacao</Translate>
                          </Label>
                          <AvInput id="paciente-status-atual-observacao" type="textarea" name="observacao" />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="paciente-status-atual-ativo">
                            <Translate contentKey="generadorApp.pacienteStatusAtual.ativo">Ativo</Translate>
                          </Label>
                          <AvInput type="string" name="ativo" id="paciente-status-atual-ativo" value={this.state.ativo} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idUsuarioLabel" for="paciente-status-atual-idUsuario">
                            <Translate contentKey="generadorApp.pacienteStatusAtual.idUsuario">Id Usuario</Translate>
                          </Label>

                          <AvInput type="text" name="idUsuario" id="paciente-status-atual-idUsuario" value={this.state.idUsuario} />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="paciente-status-atual-paciente">
                              <Translate contentKey="generadorApp.pacienteStatusAtual.paciente">Paciente</Translate>
                            </Label>
                            <AvInput id="paciente-status-atual-paciente" type="select" className="form-control" name="pacienteId">
                              <option value="" key="0" />
                              {pacientes
                                ? pacientes.map(otherEntity => (
                                    <option value={otherEntity.id} key={otherEntity.id}>
                                      {otherEntity.nome}
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
                            <Label for="paciente-status-atual-status">
                              <Translate contentKey="generadorApp.pacienteStatusAtual.status">Status</Translate>
                            </Label>
                            <AvInput id="paciente-status-atual-status" type="select" className="form-control" name="statusId">
                              <option value="" key="0" />
                              {statusAtuals
                                ? statusAtuals.map(otherEntity => (
                                    <option value={otherEntity.id} key={otherEntity.id}>
                                      {otherEntity.statusAtual}
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

              {pacienteStatusAtualList && pacienteStatusAtualList.length > 0 ? (
                <Table responsive aria-describedby="paciente-status-atual-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataStatus')}>
                        <Translate contentKey="generadorApp.pacienteStatusAtual.dataStatus">Data Status</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('observacao')}>
                        <Translate contentKey="generadorApp.pacienteStatusAtual.observacao">Observacao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.pacienteStatusAtual.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idUsuario')}>
                        <Translate contentKey="generadorApp.pacienteStatusAtual.idUsuario">Id Usuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.pacienteStatusAtual.paciente">Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.pacienteStatusAtual.status">Status</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {pacienteStatusAtualList.map((pacienteStatusAtual, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${pacienteStatusAtual.id}`} color="link" size="sm">
                            {pacienteStatusAtual.id}
                          </Button>
                        </td>

                        <td>
                          <TextFormat type="date" value={pacienteStatusAtual.dataStatus} format={APP_LOCAL_DATE_FORMAT} />
                        </td>

                        <td>{pacienteStatusAtual.observacao}</td>

                        <td>{pacienteStatusAtual.ativo}</td>

                        <td>{pacienteStatusAtual.idUsuario}</td>
                        <td>
                          {pacienteStatusAtual.paciente ? (
                            <Link to={`paciente/${pacienteStatusAtual.paciente.id}`}>{pacienteStatusAtual.paciente.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>
                        <td>
                          {pacienteStatusAtual.status ? (
                            <Link to={`status-atual/${pacienteStatusAtual.status.id}`}>{pacienteStatusAtual.status.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container"></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="alert alert-warning">
                  <Translate contentKey="generadorApp.pacienteStatusAtual.home.notFound">No Paciente Status Atuals found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={pacienteStatusAtualList && pacienteStatusAtualList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ pacienteStatusAtual, ...storeState }: IRootState) => ({
  pacientes: storeState.paciente.entities,
  statusAtuals: storeState.statusAtual.entities,
  pacienteStatusAtualList: pacienteStatusAtual.entities,
  totalItems: pacienteStatusAtual.totalItems
});

const mapDispatchToProps = {
  getPacientes,
  getStatusAtuals,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteStatusAtual);
