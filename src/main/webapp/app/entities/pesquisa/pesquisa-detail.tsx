import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './pesquisa.reducer';
import { IPesquisa } from 'app/shared/model/pesquisa.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPesquisaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PesquisaDetail = (props: IPesquisaDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { pesquisaEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Pesquisa [<b>{pesquisaEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="nome">Nome</span>
          </dt>
          <dd>{pesquisaEntity.nome}</dd>
          <dt>
            <span id="classesIncluir">Classes Incluir</span>
          </dt>
          <dd>{pesquisaEntity.classesIncluir}</dd>
          <dt>
            <span id="incluirMovimentacoes">Incluir Movimentacoes</span>
          </dt>
          <dd>{pesquisaEntity.incluirMovimentacoes}</dd>
          <dt>
            <span id="descartarMovimentacoes">Descartar Movimentacoes</span>
          </dt>
          <dd>{pesquisaEntity.descartarMovimentacoes}</dd>
          <dt>
            <span id="incluirMovimentacoesAll">Incluir Movimentacoes All</span>
          </dt>
          <dd>{pesquisaEntity.incluirMovimentacoesAll ? 'true' : 'false'}</dd>
          <dt>
            <span id="anoInicial">Ano Inicial</span>
          </dt>
          <dd>{pesquisaEntity.anoInicial}</dd>
          <dt>
            <span id="anoFinal">Ano Final</span>
          </dt>
          <dd>{pesquisaEntity.anoFinal}</dd>
          <dt>
            <span id="csv">Csv</span>
          </dt>
          <dd>{pesquisaEntity.csv}</dd>
          <dt>
            <span id="dataCriacao">Data Criacao</span>
          </dt>
          <dd>
            <TextFormat value={pesquisaEntity.dataCriacao} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="dataFinalizacao">Data Finalizacao</span>
          </dt>
          <dd>
            <TextFormat value={pesquisaEntity.dataFinalizacao} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="situacao">Situacao</span>
          </dt>
          <dd>{pesquisaEntity.situacao}</dd>
          <dt>
            <span id="observacoes">Observacoes</span>
          </dt>
          <dd>{pesquisaEntity.observacoes}</dd>
          <dt>
            <span id="csvTotal">Csv Total</span>
          </dt>
          <dd>{pesquisaEntity.csvTotal}</dd>
          <dt>
            <span id="csvVerificados">Csv Verificados</span>
          </dt>
          <dd>{pesquisaEntity.csvVerificados}</dd>
          <dt>
            <span id="comarcaPorComarca">Comarca Por Comarca</span>
          </dt>
          <dd>{pesquisaEntity.comarcaPorComarca ? 'true' : 'false'}</dd>
          <dt>User</dt>
          <dd>{pesquisaEntity.userId ? pesquisaEntity.userId : ''}</dd>
          <dt>Processo</dt>
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
          <dt>Comarcas</dt>
          <dd>{pesquisaEntity.comarcasId ? pesquisaEntity.comarcasId : ''}</dd>
          <dt>Estado</dt>
          <dd>{pesquisaEntity.estadoId ? pesquisaEntity.estadoId : ''}</dd>
        </dl>
        <Button tag={Link} to="/pesquisa" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/pesquisa/${pesquisaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ pesquisa }: IRootState) => ({
  pesquisaEntity: pesquisa.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PesquisaDetail);
