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
import { getUnidadeEasyState, IUnidadeEasyBaseState, getEntities } from './unidade-easy.reducer';
import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { ICategoria } from 'app/shared/model/categoria.model';
import { getEntities as getCategorias } from 'app/entities/categoria/categoria.reducer';

export interface IUnidadeEasyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IUnidadeEasyState extends IUnidadeEasyBaseState, IPaginationBaseState {}

export class UnidadeEasy extends React.Component<IUnidadeEasyProps, IUnidadeEasyState> {
  private myFormRef: any;

  constructor(props: IUnidadeEasyProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getUnidadeEasyState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getCategorias();
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
        ativo: '',
        categoria: ''
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
      'categoria=' +
      this.state.categoria +
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
      categoria,
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
      categoria,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { categorias, unidadeEasyList, match, totalItems } = this.props;
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
              <Link
                to={`${match.url}/new?${this.getFiltersURL()}`}
                className="btn btn-primary float-right jh-create-entity"
                id="jh-create-entity"
              >
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
                      {this.state.baseFilters !== 'razaoSocial' ? (
                        <Col md="3">
                          <Row>
                            <Label id="razaoSocialLabel" for="unidade-easy-razaoSocial">
                              <Translate contentKey="generadorApp.unidadeEasy.razaoSocial">Razao Social</Translate>
                            </Label>

                            <AvInput type="text" name="razaoSocial" id="unidade-easy-razaoSocial" value={this.state.razaoSocial} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'nomeFantasia' ? (
                        <Col md="3">
                          <Row>
                            <Label id="nomeFantasiaLabel" for="unidade-easy-nomeFantasia">
                              <Translate contentKey="generadorApp.unidadeEasy.nomeFantasia">Nome Fantasia</Translate>
                            </Label>

                            <AvInput type="text" name="nomeFantasia" id="unidade-easy-nomeFantasia" value={this.state.nomeFantasia} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cnpj' ? (
                        <Col md="3">
                          <Row>
                            <Label id="cnpjLabel" for="unidade-easy-cnpj">
                              <Translate contentKey="generadorApp.unidadeEasy.cnpj">Cnpj</Translate>
                            </Label>

                            <AvInput type="text" name="cnpj" id="unidade-easy-cnpj" value={this.state.cnpj} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ie' ? (
                        <Col md="3">
                          <Row>
                            <Label id="ieLabel" for="unidade-easy-ie">
                              <Translate contentKey="generadorApp.unidadeEasy.ie">Ie</Translate>
                            </Label>

                            <AvInput type="text" name="ie" id="unidade-easy-ie" value={this.state.ie} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'telefone1' ? (
                        <Col md="3">
                          <Row>
                            <Label id="telefone1Label" for="unidade-easy-telefone1">
                              <Translate contentKey="generadorApp.unidadeEasy.telefone1">Telefone 1</Translate>
                            </Label>

                            <AvInput type="text" name="telefone1" id="unidade-easy-telefone1" value={this.state.telefone1} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'telefone2' ? (
                        <Col md="3">
                          <Row>
                            <Label id="telefone2Label" for="unidade-easy-telefone2">
                              <Translate contentKey="generadorApp.unidadeEasy.telefone2">Telefone 2</Translate>
                            </Label>

                            <AvInput type="text" name="telefone2" id="unidade-easy-telefone2" value={this.state.telefone2} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'endereco' ? (
                        <Col md="3">
                          <Row>
                            <Label id="enderecoLabel" for="unidade-easy-endereco">
                              <Translate contentKey="generadorApp.unidadeEasy.endereco">Endereco</Translate>
                            </Label>

                            <AvInput type="text" name="endereco" id="unidade-easy-endereco" value={this.state.endereco} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'numero' ? (
                        <Col md="3">
                          <Row>
                            <Label id="numeroLabel" for="unidade-easy-numero">
                              <Translate contentKey="generadorApp.unidadeEasy.numero">Numero</Translate>
                            </Label>

                            <AvInput type="text" name="numero" id="unidade-easy-numero" value={this.state.numero} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'complemento' ? (
                        <Col md="3">
                          <Row>
                            <Label id="complementoLabel" for="unidade-easy-complemento">
                              <Translate contentKey="generadorApp.unidadeEasy.complemento">Complemento</Translate>
                            </Label>

                            <AvInput type="text" name="complemento" id="unidade-easy-complemento" value={this.state.complemento} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'bairro' ? (
                        <Col md="3">
                          <Row>
                            <Label id="bairroLabel" for="unidade-easy-bairro">
                              <Translate contentKey="generadorApp.unidadeEasy.bairro">Bairro</Translate>
                            </Label>

                            <AvInput type="text" name="bairro" id="unidade-easy-bairro" value={this.state.bairro} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cidade' ? (
                        <Col md="3">
                          <Row>
                            <Label id="cidadeLabel" for="unidade-easy-cidade">
                              <Translate contentKey="generadorApp.unidadeEasy.cidade">Cidade</Translate>
                            </Label>

                            <AvInput type="text" name="cidade" id="unidade-easy-cidade" value={this.state.cidade} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'uf' ? (
                        <Col md="3">
                          <Row>
                            <Label id="ufLabel" for="unidade-easy-uf">
                              <Translate contentKey="generadorApp.unidadeEasy.uf">Uf</Translate>
                            </Label>

                            <AvInput type="text" name="uf" id="unidade-easy-uf" value={this.state.uf} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cep' ? (
                        <Col md="3">
                          <Row>
                            <Label id="cepLabel" for="unidade-easy-cep">
                              <Translate contentKey="generadorApp.unidadeEasy.cep">Cep</Translate>
                            </Label>

                            <AvInput type="text" name="cep" id="unidade-easy-cep" value={this.state.cep} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'regans' ? (
                        <Col md="3">
                          <Row>
                            <Label id="regansLabel" for="unidade-easy-regans">
                              <Translate contentKey="generadorApp.unidadeEasy.regans">Regans</Translate>
                            </Label>

                            <AvInput type="text" name="regans" id="unidade-easy-regans" value={this.state.regans} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'regcnes' ? (
                        <Col md="3">
                          <Row>
                            <Label id="regcnesLabel" for="unidade-easy-regcnes">
                              <Translate contentKey="generadorApp.unidadeEasy.regcnes">Regcnes</Translate>
                            </Label>

                            <AvInput type="text" name="regcnes" id="unidade-easy-regcnes" value={this.state.regcnes} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'tissresponsavel' ? (
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
                      ) : null}

                      {this.state.baseFilters !== 'tissconselho' ? (
                        <Col md="3">
                          <Row>
                            <Label id="tissconselhoLabel" for="unidade-easy-tissconselho">
                              <Translate contentKey="generadorApp.unidadeEasy.tissconselho">Tissconselho</Translate>
                            </Label>

                            <AvInput type="text" name="tissconselho" id="unidade-easy-tissconselho" value={this.state.tissconselho} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'tissinscricao' ? (
                        <Col md="3">
                          <Row>
                            <Label id="tissinscricaoLabel" for="unidade-easy-tissinscricao">
                              <Translate contentKey="generadorApp.unidadeEasy.tissinscricao">Tissinscricao</Translate>
                            </Label>

                            <AvInput type="text" name="tissinscricao" id="unidade-easy-tissinscricao" value={this.state.tissinscricao} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'tisscbo' ? (
                        <Col md="3">
                          <Row>
                            <Label id="tisscboLabel" for="unidade-easy-tisscbo">
                              <Translate contentKey="generadorApp.unidadeEasy.tisscbo">Tisscbo</Translate>
                            </Label>

                            <AvInput type="text" name="tisscbo" id="unidade-easy-tisscbo" value={this.state.tisscbo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'tisscoduf' ? (
                        <Col md="3">
                          <Row>
                            <Label id="tisscodufLabel" for="unidade-easy-tisscoduf">
                              <Translate contentKey="generadorApp.unidadeEasy.tisscoduf">Tisscoduf</Translate>
                            </Label>

                            <AvInput type="text" name="tisscoduf" id="unidade-easy-tisscoduf" value={this.state.tisscoduf} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ativo' ? (
                        <Col md="3">
                          <Row>
                            <Label id="ativoLabel" for="unidade-easy-ativo">
                              <Translate contentKey="generadorApp.unidadeEasy.ativo">Ativo</Translate>
                            </Label>
                            <AvInput type="string" name="ativo" id="unidade-easy-ativo" value={this.state.ativo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'categoria' ? (
                        <Col md="3">
                          <Row></Row>
                        </Col>
                      ) : null}
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
                      {this.state.baseFilters !== 'razaoSocial' ? (
                        <th className="hand" onClick={this.sort('razaoSocial')}>
                          <Translate contentKey="generadorApp.unidadeEasy.razaoSocial">Razao Social</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'nomeFantasia' ? (
                        <th className="hand" onClick={this.sort('nomeFantasia')}>
                          <Translate contentKey="generadorApp.unidadeEasy.nomeFantasia">Nome Fantasia</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cnpj' ? (
                        <th className="hand" onClick={this.sort('cnpj')}>
                          <Translate contentKey="generadorApp.unidadeEasy.cnpj">Cnpj</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ie' ? (
                        <th className="hand" onClick={this.sort('ie')}>
                          <Translate contentKey="generadorApp.unidadeEasy.ie">Ie</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'telefone1' ? (
                        <th className="hand" onClick={this.sort('telefone1')}>
                          <Translate contentKey="generadorApp.unidadeEasy.telefone1">Telefone 1</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'telefone2' ? (
                        <th className="hand" onClick={this.sort('telefone2')}>
                          <Translate contentKey="generadorApp.unidadeEasy.telefone2">Telefone 2</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'endereco' ? (
                        <th className="hand" onClick={this.sort('endereco')}>
                          <Translate contentKey="generadorApp.unidadeEasy.endereco">Endereco</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'numero' ? (
                        <th className="hand" onClick={this.sort('numero')}>
                          <Translate contentKey="generadorApp.unidadeEasy.numero">Numero</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'complemento' ? (
                        <th className="hand" onClick={this.sort('complemento')}>
                          <Translate contentKey="generadorApp.unidadeEasy.complemento">Complemento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'bairro' ? (
                        <th className="hand" onClick={this.sort('bairro')}>
                          <Translate contentKey="generadorApp.unidadeEasy.bairro">Bairro</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cidade' ? (
                        <th className="hand" onClick={this.sort('cidade')}>
                          <Translate contentKey="generadorApp.unidadeEasy.cidade">Cidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'uf' ? (
                        <th className="hand" onClick={this.sort('uf')}>
                          <Translate contentKey="generadorApp.unidadeEasy.uf">Uf</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cep' ? (
                        <th className="hand" onClick={this.sort('cep')}>
                          <Translate contentKey="generadorApp.unidadeEasy.cep">Cep</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'regans' ? (
                        <th className="hand" onClick={this.sort('regans')}>
                          <Translate contentKey="generadorApp.unidadeEasy.regans">Regans</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'regcnes' ? (
                        <th className="hand" onClick={this.sort('regcnes')}>
                          <Translate contentKey="generadorApp.unidadeEasy.regcnes">Regcnes</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'tissresponsavel' ? (
                        <th className="hand" onClick={this.sort('tissresponsavel')}>
                          <Translate contentKey="generadorApp.unidadeEasy.tissresponsavel">Tissresponsavel</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'tissconselho' ? (
                        <th className="hand" onClick={this.sort('tissconselho')}>
                          <Translate contentKey="generadorApp.unidadeEasy.tissconselho">Tissconselho</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'tissinscricao' ? (
                        <th className="hand" onClick={this.sort('tissinscricao')}>
                          <Translate contentKey="generadorApp.unidadeEasy.tissinscricao">Tissinscricao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'tisscbo' ? (
                        <th className="hand" onClick={this.sort('tisscbo')}>
                          <Translate contentKey="generadorApp.unidadeEasy.tisscbo">Tisscbo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'tisscoduf' ? (
                        <th className="hand" onClick={this.sort('tisscoduf')}>
                          <Translate contentKey="generadorApp.unidadeEasy.tisscoduf">Tisscoduf</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ativo' ? (
                        <th className="hand" onClick={this.sort('ativo')}>
                          <Translate contentKey="generadorApp.unidadeEasy.ativo">Ativo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

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

                        {this.state.baseFilters !== 'razaoSocial' ? <td>{unidadeEasy.razaoSocial}</td> : null}

                        {this.state.baseFilters !== 'nomeFantasia' ? <td>{unidadeEasy.nomeFantasia}</td> : null}

                        {this.state.baseFilters !== 'cnpj' ? <td>{unidadeEasy.cnpj}</td> : null}

                        {this.state.baseFilters !== 'ie' ? <td>{unidadeEasy.ie}</td> : null}

                        {this.state.baseFilters !== 'telefone1' ? <td>{unidadeEasy.telefone1}</td> : null}

                        {this.state.baseFilters !== 'telefone2' ? <td>{unidadeEasy.telefone2}</td> : null}

                        {this.state.baseFilters !== 'endereco' ? <td>{unidadeEasy.endereco}</td> : null}

                        {this.state.baseFilters !== 'numero' ? <td>{unidadeEasy.numero}</td> : null}

                        {this.state.baseFilters !== 'complemento' ? <td>{unidadeEasy.complemento}</td> : null}

                        {this.state.baseFilters !== 'bairro' ? <td>{unidadeEasy.bairro}</td> : null}

                        {this.state.baseFilters !== 'cidade' ? <td>{unidadeEasy.cidade}</td> : null}

                        {this.state.baseFilters !== 'uf' ? <td>{unidadeEasy.uf}</td> : null}

                        {this.state.baseFilters !== 'cep' ? <td>{unidadeEasy.cep}</td> : null}

                        {this.state.baseFilters !== 'regans' ? <td>{unidadeEasy.regans}</td> : null}

                        {this.state.baseFilters !== 'regcnes' ? <td>{unidadeEasy.regcnes}</td> : null}

                        {this.state.baseFilters !== 'tissresponsavel' ? <td>{unidadeEasy.tissresponsavel}</td> : null}

                        {this.state.baseFilters !== 'tissconselho' ? <td>{unidadeEasy.tissconselho}</td> : null}

                        {this.state.baseFilters !== 'tissinscricao' ? <td>{unidadeEasy.tissinscricao}</td> : null}

                        {this.state.baseFilters !== 'tisscbo' ? <td>{unidadeEasy.tisscbo}</td> : null}

                        {this.state.baseFilters !== 'tisscoduf' ? <td>{unidadeEasy.tisscoduf}</td> : null}

                        {this.state.baseFilters !== 'ativo' ? <td>{unidadeEasy.ativo}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${unidadeEasy.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${unidadeEasy.id}/edit?${this.getFiltersURL()}`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${unidadeEasy.id}/delete?${this.getFiltersURL()}`}
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
  categorias: storeState.categoria.entities,
  unidadeEasyList: unidadeEasy.entities,
  totalItems: unidadeEasy.totalItems
});

const mapDispatchToProps = {
  getCategorias,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UnidadeEasy);
