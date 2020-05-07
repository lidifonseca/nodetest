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
      fieldsBase: getPacientePedidoState(this.props.location),
      unidadeId: '0',
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
  }

  getFiltersURL = (offset = null) => {
    const fieldsBase = this.state.fieldsBase;
    return (
      '_back=1' +
      (fieldsBase['baseFilters'] ? '&baseFilters=' + fieldsBase['baseFilters'] : '') +
      (fieldsBase['activePage'] ? '&page=' + fieldsBase['activePage'] : '') +
      (fieldsBase['itemsPerPage'] ? '&size=' + fieldsBase['itemsPerPage'] : '') +
      (fieldsBase['sort'] ? '&sort=' + (fieldsBase['sort'] + ',' + fieldsBase['order']) : '') +
      (offset !== null ? '&offset=' + offset : '') +
      (fieldsBase['dataPedido'] ? '&dataPedido=' + fieldsBase['dataPedido'] : '') +
      (fieldsBase['dataAgenda'] ? '&dataAgenda=' + fieldsBase['dataAgenda'] : '') +
      (fieldsBase['qtdSessoes'] ? '&qtdSessoes=' + fieldsBase['qtdSessoes'] : '') +
      (fieldsBase['parcelas'] ? '&parcelas=' + fieldsBase['parcelas'] : '') +
      (fieldsBase['valor'] ? '&valor=' + fieldsBase['valor'] : '') +
      (fieldsBase['desconto'] ? '&desconto=' + fieldsBase['desconto'] : '') +
      (fieldsBase['tipoValor'] ? '&tipoValor=' + fieldsBase['tipoValor'] : '') +
      (fieldsBase['unidade'] ? '&unidade=' + fieldsBase['unidade'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    values.dataAgenda = convertDateTimeToServer(values.dataAgenda);

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
    this.props.history.push('/paciente-pedido?' + this.getFiltersURL());
  };

  render() {
    const { pacientePedidoEntity, unidadeEasies, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
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
                  unidade: pacientePedidoEntity.unidade ? pacientePedidoEntity.unidade.id : null
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
            </PanelHeader>
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
                                  <AvInput id="paciente-pedido-unidade" type="select" className="form-control" name="unidade">
                                    <option value="null" key="0">
                                      {translate('generadorApp.pacientePedido.unidade.empty')}
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
                        ) : (
                          <AvInput type="hidden" name="unidade" value={this.state.fieldsBase[baseFilters]} />
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
  pacientePedidoEntity: storeState.pacientePedido.entity,
  loading: storeState.pacientePedido.loading,
  updating: storeState.pacientePedido.updating,
  updateSuccess: storeState.pacientePedido.updateSuccess
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

export default connect(mapStateToProps, mapDispatchToProps)(PacientePedidoUpdate);
