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
import { IOperadora } from 'app/shared/model/operadora.model';
import { getEntities as getOperadoras } from 'app/entities/operadora/operadora.reducer';
import { IFranquia } from 'app/shared/model/franquia.model';
import { getEntities as getFranquias } from 'app/entities/franquia/franquia.reducer';
import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';
import { IPadUpdateState, getEntity, getPadState, IPadBaseState, updateEntity, createEntity, reset } from './pad.reducer';
import { IPad } from 'app/shared/model/pad.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPadUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PadUpdate extends React.Component<IPadUpdateProps, IPadUpdateState> {
  constructor(props: Readonly<IPadUpdateProps>) {
    super(props);

    this.state = {
      unidadeEasySelectValue: null,
      operadoraSelectValue: null,
      franquiaSelectValue: null,
      pacienteSelectValue: null,
      fieldsBase: getPadState(this.props.location),
      unidadeId: '0',
      operadoraId: '0',
      franquiaId: '0',
      pacienteId: '0',
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
      nextProps.padEntity.unidadeEasy &&
      nextProps.padEntity.unidadeEasy.id
    ) {
      this.setState({
        unidadeEasySelectValue: nextProps.unidadeEasies.map(p =>
          nextProps.padEntity.unidadeEasy.id === p.id ? { value: p.id, label: p.razaoSocial } : null
        )
      });
    }

    if (
      nextProps.operadoras.length > 0 &&
      this.state.operadoraSelectValue === null &&
      nextProps.padEntity.operadora &&
      nextProps.padEntity.operadora.id
    ) {
      this.setState({
        operadoraSelectValue: nextProps.operadoras.map(p =>
          nextProps.padEntity.operadora.id === p.id ? { value: p.id, label: p.nomeFantasia } : null
        )
      });
    }

    if (
      nextProps.franquias.length > 0 &&
      this.state.franquiaSelectValue === null &&
      nextProps.padEntity.franquia &&
      nextProps.padEntity.franquia.id
    ) {
      this.setState({
        franquiaSelectValue: nextProps.franquias.map(p =>
          nextProps.padEntity.franquia.id === p.id ? { value: p.id, label: p.nomeFantasia } : null
        )
      });
    }

    if (
      nextProps.pacientes.length > 0 &&
      this.state.pacienteSelectValue === null &&
      nextProps.padEntity.paciente &&
      nextProps.padEntity.paciente.id
    ) {
      this.setState({
        pacienteSelectValue: nextProps.pacientes.map(p =>
          nextProps.padEntity.paciente.id === p.id ? { value: p.id, label: p.nome } : null
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
    this.props.getOperadoras();
    this.props.getFranquias();
    this.props.getPacientes();
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
    if (errors.length === 0) {
      const { padEntity } = this.props;
      const entity = {
        ...padEntity,
        unidadeEasy: this.state.unidadeEasySelectValue ? this.state.unidadeEasySelectValue['value'] : null,
        operadora: this.state.operadoraSelectValue ? this.state.operadoraSelectValue['value'] : null,
        franquia: this.state.franquiaSelectValue ? this.state.franquiaSelectValue['value'] : null,
        paciente: this.state.pacienteSelectValue ? this.state.pacienteSelectValue['value'] : null,
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
    this.props.history.push('/pad?' + this.getFiltersURL());
  };

  render() {
    const { padEntity, unidadeEasies, operadoras, franquias, pacientes, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...padEntity,
                  unidade: padEntity.unidade ? padEntity.unidade.id : null,
                  operadora: padEntity.operadora ? padEntity.operadora.id : null,
                  franquia: padEntity.franquia ? padEntity.franquia.id : null,
                  paciente: padEntity.paciente ? padEntity.paciente.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.pad.home.createOrEditLabel">Create or edit a Pad</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/pad?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Pads</li>
            <li className="breadcrumb-item active">Pads edit</li>
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
                        <Label className="mt-2" for="pad-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput id="pad-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'nroPad' ? (
                          <Col md="nroPad">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="nroPadLabel" for="pad-nroPad">
                                    <Translate contentKey="generadorApp.pad.nroPad">Nro Pad</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-nroPad" type="text" name="nroPad" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="nroPad" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'dataInicio' ? (
                          <Col md="dataInicio">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="dataInicioLabel" for="pad-dataInicio">
                                    <Translate contentKey="generadorApp.pad.dataInicio">Data Inicio</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-dataInicio" type="date" className="form-control" name="dataInicio" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="dataInicio" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'dataFim' ? (
                          <Col md="dataFim">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="dataFimLabel" for="pad-dataFim">
                                    <Translate contentKey="generadorApp.pad.dataFim">Data Fim</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-dataFim" type="date" className="form-control" name="dataFim" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="dataFim" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'dataConferido' ? (
                          <Col md="dataConferido">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="dataConferidoLabel" for="pad-dataConferido">
                                    <Translate contentKey="generadorApp.pad.dataConferido">Data Conferido</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-dataConferido" type="date" className="form-control" name="dataConferido" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="dataConferido" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ativo' ? (
                          <Col md="ativo">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="ativoLabel" check>
                                    <AvInput id="pad-ativo" type="checkbox" className="form-control" name="ativo" />
                                    <Translate contentKey="generadorApp.pad.ativo">Ativo</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'statusPad' ? (
                          <Col md="statusPad">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="statusPadLabel" for="pad-statusPad">
                                    <Translate contentKey="generadorApp.pad.statusPad">Status Pad</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-statusPad" type="string" className="form-control" name="statusPad" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="statusPad" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'padCid' ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="padCid" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'padItem' ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="padItem" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'unidade' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="pad-unidade">
                                    <Translate contentKey="generadorApp.pad.unidade">Unidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="pad-unidade"
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
                        {baseFilters !== 'operadora' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="pad-operadora">
                                    <Translate contentKey="generadorApp.pad.operadora">Operadora</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="pad-operadora"
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
                        {baseFilters !== 'franquia' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="pad-franquia">
                                    <Translate contentKey="generadorApp.pad.franquia">Franquia</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="pad-franquia"
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
                        {baseFilters !== 'paciente' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="pad-paciente">
                                    <Translate contentKey="generadorApp.pad.paciente">Paciente</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="pad-paciente"
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
  operadoras: storeState.operadora.entities,
  franquias: storeState.franquia.entities,
  pacientes: storeState.paciente.entities,
  padEntity: storeState.pad.entity,
  loading: storeState.pad.loading,
  updating: storeState.pad.updating,
  updateSuccess: storeState.pad.updateSuccess
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getOperadoras,
  getFranquias,
  getPacientes,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadUpdate);
