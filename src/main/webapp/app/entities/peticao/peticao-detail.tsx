import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './peticao.reducer';
import { IPeticao } from 'app/shared/model/peticao.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPeticaoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PeticaoDetail = (props: IPeticaoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { peticaoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Peticao [<b>{peticaoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="data">Data</span>
          </dt>
          <dd>
            <TextFormat value={peticaoEntity.data} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="tipo">Tipo</span>
          </dt>
          <dd>{peticaoEntity.tipo}</dd>
          <dt>Processo</dt>
          <dd>{peticaoEntity.processoId ? peticaoEntity.processoId : ''}</dd>
        </dl>
        <Button tag={Link} to="/peticao" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/peticao/${peticaoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ peticao }: IRootState) => ({
  peticaoEntity: peticao.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PeticaoDetail);
