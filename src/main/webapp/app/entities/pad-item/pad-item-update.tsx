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

import { IPad } from 'app/shared/model/pad.model';
import { getEntities as getPads } from 'app/entities/pad/pad.reducer';
import { IEspecialidade } from 'app/shared/model/especialidade.model';
import { getEntities as getEspecialidades } from 'app/entities/especialidade/especialidade.reducer';
import { IPeriodicidade } from 'app/shared/model/periodicidade.model';
import { getEntities as getPeriodicidades } from 'app/entities/periodicidade/periodicidade.reducer';
import { IPeriodo } from 'app/shared/model/periodo.model';
import { getEntities as getPeriodos } from 'app/entities/periodo/periodo.reducer';
import {
  IPadItemUpdateState,
  getEntity,
  getPadItemState,
  IPadItemBaseState,
  updateEntity,
  createEntity,
  setBlob,
  reset
} from './pad-item.reducer';
import { IPadItem } from 'app/shared/model/pad-item.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPadItemUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PadItemUpdate extends React.Component<IPadItemUpdateProps, IPadItemUpdateState> {
  observacaoFileInput: React.RefObject<HTMLInputElement>;

  constructor(props: Readonly<IPadItemUpdateProps>) {
    super(props);

    this.observacaoFileInput = React.createRef();

    this.state = {
      padSelectValue: null,
      especialidadeSelectValue: null,
      periodicidadeSelectValue: null,
      periodoSelectValue: null,
      fieldsBase: getPadItemState(this.props.location),
      padId: '0',
      especialidadeId: '0',
      periodicidadeId: '0',
      periodoId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }

    if (nextProps.pads.length > 0 && this.state.padSelectValue === null && nextProps.padItemEntity.pad && nextProps.padItemEntity.pad.id) {
      this.setState({
        padSelectValue: nextProps.pads.map(p => (nextProps.padItemEntity.pad.id === p.id ? { value: p.id, label: p.id } : null))
      });
    }

    if (
      nextProps.especialidades.length > 0 &&
      this.state.especialidadeSelectValue === null &&
      nextProps.padItemEntity.especialidade &&
      nextProps.padItemEntity.especialidade.id
    ) {
      this.setState({
        especialidadeSelectValue: nextProps.especialidades.map(p =>
          nextProps.padItemEntity.especialidade.id === p.id ? { value: p.id, label: p.id } : null
        )
      });
    }

    if (
      nextProps.periodicidades.length > 0 &&
      this.state.periodicidadeSelectValue === null &&
      nextProps.padItemEntity.periodicidade &&
      nextProps.padItemEntity.periodicidade.id
    ) {
      this.setState({
        periodicidadeSelectValue: nextProps.periodicidades.map(p =>
          nextProps.padItemEntity.periodicidade.id === p.id ? { value: p.id, label: p.id } : null
        )
      });
    }

    if (
      nextProps.periodos.length > 0 &&
      this.state.periodoSelectValue === null &&
      nextProps.padItemEntity.periodo &&
      nextProps.padItemEntity.periodo.id
    ) {
      this.setState({
        periodoSelectValue: nextProps.periodos.map(p => (nextProps.padItemEntity.periodo.id === p.id ? { value: p.id, label: p.id } : null))
      });
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
    values.dataPadItemIncompleto = convertDateTimeToServer(values.dataPadItemIncompleto);
    values.dataPadItemCompleto = convertDateTimeToServer(values.dataPadItemCompleto);

    if (errors.length === 0) {
      const { padItemEntity } = this.props;
      const entity = {
        ...padItemEntity,
        pad: this.state.padSelectValue ? this.state.padSelectValue['value'] : null,
        especialidade: this.state.especialidadeSelectValue ? this.state.especialidadeSelectValue['value'] : null,
        periodicidade: this.state.periodicidadeSelectValue ? this.state.periodicidadeSelectValue['value'] : null,
        periodo: this.state.periodoSelectValue ? this.state.periodoSelectValue['value'] : null,
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
    this.props.history.push('/pad-item?' + this.getFiltersURL());
  };

  render() {
    const { padItemEntity, pads, especialidades, periodicidades, periodos, loading, updating } = this.props;
    const { isNew } = this.state;

    const { observacao } = padItemEntity;
    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...padItemEntity,
                  pad: padItemEntity.pad ? padItemEntity.pad.id : null,
                  especialidade: padItemEntity.especialidade ? padItemEntity.especialidade.id : null,
                  periodicidade: padItemEntity.periodicidade ? padItemEntity.periodicidade.id : null,
                  periodo: padItemEntity.periodo ? padItemEntity.periodo.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.padItem.home.createOrEditLabel">Create or edit a PadItem</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/pad-item?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Pad Items</li>
            <li className="breadcrumb-item active">Pad Items edit</li>
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
                        {baseFilters !== 'idPedido' ? (
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
                          <AvInput type="hidden" name="idPedido" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'dataInicio' ? (
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
                          <AvInput type="hidden" name="dataInicio" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'dataFim' ? (
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
                          <AvInput type="hidden" name="dataFim" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'qtdSessoes' ? (
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
                          <AvInput type="hidden" name="qtdSessoes" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'observacao' ? (
                          <Col md="observacao">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="observacaoLabel" for="pad-item-observacao">
                                    <Translate contentKey="generadorApp.padItem.observacao">Observacao</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="pad-item-observacao" type="textarea" name="observacao" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="observacao" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'sub' ? (
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
                          <AvInput type="hidden" name="sub" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ativo' ? (
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
                          <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'dataPadItemIncompleto' ? (
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
                          <AvInput type="hidden" name="dataPadItemIncompleto" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'dataPadItemCompleto' ? (
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
                          <AvInput type="hidden" name="dataPadItemCompleto" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'numGhc' ? (
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
                          <AvInput type="hidden" name="numGhc" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'atendimento' ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="atendimento" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'atendimentoCepRecusado' ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="atendimentoCepRecusado" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'atendimentoSorteioFeito' ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="atendimentoSorteioFeito" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'padItemAtividade' ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="padItemAtividade" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'padItemCepRecusado' ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="padItemCepRecusado" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'padItemResultado' ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="padItemResultado" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'padItemSorteioFeito' ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="padItemSorteioFeito" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'pad' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="pad-item-pad">
                                    <Translate contentKey="generadorApp.padItem.pad">Pad</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="pad-item-pad"
                                    className={'css-select-control'}
                                    value={this.state.padSelectValue}
                                    options={pads ? pads.map(option => ({ value: option.id, label: option.id })) : null}
                                    onChange={options => this.setState({ padSelectValue: options })}
                                    name={'pad'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="pad" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'especialidade' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="pad-item-especialidade">
                                    <Translate contentKey="generadorApp.padItem.especialidade">Especialidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="pad-item-especialidade"
                                    className={'css-select-control'}
                                    value={this.state.especialidadeSelectValue}
                                    options={especialidades ? especialidades.map(option => ({ value: option.id, label: option.id })) : null}
                                    onChange={options => this.setState({ especialidadeSelectValue: options })}
                                    name={'especialidade'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="especialidade" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'periodicidade' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="pad-item-periodicidade">
                                    <Translate contentKey="generadorApp.padItem.periodicidade">Periodicidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="pad-item-periodicidade"
                                    className={'css-select-control'}
                                    value={this.state.periodicidadeSelectValue}
                                    options={periodicidades ? periodicidades.map(option => ({ value: option.id, label: option.id })) : null}
                                    onChange={options => this.setState({ periodicidadeSelectValue: options })}
                                    name={'periodicidade'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="periodicidade" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'periodo' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="pad-item-periodo">
                                    <Translate contentKey="generadorApp.padItem.periodo">Periodo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="pad-item-periodo"
                                    className={'css-select-control'}
                                    value={this.state.periodoSelectValue}
                                    options={periodos ? periodos.map(option => ({ value: option.id, label: option.id })) : null}
                                    onChange={options => this.setState({ periodoSelectValue: options })}
                                    name={'periodo'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="periodo" value={this.state.fieldsBase[baseFilters]} />
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
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadItemUpdate);
