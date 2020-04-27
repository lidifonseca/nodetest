import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './apenso.reducer';
import { IApenso } from 'app/shared/model/apenso.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IApensoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ApensoDetail = (props: IApensoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { apensoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Apenso [<b>{apensoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="numero">Numero</span>
          </dt>
          <dd>{apensoEntity.numero}</dd>
          <dt>
            <span id="clase">Clase</span>
          </dt>
          <dd>{apensoEntity.clase}</dd>
          <dt>
            <span id="apensamento">Apensamento</span>
          </dt>
          <dd>
            <TextFormat value={apensoEntity.apensamento} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="motivo">Motivo</span>
          </dt>
          <dd>{apensoEntity.motivo}</dd>
          <dt>Processo</dt>
          <dd>{apensoEntity.processoId ? apensoEntity.processoId : ''}</dd>
        </dl>
        <Button tag={Link} to="/apenso" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/apenso/${apensoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ apenso }: IRootState) => ({
  apensoEntity: apenso.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApensoDetail);
