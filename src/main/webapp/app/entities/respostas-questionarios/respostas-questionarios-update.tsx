import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IQuestionarios } from 'app/shared/model/questionarios.model';
import { getEntities as getQuestionarios } from 'app/entities/questionarios/questionarios.reducer';
import { getEntity, updateEntity, createEntity, reset } from './respostas-questionarios.reducer';
import { IRespostasQuestionarios } from 'app/shared/model/respostas-questionarios.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRespostasQuestionariosUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IRespostasQuestionariosUpdateState {
  isNew: boolean;
  questionariosIdId: string;
}

export class RespostasQuestionariosUpdate extends React.Component<IRespostasQuestionariosUpdateProps, IRespostasQuestionariosUpdateState> {
  constructor(props: Readonly<IRespostasQuestionariosUpdateProps>) {
    super(props);
    this.state = {
      questionariosIdId: '0',
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

    this.props.getQuestionarios();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    values.dataResposta = convertDateTimeToServer(values.dataResposta);

    if (errors.length === 0) {
      const { respostasQuestionariosEntity } = this.props;
      const entity = {
        ...respostasQuestionariosEntity,
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
    this.props.history.push('/respostas-questionarios');
  };

  render() {
    const { respostasQuestionariosEntity, questionarios, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Respostas Questionarios</li>
          <li className="breadcrumb-item active">Respostas Questionarios edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...respostasQuestionariosEntity,
                  questionariosId: respostasQuestionariosEntity.questionariosId ? respostasQuestionariosEntity.questionariosId.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.respostasQuestionarios.home.createOrEditLabel">
                    Create or edit a RespostasQuestionarios
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
                  to="/respostas-questionarios"
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
                      <Label className="mt-2" for="respostas-questionarios-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="respostas-questionarios-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="dataRespostaLabel" for="respostas-questionarios-dataResposta">
                                <Translate contentKey="generadorApp.respostasQuestionarios.dataResposta">Data Resposta</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="respostas-questionarios-dataResposta"
                                type="datetime-local"
                                className="form-control"
                                name="dataResposta"
                                placeholder={'YYYY-MM-DD HH:mm'}
                                value={isNew ? null : convertDateTimeFromServer(this.props.respostasQuestionariosEntity.dataResposta)}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="informacaoAdicionalLabel" for="respostas-questionarios-informacaoAdicional">
                                <Translate contentKey="generadorApp.respostasQuestionarios.informacaoAdicional">
                                  Informacao Adicional
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="respostas-questionarios-informacaoAdicional"
                                type="text"
                                name="informacaoAdicional"
                                validate={{
                                  maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
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
                              <Label className="mt-2" id="questionarioIdLabel" for="respostas-questionarios-questionarioId">
                                <Translate contentKey="generadorApp.respostasQuestionarios.questionarioId">Questionario Id</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="respostas-questionarios-questionarioId"
                                type="string"
                                className="form-control"
                                name="questionarioId"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>
                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" for="respostas-questionarios-questionariosId">
                                <Translate contentKey="generadorApp.respostasQuestionarios.questionariosId">Questionarios Id</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="respostas-questionarios-questionariosId"
                                type="select"
                                className="form-control"
                                name="questionariosId"
                              >
                                <option value="null" key="0">
                                  {translate('generadorApp.respostasQuestionarios.questionariosId.empty')}
                                </option>
                                {questionarios
                                  ? questionarios.map(otherEntity => (
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
  questionarios: storeState.questionarios.entities,
  respostasQuestionariosEntity: storeState.respostasQuestionarios.entity,
  loading: storeState.respostasQuestionarios.loading,
  updating: storeState.respostasQuestionarios.updating,
  updateSuccess: storeState.respostasQuestionarios.updateSuccess
});

const mapDispatchToProps = {
  getQuestionarios,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RespostasQuestionariosUpdate);
