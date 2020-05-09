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
import { getAtendimentoAtividadesState, IAtendimentoAtividadesBaseState, getEntities } from './atendimento-atividades.reducer';
import { IAtendimentoAtividades } from 'app/shared/model/atendimento-atividades.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IAtendimento } from 'app/shared/model/atendimento.model';
import { getEntities as getAtendimentos } from 'app/entities/atendimento/atendimento.reducer';
import { ICategoriaAtividade } from 'app/shared/model/categoria-atividade.model';
import { getEntities as getCategoriaAtividades } from 'app/entities/categoria-atividade/categoria-atividade.reducer';

export interface IAtendimentoAtividadesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IAtendimentoAtividadesState extends IAtendimentoAtividadesBaseState, IPaginationBaseState {}

export class AtendimentoAtividades extends React.Component<IAtendimentoAtividadesProps, IAtendimentoAtividadesState> {
  private myFormRef: any;

  constructor(props: IAtendimentoAtividadesProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getAtendimentoAtividadesState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getAtendimentos();
    this.props.getCategoriaAtividades();
  }

  cancelCourse = () => {
    this.setState(
      {
        feito: '',
        atendimento: '',
        atividade: ''
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
      'feito=' +
      this.state.feito +
      '&' +
      'atendimento=' +
      this.state.atendimento +
      '&' +
      'atividade=' +
      this.state.atividade +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { feito, atendimento, atividade, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(feito, atendimento, atividade, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { atendimentos, categoriaAtividades, atendimentoAtividadesList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Atendimento Atividades</span>
          <Button id="togglerFilterAtendimentoAtividades" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.atendimentoAtividades.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.atendimentoAtividades.home.createLabel">Create a new Atendimento Atividades</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Atendimento Atividades</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterAtendimentoAtividades">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'feito' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="feitoLabel" for="atendimento-atividades-feito">
                              <Translate contentKey="generadorApp.atendimentoAtividades.feito">Feito</Translate>
                            </Label>
                            <AvInput type="string" name="feito" id="atendimento-atividades-feito" value={this.state.feito} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'atendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="atendimento-atividades-atendimento">
                                <Translate contentKey="generadorApp.atendimentoAtividades.atendimento">Atendimento</Translate>
                              </Label>
                              <Select
                                id="atendimento-atividades-atendimento"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  atendimentos
                                    ? atendimentos.map(p =>
                                        this.state.atendimento.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null
                                      )
                                    : null
                                }
                                options={atendimentos ? atendimentos.map(option => ({ value: option.id, label: option.id })) : null}
                                onChange={options => this.setState({ atendimento: options.map(option => option['value']).join(',') })}
                                name={'atendimento'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'atividade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="atendimento-atividades-atividade">
                                <Translate contentKey="generadorApp.atendimentoAtividades.atividade">Atividade</Translate>
                              </Label>
                              <Select
                                id="atendimento-atividades-atividade"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  categoriaAtividades
                                    ? categoriaAtividades.map(p =>
                                        this.state.atividade.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null
                                      )
                                    : null
                                }
                                options={
                                  categoriaAtividades ? categoriaAtividades.map(option => ({ value: option.id, label: option.id })) : null
                                }
                                onChange={options => this.setState({ atividade: options.map(option => option['value']).join(',') })}
                                name={'atividade'}
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
                        <Translate contentKey="generadorApp.atendimentoAtividades.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.atendimentoAtividades.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {atendimentoAtividadesList && atendimentoAtividadesList.length > 0 ? (
                <Table responsive aria-describedby="atendimento-atividades-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'feito' ? (
                        <th className="hand" onClick={this.sort('feito')}>
                          <Translate contentKey="generadorApp.atendimentoAtividades.feito">Feito</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'atendimento' ? (
                        <th>
                          <Translate contentKey="generadorApp.atendimentoAtividades.atendimento">Atendimento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'atividade' ? (
                        <th>
                          <Translate contentKey="generadorApp.atendimentoAtividades.atividade">Atividade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {atendimentoAtividadesList.map((atendimentoAtividades, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${atendimentoAtividades.id}`} color="link" size="sm">
                            {atendimentoAtividades.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'feito' ? <td>{atendimentoAtividades.feito}</td> : null}

                        {this.state.baseFilters !== 'atendimento' ? (
                          <td>
                            {atendimentoAtividades.atendimento ? (
                              <Link to={`atendimento/${atendimentoAtividades.atendimento.id}`}>{atendimentoAtividades.atendimento.id}</Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'atividade' ? (
                          <td>
                            {atendimentoAtividades.atividade ? (
                              <Link to={`categoria-atividade/${atendimentoAtividades.atividade.id}`}>
                                {atendimentoAtividades.atividade.id}
                              </Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button
                              tag={Link}
                              to={`${match.url}/${atendimentoAtividades.id}?${this.getFiltersURL()}`}
                              color="info"
                              size="sm"
                            >
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${atendimentoAtividades.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${atendimentoAtividades.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.atendimentoAtividades.home.notFound">No Atendimento Atividades found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={atendimentoAtividadesList && atendimentoAtividadesList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ atendimentoAtividades, ...storeState }: IRootState) => ({
  atendimentos: storeState.atendimento.entities,
  categoriaAtividades: storeState.categoriaAtividade.entities,
  atendimentoAtividadesList: atendimentoAtividades.entities,
  totalItems: atendimentoAtividades.totalItems
});

const mapDispatchToProps = {
  getAtendimentos,
  getCategoriaAtividades,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AtendimentoAtividades);
