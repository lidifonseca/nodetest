import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './prontuario-motivo-internacao-ps.reducer';
import { IProntuarioMotivoInternacaoPs } from 'app/shared/model/prontuario-motivo-internacao-ps.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProntuarioMotivoInternacaoPsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IProntuarioMotivoInternacaoPsUpdateState {
  isNew: boolean;
}

export class ProntuarioMotivoInternacaoPsUpdate extends React.Component<
  IProntuarioMotivoInternacaoPsUpdateProps,
  IProntuarioMotivoInternacaoPsUpdateState
> {
  constructor(props: Readonly<IProntuarioMotivoInternacaoPsUpdateProps>) {
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
      const { prontuarioMotivoInternacaoPsEntity } = this.props;
      const entity = {
        ...prontuarioMotivoInternacaoPsEntity,
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
    this.props.history.push('/prontuario-motivo-internacao-ps');
  };

  render() {
    const { prontuarioMotivoInternacaoPsEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Prontuario Motivo Internacao Ps</li>
          <li className="breadcrumb-item active">Prontuario Motivo Internacao Ps edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...prontuarioMotivoInternacaoPsEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.prontuarioMotivoInternacaoPs.home.createOrEditLabel">
                    Create or edit a ProntuarioMotivoInternacaoPs
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
                  to="/prontuario-motivo-internacao-ps"
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
                      <Label className="mt-2" for="prontuario-motivo-internacao-ps-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput
                                id="prontuario-motivo-internacao-ps-id"
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
                              <Label className="mt-2" id="idProntuarioLabel" for="prontuario-motivo-internacao-ps-idProntuario">
                                <Translate contentKey="generadorApp.prontuarioMotivoInternacaoPs.idProntuario">Id Prontuario</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="prontuario-motivo-internacao-ps-idProntuario"
                                type="string"
                                className="form-control"
                                name="idProntuario"
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
                              <Label className="mt-2" id="idPacienteLabel" for="prontuario-motivo-internacao-ps-idPaciente">
                                <Translate contentKey="generadorApp.prontuarioMotivoInternacaoPs.idPaciente">Id Paciente</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="prontuario-motivo-internacao-ps-idPaciente"
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
                              <Label className="mt-2" id="idMotivoLabel" for="prontuario-motivo-internacao-ps-idMotivo">
                                <Translate contentKey="generadorApp.prontuarioMotivoInternacaoPs.idMotivo">Id Motivo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="prontuario-motivo-internacao-ps-idMotivo"
                                type="string"
                                className="form-control"
                                name="idMotivo"
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
                              <Label className="mt-2" id="idUsuarioLabel" for="prontuario-motivo-internacao-ps-idUsuario">
                                <Translate contentKey="generadorApp.prontuarioMotivoInternacaoPs.idUsuario">Id Usuario</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="prontuario-motivo-internacao-ps-idUsuario"
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
  prontuarioMotivoInternacaoPsEntity: storeState.prontuarioMotivoInternacaoPs.entity,
  loading: storeState.prontuarioMotivoInternacaoPs.loading,
  updating: storeState.prontuarioMotivoInternacaoPs.updating,
  updateSuccess: storeState.prontuarioMotivoInternacaoPs.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProntuarioMotivoInternacaoPsUpdate);
