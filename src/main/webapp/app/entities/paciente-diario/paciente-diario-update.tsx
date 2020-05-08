/* eslint complexity: ["error", 300] */
import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';
import { IUsuario } from 'app/shared/model/usuario.model';
import { getEntities as getUsuarios } from 'app/entities/usuario/usuario.reducer';
import {
  IPacienteDiarioUpdateState,
  getEntity,
  getPacienteDiarioState,
  IPacienteDiarioBaseState,
  updateEntity,
  createEntity,
  setBlob,
  reset
} from './paciente-diario.reducer';
import { IPacienteDiario } from 'app/shared/model/paciente-diario.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPacienteDiarioUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteDiarioUpdate extends React.Component<IPacienteDiarioUpdateProps, IPacienteDiarioUpdateState> {
  historicoFileInput: React.RefObject<HTMLInputElement>;

  constructor(props: Readonly<IPacienteDiarioUpdateProps>) {
    super(props);

    this.historicoFileInput = React.createRef();

    this.state = {
      pacienteSelectValue: null,
      usuarioSelectValue: null,
      fieldsBase: getPacienteDiarioState(this.props.location),
      pacienteId: '0',
      usuarioId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }

    if (
      nextProps.pacientes.length > 0 &&
      this.state.pacienteSelectValue === null &&
      nextProps.pacienteDiarioEntity.paciente &&
      nextProps.pacienteDiarioEntity.paciente.id
    ) {
      this.setState({
        pacienteSelectValue: nextProps.pacientes.map(p =>
          nextProps.pacienteDiarioEntity.paciente.id === p.id ? { value: p.id, label: p.id } : null
        )
      });
    }

    if (
      nextProps.usuarios.length > 0 &&
      this.state.usuarioSelectValue === null &&
      nextProps.pacienteDiarioEntity.usuario &&
      nextProps.pacienteDiarioEntity.usuario.id
    ) {
      this.setState({
        usuarioSelectValue: nextProps.usuarios.map(p =>
          nextProps.pacienteDiarioEntity.usuario.id === p.id ? { value: p.id, label: p.id } : null
        )
      });
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getPacientes();
    this.props.getUsuarios();
  }

  onBlobChange = (isAnImage, name, fileInput) => event => {
    const fileName = fileInput.current.files[0].name;
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType, fileName), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };
  getFiltersURL = (offset = null) => {
    const fieldsBase = this.state.fieldsBase;
    let url = '_back=1' + (offset !== null ? '&offset=' + offset : '');
    Object.keys(fieldsBase).map(key => {
      url += '&' + key + '=' + fieldsBase[key];
    });
    return url;
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { pacienteDiarioEntity } = this.props;
      const entity = {
        ...pacienteDiarioEntity,
        paciente: this.state.pacienteSelectValue ? this.state.pacienteSelectValue['value'] : null,
        usuario: this.state.usuarioSelectValue ? this.state.usuarioSelectValue['value'] : null,
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
    this.props.history.push('/paciente-diario?' + this.getFiltersURL());
  };

  render() {
    const { pacienteDiarioEntity, pacientes, usuarios, loading, updating } = this.props;
    const { isNew } = this.state;

    const { historico } = pacienteDiarioEntity;
    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...pacienteDiarioEntity,
                  paciente: pacienteDiarioEntity.paciente ? pacienteDiarioEntity.paciente.id : null,
                  usuario: pacienteDiarioEntity.usuario ? pacienteDiarioEntity.usuario.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.pacienteDiario.home.createOrEditLabel">Create or edit a PacienteDiario</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/paciente-diario?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Paciente Diarios</li>
            <li className="breadcrumb-item active">Paciente Diarios edit</li>
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
                        <Label className="mt-2" for="paciente-diario-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput id="paciente-diario-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'idOperadora' ? (
                          <Col md="idOperadora">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idOperadoraLabel" for="paciente-diario-idOperadora">
                                    <Translate contentKey="generadorApp.pacienteDiario.idOperadora">Id Operadora</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-diario-idOperadora" type="string" className="form-control" name="idOperadora" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idOperadora" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'historico' ? (
                          <Col md="historico">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="historicoLabel" for="paciente-diario-historico">
                                    <Translate contentKey="generadorApp.pacienteDiario.historico">Historico</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="paciente-diario-historico" type="textarea" name="historico" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="historico" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ativo' ? (
                          <Col md="ativo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="ativoLabel" for="paciente-diario-ativo">
                                    <Translate contentKey="generadorApp.pacienteDiario.ativo">Ativo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-diario-ativo" type="string" className="form-control" name="ativo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'paciente' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="paciente-diario-paciente">
                                    <Translate contentKey="generadorApp.pacienteDiario.paciente">Paciente</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="paciente-diario-paciente"
                                    className={'css-select-control'}
                                    value={this.state.pacienteSelectValue}
                                    options={pacientes ? pacientes.map(option => ({ value: option.id, label: option.id })) : null}
                                    onChange={options => this.setState({ pacienteSelectValue: options })}
                                    name={'paciente'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="paciente" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'usuario' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="paciente-diario-usuario">
                                    <Translate contentKey="generadorApp.pacienteDiario.usuario">Usuario</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="paciente-diario-usuario"
                                    className={'css-select-control'}
                                    value={this.state.usuarioSelectValue}
                                    options={usuarios ? usuarios.map(option => ({ value: option.id, label: option.id })) : null}
                                    onChange={options => this.setState({ usuarioSelectValue: options })}
                                    name={'usuario'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="usuario" value={this.state.fieldsBase[baseFilters]} />
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
  usuarios: storeState.usuario.entities,
  pacienteDiarioEntity: storeState.pacienteDiario.entity,
  loading: storeState.pacienteDiario.loading,
  updating: storeState.pacienteDiario.updating,
  updateSuccess: storeState.pacienteDiario.updateSuccess
});

const mapDispatchToProps = {
  getPacientes,
  getUsuarios,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteDiarioUpdate);
