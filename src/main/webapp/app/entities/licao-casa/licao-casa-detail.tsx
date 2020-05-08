import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, ILicaoCasaBaseState, getLicaoCasaState } from './licao-casa.reducer';
import { ILicaoCasa } from 'app/shared/model/licao-casa.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILicaoCasaState {
  fieldsBase: ILicaoCasaBaseState;
}

export interface ILicaoCasaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class LicaoCasaDetail extends React.Component<ILicaoCasaDetailProps, ILicaoCasaState> {
  constructor(props: Readonly<ILicaoCasaDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getLicaoCasaState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { licaoCasaEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Licao Casas</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Licao Casas</li>
          <li className="breadcrumb-item active">Licao Casas details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.licaoCasa.detail.title">LicaoCasa</Translate>[<b>{licaoCasaEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="atendimentoId">
                            <Translate contentKey="generadorApp.licaoCasa.atendimentoId">Atendimento Id</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{licaoCasaEntity.atendimentoId}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="pacienteId">
                            <Translate contentKey="generadorApp.licaoCasa.pacienteId">Paciente Id</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{licaoCasaEntity.pacienteId}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="profissionalId">
                            <Translate contentKey="generadorApp.licaoCasa.profissionalId">Profissional Id</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{licaoCasaEntity.profissionalId}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="atividade">
                            <Translate contentKey="generadorApp.licaoCasa.atividade">Atividade</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{licaoCasaEntity.atividade}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="horaInicio">
                            <Translate contentKey="generadorApp.licaoCasa.horaInicio">Hora Inicio</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={licaoCasaEntity.horaInicio} type="date" format={APP_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="repeticaoHoras">
                            <Translate contentKey="generadorApp.licaoCasa.repeticaoHoras">Repeticao Horas</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{licaoCasaEntity.repeticaoHoras ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="qtdDias">
                            <Translate contentKey="generadorApp.licaoCasa.qtdDias">Qtd Dias</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{licaoCasaEntity.qtdDias ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="intervaloDias">
                            <Translate contentKey="generadorApp.licaoCasa.intervaloDias">Intervalo Dias</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{licaoCasaEntity.intervaloDias ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="criadoEm">
                            <Translate contentKey="generadorApp.licaoCasa.criadoEm">Criado Em</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={licaoCasaEntity.criadoEm} type="date" format={APP_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="concluidaEm">
                            <Translate contentKey="generadorApp.licaoCasa.concluidaEm">Concluida Em</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={licaoCasaEntity.concluidaEm} type="date" format={APP_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativo">
                            <Translate contentKey="generadorApp.licaoCasa.ativo">Ativo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{licaoCasaEntity.ativo ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativ">
                            <Translate contentKey="generadorApp.licaoCasa.ativ">Ativ</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{licaoCasaEntity.ativ}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="forma">
                            <Translate contentKey="generadorApp.licaoCasa.forma">Forma</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{licaoCasaEntity.forma}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="enviarPara">
                            <Translate contentKey="generadorApp.licaoCasa.enviarPara">Enviar Para</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{licaoCasaEntity.enviarPara}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="notificarFamiliar">
                            <Translate contentKey="generadorApp.licaoCasa.notificarFamiliar">Notificar Familiar</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{licaoCasaEntity.notificarFamiliar}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="replicarAtividade">
                            <Translate contentKey="generadorApp.licaoCasa.replicarAtividade">Replicar Atividade</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{licaoCasaEntity.replicarAtividade}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/licao-casa" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/licao-casa/${licaoCasaEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ licaoCasa }: IRootState) => ({
  licaoCasaEntity: licaoCasa.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LicaoCasaDetail);
