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

import { IUsuario } from 'app/shared/model/usuario.model';
import { getEntities as getUsuarios } from 'app/entities/usuario/usuario.reducer';
import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';
import {
  IDiarioUpdateState,
  getEntity,
  getDiarioState,
  IDiarioBaseState,
  updateEntity,
  createEntity,
  setBlob,
  reset
} from './diario.reducer';
import { IDiario } from 'app/shared/model/diario.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDiarioUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DiarioUpdate extends React.Component<IDiarioUpdateProps, IDiarioUpdateState> {
  historicoFileInput: React.RefObject<HTMLInputElement>;

  constructor(props: Readonly<IDiarioUpdateProps>) {
    super(props);

    this.historicoFileInput = React.createRef();

    this.state = {
      usuarioSelectValue: null,
      pacienteSelectValue: null,
      fieldsBase: getDiarioState(this.props.location),
      usuarioId: '0',
      pacienteId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }

    if (
      nextProps.usuarios.length > 0 &&
      this.state.usuarioSelectValue === null &&
      nextProps.diarioEntity.usuario &&
      nextProps.diarioEntity.usuario.id
    ) {
      this.setState({
        usuarioSelectValue: nextProps.usuarios.map(p => (nextProps.diarioEntity.usuario.id === p.id ? { value: p.id, label: p.id } : null))
      });
    }

    if (
      nextProps.pacientes.length > 0 &&
      this.state.pacienteSelectValue === null &&
      nextProps.diarioEntity.paciente &&
      nextProps.diarioEntity.paciente.id
    ) {
      this.setState({
        pacienteSelectValue: nextProps.pacientes.map(p =>
          nextProps.diarioEntity.paciente.id === p.id ? { value: p.id, label: p.id } : null
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

    this.props.getUsuarios();
    this.props.getPacientes();
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
      const { diarioEntity } = this.props;
      const entity = {
        ...diarioEntity,
        usuario: this.state.usuarioSelectValue ? this.state.usuarioSelectValue['value'] : null,
        paciente: this.state.pacienteSelectValue ? this.state.pacienteSelectValue['value'] : null,
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
    this.props.history.push('/diario?' + this.getFiltersURL());
  };

  render() {
    const { diarioEntity, usuarios, pacientes, loading, updating } = this.props;
    const { isNew } = this.state;

    const { historico } = diarioEntity;
    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...diarioEntity,
                  usuario: diarioEntity.usuario ? diarioEntity.usuario.id : null,
                  paciente: diarioEntity.paciente ? diarioEntity.paciente.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.diario.home.createOrEditLabel">Create or edit a Diario</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/diario?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Diarios</li>
            <li className="breadcrumb-item active">Diarios edit</li>
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
                      <Row>
                        {baseFilters !== 'historico' ? (
                          <Col md="historico">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="historicoLabel" for="diario-historico">
                                    <Translate contentKey="generadorApp.diario.historico">Historico</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="diario-historico" type="textarea" name="historico" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="historico" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'gerarPdf' ? (
                          <Col md="gerarPdf">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="gerarPdfLabel" check>
                                    <AvInput id="diario-gerarPdf" type="checkbox" className="form-control" name="gerarPdf" />
                                    <Translate contentKey="generadorApp.diario.gerarPdf">Gerar Pdf</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="gerarPdf" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'usuario' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="diario-usuario">
                                    <Translate contentKey="generadorApp.diario.usuario">Usuario</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="diario-usuario"
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
                        {baseFilters !== 'paciente' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="diario-paciente">
                                    <Translate contentKey="generadorApp.diario.paciente">Paciente</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="diario-paciente"
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
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DiarioUpdate);
