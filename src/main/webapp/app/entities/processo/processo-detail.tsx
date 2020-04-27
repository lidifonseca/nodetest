import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './processo.reducer';
import { IProcesso } from 'app/shared/model/processo.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProcessoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProcessoDetail = (props: IProcessoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { processoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Processo [<b>{processoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="numero">Numero</span>
          </dt>
          <dd>{processoEntity.numero}</dd>
          <dt>
            <span id="cnpj">Cnpj</span>
          </dt>
          <dd>{processoEntity.cnpj}</dd>
          <dt>
            <span id="razaoSocial">Razao Social</span>
          </dt>
          <dd>{processoEntity.razaoSocial}</dd>
          <dt>
            <span id="classe">Classe</span>
          </dt>
          <dd>{processoEntity.classe}</dd>
          <dt>
            <span id="assunto">Assunto</span>
          </dt>
          <dd>{processoEntity.assunto}</dd>
          <dt>
            <span id="vara">Vara</span>
          </dt>
          <dd>{processoEntity.vara}</dd>
          <dt>
            <span id="juiz">Juiz</span>
          </dt>
          <dd>{processoEntity.juiz}</dd>
          <dt>
            <span id="dataDistribuicao">Data Distribuicao</span>
          </dt>
          <dd>
            <TextFormat value={processoEntity.dataDistribuicao} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="distribuicao">Distribuicao</span>
          </dt>
          <dd>{processoEntity.distribuicao}</dd>
          <dt>
            <span id="localFisico">Local Fisico</span>
          </dt>
          <dd>{processoEntity.localFisico}</dd>
          <dt>
            <span id="controle">Controle</span>
          </dt>
          <dd>{processoEntity.controle}</dd>
          <dt>
            <span id="area">Area</span>
          </dt>
          <dd>{processoEntity.area}</dd>
          <dt>
            <span id="estado">Estado</span>
          </dt>
          <dd>{processoEntity.estado}</dd>
          <dt>
            <span id="observacao">Observacao</span>
          </dt>
          <dd>{processoEntity.observacao}</dd>
          <dt>
            <span id="interesse">Interesse</span>
          </dt>
          <dd>{processoEntity.interesse ? 'true' : 'false'}</dd>
          <dt>
            <span id="dataCriacao">Data Criacao</span>
          </dt>
          <dd>
            <TextFormat value={processoEntity.dataCriacao} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="dataAtualicacao">Data Atualicacao</span>
          </dt>
          <dd>
            <TextFormat value={processoEntity.dataAtualicacao} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="dataExclusao">Data Exclusao</span>
          </dt>
          <dd>
            <TextFormat value={processoEntity.dataExclusao} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="link">Link</span>
          </dt>
          <dd>{processoEntity.link}</dd>
          <dt>
            <span id="valor">Valor</span>
          </dt>
          <dd>{processoEntity.valor}</dd>
          <dt>
            <span id="moeda">Moeda</span>
          </dt>
          <dd>{processoEntity.moeda}</dd>
          <dt>Comarca</dt>
          <dd>{processoEntity.comarcaId ? processoEntity.comarcaId : ''}</dd>
        </dl>
        <Button tag={Link} to="/processo" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/processo/${processoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ processo }: IRootState) => ({
  processoEntity: processo.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProcessoDetail);
