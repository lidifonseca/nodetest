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
import { getPacienteDispositivoAtualState, IPacienteDispositivoAtualBaseState, getEntities } from './paciente-dispositivo-atual.reducer';
import { IPacienteDispositivoAtual } from 'app/shared/model/paciente-dispositivo-atual.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPacienteDispositivoAtualProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPacienteDispositivoAtualState extends IPacienteDispositivoAtualBaseState, IPaginationBaseState {}

export class PacienteDispositivoAtual extends React.Component<IPacienteDispositivoAtualProps, IPacienteDispositivoAtualState> {
  private myFormRef: any;

  constructor(props: IPacienteDispositivoAtualProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getPacienteDispositivoAtualState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idPaciente: '',
        idPacienteDispositivo: '',
        tqtTraqueostomia: '',
        gttGastrostomia: '',
        sneSondaNasoenteral: '',
        svdSondaVesicalDeDemora: '',
        svaSondaVesicalDeAlivio: '',
        portACath: '',
        piccAcessoVenosoCentral: '',
        ventiladores: '',
        uppUlceraPorPressao: '',
        avpAcessoVenosoPeriferico: '',
        uripen: '',
        fraldaGeriatrica: '',
        sngSondaNasogastrica: '',
        bipap: '',
        cpap: '',
        cistostomia: '',
        cateterNasalDeOxigenio: '',
        mascaraDeVentilacao: '',
        entubacaoOrotraqueal: '',
        ileostomia: '',
        jejunostomia: '',
        colostomia: ''
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
      'idPacienteDispositivo=' +
      this.state.idPacienteDispositivo +
      '&' +
      'tqtTraqueostomia=' +
      this.state.tqtTraqueostomia +
      '&' +
      'gttGastrostomia=' +
      this.state.gttGastrostomia +
      '&' +
      'sneSondaNasoenteral=' +
      this.state.sneSondaNasoenteral +
      '&' +
      'svdSondaVesicalDeDemora=' +
      this.state.svdSondaVesicalDeDemora +
      '&' +
      'svaSondaVesicalDeAlivio=' +
      this.state.svaSondaVesicalDeAlivio +
      '&' +
      'portACath=' +
      this.state.portACath +
      '&' +
      'piccAcessoVenosoCentral=' +
      this.state.piccAcessoVenosoCentral +
      '&' +
      'ventiladores=' +
      this.state.ventiladores +
      '&' +
      'uppUlceraPorPressao=' +
      this.state.uppUlceraPorPressao +
      '&' +
      'avpAcessoVenosoPeriferico=' +
      this.state.avpAcessoVenosoPeriferico +
      '&' +
      'uripen=' +
      this.state.uripen +
      '&' +
      'fraldaGeriatrica=' +
      this.state.fraldaGeriatrica +
      '&' +
      'sngSondaNasogastrica=' +
      this.state.sngSondaNasogastrica +
      '&' +
      'bipap=' +
      this.state.bipap +
      '&' +
      'cpap=' +
      this.state.cpap +
      '&' +
      'cistostomia=' +
      this.state.cistostomia +
      '&' +
      'cateterNasalDeOxigenio=' +
      this.state.cateterNasalDeOxigenio +
      '&' +
      'mascaraDeVentilacao=' +
      this.state.mascaraDeVentilacao +
      '&' +
      'entubacaoOrotraqueal=' +
      this.state.entubacaoOrotraqueal +
      '&' +
      'ileostomia=' +
      this.state.ileostomia +
      '&' +
      'jejunostomia=' +
      this.state.jejunostomia +
      '&' +
      'colostomia=' +
      this.state.colostomia +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      idPaciente,
      idPacienteDispositivo,
      tqtTraqueostomia,
      gttGastrostomia,
      sneSondaNasoenteral,
      svdSondaVesicalDeDemora,
      svaSondaVesicalDeAlivio,
      portACath,
      piccAcessoVenosoCentral,
      ventiladores,
      uppUlceraPorPressao,
      avpAcessoVenosoPeriferico,
      uripen,
      fraldaGeriatrica,
      sngSondaNasogastrica,
      bipap,
      cpap,
      cistostomia,
      cateterNasalDeOxigenio,
      mascaraDeVentilacao,
      entubacaoOrotraqueal,
      ileostomia,
      jejunostomia,
      colostomia,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      idPaciente,
      idPacienteDispositivo,
      tqtTraqueostomia,
      gttGastrostomia,
      sneSondaNasoenteral,
      svdSondaVesicalDeDemora,
      svaSondaVesicalDeAlivio,
      portACath,
      piccAcessoVenosoCentral,
      ventiladores,
      uppUlceraPorPressao,
      avpAcessoVenosoPeriferico,
      uripen,
      fraldaGeriatrica,
      sngSondaNasogastrica,
      bipap,
      cpap,
      cistostomia,
      cateterNasalDeOxigenio,
      mascaraDeVentilacao,
      entubacaoOrotraqueal,
      ileostomia,
      jejunostomia,
      colostomia,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { pacienteDispositivoAtualList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Dispositivo Atuals</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Paciente Dispositivo Atuals</span>
              <Button id="togglerFilterPacienteDispositivoAtual" className="btn btn-primary float-right jh-create-entity">
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
                <Translate contentKey="generadorApp.pacienteDispositivoAtual.home.createLabel">
                  Create a new Paciente Dispositivo Atual
                </Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPacienteDispositivoAtual">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idPaciente' ? (
                        <Col md="3">
                          <Row>
                            <Label id="idPacienteLabel" for="paciente-dispositivo-atual-idPaciente">
                              <Translate contentKey="generadorApp.pacienteDispositivoAtual.idPaciente">Id Paciente</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idPaciente"
                              id="paciente-dispositivo-atual-idPaciente"
                              value={this.state.idPaciente}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idPacienteDispositivo' ? (
                        <Col md="3">
                          <Row>
                            <Label id="idPacienteDispositivoLabel" for="paciente-dispositivo-atual-idPacienteDispositivo">
                              <Translate contentKey="generadorApp.pacienteDispositivoAtual.idPacienteDispositivo">
                                Id Paciente Dispositivo
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idPacienteDispositivo"
                              id="paciente-dispositivo-atual-idPacienteDispositivo"
                              value={this.state.idPacienteDispositivo}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'tqtTraqueostomia' ? (
                        <Col md="3">
                          <Row>
                            <Label id="tqtTraqueostomiaLabel" for="paciente-dispositivo-atual-tqtTraqueostomia">
                              <Translate contentKey="generadorApp.pacienteDispositivoAtual.tqtTraqueostomia">Tqt Traqueostomia</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="tqtTraqueostomia"
                              id="paciente-dispositivo-atual-tqtTraqueostomia"
                              value={this.state.tqtTraqueostomia}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'gttGastrostomia' ? (
                        <Col md="3">
                          <Row>
                            <Label id="gttGastrostomiaLabel" for="paciente-dispositivo-atual-gttGastrostomia">
                              <Translate contentKey="generadorApp.pacienteDispositivoAtual.gttGastrostomia">Gtt Gastrostomia</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="gttGastrostomia"
                              id="paciente-dispositivo-atual-gttGastrostomia"
                              value={this.state.gttGastrostomia}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'sneSondaNasoenteral' ? (
                        <Col md="3">
                          <Row>
                            <Label id="sneSondaNasoenteralLabel" for="paciente-dispositivo-atual-sneSondaNasoenteral">
                              <Translate contentKey="generadorApp.pacienteDispositivoAtual.sneSondaNasoenteral">
                                Sne Sonda Nasoenteral
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="sneSondaNasoenteral"
                              id="paciente-dispositivo-atual-sneSondaNasoenteral"
                              value={this.state.sneSondaNasoenteral}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'svdSondaVesicalDeDemora' ? (
                        <Col md="3">
                          <Row>
                            <Label id="svdSondaVesicalDeDemoraLabel" for="paciente-dispositivo-atual-svdSondaVesicalDeDemora">
                              <Translate contentKey="generadorApp.pacienteDispositivoAtual.svdSondaVesicalDeDemora">
                                Svd Sonda Vesical De Demora
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="svdSondaVesicalDeDemora"
                              id="paciente-dispositivo-atual-svdSondaVesicalDeDemora"
                              value={this.state.svdSondaVesicalDeDemora}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'svaSondaVesicalDeAlivio' ? (
                        <Col md="3">
                          <Row>
                            <Label id="svaSondaVesicalDeAlivioLabel" for="paciente-dispositivo-atual-svaSondaVesicalDeAlivio">
                              <Translate contentKey="generadorApp.pacienteDispositivoAtual.svaSondaVesicalDeAlivio">
                                Sva Sonda Vesical De Alivio
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="svaSondaVesicalDeAlivio"
                              id="paciente-dispositivo-atual-svaSondaVesicalDeAlivio"
                              value={this.state.svaSondaVesicalDeAlivio}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'portACath' ? (
                        <Col md="3">
                          <Row>
                            <Label id="portACathLabel" for="paciente-dispositivo-atual-portACath">
                              <Translate contentKey="generadorApp.pacienteDispositivoAtual.portACath">Port A Cath</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="portACath"
                              id="paciente-dispositivo-atual-portACath"
                              value={this.state.portACath}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'piccAcessoVenosoCentral' ? (
                        <Col md="3">
                          <Row>
                            <Label id="piccAcessoVenosoCentralLabel" for="paciente-dispositivo-atual-piccAcessoVenosoCentral">
                              <Translate contentKey="generadorApp.pacienteDispositivoAtual.piccAcessoVenosoCentral">
                                Picc Acesso Venoso Central
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="piccAcessoVenosoCentral"
                              id="paciente-dispositivo-atual-piccAcessoVenosoCentral"
                              value={this.state.piccAcessoVenosoCentral}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ventiladores' ? (
                        <Col md="3">
                          <Row>
                            <Label id="ventiladoresLabel" for="paciente-dispositivo-atual-ventiladores">
                              <Translate contentKey="generadorApp.pacienteDispositivoAtual.ventiladores">Ventiladores</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="ventiladores"
                              id="paciente-dispositivo-atual-ventiladores"
                              value={this.state.ventiladores}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'uppUlceraPorPressao' ? (
                        <Col md="3">
                          <Row>
                            <Label id="uppUlceraPorPressaoLabel" for="paciente-dispositivo-atual-uppUlceraPorPressao">
                              <Translate contentKey="generadorApp.pacienteDispositivoAtual.uppUlceraPorPressao">
                                Upp Ulcera Por Pressao
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="uppUlceraPorPressao"
                              id="paciente-dispositivo-atual-uppUlceraPorPressao"
                              value={this.state.uppUlceraPorPressao}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'avpAcessoVenosoPeriferico' ? (
                        <Col md="3">
                          <Row>
                            <Label id="avpAcessoVenosoPerifericoLabel" for="paciente-dispositivo-atual-avpAcessoVenosoPeriferico">
                              <Translate contentKey="generadorApp.pacienteDispositivoAtual.avpAcessoVenosoPeriferico">
                                Avp Acesso Venoso Periferico
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="avpAcessoVenosoPeriferico"
                              id="paciente-dispositivo-atual-avpAcessoVenosoPeriferico"
                              value={this.state.avpAcessoVenosoPeriferico}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'uripen' ? (
                        <Col md="3">
                          <Row>
                            <Label id="uripenLabel" for="paciente-dispositivo-atual-uripen">
                              <Translate contentKey="generadorApp.pacienteDispositivoAtual.uripen">Uripen</Translate>
                            </Label>
                            <AvInput type="string" name="uripen" id="paciente-dispositivo-atual-uripen" value={this.state.uripen} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'fraldaGeriatrica' ? (
                        <Col md="3">
                          <Row>
                            <Label id="fraldaGeriatricaLabel" for="paciente-dispositivo-atual-fraldaGeriatrica">
                              <Translate contentKey="generadorApp.pacienteDispositivoAtual.fraldaGeriatrica">Fralda Geriatrica</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="fraldaGeriatrica"
                              id="paciente-dispositivo-atual-fraldaGeriatrica"
                              value={this.state.fraldaGeriatrica}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'sngSondaNasogastrica' ? (
                        <Col md="3">
                          <Row>
                            <Label id="sngSondaNasogastricaLabel" for="paciente-dispositivo-atual-sngSondaNasogastrica">
                              <Translate contentKey="generadorApp.pacienteDispositivoAtual.sngSondaNasogastrica">
                                Sng Sonda Nasogastrica
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="sngSondaNasogastrica"
                              id="paciente-dispositivo-atual-sngSondaNasogastrica"
                              value={this.state.sngSondaNasogastrica}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'bipap' ? (
                        <Col md="3">
                          <Row>
                            <Label id="bipapLabel" for="paciente-dispositivo-atual-bipap">
                              <Translate contentKey="generadorApp.pacienteDispositivoAtual.bipap">Bipap</Translate>
                            </Label>
                            <AvInput type="string" name="bipap" id="paciente-dispositivo-atual-bipap" value={this.state.bipap} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cpap' ? (
                        <Col md="3">
                          <Row>
                            <Label id="cpapLabel" for="paciente-dispositivo-atual-cpap">
                              <Translate contentKey="generadorApp.pacienteDispositivoAtual.cpap">Cpap</Translate>
                            </Label>
                            <AvInput type="string" name="cpap" id="paciente-dispositivo-atual-cpap" value={this.state.cpap} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cistostomia' ? (
                        <Col md="3">
                          <Row>
                            <Label id="cistostomiaLabel" for="paciente-dispositivo-atual-cistostomia">
                              <Translate contentKey="generadorApp.pacienteDispositivoAtual.cistostomia">Cistostomia</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="cistostomia"
                              id="paciente-dispositivo-atual-cistostomia"
                              value={this.state.cistostomia}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cateterNasalDeOxigenio' ? (
                        <Col md="3">
                          <Row>
                            <Label id="cateterNasalDeOxigenioLabel" for="paciente-dispositivo-atual-cateterNasalDeOxigenio">
                              <Translate contentKey="generadorApp.pacienteDispositivoAtual.cateterNasalDeOxigenio">
                                Cateter Nasal De Oxigenio
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="cateterNasalDeOxigenio"
                              id="paciente-dispositivo-atual-cateterNasalDeOxigenio"
                              value={this.state.cateterNasalDeOxigenio}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'mascaraDeVentilacao' ? (
                        <Col md="3">
                          <Row>
                            <Label id="mascaraDeVentilacaoLabel" for="paciente-dispositivo-atual-mascaraDeVentilacao">
                              <Translate contentKey="generadorApp.pacienteDispositivoAtual.mascaraDeVentilacao">
                                Mascara De Ventilacao
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="mascaraDeVentilacao"
                              id="paciente-dispositivo-atual-mascaraDeVentilacao"
                              value={this.state.mascaraDeVentilacao}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'entubacaoOrotraqueal' ? (
                        <Col md="3">
                          <Row>
                            <Label id="entubacaoOrotraquealLabel" for="paciente-dispositivo-atual-entubacaoOrotraqueal">
                              <Translate contentKey="generadorApp.pacienteDispositivoAtual.entubacaoOrotraqueal">
                                Entubacao Orotraqueal
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="entubacaoOrotraqueal"
                              id="paciente-dispositivo-atual-entubacaoOrotraqueal"
                              value={this.state.entubacaoOrotraqueal}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ileostomia' ? (
                        <Col md="3">
                          <Row>
                            <Label id="ileostomiaLabel" for="paciente-dispositivo-atual-ileostomia">
                              <Translate contentKey="generadorApp.pacienteDispositivoAtual.ileostomia">Ileostomia</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="ileostomia"
                              id="paciente-dispositivo-atual-ileostomia"
                              value={this.state.ileostomia}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'jejunostomia' ? (
                        <Col md="3">
                          <Row>
                            <Label id="jejunostomiaLabel" for="paciente-dispositivo-atual-jejunostomia">
                              <Translate contentKey="generadorApp.pacienteDispositivoAtual.jejunostomia">Jejunostomia</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="jejunostomia"
                              id="paciente-dispositivo-atual-jejunostomia"
                              value={this.state.jejunostomia}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'colostomia' ? (
                        <Col md="3">
                          <Row>
                            <Label id="colostomiaLabel" for="paciente-dispositivo-atual-colostomia">
                              <Translate contentKey="generadorApp.pacienteDispositivoAtual.colostomia">Colostomia</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="colostomia"
                              id="paciente-dispositivo-atual-colostomia"
                              value={this.state.colostomia}
                            />
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

              {pacienteDispositivoAtualList && pacienteDispositivoAtualList.length > 0 ? (
                <Table responsive aria-describedby="paciente-dispositivo-atual-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'idPaciente' ? (
                        <th className="hand" onClick={this.sort('idPaciente')}>
                          <Translate contentKey="generadorApp.pacienteDispositivoAtual.idPaciente">Id Paciente</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idPacienteDispositivo' ? (
                        <th className="hand" onClick={this.sort('idPacienteDispositivo')}>
                          <Translate contentKey="generadorApp.pacienteDispositivoAtual.idPacienteDispositivo">
                            Id Paciente Dispositivo
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'tqtTraqueostomia' ? (
                        <th className="hand" onClick={this.sort('tqtTraqueostomia')}>
                          <Translate contentKey="generadorApp.pacienteDispositivoAtual.tqtTraqueostomia">Tqt Traqueostomia</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'gttGastrostomia' ? (
                        <th className="hand" onClick={this.sort('gttGastrostomia')}>
                          <Translate contentKey="generadorApp.pacienteDispositivoAtual.gttGastrostomia">Gtt Gastrostomia</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'sneSondaNasoenteral' ? (
                        <th className="hand" onClick={this.sort('sneSondaNasoenteral')}>
                          <Translate contentKey="generadorApp.pacienteDispositivoAtual.sneSondaNasoenteral">
                            Sne Sonda Nasoenteral
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'svdSondaVesicalDeDemora' ? (
                        <th className="hand" onClick={this.sort('svdSondaVesicalDeDemora')}>
                          <Translate contentKey="generadorApp.pacienteDispositivoAtual.svdSondaVesicalDeDemora">
                            Svd Sonda Vesical De Demora
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'svaSondaVesicalDeAlivio' ? (
                        <th className="hand" onClick={this.sort('svaSondaVesicalDeAlivio')}>
                          <Translate contentKey="generadorApp.pacienteDispositivoAtual.svaSondaVesicalDeAlivio">
                            Sva Sonda Vesical De Alivio
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'portACath' ? (
                        <th className="hand" onClick={this.sort('portACath')}>
                          <Translate contentKey="generadorApp.pacienteDispositivoAtual.portACath">Port A Cath</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'piccAcessoVenosoCentral' ? (
                        <th className="hand" onClick={this.sort('piccAcessoVenosoCentral')}>
                          <Translate contentKey="generadorApp.pacienteDispositivoAtual.piccAcessoVenosoCentral">
                            Picc Acesso Venoso Central
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ventiladores' ? (
                        <th className="hand" onClick={this.sort('ventiladores')}>
                          <Translate contentKey="generadorApp.pacienteDispositivoAtual.ventiladores">Ventiladores</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'uppUlceraPorPressao' ? (
                        <th className="hand" onClick={this.sort('uppUlceraPorPressao')}>
                          <Translate contentKey="generadorApp.pacienteDispositivoAtual.uppUlceraPorPressao">
                            Upp Ulcera Por Pressao
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'avpAcessoVenosoPeriferico' ? (
                        <th className="hand" onClick={this.sort('avpAcessoVenosoPeriferico')}>
                          <Translate contentKey="generadorApp.pacienteDispositivoAtual.avpAcessoVenosoPeriferico">
                            Avp Acesso Venoso Periferico
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'uripen' ? (
                        <th className="hand" onClick={this.sort('uripen')}>
                          <Translate contentKey="generadorApp.pacienteDispositivoAtual.uripen">Uripen</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'fraldaGeriatrica' ? (
                        <th className="hand" onClick={this.sort('fraldaGeriatrica')}>
                          <Translate contentKey="generadorApp.pacienteDispositivoAtual.fraldaGeriatrica">Fralda Geriatrica</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'sngSondaNasogastrica' ? (
                        <th className="hand" onClick={this.sort('sngSondaNasogastrica')}>
                          <Translate contentKey="generadorApp.pacienteDispositivoAtual.sngSondaNasogastrica">
                            Sng Sonda Nasogastrica
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'bipap' ? (
                        <th className="hand" onClick={this.sort('bipap')}>
                          <Translate contentKey="generadorApp.pacienteDispositivoAtual.bipap">Bipap</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cpap' ? (
                        <th className="hand" onClick={this.sort('cpap')}>
                          <Translate contentKey="generadorApp.pacienteDispositivoAtual.cpap">Cpap</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cistostomia' ? (
                        <th className="hand" onClick={this.sort('cistostomia')}>
                          <Translate contentKey="generadorApp.pacienteDispositivoAtual.cistostomia">Cistostomia</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cateterNasalDeOxigenio' ? (
                        <th className="hand" onClick={this.sort('cateterNasalDeOxigenio')}>
                          <Translate contentKey="generadorApp.pacienteDispositivoAtual.cateterNasalDeOxigenio">
                            Cateter Nasal De Oxigenio
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'mascaraDeVentilacao' ? (
                        <th className="hand" onClick={this.sort('mascaraDeVentilacao')}>
                          <Translate contentKey="generadorApp.pacienteDispositivoAtual.mascaraDeVentilacao">
                            Mascara De Ventilacao
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'entubacaoOrotraqueal' ? (
                        <th className="hand" onClick={this.sort('entubacaoOrotraqueal')}>
                          <Translate contentKey="generadorApp.pacienteDispositivoAtual.entubacaoOrotraqueal">
                            Entubacao Orotraqueal
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ileostomia' ? (
                        <th className="hand" onClick={this.sort('ileostomia')}>
                          <Translate contentKey="generadorApp.pacienteDispositivoAtual.ileostomia">Ileostomia</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'jejunostomia' ? (
                        <th className="hand" onClick={this.sort('jejunostomia')}>
                          <Translate contentKey="generadorApp.pacienteDispositivoAtual.jejunostomia">Jejunostomia</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'colostomia' ? (
                        <th className="hand" onClick={this.sort('colostomia')}>
                          <Translate contentKey="generadorApp.pacienteDispositivoAtual.colostomia">Colostomia</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {pacienteDispositivoAtualList.map((pacienteDispositivoAtual, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${pacienteDispositivoAtual.id}`} color="link" size="sm">
                            {pacienteDispositivoAtual.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'idPaciente' ? <td>{pacienteDispositivoAtual.idPaciente}</td> : null}

                        {this.state.baseFilters !== 'idPacienteDispositivo' ? (
                          <td>{pacienteDispositivoAtual.idPacienteDispositivo}</td>
                        ) : null}

                        {this.state.baseFilters !== 'tqtTraqueostomia' ? <td>{pacienteDispositivoAtual.tqtTraqueostomia}</td> : null}

                        {this.state.baseFilters !== 'gttGastrostomia' ? <td>{pacienteDispositivoAtual.gttGastrostomia}</td> : null}

                        {this.state.baseFilters !== 'sneSondaNasoenteral' ? <td>{pacienteDispositivoAtual.sneSondaNasoenteral}</td> : null}

                        {this.state.baseFilters !== 'svdSondaVesicalDeDemora' ? (
                          <td>{pacienteDispositivoAtual.svdSondaVesicalDeDemora}</td>
                        ) : null}

                        {this.state.baseFilters !== 'svaSondaVesicalDeAlivio' ? (
                          <td>{pacienteDispositivoAtual.svaSondaVesicalDeAlivio}</td>
                        ) : null}

                        {this.state.baseFilters !== 'portACath' ? <td>{pacienteDispositivoAtual.portACath}</td> : null}

                        {this.state.baseFilters !== 'piccAcessoVenosoCentral' ? (
                          <td>{pacienteDispositivoAtual.piccAcessoVenosoCentral}</td>
                        ) : null}

                        {this.state.baseFilters !== 'ventiladores' ? <td>{pacienteDispositivoAtual.ventiladores}</td> : null}

                        {this.state.baseFilters !== 'uppUlceraPorPressao' ? <td>{pacienteDispositivoAtual.uppUlceraPorPressao}</td> : null}

                        {this.state.baseFilters !== 'avpAcessoVenosoPeriferico' ? (
                          <td>{pacienteDispositivoAtual.avpAcessoVenosoPeriferico}</td>
                        ) : null}

                        {this.state.baseFilters !== 'uripen' ? <td>{pacienteDispositivoAtual.uripen}</td> : null}

                        {this.state.baseFilters !== 'fraldaGeriatrica' ? <td>{pacienteDispositivoAtual.fraldaGeriatrica}</td> : null}

                        {this.state.baseFilters !== 'sngSondaNasogastrica' ? (
                          <td>{pacienteDispositivoAtual.sngSondaNasogastrica}</td>
                        ) : null}

                        {this.state.baseFilters !== 'bipap' ? <td>{pacienteDispositivoAtual.bipap}</td> : null}

                        {this.state.baseFilters !== 'cpap' ? <td>{pacienteDispositivoAtual.cpap}</td> : null}

                        {this.state.baseFilters !== 'cistostomia' ? <td>{pacienteDispositivoAtual.cistostomia}</td> : null}

                        {this.state.baseFilters !== 'cateterNasalDeOxigenio' ? (
                          <td>{pacienteDispositivoAtual.cateterNasalDeOxigenio}</td>
                        ) : null}

                        {this.state.baseFilters !== 'mascaraDeVentilacao' ? <td>{pacienteDispositivoAtual.mascaraDeVentilacao}</td> : null}

                        {this.state.baseFilters !== 'entubacaoOrotraqueal' ? (
                          <td>{pacienteDispositivoAtual.entubacaoOrotraqueal}</td>
                        ) : null}

                        {this.state.baseFilters !== 'ileostomia' ? <td>{pacienteDispositivoAtual.ileostomia}</td> : null}

                        {this.state.baseFilters !== 'jejunostomia' ? <td>{pacienteDispositivoAtual.jejunostomia}</td> : null}

                        {this.state.baseFilters !== 'colostomia' ? <td>{pacienteDispositivoAtual.colostomia}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button
                              tag={Link}
                              to={`${match.url}/${pacienteDispositivoAtual.id}?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${pacienteDispositivoAtual.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${pacienteDispositivoAtual.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.pacienteDispositivoAtual.home.notFound">
                    No Paciente Dispositivo Atuals found
                  </Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={pacienteDispositivoAtualList && pacienteDispositivoAtualList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ pacienteDispositivoAtual, ...storeState }: IRootState) => ({
  pacienteDispositivoAtualList: pacienteDispositivoAtual.entities,
  totalItems: pacienteDispositivoAtual.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteDispositivoAtual);
