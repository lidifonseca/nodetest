import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

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
      fieldsBase: getCidXPtaNovoPadItemIndiState(this.props.location),
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
  }

  getFiltersURL = (offset = null) => {
    const fieldsBase = this.state.fieldsBase;
    return (
      '_back=1' +
      (fieldsBase['baseFilters'] ? '&baseFilters=' + fieldsBase['baseFilters'] : '') +
      (fieldsBase['activePage'] ? '&page=' + fieldsBase['activePage'] : '') +
      (fieldsBase['itemsPerPage'] ? '&size=' + fieldsBase['itemsPerPage'] : '') +
      (fieldsBase['sort'] ? '&sort=' + (fieldsBase['sort'] + ',' + fieldsBase['order']) : '') +
      (offset !== null ? '&offset=' + offset : '') +
      (fieldsBase['meta'] ? '&meta=' + fieldsBase['meta'] : '') +
      (fieldsBase['maximo'] ? '&maximo=' + fieldsBase['maximo'] : '') +
      (fieldsBase['minimo'] ? '&minimo=' + fieldsBase['minimo'] : '') +
      (fieldsBase['unidadeMedidaExtra'] ? '&unidadeMedidaExtra=' + fieldsBase['unidadeMedidaExtra'] : '') +
      (fieldsBase['unidadeMedidaId'] ? '&unidadeMedidaId=' + fieldsBase['unidadeMedidaId'] : '') +
      (fieldsBase['score'] ? '&score=' + fieldsBase['score'] : '') +
      ''
    );
  };
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
    this.props.history.push('/cid-x-pta-novo-pad-item-indi?' + this.getFiltersURL());
  };

  render() {
    const { cidXPtaNovoPadItemIndiEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
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
                  ...cidXPtaNovoPadItemIndiEntity
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
                        {baseFilters !== 'meta' ? (
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
                        )}

                        {baseFilters !== 'maximo' ? (
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
                        )}

                        {baseFilters !== 'minimo' ? (
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
                        )}

                        {baseFilters !== 'unidadeMedidaExtra' ? (
                          <Col md="unidadeMedidaExtra">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label
                                    className="mt-2"
                                    id="unidadeMedidaExtraLabel"
                                    for="cid-x-pta-novo-pad-item-indi-unidadeMedidaExtra"
                                  >
                                    <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.unidadeMedidaExtra">
                                      Unidade Medida Extra
                                    </Translate>
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
                        )}

                        {baseFilters !== 'unidadeMedidaId' ? (
                          <Col md="unidadeMedidaId">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="unidadeMedidaIdLabel" for="cid-x-pta-novo-pad-item-indi-unidadeMedidaId">
                                    <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.unidadeMedidaId">
                                      Unidade Medida Id
                                    </Translate>
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
                        ) : (
                          <AvInput type="hidden" name="unidadeMedidaId" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'score' ? (
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
  cidXPtaNovoPadItemIndiEntity: storeState.cidXPtaNovoPadItemIndi.entity,
  loading: storeState.cidXPtaNovoPadItemIndi.loading,
  updating: storeState.cidXPtaNovoPadItemIndi.updating,
  updateSuccess: storeState.cidXPtaNovoPadItemIndi.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CidXPtaNovoPadItemIndiUpdate);
