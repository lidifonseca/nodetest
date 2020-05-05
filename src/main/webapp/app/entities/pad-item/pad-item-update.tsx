import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPad } from 'app/shared/model/pad.model';
import { getEntities as getPads } from 'app/entities/pad/pad.reducer';
import { IEspecialidade } from 'app/shared/model/especialidade.model';
import { getEntities as getEspecialidades } from 'app/entities/especialidade/especialidade.reducer';
import { IPeriodicidade } from 'app/shared/model/periodicidade.model';
import { getEntities as getPeriodicidades } from 'app/entities/periodicidade/periodicidade.reducer';
import { IPeriodo } from 'app/shared/model/periodo.model';
import { getEntities as getPeriodos } from 'app/entities/periodo/periodo.reducer';
import { getEntity, getPadItemState, IPadItemBaseState, updateEntity, createEntity, reset } from './pad-item.reducer';
import { IPadItem } from 'app/shared/model/pad-item.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPadItemUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPadItemUpdateState {
  fieldsBase: IPadItemBaseState;
  isNew: boolean;
  idPadId: string;
  idEspecialidadeId: string;
  idPeriodicidadeId: string;
  idPeriodoId: string;
}

export class PadItemUpdate extends React.Component<IPadItemUpdateProps, IPadItemUpdateState> {
  constructor(props: Readonly<IPadItemUpdateProps>) {
    super(props);
    this.state = {
      fieldsBase: getPadItemState(this.props.location),
      idPadId: '0',
      idEspecialidadeId: '0',
      idPeriodicidadeId: '0',
      idPeriodoId: '0',
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

    this.props.getPads();
    this.props.getEspecialidades();
    this.props.getPeriodicidades();
    this.props.getPeriodos();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    values.dataPadItemIncompleto = convertDateTimeToServer(values.dataPadItemIncompleto);
    values.dataPadItemCompleto = convertDateTimeToServer(values.dataPadItemCompleto);

    if (errors.length === 0) {
      const { padItemEntity } = this.props;
      const entity = {
        ...padItemEntity,
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
    this.props.history.push('/pad-item');
  };

  render() {
    const { padItemEntity, pads, especialidades, periodicidades, periodos, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Items</li>
          <li className="breadcrumb-item active">Pad Items edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...padItemEntity,
                  idPad: padItemEntity.idPad ? padItemEntity.idPad.id : null,
                  idEspecialidade: padItemEntity.idEspecialidade ? padItemEntity.idEspecialidade.id : null,
                  idPeriodicidade: padItemEntity.idPeriodicidade ? padItemEntity.idPeriodicidade.id : null,
                  idPeriodo: padItemEntity.idPeriodo ? padItemEntity.idPeriodo.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.padItem.home.createOrEditLabel">Create or edit a PadItem</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/pad-item" replace color="info" className="float-right jh-create-entity">
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
                      <Label className="mt-2" for="pad-item-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="pad-item-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {!this.state.fieldsBase.idPedido ? (
                          <Col md="idPedido">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idPedidoLabel" for="pad-item-idPedido">
                                    <Translate contentKey="generadorApp.padItem.idPedido">Id Pedido</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-item-idPedido" type="text" name="idPedido" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idPedido" value={this.state.fieldsBase.idPedido} />
                        )}

                        {!this.state.fieldsBase.dataInicio ? (
                          <Col md="dataInicio">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="dataInicioLabel" for="pad-item-dataInicio">
                                    <Translate contentKey="generadorApp.padItem.dataInicio">Data Inicio</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-item-dataInicio" type="date" className="form-control" name="dataInicio" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="dataInicio" value={this.state.fieldsBase.dataInicio} />
                        )}

                        {!this.state.fieldsBase.dataFim ? (
                          <Col md="dataFim">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="dataFimLabel" for="pad-item-dataFim">
                                    <Translate contentKey="generadorApp.padItem.dataFim">Data Fim</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-item-dataFim" type="date" className="form-control" name="dataFim" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="dataFim" value={this.state.fieldsBase.dataFim} />
                        )}

                        {!this.state.fieldsBase.qtdSessoes ? (
                          <Col md="qtdSessoes">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="qtdSessoesLabel" for="pad-item-qtdSessoes">
                                    <Translate contentKey="generadorApp.padItem.qtdSessoes">Qtd Sessoes</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-item-qtdSessoes" type="string" className="form-control" name="qtdSessoes" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="qtdSessoes" value={this.state.fieldsBase.qtdSessoes} />
                        )}

                        {!this.state.fieldsBase.observacao ? (
                          <Col md="observacao">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="observacaoLabel" for="pad-item-observacao">
                                    <Translate contentKey="generadorApp.padItem.observacao">Observacao</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-item-observacao" type="text" name="observacao" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="observacao" value={this.state.fieldsBase.observacao} />
                        )}

                        {!this.state.fieldsBase.sub ? (
                          <Col md="sub">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="subLabel" for="pad-item-sub">
                                    <Translate contentKey="generadorApp.padItem.sub">Sub</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-item-sub" type="string" className="form-control" name="sub" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="sub" value={this.state.fieldsBase.sub} />
                        )}

                        {!this.state.fieldsBase.ativo ? (
                          <Col md="ativo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="ativoLabel" for="pad-item-ativo">
                                    <Translate contentKey="generadorApp.padItem.ativo">Ativo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-item-ativo" type="string" className="form-control" name="ativo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ativo" value={this.state.fieldsBase.ativo} />
                        )}

                        {!this.state.fieldsBase.dataPadItemIncompleto ? (
                          <Col md="dataPadItemIncompleto">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="dataPadItemIncompletoLabel" for="pad-item-dataPadItemIncompleto">
                                    <Translate contentKey="generadorApp.padItem.dataPadItemIncompleto">Data Pad Item Incompleto</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput
                                    id="pad-item-dataPadItemIncompleto"
                                    type="datetime-local"
                                    className="form-control"
                                    name="dataPadItemIncompleto"
                                    placeholder={'YYYY-MM-DD HH:mm'}
                                    value={isNew ? null : convertDateTimeFromServer(this.props.padItemEntity.dataPadItemIncompleto)}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="dataPadItemIncompleto" value={this.state.fieldsBase.dataPadItemIncompleto} />
                        )}

                        {!this.state.fieldsBase.dataPadItemCompleto ? (
                          <Col md="dataPadItemCompleto">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="dataPadItemCompletoLabel" for="pad-item-dataPadItemCompleto">
                                    <Translate contentKey="generadorApp.padItem.dataPadItemCompleto">Data Pad Item Completo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput
                                    id="pad-item-dataPadItemCompleto"
                                    type="datetime-local"
                                    className="form-control"
                                    name="dataPadItemCompleto"
                                    placeholder={'YYYY-MM-DD HH:mm'}
                                    value={isNew ? null : convertDateTimeFromServer(this.props.padItemEntity.dataPadItemCompleto)}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="dataPadItemCompleto" value={this.state.fieldsBase.dataPadItemCompleto} />
                        )}

                        {!this.state.fieldsBase.numGhc ? (
                          <Col md="numGhc">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="numGhcLabel" for="pad-item-numGhc">
                                    <Translate contentKey="generadorApp.padItem.numGhc">Num Ghc</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-item-numGhc" type="text" name="numGhc" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="numGhc" value={this.state.fieldsBase.numGhc} />
                        )}

                        {!this.state.fieldsBase.cidXPtaNovo ? (
                          <Col md="cidXPtaNovo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="cidXPtaNovoLabel" for="pad-item-cidXPtaNovo">
                                    <Translate contentKey="generadorApp.padItem.cidXPtaNovo">Cid X Pta Novo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-item-cidXPtaNovo" type="string" className="form-control" name="cidXPtaNovo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cidXPtaNovo" value={this.state.fieldsBase.cidXPtaNovo} />
                        )}

                        {!this.state.fieldsBase.categoriaId ? (
                          <Col md="categoriaId">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="categoriaIdLabel" for="pad-item-categoriaId">
                                    <Translate contentKey="generadorApp.padItem.categoriaId">Categoria Id</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-item-categoriaId" type="string" className="form-control" name="categoriaId" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="categoriaId" value={this.state.fieldsBase.categoriaId} />
                        )}

                        {!this.state.fieldsBase.score ? (
                          <Col md="score">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="scoreLabel" for="pad-item-score">
                                    <Translate contentKey="generadorApp.padItem.score">Score</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-item-score" type="string" className="form-control" name="score" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="score" value={this.state.fieldsBase.score} />
                        )}
                        {!this.state.fieldsBase.atendimento ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="atendimento" value={this.state.fieldsBase.atendimento} />
                        )}
                        {!this.state.fieldsBase.atendimentoCepRecusado ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="atendimentoCepRecusado" value={this.state.fieldsBase.atendimentoCepRecusado} />
                        )}
                        {!this.state.fieldsBase.atendimentoSorteioFeito ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="atendimentoSorteioFeito" value={this.state.fieldsBase.atendimentoSorteioFeito} />
                        )}
                        {!this.state.fieldsBase.padItemAtividade ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="padItemAtividade" value={this.state.fieldsBase.padItemAtividade} />
                        )}
                        {!this.state.fieldsBase.padItemCepRecusado ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="padItemCepRecusado" value={this.state.fieldsBase.padItemCepRecusado} />
                        )}
                        {!this.state.fieldsBase.padItemResultado ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="padItemResultado" value={this.state.fieldsBase.padItemResultado} />
                        )}
                        {!this.state.fieldsBase.padItemSorteioFeito ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="padItemSorteioFeito" value={this.state.fieldsBase.padItemSorteioFeito} />
                        )}
                        {!this.state.fieldsBase.idPad ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="pad-item-idPad">
                                    <Translate contentKey="generadorApp.padItem.idPad">Id Pad</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="pad-item-idPad" type="select" className="form-control" name="idPad">
                                    <option value="null" key="0">
                                      {translate('generadorApp.padItem.idPad.empty')}
                                    </option>
                                    {pads
                                      ? pads.map(otherEntity => (
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
                          <AvInput type="hidden" name="idPad" value={this.state.fieldsBase.idPad} />
                        )}
                        {!this.state.fieldsBase.idEspecialidade ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="pad-item-idEspecialidade">
                                    <Translate contentKey="generadorApp.padItem.idEspecialidade">Id Especialidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="pad-item-idEspecialidade" type="select" className="form-control" name="idEspecialidade">
                                    <option value="null" key="0">
                                      {translate('generadorApp.padItem.idEspecialidade.empty')}
                                    </option>
                                    {especialidades
                                      ? especialidades.map(otherEntity => (
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
                          <AvInput type="hidden" name="idEspecialidade" value={this.state.fieldsBase.idEspecialidade} />
                        )}
                        {!this.state.fieldsBase.idPeriodicidade ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="pad-item-idPeriodicidade">
                                    <Translate contentKey="generadorApp.padItem.idPeriodicidade">Id Periodicidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="pad-item-idPeriodicidade" type="select" className="form-control" name="idPeriodicidade">
                                    <option value="null" key="0">
                                      {translate('generadorApp.padItem.idPeriodicidade.empty')}
                                    </option>
                                    {periodicidades
                                      ? periodicidades.map(otherEntity => (
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
                          <AvInput type="hidden" name="idPeriodicidade" value={this.state.fieldsBase.idPeriodicidade} />
                        )}
                        {!this.state.fieldsBase.idPeriodo ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="pad-item-idPeriodo">
                                    <Translate contentKey="generadorApp.padItem.idPeriodo">Id Periodo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="pad-item-idPeriodo" type="select" className="form-control" name="idPeriodo">
                                    <option value="null" key="0">
                                      {translate('generadorApp.padItem.idPeriodo.empty')}
                                    </option>
                                    {periodos
                                      ? periodos.map(otherEntity => (
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
                          <AvInput type="hidden" name="idPeriodo" value={this.state.fieldsBase.idPeriodo} />
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
  pads: storeState.pad.entities,
  especialidades: storeState.especialidade.entities,
  periodicidades: storeState.periodicidade.entities,
  periodos: storeState.periodo.entities,
  padItemEntity: storeState.padItem.entity,
  loading: storeState.padItem.loading,
  updating: storeState.padItem.updating,
  updateSuccess: storeState.padItem.updateSuccess
});

const mapDispatchToProps = {
  getPads,
  getEspecialidades,
  getPeriodicidades,
  getPeriodos,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadItemUpdate);
