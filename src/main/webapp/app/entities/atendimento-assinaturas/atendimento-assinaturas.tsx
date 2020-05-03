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
import { getEntities } from './atendimento-assinaturas.reducer';
import { IAtendimentoAssinaturas } from 'app/shared/model/atendimento-assinaturas.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IAtendimento } from 'app/shared/model/atendimento.model';
import { getEntities as getAtendimentos } from 'app/entities/atendimento/atendimento.reducer';
import { IProfissional } from 'app/shared/model/profissional.model';
import { getEntities as getProfissionals } from 'app/entities/profissional/profissional.reducer';
import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';

export interface IAtendimentoAssinaturasProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IAtendimentoAssinaturasBaseState {
  arquivoAssinatura: any;
  idAtendimento: any;
  idProfissional: any;
  idPaciente: any;
}
export interface IAtendimentoAssinaturasState extends IAtendimentoAssinaturasBaseState, IPaginationBaseState {}

export class AtendimentoAssinaturas extends React.Component<IAtendimentoAssinaturasProps, IAtendimentoAssinaturasState> {
  private myFormRef: any;

  constructor(props: IAtendimentoAssinaturasProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getAtendimentoAssinaturasState(this.props.location)
    };
  }

  getAtendimentoAssinaturasState = (location): IAtendimentoAssinaturasBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const arquivoAssinatura = url.searchParams.get('arquivoAssinatura') || '';

    const idAtendimento = url.searchParams.get('idAtendimento') || '';
    const idProfissional = url.searchParams.get('idProfissional') || '';
    const idPaciente = url.searchParams.get('idPaciente') || '';

    return {
      arquivoAssinatura,
      idAtendimento,
      idProfissional,
      idPaciente
    };
  };

  componentDidMount() {
    this.getEntities();

    this.props.getAtendimentos();
    this.props.getProfissionals();
    this.props.getPacientes();
  }

  cancelCourse = () => {
    this.setState(
      {
        arquivoAssinatura: '',
        idAtendimento: '',
        idProfissional: '',
        idPaciente: ''
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
      'arquivoAssinatura=' +
      this.state.arquivoAssinatura +
      '&' +
      'idAtendimento=' +
      this.state.idAtendimento +
      '&' +
      'idProfissional=' +
      this.state.idProfissional +
      '&' +
      'idPaciente=' +
      this.state.idPaciente +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { arquivoAssinatura, idAtendimento, idProfissional, idPaciente, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(arquivoAssinatura, idAtendimento, idProfissional, idPaciente, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { atendimentos, profissionals, pacientes, atendimentoAssinaturasList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Atendimento Assinaturas</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Atendimento Assinaturas</span>
              <Button id="togglerFilterAtendimentoAssinaturas" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.atendimentoAssinaturas.home.createLabel">
                  Create a new Atendimento Assinaturas
                </Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterAtendimentoAssinaturas">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="arquivoAssinaturaLabel" for="atendimento-assinaturas-arquivoAssinatura">
                            <Translate contentKey="generadorApp.atendimentoAssinaturas.arquivoAssinatura">Arquivo Assinatura</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="arquivoAssinatura"
                            id="atendimento-assinaturas-arquivoAssinatura"
                            value={this.state.arquivoAssinatura}
                          />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="atendimento-assinaturas-idAtendimento">
                              <Translate contentKey="generadorApp.atendimentoAssinaturas.idAtendimento">Id Atendimento</Translate>
                            </Label>
                            <AvInput
                              id="atendimento-assinaturas-idAtendimento"
                              type="select"
                              className="form-control"
                              name="idAtendimentoId"
                            >
                              <option value="" key="0" />
                              {atendimentos
                                ? atendimentos.map(otherEntity => (
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
                            <Label for="atendimento-assinaturas-idProfissional">
                              <Translate contentKey="generadorApp.atendimentoAssinaturas.idProfissional">Id Profissional</Translate>
                            </Label>
                            <AvInput
                              id="atendimento-assinaturas-idProfissional"
                              type="select"
                              className="form-control"
                              name="idProfissionalId"
                            >
                              <option value="" key="0" />
                              {profissionals
                                ? profissionals.map(otherEntity => (
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
                            <Label for="atendimento-assinaturas-idPaciente">
                              <Translate contentKey="generadorApp.atendimentoAssinaturas.idPaciente">Id Paciente</Translate>
                            </Label>
                            <AvInput id="atendimento-assinaturas-idPaciente" type="select" className="form-control" name="idPacienteId">
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

              {atendimentoAssinaturasList && atendimentoAssinaturasList.length > 0 ? (
                <Table responsive aria-describedby="atendimento-assinaturas-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('arquivoAssinatura')}>
                        <Translate contentKey="generadorApp.atendimentoAssinaturas.arquivoAssinatura">Arquivo Assinatura</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.atendimentoAssinaturas.idAtendimento">Id Atendimento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.atendimentoAssinaturas.idProfissional">Id Profissional</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.atendimentoAssinaturas.idPaciente">Id Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {atendimentoAssinaturasList.map((atendimentoAssinaturas, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${atendimentoAssinaturas.id}`} color="link" size="sm">
                            {atendimentoAssinaturas.id}
                          </Button>
                        </td>

                        <td>{atendimentoAssinaturas.arquivoAssinatura}</td>
                        <td>
                          {atendimentoAssinaturas.idAtendimento ? (
                            <Link to={`atendimento/${atendimentoAssinaturas.idAtendimento.id}`}>
                              {atendimentoAssinaturas.idAtendimento.id}
                            </Link>
                          ) : (
                            ''
                          )}
                        </td>
                        <td>
                          {atendimentoAssinaturas.idProfissional ? (
                            <Link to={`profissional/${atendimentoAssinaturas.idProfissional.id}`}>
                              {atendimentoAssinaturas.idProfissional.id}
                            </Link>
                          ) : (
                            ''
                          )}
                        </td>
                        <td>
                          {atendimentoAssinaturas.idPaciente ? (
                            <Link to={`paciente/${atendimentoAssinaturas.idPaciente.id}`}>{atendimentoAssinaturas.idPaciente.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${atendimentoAssinaturas.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${atendimentoAssinaturas.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${atendimentoAssinaturas.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.atendimentoAssinaturas.home.notFound">No Atendimento Assinaturas found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={atendimentoAssinaturasList && atendimentoAssinaturasList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ atendimentoAssinaturas, ...storeState }: IRootState) => ({
  atendimentos: storeState.atendimento.entities,
  profissionals: storeState.profissional.entities,
  pacientes: storeState.paciente.entities,
  atendimentoAssinaturasList: atendimentoAssinaturas.entities,
  totalItems: atendimentoAssinaturas.totalItems
});

const mapDispatchToProps = {
  getAtendimentos,
  getProfissionals,
  getPacientes,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AtendimentoAssinaturas);
