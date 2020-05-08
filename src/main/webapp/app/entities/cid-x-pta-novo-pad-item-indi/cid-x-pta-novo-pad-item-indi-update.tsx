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

import { IPadItemIndicadores } from 'app/shared/model/pad-item-indicadores.model';
import { getEntities as getPadItemIndicadores } from 'app/entities/pad-item-indicadores/pad-item-indicadores.reducer';
import { ICategoria } from 'app/shared/model/categoria.model';
import { getEntities as getCategorias } from 'app/entities/categoria/categoria.reducer';
import { ICidXPtaNovo } from 'app/shared/model/cid-x-pta-novo.model';
import { getEntities as getCidXPtaNovos } from 'app/entities/cid-x-pta-novo/cid-x-pta-novo.reducer';
import {
  ICidXPtaNovoPadItemIndiUpdateState,
  getEntity,
  getCidXPtaNovoPadItemIndiState,
  ICidXPtaNovoPadItemIndiBaseState,
  updateEntity,
  createEntity,
  reset
} from './cid-x-pta-novo-pad-item-indi.reducer';
import { ICidXPtaNovoPadItemIndi } from 'app/shared/model/cid-x-pta-novo-pad-item-indi.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICidXPtaNovoPadItemIndiUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CidXPtaNovoPadItemIndiUpdate extends React.Component<ICidXPtaNovoPadItemIndiUpdateProps, ICidXPtaNovoPadItemIndiUpdateState> {
  constructor(props: Readonly<ICidXPtaNovoPadItemIndiUpdateProps>) {
    super(props);

    this.state = {
      padItemIndicadoresSelectValue: null,
      categoriaSelectValue: null,
      cidXPtaNovoSelectValue: null,
      fieldsBase: getCidXPtaNovoPadItemIndiState(this.props.location),
      padItemIndicadoresId: '0',
      categoriasId: '0',
      cidXPtaNovoId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }

    if (
      nextProps.padItemIndicadores.length > 0 &&
      this.state.padItemIndicadoresSelectValue === null &&
      nextProps.cidXPtaNovoPadItemIndiEntity.padItemIndicadores &&
      nextProps.cidXPtaNovoPadItemIndiEntity.padItemIndicadores.id
    ) {
      this.setState({
        padItemIndicadoresSelectValue: nextProps.padItemIndicadores.map(p =>
          nextProps.cidXPtaNovoPadItemIndiEntity.padItemIndicadores.id === p.id ? { value: p.id, label: p.id } : null
        )
      });
    }

    if (
      nextProps.categorias.length > 0 &&
      this.state.categoriaSelectValue === null &&
      nextProps.cidXPtaNovoPadItemIndiEntity.categoria &&
      nextProps.cidXPtaNovoPadItemIndiEntity.categoria.id
    ) {
      this.setState({
        categoriaSelectValue: nextProps.categorias.map(p =>
          nextProps.cidXPtaNovoPadItemIndiEntity.categoria.id === p.id ? { value: p.id, label: p.id } : null
        )
      });
    }

    if (
      nextProps.cidXPtaNovos.length > 0 &&
      this.state.cidXPtaNovoSelectValue === null &&
      nextProps.cidXPtaNovoPadItemIndiEntity.cidXPtaNovo &&
      nextProps.cidXPtaNovoPadItemIndiEntity.cidXPtaNovo.id
    ) {
      this.setState({
        cidXPtaNovoSelectValue: nextProps.cidXPtaNovos.map(p =>
          nextProps.cidXPtaNovoPadItemIndiEntity.cidXPtaNovo.id === p.id ? { value: p.id, label: p.id } : null
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

    this.props.getPadItemIndicadores();
    this.props.getCategorias();
    this.props.getCidXPtaNovos();
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
      const { cidXPtaNovoPadItemIndiEntity } = this.props;
      const entity = {
        ...cidXPtaNovoPadItemIndiEntity,
        padItemIndicadores: this.state.padItemIndicadoresSelectValue ? this.state.padItemIndicadoresSelectValue['value'] : null,
        categoria: this.state.categoriaSelectValue ? this.state.categoriaSelectValue['value'] : null,
        cidXPtaNovo: this.state.cidXPtaNovoSelectValue ? this.state.cidXPtaNovoSelectValue['value'] : null,
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
    this.props.history.push('/cid-x-pta-novo-pad-item-indi?' + this.getFiltersURL());
  };

  render() {
    const { cidXPtaNovoPadItemIndiEntity, padItemIndicadores, categorias, cidXPtaNovos, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...cidXPtaNovoPadItemIndiEntity,
                  padItemIndicadores: cidXPtaNovoPadItemIndiEntity.padItemIndicadores
                    ? cidXPtaNovoPadItemIndiEntity.padItemIndicadores.id
                    : null,
                  categorias: cidXPtaNovoPadItemIndiEntity.categorias ? cidXPtaNovoPadItemIndiEntity.categorias.id : null,
                  cidXPtaNovo: cidXPtaNovoPadItemIndiEntity.cidXPtaNovo ? cidXPtaNovoPadItemIndiEntity.cidXPtaNovo.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.home.createOrEditLabel">
                Create or edit a CidXPtaNovoPadItemIndi
              </Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/cid-x-pta-novo-pad-item-indi?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Cid X Pta Novo Pad Item Indis</li>
            <li className="breadcrumb-item active">Cid X Pta Novo Pad Item Indis edit</li>
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
                      <Label className="mt-2" for="cid-x-pta-novo-pad-item-indi-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput
                                id="cid-x-pta-novo-pad-item-indi-id"
                                type="hidden"
                                className="form-control"
                                name="id"
                                required
                                readOnly
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <MetaComponentUpdate baseFilters />

                        <MaximoComponentUpdate baseFilters />

                        <MinimoComponentUpdate baseFilters />

                        <UnidadeMedidaExtraComponentUpdate baseFilters />

                        <UnidadeMedidaIdComponentUpdate baseFilters />

                        <ScoreComponentUpdate baseFilters />

                        <AlertasIndicadoresComponentUpdate baseFilter alertasIndicadores />

                        <PadItemIndicadoresComponentUpdate baseFilter padItemIndicadores />

                        <CategoriasComponentUpdate baseFilter categorias />

                        <CidXPtaNovoComponentUpdate baseFilter cidXPtaNovos />
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
  padItemIndicadores: storeState.padItemIndicadores.entities,
  categorias: storeState.categoria.entities,
  cidXPtaNovos: storeState.cidXPtaNovo.entities,
  cidXPtaNovoPadItemIndiEntity: storeState.cidXPtaNovoPadItemIndi.entity,
  loading: storeState.cidXPtaNovoPadItemIndi.loading,
  updating: storeState.cidXPtaNovoPadItemIndi.updating,
  updateSuccess: storeState.cidXPtaNovoPadItemIndi.updateSuccess
});

const mapDispatchToProps = {
  getPadItemIndicadores,
  getCategorias,
  getCidXPtaNovos,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const MetaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'meta' ? (
    <Col md="meta">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="metaLabel" for="cid-x-pta-novo-pad-item-indi-meta">
              <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.meta">Meta</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="cid-x-pta-novo-pad-item-indi-meta" type="text" name="meta" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="meta" value={this.state.fieldsBase[baseFilters]} />
  );
};

const MaximoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'maximo' ? (
    <Col md="maximo">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="maximoLabel" for="cid-x-pta-novo-pad-item-indi-maximo">
              <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.maximo">Maximo</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="cid-x-pta-novo-pad-item-indi-maximo" type="text" name="maximo" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="maximo" value={this.state.fieldsBase[baseFilters]} />
  );
};

const MinimoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'minimo' ? (
    <Col md="minimo">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="minimoLabel" for="cid-x-pta-novo-pad-item-indi-minimo">
              <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.minimo">Minimo</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="cid-x-pta-novo-pad-item-indi-minimo" type="text" name="minimo" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="minimo" value={this.state.fieldsBase[baseFilters]} />
  );
};

const UnidadeMedidaExtraComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'unidadeMedidaExtra' ? (
    <Col md="unidadeMedidaExtra">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="unidadeMedidaExtraLabel" for="cid-x-pta-novo-pad-item-indi-unidadeMedidaExtra">
              <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.unidadeMedidaExtra">Unidade Medida Extra</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="cid-x-pta-novo-pad-item-indi-unidadeMedidaExtra" type="text" name="unidadeMedidaExtra" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="unidadeMedidaExtra" value={this.state.fieldsBase[baseFilters]} />
  );
};

const UnidadeMedidaIdComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'unidadeMedidaId' ? (
    <Col md="unidadeMedidaId">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="unidadeMedidaIdLabel" for="cid-x-pta-novo-pad-item-indi-unidadeMedidaId">
              <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.unidadeMedidaId">Unidade Medida Id</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="cid-x-pta-novo-pad-item-indi-unidadeMedidaId" type="string" className="form-control" name="unidadeMedidaId" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="unidadeMedidaId" value={this.state.fieldsBase[baseFilters]} />
  );
};

const ScoreComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'score' ? (
    <Col md="score">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="scoreLabel" for="cid-x-pta-novo-pad-item-indi-score">
              <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.score">Score</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="cid-x-pta-novo-pad-item-indi-score" type="string" className="form-control" name="score" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="score" value={this.state.fieldsBase[baseFilters]} />
  );
};

