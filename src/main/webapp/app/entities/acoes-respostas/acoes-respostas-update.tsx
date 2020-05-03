import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IRespostas } from 'app/shared/model/respostas.model';
import { getEntities as getRespostas } from 'app/entities/respostas/respostas.reducer';
import { IPerguntasQuestionario } from 'app/shared/model/perguntas-questionario.model';
import { getEntities as getPerguntasQuestionarios } from 'app/entities/perguntas-questionario/perguntas-questionario.reducer';
import { getEntity, updateEntity, createEntity, reset } from './acoes-respostas.reducer';
import { IAcoesRespostas } from 'app/shared/model/acoes-respostas.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAcoesRespostasUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAcoesRespostasUpdateState {
  isNew: boolean;
  respostasIdId: string;
  perguntasQuestionarioIdId: string;
}

export class AcoesRespostasUpdate extends React.Component<IAcoesRespostasUpdateProps, IAcoesRespostasUpdateState> {
  constructor(props: Readonly<IAcoesRespostasUpdateProps>) {
    super(props);
    this.state = {
      respostasIdId: '0',
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

    this.props.getRespostas();
    this.props.getPerguntasQuestionarios();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { acoesRespostasEntity } = this.props;
      const entity = {
        ...acoesRespostasEntity,
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
    this.props.history.push('/acoes-respostas');
  };

  render() {
    const { acoesRespostasEntity, respostas, perguntasQuestionarios, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Acoes Respostas</li>
          <li className="breadcrumb-item active">Acoes Respostas edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...acoesRespostasEntity,
                  respostasId: acoesRespostasEntity.respostasId ? acoesRespostasEntity.respostasId.id : null,
                  perguntasQuestionarioId: acoesRespostasEntity.perguntasQuestionarioId
                    ? acoesRespostasEntity.perguntasQuestionarioId.id
                    : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.acoesRespostas.home.createOrEditLabel">Create or edit a AcoesRespostas</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/acoes-respostas" replace color="info" className="float-right jh-create-entity">
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
                      <Label className="mt-2" for="acoes-respostas-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="acoes-respostas-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="12">
                              <Label className="mt-2" id="abrirCampoPersonalizadoLabel" check>
                                <AvInput
                                  id="acoes-respostas-abrirCampoPersonalizado"
                                  type="checkbox"
                                  className="form-control"
                                  name="abrirCampoPersonalizado"
                                />
                                <Translate contentKey="generadorApp.acoesRespostas.abrirCampoPersonalizado">
                                  Abrir Campo Personalizado
                                </Translate>
                              </Label>
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="condicaoSexoLabel" for="acoes-respostas-condicaoSexo">
                                <Translate contentKey="generadorApp.acoesRespostas.condicaoSexo">Condicao Sexo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="acoes-respostas-condicaoSexo"
                                type="text"
                                name="condicaoSexo"
                                validate={{
                                  maxLength: { value: 45, errorMessage: translate('entity.validation.maxlength', { max: 45 }) }
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
                              <Label className="mt-2" id="observacoesLabel" for="acoes-respostas-observacoes">
                                <Translate contentKey="generadorApp.acoesRespostas.observacoes">Observacoes</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="acoes-respostas-observacoes"
                                type="text"
                                name="observacoes"
                                validate={{
                                  maxLength: { value: 125, errorMessage: translate('entity.validation.maxlength', { max: 125 }) }
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
                              <Label className="mt-2" id="tipoCampo1Label" for="acoes-respostas-tipoCampo1">
                                <Translate contentKey="generadorApp.acoesRespostas.tipoCampo1">Tipo Campo 1</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="acoes-respostas-tipoCampo1"
                                type="text"
                                name="tipoCampo1"
                                validate={{
                                  maxLength: { value: 45, errorMessage: translate('entity.validation.maxlength', { max: 45 }) }
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
                              <Label className="mt-2" id="tipoCampo2Label" for="acoes-respostas-tipoCampo2">
                                <Translate contentKey="generadorApp.acoesRespostas.tipoCampo2">Tipo Campo 2</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="acoes-respostas-tipoCampo2"
                                type="text"
                                name="tipoCampo2"
                                validate={{
                                  maxLength: { value: 45, errorMessage: translate('entity.validation.maxlength', { max: 45 }) }
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
                              <Label className="mt-2" for="acoes-respostas-respostasId">
                                <Translate contentKey="generadorApp.acoesRespostas.respostasId">Respostas Id</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="acoes-respostas-respostasId" type="select" className="form-control" name="respostasId">
                                <option value="null" key="0">
                                  {translate('generadorApp.acoesRespostas.respostasId.empty')}
                                </option>
                                {respostas
                                  ? respostas.map(otherEntity => (
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

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" for="acoes-respostas-perguntasQuestionarioId">
                                <Translate contentKey="generadorApp.acoesRespostas.perguntasQuestionarioId">
                                  Perguntas Questionario Id
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="acoes-respostas-perguntasQuestionarioId"
                                type="select"
                                className="form-control"
                                name="perguntasQuestionarioId"
                              >
                                <option value="null" key="0">
                                  {translate('generadorApp.acoesRespostas.perguntasQuestionarioId.empty')}
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
  respostas: storeState.respostas.entities,
  perguntasQuestionarios: storeState.perguntasQuestionario.entities,
  acoesRespostasEntity: storeState.acoesRespostas.entity,
  loading: storeState.acoesRespostas.loading,
  updating: storeState.acoesRespostas.updating,
  updateSuccess: storeState.acoesRespostas.updateSuccess
});

const mapDispatchToProps = {
  getRespostas,
  getPerguntasQuestionarios,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AcoesRespostasUpdate);
