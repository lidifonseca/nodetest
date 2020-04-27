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
import { getEntity, updateEntity, createEntity, reset } from './audiencia.reducer';
import { IAudiencia } from 'app/shared/model/audiencia.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAudienciaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AudienciaUpdate = (props: IAudienciaUpdateProps) => {
  const [processoId, setProcessoId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { audienciaEntity, processos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/audiencia' + props.location.search);
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
        ...audienciaEntity,
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
          <h2 id="generadorApp.audiencia.home.createOrEditLabel">Create or edit a Audiencia</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : audienciaEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="audiencia-id">ID</Label>
                  <AvInput id="audiencia-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="dataLabel" for="audiencia-data">
                  Data
                </Label>
                <AvField id="audiencia-data" type="date" className="form-control" name="data" />
              </AvGroup>
              <AvGroup>
                <Label id="audenciaLabel" for="audiencia-audencia">
                  Audencia
                </Label>
                <AvField id="audiencia-audencia" type="text" name="audencia" />
              </AvGroup>
              <AvGroup>
                <Label id="situacaoLabel" for="audiencia-situacao">
                  Situacao
                </Label>
                <AvField id="audiencia-situacao" type="text" name="situacao" />
              </AvGroup>
              <AvGroup>
                <Label id="quatidadePessoasLabel" for="audiencia-quatidadePessoas">
                  Quatidade Pessoas
                </Label>
                <AvField id="audiencia-quatidadePessoas" type="string" className="form-control" name="quatidadePessoas" />
              </AvGroup>
              <AvGroup>
                <Label for="audiencia-processo">Processo</Label>
                <AvInput id="audiencia-processo" type="select" className="form-control" name="processoId">
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
              <Button tag={Link} id="cancel-save" to="/audiencia" replace color="info">
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
  audienciaEntity: storeState.audiencia.entity,
  loading: storeState.audiencia.loading,
  updating: storeState.audiencia.updating,
  updateSuccess: storeState.audiencia.updateSuccess
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

export default connect(mapStateToProps, mapDispatchToProps)(AudienciaUpdate);
