import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './maio.reducer';
import { IMaio } from 'app/shared/model/maio.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMaioUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IMaioUpdateState {
  isNew: boolean;
}

export class MaioUpdate extends React.Component<IMaioUpdateProps, IMaioUpdateState> {
  constructor(props: Readonly<IMaioUpdateProps>) {
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
      const { maioEntity } = this.props;
      const entity = {
        ...maioEntity,
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
    this.props.history.push('/maio');
  };

  render() {
    const { maioEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Maios</li>
          <li className="breadcrumb-item active">Maios edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...maioEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.maio.home.createOrEditLabel">Create or edit a Maio</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/maio" replace color="info" className="float-right jh-create-entity">
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
                      <Label className="mt-2" for="maio-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="maio-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="idFranquiaLabel" for="maio-idFranquia">
                                <Translate contentKey="generadorApp.maio.idFranquia">Id Franquia</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="maio-idFranquia" type="string" className="form-control" name="idFranquia" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="idPacienteLabel" for="maio-idPaciente">
                                <Translate contentKey="generadorApp.maio.idPaciente">Id Paciente</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="maio-idPaciente" type="string" className="form-control" name="idPaciente" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="nroPadLabel" for="maio-nroPad">
                                <Translate contentKey="generadorApp.maio.nroPad">Nro Pad</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="maio-nroPad" type="string" className="form-control" name="nroPad" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="dataInicioLabel" for="maio-dataInicio">
                                <Translate contentKey="generadorApp.maio.dataInicio">Data Inicio</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="maio-dataInicio"
                                type="text"
                                name="dataInicio"
                                validate={{
                                  maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
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
                              <Label className="mt-2" id="dataFimLabel" for="maio-dataFim">
                                <Translate contentKey="generadorApp.maio.dataFim">Data Fim</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="maio-dataFim"
                                type="text"
                                name="dataFim"
                                validate={{
                                  maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
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
                              <Label className="mt-2" id="idEspecialidadeLabel" for="maio-idEspecialidade">
                                <Translate contentKey="generadorApp.maio.idEspecialidade">Id Especialidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="maio-idEspecialidade" type="string" className="form-control" name="idEspecialidade" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="idPeriodicidadeLabel" for="maio-idPeriodicidade">
                                <Translate contentKey="generadorApp.maio.idPeriodicidade">Id Periodicidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="maio-idPeriodicidade" type="string" className="form-control" name="idPeriodicidade" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="idPeriodoLabel" for="maio-idPeriodo">
                                <Translate contentKey="generadorApp.maio.idPeriodo">Id Periodo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="maio-idPeriodo" type="string" className="form-control" name="idPeriodo" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="qtdSessoesLabel" for="maio-qtdSessoes">
                                <Translate contentKey="generadorApp.maio.qtdSessoes">Qtd Sessoes</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="maio-qtdSessoes" type="string" className="form-control" name="qtdSessoes" />
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
  maioEntity: storeState.maio.entity,
  loading: storeState.maio.loading,
  updating: storeState.maio.updating,
  updateSuccess: storeState.maio.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MaioUpdate);
