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
import {
  getProntuarioMotivoInternacaoPsState,
  IProntuarioMotivoInternacaoPsBaseState,
  getEntities
} from './prontuario-motivo-internacao-ps.reducer';
import { IProntuarioMotivoInternacaoPs } from 'app/shared/model/prontuario-motivo-internacao-ps.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IProntuarioMotivoInternacaoPsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IProntuarioMotivoInternacaoPsState extends IProntuarioMotivoInternacaoPsBaseState, IPaginationBaseState {}

export class ProntuarioMotivoInternacaoPs extends React.Component<IProntuarioMotivoInternacaoPsProps, IProntuarioMotivoInternacaoPsState> {
  private myFormRef: any;

  constructor(props: IProntuarioMotivoInternacaoPsProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getProntuarioMotivoInternacaoPsState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idProntuario: '',
        idPaciente: '',
        idMotivo: ''
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
      'idProntuario=' +
      this.state.idProntuario +
      '&' +
      'idPaciente=' +
      this.state.idPaciente +
      '&' +
      'idMotivo=' +
      this.state.idMotivo +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idProntuario, idPaciente, idMotivo, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(idProntuario, idPaciente, idMotivo, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { prontuarioMotivoInternacaoPsList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Prontuario Motivo Internacao Ps</span>
          <Button id="togglerFilterProntuarioMotivoInternacaoPs" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.prontuarioMotivoInternacaoPs.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.prontuarioMotivoInternacaoPs.home.createLabel">
              Create a new Prontuario Motivo Internacao Ps
            </Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Prontuario Motivo Internacao Ps</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterProntuarioMotivoInternacaoPs">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idProntuario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'idPaciente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'idMotivo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.prontuarioMotivoInternacaoPs.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.prontuarioMotivoInternacaoPs.home.btn_filter_clean">Clean</Translate>
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
                      {this.state.baseFilters !== 'idProntuario' ? (
                        <th className="hand" onClick={this.sort('idProntuario')}>
                          <Translate contentKey="generadorApp.prontuarioMotivoInternacaoPs.idProntuario">Id Prontuario</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idPaciente' ? (
                        <th className="hand" onClick={this.sort('idPaciente')}>
                          <Translate contentKey="generadorApp.prontuarioMotivoInternacaoPs.idPaciente">Id Paciente</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idMotivo' ? (
                        <th className="hand" onClick={this.sort('idMotivo')}>
                          <Translate contentKey="generadorApp.prontuarioMotivoInternacaoPs.idMotivo">Id Motivo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

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

                        {this.state.baseFilters !== 'idProntuario' ? <td>{prontuarioMotivoInternacaoPs.idProntuario}</td> : null}

                        {this.state.baseFilters !== 'idPaciente' ? <td>{prontuarioMotivoInternacaoPs.idPaciente}</td> : null}

                        {this.state.baseFilters !== 'idMotivo' ? <td>{prontuarioMotivoInternacaoPs.idMotivo}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button
                              tag={Link}
                              to={`${match.url}/${prontuarioMotivoInternacaoPs.id}?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${prontuarioMotivoInternacaoPs.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${prontuarioMotivoInternacaoPs.id}/delete?${this.getFiltersURL()}`}
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
