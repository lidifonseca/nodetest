import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';
import { IUsuario } from 'app/shared/model/usuario.model';
import { getEntities as getUsuarios } from 'app/entities/usuario/usuario.reducer';
import {
  getEntity,
  getPacienteDiarioState,
  IPacienteDiarioBaseState,
  updateEntity,
  createEntity,
  setBlob,
  reset
} from './paciente-diario.reducer';
import { IPacienteDiario } from 'app/shared/model/paciente-diario.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPacienteDiarioUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPacienteDiarioUpdateState {
  fieldsBase: IPacienteDiarioBaseState;
  isNew: boolean;
  idPacienteId: string;
  idUsuarioId: string;
}

export class PacienteDiarioUpdate extends React.Component<IPacienteDiarioUpdateProps, IPacienteDiarioUpdateState> {
  constructor(props: Readonly<IPacienteDiarioUpdateProps>) {
    super(props);
    this.state = {
      fieldsBase: getPacienteDiarioState(this.props.location),
      idPacienteId: '0',
      idUsuarioId: '0',
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

    this.props.getPacientes();
    this.props.getUsuarios();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { pacienteDiarioEntity } = this.props;
      const entity = {
        ...pacienteDiarioEntity,
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
    this.props.history.push('/paciente-diario');
  };

  render() {
    const { pacienteDiarioEntity, pacientes, usuarios, loading, updating } = this.props;
    const { isNew } = this.state;

    const { historico } = pacienteDiarioEntity;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Diarios</li>
          <li className="breadcrumb-item active">Paciente Diarios edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...pacienteDiarioEntity,
                  idPaciente: pacienteDiarioEntity.idPaciente ? pacienteDiarioEntity.idPaciente.id : null,
                  idUsuario: pacienteDiarioEntity.idUsuario ? pacienteDiarioEntity.idUsuario.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.pacienteDiario.home.createOrEditLabel">Create or edit a PacienteDiario</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/paciente-diario" replace color="info" className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
              </h2>
            </PanelHeader>
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
                      <Label className="mt-2" for="paciente-diario-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="paciente-diario-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {!this.state.fieldsBase.idOperadora ? (
                          <Col md="idOperadora">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idOperadoraLabel" for="paciente-diario-idOperadora">
                                    <Translate contentKey="generadorApp.pacienteDiario.idOperadora">Id Operadora</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-diario-idOperadora" type="string" className="form-control" name="idOperadora" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idOperadora" value={this.state.fieldsBase.idOperadora} />
                        )}

                        {!this.state.fieldsBase.historico ? (
                          <Col md="historico">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="historicoLabel" for="paciente-diario-historico">
                                    <Translate contentKey="generadorApp.pacienteDiario.historico">Historico</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="paciente-diario-historico" type="textarea" name="historico" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="historico" value={this.state.fieldsBase.historico} />
                        )}

                        {!this.state.fieldsBase.ativo ? (
                          <Col md="ativo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="ativoLabel" for="paciente-diario-ativo">
                                    <Translate contentKey="generadorApp.pacienteDiario.ativo">Ativo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-diario-ativo" type="string" className="form-control" name="ativo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ativo" value={this.state.fieldsBase.ativo} />
                        )}
                        {!this.state.fieldsBase.idPaciente ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="paciente-diario-idPaciente">
                                    <Translate contentKey="generadorApp.pacienteDiario.idPaciente">Id Paciente</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="paciente-diario-idPaciente" type="select" className="form-control" name="idPaciente">
                                    <option value="null" key="0">
                                      {translate('generadorApp.pacienteDiario.idPaciente.empty')}
                                    </option>
                                    {pacientes
                                      ? pacientes.map(otherEntity => (
                                          <option value={otherEntity.id} key={otherEntity.id}>
                                            {otherEntity.id}
                                          </option>
                                        ))
                                      : null}
                                  </AvInput>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idPaciente" value={this.state.fieldsBase.idPaciente} />
                        )}
                        {!this.state.fieldsBase.idUsuario ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="paciente-diario-idUsuario">
                                    <Translate contentKey="generadorApp.pacienteDiario.idUsuario">Id Usuario</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="paciente-diario-idUsuario" type="select" className="form-control" name="idUsuario">
                                    <option value="null" key="0">
                                      {translate('generadorApp.pacienteDiario.idUsuario.empty')}
                                    </option>
                                    {usuarios
                                      ? usuarios.map(otherEntity => (
                                          <option value={otherEntity.id} key={otherEntity.id}>
                                            {otherEntity.id}
                                          </option>
                                        ))
                                      : null}
                                  </AvInput>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idUsuario" value={this.state.fieldsBase.idUsuario} />
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
  pacientes: storeState.paciente.entities,
  usuarios: storeState.usuario.entities,
  pacienteDiarioEntity: storeState.pacienteDiario.entity,
  loading: storeState.pacienteDiario.loading,
  updating: storeState.pacienteDiario.updating,
  updateSuccess: storeState.pacienteDiario.updateSuccess
});

const mapDispatchToProps = {
  getPacientes,
  getUsuarios,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteDiarioUpdate);
