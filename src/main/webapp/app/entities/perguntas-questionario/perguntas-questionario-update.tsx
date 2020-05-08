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

import { ISegmentosPerguntas } from 'app/shared/model/segmentos-perguntas.model';
import { getEntities as getSegmentosPerguntas } from 'app/entities/segmentos-perguntas/segmentos-perguntas.reducer';
import {
  IPerguntasQuestionarioUpdateState,
  getEntity,
  getPerguntasQuestionarioState,
  IPerguntasQuestionarioBaseState,
  updateEntity,
  createEntity,
  reset
} from './perguntas-questionario.reducer';
import { IPerguntasQuestionario } from 'app/shared/model/perguntas-questionario.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPerguntasQuestionarioUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PerguntasQuestionarioUpdate extends React.Component<IPerguntasQuestionarioUpdateProps, IPerguntasQuestionarioUpdateState> {
  constructor(props: Readonly<IPerguntasQuestionarioUpdateProps>) {
    super(props);

    this.state = {
      segmentosPerguntasSelectValue: null,
      fieldsBase: getPerguntasQuestionarioState(this.props.location),
      segmentosPerguntasId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }

    if (
      nextProps.segmentosPerguntas.length > 0 &&
      this.state.segmentosPerguntasSelectValue === null &&
      nextProps.perguntasQuestionarioEntity.segmentosPerguntas &&
      nextProps.perguntasQuestionarioEntity.segmentosPerguntas.id
    ) {
      this.setState({
        segmentosPerguntasSelectValue: nextProps.segmentosPerguntas.map(p =>
          nextProps.perguntasQuestionarioEntity.segmentosPerguntas.id === p.id ? { value: p.id, label: p.id } : null
        )
      });
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
      const { perguntasQuestionarioEntity } = this.props;
      const entity = {
        ...perguntasQuestionarioEntity,
        segmentosPerguntas: this.state.segmentosPerguntasSelectValue ? this.state.segmentosPerguntasSelectValue['value'] : null,
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
    this.props.history.push('/perguntas-questionario?' + this.getFiltersURL());
  };

  render() {
    const { perguntasQuestionarioEntity, segmentosPerguntas, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...perguntasQuestionarioEntity,
                  segmentosPerguntas: perguntasQuestionarioEntity.segmentosPerguntas
                    ? perguntasQuestionarioEntity.segmentosPerguntas.id
                    : null
                }
          }
          onSubmit={this.saveEntity}
        >
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
              to={'/perguntas-questionario?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Perguntas Questionarios</li>
            <li className="breadcrumb-item active">Perguntas Questionarios edit</li>
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
                      <Row>
                        {baseFilters !== 'pergunta' ? (
                          <Col md="pergunta">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="perguntaLabel" for="perguntas-questionario-pergunta">
                                    <Translate contentKey="generadorApp.perguntasQuestionario.pergunta">Pergunta</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="perguntas-questionario-pergunta" type="text" name="pergunta" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="pergunta" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'tipoResposta' ? (
                          <Col md="tipoResposta">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="tipoRespostaLabel" for="perguntas-questionario-tipoResposta">
                                    <Translate contentKey="generadorApp.perguntasQuestionario.tipoResposta">Tipo Resposta</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="perguntas-questionario-tipoResposta" type="text" name="tipoResposta" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="tipoResposta" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'obrigatorio' ? (
                          <Col md="obrigatorio">
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
                        ) : (
                          <AvInput type="hidden" name="obrigatorio" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'tipoCampo' ? (
                          <Col md="tipoCampo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="tipoCampoLabel" for="perguntas-questionario-tipoCampo">
                                    <Translate contentKey="generadorApp.perguntasQuestionario.tipoCampo">Tipo Campo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="perguntas-questionario-tipoCampo" type="text" name="tipoCampo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="tipoCampo" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'acoesRespostas' ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="acoesRespostas" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'respostas' ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="respostas" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'segmentosPerguntas' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="perguntas-questionario-segmentosPerguntas">
                                    <Translate contentKey="generadorApp.perguntasQuestionario.segmentosPerguntas">
                                      Segmentos Perguntas
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="perguntas-questionario-segmentosPerguntas"
                                    className={'css-select-control'}
                                    value={this.state.segmentosPerguntasSelectValue}
                                    options={
                                      segmentosPerguntas ? segmentosPerguntas.map(option => ({ value: option.id, label: option.id })) : null
                                    }
                                    onChange={options => this.setState({ segmentosPerguntasSelectValue: options })}
                                    name={'segmentosPerguntas'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="segmentosPerguntas" value={this.state.fieldsBase[baseFilters]} />
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
