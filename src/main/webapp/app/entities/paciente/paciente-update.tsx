import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICidade } from 'app/shared/model/cidade.model';
import { getEntities as getCidades } from 'app/entities/cidade/cidade.reducer';
import { getEntity, updateEntity, createEntity, reset } from './paciente.reducer';
import { IPaciente } from 'app/shared/model/paciente.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPacienteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPacienteUpdateState {
  isNew: boolean;
  cidadeId: string;
}

export class PacienteUpdate extends React.Component<IPacienteUpdateProps, IPacienteUpdateState> {
  constructor(props: Readonly<IPacienteUpdateProps>) {
    super(props);
    this.state = {
      cidadeId: '0',
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

    this.props.getCidades();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    values.dataPost = convertDateTimeToServer(values.dataPost);

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
    const { pacienteEntity, cidades, loading, updating } = this.props;
    const { isNew } = this.state;

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
        <AvForm model={isNew ? {} : pacienteEntity} onSubmit={this.saveEntity}>
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
                              <Label className="mt-2" for="paciente-cidade">
                                <Translate contentKey="generadorApp.paciente.cidade">Cidade</Translate>
                              </Label>
                            </Col>
                            <Col md="12">
                              <AvInput id="paciente-cidade" type="select" className="form-control" name="cidade.id">
                                <option value="" key="0" />
                                {cidades
                                  ? cidades.map(otherEntity => (
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

                      <Col md="6">
                        <AvGroup>
                          <Row>
                            <Col md="12">
                              <Label className="mt-2" id="nomeLabel" for="paciente-nome">
                                <Translate contentKey="generadorApp.paciente.nome">Nome</Translate>
                              </Label>
                            </Col>
                            <Col md="12">
                              <AvField
                                id="paciente-nome"
                                type="text"
                                name="nome"
                                validate={{
                                  maxLength: { value: 60, errorMessage: translate('entity.validation.maxlength', { max: 60 }) }
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
                              <Label className="mt-2" id="emailLabel" for="paciente-email">
                                <Translate contentKey="generadorApp.paciente.email">Email</Translate>
                              </Label>
                            </Col>
                            <Col md="12">
                              <AvField
                                id="paciente-email"
                                type="text"
                                name="email"
                                validate={{
                                  maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
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
                              <Label className="mt-2" id="cpfLabel" for="paciente-cpf">
                                <Translate contentKey="generadorApp.paciente.cpf">Cpf</Translate>
                              </Label>
                            </Col>
                            <Col md="12">
                              <AvField
                                id="paciente-cpf"
                                type="text"
                                name="cpf"
                                validate={{
                                  maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
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
                                  maxLength: { value: 30, errorMessage: translate('entity.validation.maxlength', { max: 30 }) }
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
                                  maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) }
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
  cidades: storeState.cidade.entities,
  pacienteEntity: storeState.paciente.entity,
  loading: storeState.paciente.loading,
  updating: storeState.paciente.updating,
  updateSuccess: storeState.paciente.updateSuccess
});

const mapDispatchToProps = {
  getCidades,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteUpdate);
