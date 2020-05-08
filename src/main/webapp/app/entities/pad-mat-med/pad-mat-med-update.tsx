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
  IPadMatMedUpdateState,
  getEntity,
  getPadMatMedState,
  IPadMatMedBaseState,
  updateEntity,
  createEntity,
  reset
} from './pad-mat-med.reducer';
import { IPadMatMed } from 'app/shared/model/pad-mat-med.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPadMatMedUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PadMatMedUpdate extends React.Component<IPadMatMedUpdateProps, IPadMatMedUpdateState> {
  constructor(props: Readonly<IPadMatMedUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getPadMatMedState(this.props.location),
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
      const { padMatMedEntity } = this.props;
      const entity = {
        ...padMatMedEntity,

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
    this.props.history.push('/pad-mat-med?' + this.getFiltersURL());
  };

  render() {
    const { padMatMedEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...padMatMedEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.padMatMed.home.createOrEditLabel">Create or edit a PadMatMed</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/pad-mat-med?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Pad Mat Meds</li>
            <li className="breadcrumb-item active">Pad Mat Meds edit</li>
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
                      <Label className="mt-2" for="pad-mat-med-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="pad-mat-med-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <IdPadComponentUpdate baseFilters />

                        <IdMatMedComponentUpdate baseFilters />

                        <QtdComponentUpdate baseFilters />

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
  padMatMedEntity: storeState.padMatMed.entity,
  loading: storeState.padMatMed.loading,
  updating: storeState.padMatMed.updating,
  updateSuccess: storeState.padMatMed.updateSuccess
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
            <Label className="mt-2" id="idPadLabel" for="pad-mat-med-idPad">
              <Translate contentKey="generadorApp.padMatMed.idPad">Id Pad</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-mat-med-idPad" type="string" className="form-control" name="idPad" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="idPad" value={this.state.fieldsBase[baseFilters]} />
  );
};

const IdMatMedComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'idMatMed' ? (
    <Col md="idMatMed">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="idMatMedLabel" for="pad-mat-med-idMatMed">
              <Translate contentKey="generadorApp.padMatMed.idMatMed">Id Mat Med</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-mat-med-idMatMed" type="string" className="form-control" name="idMatMed" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="idMatMed" value={this.state.fieldsBase[baseFilters]} />
  );
};

const QtdComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'qtd' ? (
    <Col md="qtd">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="qtdLabel" for="pad-mat-med-qtd">
              <Translate contentKey="generadorApp.padMatMed.qtd">Qtd</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-mat-med-qtd" type="string" className="form-control" name="qtd" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="qtd" value={this.state.fieldsBase[baseFilters]} />
  );
};

const AtivoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ativo' ? (
    <Col md="ativo">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="ativoLabel" for="pad-mat-med-ativo">
              <Translate contentKey="generadorApp.padMatMed.ativo">Ativo</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-mat-med-ativo" type="string" className="form-control" name="ativo" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PadMatMedUpdate);
