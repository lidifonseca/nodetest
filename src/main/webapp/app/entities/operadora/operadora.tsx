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
import { getEntities } from './operadora.reducer';
import { IOperadora } from 'app/shared/model/operadora.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IOperadoraProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IOperadoraBaseState {
  nomeFantasia: any;
  razaoSocial: any;
  cnpj: any;
  ie: any;
  site: any;
  ativo: any;
  dataPost: any;
  idUnidade: any;
  endereco: any;
  contatoCentralAtendimento: any;
  emailCentralAtendimento: any;
  nomeContatoComercial: any;
  contatoComercial: any;
  emailComercial: any;
  nomeContatoFinanceiro: any;
  contatoFinanceiro: any;
  emailFinanceiro: any;
  idTipoOperadora: any;
  atendimento: any;
  especialidadeOperadora: any;
  pacienteOperadora: any;
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
    const dataPost = url.searchParams.get('dataPost') || '';
    const idUnidade = url.searchParams.get('idUnidade') || '';
    const endereco = url.searchParams.get('endereco') || '';
    const contatoCentralAtendimento = url.searchParams.get('contatoCentralAtendimento') || '';
    const emailCentralAtendimento = url.searchParams.get('emailCentralAtendimento') || '';
    const nomeContatoComercial = url.searchParams.get('nomeContatoComercial') || '';
    const contatoComercial = url.searchParams.get('contatoComercial') || '';
    const emailComercial = url.searchParams.get('emailComercial') || '';
    const nomeContatoFinanceiro = url.searchParams.get('nomeContatoFinanceiro') || '';
    const contatoFinanceiro = url.searchParams.get('contatoFinanceiro') || '';
    const emailFinanceiro = url.searchParams.get('emailFinanceiro') || '';
    const idTipoOperadora = url.searchParams.get('idTipoOperadora') || '';

    const atendimento = url.searchParams.get('atendimento') || '';
    const especialidadeOperadora = url.searchParams.get('especialidadeOperadora') || '';
    const pacienteOperadora = url.searchParams.get('pacienteOperadora') || '';

    return {
      nomeFantasia,
      razaoSocial,
      cnpj,
      ie,
      site,
      ativo,
      dataPost,
      idUnidade,
      endereco,
      contatoCentralAtendimento,
      emailCentralAtendimento,
      nomeContatoComercial,
      contatoComercial,
      emailComercial,
      nomeContatoFinanceiro,
      contatoFinanceiro,
      emailFinanceiro,
      idTipoOperadora,
      atendimento,
      especialidadeOperadora,
      pacienteOperadora
    };
  };

  componentDidMount() {
    this.getEntities();
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
        dataPost: '',
        idUnidade: '',
        endereco: '',
        contatoCentralAtendimento: '',
        emailCentralAtendimento: '',
        nomeContatoComercial: '',
        contatoComercial: '',
        emailComercial: '',
        nomeContatoFinanceiro: '',
        contatoFinanceiro: '',
        emailFinanceiro: '',
        idTipoOperadora: '',
        atendimento: '',
        especialidadeOperadora: '',
        pacienteOperadora: ''
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
      'dataPost=' +
      this.state.dataPost +
      '&' +
      'idUnidade=' +
      this.state.idUnidade +
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
      'idTipoOperadora=' +
      this.state.idTipoOperadora +
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
      dataPost,
      idUnidade,
      endereco,
      contatoCentralAtendimento,
      emailCentralAtendimento,
      nomeContatoComercial,
      contatoComercial,
      emailComercial,
      nomeContatoFinanceiro,
      contatoFinanceiro,
      emailFinanceiro,
      idTipoOperadora,
      atendimento,
      especialidadeOperadora,
      pacienteOperadora,
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
      dataPost,
      idUnidade,
      endereco,
      contatoCentralAtendimento,
      emailCentralAtendimento,
      nomeContatoComercial,
      contatoComercial,
      emailComercial,
      nomeContatoFinanceiro,
      contatoFinanceiro,
      emailFinanceiro,
      idTipoOperadora,
      atendimento,
      especialidadeOperadora,
      pacienteOperadora,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { operadoraList, match, totalItems } = this.props;
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

                          <AvInput
                            type="text"
                            name="nomeFantasia"
                            id="operadora-nomeFantasia"
                            value={this.state.nomeFantasia}
                            validate={{
                              maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="razaoSocialLabel" for="operadora-razaoSocial">
                            <Translate contentKey="generadorApp.operadora.razaoSocial">Razao Social</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="razaoSocial"
                            id="operadora-razaoSocial"
                            value={this.state.razaoSocial}
                            validate={{
                              maxLength: { value: 150, errorMessage: translate('entity.validation.maxlength', { max: 150 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cnpjLabel" for="operadora-cnpj">
                            <Translate contentKey="generadorApp.operadora.cnpj">Cnpj</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="cnpj"
                            id="operadora-cnpj"
                            value={this.state.cnpj}
                            validate={{
                              maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ieLabel" for="operadora-ie">
                            <Translate contentKey="generadorApp.operadora.ie">Ie</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="ie"
                            id="operadora-ie"
                            value={this.state.ie}
                            validate={{
                              maxLength: { value: 30, errorMessage: translate('entity.validation.maxlength', { max: 30 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="siteLabel" for="operadora-site">
                            <Translate contentKey="generadorApp.operadora.site">Site</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="site"
                            id="operadora-site"
                            value={this.state.site}
                            validate={{
                              maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="operadora-ativo">
                            <Translate contentKey="generadorApp.operadora.ativo">Ativo</Translate>
                          </Label>
                          <AvInput type="string" name="ativo" id="operadora-ativo" value={this.state.ativo} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataPostLabel" for="operadora-dataPost">
                            <Translate contentKey="generadorApp.operadora.dataPost">Data Post</Translate>
                          </Label>
                          <AvInput
                            id="operadora-dataPost"
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
                      <Col md="3">
                        <Row>
                          <Label id="idUnidadeLabel" for="operadora-idUnidade">
                            <Translate contentKey="generadorApp.operadora.idUnidade">Id Unidade</Translate>
                          </Label>
                          <AvInput type="string" name="idUnidade" id="operadora-idUnidade" value={this.state.idUnidade} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="enderecoLabel" for="operadora-endereco">
                            <Translate contentKey="generadorApp.operadora.endereco">Endereco</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="endereco"
                            id="operadora-endereco"
                            value={this.state.endereco}
                            validate={{
                              maxLength: { value: 200, errorMessage: translate('entity.validation.maxlength', { max: 200 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="contatoCentralAtendimentoLabel" for="operadora-contatoCentralAtendimento">
                            <Translate contentKey="generadorApp.operadora.contatoCentralAtendimento">Contato Central Atendimento</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="contatoCentralAtendimento"
                            id="operadora-contatoCentralAtendimento"
                            value={this.state.contatoCentralAtendimento}
                            validate={{
                              maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="emailCentralAtendimentoLabel" for="operadora-emailCentralAtendimento">
                            <Translate contentKey="generadorApp.operadora.emailCentralAtendimento">Email Central Atendimento</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="emailCentralAtendimento"
                            id="operadora-emailCentralAtendimento"
                            value={this.state.emailCentralAtendimento}
                            validate={{
                              maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="nomeContatoComercialLabel" for="operadora-nomeContatoComercial">
                            <Translate contentKey="generadorApp.operadora.nomeContatoComercial">Nome Contato Comercial</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="nomeContatoComercial"
                            id="operadora-nomeContatoComercial"
                            value={this.state.nomeContatoComercial}
                            validate={{
                              maxLength: { value: 200, errorMessage: translate('entity.validation.maxlength', { max: 200 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="contatoComercialLabel" for="operadora-contatoComercial">
                            <Translate contentKey="generadorApp.operadora.contatoComercial">Contato Comercial</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="contatoComercial"
                            id="operadora-contatoComercial"
                            value={this.state.contatoComercial}
                            validate={{
                              maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="emailComercialLabel" for="operadora-emailComercial">
                            <Translate contentKey="generadorApp.operadora.emailComercial">Email Comercial</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="emailComercial"
                            id="operadora-emailComercial"
                            value={this.state.emailComercial}
                            validate={{
                              maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="nomeContatoFinanceiroLabel" for="operadora-nomeContatoFinanceiro">
                            <Translate contentKey="generadorApp.operadora.nomeContatoFinanceiro">Nome Contato Financeiro</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="nomeContatoFinanceiro"
                            id="operadora-nomeContatoFinanceiro"
                            value={this.state.nomeContatoFinanceiro}
                            validate={{
                              maxLength: { value: 200, errorMessage: translate('entity.validation.maxlength', { max: 200 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="contatoFinanceiroLabel" for="operadora-contatoFinanceiro">
                            <Translate contentKey="generadorApp.operadora.contatoFinanceiro">Contato Financeiro</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="contatoFinanceiro"
                            id="operadora-contatoFinanceiro"
                            value={this.state.contatoFinanceiro}
                            validate={{
                              maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="emailFinanceiroLabel" for="operadora-emailFinanceiro">
                            <Translate contentKey="generadorApp.operadora.emailFinanceiro">Email Financeiro</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="emailFinanceiro"
                            id="operadora-emailFinanceiro"
                            value={this.state.emailFinanceiro}
                            validate={{
                              maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idTipoOperadoraLabel" for="operadora-idTipoOperadora">
                            <Translate contentKey="generadorApp.operadora.idTipoOperadora">Id Tipo Operadora</Translate>
                          </Label>
                          <AvInput type="string" name="idTipoOperadora" id="operadora-idTipoOperadora" value={this.state.idTipoOperadora} />
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

              {operadoraList && operadoraList.length > 0 ? (
                <Table responsive aria-describedby="operadora-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('nomeFantasia')}>
                        <Translate contentKey="generadorApp.operadora.nomeFantasia">Nome Fantasia</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('razaoSocial')}>
                        <Translate contentKey="generadorApp.operadora.razaoSocial">Razao Social</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cnpj')}>
                        <Translate contentKey="generadorApp.operadora.cnpj">Cnpj</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ie')}>
                        <Translate contentKey="generadorApp.operadora.ie">Ie</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('site')}>
                        <Translate contentKey="generadorApp.operadora.site">Site</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.operadora.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataPost')}>
                        <Translate contentKey="generadorApp.operadora.dataPost">Data Post</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idUnidade')}>
                        <Translate contentKey="generadorApp.operadora.idUnidade">Id Unidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('endereco')}>
                        <Translate contentKey="generadorApp.operadora.endereco">Endereco</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('contatoCentralAtendimento')}>
                        <Translate contentKey="generadorApp.operadora.contatoCentralAtendimento">Contato Central Atendimento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('emailCentralAtendimento')}>
                        <Translate contentKey="generadorApp.operadora.emailCentralAtendimento">Email Central Atendimento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('nomeContatoComercial')}>
                        <Translate contentKey="generadorApp.operadora.nomeContatoComercial">Nome Contato Comercial</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('contatoComercial')}>
                        <Translate contentKey="generadorApp.operadora.contatoComercial">Contato Comercial</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('emailComercial')}>
                        <Translate contentKey="generadorApp.operadora.emailComercial">Email Comercial</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('nomeContatoFinanceiro')}>
                        <Translate contentKey="generadorApp.operadora.nomeContatoFinanceiro">Nome Contato Financeiro</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('contatoFinanceiro')}>
                        <Translate contentKey="generadorApp.operadora.contatoFinanceiro">Contato Financeiro</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('emailFinanceiro')}>
                        <Translate contentKey="generadorApp.operadora.emailFinanceiro">Email Financeiro</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idTipoOperadora')}>
                        <Translate contentKey="generadorApp.operadora.idTipoOperadora">Id Tipo Operadora</Translate>
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

                        <td>{operadora.razaoSocial}</td>

                        <td>{operadora.cnpj}</td>

                        <td>{operadora.ie}</td>

                        <td>{operadora.site}</td>

                        <td>{operadora.ativo}</td>

                        <td>
                          <TextFormat type="date" value={operadora.dataPost} format={APP_DATE_FORMAT} />
                        </td>

                        <td>{operadora.idUnidade}</td>

                        <td>{operadora.endereco}</td>

                        <td>{operadora.contatoCentralAtendimento}</td>

                        <td>{operadora.emailCentralAtendimento}</td>

                        <td>{operadora.nomeContatoComercial}</td>

                        <td>{operadora.contatoComercial}</td>

                        <td>{operadora.emailComercial}</td>

                        <td>{operadora.nomeContatoFinanceiro}</td>

                        <td>{operadora.contatoFinanceiro}</td>

                        <td>{operadora.emailFinanceiro}</td>

                        <td>{operadora.idTipoOperadora}</td>

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
  operadoraList: operadora.entities,
  totalItems: operadora.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Operadora);
