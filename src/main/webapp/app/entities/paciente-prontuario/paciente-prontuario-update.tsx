import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './paciente-prontuario.reducer';
import { IPacienteProntuario } from 'app/shared/model/paciente-prontuario.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPacienteProntuarioUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPacienteProntuarioUpdateState {
  isNew: boolean;
}

export class PacienteProntuarioUpdate extends React.Component<IPacienteProntuarioUpdateProps, IPacienteProntuarioUpdateState> {
  constructor(props: Readonly<IPacienteProntuarioUpdateProps>) {
    super(props);
    this.state = {
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

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event: any, errors: any, values: any) => {
    values.dataConsulta = convertDateTimeToServer(values.dataConsulta);

    if (errors.length === 0) {
      const { pacienteProntuarioEntity } = this.props;
      const entity = {
        ...pacienteProntuarioEntity,
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
    this.props.history.push('/paciente-prontuario');
  };

  render() {
    const { pacienteProntuarioEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const { oQue, resultado } = pacienteProntuarioEntity;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Prontuarios</li>
          <li className="breadcrumb-item active">Paciente Prontuarios edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...pacienteProntuarioEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.pacienteProntuario.home.createOrEditLabel">
                    Create or edit a PacienteProntuario
                  </Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/paciente-prontuario" replace color="info" className="float-right jh-create-entity">
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
                    <Row>
                      {!isNew ? (
                        <AvGroup>
                          <Row>
                            {/*
                      <Col md="3">
                      <Label className="mt-2" for="paciente-prontuario-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="paciente-prontuario-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="idPacienteLabel" for="paciente-prontuario-idPaciente">
                                <Translate contentKey="generadorApp.pacienteProntuario.idPaciente">Id Paciente</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-prontuario-idPaciente"
                                type="text"
                                name="idPaciente"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="idTipoProntuarioLabel" for="paciente-prontuario-idTipoProntuario">
                                <Translate contentKey="generadorApp.pacienteProntuario.idTipoProntuario">Id Tipo Prontuario</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-prontuario-idTipoProntuario"
                                type="string"
                                className="form-control"
                                name="idTipoProntuario"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="oQueLabel" for="paciente-prontuario-oQue">
                                <Translate contentKey="generadorApp.pacienteProntuario.oQue">O Que</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="paciente-prontuario-oQue" type="textarea" name="oQue" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="resultadoLabel" for="paciente-prontuario-resultado">
                                <Translate contentKey="generadorApp.pacienteProntuario.resultado">Resultado</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="paciente-prontuario-resultado" type="textarea" name="resultado" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ativoLabel" for="paciente-prontuario-ativo">
                                <Translate contentKey="generadorApp.pacienteProntuario.ativo">Ativo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-prontuario-ativo"
                                type="string"
                                className="form-control"
                                name="ativo"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="idUsuarioLabel" for="paciente-prontuario-idUsuario">
                                <Translate contentKey="generadorApp.pacienteProntuario.idUsuario">Id Usuario</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="paciente-prontuario-idUsuario" type="text" name="idUsuario" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="idEspecialidadeLabel" for="paciente-prontuario-idEspecialidade">
                                <Translate contentKey="generadorApp.pacienteProntuario.idEspecialidade">Id Especialidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-prontuario-idEspecialidade"
                                type="string"
                                className="form-control"
                                name="idEspecialidade"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="dataConsultaLabel" for="paciente-prontuario-dataConsulta">
                                <Translate contentKey="generadorApp.pacienteProntuario.dataConsulta">Data Consulta</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="paciente-prontuario-dataConsulta"
                                type="datetime-local"
                                className="form-control"
                                name="dataConsulta"
                                placeholder={'YYYY-MM-DD HH:mm'}
                                value={isNew ? null : convertDateTimeFromServer(this.props.pacienteProntuarioEntity.dataConsulta)}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="idExameLabel" for="paciente-prontuario-idExame">
                                <Translate contentKey="generadorApp.pacienteProntuario.idExame">Id Exame</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="paciente-prontuario-idExame" type="string" className="form-control" name="idExame" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="idTipoExameLabel" for="paciente-prontuario-idTipoExame">
                                <Translate contentKey="generadorApp.pacienteProntuario.idTipoExame">Id Tipo Exame</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="paciente-prontuario-idTipoExame" type="string" className="form-control" name="idTipoExame" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="dataExameLabel" for="paciente-prontuario-dataExame">
                                <Translate contentKey="generadorApp.pacienteProntuario.dataExame">Data Exame</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="paciente-prontuario-dataExame" type="date" className="form-control" name="dataExame" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="dataInternacaoLabel" for="paciente-prontuario-dataInternacao">
                                <Translate contentKey="generadorApp.pacienteProntuario.dataInternacao">Data Internacao</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="paciente-prontuario-dataInternacao" type="date" className="form-control" name="dataInternacao" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="dataAltaLabel" for="paciente-prontuario-dataAlta">
                                <Translate contentKey="generadorApp.pacienteProntuario.dataAlta">Data Alta</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="paciente-prontuario-dataAlta" type="date" className="form-control" name="dataAlta" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="dataPsLabel" for="paciente-prontuario-dataPs">
                                <Translate contentKey="generadorApp.pacienteProntuario.dataPs">Data Ps</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="paciente-prontuario-dataPs" type="date" className="form-control" name="dataPs" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="dataOcorrenciaLabel" for="paciente-prontuario-dataOcorrencia">
                                <Translate contentKey="generadorApp.pacienteProntuario.dataOcorrencia">Data Ocorrencia</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="paciente-prontuario-dataOcorrencia" type="date" className="form-control" name="dataOcorrencia" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="idOcorrenciaProntuarioLabel" for="paciente-prontuario-idOcorrenciaProntuario">
                                <Translate contentKey="generadorApp.pacienteProntuario.idOcorrenciaProntuario">
                                  Id Ocorrencia Prontuario
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-prontuario-idOcorrenciaProntuario"
                                type="string"
                                className="form-control"
                                name="idOcorrenciaProntuario"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="dataManifestacaoLabel" for="paciente-prontuario-dataManifestacao">
                                <Translate contentKey="generadorApp.pacienteProntuario.dataManifestacao">Data Manifestacao</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-prontuario-dataManifestacao"
                                type="date"
                                className="form-control"
                                name="dataManifestacao"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>
                    </Row>
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
  pacienteProntuarioEntity: storeState.pacienteProntuario.entity,
  loading: storeState.pacienteProntuario.loading,
  updating: storeState.pacienteProntuario.updating,
  updateSuccess: storeState.pacienteProntuario.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteProntuarioUpdate);
