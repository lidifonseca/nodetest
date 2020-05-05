import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { getEntities as getUnidadeEasies } from 'app/entities/unidade-easy/unidade-easy.reducer';
import { ICategoria } from 'app/shared/model/categoria.model';
import { getEntities as getCategorias } from 'app/entities/categoria/categoria.reducer';
import { ITipoEspecialidade } from 'app/shared/model/tipo-especialidade.model';
import { getEntities as getTipoEspecialidades } from 'app/entities/tipo-especialidade/tipo-especialidade.reducer';
import { ITipoUnidade } from 'app/shared/model/tipo-unidade.model';
import { getEntities as getTipoUnidades } from 'app/entities/tipo-unidade/tipo-unidade.reducer';
import {
  getEntity,
  getEspecialidadeState,
  IEspecialidadeBaseState,
  updateEntity,
  createEntity,
  setBlob,
  reset
} from './especialidade.reducer';
import { IEspecialidade } from 'app/shared/model/especialidade.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEspecialidadeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEspecialidadeUpdateState {
  fieldsBase: IEspecialidadeBaseState;
  isNew: boolean;
  unidadeId: string;
  idCategoriaId: string;
  idTipoEspecialidadeId: string;
  idTipoUnidadeId: string;
}

export class EspecialidadeUpdate extends React.Component<IEspecialidadeUpdateProps, IEspecialidadeUpdateState> {
  constructor(props: Readonly<IEspecialidadeUpdateProps>) {
    super(props);
    this.state = {
      fieldsBase: getEspecialidadeState(this.props.location),
      unidadeId: '0',
      idCategoriaId: '0',
      idTipoEspecialidadeId: '0',
      idTipoUnidadeId: '0',
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

    this.props.getUnidadeEasies();
    this.props.getCategorias();
    this.props.getTipoEspecialidades();
    this.props.getTipoUnidades();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { especialidadeEntity } = this.props;
      const entity = {
        ...especialidadeEntity,
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
    this.props.history.push('/especialidade');
  };

  render() {
    const { especialidadeEntity, unidadeEasies, categorias, tipoEspecialidades, tipoUnidades, loading, updating } = this.props;
    const { isNew } = this.state;

    const { descricao } = especialidadeEntity;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Especialidades</li>
          <li className="breadcrumb-item active">Especialidades edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...especialidadeEntity,
                  unidade: especialidadeEntity.unidade ? especialidadeEntity.unidade.id : null,
                  idCategoria: especialidadeEntity.idCategoria ? especialidadeEntity.idCategoria.id : null,
                  idTipoEspecialidade: especialidadeEntity.idTipoEspecialidade ? especialidadeEntity.idTipoEspecialidade.id : null,
                  idTipoUnidade: especialidadeEntity.idTipoUnidade ? especialidadeEntity.idTipoUnidade.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.especialidade.home.createOrEditLabel">Create or edit a Especialidade</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/especialidade" replace color="info" className="float-right jh-create-entity">
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
                      <Label className="mt-2" for="especialidade-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="especialidade-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {!this.state.fieldsBase.icon ? (
                          <Col md="icon">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="iconLabel" for="especialidade-icon">
                                    <Translate contentKey="generadorApp.especialidade.icon">Icon</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="especialidade-icon" type="text" name="icon" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="icon" value={this.state.fieldsBase.icon} />
                        )}

                        {!this.state.fieldsBase.especialidade ? (
                          <Col md="especialidade">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="especialidadeLabel" for="especialidade-especialidade">
                                    <Translate contentKey="generadorApp.especialidade.especialidade">Especialidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="especialidade-especialidade" type="text" name="especialidade" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="especialidade" value={this.state.fieldsBase.especialidade} />
                        )}

                        {!this.state.fieldsBase.descricao ? (
                          <Col md="descricao">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="descricaoLabel" for="especialidade-descricao">
                                    <Translate contentKey="generadorApp.especialidade.descricao">Descricao</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="especialidade-descricao" type="textarea" name="descricao" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="descricao" value={this.state.fieldsBase.descricao} />
                        )}

                        {!this.state.fieldsBase.duracao ? (
                          <Col md="duracao">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="duracaoLabel" for="especialidade-duracao">
                                    <Translate contentKey="generadorApp.especialidade.duracao">Duracao</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="especialidade-duracao" type="string" className="form-control" name="duracao" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="duracao" value={this.state.fieldsBase.duracao} />
                        )}

                        {!this.state.fieldsBase.importante ? (
                          <Col md="importante">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="importanteLabel" for="especialidade-importante">
                                    <Translate contentKey="generadorApp.especialidade.importante">Importante</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="especialidade-importante" type="text" name="importante" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="importante" value={this.state.fieldsBase.importante} />
                        )}

                        {!this.state.fieldsBase.ativo ? (
                          <Col md="ativo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="ativoLabel" for="especialidade-ativo">
                                    <Translate contentKey="generadorApp.especialidade.ativo">Ativo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="especialidade-ativo" type="string" className="form-control" name="ativo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ativo" value={this.state.fieldsBase.ativo} />
                        )}
                        {!this.state.fieldsBase.atendimento ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="atendimento" value={this.state.fieldsBase.atendimento} />
                        )}
                        {!this.state.fieldsBase.especialidadeOperadora ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="especialidadeOperadora" value={this.state.fieldsBase.especialidadeOperadora} />
                        )}
                        {!this.state.fieldsBase.especialidadeUnidade ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="especialidadeUnidade" value={this.state.fieldsBase.especialidadeUnidade} />
                        )}
                        {!this.state.fieldsBase.especialidadeValor ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="especialidadeValor" value={this.state.fieldsBase.especialidadeValor} />
                        )}
                        {!this.state.fieldsBase.pacientePedido ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="pacientePedido" value={this.state.fieldsBase.pacientePedido} />
                        )}
                        {!this.state.fieldsBase.padItem ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="padItem" value={this.state.fieldsBase.padItem} />
                        )}
                        {!this.state.fieldsBase.unidade ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="especialidade-unidade">
                                    <Translate contentKey="generadorApp.especialidade.unidade">Unidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="especialidade-unidade" type="select" className="form-control" name="unidade">
                                    <option value="null" key="0">
                                      {translate('generadorApp.especialidade.unidade.empty')}
                                    </option>
                                    {unidadeEasies
                                      ? unidadeEasies.map(otherEntity => (
                                          <option value={otherEntity.id} key={otherEntity.id}>
                                            {otherEntity.razaoSocial}
                                          </option>
                                        ))
                                      : null}
                                  </AvInput>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="unidade" value={this.state.fieldsBase.unidade} />
                        )}
                        {!this.state.fieldsBase.idCategoria ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="especialidade-idCategoria">
                                    <Translate contentKey="generadorApp.especialidade.idCategoria">Id Categoria</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="especialidade-idCategoria" type="select" className="form-control" name="idCategoria">
                                    <option value="null" key="0">
                                      {translate('generadorApp.especialidade.idCategoria.empty')}
                                    </option>
                                    {categorias
                                      ? categorias.map(otherEntity => (
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
                          <AvInput type="hidden" name="idCategoria" value={this.state.fieldsBase.idCategoria} />
                        )}
                        {!this.state.fieldsBase.idTipoEspecialidade ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="especialidade-idTipoEspecialidade">
                                    <Translate contentKey="generadorApp.especialidade.idTipoEspecialidade">Id Tipo Especialidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput
                                    id="especialidade-idTipoEspecialidade"
                                    type="select"
                                    className="form-control"
                                    name="idTipoEspecialidade"
                                  >
                                    <option value="null" key="0">
                                      {translate('generadorApp.especialidade.idTipoEspecialidade.empty')}
                                    </option>
                                    {tipoEspecialidades
                                      ? tipoEspecialidades.map(otherEntity => (
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
                          <AvInput type="hidden" name="idTipoEspecialidade" value={this.state.fieldsBase.idTipoEspecialidade} />
                        )}
                        {!this.state.fieldsBase.idTipoUnidade ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="especialidade-idTipoUnidade">
                                    <Translate contentKey="generadorApp.especialidade.idTipoUnidade">Id Tipo Unidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="especialidade-idTipoUnidade" type="select" className="form-control" name="idTipoUnidade">
                                    <option value="null" key="0">
                                      {translate('generadorApp.especialidade.idTipoUnidade.empty')}
                                    </option>
                                    {tipoUnidades
                                      ? tipoUnidades.map(otherEntity => (
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
                          <AvInput type="hidden" name="idTipoUnidade" value={this.state.fieldsBase.idTipoUnidade} />
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
  unidadeEasies: storeState.unidadeEasy.entities,
  categorias: storeState.categoria.entities,
  tipoEspecialidades: storeState.tipoEspecialidade.entities,
  tipoUnidades: storeState.tipoUnidade.entities,
  especialidadeEntity: storeState.especialidade.entity,
  loading: storeState.especialidade.loading,
  updating: storeState.especialidade.updating,
  updateSuccess: storeState.especialidade.updateSuccess
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getCategorias,
  getTipoEspecialidades,
  getTipoUnidades,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EspecialidadeUpdate);
