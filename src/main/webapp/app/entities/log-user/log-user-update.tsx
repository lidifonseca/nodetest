import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IAcao } from 'app/shared/model/acao.model';
import { getEntities as getAcaos } from 'app/entities/acao/acao.reducer';
import { ITela } from 'app/shared/model/tela.model';
import { getEntities as getTelas } from 'app/entities/tela/tela.reducer';
import { getEntity, getLogUserState, ILogUserBaseState, updateEntity, createEntity, reset } from './log-user.reducer';
import { ILogUser } from 'app/shared/model/log-user.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILogUserUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ILogUserUpdateState {
  fieldsBase: ILogUserBaseState;
  isNew: boolean;
  idAcaoId: string;
  idTelaId: string;
}

export class LogUserUpdate extends React.Component<ILogUserUpdateProps, ILogUserUpdateState> {
  constructor(props: Readonly<ILogUserUpdateProps>) {
    super(props);
    this.state = {
      fieldsBase: getLogUserState(this.props.location),
      idAcaoId: '0',
      idTelaId: '0',
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

    this.props.getAcaos();
    this.props.getTelas();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { logUserEntity } = this.props;
      const entity = {
        ...logUserEntity,
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
    this.props.history.push('/log-user');
  };

  render() {
    const { logUserEntity, acaos, telas, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Log Users</li>
          <li className="breadcrumb-item active">Log Users edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...logUserEntity,
                  idAcao: logUserEntity.idAcao ? logUserEntity.idAcao.id : null,
                  idTela: logUserEntity.idTela ? logUserEntity.idTela.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.logUser.home.createOrEditLabel">Create or edit a LogUser</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/log-user" replace color="info" className="float-right jh-create-entity">
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
                      <Label className="mt-2" for="log-user-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="log-user-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {!this.state.fieldsBase.idUsuario ? (
                          <Col md="idUsuario">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idUsuarioLabel" for="log-user-idUsuario">
                                    <Translate contentKey="generadorApp.logUser.idUsuario">Id Usuario</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="log-user-idUsuario" type="text" name="idUsuario" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idUsuario" value={this.state.fieldsBase.idUsuario} />
                        )}

                        {!this.state.fieldsBase.descricao ? (
                          <Col md="descricao">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="descricaoLabel" for="log-user-descricao">
                                    <Translate contentKey="generadorApp.logUser.descricao">Descricao</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="log-user-descricao" type="text" name="descricao" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="descricao" value={this.state.fieldsBase.descricao} />
                        )}
                        {!this.state.fieldsBase.idAcao ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="log-user-idAcao">
                                    <Translate contentKey="generadorApp.logUser.idAcao">Id Acao</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="log-user-idAcao" type="select" className="form-control" name="idAcao">
                                    <option value="null" key="0">
                                      {translate('generadorApp.logUser.idAcao.empty')}
                                    </option>
                                    {acaos
                                      ? acaos.map(otherEntity => (
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
                        ) : (
                          <AvInput type="hidden" name="idAcao" value={this.state.fieldsBase.idAcao} />
                        )}
                        {!this.state.fieldsBase.idTela ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="log-user-idTela">
                                    <Translate contentKey="generadorApp.logUser.idTela">Id Tela</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="log-user-idTela" type="select" className="form-control" name="idTela">
                                    <option value="null" key="0">
                                      {translate('generadorApp.logUser.idTela.empty')}
                                    </option>
                                    {telas
                                      ? telas.map(otherEntity => (
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
                        ) : (
                          <AvInput type="hidden" name="idTela" value={this.state.fieldsBase.idTela} />
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
  acaos: storeState.acao.entities,
  telas: storeState.tela.entities,
  logUserEntity: storeState.logUser.entity,
  loading: storeState.logUser.loading,
  updating: storeState.logUser.updating,
  updateSuccess: storeState.logUser.updateSuccess
});

const mapDispatchToProps = {
  getAcaos,
  getTelas,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LogUserUpdate);
