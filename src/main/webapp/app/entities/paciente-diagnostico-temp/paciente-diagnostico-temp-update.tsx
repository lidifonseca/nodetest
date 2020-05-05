import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './paciente-diagnostico-temp.reducer';
import { IPacienteDiagnosticoTemp } from 'app/shared/model/paciente-diagnostico-temp.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPacienteDiagnosticoTempUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPacienteDiagnosticoTempUpdateState {
  isNew: boolean;
}

export class PacienteDiagnosticoTempUpdate extends React.Component<
  IPacienteDiagnosticoTempUpdateProps,
  IPacienteDiagnosticoTempUpdateState
> {
  constructor(props: Readonly<IPacienteDiagnosticoTempUpdateProps>) {
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
    if (errors.length === 0) {
      const { pacienteDiagnosticoTempEntity } = this.props;
      const entity = {
        ...pacienteDiagnosticoTempEntity,
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
    this.props.history.push('/paciente-diagnostico-temp');
  };

  render() {
    const { pacienteDiagnosticoTempEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Diagnostico Temps</li>
          <li className="breadcrumb-item active">Paciente Diagnostico Temps edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...pacienteDiagnosticoTempEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.home.createOrEditLabel">
                    Create or edit a PacienteDiagnosticoTemp
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
                  to="/paciente-diagnostico-temp"
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
                    <Row>
                      {!isNew ? (
                        <AvGroup>
                          <Row>
                            {/*
                      <Col md="3">
                      <Label className="mt-2" for="paciente-diagnostico-temp-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput
                                id="paciente-diagnostico-temp-id"
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

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="idCidLabel" for="paciente-diagnostico-temp-idCid">
                                <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.idCid">Id Cid</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="paciente-diagnostico-temp-idCid" type="string" className="form-control" name="idCid" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="12">
                              <Label className="mt-2" id="cidPrimarioLabel" check>
                                <AvInput
                                  id="paciente-diagnostico-temp-cidPrimario"
                                  type="checkbox"
                                  className="form-control"
                                  name="cidPrimario"
                                />
                                <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.cidPrimario">Cid Primario</Translate>
                              </Label>
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="complexidadeLabel" for="paciente-diagnostico-temp-complexidade">
                                <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.complexidade">Complexidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-diagnostico-temp-complexidade"
                                type="text"
                                name="complexidade"
                                validate={{
                                  maxLength: { value: 45, errorMessage: translate('entity.validation.maxlength', { max: 45 }) }
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
                              <Label className="mt-2" id="createdAtLabel" for="paciente-diagnostico-temp-createdAt">
                                <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.createdAt">Created At</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="paciente-diagnostico-temp-createdAt" type="date" className="form-control" name="createdAt" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="sessionIdLabel" for="paciente-diagnostico-temp-sessionId">
                                <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.sessionId">Session Id</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-diagnostico-temp-sessionId"
                                type="text"
                                name="sessionId"
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
                              <Label className="mt-2" id="observacaoLabel" for="paciente-diagnostico-temp-observacao">
                                <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.observacao">Observacao</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-diagnostico-temp-observacao"
                                type="text"
                                name="observacao"
                                validate={{
                                  maxLength: { value: 245, errorMessage: translate('entity.validation.maxlength', { max: 245 }) }
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
  pacienteDiagnosticoTempEntity: storeState.pacienteDiagnosticoTemp.entity,
  loading: storeState.pacienteDiagnosticoTemp.loading,
  updating: storeState.pacienteDiagnosticoTemp.updating,
  updateSuccess: storeState.pacienteDiagnosticoTemp.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteDiagnosticoTempUpdate);