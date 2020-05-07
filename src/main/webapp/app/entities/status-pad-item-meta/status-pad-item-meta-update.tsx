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
  IStatusPadItemMetaUpdateState,
  getEntity,
  getStatusPadItemMetaState,
  IStatusPadItemMetaBaseState,
  updateEntity,
  createEntity,
  reset
} from './status-pad-item-meta.reducer';
import { IStatusPadItemMeta } from 'app/shared/model/status-pad-item-meta.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IStatusPadItemMetaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class StatusPadItemMetaUpdate extends React.Component<IStatusPadItemMetaUpdateProps, IStatusPadItemMetaUpdateState> {
  constructor(props: Readonly<IStatusPadItemMetaUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getStatusPadItemMetaState(this.props.location),
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
      (fieldsBase['statusItemMeta'] ? '&statusItemMeta=' + fieldsBase['statusItemMeta'] : '') +
      (fieldsBase['styleLabel'] ? '&styleLabel=' + fieldsBase['styleLabel'] : '') +
      (fieldsBase['ordenacao'] ? '&ordenacao=' + fieldsBase['ordenacao'] : '') +
      (fieldsBase['ativo'] ? '&ativo=' + fieldsBase['ativo'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { statusPadItemMetaEntity } = this.props;
      const entity = {
        ...statusPadItemMetaEntity,
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
    this.props.history.push('/status-pad-item-meta?' + this.getFiltersURL());
  };

  render() {
    const { statusPadItemMetaEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Status Pad Item Metas</li>
          <li className="breadcrumb-item active">Status Pad Item Metas edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...statusPadItemMetaEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.statusPadItemMeta.home.createOrEditLabel">
                    Create or edit a StatusPadItemMeta
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
                  to={'/status-pad-item-meta?' + this.getFiltersURL()}
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
                      <Label className="mt-2" for="status-pad-item-meta-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="status-pad-item-meta-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'statusItemMeta' ? (
                          <Col md="statusItemMeta">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="statusItemMetaLabel" for="status-pad-item-meta-statusItemMeta">
                                    <Translate contentKey="generadorApp.statusPadItemMeta.statusItemMeta">Status Item Meta</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="status-pad-item-meta-statusItemMeta" type="text" name="statusItemMeta" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="statusItemMeta" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'styleLabel' ? (
                          <Col md="styleLabel">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="styleLabelLabel" for="status-pad-item-meta-styleLabel">
                                    <Translate contentKey="generadorApp.statusPadItemMeta.styleLabel">Style Label</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="status-pad-item-meta-styleLabel" type="text" name="styleLabel" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="styleLabel" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'ordenacao' ? (
                          <Col md="ordenacao">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="ordenacaoLabel" for="status-pad-item-meta-ordenacao">
                                    <Translate contentKey="generadorApp.statusPadItemMeta.ordenacao">Ordenacao</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="status-pad-item-meta-ordenacao" type="string" className="form-control" name="ordenacao" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ordenacao" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'ativo' ? (
                          <Col md="ativo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="ativoLabel" for="status-pad-item-meta-ativo">
                                    <Translate contentKey="generadorApp.statusPadItemMeta.ativo">Ativo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="status-pad-item-meta-ativo" type="string" className="form-control" name="ativo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
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
  statusPadItemMetaEntity: storeState.statusPadItemMeta.entity,
  loading: storeState.statusPadItemMeta.loading,
  updating: storeState.statusPadItemMeta.updating,
  updateSuccess: storeState.statusPadItemMeta.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StatusPadItemMetaUpdate);
