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
import { getOperadoraState, IOperadoraBaseState, getEntities } from './operadora.reducer';
import { IOperadora } from 'app/shared/model/operadora.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { getEntities as getUnidadeEasies } from 'app/entities/unidade-easy/unidade-easy.reducer';
import { ITipoOperadora } from 'app/shared/model/tipo-operadora.model';
import { getEntities as getTipoOperadoras } from 'app/entities/tipo-operadora/tipo-operadora.reducer';

export interface IOperadoraProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IOperadoraState extends IOperadoraBaseState, IPaginationBaseState {}

export class Operadora extends React.Component<IOperadoraProps, IOperadoraState> {
  private myFormRef: any;

  constructor(props: IOperadoraProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getOperadoraState(this.props.location)
    };
  }

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
        <h2 id="page-heading">
          <span className="page-header">Operadoras</span>
          <Button id="togglerFilterOperadora" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.operadora.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.operadora.home.createLabel">Create a new Operadora</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Operadoras</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterOperadora">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'nomeFantasia' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="nomeFantasiaLabel" for="operadora-nomeFantasia">
                              <Translate contentKey="generadorApp.operadora.nomeFantasia">Nome Fantasia</Translate>
                            </Label>

                            <AvInput type="text" name="nomeFantasia" id="operadora-nomeFantasia" value={this.state.nomeFantasia} />
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.operadora.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.operadora.home.btn_filter_clean">Clean</Translate>
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

                        {this.state.baseFilters !== 'nomeFantasia' ? <td>{operadora.nomeFantasia}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${operadora.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${operadora.id}/edit?${this.getFiltersURL()}`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${operadora.id}/delete?${this.getFiltersURL()}`} color="danger" size="sm">
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
