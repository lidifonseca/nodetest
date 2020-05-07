import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import {
  ILicaoCasaUpdateState,
  getEntity,
  getLicaoCasaState,
  ILicaoCasaBaseState,
  updateEntity,
  createEntity,
  reset
} from './licao-casa.reducer';
import { ILicaoCasa } from 'app/shared/model/licao-casa.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILicaoCasaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class LicaoCasaUpdate extends React.Component<ILicaoCasaUpdateProps, ILicaoCasaUpdateState> {
  constructor(props: Readonly<ILicaoCasaUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getLicaoCasaState(this.props.location),
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
    return (
      '_back=1' +
      (fieldsBase['baseFilters'] ? '&baseFilters=' + fieldsBase['baseFilters'] : '') +
      (fieldsBase['activePage'] ? '&page=' + fieldsBase['activePage'] : '') +
      (fieldsBase['itemsPerPage'] ? '&size=' + fieldsBase['itemsPerPage'] : '') +
      (fieldsBase['sort'] ? '&sort=' + (fieldsBase['sort'] + ',' + fieldsBase['order']) : '') +
      (offset !== null ? '&offset=' + offset : '') +
      (fieldsBase['atendimentoId'] ? '&atendimentoId=' + fieldsBase['atendimentoId'] : '') +
      (fieldsBase['pacienteId'] ? '&pacienteId=' + fieldsBase['pacienteId'] : '') +
      (fieldsBase['profissionalId'] ? '&profissionalId=' + fieldsBase['profissionalId'] : '') +
      (fieldsBase['atividade'] ? '&atividade=' + fieldsBase['atividade'] : '') +
      (fieldsBase['horaInicio'] ? '&horaInicio=' + fieldsBase['horaInicio'] : '') +
      (fieldsBase['repeticaoHoras'] ? '&repeticaoHoras=' + fieldsBase['repeticaoHoras'] : '') +
      (fieldsBase['qtdDias'] ? '&qtdDias=' + fieldsBase['qtdDias'] : '') +
      (fieldsBase['intervaloDias'] ? '&intervaloDias=' + fieldsBase['intervaloDias'] : '') +
      (fieldsBase['criadoEm'] ? '&criadoEm=' + fieldsBase['criadoEm'] : '') +
      (fieldsBase['concluidaEm'] ? '&concluidaEm=' + fieldsBase['concluidaEm'] : '') +
      (fieldsBase['ativo'] ? '&ativo=' + fieldsBase['ativo'] : '') +
      (fieldsBase['ativ'] ? '&ativ=' + fieldsBase['ativ'] : '') +
      (fieldsBase['forma'] ? '&forma=' + fieldsBase['forma'] : '') +
      (fieldsBase['enviarPara'] ? '&enviarPara=' + fieldsBase['enviarPara'] : '') +
      (fieldsBase['notificarFamiliar'] ? '&notificarFamiliar=' + fieldsBase['notificarFamiliar'] : '') +
      (fieldsBase['replicarAtividade'] ? '&replicarAtividade=' + fieldsBase['replicarAtividade'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    values.horaInicio = convertDateTimeToServer(values.horaInicio);
    values.criadoEm = convertDateTimeToServer(values.criadoEm);
    values.concluidaEm = convertDateTimeToServer(values.concluidaEm);

    if (errors.length === 0) {
      const { licaoCasaEntity } = this.props;
      const entity = {
        ...licaoCasaEntity,
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
    this.props.history.push('/licao-casa?' + this.getFiltersURL());
  };

  render() {
    const { licaoCasaEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Licao Casas</li>
          <li className="breadcrumb-item active">Licao Casas edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...licaoCasaEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.licaoCasa.home.createOrEditLabel">Create or edit a LicaoCasa</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button
                  tag={Link}
                  id="cancel-save"
                  to={'/licao-casa?' + this.getFiltersURL()}
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
                      <Label className="mt-2" for="licao-casa-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="licao-casa-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'atendimentoId' ? (
                          <Col md="atendimentoId">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="atendimentoIdLabel" for="licao-casa-atendimentoId">
                                    <Translate contentKey="generadorApp.licaoCasa.atendimentoId">Atendimento Id</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="licao-casa-atendimentoId" type="string" className="form-control" name="atendimentoId" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="atendimentoId" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'pacienteId' ? (
                          <Col md="pacienteId">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="pacienteIdLabel" for="licao-casa-pacienteId">
                                    <Translate contentKey="generadorApp.licaoCasa.pacienteId">Paciente Id</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="licao-casa-pacienteId" type="string" className="form-control" name="pacienteId" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="pacienteId" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'profissionalId' ? (
                          <Col md="profissionalId">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="profissionalIdLabel" for="licao-casa-profissionalId">
                                    <Translate contentKey="generadorApp.licaoCasa.profissionalId">Profissional Id</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="licao-casa-profissionalId" type="string" className="form-control" name="profissionalId" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="profissionalId" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'atividade' ? (
                          <Col md="atividade">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="atividadeLabel" for="licao-casa-atividade">
                                    <Translate contentKey="generadorApp.licaoCasa.atividade">Atividade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="licao-casa-atividade" type="text" name="atividade" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="atividade" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'horaInicio' ? (
                          <Col md="horaInicio">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="horaInicioLabel" for="licao-casa-horaInicio">
                                    <Translate contentKey="generadorApp.licaoCasa.horaInicio">Hora Inicio</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput
                                    id="licao-casa-horaInicio"
                                    type="datetime-local"
                                    className="form-control"
                                    name="horaInicio"
                                    placeholder={'YYYY-MM-DD HH:mm'}
                                    value={isNew ? null : convertDateTimeFromServer(this.props.licaoCasaEntity.horaInicio)}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="horaInicio" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'repeticaoHoras' ? (
                          <Col md="repeticaoHoras">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="repeticaoHorasLabel" check>
                                    <AvInput
                                      id="licao-casa-repeticaoHoras"
                                      type="checkbox"
                                      className="form-control"
                                      name="repeticaoHoras"
                                    />
                                    <Translate contentKey="generadorApp.licaoCasa.repeticaoHoras">Repeticao Horas</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="repeticaoHoras" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'qtdDias' ? (
                          <Col md="qtdDias">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="qtdDiasLabel" check>
                                    <AvInput id="licao-casa-qtdDias" type="checkbox" className="form-control" name="qtdDias" />
                                    <Translate contentKey="generadorApp.licaoCasa.qtdDias">Qtd Dias</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="qtdDias" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'intervaloDias' ? (
                          <Col md="intervaloDias">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="intervaloDiasLabel" check>
                                    <AvInput id="licao-casa-intervaloDias" type="checkbox" className="form-control" name="intervaloDias" />
                                    <Translate contentKey="generadorApp.licaoCasa.intervaloDias">Intervalo Dias</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="intervaloDias" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'criadoEm' ? (
                          <Col md="criadoEm">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="criadoEmLabel" for="licao-casa-criadoEm">
                                    <Translate contentKey="generadorApp.licaoCasa.criadoEm">Criado Em</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput
                                    id="licao-casa-criadoEm"
                                    type="datetime-local"
                                    className="form-control"
                                    name="criadoEm"
                                    placeholder={'YYYY-MM-DD HH:mm'}
                                    value={isNew ? null : convertDateTimeFromServer(this.props.licaoCasaEntity.criadoEm)}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="criadoEm" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'concluidaEm' ? (
                          <Col md="concluidaEm">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="concluidaEmLabel" for="licao-casa-concluidaEm">
                                    <Translate contentKey="generadorApp.licaoCasa.concluidaEm">Concluida Em</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput
                                    id="licao-casa-concluidaEm"
                                    type="datetime-local"
                                    className="form-control"
                                    name="concluidaEm"
                                    placeholder={'YYYY-MM-DD HH:mm'}
                                    value={isNew ? null : convertDateTimeFromServer(this.props.licaoCasaEntity.concluidaEm)}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="concluidaEm" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'ativo' ? (
                          <Col md="ativo">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="ativoLabel" check>
                                    <AvInput id="licao-casa-ativo" type="checkbox" className="form-control" name="ativo" />
                                    <Translate contentKey="generadorApp.licaoCasa.ativo">Ativo</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'ativ' ? (
                          <Col md="ativ">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="ativLabel" for="licao-casa-ativ">
                                    <Translate contentKey="generadorApp.licaoCasa.ativ">Ativ</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="licao-casa-ativ" type="string" className="form-control" name="ativ" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ativ" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'forma' ? (
                          <Col md="forma">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="formaLabel" for="licao-casa-forma">
                                    <Translate contentKey="generadorApp.licaoCasa.forma">Forma</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="licao-casa-forma" type="text" name="forma" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="forma" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'enviarPara' ? (
                          <Col md="enviarPara">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="enviarParaLabel" for="licao-casa-enviarPara">
                                    <Translate contentKey="generadorApp.licaoCasa.enviarPara">Enviar Para</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="licao-casa-enviarPara" type="text" name="enviarPara" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="enviarPara" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'notificarFamiliar' ? (
                          <Col md="notificarFamiliar">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="notificarFamiliarLabel" for="licao-casa-notificarFamiliar">
                                    <Translate contentKey="generadorApp.licaoCasa.notificarFamiliar">Notificar Familiar</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="licao-casa-notificarFamiliar" type="text" name="notificarFamiliar" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="notificarFamiliar" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'replicarAtividade' ? (
                          <Col md="replicarAtividade">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="replicarAtividadeLabel" for="licao-casa-replicarAtividade">
                                    <Translate contentKey="generadorApp.licaoCasa.replicarAtividade">Replicar Atividade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="licao-casa-replicarAtividade" type="text" name="replicarAtividade" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="replicarAtividade" value={this.state.fieldsBase[baseFilters]} />
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
  licaoCasaEntity: storeState.licaoCasa.entity,
  loading: storeState.licaoCasa.loading,
  updating: storeState.licaoCasa.updating,
  updateSuccess: storeState.licaoCasa.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LicaoCasaUpdate);
