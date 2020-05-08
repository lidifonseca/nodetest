/* eslint complexity: ["error", 300] */
import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { getEntities as getUnidadeEasies } from 'app/entities/unidade-easy/unidade-easy.reducer';
import { ICategoria } from 'app/shared/model/categoria.model';
import { getEntities as getCategorias } from 'app/entities/categoria/categoria.reducer';
import {
  ICategoriaAtividadeUpdateState,
  getEntity,
  getCategoriaAtividadeState,
  ICategoriaAtividadeBaseState,
  updateEntity,
  createEntity,
  reset
} from './categoria-atividade.reducer';
import { ICategoriaAtividade } from 'app/shared/model/categoria-atividade.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICategoriaAtividadeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CategoriaAtividadeUpdate extends React.Component<ICategoriaAtividadeUpdateProps, ICategoriaAtividadeUpdateState> {
  constructor(props: Readonly<ICategoriaAtividadeUpdateProps>) {
    super(props);

    this.state = {
      unidadeEasySelectValue: null,
      categoriaSelectValue: null,
      fieldsBase: getCategoriaAtividadeState(this.props.location),
      unidadeId: '0',
      categoriaId: '0',
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
      nextProps.categoriaAtividadeEntity.unidadeEasy &&
      nextProps.categoriaAtividadeEntity.unidadeEasy.id
    ) {
      this.setState({
        unidadeEasySelectValue: nextProps.unidadeEasies.map(p =>
          nextProps.categoriaAtividadeEntity.unidadeEasy.id === p.id ? { value: p.id, label: p.razaoSocial } : null
        )
      });
    }

    if (
      nextProps.categorias.length > 0 &&
      this.state.categoriaSelectValue === null &&
      nextProps.categoriaAtividadeEntity.categoria &&
      nextProps.categoriaAtividadeEntity.categoria.id
    ) {
      this.setState({
        categoriaSelectValue: nextProps.categorias.map(p =>
          nextProps.categoriaAtividadeEntity.categoria.id === p.id ? { value: p.id, label: p.id } : null
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
  }

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
      const { categoriaAtividadeEntity } = this.props;
      const entity = {
        ...categoriaAtividadeEntity,
        unidadeEasy: this.state.unidadeEasySelectValue ? this.state.unidadeEasySelectValue['value'] : null,
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
    this.props.history.push('/categoria-atividade?' + this.getFiltersURL());
  };

  render() {
    const { categoriaAtividadeEntity, unidadeEasies, categorias, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...categoriaAtividadeEntity,
                  unidade: categoriaAtividadeEntity.unidade ? categoriaAtividadeEntity.unidade.id : null,
                  categoria: categoriaAtividadeEntity.categoria ? categoriaAtividadeEntity.categoria.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.categoriaAtividade.home.createOrEditLabel">Create or edit a CategoriaAtividade</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/categoria-atividade?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Categoria Atividades</li>
            <li className="breadcrumb-item active">Categoria Atividades edit</li>
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
                      <Row>
                        {baseFilters !== 'atividade' ? (
                          <Col md="atividade">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="atividadeLabel" for="categoria-atividade-atividade">
                                    <Translate contentKey="generadorApp.categoriaAtividade.atividade">Atividade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="categoria-atividade-atividade" type="text" name="atividade" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="atividade" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'atendimentoAtividades' ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="atendimentoAtividades" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'padItemAtividade' ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="padItemAtividade" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'unidade' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="categoria-atividade-unidade">
                                    <Translate contentKey="generadorApp.categoriaAtividade.unidade">Unidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="categoria-atividade-unidade"
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
                                  <Label className="mt-2" for="categoria-atividade-categoria">
                                    <Translate contentKey="generadorApp.categoriaAtividade.categoria">Categoria</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="categoria-atividade-categoria"
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
  unidadeEasies: storeState.unidadeEasy.entities,
  categorias: storeState.categoria.entities,
  categoriaAtividadeEntity: storeState.categoriaAtividade.entity,
  loading: storeState.categoriaAtividade.loading,
  updating: storeState.categoriaAtividade.updating,
  updateSuccess: storeState.categoriaAtividade.updateSuccess
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getCategorias,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CategoriaAtividadeUpdate);
