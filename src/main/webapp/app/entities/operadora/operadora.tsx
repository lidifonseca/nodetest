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
import { getEntities } from './operadora.reducer';
import { IOperadora } from 'app/shared/model/operadora.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { getEntities as getUnidadeEasies } from 'app/entities/unidade-easy/unidade-easy.reducer';
import { ITipoOperadora } from 'app/shared/model/tipo-operadora.model';
import { getEntities as getTipoOperadoras } from 'app/entities/tipo-operadora/tipo-operadora.reducer';

export interface IOperadoraProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IOperadoraBaseState {
  nomeFantasia: any;
  razaoSocial: any;
  cnpj: any;
  ie: any;
  site: any;
  ativo: any;
  endereco: any;
  contatoCentralAtendimento: any;
  emailCentralAtendimento: any;
  nomeContatoComercial: any;
  contatoComercial: any;
  emailComercial: any;
  nomeContatoFinanceiro: any;
  contatoFinanceiro: any;
  emailFinanceiro: any;
  atendimento: any;
  especialidadeOperadora: any;
  pacienteOperadora: any;
  unidade: any;
  tipoOperadora: any;
}
export interface IOperadoraState extends IOperadoraBaseState, IPaginationBaseState {}

export class Operadora extends React.Component<IOperadoraProps, IOperadoraState> {
  private myFormRef: any;

