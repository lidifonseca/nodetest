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
import { getLogUserFranquiaState, ILogUserFranquiaBaseState, getEntities } from './log-user-franquia.reducer';
import { ILogUserFranquia } from 'app/shared/model/log-user-franquia.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IAcao } from 'app/shared/model/acao.model';
import { getEntities as getAcaos } from 'app/entities/acao/acao.reducer';
import { ITela } from 'app/shared/model/tela.model';
import { getEntities as getTelas } from 'app/entities/tela/tela.reducer';
import { IFranquiaUsuario } from 'app/shared/model/franquia-usuario.model';
import { getEntities as getFranquiaUsuarios } from 'app/entities/franquia-usuario/franquia-usuario.reducer';

export interface ILogUserFranquiaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ILogUserFranquiaState extends ILogUserFranquiaBaseState, IPaginationBaseState {}

export class LogUserFranquia extends React.Component<ILogUserFranquiaProps, ILogUserFranquiaState> {
  private myFormRef: any;

  constructor(props: ILogUserFranquiaProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getLogUserFranquiaState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getAcaos();
    this.props.getTelas();
    this.props.getFranquiaUsuarios();
  }

  cancelCourse = () => {
    this.setState(
      {
        descricao: '',
        acao: '',
        tela: '',
        usuario: ''
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
      'descricao=' +
      this.state.descricao +
      '&' +
      'acao=' +
      this.state.acao +
      '&' +
      'tela=' +
      this.state.tela +
      '&' +
      'usuario=' +
      this.state.usuario +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { descricao, acao, tela, usuario, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(descricao, acao, tela, usuario, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { acaos, telas, franquiaUsuarios, logUserFranquiaList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Log User Franquias</span>
          <Button id="togglerFilterLogUserFranquia" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.logUserFranquia.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.logUserFranquia.home.createLabel">Create a new Log User Franquia</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Log User Franquias</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterLogUserFranquia">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'descricao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="descricaoLabel" for="log-user-franquia-descricao">
                              <Translate contentKey="generadorApp.logUserFranquia.descricao">Descricao</Translate>
                            </Label>
                            <AvInput id="log-user-franquia-descricao" type="textarea" name="descricao" />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'acao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="log-user-franquia-acao">
                                <Translate contentKey="generadorApp.logUserFranquia.acao">Acao</Translate>
                              </Label>
                              <Select
                                id="log-user-franquia-acao"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  acaos
                                    ? acaos.map(p =>
                                        this.state.acao.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null
                                      )
                                    : null
                                }
                                options={acaos ? acaos.map(option => ({ value: option.id, label: option.id })) : null}
                                onChange={options => this.setState({ acao: options.map(option => option['value']).join(',') })}
                                name={'acao'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'tela' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="log-user-franquia-tela">
                                <Translate contentKey="generadorApp.logUserFranquia.tela">Tela</Translate>
                              </Label>
                              <Select
                                id="log-user-franquia-tela"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  telas
                                    ? telas.map(p =>
                                        this.state.tela.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null
                                      )
                                    : null
                                }
                                options={telas ? telas.map(option => ({ value: option.id, label: option.id })) : null}
                                onChange={options => this.setState({ tela: options.map(option => option['value']).join(',') })}
                                name={'tela'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'usuario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="log-user-franquia-usuario">
                                <Translate contentKey="generadorApp.logUserFranquia.usuario">Usuario</Translate>
                              </Label>
                              <Select
                                id="log-user-franquia-usuario"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  franquiaUsuarios
                                    ? franquiaUsuarios.map(p =>
                                        this.state.usuario.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null
                                      )
                                    : null
                                }
                                options={franquiaUsuarios ? franquiaUsuarios.map(option => ({ value: option.id, label: option.id })) : null}
                                onChange={options => this.setState({ usuario: options.map(option => option['value']).join(',') })}
                                name={'usuario'}
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
                        <Translate contentKey="generadorApp.logUserFranquia.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.logUserFranquia.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {logUserFranquiaList && logUserFranquiaList.length > 0 ? (
                <Table responsive aria-describedby="log-user-franquia-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'descricao' ? (
                        <th className="hand" onClick={this.sort('descricao')}>
                          <Translate contentKey="generadorApp.logUserFranquia.descricao">Descricao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'acao' ? (
                        <th>
                          <Translate contentKey="generadorApp.logUserFranquia.acao">Acao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'tela' ? (
                        <th>
                          <Translate contentKey="generadorApp.logUserFranquia.tela">Tela</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'usuario' ? (
                        <th>
                          <Translate contentKey="generadorApp.logUserFranquia.usuario">Usuario</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {logUserFranquiaList.map((logUserFranquia, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${logUserFranquia.id}`} color="link" size="sm">
                            {logUserFranquia.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'descricao' ? (
                          <td>{logUserFranquia.descricao ? Buffer.from(logUserFranquia.descricao).toString() : null}</td>
                        ) : null}

                        {this.state.baseFilters !== 'acao' ? (
                          <td>
                            {logUserFranquia.acao ? <Link to={`acao/${logUserFranquia.acao.id}`}>{logUserFranquia.acao.id}</Link> : ''}
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'tela' ? (
                          <td>
                            {logUserFranquia.tela ? <Link to={`tela/${logUserFranquia.tela.id}`}>{logUserFranquia.tela.id}</Link> : ''}
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'usuario' ? (
                          <td>
                            {logUserFranquia.usuario ? (
                              <Link to={`franquia-usuario/${logUserFranquia.usuario.id}`}>{logUserFranquia.usuario.id}</Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${logUserFranquia.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${logUserFranquia.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${logUserFranquia.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.logUserFranquia.home.notFound">No Log User Franquias found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={logUserFranquiaList && logUserFranquiaList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ logUserFranquia, ...storeState }: IRootState) => ({
  acaos: storeState.acao.entities,
  telas: storeState.tela.entities,
  franquiaUsuarios: storeState.franquiaUsuario.entities,
  logUserFranquiaList: logUserFranquia.entities,
  totalItems: logUserFranquia.totalItems
});

const mapDispatchToProps = {
  getAcaos,
  getTelas,
  getFranquiaUsuarios,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LogUserFranquia);
