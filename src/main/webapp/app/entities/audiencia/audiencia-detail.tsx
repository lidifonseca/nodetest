import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './audiencia.reducer';
import { IAudiencia } from 'app/shared/model/audiencia.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAudienciaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AudienciaDetail extends React.Component<IAudienciaDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { audienciaEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="tjscrapperApp.audiencia.detail.title">Audiencia</Translate> [<b>{audienciaEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="data">
                <Translate contentKey="tjscrapperApp.audiencia.data">Data</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={audienciaEntity.data} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="audencia">
                <Translate contentKey="tjscrapperApp.audiencia.audencia">Audencia</Translate>
              </span>
            </dt>
            <dd>{audienciaEntity.audencia}</dd>
            <dt>
              <span id="situacao">
                <Translate contentKey="tjscrapperApp.audiencia.situacao">Situacao</Translate>
              </span>
            </dt>
            <dd>{audienciaEntity.situacao}</dd>
            <dt>
              <span id="quatidadePessoas">
                <Translate contentKey="tjscrapperApp.audiencia.quatidadePessoas">Quatidade Pessoas</Translate>
              </span>
            </dt>
            <dd>{audienciaEntity.quatidadePessoas}</dd>
            <dt>
              <Translate contentKey="tjscrapperApp.audiencia.processo">Processo</Translate>
            </dt>
            <dd>{audienciaEntity.processoId ? audienciaEntity.processoId : ''}</dd>
          </dl>
          <Button tag={Link} to="/audiencia" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/audiencia/${audienciaEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ audiencia }: IRootState) => ({
  audienciaEntity: audiencia.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AudienciaDetail);
