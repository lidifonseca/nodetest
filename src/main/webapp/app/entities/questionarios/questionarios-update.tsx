import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';
import {
  IQuestionariosUpdateState,
  getEntity,
  getQuestionariosState,
  IQuestionariosBaseState,
  updateEntity,
  createEntity,
  reset
} from './questionarios.reducer';
import { IQuestionarios } from 'app/shared/model/questionarios.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IQuestionariosUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class QuestionariosUpdate extends React.Component<IQuestionariosUpdateProps, IQuestionariosUpdateState> {
  constructor(props: Readonly<IQuestionariosUpdateProps>) {
    super(props);
    this.state = {
      fieldsBase: getQuestionariosState(this.props.location),
      pacienteId: '0',
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

    this.props.getPacientes();
  }

  getFiltersURL = (offset = null) => {
    const fieldsBase = this.state.fieldsBase;
    return (
      '_back=1' +
      (fieldsBase['baseFilters'] ? '&baseFilters=' + fieldsBase['baseFilters'] : '') +
      (fieldsBase['activePage'] ? '&page=' + fieldsBase['activePage'] : '') +
      (fieldsBase['itemsPerPage'] ? '&size=' + fieldsBase['itemsPerPage'] : '') +
      (fieldsBase['sort'] ? '&sort=' + (fieldsBase['sort'] + ',' + fieldsBase['order']) : '') +
      (offset !== null ? '&offset=' + offset : '') +
      (fieldsBase['dataCadastro'] ? '&dataCadastro=' + fieldsBase['dataCadastro'] : '') +
      (fieldsBase['etapaAtual'] ? '&etapaAtual=' + fieldsBase['etapaAtual'] : '') +
      (fieldsBase['finalizado'] ? '&finalizado=' + fieldsBase['finalizado'] : '') +
      (fieldsBase['ultimaPerguntaRespondida'] ? '&ultimaPerguntaRespondida=' + fieldsBase['ultimaPerguntaRespondida'] : '') +
      (fieldsBase['respostasQuestionarios'] ? '&respostasQuestionarios=' + fieldsBase['respostasQuestionarios'] : '') +
      (fieldsBase['paciente'] ? '&paciente=' + fieldsBase['paciente'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    values.dataCadastro = convertDateTimeToServer(values.dataCadastro);

    if (errors.length === 0) {
      const { questionariosEntity } = this.props;
      const entity = {
        ...questionariosEntity,
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
    this.props.history.push('/questionarios?' + this.getFiltersURL());
  };

  render() {
    const { questionariosEntity, pacientes, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Questionarios</li>
          <li className="breadcrumb-item active">Questionarios edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...questionariosEntity,
                  paciente: questionariosEntity.paciente ? questionariosEntity.paciente.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.questionarios.home.createOrEditLabel">Create or edit a Questionarios</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button
                  tag={Link}
                  id="cancel-save"
                  to={'/questionarios?' + this.getFiltersURL()}
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
                    <div>
                      {!isNew ? (
                        <AvGroup>
                          <Row>
                            {/*
                      <Col md="3">
                      <Label className="mt-2" for="questionarios-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="questionarios-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'dataCadastro' ? (
                          <Col md="dataCadastro">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="dataCadastroLabel" for="questionarios-dataCadastro">
                                    <Translate contentKey="generadorApp.questionarios.dataCadastro">Data Cadastro</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput
                                    id="questionarios-dataCadastro"
                                    type="datetime-local"
                                    className="form-control"
                                    name="dataCadastro"
                                    placeholder={'YYYY-MM-DD HH:mm'}
                                    value={isNew ? null : convertDateTimeFromServer(this.props.questionariosEntity.dataCadastro)}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="dataCadastro" value={this.state[baseFilters]} />
                        )}

                        {baseFilters !== 'etapaAtual' ? (
                          <Col md="etapaAtual">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="etapaAtualLabel" for="questionarios-etapaAtual">
                                    <Translate contentKey="generadorApp.questionarios.etapaAtual">Etapa Atual</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="questionarios-etapaAtual" type="text" name="etapaAtual" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="etapaAtual" value={this.state[baseFilters]} />
                        )}

                        {baseFilters !== 'finalizado' ? (
                          <Col md="finalizado">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="finalizadoLabel" check>
                                    <AvInput id="questionarios-finalizado" type="checkbox" className="form-control" name="finalizado" />
                                    <Translate contentKey="generadorApp.questionarios.finalizado">Finalizado</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="finalizado" value={this.state[baseFilters]} />
                        )}

                        {baseFilters !== 'ultimaPerguntaRespondida' ? (
                          <Col md="ultimaPerguntaRespondida">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="ultimaPerguntaRespondidaLabel" for="questionarios-ultimaPerguntaRespondida">
                                    <Translate contentKey="generadorApp.questionarios.ultimaPerguntaRespondida">
                                      Ultima Pergunta Respondida
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="questionarios-ultimaPerguntaRespondida"
                                    type="string"
                                    className="form-control"
                                    name="ultimaPerguntaRespondida"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ultimaPerguntaRespondida" value={this.state[baseFilters]} />
                        )}
                        {baseFilters !== 'respostasQuestionarios' ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="respostasQuestionarios" value={this.state[baseFilters]} />
                        )}
                        {baseFilters !== 'paciente' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="questionarios-paciente">
                                    <Translate contentKey="generadorApp.questionarios.paciente">Paciente</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="questionarios-paciente" type="select" className="form-control" name="paciente">
                                    <option value="null" key="0">
                                      {translate('generadorApp.questionarios.paciente.empty')}
                                    </option>
                                    {pacientes
                                      ? pacientes.map(otherEntity => (
                                          <option value={otherEntity.id} key={otherEntity.id}>
                                            {otherEntity.nome}
                                          </option>
                                        ))
                                      : null}
                                  </AvInput>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="paciente" value={this.state[baseFilters]} />
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
  pacientes: storeState.paciente.entities,
  questionariosEntity: storeState.questionarios.entity,
  loading: storeState.questionarios.loading,
  updating: storeState.questionarios.updating,
  updateSuccess: storeState.questionarios.updateSuccess
});

const mapDispatchToProps = {
  getPacientes,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionariosUpdate);
