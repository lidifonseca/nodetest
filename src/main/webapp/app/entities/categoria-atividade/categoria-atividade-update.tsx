import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICategoria } from 'app/shared/model/categoria.model';
import { getEntities as getCategorias } from 'app/entities/categoria/categoria.reducer';
import { getEntity, updateEntity, createEntity, reset } from './categoria-atividade.reducer';
import { ICategoriaAtividade } from 'app/shared/model/categoria-atividade.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICategoriaAtividadeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICategoriaAtividadeUpdateState {
  isNew: boolean;
  idCategoriaId: string;
}

export class CategoriaAtividadeUpdate extends React.Component<ICategoriaAtividadeUpdateProps, ICategoriaAtividadeUpdateState> {
  constructor(props: Readonly<ICategoriaAtividadeUpdateProps>) {
    super(props);
    this.state = {
      idCategoriaId: '0',
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

    this.props.getCategorias();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    values.dataPost = convertDateTimeToServer(values.dataPost);

    if (errors.length === 0) {
      const { categoriaAtividadeEntity } = this.props;
      const entity = {
        ...categoriaAtividadeEntity,
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
    this.props.history.push('/categoria-atividade');
  };

  render() {
    const { categoriaAtividadeEntity, categorias, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Categoria Atividades</li>
          <li className="breadcrumb-item active">Categoria Atividades edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...categoriaAtividadeEntity,
                  idCategoria: categoriaAtividadeEntity.idCategoria ? categoriaAtividadeEntity.idCategoria.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.categoriaAtividade.home.createOrEditLabel">
                    Create or edit a CategoriaAtividade
                  </Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/categoria-atividade" replace color="info" className="float-right jh-create-entity">
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
                      <Label className="mt-2" for="categoria-atividade-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="categoria-atividade-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="atividadeLabel" for="categoria-atividade-atividade">
                                <Translate contentKey="generadorApp.categoriaAtividade.atividade">Atividade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="categoria-atividade-atividade"
                                type="text"
                                name="atividade"
                                validate={{
                                  maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
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
                              <Label className="mt-2" id="dataPostLabel" for="categoria-atividade-dataPost">
                                <Translate contentKey="generadorApp.categoriaAtividade.dataPost">Data Post</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="categoria-atividade-dataPost"
                                type="datetime-local"
                                className="form-control"
                                name="dataPost"
                                placeholder={'YYYY-MM-DD HH:mm'}
                                value={isNew ? null : convertDateTimeFromServer(this.props.categoriaAtividadeEntity.dataPost)}
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') }
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
                              <Label className="mt-2" id="idUnidadeLabel" for="categoria-atividade-idUnidade">
                                <Translate contentKey="generadorApp.categoriaAtividade.idUnidade">Id Unidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="categoria-atividade-idUnidade" type="string" className="form-control" name="idUnidade" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>
                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" for="categoria-atividade-idCategoria">
                                <Translate contentKey="generadorApp.categoriaAtividade.idCategoria">Id Categoria</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="categoria-atividade-idCategoria" type="select" className="form-control" name="idCategoria">
                                <option value="null" key="0">
                                  {translate('generadorApp.categoriaAtividade.idCategoria.empty')}
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
  categorias: storeState.categoria.entities,
  categoriaAtividadeEntity: storeState.categoriaAtividade.entity,
  loading: storeState.categoriaAtividade.loading,
  updating: storeState.categoriaAtividade.updating,
  updateSuccess: storeState.categoriaAtividade.updateSuccess
});

const mapDispatchToProps = {
  getCategorias,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CategoriaAtividadeUpdate);
