import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IPadItemMetaBaseState, getPadItemMetaState } from './pad-item-meta.reducer';
import { IPadItemMeta } from 'app/shared/model/pad-item-meta.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPadItemMetaState {
  fieldsBase: IPadItemMetaBaseState;
}

export interface IPadItemMetaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PadItemMetaDetail extends React.Component<IPadItemMetaDetailProps, IPadItemMetaState> {
  constructor(props: Readonly<IPadItemMetaDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getPadItemMetaState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { padItemMetaEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Item Metas</li>
          <li className="breadcrumb-item active">Pad Item Metas details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Pad Item Metas</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.padItemMeta.detail.title">PadItemMeta</Translate>[<b>{padItemMetaEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="unidadeMedidaId">
                            <Translate contentKey="generadorApp.padItemMeta.unidadeMedidaId">Unidade Medida Id</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemMetaEntity.unidadeMedidaId}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="indicadorId">
                            <Translate contentKey="generadorApp.padItemMeta.indicadorId">Indicador Id</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemMetaEntity.indicadorId}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idPaciente">
                            <Translate contentKey="generadorApp.padItemMeta.idPaciente">Id Paciente</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemMetaEntity.idPaciente}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idPad">
                            <Translate contentKey="generadorApp.padItemMeta.idPad">Id Pad</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemMetaEntity.idPad}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idPadItem">
                            <Translate contentKey="generadorApp.padItemMeta.idPadItem">Id Pad Item</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemMetaEntity.idPadItem}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="minimo">
                            <Translate contentKey="generadorApp.padItemMeta.minimo">Minimo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemMetaEntity.minimo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="maximo">
                            <Translate contentKey="generadorApp.padItemMeta.maximo">Maximo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemMetaEntity.maximo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="meta">
                            <Translate contentKey="generadorApp.padItemMeta.meta">Meta</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemMetaEntity.meta}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="valorAtual">
                            <Translate contentKey="generadorApp.padItemMeta.valorAtual">Valor Atual</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemMetaEntity.valorAtual}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="atualizadoEm">
                            <Translate contentKey="generadorApp.padItemMeta.atualizadoEm">Atualizado Em</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={padItemMetaEntity.atualizadoEm} type="date" format={APP_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="dataLimite">
                            <Translate contentKey="generadorApp.padItemMeta.dataLimite">Data Limite</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={padItemMetaEntity.dataLimite} type="date" format={APP_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="frequenciaMedicaoHoras">
                            <Translate contentKey="generadorApp.padItemMeta.frequenciaMedicaoHoras">Frequencia Medicao Horas</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemMetaEntity.frequenciaMedicaoHoras}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="tipoAcompanhamento">
                            <Translate contentKey="generadorApp.padItemMeta.tipoAcompanhamento">Tipo Acompanhamento</Translate>
                          </span>
                          <UncontrolledTooltip target="tipoAcompanhamento">
                            <Translate contentKey="generadorApp.padItemMeta.help.tipoAcompanhamento" />
                          </UncontrolledTooltip>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemMetaEntity.tipoAcompanhamento}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="atendimentoId">
                            <Translate contentKey="generadorApp.padItemMeta.atendimentoId">Atendimento Id</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemMetaEntity.atendimentoId}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="email">
                            <Translate contentKey="generadorApp.padItemMeta.email">Email</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemMetaEntity.email}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="minimoSistolica">
                            <Translate contentKey="generadorApp.padItemMeta.minimoSistolica">Minimo Sistolica</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemMetaEntity.minimoSistolica}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="maximoSistolica">
                            <Translate contentKey="generadorApp.padItemMeta.maximoSistolica">Maximo Sistolica</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemMetaEntity.maximoSistolica}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="minimoDiastolica">
                            <Translate contentKey="generadorApp.padItemMeta.minimoDiastolica">Minimo Diastolica</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemMetaEntity.minimoDiastolica}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="maximoDiastolica">
                            <Translate contentKey="generadorApp.padItemMeta.maximoDiastolica">Maximo Diastolica</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemMetaEntity.maximoDiastolica}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="score">
                            <Translate contentKey="generadorApp.padItemMeta.score">Score</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemMetaEntity.score}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="alteracaoEsperada">
                            <Translate contentKey="generadorApp.padItemMeta.alteracaoEsperada">Alteracao Esperada</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemMetaEntity.alteracaoEsperada ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/pad-item-meta" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/pad-item-meta/${padItemMetaEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ padItemMeta }: IRootState) => ({
  padItemMetaEntity: padItemMeta.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadItemMetaDetail);
