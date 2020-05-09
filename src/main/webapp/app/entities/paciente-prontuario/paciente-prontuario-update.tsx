/* eslint complexity: ["error", 300] */
import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import {
  IPacienteProntuarioUpdateState,
  getEntity,
  getPacienteProntuarioState,
  IPacienteProntuarioBaseState,
  updateEntity,
  createEntity,
  setBlob,
  reset
} from './paciente-prontuario.reducer';
import { IPacienteProntuario } from 'app/shared/model/paciente-prontuario.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPacienteProntuarioUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteProntuarioUpdate extends React.Component<IPacienteProntuarioUpdateProps, IPacienteProntuarioUpdateState> {
  oQueFileInput: React.RefObject<HTMLInputElement>;

  resultadoFileInput: React.RefObject<HTMLInputElement>;

  constructor(props: Readonly<IPacienteProntuarioUpdateProps>) {
    super(props);

    this.oQueFileInput = React.createRef();

    this.resultadoFileInput = React.createRef();

    this.state = {
      fieldsBase: getPacienteProntuarioState(this.props.location),
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

  onBlobChange = (isAnImage, name, fileInput) => event => {
    const fileName = fileInput.current.files[0].name;
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType, fileName), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };
  getFiltersURL = (offset = null) => {
    const fieldsBase = this.state.fieldsBase;
    let url = '_back=1' + (offset !== null ? '&offset=' + offset : '');
    Object.keys(fieldsBase).map(key => {
      url += '&' + key + '=' + fieldsBase[key];
    });
    return url;
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
    this.props.history.push('/paciente-prontuario?' + this.getFiltersURL());
  };

  render() {
    const { pacienteProntuarioEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const { oQue, resultado } = pacienteProntuarioEntity;
    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
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
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.pacienteProntuario.home.createOrEditLabel">Create or edit a PacienteProntuario</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/paciente-prontuario?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Paciente Prontuarios</li>
            <li className="breadcrumb-item active">Paciente Prontuarios edit</li>
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
                      <Row>
                        {baseFilters !== 'idPaciente' ? (
                          <Col md="idPaciente">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idPacienteLabel" for="paciente-prontuario-idPaciente">
                                    <Translate contentKey="generadorApp.pacienteProntuario.idPaciente">Id Paciente</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-prontuario-idPaciente" type="text" name="idPaciente" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idPaciente" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'idTipoProntuario' ? (
                          <Col md="idTipoProntuario">
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
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idTipoProntuario" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'oQue' ? (
                          <Col md="oQue">
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
                        ) : (
                          <AvInput type="hidden" name="oQue" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'resultado' ? (
                          <Col md="resultado">
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
                        ) : (
                          <AvInput type="hidden" name="resultado" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ativo' ? (
                          <Col md="ativo">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="ativoLabel" check>
                                    <AvInput id="paciente-prontuario-ativo" type="checkbox" className="form-control" name="ativo" />
                                    <Translate contentKey="generadorApp.pacienteProntuario.ativo">Ativo</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'idEspecialidade' ? (
                          <Col md="idEspecialidade">
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
                        ) : (
                          <AvInput type="hidden" name="idEspecialidade" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'dataConsulta' ? (
                          <Col md="dataConsulta">
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
                        ) : (
                          <AvInput type="hidden" name="dataConsulta" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'idExame' ? (
                          <Col md="idExame">
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
                        ) : (
                          <AvInput type="hidden" name="idExame" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'idTipoExame' ? (
                          <Col md="idTipoExame">
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
                        ) : (
                          <AvInput type="hidden" name="idTipoExame" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'dataExame' ? (
                          <Col md="dataExame">
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
                        ) : (
                          <AvInput type="hidden" name="dataExame" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'dataInternacao' ? (
                          <Col md="dataInternacao">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="dataInternacaoLabel" for="paciente-prontuario-dataInternacao">
                                    <Translate contentKey="generadorApp.pacienteProntuario.dataInternacao">Data Internacao</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-prontuario-dataInternacao"
                                    type="date"
                                    className="form-control"
                                    name="dataInternacao"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="dataInternacao" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'dataAlta' ? (
                          <Col md="dataAlta">
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
                        ) : (
                          <AvInput type="hidden" name="dataAlta" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'dataPs' ? (
                          <Col md="dataPs">
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
                        ) : (
                          <AvInput type="hidden" name="dataPs" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'dataOcorrencia' ? (
                          <Col md="dataOcorrencia">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="dataOcorrenciaLabel" for="paciente-prontuario-dataOcorrencia">
                                    <Translate contentKey="generadorApp.pacienteProntuario.dataOcorrencia">Data Ocorrencia</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-prontuario-dataOcorrencia"
                                    type="date"
                                    className="form-control"
                                    name="dataOcorrencia"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="dataOcorrencia" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'idOcorrenciaProntuario' ? (
                          <Col md="idOcorrenciaProntuario">
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
                        ) : (
                          <AvInput type="hidden" name="idOcorrenciaProntuario" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'dataManifestacao' ? (
                          <Col md="dataManifestacao">
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
                        ) : (
                          <AvInput type="hidden" name="dataManifestacao" value={this.state.fieldsBase[baseFilters]} />
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
