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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
import { getAtendimentoState, IAtendimentoBaseState, getEntities } from './atendimento.reducer';
import { IAtendimento } from 'app/shared/model/atendimento.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { getEntities as getUnidadeEasies } from 'app/entities/unidade-easy/unidade-easy.reducer';
import { IPadItem } from 'app/shared/model/pad-item.model';
import { getEntities as getPadItems } from 'app/entities/pad-item/pad-item.reducer';
import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';
import { IOperadora } from 'app/shared/model/operadora.model';
import { getEntities as getOperadoras } from 'app/entities/operadora/operadora.reducer';
import { IProfissional } from 'app/shared/model/profissional.model';
import { getEntities as getProfissionals } from 'app/entities/profissional/profissional.reducer';
import { IFranquia } from 'app/shared/model/franquia.model';
import { getEntities as getFranquias } from 'app/entities/franquia/franquia.reducer';
import { IEspecialidade } from 'app/shared/model/especialidade.model';
import { getEntities as getEspecialidades } from 'app/entities/especialidade/especialidade.reducer';
import { IStatusAtendimento } from 'app/shared/model/status-atendimento.model';
import { getEntities as getStatusAtendimentos } from 'app/entities/status-atendimento/status-atendimento.reducer';
import { IPeriodo } from 'app/shared/model/periodo.model';
import { getEntities as getPeriodos } from 'app/entities/periodo/periodo.reducer';
import { ICidade } from 'app/shared/model/cidade.model';
import { getEntities as getCidades } from 'app/entities/cidade/cidade.reducer';

export interface IAtendimentoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IAtendimentoState extends IAtendimentoBaseState, IPaginationBaseState {
  dropdownButtons: {};
}

export class Atendimento extends React.Component<IAtendimentoProps, IAtendimentoState> {
  private myFormRef: any;

  constructor(props: IAtendimentoProps) {
    super(props);
    this.state = {
      dropdownButtons: {},
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getAtendimentoState(this.props.location)
    };
  }

  toggle = btn => {
    const dropdownButtons = this.state.dropdownButtons;
    dropdownButtons[btn] = !dropdownButtons[btn];
    this.setState({ dropdownButtons });
  };

  componentDidMount() {
    this.getEntities();

    this.props.getUnidadeEasies();
    this.props.getPadItems();
    this.props.getPacientes();
    this.props.getOperadoras();
    this.props.getProfissionals();
    this.props.getFranquias();
    this.props.getEspecialidades();
    this.props.getStatusAtendimentos();
    this.props.getPeriodos();
    this.props.getCidades();
  }

