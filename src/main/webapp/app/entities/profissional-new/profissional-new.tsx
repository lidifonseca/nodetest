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
import { getProfissionalNewState, IProfissionalNewBaseState, getEntities } from './profissional-new.reducer';
import { IProfissionalNew } from 'app/shared/model/profissional-new.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { getEntities as getUnidadeEasies } from 'app/entities/unidade-easy/unidade-easy.reducer';

export interface IProfissionalNewProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IProfissionalNewState extends IProfissionalNewBaseState, IPaginationBaseState {}

export class ProfissionalNew extends React.Component<IProfissionalNewProps, IProfissionalNewState> {
  private myFormRef: any;

  constructor(props: IProfissionalNewProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getProfissionalNewState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getUnidadeEasies();
  }

  cancelCourse = () => {
    this.setState(
      {
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
        unidade: ''
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
      'unidade=' +
      this.state.unidade +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
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
      unidade,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
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
      unidade,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { unidadeEasies, profissionalNewList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Profissional News</span>
          <Button id="togglerFilterProfissionalNew" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.profissionalNew.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.profissionalNew.home.createLabel">Create a new Profissional New</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Profissional News</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterProfissionalNew">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idCidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idCidadeLabel" for="profissional-new-idCidade">
                              <Translate contentKey="generadorApp.profissionalNew.idCidade">Id Cidade</Translate>
                            </Label>

                            <AvInput type="text" name="idCidade" id="profissional-new-idCidade" value={this.state.idCidade} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idTempoExperiencia' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'idBanco' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idBancoLabel" for="profissional-new-idBanco">
                              <Translate contentKey="generadorApp.profissionalNew.idBanco">Id Banco</Translate>
                            </Label>
                            <AvInput type="string" name="idBanco" id="profissional-new-idBanco" value={this.state.idBanco} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'senha' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="senhaLabel" for="profissional-new-senha">
                              <Translate contentKey="generadorApp.profissionalNew.senha">Senha</Translate>
                            </Label>

                            <AvInput type="text" name="senha" id="profissional-new-senha" value={this.state.senha} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'nome' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="nomeLabel" for="profissional-new-nome">
                              <Translate contentKey="generadorApp.profissionalNew.nome">Nome</Translate>
                            </Label>

                            <AvInput type="text" name="nome" id="profissional-new-nome" value={this.state.nome} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'email' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="emailLabel" for="profissional-new-email">
                              <Translate contentKey="generadorApp.profissionalNew.email">Email</Translate>
                            </Label>

                            <AvInput type="text" name="email" id="profissional-new-email" value={this.state.email} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cpf' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cpfLabel" for="profissional-new-cpf">
                              <Translate contentKey="generadorApp.profissionalNew.cpf">Cpf</Translate>
                            </Label>

                            <AvInput type="text" name="cpf" id="profissional-new-cpf" value={this.state.cpf} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'rg' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="rgLabel" for="profissional-new-rg">
                              <Translate contentKey="generadorApp.profissionalNew.rg">Rg</Translate>
                            </Label>

                            <AvInput type="text" name="rg" id="profissional-new-rg" value={this.state.rg} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'nomeEmpresa' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="nomeEmpresaLabel" for="profissional-new-nomeEmpresa">
                              <Translate contentKey="generadorApp.profissionalNew.nomeEmpresa">Nome Empresa</Translate>
                            </Label>

                            <AvInput type="text" name="nomeEmpresa" id="profissional-new-nomeEmpresa" value={this.state.nomeEmpresa} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cnpj' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cnpjLabel" for="profissional-new-cnpj">
                              <Translate contentKey="generadorApp.profissionalNew.cnpj">Cnpj</Translate>
                            </Label>

                            <AvInput type="text" name="cnpj" id="profissional-new-cnpj" value={this.state.cnpj} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'registro' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="registroLabel" for="profissional-new-registro">
                              <Translate contentKey="generadorApp.profissionalNew.registro">Registro</Translate>
                            </Label>

                            <AvInput type="text" name="registro" id="profissional-new-registro" value={this.state.registro} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'nascimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="nascimentoLabel" for="profissional-new-nascimento">
                              <Translate contentKey="generadorApp.profissionalNew.nascimento">Nascimento</Translate>
                            </Label>
                            <AvInput type="date" name="nascimento" id="profissional-new-nascimento" value={this.state.nascimento} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'sexo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="sexoLabel" for="profissional-new-sexo">
                              <Translate contentKey="generadorApp.profissionalNew.sexo">Sexo</Translate>
                            </Label>
                            <AvInput type="string" name="sexo" id="profissional-new-sexo" value={this.state.sexo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'telefone1' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="telefone1Label" for="profissional-new-telefone1">
                              <Translate contentKey="generadorApp.profissionalNew.telefone1">Telefone 1</Translate>
                            </Label>

                            <AvInput type="text" name="telefone1" id="profissional-new-telefone1" value={this.state.telefone1} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'telefone2' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="telefone2Label" for="profissional-new-telefone2">
                              <Translate contentKey="generadorApp.profissionalNew.telefone2">Telefone 2</Translate>
                            </Label>

                            <AvInput type="text" name="telefone2" id="profissional-new-telefone2" value={this.state.telefone2} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'celular1' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="celular1Label" for="profissional-new-celular1">
                              <Translate contentKey="generadorApp.profissionalNew.celular1">Celular 1</Translate>
                            </Label>

                            <AvInput type="text" name="celular1" id="profissional-new-celular1" value={this.state.celular1} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'celular2' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="celular2Label" for="profissional-new-celular2">
                              <Translate contentKey="generadorApp.profissionalNew.celular2">Celular 2</Translate>
                            </Label>

                            <AvInput type="text" name="celular2" id="profissional-new-celular2" value={this.state.celular2} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cep' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cepLabel" for="profissional-new-cep">
                              <Translate contentKey="generadorApp.profissionalNew.cep">Cep</Translate>
                            </Label>

                            <AvInput type="text" name="cep" id="profissional-new-cep" value={this.state.cep} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'endereco' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="enderecoLabel" for="profissional-new-endereco">
                              <Translate contentKey="generadorApp.profissionalNew.endereco">Endereco</Translate>
                            </Label>

                            <AvInput type="text" name="endereco" id="profissional-new-endereco" value={this.state.endereco} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'numero' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="numeroLabel" for="profissional-new-numero">
                              <Translate contentKey="generadorApp.profissionalNew.numero">Numero</Translate>
                            </Label>

                            <AvInput type="text" name="numero" id="profissional-new-numero" value={this.state.numero} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'complemento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="complementoLabel" for="profissional-new-complemento">
                              <Translate contentKey="generadorApp.profissionalNew.complemento">Complemento</Translate>
                            </Label>

                            <AvInput type="text" name="complemento" id="profissional-new-complemento" value={this.state.complemento} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'bairro' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="bairroLabel" for="profissional-new-bairro">
                              <Translate contentKey="generadorApp.profissionalNew.bairro">Bairro</Translate>
                            </Label>

                            <AvInput type="text" name="bairro" id="profissional-new-bairro" value={this.state.bairro} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cidadeLabel" for="profissional-new-cidade">
                              <Translate contentKey="generadorApp.profissionalNew.cidade">Cidade</Translate>
                            </Label>

                            <AvInput type="text" name="cidade" id="profissional-new-cidade" value={this.state.cidade} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'uf' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ufLabel" for="profissional-new-uf">
                              <Translate contentKey="generadorApp.profissionalNew.uf">Uf</Translate>
                            </Label>

                            <AvInput type="text" name="uf" id="profissional-new-uf" value={this.state.uf} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'atendeCrianca' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'atendeIdoso' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="atendeIdosoLabel" for="profissional-new-atendeIdoso">
                              <Translate contentKey="generadorApp.profissionalNew.atendeIdoso">Atende Idoso</Translate>
                            </Label>
                            <AvInput type="string" name="atendeIdoso" id="profissional-new-atendeIdoso" value={this.state.atendeIdoso} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ag' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="agLabel" for="profissional-new-ag">
                              <Translate contentKey="generadorApp.profissionalNew.ag">Ag</Translate>
                            </Label>

                            <AvInput type="text" name="ag" id="profissional-new-ag" value={this.state.ag} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'conta' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="contaLabel" for="profissional-new-conta">
                              <Translate contentKey="generadorApp.profissionalNew.conta">Conta</Translate>
                            </Label>

                            <AvInput type="text" name="conta" id="profissional-new-conta" value={this.state.conta} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'tipoConta' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="tipoContaLabel" for="profissional-new-tipoConta">
                              <Translate contentKey="generadorApp.profissionalNew.tipoConta">Tipo Conta</Translate>
                            </Label>

                            <AvInput type="text" name="tipoConta" id="profissional-new-tipoConta" value={this.state.tipoConta} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'origemCadastro' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="origemCadastroLabel" for="profissional-new-origemCadastro">
                              <Translate contentKey="generadorApp.profissionalNew.origemCadastro">Origem Cadastro</Translate>
                            </Label>

                            <AvInput
                              type="text"
                              name="origemCadastro"
                              id="profissional-new-origemCadastro"
                              value={this.state.origemCadastro}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'obs' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="obsLabel" for="profissional-new-obs">
                              <Translate contentKey="generadorApp.profissionalNew.obs">Obs</Translate>
                            </Label>
                            <AvInput id="profissional-new-obs" type="textarea" name="obs" />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'chavePrivada' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="chavePrivadaLabel" for="profissional-new-chavePrivada">
                              <Translate contentKey="generadorApp.profissionalNew.chavePrivada">Chave Privada</Translate>
                            </Label>

                            <AvInput type="text" name="chavePrivada" id="profissional-new-chavePrivada" value={this.state.chavePrivada} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ativo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ativoLabel" for="profissional-new-ativo">
                              <Translate contentKey="generadorApp.profissionalNew.ativo">Ativo</Translate>
                            </Label>
                            <AvInput type="string" name="ativo" id="profissional-new-ativo" value={this.state.ativo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'unidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="profissional-new-unidade">
                                <Translate contentKey="generadorApp.profissionalNew.unidade">Unidade</Translate>
                              </Label>
                              <Select
                                id="profissional-new-unidade"
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
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.profissionalNew.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.profissionalNew.home.btn_filter_clean">Clean</Translate>
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
                      {this.state.baseFilters !== 'idCidade' ? (
                        <th className="hand" onClick={this.sort('idCidade')}>
                          <Translate contentKey="generadorApp.profissionalNew.idCidade">Id Cidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idTempoExperiencia' ? (
                        <th className="hand" onClick={this.sort('idTempoExperiencia')}>
                          <Translate contentKey="generadorApp.profissionalNew.idTempoExperiencia">Id Tempo Experiencia</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idBanco' ? (
                        <th className="hand" onClick={this.sort('idBanco')}>
                          <Translate contentKey="generadorApp.profissionalNew.idBanco">Id Banco</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'senha' ? (
                        <th className="hand" onClick={this.sort('senha')}>
                          <Translate contentKey="generadorApp.profissionalNew.senha">Senha</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'nome' ? (
                        <th className="hand" onClick={this.sort('nome')}>
                          <Translate contentKey="generadorApp.profissionalNew.nome">Nome</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'email' ? (
                        <th className="hand" onClick={this.sort('email')}>
                          <Translate contentKey="generadorApp.profissionalNew.email">Email</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cpf' ? (
                        <th className="hand" onClick={this.sort('cpf')}>
                          <Translate contentKey="generadorApp.profissionalNew.cpf">Cpf</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'rg' ? (
                        <th className="hand" onClick={this.sort('rg')}>
                          <Translate contentKey="generadorApp.profissionalNew.rg">Rg</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'nomeEmpresa' ? (
                        <th className="hand" onClick={this.sort('nomeEmpresa')}>
                          <Translate contentKey="generadorApp.profissionalNew.nomeEmpresa">Nome Empresa</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cnpj' ? (
                        <th className="hand" onClick={this.sort('cnpj')}>
                          <Translate contentKey="generadorApp.profissionalNew.cnpj">Cnpj</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'registro' ? (
                        <th className="hand" onClick={this.sort('registro')}>
                          <Translate contentKey="generadorApp.profissionalNew.registro">Registro</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'nascimento' ? (
                        <th className="hand" onClick={this.sort('nascimento')}>
                          <Translate contentKey="generadorApp.profissionalNew.nascimento">Nascimento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'sexo' ? (
                        <th className="hand" onClick={this.sort('sexo')}>
                          <Translate contentKey="generadorApp.profissionalNew.sexo">Sexo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'telefone1' ? (
                        <th className="hand" onClick={this.sort('telefone1')}>
                          <Translate contentKey="generadorApp.profissionalNew.telefone1">Telefone 1</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'telefone2' ? (
                        <th className="hand" onClick={this.sort('telefone2')}>
                          <Translate contentKey="generadorApp.profissionalNew.telefone2">Telefone 2</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'celular1' ? (
                        <th className="hand" onClick={this.sort('celular1')}>
                          <Translate contentKey="generadorApp.profissionalNew.celular1">Celular 1</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'celular2' ? (
                        <th className="hand" onClick={this.sort('celular2')}>
                          <Translate contentKey="generadorApp.profissionalNew.celular2">Celular 2</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cep' ? (
                        <th className="hand" onClick={this.sort('cep')}>
                          <Translate contentKey="generadorApp.profissionalNew.cep">Cep</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'endereco' ? (
                        <th className="hand" onClick={this.sort('endereco')}>
                          <Translate contentKey="generadorApp.profissionalNew.endereco">Endereco</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'numero' ? (
                        <th className="hand" onClick={this.sort('numero')}>
                          <Translate contentKey="generadorApp.profissionalNew.numero">Numero</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'complemento' ? (
                        <th className="hand" onClick={this.sort('complemento')}>
                          <Translate contentKey="generadorApp.profissionalNew.complemento">Complemento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'bairro' ? (
                        <th className="hand" onClick={this.sort('bairro')}>
                          <Translate contentKey="generadorApp.profissionalNew.bairro">Bairro</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cidade' ? (
                        <th className="hand" onClick={this.sort('cidade')}>
                          <Translate contentKey="generadorApp.profissionalNew.cidade">Cidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'uf' ? (
                        <th className="hand" onClick={this.sort('uf')}>
                          <Translate contentKey="generadorApp.profissionalNew.uf">Uf</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'atendeCrianca' ? (
                        <th className="hand" onClick={this.sort('atendeCrianca')}>
                          <Translate contentKey="generadorApp.profissionalNew.atendeCrianca">Atende Crianca</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'atendeIdoso' ? (
                        <th className="hand" onClick={this.sort('atendeIdoso')}>
                          <Translate contentKey="generadorApp.profissionalNew.atendeIdoso">Atende Idoso</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ag' ? (
                        <th className="hand" onClick={this.sort('ag')}>
                          <Translate contentKey="generadorApp.profissionalNew.ag">Ag</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'conta' ? (
                        <th className="hand" onClick={this.sort('conta')}>
                          <Translate contentKey="generadorApp.profissionalNew.conta">Conta</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'tipoConta' ? (
                        <th className="hand" onClick={this.sort('tipoConta')}>
                          <Translate contentKey="generadorApp.profissionalNew.tipoConta">Tipo Conta</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'origemCadastro' ? (
                        <th className="hand" onClick={this.sort('origemCadastro')}>
                          <Translate contentKey="generadorApp.profissionalNew.origemCadastro">Origem Cadastro</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'obs' ? (
                        <th className="hand" onClick={this.sort('obs')}>
                          <Translate contentKey="generadorApp.profissionalNew.obs">Obs</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'chavePrivada' ? (
                        <th className="hand" onClick={this.sort('chavePrivada')}>
                          <Translate contentKey="generadorApp.profissionalNew.chavePrivada">Chave Privada</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ativo' ? (
                        <th className="hand" onClick={this.sort('ativo')}>
                          <Translate contentKey="generadorApp.profissionalNew.ativo">Ativo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'unidade' ? (
                        <th>
                          <Translate contentKey="generadorApp.profissionalNew.unidade">Unidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

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

                        {this.state.baseFilters !== 'idCidade' ? <td>{profissionalNew.idCidade}</td> : null}

                        {this.state.baseFilters !== 'idTempoExperiencia' ? <td>{profissionalNew.idTempoExperiencia}</td> : null}

                        {this.state.baseFilters !== 'idBanco' ? <td>{profissionalNew.idBanco}</td> : null}

                        {this.state.baseFilters !== 'senha' ? <td>{profissionalNew.senha}</td> : null}

                        {this.state.baseFilters !== 'nome' ? <td>{profissionalNew.nome}</td> : null}

                        {this.state.baseFilters !== 'email' ? <td>{profissionalNew.email}</td> : null}

                        {this.state.baseFilters !== 'cpf' ? <td>{profissionalNew.cpf}</td> : null}

                        {this.state.baseFilters !== 'rg' ? <td>{profissionalNew.rg}</td> : null}

                        {this.state.baseFilters !== 'nomeEmpresa' ? <td>{profissionalNew.nomeEmpresa}</td> : null}

                        {this.state.baseFilters !== 'cnpj' ? <td>{profissionalNew.cnpj}</td> : null}

                        {this.state.baseFilters !== 'registro' ? <td>{profissionalNew.registro}</td> : null}

                        {this.state.baseFilters !== 'nascimento' ? (
                          <td>
                            <TextFormat type="date" value={profissionalNew.nascimento} format={APP_LOCAL_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'sexo' ? <td>{profissionalNew.sexo}</td> : null}

                        {this.state.baseFilters !== 'telefone1' ? <td>{profissionalNew.telefone1}</td> : null}

                        {this.state.baseFilters !== 'telefone2' ? <td>{profissionalNew.telefone2}</td> : null}

                        {this.state.baseFilters !== 'celular1' ? <td>{profissionalNew.celular1}</td> : null}

                        {this.state.baseFilters !== 'celular2' ? <td>{profissionalNew.celular2}</td> : null}

                        {this.state.baseFilters !== 'cep' ? <td>{profissionalNew.cep}</td> : null}

                        {this.state.baseFilters !== 'endereco' ? <td>{profissionalNew.endereco}</td> : null}

                        {this.state.baseFilters !== 'numero' ? <td>{profissionalNew.numero}</td> : null}

                        {this.state.baseFilters !== 'complemento' ? <td>{profissionalNew.complemento}</td> : null}

                        {this.state.baseFilters !== 'bairro' ? <td>{profissionalNew.bairro}</td> : null}

                        {this.state.baseFilters !== 'cidade' ? <td>{profissionalNew.cidade}</td> : null}

                        {this.state.baseFilters !== 'uf' ? <td>{profissionalNew.uf}</td> : null}

                        {this.state.baseFilters !== 'atendeCrianca' ? <td>{profissionalNew.atendeCrianca}</td> : null}

                        {this.state.baseFilters !== 'atendeIdoso' ? <td>{profissionalNew.atendeIdoso}</td> : null}

                        {this.state.baseFilters !== 'ag' ? <td>{profissionalNew.ag}</td> : null}

                        {this.state.baseFilters !== 'conta' ? <td>{profissionalNew.conta}</td> : null}

                        {this.state.baseFilters !== 'tipoConta' ? <td>{profissionalNew.tipoConta}</td> : null}

                        {this.state.baseFilters !== 'origemCadastro' ? <td>{profissionalNew.origemCadastro}</td> : null}

                        {this.state.baseFilters !== 'obs' ? (
                          <td>{profissionalNew.obs ? Buffer.from(profissionalNew.obs).toString() : null}</td>
                        ) : null}

                        {this.state.baseFilters !== 'chavePrivada' ? <td>{profissionalNew.chavePrivada}</td> : null}

                        {this.state.baseFilters !== 'ativo' ? <td>{profissionalNew.ativo}</td> : null}

                        {this.state.baseFilters !== 'unidade' ? (
                          <td>
                            {profissionalNew.unidade ? (
                              <Link to={`unidade-easy/${profissionalNew.unidade.id}`}>{profissionalNew.unidade.id}</Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${profissionalNew.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${profissionalNew.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${profissionalNew.id}/delete?${this.getFiltersURL()}`}
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
  unidadeEasies: storeState.unidadeEasy.entities,
  profissionalNewList: profissionalNew.entities,
  totalItems: profissionalNew.totalItems
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalNew);
