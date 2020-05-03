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
import { getEntities } from './paciente-prontuario.reducer';
import { IPacienteProntuario } from 'app/shared/model/paciente-prontuario.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPacienteProntuarioProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPacienteProntuarioBaseState {
  idPaciente: any;
  idTipoProntuario: any;
  oQue: any;
  resultado: any;
  ativo: any;
  idUsuario: any;
  idEspecialidade: any;
  dataConsulta: any;
  idExame: any;
  idTipoExame: any;
  dataExame: any;
  dataInternacao: any;
  dataAlta: any;
  dataPs: any;
  dataOcorrencia: any;
  idOcorrenciaProntuario: any;
  dataPost: any;
  dataManifestacao: any;
}
export interface IPacienteProntuarioState extends IPacienteProntuarioBaseState, IPaginationBaseState {}

export class PacienteProntuario extends React.Component<IPacienteProntuarioProps, IPacienteProntuarioState> {
  private myFormRef: any;

  constructor(props: IPacienteProntuarioProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getPacienteProntuarioState(this.props.location)
    };
  }

  getPacienteProntuarioState = (location): IPacienteProntuarioBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const idPaciente = url.searchParams.get('idPaciente') || '';
    const idTipoProntuario = url.searchParams.get('idTipoProntuario') || '';
    const oQue = url.searchParams.get('oQue') || '';
    const resultado = url.searchParams.get('resultado') || '';
    const ativo = url.searchParams.get('ativo') || '';
    const idUsuario = url.searchParams.get('idUsuario') || '';
    const idEspecialidade = url.searchParams.get('idEspecialidade') || '';
    const dataConsulta = url.searchParams.get('dataConsulta') || '';
    const idExame = url.searchParams.get('idExame') || '';
    const idTipoExame = url.searchParams.get('idTipoExame') || '';
    const dataExame = url.searchParams.get('dataExame') || '';
    const dataInternacao = url.searchParams.get('dataInternacao') || '';
    const dataAlta = url.searchParams.get('dataAlta') || '';
    const dataPs = url.searchParams.get('dataPs') || '';
    const dataOcorrencia = url.searchParams.get('dataOcorrencia') || '';
    const idOcorrenciaProntuario = url.searchParams.get('idOcorrenciaProntuario') || '';
    const dataPost = url.searchParams.get('dataPost') || '';
    const dataManifestacao = url.searchParams.get('dataManifestacao') || '';

    return {
      idPaciente,
      idTipoProntuario,
      oQue,
      resultado,
      ativo,
      idUsuario,
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
      dataPost,
      dataManifestacao
    };
  };

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
        idUsuario: '',
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
        dataPost: '',
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
      'idUsuario=' +
      this.state.idUsuario +
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
      'dataPost=' +
      this.state.dataPost +
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
      idUsuario,
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
      dataPost,
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
      idUsuario,
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
      dataPost,
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
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Prontuarios</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Paciente Prontuarios</span>
              <Button id="togglerFilterPacienteProntuario" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.pacienteProntuario.home.createLabel">Create a new Paciente Prontuario</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPacienteProntuario">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="idPacienteLabel" for="paciente-prontuario-idPaciente">
                            <Translate contentKey="generadorApp.pacienteProntuario.idPaciente">Id Paciente</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="idPaciente"
                            id="paciente-prontuario-idPaciente"
                            value={this.state.idPaciente}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idTipoProntuarioLabel" for="paciente-prontuario-idTipoProntuario">
                            <Translate contentKey="generadorApp.pacienteProntuario.idTipoProntuario">Id Tipo Prontuario</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="idTipoProntuario"
                            id="paciente-prontuario-idTipoProntuario"
                            value={this.state.idTipoProntuario}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="oQueLabel" for="paciente-prontuario-oQue">
                            <Translate contentKey="generadorApp.pacienteProntuario.oQue">O Que</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="oQue"
                            id="paciente-prontuario-oQue"
                            value={this.state.oQue}
                            validate={{
                              maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="resultadoLabel" for="paciente-prontuario-resultado">
                            <Translate contentKey="generadorApp.pacienteProntuario.resultado">Resultado</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="resultado"
                            id="paciente-prontuario-resultado"
                            value={this.state.resultado}
                            validate={{
                              maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="paciente-prontuario-ativo">
                            <Translate contentKey="generadorApp.pacienteProntuario.ativo">Ativo</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="ativo"
                            id="paciente-prontuario-ativo"
                            value={this.state.ativo}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idUsuarioLabel" for="paciente-prontuario-idUsuario">
                            <Translate contentKey="generadorApp.pacienteProntuario.idUsuario">Id Usuario</Translate>
                          </Label>

                          <AvInput type="text" name="idUsuario" id="paciente-prontuario-idUsuario" value={this.state.idUsuario} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
                          <Label id="idExameLabel" for="paciente-prontuario-idExame">
                            <Translate contentKey="generadorApp.pacienteProntuario.idExame">Id Exame</Translate>
                          </Label>
                          <AvInput type="string" name="idExame" id="paciente-prontuario-idExame" value={this.state.idExame} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idTipoExameLabel" for="paciente-prontuario-idTipoExame">
                            <Translate contentKey="generadorApp.pacienteProntuario.idTipoExame">Id Tipo Exame</Translate>
                          </Label>
                          <AvInput type="string" name="idTipoExame" id="paciente-prontuario-idTipoExame" value={this.state.idTipoExame} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataExameLabel" for="paciente-prontuario-dataExame">
                            <Translate contentKey="generadorApp.pacienteProntuario.dataExame">Data Exame</Translate>
                          </Label>
                          <AvInput type="date" name="dataExame" id="paciente-prontuario-dataExame" value={this.state.dataExame} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
                          <Label id="dataAltaLabel" for="paciente-prontuario-dataAlta">
                            <Translate contentKey="generadorApp.pacienteProntuario.dataAlta">Data Alta</Translate>
                          </Label>
                          <AvInput type="date" name="dataAlta" id="paciente-prontuario-dataAlta" value={this.state.dataAlta} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataPsLabel" for="paciente-prontuario-dataPs">
                            <Translate contentKey="generadorApp.pacienteProntuario.dataPs">Data Ps</Translate>
                          </Label>
                          <AvInput type="date" name="dataPs" id="paciente-prontuario-dataPs" value={this.state.dataPs} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
                          <Label id="dataPostLabel" for="paciente-prontuario-dataPost">
                            <Translate contentKey="generadorApp.pacienteProntuario.dataPost">Data Post</Translate>
                          </Label>
                          <AvInput
                            id="paciente-prontuario-dataPost"
                            type="datetime-local"
                            className="form-control"
                            name="dataPost"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.dataPost ? convertDateTimeFromServer(this.state.dataPost) : null}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
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

              {pacienteProntuarioList && pacienteProntuarioList.length > 0 ? (
                <Table responsive aria-describedby="paciente-prontuario-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idPaciente')}>
                        <Translate contentKey="generadorApp.pacienteProntuario.idPaciente">Id Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idTipoProntuario')}>
                        <Translate contentKey="generadorApp.pacienteProntuario.idTipoProntuario">Id Tipo Prontuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('oQue')}>
                        <Translate contentKey="generadorApp.pacienteProntuario.oQue">O Que</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('resultado')}>
                        <Translate contentKey="generadorApp.pacienteProntuario.resultado">Resultado</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.pacienteProntuario.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idUsuario')}>
                        <Translate contentKey="generadorApp.pacienteProntuario.idUsuario">Id Usuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idEspecialidade')}>
                        <Translate contentKey="generadorApp.pacienteProntuario.idEspecialidade">Id Especialidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataConsulta')}>
                        <Translate contentKey="generadorApp.pacienteProntuario.dataConsulta">Data Consulta</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idExame')}>
                        <Translate contentKey="generadorApp.pacienteProntuario.idExame">Id Exame</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idTipoExame')}>
                        <Translate contentKey="generadorApp.pacienteProntuario.idTipoExame">Id Tipo Exame</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataExame')}>
                        <Translate contentKey="generadorApp.pacienteProntuario.dataExame">Data Exame</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataInternacao')}>
                        <Translate contentKey="generadorApp.pacienteProntuario.dataInternacao">Data Internacao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataAlta')}>
                        <Translate contentKey="generadorApp.pacienteProntuario.dataAlta">Data Alta</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataPs')}>
                        <Translate contentKey="generadorApp.pacienteProntuario.dataPs">Data Ps</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataOcorrencia')}>
                        <Translate contentKey="generadorApp.pacienteProntuario.dataOcorrencia">Data Ocorrencia</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idOcorrenciaProntuario')}>
                        <Translate contentKey="generadorApp.pacienteProntuario.idOcorrenciaProntuario">Id Ocorrencia Prontuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataPost')}>
                        <Translate contentKey="generadorApp.pacienteProntuario.dataPost">Data Post</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataManifestacao')}>
                        <Translate contentKey="generadorApp.pacienteProntuario.dataManifestacao">Data Manifestacao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

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

                        <td>{pacienteProntuario.idPaciente}</td>

                        <td>{pacienteProntuario.idTipoProntuario}</td>

                        <td>{pacienteProntuario.oQue}</td>

                        <td>{pacienteProntuario.resultado}</td>

                        <td>{pacienteProntuario.ativo}</td>

                        <td>{pacienteProntuario.idUsuario}</td>

                        <td>{pacienteProntuario.idEspecialidade}</td>

                        <td>
                          <TextFormat type="date" value={pacienteProntuario.dataConsulta} format={APP_DATE_FORMAT} />
                        </td>

                        <td>{pacienteProntuario.idExame}</td>

                        <td>{pacienteProntuario.idTipoExame}</td>

                        <td>
                          <TextFormat type="date" value={pacienteProntuario.dataExame} format={APP_LOCAL_DATE_FORMAT} />
                        </td>

                        <td>
                          <TextFormat type="date" value={pacienteProntuario.dataInternacao} format={APP_LOCAL_DATE_FORMAT} />
                        </td>

                        <td>
                          <TextFormat type="date" value={pacienteProntuario.dataAlta} format={APP_LOCAL_DATE_FORMAT} />
                        </td>

                        <td>
                          <TextFormat type="date" value={pacienteProntuario.dataPs} format={APP_LOCAL_DATE_FORMAT} />
                        </td>

                        <td>
                          <TextFormat type="date" value={pacienteProntuario.dataOcorrencia} format={APP_LOCAL_DATE_FORMAT} />
                        </td>

                        <td>{pacienteProntuario.idOcorrenciaProntuario}</td>

                        <td>
                          <TextFormat type="date" value={pacienteProntuario.dataPost} format={APP_DATE_FORMAT} />
                        </td>

                        <td>
                          <TextFormat type="date" value={pacienteProntuario.dataManifestacao} format={APP_LOCAL_DATE_FORMAT} />
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${pacienteProntuario.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${pacienteProntuario.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${pacienteProntuario.id}/delete`} color="danger" size="sm">
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
