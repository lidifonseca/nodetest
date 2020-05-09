/* eslint complexity: ["error", 300] */
import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICategoria } from 'app/shared/model/categoria.model';
import { getEntities as getCategorias } from 'app/entities/categoria/categoria.reducer';
import {
  ICategoriaContratoUpdateState,
  getEntity,
  getCategoriaContratoState,
  ICategoriaContratoBaseState,
  updateEntity,
  createEntity,
  setBlob,
  reset
} from './categoria-contrato.reducer';
import { ICategoriaContrato } from 'app/shared/model/categoria-contrato.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICategoriaContratoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CategoriaContratoUpdate extends React.Component<ICategoriaContratoUpdateProps, ICategoriaContratoUpdateState> {
  contratoFileInput: React.RefObject<HTMLInputElement>;

  constructor(props: Readonly<ICategoriaContratoUpdateProps>) {
    super(props);

    this.contratoFileInput = React.createRef();

    this.state = {
      categoriaSelectValue: null,
      fieldsBase: getCategoriaContratoState(this.props.location),
      categoriaId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }

    if (
      nextProps.categorias.length > 0 &&
      this.state.categoriaSelectValue === null &&
      nextProps.categoriaContratoEntity.categoria &&
      nextProps.categoriaContratoEntity.categoria.id
    ) {
      this.setState({
        categoriaSelectValue: nextProps.categorias.map(p =>
          nextProps.categoriaContratoEntity.categoria.id === p.id ? { value: p.id, label: p.id } : null
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

    this.props.getCategorias();
  }

  onBlobChange = (isAnImage, name, fileInput) => event => {
    const fileName = fileInput.current.files[0].name;
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType, fileName), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };
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
      const { categoriaContratoEntity } = this.props;
      const entity = {
        ...categoriaContratoEntity,
        categoria: this.state.categoriaSelectValue ? this.state.categoriaSelectValue['value'] : null,
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
    this.props.history.push('/categoria-contrato?' + this.getFiltersURL());
  };

  render() {
    const { categoriaContratoEntity, categorias, loading, updating } = this.props;
    const { isNew } = this.state;

    const { contrato, contratoContentType, contratoBase64 } = categoriaContratoEntity;
    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...categoriaContratoEntity,
                  categoria: categoriaContratoEntity.categoria ? categoriaContratoEntity.categoria.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.categoriaContrato.home.createOrEditLabel">Create or edit a CategoriaContrato</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/categoria-contrato?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Categoria Contratoes</li>
            <li className="breadcrumb-item active">Categoria Contratoes edit</li>
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
                      <Row>
                        {baseFilters !== 'contrato' ? (
                          <Col md="contrato">
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
                                        {contrato || contratoBase64 ? (
                                          <div>
                                            <Row>
                                              <Col md="11"></Col>
                                              <Col md="1">
                                                <Button color="danger" onClick={this.clearBlob('contrato')}>
                                                  <FontAwesomeIcon icon="times-circle" />
                                                </Button>
                                              </Col>
                                            </Row>
                                            <a rel="noopener noreferrer" target={'_blank'} href={`${contrato}`}>
                                              <Translate contentKey="entity.action.open">Open</Translate>
                                            </a>
                                            <br />
                                          </div>
                                        ) : null}
                                        <input
                                          id="file_contrato"
                                          type="file"
                                          ref={this.contratoFileInput}
                                          onChange={this.onBlobChange(false, 'contrato', this.contratoFileInput)}
                                        />
                                        <AvInput type="hidden" name="contrato" value={contrato} />
                                      </Col>
                                    </Row>
                                  </AvGroup>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="contrato" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ativo' ? (
                          <Col md="ativo">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="ativoLabel" check>
                                    <AvInput id="categoria-contrato-ativo" type="checkbox" className="form-control" name="ativo" />
                                    <Translate contentKey="generadorApp.categoriaContrato.ativo">Ativo</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'categoria' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="categoria-contrato-categoria">
                                    <Translate contentKey="generadorApp.categoriaContrato.categoria">Categoria</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="categoria-contrato-categoria"
                                    className={'css-select-control'}
                                    value={this.state.categoriaSelectValue}
                                    options={categorias ? categorias.map(option => ({ value: option.id, label: option.id })) : null}
                                    onChange={options => this.setState({ categoriaSelectValue: options })}
                                    name={'categoria'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="categoria" value={this.state.fieldsBase[baseFilters]} />
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
