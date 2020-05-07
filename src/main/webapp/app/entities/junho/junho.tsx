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
import { getJunhoState, IJunhoBaseState, getEntities } from './junho.reducer';
import { IJunho } from 'app/shared/model/junho.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IJunhoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IJunhoState extends IJunhoBaseState, IPaginationBaseState {}

export class Junho extends React.Component<IJunhoProps, IJunhoState> {
  private myFormRef: any;

  constructor(props: IJunhoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getJunhoState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idFranquia: '',
        idPaciente: '',
        nroPad: '',
        dataInicio: '',
        dataFim: '',
        idEspecialidade: '',
        idPeriodicidade: '',
        idPeriodo: '',
        qtdSessoes: ''
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
      'idFranquia=' +
      this.state.idFranquia +
      '&' +
      'idPaciente=' +
      this.state.idPaciente +
      '&' +
      'nroPad=' +
      this.state.nroPad +
      '&' +
      'dataInicio=' +
      this.state.dataInicio +
      '&' +
      'dataFim=' +
      this.state.dataFim +
      '&' +
      'idEspecialidade=' +
      this.state.idEspecialidade +
      '&' +
      'idPeriodicidade=' +
      this.state.idPeriodicidade +
      '&' +
      'idPeriodo=' +
      this.state.idPeriodo +
      '&' +
      'qtdSessoes=' +
      this.state.qtdSessoes +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      idFranquia,
      idPaciente,
      nroPad,
      dataInicio,
      dataFim,
      idEspecialidade,
      idPeriodicidade,
      idPeriodo,
      qtdSessoes,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      idFranquia,
      idPaciente,
      nroPad,
      dataInicio,
      dataFim,
      idEspecialidade,
      idPeriodicidade,
      idPeriodo,
      qtdSessoes,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { junhoList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Junhos</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Junhos</span>
              <Button id="togglerFilterJunho" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link
                to={`${match.url}/new?${this.getFiltersURL()}`}
                className="btn btn-primary float-right jh-create-entity"
                id="jh-create-entity"
              >
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.junho.home.createLabel">Create a new Junho</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterJunho">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idFranquia' ? (
                        <Col md="3">
                          <Row>
                            <Label id="idFranquiaLabel" for="junho-idFranquia">
                              <Translate contentKey="generadorApp.junho.idFranquia">Id Franquia</Translate>
                            </Label>
                            <AvInput type="string" name="idFranquia" id="junho-idFranquia" value={this.state.idFranquia} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idPaciente' ? (
                        <Col md="3">
                          <Row>
                            <Label id="idPacienteLabel" for="junho-idPaciente">
                              <Translate contentKey="generadorApp.junho.idPaciente">Id Paciente</Translate>
                            </Label>
                            <AvInput type="string" name="idPaciente" id="junho-idPaciente" value={this.state.idPaciente} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'nroPad' ? (
                        <Col md="3">
                          <Row>
                            <Label id="nroPadLabel" for="junho-nroPad">
                              <Translate contentKey="generadorApp.junho.nroPad">Nro Pad</Translate>
                            </Label>

                            <AvInput type="text" name="nroPad" id="junho-nroPad" value={this.state.nroPad} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dataInicio' ? (
                        <Col md="3">
                          <Row>
                            <Label id="dataInicioLabel" for="junho-dataInicio">
                              <Translate contentKey="generadorApp.junho.dataInicio">Data Inicio</Translate>
                            </Label>

                            <AvInput type="text" name="dataInicio" id="junho-dataInicio" value={this.state.dataInicio} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dataFim' ? (
                        <Col md="3">
                          <Row>
                            <Label id="dataFimLabel" for="junho-dataFim">
                              <Translate contentKey="generadorApp.junho.dataFim">Data Fim</Translate>
                            </Label>

                            <AvInput type="text" name="dataFim" id="junho-dataFim" value={this.state.dataFim} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idEspecialidade' ? (
                        <Col md="3">
                          <Row>
                            <Label id="idEspecialidadeLabel" for="junho-idEspecialidade">
                              <Translate contentKey="generadorApp.junho.idEspecialidade">Id Especialidade</Translate>
                            </Label>
                            <AvInput type="string" name="idEspecialidade" id="junho-idEspecialidade" value={this.state.idEspecialidade} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idPeriodicidade' ? (
                        <Col md="3">
                          <Row>
                            <Label id="idPeriodicidadeLabel" for="junho-idPeriodicidade">
                              <Translate contentKey="generadorApp.junho.idPeriodicidade">Id Periodicidade</Translate>
                            </Label>
                            <AvInput type="string" name="idPeriodicidade" id="junho-idPeriodicidade" value={this.state.idPeriodicidade} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idPeriodo' ? (
                        <Col md="3">
                          <Row>
                            <Label id="idPeriodoLabel" for="junho-idPeriodo">
                              <Translate contentKey="generadorApp.junho.idPeriodo">Id Periodo</Translate>
                            </Label>
                            <AvInput type="string" name="idPeriodo" id="junho-idPeriodo" value={this.state.idPeriodo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'qtdSessoes' ? (
                        <Col md="3">
                          <Row>
                            <Label id="qtdSessoesLabel" for="junho-qtdSessoes">
                              <Translate contentKey="generadorApp.junho.qtdSessoes">Qtd Sessoes</Translate>
                            </Label>
                            <AvInput type="string" name="qtdSessoes" id="junho-qtdSessoes" value={this.state.qtdSessoes} />
                          </Row>
                        </Col>
                      ) : null}
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

              {junhoList && junhoList.length > 0 ? (
                <Table responsive aria-describedby="junho-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'idFranquia' ? (
                        <th className="hand" onClick={this.sort('idFranquia')}>
                          <Translate contentKey="generadorApp.junho.idFranquia">Id Franquia</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idPaciente' ? (
                        <th className="hand" onClick={this.sort('idPaciente')}>
                          <Translate contentKey="generadorApp.junho.idPaciente">Id Paciente</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'nroPad' ? (
                        <th className="hand" onClick={this.sort('nroPad')}>
                          <Translate contentKey="generadorApp.junho.nroPad">Nro Pad</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'dataInicio' ? (
                        <th className="hand" onClick={this.sort('dataInicio')}>
                          <Translate contentKey="generadorApp.junho.dataInicio">Data Inicio</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'dataFim' ? (
                        <th className="hand" onClick={this.sort('dataFim')}>
                          <Translate contentKey="generadorApp.junho.dataFim">Data Fim</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idEspecialidade' ? (
                        <th className="hand" onClick={this.sort('idEspecialidade')}>
                          <Translate contentKey="generadorApp.junho.idEspecialidade">Id Especialidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idPeriodicidade' ? (
                        <th className="hand" onClick={this.sort('idPeriodicidade')}>
                          <Translate contentKey="generadorApp.junho.idPeriodicidade">Id Periodicidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idPeriodo' ? (
                        <th className="hand" onClick={this.sort('idPeriodo')}>
                          <Translate contentKey="generadorApp.junho.idPeriodo">Id Periodo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'qtdSessoes' ? (
                        <th className="hand" onClick={this.sort('qtdSessoes')}>
                          <Translate contentKey="generadorApp.junho.qtdSessoes">Qtd Sessoes</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {junhoList.map((junho, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${junho.id}`} color="link" size="sm">
                            {junho.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'idFranquia' ? <td>{junho.idFranquia}</td> : null}

                        {this.state.baseFilters !== 'idPaciente' ? <td>{junho.idPaciente}</td> : null}

                        {this.state.baseFilters !== 'nroPad' ? <td>{junho.nroPad}</td> : null}

                        {this.state.baseFilters !== 'dataInicio' ? <td>{junho.dataInicio}</td> : null}

                        {this.state.baseFilters !== 'dataFim' ? <td>{junho.dataFim}</td> : null}

                        {this.state.baseFilters !== 'idEspecialidade' ? <td>{junho.idEspecialidade}</td> : null}

                        {this.state.baseFilters !== 'idPeriodicidade' ? <td>{junho.idPeriodicidade}</td> : null}

                        {this.state.baseFilters !== 'idPeriodo' ? <td>{junho.idPeriodo}</td> : null}

                        {this.state.baseFilters !== 'qtdSessoes' ? <td>{junho.qtdSessoes}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${junho.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${junho.id}/edit?${this.getFiltersURL()}`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${junho.id}/delete?${this.getFiltersURL()}`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.junho.home.notFound">No Junhos found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={junhoList && junhoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ junho, ...storeState }: IRootState) => ({
  junhoList: junho.entities,
  totalItems: junho.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Junho);
