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
  UncontrolledAlert
} from 'reactstrap';
import { AvForm, div, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';

import { IRootState } from 'app/shared/reducers';
import { getFranquiaState, IFranquiaBaseState, getEntities } from './franquia.reducer';
import { IFranquia } from 'app/shared/model/franquia.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IFranquiaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IFranquiaState extends IFranquiaBaseState, IPaginationBaseState {}

export class Franquia extends React.Component<IFranquiaProps, IFranquiaState> {
  private myFormRef: any;

  constructor(props: IFranquiaProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getFranquiaState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idCidade: '',
        nomeFantasia: '',
        razaoSocial: '',
        cnpj: '',
        ie: '',
        site: '',
        telefone1: '',
        telefone2: '',
        celular: '',
        cep: '',
        endereco: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        uf: '',
        observacao: '',
        ativo: '',
        franquiaAreaAtuacao: '',
        franquiaStatusAtual: '',
        franquiaUsuario: ''
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
      'nomeFantasia=' +
      this.state.nomeFantasia +
      '&' +
      'razaoSocial=' +
      this.state.razaoSocial +
      '&' +
      'cnpj=' +
      this.state.cnpj +
      '&' +
      'ie=' +
      this.state.ie +
      '&' +
      'site=' +
      this.state.site +
      '&' +
      'telefone1=' +
      this.state.telefone1 +
      '&' +
      'telefone2=' +
      this.state.telefone2 +
      '&' +
      'celular=' +
      this.state.celular +
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
      'observacao=' +
      this.state.observacao +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'franquiaAreaAtuacao=' +
      this.state.franquiaAreaAtuacao +
      '&' +
      'franquiaStatusAtual=' +
      this.state.franquiaStatusAtual +
      '&' +
      'franquiaUsuario=' +
      this.state.franquiaUsuario +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      idCidade,
      nomeFantasia,
      razaoSocial,
      cnpj,
      ie,
      site,
      telefone1,
      telefone2,
      celular,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      observacao,
      ativo,
      franquiaAreaAtuacao,
      franquiaStatusAtual,
      franquiaUsuario,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      idCidade,
      nomeFantasia,
      razaoSocial,
      cnpj,
      ie,
      site,
      telefone1,
      telefone2,
      celular,
      cep,
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      observacao,
      ativo,
      franquiaAreaAtuacao,
      franquiaStatusAtual,
      franquiaUsuario,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { franquiaList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Franquias</span>
          <Button id="togglerFilterFranquia" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.franquia.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.franquia.home.createLabel">Create a new Franquia</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Franquias</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterFranquia">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idCidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idCidadeLabel" for="franquia-idCidade">
                              <Translate contentKey="generadorApp.franquia.idCidade">Id Cidade</Translate>
                            </Label>

                            <AvInput type="text" name="idCidade" id="franquia-idCidade" value={this.state.idCidade} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'nomeFantasia' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="nomeFantasiaLabel" for="franquia-nomeFantasia">
                              <Translate contentKey="generadorApp.franquia.nomeFantasia">Nome Fantasia</Translate>
                            </Label>

                            <AvInput type="text" name="nomeFantasia" id="franquia-nomeFantasia" value={this.state.nomeFantasia} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'razaoSocial' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="razaoSocialLabel" for="franquia-razaoSocial">
                              <Translate contentKey="generadorApp.franquia.razaoSocial">Razao Social</Translate>
                            </Label>

                            <AvInput type="text" name="razaoSocial" id="franquia-razaoSocial" value={this.state.razaoSocial} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cnpj' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cnpjLabel" for="franquia-cnpj">
                              <Translate contentKey="generadorApp.franquia.cnpj">Cnpj</Translate>
                            </Label>

                            <AvInput type="text" name="cnpj" id="franquia-cnpj" value={this.state.cnpj} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ie' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ieLabel" for="franquia-ie">
                              <Translate contentKey="generadorApp.franquia.ie">Ie</Translate>
                            </Label>

                            <AvInput type="text" name="ie" id="franquia-ie" value={this.state.ie} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'site' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="siteLabel" for="franquia-site">
                              <Translate contentKey="generadorApp.franquia.site">Site</Translate>
                            </Label>

                            <AvInput type="text" name="site" id="franquia-site" value={this.state.site} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'telefone1' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="telefone1Label" for="franquia-telefone1">
                              <Translate contentKey="generadorApp.franquia.telefone1">Telefone 1</Translate>
                            </Label>

                            <AvInput type="text" name="telefone1" id="franquia-telefone1" value={this.state.telefone1} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'telefone2' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="telefone2Label" for="franquia-telefone2">
                              <Translate contentKey="generadorApp.franquia.telefone2">Telefone 2</Translate>
                            </Label>

                            <AvInput type="text" name="telefone2" id="franquia-telefone2" value={this.state.telefone2} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'celular' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="celularLabel" for="franquia-celular">
                              <Translate contentKey="generadorApp.franquia.celular">Celular</Translate>
                            </Label>

                            <AvInput type="text" name="celular" id="franquia-celular" value={this.state.celular} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cep' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cepLabel" for="franquia-cep">
                              <Translate contentKey="generadorApp.franquia.cep">Cep</Translate>
                            </Label>

                            <AvInput type="text" name="cep" id="franquia-cep" value={this.state.cep} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'endereco' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="enderecoLabel" for="franquia-endereco">
                              <Translate contentKey="generadorApp.franquia.endereco">Endereco</Translate>
                            </Label>

                            <AvInput type="text" name="endereco" id="franquia-endereco" value={this.state.endereco} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'numero' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="numeroLabel" for="franquia-numero">
                              <Translate contentKey="generadorApp.franquia.numero">Numero</Translate>
                            </Label>

                            <AvInput type="text" name="numero" id="franquia-numero" value={this.state.numero} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'complemento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="complementoLabel" for="franquia-complemento">
                              <Translate contentKey="generadorApp.franquia.complemento">Complemento</Translate>
                            </Label>

                            <AvInput type="text" name="complemento" id="franquia-complemento" value={this.state.complemento} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'bairro' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="bairroLabel" for="franquia-bairro">
                              <Translate contentKey="generadorApp.franquia.bairro">Bairro</Translate>
                            </Label>

                            <AvInput type="text" name="bairro" id="franquia-bairro" value={this.state.bairro} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cidadeLabel" for="franquia-cidade">
                              <Translate contentKey="generadorApp.franquia.cidade">Cidade</Translate>
                            </Label>

                            <AvInput type="text" name="cidade" id="franquia-cidade" value={this.state.cidade} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'uf' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ufLabel" for="franquia-uf">
                              <Translate contentKey="generadorApp.franquia.uf">Uf</Translate>
                            </Label>

                            <AvInput type="text" name="uf" id="franquia-uf" value={this.state.uf} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'observacao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="observacaoLabel" for="franquia-observacao">
                              <Translate contentKey="generadorApp.franquia.observacao">Observacao</Translate>
                            </Label>

                            <AvInput type="text" name="observacao" id="franquia-observacao" value={this.state.observacao} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ativo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ativoLabel" for="franquia-ativo">
                              <Translate contentKey="generadorApp.franquia.ativo">Ativo</Translate>
                            </Label>
                            <AvInput type="string" name="ativo" id="franquia-ativo" value={this.state.ativo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'franquiaAreaAtuacao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'franquiaStatusAtual' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'franquiaUsuario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.franquia.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.franquia.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {franquiaList && franquiaList.length > 0 ? (
                <Table responsive aria-describedby="franquia-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'idCidade' ? (
                        <th className="hand" onClick={this.sort('idCidade')}>
                          <Translate contentKey="generadorApp.franquia.idCidade">Id Cidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'nomeFantasia' ? (
                        <th className="hand" onClick={this.sort('nomeFantasia')}>
                          <Translate contentKey="generadorApp.franquia.nomeFantasia">Nome Fantasia</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'razaoSocial' ? (
                        <th className="hand" onClick={this.sort('razaoSocial')}>
                          <Translate contentKey="generadorApp.franquia.razaoSocial">Razao Social</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cnpj' ? (
                        <th className="hand" onClick={this.sort('cnpj')}>
                          <Translate contentKey="generadorApp.franquia.cnpj">Cnpj</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ie' ? (
                        <th className="hand" onClick={this.sort('ie')}>
                          <Translate contentKey="generadorApp.franquia.ie">Ie</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'site' ? (
                        <th className="hand" onClick={this.sort('site')}>
                          <Translate contentKey="generadorApp.franquia.site">Site</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'telefone1' ? (
                        <th className="hand" onClick={this.sort('telefone1')}>
                          <Translate contentKey="generadorApp.franquia.telefone1">Telefone 1</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'telefone2' ? (
                        <th className="hand" onClick={this.sort('telefone2')}>
                          <Translate contentKey="generadorApp.franquia.telefone2">Telefone 2</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'celular' ? (
                        <th className="hand" onClick={this.sort('celular')}>
                          <Translate contentKey="generadorApp.franquia.celular">Celular</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cep' ? (
                        <th className="hand" onClick={this.sort('cep')}>
                          <Translate contentKey="generadorApp.franquia.cep">Cep</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'endereco' ? (
                        <th className="hand" onClick={this.sort('endereco')}>
                          <Translate contentKey="generadorApp.franquia.endereco">Endereco</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'numero' ? (
                        <th className="hand" onClick={this.sort('numero')}>
                          <Translate contentKey="generadorApp.franquia.numero">Numero</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'complemento' ? (
                        <th className="hand" onClick={this.sort('complemento')}>
                          <Translate contentKey="generadorApp.franquia.complemento">Complemento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'bairro' ? (
                        <th className="hand" onClick={this.sort('bairro')}>
                          <Translate contentKey="generadorApp.franquia.bairro">Bairro</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cidade' ? (
                        <th className="hand" onClick={this.sort('cidade')}>
                          <Translate contentKey="generadorApp.franquia.cidade">Cidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'uf' ? (
                        <th className="hand" onClick={this.sort('uf')}>
                          <Translate contentKey="generadorApp.franquia.uf">Uf</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'observacao' ? (
                        <th className="hand" onClick={this.sort('observacao')}>
                          <Translate contentKey="generadorApp.franquia.observacao">Observacao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ativo' ? (
                        <th className="hand" onClick={this.sort('ativo')}>
                          <Translate contentKey="generadorApp.franquia.ativo">Ativo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {franquiaList.map((franquia, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${franquia.id}`} color="link" size="sm">
                            {franquia.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'idCidade' ? <td>{franquia.idCidade}</td> : null}

                        {this.state.baseFilters !== 'nomeFantasia' ? <td>{franquia.nomeFantasia}</td> : null}

                        {this.state.baseFilters !== 'razaoSocial' ? <td>{franquia.razaoSocial}</td> : null}

                        {this.state.baseFilters !== 'cnpj' ? <td>{franquia.cnpj}</td> : null}

                        {this.state.baseFilters !== 'ie' ? <td>{franquia.ie}</td> : null}

                        {this.state.baseFilters !== 'site' ? <td>{franquia.site}</td> : null}

                        {this.state.baseFilters !== 'telefone1' ? <td>{franquia.telefone1}</td> : null}

                        {this.state.baseFilters !== 'telefone2' ? <td>{franquia.telefone2}</td> : null}

                        {this.state.baseFilters !== 'celular' ? <td>{franquia.celular}</td> : null}

                        {this.state.baseFilters !== 'cep' ? <td>{franquia.cep}</td> : null}

                        {this.state.baseFilters !== 'endereco' ? <td>{franquia.endereco}</td> : null}

                        {this.state.baseFilters !== 'numero' ? <td>{franquia.numero}</td> : null}

                        {this.state.baseFilters !== 'complemento' ? <td>{franquia.complemento}</td> : null}

                        {this.state.baseFilters !== 'bairro' ? <td>{franquia.bairro}</td> : null}

                        {this.state.baseFilters !== 'cidade' ? <td>{franquia.cidade}</td> : null}

                        {this.state.baseFilters !== 'uf' ? <td>{franquia.uf}</td> : null}

                        {this.state.baseFilters !== 'observacao' ? <td>{franquia.observacao}</td> : null}

                        {this.state.baseFilters !== 'ativo' ? <td>{franquia.ativo}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${franquia.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${franquia.id}/edit?${this.getFiltersURL()}`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${franquia.id}/delete?${this.getFiltersURL()}`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.franquia.home.notFound">No Franquias found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={franquiaList && franquiaList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ franquia, ...storeState }: IRootState) => ({
  franquiaList: franquia.entities,
  totalItems: franquia.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Franquia);
