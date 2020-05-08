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

import { IApiNameUpdateState, getEntity, getApiNameState, IApiNameBaseState, updateEntity, createEntity, reset } from './api-name.reducer';
import { IApiName } from 'app/shared/model/api-name.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IApiNameUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ApiNameUpdate extends React.Component<IApiNameUpdateProps, IApiNameUpdateState> {
  constructor(props: Readonly<IApiNameUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getApiNameState(this.props.location),
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
      const { apiNameEntity } = this.props;
      const entity = {
        ...apiNameEntity,

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
    this.props.history.push('/api-name?' + this.getFiltersURL());
  };

  render() {
    const { apiNameEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...apiNameEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.apiName.home.createOrEditLabel">Create or edit a ApiName</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/api-name?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Api Names</li>
            <li className="breadcrumb-item active">Api Names edit</li>
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
                      <Label className="mt-2" for="api-name-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="api-name-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <ApiNameComponentUpdate baseFilters />

                        <ApiReceiverComponentUpdate baseFilters />

                        <ApiObsComponentUpdate baseFilters />

                        <AtivoComponentUpdate baseFilters />
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
  apiNameEntity: storeState.apiName.entity,
  loading: storeState.apiName.loading,
  updating: storeState.apiName.updating,
  updateSuccess: storeState.apiName.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const ApiNameComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'apiName' ? (
    <Col md="apiName">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="apiNameLabel" for="api-name-apiName">
              <Translate contentKey="generadorApp.apiName.apiName">Api Name</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="api-name-apiName" type="text" name="apiName" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="apiName" value={this.state.fieldsBase[baseFilters]} />
  );
};

const ApiReceiverComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'apiReceiver' ? (
    <Col md="apiReceiver">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="apiReceiverLabel" for="api-name-apiReceiver">
              <Translate contentKey="generadorApp.apiName.apiReceiver">Api Receiver</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="api-name-apiReceiver" type="text" name="apiReceiver" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="apiReceiver" value={this.state.fieldsBase[baseFilters]} />
  );
};

const ApiObsComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'apiObs' ? (
    <Col md="apiObs">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="apiObsLabel" for="api-name-apiObs">
              <Translate contentKey="generadorApp.apiName.apiObs">Api Obs</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="api-name-apiObs" type="text" name="apiObs" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="apiObs" value={this.state.fieldsBase[baseFilters]} />
  );
};

const AtivoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ativo' ? (
    <Col md="ativo">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="ativoLabel" for="api-name-ativo">
              <Translate contentKey="generadorApp.apiName.ativo">Ativo</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="api-name-ativo" type="string" className="form-control" name="ativo" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ApiNameUpdate);
