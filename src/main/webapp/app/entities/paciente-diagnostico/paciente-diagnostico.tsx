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
import { getEntities } from './paciente-diagnostico.reducer';
import { IPacienteDiagnostico } from 'app/shared/model/paciente-diagnostico.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';
import { ICid } from 'app/shared/model/cid.model';
import { getEntities as getCids } from 'app/entities/cid/cid.reducer';

export interface IPacienteDiagnosticoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPacienteDiagnosticoBaseState {
  observacao: any;
  ativo: any;
  dataPost: any;
  cidPrimario: any;
  complexidade: any;
  cidComAlta: any;
  idPaciente: any;
  idCid: any;
}
export interface IPacienteDiagnosticoState extends IPacienteDiagnosticoBaseState, IPaginationBaseState {}

export class PacienteDiagnostico extends React.Component<IPacienteDiagnosticoProps, IPacienteDiagnosticoState> {
  private myFormRef: any;

  constructor(props: IPacienteDiagnosticoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getPacienteDiagnosticoState(this.props.location)
    };
  }

  getPacienteDiagnosticoState = (location): IPacienteDiagnosticoBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const observacao = url.searchParams.get('observacao') || '';
    const ativo = url.searchParams.get('ativo') || '';
    const dataPost = url.searchParams.get('dataPost') || '';
    const cidPrimario = url.searchParams.get('cidPrimario') || '';
    const complexidade = url.searchParams.get('complexidade') || '';
    const cidComAlta = url.searchParams.get('cidComAlta') || '';

    const idPaciente = url.searchParams.get('idPaciente') || '';
    const idCid = url.searchParams.get('idCid') || '';

    return {
      observacao,
      ativo,
      dataPost,
      cidPrimario,
      complexidade,
      cidComAlta,
      idPaciente,
      idCid
    };
  };

  componentDidMount() {
    this.getEntities();

    this.props.getPacientes();
    this.props.getCids();
  }

  cancelCourse = () => {
    this.setState(
      {
        observacao: '',
        ativo: '',
        dataPost: '',
        cidPrimario: '',
        complexidade: '',
        cidComAlta: '',
        idPaciente: '',
        idCid: ''
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
      'observacao=' +
      this.state.observacao +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'dataPost=' +
      this.state.dataPost +
      '&' +
      'cidPrimario=' +
      this.state.cidPrimario +
      '&' +
      'complexidade=' +
      this.state.complexidade +
      '&' +
      'cidComAlta=' +
      this.state.cidComAlta +
      '&' +
      'idPaciente=' +
      this.state.idPaciente +
      '&' +
      'idCid=' +
      this.state.idCid +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      observacao,
      ativo,
      dataPost,
      cidPrimario,
      complexidade,
      cidComAlta,
      idPaciente,
      idCid,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      observacao,
      ativo,
      dataPost,
      cidPrimario,
      complexidade,
      cidComAlta,
      idPaciente,
      idCid,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { pacientes, cids, pacienteDiagnosticoList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Diagnosticos</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Paciente Diagnosticos</span>
              <Button id="togglerFilterPacienteDiagnostico" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.pacienteDiagnostico.home.createLabel">Create a new Paciente Diagnostico</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPacienteDiagnostico">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="observacaoLabel" for="paciente-diagnostico-observacao">
                            <Translate contentKey="generadorApp.pacienteDiagnostico.observacao">Observacao</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="observacao"
                            id="paciente-diagnostico-observacao"
                            value={this.state.observacao}
                            validate={{
                              maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="paciente-diagnostico-ativo">
                            <Translate contentKey="generadorApp.pacienteDiagnostico.ativo">Ativo</Translate>
                          </Label>
                          <AvInput type="string" name="ativo" id="paciente-diagnostico-ativo" value={this.state.ativo} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataPostLabel" for="paciente-diagnostico-dataPost">
                            <Translate contentKey="generadorApp.pacienteDiagnostico.dataPost">Data Post</Translate>
                          </Label>
                          <AvInput
                            id="paciente-diagnostico-dataPost"
                            type="datetime-local"
                            className="form-control"
                            name="dataPost"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.dataPost ? convertDateTimeFromServer(this.state.dataPost) : null}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cidPrimarioLabel" check>
                            <AvInput id="paciente-diagnostico-cidPrimario" type="checkbox" className="form-control" name="cidPrimario" />
                            <Translate contentKey="generadorApp.pacienteDiagnostico.cidPrimario">Cid Primario</Translate>
                          </Label>
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="complexidadeLabel" for="paciente-diagnostico-complexidade">
                            <Translate contentKey="generadorApp.pacienteDiagnostico.complexidade">Complexidade</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="complexidade"
                            id="paciente-diagnostico-complexidade"
                            value={this.state.complexidade}
                            validate={{
                              maxLength: { value: 80, errorMessage: translate('entity.validation.maxlength', { max: 80 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cidComAltaLabel" check>
                            <AvInput id="paciente-diagnostico-cidComAlta" type="checkbox" className="form-control" name="cidComAlta" />
                            <Translate contentKey="generadorApp.pacienteDiagnostico.cidComAlta">Cid Com Alta</Translate>
                          </Label>
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="paciente-diagnostico-idPaciente">
                              <Translate contentKey="generadorApp.pacienteDiagnostico.idPaciente">Id Paciente</Translate>
                            </Label>
                            <AvInput id="paciente-diagnostico-idPaciente" type="select" className="form-control" name="idPacienteId">
                              <option value="" key="0" />
                              {pacientes
                                ? pacientes.map(otherEntity => (
                                    <option value={otherEntity.id} key={otherEntity.id}>
                                      {otherEntity.id}
                                    </option>
                                  ))
                                : null}
                            </AvInput>
                          </div>
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="paciente-diagnostico-idCid">
                              <Translate contentKey="generadorApp.pacienteDiagnostico.idCid">Id Cid</Translate>
                            </Label>
                            <AvInput id="paciente-diagnostico-idCid" type="select" className="form-control" name="idCidId">
                              <option value="" key="0" />
                              {cids
                                ? cids.map(otherEntity => (
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

              {pacienteDiagnosticoList && pacienteDiagnosticoList.length > 0 ? (
                <Table responsive aria-describedby="paciente-diagnostico-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('observacao')}>
                        <Translate contentKey="generadorApp.pacienteDiagnostico.observacao">Observacao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.pacienteDiagnostico.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataPost')}>
                        <Translate contentKey="generadorApp.pacienteDiagnostico.dataPost">Data Post</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cidPrimario')}>
                        <Translate contentKey="generadorApp.pacienteDiagnostico.cidPrimario">Cid Primario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('complexidade')}>
                        <Translate contentKey="generadorApp.pacienteDiagnostico.complexidade">Complexidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cidComAlta')}>
                        <Translate contentKey="generadorApp.pacienteDiagnostico.cidComAlta">Cid Com Alta</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.pacienteDiagnostico.idPaciente">Id Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.pacienteDiagnostico.idCid">Id Cid</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {pacienteDiagnosticoList.map((pacienteDiagnostico, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${pacienteDiagnostico.id}`} color="link" size="sm">
                            {pacienteDiagnostico.id}
                          </Button>
                        </td>

                        <td>{pacienteDiagnostico.observacao}</td>

                        <td>{pacienteDiagnostico.ativo}</td>

                        <td>
                          <TextFormat type="date" value={pacienteDiagnostico.dataPost} format={APP_DATE_FORMAT} />
                        </td>

                        <td>{pacienteDiagnostico.cidPrimario ? 'true' : 'false'}</td>

                        <td>{pacienteDiagnostico.complexidade}</td>

                        <td>{pacienteDiagnostico.cidComAlta ? 'true' : 'false'}</td>
                        <td>
                          {pacienteDiagnostico.idPaciente ? (
                            <Link to={`paciente/${pacienteDiagnostico.idPaciente.id}`}>{pacienteDiagnostico.idPaciente.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>
                        <td>
                          {pacienteDiagnostico.idCid ? (
                            <Link to={`cid/${pacienteDiagnostico.idCid.id}`}>{pacienteDiagnostico.idCid.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${pacienteDiagnostico.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${pacienteDiagnostico.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${pacienteDiagnostico.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.pacienteDiagnostico.home.notFound">No Paciente Diagnosticos found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={pacienteDiagnosticoList && pacienteDiagnosticoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ pacienteDiagnostico, ...storeState }: IRootState) => ({
  pacientes: storeState.paciente.entities,
  cids: storeState.cid.entities,
  pacienteDiagnosticoList: pacienteDiagnostico.entities,
  totalItems: pacienteDiagnostico.totalItems
});

const mapDispatchToProps = {
  getPacientes,
  getCids,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteDiagnostico);
