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
import { getEntities } from './alertas-resultados-esperados.reducer';
import { IAlertasResultadosEsperados } from 'app/shared/model/alertas-resultados-esperados.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IResultados } from 'app/shared/model/resultados.model';
import { getEntities as getResultados } from 'app/entities/resultados/resultados.reducer';

export interface IAlertasResultadosEsperadosProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IAlertasResultadosEsperadosBaseState {
  pontuacao: any;
  alteracaoEsperada: any;
  observacoes: any;
  usuarioId: any;
  valor: any;
  resultadosId: any;
}
export interface IAlertasResultadosEsperadosState extends IAlertasResultadosEsperadosBaseState, IPaginationBaseState {}

export class AlertasResultadosEsperados extends React.Component<IAlertasResultadosEsperadosProps, IAlertasResultadosEsperadosState> {
  private myFormRef: any;

  constructor(props: IAlertasResultadosEsperadosProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getAlertasResultadosEsperadosState(this.props.location)
    };
  }

  getAlertasResultadosEsperadosState = (location): IAlertasResultadosEsperadosBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const pontuacao = url.searchParams.get('pontuacao') || '';
    const alteracaoEsperada = url.searchParams.get('alteracaoEsperada') || '';
    const observacoes = url.searchParams.get('observacoes') || '';
    const usuarioId = url.searchParams.get('usuarioId') || '';
    const valor = url.searchParams.get('valor') || '';

    const resultadosId = url.searchParams.get('resultadosId') || '';

    return {
      pontuacao,
      alteracaoEsperada,
      observacoes,
      usuarioId,
      valor,
      resultadosId
    };
  };

  componentDidMount() {
    this.getEntities();

    this.props.getResultados();
  }

  cancelCourse = () => {
    this.setState(
      {
        pontuacao: '',
        alteracaoEsperada: '',
        observacoes: '',
        usuarioId: '',
        valor: '',
        resultadosId: ''
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
      'pontuacao=' +
      this.state.pontuacao +
      '&' +
      'alteracaoEsperada=' +
      this.state.alteracaoEsperada +
      '&' +
      'observacoes=' +
      this.state.observacoes +
      '&' +
      'usuarioId=' +
      this.state.usuarioId +
      '&' +
      'valor=' +
      this.state.valor +
      '&' +
      'resultadosId=' +
      this.state.resultadosId +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { pontuacao, alteracaoEsperada, observacoes, usuarioId, valor, resultadosId, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(
      pontuacao,
      alteracaoEsperada,
      observacoes,
      usuarioId,
      valor,
      resultadosId,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { resultados, alertasResultadosEsperadosList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Alertas Resultados Esperados</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Alertas Resultados Esperados</span>
              <Button id="togglerFilterAlertasResultadosEsperados" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.alertasResultadosEsperados.home.createLabel">
                  Create a new Alertas Resultados Esperados
                </Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterAlertasResultadosEsperados">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="pontuacaoLabel" for="alertas-resultados-esperados-pontuacao">
                            <Translate contentKey="generadorApp.alertasResultadosEsperados.pontuacao">Pontuacao</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="pontuacao"
                            id="alertas-resultados-esperados-pontuacao"
                            value={this.state.pontuacao}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="alteracaoEsperadaLabel" check>
                            <AvInput
                              id="alertas-resultados-esperados-alteracaoEsperada"
                              type="checkbox"
                              className="form-control"
                              name="alteracaoEsperada"
                            />
                            <Translate contentKey="generadorApp.alertasResultadosEsperados.alteracaoEsperada">Alteracao Esperada</Translate>
                          </Label>
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="observacoesLabel" for="alertas-resultados-esperados-observacoes">
                            <Translate contentKey="generadorApp.alertasResultadosEsperados.observacoes">Observacoes</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="observacoes"
                            id="alertas-resultados-esperados-observacoes"
                            value={this.state.observacoes}
                            validate={{
                              maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="usuarioIdLabel" for="alertas-resultados-esperados-usuarioId">
                            <Translate contentKey="generadorApp.alertasResultadosEsperados.usuarioId">Usuario Id</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="usuarioId"
                            id="alertas-resultados-esperados-usuarioId"
                            value={this.state.usuarioId}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="valorLabel" for="alertas-resultados-esperados-valor">
                            <Translate contentKey="generadorApp.alertasResultadosEsperados.valor">Valor</Translate>
                          </Label>
                          <AvInput type="string" name="valor" id="alertas-resultados-esperados-valor" value={this.state.valor} />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="alertas-resultados-esperados-resultadosId">
                              <Translate contentKey="generadorApp.alertasResultadosEsperados.resultadosId">Resultados Id</Translate>
                            </Label>
                            <AvInput
                              id="alertas-resultados-esperados-resultadosId"
                              type="select"
                              className="form-control"
                              name="resultadosIdId"
                            >
                              <option value="" key="0" />
                              {resultados
                                ? resultados.map(otherEntity => (
                                    <option value={otherEntity.id} key={otherEntity.id}>
                                      {otherEntity.id}
                                    </option>
                                  ))
                                : null}
                            </AvInput>
                          </div>
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

              {alertasResultadosEsperadosList && alertasResultadosEsperadosList.length > 0 ? (
                <Table responsive aria-describedby="alertas-resultados-esperados-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('pontuacao')}>
                        <Translate contentKey="generadorApp.alertasResultadosEsperados.pontuacao">Pontuacao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('alteracaoEsperada')}>
                        <Translate contentKey="generadorApp.alertasResultadosEsperados.alteracaoEsperada">Alteracao Esperada</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('observacoes')}>
                        <Translate contentKey="generadorApp.alertasResultadosEsperados.observacoes">Observacoes</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('usuarioId')}>
                        <Translate contentKey="generadorApp.alertasResultadosEsperados.usuarioId">Usuario Id</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('valor')}>
                        <Translate contentKey="generadorApp.alertasResultadosEsperados.valor">Valor</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.alertasResultadosEsperados.resultadosId">Resultados Id</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {alertasResultadosEsperadosList.map((alertasResultadosEsperados, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${alertasResultadosEsperados.id}`} color="link" size="sm">
                            {alertasResultadosEsperados.id}
                          </Button>
                        </td>

                        <td>{alertasResultadosEsperados.pontuacao}</td>

                        <td>{alertasResultadosEsperados.alteracaoEsperada ? 'true' : 'false'}</td>

                        <td>{alertasResultadosEsperados.observacoes}</td>

                        <td>{alertasResultadosEsperados.usuarioId}</td>

                        <td>{alertasResultadosEsperados.valor}</td>
                        <td>
                          {alertasResultadosEsperados.resultadosId ? (
                            <Link to={`resultados/${alertasResultadosEsperados.resultadosId.id}`}>
                              {alertasResultadosEsperados.resultadosId.id}
                            </Link>
                          ) : (
                            ''
                          )}
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${alertasResultadosEsperados.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${alertasResultadosEsperados.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${alertasResultadosEsperados.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.alertasResultadosEsperados.home.notFound">
                    No Alertas Resultados Esperados found
                  </Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={alertasResultadosEsperadosList && alertasResultadosEsperadosList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ alertasResultadosEsperados, ...storeState }: IRootState) => ({
  resultados: storeState.resultados.entities,
  alertasResultadosEsperadosList: alertasResultadosEsperados.entities,
  totalItems: alertasResultadosEsperados.totalItems
});

const mapDispatchToProps = {
  getResultados,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AlertasResultadosEsperados);