  constructor(props: IOperadoraProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getOperadoraState(this.props.location)
    };
  }

  getOperadoraState = (location): IOperadoraBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const nomeFantasia = url.searchParams.get('nomeFantasia') || '';
    const razaoSocial = url.searchParams.get('razaoSocial') || '';
    const cnpj = url.searchParams.get('cnpj') || '';
    const ie = url.searchParams.get('ie') || '';
    const site = url.searchParams.get('site') || '';
    const ativo = url.searchParams.get('ativo') || '';
    const endereco = url.searchParams.get('endereco') || '';
    const contatoCentralAtendimento = url.searchParams.get('contatoCentralAtendimento') || '';
    const emailCentralAtendimento = url.searchParams.get('emailCentralAtendimento') || '';
    const nomeContatoComercial = url.searchParams.get('nomeContatoComercial') || '';
    const contatoComercial = url.searchParams.get('contatoComercial') || '';
    const emailComercial = url.searchParams.get('emailComercial') || '';
    const nomeContatoFinanceiro = url.searchParams.get('nomeContatoFinanceiro') || '';
    const contatoFinanceiro = url.searchParams.get('contatoFinanceiro') || '';
    const emailFinanceiro = url.searchParams.get('emailFinanceiro') || '';

    const atendimento = url.searchParams.get('atendimento') || '';
    const especialidadeOperadora = url.searchParams.get('especialidadeOperadora') || '';
    const pacienteOperadora = url.searchParams.get('pacienteOperadora') || '';
    const unidade = url.searchParams.get('unidade') || '';
    const tipoOperadora = url.searchParams.get('tipoOperadora') || '';

    return {
      nomeFantasia,
      razaoSocial,
      cnpj,
      ie,
      site,
      ativo,
      endereco,
      contatoCentralAtendimento,
      emailCentralAtendimento,
      nomeContatoComercial,
      contatoComercial,
      emailComercial,
      nomeContatoFinanceiro,
      contatoFinanceiro,
      emailFinanceiro,
      atendimento,
      especialidadeOperadora,
      pacienteOperadora,
      unidade,
      tipoOperadora
    };
  };

  componentDidMount() {
    this.getEntities();

    this.props.getUnidadeEasies();
    this.props.getTipoOperadoras();
  }

  cancelCourse = () => {
    this.setState(
      {
        nomeFantasia: '',
        razaoSocial: '',
        cnpj: '',
        ie: '',
        site: '',
        ativo: '',
        endereco: '',
        contatoCentralAtendimento: '',
        emailCentralAtendimento: '',
        nomeContatoComercial: '',
        contatoComercial: '',
        emailComercial: '',
        nomeContatoFinanceiro: '',
        contatoFinanceiro: '',
        emailFinanceiro: '',
        atendimento: '',
        especialidadeOperadora: '',
        pacienteOperadora: '',
        unidade: '',
        tipoOperadora: ''
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
      'ativo=' +
      this.state.ativo +
      '&' +
      'endereco=' +
      this.state.endereco +
      '&' +
      'contatoCentralAtendimento=' +
      this.state.contatoCentralAtendimento +
      '&' +
      'emailCentralAtendimento=' +
      this.state.emailCentralAtendimento +
      '&' +
      'nomeContatoComercial=' +
      this.state.nomeContatoComercial +
      '&' +
      'contatoComercial=' +
      this.state.contatoComercial +
      '&' +
      'emailComercial=' +
      this.state.emailComercial +
      '&' +
      'nomeContatoFinanceiro=' +
      this.state.nomeContatoFinanceiro +
      '&' +
      'contatoFinanceiro=' +
      this.state.contatoFinanceiro +
      '&' +
      'emailFinanceiro=' +
      this.state.emailFinanceiro +
      '&' +
      'atendimento=' +
      this.state.atendimento +
      '&' +
      'especialidadeOperadora=' +
      this.state.especialidadeOperadora +
      '&' +
      'pacienteOperadora=' +
      this.state.pacienteOperadora +
      '&' +
      'unidade=' +
      this.state.unidade +
      '&' +
      'tipoOperadora=' +
      this.state.tipoOperadora +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      nomeFantasia,
      razaoSocial,
      cnpj,
      ie,
      site,
      ativo,
      endereco,
      contatoCentralAtendimento,
      emailCentralAtendimento,
      nomeContatoComercial,
      contatoComercial,
      emailComercial,
      nomeContatoFinanceiro,
      contatoFinanceiro,
      emailFinanceiro,
      atendimento,
      especialidadeOperadora,
      pacienteOperadora,
      unidade,
      tipoOperadora,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      nomeFantasia,
      razaoSocial,
      cnpj,
      ie,
      site,
      ativo,
      endereco,
      contatoCentralAtendimento,
      emailCentralAtendimento,
      nomeContatoComercial,
      contatoComercial,
      emailComercial,
      nomeContatoFinanceiro,
      contatoFinanceiro,
      emailFinanceiro,
      atendimento,
      especialidadeOperadora,
      pacienteOperadora,
      unidade,
      tipoOperadora,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { unidadeEasies, tipoOperadoras, operadoraList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Operadoras</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Operadoras</span>
              <Button id="togglerFilterOperadora" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.operadora.home.createLabel">Create a new Operadora</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterOperadora">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="nomeFantasiaLabel" for="operadora-nomeFantasia">
                            <Translate contentKey="generadorApp.operadora.nomeFantasia">Nome Fantasia</Translate>
                          </Label>

                          <AvInput type="text" name="nomeFantasia" id="operadora-nomeFantasia" value={this.state.nomeFantasia} />
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

              {operadoraList && operadoraList.length > 0 ? (
                <Table responsive aria-describedby="operadora-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('nomeFantasia')}>
                        <Translate contentKey="generadorApp.operadora.nomeFantasia"></Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {operadoraList.map((operadora, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${operadora.id}`} color="link" size="sm">
                            {operadora.id}
                          </Button>
                        </td>

                        <td>{operadora.nomeFantasia}</td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${operadora.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${operadora.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${operadora.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.operadora.home.notFound">No Operadoras found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={operadoraList && operadoraList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ operadora, ...storeState }: IRootState) => ({
  unidadeEasies: storeState.unidadeEasy.entities,
  tipoOperadoras: storeState.tipoOperadora.entities,
  operadoraList: operadora.entities,
  totalItems: operadora.totalItems
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getTipoOperadoras,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Operadora);
