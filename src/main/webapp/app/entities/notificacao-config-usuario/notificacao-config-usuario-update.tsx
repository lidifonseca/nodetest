import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import {
  INotificacaoConfigUsuarioUpdateState,
  getEntity,
  getNotificacaoConfigUsuarioState,
  INotificacaoConfigUsuarioBaseState,
  updateEntity,
  createEntity,
  reset
} from './notificacao-config-usuario.reducer';
import { INotificacaoConfigUsuario } from 'app/shared/model/notificacao-config-usuario.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface INotificacaoConfigUsuarioUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class NotificacaoConfigUsuarioUpdate extends React.Component<
  INotificacaoConfigUsuarioUpdateProps,
  INotificacaoConfigUsuarioUpdateState
> {
  constructor(props: Readonly<INotificacaoConfigUsuarioUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getNotificacaoConfigUsuarioState(this.props.location),
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
    let url = '_back=1' + (offset !== null ? '&offset=' + offset : '');
    Object.keys(fieldsBase).map(key => {
      url += '&' + key + '=' + fieldsBase[key];
    });
    return url;
  };
  saveEntity = (event: any, errors: any, values: any) => {
    values.atualizadoEm = convertDateTimeToServer(values.atualizadoEm);

    if (errors.length === 0) {
      const { notificacaoConfigUsuarioEntity } = this.props;
      const entity = {
        ...notificacaoConfigUsuarioEntity,

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
    this.props.history.push('/notificacao-config-usuario?' + this.getFiltersURL());
  };

  render() {
    const { notificacaoConfigUsuarioEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...notificacaoConfigUsuarioEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.notificacaoConfigUsuario.home.createOrEditLabel">
                Create or edit a NotificacaoConfigUsuario
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
              to={'/notificacao-config-usuario?' + this.getFiltersURL()}
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
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Inicio</Link>
            </li>
            <li className="breadcrumb-item active">Notificacao Config Usuarios</li>
            <li className="breadcrumb-item active">Notificacao Config Usuarios edit</li>
          </ol>

          <Panel>
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
                      <Label className="mt-2" for="notificacao-config-usuario-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput
                                id="notificacao-config-usuario-id"
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
                        <NotificacaoConfigIdComponentUpdate baseFilters />

                        <ProfissionalIdComponentUpdate baseFilters />

                        <PacienteIdComponentUpdate baseFilters />

                        <AtualizadoEmComponentUpdate baseFilters />

                        <AtualizadoPorComponentUpdate baseFilters />

                        <EnviarPushComponentUpdate baseFilters />

                        <EnviarEmailComponentUpdate baseFilters />

                        <ObservacaoComponentUpdate baseFilters />
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
  notificacaoConfigUsuarioEntity: storeState.notificacaoConfigUsuario.entity,
  loading: storeState.notificacaoConfigUsuario.loading,
  updating: storeState.notificacaoConfigUsuario.updating,
  updateSuccess: storeState.notificacaoConfigUsuario.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const NotificacaoConfigIdComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'notificacaoConfigId' ? (
    <Col md="notificacaoConfigId">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="notificacaoConfigIdLabel" for="notificacao-config-usuario-notificacaoConfigId">
              <Translate contentKey="generadorApp.notificacaoConfigUsuario.notificacaoConfigId">Notificacao Config Id</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField
              id="notificacao-config-usuario-notificacaoConfigId"
              type="string"
              className="form-control"
              name="notificacaoConfigId"
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="notificacaoConfigId" value={this.state.fieldsBase[baseFilters]} />
  );
};

const ProfissionalIdComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'profissionalId' ? (
    <Col md="profissionalId">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="profissionalIdLabel" for="notificacao-config-usuario-profissionalId">
              <Translate contentKey="generadorApp.notificacaoConfigUsuario.profissionalId">Profissional Id</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="notificacao-config-usuario-profissionalId" type="string" className="form-control" name="profissionalId" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="profissionalId" value={this.state.fieldsBase[baseFilters]} />
  );
};

const PacienteIdComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'pacienteId' ? (
    <Col md="pacienteId">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="pacienteIdLabel" for="notificacao-config-usuario-pacienteId">
              <Translate contentKey="generadorApp.notificacaoConfigUsuario.pacienteId">Paciente Id</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="notificacao-config-usuario-pacienteId" type="string" className="form-control" name="pacienteId" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="pacienteId" value={this.state.fieldsBase[baseFilters]} />
  );
};

const AtualizadoEmComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'atualizadoEm' ? (
    <Col md="atualizadoEm">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="atualizadoEmLabel" for="notificacao-config-usuario-atualizadoEm">
              <Translate contentKey="generadorApp.notificacaoConfigUsuario.atualizadoEm">Atualizado Em</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvInput
              id="notificacao-config-usuario-atualizadoEm"
              type="datetime-local"
              className="form-control"
              name="atualizadoEm"
              placeholder={'YYYY-MM-DD HH:mm'}
              value={isNew ? null : convertDateTimeFromServer(this.props.notificacaoConfigUsuarioEntity.atualizadoEm)}
              validate={{
                required: { value: true, errorMessage: translate('entity.validation.required') }
              }}
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="atualizadoEm" value={this.state.fieldsBase[baseFilters]} />
  );
};

const AtualizadoPorComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'atualizadoPor' ? (
    <Col md="atualizadoPor">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="atualizadoPorLabel" for="notificacao-config-usuario-atualizadoPor">
              <Translate contentKey="generadorApp.notificacaoConfigUsuario.atualizadoPor">Atualizado Por</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="notificacao-config-usuario-atualizadoPor" type="string" className="form-control" name="atualizadoPor" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="atualizadoPor" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EnviarPushComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'enviarPush' ? (
    <Col md="enviarPush">
      <AvGroup>
        <Row>
          <Col md="12">
            <Label className="mt-2" id="enviarPushLabel" check>
              <AvInput id="notificacao-config-usuario-enviarPush" type="checkbox" className="form-control" name="enviarPush" />
              <Translate contentKey="generadorApp.notificacaoConfigUsuario.enviarPush">Enviar Push</Translate>
            </Label>
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="enviarPush" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EnviarEmailComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'enviarEmail' ? (
    <Col md="enviarEmail">
      <AvGroup>
        <Row>
          <Col md="12">
            <Label className="mt-2" id="enviarEmailLabel" check>
              <AvInput id="notificacao-config-usuario-enviarEmail" type="checkbox" className="form-control" name="enviarEmail" />
              <Translate contentKey="generadorApp.notificacaoConfigUsuario.enviarEmail">Enviar Email</Translate>
            </Label>
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="enviarEmail" value={this.state.fieldsBase[baseFilters]} />
  );
};

const ObservacaoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'observacao' ? (
    <Col md="observacao">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="observacaoLabel" for="notificacao-config-usuario-observacao">
              <Translate contentKey="generadorApp.notificacaoConfigUsuario.observacao">Observacao</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="notificacao-config-usuario-observacao" type="text" name="observacao" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="observacao" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificacaoConfigUsuarioUpdate);
