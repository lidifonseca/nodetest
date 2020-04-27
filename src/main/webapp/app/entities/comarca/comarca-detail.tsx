import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './comarca.reducer';
import { IComarca } from 'app/shared/model/comarca.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IComarcaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ComarcaDetail = (props: IComarcaDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { comarcaEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Comarca [<b>{comarcaEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="tjid">Tjid</span>
          </dt>
          <dd>{comarcaEntity.tjid}</dd>
          <dt>
            <span id="nome">Nome</span>
          </dt>
          <dd>{comarcaEntity.nome}</dd>
          <dt>Estado</dt>
          <dd>{comarcaEntity.estadoId ? comarcaEntity.estadoId : ''}</dd>
        </dl>
        <Button tag={Link} to="/comarca" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/comarca/${comarcaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ comarca }: IRootState) => ({
  comarcaEntity: comarca.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ComarcaDetail);