  cancelCourse = () => {
    this.setState(
      {
        cep: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        uf: '',
        latitude: '',
        longitude: '',
        dataAgenda: '',
        horario: '',
        dataChegada: '',
        latitudeChegada: '',
        longitudeChegada: '',
        dataSaida: '',
        latitudeSaida: '',
        longitudeSaida: '',
        evolucao: '',
        observacao: '',
        intercorrencia: '',
        avaliacao: '',
        aceito: '',
        motivo: '',
        valor: '',
        ordemAtendimento: '',
        ativo: '',
        dataForaHora: '',
        idUsuarioCancelamento: '',
        dataCancelamento: '',
        tipoUsuarioCancelamento: '',
        confidencialProfissional: '',
        confidencialPaciente: '',
        atendimentoAceite: '',
        atendimentoAssinaturas: '',
        atendimentoAtividades: '',
        unidade: '',
        padItem: '',
        paciente: '',
        operadora: '',
        profissional: '',
        franquia: '',
        especialidade: '',
        statusAtendimento: '',
        periodo: '',
        cidade: ''
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
      'cep=' +
      this.state.cep +
      '&' +
      'endereco=' +
      this.state.endereco +
      '&' +
      'numero=' +
      this.state.numero +
      '&' +
      'complemento=' +
      this.state.complemento +
      '&' +
      'bairro=' +
      this.state.bairro +
      '&' +
      'uf=' +
      this.state.uf +
      '&' +
      'latitude=' +
      this.state.latitude +
      '&' +
      'longitude=' +
      this.state.longitude +
      '&' +
      'dataAgenda=' +
      this.state.dataAgenda +
      '&' +
      'horario=' +
      this.state.horario +
      '&' +
      'dataChegada=' +
      this.state.dataChegada +
      '&' +
      'latitudeChegada=' +
      this.state.latitudeChegada +
      '&' +
      'longitudeChegada=' +
      this.state.longitudeChegada +
      '&' +
      'dataSaida=' +
      this.state.dataSaida +
      '&' +
      'latitudeSaida=' +
      this.state.latitudeSaida +
      '&' +
      'longitudeSaida=' +
      this.state.longitudeSaida +
      '&' +
      'evolucao=' +
      this.state.evolucao +
      '&' +
      'observacao=' +
      this.state.observacao +
      '&' +
      'intercorrencia=' +
      this.state.intercorrencia +
      '&' +
      'avaliacao=' +
      this.state.avaliacao +
      '&' +
      'aceito=' +
      this.state.aceito +
      '&' +
      'motivo=' +
      this.state.motivo +
      '&' +
      'valor=' +
      this.state.valor +
      '&' +
      'ordemAtendimento=' +
      this.state.ordemAtendimento +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'dataForaHora=' +
      this.state.dataForaHora +
      '&' +
      'idUsuarioCancelamento=' +
      this.state.idUsuarioCancelamento +
      '&' +
      'dataCancelamento=' +
      this.state.dataCancelamento +
      '&' +
      'tipoUsuarioCancelamento=' +
      this.state.tipoUsuarioCancelamento +
      '&' +
      'confidencialProfissional=' +
      this.state.confidencialProfissional +
      '&' +
      'confidencialPaciente=' +
      this.state.confidencialPaciente +
      '&' +
      'atendimentoAceite=' +
      this.state.atendimentoAceite +
      '&' +
      'atendimentoAssinaturas=' +
      this.state.atendimentoAssinaturas +
      '&' +
      'atendimentoAtividades=' +
      this.state.atendimentoAtividades +
      '&' +
      'unidade=' +
      this.state.unidade +
      '&' +
      'padItem=' +
      this.state.padItem +
      '&' +
      'paciente=' +
      this.state.paciente +
      '&' +
      'operadora=' +
      this.state.operadora +
      '&' +
      'profissional=' +
      this.state.profissional +
      '&' +
      'franquia=' +
      this.state.franquia +
      '&' +
      'especialidade=' +
      this.state.especialidade +
      '&' +
      'statusAtendimento=' +
      this.state.statusAtendimento +
      '&' +
      'periodo=' +
      this.state.periodo +
      '&' +
      'cidade=' +
      this.state.cidade +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      uf,
      latitude,
      longitude,
      dataAgenda,
      horario,
      dataChegada,
      latitudeChegada,
      longitudeChegada,
      dataSaida,
      latitudeSaida,
      longitudeSaida,
      evolucao,
      observacao,
      intercorrencia,
      avaliacao,
      aceito,
      motivo,
      valor,
      ordemAtendimento,
      ativo,
      dataForaHora,
      idUsuarioCancelamento,
      dataCancelamento,
      tipoUsuarioCancelamento,
      confidencialProfissional,
      confidencialPaciente,
      atendimentoAceite,
      atendimentoAssinaturas,
      atendimentoAtividades,
      unidade,
      padItem,
      paciente,
      operadora,
      profissional,
      franquia,
      especialidade,
      statusAtendimento,
      periodo,
      cidade,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      uf,
      latitude,
      longitude,
      dataAgenda,
      horario,
      dataChegada,
      latitudeChegada,
      longitudeChegada,
      dataSaida,
      latitudeSaida,
      longitudeSaida,
      evolucao,
      observacao,
      intercorrencia,
      avaliacao,
      aceito,
      motivo,
      valor,
      ordemAtendimento,
      ativo,
      dataForaHora,
      idUsuarioCancelamento,
      dataCancelamento,
      tipoUsuarioCancelamento,
      confidencialProfissional,
      confidencialPaciente,
      atendimentoAceite,
      atendimentoAssinaturas,
      atendimentoAtividades,
      unidade,
      padItem,
      paciente,
      operadora,
      profissional,
      franquia,
      especialidade,
      statusAtendimento,
      periodo,
      cidade,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const {
      unidadeEasies,
      padItems,
      pacientes,
      operadoras,
      profissionals,
      franquias,
      especialidades,
      statusAtendimentos,
      periodos,
      cidades,
      atendimentoList,
      match,
      totalItems
    } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Atendimentos</span>
          <Button id="togglerFilterAtendimento" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.atendimento.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.atendimento.home.createLabel">Create a new Atendimento</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Atendimentos</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterAtendimento">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'padItem' ? (
                        <Col md="6">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="atendimento-padItem">
                                <Translate contentKey="generadorApp.atendimento.padItem">Pad Item</Translate>
                              </Label>
                              <Select
                                id="atendimento-padItem"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  padItems
                                    ? padItems.map(p =>
                                        this.state.padItem.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null
                                      )
                                    : null
                                }
                                options={padItems ? padItems.map(option => ({ value: option.id, label: option.id })) : null}
                                onChange={options => this.setState({ padItem: options.map(option => option['value']).join(',') })}
                                name={'padItem'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dataAgenda' ? (
                        <Col md="6">
                          <Row className="mr-1 mt-1">
                            <Label id="dataAgendaLabel" for="atendimento-dataAgenda">
                              <Translate contentKey="generadorApp.atendimento.dataAgenda">Data Agenda</Translate>
                            </Label>
                            <AvInput
                              id="atendimento-dataAgenda"
                              type="datetime-local"
                              className="form-control"
                              name="dataAgenda"
                              placeholder={'YYYY-MM-DD HH:mm'}
                              value={this.state.dataAgenda ? convertDateTimeFromServer(this.state.dataAgenda) : null}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'paciente' ? (
                        <Col md="6">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="atendimento-paciente">
                                <Translate contentKey="generadorApp.atendimento.paciente">Paciente</Translate>
                              </Label>
                              <Select
                                id="atendimento-paciente"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  pacientes
                                    ? pacientes.map(p =>
                                        this.state.paciente.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.nome } : null
                                      )
                                    : null
                                }
                                options={pacientes ? pacientes.map(option => ({ value: option.id, label: option.nome })) : null}
                                onChange={options => this.setState({ paciente: options.map(option => option['value']).join(',') })}
                                name={'paciente'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'profissional' ? (
                        <Col md="6">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="atendimento-profissional">
                                <Translate contentKey="generadorApp.atendimento.profissional">Profissional</Translate>
                              </Label>
                              <Select
                                id="atendimento-profissional"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  profissionals
                                    ? profissionals.map(p =>
                                        this.state.profissional.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.nome } : null
                                      )
                                    : null
                                }
                                options={profissionals ? profissionals.map(option => ({ value: option.id, label: option.nome })) : null}
                                onChange={options => this.setState({ profissional: options.map(option => option['value']).join(',') })}
                                name={'profissional'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'operadora' ? (
                        <Col md="6">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="atendimento-operadora">
                                <Translate contentKey="generadorApp.atendimento.operadora">Operadora</Translate>
                              </Label>
                              <Select
                                id="atendimento-operadora"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  operadoras
                                    ? operadoras.map(p =>
                                        this.state.operadora.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.nomeFantasia } : null
                                      )
                                    : null
                                }
                                options={operadoras ? operadoras.map(option => ({ value: option.id, label: option.nomeFantasia })) : null}
                                onChange={options => this.setState({ operadora: options.map(option => option['value']).join(',') })}
                                name={'operadora'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dataChegada' ? (
                        <Col md="6">
                          <Row className="mr-1 mt-1">
                            <Label id="dataChegadaLabel" for="atendimento-dataChegada">
                              <Translate contentKey="generadorApp.atendimento.dataChegada">Data Chegada</Translate>
                            </Label>
                            <AvInput
                              id="atendimento-dataChegada"
                              type="datetime-local"
                              className="form-control"
                              name="dataChegada"
                              placeholder={'YYYY-MM-DD HH:mm'}
                              value={this.state.dataChegada ? convertDateTimeFromServer(this.state.dataChegada) : null}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dataSaida' ? (
                        <Col md="6">
                          <Row className="mr-1 mt-1">
                            <Label id="dataSaidaLabel" for="atendimento-dataSaida">
                              <Translate contentKey="generadorApp.atendimento.dataSaida">Data Saida</Translate>
                            </Label>
                            <AvInput
                              id="atendimento-dataSaida"
                              type="datetime-local"
                              className="form-control"
                              name="dataSaida"
                              placeholder={'YYYY-MM-DD HH:mm'}
                              value={this.state.dataSaida ? convertDateTimeFromServer(this.state.dataSaida) : null}
                            />
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.atendimento.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.atendimento.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {atendimentoList && atendimentoList.length > 0 ? (
                <Table responsive aria-describedby="atendimento-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.atendimento.padItem">Pad Item</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataAgenda')}>
                        <Translate contentKey="generadorApp.atendimento.dataAgenda"></Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.atendimento.paciente">Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.atendimento.profissional">Profissional</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.atendimento.operadora">Operadora</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataChegada')}>
                        <Translate contentKey="generadorApp.atendimento.dataChegada"></Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataSaida')}>
                        <Translate contentKey="generadorApp.atendimento.dataSaida"></Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {atendimentoList.map((atendimento, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${atendimento.id}`} color="link" size="sm">
                            {atendimento.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'padItem' ? (
                          <td>
                            {atendimento.padItem ? <Link to={`pad-item/${atendimento.padItem.id}`}>{atendimento.padItem.id}</Link> : ''}
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'dataAgenda' ? (
                          <td>
                            <TextFormat type="date" value={atendimento.dataAgenda} format={APP_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'paciente' ? (
                          <td>
                            {atendimento.paciente ? (
                              <Link to={`paciente/${atendimento.paciente.id}`}>{atendimento.paciente.nome}</Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'profissional' ? (
                          <td>
                            {atendimento.profissional ? (
                              <Link to={`profissional/${atendimento.profissional.id}`}>{atendimento.profissional.nome}</Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'operadora' ? (
                          <td>
                            {atendimento.operadora ? (
                              <Link to={`operadora/${atendimento.operadora.id}`}>{atendimento.operadora.nomeFantasia}</Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'dataChegada' ? (
                          <td>
                            <TextFormat type="date" value={atendimento.dataChegada} format={APP_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'dataSaida' ? (
                          <td>
                            <TextFormat type="date" value={atendimento.dataSaida} format={APP_DATE_FORMAT} />
                          </td>
                        ) : null}

                        <td className="text-right">
                          <Dropdown isOpen={this.state.dropdownButtons[i]} toggle={() => this.toggle(i)}>
                            <DropdownToggle caret>
                              <Translate contentKey="generadorApp.atendimento.dropdown_btn">Actions</Translate>
                            </DropdownToggle>
                            <DropdownMenu right>
                              <DropdownItem tag={Link} to={`${match.url}/${atendimento.id}`} color="info" size="sm">
                                <FontAwesomeIcon icon="eye" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.atendimento.listButtons.detalhes">Detalhes</Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem tag={Link} to={`${match.url}/${atendimento.id}/delete`} color="info" size="sm">
                                <FontAwesomeIcon icon="search" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.atendimento.listButtons.VisualizarPTA">VisualizarPTA</Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem tag={Link} to={`${match.url}/${atendimento.id}/delete`} color="info" size="sm">
                                <FontAwesomeIcon icon="search" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.atendimento.listButtons.VisualizarPTA">VisualizarPTA</Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem tag={Link} to={`${match.url}/${atendimento.id}/delete`} color="info" size="sm">
                                <FontAwesomeIcon icon="file" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.atendimento.listButtons.LicaodeCasa">LiçãodeCasa</Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem tag={Link} to={`${match.url}/${atendimento.id}/delete`} color="info" size="sm">
                                <FontAwesomeIcon icon="calendar-check-o" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.atendimento.listButtons.Fotos">Fotos</Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem tag={Link} to={`${match.url}/${atendimento.id}/edit`} color="info" size="sm">
                                <FontAwesomeIcon icon="pencil-alt" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.atendimento.listButtons.edit">Editar</Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem tag={Link} to={`${match.url}/${atendimento.id}/delete`} color="info" size="sm">
                                <FontAwesomeIcon icon="trash" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.atendimento.listButtons.delete">Excluir</Translate>
                                </span>
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="alert alert-warning">
                  <Translate contentKey="generadorApp.atendimento.home.notFound">No Atendimentos found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={atendimentoList && atendimentoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ atendimento, ...storeState }: IRootState) => ({
  unidadeEasies: storeState.unidadeEasy.entities,
  padItems: storeState.padItem.entities,
  pacientes: storeState.paciente.entities,
  operadoras: storeState.operadora.entities,
  profissionals: storeState.profissional.entities,
  franquias: storeState.franquia.entities,
  especialidades: storeState.especialidade.entities,
  statusAtendimentos: storeState.statusAtendimento.entities,
  periodos: storeState.periodo.entities,
  cidades: storeState.cidade.entities,
  atendimentoList: atendimento.entities,
  totalItems: atendimento.totalItems
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getPadItems,
  getPacientes,
  getOperadoras,
  getProfissionals,
  getFranquias,
  getEspecialidades,
  getStatusAtendimentos,
  getPeriodos,
  getCidades,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Atendimento);
