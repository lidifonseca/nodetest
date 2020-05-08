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
import { getProfissionalState, IProfissionalBaseState, getEntities } from './profissional.reducer';
import { IProfissional } from 'app/shared/model/profissional.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { getEntities as getUnidadeEasies } from 'app/entities/unidade-easy/unidade-easy.reducer';

export interface IProfissionalProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IProfissionalState extends IProfissionalBaseState, IPaginationBaseState {}

export class Profissional extends React.Component<IProfissionalProps, IProfissionalState> {
  private myFormRef: any;

  constructor(props: IProfissionalProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getProfissionalState(this.props.location)
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
        senhaOriginal: '',
        dataSenha: '',
        expoToken: '',
        preferenciaAtendimento: '',
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
      senhaOriginal,
      dataSenha,
      expoToken,
      preferenciaAtendimento,
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
      senhaOriginal,
      dataSenha,
      expoToken,
      preferenciaAtendimento,
      unidade,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { unidadeEasies, profissionalList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Profissionals</span>
          <Button id="togglerFilterProfissional" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.profissional.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.profissional.home.createLabel">Create a new Profissional</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Profissionals</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterProfissional">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idCidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idCidadeLabel" for="profissional-idCidade">
                              <Translate contentKey="generadorApp.profissional.idCidade">Id Cidade</Translate>
                            </Label>

                            <AvInput type="text" name="idCidade" id="profissional-idCidade" value={this.state.idCidade} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idTempoExperiencia' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'idBanco' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idBancoLabel" for="profissional-idBanco">
                              <Translate contentKey="generadorApp.profissional.idBanco">Id Banco</Translate>
                            </Label>
                            <AvInput type="string" name="idBanco" id="profissional-idBanco" value={this.state.idBanco} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'senha' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="senhaLabel" for="profissional-senha">
                              <Translate contentKey="generadorApp.profissional.senha">Senha</Translate>
                            </Label>

                            <AvInput type="text" name="senha" id="profissional-senha" value={this.state.senha} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'nome' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="nomeLabel" for="profissional-nome">
                              <Translate contentKey="generadorApp.profissional.nome">Nome</Translate>
                            </Label>

                            <AvInput type="text" name="nome" id="profissional-nome" value={this.state.nome} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'email' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="emailLabel" for="profissional-email">
                              <Translate contentKey="generadorApp.profissional.email">Email</Translate>
                            </Label>

                            <AvInput type="text" name="email" id="profissional-email" value={this.state.email} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cpf' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cpfLabel" for="profissional-cpf">
                              <Translate contentKey="generadorApp.profissional.cpf">Cpf</Translate>
                            </Label>

                            <AvInput type="text" name="cpf" id="profissional-cpf" value={this.state.cpf} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'rg' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="rgLabel" for="profissional-rg">
                              <Translate contentKey="generadorApp.profissional.rg">Rg</Translate>
                            </Label>

                            <AvInput type="text" name="rg" id="profissional-rg" value={this.state.rg} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'nomeEmpresa' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="nomeEmpresaLabel" for="profissional-nomeEmpresa">
                              <Translate contentKey="generadorApp.profissional.nomeEmpresa">Nome Empresa</Translate>
                            </Label>

                            <AvInput type="text" name="nomeEmpresa" id="profissional-nomeEmpresa" value={this.state.nomeEmpresa} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cnpj' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cnpjLabel" for="profissional-cnpj">
                              <Translate contentKey="generadorApp.profissional.cnpj">Cnpj</Translate>
                            </Label>

                            <AvInput type="text" name="cnpj" id="profissional-cnpj" value={this.state.cnpj} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'registro' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="registroLabel" for="profissional-registro">
                              <Translate contentKey="generadorApp.profissional.registro">Registro</Translate>
                            </Label>

                            <AvInput type="text" name="registro" id="profissional-registro" value={this.state.registro} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'nascimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="nascimentoLabel" for="profissional-nascimento">
                              <Translate contentKey="generadorApp.profissional.nascimento">Nascimento</Translate>
                            </Label>
                            <AvInput type="date" name="nascimento" id="profissional-nascimento" value={this.state.nascimento} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'sexo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="sexoLabel" for="profissional-sexo">
                              <Translate contentKey="generadorApp.profissional.sexo">Sexo</Translate>
                            </Label>
                            <AvInput type="string" name="sexo" id="profissional-sexo" value={this.state.sexo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'telefone1' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="telefone1Label" for="profissional-telefone1">
                              <Translate contentKey="generadorApp.profissional.telefone1">Telefone 1</Translate>
                            </Label>

                            <AvInput type="text" name="telefone1" id="profissional-telefone1" value={this.state.telefone1} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'telefone2' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="telefone2Label" for="profissional-telefone2">
                              <Translate contentKey="generadorApp.profissional.telefone2">Telefone 2</Translate>
                            </Label>

                            <AvInput type="text" name="telefone2" id="profissional-telefone2" value={this.state.telefone2} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'celular1' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="celular1Label" for="profissional-celular1">
                              <Translate contentKey="generadorApp.profissional.celular1">Celular 1</Translate>
                            </Label>

                            <AvInput type="text" name="celular1" id="profissional-celular1" value={this.state.celular1} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'celular2' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="celular2Label" for="profissional-celular2">
                              <Translate contentKey="generadorApp.profissional.celular2">Celular 2</Translate>
                            </Label>

                            <AvInput type="text" name="celular2" id="profissional-celular2" value={this.state.celular2} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cep' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cepLabel" for="profissional-cep">
                              <Translate contentKey="generadorApp.profissional.cep">Cep</Translate>
                            </Label>

                            <AvInput type="text" name="cep" id="profissional-cep" value={this.state.cep} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'endereco' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="enderecoLabel" for="profissional-endereco">
                              <Translate contentKey="generadorApp.profissional.endereco">Endereco</Translate>
                            </Label>

                            <AvInput type="text" name="endereco" id="profissional-endereco" value={this.state.endereco} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'numero' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="numeroLabel" for="profissional-numero">
                              <Translate contentKey="generadorApp.profissional.numero">Numero</Translate>
                            </Label>

                            <AvInput type="text" name="numero" id="profissional-numero" value={this.state.numero} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'complemento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="complementoLabel" for="profissional-complemento">
                              <Translate contentKey="generadorApp.profissional.complemento">Complemento</Translate>
                            </Label>

                            <AvInput type="text" name="complemento" id="profissional-complemento" value={this.state.complemento} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'bairro' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="bairroLabel" for="profissional-bairro">
                              <Translate contentKey="generadorApp.profissional.bairro">Bairro</Translate>
                            </Label>

                            <AvInput type="text" name="bairro" id="profissional-bairro" value={this.state.bairro} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cidadeLabel" for="profissional-cidade">
                              <Translate contentKey="generadorApp.profissional.cidade">Cidade</Translate>
                            </Label>

                            <AvInput type="text" name="cidade" id="profissional-cidade" value={this.state.cidade} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'uf' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ufLabel" for="profissional-uf">
                              <Translate contentKey="generadorApp.profissional.uf">Uf</Translate>
                            </Label>

                            <AvInput type="text" name="uf" id="profissional-uf" value={this.state.uf} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'atendeCrianca' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="atendeCriancaLabel" for="profissional-atendeCrianca">
                              <Translate contentKey="generadorApp.profissional.atendeCrianca">Atende Crianca</Translate>
                            </Label>
                            <AvInput type="string" name="atendeCrianca" id="profissional-atendeCrianca" value={this.state.atendeCrianca} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'atendeIdoso' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="atendeIdosoLabel" for="profissional-atendeIdoso">
                              <Translate contentKey="generadorApp.profissional.atendeIdoso">Atende Idoso</Translate>
                            </Label>
                            <AvInput type="string" name="atendeIdoso" id="profissional-atendeIdoso" value={this.state.atendeIdoso} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ag' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="agLabel" for="profissional-ag">
                              <Translate contentKey="generadorApp.profissional.ag">Ag</Translate>
                            </Label>

                            <AvInput type="text" name="ag" id="profissional-ag" value={this.state.ag} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'conta' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="contaLabel" for="profissional-conta">
                              <Translate contentKey="generadorApp.profissional.conta">Conta</Translate>
                            </Label>

                            <AvInput type="text" name="conta" id="profissional-conta" value={this.state.conta} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'tipoConta' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="tipoContaLabel" for="profissional-tipoConta">
                              <Translate contentKey="generadorApp.profissional.tipoConta">Tipo Conta</Translate>
                            </Label>

                            <AvInput type="text" name="tipoConta" id="profissional-tipoConta" value={this.state.tipoConta} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'origemCadastro' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="origemCadastroLabel" for="profissional-origemCadastro">
                              <Translate contentKey="generadorApp.profissional.origemCadastro">Origem Cadastro</Translate>
                            </Label>

                            <AvInput type="text" name="origemCadastro" id="profissional-origemCadastro" value={this.state.origemCadastro} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'obs' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="obsLabel" for="profissional-obs">
                              <Translate contentKey="generadorApp.profissional.obs">Obs</Translate>
                            </Label>
                            <AvInput id="profissional-obs" type="textarea" name="obs" />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'chavePrivada' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="chavePrivadaLabel" for="profissional-chavePrivada">
                              <Translate contentKey="generadorApp.profissional.chavePrivada">Chave Privada</Translate>
                            </Label>

                            <AvInput type="text" name="chavePrivada" id="profissional-chavePrivada" value={this.state.chavePrivada} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ativo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ativoLabel" for="profissional-ativo">
                              <Translate contentKey="generadorApp.profissional.ativo">Ativo</Translate>
                            </Label>
                            <AvInput type="string" name="ativo" id="profissional-ativo" value={this.state.ativo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'senhaOriginal' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="senhaOriginalLabel" for="profissional-senhaOriginal">
                              <Translate contentKey="generadorApp.profissional.senhaOriginal">Senha Original</Translate>
                            </Label>

                            <AvInput type="text" name="senhaOriginal" id="profissional-senhaOriginal" value={this.state.senhaOriginal} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dataSenha' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'expoToken' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="expoTokenLabel" for="profissional-expoToken">
                              <Translate contentKey="generadorApp.profissional.expoToken">Expo Token</Translate>
                            </Label>

                            <AvInput type="text" name="expoToken" id="profissional-expoToken" value={this.state.expoToken} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'preferenciaAtendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'unidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="profissional-unidade">
                                <Translate contentKey="generadorApp.profissional.unidade">Unidade</Translate>
                              </Label>
                              <Select
                                id="profissional-unidade"
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
                        <Translate contentKey="generadorApp.profissional.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.profissional.home.btn_filter_clean">Clean</Translate>
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
                      {this.state.baseFilters !== 'idCidade' ? (
                        <th className="hand" onClick={this.sort('idCidade')}>
                          <Translate contentKey="generadorApp.profissional.idCidade">Id Cidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idTempoExperiencia' ? (
                        <th className="hand" onClick={this.sort('idTempoExperiencia')}>
                          <Translate contentKey="generadorApp.profissional.idTempoExperiencia">Id Tempo Experiencia</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idBanco' ? (
                        <th className="hand" onClick={this.sort('idBanco')}>
                          <Translate contentKey="generadorApp.profissional.idBanco">Id Banco</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'senha' ? (
                        <th className="hand" onClick={this.sort('senha')}>
                          <Translate contentKey="generadorApp.profissional.senha">Senha</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'nome' ? (
                        <th className="hand" onClick={this.sort('nome')}>
                          <Translate contentKey="generadorApp.profissional.nome">Nome</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'email' ? (
                        <th className="hand" onClick={this.sort('email')}>
                          <Translate contentKey="generadorApp.profissional.email">Email</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cpf' ? (
                        <th className="hand" onClick={this.sort('cpf')}>
                          <Translate contentKey="generadorApp.profissional.cpf">Cpf</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'rg' ? (
                        <th className="hand" onClick={this.sort('rg')}>
                          <Translate contentKey="generadorApp.profissional.rg">Rg</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'nomeEmpresa' ? (
                        <th className="hand" onClick={this.sort('nomeEmpresa')}>
                          <Translate contentKey="generadorApp.profissional.nomeEmpresa">Nome Empresa</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cnpj' ? (
                        <th className="hand" onClick={this.sort('cnpj')}>
                          <Translate contentKey="generadorApp.profissional.cnpj">Cnpj</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'registro' ? (
                        <th className="hand" onClick={this.sort('registro')}>
                          <Translate contentKey="generadorApp.profissional.registro">Registro</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'nascimento' ? (
                        <th className="hand" onClick={this.sort('nascimento')}>
                          <Translate contentKey="generadorApp.profissional.nascimento">Nascimento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'sexo' ? (
                        <th className="hand" onClick={this.sort('sexo')}>
                          <Translate contentKey="generadorApp.profissional.sexo">Sexo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'telefone1' ? (
                        <th className="hand" onClick={this.sort('telefone1')}>
                          <Translate contentKey="generadorApp.profissional.telefone1">Telefone 1</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'telefone2' ? (
                        <th className="hand" onClick={this.sort('telefone2')}>
                          <Translate contentKey="generadorApp.profissional.telefone2">Telefone 2</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'celular1' ? (
                        <th className="hand" onClick={this.sort('celular1')}>
                          <Translate contentKey="generadorApp.profissional.celular1">Celular 1</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'celular2' ? (
                        <th className="hand" onClick={this.sort('celular2')}>
                          <Translate contentKey="generadorApp.profissional.celular2">Celular 2</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cep' ? (
                        <th className="hand" onClick={this.sort('cep')}>
                          <Translate contentKey="generadorApp.profissional.cep">Cep</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'endereco' ? (
                        <th className="hand" onClick={this.sort('endereco')}>
                          <Translate contentKey="generadorApp.profissional.endereco">Endereco</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'numero' ? (
                        <th className="hand" onClick={this.sort('numero')}>
                          <Translate contentKey="generadorApp.profissional.numero">Numero</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'complemento' ? (
                        <th className="hand" onClick={this.sort('complemento')}>
                          <Translate contentKey="generadorApp.profissional.complemento">Complemento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'bairro' ? (
                        <th className="hand" onClick={this.sort('bairro')}>
                          <Translate contentKey="generadorApp.profissional.bairro">Bairro</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cidade' ? (
                        <th className="hand" onClick={this.sort('cidade')}>
                          <Translate contentKey="generadorApp.profissional.cidade">Cidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'uf' ? (
                        <th className="hand" onClick={this.sort('uf')}>
                          <Translate contentKey="generadorApp.profissional.uf">Uf</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'atendeCrianca' ? (
                        <th className="hand" onClick={this.sort('atendeCrianca')}>
                          <Translate contentKey="generadorApp.profissional.atendeCrianca">Atende Crianca</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'atendeIdoso' ? (
                        <th className="hand" onClick={this.sort('atendeIdoso')}>
                          <Translate contentKey="generadorApp.profissional.atendeIdoso">Atende Idoso</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ag' ? (
                        <th className="hand" onClick={this.sort('ag')}>
                          <Translate contentKey="generadorApp.profissional.ag">Ag</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'conta' ? (
                        <th className="hand" onClick={this.sort('conta')}>
                          <Translate contentKey="generadorApp.profissional.conta">Conta</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'tipoConta' ? (
                        <th className="hand" onClick={this.sort('tipoConta')}>
                          <Translate contentKey="generadorApp.profissional.tipoConta">Tipo Conta</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'origemCadastro' ? (
                        <th className="hand" onClick={this.sort('origemCadastro')}>
                          <Translate contentKey="generadorApp.profissional.origemCadastro">Origem Cadastro</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'obs' ? (
                        <th className="hand" onClick={this.sort('obs')}>
                          <Translate contentKey="generadorApp.profissional.obs">Obs</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'chavePrivada' ? (
                        <th className="hand" onClick={this.sort('chavePrivada')}>
                          <Translate contentKey="generadorApp.profissional.chavePrivada">Chave Privada</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ativo' ? (
                        <th className="hand" onClick={this.sort('ativo')}>
                          <Translate contentKey="generadorApp.profissional.ativo">Ativo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'senhaOriginal' ? (
                        <th className="hand" onClick={this.sort('senhaOriginal')}>
                          <Translate contentKey="generadorApp.profissional.senhaOriginal">Senha Original</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'dataSenha' ? (
                        <th className="hand" onClick={this.sort('dataSenha')}>
                          <Translate contentKey="generadorApp.profissional.dataSenha">Data Senha</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'expoToken' ? (
                        <th className="hand" onClick={this.sort('expoToken')}>
                          <Translate contentKey="generadorApp.profissional.expoToken">Expo Token</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'preferenciaAtendimento' ? (
                        <th className="hand" onClick={this.sort('preferenciaAtendimento')}>
                          <Translate contentKey="generadorApp.profissional.preferenciaAtendimento">Preferencia Atendimento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'unidade' ? (
                        <th>
                          <Translate contentKey="generadorApp.profissional.unidade">Unidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

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

                        {this.state.baseFilters !== 'idCidade' ? <td>{profissional.idCidade}</td> : null}

                        {this.state.baseFilters !== 'idTempoExperiencia' ? <td>{profissional.idTempoExperiencia}</td> : null}

                        {this.state.baseFilters !== 'idBanco' ? <td>{profissional.idBanco}</td> : null}

                        {this.state.baseFilters !== 'senha' ? <td>{profissional.senha}</td> : null}

                        {this.state.baseFilters !== 'nome' ? <td>{profissional.nome}</td> : null}

                        {this.state.baseFilters !== 'email' ? <td>{profissional.email}</td> : null}

                        {this.state.baseFilters !== 'cpf' ? <td>{profissional.cpf}</td> : null}

                        {this.state.baseFilters !== 'rg' ? <td>{profissional.rg}</td> : null}

                        {this.state.baseFilters !== 'nomeEmpresa' ? <td>{profissional.nomeEmpresa}</td> : null}

                        {this.state.baseFilters !== 'cnpj' ? <td>{profissional.cnpj}</td> : null}

                        {this.state.baseFilters !== 'registro' ? <td>{profissional.registro}</td> : null}

                        {this.state.baseFilters !== 'nascimento' ? (
                          <td>
                            <TextFormat type="date" value={profissional.nascimento} format={APP_LOCAL_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'sexo' ? <td>{profissional.sexo}</td> : null}

                        {this.state.baseFilters !== 'telefone1' ? <td>{profissional.telefone1}</td> : null}

                        {this.state.baseFilters !== 'telefone2' ? <td>{profissional.telefone2}</td> : null}

                        {this.state.baseFilters !== 'celular1' ? <td>{profissional.celular1}</td> : null}

                        {this.state.baseFilters !== 'celular2' ? <td>{profissional.celular2}</td> : null}

                        {this.state.baseFilters !== 'cep' ? <td>{profissional.cep}</td> : null}

                        {this.state.baseFilters !== 'endereco' ? <td>{profissional.endereco}</td> : null}

                        {this.state.baseFilters !== 'numero' ? <td>{profissional.numero}</td> : null}

                        {this.state.baseFilters !== 'complemento' ? <td>{profissional.complemento}</td> : null}

                        {this.state.baseFilters !== 'bairro' ? <td>{profissional.bairro}</td> : null}

                        {this.state.baseFilters !== 'cidade' ? <td>{profissional.cidade}</td> : null}

                        {this.state.baseFilters !== 'uf' ? <td>{profissional.uf}</td> : null}

                        {this.state.baseFilters !== 'atendeCrianca' ? <td>{profissional.atendeCrianca}</td> : null}

                        {this.state.baseFilters !== 'atendeIdoso' ? <td>{profissional.atendeIdoso}</td> : null}

                        {this.state.baseFilters !== 'ag' ? <td>{profissional.ag}</td> : null}

                        {this.state.baseFilters !== 'conta' ? <td>{profissional.conta}</td> : null}

                        {this.state.baseFilters !== 'tipoConta' ? <td>{profissional.tipoConta}</td> : null}

                        {this.state.baseFilters !== 'origemCadastro' ? <td>{profissional.origemCadastro}</td> : null}

                        {this.state.baseFilters !== 'obs' ? (
                          <td>{profissional.obs ? Buffer.from(profissional.obs).toString() : null}</td>
                        ) : null}

                        {this.state.baseFilters !== 'chavePrivada' ? <td>{profissional.chavePrivada}</td> : null}

                        {this.state.baseFilters !== 'ativo' ? <td>{profissional.ativo}</td> : null}

                        {this.state.baseFilters !== 'senhaOriginal' ? <td>{profissional.senhaOriginal}</td> : null}

                        {this.state.baseFilters !== 'dataSenha' ? (
                          <td>
                            <TextFormat type="date" value={profissional.dataSenha} format={APP_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'expoToken' ? <td>{profissional.expoToken}</td> : null}

                        {this.state.baseFilters !== 'preferenciaAtendimento' ? <td>{profissional.preferenciaAtendimento}</td> : null}

                        {this.state.baseFilters !== 'unidade' ? (
                          <td>
                            {profissional.unidade ? (
                              <Link to={`unidade-easy/${profissional.unidade.id}`}>{profissional.unidade.id}</Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${profissional.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${profissional.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${profissional.id}/delete?${this.getFiltersURL()}`}
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
  unidadeEasies: storeState.unidadeEasy.entities,
  profissionalList: profissional.entities,
  totalItems: profissional.totalItems
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Profissional);
