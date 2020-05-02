import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './pesquisa.reducer';
import { IPesquisa } from 'app/shared/model/pesquisa.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPesquisaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PesquisaDetail extends React.Component<IPesquisaDetailProps> {
  constructor(props: Readonly<IPesquisaDetailProps>) {
    super(props);
    this.state = {
      ...this.state
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { pesquisaEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pesquisas</li>
          <li className="breadcrumb-item active">Pesquisas details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Pesquisas</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.pesquisa.detail.title">Pesquisa</Translate> [<b>{pesquisaEntity.id}</b>]
                </h2>
                <dl className="jh-entity-details">
                  <dt>
                    <span id="nome">
                      <Translate contentKey="generadorApp.pesquisa.nome">Nome</Translate>
                    </span>
                  </dt>
                  <dd>{pesquisaEntity.nome}</dd>

                  <dt>
                    <span id="classesIncluir">
                      <Translate contentKey="generadorApp.pesquisa.classesIncluir">Classes Incluir</Translate>
                    </span>
                  </dt>
                  <dd>{pesquisaEntity.classesIncluir}</dd>

                  <dt>
                    <span id="incluirMovimentacoes">
                      <Translate contentKey="generadorApp.pesquisa.incluirMovimentacoes">Incluir Movimentacoes</Translate>
                    </span>
                  </dt>
                  <dd>{pesquisaEntity.incluirMovimentacoes}</dd>

                  <dt>
                    <span id="descartarMovimentacoes">
                      <Translate contentKey="generadorApp.pesquisa.descartarMovimentacoes">Descartar Movimentacoes</Translate>
                    </span>
                  </dt>
                  <dd>{pesquisaEntity.descartarMovimentacoes}</dd>

                  <dt>
                    <span id="incluirMovimentacoesAll">
                      <Translate contentKey="generadorApp.pesquisa.incluirMovimentacoesAll">Incluir Movimentacoes All</Translate>
                    </span>
                  </dt>
                  <dd>{pesquisaEntity.incluirMovimentacoesAll ? 'true' : 'false'}</dd>

                  <dt>
                    <span id="anoInicial">
                      <Translate contentKey="generadorApp.pesquisa.anoInicial">Ano Inicial</Translate>
                    </span>
                  </dt>
                  <dd>{pesquisaEntity.anoInicial}</dd>

                  <dt>
                    <span id="anoFinal">
                      <Translate contentKey="generadorApp.pesquisa.anoFinal">Ano Final</Translate>
                    </span>
                  </dt>
                  <dd>{pesquisaEntity.anoFinal}</dd>

                  <dt>
                    <span id="csv">
                      <Translate contentKey="generadorApp.pesquisa.csv">Csv</Translate>
                    </span>
                  </dt>
                  <dd>{pesquisaEntity.csv}</dd>

                  <dt>
                    <span id="dataCriacao">
                      <Translate contentKey="generadorApp.pesquisa.dataCriacao">Data Criacao</Translate>
                    </span>
                  </dt>
                  <dd>
                    <TextFormat value={pesquisaEntity.dataCriacao} type="date" format={APP_DATE_FORMAT} />
                  </dd>

                  <dt>
                    <span id="dataFinalizacao">
                      <Translate contentKey="generadorApp.pesquisa.dataFinalizacao">Data Finalizacao</Translate>
                    </span>
                  </dt>
                  <dd>
                    <TextFormat value={pesquisaEntity.dataFinalizacao} type="date" format={APP_DATE_FORMAT} />
                  </dd>

                  <dt>
                    <span id="situacao">
                      <Translate contentKey="generadorApp.pesquisa.situacao">Situacao</Translate>
                    </span>
                  </dt>
                  <dd>{pesquisaEntity.situacao}</dd>

                  <dt>
                    <span id="observacoes">
                      <Translate contentKey="generadorApp.pesquisa.observacoes">Observacoes</Translate>
                    </span>
                  </dt>
                  <dd>{pesquisaEntity.observacoes}</dd>

                  <dt>
                    <span id="csvTotal">
                      <Translate contentKey="generadorApp.pesquisa.csvTotal">Csv Total</Translate>
                    </span>
                  </dt>
                  <dd>{pesquisaEntity.csvTotal}</dd>

                  <dt>
                    <span id="csvVerificados">
                      <Translate contentKey="generadorApp.pesquisa.csvVerificados">Csv Verificados</Translate>
                    </span>
                  </dt>
                  <dd>{pesquisaEntity.csvVerificados}</dd>

                  <dt>
                    <span id="comarcaPorComarca">
                      <Translate contentKey="generadorApp.pesquisa.comarcaPorComarca">Comarca Por Comarca</Translate>
                    </span>
                  </dt>
                  <dd>{pesquisaEntity.comarcaPorComarca ? 'true' : 'false'}</dd>

                  <dt>
                    <Translate contentKey="generadorApp.pesquisa.user">User</Translate>
                  </dt>
                  <dd>{pesquisaEntity.userId ? pesquisaEntity.userId : ''}</dd>

                  <dt>
                    <Translate contentKey="generadorApp.pesquisa.processo">Processo</Translate>
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
                    <Translate contentKey="generadorApp.pesquisa.comarcas">Comarcas</Translate>
                  </dt>
                  <dd>{pesquisaEntity.comarcasId ? pesquisaEntity.comarcasId : ''}</dd>

                  <dt>
                    <Translate contentKey="generadorApp.pesquisa.estado">Estado</Translate>
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
          </PanelBody>
        </Panel>
      </div>
    );
  }
}

const mapStateToProps = ({ pesquisa }: IRootState) => ({
  pesquisaEntity: pesquisa.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PesquisaDetail);
