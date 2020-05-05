import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import {
  getEntity,
  getProntuarioMotivoManifestacaoState,
  IProntuarioMotivoManifestacaoBaseState,
  updateEntity,
  createEntity,
  setBlob,
  reset
} from './prontuario-motivo-manifestacao.reducer';
import { IProntuarioMotivoManifestacao } from 'app/shared/model/prontuario-motivo-manifestacao.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProntuarioMotivoManifestacaoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IProntuarioMotivoManifestacaoUpdateState {
  fieldsBase: IProntuarioMotivoManifestacaoBaseState;
  isNew: boolean;
}

export class ProntuarioMotivoManifestacaoUpdate extends React.Component<
  IProntuarioMotivoManifestacaoUpdateProps,
  IProntuarioMotivoManifestacaoUpdateState
> {
  constructor(props: Readonly<IProntuarioMotivoManifestacaoUpdateProps>) {
    super(props);
    this.state = {
      fieldsBase: getProntuarioMotivoManifestacaoState(this.props.location),
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
    if (errors.length === 0) {
      const { prontuarioMotivoManifestacaoEntity } = this.props;
      const entity = {
        ...prontuarioMotivoManifestacaoEntity,
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
    this.props.history.push('/prontuario-motivo-manifestacao');
  };

  render() {
    const { prontuarioMotivoManifestacaoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const { sugestao, informacaoAdicional } = prontuarioMotivoManifestacaoEntity;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Prontuario Motivo Manifestacaos</li>
          <li className="breadcrumb-item active">Prontuario Motivo Manifestacaos edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...prontuarioMotivoManifestacaoEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.home.createOrEditLabel">
                    Create or edit a ProntuarioMotivoManifestacao
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
                  to="/prontuario-motivo-manifestacao"
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
                      <Label className="mt-2" for="prontuario-motivo-manifestacao-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput
                                id="prontuario-motivo-manifestacao-id"
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
                        {!this.state.fieldsBase.idProntuario ? (
                          <Col md="idProntuario">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idProntuarioLabel" for="prontuario-motivo-manifestacao-idProntuario">
                                    <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.idProntuario">Id Prontuario</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="prontuario-motivo-manifestacao-idProntuario"
                                    type="string"
                                    className="form-control"
                                    name="idProntuario"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idProntuario" value={this.state.fieldsBase.idProntuario} />
                        )}

                        {!this.state.fieldsBase.idPaciente ? (
                          <Col md="idPaciente">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idPacienteLabel" for="prontuario-motivo-manifestacao-idPaciente">
                                    <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.idPaciente">Id Paciente</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="prontuario-motivo-manifestacao-idPaciente"
                                    type="string"
                                    className="form-control"
                                    name="idPaciente"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idPaciente" value={this.state.fieldsBase.idPaciente} />
                        )}

                        {!this.state.fieldsBase.idMotivo ? (
                          <Col md="idMotivo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idMotivoLabel" for="prontuario-motivo-manifestacao-idMotivo">
                                    <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.idMotivo">Id Motivo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="prontuario-motivo-manifestacao-idMotivo"
                                    type="string"
                                    className="form-control"
                                    name="idMotivo"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idMotivo" value={this.state.fieldsBase.idMotivo} />
                        )}

                        {!this.state.fieldsBase.idMotivoFilho ? (
                          <Col md="idMotivoFilho">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idMotivoFilhoLabel" for="prontuario-motivo-manifestacao-idMotivoFilho">
                                    <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.idMotivoFilho">
                                      Id Motivo Filho
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="prontuario-motivo-manifestacao-idMotivoFilho"
                                    type="string"
                                    className="form-control"
                                    name="idMotivoFilho"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idMotivoFilho" value={this.state.fieldsBase.idMotivoFilho} />
                        )}

                        {!this.state.fieldsBase.idManifestacao ? (
                          <Col md="idManifestacao">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idManifestacaoLabel" for="prontuario-motivo-manifestacao-idManifestacao">
                                    <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.idManifestacao">
                                      Id Manifestacao
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="prontuario-motivo-manifestacao-idManifestacao"
                                    type="string"
                                    className="form-control"
                                    name="idManifestacao"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idManifestacao" value={this.state.fieldsBase.idManifestacao} />
                        )}

                        {!this.state.fieldsBase.idManifestacaoFilho ? (
                          <Col md="idManifestacaoFilho">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label
                                    className="mt-2"
                                    id="idManifestacaoFilhoLabel"
                                    for="prontuario-motivo-manifestacao-idManifestacaoFilho"
                                  >
                                    <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.idManifestacaoFilho">
                                      Id Manifestacao Filho
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="prontuario-motivo-manifestacao-idManifestacaoFilho"
                                    type="string"
                                    className="form-control"
                                    name="idManifestacaoFilho"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idManifestacaoFilho" value={this.state.fieldsBase.idManifestacaoFilho} />
                        )}

                        {!this.state.fieldsBase.sugestao ? (
                          <Col md="sugestao">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="sugestaoLabel" for="prontuario-motivo-manifestacao-sugestao">
                                    <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.sugestao">Sugestao</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="prontuario-motivo-manifestacao-sugestao" type="textarea" name="sugestao" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="sugestao" value={this.state.fieldsBase.sugestao} />
                        )}

                        {!this.state.fieldsBase.idUsuario ? (
                          <Col md="idUsuario">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idUsuarioLabel" for="prontuario-motivo-manifestacao-idUsuario">
                                    <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.idUsuario">Id Usuario</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="prontuario-motivo-manifestacao-idUsuario"
                                    type="string"
                                    className="form-control"
                                    name="idUsuario"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idUsuario" value={this.state.fieldsBase.idUsuario} />
                        )}

                        {!this.state.fieldsBase.informacaoAdicional ? (
                          <Col md="informacaoAdicional">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label
                                    className="mt-2"
                                    id="informacaoAdicionalLabel"
                                    for="prontuario-motivo-manifestacao-informacaoAdicional"
                                  >
                                    <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.informacaoAdicional">
                                      Informacao Adicional
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput
                                    id="prontuario-motivo-manifestacao-informacaoAdicional"
                                    type="textarea"
                                    name="informacaoAdicional"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="informacaoAdicional" value={this.state.fieldsBase.informacaoAdicional} />
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
  prontuarioMotivoManifestacaoEntity: storeState.prontuarioMotivoManifestacao.entity,
  loading: storeState.prontuarioMotivoManifestacao.loading,
  updating: storeState.prontuarioMotivoManifestacao.updating,
  updateSuccess: storeState.prontuarioMotivoManifestacao.updateSuccess
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

export default connect(mapStateToProps, mapDispatchToProps)(ProntuarioMotivoManifestacaoUpdate);
