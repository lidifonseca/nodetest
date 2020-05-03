import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ISegmentosPerguntas } from 'app/shared/model/segmentos-perguntas.model';
import { getEntities as getSegmentosPerguntas } from 'app/entities/segmentos-perguntas/segmentos-perguntas.reducer';
import { getEntity, updateEntity, createEntity, reset } from './perguntas-questionario.reducer';
import { IPerguntasQuestionario } from 'app/shared/model/perguntas-questionario.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPerguntasQuestionarioUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPerguntasQuestionarioUpdateState {
  isNew: boolean;
  segmentosPerguntasIdId: string;
}

export class PerguntasQuestionarioUpdate extends React.Component<IPerguntasQuestionarioUpdateProps, IPerguntasQuestionarioUpdateState> {
  constructor(props: Readonly<IPerguntasQuestionarioUpdateProps>) {
    super(props);
    this.state = {
      segmentosPerguntasIdId: '0',
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

    this.props.getSegmentosPerguntas();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { perguntasQuestionarioEntity } = this.props;
      const entity = {
        ...perguntasQuestionarioEntity,
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
    this.props.history.push('/perguntas-questionario');
  };

  render() {
    const { perguntasQuestionarioEntity, segmentosPerguntas, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Perguntas Questionarios</li>
          <li className="breadcrumb-item active">Perguntas Questionarios edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...perguntasQuestionarioEntity,
                  segmentosPerguntasId: perguntasQuestionarioEntity.segmentosPerguntasId
                    ? perguntasQuestionarioEntity.segmentosPerguntasId.id
                    : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.perguntasQuestionario.home.createOrEditLabel">
                    Create or edit a PerguntasQuestionario
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
                  to="/perguntas-questionario"
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
                      <Label className="mt-2" for="perguntas-questionario-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="perguntas-questionario-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="perguntaLabel" for="perguntas-questionario-pergunta">
                                <Translate contentKey="generadorApp.perguntasQuestionario.pergunta">Pergunta</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="perguntas-questionario-pergunta"
                                type="text"
                                name="pergunta"
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
                              <Label className="mt-2" id="tipoRespostaLabel" for="perguntas-questionario-tipoResposta">
                                <Translate contentKey="generadorApp.perguntasQuestionario.tipoResposta">Tipo Resposta</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="perguntas-questionario-tipoResposta"
                                type="text"
                                name="tipoResposta"
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
                            <Col md="12">
                              <Label className="mt-2" id="obrigatorioLabel" check>
                                <AvInput
                                  id="perguntas-questionario-obrigatorio"
                                  type="checkbox"
                                  className="form-control"
                                  name="obrigatorio"
                                />
                                <Translate contentKey="generadorApp.perguntasQuestionario.obrigatorio">Obrigatorio</Translate>
                              </Label>
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="tipoCampoLabel" for="perguntas-questionario-tipoCampo">
                                <Translate contentKey="generadorApp.perguntasQuestionario.tipoCampo">Tipo Campo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="perguntas-questionario-tipoCampo"
                                type="text"
                                name="tipoCampo"
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
                              <Label className="mt-2" for="perguntas-questionario-segmentosPerguntasId">
                                <Translate contentKey="generadorApp.perguntasQuestionario.segmentosPerguntasId">
                                  Segmentos Perguntas Id
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="perguntas-questionario-segmentosPerguntasId"
                                type="select"
                                className="form-control"
                                name="segmentosPerguntasId"
                              >
                                <option value="null" key="0">
                                  {translate('generadorApp.perguntasQuestionario.segmentosPerguntasId.empty')}
                                </option>
                                {segmentosPerguntas
                                  ? segmentosPerguntas.map(otherEntity => (
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
  segmentosPerguntas: storeState.segmentosPerguntas.entities,
  perguntasQuestionarioEntity: storeState.perguntasQuestionario.entity,
  loading: storeState.perguntasQuestionario.loading,
  updating: storeState.perguntasQuestionario.updating,
  updateSuccess: storeState.perguntasQuestionario.updateSuccess
});

const mapDispatchToProps = {
  getSegmentosPerguntas,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PerguntasQuestionarioUpdate);
