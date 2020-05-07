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
import { getUsuarioPainelGerencialState, IUsuarioPainelGerencialBaseState, getEntities } from './usuario-painel-gerencial.reducer';
import { IUsuarioPainelGerencial } from 'app/shared/model/usuario-painel-gerencial.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IUsuarioPainelGerencialProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IUsuarioPainelGerencialState extends IUsuarioPainelGerencialBaseState, IPaginationBaseState {}

export class UsuarioPainelGerencial extends React.Component<IUsuarioPainelGerencialProps, IUsuarioPainelGerencialState> {
  private myFormRef: any;

  constructor(props: IUsuarioPainelGerencialProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getUsuarioPainelGerencialState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        verCronicos: '',
        verPacientesAtivosCr: '',
        filtroPacientesAtivosCr: '',
        verNumHospCr: '',
        filtroNumHospCr: '',
        verNumDesospCr: '',
        filtroNumDesospCr: '',
        verNumPsCr: '',
        filtroNumPsCr: '',
        verNumObitoCr: '',
        filtroNumObitoCr: '',
        verIndCliEstaveisCr: '',
        filtroIndCliEstaveisCr: '',
        verNumConsMedInternasCr: '',
        filtroNumConsMedInternasCr: '',
        verNumConsMedExternasCr: '',
        filtroNumConsMedExternasCr: '',
        verNumLaboratorialCr: '',
        filtroNumLaboratorialCr: '',
        verNumImagemCr: '',
        filtroNumImagemCr: '',
        verNumOutrosCr: '',
        filtroNumOutrosCr: '',
        verNumAtCatCr: '',
        filtroNumAtCatCr: '',
        verNumCatCompCr: '',
        filtroNumCatCompCr: '',
        verAtCmSucessoCr: '',
        filtroAtCmSucessoCr: '',
        verMediaPadAbertoCr: '',
        filtroMediaPadAbertoCr: '',
        verAtIntercorrenciaCr: '',
        filtroAtIntercorrenciaCr: '',
        verTempoMedioAtCr: '',
        filtroTempoMedioAtCr: '',
        verMediaPtaCr: '',
        filtroMediaPtaCr: '',
        verIndicadorUsoAppCr: '',
        filtroIndicadorUsoAppCr: ''
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
      'verCronicos=' +
      this.state.verCronicos +
      '&' +
      'verPacientesAtivosCr=' +
      this.state.verPacientesAtivosCr +
      '&' +
      'filtroPacientesAtivosCr=' +
      this.state.filtroPacientesAtivosCr +
      '&' +
      'verNumHospCr=' +
      this.state.verNumHospCr +
      '&' +
      'filtroNumHospCr=' +
      this.state.filtroNumHospCr +
      '&' +
      'verNumDesospCr=' +
      this.state.verNumDesospCr +
      '&' +
      'filtroNumDesospCr=' +
      this.state.filtroNumDesospCr +
      '&' +
      'verNumPsCr=' +
      this.state.verNumPsCr +
      '&' +
      'filtroNumPsCr=' +
      this.state.filtroNumPsCr +
      '&' +
      'verNumObitoCr=' +
      this.state.verNumObitoCr +
      '&' +
      'filtroNumObitoCr=' +
      this.state.filtroNumObitoCr +
      '&' +
      'verIndCliEstaveisCr=' +
      this.state.verIndCliEstaveisCr +
      '&' +
      'filtroIndCliEstaveisCr=' +
      this.state.filtroIndCliEstaveisCr +
      '&' +
      'verNumConsMedInternasCr=' +
      this.state.verNumConsMedInternasCr +
      '&' +
      'filtroNumConsMedInternasCr=' +
      this.state.filtroNumConsMedInternasCr +
      '&' +
      'verNumConsMedExternasCr=' +
      this.state.verNumConsMedExternasCr +
      '&' +
      'filtroNumConsMedExternasCr=' +
      this.state.filtroNumConsMedExternasCr +
      '&' +
      'verNumLaboratorialCr=' +
      this.state.verNumLaboratorialCr +
      '&' +
      'filtroNumLaboratorialCr=' +
      this.state.filtroNumLaboratorialCr +
      '&' +
      'verNumImagemCr=' +
      this.state.verNumImagemCr +
      '&' +
      'filtroNumImagemCr=' +
      this.state.filtroNumImagemCr +
      '&' +
      'verNumOutrosCr=' +
      this.state.verNumOutrosCr +
      '&' +
      'filtroNumOutrosCr=' +
      this.state.filtroNumOutrosCr +
      '&' +
      'verNumAtCatCr=' +
      this.state.verNumAtCatCr +
      '&' +
      'filtroNumAtCatCr=' +
      this.state.filtroNumAtCatCr +
      '&' +
      'verNumCatCompCr=' +
      this.state.verNumCatCompCr +
      '&' +
      'filtroNumCatCompCr=' +
      this.state.filtroNumCatCompCr +
      '&' +
      'verAtCmSucessoCr=' +
      this.state.verAtCmSucessoCr +
      '&' +
      'filtroAtCmSucessoCr=' +
      this.state.filtroAtCmSucessoCr +
      '&' +
      'verMediaPadAbertoCr=' +
      this.state.verMediaPadAbertoCr +
      '&' +
      'filtroMediaPadAbertoCr=' +
      this.state.filtroMediaPadAbertoCr +
      '&' +
      'verAtIntercorrenciaCr=' +
      this.state.verAtIntercorrenciaCr +
      '&' +
      'filtroAtIntercorrenciaCr=' +
      this.state.filtroAtIntercorrenciaCr +
      '&' +
      'verTempoMedioAtCr=' +
      this.state.verTempoMedioAtCr +
      '&' +
      'filtroTempoMedioAtCr=' +
      this.state.filtroTempoMedioAtCr +
      '&' +
      'verMediaPtaCr=' +
      this.state.verMediaPtaCr +
      '&' +
      'filtroMediaPtaCr=' +
      this.state.filtroMediaPtaCr +
      '&' +
      'verIndicadorUsoAppCr=' +
      this.state.verIndicadorUsoAppCr +
      '&' +
      'filtroIndicadorUsoAppCr=' +
      this.state.filtroIndicadorUsoAppCr +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      verCronicos,
      verPacientesAtivosCr,
      filtroPacientesAtivosCr,
      verNumHospCr,
      filtroNumHospCr,
      verNumDesospCr,
      filtroNumDesospCr,
      verNumPsCr,
      filtroNumPsCr,
      verNumObitoCr,
      filtroNumObitoCr,
      verIndCliEstaveisCr,
      filtroIndCliEstaveisCr,
      verNumConsMedInternasCr,
      filtroNumConsMedInternasCr,
      verNumConsMedExternasCr,
      filtroNumConsMedExternasCr,
      verNumLaboratorialCr,
      filtroNumLaboratorialCr,
      verNumImagemCr,
      filtroNumImagemCr,
      verNumOutrosCr,
      filtroNumOutrosCr,
      verNumAtCatCr,
      filtroNumAtCatCr,
      verNumCatCompCr,
      filtroNumCatCompCr,
      verAtCmSucessoCr,
      filtroAtCmSucessoCr,
      verMediaPadAbertoCr,
      filtroMediaPadAbertoCr,
      verAtIntercorrenciaCr,
      filtroAtIntercorrenciaCr,
      verTempoMedioAtCr,
      filtroTempoMedioAtCr,
      verMediaPtaCr,
      filtroMediaPtaCr,
      verIndicadorUsoAppCr,
      filtroIndicadorUsoAppCr,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      verCronicos,
      verPacientesAtivosCr,
      filtroPacientesAtivosCr,
      verNumHospCr,
      filtroNumHospCr,
      verNumDesospCr,
      filtroNumDesospCr,
      verNumPsCr,
      filtroNumPsCr,
      verNumObitoCr,
      filtroNumObitoCr,
      verIndCliEstaveisCr,
      filtroIndCliEstaveisCr,
      verNumConsMedInternasCr,
      filtroNumConsMedInternasCr,
      verNumConsMedExternasCr,
      filtroNumConsMedExternasCr,
      verNumLaboratorialCr,
      filtroNumLaboratorialCr,
      verNumImagemCr,
      filtroNumImagemCr,
      verNumOutrosCr,
      filtroNumOutrosCr,
      verNumAtCatCr,
      filtroNumAtCatCr,
      verNumCatCompCr,
      filtroNumCatCompCr,
      verAtCmSucessoCr,
      filtroAtCmSucessoCr,
      verMediaPadAbertoCr,
      filtroMediaPadAbertoCr,
      verAtIntercorrenciaCr,
      filtroAtIntercorrenciaCr,
      verTempoMedioAtCr,
      filtroTempoMedioAtCr,
      verMediaPtaCr,
      filtroMediaPtaCr,
      verIndicadorUsoAppCr,
      filtroIndicadorUsoAppCr,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { usuarioPainelGerencialList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Usuario Painel Gerencials</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Usuario Painel Gerencials</span>
              <Button id="togglerFilterUsuarioPainelGerencial" className="btn btn-primary float-right jh-create-entity">
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
                <Translate contentKey="generadorApp.usuarioPainelGerencial.home.createLabel">
                  Create a new Usuario Painel Gerencial
                </Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterUsuarioPainelGerencial">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'verCronicos' ? (
                        <Col md="3">
                          <Row>
                            <Label id="verCronicosLabel" for="usuario-painel-gerencial-verCronicos">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.verCronicos">Ver Cronicos</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="verCronicos"
                              id="usuario-painel-gerencial-verCronicos"
                              value={this.state.verCronicos}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verPacientesAtivosCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="verPacientesAtivosCrLabel" for="usuario-painel-gerencial-verPacientesAtivosCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.verPacientesAtivosCr">
                                Ver Pacientes Ativos Cr
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="verPacientesAtivosCr"
                              id="usuario-painel-gerencial-verPacientesAtivosCr"
                              value={this.state.verPacientesAtivosCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'filtroPacientesAtivosCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="filtroPacientesAtivosCrLabel" for="usuario-painel-gerencial-filtroPacientesAtivosCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroPacientesAtivosCr">
                                Filtro Pacientes Ativos Cr
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="filtroPacientesAtivosCr"
                              id="usuario-painel-gerencial-filtroPacientesAtivosCr"
                              value={this.state.filtroPacientesAtivosCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verNumHospCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="verNumHospCrLabel" for="usuario-painel-gerencial-verNumHospCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumHospCr">Ver Num Hosp Cr</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="verNumHospCr"
                              id="usuario-painel-gerencial-verNumHospCr"
                              value={this.state.verNumHospCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'filtroNumHospCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="filtroNumHospCrLabel" for="usuario-painel-gerencial-filtroNumHospCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumHospCr">Filtro Num Hosp Cr</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="filtroNumHospCr"
                              id="usuario-painel-gerencial-filtroNumHospCr"
                              value={this.state.filtroNumHospCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verNumDesospCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="verNumDesospCrLabel" for="usuario-painel-gerencial-verNumDesospCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumDesospCr">Ver Num Desosp Cr</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="verNumDesospCr"
                              id="usuario-painel-gerencial-verNumDesospCr"
                              value={this.state.verNumDesospCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'filtroNumDesospCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="filtroNumDesospCrLabel" for="usuario-painel-gerencial-filtroNumDesospCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumDesospCr">Filtro Num Desosp Cr</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="filtroNumDesospCr"
                              id="usuario-painel-gerencial-filtroNumDesospCr"
                              value={this.state.filtroNumDesospCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verNumPsCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="verNumPsCrLabel" for="usuario-painel-gerencial-verNumPsCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumPsCr">Ver Num Ps Cr</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="verNumPsCr"
                              id="usuario-painel-gerencial-verNumPsCr"
                              value={this.state.verNumPsCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'filtroNumPsCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="filtroNumPsCrLabel" for="usuario-painel-gerencial-filtroNumPsCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumPsCr">Filtro Num Ps Cr</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="filtroNumPsCr"
                              id="usuario-painel-gerencial-filtroNumPsCr"
                              value={this.state.filtroNumPsCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verNumObitoCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="verNumObitoCrLabel" for="usuario-painel-gerencial-verNumObitoCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumObitoCr">Ver Num Obito Cr</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="verNumObitoCr"
                              id="usuario-painel-gerencial-verNumObitoCr"
                              value={this.state.verNumObitoCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'filtroNumObitoCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="filtroNumObitoCrLabel" for="usuario-painel-gerencial-filtroNumObitoCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumObitoCr">Filtro Num Obito Cr</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="filtroNumObitoCr"
                              id="usuario-painel-gerencial-filtroNumObitoCr"
                              value={this.state.filtroNumObitoCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verIndCliEstaveisCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="verIndCliEstaveisCrLabel" for="usuario-painel-gerencial-verIndCliEstaveisCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.verIndCliEstaveisCr">
                                Ver Ind Cli Estaveis Cr
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="verIndCliEstaveisCr"
                              id="usuario-painel-gerencial-verIndCliEstaveisCr"
                              value={this.state.verIndCliEstaveisCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'filtroIndCliEstaveisCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="filtroIndCliEstaveisCrLabel" for="usuario-painel-gerencial-filtroIndCliEstaveisCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroIndCliEstaveisCr">
                                Filtro Ind Cli Estaveis Cr
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="filtroIndCliEstaveisCr"
                              id="usuario-painel-gerencial-filtroIndCliEstaveisCr"
                              value={this.state.filtroIndCliEstaveisCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verNumConsMedInternasCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="verNumConsMedInternasCrLabel" for="usuario-painel-gerencial-verNumConsMedInternasCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumConsMedInternasCr">
                                Ver Num Cons Med Internas Cr
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="verNumConsMedInternasCr"
                              id="usuario-painel-gerencial-verNumConsMedInternasCr"
                              value={this.state.verNumConsMedInternasCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'filtroNumConsMedInternasCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="filtroNumConsMedInternasCrLabel" for="usuario-painel-gerencial-filtroNumConsMedInternasCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumConsMedInternasCr">
                                Filtro Num Cons Med Internas Cr
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="filtroNumConsMedInternasCr"
                              id="usuario-painel-gerencial-filtroNumConsMedInternasCr"
                              value={this.state.filtroNumConsMedInternasCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verNumConsMedExternasCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="verNumConsMedExternasCrLabel" for="usuario-painel-gerencial-verNumConsMedExternasCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumConsMedExternasCr">
                                Ver Num Cons Med Externas Cr
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="verNumConsMedExternasCr"
                              id="usuario-painel-gerencial-verNumConsMedExternasCr"
                              value={this.state.verNumConsMedExternasCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'filtroNumConsMedExternasCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="filtroNumConsMedExternasCrLabel" for="usuario-painel-gerencial-filtroNumConsMedExternasCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumConsMedExternasCr">
                                Filtro Num Cons Med Externas Cr
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="filtroNumConsMedExternasCr"
                              id="usuario-painel-gerencial-filtroNumConsMedExternasCr"
                              value={this.state.filtroNumConsMedExternasCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verNumLaboratorialCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="verNumLaboratorialCrLabel" for="usuario-painel-gerencial-verNumLaboratorialCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumLaboratorialCr">
                                Ver Num Laboratorial Cr
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="verNumLaboratorialCr"
                              id="usuario-painel-gerencial-verNumLaboratorialCr"
                              value={this.state.verNumLaboratorialCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'filtroNumLaboratorialCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="filtroNumLaboratorialCrLabel" for="usuario-painel-gerencial-filtroNumLaboratorialCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumLaboratorialCr">
                                Filtro Num Laboratorial Cr
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="filtroNumLaboratorialCr"
                              id="usuario-painel-gerencial-filtroNumLaboratorialCr"
                              value={this.state.filtroNumLaboratorialCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verNumImagemCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="verNumImagemCrLabel" for="usuario-painel-gerencial-verNumImagemCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumImagemCr">Ver Num Imagem Cr</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="verNumImagemCr"
                              id="usuario-painel-gerencial-verNumImagemCr"
                              value={this.state.verNumImagemCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'filtroNumImagemCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="filtroNumImagemCrLabel" for="usuario-painel-gerencial-filtroNumImagemCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumImagemCr">Filtro Num Imagem Cr</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="filtroNumImagemCr"
                              id="usuario-painel-gerencial-filtroNumImagemCr"
                              value={this.state.filtroNumImagemCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verNumOutrosCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="verNumOutrosCrLabel" for="usuario-painel-gerencial-verNumOutrosCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumOutrosCr">Ver Num Outros Cr</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="verNumOutrosCr"
                              id="usuario-painel-gerencial-verNumOutrosCr"
                              value={this.state.verNumOutrosCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'filtroNumOutrosCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="filtroNumOutrosCrLabel" for="usuario-painel-gerencial-filtroNumOutrosCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumOutrosCr">Filtro Num Outros Cr</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="filtroNumOutrosCr"
                              id="usuario-painel-gerencial-filtroNumOutrosCr"
                              value={this.state.filtroNumOutrosCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verNumAtCatCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="verNumAtCatCrLabel" for="usuario-painel-gerencial-verNumAtCatCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumAtCatCr">Ver Num At Cat Cr</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="verNumAtCatCr"
                              id="usuario-painel-gerencial-verNumAtCatCr"
                              value={this.state.verNumAtCatCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'filtroNumAtCatCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="filtroNumAtCatCrLabel" for="usuario-painel-gerencial-filtroNumAtCatCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumAtCatCr">Filtro Num At Cat Cr</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="filtroNumAtCatCr"
                              id="usuario-painel-gerencial-filtroNumAtCatCr"
                              value={this.state.filtroNumAtCatCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verNumCatCompCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="verNumCatCompCrLabel" for="usuario-painel-gerencial-verNumCatCompCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumCatCompCr">Ver Num Cat Comp Cr</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="verNumCatCompCr"
                              id="usuario-painel-gerencial-verNumCatCompCr"
                              value={this.state.verNumCatCompCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'filtroNumCatCompCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="filtroNumCatCompCrLabel" for="usuario-painel-gerencial-filtroNumCatCompCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumCatCompCr">
                                Filtro Num Cat Comp Cr
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="filtroNumCatCompCr"
                              id="usuario-painel-gerencial-filtroNumCatCompCr"
                              value={this.state.filtroNumCatCompCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verAtCmSucessoCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="verAtCmSucessoCrLabel" for="usuario-painel-gerencial-verAtCmSucessoCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.verAtCmSucessoCr">Ver At Cm Sucesso Cr</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="verAtCmSucessoCr"
                              id="usuario-painel-gerencial-verAtCmSucessoCr"
                              value={this.state.verAtCmSucessoCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'filtroAtCmSucessoCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="filtroAtCmSucessoCrLabel" for="usuario-painel-gerencial-filtroAtCmSucessoCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroAtCmSucessoCr">
                                Filtro At Cm Sucesso Cr
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="filtroAtCmSucessoCr"
                              id="usuario-painel-gerencial-filtroAtCmSucessoCr"
                              value={this.state.filtroAtCmSucessoCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verMediaPadAbertoCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="verMediaPadAbertoCrLabel" for="usuario-painel-gerencial-verMediaPadAbertoCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.verMediaPadAbertoCr">
                                Ver Media Pad Aberto Cr
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="verMediaPadAbertoCr"
                              id="usuario-painel-gerencial-verMediaPadAbertoCr"
                              value={this.state.verMediaPadAbertoCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'filtroMediaPadAbertoCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="filtroMediaPadAbertoCrLabel" for="usuario-painel-gerencial-filtroMediaPadAbertoCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroMediaPadAbertoCr">
                                Filtro Media Pad Aberto Cr
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="filtroMediaPadAbertoCr"
                              id="usuario-painel-gerencial-filtroMediaPadAbertoCr"
                              value={this.state.filtroMediaPadAbertoCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verAtIntercorrenciaCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="verAtIntercorrenciaCrLabel" for="usuario-painel-gerencial-verAtIntercorrenciaCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.verAtIntercorrenciaCr">
                                Ver At Intercorrencia Cr
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="verAtIntercorrenciaCr"
                              id="usuario-painel-gerencial-verAtIntercorrenciaCr"
                              value={this.state.verAtIntercorrenciaCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'filtroAtIntercorrenciaCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="filtroAtIntercorrenciaCrLabel" for="usuario-painel-gerencial-filtroAtIntercorrenciaCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroAtIntercorrenciaCr">
                                Filtro At Intercorrencia Cr
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="filtroAtIntercorrenciaCr"
                              id="usuario-painel-gerencial-filtroAtIntercorrenciaCr"
                              value={this.state.filtroAtIntercorrenciaCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verTempoMedioAtCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="verTempoMedioAtCrLabel" for="usuario-painel-gerencial-verTempoMedioAtCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.verTempoMedioAtCr">
                                Ver Tempo Medio At Cr
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="verTempoMedioAtCr"
                              id="usuario-painel-gerencial-verTempoMedioAtCr"
                              value={this.state.verTempoMedioAtCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'filtroTempoMedioAtCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="filtroTempoMedioAtCrLabel" for="usuario-painel-gerencial-filtroTempoMedioAtCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroTempoMedioAtCr">
                                Filtro Tempo Medio At Cr
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="filtroTempoMedioAtCr"
                              id="usuario-painel-gerencial-filtroTempoMedioAtCr"
                              value={this.state.filtroTempoMedioAtCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verMediaPtaCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="verMediaPtaCrLabel" for="usuario-painel-gerencial-verMediaPtaCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.verMediaPtaCr">Ver Media Pta Cr</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="verMediaPtaCr"
                              id="usuario-painel-gerencial-verMediaPtaCr"
                              value={this.state.verMediaPtaCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'filtroMediaPtaCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="filtroMediaPtaCrLabel" for="usuario-painel-gerencial-filtroMediaPtaCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroMediaPtaCr">Filtro Media Pta Cr</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="filtroMediaPtaCr"
                              id="usuario-painel-gerencial-filtroMediaPtaCr"
                              value={this.state.filtroMediaPtaCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'verIndicadorUsoAppCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="verIndicadorUsoAppCrLabel" for="usuario-painel-gerencial-verIndicadorUsoAppCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.verIndicadorUsoAppCr">
                                Ver Indicador Uso App Cr
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="verIndicadorUsoAppCr"
                              id="usuario-painel-gerencial-verIndicadorUsoAppCr"
                              value={this.state.verIndicadorUsoAppCr}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'filtroIndicadorUsoAppCr' ? (
                        <Col md="3">
                          <Row>
                            <Label id="filtroIndicadorUsoAppCrLabel" for="usuario-painel-gerencial-filtroIndicadorUsoAppCr">
                              <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroIndicadorUsoAppCr">
                                Filtro Indicador Uso App Cr
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="filtroIndicadorUsoAppCr"
                              id="usuario-painel-gerencial-filtroIndicadorUsoAppCr"
                              value={this.state.filtroIndicadorUsoAppCr}
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

              {usuarioPainelGerencialList && usuarioPainelGerencialList.length > 0 ? (
                <Table responsive aria-describedby="usuario-painel-gerencial-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'verCronicos' ? (
                        <th className="hand" onClick={this.sort('verCronicos')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.verCronicos">Ver Cronicos</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verPacientesAtivosCr' ? (
                        <th className="hand" onClick={this.sort('verPacientesAtivosCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.verPacientesAtivosCr">
                            Ver Pacientes Ativos Cr
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'filtroPacientesAtivosCr' ? (
                        <th className="hand" onClick={this.sort('filtroPacientesAtivosCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroPacientesAtivosCr">
                            Filtro Pacientes Ativos Cr
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verNumHospCr' ? (
                        <th className="hand" onClick={this.sort('verNumHospCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumHospCr">Ver Num Hosp Cr</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'filtroNumHospCr' ? (
                        <th className="hand" onClick={this.sort('filtroNumHospCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumHospCr">Filtro Num Hosp Cr</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verNumDesospCr' ? (
                        <th className="hand" onClick={this.sort('verNumDesospCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumDesospCr">Ver Num Desosp Cr</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'filtroNumDesospCr' ? (
                        <th className="hand" onClick={this.sort('filtroNumDesospCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumDesospCr">Filtro Num Desosp Cr</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verNumPsCr' ? (
                        <th className="hand" onClick={this.sort('verNumPsCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumPsCr">Ver Num Ps Cr</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'filtroNumPsCr' ? (
                        <th className="hand" onClick={this.sort('filtroNumPsCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumPsCr">Filtro Num Ps Cr</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verNumObitoCr' ? (
                        <th className="hand" onClick={this.sort('verNumObitoCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumObitoCr">Ver Num Obito Cr</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'filtroNumObitoCr' ? (
                        <th className="hand" onClick={this.sort('filtroNumObitoCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumObitoCr">Filtro Num Obito Cr</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verIndCliEstaveisCr' ? (
                        <th className="hand" onClick={this.sort('verIndCliEstaveisCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.verIndCliEstaveisCr">
                            Ver Ind Cli Estaveis Cr
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'filtroIndCliEstaveisCr' ? (
                        <th className="hand" onClick={this.sort('filtroIndCliEstaveisCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroIndCliEstaveisCr">
                            Filtro Ind Cli Estaveis Cr
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verNumConsMedInternasCr' ? (
                        <th className="hand" onClick={this.sort('verNumConsMedInternasCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumConsMedInternasCr">
                            Ver Num Cons Med Internas Cr
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'filtroNumConsMedInternasCr' ? (
                        <th className="hand" onClick={this.sort('filtroNumConsMedInternasCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumConsMedInternasCr">
                            Filtro Num Cons Med Internas Cr
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verNumConsMedExternasCr' ? (
                        <th className="hand" onClick={this.sort('verNumConsMedExternasCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumConsMedExternasCr">
                            Ver Num Cons Med Externas Cr
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'filtroNumConsMedExternasCr' ? (
                        <th className="hand" onClick={this.sort('filtroNumConsMedExternasCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumConsMedExternasCr">
                            Filtro Num Cons Med Externas Cr
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verNumLaboratorialCr' ? (
                        <th className="hand" onClick={this.sort('verNumLaboratorialCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumLaboratorialCr">
                            Ver Num Laboratorial Cr
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'filtroNumLaboratorialCr' ? (
                        <th className="hand" onClick={this.sort('filtroNumLaboratorialCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumLaboratorialCr">
                            Filtro Num Laboratorial Cr
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verNumImagemCr' ? (
                        <th className="hand" onClick={this.sort('verNumImagemCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumImagemCr">Ver Num Imagem Cr</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'filtroNumImagemCr' ? (
                        <th className="hand" onClick={this.sort('filtroNumImagemCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumImagemCr">Filtro Num Imagem Cr</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verNumOutrosCr' ? (
                        <th className="hand" onClick={this.sort('verNumOutrosCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumOutrosCr">Ver Num Outros Cr</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'filtroNumOutrosCr' ? (
                        <th className="hand" onClick={this.sort('filtroNumOutrosCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumOutrosCr">Filtro Num Outros Cr</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verNumAtCatCr' ? (
                        <th className="hand" onClick={this.sort('verNumAtCatCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumAtCatCr">Ver Num At Cat Cr</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'filtroNumAtCatCr' ? (
                        <th className="hand" onClick={this.sort('filtroNumAtCatCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumAtCatCr">Filtro Num At Cat Cr</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verNumCatCompCr' ? (
                        <th className="hand" onClick={this.sort('verNumCatCompCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumCatCompCr">Ver Num Cat Comp Cr</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'filtroNumCatCompCr' ? (
                        <th className="hand" onClick={this.sort('filtroNumCatCompCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumCatCompCr">Filtro Num Cat Comp Cr</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verAtCmSucessoCr' ? (
                        <th className="hand" onClick={this.sort('verAtCmSucessoCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.verAtCmSucessoCr">Ver At Cm Sucesso Cr</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'filtroAtCmSucessoCr' ? (
                        <th className="hand" onClick={this.sort('filtroAtCmSucessoCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroAtCmSucessoCr">
                            Filtro At Cm Sucesso Cr
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verMediaPadAbertoCr' ? (
                        <th className="hand" onClick={this.sort('verMediaPadAbertoCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.verMediaPadAbertoCr">
                            Ver Media Pad Aberto Cr
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'filtroMediaPadAbertoCr' ? (
                        <th className="hand" onClick={this.sort('filtroMediaPadAbertoCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroMediaPadAbertoCr">
                            Filtro Media Pad Aberto Cr
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verAtIntercorrenciaCr' ? (
                        <th className="hand" onClick={this.sort('verAtIntercorrenciaCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.verAtIntercorrenciaCr">
                            Ver At Intercorrencia Cr
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'filtroAtIntercorrenciaCr' ? (
                        <th className="hand" onClick={this.sort('filtroAtIntercorrenciaCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroAtIntercorrenciaCr">
                            Filtro At Intercorrencia Cr
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verTempoMedioAtCr' ? (
                        <th className="hand" onClick={this.sort('verTempoMedioAtCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.verTempoMedioAtCr">Ver Tempo Medio At Cr</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'filtroTempoMedioAtCr' ? (
                        <th className="hand" onClick={this.sort('filtroTempoMedioAtCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroTempoMedioAtCr">
                            Filtro Tempo Medio At Cr
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verMediaPtaCr' ? (
                        <th className="hand" onClick={this.sort('verMediaPtaCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.verMediaPtaCr">Ver Media Pta Cr</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'filtroMediaPtaCr' ? (
                        <th className="hand" onClick={this.sort('filtroMediaPtaCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroMediaPtaCr">Filtro Media Pta Cr</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'verIndicadorUsoAppCr' ? (
                        <th className="hand" onClick={this.sort('verIndicadorUsoAppCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.verIndicadorUsoAppCr">
                            Ver Indicador Uso App Cr
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'filtroIndicadorUsoAppCr' ? (
                        <th className="hand" onClick={this.sort('filtroIndicadorUsoAppCr')}>
                          <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroIndicadorUsoAppCr">
                            Filtro Indicador Uso App Cr
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {usuarioPainelGerencialList.map((usuarioPainelGerencial, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${usuarioPainelGerencial.id}`} color="link" size="sm">
                            {usuarioPainelGerencial.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'verCronicos' ? <td>{usuarioPainelGerencial.verCronicos}</td> : null}

                        {this.state.baseFilters !== 'verPacientesAtivosCr' ? <td>{usuarioPainelGerencial.verPacientesAtivosCr}</td> : null}

                        {this.state.baseFilters !== 'filtroPacientesAtivosCr' ? (
                          <td>{usuarioPainelGerencial.filtroPacientesAtivosCr}</td>
                        ) : null}

                        {this.state.baseFilters !== 'verNumHospCr' ? <td>{usuarioPainelGerencial.verNumHospCr}</td> : null}

                        {this.state.baseFilters !== 'filtroNumHospCr' ? <td>{usuarioPainelGerencial.filtroNumHospCr}</td> : null}

                        {this.state.baseFilters !== 'verNumDesospCr' ? <td>{usuarioPainelGerencial.verNumDesospCr}</td> : null}

                        {this.state.baseFilters !== 'filtroNumDesospCr' ? <td>{usuarioPainelGerencial.filtroNumDesospCr}</td> : null}

                        {this.state.baseFilters !== 'verNumPsCr' ? <td>{usuarioPainelGerencial.verNumPsCr}</td> : null}

                        {this.state.baseFilters !== 'filtroNumPsCr' ? <td>{usuarioPainelGerencial.filtroNumPsCr}</td> : null}

                        {this.state.baseFilters !== 'verNumObitoCr' ? <td>{usuarioPainelGerencial.verNumObitoCr}</td> : null}

                        {this.state.baseFilters !== 'filtroNumObitoCr' ? <td>{usuarioPainelGerencial.filtroNumObitoCr}</td> : null}

                        {this.state.baseFilters !== 'verIndCliEstaveisCr' ? <td>{usuarioPainelGerencial.verIndCliEstaveisCr}</td> : null}

                        {this.state.baseFilters !== 'filtroIndCliEstaveisCr' ? (
                          <td>{usuarioPainelGerencial.filtroIndCliEstaveisCr}</td>
                        ) : null}

                        {this.state.baseFilters !== 'verNumConsMedInternasCr' ? (
                          <td>{usuarioPainelGerencial.verNumConsMedInternasCr}</td>
                        ) : null}

                        {this.state.baseFilters !== 'filtroNumConsMedInternasCr' ? (
                          <td>{usuarioPainelGerencial.filtroNumConsMedInternasCr}</td>
                        ) : null}

                        {this.state.baseFilters !== 'verNumConsMedExternasCr' ? (
                          <td>{usuarioPainelGerencial.verNumConsMedExternasCr}</td>
                        ) : null}

                        {this.state.baseFilters !== 'filtroNumConsMedExternasCr' ? (
                          <td>{usuarioPainelGerencial.filtroNumConsMedExternasCr}</td>
                        ) : null}

                        {this.state.baseFilters !== 'verNumLaboratorialCr' ? <td>{usuarioPainelGerencial.verNumLaboratorialCr}</td> : null}

                        {this.state.baseFilters !== 'filtroNumLaboratorialCr' ? (
                          <td>{usuarioPainelGerencial.filtroNumLaboratorialCr}</td>
                        ) : null}

                        {this.state.baseFilters !== 'verNumImagemCr' ? <td>{usuarioPainelGerencial.verNumImagemCr}</td> : null}

                        {this.state.baseFilters !== 'filtroNumImagemCr' ? <td>{usuarioPainelGerencial.filtroNumImagemCr}</td> : null}

                        {this.state.baseFilters !== 'verNumOutrosCr' ? <td>{usuarioPainelGerencial.verNumOutrosCr}</td> : null}

                        {this.state.baseFilters !== 'filtroNumOutrosCr' ? <td>{usuarioPainelGerencial.filtroNumOutrosCr}</td> : null}

                        {this.state.baseFilters !== 'verNumAtCatCr' ? <td>{usuarioPainelGerencial.verNumAtCatCr}</td> : null}

                        {this.state.baseFilters !== 'filtroNumAtCatCr' ? <td>{usuarioPainelGerencial.filtroNumAtCatCr}</td> : null}

                        {this.state.baseFilters !== 'verNumCatCompCr' ? <td>{usuarioPainelGerencial.verNumCatCompCr}</td> : null}

                        {this.state.baseFilters !== 'filtroNumCatCompCr' ? <td>{usuarioPainelGerencial.filtroNumCatCompCr}</td> : null}

                        {this.state.baseFilters !== 'verAtCmSucessoCr' ? <td>{usuarioPainelGerencial.verAtCmSucessoCr}</td> : null}

                        {this.state.baseFilters !== 'filtroAtCmSucessoCr' ? <td>{usuarioPainelGerencial.filtroAtCmSucessoCr}</td> : null}

                        {this.state.baseFilters !== 'verMediaPadAbertoCr' ? <td>{usuarioPainelGerencial.verMediaPadAbertoCr}</td> : null}

                        {this.state.baseFilters !== 'filtroMediaPadAbertoCr' ? (
                          <td>{usuarioPainelGerencial.filtroMediaPadAbertoCr}</td>
                        ) : null}

                        {this.state.baseFilters !== 'verAtIntercorrenciaCr' ? (
                          <td>{usuarioPainelGerencial.verAtIntercorrenciaCr}</td>
                        ) : null}

                        {this.state.baseFilters !== 'filtroAtIntercorrenciaCr' ? (
                          <td>{usuarioPainelGerencial.filtroAtIntercorrenciaCr}</td>
                        ) : null}

                        {this.state.baseFilters !== 'verTempoMedioAtCr' ? <td>{usuarioPainelGerencial.verTempoMedioAtCr}</td> : null}

                        {this.state.baseFilters !== 'filtroTempoMedioAtCr' ? <td>{usuarioPainelGerencial.filtroTempoMedioAtCr}</td> : null}

                        {this.state.baseFilters !== 'verMediaPtaCr' ? <td>{usuarioPainelGerencial.verMediaPtaCr}</td> : null}

                        {this.state.baseFilters !== 'filtroMediaPtaCr' ? <td>{usuarioPainelGerencial.filtroMediaPtaCr}</td> : null}

                        {this.state.baseFilters !== 'verIndicadorUsoAppCr' ? <td>{usuarioPainelGerencial.verIndicadorUsoAppCr}</td> : null}

                        {this.state.baseFilters !== 'filtroIndicadorUsoAppCr' ? (
                          <td>{usuarioPainelGerencial.filtroIndicadorUsoAppCr}</td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button
                              tag={Link}
                              to={`${match.url}/${usuarioPainelGerencial.id}?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${usuarioPainelGerencial.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${usuarioPainelGerencial.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.usuarioPainelGerencial.home.notFound">No Usuario Painel Gerencials found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={usuarioPainelGerencialList && usuarioPainelGerencialList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ usuarioPainelGerencial, ...storeState }: IRootState) => ({
  usuarioPainelGerencialList: usuarioPainelGerencial.entities,
  totalItems: usuarioPainelGerencial.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UsuarioPainelGerencial);
