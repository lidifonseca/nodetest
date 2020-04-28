import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
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
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPesquisaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPesquisaUpdateState {
  isNew: boolean;
  idsprocesso: any[];
  userId: string;
  comarcasId: string;
  estadoId: string;
}

export class PesquisaUpdate extends React.Component<IPesquisaUpdateProps, IPesquisaUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsprocesso: [],
      userId: '0',
      comarcasId: '0',
      estadoId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getUsers();
    this.props.getProcessos();
    this.props.getComarcas();
    this.props.getEstados();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    values.dataCriacao = convertDateTimeToServer(values.dataCriacao);
    values.dataFinalizacao = convertDateTimeToServer(values.dataFinalizacao);

    if (errors.length === 0) {
      const { pesquisaEntity } = this.props;
      const entity = {
        ...pesquisaEntity,
        ...values,
        processos: mapIdList(values.processos)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/pesquisa');
  };

  render() {
    const { pesquisaEntity, users, processos, comarcas, estados, loading, updating } = this.props;
    const { isNew } = this.state;

    const { classesIncluir, incluirMovimentacoes, descartarMovimentacoes, csv } = pesquisaEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="tjscrapperApp.pesquisa.home.createOrEditLabel">
              <Translate contentKey="tjscrapperApp.pesquisa.home.createOrEditLabel">Create or edit a Pesquisa</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : pesquisaEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="pesquisa-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="pesquisa-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nomeLabel" for="pesquisa-nome">
                    <Translate contentKey="tjscrapperApp.pesquisa.nome">Nome</Translate>
                  </Label>
                  <AvField id="pesquisa-nome" type="text" name="nome" />
                </AvGroup>
                <AvGroup>
                  <Label id="classesIncluirLabel" for="pesquisa-classesIncluir">
                    <Translate contentKey="tjscrapperApp.pesquisa.classesIncluir">Classes Incluir</Translate>
                  </Label>
                  <AvInput id="pesquisa-classesIncluir" type="textarea" name="classesIncluir" />
                </AvGroup>
                <AvGroup>
                  <Label id="incluirMovimentacoesLabel" for="pesquisa-incluirMovimentacoes">
                    <Translate contentKey="tjscrapperApp.pesquisa.incluirMovimentacoes">Incluir Movimentacoes</Translate>
                  </Label>
                  <AvInput id="pesquisa-incluirMovimentacoes" type="textarea" name="incluirMovimentacoes" />
                </AvGroup>
                <AvGroup>
                  <Label id="descartarMovimentacoesLabel" for="pesquisa-descartarMovimentacoes">
                    <Translate contentKey="tjscrapperApp.pesquisa.descartarMovimentacoes">Descartar Movimentacoes</Translate>
                  </Label>
                  <AvInput id="pesquisa-descartarMovimentacoes" type="textarea" name="descartarMovimentacoes" />
                </AvGroup>
                <AvGroup>
                  <Label id="incluirMovimentacoesAllLabel" check>
                    <AvInput
                      id="pesquisa-incluirMovimentacoesAll"
                      type="checkbox"
                      className="form-control"
                      name="incluirMovimentacoesAll"
                    />
                    <Translate contentKey="tjscrapperApp.pesquisa.incluirMovimentacoesAll">Incluir Movimentacoes All</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="anoInicialLabel" for="pesquisa-anoInicial">
                    <Translate contentKey="tjscrapperApp.pesquisa.anoInicial">Ano Inicial</Translate>
                  </Label>
                  <AvField id="pesquisa-anoInicial" type="string" className="form-control" name="anoInicial" />
                </AvGroup>
                <AvGroup>
                  <Label id="anoFinalLabel" for="pesquisa-anoFinal">
                    <Translate contentKey="tjscrapperApp.pesquisa.anoFinal">Ano Final</Translate>
                  </Label>
                  <AvField id="pesquisa-anoFinal" type="string" className="form-control" name="anoFinal" />
                </AvGroup>
                <AvGroup>
                  <Label id="csvLabel" for="pesquisa-csv">
                    <Translate contentKey="tjscrapperApp.pesquisa.csv">Csv</Translate>
                  </Label>
                  <AvInput id="pesquisa-csv" type="textarea" name="csv" />
                </AvGroup>
                <AvGroup>
                  <Label id="dataCriacaoLabel" for="pesquisa-dataCriacao">
                    <Translate contentKey="tjscrapperApp.pesquisa.dataCriacao">Data Criacao</Translate>
                  </Label>
                  <AvInput
                    id="pesquisa-dataCriacao"
                    type="datetime-local"
                    className="form-control"
                    name="dataCriacao"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.pesquisaEntity.dataCriacao)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dataFinalizacaoLabel" for="pesquisa-dataFinalizacao">
                    <Translate contentKey="tjscrapperApp.pesquisa.dataFinalizacao">Data Finalizacao</Translate>
                  </Label>
                  <AvInput
                    id="pesquisa-dataFinalizacao"
                    type="datetime-local"
                    className="form-control"
                    name="dataFinalizacao"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.pesquisaEntity.dataFinalizacao)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="situacaoLabel" for="pesquisa-situacao">
                    <Translate contentKey="tjscrapperApp.pesquisa.situacao">Situacao</Translate>
                  </Label>
                  <AvInput
                    id="pesquisa-situacao"
                    type="select"
                    className="form-control"
                    name="situacao"
                    value={(!isNew && pesquisaEntity.situacao) || 'AGUARDANDO'}
                  >
                    <option value="AGUARDANDO">{translate('tjscrapperApp.Situacao.AGUARDANDO')}</option>
                    <option value="COLETANDO">{translate('tjscrapperApp.Situacao.COLETANDO')}</option>
                    <option value="SUCESSO">{translate('tjscrapperApp.Situacao.SUCESSO')}</option>
                    <option value="ERRO">{translate('tjscrapperApp.Situacao.ERRO')}</option>
                    <option value="CANCELADA">{translate('tjscrapperApp.Situacao.CANCELADA')}</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="observacoesLabel" for="pesquisa-observacoes">
                    <Translate contentKey="tjscrapperApp.pesquisa.observacoes">Observacoes</Translate>
                  </Label>
                  <AvField id="pesquisa-observacoes" type="text" name="observacoes" />
                </AvGroup>
                <AvGroup>
                  <Label id="csvTotalLabel" for="pesquisa-csvTotal">
                    <Translate contentKey="tjscrapperApp.pesquisa.csvTotal">Csv Total</Translate>
                  </Label>
                  <AvField id="pesquisa-csvTotal" type="string" className="form-control" name="csvTotal" />
                </AvGroup>
                <AvGroup>
                  <Label id="csvVerificadosLabel" for="pesquisa-csvVerificados">
                    <Translate contentKey="tjscrapperApp.pesquisa.csvVerificados">Csv Verificados</Translate>
                  </Label>
                  <AvField id="pesquisa-csvVerificados" type="string" className="form-control" name="csvVerificados" />
                </AvGroup>
                <AvGroup>
                  <Label id="comarcaPorComarcaLabel" check>
                    <AvInput id="pesquisa-comarcaPorComarca" type="checkbox" className="form-control" name="comarcaPorComarca" />
                    <Translate contentKey="tjscrapperApp.pesquisa.comarcaPorComarca">Comarca Por Comarca</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label for="pesquisa-user">
                    <Translate contentKey="tjscrapperApp.pesquisa.user">User</Translate>
                  </Label>
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
                  <Label for="pesquisa-processo">
                    <Translate contentKey="tjscrapperApp.pesquisa.processo">Processo</Translate>
                  </Label>
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
                  <Label for="pesquisa-comarcas">
                    <Translate contentKey="tjscrapperApp.pesquisa.comarcas">Comarcas</Translate>
                  </Label>
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
                  <Label for="pesquisa-estado">
                    <Translate contentKey="tjscrapperApp.pesquisa.estado">Estado</Translate>
                  </Label>
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
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PesquisaUpdate);
