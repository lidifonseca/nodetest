import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './atendimento-acompanhamento-push.reducer';
import { IAtendimentoAcompanhamentoPush } from 'app/shared/model/atendimento-acompanhamento-push.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAtendimentoAcompanhamentoPushUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAtendimentoAcompanhamentoPushUpdateState {
  isNew: boolean;
}

export class AtendimentoAcompanhamentoPushUpdate extends React.Component<
  IAtendimentoAcompanhamentoPushUpdateProps,
  IAtendimentoAcompanhamentoPushUpdateState
> {
  constructor(props: Readonly<IAtendimentoAcompanhamentoPushUpdateProps>) {
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
    values.timestampAtendimento = convertDateTimeToServer(values.timestampAtendimento);
    values.timestampConfirmacao = convertDateTimeToServer(values.timestampConfirmacao);

    if (errors.length === 0) {
      const { atendimentoAcompanhamentoPushEntity } = this.props;
      const entity = {
        ...atendimentoAcompanhamentoPushEntity,
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
    this.props.history.push('/atendimento-acompanhamento-push');
  };

  render() {
    const { atendimentoAcompanhamentoPushEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Atendimento Acompanhamento Pushes</li>
          <li className="breadcrumb-item active">Atendimento Acompanhamento Pushes edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...atendimentoAcompanhamentoPushEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.atendimentoAcompanhamentoPush.home.createOrEditLabel">
                    Create or edit a AtendimentoAcompanhamentoPush
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
                  to="/atendimento-acompanhamento-push"
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
                      <Label className="mt-2" for="atendimento-acompanhamento-push-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput
                                id="atendimento-acompanhamento-push-id"
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
                              <Label className="mt-2" id="atendimentoIdLabel" for="atendimento-acompanhamento-push-atendimentoId">
                                <Translate contentKey="generadorApp.atendimentoAcompanhamentoPush.atendimentoId">Atendimento Id</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="atendimento-acompanhamento-push-atendimentoId"
                                type="string"
                                className="form-control"
                                name="atendimentoId"
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
                              <Label className="mt-2" id="pacienteIdLabel" for="atendimento-acompanhamento-push-pacienteId">
                                <Translate contentKey="generadorApp.atendimentoAcompanhamentoPush.pacienteId">Paciente Id</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="atendimento-acompanhamento-push-pacienteId"
                                type="string"
                                className="form-control"
                                name="pacienteId"
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
                              <Label className="mt-2" id="profissionalIdLabel" for="atendimento-acompanhamento-push-profissionalId">
                                <Translate contentKey="generadorApp.atendimentoAcompanhamentoPush.profissionalId">
                                  Profissional Id
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="atendimento-acompanhamento-push-profissionalId"
                                type="string"
                                className="form-control"
                                name="profissionalId"
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
                                id="timestampAtendimentoLabel"
                                for="atendimento-acompanhamento-push-timestampAtendimento"
                              >
                                <Translate contentKey="generadorApp.atendimentoAcompanhamentoPush.timestampAtendimento">
                                  Timestamp Atendimento
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="atendimento-acompanhamento-push-timestampAtendimento"
                                type="datetime-local"
                                className="form-control"
                                name="timestampAtendimento"
                                placeholder={'YYYY-MM-DD HH:mm'}
                                value={
                                  isNew
                                    ? null
                                    : convertDateTimeFromServer(this.props.atendimentoAcompanhamentoPushEntity.timestampAtendimento)
                                }
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="nomePacienteLabel" for="atendimento-acompanhamento-push-nomePaciente">
                                <Translate contentKey="generadorApp.atendimentoAcompanhamentoPush.nomePaciente">Nome Paciente</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="atendimento-acompanhamento-push-nomePaciente"
                                type="text"
                                name="nomePaciente"
                                validate={{
                                  maxLength: { value: 60, errorMessage: translate('entity.validation.maxlength', { max: 60 }) }
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
                              <Label className="mt-2" id="nomeProfissioinalLabel" for="atendimento-acompanhamento-push-nomeProfissioinal">
                                <Translate contentKey="generadorApp.atendimentoAcompanhamentoPush.nomeProfissioinal">
                                  Nome Profissioinal
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="atendimento-acompanhamento-push-nomeProfissioinal"
                                type="text"
                                name="nomeProfissioinal"
                                validate={{
                                  maxLength: { value: 60, errorMessage: translate('entity.validation.maxlength', { max: 60 }) }
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
                                id="timestampConfirmacaoLabel"
                                for="atendimento-acompanhamento-push-timestampConfirmacao"
                              >
                                <Translate contentKey="generadorApp.atendimentoAcompanhamentoPush.timestampConfirmacao">
                                  Timestamp Confirmacao
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="atendimento-acompanhamento-push-timestampConfirmacao"
                                type="datetime-local"
                                className="form-control"
                                name="timestampConfirmacao"
                                placeholder={'YYYY-MM-DD HH:mm'}
                                value={
                                  isNew
                                    ? null
                                    : convertDateTimeFromServer(this.props.atendimentoAcompanhamentoPushEntity.timestampConfirmacao)
                                }
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
  atendimentoAcompanhamentoPushEntity: storeState.atendimentoAcompanhamentoPush.entity,
  loading: storeState.atendimentoAcompanhamentoPush.loading,
  updating: storeState.atendimentoAcompanhamentoPush.updating,
  updateSuccess: storeState.atendimentoAcompanhamentoPush.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AtendimentoAcompanhamentoPushUpdate);
