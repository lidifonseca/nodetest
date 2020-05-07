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
  IPacienteDiagnosticoUpdateState,
  getEntity,
  getPacienteDiagnosticoState,
  IPacienteDiagnosticoBaseState,
  updateEntity,
  createEntity,
  reset
} from './paciente-diagnostico.reducer';
import { IPacienteDiagnostico } from 'app/shared/model/paciente-diagnostico.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPacienteDiagnosticoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteDiagnosticoUpdate extends React.Component<IPacienteDiagnosticoUpdateProps, IPacienteDiagnosticoUpdateState> {
  constructor(props: Readonly<IPacienteDiagnosticoUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getPacienteDiagnosticoState(this.props.location),
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
      (fieldsBase['observacao'] ? '&observacao=' + fieldsBase['observacao'] : '') +
      (fieldsBase['ativo'] ? '&ativo=' + fieldsBase['ativo'] : '') +
      (fieldsBase['cidPrimario'] ? '&cidPrimario=' + fieldsBase['cidPrimario'] : '') +
      (fieldsBase['complexidade'] ? '&complexidade=' + fieldsBase['complexidade'] : '') +
      (fieldsBase['cidComAlta'] ? '&cidComAlta=' + fieldsBase['cidComAlta'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { pacienteDiagnosticoEntity } = this.props;
      const entity = {
        ...pacienteDiagnosticoEntity,
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
    this.props.history.push('/paciente-diagnostico?' + this.getFiltersURL());
  };

  render() {
    const { pacienteDiagnosticoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Diagnosticos</li>
          <li className="breadcrumb-item active">Paciente Diagnosticos edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...pacienteDiagnosticoEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.pacienteDiagnostico.home.createOrEditLabel">
                    Create or edit a PacienteDiagnostico
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
                  to={'/paciente-diagnostico?' + this.getFiltersURL()}
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
                      <Label className="mt-2" for="paciente-diagnostico-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="paciente-diagnostico-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'observacao' ? (
                          <Col md="observacao">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="observacaoLabel" for="paciente-diagnostico-observacao">
                                    <Translate contentKey="generadorApp.pacienteDiagnostico.observacao">Observacao</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-diagnostico-observacao" type="text" name="observacao" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="observacao" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'ativo' ? (
                          <Col md="ativo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="ativoLabel" for="paciente-diagnostico-ativo">
                                    <Translate contentKey="generadorApp.pacienteDiagnostico.ativo">Ativo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-diagnostico-ativo" type="string" className="form-control" name="ativo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'cidPrimario' ? (
                          <Col md="cidPrimario">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="cidPrimarioLabel" check>
                                    <AvInput
                                      id="paciente-diagnostico-cidPrimario"
                                      type="checkbox"
                                      className="form-control"
                                      name="cidPrimario"
                                    />
                                    <Translate contentKey="generadorApp.pacienteDiagnostico.cidPrimario">Cid Primario</Translate>
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
                                  <Label className="mt-2" id="complexidadeLabel" for="paciente-diagnostico-complexidade">
                                    <Translate contentKey="generadorApp.pacienteDiagnostico.complexidade">Complexidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-diagnostico-complexidade" type="text" name="complexidade" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="complexidade" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'cidComAlta' ? (
                          <Col md="cidComAlta">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="cidComAltaLabel" check>
                                    <AvInput
                                      id="paciente-diagnostico-cidComAlta"
                                      type="checkbox"
                                      className="form-control"
                                      name="cidComAlta"
                                    />
                                    <Translate contentKey="generadorApp.pacienteDiagnostico.cidComAlta">Cid Com Alta</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cidComAlta" value={this.state.fieldsBase[baseFilters]} />
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
  pacienteDiagnosticoEntity: storeState.pacienteDiagnostico.entity,
  loading: storeState.pacienteDiagnostico.loading,
  updating: storeState.pacienteDiagnostico.updating,
  updateSuccess: storeState.pacienteDiagnostico.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteDiagnosticoUpdate);
