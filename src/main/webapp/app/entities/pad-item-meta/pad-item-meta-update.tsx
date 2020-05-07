import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import {
  IPadItemMetaUpdateState,
  getEntity,
  getPadItemMetaState,
  IPadItemMetaBaseState,
  updateEntity,
  createEntity,
  reset
} from './pad-item-meta.reducer';
import { IPadItemMeta } from 'app/shared/model/pad-item-meta.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPadItemMetaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PadItemMetaUpdate extends React.Component<IPadItemMetaUpdateProps, IPadItemMetaUpdateState> {
  constructor(props: Readonly<IPadItemMetaUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getPadItemMetaState(this.props.location),
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
      (fieldsBase['unidadeMedidaId'] ? '&unidadeMedidaId=' + fieldsBase['unidadeMedidaId'] : '') +
      (fieldsBase['indicadorId'] ? '&indicadorId=' + fieldsBase['indicadorId'] : '') +
      (fieldsBase['idPaciente'] ? '&idPaciente=' + fieldsBase['idPaciente'] : '') +
      (fieldsBase['idPad'] ? '&idPad=' + fieldsBase['idPad'] : '') +
      (fieldsBase['idPadItem'] ? '&idPadItem=' + fieldsBase['idPadItem'] : '') +
      (fieldsBase['minimo'] ? '&minimo=' + fieldsBase['minimo'] : '') +
      (fieldsBase['maximo'] ? '&maximo=' + fieldsBase['maximo'] : '') +
      (fieldsBase['meta'] ? '&meta=' + fieldsBase['meta'] : '') +
      (fieldsBase['valorAtual'] ? '&valorAtual=' + fieldsBase['valorAtual'] : '') +
      (fieldsBase['atualizadoEm'] ? '&atualizadoEm=' + fieldsBase['atualizadoEm'] : '') +
      (fieldsBase['dataLimite'] ? '&dataLimite=' + fieldsBase['dataLimite'] : '') +
      (fieldsBase['frequenciaMedicaoHoras'] ? '&frequenciaMedicaoHoras=' + fieldsBase['frequenciaMedicaoHoras'] : '') +
      (fieldsBase['tipoAcompanhamento'] ? '&tipoAcompanhamento=' + fieldsBase['tipoAcompanhamento'] : '') +
      (fieldsBase['atendimentoId'] ? '&atendimentoId=' + fieldsBase['atendimentoId'] : '') +
      (fieldsBase['email'] ? '&email=' + fieldsBase['email'] : '') +
      (fieldsBase['minimoSistolica'] ? '&minimoSistolica=' + fieldsBase['minimoSistolica'] : '') +
      (fieldsBase['maximoSistolica'] ? '&maximoSistolica=' + fieldsBase['maximoSistolica'] : '') +
      (fieldsBase['minimoDiastolica'] ? '&minimoDiastolica=' + fieldsBase['minimoDiastolica'] : '') +
      (fieldsBase['maximoDiastolica'] ? '&maximoDiastolica=' + fieldsBase['maximoDiastolica'] : '') +
      (fieldsBase['score'] ? '&score=' + fieldsBase['score'] : '') +
      (fieldsBase['alteracaoEsperada'] ? '&alteracaoEsperada=' + fieldsBase['alteracaoEsperada'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    values.atualizadoEm = convertDateTimeToServer(values.atualizadoEm);
    values.dataLimite = convertDateTimeToServer(values.dataLimite);

    if (errors.length === 0) {
      const { padItemMetaEntity } = this.props;
      const entity = {
        ...padItemMetaEntity,
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
    this.props.history.push('/pad-item-meta?' + this.getFiltersURL());
  };

  render() {
    const { padItemMetaEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Item Metas</li>
          <li className="breadcrumb-item active">Pad Item Metas edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...padItemMetaEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.padItemMeta.home.createOrEditLabel">Create or edit a PadItemMeta</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button
                  tag={Link}
                  id="cancel-save"
                  to={'/pad-item-meta?' + this.getFiltersURL()}
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
                      <Label className="mt-2" for="pad-item-meta-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="pad-item-meta-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'unidadeMedidaId' ? (
                          <Col md="unidadeMedidaId">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="unidadeMedidaIdLabel" for="pad-item-meta-unidadeMedidaId">
                                    <Translate contentKey="generadorApp.padItemMeta.unidadeMedidaId">Unidade Medida Id</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="pad-item-meta-unidadeMedidaId"
                                    type="string"
                                    className="form-control"
                                    name="unidadeMedidaId"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="unidadeMedidaId" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'indicadorId' ? (
                          <Col md="indicadorId">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="indicadorIdLabel" for="pad-item-meta-indicadorId">
                                    <Translate contentKey="generadorApp.padItemMeta.indicadorId">Indicador Id</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-item-meta-indicadorId" type="string" className="form-control" name="indicadorId" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="indicadorId" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'idPaciente' ? (
                          <Col md="idPaciente">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idPacienteLabel" for="pad-item-meta-idPaciente">
                                    <Translate contentKey="generadorApp.padItemMeta.idPaciente">Id Paciente</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-item-meta-idPaciente" type="string" className="form-control" name="idPaciente" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idPaciente" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'idPad' ? (
                          <Col md="idPad">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idPadLabel" for="pad-item-meta-idPad">
                                    <Translate contentKey="generadorApp.padItemMeta.idPad">Id Pad</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-item-meta-idPad" type="string" className="form-control" name="idPad" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idPad" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'idPadItem' ? (
                          <Col md="idPadItem">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idPadItemLabel" for="pad-item-meta-idPadItem">
                                    <Translate contentKey="generadorApp.padItemMeta.idPadItem">Id Pad Item</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-item-meta-idPadItem" type="string" className="form-control" name="idPadItem" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idPadItem" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'minimo' ? (
                          <Col md="minimo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="minimoLabel" for="pad-item-meta-minimo">
                                    <Translate contentKey="generadorApp.padItemMeta.minimo">Minimo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-item-meta-minimo" type="text" name="minimo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="minimo" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'maximo' ? (
                          <Col md="maximo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="maximoLabel" for="pad-item-meta-maximo">
                                    <Translate contentKey="generadorApp.padItemMeta.maximo">Maximo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-item-meta-maximo" type="text" name="maximo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="maximo" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'meta' ? (
                          <Col md="meta">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="metaLabel" for="pad-item-meta-meta">
                                    <Translate contentKey="generadorApp.padItemMeta.meta">Meta</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-item-meta-meta" type="text" name="meta" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="meta" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'valorAtual' ? (
                          <Col md="valorAtual">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="valorAtualLabel" for="pad-item-meta-valorAtual">
                                    <Translate contentKey="generadorApp.padItemMeta.valorAtual">Valor Atual</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-item-meta-valorAtual" type="text" name="valorAtual" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="valorAtual" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'atualizadoEm' ? (
                          <Col md="atualizadoEm">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="atualizadoEmLabel" for="pad-item-meta-atualizadoEm">
                                    <Translate contentKey="generadorApp.padItemMeta.atualizadoEm">Atualizado Em</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput
                                    id="pad-item-meta-atualizadoEm"
                                    type="datetime-local"
                                    className="form-control"
                                    name="atualizadoEm"
                                    placeholder={'YYYY-MM-DD HH:mm'}
                                    value={isNew ? null : convertDateTimeFromServer(this.props.padItemMetaEntity.atualizadoEm)}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="atualizadoEm" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'dataLimite' ? (
                          <Col md="dataLimite">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="dataLimiteLabel" for="pad-item-meta-dataLimite">
                                    <Translate contentKey="generadorApp.padItemMeta.dataLimite">Data Limite</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput
                                    id="pad-item-meta-dataLimite"
                                    type="datetime-local"
                                    className="form-control"
                                    name="dataLimite"
                                    placeholder={'YYYY-MM-DD HH:mm'}
                                    value={isNew ? null : convertDateTimeFromServer(this.props.padItemMetaEntity.dataLimite)}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="dataLimite" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'frequenciaMedicaoHoras' ? (
                          <Col md="frequenciaMedicaoHoras">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="frequenciaMedicaoHorasLabel" for="pad-item-meta-frequenciaMedicaoHoras">
                                    <Translate contentKey="generadorApp.padItemMeta.frequenciaMedicaoHoras">
                                      Frequencia Medicao Horas
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="pad-item-meta-frequenciaMedicaoHoras"
                                    type="string"
                                    className="form-control"
                                    name="frequenciaMedicaoHoras"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="frequenciaMedicaoHoras" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'tipoAcompanhamento' ? (
                          <Col md="tipoAcompanhamento">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="tipoAcompanhamentoLabel" for="pad-item-meta-tipoAcompanhamento">
                                    <Translate contentKey="generadorApp.padItemMeta.tipoAcompanhamento">Tipo Acompanhamento</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-item-meta-tipoAcompanhamento" type="text" name="tipoAcompanhamento" />
                                </Col>
                                <UncontrolledTooltip target="tipoAcompanhamentoLabel">
                                  <Translate contentKey="generadorApp.padItemMeta.help.tipoAcompanhamento" />
                                </UncontrolledTooltip>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="tipoAcompanhamento" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'atendimentoId' ? (
                          <Col md="atendimentoId">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="atendimentoIdLabel" for="pad-item-meta-atendimentoId">
                                    <Translate contentKey="generadorApp.padItemMeta.atendimentoId">Atendimento Id</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-item-meta-atendimentoId" type="string" className="form-control" name="atendimentoId" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="atendimentoId" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'email' ? (
                          <Col md="email">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="emailLabel" for="pad-item-meta-email">
                                    <Translate contentKey="generadorApp.padItemMeta.email">Email</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-item-meta-email" type="string" className="form-control" name="email" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="email" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'minimoSistolica' ? (
                          <Col md="minimoSistolica">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="minimoSistolicaLabel" for="pad-item-meta-minimoSistolica">
                                    <Translate contentKey="generadorApp.padItemMeta.minimoSistolica">Minimo Sistolica</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-item-meta-minimoSistolica" type="text" name="minimoSistolica" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="minimoSistolica" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'maximoSistolica' ? (
                          <Col md="maximoSistolica">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="maximoSistolicaLabel" for="pad-item-meta-maximoSistolica">
                                    <Translate contentKey="generadorApp.padItemMeta.maximoSistolica">Maximo Sistolica</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-item-meta-maximoSistolica" type="text" name="maximoSistolica" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="maximoSistolica" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'minimoDiastolica' ? (
                          <Col md="minimoDiastolica">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="minimoDiastolicaLabel" for="pad-item-meta-minimoDiastolica">
                                    <Translate contentKey="generadorApp.padItemMeta.minimoDiastolica">Minimo Diastolica</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-item-meta-minimoDiastolica" type="text" name="minimoDiastolica" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="minimoDiastolica" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'maximoDiastolica' ? (
                          <Col md="maximoDiastolica">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="maximoDiastolicaLabel" for="pad-item-meta-maximoDiastolica">
                                    <Translate contentKey="generadorApp.padItemMeta.maximoDiastolica">Maximo Diastolica</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-item-meta-maximoDiastolica" type="text" name="maximoDiastolica" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="maximoDiastolica" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'score' ? (
                          <Col md="score">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="scoreLabel" for="pad-item-meta-score">
                                    <Translate contentKey="generadorApp.padItemMeta.score">Score</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-item-meta-score" type="string" className="form-control" name="score" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="score" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'alteracaoEsperada' ? (
                          <Col md="alteracaoEsperada">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="alteracaoEsperadaLabel" check>
                                    <AvInput
                                      id="pad-item-meta-alteracaoEsperada"
                                      type="checkbox"
                                      className="form-control"
                                      name="alteracaoEsperada"
                                    />
                                    <Translate contentKey="generadorApp.padItemMeta.alteracaoEsperada">Alteracao Esperada</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="alteracaoEsperada" value={this.state.fieldsBase[baseFilters]} />
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
  padItemMetaEntity: storeState.padItemMeta.entity,
  loading: storeState.padItemMeta.loading,
  updating: storeState.padItemMeta.updating,
  updateSuccess: storeState.padItemMeta.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadItemMetaUpdate);
