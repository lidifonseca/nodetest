/* eslint complexity: ["error", 300] */
import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, ICrudPutAction } from 'react-jhipster';
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
  IEspecialidadeUpdateState,
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

export class EspecialidadeUpdate extends React.Component<IEspecialidadeUpdateProps, IEspecialidadeUpdateState> {
  descricaoFileInput: React.RefObject<HTMLInputElement>;

  constructor(props: Readonly<IEspecialidadeUpdateProps>) {
    super(props);

    this.descricaoFileInput = React.createRef();

    this.state = {
      unidadeEasySelectValue: null,
      categoriaSelectValue: null,
      tipoEspecialidadeSelectValue: null,
      tipoUnidadeSelectValue: null,
      fieldsBase: getEspecialidadeState(this.props.location),
      unidadeId: '0',
      categoriaId: '0',
      tipoEspecialidadeId: '0',
      tipoUnidadeId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }

    if (
      nextProps.unidadeEasies.length > 0 &&
      this.state.unidadeEasySelectValue === null &&
      nextProps.especialidadeEntity.unidadeEasy &&
      nextProps.especialidadeEntity.unidadeEasy.id
    ) {
      this.setState({
        unidadeEasySelectValue: nextProps.unidadeEasies.map(p =>
          nextProps.especialidadeEntity.unidadeEasy.id === p.id ? { value: p.id, label: p.razaoSocial } : null
        )
      });
    }

    if (
      nextProps.categorias.length > 0 &&
      this.state.categoriaSelectValue === null &&
      nextProps.especialidadeEntity.categoria &&
      nextProps.especialidadeEntity.categoria.id
    ) {
      this.setState({
        categoriaSelectValue: nextProps.categorias.map(p =>
          nextProps.especialidadeEntity.categoria.id === p.id ? { value: p.id, label: p.id } : null
        )
      });
    }

    if (
      nextProps.tipoEspecialidades.length > 0 &&
      this.state.tipoEspecialidadeSelectValue === null &&
      nextProps.especialidadeEntity.tipoEspecialidade &&
      nextProps.especialidadeEntity.tipoEspecialidade.id
    ) {
      this.setState({
        tipoEspecialidadeSelectValue: nextProps.tipoEspecialidades.map(p =>
          nextProps.especialidadeEntity.tipoEspecialidade.id === p.id ? { value: p.id, label: p.id } : null
        )
      });
    }

    if (
      nextProps.tipoUnidades.length > 0 &&
      this.state.tipoUnidadeSelectValue === null &&
      nextProps.especialidadeEntity.tipoUnidade &&
      nextProps.especialidadeEntity.tipoUnidade.id
    ) {
      this.setState({
        tipoUnidadeSelectValue: nextProps.tipoUnidades.map(p =>
          nextProps.especialidadeEntity.tipoUnidade.id === p.id ? { value: p.id, label: p.id } : null
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

    this.props.getUnidadeEasies();
    this.props.getCategorias();
    this.props.getTipoEspecialidades();
    this.props.getTipoUnidades();
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
      const { especialidadeEntity } = this.props;
      const entity = {
        ...especialidadeEntity,
        unidadeEasy: this.state.unidadeEasySelectValue ? this.state.unidadeEasySelectValue['value'] : null,
        categoria: this.state.categoriaSelectValue ? this.state.categoriaSelectValue['value'] : null,
        tipoEspecialidade: this.state.tipoEspecialidadeSelectValue ? this.state.tipoEspecialidadeSelectValue['value'] : null,
        tipoUnidade: this.state.tipoUnidadeSelectValue ? this.state.tipoUnidadeSelectValue['value'] : null,
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
    this.props.history.push('/especialidade?' + this.getFiltersURL());
  };

  render() {
    const { especialidadeEntity, unidadeEasies, categorias, tipoEspecialidades, tipoUnidades, loading, updating } = this.props;
    const { isNew } = this.state;

    const { descricao } = especialidadeEntity;
    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...especialidadeEntity,
                  unidade: especialidadeEntity.unidade ? especialidadeEntity.unidade.id : null,
                  categoria: especialidadeEntity.categoria ? especialidadeEntity.categoria.id : null,
                  tipoEspecialidade: especialidadeEntity.tipoEspecialidade ? especialidadeEntity.tipoEspecialidade.id : null,
                  tipoUnidade: especialidadeEntity.tipoUnidade ? especialidadeEntity.tipoUnidade.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.especialidade.home.createOrEditLabel">Create or edit a Especialidade</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/especialidade?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Especialidades</li>
            <li className="breadcrumb-item active">Especialidades edit</li>
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
                        {baseFilters !== 'icon' ? (
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
                          <AvInput type="hidden" name="icon" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'especialidade' ? (
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
                          <AvInput type="hidden" name="especialidade" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'descricao' ? (
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
                          <AvInput type="hidden" name="descricao" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'duracao' ? (
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
                          <AvInput type="hidden" name="duracao" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'importante' ? (
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
                          <AvInput type="hidden" name="importante" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ativo' ? (
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
                          <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'atendimento' ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="atendimento" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'especialidadeOperadora' ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="especialidadeOperadora" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'especialidadeUnidade' ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="especialidadeUnidade" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'especialidadeValor' ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="especialidadeValor" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'pacientePedido' ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="pacientePedido" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'padItem' ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="padItem" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'unidade' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="especialidade-unidade">
                                    <Translate contentKey="generadorApp.especialidade.unidade">Unidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="especialidade-unidade"
                                    className={'css-select-control'}
                                    value={this.state.unidadeEasySelectValue}
                                    options={
                                      unidadeEasies ? unidadeEasies.map(option => ({ value: option.id, label: option.razaoSocial })) : null
                                    }
                                    onChange={options => this.setState({ unidadeEasySelectValue: options })}
                                    name={'unidade'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="unidade" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'categoria' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="especialidade-categoria">
                                    <Translate contentKey="generadorApp.especialidade.categoria">Categoria</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="especialidade-categoria"
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
                        {baseFilters !== 'tipoEspecialidade' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="especialidade-tipoEspecialidade">
                                    <Translate contentKey="generadorApp.especialidade.tipoEspecialidade">Tipo Especialidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="especialidade-tipoEspecialidade"
                                    className={'css-select-control'}
                                    value={this.state.tipoEspecialidadeSelectValue}
                                    options={
                                      tipoEspecialidades ? tipoEspecialidades.map(option => ({ value: option.id, label: option.id })) : null
                                    }
                                    onChange={options => this.setState({ tipoEspecialidadeSelectValue: options })}
                                    name={'tipoEspecialidade'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="tipoEspecialidade" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'tipoUnidade' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="especialidade-tipoUnidade">
                                    <Translate contentKey="generadorApp.especialidade.tipoUnidade">Tipo Unidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="especialidade-tipoUnidade"
                                    className={'css-select-control'}
                                    value={this.state.tipoUnidadeSelectValue}
                                    options={tipoUnidades ? tipoUnidades.map(option => ({ value: option.id, label: option.id })) : null}
                                    onChange={options => this.setState({ tipoUnidadeSelectValue: options })}
                                    name={'tipoUnidade'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="tipoUnidade" value={this.state.fieldsBase[baseFilters]} />
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
