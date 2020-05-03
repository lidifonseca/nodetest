import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './pad-item-temp.reducer';
import { IPadItemTemp } from 'app/shared/model/pad-item-temp.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPadItemTempUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPadItemTempUpdateState {
  isNew: boolean;
}

export class PadItemTempUpdate extends React.Component<IPadItemTempUpdateProps, IPadItemTempUpdateState> {
  constructor(props: Readonly<IPadItemTempUpdateProps>) {
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

  saveEntity = (event: any, errors: any, values: any) => {
    values.dataPost = convertDateTimeToServer(values.dataPost);

    if (errors.length === 0) {
      const { padItemTempEntity } = this.props;
      const entity = {
        ...padItemTempEntity,
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
    this.props.history.push('/pad-item-temp');
  };

  render() {
    const { padItemTempEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Item Temps</li>
          <li className="breadcrumb-item active">Pad Item Temps edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...padItemTempEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.padItemTemp.home.createOrEditLabel">Create or edit a PadItemTemp</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/pad-item-temp" replace color="info" className="float-right jh-create-entity">
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
                      <Label className="mt-2" for="pad-item-temp-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="pad-item-temp-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="sessionIdLabel" for="pad-item-temp-sessionId">
                                <Translate contentKey="generadorApp.padItemTemp.sessionId">Session Id</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="pad-item-temp-sessionId"
                                type="text"
                                name="sessionId"
                                validate={{
                                  maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
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
                              <Label className="mt-2" id="idEspecialidadeLabel" for="pad-item-temp-idEspecialidade">
                                <Translate contentKey="generadorApp.padItemTemp.idEspecialidade">Id Especialidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="pad-item-temp-idEspecialidade" type="string" className="form-control" name="idEspecialidade" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="idPeriodicidadeLabel" for="pad-item-temp-idPeriodicidade">
                                <Translate contentKey="generadorApp.padItemTemp.idPeriodicidade">Id Periodicidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="pad-item-temp-idPeriodicidade" type="string" className="form-control" name="idPeriodicidade" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="idPeriodoLabel" for="pad-item-temp-idPeriodo">
                                <Translate contentKey="generadorApp.padItemTemp.idPeriodo">Id Periodo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="pad-item-temp-idPeriodo" type="string" className="form-control" name="idPeriodo" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="dataInicioLabel" for="pad-item-temp-dataInicio">
                                <Translate contentKey="generadorApp.padItemTemp.dataInicio">Data Inicio</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="pad-item-temp-dataInicio" type="date" className="form-control" name="dataInicio" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="dataFimLabel" for="pad-item-temp-dataFim">
                                <Translate contentKey="generadorApp.padItemTemp.dataFim">Data Fim</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="pad-item-temp-dataFim" type="date" className="form-control" name="dataFim" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="qtdSessoesLabel" for="pad-item-temp-qtdSessoes">
                                <Translate contentKey="generadorApp.padItemTemp.qtdSessoes">Qtd Sessoes</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="pad-item-temp-qtdSessoes" type="string" className="form-control" name="qtdSessoes" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="observacaoLabel" for="pad-item-temp-observacao">
                                <Translate contentKey="generadorApp.padItemTemp.observacao">Observacao</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="pad-item-temp-observacao"
                                type="text"
                                name="observacao"
                                validate={{
                                  maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
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
                              <Label className="mt-2" id="dataPostLabel" for="pad-item-temp-dataPost">
                                <Translate contentKey="generadorApp.padItemTemp.dataPost">Data Post</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="pad-item-temp-dataPost"
                                type="datetime-local"
                                className="form-control"
                                name="dataPost"
                                placeholder={'YYYY-MM-DD HH:mm'}
                                value={isNew ? null : convertDateTimeFromServer(this.props.padItemTempEntity.dataPost)}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cidXPtaNovoIdLabel" for="pad-item-temp-cidXPtaNovoId">
                                <Translate contentKey="generadorApp.padItemTemp.cidXPtaNovoId">Cid X Pta Novo Id</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="pad-item-temp-cidXPtaNovoId" type="string" className="form-control" name="cidXPtaNovoId" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="categoriaIdLabel" for="pad-item-temp-categoriaId">
                                <Translate contentKey="generadorApp.padItemTemp.categoriaId">Categoria Id</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="pad-item-temp-categoriaId" type="string" className="form-control" name="categoriaId" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="numGhcLabel" for="pad-item-temp-numGhc">
                                <Translate contentKey="generadorApp.padItemTemp.numGhc">Num Ghc</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="pad-item-temp-numGhc"
                                type="text"
                                name="numGhc"
                                validate={{
                                  maxLength: { value: 40, errorMessage: translate('entity.validation.maxlength', { max: 40 }) }
                                }}
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
  padItemTempEntity: storeState.padItemTemp.entity,
  loading: storeState.padItemTemp.loading,
  updating: storeState.padItemTemp.updating,
  updateSuccess: storeState.padItemTemp.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadItemTempUpdate);
