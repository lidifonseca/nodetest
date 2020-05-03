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
import { getEntities } from './maio.reducer';
import { IMaio } from 'app/shared/model/maio.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IMaioProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IMaioBaseState {
  idFranquia: any;
  idPaciente: any;
  nroPad: any;
  dataInicio: any;
  dataFim: any;
  idEspecialidade: any;
  idPeriodicidade: any;
  idPeriodo: any;
  qtdSessoes: any;
}
export interface IMaioState extends IMaioBaseState, IPaginationBaseState {}

export class Maio extends React.Component<IMaioProps, IMaioState> {
  private myFormRef: any;

  constructor(props: IMaioProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getMaioState(this.props.location)
    };
  }

  getMaioState = (location): IMaioBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const idFranquia = url.searchParams.get('idFranquia') || '';
    const idPaciente = url.searchParams.get('idPaciente') || '';
    const nroPad = url.searchParams.get('nroPad') || '';
    const dataInicio = url.searchParams.get('dataInicio') || '';
    const dataFim = url.searchParams.get('dataFim') || '';
    const idEspecialidade = url.searchParams.get('idEspecialidade') || '';
    const idPeriodicidade = url.searchParams.get('idPeriodicidade') || '';
    const idPeriodo = url.searchParams.get('idPeriodo') || '';
    const qtdSessoes = url.searchParams.get('qtdSessoes') || '';

    return {
      idFranquia,
      idPaciente,
      nroPad,
      dataInicio,
      dataFim,
      idEspecialidade,
      idPeriodicidade,
      idPeriodo,
      qtdSessoes
    };
  };

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
    const { maioList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Maios</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Maios</span>
              <Button id="togglerFilterMaio" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.maio.home.createLabel">Create a new Maio</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterMaio">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="idFranquiaLabel" for="maio-idFranquia">
                            <Translate contentKey="generadorApp.maio.idFranquia">Id Franquia</Translate>
                          </Label>
                          <AvInput type="string" name="idFranquia" id="maio-idFranquia" value={this.state.idFranquia} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idPacienteLabel" for="maio-idPaciente">
                            <Translate contentKey="generadorApp.maio.idPaciente">Id Paciente</Translate>
                          </Label>
                          <AvInput type="string" name="idPaciente" id="maio-idPaciente" value={this.state.idPaciente} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="nroPadLabel" for="maio-nroPad">
                            <Translate contentKey="generadorApp.maio.nroPad">Nro Pad</Translate>
                          </Label>
                          <AvInput type="string" name="nroPad" id="maio-nroPad" value={this.state.nroPad} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataInicioLabel" for="maio-dataInicio">
                            <Translate contentKey="generadorApp.maio.dataInicio">Data Inicio</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="dataInicio"
                            id="maio-dataInicio"
                            value={this.state.dataInicio}
                            validate={{
                              maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataFimLabel" for="maio-dataFim">
                            <Translate contentKey="generadorApp.maio.dataFim">Data Fim</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="dataFim"
                            id="maio-dataFim"
                            value={this.state.dataFim}
                            validate={{
                              maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idEspecialidadeLabel" for="maio-idEspecialidade">
                            <Translate contentKey="generadorApp.maio.idEspecialidade">Id Especialidade</Translate>
                          </Label>
                          <AvInput type="string" name="idEspecialidade" id="maio-idEspecialidade" value={this.state.idEspecialidade} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idPeriodicidadeLabel" for="maio-idPeriodicidade">
                            <Translate contentKey="generadorApp.maio.idPeriodicidade">Id Periodicidade</Translate>
                          </Label>
                          <AvInput type="string" name="idPeriodicidade" id="maio-idPeriodicidade" value={this.state.idPeriodicidade} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idPeriodoLabel" for="maio-idPeriodo">
                            <Translate contentKey="generadorApp.maio.idPeriodo">Id Periodo</Translate>
                          </Label>
                          <AvInput type="string" name="idPeriodo" id="maio-idPeriodo" value={this.state.idPeriodo} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="qtdSessoesLabel" for="maio-qtdSessoes">
                            <Translate contentKey="generadorApp.maio.qtdSessoes">Qtd Sessoes</Translate>
                          </Label>
                          <AvInput type="string" name="qtdSessoes" id="maio-qtdSessoes" value={this.state.qtdSessoes} />
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

              {maioList && maioList.length > 0 ? (
                <Table responsive aria-describedby="maio-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idFranquia')}>
                        <Translate contentKey="generadorApp.maio.idFranquia">Id Franquia</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idPaciente')}>
                        <Translate contentKey="generadorApp.maio.idPaciente">Id Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('nroPad')}>
                        <Translate contentKey="generadorApp.maio.nroPad">Nro Pad</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataInicio')}>
                        <Translate contentKey="generadorApp.maio.dataInicio">Data Inicio</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataFim')}>
                        <Translate contentKey="generadorApp.maio.dataFim">Data Fim</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idEspecialidade')}>
                        <Translate contentKey="generadorApp.maio.idEspecialidade">Id Especialidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idPeriodicidade')}>
                        <Translate contentKey="generadorApp.maio.idPeriodicidade">Id Periodicidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idPeriodo')}>
                        <Translate contentKey="generadorApp.maio.idPeriodo">Id Periodo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('qtdSessoes')}>
                        <Translate contentKey="generadorApp.maio.qtdSessoes">Qtd Sessoes</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {maioList.map((maio, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${maio.id}`} color="link" size="sm">
                            {maio.id}
                          </Button>
                        </td>

                        <td>{maio.idFranquia}</td>

                        <td>{maio.idPaciente}</td>

                        <td>{maio.nroPad}</td>

                        <td>{maio.dataInicio}</td>

                        <td>{maio.dataFim}</td>

                        <td>{maio.idEspecialidade}</td>

                        <td>{maio.idPeriodicidade}</td>

                        <td>{maio.idPeriodo}</td>

                        <td>{maio.qtdSessoes}</td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${maio.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${maio.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${maio.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.maio.home.notFound">No Maios found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={maioList && maioList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ maio, ...storeState }: IRootState) => ({
  maioList: maio.entities,
  totalItems: maio.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Maio);
