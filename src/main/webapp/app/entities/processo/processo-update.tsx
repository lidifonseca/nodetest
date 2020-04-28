import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IComarca } from 'app/shared/model/comarca.model';
import { getEntities as getComarcas } from 'app/entities/comarca/comarca.reducer';
import { IPesquisa } from 'app/shared/model/pesquisa.model';
import { getEntities as getPesquisas } from 'app/entities/pesquisa/pesquisa.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './processo.reducer';
import { IProcesso } from 'app/shared/model/processo.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProcessoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IProcessoUpdateState {
  isNew: boolean;
  comarcaId: string;
  pesquisaId: string;
}

export class ProcessoUpdate extends React.Component<IProcessoUpdateProps, IProcessoUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      comarcaId: '0',
      pesquisaId: '0',
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
      // this.props.getEntity(this.props.match.params.id);
    }

    this.props.getComarcas();
    this.props.getPesquisas();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    values.dataCriacao = convertDateTimeToServer(values.dataCriacao);
    values.dataAtualicacao = convertDateTimeToServer(values.dataAtualicacao);
    values.dataExclusao = convertDateTimeToServer(values.dataExclusao);

    if (errors.length === 0) {
      const { processoEntity } = this.props;
      const entity = {
        ...processoEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/processo');
  };

  render() {
    const { processoEntity, comarcas, pesquisas, loading, updating } = this.props;
    const { isNew } = this.state;

    const { observacao, link } = processoEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="tjscrapperApp.processo.home.createOrEditLabel">
              <Translate contentKey="tjscrapperApp.processo.home.createOrEditLabel">Create or edit a Processo</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : processoEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="processo-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="processo-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="numeroLabel" for="processo-numero">
                    <Translate contentKey="tjscrapperApp.processo.numero">Numero</Translate>
                  </Label>
                  <AvField
                    id="processo-numero"
                    type="text"
                    name="numero"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="cnpjLabel" for="processo-cnpj">
                    <Translate contentKey="tjscrapperApp.processo.cnpj">Cnpj</Translate>
                  </Label>
                  <AvField
                    id="processo-cnpj"
                    type="text"
                    name="cnpj"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="razaoSocialLabel" for="processo-razaoSocial">
                    <Translate contentKey="tjscrapperApp.processo.razaoSocial">Razao Social</Translate>
                  </Label>
                  <AvField id="processo-razaoSocial" type="text" name="razaoSocial" />
                </AvGroup>
                <AvGroup>
                  <Label id="classeLabel" for="processo-classe">
                    <Translate contentKey="tjscrapperApp.processo.classe">Classe</Translate>
                  </Label>
                  <AvField
                    id="processo-classe"
                    type="text"
                    name="classe"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="assuntoLabel" for="processo-assunto">
                    <Translate contentKey="tjscrapperApp.processo.assunto">Assunto</Translate>
                  </Label>
                  <AvField id="processo-assunto" type="text" name="assunto" />
                </AvGroup>
                <AvGroup>
                  <Label id="varaLabel" for="processo-vara">
                    <Translate contentKey="tjscrapperApp.processo.vara">Vara</Translate>
                  </Label>
                  <AvField id="processo-vara" type="text" name="vara" />
                </AvGroup>
                <AvGroup>
                  <Label id="juizLabel" for="processo-juiz">
                    <Translate contentKey="tjscrapperApp.processo.juiz">Juiz</Translate>
                  </Label>
                  <AvField id="processo-juiz" type="text" name="juiz" />
                </AvGroup>
                <AvGroup>
                  <Label id="dataDistribuicaoLabel" for="processo-dataDistribuicao">
                    <Translate contentKey="tjscrapperApp.processo.dataDistribuicao">Data Distribuicao</Translate>
                  </Label>
                  <AvField id="processo-dataDistribuicao" type="date" className="form-control" name="dataDistribuicao" />
                </AvGroup>
                <AvGroup>
                  <Label id="distribuicaoLabel" for="processo-distribuicao">
                    <Translate contentKey="tjscrapperApp.processo.distribuicao">Distribuicao</Translate>
                  </Label>
                  <AvField id="processo-distribuicao" type="text" name="distribuicao" />
                </AvGroup>
                <AvGroup>
                  <Label id="localFisicoLabel" for="processo-localFisico">
                    <Translate contentKey="tjscrapperApp.processo.localFisico">Local Fisico</Translate>
                  </Label>
                  <AvField id="processo-localFisico" type="text" name="localFisico" />
                </AvGroup>
                <AvGroup>
                  <Label id="controleLabel" for="processo-controle">
                    <Translate contentKey="tjscrapperApp.processo.controle">Controle</Translate>
                  </Label>
                  <AvField id="processo-controle" type="text" name="controle" />
                </AvGroup>
                <AvGroup>
                  <Label id="areaLabel" for="processo-area">
                    <Translate contentKey="tjscrapperApp.processo.area">Area</Translate>
                  </Label>
                  <AvField id="processo-area" type="text" name="area" />
                </AvGroup>
                <AvGroup>
                  <Label id="estadoLabel" for="processo-estado">
                    <Translate contentKey="tjscrapperApp.processo.estado">Estado</Translate>
                  </Label>
                  <AvField
                    id="processo-estado"
                    type="text"
                    name="estado"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="observacaoLabel" for="processo-observacao">
                    <Translate contentKey="tjscrapperApp.processo.observacao">Observacao</Translate>
                  </Label>
                  <AvInput id="processo-observacao" type="textarea" name="observacao" />
                </AvGroup>
                <AvGroup>
                  <Label id="interesseLabel" check>
                    <AvInput id="processo-interesse" type="checkbox" className="form-control" name="interesse" />
                    <Translate contentKey="tjscrapperApp.processo.interesse">Interesse</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="dataCriacaoLabel" for="processo-dataCriacao">
                    <Translate contentKey="tjscrapperApp.processo.dataCriacao">Data Criacao</Translate>
                  </Label>
                  <AvInput
                    id="processo-dataCriacao"
                    type="datetime-local"
                    className="form-control"
                    name="dataCriacao"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.processoEntity.dataCriacao)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dataAtualicacaoLabel" for="processo-dataAtualicacao">
                    <Translate contentKey="tjscrapperApp.processo.dataAtualicacao">Data Atualicacao</Translate>
                  </Label>
                  <AvInput
                    id="processo-dataAtualicacao"
                    type="datetime-local"
                    className="form-control"
                    name="dataAtualicacao"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.processoEntity.dataAtualicacao)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dataExclusaoLabel" for="processo-dataExclusao">
                    <Translate contentKey="tjscrapperApp.processo.dataExclusao">Data Exclusao</Translate>
                  </Label>
                  <AvInput
                    id="processo-dataExclusao"
                    type="datetime-local"
                    className="form-control"
                    name="dataExclusao"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.processoEntity.dataExclusao)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="linkLabel" for="processo-link">
                    <Translate contentKey="tjscrapperApp.processo.link">Link</Translate>
                  </Label>
                  <AvInput
                    id="processo-link"
                    type="textarea"
                    name="link"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="valorLabel" for="processo-valor">
                    <Translate contentKey="tjscrapperApp.processo.valor">Valor</Translate>
                  </Label>
                  <AvField id="processo-valor" type="string" className="form-control" name="valor" />
                </AvGroup>
                <AvGroup>
                  <Label id="moedaLabel" for="processo-moeda">
                    <Translate contentKey="tjscrapperApp.processo.moeda">Moeda</Translate>
                  </Label>
                  <AvField id="processo-moeda" type="text" name="moeda" />
                </AvGroup>
                <AvGroup>
                  <Label for="processo-comarca">
                    <Translate contentKey="tjscrapperApp.processo.comarca">Comarca</Translate>
                  </Label>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProcessoUpdate);
