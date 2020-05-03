import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPerguntasQuestionario } from 'app/shared/model/perguntas-questionario.model';
import { getEntities as getPerguntasQuestionarios } from 'app/entities/perguntas-questionario/perguntas-questionario.reducer';
import { getEntity, updateEntity, createEntity, reset } from './respostas.reducer';
import { IRespostas } from 'app/shared/model/respostas.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRespostasUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IRespostasUpdateState {
  isNew: boolean;
  perguntasQuestionarioIdId: string;
}

export class RespostasUpdate extends React.Component<IRespostasUpdateProps, IRespostasUpdateState> {
  constructor(props: Readonly<IRespostasUpdateProps>) {
    super(props);
    this.state = {
      perguntasQuestionarioIdId: '0',
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

    this.props.getPerguntasQuestionarios();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { respostasEntity } = this.props;
      const entity = {
        ...respostasEntity,
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
    this.props.history.push('/respostas');
  };

  render() {
    const { respostasEntity, perguntasQuestionarios, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Respostas</li>
          <li className="breadcrumb-item active">Respostas edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...respostasEntity,
                  perguntasQuestionarioId: respostasEntity.perguntasQuestionarioId ? respostasEntity.perguntasQuestionarioId.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.respostas.home.createOrEditLabel">Create or edit a Respostas</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/respostas" replace color="info" className="float-right jh-create-entity">
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
                      <Label className="mt-2" for="respostas-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="respostas-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="respostaLabel" for="respostas-resposta">
                                <Translate contentKey="generadorApp.respostas.resposta">Resposta</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="respostas-resposta"
                                type="text"
                                name="resposta"
                                validate={{
                                  maxLength: { value: 245, errorMessage: translate('entity.validation.maxlength', { max: 245 }) }
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
                              <Label className="mt-2" id="pontuacaoLabel" for="respostas-pontuacao">
                                <Translate contentKey="generadorApp.respostas.pontuacao">Pontuacao</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="respostas-pontuacao" type="string" className="form-control" name="pontuacao" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="12">
                              <Label className="mt-2" id="respostaAtivaLabel" check>
                                <AvInput id="respostas-respostaAtiva" type="checkbox" className="form-control" name="respostaAtiva" />
                                <Translate contentKey="generadorApp.respostas.respostaAtiva">Resposta Ativa</Translate>
                              </Label>
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>
                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" for="respostas-perguntasQuestionarioId">
                                <Translate contentKey="generadorApp.respostas.perguntasQuestionarioId">Perguntas Questionario Id</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="respostas-perguntasQuestionarioId"
                                type="select"
                                className="form-control"
                                name="perguntasQuestionarioId"
                              >
                                <option value="null" key="0">
                                  {translate('generadorApp.respostas.perguntasQuestionarioId.empty')}
                                </option>
                                {perguntasQuestionarios
                                  ? perguntasQuestionarios.map(otherEntity => (
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
  perguntasQuestionarios: storeState.perguntasQuestionario.entities,
  respostasEntity: storeState.respostas.entity,
  loading: storeState.respostas.loading,
  updating: storeState.respostas.updating,
  updateSuccess: storeState.respostas.updateSuccess
});

const mapDispatchToProps = {
  getPerguntasQuestionarios,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RespostasUpdate);
