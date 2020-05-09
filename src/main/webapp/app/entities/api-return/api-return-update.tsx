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
  IApiReturnUpdateState,
  getEntity,
  getApiReturnState,
  IApiReturnBaseState,
  updateEntity,
  createEntity,
  reset
} from './api-return.reducer';
import { IApiReturn } from 'app/shared/model/api-return.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IApiReturnUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ApiReturnUpdate extends React.Component<IApiReturnUpdateProps, IApiReturnUpdateState> {
  constructor(props: Readonly<IApiReturnUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getApiReturnState(this.props.location),
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
      const { apiReturnEntity } = this.props;
      const entity = {
        ...apiReturnEntity,

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
    this.props.history.push('/api-return?' + this.getFiltersURL());
  };

  render() {
    const { apiReturnEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...apiReturnEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.apiReturn.home.createOrEditLabel">Create or edit a ApiReturn</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/api-return?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Api Returns</li>
            <li className="breadcrumb-item active">Api Returns edit</li>
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
                        <Label className="mt-2" for="api-return-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput id="api-return-id" type="hidden" className="form-control" name="id" required readOnly />
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
                                  <Label className="mt-2" id="idApiNameLabel" for="api-return-idApiName">
                                    <Translate contentKey="generadorApp.apiReturn.idApiName">Id Api Name</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="api-return-idApiName" type="string" className="form-control" name="idApiName" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idApiName" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'apiReturn' ? (
                          <Col md="apiReturn">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="apiReturnLabel" for="api-return-apiReturn">
                                    <Translate contentKey="generadorApp.apiReturn.apiReturn">Api Return</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="api-return-apiReturn" type="text" name="apiReturn" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="apiReturn" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'apiType' ? (
                          <Col md="apiType">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="apiTypeLabel" for="api-return-apiType">
                                    <Translate contentKey="generadorApp.apiReturn.apiType">Api Type</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="api-return-apiType" type="text" name="apiType" />
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
                                  <Label className="mt-2" id="obsLabel" for="api-return-obs">
                                    <Translate contentKey="generadorApp.apiReturn.obs">Obs</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="api-return-obs" type="text" name="obs" />
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
                                <Col md="12">
                                  <Label className="mt-2" id="ativoLabel" check>
                                    <AvInput id="api-return-ativo" type="checkbox" className="form-control" name="ativo" />
                                    <Translate contentKey="generadorApp.apiReturn.ativo">Ativo</Translate>
                                  </Label>
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
  apiReturnEntity: storeState.apiReturn.entity,
  loading: storeState.apiReturn.loading,
  updating: storeState.apiReturn.updating,
  updateSuccess: storeState.apiReturn.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApiReturnUpdate);
