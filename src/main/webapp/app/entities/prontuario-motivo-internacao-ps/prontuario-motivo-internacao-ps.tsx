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
import { getEntities } from './prontuario-motivo-internacao-ps.reducer';
import { IProntuarioMotivoInternacaoPs } from 'app/shared/model/prontuario-motivo-internacao-ps.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IProntuarioMotivoInternacaoPsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IProntuarioMotivoInternacaoPsBaseState {
  idProntuario: any;
  idPaciente: any;
  idMotivo: any;
  idUsuario: any;
}
export interface IProntuarioMotivoInternacaoPsState extends IProntuarioMotivoInternacaoPsBaseState, IPaginationBaseState {}

export class ProntuarioMotivoInternacaoPs extends React.Component<IProntuarioMotivoInternacaoPsProps, IProntuarioMotivoInternacaoPsState> {
  private myFormRef: any;

  constructor(props: IProntuarioMotivoInternacaoPsProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getProntuarioMotivoInternacaoPsState(this.props.location)
    };
  }

  getProntuarioMotivoInternacaoPsState = (location): IProntuarioMotivoInternacaoPsBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const idProntuario = url.searchParams.get('idProntuario') || '';
    const idPaciente = url.searchParams.get('idPaciente') || '';
    const idMotivo = url.searchParams.get('idMotivo') || '';
    const idUsuario = url.searchParams.get('idUsuario') || '';

    return {
      idProntuario,
      idPaciente,
      idMotivo,
      idUsuario
    };
  };

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idProntuario: '',
        idPaciente: '',
        idMotivo: '',
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
      'idProntuario=' +
      this.state.idProntuario +
      '&' +
      'idPaciente=' +
      this.state.idPaciente +
      '&' +
      'idMotivo=' +
      this.state.idMotivo +
      '&' +
      'idUsuario=' +
      this.state.idUsuario +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idProntuario, idPaciente, idMotivo, idUsuario, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(idProntuario, idPaciente, idMotivo, idUsuario, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { prontuarioMotivoInternacaoPsList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Prontuario Motivo Internacao Ps</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Prontuario Motivo Internacao Ps</span>
              <Button id="togglerFilterProntuarioMotivoInternacaoPs" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.prontuarioMotivoInternacaoPs.home.createLabel">
                  Create a new Prontuario Motivo Internacao Ps
                </Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterProntuarioMotivoInternacaoPs">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="idProntuarioLabel" for="prontuario-motivo-internacao-ps-idProntuario">
                            <Translate contentKey="generadorApp.prontuarioMotivoInternacaoPs.idProntuario">Id Prontuario</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="idProntuario"
                            id="prontuario-motivo-internacao-ps-idProntuario"
                            value={this.state.idProntuario}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idPacienteLabel" for="prontuario-motivo-internacao-ps-idPaciente">
                            <Translate contentKey="generadorApp.prontuarioMotivoInternacaoPs.idPaciente">Id Paciente</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="idPaciente"
                            id="prontuario-motivo-internacao-ps-idPaciente"
                            value={this.state.idPaciente}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idMotivoLabel" for="prontuario-motivo-internacao-ps-idMotivo">
                            <Translate contentKey="generadorApp.prontuarioMotivoInternacaoPs.idMotivo">Id Motivo</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="idMotivo"
                            id="prontuario-motivo-internacao-ps-idMotivo"
                            value={this.state.idMotivo}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idUsuarioLabel" for="prontuario-motivo-internacao-ps-idUsuario">
                            <Translate contentKey="generadorApp.prontuarioMotivoInternacaoPs.idUsuario">Id Usuario</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="idUsuario"
                            id="prontuario-motivo-internacao-ps-idUsuario"
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

              {prontuarioMotivoInternacaoPsList && prontuarioMotivoInternacaoPsList.length > 0 ? (
                <Table responsive aria-describedby="prontuario-motivo-internacao-ps-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idProntuario')}>
                        <Translate contentKey="generadorApp.prontuarioMotivoInternacaoPs.idProntuario">Id Prontuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idPaciente')}>
                        <Translate contentKey="generadorApp.prontuarioMotivoInternacaoPs.idPaciente">Id Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idMotivo')}>
                        <Translate contentKey="generadorApp.prontuarioMotivoInternacaoPs.idMotivo">Id Motivo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idUsuario')}>
                        <Translate contentKey="generadorApp.prontuarioMotivoInternacaoPs.idUsuario">Id Usuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {prontuarioMotivoInternacaoPsList.map((prontuarioMotivoInternacaoPs, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${prontuarioMotivoInternacaoPs.id}`} color="link" size="sm">
                            {prontuarioMotivoInternacaoPs.id}
                          </Button>
                        </td>

                        <td>{prontuarioMotivoInternacaoPs.idProntuario}</td>

                        <td>{prontuarioMotivoInternacaoPs.idPaciente}</td>

                        <td>{prontuarioMotivoInternacaoPs.idMotivo}</td>

                        <td>{prontuarioMotivoInternacaoPs.idUsuario}</td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${prontuarioMotivoInternacaoPs.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${prontuarioMotivoInternacaoPs.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${prontuarioMotivoInternacaoPs.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.prontuarioMotivoInternacaoPs.home.notFound">
                    No Prontuario Motivo Internacao Ps found
                  </Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={prontuarioMotivoInternacaoPsList && prontuarioMotivoInternacaoPsList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ prontuarioMotivoInternacaoPs, ...storeState }: IRootState) => ({
  prontuarioMotivoInternacaoPsList: prontuarioMotivoInternacaoPs.entities,
  totalItems: prontuarioMotivoInternacaoPs.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProntuarioMotivoInternacaoPs);
