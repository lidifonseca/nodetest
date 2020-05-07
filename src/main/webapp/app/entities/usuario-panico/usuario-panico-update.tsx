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
  IUsuarioPanicoUpdateState,
  getEntity,
  getUsuarioPanicoState,
  IUsuarioPanicoBaseState,
  updateEntity,
  createEntity,
  reset
} from './usuario-panico.reducer';
import { IUsuarioPanico } from 'app/shared/model/usuario-panico.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUsuarioPanicoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class UsuarioPanicoUpdate extends React.Component<IUsuarioPanicoUpdateProps, IUsuarioPanicoUpdateState> {
  constructor(props: Readonly<IUsuarioPanicoUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getUsuarioPanicoState(this.props.location),
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
      (fieldsBase['idPaciente'] ? '&idPaciente=' + fieldsBase['idPaciente'] : '') +
      (fieldsBase['idProfissional'] ? '&idProfissional=' + fieldsBase['idProfissional'] : '') +
      (fieldsBase['observacao'] ? '&observacao=' + fieldsBase['observacao'] : '') +
      (fieldsBase['resolvido'] ? '&resolvido=' + fieldsBase['resolvido'] : '') +
      (fieldsBase['idUserResolvido'] ? '&idUserResolvido=' + fieldsBase['idUserResolvido'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { usuarioPanicoEntity } = this.props;
      const entity = {
        ...usuarioPanicoEntity,
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
    this.props.history.push('/usuario-panico?' + this.getFiltersURL());
  };

  render() {
    const { usuarioPanicoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Usuario Panicos</li>
          <li className="breadcrumb-item active">Usuario Panicos edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...usuarioPanicoEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.usuarioPanico.home.createOrEditLabel">Create or edit a UsuarioPanico</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button
                  tag={Link}
                  id="cancel-save"
                  to={'/usuario-panico?' + this.getFiltersURL()}
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
                      <Label className="mt-2" for="usuario-panico-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="usuario-panico-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'idPaciente' ? (
                          <Col md="idPaciente">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idPacienteLabel" for="usuario-panico-idPaciente">
                                    <Translate contentKey="generadorApp.usuarioPanico.idPaciente">Id Paciente</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="usuario-panico-idPaciente" type="string" className="form-control" name="idPaciente" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idPaciente" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'idProfissional' ? (
                          <Col md="idProfissional">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idProfissionalLabel" for="usuario-panico-idProfissional">
                                    <Translate contentKey="generadorApp.usuarioPanico.idProfissional">Id Profissional</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-panico-idProfissional"
                                    type="string"
                                    className="form-control"
                                    name="idProfissional"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idProfissional" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'observacao' ? (
                          <Col md="observacao">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="observacaoLabel" for="usuario-panico-observacao">
                                    <Translate contentKey="generadorApp.usuarioPanico.observacao">Observacao</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="usuario-panico-observacao" type="text" name="observacao" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="observacao" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'resolvido' ? (
                          <Col md="resolvido">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="resolvidoLabel" for="usuario-panico-resolvido">
                                    <Translate contentKey="generadorApp.usuarioPanico.resolvido">Resolvido</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="usuario-panico-resolvido" type="string" className="form-control" name="resolvido" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="resolvido" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'idUserResolvido' ? (
                          <Col md="idUserResolvido">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idUserResolvidoLabel" for="usuario-panico-idUserResolvido">
                                    <Translate contentKey="generadorApp.usuarioPanico.idUserResolvido">Id User Resolvido</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="usuario-panico-idUserResolvido"
                                    type="string"
                                    className="form-control"
                                    name="idUserResolvido"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idUserResolvido" value={this.state.fieldsBase[baseFilters]} />
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
  usuarioPanicoEntity: storeState.usuarioPanico.entity,
  loading: storeState.usuarioPanico.loading,
  updating: storeState.usuarioPanico.updating,
  updateSuccess: storeState.usuarioPanico.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UsuarioPanicoUpdate);
