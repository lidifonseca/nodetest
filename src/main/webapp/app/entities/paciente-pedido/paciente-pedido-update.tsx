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
import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';
import { IPacienteDadosCartao } from 'app/shared/model/paciente-dados-cartao.model';
import { getEntities as getPacienteDadosCartaos } from 'app/entities/paciente-dados-cartao/paciente-dados-cartao.reducer';
import { IEspecialidade } from 'app/shared/model/especialidade.model';
import { getEntities as getEspecialidades } from 'app/entities/especialidade/especialidade.reducer';
import {
  IPacientePedidoUpdateState,
  getEntity,
  getPacientePedidoState,
  IPacientePedidoBaseState,
  updateEntity,
  createEntity,
  reset
} from './paciente-pedido.reducer';
import { IPacientePedido } from 'app/shared/model/paciente-pedido.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPacientePedidoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacientePedidoUpdate extends React.Component<IPacientePedidoUpdateProps, IPacientePedidoUpdateState> {
  constructor(props: Readonly<IPacientePedidoUpdateProps>) {
    super(props);

    this.state = {
      unidadeEasySelectValue: null,
      pacienteSelectValue: null,
      pacienteDadosCartaoSelectValue: null,
      especialidadeSelectValue: null,
      fieldsBase: getPacientePedidoState(this.props.location),
      unidadeId: '0',
      pacienteId: '0',
      cartaoId: '0',
      especialidadeId: '0',
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
      nextProps.pacientePedidoEntity.unidadeEasy &&
      nextProps.pacientePedidoEntity.unidadeEasy.id
    ) {
      this.setState({
        unidadeEasySelectValue: nextProps.unidadeEasies.map(p =>
          nextProps.pacientePedidoEntity.unidadeEasy.id === p.id ? { value: p.id, label: p.razaoSocial } : null
        )
      });
    }

    if (
      nextProps.pacientes.length > 0 &&
      this.state.pacienteSelectValue === null &&
      nextProps.pacientePedidoEntity.paciente &&
      nextProps.pacientePedidoEntity.paciente.id
    ) {
      this.setState({
        pacienteSelectValue: nextProps.pacientes.map(p =>
          nextProps.pacientePedidoEntity.paciente.id === p.id ? { value: p.id, label: p.id } : null
        )
      });
    }

    if (
      nextProps.pacienteDadosCartaos.length > 0 &&
      this.state.pacienteDadosCartaoSelectValue === null &&
      nextProps.pacientePedidoEntity.pacienteDadosCartao &&
      nextProps.pacientePedidoEntity.pacienteDadosCartao.id
    ) {
      this.setState({
        pacienteDadosCartaoSelectValue: nextProps.pacienteDadosCartaos.map(p =>
          nextProps.pacientePedidoEntity.pacienteDadosCartao.id === p.id ? { value: p.id, label: p.id } : null
        )
      });
    }

    if (
      nextProps.especialidades.length > 0 &&
      this.state.especialidadeSelectValue === null &&
      nextProps.pacientePedidoEntity.especialidade &&
      nextProps.pacientePedidoEntity.especialidade.id
    ) {
      this.setState({
        especialidadeSelectValue: nextProps.especialidades.map(p =>
          nextProps.pacientePedidoEntity.especialidade.id === p.id ? { value: p.id, label: p.id } : null
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
    this.props.getPacientes();
    this.props.getPacienteDadosCartaos();
    this.props.getEspecialidades();
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

    if (errors.length === 0) {
      const { pacientePedidoEntity } = this.props;
      const entity = {
        ...pacientePedidoEntity,
        unidadeEasy: this.state.unidadeEasySelectValue ? this.state.unidadeEasySelectValue['value'] : null,
        paciente: this.state.pacienteSelectValue ? this.state.pacienteSelectValue['value'] : null,
        pacienteDadosCartao: this.state.pacienteDadosCartaoSelectValue ? this.state.pacienteDadosCartaoSelectValue['value'] : null,
        especialidade: this.state.especialidadeSelectValue ? this.state.especialidadeSelectValue['value'] : null,
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
    this.props.history.push('/paciente-pedido?' + this.getFiltersURL());
  };

  render() {
    const { pacientePedidoEntity, unidadeEasies, pacientes, pacienteDadosCartaos, especialidades, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...pacientePedidoEntity,
                  unidade: pacientePedidoEntity.unidade ? pacientePedidoEntity.unidade.id : null,
                  paciente: pacientePedidoEntity.paciente ? pacientePedidoEntity.paciente.id : null,
                  cartao: pacientePedidoEntity.cartao ? pacientePedidoEntity.cartao.id : null,
                  especialidade: pacientePedidoEntity.especialidade ? pacientePedidoEntity.especialidade.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.pacientePedido.home.createOrEditLabel">Create or edit a PacientePedido</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/paciente-pedido?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Paciente Pedidos</li>
            <li className="breadcrumb-item active">Paciente Pedidos edit</li>
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
                        <Label className="mt-2" for="paciente-pedido-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput id="paciente-pedido-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'dataPedido' ? (
                          <Col md="dataPedido">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="dataPedidoLabel" for="paciente-pedido-dataPedido">
                                    <Translate contentKey="generadorApp.pacientePedido.dataPedido">Data Pedido</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-pedido-dataPedido" type="date" className="form-control" name="dataPedido" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="dataPedido" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'dataAgenda' ? (
                          <Col md="dataAgenda">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="dataAgendaLabel" for="paciente-pedido-dataAgenda">
                                    <Translate contentKey="generadorApp.pacientePedido.dataAgenda">Data Agenda</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput
                                    id="paciente-pedido-dataAgenda"
                                    type="datetime-local"
                                    className="form-control"
                                    name="dataAgenda"
                                    placeholder={'YYYY-MM-DD HH:mm'}
                                    value={isNew ? null : convertDateTimeFromServer(this.props.pacientePedidoEntity.dataAgenda)}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="dataAgenda" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'qtdSessoes' ? (
                          <Col md="qtdSessoes">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="qtdSessoesLabel" for="paciente-pedido-qtdSessoes">
                                    <Translate contentKey="generadorApp.pacientePedido.qtdSessoes">Qtd Sessoes</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-pedido-qtdSessoes" type="string" className="form-control" name="qtdSessoes" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="qtdSessoes" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'parcelas' ? (
                          <Col md="parcelas">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="parcelasLabel" for="paciente-pedido-parcelas">
                                    <Translate contentKey="generadorApp.pacientePedido.parcelas">Parcelas</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-pedido-parcelas" type="string" className="form-control" name="parcelas" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="parcelas" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'valor' ? (
                          <Col md="valor">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="valorLabel" for="paciente-pedido-valor">
                                    <Translate contentKey="generadorApp.pacientePedido.valor">Valor</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-pedido-valor" type="string" className="form-control" name="valor" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="valor" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'desconto' ? (
                          <Col md="desconto">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="descontoLabel" for="paciente-pedido-desconto">
                                    <Translate contentKey="generadorApp.pacientePedido.desconto">Desconto</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-pedido-desconto" type="string" className="form-control" name="desconto" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="desconto" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'tipoValor' ? (
                          <Col md="tipoValor">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="tipoValorLabel" for="paciente-pedido-tipoValor">
                                    <Translate contentKey="generadorApp.pacientePedido.tipoValor">Tipo Valor</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-pedido-tipoValor" type="string" className="form-control" name="tipoValor" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="tipoValor" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'unidade' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="paciente-pedido-unidade">
                                    <Translate contentKey="generadorApp.pacientePedido.unidade">Unidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="paciente-pedido-unidade"
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
                        {baseFilters !== 'paciente' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="paciente-pedido-paciente">
                                    <Translate contentKey="generadorApp.pacientePedido.paciente">Paciente</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="paciente-pedido-paciente"
                                    className={'css-select-control'}
                                    value={this.state.pacienteSelectValue}
                                    options={pacientes ? pacientes.map(option => ({ value: option.id, label: option.id })) : null}
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
                        {baseFilters !== 'cartao' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="paciente-pedido-cartao">
                                    <Translate contentKey="generadorApp.pacientePedido.cartao">Cartao</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="paciente-pedido-cartao"
                                    className={'css-select-control'}
                                    value={this.state.pacienteDadosCartaoSelectValue}
                                    options={
                                      pacienteDadosCartaos
                                        ? pacienteDadosCartaos.map(option => ({ value: option.id, label: option.id }))
                                        : null
                                    }
                                    onChange={options => this.setState({ pacienteDadosCartaoSelectValue: options })}
                                    name={'cartao'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cartao" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'especialidade' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="paciente-pedido-especialidade">
                                    <Translate contentKey="generadorApp.pacientePedido.especialidade">Especialidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="paciente-pedido-especialidade"
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
  pacientes: storeState.paciente.entities,
  pacienteDadosCartaos: storeState.pacienteDadosCartao.entities,
  especialidades: storeState.especialidade.entities,
  pacientePedidoEntity: storeState.pacientePedido.entity,
  loading: storeState.pacientePedido.loading,
  updating: storeState.pacientePedido.updating,
  updateSuccess: storeState.pacientePedido.updateSuccess
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getPacientes,
  getPacienteDadosCartaos,
  getEspecialidades,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacientePedidoUpdate);
