import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';
import { ICid } from 'app/shared/model/cid.model';
import { getEntities as getCids } from 'app/entities/cid/cid.reducer';
import { getEntity, updateEntity, createEntity, reset } from './paciente-diagnostico.reducer';
import { IPacienteDiagnostico } from 'app/shared/model/paciente-diagnostico.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPacienteDiagnosticoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPacienteDiagnosticoUpdateState {
  isNew: boolean;
  idPacienteId: string;
  idCidId: string;
}

export class PacienteDiagnosticoUpdate extends React.Component<IPacienteDiagnosticoUpdateProps, IPacienteDiagnosticoUpdateState> {
  constructor(props: Readonly<IPacienteDiagnosticoUpdateProps>) {
    super(props);
    this.state = {
      idPacienteId: '0',
      idCidId: '0',
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

    this.props.getPacientes();
    this.props.getCids();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    values.dataPost = convertDateTimeToServer(values.dataPost);

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
    this.props.history.push('/paciente-diagnostico');
  };

  render() {
    const { pacienteDiagnosticoEntity, pacientes, cids, loading, updating } = this.props;
    const { isNew } = this.state;

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
                  ...pacienteDiagnosticoEntity,
                  idPaciente: pacienteDiagnosticoEntity.idPaciente ? pacienteDiagnosticoEntity.idPaciente.id : null,
                  idCid: pacienteDiagnosticoEntity.idCid ? pacienteDiagnosticoEntity.idCid.id : null
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
                  to="/paciente-diagnostico"
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

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="observacaoLabel" for="paciente-diagnostico-observacao">
                                <Translate contentKey="generadorApp.pacienteDiagnostico.observacao">Observacao</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-diagnostico-observacao"
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

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="dataPostLabel" for="paciente-diagnostico-dataPost">
                                <Translate contentKey="generadorApp.pacienteDiagnostico.dataPost">Data Post</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="paciente-diagnostico-dataPost"
                                type="datetime-local"
                                className="form-control"
                                name="dataPost"
                                placeholder={'YYYY-MM-DD HH:mm'}
                                value={isNew ? null : convertDateTimeFromServer(this.props.pacienteDiagnosticoEntity.dataPost)}
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') }
                                }}
                              />
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

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="complexidadeLabel" for="paciente-diagnostico-complexidade">
                                <Translate contentKey="generadorApp.pacienteDiagnostico.complexidade">Complexidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-diagnostico-complexidade"
                                type="text"
                                name="complexidade"
                                validate={{
                                  maxLength: { value: 80, errorMessage: translate('entity.validation.maxlength', { max: 80 }) }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="12">
                              <Label className="mt-2" id="cidComAltaLabel" check>
                                <AvInput id="paciente-diagnostico-cidComAlta" type="checkbox" className="form-control" name="cidComAlta" />
                                <Translate contentKey="generadorApp.pacienteDiagnostico.cidComAlta">Cid Com Alta</Translate>
                              </Label>
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>
                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" for="paciente-diagnostico-idPaciente">
                                <Translate contentKey="generadorApp.pacienteDiagnostico.idPaciente">Id Paciente</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="paciente-diagnostico-idPaciente" type="select" className="form-control" name="idPaciente">
                                <option value="null" key="0">
                                  {translate('generadorApp.pacienteDiagnostico.idPaciente.empty')}
                                </option>
                                {pacientes
                                  ? pacientes.map(otherEntity => (
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

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" for="paciente-diagnostico-idCid">
                                <Translate contentKey="generadorApp.pacienteDiagnostico.idCid">Id Cid</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="paciente-diagnostico-idCid" type="select" className="form-control" name="idCid">
                                <option value="null" key="0">
                                  {translate('generadorApp.pacienteDiagnostico.idCid.empty')}
                                </option>
                                {cids
                                  ? cids.map(otherEntity => (
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
  pacientes: storeState.paciente.entities,
  cids: storeState.cid.entities,
  pacienteDiagnosticoEntity: storeState.pacienteDiagnostico.entity,
  loading: storeState.pacienteDiagnostico.loading,
  updating: storeState.pacienteDiagnostico.updating,
  updateSuccess: storeState.pacienteDiagnostico.updateSuccess
});

const mapDispatchToProps = {
  getPacientes,
  getCids,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteDiagnosticoUpdate);
