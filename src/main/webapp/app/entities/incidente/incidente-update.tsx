import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProcesso } from 'app/shared/model/processo.model';
import { getEntities as getProcessos } from 'app/entities/processo/processo.reducer';
import { getEntity, updateEntity, createEntity, reset } from './incidente.reducer';
import { IIncidente } from 'app/shared/model/incidente.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IIncidenteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IIncidenteUpdateState {
  isNew: boolean;
  processoId: string;
}

export class IncidenteUpdate extends React.Component<IIncidenteUpdateProps, IIncidenteUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      processoId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
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

    this.props.getProcessos();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { incidenteEntity } = this.props;
      const entity = {
        ...incidenteEntity,
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
    this.props.history.push('/incidente');
  };

  render() {
    const { incidenteEntity, processos, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="tjscrapperApp.incidente.home.createOrEditLabel">
              <Translate contentKey="tjscrapperApp.incidente.home.createOrEditLabel">Create or edit a Incidente</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : incidenteEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="incidente-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="incidente-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="recebedoEmLabel" for="incidente-recebedoEm">
                    <Translate contentKey="tjscrapperApp.incidente.recebedoEm">Recebedo Em</Translate>
                  </Label>
                  <AvField id="incidente-recebedoEm" type="date" className="form-control" name="recebedoEm" />
                </AvGroup>
                <AvGroup>
                  <Label id="claseLabel" for="incidente-clase">
                    <Translate contentKey="tjscrapperApp.incidente.clase">Clase</Translate>
                  </Label>
                  <AvField id="incidente-clase" type="text" name="clase" />
                </AvGroup>
                <AvGroup>
                  <Label for="incidente-processo">
                    <Translate contentKey="tjscrapperApp.incidente.processo">Processo</Translate>
                  </Label>
                  <AvInput id="incidente-processo" type="select" className="form-control" name="processoId">
                    <option value="" key="0" />
                    {processos
                      ? processos.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/incidente" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  processos: storeState.processo.entities,
  incidenteEntity: storeState.incidente.entity,
  loading: storeState.incidente.loading,
  updating: storeState.incidente.updating,
  updateSuccess: storeState.incidente.updateSuccess
});

const mapDispatchToProps = {
  getProcessos,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IncidenteUpdate);
