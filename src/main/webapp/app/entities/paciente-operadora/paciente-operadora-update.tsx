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
import { IOperadora } from 'app/shared/model/operadora.model';
import { getEntities as getOperadoras } from 'app/entities/operadora/operadora.reducer';
import { getEntity, updateEntity, createEntity, reset } from './paciente-operadora.reducer';
import { IPacienteOperadora } from 'app/shared/model/paciente-operadora.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPacienteOperadoraUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPacienteOperadoraUpdateState {
  isNew: boolean;
  idPacienteId: string;
  idOperadoraId: string;
}

export class PacienteOperadoraUpdate extends React.Component<IPacienteOperadoraUpdateProps, IPacienteOperadoraUpdateState> {
  constructor(props: Readonly<IPacienteOperadoraUpdateProps>) {
    super(props);
    this.state = {
      idPacienteId: '0',
      idOperadoraId: '0',
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
    this.props.getOperadoras();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { pacienteOperadoraEntity } = this.props;
      const entity = {
        ...pacienteOperadoraEntity,
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
    this.props.history.push('/paciente-operadora');
  };

  render() {
    const { pacienteOperadoraEntity, pacientes, operadoras, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Operadoras</li>
          <li className="breadcrumb-item active">Paciente Operadoras edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...pacienteOperadoraEntity,
                  idPaciente: pacienteOperadoraEntity.idPaciente ? pacienteOperadoraEntity.idPaciente.id : null,
                  idOperadora: pacienteOperadoraEntity.idOperadora ? pacienteOperadoraEntity.idOperadora.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.pacienteOperadora.home.createOrEditLabel">
                    Create or edit a PacienteOperadora
                  </Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/paciente-operadora" replace color="info" className="float-right jh-create-entity">
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
                      <Label className="mt-2" for="paciente-operadora-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="paciente-operadora-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="registroLabel" for="paciente-operadora-registro">
                                <Translate contentKey="generadorApp.pacienteOperadora.registro">Registro</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-operadora-registro"
                                type="text"
                                name="registro"
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
                              <Label className="mt-2" id="ativoLabel" for="paciente-operadora-ativo">
                                <Translate contentKey="generadorApp.pacienteOperadora.ativo">Ativo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="paciente-operadora-ativo" type="string" className="form-control" name="ativo" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>
                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" for="paciente-operadora-idPaciente">
                                <Translate contentKey="generadorApp.pacienteOperadora.idPaciente">Id Paciente</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="paciente-operadora-idPaciente" type="select" className="form-control" name="idPaciente">
                                <option value="null" key="0">
                                  {translate('generadorApp.pacienteOperadora.idPaciente.empty')}
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
                              <Label className="mt-2" for="paciente-operadora-idOperadora">
                                <Translate contentKey="generadorApp.pacienteOperadora.idOperadora">Id Operadora</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="paciente-operadora-idOperadora" type="select" className="form-control" name="idOperadora">
                                <option value="null" key="0">
                                  {translate('generadorApp.pacienteOperadora.idOperadora.empty')}
                                </option>
                                {operadoras
                                  ? operadoras.map(otherEntity => (
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
  operadoras: storeState.operadora.entities,
  pacienteOperadoraEntity: storeState.pacienteOperadora.entity,
  loading: storeState.pacienteOperadora.loading,
  updating: storeState.pacienteOperadora.updating,
  updateSuccess: storeState.pacienteOperadora.updateSuccess
});

const mapDispatchToProps = {
  getPacientes,
  getOperadoras,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteOperadoraUpdate);
