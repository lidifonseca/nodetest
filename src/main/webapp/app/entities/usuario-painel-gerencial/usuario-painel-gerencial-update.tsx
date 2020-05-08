/* eslint complexity: ["error", 300] */
import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import {
  IUsuarioPainelGerencialUpdateState,
  getEntity,
  getUsuarioPainelGerencialState,
  IUsuarioPainelGerencialBaseState,
  updateEntity,
  createEntity,
  reset
} from './usuario-painel-gerencial.reducer';
import { IUsuarioPainelGerencial } from 'app/shared/model/usuario-painel-gerencial.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUsuarioPainelGerencialUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class UsuarioPainelGerencialUpdate extends React.Component<IUsuarioPainelGerencialUpdateProps, IUsuarioPainelGerencialUpdateState> {
  constructor(props: Readonly<IUsuarioPainelGerencialUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getUsuarioPainelGerencialState(this.props.location),
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  getFiltersURL = (offset = null) => {
    const fieldsBase = this.state.fieldsBase;
    let url = '_back=1' + (offset !== null ? '&offset=' + offset : '');
    Object.keys(fieldsBase).map(key => {
      url += '&' + key + '=' + fieldsBase[key];
    });
    return url;
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { usuarioPainelGerencialEntity } = this.props;
      const entity = {
        ...usuarioPainelGerencialEntity,

        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/usuario-painel-gerencial?' + this.getFiltersURL());
  };

  render() {
    const { usuarioPainelGerencialEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...usuarioPainelGerencialEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.usuarioPainelGerencial.home.createOrEditLabel">
                Create or edit a UsuarioPainelGerencial
              </Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/usuario-painel-gerencial?' + this.getFiltersURL()}
              replace
              color="info"
              className="float-right jh-create-entity"
            >
              <FontAwesomeIcon icon="arrow-left" />
              &nbsp;
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.back">Back</Translate>
              </span>
            </Button>
          </h2>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Inicio</Link>
            </li>
            <li className="breadcrumb-item active">Usuario Painel Gerencials</li>
            <li className="breadcrumb-item active">Usuario Painel Gerencials edit</li>
          </ol>

          <Panel>
            <PanelBody>
              <Row className="justify-content-center">
                <Col md="8">
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <div>
                      {!isNew ? (
                        <AvGroup>
                          <Row>
                            {/*
                        <Col md="3">
                        <Label className="mt-2" for="usuario-painel-gerencial-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput
                                id="usuario-painel-gerencial-id"
                                type="hidden"
                                className="form-control"
                                name="id"
                                required
                                readOnly
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'verCronicos' ? (
                          <Col md="verCronicos">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="verCronicosLabel" for="usuario-painel-gerencial-verCronicos">
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.verCronicos">Ver Cronicos</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-verCronicos"
                                    type="string"
                                    className="form-control"
                                    name="verCronicos"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verCronicos" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verPacientesAtivosCr' ? (
                          <Col md="verPacientesAtivosCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label
                                    className="mt-2"
                                    id="verPacientesAtivosCrLabel"
                                    for="usuario-painel-gerencial-verPacientesAtivosCr"
                                  >
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.verPacientesAtivosCr">
                                      Ver Pacientes Ativos Cr
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-verPacientesAtivosCr"
                                    type="string"
                                    className="form-control"
                                    name="verPacientesAtivosCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verPacientesAtivosCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'filtroPacientesAtivosCr' ? (
                          <Col md="filtroPacientesAtivosCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label
                                    className="mt-2"
                                    id="filtroPacientesAtivosCrLabel"
                                    for="usuario-painel-gerencial-filtroPacientesAtivosCr"
                                  >
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroPacientesAtivosCr">
                                      Filtro Pacientes Ativos Cr
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-filtroPacientesAtivosCr"
                                    type="string"
                                    className="form-control"
                                    name="filtroPacientesAtivosCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="filtroPacientesAtivosCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verNumHospCr' ? (
                          <Col md="verNumHospCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="verNumHospCrLabel" for="usuario-painel-gerencial-verNumHospCr">
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumHospCr">Ver Num Hosp Cr</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-verNumHospCr"
                                    type="string"
                                    className="form-control"
                                    name="verNumHospCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verNumHospCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'filtroNumHospCr' ? (
                          <Col md="filtroNumHospCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="filtroNumHospCrLabel" for="usuario-painel-gerencial-filtroNumHospCr">
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumHospCr">
                                      Filtro Num Hosp Cr
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-filtroNumHospCr"
                                    type="string"
                                    className="form-control"
                                    name="filtroNumHospCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="filtroNumHospCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verNumDesospCr' ? (
                          <Col md="verNumDesospCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="verNumDesospCrLabel" for="usuario-painel-gerencial-verNumDesospCr">
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumDesospCr">Ver Num Desosp Cr</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-verNumDesospCr"
                                    type="string"
                                    className="form-control"
                                    name="verNumDesospCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verNumDesospCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'filtroNumDesospCr' ? (
                          <Col md="filtroNumDesospCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="filtroNumDesospCrLabel" for="usuario-painel-gerencial-filtroNumDesospCr">
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumDesospCr">
                                      Filtro Num Desosp Cr
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-filtroNumDesospCr"
                                    type="string"
                                    className="form-control"
                                    name="filtroNumDesospCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="filtroNumDesospCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verNumPsCr' ? (
                          <Col md="verNumPsCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="verNumPsCrLabel" for="usuario-painel-gerencial-verNumPsCr">
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumPsCr">Ver Num Ps Cr</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-verNumPsCr"
                                    type="string"
                                    className="form-control"
                                    name="verNumPsCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verNumPsCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'filtroNumPsCr' ? (
                          <Col md="filtroNumPsCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="filtroNumPsCrLabel" for="usuario-painel-gerencial-filtroNumPsCr">
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumPsCr">Filtro Num Ps Cr</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-filtroNumPsCr"
                                    type="string"
                                    className="form-control"
                                    name="filtroNumPsCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="filtroNumPsCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verNumObitoCr' ? (
                          <Col md="verNumObitoCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="verNumObitoCrLabel" for="usuario-painel-gerencial-verNumObitoCr">
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumObitoCr">Ver Num Obito Cr</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-verNumObitoCr"
                                    type="string"
                                    className="form-control"
                                    name="verNumObitoCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verNumObitoCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'filtroNumObitoCr' ? (
                          <Col md="filtroNumObitoCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="filtroNumObitoCrLabel" for="usuario-painel-gerencial-filtroNumObitoCr">
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumObitoCr">
                                      Filtro Num Obito Cr
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-filtroNumObitoCr"
                                    type="string"
                                    className="form-control"
                                    name="filtroNumObitoCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="filtroNumObitoCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verIndCliEstaveisCr' ? (
                          <Col md="verIndCliEstaveisCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="verIndCliEstaveisCrLabel" for="usuario-painel-gerencial-verIndCliEstaveisCr">
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.verIndCliEstaveisCr">
                                      Ver Ind Cli Estaveis Cr
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-verIndCliEstaveisCr"
                                    type="string"
                                    className="form-control"
                                    name="verIndCliEstaveisCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verIndCliEstaveisCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'filtroIndCliEstaveisCr' ? (
                          <Col md="filtroIndCliEstaveisCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label
                                    className="mt-2"
                                    id="filtroIndCliEstaveisCrLabel"
                                    for="usuario-painel-gerencial-filtroIndCliEstaveisCr"
                                  >
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroIndCliEstaveisCr">
                                      Filtro Ind Cli Estaveis Cr
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-filtroIndCliEstaveisCr"
                                    type="string"
                                    className="form-control"
                                    name="filtroIndCliEstaveisCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="filtroIndCliEstaveisCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verNumConsMedInternasCr' ? (
                          <Col md="verNumConsMedInternasCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label
                                    className="mt-2"
                                    id="verNumConsMedInternasCrLabel"
                                    for="usuario-painel-gerencial-verNumConsMedInternasCr"
                                  >
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumConsMedInternasCr">
                                      Ver Num Cons Med Internas Cr
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-verNumConsMedInternasCr"
                                    type="string"
                                    className="form-control"
                                    name="verNumConsMedInternasCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verNumConsMedInternasCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'filtroNumConsMedInternasCr' ? (
                          <Col md="filtroNumConsMedInternasCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label
                                    className="mt-2"
                                    id="filtroNumConsMedInternasCrLabel"
                                    for="usuario-painel-gerencial-filtroNumConsMedInternasCr"
                                  >
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumConsMedInternasCr">
                                      Filtro Num Cons Med Internas Cr
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-filtroNumConsMedInternasCr"
                                    type="string"
                                    className="form-control"
                                    name="filtroNumConsMedInternasCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="filtroNumConsMedInternasCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verNumConsMedExternasCr' ? (
                          <Col md="verNumConsMedExternasCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label
                                    className="mt-2"
                                    id="verNumConsMedExternasCrLabel"
                                    for="usuario-painel-gerencial-verNumConsMedExternasCr"
                                  >
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumConsMedExternasCr">
                                      Ver Num Cons Med Externas Cr
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-verNumConsMedExternasCr"
                                    type="string"
                                    className="form-control"
                                    name="verNumConsMedExternasCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verNumConsMedExternasCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'filtroNumConsMedExternasCr' ? (
                          <Col md="filtroNumConsMedExternasCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label
                                    className="mt-2"
                                    id="filtroNumConsMedExternasCrLabel"
                                    for="usuario-painel-gerencial-filtroNumConsMedExternasCr"
                                  >
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumConsMedExternasCr">
                                      Filtro Num Cons Med Externas Cr
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-filtroNumConsMedExternasCr"
                                    type="string"
                                    className="form-control"
                                    name="filtroNumConsMedExternasCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="filtroNumConsMedExternasCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verNumLaboratorialCr' ? (
                          <Col md="verNumLaboratorialCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label
                                    className="mt-2"
                                    id="verNumLaboratorialCrLabel"
                                    for="usuario-painel-gerencial-verNumLaboratorialCr"
                                  >
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumLaboratorialCr">
                                      Ver Num Laboratorial Cr
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-verNumLaboratorialCr"
                                    type="string"
                                    className="form-control"
                                    name="verNumLaboratorialCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verNumLaboratorialCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'filtroNumLaboratorialCr' ? (
                          <Col md="filtroNumLaboratorialCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label
                                    className="mt-2"
                                    id="filtroNumLaboratorialCrLabel"
                                    for="usuario-painel-gerencial-filtroNumLaboratorialCr"
                                  >
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumLaboratorialCr">
                                      Filtro Num Laboratorial Cr
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-filtroNumLaboratorialCr"
                                    type="string"
                                    className="form-control"
                                    name="filtroNumLaboratorialCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="filtroNumLaboratorialCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verNumImagemCr' ? (
                          <Col md="verNumImagemCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="verNumImagemCrLabel" for="usuario-painel-gerencial-verNumImagemCr">
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumImagemCr">Ver Num Imagem Cr</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-verNumImagemCr"
                                    type="string"
                                    className="form-control"
                                    name="verNumImagemCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verNumImagemCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'filtroNumImagemCr' ? (
                          <Col md="filtroNumImagemCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="filtroNumImagemCrLabel" for="usuario-painel-gerencial-filtroNumImagemCr">
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumImagemCr">
                                      Filtro Num Imagem Cr
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-filtroNumImagemCr"
                                    type="string"
                                    className="form-control"
                                    name="filtroNumImagemCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="filtroNumImagemCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verNumOutrosCr' ? (
                          <Col md="verNumOutrosCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="verNumOutrosCrLabel" for="usuario-painel-gerencial-verNumOutrosCr">
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumOutrosCr">Ver Num Outros Cr</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-verNumOutrosCr"
                                    type="string"
                                    className="form-control"
                                    name="verNumOutrosCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verNumOutrosCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'filtroNumOutrosCr' ? (
                          <Col md="filtroNumOutrosCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="filtroNumOutrosCrLabel" for="usuario-painel-gerencial-filtroNumOutrosCr">
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumOutrosCr">
                                      Filtro Num Outros Cr
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-filtroNumOutrosCr"
                                    type="string"
                                    className="form-control"
                                    name="filtroNumOutrosCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="filtroNumOutrosCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verNumAtCatCr' ? (
                          <Col md="verNumAtCatCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="verNumAtCatCrLabel" for="usuario-painel-gerencial-verNumAtCatCr">
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumAtCatCr">Ver Num At Cat Cr</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-verNumAtCatCr"
                                    type="string"
                                    className="form-control"
                                    name="verNumAtCatCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verNumAtCatCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'filtroNumAtCatCr' ? (
                          <Col md="filtroNumAtCatCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="filtroNumAtCatCrLabel" for="usuario-painel-gerencial-filtroNumAtCatCr">
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumAtCatCr">
                                      Filtro Num At Cat Cr
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-filtroNumAtCatCr"
                                    type="string"
                                    className="form-control"
                                    name="filtroNumAtCatCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="filtroNumAtCatCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verNumCatCompCr' ? (
                          <Col md="verNumCatCompCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="verNumCatCompCrLabel" for="usuario-painel-gerencial-verNumCatCompCr">
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumCatCompCr">
                                      Ver Num Cat Comp Cr
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-verNumCatCompCr"
                                    type="string"
                                    className="form-control"
                                    name="verNumCatCompCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verNumCatCompCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'filtroNumCatCompCr' ? (
                          <Col md="filtroNumCatCompCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="filtroNumCatCompCrLabel" for="usuario-painel-gerencial-filtroNumCatCompCr">
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumCatCompCr">
                                      Filtro Num Cat Comp Cr
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-filtroNumCatCompCr"
                                    type="string"
                                    className="form-control"
                                    name="filtroNumCatCompCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="filtroNumCatCompCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verAtCmSucessoCr' ? (
                          <Col md="verAtCmSucessoCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="verAtCmSucessoCrLabel" for="usuario-painel-gerencial-verAtCmSucessoCr">
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.verAtCmSucessoCr">
                                      Ver At Cm Sucesso Cr
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-verAtCmSucessoCr"
                                    type="string"
                                    className="form-control"
                                    name="verAtCmSucessoCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verAtCmSucessoCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'filtroAtCmSucessoCr' ? (
                          <Col md="filtroAtCmSucessoCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="filtroAtCmSucessoCrLabel" for="usuario-painel-gerencial-filtroAtCmSucessoCr">
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroAtCmSucessoCr">
                                      Filtro At Cm Sucesso Cr
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-filtroAtCmSucessoCr"
                                    type="string"
                                    className="form-control"
                                    name="filtroAtCmSucessoCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="filtroAtCmSucessoCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verMediaPadAbertoCr' ? (
                          <Col md="verMediaPadAbertoCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="verMediaPadAbertoCrLabel" for="usuario-painel-gerencial-verMediaPadAbertoCr">
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.verMediaPadAbertoCr">
                                      Ver Media Pad Aberto Cr
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-verMediaPadAbertoCr"
                                    type="string"
                                    className="form-control"
                                    name="verMediaPadAbertoCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verMediaPadAbertoCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'filtroMediaPadAbertoCr' ? (
                          <Col md="filtroMediaPadAbertoCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label
                                    className="mt-2"
                                    id="filtroMediaPadAbertoCrLabel"
                                    for="usuario-painel-gerencial-filtroMediaPadAbertoCr"
                                  >
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroMediaPadAbertoCr">
                                      Filtro Media Pad Aberto Cr
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-filtroMediaPadAbertoCr"
                                    type="string"
                                    className="form-control"
                                    name="filtroMediaPadAbertoCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="filtroMediaPadAbertoCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verAtIntercorrenciaCr' ? (
                          <Col md="verAtIntercorrenciaCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label
                                    className="mt-2"
                                    id="verAtIntercorrenciaCrLabel"
                                    for="usuario-painel-gerencial-verAtIntercorrenciaCr"
                                  >
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.verAtIntercorrenciaCr">
                                      Ver At Intercorrencia Cr
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-verAtIntercorrenciaCr"
                                    type="string"
                                    className="form-control"
                                    name="verAtIntercorrenciaCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verAtIntercorrenciaCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'filtroAtIntercorrenciaCr' ? (
                          <Col md="filtroAtIntercorrenciaCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label
                                    className="mt-2"
                                    id="filtroAtIntercorrenciaCrLabel"
                                    for="usuario-painel-gerencial-filtroAtIntercorrenciaCr"
                                  >
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroAtIntercorrenciaCr">
                                      Filtro At Intercorrencia Cr
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-filtroAtIntercorrenciaCr"
                                    type="string"
                                    className="form-control"
                                    name="filtroAtIntercorrenciaCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="filtroAtIntercorrenciaCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verTempoMedioAtCr' ? (
                          <Col md="verTempoMedioAtCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="verTempoMedioAtCrLabel" for="usuario-painel-gerencial-verTempoMedioAtCr">
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.verTempoMedioAtCr">
                                      Ver Tempo Medio At Cr
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-verTempoMedioAtCr"
                                    type="string"
                                    className="form-control"
                                    name="verTempoMedioAtCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verTempoMedioAtCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'filtroTempoMedioAtCr' ? (
                          <Col md="filtroTempoMedioAtCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label
                                    className="mt-2"
                                    id="filtroTempoMedioAtCrLabel"
                                    for="usuario-painel-gerencial-filtroTempoMedioAtCr"
                                  >
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroTempoMedioAtCr">
                                      Filtro Tempo Medio At Cr
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-filtroTempoMedioAtCr"
                                    type="string"
                                    className="form-control"
                                    name="filtroTempoMedioAtCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="filtroTempoMedioAtCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verMediaPtaCr' ? (
                          <Col md="verMediaPtaCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="verMediaPtaCrLabel" for="usuario-painel-gerencial-verMediaPtaCr">
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.verMediaPtaCr">Ver Media Pta Cr</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-verMediaPtaCr"
                                    type="string"
                                    className="form-control"
                                    name="verMediaPtaCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verMediaPtaCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'filtroMediaPtaCr' ? (
                          <Col md="filtroMediaPtaCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="filtroMediaPtaCrLabel" for="usuario-painel-gerencial-filtroMediaPtaCr">
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroMediaPtaCr">
                                      Filtro Media Pta Cr
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-filtroMediaPtaCr"
                                    type="string"
                                    className="form-control"
                                    name="filtroMediaPtaCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="filtroMediaPtaCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verIndicadorUsoAppCr' ? (
                          <Col md="verIndicadorUsoAppCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label
                                    className="mt-2"
                                    id="verIndicadorUsoAppCrLabel"
                                    for="usuario-painel-gerencial-verIndicadorUsoAppCr"
                                  >
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.verIndicadorUsoAppCr">
                                      Ver Indicador Uso App Cr
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-verIndicadorUsoAppCr"
                                    type="string"
                                    className="form-control"
                                    name="verIndicadorUsoAppCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verIndicadorUsoAppCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'filtroIndicadorUsoAppCr' ? (
                          <Col md="filtroIndicadorUsoAppCr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label
                                    className="mt-2"
                                    id="filtroIndicadorUsoAppCrLabel"
                                    for="usuario-painel-gerencial-filtroIndicadorUsoAppCr"
                                  >
                                    <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroIndicadorUsoAppCr">
                                      Filtro Indicador Uso App Cr
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-painel-gerencial-filtroIndicadorUsoAppCr"
                                    type="string"
                                    className="form-control"
                                    name="filtroIndicadorUsoAppCr"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="filtroIndicadorUsoAppCr" value={this.state.fieldsBase[baseFilters]} />
                        )}
                      </Row>
                    </div>
                  )}
                </Col>
              </Row>
            </PanelBody>
          </Panel>
        </AvForm>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  usuarioPainelGerencialEntity: storeState.usuarioPainelGerencial.entity,
  loading: storeState.usuarioPainelGerencial.loading,
  updating: storeState.usuarioPainelGerencial.updating,
  updateSuccess: storeState.usuarioPainelGerencial.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UsuarioPainelGerencialUpdate);
