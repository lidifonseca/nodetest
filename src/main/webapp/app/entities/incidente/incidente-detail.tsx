import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './incidente.reducer';
import { IIncidente } from 'app/shared/model/incidente.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IIncidenteDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const IncidenteDetail = (props: IIncidenteDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { incidenteEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Incidente [<b>{incidenteEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="recebedoEm">Recebedo Em</span>
          </dt>
          <dd>
            <TextFormat value={incidenteEntity.recebedoEm} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="clase">Clase</span>
          </dt>
          <dd>{incidenteEntity.clase}</dd>
          <dt>Processo</dt>
          <dd>{incidenteEntity.processoId ? incidenteEntity.processoId : ''}</dd>
        </dl>
        <Button tag={Link} to="/incidente" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/incidente/${incidenteEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ incidente }: IRootState) => ({
  incidenteEntity: incidente.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(IncidenteDetail);