const AlertasIndicadoresComponentUpdate = ({ baseFilters, alertasIndicadores }) => {
  return baseFilters !== 'alertasIndicadores' ? (
    <Col md="12"></Col>
  ) : (
    <AvInput type="hidden" name="alertasIndicadores" value={this.state.fieldsBase[baseFilters]} />
  );
};

const PadItemIndicadoresComponentUpdate = ({ baseFilters, padItemIndicadores }) => {
  return baseFilters !== 'padItemIndicadores' ? (
    <Col md="12">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" for="cid-x-pta-novo-pad-item-indi-padItemIndicadores">
              <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.padItemIndicadores">Pad Item Indicadores</Translate>
            </Label>
          </Col>
          <Col md="9">
            <Select
              id="cid-x-pta-novo-pad-item-indi-padItemIndicadores"
              className={'css-select-control'}
              value={this.state.padItemIndicadoresSelectValue}
              options={padItemIndicadores ? padItemIndicadores.map(option => ({ value: option.id, label: option.id })) : null}
              onChange={options => this.setState({ padItemIndicadoresSelectValue: options })}
              name={'padItemIndicadores'}
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="padItemIndicadores" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CategoriasComponentUpdate = ({ baseFilters, categorias }) => {
  return baseFilters !== 'categorias' ? (
    <Col md="12">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" for="cid-x-pta-novo-pad-item-indi-categorias">
              <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.categorias">Categorias</Translate>
            </Label>
          </Col>
          <Col md="9">
            <Select
              id="cid-x-pta-novo-pad-item-indi-categorias"
              className={'css-select-control'}
              value={this.state.categoriaSelectValue}
              options={categorias ? categorias.map(option => ({ value: option.id, label: option.id })) : null}
              onChange={options => this.setState({ categoriaSelectValue: options })}
              name={'categorias'}
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="categorias" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CidXPtaNovoComponentUpdate = ({ baseFilters, cidXPtaNovos }) => {
  return baseFilters !== 'cidXPtaNovo' ? (
    <Col md="12">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" for="cid-x-pta-novo-pad-item-indi-cidXPtaNovo">
              <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.cidXPtaNovo">Cid X Pta Novo</Translate>
            </Label>
          </Col>
          <Col md="9">
            <Select
              id="cid-x-pta-novo-pad-item-indi-cidXPtaNovo"
              className={'css-select-control'}
              value={this.state.cidXPtaNovoSelectValue}
              options={cidXPtaNovos ? cidXPtaNovos.map(option => ({ value: option.id, label: option.id })) : null}
              onChange={options => this.setState({ cidXPtaNovoSelectValue: options })}
              name={'cidXPtaNovo'}
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="cidXPtaNovo" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CidXPtaNovoPadItemIndiUpdate);
