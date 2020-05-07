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
  IPacienteDiagnosticoTempUpdateState,
  getEntity,
  getPacienteDiagnosticoTempState,
  IPacienteDiagnosticoTempBaseState,
  updateEntity,
  createEntity,
  reset
} from './paciente-diagnostico-temp.reducer';
import { IPacienteDiagnosticoTemp } from 'app/shared/model/paciente-diagnostico-temp.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPacienteDiagnosticoTempUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteDiagnosticoTempUpdate extends React.Component<
  IPacienteDiagnosticoTempUpdateProps,
  IPacienteDiagnosticoTempUpdateState
> {
  constructor(props: Readonly<IPacienteDiagnosticoTempUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getPacienteDiagnosticoTempState(this.props.location),
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
      (fieldsBase['idCid'] ? '&idCid=' + fieldsBase['idCid'] : '') +
      (fieldsBase['cidPrimario'] ? '&cidPrimario=' + fieldsBase['cidPrimario'] : '') +
      (fieldsBase['complexidade'] ? '&complexidade=' + fieldsBase['complexidade'] : '') +
      (fieldsBase['createdAt'] ? '&createdAt=' + fieldsBase['createdAt'] : '') +
      (fieldsBase['sessionId'] ? '&sessionId=' + fieldsBase['sessionId'] : '') +
      (fieldsBase['observacao'] ? '&observacao=' + fieldsBase['observacao'] : '') +
      ''
    );
  };
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
    this.props.history.push('/paciente-diagnostico-temp?' + this.getFiltersURL());
  };

  render() {
    const { pacienteDiagnosticoTempEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
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
                  to={'/paciente-diagnostico-temp?' + this.getFiltersURL()}
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
                      <Row>
                        {baseFilters !== 'idCid' ? (
                          <Col md="idCid">
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
                        ) : (
                          <AvInput type="hidden" name="idCid" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'cidPrimario' ? (
                          <Col md="cidPrimario">
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
                        ) : (
                          <AvInput type="hidden" name="cidPrimario" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'complexidade' ? (
                          <Col md="complexidade">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="complexidadeLabel" for="paciente-diagnostico-temp-complexidade">
                                    <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.complexidade">Complexidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-diagnostico-temp-complexidade" type="text" name="complexidade" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="complexidade" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'createdAt' ? (
                          <Col md="createdAt">
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
                        ) : (
                          <AvInput type="hidden" name="createdAt" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'sessionId' ? (
                          <Col md="sessionId">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="sessionIdLabel" for="paciente-diagnostico-temp-sessionId">
                                    <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.sessionId">Session Id</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-diagnostico-temp-sessionId" type="text" name="sessionId" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="sessionId" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'observacao' ? (
                          <Col md="observacao">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="observacaoLabel" for="paciente-diagnostico-temp-observacao">
                                    <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.observacao">Observacao</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-diagnostico-temp-observacao" type="text" name="observacao" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="observacao" value={this.state.fieldsBase[baseFilters]} />
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
