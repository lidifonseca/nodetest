/* eslint complexity: ["error", 300] */
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
import { IPadItem } from 'app/shared/model/pad-item.model';
import { getEntities as getPadItems } from 'app/entities/pad-item/pad-item.reducer';
import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';
import { IOperadora } from 'app/shared/model/operadora.model';
import { getEntities as getOperadoras } from 'app/entities/operadora/operadora.reducer';
import { IProfissional } from 'app/shared/model/profissional.model';
import { getEntities as getProfissionals } from 'app/entities/profissional/profissional.reducer';
import { IFranquia } from 'app/shared/model/franquia.model';
import { getEntities as getFranquias } from 'app/entities/franquia/franquia.reducer';
import { IEspecialidade } from 'app/shared/model/especialidade.model';
import { getEntities as getEspecialidades } from 'app/entities/especialidade/especialidade.reducer';
import { IStatusAtendimento } from 'app/shared/model/status-atendimento.model';
import { getEntities as getStatusAtendimentos } from 'app/entities/status-atendimento/status-atendimento.reducer';
import { IPeriodo } from 'app/shared/model/periodo.model';
import { getEntities as getPeriodos } from 'app/entities/periodo/periodo.reducer';
import { ICidade } from 'app/shared/model/cidade.model';
import { getEntities as getCidades } from 'app/entities/cidade/cidade.reducer';
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
      padItemSelectValue: null,
      pacienteSelectValue: null,
      operadoraSelectValue: null,
      profissionalSelectValue: null,
      franquiaSelectValue: null,
      especialidadeSelectValue: null,
      statusAtendimentoSelectValue: null,
      periodoSelectValue: null,
      cidadeSelectValue: null,
      fieldsBase: getAtendimentoState(this.props.location),
      unidadeId: '0',
      padItemId: '0',
      pacienteId: '0',
      operadoraId: '0',
      profissionalId: '0',
      franquiaId: '0',
      especialidadeId: '0',
      statusAtendimentoId: '0',
      periodoId: '0',
      cidadeId: '0',
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

    if (
      nextProps.padItems.length > 0 &&
      this.state.padItemSelectValue === null &&
      nextProps.atendimentoEntity.padItem &&
      nextProps.atendimentoEntity.padItem.id
    ) {
      this.setState({
        padItemSelectValue: nextProps.padItems.map(p =>
          nextProps.atendimentoEntity.padItem.id === p.id ? { value: p.id, label: p.id } : null
        )
      });
    }

    if (
      nextProps.pacientes.length > 0 &&
      this.state.pacienteSelectValue === null &&
      nextProps.atendimentoEntity.paciente &&
      nextProps.atendimentoEntity.paciente.id
    ) {
      this.setState({
        pacienteSelectValue: nextProps.pacientes.map(p =>
          nextProps.atendimentoEntity.paciente.id === p.id ? { value: p.id, label: p.nome } : null
        )
      });
    }

    if (
      nextProps.operadoras.length > 0 &&
      this.state.operadoraSelectValue === null &&
      nextProps.atendimentoEntity.operadora &&
      nextProps.atendimentoEntity.operadora.id
    ) {
      this.setState({
        operadoraSelectValue: nextProps.operadoras.map(p =>
          nextProps.atendimentoEntity.operadora.id === p.id ? { value: p.id, label: p.nomeFantasia } : null
        )
      });
    }

    if (
      nextProps.profissionals.length > 0 &&
      this.state.profissionalSelectValue === null &&
      nextProps.atendimentoEntity.profissional &&
      nextProps.atendimentoEntity.profissional.id
    ) {
      this.setState({
        profissionalSelectValue: nextProps.profissionals.map(p =>
          nextProps.atendimentoEntity.profissional.id === p.id ? { value: p.id, label: p.nome } : null
        )
      });
    }

    if (
      nextProps.franquias.length > 0 &&
      this.state.franquiaSelectValue === null &&
      nextProps.atendimentoEntity.franquia &&
      nextProps.atendimentoEntity.franquia.id
    ) {
      this.setState({
        franquiaSelectValue: nextProps.franquias.map(p =>
          nextProps.atendimentoEntity.franquia.id === p.id ? { value: p.id, label: p.nomeFantasia } : null
        )
      });
    }

    if (
      nextProps.especialidades.length > 0 &&
      this.state.especialidadeSelectValue === null &&
      nextProps.atendimentoEntity.especialidade &&
      nextProps.atendimentoEntity.especialidade.id
    ) {
      this.setState({
        especialidadeSelectValue: nextProps.especialidades.map(p =>
          nextProps.atendimentoEntity.especialidade.id === p.id ? { value: p.id, label: p.id } : null
        )
      });
    }

    if (
      nextProps.statusAtendimentos.length > 0 &&
      this.state.statusAtendimentoSelectValue === null &&
      nextProps.atendimentoEntity.statusAtendimento &&
      nextProps.atendimentoEntity.statusAtendimento.id
    ) {
      this.setState({
        statusAtendimentoSelectValue: nextProps.statusAtendimentos.map(p =>
          nextProps.atendimentoEntity.statusAtendimento.id === p.id ? { value: p.id, label: p.id } : null
        )
      });
    }

    if (
      nextProps.periodos.length > 0 &&
      this.state.periodoSelectValue === null &&
      nextProps.atendimentoEntity.periodo &&
      nextProps.atendimentoEntity.periodo.id
    ) {
      this.setState({
        periodoSelectValue: nextProps.periodos.map(p =>
          nextProps.atendimentoEntity.periodo.id === p.id ? { value: p.id, label: p.id } : null
        )
      });
    }

    if (
      nextProps.cidades.length > 0 &&
      this.state.cidadeSelectValue === null &&
      nextProps.atendimentoEntity.cidade &&
      nextProps.atendimentoEntity.cidade.id
    ) {
      this.setState({
        cidadeSelectValue: nextProps.cidades.map(p =>
          nextProps.atendimentoEntity.cidade.id === p.id ? { value: p.id, label: p.id } : null
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
    this.props.getPadItems();
    this.props.getPacientes();
    this.props.getOperadoras();
    this.props.getProfissionals();
    this.props.getFranquias();
    this.props.getEspecialidades();
    this.props.getStatusAtendimentos();
    this.props.getPeriodos();
    this.props.getCidades();
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
        padItem: this.state.padItemSelectValue ? this.state.padItemSelectValue['value'] : null,
        paciente: this.state.pacienteSelectValue ? this.state.pacienteSelectValue['value'] : null,
        operadora: this.state.operadoraSelectValue ? this.state.operadoraSelectValue['value'] : null,
        profissional: this.state.profissionalSelectValue ? this.state.profissionalSelectValue['value'] : null,
        franquia: this.state.franquiaSelectValue ? this.state.franquiaSelectValue['value'] : null,
        especialidade: this.state.especialidadeSelectValue ? this.state.especialidadeSelectValue['value'] : null,
        statusAtendimento: this.state.statusAtendimentoSelectValue ? this.state.statusAtendimentoSelectValue['value'] : null,
        periodo: this.state.periodoSelectValue ? this.state.periodoSelectValue['value'] : null,
        cidade: this.state.cidadeSelectValue ? this.state.cidadeSelectValue['value'] : null,
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
    const {
      atendimentoEntity,
      unidadeEasies,
      padItems,
      pacientes,
      operadoras,
      profissionals,
      franquias,
      especialidades,
      statusAtendimentos,
      periodos,
      cidades,
      loading,
      updating
    } = this.props;
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
                  unidade: atendimentoEntity.unidade ? atendimentoEntity.unidade.id : null,
                  padItem: atendimentoEntity.padItem ? atendimentoEntity.padItem.id : null,
                  paciente: atendimentoEntity.paciente ? atendimentoEntity.paciente.id : null,
                  operadora: atendimentoEntity.operadora ? atendimentoEntity.operadora.id : null,
                  profissional: atendimentoEntity.profissional ? atendimentoEntity.profissional.id : null,
                  franquia: atendimentoEntity.franquia ? atendimentoEntity.franquia.id : null,
                  especialidade: atendimentoEntity.especialidade ? atendimentoEntity.especialidade.id : null,
                  statusAtendimento: atendimentoEntity.statusAtendimento ? atendimentoEntity.statusAtendimento.id : null,
                  periodo: atendimentoEntity.periodo ? atendimentoEntity.periodo.id : null,
                  cidade: atendimentoEntity.cidade ? atendimentoEntity.cidade.id : null
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
                        {baseFilters !== 'cep' ? (
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
                        )}
                        {baseFilters !== 'endereco' ? (
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
                        )}
                        {baseFilters !== 'numero' ? (
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
                        )}
                        {baseFilters !== 'complemento' ? (
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
                        )}
                        {baseFilters !== 'bairro' ? (
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
                        )}
                        {baseFilters !== 'uf' ? (
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
                        )}
                        {baseFilters !== 'latitude' ? (
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
                        )}
                        {baseFilters !== 'longitude' ? (
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
                        )}
                        {baseFilters !== 'dataAgenda' ? (
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
                        )}
                        {baseFilters !== 'horario' ? (
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
                        )}
                        {baseFilters !== 'dataChegada' ? (
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
                        )}
                        {baseFilters !== 'latitudeChegada' ? (
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
                        )}
                        {baseFilters !== 'longitudeChegada' ? (
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
                        )}
                        {baseFilters !== 'dataSaida' ? (
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
                        )}
                        {baseFilters !== 'latitudeSaida' ? (
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
                        )}
                        {baseFilters !== 'longitudeSaida' ? (
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
                        )}
                        {baseFilters !== 'evolucao' ? (
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
                        )}
                        {baseFilters !== 'observacao' ? (
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
                        )}
                        {baseFilters !== 'intercorrencia' ? (
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
                        )}
                        {baseFilters !== 'avaliacao' ? (
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
                        )}
                        {baseFilters !== 'aceito' ? (
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
                        )}
                        {baseFilters !== 'motivo' ? (
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
                        )}
                        {baseFilters !== 'valor' ? (
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
                        )}
                        {baseFilters !== 'ordemAtendimento' ? (
                          <Col md="ordemAtendimento">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="ordemAtendimentoLabel" for="atendimento-ordemAtendimento">
                                    <Translate contentKey="generadorApp.atendimento.ordemAtendimento">Ordem Atendimento</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="atendimento-ordemAtendimento"
                                    type="string"
                                    className="form-control"
                                    name="ordemAtendimento"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ordemAtendimento" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ativo' ? (
                          <Col md="ativo">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="ativoLabel" check>
                                    <AvInput id="atendimento-ativo" type="checkbox" className="form-control" name="ativo" />
                                    <Translate contentKey="generadorApp.atendimento.ativo">Ativo</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'dataForaHora' ? (
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
                        )}
                        {baseFilters !== 'idUsuarioCancelamento' ? (
                          <Col md="idUsuarioCancelamento">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idUsuarioCancelamentoLabel" for="atendimento-idUsuarioCancelamento">
                                    <Translate contentKey="generadorApp.atendimento.idUsuarioCancelamento">
                                      Id Usuario Cancelamento
                                    </Translate>
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
                        ) : (
                          <AvInput type="hidden" name="idUsuarioCancelamento" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'dataCancelamento' ? (
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
                        )}
                        {baseFilters !== 'tipoUsuarioCancelamento' ? (
                          <Col md="tipoUsuarioCancelamento">
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
                        ) : (
                          <AvInput type="hidden" name="tipoUsuarioCancelamento" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'confidencialProfissional' ? (
                          <Col md="confidencialProfissional">
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
                        ) : (
                          <AvInput type="hidden" name="confidencialProfissional" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'confidencialPaciente' ? (
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
                        )}
                        {baseFilters !== 'atendimentoAceite' ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="atendimentoAceite" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'atendimentoAssinaturas' ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="atendimentoAssinaturas" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'atendimentoAtividades' ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="atendimentoAtividades" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'unidade' ? (
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
                                    options={
                                      unidadeEasies ? unidadeEasies.map(option => ({ value: option.id, label: option.razaoSocial })) : null
                                    }
                                    onChange={options => this.setState({ unidadeEasySelectValue: options })}
                                    name={'unidade'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="unidade" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'padItem' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="atendimento-padItem">
                                    <Translate contentKey="generadorApp.atendimento.padItem">Pad Item</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="atendimento-padItem"
                                    className={'css-select-control'}
                                    value={this.state.padItemSelectValue}
                                    options={padItems ? padItems.map(option => ({ value: option.id, label: option.id })) : null}
                                    onChange={options => this.setState({ padItemSelectValue: options })}
                                    name={'padItem'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="padItem" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'paciente' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="atendimento-paciente">
                                    <Translate contentKey="generadorApp.atendimento.paciente">Paciente</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="atendimento-paciente"
                                    className={'css-select-control'}
                                    value={this.state.pacienteSelectValue}
                                    options={pacientes ? pacientes.map(option => ({ value: option.id, label: option.nome })) : null}
                                    onChange={options => this.setState({ pacienteSelectValue: options })}
                                    name={'paciente'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="paciente" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'operadora' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="atendimento-operadora">
                                    <Translate contentKey="generadorApp.atendimento.operadora">Operadora</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="atendimento-operadora"
                                    className={'css-select-control'}
                                    value={this.state.operadoraSelectValue}
                                    options={
                                      operadoras ? operadoras.map(option => ({ value: option.id, label: option.nomeFantasia })) : null
                                    }
                                    onChange={options => this.setState({ operadoraSelectValue: options })}
                                    name={'operadora'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="operadora" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'profissional' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="atendimento-profissional">
                                    <Translate contentKey="generadorApp.atendimento.profissional">Profissional</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="atendimento-profissional"
                                    className={'css-select-control'}
                                    value={this.state.profissionalSelectValue}
                                    options={profissionals ? profissionals.map(option => ({ value: option.id, label: option.nome })) : null}
                                    onChange={options => this.setState({ profissionalSelectValue: options })}
                                    name={'profissional'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="profissional" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'franquia' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="atendimento-franquia">
                                    <Translate contentKey="generadorApp.atendimento.franquia">Franquia</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="atendimento-franquia"
                                    className={'css-select-control'}
                                    value={this.state.franquiaSelectValue}
                                    options={franquias ? franquias.map(option => ({ value: option.id, label: option.nomeFantasia })) : null}
                                    onChange={options => this.setState({ franquiaSelectValue: options })}
                                    name={'franquia'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="franquia" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'especialidade' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="atendimento-especialidade">
                                    <Translate contentKey="generadorApp.atendimento.especialidade">Especialidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="atendimento-especialidade"
                                    className={'css-select-control'}
                                    value={this.state.especialidadeSelectValue}
                                    options={especialidades ? especialidades.map(option => ({ value: option.id, label: option.id })) : null}
                                    onChange={options => this.setState({ especialidadeSelectValue: options })}
                                    name={'especialidade'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="especialidade" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'statusAtendimento' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="atendimento-statusAtendimento">
                                    <Translate contentKey="generadorApp.atendimento.statusAtendimento">Status Atendimento</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="atendimento-statusAtendimento"
                                    className={'css-select-control'}
                                    value={this.state.statusAtendimentoSelectValue}
                                    options={
                                      statusAtendimentos ? statusAtendimentos.map(option => ({ value: option.id, label: option.id })) : null
                                    }
                                    onChange={options => this.setState({ statusAtendimentoSelectValue: options })}
                                    name={'statusAtendimento'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="statusAtendimento" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'periodo' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="atendimento-periodo">
                                    <Translate contentKey="generadorApp.atendimento.periodo">Periodo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="atendimento-periodo"
                                    className={'css-select-control'}
                                    value={this.state.periodoSelectValue}
                                    options={periodos ? periodos.map(option => ({ value: option.id, label: option.id })) : null}
                                    onChange={options => this.setState({ periodoSelectValue: options })}
                                    name={'periodo'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="periodo" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'cidade' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="atendimento-cidade">
                                    <Translate contentKey="generadorApp.atendimento.cidade">Cidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="atendimento-cidade"
                                    className={'css-select-control'}
                                    value={this.state.cidadeSelectValue}
                                    options={cidades ? cidades.map(option => ({ value: option.id, label: option.id })) : null}
                                    onChange={options => this.setState({ cidadeSelectValue: options })}
                                    name={'cidade'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cidade" value={this.state.fieldsBase[baseFilters]} />
                        )}
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
  padItems: storeState.padItem.entities,
  pacientes: storeState.paciente.entities,
  operadoras: storeState.operadora.entities,
  profissionals: storeState.profissional.entities,
  franquias: storeState.franquia.entities,
  especialidades: storeState.especialidade.entities,
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
  getPadItems,
  getPacientes,
  getOperadoras,
  getProfissionals,
  getFranquias,
  getEspecialidades,
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
