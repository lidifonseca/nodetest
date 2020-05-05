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
  getEntity,
  getPadItemIndicadoresState,
  IPadItemIndicadoresBaseState,
  updateEntity,
  createEntity,
  reset
} from './pad-item-indicadores.reducer';
import { IPadItemIndicadores } from 'app/shared/model/pad-item-indicadores.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPadItemIndicadoresUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPadItemIndicadoresUpdateState {
  fieldsBase: IPadItemIndicadoresBaseState;
  isNew: boolean;
}

export class PadItemIndicadoresUpdate extends React.Component<IPadItemIndicadoresUpdateProps, IPadItemIndicadoresUpdateState> {
  constructor(props: Readonly<IPadItemIndicadoresUpdateProps>) {
    super(props);
    this.state = {
      fieldsBase: getPadItemIndicadoresState(this.props.location),
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
    if (errors.length === 0) {
      const { padItemIndicadoresEntity } = this.props;
      const entity = {
        ...padItemIndicadoresEntity,
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
    this.props.history.push('/pad-item-indicadores');
  };

  render() {
    const { padItemIndicadoresEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Item Indicadores</li>
          <li className="breadcrumb-item active">Pad Item Indicadores edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...padItemIndicadoresEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.padItemIndicadores.home.createOrEditLabel">
                    Create or edit a PadItemIndicadores
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
                  to="/pad-item-indicadores"
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
                      <Label className="mt-2" for="pad-item-indicadores-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="pad-item-indicadores-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {!this.state.fieldsBase.idUnidadeMedida ? (
                          <Col md="idUnidadeMedida">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idUnidadeMedidaLabel" for="pad-item-indicadores-idUnidadeMedida">
                                    <Translate contentKey="generadorApp.padItemIndicadores.idUnidadeMedida">Id Unidade Medida</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="pad-item-indicadores-idUnidadeMedida"
                                    type="string"
                                    className="form-control"
                                    name="idUnidadeMedida"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idUnidadeMedida" value={this.state.fieldsBase.idUnidadeMedida} />
                        )}

                        {!this.state.fieldsBase.titulo ? (
                          <Col md="titulo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="tituloLabel" for="pad-item-indicadores-titulo">
                                    <Translate contentKey="generadorApp.padItemIndicadores.titulo">Titulo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-item-indicadores-titulo" type="text" name="titulo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="titulo" value={this.state.fieldsBase.titulo} />
                        )}

                        {!this.state.fieldsBase.descricao ? (
                          <Col md="descricao">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="descricaoLabel" for="pad-item-indicadores-descricao">
                                    <Translate contentKey="generadorApp.padItemIndicadores.descricao">Descricao</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-item-indicadores-descricao" type="text" name="descricao" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="descricao" value={this.state.fieldsBase.descricao} />
                        )}

                        {!this.state.fieldsBase.meta ? (
                          <Col md="meta">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="metaLabel" for="pad-item-indicadores-meta">
                                    <Translate contentKey="generadorApp.padItemIndicadores.meta">Meta</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-item-indicadores-meta" type="string" className="form-control" name="meta" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="meta" value={this.state.fieldsBase.meta} />
                        )}

                        {!this.state.fieldsBase.maximoSt ? (
                          <Col md="maximoSt">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="maximoStLabel" for="pad-item-indicadores-maximoSt">
                                    <Translate contentKey="generadorApp.padItemIndicadores.maximoSt">Maximo St</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-item-indicadores-maximoSt" type="string" className="form-control" name="maximoSt" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="maximoSt" value={this.state.fieldsBase.maximoSt} />
                        )}

                        {!this.state.fieldsBase.minimoSt ? (
                          <Col md="minimoSt">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="minimoStLabel" for="pad-item-indicadores-minimoSt">
                                    <Translate contentKey="generadorApp.padItemIndicadores.minimoSt">Minimo St</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-item-indicadores-minimoSt" type="string" className="form-control" name="minimoSt" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="minimoSt" value={this.state.fieldsBase.minimoSt} />
                        )}
                        {!this.state.fieldsBase.cidXPtaNovoPadItemIndi ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="cidXPtaNovoPadItemIndi" value={this.state.fieldsBase.cidXPtaNovoPadItemIndi} />
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
  padItemIndicadoresEntity: storeState.padItemIndicadores.entity,
  loading: storeState.padItemIndicadores.loading,
  updating: storeState.padItemIndicadores.updating,
  updateSuccess: storeState.padItemIndicadores.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadItemIndicadoresUpdate);
