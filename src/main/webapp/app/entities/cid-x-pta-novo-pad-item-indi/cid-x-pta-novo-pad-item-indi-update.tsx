import React from 'react';
import { connect } from 'react-redux';
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
import { getEntity, updateEntity, createEntity, reset } from './cid-x-pta-novo-pad-item-indi.reducer';
import { ICidXPtaNovoPadItemIndi } from 'app/shared/model/cid-x-pta-novo-pad-item-indi.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICidXPtaNovoPadItemIndiUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICidXPtaNovoPadItemIndiUpdateState {
  isNew: boolean;
  padItemIndicadoresIdId: string;
  categoriasIdId: string;
  cidXPtaNovoIdId: string;
}

export class CidXPtaNovoPadItemIndiUpdate extends React.Component<ICidXPtaNovoPadItemIndiUpdateProps, ICidXPtaNovoPadItemIndiUpdateState> {
  constructor(props: Readonly<ICidXPtaNovoPadItemIndiUpdateProps>) {
    super(props);
    this.state = {
      padItemIndicadoresIdId: '0',
      categoriasIdId: '0',
      cidXPtaNovoIdId: '0',
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

    this.props.getPadItemIndicadores();
    this.props.getCategorias();
    this.props.getCidXPtaNovos();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { cidXPtaNovoPadItemIndiEntity } = this.props;
      const entity = {
        ...cidXPtaNovoPadItemIndiEntity,
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
    this.props.history.push('/cid-x-pta-novo-pad-item-indi');
  };

  render() {
    const { cidXPtaNovoPadItemIndiEntity, padItemIndicadores, categorias, cidXPtaNovos, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Cid X Pta Novo Pad Item Indis</li>
          <li className="breadcrumb-item active">Cid X Pta Novo Pad Item Indis edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...cidXPtaNovoPadItemIndiEntity,
                  padItemIndicadoresId: cidXPtaNovoPadItemIndiEntity.padItemIndicadoresId
                    ? cidXPtaNovoPadItemIndiEntity.padItemIndicadoresId.id
                    : null,
                  categoriasId: cidXPtaNovoPadItemIndiEntity.categoriasId ? cidXPtaNovoPadItemIndiEntity.categoriasId.id : null,
                  cidXPtaNovoId: cidXPtaNovoPadItemIndiEntity.cidXPtaNovoId ? cidXPtaNovoPadItemIndiEntity.cidXPtaNovoId.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
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
                  to="/cid-x-pta-novo-pad-item-indi"
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

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="metaLabel" for="cid-x-pta-novo-pad-item-indi-meta">
                                <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.meta">Meta</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="cid-x-pta-novo-pad-item-indi-meta"
                                type="text"
                                name="meta"
                                validate={{
                                  maxLength: { value: 145, errorMessage: translate('entity.validation.maxlength', { max: 145 }) }
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
                              <Label className="mt-2" id="maximoLabel" for="cid-x-pta-novo-pad-item-indi-maximo">
                                <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.maximo">Maximo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="cid-x-pta-novo-pad-item-indi-maximo"
                                type="text"
                                name="maximo"
                                validate={{
                                  maxLength: { value: 145, errorMessage: translate('entity.validation.maxlength', { max: 145 }) }
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
                              <Label className="mt-2" id="minimoLabel" for="cid-x-pta-novo-pad-item-indi-minimo">
                                <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.minimo">Minimo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="cid-x-pta-novo-pad-item-indi-minimo"
                                type="text"
                                name="minimo"
                                validate={{
                                  maxLength: { value: 145, errorMessage: translate('entity.validation.maxlength', { max: 145 }) }
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
                              <Label className="mt-2" id="unidadeMedidaExtraLabel" for="cid-x-pta-novo-pad-item-indi-unidadeMedidaExtra">
                                <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.unidadeMedidaExtra">
                                  Unidade Medida Extra
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="cid-x-pta-novo-pad-item-indi-unidadeMedidaExtra"
                                type="text"
                                name="unidadeMedidaExtra"
                                validate={{
                                  maxLength: { value: 145, errorMessage: translate('entity.validation.maxlength', { max: 145 }) }
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
                              <Label className="mt-2" id="unidadeMedidaIdLabel" for="cid-x-pta-novo-pad-item-indi-unidadeMedidaId">
                                <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.unidadeMedidaId">Unidade Medida Id</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="cid-x-pta-novo-pad-item-indi-unidadeMedidaId"
                                type="string"
                                className="form-control"
                                name="unidadeMedidaId"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
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
                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" for="cid-x-pta-novo-pad-item-indi-padItemIndicadoresId">
                                <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.padItemIndicadoresId">
                                  Pad Item Indicadores Id
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="cid-x-pta-novo-pad-item-indi-padItemIndicadoresId"
                                type="select"
                                className="form-control"
                                name="padItemIndicadoresId"
                              >
                                <option value="null" key="0">
                                  {translate('generadorApp.cidXPtaNovoPadItemIndi.padItemIndicadoresId.empty')}
                                </option>
                                {padItemIndicadores
                                  ? padItemIndicadores.map(otherEntity => (
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
                              <Label className="mt-2" for="cid-x-pta-novo-pad-item-indi-categoriasId">
                                <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.categoriasId">Categorias Id</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="cid-x-pta-novo-pad-item-indi-categoriasId"
                                type="select"
                                className="form-control"
                                name="categoriasId"
                              >
                                <option value="null" key="0">
                                  {translate('generadorApp.cidXPtaNovoPadItemIndi.categoriasId.empty')}
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

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" for="cid-x-pta-novo-pad-item-indi-cidXPtaNovoId">
                                <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.cidXPtaNovoId">Cid X Pta Novo Id</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="cid-x-pta-novo-pad-item-indi-cidXPtaNovoId"
                                type="select"
                                className="form-control"
                                name="cidXPtaNovoId"
                              >
                                <option value="null" key="0">
                                  {translate('generadorApp.cidXPtaNovoPadItemIndi.cidXPtaNovoId.empty')}
                                </option>
                                {cidXPtaNovos
                                  ? cidXPtaNovos.map(otherEntity => (
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

export default connect(mapStateToProps, mapDispatchToProps)(CidXPtaNovoPadItemIndiUpdate);
