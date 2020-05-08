import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { getEntities as getUnidadeEasies } from 'app/entities/unidade-easy/unidade-easy.reducer';
import {
  IAtendimentoUpdateState,
  getEntity,
  getAtendimentoState,
  IAtendimentoBaseState,
  updateEntity,
  createEntity,
  reset
} from './atendimento.reducer';
import { IAtendimento } from 'app/shared/model/atendimento.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAtendimentoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AtendimentoUpdate extends React.Component<IAtendimentoUpdateProps, IAtendimentoUpdateState> {
  constructor(props: Readonly<IAtendimentoUpdateProps>) {
    super(props);

    this.state = {
      unidadeEasySelectValue: null,
      fieldsBase: getAtendimentoState(this.props.location),
      unidadeId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }

    if (
      nextProps.unidadeEasies.length > 0 &&
      this.state.unidadeEasySelectValue === null &&
      nextProps.atendimentoEntity.unidadeEasy &&
      nextProps.atendimentoEntity.unidadeEasy.id
    ) {
      this.setState({
        unidadeEasySelectValue: nextProps.unidadeEasies.map(p =>
          nextProps.atendimentoEntity.unidadeEasy.id === p.id ? { value: p.id, label: p.razaoSocial } : null
        )
      });
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getUnidadeEasies();
  }

  getFiltersURL = (offset = null) => {
    const fieldsBase = this.state.fieldsBase;
    let url = '_back=1' + (offset !== null ? '&offset=' + offset : '');
    Object.keys(fieldsBase).map(key => {
      url += '&' + key + '=' + fieldsBase[key];
    });
    return url;
  };
  saveEntity = (event: any, errors: any, values: any) => {
    values.dataAgenda = convertDateTimeToServer(values.dataAgenda);
    values.dataChegada = convertDateTimeToServer(values.dataChegada);
    values.dataSaida = convertDateTimeToServer(values.dataSaida);
    values.dataForaHora = convertDateTimeToServer(values.dataForaHora);

    if (errors.length === 0) {
      const { atendimentoEntity } = this.props;
      const entity = {
        ...atendimentoEntity,
        unidadeEasy: this.state.unidadeEasySelectValue ? this.state.unidadeEasySelectValue['value'] : null,
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
    this.props.history.push('/atendimento?' + this.getFiltersURL());
  };

  render() {
    const { atendimentoEntity, unidadeEasies, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...atendimentoEntity,
                  unidade: atendimentoEntity.unidade ? atendimentoEntity.unidade.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.atendimento.home.createOrEditLabel">Create or edit a Atendimento</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/atendimento?' + this.getFiltersURL()}
              replace
              color="info"
              className="float-right jh-create-entity"
            >
              <FontAwesomeIcon icon="arrow-left" />
              &nbsp;
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.back">Back</Translate>
              </span>
            </Button>
          </h2>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Inicio</Link>
            </li>
            <li className="breadcrumb-item active">Atendimentos</li>
            <li className="breadcrumb-item active">Atendimentos edit</li>
          </ol>

          <Panel>
            <PanelBody>
              <Row className="justify-content-center">
                <Col md="8">
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <div>
                      {!isNew ? (
                        <AvGroup>
                          <Row>
                            {/*
                      <Col md="3">
                      <Label className="mt-2" for="atendimento-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="atendimento-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <IdFranquiaComponentUpdate baseFilters />

                        <IdProfissionalComponentUpdate baseFilters />

                        <CepComponentUpdate baseFilters />

                        <EnderecoComponentUpdate baseFilters />

                        <NumeroComponentUpdate baseFilters />

                        <ComplementoComponentUpdate baseFilters />

                        <BairroComponentUpdate baseFilters />

                        <CidadeComponentUpdate baseFilters />

                        <UfComponentUpdate baseFilters />

                        <LatitudeComponentUpdate baseFilters />

                        <LongitudeComponentUpdate baseFilters />

                        <DataAgendaComponentUpdate baseFilters />

                        <HorarioComponentUpdate baseFilters />

                        <DataChegadaComponentUpdate baseFilters />

                        <LatitudeChegadaComponentUpdate baseFilters />

                        <LongitudeChegadaComponentUpdate baseFilters />

                        <DataSaidaComponentUpdate baseFilters />

                        <LatitudeSaidaComponentUpdate baseFilters />

                        <LongitudeSaidaComponentUpdate baseFilters />

                        <EvolucaoComponentUpdate baseFilters />

                        <ObservacaoComponentUpdate baseFilters />

                        <IntercorrenciaComponentUpdate baseFilters />

                        <AvaliacaoComponentUpdate baseFilters />

                        <AceitoComponentUpdate baseFilters />

                        <MotivoComponentUpdate baseFilters />

                        <ValorComponentUpdate baseFilters />

                        <OrdemAtendimentoComponentUpdate baseFilters />

                        <AtivoComponentUpdate baseFilters />

                        <DataForaHoraComponentUpdate baseFilters />

                        <IdUsuarioCancelamentoComponentUpdate baseFilters />

                        <DataCancelamentoComponentUpdate baseFilters />

                        <TipoUsuarioCancelamentoComponentUpdate baseFilters />

                        <ConfidencialProfissionalComponentUpdate baseFilters />

                        <ConfidencialPacienteComponentUpdate baseFilters />

                        <ImagemAssinaturaComponentUpdate baseFilters />

                        <UnidadeComponentUpdate baseFilter unidadeEasies />
                      </Row>
                    </div>
                  )}
                </Col>
              </Row>
            </PanelBody>
          </Panel>
        </AvForm>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  unidadeEasies: storeState.unidadeEasy.entities,
  atendimentoEntity: storeState.atendimento.entity,
  loading: storeState.atendimento.loading,
  updating: storeState.atendimento.updating,
  updateSuccess: storeState.atendimento.updateSuccess
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const IdFranquiaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'idFranquia' ? (
    <Col md="idFranquia">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="idFranquiaLabel" for="atendimento-idFranquia">
              <Translate contentKey="generadorApp.atendimento.idFranquia">Id Franquia</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="atendimento-idFranquia" type="text" name="idFranquia" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="idFranquia" value={this.state.fieldsBase[baseFilters]} />
  );
};

const IdProfissionalComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'idProfissional' ? (
    <Col md="idProfissional">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="idProfissionalLabel" for="atendimento-idProfissional">
              <Translate contentKey="generadorApp.atendimento.idProfissional">Id Profissional</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="atendimento-idProfissional" type="text" name="idProfissional" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="idProfissional" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CepComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cep' ? (
    <Col md="cep">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="cepLabel" for="atendimento-cep">
              <Translate contentKey="generadorApp.atendimento.cep">Cep</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="atendimento-cep" type="text" name="cep" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="cep" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EnderecoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'endereco' ? (
    <Col md="endereco">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="enderecoLabel" for="atendimento-endereco">
              <Translate contentKey="generadorApp.atendimento.endereco">Endereco</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="atendimento-endereco" type="text" name="endereco" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="endereco" value={this.state.fieldsBase[baseFilters]} />
  );
};

const NumeroComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'numero' ? (
    <Col md="numero">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="numeroLabel" for="atendimento-numero">
              <Translate contentKey="generadorApp.atendimento.numero">Numero</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="atendimento-numero" type="text" name="numero" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="numero" value={this.state.fieldsBase[baseFilters]} />
  );
};

const ComplementoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'complemento' ? (
    <Col md="complemento">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="complementoLabel" for="atendimento-complemento">
              <Translate contentKey="generadorApp.atendimento.complemento">Complemento</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="atendimento-complemento" type="text" name="complemento" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="complemento" value={this.state.fieldsBase[baseFilters]} />
  );
};

const BairroComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'bairro' ? (
    <Col md="bairro">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="bairroLabel" for="atendimento-bairro">
              <Translate contentKey="generadorApp.atendimento.bairro">Bairro</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="atendimento-bairro" type="text" name="bairro" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="bairro" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CidadeComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cidade' ? (
    <Col md="cidade">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="cidadeLabel" for="atendimento-cidade">
              <Translate contentKey="generadorApp.atendimento.cidade">Cidade</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="atendimento-cidade" type="text" name="cidade" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="cidade" value={this.state.fieldsBase[baseFilters]} />
  );
};

const UfComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'uf' ? (
    <Col md="uf">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="ufLabel" for="atendimento-uf">
              <Translate contentKey="generadorApp.atendimento.uf">Uf</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="atendimento-uf" type="text" name="uf" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="uf" value={this.state.fieldsBase[baseFilters]} />
  );
};

const LatitudeComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'latitude' ? (
    <Col md="latitude">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="latitudeLabel" for="atendimento-latitude">
              <Translate contentKey="generadorApp.atendimento.latitude">Latitude</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="atendimento-latitude" type="text" name="latitude" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="latitude" value={this.state.fieldsBase[baseFilters]} />
  );
};

const LongitudeComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'longitude' ? (
    <Col md="longitude">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="longitudeLabel" for="atendimento-longitude">
              <Translate contentKey="generadorApp.atendimento.longitude">Longitude</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="atendimento-longitude" type="text" name="longitude" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="longitude" value={this.state.fieldsBase[baseFilters]} />
  );
};

const DataAgendaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'dataAgenda' ? (
    <Col md="dataAgenda">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="dataAgendaLabel" for="atendimento-dataAgenda">
              <Translate contentKey="generadorApp.atendimento.dataAgenda">Data Agenda</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvInput
              id="atendimento-dataAgenda"
              type="datetime-local"
              className="form-control"
              name="dataAgenda"
              placeholder={'YYYY-MM-DD HH:mm'}
              value={isNew ? null : convertDateTimeFromServer(this.props.atendimentoEntity.dataAgenda)}
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="dataAgenda" value={this.state.fieldsBase[baseFilters]} />
  );
};

const HorarioComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'horario' ? (
    <Col md="horario">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="horarioLabel" for="atendimento-horario">
              <Translate contentKey="generadorApp.atendimento.horario">Horario</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="atendimento-horario" type="text" name="horario" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="horario" value={this.state.fieldsBase[baseFilters]} />
  );
};

const DataChegadaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'dataChegada' ? (
    <Col md="dataChegada">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="dataChegadaLabel" for="atendimento-dataChegada">
              <Translate contentKey="generadorApp.atendimento.dataChegada">Data Chegada</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvInput
              id="atendimento-dataChegada"
              type="datetime-local"
              className="form-control"
              name="dataChegada"
              placeholder={'YYYY-MM-DD HH:mm'}
              value={isNew ? null : convertDateTimeFromServer(this.props.atendimentoEntity.dataChegada)}
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="dataChegada" value={this.state.fieldsBase[baseFilters]} />
  );
};

const LatitudeChegadaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'latitudeChegada' ? (
    <Col md="latitudeChegada">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="latitudeChegadaLabel" for="atendimento-latitudeChegada">
              <Translate contentKey="generadorApp.atendimento.latitudeChegada">Latitude Chegada</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="atendimento-latitudeChegada" type="text" name="latitudeChegada" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="latitudeChegada" value={this.state.fieldsBase[baseFilters]} />
  );
};

const LongitudeChegadaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'longitudeChegada' ? (
    <Col md="longitudeChegada">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="longitudeChegadaLabel" for="atendimento-longitudeChegada">
              <Translate contentKey="generadorApp.atendimento.longitudeChegada">Longitude Chegada</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="atendimento-longitudeChegada" type="text" name="longitudeChegada" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="longitudeChegada" value={this.state.fieldsBase[baseFilters]} />
  );
};

const DataSaidaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'dataSaida' ? (
    <Col md="dataSaida">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="dataSaidaLabel" for="atendimento-dataSaida">
              <Translate contentKey="generadorApp.atendimento.dataSaida">Data Saida</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvInput
              id="atendimento-dataSaida"
              type="datetime-local"
              className="form-control"
              name="dataSaida"
              placeholder={'YYYY-MM-DD HH:mm'}
              value={isNew ? null : convertDateTimeFromServer(this.props.atendimentoEntity.dataSaida)}
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="dataSaida" value={this.state.fieldsBase[baseFilters]} />
  );
};

const LatitudeSaidaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'latitudeSaida' ? (
    <Col md="latitudeSaida">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="latitudeSaidaLabel" for="atendimento-latitudeSaida">
              <Translate contentKey="generadorApp.atendimento.latitudeSaida">Latitude Saida</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="atendimento-latitudeSaida" type="text" name="latitudeSaida" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="latitudeSaida" value={this.state.fieldsBase[baseFilters]} />
  );
};

const LongitudeSaidaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'longitudeSaida' ? (
    <Col md="longitudeSaida">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="longitudeSaidaLabel" for="atendimento-longitudeSaida">
              <Translate contentKey="generadorApp.atendimento.longitudeSaida">Longitude Saida</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="atendimento-longitudeSaida" type="text" name="longitudeSaida" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="longitudeSaida" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EvolucaoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'evolucao' ? (
    <Col md="evolucao">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="evolucaoLabel" for="atendimento-evolucao">
              <Translate contentKey="generadorApp.atendimento.evolucao">Evolucao</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="atendimento-evolucao" type="text" name="evolucao" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="evolucao" value={this.state.fieldsBase[baseFilters]} />
  );
};

const ObservacaoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'observacao' ? (
    <Col md="observacao">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="observacaoLabel" for="atendimento-observacao">
              <Translate contentKey="generadorApp.atendimento.observacao">Observacao</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="atendimento-observacao" type="text" name="observacao" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="observacao" value={this.state.fieldsBase[baseFilters]} />
  );
};

const IntercorrenciaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'intercorrencia' ? (
    <Col md="intercorrencia">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="intercorrenciaLabel" for="atendimento-intercorrencia">
              <Translate contentKey="generadorApp.atendimento.intercorrencia">Intercorrencia</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="atendimento-intercorrencia" type="string" className="form-control" name="intercorrencia" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="intercorrencia" value={this.state.fieldsBase[baseFilters]} />
  );
};

const AvaliacaoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'avaliacao' ? (
    <Col md="avaliacao">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="avaliacaoLabel" for="atendimento-avaliacao">
              <Translate contentKey="generadorApp.atendimento.avaliacao">Avaliacao</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="atendimento-avaliacao" type="string" className="form-control" name="avaliacao" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="avaliacao" value={this.state.fieldsBase[baseFilters]} />
  );
};

const AceitoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'aceito' ? (
    <Col md="aceito">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="aceitoLabel" for="atendimento-aceito">
              <Translate contentKey="generadorApp.atendimento.aceito">Aceito</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="atendimento-aceito" type="string" className="form-control" name="aceito" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="aceito" value={this.state.fieldsBase[baseFilters]} />
  );
};

const MotivoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'motivo' ? (
    <Col md="motivo">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="motivoLabel" for="atendimento-motivo">
              <Translate contentKey="generadorApp.atendimento.motivo">Motivo</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="atendimento-motivo" type="text" name="motivo" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="motivo" value={this.state.fieldsBase[baseFilters]} />
  );
};

const ValorComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'valor' ? (
    <Col md="valor">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="valorLabel" for="atendimento-valor">
              <Translate contentKey="generadorApp.atendimento.valor">Valor</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="atendimento-valor" type="string" className="form-control" name="valor" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="valor" value={this.state.fieldsBase[baseFilters]} />
  );
};

const OrdemAtendimentoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ordemAtendimento' ? (
    <Col md="ordemAtendimento">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="ordemAtendimentoLabel" for="atendimento-ordemAtendimento">
              <Translate contentKey="generadorApp.atendimento.ordemAtendimento">Ordem Atendimento</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="atendimento-ordemAtendimento" type="string" className="form-control" name="ordemAtendimento" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="ordemAtendimento" value={this.state.fieldsBase[baseFilters]} />
  );
};

const AtivoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ativo' ? (
    <Col md="ativo">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="ativoLabel" for="atendimento-ativo">
              <Translate contentKey="generadorApp.atendimento.ativo">Ativo</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="atendimento-ativo" type="string" className="form-control" name="ativo" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
  );
};

const DataForaHoraComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'dataForaHora' ? (
    <Col md="dataForaHora">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="dataForaHoraLabel" for="atendimento-dataForaHora">
              <Translate contentKey="generadorApp.atendimento.dataForaHora">Data Fora Hora</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvInput
              id="atendimento-dataForaHora"
              type="datetime-local"
              className="form-control"
              name="dataForaHora"
              placeholder={'YYYY-MM-DD HH:mm'}
              value={isNew ? null : convertDateTimeFromServer(this.props.atendimentoEntity.dataForaHora)}
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="dataForaHora" value={this.state.fieldsBase[baseFilters]} />
  );
};

const IdUsuarioCancelamentoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'idUsuarioCancelamento' ? (
    <Col md="idUsuarioCancelamento">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="idUsuarioCancelamentoLabel" for="atendimento-idUsuarioCancelamento">
              <Translate contentKey="generadorApp.atendimento.idUsuarioCancelamento">Id Usuario Cancelamento</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="atendimento-idUsuarioCancelamento" type="string" className="form-control" name="idUsuarioCancelamento" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="idUsuarioCancelamento" value={this.state.fieldsBase[baseFilters]} />
  );
};

const DataCancelamentoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'dataCancelamento' ? (
    <Col md="dataCancelamento">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="dataCancelamentoLabel" for="atendimento-dataCancelamento">
              <Translate contentKey="generadorApp.atendimento.dataCancelamento">Data Cancelamento</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="atendimento-dataCancelamento" type="date" className="form-control" name="dataCancelamento" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="dataCancelamento" value={this.state.fieldsBase[baseFilters]} />
  );
};

const TipoUsuarioCancelamentoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'tipoUsuarioCancelamento' ? (
    <Col md="tipoUsuarioCancelamento">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="tipoUsuarioCancelamentoLabel" for="atendimento-tipoUsuarioCancelamento">
              <Translate contentKey="generadorApp.atendimento.tipoUsuarioCancelamento">Tipo Usuario Cancelamento</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="atendimento-tipoUsuarioCancelamento" type="text" name="tipoUsuarioCancelamento" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="tipoUsuarioCancelamento" value={this.state.fieldsBase[baseFilters]} />
  );
};

const ConfidencialProfissionalComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'confidencialProfissional' ? (
    <Col md="confidencialProfissional">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="confidencialProfissionalLabel" for="atendimento-confidencialProfissional">
              <Translate contentKey="generadorApp.atendimento.confidencialProfissional">Confidencial Profissional</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="atendimento-confidencialProfissional" type="text" name="confidencialProfissional" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="confidencialProfissional" value={this.state.fieldsBase[baseFilters]} />
  );
};

const ConfidencialPacienteComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'confidencialPaciente' ? (
    <Col md="confidencialPaciente">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="confidencialPacienteLabel" for="atendimento-confidencialPaciente">
              <Translate contentKey="generadorApp.atendimento.confidencialPaciente">Confidencial Paciente</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="atendimento-confidencialPaciente" type="text" name="confidencialPaciente" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="confidencialPaciente" value={this.state.fieldsBase[baseFilters]} />
  );
};

const ImagemAssinaturaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'imagemAssinatura' ? (
    <Col md="imagemAssinatura">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="imagemAssinaturaLabel" for="atendimento-imagemAssinatura">
              <Translate contentKey="generadorApp.atendimento.imagemAssinatura">Imagem Assinatura</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="atendimento-imagemAssinatura" type="text" name="imagemAssinatura" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="imagemAssinatura" value={this.state.fieldsBase[baseFilters]} />
  );
};

const UnidadeComponentUpdate = ({ baseFilters, unidadeEasies }) => {
  return baseFilters !== 'unidade' ? (
    <Col md="12">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" for="atendimento-unidade">
              <Translate contentKey="generadorApp.atendimento.unidade">Unidade</Translate>
            </Label>
          </Col>
          <Col md="9">
            <Select
              id="atendimento-unidade"
              className={'css-select-control'}
              value={this.state.unidadeEasySelectValue}
              options={unidadeEasies ? unidadeEasies.map(option => ({ value: option.id, label: option.razaoSocial })) : null}
              onChange={options => this.setState({ unidadeEasySelectValue: options })}
              name={'unidade'}
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="unidade" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AtendimentoUpdate);
