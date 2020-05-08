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

import { IPadPtaUpdateState, getEntity, getPadPtaState, IPadPtaBaseState, updateEntity, createEntity, reset } from './pad-pta.reducer';
import { IPadPta } from 'app/shared/model/pad-pta.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPadPtaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PadPtaUpdate extends React.Component<IPadPtaUpdateProps, IPadPtaUpdateState> {
  constructor(props: Readonly<IPadPtaUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getPadPtaState(this.props.location),
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
      const { padPtaEntity } = this.props;
      const entity = {
        ...padPtaEntity,

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
    this.props.history.push('/pad-pta?' + this.getFiltersURL());
  };

  render() {
    const { padPtaEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...padPtaEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.padPta.home.createOrEditLabel">Create or edit a PadPta</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/pad-pta?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Pad Ptas</li>
            <li className="breadcrumb-item active">Pad Ptas edit</li>
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
                      <Label className="mt-2" for="pad-pta-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="pad-pta-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <IdPadComponentUpdate baseFilters />

                        <IdDescPtaComponentUpdate baseFilters />

                        <IdCidComponentUpdate baseFilters />

                        <IdCidXPtaNovoComponentUpdate baseFilters />
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
  padPtaEntity: storeState.padPta.entity,
  loading: storeState.padPta.loading,
  updating: storeState.padPta.updating,
  updateSuccess: storeState.padPta.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const IdPadComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'idPad' ? (
    <Col md="idPad">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="idPadLabel" for="pad-pta-idPad">
              <Translate contentKey="generadorApp.padPta.idPad">Id Pad</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-pta-idPad" type="text" name="idPad" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="idPad" value={this.state.fieldsBase[baseFilters]} />
  );
};

const IdDescPtaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'idDescPta' ? (
    <Col md="idDescPta">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="idDescPtaLabel" for="pad-pta-idDescPta">
              <Translate contentKey="generadorApp.padPta.idDescPta">Id Desc Pta</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-pta-idDescPta" type="text" name="idDescPta" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="idDescPta" value={this.state.fieldsBase[baseFilters]} />
  );
};

const IdCidComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'idCid' ? (
    <Col md="idCid">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="idCidLabel" for="pad-pta-idCid">
              <Translate contentKey="generadorApp.padPta.idCid">Id Cid</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-pta-idCid" type="text" name="idCid" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="idCid" value={this.state.fieldsBase[baseFilters]} />
  );
};

const IdCidXPtaNovoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'idCidXPtaNovo' ? (
    <Col md="idCidXPtaNovo">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="idCidXPtaNovoLabel" for="pad-pta-idCidXPtaNovo">
              <Translate contentKey="generadorApp.padPta.idCidXPtaNovo">Id Cid X Pta Novo</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-pta-idCidXPtaNovo" type="string" className="form-control" name="idCidXPtaNovo" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="idCidXPtaNovo" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PadPtaUpdate);
