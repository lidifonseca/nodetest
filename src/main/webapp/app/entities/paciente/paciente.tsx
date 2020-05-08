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
import { getPacienteState, IPacienteBaseState, getEntities } from './paciente.reducer';
import { IPaciente } from 'app/shared/model/paciente.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { getEntities as getUnidadeEasies } from 'app/entities/unidade-easy/unidade-easy.reducer';
import { IFranquia } from 'app/shared/model/franquia.model';
import { getEntities as getFranquias } from 'app/entities/franquia/franquia.reducer';
import { ICidade } from 'app/shared/model/cidade.model';
import { getEntities as getCidades } from 'app/entities/cidade/cidade.reducer';
import { IGrauParentesco } from 'app/shared/model/grau-parentesco.model';
import { getEntities as getGrauParentescos } from 'app/entities/grau-parentesco/grau-parentesco.reducer';
import { IProfissional } from 'app/shared/model/profissional.model';
import { getEntities as getProfissionals } from 'app/entities/profissional/profissional.reducer';
import { IPacienteHospital } from 'app/shared/model/paciente-hospital.model';
import { getEntities as getPacienteHospitals } from 'app/entities/paciente-hospital/paciente-hospital.reducer';

export interface IPacienteProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPacienteState extends IPacienteBaseState, IPaginationBaseState {
  dropdownButtons: {};
}

export class Paciente extends React.Component<IPacienteProps, IPacienteState> {
  private myFormRef: any;

