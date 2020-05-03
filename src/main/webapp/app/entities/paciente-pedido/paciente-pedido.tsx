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
import { getEntities } from './paciente-pedido.reducer';
import { IPacientePedido } from 'app/shared/model/paciente-pedido.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { getEntities as getUnidadeEasies } from 'app/entities/unidade-easy/unidade-easy.reducer';
import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';
import { IPacienteDadosCartao } from 'app/shared/model/paciente-dados-cartao.model';
import { getEntities as getPacienteDadosCartaos } from 'app/entities/paciente-dados-cartao/paciente-dados-cartao.reducer';
import { IEspecialidade } from 'app/shared/model/especialidade.model';
import { getEntities as getEspecialidades } from 'app/entities/especialidade/especialidade.reducer';

export interface IPacientePedidoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPacientePedidoBaseState {
  dataPedido: any;
  dataAgenda: any;
  qtdSessoes: any;
  parcelas: any;
  valor: any;
  desconto: any;
  tipoValor: any;
  idUnidade: any;
  idPaciente: any;
  idCartao: any;
  idEspecialidade: any;
}
export interface IPacientePedidoState extends IPacientePedidoBaseState, IPaginationBaseState {}

export class PacientePedido extends React.Component<IPacientePedidoProps, IPacientePedidoState> {
  private myFormRef: any;

