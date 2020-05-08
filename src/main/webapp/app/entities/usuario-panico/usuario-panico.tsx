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
import { getUsuarioPanicoState, IUsuarioPanicoBaseState, getEntities } from './usuario-panico.reducer';
import { IUsuarioPanico } from 'app/shared/model/usuario-panico.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IUsuarioPanicoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IUsuarioPanicoState extends IUsuarioPanicoBaseState, IPaginationBaseState {}

export class UsuarioPanico extends React.Component<IUsuarioPanicoProps, IUsuarioPanicoState> {
  private myFormRef: any;

  constructor(props: IUsuarioPanicoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getUsuarioPanicoState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idPaciente: '',
        idProfissional: '',
        observacao: '',
        resolvido: '',
        idUserResolvido: ''
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
      'idPaciente=' +
      this.state.idPaciente +
      '&' +
      'idProfissional=' +
      this.state.idProfissional +
      '&' +
      'observacao=' +
      this.state.observacao +
      '&' +
      'resolvido=' +
      this.state.resolvido +
      '&' +
      'idUserResolvido=' +
      this.state.idUserResolvido +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idPaciente, idProfissional, observacao, resolvido, idUserResolvido, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(
      idPaciente,
      idProfissional,
      observacao,
      resolvido,
      idUserResolvido,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { usuarioPanicoList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Usuario Panicos</span>
          <Button id="togglerFilterUsuarioPanico" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.usuarioPanico.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.usuarioPanico.home.createLabel">Create a new Usuario Panico</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Usuario Panicos</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterUsuarioPanico">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idPaciente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idPacienteLabel" for="usuario-panico-idPaciente">
                              <Translate contentKey="generadorApp.usuarioPanico.idPaciente">Id Paciente</Translate>
                            </Label>
                            <AvInput type="string" name="idPaciente" id="usuario-panico-idPaciente" value={this.state.idPaciente} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idProfissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idProfissionalLabel" for="usuario-panico-idProfissional">
                              <Translate contentKey="generadorApp.usuarioPanico.idProfissional">Id Profissional</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idProfissional"
                              id="usuario-panico-idProfissional"
                              value={this.state.idProfissional}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'observacao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="observacaoLabel" for="usuario-panico-observacao">
                              <Translate contentKey="generadorApp.usuarioPanico.observacao">Observacao</Translate>
                            </Label>

                            <AvInput type="text" name="observacao" id="usuario-panico-observacao" value={this.state.observacao} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'resolvido' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="resolvidoLabel" for="usuario-panico-resolvido">
                              <Translate contentKey="generadorApp.usuarioPanico.resolvido">Resolvido</Translate>
                            </Label>
                            <AvInput type="string" name="resolvido" id="usuario-panico-resolvido" value={this.state.resolvido} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idUserResolvido' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idUserResolvidoLabel" for="usuario-panico-idUserResolvido">
                              <Translate contentKey="generadorApp.usuarioPanico.idUserResolvido">Id User Resolvido</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idUserResolvido"
                              id="usuario-panico-idUserResolvido"
                              value={this.state.idUserResolvido}
                            />
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.usuarioPanico.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.usuarioPanico.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {usuarioPanicoList && usuarioPanicoList.length > 0 ? (
                <Table responsive aria-describedby="usuario-panico-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'idPaciente' ? (
                        <th className="hand" onClick={this.sort('idPaciente')}>
                          <Translate contentKey="generadorApp.usuarioPanico.idPaciente">Id Paciente</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idProfissional' ? (
                        <th className="hand" onClick={this.sort('idProfissional')}>
                          <Translate contentKey="generadorApp.usuarioPanico.idProfissional">Id Profissional</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'observacao' ? (
                        <th className="hand" onClick={this.sort('observacao')}>
                          <Translate contentKey="generadorApp.usuarioPanico.observacao">Observacao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'resolvido' ? (
                        <th className="hand" onClick={this.sort('resolvido')}>
                          <Translate contentKey="generadorApp.usuarioPanico.resolvido">Resolvido</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idUserResolvido' ? (
                        <th className="hand" onClick={this.sort('idUserResolvido')}>
                          <Translate contentKey="generadorApp.usuarioPanico.idUserResolvido">Id User Resolvido</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {usuarioPanicoList.map((usuarioPanico, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${usuarioPanico.id}`} color="link" size="sm">
                            {usuarioPanico.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'idPaciente' ? <td>{usuarioPanico.idPaciente}</td> : null}

                        {this.state.baseFilters !== 'idProfissional' ? <td>{usuarioPanico.idProfissional}</td> : null}

                        {this.state.baseFilters !== 'observacao' ? <td>{usuarioPanico.observacao}</td> : null}

                        {this.state.baseFilters !== 'resolvido' ? <td>{usuarioPanico.resolvido}</td> : null}

                        {this.state.baseFilters !== 'idUserResolvido' ? <td>{usuarioPanico.idUserResolvido}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${usuarioPanico.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${usuarioPanico.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${usuarioPanico.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.usuarioPanico.home.notFound">No Usuario Panicos found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={usuarioPanicoList && usuarioPanicoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ usuarioPanico, ...storeState }: IRootState) => ({
  usuarioPanicoList: usuarioPanico.entities,
  totalItems: usuarioPanico.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UsuarioPanico);
