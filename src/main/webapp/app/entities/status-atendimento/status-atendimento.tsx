/* eslint complexity: ["error", 100] */
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
import { getStatusAtendimentoState, IStatusAtendimentoBaseState, getEntities } from './status-atendimento.reducer';
import { IStatusAtendimento } from 'app/shared/model/status-atendimento.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IStatusAtendimentoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IStatusAtendimentoState extends IStatusAtendimentoBaseState, IPaginationBaseState {}

export class StatusAtendimento extends React.Component<IStatusAtendimentoProps, IStatusAtendimentoState> {
  private myFormRef: any;

  constructor(props: IStatusAtendimentoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getStatusAtendimentoState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        statusAtendimento: '',
        styleLabel: '',
        ordenacao: '',
        ativo: '',
        atendimento: ''
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
      'statusAtendimento=' +
      this.state.statusAtendimento +
      '&' +
      'styleLabel=' +
      this.state.styleLabel +
      '&' +
      'ordenacao=' +
      this.state.ordenacao +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'atendimento=' +
      this.state.atendimento +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { statusAtendimento, styleLabel, ordenacao, ativo, atendimento, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(statusAtendimento, styleLabel, ordenacao, ativo, atendimento, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { statusAtendimentoList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Status Atendimentos</span>
          <Button id="togglerFilterStatusAtendimento" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.statusAtendimento.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.statusAtendimento.home.createLabel">Create a new Status Atendimento</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Status Atendimentos</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterStatusAtendimento">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'statusAtendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="statusAtendimentoLabel" for="status-atendimento-statusAtendimento">
                              <Translate contentKey="generadorApp.statusAtendimento.statusAtendimento">Status Atendimento</Translate>
                            </Label>

                            <AvInput
                              type="text"
                              name="statusAtendimento"
                              id="status-atendimento-statusAtendimento"
                              value={this.state.statusAtendimento}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'styleLabel' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="styleLabelLabel" for="status-atendimento-styleLabel">
                              <Translate contentKey="generadorApp.statusAtendimento.styleLabel">Style Label</Translate>
                            </Label>

                            <AvInput type="text" name="styleLabel" id="status-atendimento-styleLabel" value={this.state.styleLabel} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ordenacao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ordenacaoLabel" for="status-atendimento-ordenacao">
                              <Translate contentKey="generadorApp.statusAtendimento.ordenacao">Ordenacao</Translate>
                            </Label>
                            <AvInput type="string" name="ordenacao" id="status-atendimento-ordenacao" value={this.state.ordenacao} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ativo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ativoLabel" for="status-atendimento-ativo">
                              <Translate contentKey="generadorApp.statusAtendimento.ativo">Ativo</Translate>
                            </Label>
                            <AvInput type="string" name="ativo" id="status-atendimento-ativo" value={this.state.ativo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'atendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.statusAtendimento.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.statusAtendimento.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {statusAtendimentoList && statusAtendimentoList.length > 0 ? (
                <Table responsive aria-describedby="status-atendimento-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'statusAtendimento' ? (
                        <th className="hand" onClick={this.sort('statusAtendimento')}>
                          <Translate contentKey="generadorApp.statusAtendimento.statusAtendimento">Status Atendimento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'styleLabel' ? (
                        <th className="hand" onClick={this.sort('styleLabel')}>
                          <Translate contentKey="generadorApp.statusAtendimento.styleLabel">Style Label</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ordenacao' ? (
                        <th className="hand" onClick={this.sort('ordenacao')}>
                          <Translate contentKey="generadorApp.statusAtendimento.ordenacao">Ordenacao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ativo' ? (
                        <th className="hand" onClick={this.sort('ativo')}>
                          <Translate contentKey="generadorApp.statusAtendimento.ativo">Ativo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {statusAtendimentoList.map((statusAtendimento, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${statusAtendimento.id}`} color="link" size="sm">
                            {statusAtendimento.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'statusAtendimento' ? <td>{statusAtendimento.statusAtendimento}</td> : null}

                        {this.state.baseFilters !== 'styleLabel' ? <td>{statusAtendimento.styleLabel}</td> : null}

                        {this.state.baseFilters !== 'ordenacao' ? <td>{statusAtendimento.ordenacao}</td> : null}

                        {this.state.baseFilters !== 'ativo' ? <td>{statusAtendimento.ativo}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${statusAtendimento.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${statusAtendimento.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${statusAtendimento.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.statusAtendimento.home.notFound">No Status Atendimentos found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={statusAtendimentoList && statusAtendimentoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ statusAtendimento, ...storeState }: IRootState) => ({
  statusAtendimentoList: statusAtendimento.entities,
  totalItems: statusAtendimento.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StatusAtendimento);
