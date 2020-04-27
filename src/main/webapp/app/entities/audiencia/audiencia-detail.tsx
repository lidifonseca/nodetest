import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './audiencia.reducer';
import { IAudiencia } from 'app/shared/model/audiencia.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAudienciaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AudienciaDetail = (props: IAudienciaDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { audienciaEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Audiencia [<b>{audienciaEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="data">Data</span>
          </dt>
          <dd>
            <TextFormat value={audienciaEntity.data} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="audencia">Audencia</span>
          </dt>
          <dd>{audienciaEntity.audencia}</dd>
          <dt>
            <span id="situacao">Situacao</span>
          </dt>
          <dd>{audienciaEntity.situacao}</dd>
          <dt>
            <span id="quatidadePessoas">Quatidade Pessoas</span>
          </dt>
          <dd>{audienciaEntity.quatidadePessoas}</dd>
          <dt>Processo</dt>
          <dd>{audienciaEntity.processoId ? audienciaEntity.processoId : ''}</dd>
        </dl>
        <Button tag={Link} to="/audiencia" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/audiencia/${audienciaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ audiencia }: IRootState) => ({
  audienciaEntity: audiencia.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AudienciaDetail);
