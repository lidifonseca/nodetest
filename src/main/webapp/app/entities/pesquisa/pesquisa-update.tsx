import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IProcesso } from 'app/shared/model/processo.model';
import { getEntities as getProcessos } from 'app/entities/processo/processo.reducer';
import { IComarca } from 'app/shared/model/comarca.model';
import { getEntities as getComarcas } from 'app/entities/comarca/comarca.reducer';
import { IEstado } from 'app/shared/model/estado.model';
import { getEntities as getEstados } from 'app/entities/estado/estado.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './pesquisa.reducer';
import { IPesquisa } from 'app/shared/model/pesquisa.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPesquisaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PesquisaUpdate = (props: IPesquisaUpdateProps) => {
  const [idsprocesso, setIdsprocesso] = useState([]);
  const [userId, setUserId] = useState('0');
  const [comarcasId, setComarcasId] = useState('0');
  const [estadoId, setEstadoId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { pesquisaEntity, users, processos, comarcas, estados, loading, updating } = props;

  const { classesIncluir, incluirMovimentacoes, descartarMovimentacoes, csv } = pesquisaEntity;

  const handleClose = () => {
    props.history.push('/pesquisa' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
    props.getProcessos();
    props.getComarcas();
    props.getEstados();
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.dataCriacao = convertDateTimeToServer(values.dataCriacao);
    values.dataFinalizacao = convertDateTimeToServer(values.dataFinalizacao);

    if (errors.length === 0) {
      const entity = {
        ...pesquisaEntity,
        ...values,
        processos: mapIdList(values.processos)
      };
      entity.user = users[values.user];

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="generadorApp.pesquisa.home.createOrEditLabel">Create or edit a Pesquisa</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : pesquisaEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="pesquisa-id">ID</Label>
                  <AvInput id="pesquisa-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nomeLabel" for="pesquisa-nome">
                  Nome
                </Label>
                <AvField id="pesquisa-nome" type="text" name="nome" />
              </AvGroup>
              <AvGroup>
                <Label id="classesIncluirLabel" for="pesquisa-classesIncluir">
                  Classes Incluir
                </Label>
                <AvInput id="pesquisa-classesIncluir" type="textarea" name="classesIncluir" />
              </AvGroup>
              <AvGroup>
                <Label id="incluirMovimentacoesLabel" for="pesquisa-incluirMovimentacoes">
                  Incluir Movimentacoes
                </Label>
                <AvInput id="pesquisa-incluirMovimentacoes" type="textarea" name="incluirMovimentacoes" />
              </AvGroup>
              <AvGroup>
                <Label id="descartarMovimentacoesLabel" for="pesquisa-descartarMovimentacoes">
                  Descartar Movimentacoes
                </Label>
                <AvInput id="pesquisa-descartarMovimentacoes" type="textarea" name="descartarMovimentacoes" />
              </AvGroup>
              <AvGroup check>
                <Label id="incluirMovimentacoesAllLabel">
                  <AvInput
                    id="pesquisa-incluirMovimentacoesAll"
                    type="checkbox"
                    className="form-check-input"
                    name="incluirMovimentacoesAll"
                  />
                  Incluir Movimentacoes All
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="anoInicialLabel" for="pesquisa-anoInicial">
                  Ano Inicial
                </Label>
                <AvField id="pesquisa-anoInicial" type="string" className="form-control" name="anoInicial" />
              </AvGroup>
              <AvGroup>
                <Label id="anoFinalLabel" for="pesquisa-anoFinal">
                  Ano Final
                </Label>
                <AvField id="pesquisa-anoFinal" type="string" className="form-control" name="anoFinal" />
              </AvGroup>
              <AvGroup>
                <Label id="csvLabel" for="pesquisa-csv">
                  Csv
                </Label>
                <AvInput id="pesquisa-csv" type="textarea" name="csv" />
              </AvGroup>
              <AvGroup>
                <Label id="dataCriacaoLabel" for="pesquisa-dataCriacao">
                  Data Criacao
                </Label>
                <AvInput
                  id="pesquisa-dataCriacao"
                  type="datetime-local"
                  className="form-control"
                  name="dataCriacao"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.pesquisaEntity.dataCriacao)}
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dataFinalizacaoLabel" for="pesquisa-dataFinalizacao">
                  Data Finalizacao
                </Label>
                <AvInput
                  id="pesquisa-dataFinalizacao"
                  type="datetime-local"
                  className="form-control"
                  name="dataFinalizacao"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.pesquisaEntity.dataFinalizacao)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="situacaoLabel" for="pesquisa-situacao">
                  Situacao
                </Label>
                <AvInput
                  id="pesquisa-situacao"
                  type="select"
                  className="form-control"
                  name="situacao"
                  value={(!isNew && pesquisaEntity.situacao) || 'AGUARDANDO'}
                >
                  <option value="AGUARDANDO">AGUARDANDO</option>
                  <option value="COLETANDO">COLETANDO</option>
                  <option value="SUCESSO">SUCESSO</option>
                  <option value="ERRO">ERRO</option>
                  <option value="CANCELADA">CANCELADA</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="observacoesLabel" for="pesquisa-observacoes">
                  Observacoes
                </Label>
                <AvField id="pesquisa-observacoes" type="text" name="observacoes" />
              </AvGroup>
              <AvGroup>
                <Label id="csvTotalLabel" for="pesquisa-csvTotal">
                  Csv Total
                </Label>
                <AvField id="pesquisa-csvTotal" type="string" className="form-control" name="csvTotal" />
              </AvGroup>
              <AvGroup>
                <Label id="csvVerificadosLabel" for="pesquisa-csvVerificados">
                  Csv Verificados
                </Label>
                <AvField id="pesquisa-csvVerificados" type="string" className="form-control" name="csvVerificados" />
              </AvGroup>
              <AvGroup check>
                <Label id="comarcaPorComarcaLabel">
                  <AvInput id="pesquisa-comarcaPorComarca" type="checkbox" className="form-check-input" name="comarcaPorComarca" />
                  Comarca Por Comarca
                </Label>
              </AvGroup>
              <AvGroup>
                <Label for="pesquisa-user">User</Label>
                <AvInput id="pesquisa-user" type="select" className="form-control" name="userId">
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="pesquisa-processo">Processo</Label>
                <AvInput
                  id="pesquisa-processo"
                  type="select"
                  multiple
                  className="form-control"
                  name="processos"
                  value={pesquisaEntity.processos && pesquisaEntity.processos.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {processos
                    ? processos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="pesquisa-comarcas">Comarcas</Label>
                <AvInput id="pesquisa-comarcas" type="select" className="form-control" name="comarcasId">
                  <option value="" key="0" />
                  {comarcas
                    ? comarcas.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="pesquisa-estado">Estado</Label>
                <AvInput id="pesquisa-estado" type="select" className="form-control" name="estadoId">
                  <option value="" key="0" />
                  {estados
                    ? estados.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/pesquisa" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  processos: storeState.processo.entities,
  comarcas: storeState.comarca.entities,
  estados: storeState.estado.entities,
  pesquisaEntity: storeState.pesquisa.entity,
  loading: storeState.pesquisa.loading,
  updating: storeState.pesquisa.updating,
  updateSuccess: storeState.pesquisa.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getProcessos,
  getComarcas,
  getEstados,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PesquisaUpdate);
