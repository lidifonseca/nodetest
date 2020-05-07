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
  IApiInputUpdateState,
  getEntity,
  getApiInputState,
  IApiInputBaseState,
  updateEntity,
  createEntity,
  reset
} from './api-input.reducer';
import { IApiInput } from 'app/shared/model/api-input.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IApiInputUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ApiInputUpdate extends React.Component<IApiInputUpdateProps, IApiInputUpdateState> {
  constructor(props: Readonly<IApiInputUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getApiInputState(this.props.location),
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
      (fieldsBase['idApiName'] ? '&idApiName=' + fieldsBase['idApiName'] : '') +
      (fieldsBase['apiInput'] ? '&apiInput=' + fieldsBase['apiInput'] : '') +
      (fieldsBase['apiType'] ? '&apiType=' + fieldsBase['apiType'] : '') +
      (fieldsBase['obs'] ? '&obs=' + fieldsBase['obs'] : '') +
      (fieldsBase['ativo'] ? '&ativo=' + fieldsBase['ativo'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { apiInputEntity } = this.props;
      const entity = {
        ...apiInputEntity,
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
    this.props.history.push('/api-input?' + this.getFiltersURL());
  };

  render() {
    const { apiInputEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Api Inputs</li>
          <li className="breadcrumb-item active">Api Inputs edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...apiInputEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.apiInput.home.createOrEditLabel">Create or edit a ApiInput</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button
                  tag={Link}
                  id="cancel-save"
                  to={'/api-input?' + this.getFiltersURL()}
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
                      <Label className="mt-2" for="api-input-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="api-input-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'idApiName' ? (
                          <Col md="idApiName">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idApiNameLabel" for="api-input-idApiName">
                                    <Translate contentKey="generadorApp.apiInput.idApiName">Id Api Name</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="api-input-idApiName" type="string" className="form-control" name="idApiName" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idApiName" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'apiInput' ? (
                          <Col md="apiInput">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="apiInputLabel" for="api-input-apiInput">
                                    <Translate contentKey="generadorApp.apiInput.apiInput">Api Input</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="api-input-apiInput" type="text" name="apiInput" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="apiInput" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'apiType' ? (
                          <Col md="apiType">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="apiTypeLabel" for="api-input-apiType">
                                    <Translate contentKey="generadorApp.apiInput.apiType">Api Type</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="api-input-apiType" type="text" name="apiType" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="apiType" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'obs' ? (
                          <Col md="obs">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="obsLabel" for="api-input-obs">
                                    <Translate contentKey="generadorApp.apiInput.obs">Obs</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="api-input-obs" type="text" name="obs" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="obs" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'ativo' ? (
                          <Col md="ativo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="ativoLabel" for="api-input-ativo">
                                    <Translate contentKey="generadorApp.apiInput.ativo">Ativo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="api-input-ativo" type="string" className="form-control" name="ativo" />
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
  apiInputEntity: storeState.apiInput.entity,
  loading: storeState.apiInput.loading,
  updating: storeState.apiInput.updating,
  updateSuccess: storeState.apiInput.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApiInputUpdate);
