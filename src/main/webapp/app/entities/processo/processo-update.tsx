import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IComarca } from 'app/shared/model/comarca.model';
import { getEntities as getComarcas } from 'app/entities/comarca/comarca.reducer';
import { IPesquisa } from 'app/shared/model/pesquisa.model';
import { getEntities as getPesquisas } from 'app/entities/pesquisa/pesquisa.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './processo.reducer';
import { IProcesso } from 'app/shared/model/processo.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProcessoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProcessoUpdate = (props: IProcessoUpdateProps) => {
  const [comarcaId, setComarcaId] = useState('0');
  const [pesquisaId, setPesquisaId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { processoEntity, comarcas, pesquisas, loading, updating } = props;

  const { observacao, link } = processoEntity;

  const handleClose = () => {
    props.history.push('/processo' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getComarcas();
    props.getPesquisas();
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
    values.dataAtualicacao = convertDateTimeToServer(values.dataAtualicacao);
    values.dataExclusao = convertDateTimeToServer(values.dataExclusao);

    if (errors.length === 0) {
      const entity = {
        ...processoEntity,
        ...values
      };

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
          <h2 id="generadorApp.processo.home.createOrEditLabel">Create or edit a Processo</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : processoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="processo-id">ID</Label>
                  <AvInput id="processo-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="numeroLabel" for="processo-numero">
                  Numero
                </Label>
                <AvField
                  id="processo-numero"
                  type="text"
                  name="numero"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="cnpjLabel" for="processo-cnpj">
                  Cnpj
                </Label>
                <AvField
                  id="processo-cnpj"
                  type="text"
                  name="cnpj"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="razaoSocialLabel" for="processo-razaoSocial">
                  Razao Social
                </Label>
                <AvField id="processo-razaoSocial" type="text" name="razaoSocial" />
              </AvGroup>
              <AvGroup>
                <Label id="classeLabel" for="processo-classe">
                  Classe
                </Label>
                <AvField
                  id="processo-classe"
                  type="text"
                  name="classe"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="assuntoLabel" for="processo-assunto">
                  Assunto
                </Label>
                <AvField id="processo-assunto" type="text" name="assunto" />
              </AvGroup>
              <AvGroup>
                <Label id="varaLabel" for="processo-vara">
                  Vara
                </Label>
                <AvField id="processo-vara" type="text" name="vara" />
              </AvGroup>
              <AvGroup>
                <Label id="juizLabel" for="processo-juiz">
                  Juiz
                </Label>
                <AvField id="processo-juiz" type="text" name="juiz" />
              </AvGroup>
              <AvGroup>
                <Label id="dataDistribuicaoLabel" for="processo-dataDistribuicao">
                  Data Distribuicao
                </Label>
                <AvField id="processo-dataDistribuicao" type="date" className="form-control" name="dataDistribuicao" />
              </AvGroup>
              <AvGroup>
                <Label id="distribuicaoLabel" for="processo-distribuicao">
                  Distribuicao
                </Label>
                <AvField id="processo-distribuicao" type="text" name="distribuicao" />
              </AvGroup>
              <AvGroup>
                <Label id="localFisicoLabel" for="processo-localFisico">
                  Local Fisico
                </Label>
                <AvField id="processo-localFisico" type="text" name="localFisico" />
              </AvGroup>
              <AvGroup>
                <Label id="controleLabel" for="processo-controle">
                  Controle
                </Label>
                <AvField id="processo-controle" type="text" name="controle" />
              </AvGroup>
              <AvGroup>
                <Label id="areaLabel" for="processo-area">
                  Area
                </Label>
                <AvField id="processo-area" type="text" name="area" />
              </AvGroup>
              <AvGroup>
                <Label id="estadoLabel" for="processo-estado">
                  Estado
                </Label>
                <AvField
                  id="processo-estado"
                  type="text"
                  name="estado"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="observacaoLabel" for="processo-observacao">
                  Observacao
                </Label>
                <AvInput id="processo-observacao" type="textarea" name="observacao" />
              </AvGroup>
              <AvGroup check>
                <Label id="interesseLabel">
                  <AvInput id="processo-interesse" type="checkbox" className="form-check-input" name="interesse" />
                  Interesse
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="dataCriacaoLabel" for="processo-dataCriacao">
                  Data Criacao
                </Label>
                <AvInput
                  id="processo-dataCriacao"
                  type="datetime-local"
                  className="form-control"
                  name="dataCriacao"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.processoEntity.dataCriacao)}
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dataAtualicacaoLabel" for="processo-dataAtualicacao">
                  Data Atualicacao
                </Label>
                <AvInput
                  id="processo-dataAtualicacao"
                  type="datetime-local"
                  className="form-control"
                  name="dataAtualicacao"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.processoEntity.dataAtualicacao)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="dataExclusaoLabel" for="processo-dataExclusao">
                  Data Exclusao
                </Label>
                <AvInput
                  id="processo-dataExclusao"
                  type="datetime-local"
                  className="form-control"
                  name="dataExclusao"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.processoEntity.dataExclusao)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="linkLabel" for="processo-link">
                  Link
                </Label>
                <AvInput
                  id="processo-link"
                  type="textarea"
                  name="link"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="valorLabel" for="processo-valor">
                  Valor
                </Label>
                <AvField id="processo-valor" type="string" className="form-control" name="valor" />
              </AvGroup>
              <AvGroup>
                <Label id="moedaLabel" for="processo-moeda">
                  Moeda
                </Label>
                <AvField id="processo-moeda" type="text" name="moeda" />
              </AvGroup>
              <AvGroup>
                <Label for="processo-comarca">Comarca</Label>
                <AvInput id="processo-comarca" type="select" className="form-control" name="comarcaId">
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
              <Button tag={Link} id="cancel-save" to="/processo" replace color="info">
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
  comarcas: storeState.comarca.entities,
  pesquisas: storeState.pesquisa.entities,
  processoEntity: storeState.processo.entity,
  loading: storeState.processo.loading,
  updating: storeState.processo.updating,
  updateSuccess: storeState.processo.updateSuccess
});

const mapDispatchToProps = {
  getComarcas,
  getPesquisas,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProcessoUpdate);
