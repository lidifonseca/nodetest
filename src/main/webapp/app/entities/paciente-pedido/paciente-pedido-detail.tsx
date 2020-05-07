import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IPacientePedidoBaseState, getPacientePedidoState } from './paciente-pedido.reducer';
import { IPacientePedido } from 'app/shared/model/paciente-pedido.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPacientePedidoState {
  fieldsBase: IPacientePedidoBaseState;
}

export interface IPacientePedidoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacientePedidoDetail extends React.Component<IPacientePedidoDetailProps, IPacientePedidoState> {
  constructor(props: Readonly<IPacientePedidoDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getPacientePedidoState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { pacientePedidoEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Pedidos</li>
          <li className="breadcrumb-item active">Paciente Pedidos details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Paciente Pedidos</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.pacientePedido.detail.title">PacientePedido</Translate>[
                  <b>{pacientePedidoEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="dataPedido">
                            <Translate contentKey="generadorApp.pacientePedido.dataPedido">Data Pedido</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={pacientePedidoEntity.dataPedido} type="date" format={APP_LOCAL_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="dataAgenda">
                            <Translate contentKey="generadorApp.pacientePedido.dataAgenda">Data Agenda</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={pacientePedidoEntity.dataAgenda} type="date" format={APP_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="qtdSessoes">
                            <Translate contentKey="generadorApp.pacientePedido.qtdSessoes">Qtd Sessoes</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacientePedidoEntity.qtdSessoes}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="parcelas">
                            <Translate contentKey="generadorApp.pacientePedido.parcelas">Parcelas</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacientePedidoEntity.parcelas}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="valor">
                            <Translate contentKey="generadorApp.pacientePedido.valor">Valor</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacientePedidoEntity.valor}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="desconto">
                            <Translate contentKey="generadorApp.pacientePedido.desconto">Desconto</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacientePedidoEntity.desconto}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="tipoValor">
                            <Translate contentKey="generadorApp.pacientePedido.tipoValor">Tipo Valor</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacientePedidoEntity.tipoValor}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.pacientePedido.unidade">Unidade</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacientePedidoEntity.unidade ? pacientePedidoEntity.unidade.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/paciente-pedido" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/paciente-pedido/${pacientePedidoEntity.id}/edit`} replace color="primary">
                  <FontAwesomeIcon icon="pencil-alt" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.edit">Edit</Translate>
                  </span>
                </Button>
              </Col>
            </Row>
          </PanelBody>
        </Panel>
      </div>
    );
  }
}

const mapStateToProps = ({ pacientePedido }: IRootState) => ({
  pacientePedidoEntity: pacientePedido.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacientePedidoDetail);
