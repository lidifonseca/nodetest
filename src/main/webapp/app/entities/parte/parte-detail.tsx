import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './parte.reducer';
import { IParte } from 'app/shared/model/parte.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IParteDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ParteDetail extends React.Component<IParteDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { parteEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="tjscrapperApp.parte.detail.title">Parte</Translate> [<b>{parteEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="categoria">
                <Translate contentKey="tjscrapperApp.parte.categoria">Categoria</Translate>
              </span>
            </dt>
            <dd>{parteEntity.categoria}</dd>
            <dt>
              <span id="participante">
                <Translate contentKey="tjscrapperApp.parte.participante">Participante</Translate>
              </span>
            </dt>
            <dd>{parteEntity.participante}</dd>
            <dt>
              <span id="advogados">
                <Translate contentKey="tjscrapperApp.parte.advogados">Advogados</Translate>
              </span>
            </dt>
            <dd>{parteEntity.advogados}</dd>
            <dt>
              <Translate contentKey="tjscrapperApp.parte.processo">Processo</Translate>
            </dt>
            <dd>{parteEntity.processoId ? parteEntity.processoId : ''}</dd>
          </dl>
          <Button tag={Link} to="/parte" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/parte/${parteEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ parte }: IRootState) => ({
  parteEntity: parte.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParteDetail);
