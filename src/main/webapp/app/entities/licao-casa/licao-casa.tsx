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
import { getLicaoCasaState, ILicaoCasaBaseState, getEntities } from './licao-casa.reducer';
import { ILicaoCasa } from 'app/shared/model/licao-casa.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ILicaoCasaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ILicaoCasaState extends ILicaoCasaBaseState, IPaginationBaseState {}

export class LicaoCasa extends React.Component<ILicaoCasaProps, ILicaoCasaState> {
  private myFormRef: any;

  constructor(props: ILicaoCasaProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getLicaoCasaState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        atendimentoId: '',
        pacienteId: '',
        profissionalId: '',
        atividade: '',
        horaInicio: '',
        repeticaoHoras: '',
        qtdDias: '',
        intervaloDias: '',
        criadoEm: '',
        concluidaEm: '',
        ativo: '',
        ativ: '',
        forma: '',
        enviarPara: '',
        notificarFamiliar: '',
        replicarAtividade: ''
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
      'atendimentoId=' +
      this.state.atendimentoId +
      '&' +
      'pacienteId=' +
      this.state.pacienteId +
      '&' +
      'profissionalId=' +
      this.state.profissionalId +
      '&' +
      'atividade=' +
      this.state.atividade +
      '&' +
      'horaInicio=' +
      this.state.horaInicio +
      '&' +
      'repeticaoHoras=' +
      this.state.repeticaoHoras +
      '&' +
      'qtdDias=' +
      this.state.qtdDias +
      '&' +
      'intervaloDias=' +
      this.state.intervaloDias +
      '&' +
      'criadoEm=' +
      this.state.criadoEm +
      '&' +
      'concluidaEm=' +
      this.state.concluidaEm +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'ativ=' +
      this.state.ativ +
      '&' +
      'forma=' +
      this.state.forma +
      '&' +
      'enviarPara=' +
      this.state.enviarPara +
      '&' +
      'notificarFamiliar=' +
      this.state.notificarFamiliar +
      '&' +
      'replicarAtividade=' +
      this.state.replicarAtividade +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      atendimentoId,
      pacienteId,
      profissionalId,
      atividade,
      horaInicio,
      repeticaoHoras,
      qtdDias,
      intervaloDias,
      criadoEm,
      concluidaEm,
      ativo,
      ativ,
      forma,
      enviarPara,
      notificarFamiliar,
      replicarAtividade,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      atendimentoId,
      pacienteId,
      profissionalId,
      atividade,
      horaInicio,
      repeticaoHoras,
      qtdDias,
      intervaloDias,
      criadoEm,
      concluidaEm,
      ativo,
      ativ,
      forma,
      enviarPara,
      notificarFamiliar,
      replicarAtividade,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { licaoCasaList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Licao Casas</span>
          <Button id="togglerFilterLicaoCasa" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.licaoCasa.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.licaoCasa.home.createLabel">Create a new Licao Casa</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Licao Casas</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterLicaoCasa">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'atendimentoId' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="atendimentoIdLabel" for="licao-casa-atendimentoId">
                              <Translate contentKey="generadorApp.licaoCasa.atendimentoId">Atendimento Id</Translate>
                            </Label>
                            <AvInput type="string" name="atendimentoId" id="licao-casa-atendimentoId" value={this.state.atendimentoId} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'pacienteId' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="pacienteIdLabel" for="licao-casa-pacienteId">
                              <Translate contentKey="generadorApp.licaoCasa.pacienteId">Paciente Id</Translate>
                            </Label>
                            <AvInput type="string" name="pacienteId" id="licao-casa-pacienteId" value={this.state.pacienteId} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'profissionalId' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="profissionalIdLabel" for="licao-casa-profissionalId">
                              <Translate contentKey="generadorApp.licaoCasa.profissionalId">Profissional Id</Translate>
                            </Label>
                            <AvInput type="string" name="profissionalId" id="licao-casa-profissionalId" value={this.state.profissionalId} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'atividade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="atividadeLabel" for="licao-casa-atividade">
                              <Translate contentKey="generadorApp.licaoCasa.atividade">Atividade</Translate>
                            </Label>

                            <AvInput type="text" name="atividade" id="licao-casa-atividade" value={this.state.atividade} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'horaInicio' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="horaInicioLabel" for="licao-casa-horaInicio">
                              <Translate contentKey="generadorApp.licaoCasa.horaInicio">Hora Inicio</Translate>
                            </Label>
                            <AvInput
                              id="licao-casa-horaInicio"
                              type="datetime-local"
                              className="form-control"
                              name="horaInicio"
                              placeholder={'YYYY-MM-DD HH:mm'}
                              value={this.state.horaInicio ? convertDateTimeFromServer(this.state.horaInicio) : null}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'repeticaoHoras' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="repeticaoHorasLabel" check>
                              <AvInput id="licao-casa-repeticaoHoras" type="checkbox" className="form-control" name="repeticaoHoras" />
                              <Translate contentKey="generadorApp.licaoCasa.repeticaoHoras">Repeticao Horas</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'qtdDias' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="qtdDiasLabel" check>
                              <AvInput id="licao-casa-qtdDias" type="checkbox" className="form-control" name="qtdDias" />
                              <Translate contentKey="generadorApp.licaoCasa.qtdDias">Qtd Dias</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'intervaloDias' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="intervaloDiasLabel" check>
                              <AvInput id="licao-casa-intervaloDias" type="checkbox" className="form-control" name="intervaloDias" />
                              <Translate contentKey="generadorApp.licaoCasa.intervaloDias">Intervalo Dias</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'criadoEm' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="criadoEmLabel" for="licao-casa-criadoEm">
                              <Translate contentKey="generadorApp.licaoCasa.criadoEm">Criado Em</Translate>
                            </Label>
                            <AvInput
                              id="licao-casa-criadoEm"
                              type="datetime-local"
                              className="form-control"
                              name="criadoEm"
                              placeholder={'YYYY-MM-DD HH:mm'}
                              value={this.state.criadoEm ? convertDateTimeFromServer(this.state.criadoEm) : null}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'concluidaEm' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="concluidaEmLabel" for="licao-casa-concluidaEm">
                              <Translate contentKey="generadorApp.licaoCasa.concluidaEm">Concluida Em</Translate>
                            </Label>
                            <AvInput
                              id="licao-casa-concluidaEm"
                              type="datetime-local"
                              className="form-control"
                              name="concluidaEm"
                              placeholder={'YYYY-MM-DD HH:mm'}
                              value={this.state.concluidaEm ? convertDateTimeFromServer(this.state.concluidaEm) : null}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ativo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ativoLabel" check>
                              <AvInput id="licao-casa-ativo" type="checkbox" className="form-control" name="ativo" />
                              <Translate contentKey="generadorApp.licaoCasa.ativo">Ativo</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ativ' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ativLabel" for="licao-casa-ativ">
                              <Translate contentKey="generadorApp.licaoCasa.ativ">Ativ</Translate>
                            </Label>
                            <AvInput type="string" name="ativ" id="licao-casa-ativ" value={this.state.ativ} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'forma' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="formaLabel" for="licao-casa-forma">
                              <Translate contentKey="generadorApp.licaoCasa.forma">Forma</Translate>
                            </Label>

                            <AvInput type="text" name="forma" id="licao-casa-forma" value={this.state.forma} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'enviarPara' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="enviarParaLabel" for="licao-casa-enviarPara">
                              <Translate contentKey="generadorApp.licaoCasa.enviarPara">Enviar Para</Translate>
                            </Label>

                            <AvInput type="text" name="enviarPara" id="licao-casa-enviarPara" value={this.state.enviarPara} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'notificarFamiliar' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="notificarFamiliarLabel" for="licao-casa-notificarFamiliar">
                              <Translate contentKey="generadorApp.licaoCasa.notificarFamiliar">Notificar Familiar</Translate>
                            </Label>

                            <AvInput
                              type="text"
                              name="notificarFamiliar"
                              id="licao-casa-notificarFamiliar"
                              value={this.state.notificarFamiliar}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'replicarAtividade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="replicarAtividadeLabel" for="licao-casa-replicarAtividade">
                              <Translate contentKey="generadorApp.licaoCasa.replicarAtividade">Replicar Atividade</Translate>
                            </Label>

                            <AvInput
                              type="text"
                              name="replicarAtividade"
                              id="licao-casa-replicarAtividade"
                              value={this.state.replicarAtividade}
                            />
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.licaoCasa.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.licaoCasa.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {licaoCasaList && licaoCasaList.length > 0 ? (
                <Table responsive aria-describedby="licao-casa-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'atendimentoId' ? (
                        <th className="hand" onClick={this.sort('atendimentoId')}>
                          <Translate contentKey="generadorApp.licaoCasa.atendimentoId">Atendimento Id</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'pacienteId' ? (
                        <th className="hand" onClick={this.sort('pacienteId')}>
                          <Translate contentKey="generadorApp.licaoCasa.pacienteId">Paciente Id</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'profissionalId' ? (
                        <th className="hand" onClick={this.sort('profissionalId')}>
                          <Translate contentKey="generadorApp.licaoCasa.profissionalId">Profissional Id</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'atividade' ? (
                        <th className="hand" onClick={this.sort('atividade')}>
                          <Translate contentKey="generadorApp.licaoCasa.atividade">Atividade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'horaInicio' ? (
                        <th className="hand" onClick={this.sort('horaInicio')}>
                          <Translate contentKey="generadorApp.licaoCasa.horaInicio">Hora Inicio</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'repeticaoHoras' ? (
                        <th className="hand" onClick={this.sort('repeticaoHoras')}>
                          <Translate contentKey="generadorApp.licaoCasa.repeticaoHoras">Repeticao Horas</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'qtdDias' ? (
                        <th className="hand" onClick={this.sort('qtdDias')}>
                          <Translate contentKey="generadorApp.licaoCasa.qtdDias">Qtd Dias</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'intervaloDias' ? (
                        <th className="hand" onClick={this.sort('intervaloDias')}>
                          <Translate contentKey="generadorApp.licaoCasa.intervaloDias">Intervalo Dias</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'criadoEm' ? (
                        <th className="hand" onClick={this.sort('criadoEm')}>
                          <Translate contentKey="generadorApp.licaoCasa.criadoEm">Criado Em</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'concluidaEm' ? (
                        <th className="hand" onClick={this.sort('concluidaEm')}>
                          <Translate contentKey="generadorApp.licaoCasa.concluidaEm">Concluida Em</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ativo' ? (
                        <th className="hand" onClick={this.sort('ativo')}>
                          <Translate contentKey="generadorApp.licaoCasa.ativo">Ativo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ativ' ? (
                        <th className="hand" onClick={this.sort('ativ')}>
                          <Translate contentKey="generadorApp.licaoCasa.ativ">Ativ</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'forma' ? (
                        <th className="hand" onClick={this.sort('forma')}>
                          <Translate contentKey="generadorApp.licaoCasa.forma">Forma</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'enviarPara' ? (
                        <th className="hand" onClick={this.sort('enviarPara')}>
                          <Translate contentKey="generadorApp.licaoCasa.enviarPara">Enviar Para</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'notificarFamiliar' ? (
                        <th className="hand" onClick={this.sort('notificarFamiliar')}>
                          <Translate contentKey="generadorApp.licaoCasa.notificarFamiliar">Notificar Familiar</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'replicarAtividade' ? (
                        <th className="hand" onClick={this.sort('replicarAtividade')}>
                          <Translate contentKey="generadorApp.licaoCasa.replicarAtividade">Replicar Atividade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {licaoCasaList.map((licaoCasa, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${licaoCasa.id}`} color="link" size="sm">
                            {licaoCasa.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'atendimentoId' ? <td>{licaoCasa.atendimentoId}</td> : null}

                        {this.state.baseFilters !== 'pacienteId' ? <td>{licaoCasa.pacienteId}</td> : null}

                        {this.state.baseFilters !== 'profissionalId' ? <td>{licaoCasa.profissionalId}</td> : null}

                        {this.state.baseFilters !== 'atividade' ? <td>{licaoCasa.atividade}</td> : null}

                        {this.state.baseFilters !== 'horaInicio' ? (
                          <td>
                            <TextFormat type="date" value={licaoCasa.horaInicio} format={APP_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'repeticaoHoras' ? <td>{licaoCasa.repeticaoHoras ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'qtdDias' ? <td>{licaoCasa.qtdDias ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'intervaloDias' ? <td>{licaoCasa.intervaloDias ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'criadoEm' ? (
                          <td>
                            <TextFormat type="date" value={licaoCasa.criadoEm} format={APP_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'concluidaEm' ? (
                          <td>
                            <TextFormat type="date" value={licaoCasa.concluidaEm} format={APP_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'ativo' ? <td>{licaoCasa.ativo ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'ativ' ? <td>{licaoCasa.ativ}</td> : null}

                        {this.state.baseFilters !== 'forma' ? <td>{licaoCasa.forma}</td> : null}

                        {this.state.baseFilters !== 'enviarPara' ? <td>{licaoCasa.enviarPara}</td> : null}

                        {this.state.baseFilters !== 'notificarFamiliar' ? <td>{licaoCasa.notificarFamiliar}</td> : null}

                        {this.state.baseFilters !== 'replicarAtividade' ? <td>{licaoCasa.replicarAtividade}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${licaoCasa.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${licaoCasa.id}/edit?${this.getFiltersURL()}`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${licaoCasa.id}/delete?${this.getFiltersURL()}`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.licaoCasa.home.notFound">No Licao Casas found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={licaoCasaList && licaoCasaList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ licaoCasa, ...storeState }: IRootState) => ({
  licaoCasaList: licaoCasa.entities,
  totalItems: licaoCasa.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LicaoCasa);
