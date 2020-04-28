import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './comarca.reducer';
import { IComarca } from 'app/shared/model/comarca.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IComarcaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ComarcaDetail extends React.Component<IComarcaDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { comarcaEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="tjscrapperApp.comarca.detail.title">Comarca</Translate> [<b>{comarcaEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="tjid">
                <Translate contentKey="tjscrapperApp.comarca.tjid">Tjid</Translate>
              </span>
            </dt>
            <dd>{comarcaEntity.tjid}</dd>
            <dt>
              <span id="nome">
                <Translate contentKey="tjscrapperApp.comarca.nome">Nome</Translate>
              </span>
            </dt>
            <dd>{comarcaEntity.nome}</dd>
            <dt>
              <Translate contentKey="tjscrapperApp.comarca.estado">Estado</Translate>
            </dt>
            <dd>{comarcaEntity.estadoId ? comarcaEntity.estadoId : ''}</dd>
          </dl>
          <Button tag={Link} to="/comarca" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/comarca/${comarcaEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ comarca }: IRootState) => ({
  comarcaEntity: comarca.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComarcaDetail);
