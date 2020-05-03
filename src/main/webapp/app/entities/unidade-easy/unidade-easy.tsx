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
import { Translate, translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './unidade-easy.reducer';
import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IUnidadeEasyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IUnidadeEasyBaseState {
  razaoSocial: any;
  nomeFantasia: any;
  cnpj: any;
  ie: any;
  telefone1: any;
  telefone2: any;
  endereco: any;
  numero: any;
  complemento: any;
  bairro: any;
  cidade: any;
  uf: any;
  cep: any;
  regans: any;
  regcnes: any;
  tissresponsavel: any;
  tissconselho: any;
  tissinscricao: any;
  tisscbo: any;
  tisscoduf: any;
  ativo: any;
}
export interface IUnidadeEasyState extends IUnidadeEasyBaseState, IPaginationBaseState {}

export class UnidadeEasy extends React.Component<IUnidadeEasyProps, IUnidadeEasyState> {
  private myFormRef: any;

  constructor(props: IUnidadeEasyProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getUnidadeEasyState(this.props.location)
    };
  }

  getUnidadeEasyState = (location): IUnidadeEasyBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const razaoSocial = url.searchParams.get('razaoSocial') || '';
    const nomeFantasia = url.searchParams.get('nomeFantasia') || '';
    const cnpj = url.searchParams.get('cnpj') || '';
    const ie = url.searchParams.get('ie') || '';
    const telefone1 = url.searchParams.get('telefone1') || '';
    const telefone2 = url.searchParams.get('telefone2') || '';
    const endereco = url.searchParams.get('endereco') || '';
    const numero = url.searchParams.get('numero') || '';
    const complemento = url.searchParams.get('complemento') || '';
    const bairro = url.searchParams.get('bairro') || '';
    const cidade = url.searchParams.get('cidade') || '';
    const uf = url.searchParams.get('uf') || '';
    const cep = url.searchParams.get('cep') || '';
    const regans = url.searchParams.get('regans') || '';
    const regcnes = url.searchParams.get('regcnes') || '';
    const tissresponsavel = url.searchParams.get('tissresponsavel') || '';
    const tissconselho = url.searchParams.get('tissconselho') || '';
    const tissinscricao = url.searchParams.get('tissinscricao') || '';
    const tisscbo = url.searchParams.get('tisscbo') || '';
    const tisscoduf = url.searchParams.get('tisscoduf') || '';
    const ativo = url.searchParams.get('ativo') || '';

    return {
      razaoSocial,
      nomeFantasia,
      cnpj,
      ie,
      telefone1,
      telefone2,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      cep,
      regans,
      regcnes,
      tissresponsavel,
      tissconselho,
      tissinscricao,
      tisscbo,
      tisscoduf,
      ativo
    };
  };

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        razaoSocial: '',
        nomeFantasia: '',
        cnpj: '',
        ie: '',
        telefone1: '',
        telefone2: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',
        cep: '',
        regans: '',
        regcnes: '',
        tissresponsavel: '',
        tissconselho: '',
        tissinscricao: '',
        tisscbo: '',
        tisscoduf: '',
        ativo: ''
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
      'razaoSocial=' +
      this.state.razaoSocial +
      '&' +
      'nomeFantasia=' +
      this.state.nomeFantasia +
      '&' +
      'cnpj=' +
      this.state.cnpj +
      '&' +
      'ie=' +
      this.state.ie +
      '&' +
      'telefone1=' +
      this.state.telefone1 +
      '&' +
      'telefone2=' +
      this.state.telefone2 +
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
      'cep=' +
      this.state.cep +
      '&' +
      'regans=' +
      this.state.regans +
      '&' +
      'regcnes=' +
      this.state.regcnes +
      '&' +
      'tissresponsavel=' +
      this.state.tissresponsavel +
      '&' +
      'tissconselho=' +
      this.state.tissconselho +
      '&' +
      'tissinscricao=' +
      this.state.tissinscricao +
      '&' +
      'tisscbo=' +
      this.state.tisscbo +
      '&' +
      'tisscoduf=' +
      this.state.tisscoduf +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      razaoSocial,
      nomeFantasia,
      cnpj,
      ie,
      telefone1,
      telefone2,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      cep,
      regans,
      regcnes,
      tissresponsavel,
      tissconselho,
      tissinscricao,
      tisscbo,
      tisscoduf,
      ativo,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      razaoSocial,
      nomeFantasia,
      cnpj,
      ie,
      telefone1,
      telefone2,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      cep,
      regans,
      regcnes,
      tissresponsavel,
      tissconselho,
      tissinscricao,
      tisscbo,
      tisscoduf,
      ativo,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { unidadeEasyList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Unidade Easies</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Unidade Easies</span>
              <Button id="togglerFilterUnidadeEasy" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.unidadeEasy.home.createLabel">Create a new Unidade Easy</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterUnidadeEasy">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="razaoSocialLabel" for="unidade-easy-razaoSocial">
                            <Translate contentKey="generadorApp.unidadeEasy.razaoSocial">Razao Social</Translate>
                          </Label>

                          <AvInput type="text" name="razaoSocial" id="unidade-easy-razaoSocial" value={this.state.razaoSocial} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="nomeFantasiaLabel" for="unidade-easy-nomeFantasia">
                            <Translate contentKey="generadorApp.unidadeEasy.nomeFantasia">Nome Fantasia</Translate>
                          </Label>

                          <AvInput type="text" name="nomeFantasia" id="unidade-easy-nomeFantasia" value={this.state.nomeFantasia} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cnpjLabel" for="unidade-easy-cnpj">
                            <Translate contentKey="generadorApp.unidadeEasy.cnpj">Cnpj</Translate>
                          </Label>

                          <AvInput type="text" name="cnpj" id="unidade-easy-cnpj" value={this.state.cnpj} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ieLabel" for="unidade-easy-ie">
                            <Translate contentKey="generadorApp.unidadeEasy.ie">Ie</Translate>
                          </Label>

                          <AvInput type="text" name="ie" id="unidade-easy-ie" value={this.state.ie} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="telefone1Label" for="unidade-easy-telefone1">
                            <Translate contentKey="generadorApp.unidadeEasy.telefone1">Telefone 1</Translate>
                          </Label>

                          <AvInput type="text" name="telefone1" id="unidade-easy-telefone1" value={this.state.telefone1} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="telefone2Label" for="unidade-easy-telefone2">
                            <Translate contentKey="generadorApp.unidadeEasy.telefone2">Telefone 2</Translate>
                          </Label>

                          <AvInput type="text" name="telefone2" id="unidade-easy-telefone2" value={this.state.telefone2} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="enderecoLabel" for="unidade-easy-endereco">
                            <Translate contentKey="generadorApp.unidadeEasy.endereco">Endereco</Translate>
                          </Label>

                          <AvInput type="text" name="endereco" id="unidade-easy-endereco" value={this.state.endereco} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="numeroLabel" for="unidade-easy-numero">
                            <Translate contentKey="generadorApp.unidadeEasy.numero">Numero</Translate>
                          </Label>

                          <AvInput type="text" name="numero" id="unidade-easy-numero" value={this.state.numero} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="complementoLabel" for="unidade-easy-complemento">
                            <Translate contentKey="generadorApp.unidadeEasy.complemento">Complemento</Translate>
                          </Label>

                          <AvInput type="text" name="complemento" id="unidade-easy-complemento" value={this.state.complemento} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="bairroLabel" for="unidade-easy-bairro">
                            <Translate contentKey="generadorApp.unidadeEasy.bairro">Bairro</Translate>
                          </Label>

                          <AvInput type="text" name="bairro" id="unidade-easy-bairro" value={this.state.bairro} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cidadeLabel" for="unidade-easy-cidade">
                            <Translate contentKey="generadorApp.unidadeEasy.cidade">Cidade</Translate>
                          </Label>

                          <AvInput type="text" name="cidade" id="unidade-easy-cidade" value={this.state.cidade} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ufLabel" for="unidade-easy-uf">
                            <Translate contentKey="generadorApp.unidadeEasy.uf">Uf</Translate>
                          </Label>

                          <AvInput type="text" name="uf" id="unidade-easy-uf" value={this.state.uf} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cepLabel" for="unidade-easy-cep">
                            <Translate contentKey="generadorApp.unidadeEasy.cep">Cep</Translate>
                          </Label>

                          <AvInput type="text" name="cep" id="unidade-easy-cep" value={this.state.cep} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="regansLabel" for="unidade-easy-regans">
                            <Translate contentKey="generadorApp.unidadeEasy.regans">Regans</Translate>
                          </Label>

                          <AvInput type="text" name="regans" id="unidade-easy-regans" value={this.state.regans} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="regcnesLabel" for="unidade-easy-regcnes">
                            <Translate contentKey="generadorApp.unidadeEasy.regcnes">Regcnes</Translate>
                          </Label>

                          <AvInput type="text" name="regcnes" id="unidade-easy-regcnes" value={this.state.regcnes} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="tissresponsavelLabel" for="unidade-easy-tissresponsavel">
                            <Translate contentKey="generadorApp.unidadeEasy.tissresponsavel">Tissresponsavel</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="tissresponsavel"
                            id="unidade-easy-tissresponsavel"
                            value={this.state.tissresponsavel}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="tissconselhoLabel" for="unidade-easy-tissconselho">
                            <Translate contentKey="generadorApp.unidadeEasy.tissconselho">Tissconselho</Translate>
                          </Label>

                          <AvInput type="text" name="tissconselho" id="unidade-easy-tissconselho" value={this.state.tissconselho} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="tissinscricaoLabel" for="unidade-easy-tissinscricao">
                            <Translate contentKey="generadorApp.unidadeEasy.tissinscricao">Tissinscricao</Translate>
                          </Label>

                          <AvInput type="text" name="tissinscricao" id="unidade-easy-tissinscricao" value={this.state.tissinscricao} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="tisscboLabel" for="unidade-easy-tisscbo">
                            <Translate contentKey="generadorApp.unidadeEasy.tisscbo">Tisscbo</Translate>
                          </Label>

                          <AvInput type="text" name="tisscbo" id="unidade-easy-tisscbo" value={this.state.tisscbo} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="tisscodufLabel" for="unidade-easy-tisscoduf">
                            <Translate contentKey="generadorApp.unidadeEasy.tisscoduf">Tisscoduf</Translate>
                          </Label>

                          <AvInput type="text" name="tisscoduf" id="unidade-easy-tisscoduf" value={this.state.tisscoduf} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="unidade-easy-ativo">
                            <Translate contentKey="generadorApp.unidadeEasy.ativo">Ativo</Translate>
                          </Label>
                          <AvInput type="string" name="ativo" id="unidade-easy-ativo" value={this.state.ativo} />
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

              {unidadeEasyList && unidadeEasyList.length > 0 ? (
                <Table responsive aria-describedby="unidade-easy-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('razaoSocial')}>
                        <Translate contentKey="generadorApp.unidadeEasy.razaoSocial">Razao Social</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('nomeFantasia')}>
                        <Translate contentKey="generadorApp.unidadeEasy.nomeFantasia">Nome Fantasia</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cnpj')}>
                        <Translate contentKey="generadorApp.unidadeEasy.cnpj">Cnpj</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ie')}>
                        <Translate contentKey="generadorApp.unidadeEasy.ie">Ie</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('telefone1')}>
                        <Translate contentKey="generadorApp.unidadeEasy.telefone1">Telefone 1</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('telefone2')}>
                        <Translate contentKey="generadorApp.unidadeEasy.telefone2">Telefone 2</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('endereco')}>
                        <Translate contentKey="generadorApp.unidadeEasy.endereco">Endereco</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('numero')}>
                        <Translate contentKey="generadorApp.unidadeEasy.numero">Numero</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('complemento')}>
                        <Translate contentKey="generadorApp.unidadeEasy.complemento">Complemento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('bairro')}>
                        <Translate contentKey="generadorApp.unidadeEasy.bairro">Bairro</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cidade')}>
                        <Translate contentKey="generadorApp.unidadeEasy.cidade">Cidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('uf')}>
                        <Translate contentKey="generadorApp.unidadeEasy.uf">Uf</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cep')}>
                        <Translate contentKey="generadorApp.unidadeEasy.cep">Cep</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('regans')}>
                        <Translate contentKey="generadorApp.unidadeEasy.regans">Regans</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('regcnes')}>
                        <Translate contentKey="generadorApp.unidadeEasy.regcnes">Regcnes</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('tissresponsavel')}>
                        <Translate contentKey="generadorApp.unidadeEasy.tissresponsavel">Tissresponsavel</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('tissconselho')}>
                        <Translate contentKey="generadorApp.unidadeEasy.tissconselho">Tissconselho</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('tissinscricao')}>
                        <Translate contentKey="generadorApp.unidadeEasy.tissinscricao">Tissinscricao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('tisscbo')}>
                        <Translate contentKey="generadorApp.unidadeEasy.tisscbo">Tisscbo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('tisscoduf')}>
                        <Translate contentKey="generadorApp.unidadeEasy.tisscoduf">Tisscoduf</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.unidadeEasy.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {unidadeEasyList.map((unidadeEasy, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${unidadeEasy.id}`} color="link" size="sm">
                            {unidadeEasy.id}
                          </Button>
                        </td>

                        <td>{unidadeEasy.razaoSocial}</td>

                        <td>{unidadeEasy.nomeFantasia}</td>

                        <td>{unidadeEasy.cnpj}</td>

                        <td>{unidadeEasy.ie}</td>

                        <td>{unidadeEasy.telefone1}</td>

                        <td>{unidadeEasy.telefone2}</td>

                        <td>{unidadeEasy.endereco}</td>

                        <td>{unidadeEasy.numero}</td>

                        <td>{unidadeEasy.complemento}</td>

                        <td>{unidadeEasy.bairro}</td>

                        <td>{unidadeEasy.cidade}</td>

                        <td>{unidadeEasy.uf}</td>

                        <td>{unidadeEasy.cep}</td>

                        <td>{unidadeEasy.regans}</td>

                        <td>{unidadeEasy.regcnes}</td>

                        <td>{unidadeEasy.tissresponsavel}</td>

                        <td>{unidadeEasy.tissconselho}</td>

                        <td>{unidadeEasy.tissinscricao}</td>

                        <td>{unidadeEasy.tisscbo}</td>

                        <td>{unidadeEasy.tisscoduf}</td>

                        <td>{unidadeEasy.ativo}</td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${unidadeEasy.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${unidadeEasy.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${unidadeEasy.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.unidadeEasy.home.notFound">No Unidade Easies found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={unidadeEasyList && unidadeEasyList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ unidadeEasy, ...storeState }: IRootState) => ({
  unidadeEasyList: unidadeEasy.entities,
  totalItems: unidadeEasy.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UnidadeEasy);
