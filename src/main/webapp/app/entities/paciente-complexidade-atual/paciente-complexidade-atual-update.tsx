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
  IPacienteComplexidadeAtualUpdateState,
  getEntity,
  getPacienteComplexidadeAtualState,
  IPacienteComplexidadeAtualBaseState,
  updateEntity,
  createEntity,
  reset
} from './paciente-complexidade-atual.reducer';
import { IPacienteComplexidadeAtual } from 'app/shared/model/paciente-complexidade-atual.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPacienteComplexidadeAtualUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteComplexidadeAtualUpdate extends React.Component<
  IPacienteComplexidadeAtualUpdateProps,
  IPacienteComplexidadeAtualUpdateState
> {
  constructor(props: Readonly<IPacienteComplexidadeAtualUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getPacienteComplexidadeAtualState(this.props.location),
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
      const { pacienteComplexidadeAtualEntity } = this.props;
      const entity = {
        ...pacienteComplexidadeAtualEntity,

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
    this.props.history.push('/paciente-complexidade-atual?' + this.getFiltersURL());
  };

  render() {
    const { pacienteComplexidadeAtualEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...pacienteComplexidadeAtualEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.pacienteComplexidadeAtual.home.createOrEditLabel">
                Create or edit a PacienteComplexidadeAtual
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
              to={'/paciente-complexidade-atual?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Paciente Complexidade Atuals</li>
            <li className="breadcrumb-item active">Paciente Complexidade Atuals edit</li>
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
                        <Label className="mt-2" for="paciente-complexidade-atual-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput
                                id="paciente-complexidade-atual-id"
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
                                  <Label className="mt-2" id="idPacienteLabel" for="paciente-complexidade-atual-idPaciente">
                                    <Translate contentKey="generadorApp.pacienteComplexidadeAtual.idPaciente">Id Paciente</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-complexidade-atual-idPaciente"
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
                        {baseFilters !== 'idPacienteComplexidade' ? (
                          <Col md="idPacienteComplexidade">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label
                                    className="mt-2"
                                    id="idPacienteComplexidadeLabel"
                                    for="paciente-complexidade-atual-idPacienteComplexidade"
                                  >
                                    <Translate contentKey="generadorApp.pacienteComplexidadeAtual.idPacienteComplexidade">
                                      Id Paciente Complexidade
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-complexidade-atual-idPacienteComplexidade"
                                    type="string"
                                    className="form-control"
                                    name="idPacienteComplexidade"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idPacienteComplexidade" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'baixa' ? (
                          <Col md="baixa">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="baixaLabel" for="paciente-complexidade-atual-baixa">
                                    <Translate contentKey="generadorApp.pacienteComplexidadeAtual.baixa">Baixa</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-complexidade-atual-baixa" type="string" className="form-control" name="baixa" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="baixa" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'media' ? (
                          <Col md="media">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="mediaLabel" for="paciente-complexidade-atual-media">
                                    <Translate contentKey="generadorApp.pacienteComplexidadeAtual.media">Media</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-complexidade-atual-media" type="string" className="form-control" name="media" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="media" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'alta' ? (
                          <Col md="alta">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="altaLabel" for="paciente-complexidade-atual-alta">
                                    <Translate contentKey="generadorApp.pacienteComplexidadeAtual.alta">Alta</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-complexidade-atual-alta" type="string" className="form-control" name="alta" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="alta" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ventilacaoMecanica' ? (
                          <Col md="ventilacaoMecanica">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="ventilacaoMecanicaLabel" for="paciente-complexidade-atual-ventilacaoMecanica">
                                    <Translate contentKey="generadorApp.pacienteComplexidadeAtual.ventilacaoMecanica">
                                      Ventilacao Mecanica
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-complexidade-atual-ventilacaoMecanica"
                                    type="string"
                                    className="form-control"
                                    name="ventilacaoMecanica"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ventilacaoMecanica" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'telemonitoramente' ? (
                          <Col md="telemonitoramente">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="telemonitoramenteLabel" for="paciente-complexidade-atual-telemonitoramente">
                                    <Translate contentKey="generadorApp.pacienteComplexidadeAtual.telemonitoramente">
                                      Telemonitoramente
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-complexidade-atual-telemonitoramente"
                                    type="string"
                                    className="form-control"
                                    name="telemonitoramente"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="telemonitoramente" value={this.state.fieldsBase[baseFilters]} />
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
  pacienteComplexidadeAtualEntity: storeState.pacienteComplexidadeAtual.entity,
  loading: storeState.pacienteComplexidadeAtual.loading,
  updating: storeState.pacienteComplexidadeAtual.updating,
  updateSuccess: storeState.pacienteComplexidadeAtual.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteComplexidadeAtualUpdate);
