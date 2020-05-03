import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITela } from 'app/shared/model/tela.model';
import { getEntities as getTelas } from 'app/entities/tela/tela.reducer';
import { IAcao } from 'app/shared/model/acao.model';
import { getEntities as getAcaos } from 'app/entities/acao/acao.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './usuario-acao.reducer';
import { IUsuarioAcao } from 'app/shared/model/usuario-acao.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUsuarioAcaoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IUsuarioAcaoUpdateState {
  isNew: boolean;
  idTelaId: string;
  idAcaoId: string;
}

export class UsuarioAcaoUpdate extends React.Component<IUsuarioAcaoUpdateProps, IUsuarioAcaoUpdateState> {
  constructor(props: Readonly<IUsuarioAcaoUpdateProps>) {
    super(props);
    this.state = {
      idTelaId: '0',
      idAcaoId: '0',
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

    this.props.getTelas();
    this.props.getAcaos();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { usuarioAcaoEntity } = this.props;
      const entity = {
        ...usuarioAcaoEntity,
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
    this.props.history.push('/usuario-acao');
  };

  render() {
    const { usuarioAcaoEntity, telas, acaos, loading, updating } = this.props;
    const { isNew } = this.state;

    const { descricao } = usuarioAcaoEntity;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Usuario Acaos</li>
          <li className="breadcrumb-item active">Usuario Acaos edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...usuarioAcaoEntity,
                  idTela: usuarioAcaoEntity.idTela ? usuarioAcaoEntity.idTela.id : null,
                  idAcao: usuarioAcaoEntity.idAcao ? usuarioAcaoEntity.idAcao.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.usuarioAcao.home.createOrEditLabel">Create or edit a UsuarioAcao</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/usuario-acao" replace color="info" className="float-right jh-create-entity">
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
                      <Label className="mt-2" for="usuario-acao-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="usuario-acao-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="idUsuarioLabel" for="usuario-acao-idUsuario">
                                <Translate contentKey="generadorApp.usuarioAcao.idUsuario">Id Usuario</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-acao-idUsuario" type="text" name="idUsuario" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="idAtendimentoLabel" for="usuario-acao-idAtendimento">
                                <Translate contentKey="generadorApp.usuarioAcao.idAtendimento">Id Atendimento</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-acao-idAtendimento" type="string" className="form-control" name="idAtendimento" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="descricaoLabel" for="usuario-acao-descricao">
                                <Translate contentKey="generadorApp.usuarioAcao.descricao">Descricao</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="usuario-acao-descricao" type="textarea" name="descricao" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>
                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" for="usuario-acao-idTela">
                                <Translate contentKey="generadorApp.usuarioAcao.idTela">Id Tela</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="usuario-acao-idTela" type="select" className="form-control" name="idTela">
                                <option value="null" key="0">
                                  {translate('generadorApp.usuarioAcao.idTela.empty')}
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

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" for="usuario-acao-idAcao">
                                <Translate contentKey="generadorApp.usuarioAcao.idAcao">Id Acao</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="usuario-acao-idAcao" type="select" className="form-control" name="idAcao">
                                <option value="null" key="0">
                                  {translate('generadorApp.usuarioAcao.idAcao.empty')}
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
  telas: storeState.tela.entities,
  acaos: storeState.acao.entities,
  usuarioAcaoEntity: storeState.usuarioAcao.entity,
  loading: storeState.usuarioAcao.loading,
  updating: storeState.usuarioAcao.updating,
  updateSuccess: storeState.usuarioAcao.updateSuccess
});

const mapDispatchToProps = {
  getTelas,
  getAcaos,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UsuarioAcaoUpdate);
