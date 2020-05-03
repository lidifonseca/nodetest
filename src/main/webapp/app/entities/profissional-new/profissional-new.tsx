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
import { getEntities } from './profissional-new.reducer';
import { IProfissionalNew } from 'app/shared/model/profissional-new.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IProfissionalNewProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IProfissionalNewBaseState {
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
  dataPost: any;
}
export interface IProfissionalNewState extends IProfissionalNewBaseState, IPaginationBaseState {}

export class ProfissionalNew extends React.Component<IProfissionalNewProps, IProfissionalNewState> {
  private myFormRef: any;

  constructor(props: IProfissionalNewProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getProfissionalNewState(this.props.location)
    };
  }

  getProfissionalNewState = (location): IProfissionalNewBaseState => {
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
    const dataPost = url.searchParams.get('dataPost') || '';

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
      dataPost
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
      'dataPost=' +
      this.state.dataPost +
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
      dataPost,
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
      dataPost,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { profissionalNewList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Profissional News</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Profissional News</span>
              <Button id="togglerFilterProfissionalNew" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.profissionalNew.home.createLabel">Create a new Profissional New</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterProfissionalNew">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="idUnidadeLabel" for="profissional-new-idUnidade">
                            <Translate contentKey="generadorApp.profissionalNew.idUnidade">Id Unidade</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="idUnidade"
                            id="profissional-new-idUnidade"
                            value={this.state.idUnidade}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idCidadeLabel" for="profissional-new-idCidade">
                            <Translate contentKey="generadorApp.profissionalNew.idCidade">Id Cidade</Translate>
                          </Label>

                          <AvInput type="text" name="idCidade" id="profissional-new-idCidade" value={this.state.idCidade} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idTempoExperienciaLabel" for="profissional-new-idTempoExperiencia">
                            <Translate contentKey="generadorApp.profissionalNew.idTempoExperiencia">Id Tempo Experiencia</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="idTempoExperiencia"
                            id="profissional-new-idTempoExperiencia"
                            value={this.state.idTempoExperiencia}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idBancoLabel" for="profissional-new-idBanco">
                            <Translate contentKey="generadorApp.profissionalNew.idBanco">Id Banco</Translate>
                          </Label>
                          <AvInput type="string" name="idBanco" id="profissional-new-idBanco" value={this.state.idBanco} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="senhaLabel" for="profissional-new-senha">
                            <Translate contentKey="generadorApp.profissionalNew.senha">Senha</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="senha"
                            id="profissional-new-senha"
                            value={this.state.senha}
                            validate={{
                              maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="nomeLabel" for="profissional-new-nome">
                            <Translate contentKey="generadorApp.profissionalNew.nome">Nome</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="nome"
                            id="profissional-new-nome"
                            value={this.state.nome}
                            validate={{
                              maxLength: { value: 60, errorMessage: translate('entity.validation.maxlength', { max: 60 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="emailLabel" for="profissional-new-email">
                            <Translate contentKey="generadorApp.profissionalNew.email">Email</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="email"
                            id="profissional-new-email"
                            value={this.state.email}
                            validate={{
                              maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cpfLabel" for="profissional-new-cpf">
                            <Translate contentKey="generadorApp.profissionalNew.cpf">Cpf</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="cpf"
                            id="profissional-new-cpf"
                            value={this.state.cpf}
                            validate={{
                              maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="rgLabel" for="profissional-new-rg">
                            <Translate contentKey="generadorApp.profissionalNew.rg">Rg</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="rg"
                            id="profissional-new-rg"
                            value={this.state.rg}
                            validate={{
                              maxLength: { value: 30, errorMessage: translate('entity.validation.maxlength', { max: 30 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="nomeEmpresaLabel" for="profissional-new-nomeEmpresa">
                            <Translate contentKey="generadorApp.profissionalNew.nomeEmpresa">Nome Empresa</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="nomeEmpresa"
                            id="profissional-new-nomeEmpresa"
                            value={this.state.nomeEmpresa}
                            validate={{
                              maxLength: { value: 150, errorMessage: translate('entity.validation.maxlength', { max: 150 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cnpjLabel" for="profissional-new-cnpj">
                            <Translate contentKey="generadorApp.profissionalNew.cnpj">Cnpj</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="cnpj"
                            id="profissional-new-cnpj"
                            value={this.state.cnpj}
                            validate={{
                              maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="registroLabel" for="profissional-new-registro">
                            <Translate contentKey="generadorApp.profissionalNew.registro">Registro</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="registro"
                            id="profissional-new-registro"
                            value={this.state.registro}
                            validate={{
                              maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="nascimentoLabel" for="profissional-new-nascimento">
                            <Translate contentKey="generadorApp.profissionalNew.nascimento">Nascimento</Translate>
                          </Label>
                          <AvInput type="date" name="nascimento" id="profissional-new-nascimento" value={this.state.nascimento} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="sexoLabel" for="profissional-new-sexo">
                            <Translate contentKey="generadorApp.profissionalNew.sexo">Sexo</Translate>
                          </Label>
                          <AvInput type="string" name="sexo" id="profissional-new-sexo" value={this.state.sexo} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="telefone1Label" for="profissional-new-telefone1">
                            <Translate contentKey="generadorApp.profissionalNew.telefone1">Telefone 1</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="telefone1"
                            id="profissional-new-telefone1"
                            value={this.state.telefone1}
                            validate={{
                              maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="telefone2Label" for="profissional-new-telefone2">
                            <Translate contentKey="generadorApp.profissionalNew.telefone2">Telefone 2</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="telefone2"
                            id="profissional-new-telefone2"
                            value={this.state.telefone2}
                            validate={{
                              maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="celular1Label" for="profissional-new-celular1">
                            <Translate contentKey="generadorApp.profissionalNew.celular1">Celular 1</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="celular1"
                            id="profissional-new-celular1"
                            value={this.state.celular1}
                            validate={{
                              maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="celular2Label" for="profissional-new-celular2">
                            <Translate contentKey="generadorApp.profissionalNew.celular2">Celular 2</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="celular2"
                            id="profissional-new-celular2"
                            value={this.state.celular2}
                            validate={{
                              maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cepLabel" for="profissional-new-cep">
                            <Translate contentKey="generadorApp.profissionalNew.cep">Cep</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="cep"
                            id="profissional-new-cep"
                            value={this.state.cep}
                            validate={{
                              maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="enderecoLabel" for="profissional-new-endereco">
                            <Translate contentKey="generadorApp.profissionalNew.endereco">Endereco</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="endereco"
                            id="profissional-new-endereco"
                            value={this.state.endereco}
                            validate={{
                              maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="numeroLabel" for="profissional-new-numero">
                            <Translate contentKey="generadorApp.profissionalNew.numero">Numero</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="numero"
                            id="profissional-new-numero"
                            value={this.state.numero}
                            validate={{
                              maxLength: { value: 30, errorMessage: translate('entity.validation.maxlength', { max: 30 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="complementoLabel" for="profissional-new-complemento">
                            <Translate contentKey="generadorApp.profissionalNew.complemento">Complemento</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="complemento"
                            id="profissional-new-complemento"
                            value={this.state.complemento}
                            validate={{
                              maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="bairroLabel" for="profissional-new-bairro">
                            <Translate contentKey="generadorApp.profissionalNew.bairro">Bairro</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="bairro"
                            id="profissional-new-bairro"
                            value={this.state.bairro}
                            validate={{
                              maxLength: { value: 40, errorMessage: translate('entity.validation.maxlength', { max: 40 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cidadeLabel" for="profissional-new-cidade">
                            <Translate contentKey="generadorApp.profissionalNew.cidade">Cidade</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="cidade"
                            id="profissional-new-cidade"
                            value={this.state.cidade}
                            validate={{
                              maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ufLabel" for="profissional-new-uf">
                            <Translate contentKey="generadorApp.profissionalNew.uf">Uf</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="uf"
                            id="profissional-new-uf"
                            value={this.state.uf}
                            validate={{
                              maxLength: { value: 5, errorMessage: translate('entity.validation.maxlength', { max: 5 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="atendeCriancaLabel" for="profissional-new-atendeCrianca">
                            <Translate contentKey="generadorApp.profissionalNew.atendeCrianca">Atende Crianca</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="atendeCrianca"
                            id="profissional-new-atendeCrianca"
                            value={this.state.atendeCrianca}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="atendeIdosoLabel" for="profissional-new-atendeIdoso">
                            <Translate contentKey="generadorApp.profissionalNew.atendeIdoso">Atende Idoso</Translate>
                          </Label>
                          <AvInput type="string" name="atendeIdoso" id="profissional-new-atendeIdoso" value={this.state.atendeIdoso} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="agLabel" for="profissional-new-ag">
                            <Translate contentKey="generadorApp.profissionalNew.ag">Ag</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="ag"
                            id="profissional-new-ag"
                            value={this.state.ag}
                            validate={{
                              maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="contaLabel" for="profissional-new-conta">
                            <Translate contentKey="generadorApp.profissionalNew.conta">Conta</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="conta"
                            id="profissional-new-conta"
                            value={this.state.conta}
                            validate={{
                              maxLength: { value: 25, errorMessage: translate('entity.validation.maxlength', { max: 25 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="tipoContaLabel" for="profissional-new-tipoConta">
                            <Translate contentKey="generadorApp.profissionalNew.tipoConta">Tipo Conta</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="tipoConta"
                            id="profissional-new-tipoConta"
                            value={this.state.tipoConta}
                            validate={{
                              maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="origemCadastroLabel" for="profissional-new-origemCadastro">
                            <Translate contentKey="generadorApp.profissionalNew.origemCadastro">Origem Cadastro</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="origemCadastro"
                            id="profissional-new-origemCadastro"
                            value={this.state.origemCadastro}
                            validate={{
                              maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="obsLabel" for="profissional-new-obs">
                            <Translate contentKey="generadorApp.profissionalNew.obs">Obs</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="obs"
                            id="profissional-new-obs"
                            value={this.state.obs}
                            validate={{
                              maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="chavePrivadaLabel" for="profissional-new-chavePrivada">
                            <Translate contentKey="generadorApp.profissionalNew.chavePrivada">Chave Privada</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="chavePrivada"
                            id="profissional-new-chavePrivada"
                            value={this.state.chavePrivada}
                            validate={{
                              maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="profissional-new-ativo">
                            <Translate contentKey="generadorApp.profissionalNew.ativo">Ativo</Translate>
                          </Label>
                          <AvInput type="string" name="ativo" id="profissional-new-ativo" value={this.state.ativo} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataPostLabel" for="profissional-new-dataPost">
                            <Translate contentKey="generadorApp.profissionalNew.dataPost">Data Post</Translate>
                          </Label>
                          <AvInput
                            id="profissional-new-dataPost"
                            type="datetime-local"
                            className="form-control"
                            name="dataPost"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.dataPost ? convertDateTimeFromServer(this.state.dataPost) : null}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') }
                            }}
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

              {profissionalNewList && profissionalNewList.length > 0 ? (
                <Table responsive aria-describedby="profissional-new-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idUnidade')}>
                        <Translate contentKey="generadorApp.profissionalNew.idUnidade">Id Unidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idCidade')}>
                        <Translate contentKey="generadorApp.profissionalNew.idCidade">Id Cidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idTempoExperiencia')}>
                        <Translate contentKey="generadorApp.profissionalNew.idTempoExperiencia">Id Tempo Experiencia</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idBanco')}>
                        <Translate contentKey="generadorApp.profissionalNew.idBanco">Id Banco</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('senha')}>
                        <Translate contentKey="generadorApp.profissionalNew.senha">Senha</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('nome')}>
                        <Translate contentKey="generadorApp.profissionalNew.nome">Nome</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('email')}>
                        <Translate contentKey="generadorApp.profissionalNew.email">Email</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cpf')}>
                        <Translate contentKey="generadorApp.profissionalNew.cpf">Cpf</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('rg')}>
                        <Translate contentKey="generadorApp.profissionalNew.rg">Rg</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('nomeEmpresa')}>
                        <Translate contentKey="generadorApp.profissionalNew.nomeEmpresa">Nome Empresa</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cnpj')}>
                        <Translate contentKey="generadorApp.profissionalNew.cnpj">Cnpj</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('registro')}>
                        <Translate contentKey="generadorApp.profissionalNew.registro">Registro</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('nascimento')}>
                        <Translate contentKey="generadorApp.profissionalNew.nascimento">Nascimento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('sexo')}>
                        <Translate contentKey="generadorApp.profissionalNew.sexo">Sexo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('telefone1')}>
                        <Translate contentKey="generadorApp.profissionalNew.telefone1">Telefone 1</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('telefone2')}>
                        <Translate contentKey="generadorApp.profissionalNew.telefone2">Telefone 2</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('celular1')}>
                        <Translate contentKey="generadorApp.profissionalNew.celular1">Celular 1</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('celular2')}>
                        <Translate contentKey="generadorApp.profissionalNew.celular2">Celular 2</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cep')}>
                        <Translate contentKey="generadorApp.profissionalNew.cep">Cep</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('endereco')}>
                        <Translate contentKey="generadorApp.profissionalNew.endereco">Endereco</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('numero')}>
                        <Translate contentKey="generadorApp.profissionalNew.numero">Numero</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('complemento')}>
                        <Translate contentKey="generadorApp.profissionalNew.complemento">Complemento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('bairro')}>
                        <Translate contentKey="generadorApp.profissionalNew.bairro">Bairro</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cidade')}>
                        <Translate contentKey="generadorApp.profissionalNew.cidade">Cidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('uf')}>
                        <Translate contentKey="generadorApp.profissionalNew.uf">Uf</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('atendeCrianca')}>
                        <Translate contentKey="generadorApp.profissionalNew.atendeCrianca">Atende Crianca</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('atendeIdoso')}>
                        <Translate contentKey="generadorApp.profissionalNew.atendeIdoso">Atende Idoso</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ag')}>
                        <Translate contentKey="generadorApp.profissionalNew.ag">Ag</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('conta')}>
                        <Translate contentKey="generadorApp.profissionalNew.conta">Conta</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('tipoConta')}>
                        <Translate contentKey="generadorApp.profissionalNew.tipoConta">Tipo Conta</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('origemCadastro')}>
                        <Translate contentKey="generadorApp.profissionalNew.origemCadastro">Origem Cadastro</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('obs')}>
                        <Translate contentKey="generadorApp.profissionalNew.obs">Obs</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('chavePrivada')}>
                        <Translate contentKey="generadorApp.profissionalNew.chavePrivada">Chave Privada</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.profissionalNew.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataPost')}>
                        <Translate contentKey="generadorApp.profissionalNew.dataPost">Data Post</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {profissionalNewList.map((profissionalNew, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${profissionalNew.id}`} color="link" size="sm">
                            {profissionalNew.id}
                          </Button>
                        </td>

                        <td>{profissionalNew.idUnidade}</td>

                        <td>{profissionalNew.idCidade}</td>

                        <td>{profissionalNew.idTempoExperiencia}</td>

                        <td>{profissionalNew.idBanco}</td>

                        <td>{profissionalNew.senha}</td>

                        <td>{profissionalNew.nome}</td>

                        <td>{profissionalNew.email}</td>

                        <td>{profissionalNew.cpf}</td>

                        <td>{profissionalNew.rg}</td>

                        <td>{profissionalNew.nomeEmpresa}</td>

                        <td>{profissionalNew.cnpj}</td>

                        <td>{profissionalNew.registro}</td>

                        <td>
                          <TextFormat type="date" value={profissionalNew.nascimento} format={APP_LOCAL_DATE_FORMAT} />
                        </td>

                        <td>{profissionalNew.sexo}</td>

                        <td>{profissionalNew.telefone1}</td>

                        <td>{profissionalNew.telefone2}</td>

                        <td>{profissionalNew.celular1}</td>

                        <td>{profissionalNew.celular2}</td>

                        <td>{profissionalNew.cep}</td>

                        <td>{profissionalNew.endereco}</td>

                        <td>{profissionalNew.numero}</td>

                        <td>{profissionalNew.complemento}</td>

                        <td>{profissionalNew.bairro}</td>

                        <td>{profissionalNew.cidade}</td>

                        <td>{profissionalNew.uf}</td>

                        <td>{profissionalNew.atendeCrianca}</td>

                        <td>{profissionalNew.atendeIdoso}</td>

                        <td>{profissionalNew.ag}</td>

                        <td>{profissionalNew.conta}</td>

                        <td>{profissionalNew.tipoConta}</td>

                        <td>{profissionalNew.origemCadastro}</td>

                        <td>{profissionalNew.obs}</td>

                        <td>{profissionalNew.chavePrivada}</td>

                        <td>{profissionalNew.ativo}</td>

                        <td>
                          <TextFormat type="date" value={profissionalNew.dataPost} format={APP_DATE_FORMAT} />
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${profissionalNew.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${profissionalNew.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${profissionalNew.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.profissionalNew.home.notFound">No Profissional News found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={profissionalNewList && profissionalNewList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ profissionalNew, ...storeState }: IRootState) => ({
  profissionalNewList: profissionalNew.entities,
  totalItems: profissionalNew.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalNew);
