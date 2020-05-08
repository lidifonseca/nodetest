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
import {
  getProfissionalDispositivoAtualState,
  IProfissionalDispositivoAtualBaseState,
  getEntities
} from './profissional-dispositivo-atual.reducer';
import { IProfissionalDispositivoAtual } from 'app/shared/model/profissional-dispositivo-atual.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IProfissionalDispositivoAtualProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IProfissionalDispositivoAtualState extends IProfissionalDispositivoAtualBaseState, IPaginationBaseState {}

export class ProfissionalDispositivoAtual extends React.Component<IProfissionalDispositivoAtualProps, IProfissionalDispositivoAtualState> {
  private myFormRef: any;

  constructor(props: IProfissionalDispositivoAtualProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getProfissionalDispositivoAtualState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idProfissional: '',
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
        entubacaoOrotraqueal: ''
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
      'idProfissional=' +
      this.state.idProfissional +
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
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      idProfissional,
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
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      idProfissional,
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
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { profissionalDispositivoAtualList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Profissional Dispositivo Atuals</span>
          <Button id="togglerFilterProfissionalDispositivoAtual" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.profissionalDispositivoAtual.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.profissionalDispositivoAtual.home.createLabel">
              Create a new Profissional Dispositivo Atual
            </Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Profissional Dispositivo Atuals</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterProfissionalDispositivoAtual">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idProfissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idProfissionalLabel" for="profissional-dispositivo-atual-idProfissional">
                              <Translate contentKey="generadorApp.profissionalDispositivoAtual.idProfissional">Id Profissional</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idProfissional"
                              id="profissional-dispositivo-atual-idProfissional"
                              value={this.state.idProfissional}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'tqtTraqueostomia' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="tqtTraqueostomiaLabel" for="profissional-dispositivo-atual-tqtTraqueostomia">
                              <Translate contentKey="generadorApp.profissionalDispositivoAtual.tqtTraqueostomia">
                                Tqt Traqueostomia
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="tqtTraqueostomia"
                              id="profissional-dispositivo-atual-tqtTraqueostomia"
                              value={this.state.tqtTraqueostomia}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'gttGastrostomia' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="gttGastrostomiaLabel" for="profissional-dispositivo-atual-gttGastrostomia">
                              <Translate contentKey="generadorApp.profissionalDispositivoAtual.gttGastrostomia">Gtt Gastrostomia</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="gttGastrostomia"
                              id="profissional-dispositivo-atual-gttGastrostomia"
                              value={this.state.gttGastrostomia}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'sneSondaNasoenteral' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="sneSondaNasoenteralLabel" for="profissional-dispositivo-atual-sneSondaNasoenteral">
                              <Translate contentKey="generadorApp.profissionalDispositivoAtual.sneSondaNasoenteral">
                                Sne Sonda Nasoenteral
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="sneSondaNasoenteral"
                              id="profissional-dispositivo-atual-sneSondaNasoenteral"
                              value={this.state.sneSondaNasoenteral}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'svdSondaVesicalDeDemora' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="svdSondaVesicalDeDemoraLabel" for="profissional-dispositivo-atual-svdSondaVesicalDeDemora">
                              <Translate contentKey="generadorApp.profissionalDispositivoAtual.svdSondaVesicalDeDemora">
                                Svd Sonda Vesical De Demora
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="svdSondaVesicalDeDemora"
                              id="profissional-dispositivo-atual-svdSondaVesicalDeDemora"
                              value={this.state.svdSondaVesicalDeDemora}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'svaSondaVesicalDeAlivio' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="svaSondaVesicalDeAlivioLabel" for="profissional-dispositivo-atual-svaSondaVesicalDeAlivio">
                              <Translate contentKey="generadorApp.profissionalDispositivoAtual.svaSondaVesicalDeAlivio">
                                Sva Sonda Vesical De Alivio
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="svaSondaVesicalDeAlivio"
                              id="profissional-dispositivo-atual-svaSondaVesicalDeAlivio"
                              value={this.state.svaSondaVesicalDeAlivio}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'portACath' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="portACathLabel" for="profissional-dispositivo-atual-portACath">
                              <Translate contentKey="generadorApp.profissionalDispositivoAtual.portACath">Port A Cath</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="portACath"
                              id="profissional-dispositivo-atual-portACath"
                              value={this.state.portACath}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'piccAcessoVenosoCentral' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="piccAcessoVenosoCentralLabel" for="profissional-dispositivo-atual-piccAcessoVenosoCentral">
                              <Translate contentKey="generadorApp.profissionalDispositivoAtual.piccAcessoVenosoCentral">
                                Picc Acesso Venoso Central
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="piccAcessoVenosoCentral"
                              id="profissional-dispositivo-atual-piccAcessoVenosoCentral"
                              value={this.state.piccAcessoVenosoCentral}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ventiladores' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ventiladoresLabel" for="profissional-dispositivo-atual-ventiladores">
                              <Translate contentKey="generadorApp.profissionalDispositivoAtual.ventiladores">Ventiladores</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="ventiladores"
                              id="profissional-dispositivo-atual-ventiladores"
                              value={this.state.ventiladores}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'uppUlceraPorPressao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="uppUlceraPorPressaoLabel" for="profissional-dispositivo-atual-uppUlceraPorPressao">
                              <Translate contentKey="generadorApp.profissionalDispositivoAtual.uppUlceraPorPressao">
                                Upp Ulcera Por Pressao
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="uppUlceraPorPressao"
                              id="profissional-dispositivo-atual-uppUlceraPorPressao"
                              value={this.state.uppUlceraPorPressao}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'avpAcessoVenosoPeriferico' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="avpAcessoVenosoPerifericoLabel" for="profissional-dispositivo-atual-avpAcessoVenosoPeriferico">
                              <Translate contentKey="generadorApp.profissionalDispositivoAtual.avpAcessoVenosoPeriferico">
                                Avp Acesso Venoso Periferico
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="avpAcessoVenosoPeriferico"
                              id="profissional-dispositivo-atual-avpAcessoVenosoPeriferico"
                              value={this.state.avpAcessoVenosoPeriferico}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'uripen' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="uripenLabel" for="profissional-dispositivo-atual-uripen">
                              <Translate contentKey="generadorApp.profissionalDispositivoAtual.uripen">Uripen</Translate>
                            </Label>
                            <AvInput type="string" name="uripen" id="profissional-dispositivo-atual-uripen" value={this.state.uripen} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'fraldaGeriatrica' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="fraldaGeriatricaLabel" for="profissional-dispositivo-atual-fraldaGeriatrica">
                              <Translate contentKey="generadorApp.profissionalDispositivoAtual.fraldaGeriatrica">
                                Fralda Geriatrica
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="fraldaGeriatrica"
                              id="profissional-dispositivo-atual-fraldaGeriatrica"
                              value={this.state.fraldaGeriatrica}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'sngSondaNasogastrica' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="sngSondaNasogastricaLabel" for="profissional-dispositivo-atual-sngSondaNasogastrica">
                              <Translate contentKey="generadorApp.profissionalDispositivoAtual.sngSondaNasogastrica">
                                Sng Sonda Nasogastrica
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="sngSondaNasogastrica"
                              id="profissional-dispositivo-atual-sngSondaNasogastrica"
                              value={this.state.sngSondaNasogastrica}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'bipap' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="bipapLabel" for="profissional-dispositivo-atual-bipap">
                              <Translate contentKey="generadorApp.profissionalDispositivoAtual.bipap">Bipap</Translate>
                            </Label>
                            <AvInput type="string" name="bipap" id="profissional-dispositivo-atual-bipap" value={this.state.bipap} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cpap' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cpapLabel" for="profissional-dispositivo-atual-cpap">
                              <Translate contentKey="generadorApp.profissionalDispositivoAtual.cpap">Cpap</Translate>
                            </Label>
                            <AvInput type="string" name="cpap" id="profissional-dispositivo-atual-cpap" value={this.state.cpap} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cistostomia' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cistostomiaLabel" for="profissional-dispositivo-atual-cistostomia">
                              <Translate contentKey="generadorApp.profissionalDispositivoAtual.cistostomia">Cistostomia</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="cistostomia"
                              id="profissional-dispositivo-atual-cistostomia"
                              value={this.state.cistostomia}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cateterNasalDeOxigenio' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cateterNasalDeOxigenioLabel" for="profissional-dispositivo-atual-cateterNasalDeOxigenio">
                              <Translate contentKey="generadorApp.profissionalDispositivoAtual.cateterNasalDeOxigenio">
                                Cateter Nasal De Oxigenio
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="cateterNasalDeOxigenio"
                              id="profissional-dispositivo-atual-cateterNasalDeOxigenio"
                              value={this.state.cateterNasalDeOxigenio}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'mascaraDeVentilacao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="mascaraDeVentilacaoLabel" for="profissional-dispositivo-atual-mascaraDeVentilacao">
                              <Translate contentKey="generadorApp.profissionalDispositivoAtual.mascaraDeVentilacao">
                                Mascara De Ventilacao
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="mascaraDeVentilacao"
                              id="profissional-dispositivo-atual-mascaraDeVentilacao"
                              value={this.state.mascaraDeVentilacao}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'entubacaoOrotraqueal' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="entubacaoOrotraquealLabel" for="profissional-dispositivo-atual-entubacaoOrotraqueal">
                              <Translate contentKey="generadorApp.profissionalDispositivoAtual.entubacaoOrotraqueal">
                                Entubacao Orotraqueal
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="entubacaoOrotraqueal"
                              id="profissional-dispositivo-atual-entubacaoOrotraqueal"
                              value={this.state.entubacaoOrotraqueal}
                            />
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.profissionalDispositivoAtual.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.profissionalDispositivoAtual.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {profissionalDispositivoAtualList && profissionalDispositivoAtualList.length > 0 ? (
                <Table responsive aria-describedby="profissional-dispositivo-atual-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'idProfissional' ? (
                        <th className="hand" onClick={this.sort('idProfissional')}>
                          <Translate contentKey="generadorApp.profissionalDispositivoAtual.idProfissional">Id Profissional</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'tqtTraqueostomia' ? (
                        <th className="hand" onClick={this.sort('tqtTraqueostomia')}>
                          <Translate contentKey="generadorApp.profissionalDispositivoAtual.tqtTraqueostomia">Tqt Traqueostomia</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'gttGastrostomia' ? (
                        <th className="hand" onClick={this.sort('gttGastrostomia')}>
                          <Translate contentKey="generadorApp.profissionalDispositivoAtual.gttGastrostomia">Gtt Gastrostomia</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'sneSondaNasoenteral' ? (
                        <th className="hand" onClick={this.sort('sneSondaNasoenteral')}>
                          <Translate contentKey="generadorApp.profissionalDispositivoAtual.sneSondaNasoenteral">
                            Sne Sonda Nasoenteral
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'svdSondaVesicalDeDemora' ? (
                        <th className="hand" onClick={this.sort('svdSondaVesicalDeDemora')}>
                          <Translate contentKey="generadorApp.profissionalDispositivoAtual.svdSondaVesicalDeDemora">
                            Svd Sonda Vesical De Demora
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'svaSondaVesicalDeAlivio' ? (
                        <th className="hand" onClick={this.sort('svaSondaVesicalDeAlivio')}>
                          <Translate contentKey="generadorApp.profissionalDispositivoAtual.svaSondaVesicalDeAlivio">
                            Sva Sonda Vesical De Alivio
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'portACath' ? (
                        <th className="hand" onClick={this.sort('portACath')}>
                          <Translate contentKey="generadorApp.profissionalDispositivoAtual.portACath">Port A Cath</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'piccAcessoVenosoCentral' ? (
                        <th className="hand" onClick={this.sort('piccAcessoVenosoCentral')}>
                          <Translate contentKey="generadorApp.profissionalDispositivoAtual.piccAcessoVenosoCentral">
                            Picc Acesso Venoso Central
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ventiladores' ? (
                        <th className="hand" onClick={this.sort('ventiladores')}>
                          <Translate contentKey="generadorApp.profissionalDispositivoAtual.ventiladores">Ventiladores</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'uppUlceraPorPressao' ? (
                        <th className="hand" onClick={this.sort('uppUlceraPorPressao')}>
                          <Translate contentKey="generadorApp.profissionalDispositivoAtual.uppUlceraPorPressao">
                            Upp Ulcera Por Pressao
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'avpAcessoVenosoPeriferico' ? (
                        <th className="hand" onClick={this.sort('avpAcessoVenosoPeriferico')}>
                          <Translate contentKey="generadorApp.profissionalDispositivoAtual.avpAcessoVenosoPeriferico">
                            Avp Acesso Venoso Periferico
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'uripen' ? (
                        <th className="hand" onClick={this.sort('uripen')}>
                          <Translate contentKey="generadorApp.profissionalDispositivoAtual.uripen">Uripen</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'fraldaGeriatrica' ? (
                        <th className="hand" onClick={this.sort('fraldaGeriatrica')}>
                          <Translate contentKey="generadorApp.profissionalDispositivoAtual.fraldaGeriatrica">Fralda Geriatrica</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'sngSondaNasogastrica' ? (
                        <th className="hand" onClick={this.sort('sngSondaNasogastrica')}>
                          <Translate contentKey="generadorApp.profissionalDispositivoAtual.sngSondaNasogastrica">
                            Sng Sonda Nasogastrica
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'bipap' ? (
                        <th className="hand" onClick={this.sort('bipap')}>
                          <Translate contentKey="generadorApp.profissionalDispositivoAtual.bipap">Bipap</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cpap' ? (
                        <th className="hand" onClick={this.sort('cpap')}>
                          <Translate contentKey="generadorApp.profissionalDispositivoAtual.cpap">Cpap</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cistostomia' ? (
                        <th className="hand" onClick={this.sort('cistostomia')}>
                          <Translate contentKey="generadorApp.profissionalDispositivoAtual.cistostomia">Cistostomia</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cateterNasalDeOxigenio' ? (
                        <th className="hand" onClick={this.sort('cateterNasalDeOxigenio')}>
                          <Translate contentKey="generadorApp.profissionalDispositivoAtual.cateterNasalDeOxigenio">
                            Cateter Nasal De Oxigenio
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'mascaraDeVentilacao' ? (
                        <th className="hand" onClick={this.sort('mascaraDeVentilacao')}>
                          <Translate contentKey="generadorApp.profissionalDispositivoAtual.mascaraDeVentilacao">
                            Mascara De Ventilacao
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'entubacaoOrotraqueal' ? (
                        <th className="hand" onClick={this.sort('entubacaoOrotraqueal')}>
                          <Translate contentKey="generadorApp.profissionalDispositivoAtual.entubacaoOrotraqueal">
                            Entubacao Orotraqueal
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {profissionalDispositivoAtualList.map((profissionalDispositivoAtual, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${profissionalDispositivoAtual.id}`} color="link" size="sm">
                            {profissionalDispositivoAtual.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'idProfissional' ? <td>{profissionalDispositivoAtual.idProfissional}</td> : null}

                        {this.state.baseFilters !== 'tqtTraqueostomia' ? <td>{profissionalDispositivoAtual.tqtTraqueostomia}</td> : null}

                        {this.state.baseFilters !== 'gttGastrostomia' ? <td>{profissionalDispositivoAtual.gttGastrostomia}</td> : null}

                        {this.state.baseFilters !== 'sneSondaNasoenteral' ? (
                          <td>{profissionalDispositivoAtual.sneSondaNasoenteral}</td>
                        ) : null}

                        {this.state.baseFilters !== 'svdSondaVesicalDeDemora' ? (
                          <td>{profissionalDispositivoAtual.svdSondaVesicalDeDemora}</td>
                        ) : null}

                        {this.state.baseFilters !== 'svaSondaVesicalDeAlivio' ? (
                          <td>{profissionalDispositivoAtual.svaSondaVesicalDeAlivio}</td>
                        ) : null}

                        {this.state.baseFilters !== 'portACath' ? <td>{profissionalDispositivoAtual.portACath}</td> : null}

                        {this.state.baseFilters !== 'piccAcessoVenosoCentral' ? (
                          <td>{profissionalDispositivoAtual.piccAcessoVenosoCentral}</td>
                        ) : null}

                        {this.state.baseFilters !== 'ventiladores' ? <td>{profissionalDispositivoAtual.ventiladores}</td> : null}

                        {this.state.baseFilters !== 'uppUlceraPorPressao' ? (
                          <td>{profissionalDispositivoAtual.uppUlceraPorPressao}</td>
                        ) : null}

                        {this.state.baseFilters !== 'avpAcessoVenosoPeriferico' ? (
                          <td>{profissionalDispositivoAtual.avpAcessoVenosoPeriferico}</td>
                        ) : null}

                        {this.state.baseFilters !== 'uripen' ? <td>{profissionalDispositivoAtual.uripen}</td> : null}

                        {this.state.baseFilters !== 'fraldaGeriatrica' ? <td>{profissionalDispositivoAtual.fraldaGeriatrica}</td> : null}

                        {this.state.baseFilters !== 'sngSondaNasogastrica' ? (
                          <td>{profissionalDispositivoAtual.sngSondaNasogastrica}</td>
                        ) : null}

                        {this.state.baseFilters !== 'bipap' ? <td>{profissionalDispositivoAtual.bipap}</td> : null}

                        {this.state.baseFilters !== 'cpap' ? <td>{profissionalDispositivoAtual.cpap}</td> : null}

                        {this.state.baseFilters !== 'cistostomia' ? <td>{profissionalDispositivoAtual.cistostomia}</td> : null}

                        {this.state.baseFilters !== 'cateterNasalDeOxigenio' ? (
                          <td>{profissionalDispositivoAtual.cateterNasalDeOxigenio}</td>
                        ) : null}

                        {this.state.baseFilters !== 'mascaraDeVentilacao' ? (
                          <td>{profissionalDispositivoAtual.mascaraDeVentilacao}</td>
                        ) : null}

                        {this.state.baseFilters !== 'entubacaoOrotraqueal' ? (
                          <td>{profissionalDispositivoAtual.entubacaoOrotraqueal}</td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button
                              tag={Link}
                              to={`${match.url}/${profissionalDispositivoAtual.id}?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${profissionalDispositivoAtual.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${profissionalDispositivoAtual.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.profissionalDispositivoAtual.home.notFound">
                    No Profissional Dispositivo Atuals found
                  </Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={profissionalDispositivoAtualList && profissionalDispositivoAtualList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ profissionalDispositivoAtual, ...storeState }: IRootState) => ({
  profissionalDispositivoAtualList: profissionalDispositivoAtual.entities,
  totalItems: profissionalDispositivoAtual.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalDispositivoAtual);
