import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICidXPtaNovoPadItemIndi } from 'app/shared/model/cid-x-pta-novo-pad-item-indi.model';
import { getEntities as getCidXPtaNovoPadItemIndis } from 'app/entities/cid-x-pta-novo-pad-item-indi/cid-x-pta-novo-pad-item-indi.reducer';
import { getEntity, updateEntity, createEntity, reset } from './alertas-indicadores.reducer';
import { IAlertasIndicadores } from 'app/shared/model/alertas-indicadores.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAlertasIndicadoresUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAlertasIndicadoresUpdateState {
  isNew: boolean;
  padItemIndicadoresIdId: string;
}

export class AlertasIndicadoresUpdate extends React.Component<IAlertasIndicadoresUpdateProps, IAlertasIndicadoresUpdateState> {
  constructor(props: Readonly<IAlertasIndicadoresUpdateProps>) {
    super(props);
    this.state = {
      padItemIndicadoresIdId: '0',
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

    this.props.getCidXPtaNovoPadItemIndis();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { alertasIndicadoresEntity } = this.props;
      const entity = {
        ...alertasIndicadoresEntity,
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
    this.props.history.push('/alertas-indicadores');
  };

  render() {
    const { alertasIndicadoresEntity, cidXPtaNovoPadItemIndis, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Alertas Indicadores</li>
          <li className="breadcrumb-item active">Alertas Indicadores edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...alertasIndicadoresEntity,
                  padItemIndicadoresId: alertasIndicadoresEntity.padItemIndicadoresId
                    ? alertasIndicadoresEntity.padItemIndicadoresId.id
                    : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.alertasIndicadores.home.createOrEditLabel">
                    Create or edit a AlertasIndicadores
                  </Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/alertas-indicadores" replace color="info" className="float-right jh-create-entity">
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
                      <Label className="mt-2" for="alertas-indicadores-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="alertas-indicadores-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="pontuacaoLabel" for="alertas-indicadores-pontuacao">
                                <Translate contentKey="generadorApp.alertasIndicadores.pontuacao">Pontuacao</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="alertas-indicadores-pontuacao" type="string" className="form-control" name="pontuacao" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="12">
                              <Label className="mt-2" id="alteracaoEsperadaLabel" check>
                                <AvInput
                                  id="alertas-indicadores-alteracaoEsperada"
                                  type="checkbox"
                                  className="form-control"
                                  name="alteracaoEsperada"
                                />
                                <Translate contentKey="generadorApp.alertasIndicadores.alteracaoEsperada">Alteracao Esperada</Translate>
                              </Label>
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="observacoesLabel" for="alertas-indicadores-observacoes">
                                <Translate contentKey="generadorApp.alertasIndicadores.observacoes">Observacoes</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="alertas-indicadores-observacoes"
                                type="text"
                                name="observacoes"
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
                              <Label className="mt-2" id="usuarioIdLabel" for="alertas-indicadores-usuarioId">
                                <Translate contentKey="generadorApp.alertasIndicadores.usuarioId">Usuario Id</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="alertas-indicadores-usuarioId" type="string" className="form-control" name="usuarioId" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>
                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" for="alertas-indicadores-padItemIndicadoresId">
                                <Translate contentKey="generadorApp.alertasIndicadores.padItemIndicadoresId">
                                  Pad Item Indicadores Id
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="alertas-indicadores-padItemIndicadoresId"
                                type="select"
                                className="form-control"
                                name="padItemIndicadoresId"
                              >
                                <option value="null" key="0">
                                  {translate('generadorApp.alertasIndicadores.padItemIndicadoresId.empty')}
                                </option>
                                {cidXPtaNovoPadItemIndis
                                  ? cidXPtaNovoPadItemIndis.map(otherEntity => (
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
  cidXPtaNovoPadItemIndis: storeState.cidXPtaNovoPadItemIndi.entities,
  alertasIndicadoresEntity: storeState.alertasIndicadores.entity,
  loading: storeState.alertasIndicadores.loading,
  updating: storeState.alertasIndicadores.updating,
  updateSuccess: storeState.alertasIndicadores.updateSuccess
});

const mapDispatchToProps = {
  getCidXPtaNovoPadItemIndis,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AlertasIndicadoresUpdate);
