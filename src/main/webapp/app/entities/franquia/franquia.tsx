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
import { getEntities } from './franquia.reducer';
import { IFranquia } from 'app/shared/model/franquia.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IFranquiaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IFranquiaBaseState {
  idCidade: any;
  nomeFantasia: any;
  razaoSocial: any;
  cnpj: any;
  ie: any;
  site: any;
  telefone1: any;
  telefone2: any;
  celular: any;
  cep: any;
  endereco: any;
  numero: any;
  complemento: any;
  bairro: any;
  cidade: any;
  uf: any;
  observacao: any;
  ativo: any;
  franquiaAreaAtuacao: any;
  franquiaStatusAtual: any;
  franquiaUsuario: any;
}
export interface IFranquiaState extends IFranquiaBaseState, IPaginationBaseState {}

export class Franquia extends React.Component<IFranquiaProps, IFranquiaState> {
  private myFormRef: any;

  constructor(props: IFranquiaProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getFranquiaState(this.props.location)
    };
  }

  getFranquiaState = (location): IFranquiaBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const idCidade = url.searchParams.get('idCidade') || '';
    const nomeFantasia = url.searchParams.get('nomeFantasia') || '';
    const razaoSocial = url.searchParams.get('razaoSocial') || '';
    const cnpj = url.searchParams.get('cnpj') || '';
    const ie = url.searchParams.get('ie') || '';
    const site = url.searchParams.get('site') || '';
    const telefone1 = url.searchParams.get('telefone1') || '';
    const telefone2 = url.searchParams.get('telefone2') || '';
    const celular = url.searchParams.get('celular') || '';
    const cep = url.searchParams.get('cep') || '';
    const endereco = url.searchParams.get('endereco') || '';
    const numero = url.searchParams.get('numero') || '';
    const complemento = url.searchParams.get('complemento') || '';
    const bairro = url.searchParams.get('bairro') || '';
    const cidade = url.searchParams.get('cidade') || '';
    const uf = url.searchParams.get('uf') || '';
    const observacao = url.searchParams.get('observacao') || '';
    const ativo = url.searchParams.get('ativo') || '';

    const franquiaAreaAtuacao = url.searchParams.get('franquiaAreaAtuacao') || '';
    const franquiaStatusAtual = url.searchParams.get('franquiaStatusAtual') || '';
    const franquiaUsuario = url.searchParams.get('franquiaUsuario') || '';

    return {
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
      franquiaUsuario
    };
  };

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
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Franquias</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Franquias</span>
              <Button id="togglerFilterFranquia" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.franquia.home.createLabel">Create a new Franquia</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterFranquia">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="idCidadeLabel" for="franquia-idCidade">
                            <Translate contentKey="generadorApp.franquia.idCidade">Id Cidade</Translate>
                          </Label>

                          <AvInput type="text" name="idCidade" id="franquia-idCidade" value={this.state.idCidade} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="nomeFantasiaLabel" for="franquia-nomeFantasia">
                            <Translate contentKey="generadorApp.franquia.nomeFantasia">Nome Fantasia</Translate>
                          </Label>

                          <AvInput type="text" name="nomeFantasia" id="franquia-nomeFantasia" value={this.state.nomeFantasia} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="razaoSocialLabel" for="franquia-razaoSocial">
                            <Translate contentKey="generadorApp.franquia.razaoSocial">Razao Social</Translate>
                          </Label>

                          <AvInput type="text" name="razaoSocial" id="franquia-razaoSocial" value={this.state.razaoSocial} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cnpjLabel" for="franquia-cnpj">
                            <Translate contentKey="generadorApp.franquia.cnpj">Cnpj</Translate>
                          </Label>

                          <AvInput type="text" name="cnpj" id="franquia-cnpj" value={this.state.cnpj} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ieLabel" for="franquia-ie">
                            <Translate contentKey="generadorApp.franquia.ie">Ie</Translate>
                          </Label>

                          <AvInput type="text" name="ie" id="franquia-ie" value={this.state.ie} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="siteLabel" for="franquia-site">
                            <Translate contentKey="generadorApp.franquia.site">Site</Translate>
                          </Label>

                          <AvInput type="text" name="site" id="franquia-site" value={this.state.site} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="telefone1Label" for="franquia-telefone1">
                            <Translate contentKey="generadorApp.franquia.telefone1">Telefone 1</Translate>
                          </Label>

                          <AvInput type="text" name="telefone1" id="franquia-telefone1" value={this.state.telefone1} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="telefone2Label" for="franquia-telefone2">
                            <Translate contentKey="generadorApp.franquia.telefone2">Telefone 2</Translate>
                          </Label>

                          <AvInput type="text" name="telefone2" id="franquia-telefone2" value={this.state.telefone2} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="celularLabel" for="franquia-celular">
                            <Translate contentKey="generadorApp.franquia.celular">Celular</Translate>
                          </Label>

                          <AvInput type="text" name="celular" id="franquia-celular" value={this.state.celular} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cepLabel" for="franquia-cep">
                            <Translate contentKey="generadorApp.franquia.cep">Cep</Translate>
                          </Label>

                          <AvInput type="text" name="cep" id="franquia-cep" value={this.state.cep} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="enderecoLabel" for="franquia-endereco">
                            <Translate contentKey="generadorApp.franquia.endereco">Endereco</Translate>
                          </Label>

                          <AvInput type="text" name="endereco" id="franquia-endereco" value={this.state.endereco} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="numeroLabel" for="franquia-numero">
                            <Translate contentKey="generadorApp.franquia.numero">Numero</Translate>
                          </Label>

                          <AvInput type="text" name="numero" id="franquia-numero" value={this.state.numero} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="complementoLabel" for="franquia-complemento">
                            <Translate contentKey="generadorApp.franquia.complemento">Complemento</Translate>
                          </Label>

                          <AvInput type="text" name="complemento" id="franquia-complemento" value={this.state.complemento} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="bairroLabel" for="franquia-bairro">
                            <Translate contentKey="generadorApp.franquia.bairro">Bairro</Translate>
                          </Label>

                          <AvInput type="text" name="bairro" id="franquia-bairro" value={this.state.bairro} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cidadeLabel" for="franquia-cidade">
                            <Translate contentKey="generadorApp.franquia.cidade">Cidade</Translate>
                          </Label>

                          <AvInput type="text" name="cidade" id="franquia-cidade" value={this.state.cidade} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ufLabel" for="franquia-uf">
                            <Translate contentKey="generadorApp.franquia.uf">Uf</Translate>
                          </Label>

                          <AvInput type="text" name="uf" id="franquia-uf" value={this.state.uf} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="observacaoLabel" for="franquia-observacao">
                            <Translate contentKey="generadorApp.franquia.observacao">Observacao</Translate>
                          </Label>

                          <AvInput type="text" name="observacao" id="franquia-observacao" value={this.state.observacao} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="franquia-ativo">
                            <Translate contentKey="generadorApp.franquia.ativo">Ativo</Translate>
                          </Label>
                          <AvInput type="string" name="ativo" id="franquia-ativo" value={this.state.ativo} />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
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

              {franquiaList && franquiaList.length > 0 ? (
                <Table responsive aria-describedby="franquia-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idCidade')}>
                        <Translate contentKey="generadorApp.franquia.idCidade">Id Cidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('nomeFantasia')}>
                        <Translate contentKey="generadorApp.franquia.nomeFantasia">Nome Fantasia</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('razaoSocial')}>
                        <Translate contentKey="generadorApp.franquia.razaoSocial">Razao Social</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cnpj')}>
                        <Translate contentKey="generadorApp.franquia.cnpj">Cnpj</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ie')}>
                        <Translate contentKey="generadorApp.franquia.ie">Ie</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('site')}>
                        <Translate contentKey="generadorApp.franquia.site">Site</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('telefone1')}>
                        <Translate contentKey="generadorApp.franquia.telefone1">Telefone 1</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('telefone2')}>
                        <Translate contentKey="generadorApp.franquia.telefone2">Telefone 2</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('celular')}>
                        <Translate contentKey="generadorApp.franquia.celular">Celular</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cep')}>
                        <Translate contentKey="generadorApp.franquia.cep">Cep</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('endereco')}>
                        <Translate contentKey="generadorApp.franquia.endereco">Endereco</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('numero')}>
                        <Translate contentKey="generadorApp.franquia.numero">Numero</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('complemento')}>
                        <Translate contentKey="generadorApp.franquia.complemento">Complemento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('bairro')}>
                        <Translate contentKey="generadorApp.franquia.bairro">Bairro</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cidade')}>
                        <Translate contentKey="generadorApp.franquia.cidade">Cidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('uf')}>
                        <Translate contentKey="generadorApp.franquia.uf">Uf</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('observacao')}>
                        <Translate contentKey="generadorApp.franquia.observacao">Observacao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.franquia.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

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

                        <td>{franquia.idCidade}</td>

                        <td>{franquia.nomeFantasia}</td>

                        <td>{franquia.razaoSocial}</td>

                        <td>{franquia.cnpj}</td>

                        <td>{franquia.ie}</td>

                        <td>{franquia.site}</td>

                        <td>{franquia.telefone1}</td>

                        <td>{franquia.telefone2}</td>

                        <td>{franquia.celular}</td>

                        <td>{franquia.cep}</td>

                        <td>{franquia.endereco}</td>

                        <td>{franquia.numero}</td>

                        <td>{franquia.complemento}</td>

                        <td>{franquia.bairro}</td>

                        <td>{franquia.cidade}</td>

                        <td>{franquia.uf}</td>

                        <td>{franquia.observacao}</td>

                        <td>{franquia.ativo}</td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${franquia.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${franquia.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${franquia.id}/delete`} color="danger" size="sm">
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
