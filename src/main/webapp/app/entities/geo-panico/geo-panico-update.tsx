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
  IGeoPanicoUpdateState,
  getEntity,
  getGeoPanicoState,
  IGeoPanicoBaseState,
  updateEntity,
  createEntity,
  reset
} from './geo-panico.reducer';
import { IGeoPanico } from 'app/shared/model/geo-panico.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IGeoPanicoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class GeoPanicoUpdate extends React.Component<IGeoPanicoUpdateProps, IGeoPanicoUpdateState> {
  constructor(props: Readonly<IGeoPanicoUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getGeoPanicoState(this.props.location),
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
      (fieldsBase['idPanico'] ? '&idPanico=' + fieldsBase['idPanico'] : '') +
      (fieldsBase['idPaciente'] ? '&idPaciente=' + fieldsBase['idPaciente'] : '') +
      (fieldsBase['latitude'] ? '&latitude=' + fieldsBase['latitude'] : '') +
      (fieldsBase['longitude'] ? '&longitude=' + fieldsBase['longitude'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { geoPanicoEntity } = this.props;
      const entity = {
        ...geoPanicoEntity,
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
    this.props.history.push('/geo-panico?' + this.getFiltersURL());
  };

  render() {
    const { geoPanicoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Geo Panicos</li>
          <li className="breadcrumb-item active">Geo Panicos edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...geoPanicoEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.geoPanico.home.createOrEditLabel">Create or edit a GeoPanico</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button
                  tag={Link}
                  id="cancel-save"
                  to={'/geo-panico?' + this.getFiltersURL()}
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
                      <Label className="mt-2" for="geo-panico-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="geo-panico-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'idPanico' ? (
                          <Col md="idPanico">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idPanicoLabel" for="geo-panico-idPanico">
                                    <Translate contentKey="generadorApp.geoPanico.idPanico">Id Panico</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="geo-panico-idPanico" type="string" className="form-control" name="idPanico" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idPanico" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'idPaciente' ? (
                          <Col md="idPaciente">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idPacienteLabel" for="geo-panico-idPaciente">
                                    <Translate contentKey="generadorApp.geoPanico.idPaciente">Id Paciente</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="geo-panico-idPaciente" type="string" className="form-control" name="idPaciente" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idPaciente" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'latitude' ? (
                          <Col md="latitude">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="latitudeLabel" for="geo-panico-latitude">
                                    <Translate contentKey="generadorApp.geoPanico.latitude">Latitude</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="geo-panico-latitude" type="text" name="latitude" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="latitude" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'longitude' ? (
                          <Col md="longitude">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="longitudeLabel" for="geo-panico-longitude">
                                    <Translate contentKey="generadorApp.geoPanico.longitude">Longitude</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="geo-panico-longitude" type="text" name="longitude" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="longitude" value={this.state.fieldsBase[baseFilters]} />
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
  geoPanicoEntity: storeState.geoPanico.entity,
  loading: storeState.geoPanico.loading,
  updating: storeState.geoPanico.updating,
  updateSuccess: storeState.geoPanico.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GeoPanicoUpdate);
