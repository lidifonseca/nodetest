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

import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';
import { IOperadora } from 'app/shared/model/operadora.model';
import { getEntities as getOperadoras } from 'app/entities/operadora/operadora.reducer';
import {
  IPacienteOperadoraUpdateState,
  getEntity,
  getPacienteOperadoraState,
  IPacienteOperadoraBaseState,
  updateEntity,
  createEntity,
  reset
} from './paciente-operadora.reducer';
import { IPacienteOperadora } from 'app/shared/model/paciente-operadora.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPacienteOperadoraUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteOperadoraUpdate extends React.Component<IPacienteOperadoraUpdateProps, IPacienteOperadoraUpdateState> {
  constructor(props: Readonly<IPacienteOperadoraUpdateProps>) {
    super(props);

    this.state = {
      pacienteSelectValue: null,
      operadoraSelectValue: null,
      fieldsBase: getPacienteOperadoraState(this.props.location),
      pacienteId: '0',
      operadoraId: '0',
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
      nextProps.pacienteOperadoraEntity.paciente &&
      nextProps.pacienteOperadoraEntity.paciente.id
    ) {
      this.setState({
        pacienteSelectValue: nextProps.pacientes.map(p =>
          nextProps.pacienteOperadoraEntity.paciente.id === p.id ? { value: p.id, label: p.id } : null
        )
      });
    }

    if (
      nextProps.operadoras.length > 0 &&
      this.state.operadoraSelectValue === null &&
      nextProps.pacienteOperadoraEntity.operadora &&
      nextProps.pacienteOperadoraEntity.operadora.id
    ) {
      this.setState({
        operadoraSelectValue: nextProps.operadoras.map(p =>
          nextProps.pacienteOperadoraEntity.operadora.id === p.id ? { value: p.id, label: p.id } : null
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
    this.props.getOperadoras();
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
    if (errors.length === 0) {
      const { pacienteOperadoraEntity } = this.props;
      const entity = {
        ...pacienteOperadoraEntity,
        paciente: this.state.pacienteSelectValue ? this.state.pacienteSelectValue['value'] : null,
        operadora: this.state.operadoraSelectValue ? this.state.operadoraSelectValue['value'] : null,
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
    this.props.history.push('/paciente-operadora?' + this.getFiltersURL());
  };

  render() {
    const { pacienteOperadoraEntity, pacientes, operadoras, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...pacienteOperadoraEntity,
                  paciente: pacienteOperadoraEntity.paciente ? pacienteOperadoraEntity.paciente.id : null,
                  operadora: pacienteOperadoraEntity.operadora ? pacienteOperadoraEntity.operadora.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.pacienteOperadora.home.createOrEditLabel">Create or edit a PacienteOperadora</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/paciente-operadora?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Paciente Operadoras</li>
            <li className="breadcrumb-item active">Paciente Operadoras edit</li>
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
                      <Row>
                        <RegistroComponentUpdate baseFilters />

                        <AtivoComponentUpdate baseFilters />

                        <PacienteComponentUpdate baseFilter pacientes />

                        <OperadoraComponentUpdate baseFilter operadoras />
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

const RegistroComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'registro' ? (
    <Col md="registro">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="registroLabel" for="paciente-operadora-registro">
              <Translate contentKey="generadorApp.pacienteOperadora.registro">Registro</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="paciente-operadora-registro" type="text" name="registro" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="registro" value={this.state.fieldsBase[baseFilters]} />
  );
};

const AtivoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ativo' ? (
    <Col md="ativo">
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
  ) : (
    <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
  );
};

const PacienteComponentUpdate = ({ baseFilters, pacientes }) => {
  return baseFilters !== 'paciente' ? (
    <Col md="12">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" for="paciente-operadora-paciente">
              <Translate contentKey="generadorApp.pacienteOperadora.paciente">Paciente</Translate>
            </Label>
          </Col>
          <Col md="9">
            <Select
              id="paciente-operadora-paciente"
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
  );
};

const OperadoraComponentUpdate = ({ baseFilters, operadoras }) => {
  return baseFilters !== 'operadora' ? (
    <Col md="12">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" for="paciente-operadora-operadora">
              <Translate contentKey="generadorApp.pacienteOperadora.operadora">Operadora</Translate>
            </Label>
          </Col>
          <Col md="9">
            <Select
              id="paciente-operadora-operadora"
              className={'css-select-control'}
              value={this.state.operadoraSelectValue}
              options={operadoras ? operadoras.map(option => ({ value: option.id, label: option.id })) : null}
              onChange={options => this.setState({ operadoraSelectValue: options })}
              name={'operadora'}
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="operadora" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PacienteOperadoraUpdate);
