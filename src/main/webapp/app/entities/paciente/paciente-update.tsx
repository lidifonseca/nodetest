import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './paciente.reducer';
import { IPaciente } from 'app/shared/model/paciente.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPacienteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPacienteUpdateState {
  isNew: boolean;
}

export class PacienteUpdate extends React.Component<IPacienteUpdateProps, IPacienteUpdateState> {
  constructor(props: Readonly<IPacienteUpdateProps>) {
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

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { pacienteEntity } = this.props;
      const entity = {
        ...pacienteEntity,
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
    this.props.history.push('/paciente');
  };

  render() {
    const { pacienteEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const { observacao, detalhes } = pacienteEntity;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pacientes</li>
          <li className="breadcrumb-item active">Pacientes edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...pacienteEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.paciente.home.createOrEditLabel">Create or edit a Paciente</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/paciente" replace color="info" className="float-right jh-create-entity">
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
                      <Label className="mt-2" for="paciente-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="paciente-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}

                      <Col md="6">
                        <AvGroup>
                          <Row>
                            <Col md="12">
                              <Label className="mt-2" id="cidadeLabel" for="paciente-cidade">
                                <Translate contentKey="generadorApp.paciente.cidade">Cidade</Translate>
                              </Label>
                            </Col>
                            <Col md="12">
                              <AvField
                                id="paciente-cidade"
                                type="text"
                                name="cidade"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="6">
                        <AvGroup>
                          <Row>
                            <Col md="12">
                              <Label className="mt-2" id="nomeLabel" for="paciente-nome">
                                <Translate contentKey="generadorApp.paciente.nome">Nome</Translate>
                              </Label>
                            </Col>
                            <Col md="12">
                              <AvField id="paciente-nome" type="text" name="nome" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="6">
                        <AvGroup>
                          <Row>
                            <Col md="12">
                              <Label className="mt-2" id="emailLabel" for="paciente-email">
                                <Translate contentKey="generadorApp.paciente.email">Email</Translate>
                              </Label>
                            </Col>
                            <Col md="12">
                              <AvField id="paciente-email" type="text" name="email" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="6">
                        <AvGroup>
                          <Row>
                            <Col md="12">
                              <Label className="mt-2" id="cpfLabel" for="paciente-cpf">
                                <Translate contentKey="generadorApp.paciente.cpf">Cpf</Translate>
                              </Label>
                            </Col>
                            <Col md="12">
                              <AvField id="paciente-cpf" type="text" name="cpf" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="6">
                        <AvGroup>
                          <Row>
                            <Col md="12">
                              <Label className="mt-2" id="rgLabel" for="paciente-rg">
                                <Translate contentKey="generadorApp.paciente.rg">Rg</Translate>
                              </Label>
                            </Col>
                            <Col md="12">
                              <AvField
                                id="paciente-rg"
                                type="text"
                                name="rg"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="6">
                        <AvGroup>
                          <Row>
                            <Col md="12">
                              <Label className="mt-2" id="registroLabel" for="paciente-registro">
                                <Translate contentKey="generadorApp.paciente.registro">Registro</Translate>
                              </Label>
                            </Col>
                            <Col md="12">
                              <AvField
                                id="paciente-registro"
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
  pacienteEntity: storeState.paciente.entity,
  loading: storeState.paciente.loading,
  updating: storeState.paciente.updating,
  updateSuccess: storeState.paciente.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteUpdate);
