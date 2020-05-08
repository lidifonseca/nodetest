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
import {
  ICategoriaUpdateState,
  getEntity,
  getCategoriaState,
  ICategoriaBaseState,
  updateEntity,
  createEntity,
  reset
} from './categoria.reducer';
import { ICategoria } from 'app/shared/model/categoria.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICategoriaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CategoriaUpdate extends React.Component<ICategoriaUpdateProps, ICategoriaUpdateState> {
  constructor(props: Readonly<ICategoriaUpdateProps>) {
    super(props);

    this.state = {
      unidadeEasySelectValue: null,
      fieldsBase: getCategoriaState(this.props.location),
      idsunidade: [],
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
      nextProps.categoriaEntity.unidadeEasy &&
      nextProps.categoriaEntity.unidadeEasy.id
    ) {
      this.setState({
        unidadeEasySelectValue: nextProps.unidadeEasies.map(p =>
          nextProps.categoriaEntity.unidadeEasy.id === p.id ? { value: p.id, label: p.razaoSocial } : null
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
      const { categoriaEntity } = this.props;
      const entity = {
        ...categoriaEntity,
        unidadeEasy: this.state.unidadeEasySelectValue ? this.state.unidadeEasySelectValue['value'] : null,
        ...values,
        unidades: mapIdList(values.unidades)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/categoria?' + this.getFiltersURL());
  };

  render() {
    const { categoriaEntity, unidadeEasies, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...categoriaEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.categoria.home.createOrEditLabel">Create or edit a Categoria</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/categoria?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Categorias</li>
            <li className="breadcrumb-item active">Categorias edit</li>
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
                      <Label className="mt-2" for="categoria-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="categoria-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <CategoriaComponentUpdate baseFilters />

                        <StyleCategoriaComponentUpdate baseFilters />

                        <IconComponentUpdate baseFilters />

                        <PublicarComponentUpdate baseFilters />

                        <OrdemComponentUpdate baseFilters />

                        <PublicarSiteComponentUpdate baseFilters />

                        <CategoriaAtividadeComponentUpdate baseFilter categoriaAtividades />

                        <CategoriaContratoComponentUpdate baseFilter categoriaContratoes />

                        <CidXPtaNovoPadItemIndiComponentUpdate baseFilter cidXPtaNovoPadItemIndis />

                        <EspecialidadeComponentUpdate baseFilter especialidades />

                        <UnidadeComponentUpdate baseFilter unidadeEasies />
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
  categoriaEntity: storeState.categoria.entity,
  loading: storeState.categoria.loading,
  updating: storeState.categoria.updating,
  updateSuccess: storeState.categoria.updateSuccess
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const CategoriaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'categoria' ? (
    <Col md="categoria">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="categoriaLabel" for="categoria-categoria">
              <Translate contentKey="generadorApp.categoria.categoria">Categoria</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="categoria-categoria" type="text" name="categoria" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="categoria" value={this.state.fieldsBase[baseFilters]} />
  );
};

const StyleCategoriaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'styleCategoria' ? (
    <Col md="styleCategoria">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="styleCategoriaLabel" for="categoria-styleCategoria">
              <Translate contentKey="generadorApp.categoria.styleCategoria">Style Categoria</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="categoria-styleCategoria" type="text" name="styleCategoria" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="styleCategoria" value={this.state.fieldsBase[baseFilters]} />
  );
};

const IconComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'icon' ? (
    <Col md="icon">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="iconLabel" for="categoria-icon">
              <Translate contentKey="generadorApp.categoria.icon">Icon</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="categoria-icon" type="text" name="icon" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="icon" value={this.state.fieldsBase[baseFilters]} />
  );
};

const PublicarComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'publicar' ? (
    <Col md="publicar">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="publicarLabel" for="categoria-publicar">
              <Translate contentKey="generadorApp.categoria.publicar">Publicar</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="categoria-publicar" type="string" className="form-control" name="publicar" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="publicar" value={this.state.fieldsBase[baseFilters]} />
  );
};

const OrdemComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ordem' ? (
    <Col md="ordem">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="ordemLabel" for="categoria-ordem">
              <Translate contentKey="generadorApp.categoria.ordem">Ordem</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="categoria-ordem" type="string" className="form-control" name="ordem" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="ordem" value={this.state.fieldsBase[baseFilters]} />
  );
};

const PublicarSiteComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'publicarSite' ? (
    <Col md="publicarSite">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="publicarSiteLabel" for="categoria-publicarSite">
              <Translate contentKey="generadorApp.categoria.publicarSite">Publicar Site</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="categoria-publicarSite" type="string" className="form-control" name="publicarSite" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="publicarSite" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CategoriaAtividadeComponentUpdate = ({ baseFilters, categoriaAtividades }) => {
  return baseFilters !== 'categoriaAtividade' ? (
    <Col md="12"></Col>
  ) : (
    <AvInput type="hidden" name="categoriaAtividade" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CategoriaContratoComponentUpdate = ({ baseFilters, categoriaContratoes }) => {
  return baseFilters !== 'categoriaContrato' ? (
    <Col md="12"></Col>
  ) : (
    <AvInput type="hidden" name="categoriaContrato" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CidXPtaNovoPadItemIndiComponentUpdate = ({ baseFilters, cidXPtaNovoPadItemIndis }) => {
  return baseFilters !== 'cidXPtaNovoPadItemIndi' ? (
    <Col md="12"></Col>
  ) : (
    <AvInput type="hidden" name="cidXPtaNovoPadItemIndi" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EspecialidadeComponentUpdate = ({ baseFilters, especialidades }) => {
  return baseFilters !== 'especialidade' ? (
    <Col md="12"></Col>
  ) : (
    <AvInput type="hidden" name="especialidade" value={this.state.fieldsBase[baseFilters]} />
  );
};

const UnidadeComponentUpdate = ({ baseFilters, unidadeEasies }) => {
  return baseFilters !== 'unidade' ? (
    <Col md="12">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" for="categoria-unidade">
              <Translate contentKey="generadorApp.categoria.unidade">Unidade</Translate>
            </Label>
          </Col>
          <Col md="9">
            <Select
              id="categoria-unidade"
              isMulti
              className={'css-select-control'}
              value={
                unidadeEasies
                  ? unidadeEasies.map(p => (this.state.categoriaEntity.unidade === p.id ? { value: p.id, label: p.razaoSocial } : null))
                  : null
              }
              options={unidadeEasies ? unidadeEasies.map(option => ({ value: option.id, label: option.razaoSocial })) : null}
              onChange={options => this.setState({ unidade: options.map(option => option['value']).join(',') })}
              name={'unidade'}
            />
            <AvInput
              id="categoria-unidade"
              type="select"
              multiple
              className="form-control"
              name="unidades"
              value={categoriaEntity.unidades && categoriaEntity.unidades.map(e => e.id)}
            >
              <option value="null" key="0">
                {translate('generadorApp.categoria.unidade_empty')}
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
    <AvInput type="hidden" name="unidade" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriaUpdate);
