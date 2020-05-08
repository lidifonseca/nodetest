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
  IGrupoRiscoUpdateState,
  getEntity,
  getGrupoRiscoState,
  IGrupoRiscoBaseState,
  updateEntity,
  createEntity,
  reset
} from './grupo-risco.reducer';
import { IGrupoRisco } from 'app/shared/model/grupo-risco.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IGrupoRiscoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class GrupoRiscoUpdate extends React.Component<IGrupoRiscoUpdateProps, IGrupoRiscoUpdateState> {
  constructor(props: Readonly<IGrupoRiscoUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getGrupoRiscoState(this.props.location),
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
      const { grupoRiscoEntity } = this.props;
      const entity = {
        ...grupoRiscoEntity,

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
    this.props.history.push('/grupo-risco?' + this.getFiltersURL());
  };

  render() {
    const { grupoRiscoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...grupoRiscoEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.grupoRisco.home.createOrEditLabel">Create or edit a GrupoRisco</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/grupo-risco?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Grupo Riscos</li>
            <li className="breadcrumb-item active">Grupo Riscos edit</li>
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
                      <Label className="mt-2" for="grupo-risco-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="grupo-risco-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <GrupoRiscoComponentUpdate baseFilters />

                        <StyleLabelComponentUpdate baseFilters />
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
  grupoRiscoEntity: storeState.grupoRisco.entity,
  loading: storeState.grupoRisco.loading,
  updating: storeState.grupoRisco.updating,
  updateSuccess: storeState.grupoRisco.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const GrupoRiscoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'grupoRisco' ? (
    <Col md="grupoRisco">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="grupoRiscoLabel" for="grupo-risco-grupoRisco">
              <Translate contentKey="generadorApp.grupoRisco.grupoRisco">Grupo Risco</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="grupo-risco-grupoRisco" type="text" name="grupoRisco" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="grupoRisco" value={this.state.fieldsBase[baseFilters]} />
  );
};

const StyleLabelComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'styleLabel' ? (
    <Col md="styleLabel">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="styleLabelLabel" for="grupo-risco-styleLabel">
              <Translate contentKey="generadorApp.grupoRisco.styleLabel">Style Label</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="grupo-risco-styleLabel" type="text" name="styleLabel" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="styleLabel" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(GrupoRiscoUpdate);
