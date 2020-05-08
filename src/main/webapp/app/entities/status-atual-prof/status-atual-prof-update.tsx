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
  IStatusAtualProfUpdateState,
  getEntity,
  getStatusAtualProfState,
  IStatusAtualProfBaseState,
  updateEntity,
  createEntity,
  reset
} from './status-atual-prof.reducer';
import { IStatusAtualProf } from 'app/shared/model/status-atual-prof.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IStatusAtualProfUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class StatusAtualProfUpdate extends React.Component<IStatusAtualProfUpdateProps, IStatusAtualProfUpdateState> {
  constructor(props: Readonly<IStatusAtualProfUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getStatusAtualProfState(this.props.location),
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
      const { statusAtualProfEntity } = this.props;
      const entity = {
        ...statusAtualProfEntity,

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
    this.props.history.push('/status-atual-prof?' + this.getFiltersURL());
  };

  render() {
    const { statusAtualProfEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...statusAtualProfEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.statusAtualProf.home.createOrEditLabel">Create or edit a StatusAtualProf</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/status-atual-prof?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Status Atual Profs</li>
            <li className="breadcrumb-item active">Status Atual Profs edit</li>
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
                      <Label className="mt-2" for="status-atual-prof-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="status-atual-prof-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <StatusAtualProfComponentUpdate baseFilters />

                        <StyleLabelComponentUpdate baseFilters />

                        <ProfissionalStatusAtualComponentUpdate baseFilter profissionalStatusAtuals />
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
  statusAtualProfEntity: storeState.statusAtualProf.entity,
  loading: storeState.statusAtualProf.loading,
  updating: storeState.statusAtualProf.updating,
  updateSuccess: storeState.statusAtualProf.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const StatusAtualProfComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'statusAtualProf' ? (
    <Col md="statusAtualProf">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="statusAtualProfLabel" for="status-atual-prof-statusAtualProf">
              <Translate contentKey="generadorApp.statusAtualProf.statusAtualProf">Status Atual Prof</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="status-atual-prof-statusAtualProf" type="text" name="statusAtualProf" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="statusAtualProf" value={this.state.fieldsBase[baseFilters]} />
  );
};

const StyleLabelComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'styleLabel' ? (
    <Col md="styleLabel">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="styleLabelLabel" for="status-atual-prof-styleLabel">
              <Translate contentKey="generadorApp.statusAtualProf.styleLabel">Style Label</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="status-atual-prof-styleLabel" type="text" name="styleLabel" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="styleLabel" value={this.state.fieldsBase[baseFilters]} />
  );
};

const ProfissionalStatusAtualComponentUpdate = ({ baseFilters, profissionalStatusAtuals }) => {
  return baseFilters !== 'profissionalStatusAtual' ? (
    <Col md="12"></Col>
  ) : (
    <AvInput type="hidden" name="profissionalStatusAtual" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(StatusAtualProfUpdate);
