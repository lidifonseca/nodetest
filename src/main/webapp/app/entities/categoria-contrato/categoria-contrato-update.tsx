import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICategoria } from 'app/shared/model/categoria.model';
import { getEntities as getCategorias } from 'app/entities/categoria/categoria.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './categoria-contrato.reducer';
import { ICategoriaContrato } from 'app/shared/model/categoria-contrato.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICategoriaContratoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICategoriaContratoUpdateState {
  isNew: boolean;
  idCategoriaId: string;
}

export class CategoriaContratoUpdate extends React.Component<ICategoriaContratoUpdateProps, ICategoriaContratoUpdateState> {
  constructor(props: Readonly<ICategoriaContratoUpdateProps>) {
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

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { categoriaContratoEntity } = this.props;
      const entity = {
        ...categoriaContratoEntity,
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
    this.props.history.push('/categoria-contrato');
  };

  render() {
    const { categoriaContratoEntity, categorias, loading, updating } = this.props;
    const { isNew } = this.state;

    const { contrato, contratoContentType } = categoriaContratoEntity;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Categoria Contratoes</li>
          <li className="breadcrumb-item active">Categoria Contratoes edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...categoriaContratoEntity,
                  idCategoria: categoriaContratoEntity.idCategoria ? categoriaContratoEntity.idCategoria.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.categoriaContrato.home.createOrEditLabel">
                    Create or edit a CategoriaContrato
                  </Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/categoria-contrato" replace color="info" className="float-right jh-create-entity">
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
                      <Label className="mt-2" for="categoria-contrato-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="categoria-contrato-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="12">
                              <AvGroup>
                                <Row>
                                  <Col md="3">
                                    <Label className="mt-2" id="contratoLabel" for="contrato">
                                      <Translate contentKey="generadorApp.categoriaContrato.contrato">Contrato</Translate>
                                    </Label>
                                  </Col>
                                  <Col md="9">
                                    <br />
                                    {contrato ? (
                                      <div>
                                        <a onClick={openFile(contratoContentType, contrato)}>
                                          <Translate contentKey="entity.action.open">Open</Translate>
                                        </a>
                                        <br />
                                        <Row>
                                          <Col md="11">
                                            <span>
                                              {contratoContentType}, {byteSize(contrato)}
                                            </span>
                                          </Col>
                                          <Col md="1">
                                            <Button color="danger" onClick={this.clearBlob('contrato')}>
                                              <FontAwesomeIcon icon="times-circle" />
                                            </Button>
                                          </Col>
                                        </Row>
                                      </div>
                                    ) : null}
                                    <input id="file_contrato" type="file" onChange={this.onBlobChange(false, 'contrato')} />
                                    <AvInput type="hidden" name="contrato" value={contrato} />
                                  </Col>
                                </Row>
                              </AvGroup>
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ativoLabel" for="categoria-contrato-ativo">
                                <Translate contentKey="generadorApp.categoriaContrato.ativo">Ativo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="categoria-contrato-ativo" type="string" className="form-control" name="ativo" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>
                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" for="categoria-contrato-idCategoria">
                                <Translate contentKey="generadorApp.categoriaContrato.idCategoria">Id Categoria</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="categoria-contrato-idCategoria" type="select" className="form-control" name="idCategoria">
                                <option value="null" key="0">
                                  {translate('generadorApp.categoriaContrato.idCategoria.empty')}
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
  categoriaContratoEntity: storeState.categoriaContrato.entity,
  loading: storeState.categoriaContrato.loading,
  updating: storeState.categoriaContrato.updating,
  updateSuccess: storeState.categoriaContrato.updateSuccess
});

const mapDispatchToProps = {
  getCategorias,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CategoriaContratoUpdate);
