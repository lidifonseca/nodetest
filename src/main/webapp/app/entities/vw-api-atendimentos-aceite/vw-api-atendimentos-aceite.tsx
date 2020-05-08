/* eslint complexity: ["error", 300] */
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
import { getVwApiAtendimentosAceiteState, IVwApiAtendimentosAceiteBaseState, getEntities } from './vw-api-atendimentos-aceite.reducer';
import { IVwApiAtendimentosAceite } from 'app/shared/model/vw-api-atendimentos-aceite.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IVwApiAtendimentosAceiteProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IVwApiAtendimentosAceiteState extends IVwApiAtendimentosAceiteBaseState, IPaginationBaseState {}

export class VwApiAtendimentosAceite extends React.Component<IVwApiAtendimentosAceiteProps, IVwApiAtendimentosAceiteState> {
  private myFormRef: any;

  constructor(props: IVwApiAtendimentosAceiteProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getVwApiAtendimentosAceiteState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idPadItem: '',
        idPaciente: '',
        idPeriodo: '',
        idPeriodicidade: '',
        idProfissional: '',
        aceito: '',
        bairro: '',
        cep: '',
        cidade: '',
        complemento: '',
        endereco: '',
        especialidade: '',
        latitude: '',
        longitude: '',
        numero: '',
        paciente: '',
        periodo: '',
        periodicidade: '',
        qtdSessoes: '',
        uf: '',
        valor: ''
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
      'idPadItem=' +
      this.state.idPadItem +
      '&' +
      'idPaciente=' +
      this.state.idPaciente +
      '&' +
      'idPeriodo=' +
      this.state.idPeriodo +
      '&' +
      'idPeriodicidade=' +
      this.state.idPeriodicidade +
      '&' +
      'idProfissional=' +
      this.state.idProfissional +
      '&' +
      'aceito=' +
      this.state.aceito +
      '&' +
      'bairro=' +
      this.state.bairro +
      '&' +
      'cep=' +
      this.state.cep +
      '&' +
      'cidade=' +
      this.state.cidade +
      '&' +
      'complemento=' +
      this.state.complemento +
      '&' +
      'endereco=' +
      this.state.endereco +
      '&' +
      'especialidade=' +
      this.state.especialidade +
      '&' +
      'latitude=' +
      this.state.latitude +
      '&' +
      'longitude=' +
      this.state.longitude +
      '&' +
      'numero=' +
      this.state.numero +
      '&' +
      'paciente=' +
      this.state.paciente +
      '&' +
      'periodo=' +
      this.state.periodo +
      '&' +
      'periodicidade=' +
      this.state.periodicidade +
      '&' +
      'qtdSessoes=' +
      this.state.qtdSessoes +
      '&' +
      'uf=' +
      this.state.uf +
      '&' +
      'valor=' +
      this.state.valor +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      idPadItem,
      idPaciente,
      idPeriodo,
      idPeriodicidade,
      idProfissional,
      aceito,
      bairro,
      cep,
      cidade,
      complemento,
      endereco,
      especialidade,
      latitude,
      longitude,
      numero,
      paciente,
      periodo,
      periodicidade,
      qtdSessoes,
      uf,
      valor,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      idPadItem,
      idPaciente,
      idPeriodo,
      idPeriodicidade,
      idProfissional,
      aceito,
      bairro,
      cep,
      cidade,
      complemento,
      endereco,
      especialidade,
      latitude,
      longitude,
      numero,
      paciente,
      periodo,
      periodicidade,
      qtdSessoes,
      uf,
      valor,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { vwApiAtendimentosAceiteList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Vw Api Atendimentos Aceites</span>
          <Button id="togglerFilterVwApiAtendimentosAceite" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.vwApiAtendimentosAceite.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.vwApiAtendimentosAceite.home.createLabel">
              Create a new Vw Api Atendimentos Aceite
            </Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Vw Api Atendimentos Aceites</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterVwApiAtendimentosAceite">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idPadItem' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idPadItemLabel" for="vw-api-atendimentos-aceite-idPadItem">
                              <Translate contentKey="generadorApp.vwApiAtendimentosAceite.idPadItem">Id Pad Item</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idPadItem"
                              id="vw-api-atendimentos-aceite-idPadItem"
                              value={this.state.idPadItem}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idPaciente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idPacienteLabel" for="vw-api-atendimentos-aceite-idPaciente">
                              <Translate contentKey="generadorApp.vwApiAtendimentosAceite.idPaciente">Id Paciente</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idPaciente"
                              id="vw-api-atendimentos-aceite-idPaciente"
                              value={this.state.idPaciente}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idPeriodo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idPeriodoLabel" for="vw-api-atendimentos-aceite-idPeriodo">
                              <Translate contentKey="generadorApp.vwApiAtendimentosAceite.idPeriodo">Id Periodo</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idPeriodo"
                              id="vw-api-atendimentos-aceite-idPeriodo"
                              value={this.state.idPeriodo}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idPeriodicidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idPeriodicidadeLabel" for="vw-api-atendimentos-aceite-idPeriodicidade">
                              <Translate contentKey="generadorApp.vwApiAtendimentosAceite.idPeriodicidade">Id Periodicidade</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idPeriodicidade"
                              id="vw-api-atendimentos-aceite-idPeriodicidade"
                              value={this.state.idPeriodicidade}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idProfissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idProfissionalLabel" for="vw-api-atendimentos-aceite-idProfissional">
                              <Translate contentKey="generadorApp.vwApiAtendimentosAceite.idProfissional">Id Profissional</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idProfissional"
                              id="vw-api-atendimentos-aceite-idProfissional"
                              value={this.state.idProfissional}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'aceito' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="aceitoLabel" for="vw-api-atendimentos-aceite-aceito">
                              <Translate contentKey="generadorApp.vwApiAtendimentosAceite.aceito">Aceito</Translate>
                            </Label>
                            <AvInput type="string" name="aceito" id="vw-api-atendimentos-aceite-aceito" value={this.state.aceito} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'bairro' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="bairroLabel" for="vw-api-atendimentos-aceite-bairro">
                              <Translate contentKey="generadorApp.vwApiAtendimentosAceite.bairro">Bairro</Translate>
                            </Label>
                            <AvInput type="string" name="bairro" id="vw-api-atendimentos-aceite-bairro" value={this.state.bairro} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cep' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cepLabel" for="vw-api-atendimentos-aceite-cep">
                              <Translate contentKey="generadorApp.vwApiAtendimentosAceite.cep">Cep</Translate>
                            </Label>
                            <AvInput type="string" name="cep" id="vw-api-atendimentos-aceite-cep" value={this.state.cep} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cidadeLabel" for="vw-api-atendimentos-aceite-cidade">
                              <Translate contentKey="generadorApp.vwApiAtendimentosAceite.cidade">Cidade</Translate>
                            </Label>
                            <AvInput type="string" name="cidade" id="vw-api-atendimentos-aceite-cidade" value={this.state.cidade} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'complemento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="complementoLabel" for="vw-api-atendimentos-aceite-complemento">
                              <Translate contentKey="generadorApp.vwApiAtendimentosAceite.complemento">Complemento</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="complemento"
                              id="vw-api-atendimentos-aceite-complemento"
                              value={this.state.complemento}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'endereco' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="enderecoLabel" for="vw-api-atendimentos-aceite-endereco">
                              <Translate contentKey="generadorApp.vwApiAtendimentosAceite.endereco">Endereco</Translate>
                            </Label>
                            <AvInput type="string" name="endereco" id="vw-api-atendimentos-aceite-endereco" value={this.state.endereco} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'especialidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="especialidadeLabel" for="vw-api-atendimentos-aceite-especialidade">
                              <Translate contentKey="generadorApp.vwApiAtendimentosAceite.especialidade">Especialidade</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="especialidade"
                              id="vw-api-atendimentos-aceite-especialidade"
                              value={this.state.especialidade}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'latitude' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="latitudeLabel" for="vw-api-atendimentos-aceite-latitude">
                              <Translate contentKey="generadorApp.vwApiAtendimentosAceite.latitude">Latitude</Translate>
                            </Label>
                            <AvInput type="string" name="latitude" id="vw-api-atendimentos-aceite-latitude" value={this.state.latitude} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'longitude' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="longitudeLabel" for="vw-api-atendimentos-aceite-longitude">
                              <Translate contentKey="generadorApp.vwApiAtendimentosAceite.longitude">Longitude</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="longitude"
                              id="vw-api-atendimentos-aceite-longitude"
                              value={this.state.longitude}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'numero' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="numeroLabel" for="vw-api-atendimentos-aceite-numero">
                              <Translate contentKey="generadorApp.vwApiAtendimentosAceite.numero">Numero</Translate>
                            </Label>
                            <AvInput type="string" name="numero" id="vw-api-atendimentos-aceite-numero" value={this.state.numero} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'paciente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="pacienteLabel" for="vw-api-atendimentos-aceite-paciente">
                              <Translate contentKey="generadorApp.vwApiAtendimentosAceite.paciente">Paciente</Translate>
                            </Label>
                            <AvInput type="string" name="paciente" id="vw-api-atendimentos-aceite-paciente" value={this.state.paciente} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'periodo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="periodoLabel" for="vw-api-atendimentos-aceite-periodo">
                              <Translate contentKey="generadorApp.vwApiAtendimentosAceite.periodo">Periodo</Translate>
                            </Label>
                            <AvInput type="string" name="periodo" id="vw-api-atendimentos-aceite-periodo" value={this.state.periodo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'periodicidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="periodicidadeLabel" for="vw-api-atendimentos-aceite-periodicidade">
                              <Translate contentKey="generadorApp.vwApiAtendimentosAceite.periodicidade">Periodicidade</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="periodicidade"
                              id="vw-api-atendimentos-aceite-periodicidade"
                              value={this.state.periodicidade}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'qtdSessoes' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="qtdSessoesLabel" for="vw-api-atendimentos-aceite-qtdSessoes">
                              <Translate contentKey="generadorApp.vwApiAtendimentosAceite.qtdSessoes">Qtd Sessoes</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="qtdSessoes"
                              id="vw-api-atendimentos-aceite-qtdSessoes"
                              value={this.state.qtdSessoes}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'uf' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ufLabel" for="vw-api-atendimentos-aceite-uf">
                              <Translate contentKey="generadorApp.vwApiAtendimentosAceite.uf">Uf</Translate>
                            </Label>
                            <AvInput type="string" name="uf" id="vw-api-atendimentos-aceite-uf" value={this.state.uf} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'valor' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="valorLabel" for="vw-api-atendimentos-aceite-valor">
                              <Translate contentKey="generadorApp.vwApiAtendimentosAceite.valor">Valor</Translate>
                            </Label>
                            <AvInput type="string" name="valor" id="vw-api-atendimentos-aceite-valor" value={this.state.valor} />
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.vwApiAtendimentosAceite.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.vwApiAtendimentosAceite.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {vwApiAtendimentosAceiteList && vwApiAtendimentosAceiteList.length > 0 ? (
                <Table responsive aria-describedby="vw-api-atendimentos-aceite-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'idPadItem' ? (
                        <th className="hand" onClick={this.sort('idPadItem')}>
                          <Translate contentKey="generadorApp.vwApiAtendimentosAceite.idPadItem">Id Pad Item</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idPaciente' ? (
                        <th className="hand" onClick={this.sort('idPaciente')}>
                          <Translate contentKey="generadorApp.vwApiAtendimentosAceite.idPaciente">Id Paciente</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idPeriodo' ? (
                        <th className="hand" onClick={this.sort('idPeriodo')}>
                          <Translate contentKey="generadorApp.vwApiAtendimentosAceite.idPeriodo">Id Periodo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idPeriodicidade' ? (
                        <th className="hand" onClick={this.sort('idPeriodicidade')}>
                          <Translate contentKey="generadorApp.vwApiAtendimentosAceite.idPeriodicidade">Id Periodicidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idProfissional' ? (
                        <th className="hand" onClick={this.sort('idProfissional')}>
                          <Translate contentKey="generadorApp.vwApiAtendimentosAceite.idProfissional">Id Profissional</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'aceito' ? (
                        <th className="hand" onClick={this.sort('aceito')}>
                          <Translate contentKey="generadorApp.vwApiAtendimentosAceite.aceito">Aceito</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'bairro' ? (
                        <th className="hand" onClick={this.sort('bairro')}>
                          <Translate contentKey="generadorApp.vwApiAtendimentosAceite.bairro">Bairro</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cep' ? (
                        <th className="hand" onClick={this.sort('cep')}>
                          <Translate contentKey="generadorApp.vwApiAtendimentosAceite.cep">Cep</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cidade' ? (
                        <th className="hand" onClick={this.sort('cidade')}>
                          <Translate contentKey="generadorApp.vwApiAtendimentosAceite.cidade">Cidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'complemento' ? (
                        <th className="hand" onClick={this.sort('complemento')}>
                          <Translate contentKey="generadorApp.vwApiAtendimentosAceite.complemento">Complemento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'endereco' ? (
                        <th className="hand" onClick={this.sort('endereco')}>
                          <Translate contentKey="generadorApp.vwApiAtendimentosAceite.endereco">Endereco</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'especialidade' ? (
                        <th className="hand" onClick={this.sort('especialidade')}>
                          <Translate contentKey="generadorApp.vwApiAtendimentosAceite.especialidade">Especialidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'latitude' ? (
                        <th className="hand" onClick={this.sort('latitude')}>
                          <Translate contentKey="generadorApp.vwApiAtendimentosAceite.latitude">Latitude</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'longitude' ? (
                        <th className="hand" onClick={this.sort('longitude')}>
                          <Translate contentKey="generadorApp.vwApiAtendimentosAceite.longitude">Longitude</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'numero' ? (
                        <th className="hand" onClick={this.sort('numero')}>
                          <Translate contentKey="generadorApp.vwApiAtendimentosAceite.numero">Numero</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'paciente' ? (
                        <th className="hand" onClick={this.sort('paciente')}>
                          <Translate contentKey="generadorApp.vwApiAtendimentosAceite.paciente">Paciente</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'periodo' ? (
                        <th className="hand" onClick={this.sort('periodo')}>
                          <Translate contentKey="generadorApp.vwApiAtendimentosAceite.periodo">Periodo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'periodicidade' ? (
                        <th className="hand" onClick={this.sort('periodicidade')}>
                          <Translate contentKey="generadorApp.vwApiAtendimentosAceite.periodicidade">Periodicidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'qtdSessoes' ? (
                        <th className="hand" onClick={this.sort('qtdSessoes')}>
                          <Translate contentKey="generadorApp.vwApiAtendimentosAceite.qtdSessoes">Qtd Sessoes</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'uf' ? (
                        <th className="hand" onClick={this.sort('uf')}>
                          <Translate contentKey="generadorApp.vwApiAtendimentosAceite.uf">Uf</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'valor' ? (
                        <th className="hand" onClick={this.sort('valor')}>
                          <Translate contentKey="generadorApp.vwApiAtendimentosAceite.valor">Valor</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {vwApiAtendimentosAceiteList.map((vwApiAtendimentosAceite, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${vwApiAtendimentosAceite.id}`} color="link" size="sm">
                            {vwApiAtendimentosAceite.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'idPadItem' ? <td>{vwApiAtendimentosAceite.idPadItem}</td> : null}

                        {this.state.baseFilters !== 'idPaciente' ? <td>{vwApiAtendimentosAceite.idPaciente}</td> : null}

                        {this.state.baseFilters !== 'idPeriodo' ? <td>{vwApiAtendimentosAceite.idPeriodo}</td> : null}

                        {this.state.baseFilters !== 'idPeriodicidade' ? <td>{vwApiAtendimentosAceite.idPeriodicidade}</td> : null}

                        {this.state.baseFilters !== 'idProfissional' ? <td>{vwApiAtendimentosAceite.idProfissional}</td> : null}

                        {this.state.baseFilters !== 'aceito' ? <td>{vwApiAtendimentosAceite.aceito}</td> : null}

                        {this.state.baseFilters !== 'bairro' ? <td>{vwApiAtendimentosAceite.bairro}</td> : null}

                        {this.state.baseFilters !== 'cep' ? <td>{vwApiAtendimentosAceite.cep}</td> : null}

                        {this.state.baseFilters !== 'cidade' ? <td>{vwApiAtendimentosAceite.cidade}</td> : null}

                        {this.state.baseFilters !== 'complemento' ? <td>{vwApiAtendimentosAceite.complemento}</td> : null}

                        {this.state.baseFilters !== 'endereco' ? <td>{vwApiAtendimentosAceite.endereco}</td> : null}

                        {this.state.baseFilters !== 'especialidade' ? <td>{vwApiAtendimentosAceite.especialidade}</td> : null}

                        {this.state.baseFilters !== 'latitude' ? <td>{vwApiAtendimentosAceite.latitude}</td> : null}

                        {this.state.baseFilters !== 'longitude' ? <td>{vwApiAtendimentosAceite.longitude}</td> : null}

                        {this.state.baseFilters !== 'numero' ? <td>{vwApiAtendimentosAceite.numero}</td> : null}

                        {this.state.baseFilters !== 'paciente' ? <td>{vwApiAtendimentosAceite.paciente}</td> : null}

                        {this.state.baseFilters !== 'periodo' ? <td>{vwApiAtendimentosAceite.periodo}</td> : null}

                        {this.state.baseFilters !== 'periodicidade' ? <td>{vwApiAtendimentosAceite.periodicidade}</td> : null}

                        {this.state.baseFilters !== 'qtdSessoes' ? <td>{vwApiAtendimentosAceite.qtdSessoes}</td> : null}

                        {this.state.baseFilters !== 'uf' ? <td>{vwApiAtendimentosAceite.uf}</td> : null}

                        {this.state.baseFilters !== 'valor' ? <td>{vwApiAtendimentosAceite.valor}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button
                              tag={Link}
                              to={`${match.url}/${vwApiAtendimentosAceite.id}?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${vwApiAtendimentosAceite.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${vwApiAtendimentosAceite.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.vwApiAtendimentosAceite.home.notFound">
                    No Vw Api Atendimentos Aceites found
                  </Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={vwApiAtendimentosAceiteList && vwApiAtendimentosAceiteList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ vwApiAtendimentosAceite, ...storeState }: IRootState) => ({
  vwApiAtendimentosAceiteList: vwApiAtendimentosAceite.entities,
  totalItems: vwApiAtendimentosAceite.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VwApiAtendimentosAceite);
