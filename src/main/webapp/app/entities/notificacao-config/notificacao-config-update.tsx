import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import {
  getEntity,
  getNotificacaoConfigState,
  INotificacaoConfigBaseState,
  updateEntity,
  createEntity,
  setBlob,
  reset
} from './notificacao-config.reducer';
import { INotificacaoConfig } from 'app/shared/model/notificacao-config.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INotificacaoConfigUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface INotificacaoConfigUpdateState {
  fieldsBase: INotificacaoConfigBaseState;
  isNew: boolean;
}

export class NotificacaoConfigUpdate extends React.Component<INotificacaoConfigUpdateProps, INotificacaoConfigUpdateState> {
  constructor(props: Readonly<INotificacaoConfigUpdateProps>) {
    super(props);
    this.state = {
      fieldsBase: getNotificacaoConfigState(this.props.location),
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
    values.criadoEm = convertDateTimeToServer(values.criadoEm);

    if (errors.length === 0) {
      const { notificacaoConfigEntity } = this.props;
      const entity = {
        ...notificacaoConfigEntity,
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
    this.props.history.push('/notificacao-config');
  };

  render() {
    const { notificacaoConfigEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const { descricao } = notificacaoConfigEntity;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Notificacao Configs</li>
          <li className="breadcrumb-item active">Notificacao Configs edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...notificacaoConfigEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.notificacaoConfig.home.createOrEditLabel">
                    Create or edit a NotificacaoConfig
                  </Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/notificacao-config" replace color="info" className="float-right jh-create-entity">
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
                      <Label className="mt-2" for="notificacao-config-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="notificacao-config-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {!this.state.fieldsBase.criadoEm ? (
                          <Col md="criadoEm">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="criadoEmLabel" for="notificacao-config-criadoEm">
                                    <Translate contentKey="generadorApp.notificacaoConfig.criadoEm">Criado Em</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput
                                    id="notificacao-config-criadoEm"
                                    type="datetime-local"
                                    className="form-control"
                                    name="criadoEm"
                                    placeholder={'YYYY-MM-DD HH:mm'}
                                    value={isNew ? null : convertDateTimeFromServer(this.props.notificacaoConfigEntity.criadoEm)}
                                    validate={{
                                      required: { value: true, errorMessage: translate('entity.validation.required') }
                                    }}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="criadoEm" value={this.state.fieldsBase.criadoEm} />
                        )}

                        {!this.state.fieldsBase.titulo ? (
                          <Col md="titulo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="tituloLabel" for="notificacao-config-titulo">
                                    <Translate contentKey="generadorApp.notificacaoConfig.titulo">Titulo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="notificacao-config-titulo" type="text" name="titulo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="titulo" value={this.state.fieldsBase.titulo} />
                        )}

                        {!this.state.fieldsBase.referencia ? (
                          <Col md="referencia">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="referenciaLabel" for="notificacao-config-referencia">
                                    <Translate contentKey="generadorApp.notificacaoConfig.referencia">Referencia</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="notificacao-config-referencia" type="text" name="referencia" />
                                </Col>
                                <UncontrolledTooltip target="referenciaLabel">
                                  <Translate contentKey="generadorApp.notificacaoConfig.help.referencia" />
                                </UncontrolledTooltip>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="referencia" value={this.state.fieldsBase.referencia} />
                        )}

                        {!this.state.fieldsBase.descricao ? (
                          <Col md="descricao">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="descricaoLabel" for="notificacao-config-descricao">
                                    <Translate contentKey="generadorApp.notificacaoConfig.descricao">Descricao</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="notificacao-config-descricao" type="textarea" name="descricao" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="descricao" value={this.state.fieldsBase.descricao} />
                        )}

                        {!this.state.fieldsBase.ativo ? (
                          <Col md="ativo">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="ativoLabel" check>
                                    <AvInput id="notificacao-config-ativo" type="checkbox" className="form-control" name="ativo" />
                                    <Translate contentKey="generadorApp.notificacaoConfig.ativo">Ativo</Translate>
                                  </Label>
                                </Col>
                                <UncontrolledTooltip target="ativoLabel">
                                  <Translate contentKey="generadorApp.notificacaoConfig.help.ativo" />
                                </UncontrolledTooltip>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ativo" value={this.state.fieldsBase.ativo} />
                        )}

                        {!this.state.fieldsBase.envioObrigatorio ? (
                          <Col md="envioObrigatorio">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="envioObrigatorioLabel" check>
                                    <AvInput
                                      id="notificacao-config-envioObrigatorio"
                                      type="checkbox"
                                      className="form-control"
                                      name="envioObrigatorio"
                                    />
                                    <Translate contentKey="generadorApp.notificacaoConfig.envioObrigatorio">Envio Obrigatorio</Translate>
                                  </Label>
                                </Col>
                                <UncontrolledTooltip target="envioObrigatorioLabel">
                                  <Translate contentKey="generadorApp.notificacaoConfig.help.envioObrigatorio" />
                                </UncontrolledTooltip>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="envioObrigatorio" value={this.state.fieldsBase.envioObrigatorio} />
                        )}

                        {!this.state.fieldsBase.serveProfissional ? (
                          <Col md="serveProfissional">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="serveProfissionalLabel" check>
                                    <AvInput
                                      id="notificacao-config-serveProfissional"
                                      type="checkbox"
                                      className="form-control"
                                      name="serveProfissional"
                                    />
                                    <Translate contentKey="generadorApp.notificacaoConfig.serveProfissional">Serve Profissional</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="serveProfissional" value={this.state.fieldsBase.serveProfissional} />
                        )}

                        {!this.state.fieldsBase.servePaciente ? (
                          <Col md="servePaciente">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="servePacienteLabel" check>
                                    <AvInput
                                      id="notificacao-config-servePaciente"
                                      type="checkbox"
                                      className="form-control"
                                      name="servePaciente"
                                    />
                                    <Translate contentKey="generadorApp.notificacaoConfig.servePaciente">Serve Paciente</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="servePaciente" value={this.state.fieldsBase.servePaciente} />
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
  notificacaoConfigEntity: storeState.notificacaoConfig.entity,
  loading: storeState.notificacaoConfig.loading,
  updating: storeState.notificacaoConfig.updating,
  updateSuccess: storeState.notificacaoConfig.updateSuccess
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

export default connect(mapStateToProps, mapDispatchToProps)(NotificacaoConfigUpdate);
