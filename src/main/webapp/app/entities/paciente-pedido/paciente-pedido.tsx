/* eslint complexity: ["error", 100] */
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
import { getPacientePedidoState, IPacientePedidoBaseState, getEntities } from './paciente-pedido.reducer';
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

export interface IPacientePedidoState extends IPacientePedidoBaseState, IPaginationBaseState {}

export class PacientePedido extends React.Component<IPacientePedidoProps, IPacientePedidoState> {
  private myFormRef: any;

  constructor(props: IPacientePedidoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getPacientePedidoState(this.props.location)
    };
  }

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
        unidade: '',
        paciente: '',
        cartao: '',
        especialidade: ''
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
      'unidade=' +
      this.state.unidade +
      '&' +
      'paciente=' +
      this.state.paciente +
      '&' +
      'cartao=' +
      this.state.cartao +
      '&' +
      'especialidade=' +
      this.state.especialidade +
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
      unidade,
      paciente,
      cartao,
      especialidade,
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
      unidade,
      paciente,
      cartao,
      especialidade,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { unidadeEasies, pacientes, pacienteDadosCartaos, especialidades, pacientePedidoList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Paciente Pedidos</span>
          <Button id="togglerFilterPacientePedido" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.pacientePedido.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.pacientePedido.home.createLabel">Create a new Paciente Pedido</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Pedidos</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPacientePedido">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'dataPedido' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="dataPedidoLabel" for="paciente-pedido-dataPedido">
                              <Translate contentKey="generadorApp.pacientePedido.dataPedido">Data Pedido</Translate>
                            </Label>
                            <AvInput type="date" name="dataPedido" id="paciente-pedido-dataPedido" value={this.state.dataPedido} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dataAgenda' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'qtdSessoes' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="qtdSessoesLabel" for="paciente-pedido-qtdSessoes">
                              <Translate contentKey="generadorApp.pacientePedido.qtdSessoes">Qtd Sessoes</Translate>
                            </Label>
                            <AvInput type="string" name="qtdSessoes" id="paciente-pedido-qtdSessoes" value={this.state.qtdSessoes} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'parcelas' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="parcelasLabel" for="paciente-pedido-parcelas">
                              <Translate contentKey="generadorApp.pacientePedido.parcelas">Parcelas</Translate>
                            </Label>
                            <AvInput type="string" name="parcelas" id="paciente-pedido-parcelas" value={this.state.parcelas} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'valor' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="valorLabel" for="paciente-pedido-valor">
                              <Translate contentKey="generadorApp.pacientePedido.valor">Valor</Translate>
                            </Label>
                            <AvInput type="string" name="valor" id="paciente-pedido-valor" value={this.state.valor} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'desconto' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="descontoLabel" for="paciente-pedido-desconto">
                              <Translate contentKey="generadorApp.pacientePedido.desconto">Desconto</Translate>
                            </Label>
                            <AvInput type="string" name="desconto" id="paciente-pedido-desconto" value={this.state.desconto} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'tipoValor' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="tipoValorLabel" for="paciente-pedido-tipoValor">
                              <Translate contentKey="generadorApp.pacientePedido.tipoValor">Tipo Valor</Translate>
                            </Label>
                            <AvInput type="string" name="tipoValor" id="paciente-pedido-tipoValor" value={this.state.tipoValor} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'unidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="paciente-pedido-unidade">
                                <Translate contentKey="generadorApp.pacientePedido.unidade">Unidade</Translate>
                              </Label>
                              <Select
                                id="paciente-pedido-unidade"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  unidadeEasies
                                    ? unidadeEasies.map(p =>
                                        this.state.unidade.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.razaoSocial } : null
                                      )
                                    : null
                                }
                                options={
                                  unidadeEasies ? unidadeEasies.map(option => ({ value: option.id, label: option.razaoSocial })) : null
                                }
                                onChange={options => this.setState({ unidade: options.map(option => option['value']).join(',') })}
                                name={'unidade'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'paciente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="paciente-pedido-paciente">
                                <Translate contentKey="generadorApp.pacientePedido.paciente">Paciente</Translate>
                              </Label>
                              <Select
                                id="paciente-pedido-paciente"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  pacientes
                                    ? pacientes.map(p =>
                                        this.state.paciente.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null
                                      )
                                    : null
                                }
                                options={pacientes ? pacientes.map(option => ({ value: option.id, label: option.id })) : null}
                                onChange={options => this.setState({ paciente: options.map(option => option['value']).join(',') })}
                                name={'paciente'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cartao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="paciente-pedido-cartao">
                                <Translate contentKey="generadorApp.pacientePedido.cartao">Cartao</Translate>
                              </Label>
                              <Select
                                id="paciente-pedido-cartao"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  pacienteDadosCartaos
                                    ? pacienteDadosCartaos.map(p =>
                                        this.state.cartao.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null
                                      )
                                    : null
                                }
                                options={
                                  pacienteDadosCartaos ? pacienteDadosCartaos.map(option => ({ value: option.id, label: option.id })) : null
                                }
                                onChange={options => this.setState({ cartao: options.map(option => option['value']).join(',') })}
                                name={'cartao'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'especialidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="paciente-pedido-especialidade">
                                <Translate contentKey="generadorApp.pacientePedido.especialidade">Especialidade</Translate>
                              </Label>
                              <Select
                                id="paciente-pedido-especialidade"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  especialidades
                                    ? especialidades.map(p =>
                                        this.state.especialidade.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null
                                      )
                                    : null
                                }
                                options={especialidades ? especialidades.map(option => ({ value: option.id, label: option.id })) : null}
                                onChange={options => this.setState({ especialidade: options.map(option => option['value']).join(',') })}
                                name={'especialidade'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.pacientePedido.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.pacientePedido.home.btn_filter_clean">Clean</Translate>
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
                      {this.state.baseFilters !== 'dataPedido' ? (
                        <th className="hand" onClick={this.sort('dataPedido')}>
                          <Translate contentKey="generadorApp.pacientePedido.dataPedido">Data Pedido</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'dataAgenda' ? (
                        <th className="hand" onClick={this.sort('dataAgenda')}>
                          <Translate contentKey="generadorApp.pacientePedido.dataAgenda">Data Agenda</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'qtdSessoes' ? (
                        <th className="hand" onClick={this.sort('qtdSessoes')}>
                          <Translate contentKey="generadorApp.pacientePedido.qtdSessoes">Qtd Sessoes</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'parcelas' ? (
                        <th className="hand" onClick={this.sort('parcelas')}>
                          <Translate contentKey="generadorApp.pacientePedido.parcelas">Parcelas</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'valor' ? (
                        <th className="hand" onClick={this.sort('valor')}>
                          <Translate contentKey="generadorApp.pacientePedido.valor">Valor</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'desconto' ? (
                        <th className="hand" onClick={this.sort('desconto')}>
                          <Translate contentKey="generadorApp.pacientePedido.desconto">Desconto</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'tipoValor' ? (
                        <th className="hand" onClick={this.sort('tipoValor')}>
                          <Translate contentKey="generadorApp.pacientePedido.tipoValor">Tipo Valor</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'unidade' ? (
                        <th>
                          <Translate contentKey="generadorApp.pacientePedido.unidade">Unidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'paciente' ? (
                        <th>
                          <Translate contentKey="generadorApp.pacientePedido.paciente">Paciente</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'cartao' ? (
                        <th>
                          <Translate contentKey="generadorApp.pacientePedido.cartao">Cartao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'especialidade' ? (
                        <th>
                          <Translate contentKey="generadorApp.pacientePedido.especialidade">Especialidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

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

                        {this.state.baseFilters !== 'dataPedido' ? (
                          <td>
                            <TextFormat type="date" value={pacientePedido.dataPedido} format={APP_LOCAL_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'dataAgenda' ? (
                          <td>
                            <TextFormat type="date" value={pacientePedido.dataAgenda} format={APP_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'qtdSessoes' ? <td>{pacientePedido.qtdSessoes}</td> : null}

                        {this.state.baseFilters !== 'parcelas' ? <td>{pacientePedido.parcelas}</td> : null}

                        {this.state.baseFilters !== 'valor' ? <td>{pacientePedido.valor}</td> : null}

                        {this.state.baseFilters !== 'desconto' ? <td>{pacientePedido.desconto}</td> : null}

                        {this.state.baseFilters !== 'tipoValor' ? <td>{pacientePedido.tipoValor}</td> : null}

                        {this.state.baseFilters !== 'unidade' ? (
                          <td>
                            {pacientePedido.unidade ? (
                              <Link to={`unidade-easy/${pacientePedido.unidade.id}`}>{pacientePedido.unidade.id}</Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'paciente' ? (
                          <td>
                            {pacientePedido.paciente ? (
                              <Link to={`paciente/${pacientePedido.paciente.id}`}>{pacientePedido.paciente.id}</Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'cartao' ? (
                          <td>
                            {pacientePedido.cartao ? (
                              <Link to={`paciente-dados-cartao/${pacientePedido.cartao.id}`}>{pacientePedido.cartao.id}</Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'especialidade' ? (
                          <td>
                            {pacientePedido.especialidade ? (
                              <Link to={`especialidade/${pacientePedido.especialidade.id}`}>{pacientePedido.especialidade.id}</Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${pacientePedido.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${pacientePedido.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${pacientePedido.id}/delete?${this.getFiltersURL()}`}
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