  constructor(props: IPacientePedidoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getPacientePedidoState(this.props.location)
    };
  }

  getPacientePedidoState = (location): IPacientePedidoBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const dataPedido = url.searchParams.get('dataPedido') || '';
    const dataAgenda = url.searchParams.get('dataAgenda') || '';
    const qtdSessoes = url.searchParams.get('qtdSessoes') || '';
    const parcelas = url.searchParams.get('parcelas') || '';
    const valor = url.searchParams.get('valor') || '';
    const desconto = url.searchParams.get('desconto') || '';
    const tipoValor = url.searchParams.get('tipoValor') || '';

    const idUnidade = url.searchParams.get('idUnidade') || '';
    const idPaciente = url.searchParams.get('idPaciente') || '';
    const idCartao = url.searchParams.get('idCartao') || '';
    const idEspecialidade = url.searchParams.get('idEspecialidade') || '';

    return {
      dataPedido,
      dataAgenda,
      qtdSessoes,
      parcelas,
      valor,
      desconto,
      tipoValor,
      idUnidade,
      idPaciente,
      idCartao,
      idEspecialidade
    };
  };

  componentDidMount() {
    this.getEntities();

    this.props.getUnidadeEasies();
    this.props.getPacientes();
    this.props.getPacienteDadosCartaos();
    this.props.getEspecialidades();
  }

  cancelCourse = () => {
    this.setState(
      {
        dataPedido: '',
        dataAgenda: '',
        qtdSessoes: '',
        parcelas: '',
        valor: '',
        desconto: '',
        tipoValor: '',
        idUnidade: '',
        idPaciente: '',
        idCartao: '',
        idEspecialidade: ''
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
      'dataPedido=' +
      this.state.dataPedido +
      '&' +
      'dataAgenda=' +
      this.state.dataAgenda +
      '&' +
      'qtdSessoes=' +
      this.state.qtdSessoes +
      '&' +
      'parcelas=' +
      this.state.parcelas +
      '&' +
      'valor=' +
      this.state.valor +
      '&' +
      'desconto=' +
      this.state.desconto +
      '&' +
      'tipoValor=' +
      this.state.tipoValor +
      '&' +
      'idUnidade=' +
      this.state.idUnidade +
      '&' +
      'idPaciente=' +
      this.state.idPaciente +
      '&' +
      'idCartao=' +
      this.state.idCartao +
      '&' +
      'idEspecialidade=' +
      this.state.idEspecialidade +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      dataPedido,
      dataAgenda,
      qtdSessoes,
      parcelas,
      valor,
      desconto,
      tipoValor,
      idUnidade,
      idPaciente,
      idCartao,
      idEspecialidade,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      dataPedido,
      dataAgenda,
      qtdSessoes,
      parcelas,
      valor,
      desconto,
      tipoValor,
      idUnidade,
      idPaciente,
      idCartao,
      idEspecialidade,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { unidadeEasies, pacientes, pacienteDadosCartaos, especialidades, pacientePedidoList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Pedidos</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Paciente Pedidos</span>
              <Button id="togglerFilterPacientePedido" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.pacientePedido.home.createLabel">Create a new Paciente Pedido</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPacientePedido">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="dataPedidoLabel" for="paciente-pedido-dataPedido">
                            <Translate contentKey="generadorApp.pacientePedido.dataPedido">Data Pedido</Translate>
                          </Label>
                          <AvInput type="date" name="dataPedido" id="paciente-pedido-dataPedido" value={this.state.dataPedido} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataAgendaLabel" for="paciente-pedido-dataAgenda">
                            <Translate contentKey="generadorApp.pacientePedido.dataAgenda">Data Agenda</Translate>
                          </Label>
                          <AvInput
                            id="paciente-pedido-dataAgenda"
                            type="datetime-local"
                            className="form-control"
                            name="dataAgenda"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.dataAgenda ? convertDateTimeFromServer(this.state.dataAgenda) : null}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="qtdSessoesLabel" for="paciente-pedido-qtdSessoes">
                            <Translate contentKey="generadorApp.pacientePedido.qtdSessoes">Qtd Sessoes</Translate>
                          </Label>
                          <AvInput type="string" name="qtdSessoes" id="paciente-pedido-qtdSessoes" value={this.state.qtdSessoes} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="parcelasLabel" for="paciente-pedido-parcelas">
                            <Translate contentKey="generadorApp.pacientePedido.parcelas">Parcelas</Translate>
                          </Label>
                          <AvInput type="string" name="parcelas" id="paciente-pedido-parcelas" value={this.state.parcelas} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="valorLabel" for="paciente-pedido-valor">
                            <Translate contentKey="generadorApp.pacientePedido.valor">Valor</Translate>
                          </Label>
                          <AvInput type="string" name="valor" id="paciente-pedido-valor" value={this.state.valor} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="descontoLabel" for="paciente-pedido-desconto">
                            <Translate contentKey="generadorApp.pacientePedido.desconto">Desconto</Translate>
                          </Label>
                          <AvInput type="string" name="desconto" id="paciente-pedido-desconto" value={this.state.desconto} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="tipoValorLabel" for="paciente-pedido-tipoValor">
                            <Translate contentKey="generadorApp.pacientePedido.tipoValor">Tipo Valor</Translate>
                          </Label>
                          <AvInput type="string" name="tipoValor" id="paciente-pedido-tipoValor" value={this.state.tipoValor} />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="paciente-pedido-idUnidade">
                              <Translate contentKey="generadorApp.pacientePedido.idUnidade">Id Unidade</Translate>
                            </Label>
                            <AvInput id="paciente-pedido-idUnidade" type="select" className="form-control" name="idUnidadeId">
                              <option value="" key="0" />
                              {unidadeEasies
                                ? unidadeEasies.map(otherEntity => (
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
                            <Label for="paciente-pedido-idPaciente">
                              <Translate contentKey="generadorApp.pacientePedido.idPaciente">Id Paciente</Translate>
                            </Label>
                            <AvInput id="paciente-pedido-idPaciente" type="select" className="form-control" name="idPacienteId">
                              <option value="" key="0" />
                              {pacientes
                                ? pacientes.map(otherEntity => (
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
                            <Label for="paciente-pedido-idCartao">
                              <Translate contentKey="generadorApp.pacientePedido.idCartao">Id Cartao</Translate>
                            </Label>
                            <AvInput id="paciente-pedido-idCartao" type="select" className="form-control" name="idCartaoId">
                              <option value="" key="0" />
                              {pacienteDadosCartaos
                                ? pacienteDadosCartaos.map(otherEntity => (
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
                            <Label for="paciente-pedido-idEspecialidade">
                              <Translate contentKey="generadorApp.pacientePedido.idEspecialidade">Id Especialidade</Translate>
                            </Label>
                            <AvInput id="paciente-pedido-idEspecialidade" type="select" className="form-control" name="idEspecialidadeId">
                              <option value="" key="0" />
                              {especialidades
                                ? especialidades.map(otherEntity => (
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

              {pacientePedidoList && pacientePedidoList.length > 0 ? (
                <Table responsive aria-describedby="paciente-pedido-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataPedido')}>
                        <Translate contentKey="generadorApp.pacientePedido.dataPedido">Data Pedido</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataAgenda')}>
                        <Translate contentKey="generadorApp.pacientePedido.dataAgenda">Data Agenda</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('qtdSessoes')}>
                        <Translate contentKey="generadorApp.pacientePedido.qtdSessoes">Qtd Sessoes</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('parcelas')}>
                        <Translate contentKey="generadorApp.pacientePedido.parcelas">Parcelas</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('valor')}>
                        <Translate contentKey="generadorApp.pacientePedido.valor">Valor</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('desconto')}>
                        <Translate contentKey="generadorApp.pacientePedido.desconto">Desconto</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('tipoValor')}>
                        <Translate contentKey="generadorApp.pacientePedido.tipoValor">Tipo Valor</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.pacientePedido.idUnidade">Id Unidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.pacientePedido.idPaciente">Id Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.pacientePedido.idCartao">Id Cartao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.pacientePedido.idEspecialidade">Id Especialidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {pacientePedidoList.map((pacientePedido, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${pacientePedido.id}`} color="link" size="sm">
                            {pacientePedido.id}
                          </Button>
                        </td>

                        <td>
                          <TextFormat type="date" value={pacientePedido.dataPedido} format={APP_LOCAL_DATE_FORMAT} />
                        </td>

                        <td>
                          <TextFormat type="date" value={pacientePedido.dataAgenda} format={APP_DATE_FORMAT} />
                        </td>

                        <td>{pacientePedido.qtdSessoes}</td>

                        <td>{pacientePedido.parcelas}</td>

                        <td>{pacientePedido.valor}</td>

                        <td>{pacientePedido.desconto}</td>

                        <td>{pacientePedido.tipoValor}</td>
                        <td>
                          {pacientePedido.idUnidade ? (
                            <Link to={`unidade-easy/${pacientePedido.idUnidade.id}`}>{pacientePedido.idUnidade.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>
                        <td>
                          {pacientePedido.idPaciente ? (
                            <Link to={`paciente/${pacientePedido.idPaciente.id}`}>{pacientePedido.idPaciente.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>
                        <td>
                          {pacientePedido.idCartao ? (
                            <Link to={`paciente-dados-cartao/${pacientePedido.idCartao.id}`}>{pacientePedido.idCartao.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>
                        <td>
                          {pacientePedido.idEspecialidade ? (
                            <Link to={`especialidade/${pacientePedido.idEspecialidade.id}`}>{pacientePedido.idEspecialidade.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${pacientePedido.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${pacientePedido.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${pacientePedido.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.pacientePedido.home.notFound">No Paciente Pedidos found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={pacientePedidoList && pacientePedidoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ pacientePedido, ...storeState }: IRootState) => ({
  unidadeEasies: storeState.unidadeEasy.entities,
  pacientes: storeState.paciente.entities,
  pacienteDadosCartaos: storeState.pacienteDadosCartao.entities,
  especialidades: storeState.especialidade.entities,
  pacientePedidoList: pacientePedido.entities,
  totalItems: pacientePedido.totalItems
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getPacientes,
  getPacienteDadosCartaos,
  getEspecialidades,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacientePedido);
