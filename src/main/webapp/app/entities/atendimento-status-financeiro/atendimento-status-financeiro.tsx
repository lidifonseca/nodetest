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
import { getEntities } from './atendimento-status-financeiro.reducer';
import { IAtendimentoStatusFinanceiro } from 'app/shared/model/atendimento-status-financeiro.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IAtendimentoStatusFinanceiroProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IAtendimentoStatusFinanceiroBaseState {
  idAtendimento: any;
  idStatusFinanceiro: any;
  idUsuario: any;
}
export interface IAtendimentoStatusFinanceiroState extends IAtendimentoStatusFinanceiroBaseState, IPaginationBaseState {}

export class AtendimentoStatusFinanceiro extends React.Component<IAtendimentoStatusFinanceiroProps, IAtendimentoStatusFinanceiroState> {
  private myFormRef: any;

  constructor(props: IAtendimentoStatusFinanceiroProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getAtendimentoStatusFinanceiroState(this.props.location)
    };
  }

  getAtendimentoStatusFinanceiroState = (location): IAtendimentoStatusFinanceiroBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const idAtendimento = url.searchParams.get('idAtendimento') || '';
    const idStatusFinanceiro = url.searchParams.get('idStatusFinanceiro') || '';
    const idUsuario = url.searchParams.get('idUsuario') || '';

    return {
      idAtendimento,
      idStatusFinanceiro,
      idUsuario
    };
  };

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idAtendimento: '',
        idStatusFinanceiro: '',
        idUsuario: ''
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
      'idAtendimento=' +
      this.state.idAtendimento +
      '&' +
      'idStatusFinanceiro=' +
      this.state.idStatusFinanceiro +
      '&' +
      'idUsuario=' +
      this.state.idUsuario +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idAtendimento, idStatusFinanceiro, idUsuario, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(idAtendimento, idStatusFinanceiro, idUsuario, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { atendimentoStatusFinanceiroList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Atendimento Status Financeiros</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Atendimento Status Financeiros</span>
              <Button id="togglerFilterAtendimentoStatusFinanceiro" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.atendimentoStatusFinanceiro.home.createLabel">
                  Create a new Atendimento Status Financeiro
                </Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterAtendimentoStatusFinanceiro">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="idAtendimentoLabel" for="atendimento-status-financeiro-idAtendimento">
                            <Translate contentKey="generadorApp.atendimentoStatusFinanceiro.idAtendimento">Id Atendimento</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="idAtendimento"
                            id="atendimento-status-financeiro-idAtendimento"
                            value={this.state.idAtendimento}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idStatusFinanceiroLabel" for="atendimento-status-financeiro-idStatusFinanceiro">
                            <Translate contentKey="generadorApp.atendimentoStatusFinanceiro.idStatusFinanceiro">
                              Id Status Financeiro
                            </Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="idStatusFinanceiro"
                            id="atendimento-status-financeiro-idStatusFinanceiro"
                            value={this.state.idStatusFinanceiro}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idUsuarioLabel" for="atendimento-status-financeiro-idUsuario">
                            <Translate contentKey="generadorApp.atendimentoStatusFinanceiro.idUsuario">Id Usuario</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="idUsuario"
                            id="atendimento-status-financeiro-idUsuario"
                            value={this.state.idUsuario}
                          />
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

              {atendimentoStatusFinanceiroList && atendimentoStatusFinanceiroList.length > 0 ? (
                <Table responsive aria-describedby="atendimento-status-financeiro-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idAtendimento')}>
                        <Translate contentKey="generadorApp.atendimentoStatusFinanceiro.idAtendimento">Id Atendimento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idStatusFinanceiro')}>
                        <Translate contentKey="generadorApp.atendimentoStatusFinanceiro.idStatusFinanceiro">Id Status Financeiro</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idUsuario')}>
                        <Translate contentKey="generadorApp.atendimentoStatusFinanceiro.idUsuario">Id Usuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {atendimentoStatusFinanceiroList.map((atendimentoStatusFinanceiro, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${atendimentoStatusFinanceiro.id}`} color="link" size="sm">
                            {atendimentoStatusFinanceiro.id}
                          </Button>
                        </td>

                        <td>{atendimentoStatusFinanceiro.idAtendimento}</td>

                        <td>{atendimentoStatusFinanceiro.idStatusFinanceiro}</td>

                        <td>{atendimentoStatusFinanceiro.idUsuario}</td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${atendimentoStatusFinanceiro.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${atendimentoStatusFinanceiro.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${atendimentoStatusFinanceiro.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.atendimentoStatusFinanceiro.home.notFound">
                    No Atendimento Status Financeiros found
                  </Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={atendimentoStatusFinanceiroList && atendimentoStatusFinanceiroList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ atendimentoStatusFinanceiro, ...storeState }: IRootState) => ({
  atendimentoStatusFinanceiroList: atendimentoStatusFinanceiro.entities,
  totalItems: atendimentoStatusFinanceiro.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AtendimentoStatusFinanceiro);
