import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './pesquisa.reducer';
import { IPesquisa } from 'app/shared/model/pesquisa.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPesquisaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PesquisaDetail extends React.Component<IPesquisaDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { pesquisaEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="tjscrapperApp.pesquisa.detail.title">Pesquisa</Translate> [<b>{pesquisaEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="nome">
                <Translate contentKey="tjscrapperApp.pesquisa.nome">Nome</Translate>
              </span>
            </dt>
            <dd>{pesquisaEntity.nome}</dd>
            <dt>
              <span id="classesIncluir">
                <Translate contentKey="tjscrapperApp.pesquisa.classesIncluir">Classes Incluir</Translate>
              </span>
            </dt>
            <dd>{pesquisaEntity.classesIncluir}</dd>
            <dt>
              <span id="incluirMovimentacoes">
                <Translate contentKey="tjscrapperApp.pesquisa.incluirMovimentacoes">Incluir Movimentacoes</Translate>
              </span>
            </dt>
            <dd>{pesquisaEntity.incluirMovimentacoes}</dd>
            <dt>
              <span id="descartarMovimentacoes">
                <Translate contentKey="tjscrapperApp.pesquisa.descartarMovimentacoes">Descartar Movimentacoes</Translate>
              </span>
            </dt>
            <dd>{pesquisaEntity.descartarMovimentacoes}</dd>
            <dt>
              <span id="incluirMovimentacoesAll">
                <Translate contentKey="tjscrapperApp.pesquisa.incluirMovimentacoesAll">Incluir Movimentacoes All</Translate>
              </span>
            </dt>
            <dd>{pesquisaEntity.incluirMovimentacoesAll ? 'true' : 'false'}</dd>
            <dt>
              <span id="anoInicial">
                <Translate contentKey="tjscrapperApp.pesquisa.anoInicial">Ano Inicial</Translate>
              </span>
            </dt>
            <dd>{pesquisaEntity.anoInicial}</dd>
            <dt>
              <span id="anoFinal">
                <Translate contentKey="tjscrapperApp.pesquisa.anoFinal">Ano Final</Translate>
              </span>
            </dt>
            <dd>{pesquisaEntity.anoFinal}</dd>
            <dt>
              <span id="csv">
                <Translate contentKey="tjscrapperApp.pesquisa.csv">Csv</Translate>
              </span>
            </dt>
            <dd>{pesquisaEntity.csv}</dd>
            <dt>
              <span id="dataCriacao">
                <Translate contentKey="tjscrapperApp.pesquisa.dataCriacao">Data Criacao</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={pesquisaEntity.dataCriacao} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="dataFinalizacao">
                <Translate contentKey="tjscrapperApp.pesquisa.dataFinalizacao">Data Finalizacao</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={pesquisaEntity.dataFinalizacao} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="situacao">
                <Translate contentKey="tjscrapperApp.pesquisa.situacao">Situacao</Translate>
              </span>
            </dt>
            <dd>{pesquisaEntity.situacao}</dd>
            <dt>
              <span id="observacoes">
                <Translate contentKey="tjscrapperApp.pesquisa.observacoes">Observacoes</Translate>
              </span>
            </dt>
            <dd>{pesquisaEntity.observacoes}</dd>
            <dt>
              <span id="csvTotal">
                <Translate contentKey="tjscrapperApp.pesquisa.csvTotal">Csv Total</Translate>
              </span>
            </dt>
            <dd>{pesquisaEntity.csvTotal}</dd>
            <dt>
              <span id="csvVerificados">
                <Translate contentKey="tjscrapperApp.pesquisa.csvVerificados">Csv Verificados</Translate>
              </span>
            </dt>
            <dd>{pesquisaEntity.csvVerificados}</dd>
            <dt>
              <span id="comarcaPorComarca">
                <Translate contentKey="tjscrapperApp.pesquisa.comarcaPorComarca">Comarca Por Comarca</Translate>
              </span>
            </dt>
            <dd>{pesquisaEntity.comarcaPorComarca ? 'true' : 'false'}</dd>
            <dt>
              <Translate contentKey="tjscrapperApp.pesquisa.user">User</Translate>
            </dt>
            <dd>{pesquisaEntity.userId ? pesquisaEntity.userId : ''}</dd>
            <dt>
              <Translate contentKey="tjscrapperApp.pesquisa.processo">Processo</Translate>
            </dt>
            <dd>
              {pesquisaEntity.processos
                ? pesquisaEntity.processos.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === pesquisaEntity.processos.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>
              <Translate contentKey="tjscrapperApp.pesquisa.comarcas">Comarcas</Translate>
            </dt>
            <dd>{pesquisaEntity.comarcasId ? pesquisaEntity.comarcasId : ''}</dd>
            <dt>
              <Translate contentKey="tjscrapperApp.pesquisa.estado">Estado</Translate>
            </dt>
            <dd>{pesquisaEntity.estadoId ? pesquisaEntity.estadoId : ''}</dd>
          </dl>
          <Button tag={Link} to="/pesquisa" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/pesquisa/${pesquisaEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ pesquisa }: IRootState) => ({
  pesquisaEntity: pesquisa.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PesquisaDetail);
