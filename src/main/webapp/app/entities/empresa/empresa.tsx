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
import { getEmpresaState, IEmpresaBaseState, getEntities } from './empresa.reducer';
import { IEmpresa } from 'app/shared/model/empresa.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IEmpresaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IEmpresaState extends IEmpresaBaseState, IPaginationBaseState {}

export class Empresa extends React.Component<IEmpresaProps, IEmpresaState> {
  private myFormRef: any;

  constructor(props: IEmpresaProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getEmpresaState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        empresa: '',
        nome: '',
        email: '',
        cpf: '',
        rg: '',
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
        tipo: ''
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
      'empresa=' +
      this.state.empresa +
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
      'tipo=' +
      this.state.tipo +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      empresa,
      nome,
      email,
      cpf,
      rg,
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
      tipo,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      empresa,
      nome,
      email,
      cpf,
      rg,
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
      tipo,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { empresaList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Empresas</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Empresas</span>
              <Button id="togglerFilterEmpresa" className="btn btn-primary float-right jh-create-entity">
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
                <Translate contentKey="generadorApp.empresa.home.createLabel">Create a new Empresa</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterEmpresa">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'empresa' ? (
                        <Col md="3">
                          <Row>
                            <Label id="empresaLabel" for="empresa-empresa">
                              <Translate contentKey="generadorApp.empresa.empresa">Empresa</Translate>
                            </Label>

                            <AvInput type="text" name="empresa" id="empresa-empresa" value={this.state.empresa} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'nome' ? (
                        <Col md="3">
                          <Row>
                            <Label id="nomeLabel" for="empresa-nome">
                              <Translate contentKey="generadorApp.empresa.nome">Nome</Translate>
                            </Label>

                            <AvInput type="text" name="nome" id="empresa-nome" value={this.state.nome} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'email' ? (
                        <Col md="3">
                          <Row>
                            <Label id="emailLabel" for="empresa-email">
                              <Translate contentKey="generadorApp.empresa.email">Email</Translate>
                            </Label>

                            <AvInput type="text" name="email" id="empresa-email" value={this.state.email} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cpf' ? (
                        <Col md="3">
                          <Row>
                            <Label id="cpfLabel" for="empresa-cpf">
                              <Translate contentKey="generadorApp.empresa.cpf">Cpf</Translate>
                            </Label>

                            <AvInput type="text" name="cpf" id="empresa-cpf" value={this.state.cpf} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'rg' ? (
                        <Col md="3">
                          <Row>
                            <Label id="rgLabel" for="empresa-rg">
                              <Translate contentKey="generadorApp.empresa.rg">Rg</Translate>
                            </Label>

                            <AvInput type="text" name="rg" id="empresa-rg" value={this.state.rg} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'nascimento' ? (
                        <Col md="3">
                          <Row>
                            <Label id="nascimentoLabel" for="empresa-nascimento">
                              <Translate contentKey="generadorApp.empresa.nascimento">Nascimento</Translate>
                            </Label>
                            <AvInput type="date" name="nascimento" id="empresa-nascimento" value={this.state.nascimento} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'sexo' ? (
                        <Col md="3">
                          <Row>
                            <Label id="sexoLabel" for="empresa-sexo">
                              <Translate contentKey="generadorApp.empresa.sexo">Sexo</Translate>
                            </Label>
                            <AvInput type="string" name="sexo" id="empresa-sexo" value={this.state.sexo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'telefone1' ? (
                        <Col md="3">
                          <Row>
                            <Label id="telefone1Label" for="empresa-telefone1">
                              <Translate contentKey="generadorApp.empresa.telefone1">Telefone 1</Translate>
                            </Label>

                            <AvInput type="text" name="telefone1" id="empresa-telefone1" value={this.state.telefone1} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'telefone2' ? (
                        <Col md="3">
                          <Row>
                            <Label id="telefone2Label" for="empresa-telefone2">
                              <Translate contentKey="generadorApp.empresa.telefone2">Telefone 2</Translate>
                            </Label>

                            <AvInput type="text" name="telefone2" id="empresa-telefone2" value={this.state.telefone2} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'celular1' ? (
                        <Col md="3">
                          <Row>
                            <Label id="celular1Label" for="empresa-celular1">
                              <Translate contentKey="generadorApp.empresa.celular1">Celular 1</Translate>
                            </Label>

                            <AvInput type="text" name="celular1" id="empresa-celular1" value={this.state.celular1} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'celular2' ? (
                        <Col md="3">
                          <Row>
                            <Label id="celular2Label" for="empresa-celular2">
                              <Translate contentKey="generadorApp.empresa.celular2">Celular 2</Translate>
                            </Label>

                            <AvInput type="text" name="celular2" id="empresa-celular2" value={this.state.celular2} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cep' ? (
                        <Col md="3">
                          <Row>
                            <Label id="cepLabel" for="empresa-cep">
                              <Translate contentKey="generadorApp.empresa.cep">Cep</Translate>
                            </Label>

                            <AvInput type="text" name="cep" id="empresa-cep" value={this.state.cep} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'endereco' ? (
                        <Col md="3">
                          <Row>
                            <Label id="enderecoLabel" for="empresa-endereco">
                              <Translate contentKey="generadorApp.empresa.endereco">Endereco</Translate>
                            </Label>

                            <AvInput type="text" name="endereco" id="empresa-endereco" value={this.state.endereco} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'numero' ? (
                        <Col md="3">
                          <Row>
                            <Label id="numeroLabel" for="empresa-numero">
                              <Translate contentKey="generadorApp.empresa.numero">Numero</Translate>
                            </Label>

                            <AvInput type="text" name="numero" id="empresa-numero" value={this.state.numero} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'complemento' ? (
                        <Col md="3">
                          <Row>
                            <Label id="complementoLabel" for="empresa-complemento">
                              <Translate contentKey="generadorApp.empresa.complemento">Complemento</Translate>
                            </Label>

                            <AvInput type="text" name="complemento" id="empresa-complemento" value={this.state.complemento} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'bairro' ? (
                        <Col md="3">
                          <Row>
                            <Label id="bairroLabel" for="empresa-bairro">
                              <Translate contentKey="generadorApp.empresa.bairro">Bairro</Translate>
                            </Label>

                            <AvInput type="text" name="bairro" id="empresa-bairro" value={this.state.bairro} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cidade' ? (
                        <Col md="3">
                          <Row>
                            <Label id="cidadeLabel" for="empresa-cidade">
                              <Translate contentKey="generadorApp.empresa.cidade">Cidade</Translate>
                            </Label>

                            <AvInput type="text" name="cidade" id="empresa-cidade" value={this.state.cidade} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'uf' ? (
                        <Col md="3">
                          <Row>
                            <Label id="ufLabel" for="empresa-uf">
                              <Translate contentKey="generadorApp.empresa.uf">Uf</Translate>
                            </Label>

                            <AvInput type="text" name="uf" id="empresa-uf" value={this.state.uf} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'tipo' ? (
                        <Col md="3">
                          <Row>
                            <Label id="tipoLabel" for="empresa-tipo">
                              <Translate contentKey="generadorApp.empresa.tipo">Tipo</Translate>
                            </Label>
                            <AvInput type="string" name="tipo" id="empresa-tipo" value={this.state.tipo} />
                          </Row>
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

              {empresaList && empresaList.length > 0 ? (
                <Table responsive aria-describedby="empresa-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'empresa' ? (
                        <th className="hand" onClick={this.sort('empresa')}>
                          <Translate contentKey="generadorApp.empresa.empresa">Empresa</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'nome' ? (
                        <th className="hand" onClick={this.sort('nome')}>
                          <Translate contentKey="generadorApp.empresa.nome">Nome</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'email' ? (
                        <th className="hand" onClick={this.sort('email')}>
                          <Translate contentKey="generadorApp.empresa.email">Email</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cpf' ? (
                        <th className="hand" onClick={this.sort('cpf')}>
                          <Translate contentKey="generadorApp.empresa.cpf">Cpf</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'rg' ? (
                        <th className="hand" onClick={this.sort('rg')}>
                          <Translate contentKey="generadorApp.empresa.rg">Rg</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'nascimento' ? (
                        <th className="hand" onClick={this.sort('nascimento')}>
                          <Translate contentKey="generadorApp.empresa.nascimento">Nascimento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'sexo' ? (
                        <th className="hand" onClick={this.sort('sexo')}>
                          <Translate contentKey="generadorApp.empresa.sexo">Sexo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'telefone1' ? (
                        <th className="hand" onClick={this.sort('telefone1')}>
                          <Translate contentKey="generadorApp.empresa.telefone1">Telefone 1</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'telefone2' ? (
                        <th className="hand" onClick={this.sort('telefone2')}>
                          <Translate contentKey="generadorApp.empresa.telefone2">Telefone 2</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'celular1' ? (
                        <th className="hand" onClick={this.sort('celular1')}>
                          <Translate contentKey="generadorApp.empresa.celular1">Celular 1</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'celular2' ? (
                        <th className="hand" onClick={this.sort('celular2')}>
                          <Translate contentKey="generadorApp.empresa.celular2">Celular 2</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cep' ? (
                        <th className="hand" onClick={this.sort('cep')}>
                          <Translate contentKey="generadorApp.empresa.cep">Cep</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'endereco' ? (
                        <th className="hand" onClick={this.sort('endereco')}>
                          <Translate contentKey="generadorApp.empresa.endereco">Endereco</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'numero' ? (
                        <th className="hand" onClick={this.sort('numero')}>
                          <Translate contentKey="generadorApp.empresa.numero">Numero</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'complemento' ? (
                        <th className="hand" onClick={this.sort('complemento')}>
                          <Translate contentKey="generadorApp.empresa.complemento">Complemento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'bairro' ? (
                        <th className="hand" onClick={this.sort('bairro')}>
                          <Translate contentKey="generadorApp.empresa.bairro">Bairro</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cidade' ? (
                        <th className="hand" onClick={this.sort('cidade')}>
                          <Translate contentKey="generadorApp.empresa.cidade">Cidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'uf' ? (
                        <th className="hand" onClick={this.sort('uf')}>
                          <Translate contentKey="generadorApp.empresa.uf">Uf</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'tipo' ? (
                        <th className="hand" onClick={this.sort('tipo')}>
                          <Translate contentKey="generadorApp.empresa.tipo">Tipo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {empresaList.map((empresa, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${empresa.id}`} color="link" size="sm">
                            {empresa.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'empresa' ? <td>{empresa.empresa}</td> : null}

                        {this.state.baseFilters !== 'nome' ? <td>{empresa.nome}</td> : null}

                        {this.state.baseFilters !== 'email' ? <td>{empresa.email}</td> : null}

                        {this.state.baseFilters !== 'cpf' ? <td>{empresa.cpf}</td> : null}

                        {this.state.baseFilters !== 'rg' ? <td>{empresa.rg}</td> : null}

                        {this.state.baseFilters !== 'nascimento' ? (
                          <td>
                            <TextFormat type="date" value={empresa.nascimento} format={APP_LOCAL_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'sexo' ? <td>{empresa.sexo}</td> : null}

                        {this.state.baseFilters !== 'telefone1' ? <td>{empresa.telefone1}</td> : null}

                        {this.state.baseFilters !== 'telefone2' ? <td>{empresa.telefone2}</td> : null}

                        {this.state.baseFilters !== 'celular1' ? <td>{empresa.celular1}</td> : null}

                        {this.state.baseFilters !== 'celular2' ? <td>{empresa.celular2}</td> : null}

                        {this.state.baseFilters !== 'cep' ? <td>{empresa.cep}</td> : null}

                        {this.state.baseFilters !== 'endereco' ? <td>{empresa.endereco}</td> : null}

                        {this.state.baseFilters !== 'numero' ? <td>{empresa.numero}</td> : null}

                        {this.state.baseFilters !== 'complemento' ? <td>{empresa.complemento}</td> : null}

                        {this.state.baseFilters !== 'bairro' ? <td>{empresa.bairro}</td> : null}

                        {this.state.baseFilters !== 'cidade' ? <td>{empresa.cidade}</td> : null}

                        {this.state.baseFilters !== 'uf' ? <td>{empresa.uf}</td> : null}

                        {this.state.baseFilters !== 'tipo' ? <td>{empresa.tipo}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${empresa.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${empresa.id}/edit?${this.getFiltersURL()}`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${empresa.id}/delete?${this.getFiltersURL()}`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.empresa.home.notFound">No Empresas found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={empresaList && empresaList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ empresa, ...storeState }: IRootState) => ({
  empresaList: empresa.entities,
  totalItems: empresa.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Empresa);
