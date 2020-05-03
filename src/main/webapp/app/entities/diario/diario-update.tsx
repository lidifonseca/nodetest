import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUsuario } from 'app/shared/model/usuario.model';
import { getEntities as getUsuarios } from 'app/entities/usuario/usuario.reducer';
import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';
import { getEntity, updateEntity, createEntity, reset } from './diario.reducer';
import { IDiario } from 'app/shared/model/diario.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDiarioUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IDiarioUpdateState {
  isNew: boolean;
  idUsuarioId: string;
  idPacienteId: string;
}

export class DiarioUpdate extends React.Component<IDiarioUpdateProps, IDiarioUpdateState> {
  constructor(props: Readonly<IDiarioUpdateProps>) {
    super(props);
    this.state = {
      idUsuarioId: '0',
      idPacienteId: '0',
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

    this.props.getUsuarios();
    this.props.getPacientes();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { diarioEntity } = this.props;
      const entity = {
        ...diarioEntity,
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
    this.props.history.push('/diario');
  };

  render() {
    const { diarioEntity, usuarios, pacientes, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Diarios</li>
          <li className="breadcrumb-item active">Diarios edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...diarioEntity,
                  idUsuario: diarioEntity.idUsuario ? diarioEntity.idUsuario.id : null,
                  idPaciente: diarioEntity.idPaciente ? diarioEntity.idPaciente.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.diario.home.createOrEditLabel">Create or edit a Diario</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/diario" replace color="info" className="float-right jh-create-entity">
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
                      <Label className="mt-2" for="diario-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="diario-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="historicoLabel" for="diario-historico">
                                <Translate contentKey="generadorApp.diario.historico">Historico</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="diario-historico"
                                type="text"
                                name="historico"
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
                              <Label className="mt-2" id="gerarPdfLabel" for="diario-gerarPdf">
                                <Translate contentKey="generadorApp.diario.gerarPdf">Gerar Pdf</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="diario-gerarPdf" type="string" className="form-control" name="gerarPdf" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>
                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" for="diario-idUsuario">
                                <Translate contentKey="generadorApp.diario.idUsuario">Id Usuario</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="diario-idUsuario" type="select" className="form-control" name="idUsuario">
                                <option value="null" key="0">
                                  {translate('generadorApp.diario.idUsuario.empty')}
                                </option>
                                {usuarios
                                  ? usuarios.map(otherEntity => (
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
                              <Label className="mt-2" for="diario-idPaciente">
                                <Translate contentKey="generadorApp.diario.idPaciente">Id Paciente</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="diario-idPaciente" type="select" className="form-control" name="idPaciente">
                                <option value="null" key="0">
                                  {translate('generadorApp.diario.idPaciente.empty')}
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
  usuarios: storeState.usuario.entities,
  pacientes: storeState.paciente.entities,
  diarioEntity: storeState.diario.entity,
  loading: storeState.diario.loading,
  updating: storeState.diario.updating,
  updateSuccess: storeState.diario.updateSuccess
});

const mapDispatchToProps = {
  getUsuarios,
  getPacientes,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DiarioUpdate);
