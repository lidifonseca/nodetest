import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './movimentacao.reducer';
import { IMovimentacao } from 'app/shared/model/movimentacao.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMovimentacaoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MovimentacaoDetail = (props: IMovimentacaoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { movimentacaoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Movimentacao [<b>{movimentacaoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="data">Data</span>
          </dt>
          <dd>
            <TextFormat value={movimentacaoEntity.data} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="movimento">Movimento</span>
          </dt>
          <dd>{movimentacaoEntity.movimento}</dd>
          <dt>Processo</dt>
          <dd>{movimentacaoEntity.processoId ? movimentacaoEntity.processoId : ''}</dd>
        </dl>
        <Button tag={Link} to="/movimentacao" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/movimentacao/${movimentacaoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ movimentacao }: IRootState) => ({
  movimentacaoEntity: movimentacao.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MovimentacaoDetail);
