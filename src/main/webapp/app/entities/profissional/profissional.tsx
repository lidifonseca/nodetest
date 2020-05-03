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
import { getEntities } from './profissional.reducer';
import { IProfissional } from 'app/shared/model/profissional.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IProfissionalProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IProfissionalBaseState {
  idUnidade: any;
  idCidade: any;
  idTempoExperiencia: any;
  idBanco: any;
  senha: any;
  nome: any;
  email: any;
  cpf: any;
  rg: any;
  nomeEmpresa: any;
  cnpj: any;
  registro: any;
  nascimento: any;
  sexo: any;
  telefone1: any;
  telefone2: any;
  celular1: any;
  celular2: any;
  cep: any;
  endereco: any;
  numero: any;
  complemento: any;
  bairro: any;
  cidade: any;
  uf: any;
  atendeCrianca: any;
  atendeIdoso: any;
  ag: any;
  conta: any;
  tipoConta: any;
  origemCadastro: any;
  obs: any;
  chavePrivada: any;
  ativo: any;
  senhaOriginal: any;
  dataSenha: any;
  expoToken: any;
  preferenciaAtendimento: any;
  senhaChat: any;
  atendimentoAceite: any;
  atendimentoAssinaturas: any;
}
export interface IProfissionalState extends IProfissionalBaseState, IPaginationBaseState {}

export class Profissional extends React.Component<IProfissionalProps, IProfissionalState> {
  private myFormRef: any;

