import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './historico-clase.reducer';
import { IHistoricoClase } from 'app/shared/model/historico-clase.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IHistoricoClaseDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class HistoricoClaseDetail extends React.Component<IHistoricoClaseDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { historicoClaseEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="tjscrapperApp.historicoClase.detail.title">HistoricoClase</Translate> [<b>{historicoClaseEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="data">
                <Translate contentKey="tjscrapperApp.historicoClase.data">Data</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={historicoClaseEntity.data} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="tipo">
                <Translate contentKey="tjscrapperApp.historicoClase.tipo">Tipo</Translate>
              </span>
            </dt>
            <dd>{historicoClaseEntity.tipo}</dd>
            <dt>
              <span id="classe">
                <Translate contentKey="tjscrapperApp.historicoClase.classe">Classe</Translate>
              </span>
            </dt>
            <dd>{historicoClaseEntity.classe}</dd>
            <dt>
              <span id="area">
                <Translate contentKey="tjscrapperApp.historicoClase.area">Area</Translate>
              </span>
            </dt>
            <dd>{historicoClaseEntity.area}</dd>
            <dt>
              <span id="motivo">
                <Translate contentKey="tjscrapperApp.historicoClase.motivo">Motivo</Translate>
              </span>
            </dt>
            <dd>{historicoClaseEntity.motivo}</dd>
            <dt>
              <Translate contentKey="tjscrapperApp.historicoClase.processo">Processo</Translate>
            </dt>
            <dd>{historicoClaseEntity.processoId ? historicoClaseEntity.processoId : ''}</dd>
          </dl>
          <Button tag={Link} to="/historico-clase" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/historico-clase/${historicoClaseEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ historicoClase }: IRootState) => ({
  historicoClaseEntity: historicoClase.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoricoClaseDetail);
