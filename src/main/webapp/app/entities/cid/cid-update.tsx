import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICidUpdateState, getEntity, getCidState, ICidBaseState, updateEntity, createEntity, reset } from './cid.reducer';
import { ICid } from 'app/shared/model/cid.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICidUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CidUpdate extends React.Component<ICidUpdateProps, ICidUpdateState> {
  constructor(props: Readonly<ICidUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getCidState(this.props.location),
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
      (fieldsBase['codigo'] ? '&codigo=' + fieldsBase['codigo'] : '') +
      (fieldsBase['diagnostico'] ? '&diagnostico=' + fieldsBase['diagnostico'] : '') +
      (fieldsBase['gr'] ? '&gr=' + fieldsBase['gr'] : '') +
      (fieldsBase['temp'] ? '&temp=' + fieldsBase['temp'] : '') +
      (fieldsBase['apelido'] ? '&apelido=' + fieldsBase['apelido'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { cidEntity } = this.props;
      const entity = {
        ...cidEntity,
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
    this.props.history.push('/cid?' + this.getFiltersURL());
  };

  render() {
    const { cidEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Cids</li>
          <li className="breadcrumb-item active">Cids edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...cidEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.cid.home.createOrEditLabel">Create or edit a Cid</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button
                  tag={Link}
                  id="cancel-save"
                  to={'/cid?' + this.getFiltersURL()}
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
                      <Label className="mt-2" for="cid-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="cid-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'codigo' ? (
                          <Col md="codigo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="codigoLabel" for="cid-codigo">
                                    <Translate contentKey="generadorApp.cid.codigo">Codigo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="cid-codigo" type="text" name="codigo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="codigo" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'diagnostico' ? (
                          <Col md="diagnostico">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="diagnosticoLabel" for="cid-diagnostico">
                                    <Translate contentKey="generadorApp.cid.diagnostico">Diagnostico</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="cid-diagnostico" type="text" name="diagnostico" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="diagnostico" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'gr' ? (
                          <Col md="gr">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="grLabel" for="cid-gr">
                                    <Translate contentKey="generadorApp.cid.gr">Gr</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="cid-gr" type="text" name="gr" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="gr" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'temp' ? (
                          <Col md="temp">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="tempLabel" for="cid-temp">
                                    <Translate contentKey="generadorApp.cid.temp">Temp</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="cid-temp" type="text" name="temp" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="temp" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'apelido' ? (
                          <Col md="apelido">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="apelidoLabel" for="cid-apelido">
                                    <Translate contentKey="generadorApp.cid.apelido">Apelido</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="cid-apelido" type="text" name="apelido" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="apelido" value={this.state.fieldsBase[baseFilters]} />
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
  cidEntity: storeState.cid.entity,
  loading: storeState.cid.loading,
  updating: storeState.cid.updating,
  updateSuccess: storeState.cid.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CidUpdate);
