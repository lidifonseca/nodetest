import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './profissional-horario.reducer';
import { IProfissionalHorario } from 'app/shared/model/profissional-horario.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProfissionalHorarioUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IProfissionalHorarioUpdateState {
  isNew: boolean;
}

export class ProfissionalHorarioUpdate extends React.Component<IProfissionalHorarioUpdateProps, IProfissionalHorarioUpdateState> {
  constructor(props: Readonly<IProfissionalHorarioUpdateProps>) {
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
    values.horario = convertDateTimeToServer(values.horario);

    if (errors.length === 0) {
      const { profissionalHorarioEntity } = this.props;
      const entity = {
        ...profissionalHorarioEntity,
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
    this.props.history.push('/profissional-horario');
  };

  render() {
    const { profissionalHorarioEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Profissional Horarios</li>
          <li className="breadcrumb-item active">Profissional Horarios edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...profissionalHorarioEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.profissionalHorario.home.createOrEditLabel">
                    Create or edit a ProfissionalHorario
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
                  to="/profissional-horario"
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
                      <Label className="mt-2" for="profissional-horario-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="profissional-horario-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="idAtendimentoLabel" for="profissional-horario-idAtendimento">
                                <Translate contentKey="generadorApp.profissionalHorario.idAtendimento">Id Atendimento</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="profissional-horario-idAtendimento"
                                type="string"
                                className="form-control"
                                name="idAtendimento"
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
                              <Label className="mt-2" id="idProfissionalLabel" for="profissional-horario-idProfissional">
                                <Translate contentKey="generadorApp.profissionalHorario.idProfissional">Id Profissional</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="profissional-horario-idProfissional"
                                type="string"
                                className="form-control"
                                name="idProfissional"
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
                              <Label className="mt-2" id="horarioLabel" for="profissional-horario-horario">
                                <Translate contentKey="generadorApp.profissionalHorario.horario">Horario</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="profissional-horario-horario"
                                type="datetime-local"
                                className="form-control"
                                name="horario"
                                placeholder={'YYYY-MM-DD HH:mm'}
                                value={isNew ? null : convertDateTimeFromServer(this.props.profissionalHorarioEntity.horario)}
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') }
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
                              <Label className="mt-2" id="confirmLabel" for="profissional-horario-confirm">
                                <Translate contentKey="generadorApp.profissionalHorario.confirm">Confirm</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="profissional-horario-confirm" type="string" className="form-control" name="confirm" />
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
  profissionalHorarioEntity: storeState.profissionalHorario.entity,
  loading: storeState.profissionalHorario.loading,
  updating: storeState.profissionalHorario.updating,
  updateSuccess: storeState.profissionalHorario.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalHorarioUpdate);