/* eslint complexity: ["error", 300] */
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

import {
  IModulosPadConfigUpdateState,
  getEntity,
  getModulosPadConfigState,
  IModulosPadConfigBaseState,
  updateEntity,
  createEntity,
  reset
} from './modulos-pad-config.reducer';
import { IModulosPadConfig } from 'app/shared/model/modulos-pad-config.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IModulosPadConfigUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ModulosPadConfigUpdate extends React.Component<IModulosPadConfigUpdateProps, IModulosPadConfigUpdateState> {
  constructor(props: Readonly<IModulosPadConfigUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getModulosPadConfigState(this.props.location),
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
    let url = '_back=1' + (offset !== null ? '&offset=' + offset : '');
    Object.keys(fieldsBase).map(key => {
      url += '&' + key + '=' + fieldsBase[key];
    });
    return url;
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { modulosPadConfigEntity } = this.props;
      const entity = {
        ...modulosPadConfigEntity,

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
    this.props.history.push('/modulos-pad-config?' + this.getFiltersURL());
  };

  render() {
    const { modulosPadConfigEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...modulosPadConfigEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.modulosPadConfig.home.createOrEditLabel">Create or edit a ModulosPadConfig</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/modulos-pad-config?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Modulos Pad Configs</li>
            <li className="breadcrumb-item active">Modulos Pad Configs edit</li>
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
                        <Label className="mt-2" for="modulos-pad-config-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput id="modulos-pad-config-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'idModulosPad' ? (
                          <Col md="idModulosPad">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idModulosPadLabel" for="modulos-pad-config-idModulosPad">
                                    <Translate contentKey="generadorApp.modulosPadConfig.idModulosPad">Id Modulos Pad</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="modulos-pad-config-idModulosPad"
                                    type="string"
                                    className="form-control"
                                    name="idModulosPad"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idModulosPad" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'idEspecialidade' ? (
                          <Col md="idEspecialidade">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idEspecialidadeLabel" for="modulos-pad-config-idEspecialidade">
                                    <Translate contentKey="generadorApp.modulosPadConfig.idEspecialidade">Id Especialidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="modulos-pad-config-idEspecialidade"
                                    type="string"
                                    className="form-control"
                                    name="idEspecialidade"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idEspecialidade" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'idPeriodicidade' ? (
                          <Col md="idPeriodicidade">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idPeriodicidadeLabel" for="modulos-pad-config-idPeriodicidade">
                                    <Translate contentKey="generadorApp.modulosPadConfig.idPeriodicidade">Id Periodicidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="modulos-pad-config-idPeriodicidade"
                                    type="string"
                                    className="form-control"
                                    name="idPeriodicidade"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idPeriodicidade" value={this.state.fieldsBase[baseFilters]} />
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
  modulosPadConfigEntity: storeState.modulosPadConfig.entity,
  loading: storeState.modulosPadConfig.loading,
  updating: storeState.modulosPadConfig.updating,
  updateSuccess: storeState.modulosPadConfig.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ModulosPadConfigUpdate);
