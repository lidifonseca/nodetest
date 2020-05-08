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
import { getPacienteProntuarioState, IPacienteProntuarioBaseState, getEntities } from './paciente-prontuario.reducer';
import { IPacienteProntuario } from 'app/shared/model/paciente-prontuario.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPacienteProntuarioProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPacienteProntuarioState extends IPacienteProntuarioBaseState, IPaginationBaseState {}

export class PacienteProntuario extends React.Component<IPacienteProntuarioProps, IPacienteProntuarioState> {
  private myFormRef: any;

  constructor(props: IPacienteProntuarioProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getPacienteProntuarioState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idPaciente: '',
        idTipoProntuario: '',
        oQue: '',
        resultado: '',
        ativo: '',
        idEspecialidade: '',
        dataConsulta: '',
        idExame: '',
        idTipoExame: '',
        dataExame: '',
        dataInternacao: '',
        dataAlta: '',
        dataPs: '',
        dataOcorrencia: '',
        idOcorrenciaProntuario: '',
        dataManifestacao: ''
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
      'idTipoProntuario=' +
      this.state.idTipoProntuario +
      '&' +
      'oQue=' +
      this.state.oQue +
      '&' +
      'resultado=' +
      this.state.resultado +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'idEspecialidade=' +
      this.state.idEspecialidade +
      '&' +
      'dataConsulta=' +
      this.state.dataConsulta +
      '&' +
      'idExame=' +
      this.state.idExame +
      '&' +
      'idTipoExame=' +
      this.state.idTipoExame +
      '&' +
      'dataExame=' +
      this.state.dataExame +
      '&' +
      'dataInternacao=' +
      this.state.dataInternacao +
      '&' +
      'dataAlta=' +
      this.state.dataAlta +
      '&' +
      'dataPs=' +
      this.state.dataPs +
      '&' +
      'dataOcorrencia=' +
      this.state.dataOcorrencia +
      '&' +
      'idOcorrenciaProntuario=' +
      this.state.idOcorrenciaProntuario +
      '&' +
      'dataManifestacao=' +
      this.state.dataManifestacao +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      idPaciente,
      idTipoProntuario,
      oQue,
      resultado,
      ativo,
      idEspecialidade,
      dataConsulta,
      idExame,
      idTipoExame,
      dataExame,
      dataInternacao,
      dataAlta,
      dataPs,
      dataOcorrencia,
      idOcorrenciaProntuario,
      dataManifestacao,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      idPaciente,
      idTipoProntuario,
      oQue,
      resultado,
      ativo,
      idEspecialidade,
      dataConsulta,
      idExame,
      idTipoExame,
      dataExame,
      dataInternacao,
      dataAlta,
      dataPs,
      dataOcorrencia,
      idOcorrenciaProntuario,
      dataManifestacao,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { pacienteProntuarioList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Paciente Prontuarios</span>
          <Button id="togglerFilterPacienteProntuario" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.pacienteProntuario.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.pacienteProntuario.home.createLabel">Create a new Paciente Prontuario</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Prontuarios</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPacienteProntuario">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idPaciente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idPacienteLabel" for="paciente-prontuario-idPaciente">
                              <Translate contentKey="generadorApp.pacienteProntuario.idPaciente">Id Paciente</Translate>
                            </Label>

                            <AvInput type="text" name="idPaciente" id="paciente-prontuario-idPaciente" value={this.state.idPaciente} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idTipoProntuario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idTipoProntuarioLabel" for="paciente-prontuario-idTipoProntuario">
                              <Translate contentKey="generadorApp.pacienteProntuario.idTipoProntuario">Id Tipo Prontuario</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idTipoProntuario"
                              id="paciente-prontuario-idTipoProntuario"
                              value={this.state.idTipoProntuario}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'oQue' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="oQueLabel" for="paciente-prontuario-oQue">
                              <Translate contentKey="generadorApp.pacienteProntuario.oQue">O Que</Translate>
                            </Label>
                            <AvInput id="paciente-prontuario-oQue" type="textarea" name="oQue" />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'resultado' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="resultadoLabel" for="paciente-prontuario-resultado">
                              <Translate contentKey="generadorApp.pacienteProntuario.resultado">Resultado</Translate>
                            </Label>
                            <AvInput id="paciente-prontuario-resultado" type="textarea" name="resultado" />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ativo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ativoLabel" for="paciente-prontuario-ativo">
                              <Translate contentKey="generadorApp.pacienteProntuario.ativo">Ativo</Translate>
                            </Label>
                            <AvInput type="string" name="ativo" id="paciente-prontuario-ativo" value={this.state.ativo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idEspecialidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idEspecialidadeLabel" for="paciente-prontuario-idEspecialidade">
                              <Translate contentKey="generadorApp.pacienteProntuario.idEspecialidade">Id Especialidade</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idEspecialidade"
                              id="paciente-prontuario-idEspecialidade"
                              value={this.state.idEspecialidade}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dataConsulta' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="dataConsultaLabel" for="paciente-prontuario-dataConsulta">
                              <Translate contentKey="generadorApp.pacienteProntuario.dataConsulta">Data Consulta</Translate>
                            </Label>
                            <AvInput
                              id="paciente-prontuario-dataConsulta"
                              type="datetime-local"
                              className="form-control"
                              name="dataConsulta"
                              placeholder={'YYYY-MM-DD HH:mm'}
                              value={this.state.dataConsulta ? convertDateTimeFromServer(this.state.dataConsulta) : null}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idExame' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idExameLabel" for="paciente-prontuario-idExame">
                              <Translate contentKey="generadorApp.pacienteProntuario.idExame">Id Exame</Translate>
                            </Label>
                            <AvInput type="string" name="idExame" id="paciente-prontuario-idExame" value={this.state.idExame} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idTipoExame' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idTipoExameLabel" for="paciente-prontuario-idTipoExame">
                              <Translate contentKey="generadorApp.pacienteProntuario.idTipoExame">Id Tipo Exame</Translate>
                            </Label>
                            <AvInput type="string" name="idTipoExame" id="paciente-prontuario-idTipoExame" value={this.state.idTipoExame} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dataExame' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="dataExameLabel" for="paciente-prontuario-dataExame">
                              <Translate contentKey="generadorApp.pacienteProntuario.dataExame">Data Exame</Translate>
                            </Label>
                            <AvInput type="date" name="dataExame" id="paciente-prontuario-dataExame" value={this.state.dataExame} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dataInternacao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="dataInternacaoLabel" for="paciente-prontuario-dataInternacao">
                              <Translate contentKey="generadorApp.pacienteProntuario.dataInternacao">Data Internacao</Translate>
                            </Label>
                            <AvInput
                              type="date"
                              name="dataInternacao"
                              id="paciente-prontuario-dataInternacao"
                              value={this.state.dataInternacao}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dataAlta' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="dataAltaLabel" for="paciente-prontuario-dataAlta">
                              <Translate contentKey="generadorApp.pacienteProntuario.dataAlta">Data Alta</Translate>
                            </Label>
                            <AvInput type="date" name="dataAlta" id="paciente-prontuario-dataAlta" value={this.state.dataAlta} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dataPs' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="dataPsLabel" for="paciente-prontuario-dataPs">
                              <Translate contentKey="generadorApp.pacienteProntuario.dataPs">Data Ps</Translate>
                            </Label>
                            <AvInput type="date" name="dataPs" id="paciente-prontuario-dataPs" value={this.state.dataPs} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dataOcorrencia' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="dataOcorrenciaLabel" for="paciente-prontuario-dataOcorrencia">
                              <Translate contentKey="generadorApp.pacienteProntuario.dataOcorrencia">Data Ocorrencia</Translate>
                            </Label>
                            <AvInput
                              type="date"
                              name="dataOcorrencia"
                              id="paciente-prontuario-dataOcorrencia"
                              value={this.state.dataOcorrencia}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idOcorrenciaProntuario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idOcorrenciaProntuarioLabel" for="paciente-prontuario-idOcorrenciaProntuario">
                              <Translate contentKey="generadorApp.pacienteProntuario.idOcorrenciaProntuario">
                                Id Ocorrencia Prontuario
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idOcorrenciaProntuario"
                              id="paciente-prontuario-idOcorrenciaProntuario"
                              value={this.state.idOcorrenciaProntuario}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dataManifestacao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="dataManifestacaoLabel" for="paciente-prontuario-dataManifestacao">
                              <Translate contentKey="generadorApp.pacienteProntuario.dataManifestacao">Data Manifestacao</Translate>
                            </Label>
                            <AvInput
                              type="date"
                              name="dataManifestacao"
                              id="paciente-prontuario-dataManifestacao"
                              value={this.state.dataManifestacao}
                            />
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.pacienteProntuario.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.pacienteProntuario.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {pacienteProntuarioList && pacienteProntuarioList.length > 0 ? (
                <Table responsive aria-describedby="paciente-prontuario-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'idPaciente' ? (
                        <th className="hand" onClick={this.sort('idPaciente')}>
                          <Translate contentKey="generadorApp.pacienteProntuario.idPaciente">Id Paciente</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idTipoProntuario' ? (
                        <th className="hand" onClick={this.sort('idTipoProntuario')}>
                          <Translate contentKey="generadorApp.pacienteProntuario.idTipoProntuario">Id Tipo Prontuario</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'oQue' ? (
                        <th className="hand" onClick={this.sort('oQue')}>
                          <Translate contentKey="generadorApp.pacienteProntuario.oQue">O Que</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'resultado' ? (
                        <th className="hand" onClick={this.sort('resultado')}>
                          <Translate contentKey="generadorApp.pacienteProntuario.resultado">Resultado</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ativo' ? (
                        <th className="hand" onClick={this.sort('ativo')}>
                          <Translate contentKey="generadorApp.pacienteProntuario.ativo">Ativo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idEspecialidade' ? (
                        <th className="hand" onClick={this.sort('idEspecialidade')}>
                          <Translate contentKey="generadorApp.pacienteProntuario.idEspecialidade">Id Especialidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'dataConsulta' ? (
                        <th className="hand" onClick={this.sort('dataConsulta')}>
                          <Translate contentKey="generadorApp.pacienteProntuario.dataConsulta">Data Consulta</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idExame' ? (
                        <th className="hand" onClick={this.sort('idExame')}>
                          <Translate contentKey="generadorApp.pacienteProntuario.idExame">Id Exame</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idTipoExame' ? (
                        <th className="hand" onClick={this.sort('idTipoExame')}>
                          <Translate contentKey="generadorApp.pacienteProntuario.idTipoExame">Id Tipo Exame</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'dataExame' ? (
                        <th className="hand" onClick={this.sort('dataExame')}>
                          <Translate contentKey="generadorApp.pacienteProntuario.dataExame">Data Exame</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'dataInternacao' ? (
                        <th className="hand" onClick={this.sort('dataInternacao')}>
                          <Translate contentKey="generadorApp.pacienteProntuario.dataInternacao">Data Internacao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'dataAlta' ? (
                        <th className="hand" onClick={this.sort('dataAlta')}>
                          <Translate contentKey="generadorApp.pacienteProntuario.dataAlta">Data Alta</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'dataPs' ? (
                        <th className="hand" onClick={this.sort('dataPs')}>
                          <Translate contentKey="generadorApp.pacienteProntuario.dataPs">Data Ps</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'dataOcorrencia' ? (
                        <th className="hand" onClick={this.sort('dataOcorrencia')}>
                          <Translate contentKey="generadorApp.pacienteProntuario.dataOcorrencia">Data Ocorrencia</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idOcorrenciaProntuario' ? (
                        <th className="hand" onClick={this.sort('idOcorrenciaProntuario')}>
                          <Translate contentKey="generadorApp.pacienteProntuario.idOcorrenciaProntuario">
                            Id Ocorrencia Prontuario
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'dataManifestacao' ? (
                        <th className="hand" onClick={this.sort('dataManifestacao')}>
                          <Translate contentKey="generadorApp.pacienteProntuario.dataManifestacao">Data Manifestacao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {pacienteProntuarioList.map((pacienteProntuario, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${pacienteProntuario.id}`} color="link" size="sm">
                            {pacienteProntuario.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'idPaciente' ? <td>{pacienteProntuario.idPaciente}</td> : null}

                        {this.state.baseFilters !== 'idTipoProntuario' ? <td>{pacienteProntuario.idTipoProntuario}</td> : null}

                        {this.state.baseFilters !== 'oQue' ? (
                          <td>{pacienteProntuario.oQue ? Buffer.from(pacienteProntuario.oQue).toString() : null}</td>
                        ) : null}

                        {this.state.baseFilters !== 'resultado' ? (
                          <td>{pacienteProntuario.resultado ? Buffer.from(pacienteProntuario.resultado).toString() : null}</td>
                        ) : null}

                        {this.state.baseFilters !== 'ativo' ? <td>{pacienteProntuario.ativo}</td> : null}

                        {this.state.baseFilters !== 'idEspecialidade' ? <td>{pacienteProntuario.idEspecialidade}</td> : null}

                        {this.state.baseFilters !== 'dataConsulta' ? (
                          <td>
                            <TextFormat type="date" value={pacienteProntuario.dataConsulta} format={APP_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'idExame' ? <td>{pacienteProntuario.idExame}</td> : null}

                        {this.state.baseFilters !== 'idTipoExame' ? <td>{pacienteProntuario.idTipoExame}</td> : null}

                        {this.state.baseFilters !== 'dataExame' ? (
                          <td>
                            <TextFormat type="date" value={pacienteProntuario.dataExame} format={APP_LOCAL_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'dataInternacao' ? (
                          <td>
                            <TextFormat type="date" value={pacienteProntuario.dataInternacao} format={APP_LOCAL_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'dataAlta' ? (
                          <td>
                            <TextFormat type="date" value={pacienteProntuario.dataAlta} format={APP_LOCAL_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'dataPs' ? (
                          <td>
                            <TextFormat type="date" value={pacienteProntuario.dataPs} format={APP_LOCAL_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'dataOcorrencia' ? (
                          <td>
                            <TextFormat type="date" value={pacienteProntuario.dataOcorrencia} format={APP_LOCAL_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'idOcorrenciaProntuario' ? <td>{pacienteProntuario.idOcorrenciaProntuario}</td> : null}

                        {this.state.baseFilters !== 'dataManifestacao' ? (
                          <td>
                            <TextFormat type="date" value={pacienteProntuario.dataManifestacao} format={APP_LOCAL_DATE_FORMAT} />
                          </td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${pacienteProntuario.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${pacienteProntuario.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${pacienteProntuario.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.pacienteProntuario.home.notFound">No Paciente Prontuarios found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={pacienteProntuarioList && pacienteProntuarioList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ pacienteProntuario, ...storeState }: IRootState) => ({
  pacienteProntuarioList: pacienteProntuario.entities,
  totalItems: pacienteProntuario.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteProntuario);
