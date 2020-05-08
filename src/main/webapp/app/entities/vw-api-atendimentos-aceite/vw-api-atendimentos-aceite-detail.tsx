import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IVwApiAtendimentosAceiteBaseState, getVwApiAtendimentosAceiteState } from './vw-api-atendimentos-aceite.reducer';
import { IVwApiAtendimentosAceite } from 'app/shared/model/vw-api-atendimentos-aceite.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVwApiAtendimentosAceiteState {
  fieldsBase: IVwApiAtendimentosAceiteBaseState;
}

export interface IVwApiAtendimentosAceiteDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class VwApiAtendimentosAceiteDetail extends React.Component<IVwApiAtendimentosAceiteDetailProps, IVwApiAtendimentosAceiteState> {
  constructor(props: Readonly<IVwApiAtendimentosAceiteDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getVwApiAtendimentosAceiteState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { vwApiAtendimentosAceiteEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Vw Api Atendimentos Aceites</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Vw Api Atendimentos Aceites</li>
          <li className="breadcrumb-item active">Vw Api Atendimentos Aceites details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.vwApiAtendimentosAceite.detail.title">VwApiAtendimentosAceite</Translate>[
                  <b>{vwApiAtendimentosAceiteEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idPadItem">
                            <Translate contentKey="generadorApp.vwApiAtendimentosAceite.idPadItem">Id Pad Item</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{vwApiAtendimentosAceiteEntity.idPadItem}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idPaciente">
                            <Translate contentKey="generadorApp.vwApiAtendimentosAceite.idPaciente">Id Paciente</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{vwApiAtendimentosAceiteEntity.idPaciente}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idPeriodo">
                            <Translate contentKey="generadorApp.vwApiAtendimentosAceite.idPeriodo">Id Periodo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{vwApiAtendimentosAceiteEntity.idPeriodo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idPeriodicidade">
                            <Translate contentKey="generadorApp.vwApiAtendimentosAceite.idPeriodicidade">Id Periodicidade</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{vwApiAtendimentosAceiteEntity.idPeriodicidade}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idProfissional">
                            <Translate contentKey="generadorApp.vwApiAtendimentosAceite.idProfissional">Id Profissional</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{vwApiAtendimentosAceiteEntity.idProfissional}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="aceito">
                            <Translate contentKey="generadorApp.vwApiAtendimentosAceite.aceito">Aceito</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{vwApiAtendimentosAceiteEntity.aceito}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="bairro">
                            <Translate contentKey="generadorApp.vwApiAtendimentosAceite.bairro">Bairro</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{vwApiAtendimentosAceiteEntity.bairro}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cep">
                            <Translate contentKey="generadorApp.vwApiAtendimentosAceite.cep">Cep</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{vwApiAtendimentosAceiteEntity.cep}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cidade">
                            <Translate contentKey="generadorApp.vwApiAtendimentosAceite.cidade">Cidade</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{vwApiAtendimentosAceiteEntity.cidade}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="complemento">
                            <Translate contentKey="generadorApp.vwApiAtendimentosAceite.complemento">Complemento</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{vwApiAtendimentosAceiteEntity.complemento}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="endereco">
                            <Translate contentKey="generadorApp.vwApiAtendimentosAceite.endereco">Endereco</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{vwApiAtendimentosAceiteEntity.endereco}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="especialidade">
                            <Translate contentKey="generadorApp.vwApiAtendimentosAceite.especialidade">Especialidade</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{vwApiAtendimentosAceiteEntity.especialidade}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="latitude">
                            <Translate contentKey="generadorApp.vwApiAtendimentosAceite.latitude">Latitude</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{vwApiAtendimentosAceiteEntity.latitude}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="longitude">
                            <Translate contentKey="generadorApp.vwApiAtendimentosAceite.longitude">Longitude</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{vwApiAtendimentosAceiteEntity.longitude}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="numero">
                            <Translate contentKey="generadorApp.vwApiAtendimentosAceite.numero">Numero</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{vwApiAtendimentosAceiteEntity.numero}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="paciente">
                            <Translate contentKey="generadorApp.vwApiAtendimentosAceite.paciente">Paciente</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{vwApiAtendimentosAceiteEntity.paciente}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="periodo">
                            <Translate contentKey="generadorApp.vwApiAtendimentosAceite.periodo">Periodo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{vwApiAtendimentosAceiteEntity.periodo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="periodicidade">
                            <Translate contentKey="generadorApp.vwApiAtendimentosAceite.periodicidade">Periodicidade</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{vwApiAtendimentosAceiteEntity.periodicidade}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="qtdSessoes">
                            <Translate contentKey="generadorApp.vwApiAtendimentosAceite.qtdSessoes">Qtd Sessoes</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{vwApiAtendimentosAceiteEntity.qtdSessoes}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="uf">
                            <Translate contentKey="generadorApp.vwApiAtendimentosAceite.uf">Uf</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{vwApiAtendimentosAceiteEntity.uf}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="valor">
                            <Translate contentKey="generadorApp.vwApiAtendimentosAceite.valor">Valor</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{vwApiAtendimentosAceiteEntity.valor}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/vw-api-atendimentos-aceite" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/vw-api-atendimentos-aceite/${vwApiAtendimentosAceiteEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ vwApiAtendimentosAceite }: IRootState) => ({
  vwApiAtendimentosAceiteEntity: vwApiAtendimentosAceite.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VwApiAtendimentosAceiteDetail);
