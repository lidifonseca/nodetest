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
import { IFranquiaUsuario } from 'app/shared/model/franquia-usuario.model';
import { getEntities as getFranquiaUsuarios } from 'app/entities/franquia-usuario/franquia-usuario.reducer';
import {
  getEntity,
  getLogUserFranquiaState,
  ILogUserFranquiaBaseState,
  updateEntity,
  createEntity,
  reset
} from './log-user-franquia.reducer';
import { ILogUserFranquia } from 'app/shared/model/log-user-franquia.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILogUserFranquiaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ILogUserFranquiaUpdateState {
  fieldsBase: ILogUserFranquiaBaseState;
  isNew: boolean;
  idAcaoId: string;
  idTelaId: string;
  idUsuarioId: string;
}

export class LogUserFranquiaUpdate extends React.Component<ILogUserFranquiaUpdateProps, ILogUserFranquiaUpdateState> {
  constructor(props: Readonly<ILogUserFranquiaUpdateProps>) {
    super(props);
    this.state = {
      fieldsBase: getLogUserFranquiaState(this.props.location),
      idAcaoId: '0',
      idTelaId: '0',
      idUsuarioId: '0',
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
    this.props.getFranquiaUsuarios();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { logUserFranquiaEntity } = this.props;
      const entity = {
        ...logUserFranquiaEntity,
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
    this.props.history.push('/log-user-franquia');
  };

  render() {
    const { logUserFranquiaEntity, acaos, telas, franquiaUsuarios, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Log User Franquias</li>
          <li className="breadcrumb-item active">Log User Franquias edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...logUserFranquiaEntity,
                  idAcao: logUserFranquiaEntity.idAcao ? logUserFranquiaEntity.idAcao.id : null,
                  idTela: logUserFranquiaEntity.idTela ? logUserFranquiaEntity.idTela.id : null,
                  idUsuario: logUserFranquiaEntity.idUsuario ? logUserFranquiaEntity.idUsuario.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.logUserFranquia.home.createOrEditLabel">Create or edit a LogUserFranquia</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/log-user-franquia" replace color="info" className="float-right jh-create-entity">
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
                      <Label className="mt-2" for="log-user-franquia-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="log-user-franquia-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {!this.state.fieldsBase.descricao ? (
                          <Col md="descricao">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="descricaoLabel" for="log-user-franquia-descricao">
                                    <Translate contentKey="generadorApp.logUserFranquia.descricao">Descricao</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="log-user-franquia-descricao" type="text" name="descricao" />
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
                                  <Label className="mt-2" for="log-user-franquia-idAcao">
                                    <Translate contentKey="generadorApp.logUserFranquia.idAcao">Id Acao</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="log-user-franquia-idAcao" type="select" className="form-control" name="idAcao">
                                    <option value="null" key="0">
                                      {translate('generadorApp.logUserFranquia.idAcao.empty')}
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
                                  <Label className="mt-2" for="log-user-franquia-idTela">
                                    <Translate contentKey="generadorApp.logUserFranquia.idTela">Id Tela</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="log-user-franquia-idTela" type="select" className="form-control" name="idTela">
                                    <option value="null" key="0">
                                      {translate('generadorApp.logUserFranquia.idTela.empty')}
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
                        {!this.state.fieldsBase.idUsuario ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="log-user-franquia-idUsuario">
                                    <Translate contentKey="generadorApp.logUserFranquia.idUsuario">Id Usuario</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="log-user-franquia-idUsuario" type="select" className="form-control" name="idUsuario">
                                    <option value="null" key="0">
                                      {translate('generadorApp.logUserFranquia.idUsuario.empty')}
                                    </option>
                                    {franquiaUsuarios
                                      ? franquiaUsuarios.map(otherEntity => (
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
                          <AvInput type="hidden" name="idUsuario" value={this.state.fieldsBase.idUsuario} />
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
  franquiaUsuarios: storeState.franquiaUsuario.entities,
  logUserFranquiaEntity: storeState.logUserFranquia.entity,
  loading: storeState.logUserFranquia.loading,
  updating: storeState.logUserFranquia.updating,
  updateSuccess: storeState.logUserFranquia.updateSuccess
});

const mapDispatchToProps = {
  getAcaos,
  getTelas,
  getFranquiaUsuarios,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LogUserFranquiaUpdate);
