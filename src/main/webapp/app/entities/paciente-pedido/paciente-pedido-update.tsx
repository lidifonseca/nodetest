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
import { IPacienteDadosCartao } from 'app/shared/model/paciente-dados-cartao.model';
import { getEntities as getPacienteDadosCartaos } from 'app/entities/paciente-dados-cartao/paciente-dados-cartao.reducer';
import { IEspecialidade } from 'app/shared/model/especialidade.model';
import { getEntities as getEspecialidades } from 'app/entities/especialidade/especialidade.reducer';
import { getEntity, updateEntity, createEntity, reset } from './paciente-pedido.reducer';
import { IPacientePedido } from 'app/shared/model/paciente-pedido.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPacientePedidoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPacientePedidoUpdateState {
  isNew: boolean;
  idUnidadeId: string;
  idPacienteId: string;
  idCartaoId: string;
  idEspecialidadeId: string;
}

export class PacientePedidoUpdate extends React.Component<IPacientePedidoUpdateProps, IPacientePedidoUpdateState> {
  constructor(props: Readonly<IPacientePedidoUpdateProps>) {
    super(props);
    this.state = {
      idUnidadeId: '0',
      idPacienteId: '0',
      idCartaoId: '0',
      idEspecialidadeId: '0',
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
    this.props.getPacienteDadosCartaos();
    this.props.getEspecialidades();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    values.dataAgenda = convertDateTimeToServer(values.dataAgenda);
    values.dataPost = convertDateTimeToServer(values.dataPost);

    if (errors.length === 0) {
      const { pacientePedidoEntity } = this.props;
      const entity = {
        ...pacientePedidoEntity,
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
    this.props.history.push('/paciente-pedido');
  };

  render() {
    const { pacientePedidoEntity, unidadeEasies, pacientes, pacienteDadosCartaos, especialidades, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Pedidos</li>
          <li className="breadcrumb-item active">Paciente Pedidos edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...pacientePedidoEntity,
                  idUnidade: pacientePedidoEntity.idUnidade ? pacientePedidoEntity.idUnidade.id : null,
                  idPaciente: pacientePedidoEntity.idPaciente ? pacientePedidoEntity.idPaciente.id : null,
                  idCartao: pacientePedidoEntity.idCartao ? pacientePedidoEntity.idCartao.id : null,
                  idEspecialidade: pacientePedidoEntity.idEspecialidade ? pacientePedidoEntity.idEspecialidade.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.pacientePedido.home.createOrEditLabel">Create or edit a PacientePedido</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/paciente-pedido" replace color="info" className="float-right jh-create-entity">
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
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

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="dataPostLabel" for="paciente-pedido-dataPost">
                                <Translate contentKey="generadorApp.pacientePedido.dataPost">Data Post</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="paciente-pedido-dataPost"
                                type="datetime-local"
                                className="form-control"
                                name="dataPost"
                                placeholder={'YYYY-MM-DD HH:mm'}
                                value={isNew ? null : convertDateTimeFromServer(this.props.pacientePedidoEntity.dataPost)}
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>
                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" for="paciente-pedido-idUnidade">
                                <Translate contentKey="generadorApp.pacientePedido.idUnidade">Id Unidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="paciente-pedido-idUnidade" type="select" className="form-control" name="idUnidade">
                                <option value="null" key="0">
                                  {translate('generadorApp.pacientePedido.idUnidade.empty')}
                                </option>
                                {unidadeEasies
                                  ? unidadeEasies.map(otherEntity => (
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
                              <Label className="mt-2" for="paciente-pedido-idPaciente">
                                <Translate contentKey="generadorApp.pacientePedido.idPaciente">Id Paciente</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="paciente-pedido-idPaciente" type="select" className="form-control" name="idPaciente">
                                <option value="null" key="0">
                                  {translate('generadorApp.pacientePedido.idPaciente.empty')}
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
                              <Label className="mt-2" for="paciente-pedido-idCartao">
                                <Translate contentKey="generadorApp.pacientePedido.idCartao">Id Cartao</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="paciente-pedido-idCartao" type="select" className="form-control" name="idCartao">
                                <option value="null" key="0">
                                  {translate('generadorApp.pacientePedido.idCartao.empty')}
                                </option>
                                {pacienteDadosCartaos
                                  ? pacienteDadosCartaos.map(otherEntity => (
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
                              <Label className="mt-2" for="paciente-pedido-idEspecialidade">
                                <Translate contentKey="generadorApp.pacientePedido.idEspecialidade">Id Especialidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="paciente-pedido-idEspecialidade" type="select" className="form-control" name="idEspecialidade">
                                <option value="null" key="0">
                                  {translate('generadorApp.pacientePedido.idEspecialidade.empty')}
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
