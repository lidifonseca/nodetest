import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IPadItemBaseState, getPadItemState } from './pad-item.reducer';
import { IPadItem } from 'app/shared/model/pad-item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPadItemState {
  fieldsBase: IPadItemBaseState;
}

export interface IPadItemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PadItemDetail extends React.Component<IPadItemDetailProps, IPadItemState> {
  constructor(props: Readonly<IPadItemDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getPadItemState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { padItemEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Items</li>
          <li className="breadcrumb-item active">Pad Items details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Pad Items</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.padItem.detail.title">PadItem</Translate>[<b>{padItemEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idPedido">
                            <Translate contentKey="generadorApp.padItem.idPedido">Id Pedido</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemEntity.idPedido}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="dataInicio">
                            <Translate contentKey="generadorApp.padItem.dataInicio">Data Inicio</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={padItemEntity.dataInicio} type="date" format={APP_LOCAL_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="dataFim">
                            <Translate contentKey="generadorApp.padItem.dataFim">Data Fim</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={padItemEntity.dataFim} type="date" format={APP_LOCAL_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="qtdSessoes">
                            <Translate contentKey="generadorApp.padItem.qtdSessoes">Qtd Sessoes</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemEntity.qtdSessoes}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="observacao">
                            <Translate contentKey="generadorApp.padItem.observacao">Observacao</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemEntity.observacao}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="sub">
                            <Translate contentKey="generadorApp.padItem.sub">Sub</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemEntity.sub}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativo">
                            <Translate contentKey="generadorApp.padItem.ativo">Ativo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemEntity.ativo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="dataPadItemIncompleto">
                            <Translate contentKey="generadorApp.padItem.dataPadItemIncompleto">Data Pad Item Incompleto</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={padItemEntity.dataPadItemIncompleto} type="date" format={APP_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="dataPadItemCompleto">
                            <Translate contentKey="generadorApp.padItem.dataPadItemCompleto">Data Pad Item Completo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={padItemEntity.dataPadItemCompleto} type="date" format={APP_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="numGhc">
                            <Translate contentKey="generadorApp.padItem.numGhc">Num Ghc</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemEntity.numGhc}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cidXPtaNovo">
                            <Translate contentKey="generadorApp.padItem.cidXPtaNovo">Cid X Pta Novo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemEntity.cidXPtaNovo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="categoriaId">
                            <Translate contentKey="generadorApp.padItem.categoriaId">Categoria Id</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemEntity.categoriaId}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="score">
                            <Translate contentKey="generadorApp.padItem.score">Score</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemEntity.score}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.padItem.idPad">Id Pad</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemEntity.idPad ? padItemEntity.idPad.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.padItem.idEspecialidade">Id Especialidade</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemEntity.idEspecialidade ? padItemEntity.idEspecialidade.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.padItem.idPeriodicidade">Id Periodicidade</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemEntity.idPeriodicidade ? padItemEntity.idPeriodicidade.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.padItem.idPeriodo">Id Periodo</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemEntity.idPeriodo ? padItemEntity.idPeriodo.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/pad-item" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/pad-item/${padItemEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ padItem }: IRootState) => ({
  padItemEntity: padItem.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadItemDetail);
