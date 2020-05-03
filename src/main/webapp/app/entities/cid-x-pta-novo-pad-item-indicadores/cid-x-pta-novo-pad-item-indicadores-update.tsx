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
import { getEntity, updateEntity, createEntity, reset } from './cid-x-pta-novo-pad-item-indicadores.reducer';
import { ICidXPtaNovoPadItemIndicadores } from 'app/shared/model/cid-x-pta-novo-pad-item-indicadores.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICidXPtaNovoPadItemIndicadoresUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICidXPtaNovoPadItemIndicadoresUpdateState {
  isNew: boolean;
  padItemIndicadoresIdId: string;
  categoriasIdId: string;
  cidXPtaNovoIdId: string;
}

export class CidXPtaNovoPadItemIndicadoresUpdate extends React.Component<
  ICidXPtaNovoPadItemIndicadoresUpdateProps,
  ICidXPtaNovoPadItemIndicadoresUpdateState
> {
  constructor(props: Readonly<ICidXPtaNovoPadItemIndicadoresUpdateProps>) {
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
      const { cidXPtaNovoPadItemIndicadoresEntity } = this.props;
      const entity = {
        ...cidXPtaNovoPadItemIndicadoresEntity,
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
    this.props.history.push('/cid-x-pta-novo-pad-item-indicadores');
  };

  render() {
    const { cidXPtaNovoPadItemIndicadoresEntity, padItemIndicadores, categorias, cidXPtaNovos, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Cid X Pta Novo Pad Item Indicadores</li>
          <li className="breadcrumb-item active">Cid X Pta Novo Pad Item Indicadores edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...cidXPtaNovoPadItemIndicadoresEntity,
                  padItemIndicadoresId: cidXPtaNovoPadItemIndicadoresEntity.padItemIndicadoresId
                    ? cidXPtaNovoPadItemIndicadoresEntity.padItemIndicadoresId.id
                    : null,
                  categoriasId: cidXPtaNovoPadItemIndicadoresEntity.categoriasId
                    ? cidXPtaNovoPadItemIndicadoresEntity.categoriasId.id
                    : null,
                  cidXPtaNovoId: cidXPtaNovoPadItemIndicadoresEntity.cidXPtaNovoId
                    ? cidXPtaNovoPadItemIndicadoresEntity.cidXPtaNovoId.id
                    : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.home.createOrEditLabel">
                    Create or edit a CidXPtaNovoPadItemIndicadores
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
                  to="/cid-x-pta-novo-pad-item-indicadores"
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
                      <Label className="mt-2" for="cid-x-pta-novo-pad-item-indicadores-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput
                                id="cid-x-pta-novo-pad-item-indicadores-id"
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
                              <Label className="mt-2" id="metaLabel" for="cid-x-pta-novo-pad-item-indicadores-meta">
                                <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.meta">Meta</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="cid-x-pta-novo-pad-item-indicadores-meta"
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
                              <Label className="mt-2" id="maximoLabel" for="cid-x-pta-novo-pad-item-indicadores-maximo">
                                <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.maximo">Maximo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="cid-x-pta-novo-pad-item-indicadores-maximo"
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
                              <Label className="mt-2" id="minimoLabel" for="cid-x-pta-novo-pad-item-indicadores-minimo">
                                <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.minimo">Minimo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="cid-x-pta-novo-pad-item-indicadores-minimo"
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
                              <Label
                                className="mt-2"
                                id="unidadeMedidaExtraLabel"
                                for="cid-x-pta-novo-pad-item-indicadores-unidadeMedidaExtra"
                              >
                                <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.unidadeMedidaExtra">
                                  Unidade Medida Extra
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="cid-x-pta-novo-pad-item-indicadores-unidadeMedidaExtra"
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
                              <Label className="mt-2" id="unidadeMedidaIdLabel" for="cid-x-pta-novo-pad-item-indicadores-unidadeMedidaId">
                                <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.unidadeMedidaId">
                                  Unidade Medida Id
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="cid-x-pta-novo-pad-item-indicadores-unidadeMedidaId"
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
                              <Label className="mt-2" id="scoreLabel" for="cid-x-pta-novo-pad-item-indicadores-score">
                                <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.score">Score</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="cid-x-pta-novo-pad-item-indicadores-score" type="string" className="form-control" name="score" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>
                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" for="cid-x-pta-novo-pad-item-indicadores-padItemIndicadoresId">
                                <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.padItemIndicadoresId">
                                  Pad Item Indicadores Id
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="cid-x-pta-novo-pad-item-indicadores-padItemIndicadoresId"
                                type="select"
                                className="form-control"
                                name="padItemIndicadoresId"
                              >
                                <option value="null" key="0">
                                  {translate('generadorApp.cidXPtaNovoPadItemIndicadores.padItemIndicadoresId.empty')}
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
                              <Label className="mt-2" for="cid-x-pta-novo-pad-item-indicadores-categoriasId">
                                <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.categoriasId">Categorias Id</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="cid-x-pta-novo-pad-item-indicadores-categoriasId"
                                type="select"
                                className="form-control"
                                name="categoriasId"
                              >
                                <option value="null" key="0">
                                  {translate('generadorApp.cidXPtaNovoPadItemIndicadores.categoriasId.empty')}
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
                              <Label className="mt-2" for="cid-x-pta-novo-pad-item-indicadores-cidXPtaNovoId">
                                <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.cidXPtaNovoId">
                                  Cid X Pta Novo Id
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="cid-x-pta-novo-pad-item-indicadores-cidXPtaNovoId"
                                type="select"
                                className="form-control"
                                name="cidXPtaNovoId"
                              >
                                <option value="null" key="0">
                                  {translate('generadorApp.cidXPtaNovoPadItemIndicadores.cidXPtaNovoId.empty')}
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
  cidXPtaNovoPadItemIndicadoresEntity: storeState.cidXPtaNovoPadItemIndicadores.entity,
  loading: storeState.cidXPtaNovoPadItemIndicadores.loading,
  updating: storeState.cidXPtaNovoPadItemIndicadores.updating,
  updateSuccess: storeState.cidXPtaNovoPadItemIndicadores.updateSuccess
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

export default connect(mapStateToProps, mapDispatchToProps)(CidXPtaNovoPadItemIndicadoresUpdate);
