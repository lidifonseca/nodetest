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
import { getAlertasIndicadoresState, IAlertasIndicadoresBaseState, getEntities } from './alertas-indicadores.reducer';
import { IAlertasIndicadores } from 'app/shared/model/alertas-indicadores.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { ICidXPtaNovoPadItemIndi } from 'app/shared/model/cid-x-pta-novo-pad-item-indi.model';
import { getEntities as getCidXPtaNovoPadItemIndis } from 'app/entities/cid-x-pta-novo-pad-item-indi/cid-x-pta-novo-pad-item-indi.reducer';

export interface IAlertasIndicadoresProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IAlertasIndicadoresState extends IAlertasIndicadoresBaseState, IPaginationBaseState {}

export class AlertasIndicadores extends React.Component<IAlertasIndicadoresProps, IAlertasIndicadoresState> {
  private myFormRef: any;

  constructor(props: IAlertasIndicadoresProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getAlertasIndicadoresState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getCidXPtaNovoPadItemIndis();
  }

  cancelCourse = () => {
    this.setState(
      {
        pontuacao: '',
        alteracaoEsperada: '',
        observacoes: '',
        usuarioId: '',
        padItemIndicadores: ''
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
      'padItemIndicadores=' +
      this.state.padItemIndicadores +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { pontuacao, alteracaoEsperada, observacoes, usuarioId, padItemIndicadores, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(
      pontuacao,
      alteracaoEsperada,
      observacoes,
      usuarioId,
      padItemIndicadores,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { cidXPtaNovoPadItemIndis, alertasIndicadoresList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Alertas Indicadores</span>
          <Button id="togglerFilterAlertasIndicadores" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.alertasIndicadores.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.alertasIndicadores.home.createLabel">Create a new Alertas Indicadores</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Alertas Indicadores</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterAlertasIndicadores">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'pontuacao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="pontuacaoLabel" for="alertas-indicadores-pontuacao">
                              <Translate contentKey="generadorApp.alertasIndicadores.pontuacao">Pontuacao</Translate>
                            </Label>
                            <AvInput type="string" name="pontuacao" id="alertas-indicadores-pontuacao" value={this.state.pontuacao} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'alteracaoEsperada' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="alteracaoEsperadaLabel" check>
                              <AvInput
                                id="alertas-indicadores-alteracaoEsperada"
                                type="checkbox"
                                className="form-control"
                                name="alteracaoEsperada"
                              />
                              <Translate contentKey="generadorApp.alertasIndicadores.alteracaoEsperada">Alteracao Esperada</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'observacoes' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="observacoesLabel" for="alertas-indicadores-observacoes">
                              <Translate contentKey="generadorApp.alertasIndicadores.observacoes">Observacoes</Translate>
                            </Label>

                            <AvInput type="text" name="observacoes" id="alertas-indicadores-observacoes" value={this.state.observacoes} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'usuarioId' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="usuarioIdLabel" for="alertas-indicadores-usuarioId">
                              <Translate contentKey="generadorApp.alertasIndicadores.usuarioId">Usuario Id</Translate>
                            </Label>
                            <AvInput type="string" name="usuarioId" id="alertas-indicadores-usuarioId" value={this.state.usuarioId} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'padItemIndicadores' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="alertas-indicadores-padItemIndicadores">
                                <Translate contentKey="generadorApp.alertasIndicadores.padItemIndicadores">Pad Item Indicadores</Translate>
                              </Label>
                              <Select
                                id="alertas-indicadores-padItemIndicadores"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  cidXPtaNovoPadItemIndis
                                    ? cidXPtaNovoPadItemIndis.map(p =>
                                        this.state.padItemIndicadores.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null
                                      )
                                    : null
                                }
                                options={
                                  cidXPtaNovoPadItemIndis
                                    ? cidXPtaNovoPadItemIndis.map(option => ({ value: option.id, label: option.id }))
                                    : null
                                }
                                onChange={options =>
                                  this.setState({ padItemIndicadores: options.map(option => option['value']).join(',') })
                                }
                                name={'padItemIndicadores'}
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
                        <Translate contentKey="generadorApp.alertasIndicadores.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.alertasIndicadores.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {alertasIndicadoresList && alertasIndicadoresList.length > 0 ? (
                <Table responsive aria-describedby="alertas-indicadores-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'pontuacao' ? (
                        <th className="hand" onClick={this.sort('pontuacao')}>
                          <Translate contentKey="generadorApp.alertasIndicadores.pontuacao">Pontuacao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'alteracaoEsperada' ? (
                        <th className="hand" onClick={this.sort('alteracaoEsperada')}>
                          <Translate contentKey="generadorApp.alertasIndicadores.alteracaoEsperada">Alteracao Esperada</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'observacoes' ? (
                        <th className="hand" onClick={this.sort('observacoes')}>
                          <Translate contentKey="generadorApp.alertasIndicadores.observacoes">Observacoes</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'usuarioId' ? (
                        <th className="hand" onClick={this.sort('usuarioId')}>
                          <Translate contentKey="generadorApp.alertasIndicadores.usuarioId">Usuario Id</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'padItemIndicadores' ? (
                        <th>
                          <Translate contentKey="generadorApp.alertasIndicadores.padItemIndicadores">Pad Item Indicadores</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {alertasIndicadoresList.map((alertasIndicadores, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${alertasIndicadores.id}`} color="link" size="sm">
                            {alertasIndicadores.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'pontuacao' ? <td>{alertasIndicadores.pontuacao}</td> : null}

                        {this.state.baseFilters !== 'alteracaoEsperada' ? (
                          <td>{alertasIndicadores.alteracaoEsperada ? 'true' : 'false'}</td>
                        ) : null}

                        {this.state.baseFilters !== 'observacoes' ? <td>{alertasIndicadores.observacoes}</td> : null}

                        {this.state.baseFilters !== 'usuarioId' ? <td>{alertasIndicadores.usuarioId}</td> : null}

                        {this.state.baseFilters !== 'padItemIndicadores' ? (
                          <td>
                            {alertasIndicadores.padItemIndicadores ? (
                              <Link to={`cid-x-pta-novo-pad-item-indi/${alertasIndicadores.padItemIndicadores.id}`}>
                                {alertasIndicadores.padItemIndicadores.id}
                              </Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${alertasIndicadores.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${alertasIndicadores.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${alertasIndicadores.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.alertasIndicadores.home.notFound">No Alertas Indicadores found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={alertasIndicadoresList && alertasIndicadoresList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ alertasIndicadores, ...storeState }: IRootState) => ({
  cidXPtaNovoPadItemIndis: storeState.cidXPtaNovoPadItemIndi.entities,
  alertasIndicadoresList: alertasIndicadores.entities,
  totalItems: alertasIndicadores.totalItems
});

const mapDispatchToProps = {
  getCidXPtaNovoPadItemIndis,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AlertasIndicadores);
