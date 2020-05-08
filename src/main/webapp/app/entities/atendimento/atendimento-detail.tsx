import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IAtendimentoBaseState, getAtendimentoState } from './atendimento.reducer';
import { IAtendimento } from 'app/shared/model/atendimento.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAtendimentoState {
  fieldsBase: IAtendimentoBaseState;
}

export interface IAtendimentoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AtendimentoDetail extends React.Component<IAtendimentoDetailProps, IAtendimentoState> {
  constructor(props: Readonly<IAtendimentoDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getAtendimentoState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { atendimentoEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Atendimentos</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Atendimentos</li>
          <li className="breadcrumb-item active">Atendimentos details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.atendimento.detail.title">Atendimento</Translate>[<b>{atendimentoEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idFranquia">
                            <Translate contentKey="generadorApp.atendimento.idFranquia">Id Franquia</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.idFranquia}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idProfissional">
                            <Translate contentKey="generadorApp.atendimento.idProfissional">Id Profissional</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.idProfissional}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cep">
                            <Translate contentKey="generadorApp.atendimento.cep">Cep</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.cep}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="endereco">
                            <Translate contentKey="generadorApp.atendimento.endereco">Endereco</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.endereco}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="numero">
                            <Translate contentKey="generadorApp.atendimento.numero">Numero</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.numero}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="complemento">
                            <Translate contentKey="generadorApp.atendimento.complemento">Complemento</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.complemento}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="bairro">
                            <Translate contentKey="generadorApp.atendimento.bairro">Bairro</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.bairro}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cidade">
                            <Translate contentKey="generadorApp.atendimento.cidade">Cidade</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.cidade}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="uf">
                            <Translate contentKey="generadorApp.atendimento.uf">Uf</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.uf}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="latitude">
                            <Translate contentKey="generadorApp.atendimento.latitude">Latitude</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.latitude}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="longitude">
                            <Translate contentKey="generadorApp.atendimento.longitude">Longitude</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.longitude}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="dataAgenda">
                            <Translate contentKey="generadorApp.atendimento.dataAgenda">Data Agenda</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={atendimentoEntity.dataAgenda} type="date" format={APP_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="horario">
                            <Translate contentKey="generadorApp.atendimento.horario">Horario</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.horario}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="dataChegada">
                            <Translate contentKey="generadorApp.atendimento.dataChegada">Data Chegada</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={atendimentoEntity.dataChegada} type="date" format={APP_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="latitudeChegada">
                            <Translate contentKey="generadorApp.atendimento.latitudeChegada">Latitude Chegada</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.latitudeChegada}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="longitudeChegada">
                            <Translate contentKey="generadorApp.atendimento.longitudeChegada">Longitude Chegada</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.longitudeChegada}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="dataSaida">
                            <Translate contentKey="generadorApp.atendimento.dataSaida">Data Saida</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={atendimentoEntity.dataSaida} type="date" format={APP_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="latitudeSaida">
                            <Translate contentKey="generadorApp.atendimento.latitudeSaida">Latitude Saida</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.latitudeSaida}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="longitudeSaida">
                            <Translate contentKey="generadorApp.atendimento.longitudeSaida">Longitude Saida</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.longitudeSaida}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="evolucao">
                            <Translate contentKey="generadorApp.atendimento.evolucao">Evolucao</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.evolucao}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="observacao">
                            <Translate contentKey="generadorApp.atendimento.observacao">Observacao</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.observacao}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="intercorrencia">
                            <Translate contentKey="generadorApp.atendimento.intercorrencia">Intercorrencia</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.intercorrencia}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="avaliacao">
                            <Translate contentKey="generadorApp.atendimento.avaliacao">Avaliacao</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.avaliacao}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="aceito">
                            <Translate contentKey="generadorApp.atendimento.aceito">Aceito</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.aceito}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="motivo">
                            <Translate contentKey="generadorApp.atendimento.motivo">Motivo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.motivo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="valor">
                            <Translate contentKey="generadorApp.atendimento.valor">Valor</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.valor}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ordemAtendimento">
                            <Translate contentKey="generadorApp.atendimento.ordemAtendimento">Ordem Atendimento</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.ordemAtendimento}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativo">
                            <Translate contentKey="generadorApp.atendimento.ativo">Ativo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.ativo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="dataForaHora">
                            <Translate contentKey="generadorApp.atendimento.dataForaHora">Data Fora Hora</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={atendimentoEntity.dataForaHora} type="date" format={APP_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idUsuarioCancelamento">
                            <Translate contentKey="generadorApp.atendimento.idUsuarioCancelamento">Id Usuario Cancelamento</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.idUsuarioCancelamento}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="dataCancelamento">
                            <Translate contentKey="generadorApp.atendimento.dataCancelamento">Data Cancelamento</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={atendimentoEntity.dataCancelamento} type="date" format={APP_LOCAL_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="tipoUsuarioCancelamento">
                            <Translate contentKey="generadorApp.atendimento.tipoUsuarioCancelamento">Tipo Usuario Cancelamento</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.tipoUsuarioCancelamento}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="confidencialProfissional">
                            <Translate contentKey="generadorApp.atendimento.confidencialProfissional">Confidencial Profissional</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.confidencialProfissional}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="confidencialPaciente">
                            <Translate contentKey="generadorApp.atendimento.confidencialPaciente">Confidencial Paciente</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.confidencialPaciente}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="imagemAssinatura">
                            <Translate contentKey="generadorApp.atendimento.imagemAssinatura">Imagem Assinatura</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.imagemAssinatura}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.atendimento.unidade">Unidade</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.unidade ? atendimentoEntity.unidade.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.atendimento.paciente">Paciente</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.paciente ? atendimentoEntity.paciente.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.atendimento.operadora">Operadora</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.operadora ? atendimentoEntity.operadora.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.atendimento.especialidade">Especialidade</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.especialidade ? atendimentoEntity.especialidade.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.atendimento.padItem">Pad Item</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.padItem ? atendimentoEntity.padItem.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.atendimento.statusAtendimento">Status Atendimento</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.statusAtendimento ? atendimentoEntity.statusAtendimento.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.atendimento.periodo">Periodo</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.periodo ? atendimentoEntity.periodo.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.atendimento.cidade">Cidade</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoEntity.cidade ? atendimentoEntity.cidade.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/atendimento" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/atendimento/${atendimentoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ atendimento }: IRootState) => ({
  atendimentoEntity: atendimento.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AtendimentoDetail);
