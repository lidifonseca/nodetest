import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

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
      fieldsBase: getPerguntasQuestionarioState(this.props.location),
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
    return (
      '_back=1' +
      (fieldsBase['baseFilters'] ? '&baseFilters=' + fieldsBase['baseFilters'] : '') +
      (fieldsBase['activePage'] ? '&page=' + fieldsBase['activePage'] : '') +
      (fieldsBase['itemsPerPage'] ? '&size=' + fieldsBase['itemsPerPage'] : '') +
      (fieldsBase['sort'] ? '&sort=' + (fieldsBase['sort'] + ',' + fieldsBase['order']) : '') +
      (offset !== null ? '&offset=' + offset : '') +
      (fieldsBase['pergunta'] ? '&pergunta=' + fieldsBase['pergunta'] : '') +
      (fieldsBase['tipoResposta'] ? '&tipoResposta=' + fieldsBase['tipoResposta'] : '') +
      (fieldsBase['obrigatorio'] ? '&obrigatorio=' + fieldsBase['obrigatorio'] : '') +
      (fieldsBase['tipoCampo'] ? '&tipoCampo=' + fieldsBase['tipoCampo'] : '') +
      ''
    );
  };
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
    this.props.history.push('/perguntas-questionario?' + this.getFiltersURL());
  };

  render() {
    const { perguntasQuestionarioEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
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
                  ...perguntasQuestionarioEntity
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
  perguntasQuestionarioEntity: storeState.perguntasQuestionario.entity,
  loading: storeState.perguntasQuestionario.loading,
  updating: storeState.perguntasQuestionario.updating,
  updateSuccess: storeState.perguntasQuestionario.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PerguntasQuestionarioUpdate);