  constructor(props: IProfissionalProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getProfissionalState(this.props.location)
    };
  }

  getProfissionalState = (location): IProfissionalBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const idUnidade = url.searchParams.get('idUnidade') || '';
    const idCidade = url.searchParams.get('idCidade') || '';
    const idTempoExperiencia = url.searchParams.get('idTempoExperiencia') || '';
    const idBanco = url.searchParams.get('idBanco') || '';
    const senha = url.searchParams.get('senha') || '';
    const nome = url.searchParams.get('nome') || '';
    const email = url.searchParams.get('email') || '';
    const cpf = url.searchParams.get('cpf') || '';
    const rg = url.searchParams.get('rg') || '';
    const nomeEmpresa = url.searchParams.get('nomeEmpresa') || '';
    const cnpj = url.searchParams.get('cnpj') || '';
    const registro = url.searchParams.get('registro') || '';
    const nascimento = url.searchParams.get('nascimento') || '';
    const sexo = url.searchParams.get('sexo') || '';
    const telefone1 = url.searchParams.get('telefone1') || '';
    const telefone2 = url.searchParams.get('telefone2') || '';
    const celular1 = url.searchParams.get('celular1') || '';
    const celular2 = url.searchParams.get('celular2') || '';
    const cep = url.searchParams.get('cep') || '';
    const endereco = url.searchParams.get('endereco') || '';
    const numero = url.searchParams.get('numero') || '';
    const complemento = url.searchParams.get('complemento') || '';
    const bairro = url.searchParams.get('bairro') || '';
    const cidade = url.searchParams.get('cidade') || '';
    const uf = url.searchParams.get('uf') || '';
    const atendeCrianca = url.searchParams.get('atendeCrianca') || '';
    const atendeIdoso = url.searchParams.get('atendeIdoso') || '';
    const ag = url.searchParams.get('ag') || '';
    const conta = url.searchParams.get('conta') || '';
    const tipoConta = url.searchParams.get('tipoConta') || '';
    const origemCadastro = url.searchParams.get('origemCadastro') || '';
    const obs = url.searchParams.get('obs') || '';
    const chavePrivada = url.searchParams.get('chavePrivada') || '';
    const ativo = url.searchParams.get('ativo') || '';
    const senhaOriginal = url.searchParams.get('senhaOriginal') || '';
    const dataSenha = url.searchParams.get('dataSenha') || '';
    const expoToken = url.searchParams.get('expoToken') || '';
    const preferenciaAtendimento = url.searchParams.get('preferenciaAtendimento') || '';
    const senhaChat = url.searchParams.get('senhaChat') || '';

    const atendimentoAceite = url.searchParams.get('atendimentoAceite') || '';
    const atendimentoAssinaturas = url.searchParams.get('atendimentoAssinaturas') || '';

    return {
      idUnidade,
      idCidade,
      idTempoExperiencia,
      idBanco,
      senha,
      nome,
      email,
      cpf,
      rg,
      nomeEmpresa,
      cnpj,
      registro,
      nascimento,
      sexo,
      telefone1,
      telefone2,
      celular1,
      celular2,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      atendeCrianca,
      atendeIdoso,
      ag,
      conta,
      tipoConta,
      origemCadastro,
      obs,
      chavePrivada,
      ativo,
      senhaOriginal,
      dataSenha,
      expoToken,
      preferenciaAtendimento,
      senhaChat,
      atendimentoAceite,
      atendimentoAssinaturas
    };
  };

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idUnidade: '',
        idCidade: '',
        idTempoExperiencia: '',
        idBanco: '',
        senha: '',
        nome: '',
        email: '',
        cpf: '',
        rg: '',
        nomeEmpresa: '',
        cnpj: '',
        registro: '',
        nascimento: '',
        sexo: '',
        telefone1: '',
        telefone2: '',
        celular1: '',
        celular2: '',
        cep: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',
        atendeCrianca: '',
        atendeIdoso: '',
        ag: '',
        conta: '',
        tipoConta: '',
        origemCadastro: '',
        obs: '',
        chavePrivada: '',
        ativo: '',
        senhaOriginal: '',
        dataSenha: '',
        expoToken: '',
        preferenciaAtendimento: '',
        senhaChat: '',
        atendimentoAceite: '',
        atendimentoAssinaturas: ''
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
      'idUnidade=' +
      this.state.idUnidade +
      '&' +
      'idCidade=' +
      this.state.idCidade +
      '&' +
      'idTempoExperiencia=' +
      this.state.idTempoExperiencia +
      '&' +
      'idBanco=' +
      this.state.idBanco +
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
      'nomeEmpresa=' +
      this.state.nomeEmpresa +
      '&' +
      'cnpj=' +
      this.state.cnpj +
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
      'telefone1=' +
      this.state.telefone1 +
      '&' +
      'telefone2=' +
      this.state.telefone2 +
      '&' +
      'celular1=' +
      this.state.celular1 +
      '&' +
      'celular2=' +
      this.state.celular2 +
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
      'cidade=' +
      this.state.cidade +
      '&' +
      'uf=' +
      this.state.uf +
      '&' +
      'atendeCrianca=' +
      this.state.atendeCrianca +
      '&' +
      'atendeIdoso=' +
      this.state.atendeIdoso +
      '&' +
      'ag=' +
      this.state.ag +
      '&' +
      'conta=' +
      this.state.conta +
      '&' +
      'tipoConta=' +
      this.state.tipoConta +
      '&' +
      'origemCadastro=' +
      this.state.origemCadastro +
      '&' +
      'obs=' +
      this.state.obs +
      '&' +
      'chavePrivada=' +
      this.state.chavePrivada +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'senhaOriginal=' +
      this.state.senhaOriginal +
      '&' +
      'dataSenha=' +
      this.state.dataSenha +
      '&' +
      'expoToken=' +
      this.state.expoToken +
      '&' +
      'preferenciaAtendimento=' +
      this.state.preferenciaAtendimento +
      '&' +
      'senhaChat=' +
      this.state.senhaChat +
      '&' +
      'atendimentoAceite=' +
      this.state.atendimentoAceite +
      '&' +
      'atendimentoAssinaturas=' +
      this.state.atendimentoAssinaturas +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      idUnidade,
      idCidade,
      idTempoExperiencia,
      idBanco,
      senha,
      nome,
      email,
      cpf,
      rg,
      nomeEmpresa,
      cnpj,
      registro,
      nascimento,
      sexo,
      telefone1,
      telefone2,
      celular1,
      celular2,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      atendeCrianca,
      atendeIdoso,
      ag,
      conta,
      tipoConta,
      origemCadastro,
      obs,
      chavePrivada,
      ativo,
      senhaOriginal,
      dataSenha,
      expoToken,
      preferenciaAtendimento,
      senhaChat,
      atendimentoAceite,
      atendimentoAssinaturas,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      idUnidade,
      idCidade,
      idTempoExperiencia,
      idBanco,
      senha,
      nome,
      email,
      cpf,
      rg,
      nomeEmpresa,
      cnpj,
      registro,
      nascimento,
      sexo,
      telefone1,
      telefone2,
      celular1,
      celular2,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      atendeCrianca,
      atendeIdoso,
      ag,
      conta,
      tipoConta,
      origemCadastro,
      obs,
      chavePrivada,
      ativo,
      senhaOriginal,
      dataSenha,
      expoToken,
      preferenciaAtendimento,
      senhaChat,
      atendimentoAceite,
      atendimentoAssinaturas,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { profissionalList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Profissionals</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Profissionals</span>
              <Button id="togglerFilterProfissional" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.profissional.home.createLabel">Create a new Profissional</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterProfissional">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="idUnidadeLabel" for="profissional-idUnidade">
                            <Translate contentKey="generadorApp.profissional.idUnidade">Id Unidade</Translate>
                          </Label>

                          <AvInput type="text" name="idUnidade" id="profissional-idUnidade" value={this.state.idUnidade} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idCidadeLabel" for="profissional-idCidade">
                            <Translate contentKey="generadorApp.profissional.idCidade">Id Cidade</Translate>
                          </Label>

                          <AvInput type="text" name="idCidade" id="profissional-idCidade" value={this.state.idCidade} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idTempoExperienciaLabel" for="profissional-idTempoExperiencia">
                            <Translate contentKey="generadorApp.profissional.idTempoExperiencia">Id Tempo Experiencia</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="idTempoExperiencia"
                            id="profissional-idTempoExperiencia"
                            value={this.state.idTempoExperiencia}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idBancoLabel" for="profissional-idBanco">
                            <Translate contentKey="generadorApp.profissional.idBanco">Id Banco</Translate>
                          </Label>
                          <AvInput type="string" name="idBanco" id="profissional-idBanco" value={this.state.idBanco} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="senhaLabel" for="profissional-senha">
                            <Translate contentKey="generadorApp.profissional.senha">Senha</Translate>
                          </Label>

                          <AvInput type="text" name="senha" id="profissional-senha" value={this.state.senha} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="nomeLabel" for="profissional-nome">
                            <Translate contentKey="generadorApp.profissional.nome">Nome</Translate>
                          </Label>

                          <AvInput type="text" name="nome" id="profissional-nome" value={this.state.nome} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="emailLabel" for="profissional-email">
                            <Translate contentKey="generadorApp.profissional.email">Email</Translate>
                          </Label>

                          <AvInput type="text" name="email" id="profissional-email" value={this.state.email} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cpfLabel" for="profissional-cpf">
                            <Translate contentKey="generadorApp.profissional.cpf">Cpf</Translate>
                          </Label>

                          <AvInput type="text" name="cpf" id="profissional-cpf" value={this.state.cpf} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="rgLabel" for="profissional-rg">
                            <Translate contentKey="generadorApp.profissional.rg">Rg</Translate>
                          </Label>

                          <AvInput type="text" name="rg" id="profissional-rg" value={this.state.rg} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="nomeEmpresaLabel" for="profissional-nomeEmpresa">
                            <Translate contentKey="generadorApp.profissional.nomeEmpresa">Nome Empresa</Translate>
                          </Label>

                          <AvInput type="text" name="nomeEmpresa" id="profissional-nomeEmpresa" value={this.state.nomeEmpresa} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cnpjLabel" for="profissional-cnpj">
                            <Translate contentKey="generadorApp.profissional.cnpj">Cnpj</Translate>
                          </Label>

                          <AvInput type="text" name="cnpj" id="profissional-cnpj" value={this.state.cnpj} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="registroLabel" for="profissional-registro">
                            <Translate contentKey="generadorApp.profissional.registro">Registro</Translate>
                          </Label>

                          <AvInput type="text" name="registro" id="profissional-registro" value={this.state.registro} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="nascimentoLabel" for="profissional-nascimento">
                            <Translate contentKey="generadorApp.profissional.nascimento">Nascimento</Translate>
                          </Label>
                          <AvInput type="date" name="nascimento" id="profissional-nascimento" value={this.state.nascimento} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="sexoLabel" for="profissional-sexo">
                            <Translate contentKey="generadorApp.profissional.sexo">Sexo</Translate>
                          </Label>
                          <AvInput type="string" name="sexo" id="profissional-sexo" value={this.state.sexo} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="telefone1Label" for="profissional-telefone1">
                            <Translate contentKey="generadorApp.profissional.telefone1">Telefone 1</Translate>
                          </Label>

                          <AvInput type="text" name="telefone1" id="profissional-telefone1" value={this.state.telefone1} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="telefone2Label" for="profissional-telefone2">
                            <Translate contentKey="generadorApp.profissional.telefone2">Telefone 2</Translate>
                          </Label>

                          <AvInput type="text" name="telefone2" id="profissional-telefone2" value={this.state.telefone2} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="celular1Label" for="profissional-celular1">
                            <Translate contentKey="generadorApp.profissional.celular1">Celular 1</Translate>
                          </Label>

                          <AvInput type="text" name="celular1" id="profissional-celular1" value={this.state.celular1} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="celular2Label" for="profissional-celular2">
                            <Translate contentKey="generadorApp.profissional.celular2">Celular 2</Translate>
                          </Label>

                          <AvInput type="text" name="celular2" id="profissional-celular2" value={this.state.celular2} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cepLabel" for="profissional-cep">
                            <Translate contentKey="generadorApp.profissional.cep">Cep</Translate>
                          </Label>

                          <AvInput type="text" name="cep" id="profissional-cep" value={this.state.cep} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="enderecoLabel" for="profissional-endereco">
                            <Translate contentKey="generadorApp.profissional.endereco">Endereco</Translate>
                          </Label>

                          <AvInput type="text" name="endereco" id="profissional-endereco" value={this.state.endereco} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="numeroLabel" for="profissional-numero">
                            <Translate contentKey="generadorApp.profissional.numero">Numero</Translate>
                          </Label>

                          <AvInput type="text" name="numero" id="profissional-numero" value={this.state.numero} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="complementoLabel" for="profissional-complemento">
                            <Translate contentKey="generadorApp.profissional.complemento">Complemento</Translate>
                          </Label>

                          <AvInput type="text" name="complemento" id="profissional-complemento" value={this.state.complemento} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="bairroLabel" for="profissional-bairro">
                            <Translate contentKey="generadorApp.profissional.bairro">Bairro</Translate>
                          </Label>

                          <AvInput type="text" name="bairro" id="profissional-bairro" value={this.state.bairro} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cidadeLabel" for="profissional-cidade">
                            <Translate contentKey="generadorApp.profissional.cidade">Cidade</Translate>
                          </Label>

                          <AvInput type="text" name="cidade" id="profissional-cidade" value={this.state.cidade} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ufLabel" for="profissional-uf">
                            <Translate contentKey="generadorApp.profissional.uf">Uf</Translate>
                          </Label>

                          <AvInput type="text" name="uf" id="profissional-uf" value={this.state.uf} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="atendeCriancaLabel" for="profissional-atendeCrianca">
                            <Translate contentKey="generadorApp.profissional.atendeCrianca">Atende Crianca</Translate>
                          </Label>
                          <AvInput type="string" name="atendeCrianca" id="profissional-atendeCrianca" value={this.state.atendeCrianca} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="atendeIdosoLabel" for="profissional-atendeIdoso">
                            <Translate contentKey="generadorApp.profissional.atendeIdoso">Atende Idoso</Translate>
                          </Label>
                          <AvInput type="string" name="atendeIdoso" id="profissional-atendeIdoso" value={this.state.atendeIdoso} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="agLabel" for="profissional-ag">
                            <Translate contentKey="generadorApp.profissional.ag">Ag</Translate>
                          </Label>

                          <AvInput type="text" name="ag" id="profissional-ag" value={this.state.ag} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="contaLabel" for="profissional-conta">
                            <Translate contentKey="generadorApp.profissional.conta">Conta</Translate>
                          </Label>

                          <AvInput type="text" name="conta" id="profissional-conta" value={this.state.conta} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="tipoContaLabel" for="profissional-tipoConta">
                            <Translate contentKey="generadorApp.profissional.tipoConta">Tipo Conta</Translate>
                          </Label>

                          <AvInput type="text" name="tipoConta" id="profissional-tipoConta" value={this.state.tipoConta} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="origemCadastroLabel" for="profissional-origemCadastro">
                            <Translate contentKey="generadorApp.profissional.origemCadastro">Origem Cadastro</Translate>
                          </Label>

                          <AvInput type="text" name="origemCadastro" id="profissional-origemCadastro" value={this.state.origemCadastro} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="obsLabel" for="profissional-obs">
                            <Translate contentKey="generadorApp.profissional.obs">Obs</Translate>
                          </Label>
                          <AvInput id="profissional-obs" type="textarea" name="obs" />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="chavePrivadaLabel" for="profissional-chavePrivada">
                            <Translate contentKey="generadorApp.profissional.chavePrivada">Chave Privada</Translate>
                          </Label>

                          <AvInput type="text" name="chavePrivada" id="profissional-chavePrivada" value={this.state.chavePrivada} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="profissional-ativo">
                            <Translate contentKey="generadorApp.profissional.ativo">Ativo</Translate>
                          </Label>
                          <AvInput type="string" name="ativo" id="profissional-ativo" value={this.state.ativo} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="senhaOriginalLabel" for="profissional-senhaOriginal">
                            <Translate contentKey="generadorApp.profissional.senhaOriginal">Senha Original</Translate>
                          </Label>

                          <AvInput type="text" name="senhaOriginal" id="profissional-senhaOriginal" value={this.state.senhaOriginal} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataSenhaLabel" for="profissional-dataSenha">
                            <Translate contentKey="generadorApp.profissional.dataSenha">Data Senha</Translate>
                          </Label>
                          <AvInput
                            id="profissional-dataSenha"
                            type="datetime-local"
                            className="form-control"
                            name="dataSenha"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.dataSenha ? convertDateTimeFromServer(this.state.dataSenha) : null}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="expoTokenLabel" for="profissional-expoToken">
                            <Translate contentKey="generadorApp.profissional.expoToken">Expo Token</Translate>
                          </Label>

                          <AvInput type="text" name="expoToken" id="profissional-expoToken" value={this.state.expoToken} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="preferenciaAtendimentoLabel" for="profissional-preferenciaAtendimento">
                            <Translate contentKey="generadorApp.profissional.preferenciaAtendimento">Preferencia Atendimento</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="preferenciaAtendimento"
                            id="profissional-preferenciaAtendimento"
                            value={this.state.preferenciaAtendimento}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="senhaChatLabel" for="profissional-senhaChat">
                            <Translate contentKey="generadorApp.profissional.senhaChat">Senha Chat</Translate>
                          </Label>

                          <AvInput type="text" name="senhaChat" id="profissional-senhaChat" value={this.state.senhaChat} />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
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

              {profissionalList && profissionalList.length > 0 ? (
                <Table responsive aria-describedby="profissional-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idUnidade')}>
                        <Translate contentKey="generadorApp.profissional.idUnidade">Id Unidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idCidade')}>
                        <Translate contentKey="generadorApp.profissional.idCidade">Id Cidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idTempoExperiencia')}>
                        <Translate contentKey="generadorApp.profissional.idTempoExperiencia">Id Tempo Experiencia</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idBanco')}>
                        <Translate contentKey="generadorApp.profissional.idBanco">Id Banco</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('senha')}>
                        <Translate contentKey="generadorApp.profissional.senha">Senha</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('nome')}>
                        <Translate contentKey="generadorApp.profissional.nome">Nome</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('email')}>
                        <Translate contentKey="generadorApp.profissional.email">Email</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cpf')}>
                        <Translate contentKey="generadorApp.profissional.cpf">Cpf</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('rg')}>
                        <Translate contentKey="generadorApp.profissional.rg">Rg</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('nomeEmpresa')}>
                        <Translate contentKey="generadorApp.profissional.nomeEmpresa">Nome Empresa</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cnpj')}>
                        <Translate contentKey="generadorApp.profissional.cnpj">Cnpj</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('registro')}>
                        <Translate contentKey="generadorApp.profissional.registro">Registro</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('nascimento')}>
                        <Translate contentKey="generadorApp.profissional.nascimento">Nascimento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('sexo')}>
                        <Translate contentKey="generadorApp.profissional.sexo">Sexo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('telefone1')}>
                        <Translate contentKey="generadorApp.profissional.telefone1">Telefone 1</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('telefone2')}>
                        <Translate contentKey="generadorApp.profissional.telefone2">Telefone 2</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('celular1')}>
                        <Translate contentKey="generadorApp.profissional.celular1">Celular 1</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('celular2')}>
                        <Translate contentKey="generadorApp.profissional.celular2">Celular 2</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cep')}>
                        <Translate contentKey="generadorApp.profissional.cep">Cep</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('endereco')}>
                        <Translate contentKey="generadorApp.profissional.endereco">Endereco</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('numero')}>
                        <Translate contentKey="generadorApp.profissional.numero">Numero</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('complemento')}>
                        <Translate contentKey="generadorApp.profissional.complemento">Complemento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('bairro')}>
                        <Translate contentKey="generadorApp.profissional.bairro">Bairro</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cidade')}>
                        <Translate contentKey="generadorApp.profissional.cidade">Cidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('uf')}>
                        <Translate contentKey="generadorApp.profissional.uf">Uf</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('atendeCrianca')}>
                        <Translate contentKey="generadorApp.profissional.atendeCrianca">Atende Crianca</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('atendeIdoso')}>
                        <Translate contentKey="generadorApp.profissional.atendeIdoso">Atende Idoso</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ag')}>
                        <Translate contentKey="generadorApp.profissional.ag">Ag</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('conta')}>
                        <Translate contentKey="generadorApp.profissional.conta">Conta</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('tipoConta')}>
                        <Translate contentKey="generadorApp.profissional.tipoConta">Tipo Conta</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('origemCadastro')}>
                        <Translate contentKey="generadorApp.profissional.origemCadastro">Origem Cadastro</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('obs')}>
                        <Translate contentKey="generadorApp.profissional.obs">Obs</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('chavePrivada')}>
                        <Translate contentKey="generadorApp.profissional.chavePrivada">Chave Privada</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.profissional.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('senhaOriginal')}>
                        <Translate contentKey="generadorApp.profissional.senhaOriginal">Senha Original</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataSenha')}>
                        <Translate contentKey="generadorApp.profissional.dataSenha">Data Senha</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('expoToken')}>
                        <Translate contentKey="generadorApp.profissional.expoToken">Expo Token</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('preferenciaAtendimento')}>
                        <Translate contentKey="generadorApp.profissional.preferenciaAtendimento">Preferencia Atendimento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('senhaChat')}>
                        <Translate contentKey="generadorApp.profissional.senhaChat">Senha Chat</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {profissionalList.map((profissional, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${profissional.id}`} color="link" size="sm">
                            {profissional.id}
                          </Button>
                        </td>

                        <td>{profissional.idUnidade}</td>

                        <td>{profissional.idCidade}</td>

                        <td>{profissional.idTempoExperiencia}</td>

                        <td>{profissional.idBanco}</td>

                        <td>{profissional.senha}</td>

                        <td>{profissional.nome}</td>

                        <td>{profissional.email}</td>

                        <td>{profissional.cpf}</td>

                        <td>{profissional.rg}</td>

                        <td>{profissional.nomeEmpresa}</td>

                        <td>{profissional.cnpj}</td>

                        <td>{profissional.registro}</td>

                        <td>
                          <TextFormat type="date" value={profissional.nascimento} format={APP_LOCAL_DATE_FORMAT} />
                        </td>

                        <td>{profissional.sexo}</td>

                        <td>{profissional.telefone1}</td>

                        <td>{profissional.telefone2}</td>

                        <td>{profissional.celular1}</td>

                        <td>{profissional.celular2}</td>

                        <td>{profissional.cep}</td>

                        <td>{profissional.endereco}</td>

                        <td>{profissional.numero}</td>

                        <td>{profissional.complemento}</td>

                        <td>{profissional.bairro}</td>

                        <td>{profissional.cidade}</td>

                        <td>{profissional.uf}</td>

                        <td>{profissional.atendeCrianca}</td>

                        <td>{profissional.atendeIdoso}</td>

                        <td>{profissional.ag}</td>

                        <td>{profissional.conta}</td>

                        <td>{profissional.tipoConta}</td>

                        <td>{profissional.origemCadastro}</td>

                        <td>{profissional.obs}</td>

                        <td>{profissional.chavePrivada}</td>

                        <td>{profissional.ativo}</td>

                        <td>{profissional.senhaOriginal}</td>

                        <td>
                          <TextFormat type="date" value={profissional.dataSenha} format={APP_DATE_FORMAT} />
                        </td>

                        <td>{profissional.expoToken}</td>

                        <td>{profissional.preferenciaAtendimento}</td>

                        <td>{profissional.senhaChat}</td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${profissional.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${profissional.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${profissional.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.profissional.home.notFound">No Profissionals found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={profissionalList && profissionalList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ profissional, ...storeState }: IRootState) => ({
  profissionalList: profissional.entities,
  totalItems: profissional.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Profissional);
