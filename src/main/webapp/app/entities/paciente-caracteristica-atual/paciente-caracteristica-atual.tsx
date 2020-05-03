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
import { getEntities } from './paciente-caracteristica-atual.reducer';
import { IPacienteCaracteristicaAtual } from 'app/shared/model/paciente-caracteristica-atual.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPacienteCaracteristicaAtualProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPacienteCaracteristicaAtualBaseState {
  idPaciente: any;
  idPacienteCaracteristica: any;
  idUsuario: any;
  dataPost: any;
}
export interface IPacienteCaracteristicaAtualState extends IPacienteCaracteristicaAtualBaseState, IPaginationBaseState {}

export class PacienteCaracteristicaAtual extends React.Component<IPacienteCaracteristicaAtualProps, IPacienteCaracteristicaAtualState> {
  private myFormRef: any;

  constructor(props: IPacienteCaracteristicaAtualProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getPacienteCaracteristicaAtualState(this.props.location)
    };
  }

  getPacienteCaracteristicaAtualState = (location): IPacienteCaracteristicaAtualBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const idPaciente = url.searchParams.get('idPaciente') || '';
    const idPacienteCaracteristica = url.searchParams.get('idPacienteCaracteristica') || '';
    const idUsuario = url.searchParams.get('idUsuario') || '';
    const dataPost = url.searchParams.get('dataPost') || '';

    return {
      idPaciente,
      idPacienteCaracteristica,
      idUsuario,
      dataPost
    };
  };

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idPaciente: '',
        idPacienteCaracteristica: '',
        idUsuario: '',
        dataPost: ''
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
      'idPaciente=' +
      this.state.idPaciente +
      '&' +
      'idPacienteCaracteristica=' +
      this.state.idPacienteCaracteristica +
      '&' +
      'idUsuario=' +
      this.state.idUsuario +
      '&' +
      'dataPost=' +
      this.state.dataPost +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idPaciente, idPacienteCaracteristica, idUsuario, dataPost, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(idPaciente, idPacienteCaracteristica, idUsuario, dataPost, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { pacienteCaracteristicaAtualList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Caracteristica Atuals</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Paciente Caracteristica Atuals</span>
              <Button id="togglerFilterPacienteCaracteristicaAtual" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.pacienteCaracteristicaAtual.home.createLabel">
                  Create a new Paciente Caracteristica Atual
                </Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPacienteCaracteristicaAtual">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="idPacienteLabel" for="paciente-caracteristica-atual-idPaciente">
                            <Translate contentKey="generadorApp.pacienteCaracteristicaAtual.idPaciente">Id Paciente</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="idPaciente"
                            id="paciente-caracteristica-atual-idPaciente"
                            value={this.state.idPaciente}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idPacienteCaracteristicaLabel" for="paciente-caracteristica-atual-idPacienteCaracteristica">
                            <Translate contentKey="generadorApp.pacienteCaracteristicaAtual.idPacienteCaracteristica">
                              Id Paciente Caracteristica
                            </Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="idPacienteCaracteristica"
                            id="paciente-caracteristica-atual-idPacienteCaracteristica"
                            value={this.state.idPacienteCaracteristica}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idUsuarioLabel" for="paciente-caracteristica-atual-idUsuario">
                            <Translate contentKey="generadorApp.pacienteCaracteristicaAtual.idUsuario">Id Usuario</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="idUsuario"
                            id="paciente-caracteristica-atual-idUsuario"
                            value={this.state.idUsuario}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataPostLabel" for="paciente-caracteristica-atual-dataPost">
                            <Translate contentKey="generadorApp.pacienteCaracteristicaAtual.dataPost">Data Post</Translate>
                          </Label>
                          <AvInput
                            id="paciente-caracteristica-atual-dataPost"
                            type="datetime-local"
                            className="form-control"
                            name="dataPost"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.dataPost ? convertDateTimeFromServer(this.state.dataPost) : null}
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

              {pacienteCaracteristicaAtualList && pacienteCaracteristicaAtualList.length > 0 ? (
                <Table responsive aria-describedby="paciente-caracteristica-atual-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idPaciente')}>
                        <Translate contentKey="generadorApp.pacienteCaracteristicaAtual.idPaciente">Id Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idPacienteCaracteristica')}>
                        <Translate contentKey="generadorApp.pacienteCaracteristicaAtual.idPacienteCaracteristica">
                          Id Paciente Caracteristica
                        </Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idUsuario')}>
                        <Translate contentKey="generadorApp.pacienteCaracteristicaAtual.idUsuario">Id Usuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataPost')}>
                        <Translate contentKey="generadorApp.pacienteCaracteristicaAtual.dataPost">Data Post</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {pacienteCaracteristicaAtualList.map((pacienteCaracteristicaAtual, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${pacienteCaracteristicaAtual.id}`} color="link" size="sm">
                            {pacienteCaracteristicaAtual.id}
                          </Button>
                        </td>

                        <td>{pacienteCaracteristicaAtual.idPaciente}</td>

                        <td>{pacienteCaracteristicaAtual.idPacienteCaracteristica}</td>

                        <td>{pacienteCaracteristicaAtual.idUsuario}</td>

                        <td>
                          <TextFormat type="date" value={pacienteCaracteristicaAtual.dataPost} format={APP_DATE_FORMAT} />
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${pacienteCaracteristicaAtual.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${pacienteCaracteristicaAtual.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${pacienteCaracteristicaAtual.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.pacienteCaracteristicaAtual.home.notFound">
                    No Paciente Caracteristica Atuals found
                  </Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={pacienteCaracteristicaAtualList && pacienteCaracteristicaAtualList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ pacienteCaracteristicaAtual, ...storeState }: IRootState) => ({
  pacienteCaracteristicaAtualList: pacienteCaracteristicaAtual.entities,
  totalItems: pacienteCaracteristicaAtual.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteCaracteristicaAtual);
