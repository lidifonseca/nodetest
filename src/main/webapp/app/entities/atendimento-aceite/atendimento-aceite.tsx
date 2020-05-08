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
import { getAtendimentoAceiteState, IAtendimentoAceiteBaseState, getEntities } from './atendimento-aceite.reducer';
import { IAtendimentoAceite } from 'app/shared/model/atendimento-aceite.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IProfissional } from 'app/shared/model/profissional.model';
import { getEntities as getProfissionals } from 'app/entities/profissional/profissional.reducer';
import { IAtendimento } from 'app/shared/model/atendimento.model';
import { getEntities as getAtendimentos } from 'app/entities/atendimento/atendimento.reducer';

export interface IAtendimentoAceiteProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IAtendimentoAceiteState extends IAtendimentoAceiteBaseState, IPaginationBaseState {}

export class AtendimentoAceite extends React.Component<IAtendimentoAceiteProps, IAtendimentoAceiteState> {
  private myFormRef: any;

  constructor(props: IAtendimentoAceiteProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getAtendimentoAceiteState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getProfissionals();
    this.props.getAtendimentos();
  }

  cancelCourse = () => {
    this.setState(
      {
        msgPush: '',
        profissional: '',
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
      'msgPush=' +
      this.state.msgPush +
      '&' +
      'profissional=' +
      this.state.profissional +
      '&' +
      'atendimento=' +
      this.state.atendimento +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { msgPush, profissional, atendimento, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(msgPush, profissional, atendimento, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { profissionals, atendimentos, atendimentoAceiteList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Atendimento Aceites</span>
          <Button id="togglerFilterAtendimentoAceite" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.atendimentoAceite.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.atendimentoAceite.home.createLabel">Create a new Atendimento Aceite</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Atendimento Aceites</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterAtendimentoAceite">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'msgPush' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="msgPushLabel" for="atendimento-aceite-msgPush">
                              <Translate contentKey="generadorApp.atendimentoAceite.msgPush">Msg Push</Translate>
                            </Label>

                            <AvInput type="text" name="msgPush" id="atendimento-aceite-msgPush" value={this.state.msgPush} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'profissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="atendimento-aceite-profissional">
                                <Translate contentKey="generadorApp.atendimentoAceite.profissional">Profissional</Translate>
                              </Label>
                              <Select
                                id="atendimento-aceite-profissional"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  profissionals
                                    ? profissionals.map(p =>
                                        this.state.profissional.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null
                                      )
                                    : null
                                }
                                options={profissionals ? profissionals.map(option => ({ value: option.id, label: option.id })) : null}
                                onChange={options => this.setState({ profissional: options.map(option => option['value']).join(',') })}
                                name={'profissional'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'atendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="atendimento-aceite-atendimento">
                                <Translate contentKey="generadorApp.atendimentoAceite.atendimento">Atendimento</Translate>
                              </Label>
                              <Select
                                id="atendimento-aceite-atendimento"
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
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.atendimentoAceite.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.atendimentoAceite.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {atendimentoAceiteList && atendimentoAceiteList.length > 0 ? (
                <Table responsive aria-describedby="atendimento-aceite-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'msgPush' ? (
                        <th className="hand" onClick={this.sort('msgPush')}>
                          <Translate contentKey="generadorApp.atendimentoAceite.msgPush">Msg Push</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'profissional' ? (
                        <th>
                          <Translate contentKey="generadorApp.atendimentoAceite.profissional">Profissional</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'atendimento' ? (
                        <th>
                          <Translate contentKey="generadorApp.atendimentoAceite.atendimento">Atendimento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {atendimentoAceiteList.map((atendimentoAceite, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${atendimentoAceite.id}`} color="link" size="sm">
                            {atendimentoAceite.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'msgPush' ? <td>{atendimentoAceite.msgPush}</td> : null}

                        {this.state.baseFilters !== 'profissional' ? (
                          <td>
                            {atendimentoAceite.profissional ? (
                              <Link to={`profissional/${atendimentoAceite.profissional.id}`}>{atendimentoAceite.profissional.id}</Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'atendimento' ? (
                          <td>
                            {atendimentoAceite.atendimento ? (
                              <Link to={`atendimento/${atendimentoAceite.atendimento.id}`}>{atendimentoAceite.atendimento.id}</Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${atendimentoAceite.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${atendimentoAceite.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${atendimentoAceite.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.atendimentoAceite.home.notFound">No Atendimento Aceites found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={atendimentoAceiteList && atendimentoAceiteList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ atendimentoAceite, ...storeState }: IRootState) => ({
  profissionals: storeState.profissional.entities,
  atendimentos: storeState.atendimento.entities,
  atendimentoAceiteList: atendimentoAceite.entities,
  totalItems: atendimentoAceite.totalItems
});

const mapDispatchToProps = {
  getProfissionals,
  getAtendimentos,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AtendimentoAceite);
