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
  ICepbrEstadoUpdateState,
  getEntity,
  getCepbrEstadoState,
  ICepbrEstadoBaseState,
  updateEntity,
  createEntity,
  reset
} from './cepbr-estado.reducer';
import { ICepbrEstado } from 'app/shared/model/cepbr-estado.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICepbrEstadoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CepbrEstadoUpdate extends React.Component<ICepbrEstadoUpdateProps, ICepbrEstadoUpdateState> {
  constructor(props: Readonly<ICepbrEstadoUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getCepbrEstadoState(this.props.location),
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
      (fieldsBase['uf'] ? '&uf=' + fieldsBase['uf'] : '') +
      (fieldsBase['estado'] ? '&estado=' + fieldsBase['estado'] : '') +
      (fieldsBase['codIbge'] ? '&codIbge=' + fieldsBase['codIbge'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { cepbrEstadoEntity } = this.props;
      const entity = {
        ...cepbrEstadoEntity,
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
    this.props.history.push('/cepbr-estado?' + this.getFiltersURL());
  };

  render() {
    const { cepbrEstadoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Cepbr Estados</li>
          <li className="breadcrumb-item active">Cepbr Estados edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...cepbrEstadoEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.cepbrEstado.home.createOrEditLabel">Create or edit a CepbrEstado</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button
                  tag={Link}
                  id="cancel-save"
                  to={'/cepbr-estado?' + this.getFiltersURL()}
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
                      <Label className="mt-2" for="cepbr-estado-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="cepbr-estado-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'uf' ? (
                          <Col md="uf">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="ufLabel" for="cepbr-estado-uf">
                                    <Translate contentKey="generadorApp.cepbrEstado.uf">Uf</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="cepbr-estado-uf" type="text" name="uf" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="uf" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'estado' ? (
                          <Col md="estado">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="estadoLabel" for="cepbr-estado-estado">
                                    <Translate contentKey="generadorApp.cepbrEstado.estado">Estado</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="cepbr-estado-estado" type="text" name="estado" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="estado" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'codIbge' ? (
                          <Col md="codIbge">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="codIbgeLabel" for="cepbr-estado-codIbge">
                                    <Translate contentKey="generadorApp.cepbrEstado.codIbge">Cod Ibge</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="cepbr-estado-codIbge" type="text" name="codIbge" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="codIbge" value={this.state.fieldsBase[baseFilters]} />
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
  cepbrEstadoEntity: storeState.cepbrEstado.entity,
  loading: storeState.cepbrEstado.loading,
  updating: storeState.cepbrEstado.updating,
  updateSuccess: storeState.cepbrEstado.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CepbrEstadoUpdate);
