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
  IRespostasQuestionariosUpdateState,
  getEntity,
  getRespostasQuestionariosState,
  IRespostasQuestionariosBaseState,
  updateEntity,
  createEntity,
  reset
} from './respostas-questionarios.reducer';
import { IRespostasQuestionarios } from 'app/shared/model/respostas-questionarios.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRespostasQuestionariosUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class RespostasQuestionariosUpdate extends React.Component<IRespostasQuestionariosUpdateProps, IRespostasQuestionariosUpdateState> {
  constructor(props: Readonly<IRespostasQuestionariosUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getRespostasQuestionariosState(this.props.location),
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
      (fieldsBase['dataResposta'] ? '&dataResposta=' + fieldsBase['dataResposta'] : '') +
      (fieldsBase['informacaoAdicional'] ? '&informacaoAdicional=' + fieldsBase['informacaoAdicional'] : '') +
      (fieldsBase['questionarioId'] ? '&questionarioId=' + fieldsBase['questionarioId'] : '') +
      ''
    );
  };
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
    this.props.history.push('/respostas-questionarios?' + this.getFiltersURL());
  };

  render() {
    const { respostasQuestionariosEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
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
                  ...respostasQuestionariosEntity
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
                  to={'/respostas-questionarios?' + this.getFiltersURL()}
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
                      <Row>
                        {baseFilters !== 'dataResposta' ? (
                          <Col md="dataResposta">
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
                        ) : (
                          <AvInput type="hidden" name="dataResposta" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'informacaoAdicional' ? (
                          <Col md="informacaoAdicional">
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
                                  <AvField id="respostas-questionarios-informacaoAdicional" type="text" name="informacaoAdicional" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="informacaoAdicional" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'questionarioId' ? (
                          <Col md="questionarioId">
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
                        ) : (
                          <AvInput type="hidden" name="questionarioId" value={this.state.fieldsBase[baseFilters]} />
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
  respostasQuestionariosEntity: storeState.respostasQuestionarios.entity,
  loading: storeState.respostasQuestionarios.loading,
  updating: storeState.respostasQuestionarios.updating,
  updateSuccess: storeState.respostasQuestionarios.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RespostasQuestionariosUpdate);
