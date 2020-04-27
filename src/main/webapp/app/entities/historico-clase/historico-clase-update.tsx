import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProcesso } from 'app/shared/model/processo.model';
import { getEntities as getProcessos } from 'app/entities/processo/processo.reducer';
import { getEntity, updateEntity, createEntity, reset } from './historico-clase.reducer';
import { IHistoricoClase } from 'app/shared/model/historico-clase.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IHistoricoClaseUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const HistoricoClaseUpdate = (props: IHistoricoClaseUpdateProps) => {
  const [processoId, setProcessoId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { historicoClaseEntity, processos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/historico-clase' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getProcessos();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...historicoClaseEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="generadorApp.historicoClase.home.createOrEditLabel">Create or edit a HistoricoClase</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : historicoClaseEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="historico-clase-id">ID</Label>
                  <AvInput id="historico-clase-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="dataLabel" for="historico-clase-data">
                  Data
                </Label>
                <AvField id="historico-clase-data" type="date" className="form-control" name="data" />
              </AvGroup>
              <AvGroup>
                <Label id="tipoLabel" for="historico-clase-tipo">
                  Tipo
                </Label>
                <AvField id="historico-clase-tipo" type="text" name="tipo" />
              </AvGroup>
              <AvGroup>
                <Label id="classeLabel" for="historico-clase-classe">
                  Classe
                </Label>
                <AvField id="historico-clase-classe" type="text" name="classe" />
              </AvGroup>
              <AvGroup>
                <Label id="areaLabel" for="historico-clase-area">
                  Area
                </Label>
                <AvField id="historico-clase-area" type="text" name="area" />
              </AvGroup>
              <AvGroup>
                <Label id="motivoLabel" for="historico-clase-motivo">
                  Motivo
                </Label>
                <AvField id="historico-clase-motivo" type="text" name="motivo" />
              </AvGroup>
              <AvGroup>
                <Label for="historico-clase-processo">Processo</Label>
                <AvInput id="historico-clase-processo" type="select" className="form-control" name="processoId">
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
              <Button tag={Link} id="cancel-save" to="/historico-clase" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  processos: storeState.processo.entities,
  historicoClaseEntity: storeState.historicoClase.entity,
  loading: storeState.historicoClase.loading,
  updating: storeState.historicoClase.updating,
  updateSuccess: storeState.historicoClase.updateSuccess
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

export default connect(mapStateToProps, mapDispatchToProps)(HistoricoClaseUpdate);
