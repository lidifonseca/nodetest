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
  IPacienteCaracteristicaAtualUpdateState,
  getEntity,
  getPacienteCaracteristicaAtualState,
  IPacienteCaracteristicaAtualBaseState,
  updateEntity,
  createEntity,
  reset
} from './paciente-caracteristica-atual.reducer';
import { IPacienteCaracteristicaAtual } from 'app/shared/model/paciente-caracteristica-atual.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPacienteCaracteristicaAtualUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteCaracteristicaAtualUpdate extends React.Component<
  IPacienteCaracteristicaAtualUpdateProps,
  IPacienteCaracteristicaAtualUpdateState
> {
  constructor(props: Readonly<IPacienteCaracteristicaAtualUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getPacienteCaracteristicaAtualState(this.props.location),
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
      const { pacienteCaracteristicaAtualEntity } = this.props;
      const entity = {
        ...pacienteCaracteristicaAtualEntity,

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
    this.props.history.push('/paciente-caracteristica-atual?' + this.getFiltersURL());
  };

  render() {
    const { pacienteCaracteristicaAtualEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...pacienteCaracteristicaAtualEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.pacienteCaracteristicaAtual.home.createOrEditLabel">
                Create or edit a PacienteCaracteristicaAtual
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
              to={'/paciente-caracteristica-atual?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Paciente Caracteristica Atuals</li>
            <li className="breadcrumb-item active">Paciente Caracteristica Atuals edit</li>
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
                        <Label className="mt-2" for="paciente-caracteristica-atual-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput
                                id="paciente-caracteristica-atual-id"
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
                        {baseFilters !== 'idPaciente' ? (
                          <Col md="idPaciente">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idPacienteLabel" for="paciente-caracteristica-atual-idPaciente">
                                    <Translate contentKey="generadorApp.pacienteCaracteristicaAtual.idPaciente">Id Paciente</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-caracteristica-atual-idPaciente"
                                    type="string"
                                    className="form-control"
                                    name="idPaciente"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idPaciente" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'idPacienteCaracteristica' ? (
                          <Col md="idPacienteCaracteristica">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label
                                    className="mt-2"
                                    id="idPacienteCaracteristicaLabel"
                                    for="paciente-caracteristica-atual-idPacienteCaracteristica"
                                  >
                                    <Translate contentKey="generadorApp.pacienteCaracteristicaAtual.idPacienteCaracteristica">
                                      Id Paciente Caracteristica
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-caracteristica-atual-idPacienteCaracteristica"
                                    type="string"
                                    className="form-control"
                                    name="idPacienteCaracteristica"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idPacienteCaracteristica" value={this.state.fieldsBase[baseFilters]} />
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
  pacienteCaracteristicaAtualEntity: storeState.pacienteCaracteristicaAtual.entity,
  loading: storeState.pacienteCaracteristicaAtual.loading,
  updating: storeState.pacienteCaracteristicaAtual.updating,
  updateSuccess: storeState.pacienteCaracteristicaAtual.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteCaracteristicaAtualUpdate);
