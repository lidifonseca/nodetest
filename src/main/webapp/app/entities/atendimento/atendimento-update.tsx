import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { getEntities as getUnidadeEasies } from 'app/entities/unidade-easy/unidade-easy.reducer';
import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';
import { IOperadora } from 'app/shared/model/operadora.model';
import { getEntities as getOperadoras } from 'app/entities/operadora/operadora.reducer';
import { IEspecialidade } from 'app/shared/model/especialidade.model';
import { getEntities as getEspecialidades } from 'app/entities/especialidade/especialidade.reducer';
import { IPadItem } from 'app/shared/model/pad-item.model';
import { getEntities as getPadItems } from 'app/entities/pad-item/pad-item.reducer';
import { IStatusAtendimento } from 'app/shared/model/status-atendimento.model';
import { getEntities as getStatusAtendimentos } from 'app/entities/status-atendimento/status-atendimento.reducer';
import { IPeriodo } from 'app/shared/model/periodo.model';
import { getEntities as getPeriodos } from 'app/entities/periodo/periodo.reducer';
import { ICidade } from 'app/shared/model/cidade.model';
import { getEntities as getCidades } from 'app/entities/cidade/cidade.reducer';
import { getEntity, updateEntity, createEntity, reset } from './atendimento.reducer';
import { IAtendimento } from 'app/shared/model/atendimento.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAtendimentoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAtendimentoUpdateState {
  isNew: boolean;
  unidadeId: string;
  idPacienteId: string;
  idOperadoraId: string;
  idEspecialidadeId: string;
  idPadItemId: string;
  idStatusAtendimentoId: string;
  idPeriodoId: string;
  idCidadeId: string;
}

export class AtendimentoUpdate extends React.Component<IAtendimentoUpdateProps, IAtendimentoUpdateState> {
  constructor(props: Readonly<IAtendimentoUpdateProps>) {
    super(props);
    this.state = {
      unidadeId: '0',
      idPacienteId: '0',
      idOperadoraId: '0',
      idEspecialidadeId: '0',
      idPadItemId: '0',
      idStatusAtendimentoId: '0',
      idPeriodoId: '0',
      idCidadeId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  componentDidUpdate(nextProps, nextState) {
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

    this.props.getUnidadeEasies();
    this.props.getPacientes();
    this.props.getOperadoras();
    this.props.getEspecialidades();
    this.props.getPadItems();
    this.props.getStatusAtendimentos();
    this.props.getPeriodos();
    this.props.getCidades();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    values.dataAgenda = convertDateTimeToServer(values.dataAgenda);
    values.dataChegada = convertDateTimeToServer(values.dataChegada);
    values.dataSaida = convertDateTimeToServer(values.dataSaida);
    values.dataForaHora = convertDateTimeToServer(values.dataForaHora);

    if (errors.length === 0) {
      const { atendimentoEntity } = this.props;
      const entity = {
        ...atendimentoEntity,
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
    this.props.history.push('/atendimento');
  };

  render() {
    const {
      atendimentoEntity,
      unidadeEasies,
      pacientes,
      operadoras,
      especialidades,
      padItems,
      statusAtendimentos,
      periodos,
      cidades,
      loading,
      updating
    } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Atendimentos</li>
          <li className="breadcrumb-item active">Atendimentos edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...atendimentoEntity,
                  unidade: atendimentoEntity.unidade ? atendimentoEntity.unidade.id : null,
                  idPaciente: atendimentoEntity.idPaciente ? atendimentoEntity.idPaciente.id : null,
                  idOperadora: atendimentoEntity.idOperadora ? atendimentoEntity.idOperadora.id : null,
                  idEspecialidade: atendimentoEntity.idEspecialidade ? atendimentoEntity.idEspecialidade.id : null,
                  idPadItem: atendimentoEntity.idPadItem ? atendimentoEntity.idPadItem.id : null,
                  idStatusAtendimento: atendimentoEntity.idStatusAtendimento ? atendimentoEntity.idStatusAtendimento.id : null,
                  idPeriodo: atendimentoEntity.idPeriodo ? atendimentoEntity.idPeriodo.id : null,
                  idCidade: atendimentoEntity.idCidade ? atendimentoEntity.idCidade.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.atendimento.home.createOrEditLabel">Create or edit a Atendimento</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/atendimento" replace color="info" className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
              </h2>
            </PanelHeader>
            <PanelBody>
              <Row className="justify-content-center">
                <Col md="8">
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <Row>
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="idUsuarioCancelamentoLabel" for="atendimento-idUsuarioCancelamento">
                                <Translate contentKey="generadorApp.atendimento.idUsuarioCancelamento">Id Usuario Cancelamento</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="atendimento-idUsuarioCancelamento"
                                type="string"
                                className="form-control"
                                name="idUsuarioCancelamento"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
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

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="tipoUsuarioCancelamentoLabel" for="atendimento-tipoUsuarioCancelamento">
                                <Translate contentKey="generadorApp.atendimento.tipoUsuarioCancelamento">
                                  Tipo Usuario Cancelamento
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="atendimento-tipoUsuarioCancelamento" type="text" name="tipoUsuarioCancelamento" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="confidencialProfissionalLabel" for="atendimento-confidencialProfissional">
                                <Translate contentKey="generadorApp.atendimento.confidencialProfissional">
                                  Confidencial Profissional
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="atendimento-confidencialProfissional" type="text" name="confidencialProfissional" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
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

                      <Col md="12">
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
                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" for="atendimento-unidade">
                                <Translate contentKey="generadorApp.atendimento.unidade">Unidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="atendimento-unidade" type="select" className="form-control" name="unidade">
                                <option value="null" key="0">
                                  {translate('generadorApp.atendimento.unidade.empty')}
                                </option>
                                {unidadeEasies
                                  ? unidadeEasies.map(otherEntity => (
                                      <option value={otherEntity.id} key={otherEntity.id}>
                                        {otherEntity.razaoSocial}
                                      </option>
                                    ))
                                  : null}
                              </AvInput>
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" for="atendimento-idPaciente">
                                <Translate contentKey="generadorApp.atendimento.idPaciente">Id Paciente</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="atendimento-idPaciente" type="select" className="form-control" name="idPaciente">
                                <option value="null" key="0">
                                  {translate('generadorApp.atendimento.idPaciente.empty')}
                                </option>
                                {pacientes
                                  ? pacientes.map(otherEntity => (
                                      <option value={otherEntity.id} key={otherEntity.id}>
                                        {otherEntity.id}
                                      </option>
                                    ))
                                  : null}
                              </AvInput>
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" for="atendimento-idOperadora">
                                <Translate contentKey="generadorApp.atendimento.idOperadora">Id Operadora</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="atendimento-idOperadora" type="select" className="form-control" name="idOperadora">
                                <option value="null" key="0">
                                  {translate('generadorApp.atendimento.idOperadora.empty')}
                                </option>
                                {operadoras
                                  ? operadoras.map(otherEntity => (
                                      <option value={otherEntity.id} key={otherEntity.id}>
                                        {otherEntity.id}
                                      </option>
                                    ))
                                  : null}
                              </AvInput>
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" for="atendimento-idEspecialidade">
                                <Translate contentKey="generadorApp.atendimento.idEspecialidade">Id Especialidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="atendimento-idEspecialidade" type="select" className="form-control" name="idEspecialidade">
                                <option value="null" key="0">
                                  {translate('generadorApp.atendimento.idEspecialidade.empty')}
                                </option>
                                {especialidades
                                  ? especialidades.map(otherEntity => (
                                      <option value={otherEntity.id} key={otherEntity.id}>
                                        {otherEntity.id}
                                      </option>
                                    ))
                                  : null}
                              </AvInput>
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" for="atendimento-idPadItem">
                                <Translate contentKey="generadorApp.atendimento.idPadItem">Id Pad Item</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="atendimento-idPadItem" type="select" className="form-control" name="idPadItem">
                                <option value="null" key="0">
                                  {translate('generadorApp.atendimento.idPadItem.empty')}
                                </option>
                                {padItems
                                  ? padItems.map(otherEntity => (
                                      <option value={otherEntity.id} key={otherEntity.id}>
                                        {otherEntity.id}
                                      </option>
                                    ))
                                  : null}
                              </AvInput>
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" for="atendimento-idStatusAtendimento">
                                <Translate contentKey="generadorApp.atendimento.idStatusAtendimento">Id Status Atendimento</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="atendimento-idStatusAtendimento"
                                type="select"
                                className="form-control"
                                name="idStatusAtendimento"
                              >
                                <option value="null" key="0">
                                  {translate('generadorApp.atendimento.idStatusAtendimento.empty')}
                                </option>
                                {statusAtendimentos
                                  ? statusAtendimentos.map(otherEntity => (
                                      <option value={otherEntity.id} key={otherEntity.id}>
                                        {otherEntity.id}
                                      </option>
                                    ))
                                  : null}
                              </AvInput>
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" for="atendimento-idPeriodo">
                                <Translate contentKey="generadorApp.atendimento.idPeriodo">Id Periodo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="atendimento-idPeriodo" type="select" className="form-control" name="idPeriodo">
                                <option value="null" key="0">
                                  {translate('generadorApp.atendimento.idPeriodo.empty')}
                                </option>
                                {periodos
                                  ? periodos.map(otherEntity => (
                                      <option value={otherEntity.id} key={otherEntity.id}>
                                        {otherEntity.id}
                                      </option>
                                    ))
                                  : null}
                              </AvInput>
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" for="atendimento-idCidade">
                                <Translate contentKey="generadorApp.atendimento.idCidade">Id Cidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="atendimento-idCidade" type="select" className="form-control" name="idCidade">
                                <option value="null" key="0">
                                  {translate('generadorApp.atendimento.idCidade.empty')}
                                </option>
                                {cidades
                                  ? cidades.map(otherEntity => (
                                      <option value={otherEntity.id} key={otherEntity.id}>
                                        {otherEntity.id}
                                      </option>
                                    ))
                                  : null}
                              </AvInput>
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>
                    </Row>
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
  pacientes: storeState.paciente.entities,
  operadoras: storeState.operadora.entities,
  especialidades: storeState.especialidade.entities,
  padItems: storeState.padItem.entities,
  statusAtendimentos: storeState.statusAtendimento.entities,
  periodos: storeState.periodo.entities,
  cidades: storeState.cidade.entities,
  atendimentoEntity: storeState.atendimento.entity,
  loading: storeState.atendimento.loading,
  updating: storeState.atendimento.updating,
  updateSuccess: storeState.atendimento.updateSuccess
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getPacientes,
  getOperadoras,
  getEspecialidades,
  getPadItems,
  getStatusAtendimentos,
  getPeriodos,
  getCidades,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AtendimentoUpdate);
