import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './movimentacao.reducer';
import { IMovimentacao } from 'app/shared/model/movimentacao.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMovimentacaoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MovimentacaoDetail extends React.Component<IMovimentacaoDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { movimentacaoEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="tjscrapperApp.movimentacao.detail.title">Movimentacao</Translate> [<b>{movimentacaoEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="data">
                <Translate contentKey="tjscrapperApp.movimentacao.data">Data</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={movimentacaoEntity.data} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="movimento">
                <Translate contentKey="tjscrapperApp.movimentacao.movimento">Movimento</Translate>
              </span>
            </dt>
            <dd>{movimentacaoEntity.movimento}</dd>
            <dt>
              <Translate contentKey="tjscrapperApp.movimentacao.processo">Processo</Translate>
            </dt>
            <dd>{movimentacaoEntity.processoId ? movimentacaoEntity.processoId : ''}</dd>
          </dl>
          <Button tag={Link} to="/movimentacao" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/movimentacao/${movimentacaoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ movimentacao }: IRootState) => ({
  movimentacaoEntity: movimentacao.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovimentacaoDetail);
