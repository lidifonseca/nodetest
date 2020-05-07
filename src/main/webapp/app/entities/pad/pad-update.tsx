import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { getEntities as getUnidadeEasies } from 'app/entities/unidade-easy/unidade-easy.reducer';
import { IPadUpdateState, getEntity, getPadState, IPadBaseState, updateEntity, createEntity, reset } from './pad.reducer';
import { IPad } from 'app/shared/model/pad.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPadUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PadUpdate extends React.Component<IPadUpdateProps, IPadUpdateState> {
  constructor(props: Readonly<IPadUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getPadState(this.props.location),
      unidadeId: '0',
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

    this.props.getUnidadeEasies();
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
      (fieldsBase['idOperadora'] ? '&idOperadora=' + fieldsBase['idOperadora'] : '') +
      (fieldsBase['idFranquia'] ? '&idFranquia=' + fieldsBase['idFranquia'] : '') +
      (fieldsBase['nroPad'] ? '&nroPad=' + fieldsBase['nroPad'] : '') +
      (fieldsBase['dataInicio'] ? '&dataInicio=' + fieldsBase['dataInicio'] : '') +
      (fieldsBase['dataFim'] ? '&dataFim=' + fieldsBase['dataFim'] : '') +
      (fieldsBase['dataConferido'] ? '&dataConferido=' + fieldsBase['dataConferido'] : '') +
      (fieldsBase['ativo'] ? '&ativo=' + fieldsBase['ativo'] : '') +
      (fieldsBase['statusPad'] ? '&statusPad=' + fieldsBase['statusPad'] : '') +
      (fieldsBase['novoModelo'] ? '&novoModelo=' + fieldsBase['novoModelo'] : '') +
      (fieldsBase['imagePath'] ? '&imagePath=' + fieldsBase['imagePath'] : '') +
      (fieldsBase['score'] ? '&score=' + fieldsBase['score'] : '') +
      (fieldsBase['unidade'] ? '&unidade=' + fieldsBase['unidade'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { padEntity } = this.props;
      const entity = {
        ...padEntity,
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
    this.props.history.push('/pad?' + this.getFiltersURL());
  };

  render() {
    const { padEntity, unidadeEasies, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pads</li>
          <li className="breadcrumb-item active">Pads edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...padEntity,
                  unidade: padEntity.unidade ? padEntity.unidade.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.pad.home.createOrEditLabel">Create or edit a Pad</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button
                  tag={Link}
                  id="cancel-save"
                  to={'/pad?' + this.getFiltersURL()}
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
                      <Label className="mt-2" for="pad-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="pad-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'idOperadora' ? (
                          <Col md="idOperadora">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idOperadoraLabel" for="pad-idOperadora">
                                    <Translate contentKey="generadorApp.pad.idOperadora">Id Operadora</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-idOperadora" type="string" className="form-control" name="idOperadora" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idOperadora" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'idFranquia' ? (
                          <Col md="idFranquia">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idFranquiaLabel" for="pad-idFranquia">
                                    <Translate contentKey="generadorApp.pad.idFranquia">Id Franquia</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-idFranquia" type="text" name="idFranquia" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idFranquia" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'nroPad' ? (
                          <Col md="nroPad">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="nroPadLabel" for="pad-nroPad">
                                    <Translate contentKey="generadorApp.pad.nroPad">Nro Pad</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-nroPad" type="text" name="nroPad" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="nroPad" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'dataInicio' ? (
                          <Col md="dataInicio">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="dataInicioLabel" for="pad-dataInicio">
                                    <Translate contentKey="generadorApp.pad.dataInicio">Data Inicio</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-dataInicio" type="date" className="form-control" name="dataInicio" />
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
                                  <Label className="mt-2" id="dataFimLabel" for="pad-dataFim">
                                    <Translate contentKey="generadorApp.pad.dataFim">Data Fim</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-dataFim" type="date" className="form-control" name="dataFim" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="dataFim" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'dataConferido' ? (
                          <Col md="dataConferido">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="dataConferidoLabel" for="pad-dataConferido">
                                    <Translate contentKey="generadorApp.pad.dataConferido">Data Conferido</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-dataConferido" type="date" className="form-control" name="dataConferido" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="dataConferido" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'ativo' ? (
                          <Col md="ativo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="ativoLabel" for="pad-ativo">
                                    <Translate contentKey="generadorApp.pad.ativo">Ativo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-ativo" type="string" className="form-control" name="ativo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'statusPad' ? (
                          <Col md="statusPad">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="statusPadLabel" for="pad-statusPad">
                                    <Translate contentKey="generadorApp.pad.statusPad">Status Pad</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-statusPad" type="string" className="form-control" name="statusPad" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="statusPad" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'novoModelo' ? (
                          <Col md="novoModelo">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="novoModeloLabel" check>
                                    <AvInput id="pad-novoModelo" type="checkbox" className="form-control" name="novoModelo" />
                                    <Translate contentKey="generadorApp.pad.novoModelo">Novo Modelo</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="novoModelo" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'imagePath' ? (
                          <Col md="imagePath">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="imagePathLabel" for="pad-imagePath">
                                    <Translate contentKey="generadorApp.pad.imagePath">Image Path</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-imagePath" type="text" name="imagePath" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="imagePath" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'score' ? (
                          <Col md="score">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="scoreLabel" for="pad-score">
                                    <Translate contentKey="generadorApp.pad.score">Score</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-score" type="string" className="form-control" name="score" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="score" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'unidade' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="pad-unidade">
                                    <Translate contentKey="generadorApp.pad.unidade">Unidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="pad-unidade" type="select" className="form-control" name="unidade">
                                    <option value="null" key="0">
                                      {translate('generadorApp.pad.unidade.empty')}
                                    </option>
                                    {unidadeEasies
                                      ? unidadeEasies.map(otherEntity => (
                                          <option value={otherEntity.id} key={otherEntity.id}>
                                            {otherEntity.razaoSocial}
                                          </option>
                                        ))
                                      : null}
                                  </AvInput>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="unidade" value={this.state.fieldsBase[baseFilters]} />
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
  unidadeEasies: storeState.unidadeEasy.entities,
  padEntity: storeState.pad.entity,
  loading: storeState.pad.loading,
  updating: storeState.pad.updating,
  updateSuccess: storeState.pad.updateSuccess
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadUpdate);
