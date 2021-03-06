/* eslint complexity: ["error", 300] */
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
  IPacienteHospitalUpdateState,
  getEntity,
  getPacienteHospitalState,
  IPacienteHospitalBaseState,
  updateEntity,
  createEntity,
  reset
} from './paciente-hospital.reducer';
import { IPacienteHospital } from 'app/shared/model/paciente-hospital.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPacienteHospitalUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteHospitalUpdate extends React.Component<IPacienteHospitalUpdateProps, IPacienteHospitalUpdateState> {
  constructor(props: Readonly<IPacienteHospitalUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getPacienteHospitalState(this.props.location),
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
    if (errors.length === 0) {
      const { pacienteHospitalEntity } = this.props;
      const entity = {
        ...pacienteHospitalEntity,

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
    this.props.history.push('/paciente-hospital?' + this.getFiltersURL());
  };

  render() {
    const { pacienteHospitalEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...pacienteHospitalEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.pacienteHospital.home.createOrEditLabel">Create or edit a PacienteHospital</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/paciente-hospital?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Paciente Hospitals</li>
            <li className="breadcrumb-item active">Paciente Hospitals edit</li>
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
                        <Label className="mt-2" for="paciente-hospital-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput id="paciente-hospital-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'servico' ? (
                          <Col md="servico">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="servicoLabel" for="paciente-hospital-servico">
                                    <Translate contentKey="generadorApp.pacienteHospital.servico">Servico</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-hospital-servico" type="text" name="servico" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="servico" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'styleLabel' ? (
                          <Col md="styleLabel">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="styleLabelLabel" for="paciente-hospital-styleLabel">
                                    <Translate contentKey="generadorApp.pacienteHospital.styleLabel">Style Label</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-hospital-styleLabel" type="text" name="styleLabel" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="styleLabel" value={this.state.fieldsBase[baseFilters]} />
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
  pacienteHospitalEntity: storeState.pacienteHospital.entity,
  loading: storeState.pacienteHospital.loading,
  updating: storeState.pacienteHospital.updating,
  updateSuccess: storeState.pacienteHospital.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteHospitalUpdate);
