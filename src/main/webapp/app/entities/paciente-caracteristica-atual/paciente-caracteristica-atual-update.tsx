import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './paciente-caracteristica-atual.reducer';
import { IPacienteCaracteristicaAtual } from 'app/shared/model/paciente-caracteristica-atual.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPacienteCaracteristicaAtualUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPacienteCaracteristicaAtualUpdateState {
  isNew: boolean;
}

export class PacienteCaracteristicaAtualUpdate extends React.Component<
  IPacienteCaracteristicaAtualUpdateProps,
  IPacienteCaracteristicaAtualUpdateState
> {
  constructor(props: Readonly<IPacienteCaracteristicaAtualUpdateProps>) {
    super(props);
    this.state = {
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
    this.props.history.push('/paciente-caracteristica-atual');
  };

  render() {
    const { pacienteCaracteristicaAtualEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Caracteristica Atuals</li>
          <li className="breadcrumb-item active">Paciente Caracteristica Atuals edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
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
          <Panel>
            <PanelHeader>
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
                  to="/paciente-caracteristica-atual"
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

                      <Col md="12">
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
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
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
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
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
                              <Label className="mt-2" id="idUsuarioLabel" for="paciente-caracteristica-atual-idUsuario">
                                <Translate contentKey="generadorApp.pacienteCaracteristicaAtual.idUsuario">Id Usuario</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-caracteristica-atual-idUsuario"
                                type="string"
                                className="form-control"
                                name="idUsuario"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
                                }}
                              />
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