  constructor(props: IPacienteProps) {
    super(props);
    this.state = {
      dropdownButtons: {},
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getPacienteState(this.props.location)
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
    this.props.getFranquias();
    this.props.getCidades();
    this.props.getGrauParentescos();
    this.props.getProfissionals();
    this.props.getPacienteHospitals();
  }

  cancelCourse = () => {
    this.setState(
      {
        senha: '',
        nome: '',
        email: '',
        cpf: '',
        rg: '',
        registro: '',
        nascimento: '',
        sexo: '',
        telefone: '',
        telefone2: '',
        celular: '',
        celular1: '',
        cep: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        uf: '',
        latitude: '',
        longitude: '',
        responsavelFamiliar: '',
        emailFamiliar: '',
        cpfFamiliar: '',
        rgFamiliar: '',
        nascimentoFamiliar: '',
        sexoFamiliar: '',
        telefoneFamiliar: '',
        telefone2Familiar: '',
        celularFamiliar: '',
        celular2Familiar: '',
        cepFamiliar: '',
        enderecoFamiliar: '',
        numeroFamiliar: '',
        complementoFamiliar: '',
        bairroFamiliar: '',
        ufFamiliar: '',
        latitudeFamiliar: '',
        longitudeFamiliar: '',
        observacao: '',
        aph: '',
        nivelComplexidade: '',
        passagemPs: '',
        obsPs: '',
        passagemInternacao: '',
        obsInternacao: '',
        custoTotal: '',
        observacaoFamiliar: '',
        mesmoEndereco: '',
        acessoFamiliar: '',
        comResponsavel: '',
        cadastroCompleto: '',
        ativo: '',
        detalhes: '',
        liminar: '',
        expoToken: '',
        atendimento: '',
        atendimentoAssinaturas: '',
        diario: '',
        pacienteDadosCartao: '',
        pacienteDiagnostico: '',
        pacienteDiario: '',
        pacienteEnqueteApp: '',
        pacienteOperadora: '',
        pacientePedido: '',
        pacientePush: '',
        pad: '',
        unidade: '',
        franquia: '',
        cidade: '',
        cidadeFamiliar: '',
        grauParentesco: '',
        profissionalPref: '',
        tipohospital: ''
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
      'senha=' +
      this.state.senha +
      '&' +
      'nome=' +
      this.state.nome +
      '&' +
      'email=' +
      this.state.email +
      '&' +
      'cpf=' +
      this.state.cpf +
      '&' +
      'rg=' +
      this.state.rg +
      '&' +
      'registro=' +
      this.state.registro +
      '&' +
      'nascimento=' +
      this.state.nascimento +
      '&' +
      'sexo=' +
      this.state.sexo +
      '&' +
      'telefone=' +
      this.state.telefone +
      '&' +
      'telefone2=' +
      this.state.telefone2 +
      '&' +
      'celular=' +
      this.state.celular +
      '&' +
      'celular1=' +
      this.state.celular1 +
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
      'responsavelFamiliar=' +
      this.state.responsavelFamiliar +
      '&' +
      'emailFamiliar=' +
      this.state.emailFamiliar +
      '&' +
      'cpfFamiliar=' +
      this.state.cpfFamiliar +
      '&' +
      'rgFamiliar=' +
      this.state.rgFamiliar +
      '&' +
      'nascimentoFamiliar=' +
      this.state.nascimentoFamiliar +
      '&' +
      'sexoFamiliar=' +
      this.state.sexoFamiliar +
      '&' +
      'telefoneFamiliar=' +
      this.state.telefoneFamiliar +
      '&' +
      'telefone2Familiar=' +
      this.state.telefone2Familiar +
      '&' +
      'celularFamiliar=' +
      this.state.celularFamiliar +
      '&' +
      'celular2Familiar=' +
      this.state.celular2Familiar +
      '&' +
      'cepFamiliar=' +
      this.state.cepFamiliar +
      '&' +
      'enderecoFamiliar=' +
      this.state.enderecoFamiliar +
      '&' +
      'numeroFamiliar=' +
      this.state.numeroFamiliar +
      '&' +
      'complementoFamiliar=' +
      this.state.complementoFamiliar +
      '&' +
      'bairroFamiliar=' +
      this.state.bairroFamiliar +
      '&' +
      'ufFamiliar=' +
      this.state.ufFamiliar +
      '&' +
      'latitudeFamiliar=' +
      this.state.latitudeFamiliar +
      '&' +
      'longitudeFamiliar=' +
      this.state.longitudeFamiliar +
      '&' +
      'observacao=' +
      this.state.observacao +
      '&' +
      'aph=' +
      this.state.aph +
      '&' +
      'nivelComplexidade=' +
      this.state.nivelComplexidade +
      '&' +
      'passagemPs=' +
      this.state.passagemPs +
      '&' +
      'obsPs=' +
      this.state.obsPs +
      '&' +
      'passagemInternacao=' +
      this.state.passagemInternacao +
      '&' +
      'obsInternacao=' +
      this.state.obsInternacao +
      '&' +
      'custoTotal=' +
      this.state.custoTotal +
      '&' +
      'observacaoFamiliar=' +
      this.state.observacaoFamiliar +
      '&' +
      'mesmoEndereco=' +
      this.state.mesmoEndereco +
      '&' +
      'acessoFamiliar=' +
      this.state.acessoFamiliar +
      '&' +
      'comResponsavel=' +
      this.state.comResponsavel +
      '&' +
      'cadastroCompleto=' +
      this.state.cadastroCompleto +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'detalhes=' +
      this.state.detalhes +
      '&' +
      'liminar=' +
      this.state.liminar +
      '&' +
      'expoToken=' +
      this.state.expoToken +
      '&' +
      'atendimento=' +
      this.state.atendimento +
      '&' +
      'atendimentoAssinaturas=' +
      this.state.atendimentoAssinaturas +
      '&' +
      'diario=' +
      this.state.diario +
      '&' +
      'pacienteDadosCartao=' +
      this.state.pacienteDadosCartao +
      '&' +
      'pacienteDiagnostico=' +
      this.state.pacienteDiagnostico +
      '&' +
      'pacienteDiario=' +
      this.state.pacienteDiario +
      '&' +
      'pacienteEnqueteApp=' +
      this.state.pacienteEnqueteApp +
      '&' +
      'pacienteOperadora=' +
      this.state.pacienteOperadora +
      '&' +
      'pacientePedido=' +
      this.state.pacientePedido +
      '&' +
      'pacientePush=' +
      this.state.pacientePush +
      '&' +
      'pad=' +
      this.state.pad +
      '&' +
      'unidade=' +
      this.state.unidade +
      '&' +
      'franquia=' +
      this.state.franquia +
      '&' +
      'cidade=' +
      this.state.cidade +
      '&' +
      'cidadeFamiliar=' +
      this.state.cidadeFamiliar +
      '&' +
      'grauParentesco=' +
      this.state.grauParentesco +
      '&' +
      'profissionalPref=' +
      this.state.profissionalPref +
      '&' +
      'tipohospital=' +
      this.state.tipohospital +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      senha,
      nome,
      email,
      cpf,
      rg,
      registro,
      nascimento,
      sexo,
      telefone,
      telefone2,
      celular,
      celular1,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      uf,
      latitude,
      longitude,
      responsavelFamiliar,
      emailFamiliar,
      cpfFamiliar,
      rgFamiliar,
      nascimentoFamiliar,
      sexoFamiliar,
      telefoneFamiliar,
      telefone2Familiar,
      celularFamiliar,
      celular2Familiar,
      cepFamiliar,
      enderecoFamiliar,
      numeroFamiliar,
      complementoFamiliar,
      bairroFamiliar,
      ufFamiliar,
      latitudeFamiliar,
      longitudeFamiliar,
      observacao,
      aph,
      nivelComplexidade,
      passagemPs,
      obsPs,
      passagemInternacao,
      obsInternacao,
      custoTotal,
      observacaoFamiliar,
      mesmoEndereco,
      acessoFamiliar,
      comResponsavel,
      cadastroCompleto,
      ativo,
      detalhes,
      liminar,
      expoToken,
      atendimento,
      atendimentoAssinaturas,
      diario,
      pacienteDadosCartao,
      pacienteDiagnostico,
      pacienteDiario,
      pacienteEnqueteApp,
      pacienteOperadora,
      pacientePedido,
      pacientePush,
      pad,
      unidade,
      franquia,
      cidade,
      cidadeFamiliar,
      grauParentesco,
      profissionalPref,
      tipohospital,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      senha,
      nome,
      email,
      cpf,
      rg,
      registro,
      nascimento,
      sexo,
      telefone,
      telefone2,
      celular,
      celular1,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      uf,
      latitude,
      longitude,
      responsavelFamiliar,
      emailFamiliar,
      cpfFamiliar,
      rgFamiliar,
      nascimentoFamiliar,
      sexoFamiliar,
      telefoneFamiliar,
      telefone2Familiar,
      celularFamiliar,
      celular2Familiar,
      cepFamiliar,
      enderecoFamiliar,
      numeroFamiliar,
      complementoFamiliar,
      bairroFamiliar,
      ufFamiliar,
      latitudeFamiliar,
      longitudeFamiliar,
      observacao,
      aph,
      nivelComplexidade,
      passagemPs,
      obsPs,
      passagemInternacao,
      obsInternacao,
      custoTotal,
      observacaoFamiliar,
      mesmoEndereco,
      acessoFamiliar,
      comResponsavel,
      cadastroCompleto,
      ativo,
      detalhes,
      liminar,
      expoToken,
      atendimento,
      atendimentoAssinaturas,
      diario,
      pacienteDadosCartao,
      pacienteDiagnostico,
      pacienteDiario,
      pacienteEnqueteApp,
      pacienteOperadora,
      pacientePedido,
      pacientePush,
      pad,
      unidade,
      franquia,
      cidade,
      cidadeFamiliar,
      grauParentesco,
      profissionalPref,
      tipohospital,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const {
      unidadeEasies,
      franquias,
      cidades,
      grauParentescos,
      profissionals,
      pacienteHospitals,
      pacienteList,
      match,
      totalItems
    } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Pacientes</span>
          <Button id="togglerFilterPaciente" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.paciente.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.paciente.home.createLabel">Create a new Paciente</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pacientes</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPaciente">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'nome' ? (
                        <Col md="6">
                          <Row className="mr-1 mt-1">
                            <Label id="nomeLabel" for="paciente-nome">
                              <Translate contentKey="generadorApp.paciente.nome">Nome</Translate>
                            </Label>

                            <AvInput type="text" name="nome" id="paciente-nome" value={this.state.nome} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'email' ? (
                        <Col md="6">
                          <Row className="mr-1 mt-1">
                            <Label id="emailLabel" for="paciente-email">
                              <Translate contentKey="generadorApp.paciente.email">Email</Translate>
                            </Label>

                            <AvInput type="text" name="email" id="paciente-email" value={this.state.email} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cpf' ? (
                        <Col md="6">
                          <Row className="mr-1 mt-1">
                            <Label id="cpfLabel" for="paciente-cpf">
                              <Translate contentKey="generadorApp.paciente.cpf">Cpf</Translate>
                            </Label>

                            <AvInput type="text" name="cpf" id="paciente-cpf" value={this.state.cpf} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'rg' ? (
                        <Col md="6">
                          <Row className="mr-1 mt-1">
                            <Label id="rgLabel" for="paciente-rg">
                              <Translate contentKey="generadorApp.paciente.rg">Rg</Translate>
                            </Label>

                            <AvInput type="text" name="rg" id="paciente-rg" value={this.state.rg} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'registro' ? (
                        <Col md="6">
                          <Row className="mr-1 mt-1">
                            <Label id="registroLabel" for="paciente-registro">
                              <Translate contentKey="generadorApp.paciente.registro">Registro</Translate>
                            </Label>

                            <AvInput type="text" name="registro" id="paciente-registro" value={this.state.registro} />
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.paciente.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.paciente.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {pacienteList && pacienteList.length > 0 ? (
                <Table responsive aria-describedby="paciente-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('nome')}>
                        <Translate contentKey="generadorApp.paciente.nome"></Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cep')}>
                        <Translate contentKey="generadorApp.paciente.cep"></Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('bairro')}>
                        <Translate contentKey="generadorApp.paciente.bairro"></Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('rg')}>
                        <Translate contentKey="generadorApp.paciente.rg"></Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('registro')}>
                        <Translate contentKey="generadorApp.paciente.registro"></Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {pacienteList.map((paciente, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${paciente.id}`} color="link" size="sm">
                            {paciente.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'nome' ? <td>{paciente.nome}</td> : null}

                        {this.state.baseFilters !== 'cep' ? <td>{paciente.cep}</td> : null}

                        {this.state.baseFilters !== 'bairro' ? <td>{paciente.bairro}</td> : null}

                        {this.state.baseFilters !== 'rg' ? <td>{paciente.rg}</td> : null}

                        {this.state.baseFilters !== 'registro' ? <td>{paciente.registro}</td> : null}

                        <td className="text-right">
                          <Dropdown isOpen={this.state.dropdownButtons[i]} toggle={() => this.toggle(i)}>
                            <DropdownToggle caret>
                              <Translate contentKey="generadorApp.paciente.dropdown_btn">Actions</Translate>
                            </DropdownToggle>
                            <DropdownMenu right>
                              <DropdownItem tag={Link} to={`${match.url}/${paciente.id}`} color="info" size="sm">
                                <FontAwesomeIcon icon="eye" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.paciente.listButtons.view">View</Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem tag={Link} to={`${match.url}/${paciente.id}/edit`} color="info" size="sm">
                                <FontAwesomeIcon icon="pencil-alt" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.paciente.listButtons.edit">Edit</Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem tag={Link} to={`${match.url}/${paciente.id}/delete`} color="info" size="sm">
                                <FontAwesomeIcon icon="trash" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.paciente.listButtons.delete">Delete</Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem tag={Link} to={`${match.url}/${paciente.id}/delete`} color="info" size="sm">
                                <FontAwesomeIcon icon="file-text-o" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.paciente.listButtons.RelatoriodeInformacoes">
                                    RelatoriodeInformacoes
                                  </Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem tag={Link} to={`${match.url}/${paciente.id}/delete`} color="info" size="sm">
                                <FontAwesomeIcon icon="list" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.paciente.listButtons.IndicadoresClinicos">
                                    IndicadoresClinicos
                                  </Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem tag={Link} to={`${match.url}/${paciente.id}/delete`} color="info" size="sm">
                                <FontAwesomeIcon icon="list" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.paciente.listButtons.Monitoramento">Monitoramento</Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem tag={Link} to={`${match.url}/${paciente.id}/delete`} color="info" size="sm">
                                <FontAwesomeIcon icon="search" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.paciente.listButtons.VisualizarProntuario">
                                    VisualizarProntuario
                                  </Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem
                                tag={Link}
                                to={`/paciente-status-atual?baseFilters=paciente&paciente=${paciente.id}`}
                                color="info"
                                size="sm"
                              >
                                <FontAwesomeIcon icon="pencil" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.paciente.listButtons.Status">Status</Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem
                                tag={Link}
                                to={`/paciente-arquivo?baseFilters=paciente&paciente=${paciente.id}`}
                                color="info"
                                size="sm"
                              >
                                <FontAwesomeIcon icon="upload" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.paciente.listButtons.Arquivos">Arquivos</Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem
                                tag={Link}
                                to={`/paciente-diagnostico?baseFilters=paciente&paciente=${paciente.id}`}
                                color="info"
                                size="sm"
                              >
                                <FontAwesomeIcon icon="stethoscope" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.paciente.listButtons.Diagnostico">Diagnostico</Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem
                                tag={Link}
                                to={`/paciente-operadora?baseFilters=paciente&paciente=${paciente.id}`}
                                color="info"
                                size="sm"
                              >
                                <FontAwesomeIcon icon="medkit" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.paciente.listButtons.Operadora">Operadora</Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem
                                tag={Link}
                                to={`/reset-senha?baseFilters=paciente&paciente=${paciente.id}`}
                                color="info"
                                size="sm"
                              >
                                <FontAwesomeIcon icon="refresh" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.paciente.listButtons.ResetSenha">ResetSenha</Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem
                                tag={Link}
                                to={`/paciente-prontuario?baseFilters=paciente&paciente=${paciente.id}`}
                                color="info"
                                size="sm"
                              >
                                <FontAwesomeIcon icon="stethoscope" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.paciente.listButtons.ProntuarioEletronico">
                                    ProntuarioEletronico
                                  </Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem
                                tag={Link}
                                to={`/paciente-?baseFilters=paciente&paciente=${paciente.id}`}
                                color="info"
                                size="sm"
                              >
                                <FontAwesomeIcon icon="key" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.paciente.listButtons.Token">Token</Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem
                                tag={Link}
                                to={`/questionarios?baseFilters=paciente&paciente=${paciente.id}`}
                                color="info"
                                size="sm"
                              >
                                <FontAwesomeIcon icon="question" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.paciente.listButtons.Questionario">Questionario</Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem
                                tag={Link}
                                to={`/paciente-?baseFilters=paciente&paciente=${paciente.id}`}
                                color="info"
                                size="sm"
                              >
                                <FontAwesomeIcon icon="fa-list-ol" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.paciente.listButtons.TratamentoIndicado">
                                    TratamentoIndicado
                                  </Translate>
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
                  <Translate contentKey="generadorApp.paciente.home.notFound">No Pacientes found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={pacienteList && pacienteList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ paciente, ...storeState }: IRootState) => ({
  unidadeEasies: storeState.unidadeEasy.entities,
  franquias: storeState.franquia.entities,
  cidades: storeState.cidade.entities,
  grauParentescos: storeState.grauParentesco.entities,
  profissionals: storeState.profissional.entities,
  pacienteHospitals: storeState.pacienteHospital.entities,
  pacienteList: paciente.entities,
  totalItems: paciente.totalItems
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getFranquias,
  getCidades,
  getGrauParentescos,
  getProfissionals,
  getPacienteHospitals,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Paciente);
