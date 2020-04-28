import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './estado.reducer';
import { IEstado } from 'app/shared/model/estado.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEstadoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EstadoDetail extends React.Component<IEstadoDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { estadoEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="tjscrapperApp.estado.detail.title">Estado</Translate> [<b>{estadoEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="nome">
                <Translate contentKey="tjscrapperApp.estado.nome">Nome</Translate>
              </span>
            </dt>
            <dd>{estadoEntity.nome}</dd>
            <dt>
              <span id="sigla">
                <Translate contentKey="tjscrapperApp.estado.sigla">Sigla</Translate>
              </span>
            </dt>
            <dd>{estadoEntity.sigla}</dd>
          </dl>
          <Button tag={Link} to="/estado" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/estado/${estadoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ estado }: IRootState) => ({
  estadoEntity: estado.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EstadoDetail);
