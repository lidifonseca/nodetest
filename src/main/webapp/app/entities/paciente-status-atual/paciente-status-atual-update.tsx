import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';
import { IStatusAtual } from 'app/shared/model/status-atual.model';
import { getEntities as getStatusAtuals } from 'app/entities/status-atual/status-atual.reducer';
import {
  IPacienteStatusAtualUpdateState,
  getEntity,
  getPacienteStatusAtualState,
  IPacienteStatusAtualBaseState,
  updateEntity,
  createEntity,
  setBlob,
  reset
} from './paciente-status-atual.reducer';
import { IPacienteStatusAtual } from 'app/shared/model/paciente-status-atual.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPacienteStatusAtualUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteStatusAtualUpdate extends React.Component<IPacienteStatusAtualUpdateProps, IPacienteStatusAtualUpdateState> {
  constructor(props: Readonly<IPacienteStatusAtualUpdateProps>) {
    super(props);
    this.state = {
      fieldsBase: getPacienteStatusAtualState(this.props.location),
      pacienteId: '0',
      statusId: '0',
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
    this.props.getStatusAtuals();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };
  getFiltersURL = (offset = null) => {
    const fieldsBase = this.state.fieldsBase;
    return (
      '_back=1' +
      (fieldsBase['baseFilters'] ? '&baseFilters=' + fieldsBase['baseFilters'] : '') +
      (fieldsBase['activePage'] ? '&page=' + fieldsBase['activePage'] : '') +
      (fieldsBase['itemsPerPage'] ? '&size=' + fieldsBase['itemsPerPage'] : '') +
      (fieldsBase['sort'] ? '&sort=' + (fieldsBase['sort'] + ',' + fieldsBase['order']) : '') +
      (offset !== null ? '&offset=' + offset : '') +
      (fieldsBase['dataStatus'] ? '&dataStatus=' + fieldsBase['dataStatus'] : '') +
      (fieldsBase['observacao'] ? '&observacao=' + fieldsBase['observacao'] : '') +
      (fieldsBase['ativo'] ? '&ativo=' + fieldsBase['ativo'] : '') +
      (fieldsBase['idUsuario'] ? '&idUsuario=' + fieldsBase['idUsuario'] : '') +
      (fieldsBase['paciente'] ? '&paciente=' + fieldsBase['paciente'] : '') +
      (fieldsBase['status'] ? '&status=' + fieldsBase['status'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { pacienteStatusAtualEntity } = this.props;
      const entity = {
        ...pacienteStatusAtualEntity,
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
    this.props.history.push('/paciente-status-atual?' + this.getFiltersURL());
  };

  render() {
    const { pacienteStatusAtualEntity, pacientes, statusAtuals, loading, updating } = this.props;
    const { isNew } = this.state;

    const { observacao } = pacienteStatusAtualEntity;
    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Status Atuals</li>
          <li className="breadcrumb-item active">Paciente Status Atuals edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...pacienteStatusAtualEntity,
                  paciente: pacienteStatusAtualEntity.paciente ? pacienteStatusAtualEntity.paciente.id : null,
                  status: pacienteStatusAtualEntity.status ? pacienteStatusAtualEntity.status.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.pacienteStatusAtual.home.createOrEditLabel">
                    Create or edit a PacienteStatusAtual
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
                  to={'/paciente-status-atual?' + this.getFiltersURL()}
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
                      <Label className="mt-2" for="paciente-status-atual-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="paciente-status-atual-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'dataStatus' ? (
                          <Col md="dataStatus">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="dataStatusLabel" for="paciente-status-atual-dataStatus">
                                    <Translate contentKey="generadorApp.pacienteStatusAtual.dataStatus">Data Status</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-status-atual-dataStatus" type="date" className="form-control" name="dataStatus" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="dataStatus" value={this.state[baseFilters]} />
                        )}

                        {baseFilters !== 'observacao' ? (
                          <Col md="observacao">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="observacaoLabel" for="paciente-status-atual-observacao">
                                    <Translate contentKey="generadorApp.pacienteStatusAtual.observacao">Observacao</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="paciente-status-atual-observacao" type="textarea" name="observacao" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="observacao" value={this.state[baseFilters]} />
                        )}

                        {baseFilters !== 'ativo' ? (
                          <Col md="ativo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="ativoLabel" for="paciente-status-atual-ativo">
                                    <Translate contentKey="generadorApp.pacienteStatusAtual.ativo">Ativo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-status-atual-ativo" type="string" className="form-control" name="ativo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ativo" value={this.state[baseFilters]} />
                        )}

                        {baseFilters !== 'idUsuario' ? (
                          <Col md="idUsuario">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idUsuarioLabel" for="paciente-status-atual-idUsuario">
                                    <Translate contentKey="generadorApp.pacienteStatusAtual.idUsuario">Id Usuario</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-status-atual-idUsuario" type="text" name="idUsuario" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idUsuario" value={this.state[baseFilters]} />
                        )}
                        {baseFilters !== 'paciente' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="paciente-status-atual-paciente">
                                    <Translate contentKey="generadorApp.pacienteStatusAtual.paciente">Paciente</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="paciente-status-atual-paciente" type="select" className="form-control" name="paciente">
                                    <option value="null" key="0">
                                      {translate('generadorApp.pacienteStatusAtual.paciente.empty')}
                                    </option>
                                    {pacientes
                                      ? pacientes.map(otherEntity => (
                                          <option value={otherEntity.id} key={otherEntity.id}>
                                            {otherEntity.nome}
                                          </option>
                                        ))
                                      : null}
                                  </AvInput>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="paciente" value={this.state[baseFilters]} />
                        )}
                        {baseFilters !== 'status' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="paciente-status-atual-status">
                                    <Translate contentKey="generadorApp.pacienteStatusAtual.status">Status</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="paciente-status-atual-status" type="select" className="form-control" name="status">
                                    <option value="null" key="0">
                                      {translate('generadorApp.pacienteStatusAtual.status.empty')}
                                    </option>
                                    {statusAtuals
                                      ? statusAtuals.map(otherEntity => (
                                          <option value={otherEntity.id} key={otherEntity.id}>
                                            {otherEntity.statusAtual}
                                          </option>
                                        ))
                                      : null}
                                  </AvInput>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="status" value={this.state[baseFilters]} />
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
  pacientes: storeState.paciente.entities,
  statusAtuals: storeState.statusAtual.entities,
  pacienteStatusAtualEntity: storeState.pacienteStatusAtual.entity,
  loading: storeState.pacienteStatusAtual.loading,
  updating: storeState.pacienteStatusAtual.updating,
  updateSuccess: storeState.pacienteStatusAtual.updateSuccess
});

const mapDispatchToProps = {
  getPacientes,
  getStatusAtuals,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteStatusAtualUpdate);
