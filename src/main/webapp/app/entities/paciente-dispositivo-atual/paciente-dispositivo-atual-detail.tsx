import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IPacienteDispositivoAtualBaseState, getPacienteDispositivoAtualState } from './paciente-dispositivo-atual.reducer';
import { IPacienteDispositivoAtual } from 'app/shared/model/paciente-dispositivo-atual.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPacienteDispositivoAtualState {
  fieldsBase: IPacienteDispositivoAtualBaseState;
}

export interface IPacienteDispositivoAtualDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteDispositivoAtualDetail extends React.Component<IPacienteDispositivoAtualDetailProps, IPacienteDispositivoAtualState> {
  constructor(props: Readonly<IPacienteDispositivoAtualDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getPacienteDispositivoAtualState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { pacienteDispositivoAtualEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Paciente Dispositivo Atuals</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Dispositivo Atuals</li>
          <li className="breadcrumb-item active">Paciente Dispositivo Atuals details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.pacienteDispositivoAtual.detail.title">PacienteDispositivoAtual</Translate>[
                  <b>{pacienteDispositivoAtualEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idPaciente">
                            <Translate contentKey="generadorApp.pacienteDispositivoAtual.idPaciente">Id Paciente</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDispositivoAtualEntity.idPaciente}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idPacienteDispositivo">
                            <Translate contentKey="generadorApp.pacienteDispositivoAtual.idPacienteDispositivo">
                              Id Paciente Dispositivo
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDispositivoAtualEntity.idPacienteDispositivo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="tqtTraqueostomia">
                            <Translate contentKey="generadorApp.pacienteDispositivoAtual.tqtTraqueostomia">Tqt Traqueostomia</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDispositivoAtualEntity.tqtTraqueostomia}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="gttGastrostomia">
                            <Translate contentKey="generadorApp.pacienteDispositivoAtual.gttGastrostomia">Gtt Gastrostomia</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDispositivoAtualEntity.gttGastrostomia}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="sneSondaNasoenteral">
                            <Translate contentKey="generadorApp.pacienteDispositivoAtual.sneSondaNasoenteral">
                              Sne Sonda Nasoenteral
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDispositivoAtualEntity.sneSondaNasoenteral}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="svdSondaVesicalDeDemora">
                            <Translate contentKey="generadorApp.pacienteDispositivoAtual.svdSondaVesicalDeDemora">
                              Svd Sonda Vesical De Demora
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDispositivoAtualEntity.svdSondaVesicalDeDemora}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="svaSondaVesicalDeAlivio">
                            <Translate contentKey="generadorApp.pacienteDispositivoAtual.svaSondaVesicalDeAlivio">
                              Sva Sonda Vesical De Alivio
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDispositivoAtualEntity.svaSondaVesicalDeAlivio}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="portACath">
                            <Translate contentKey="generadorApp.pacienteDispositivoAtual.portACath">Port A Cath</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDispositivoAtualEntity.portACath}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="piccAcessoVenosoCentral">
                            <Translate contentKey="generadorApp.pacienteDispositivoAtual.piccAcessoVenosoCentral">
                              Picc Acesso Venoso Central
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDispositivoAtualEntity.piccAcessoVenosoCentral}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ventiladores">
                            <Translate contentKey="generadorApp.pacienteDispositivoAtual.ventiladores">Ventiladores</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDispositivoAtualEntity.ventiladores}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="uppUlceraPorPressao">
                            <Translate contentKey="generadorApp.pacienteDispositivoAtual.uppUlceraPorPressao">
                              Upp Ulcera Por Pressao
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDispositivoAtualEntity.uppUlceraPorPressao}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="avpAcessoVenosoPeriferico">
                            <Translate contentKey="generadorApp.pacienteDispositivoAtual.avpAcessoVenosoPeriferico">
                              Avp Acesso Venoso Periferico
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDispositivoAtualEntity.avpAcessoVenosoPeriferico}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="uripen">
                            <Translate contentKey="generadorApp.pacienteDispositivoAtual.uripen">Uripen</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDispositivoAtualEntity.uripen}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="fraldaGeriatrica">
                            <Translate contentKey="generadorApp.pacienteDispositivoAtual.fraldaGeriatrica">Fralda Geriatrica</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDispositivoAtualEntity.fraldaGeriatrica}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="sngSondaNasogastrica">
                            <Translate contentKey="generadorApp.pacienteDispositivoAtual.sngSondaNasogastrica">
                              Sng Sonda Nasogastrica
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDispositivoAtualEntity.sngSondaNasogastrica}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="bipap">
                            <Translate contentKey="generadorApp.pacienteDispositivoAtual.bipap">Bipap</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDispositivoAtualEntity.bipap}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cpap">
                            <Translate contentKey="generadorApp.pacienteDispositivoAtual.cpap">Cpap</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDispositivoAtualEntity.cpap}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cistostomia">
                            <Translate contentKey="generadorApp.pacienteDispositivoAtual.cistostomia">Cistostomia</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDispositivoAtualEntity.cistostomia}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cateterNasalDeOxigenio">
                            <Translate contentKey="generadorApp.pacienteDispositivoAtual.cateterNasalDeOxigenio">
                              Cateter Nasal De Oxigenio
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDispositivoAtualEntity.cateterNasalDeOxigenio}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="mascaraDeVentilacao">
                            <Translate contentKey="generadorApp.pacienteDispositivoAtual.mascaraDeVentilacao">
                              Mascara De Ventilacao
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDispositivoAtualEntity.mascaraDeVentilacao}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="entubacaoOrotraqueal">
                            <Translate contentKey="generadorApp.pacienteDispositivoAtual.entubacaoOrotraqueal">
                              Entubacao Orotraqueal
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDispositivoAtualEntity.entubacaoOrotraqueal}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ileostomia">
                            <Translate contentKey="generadorApp.pacienteDispositivoAtual.ileostomia">Ileostomia</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDispositivoAtualEntity.ileostomia}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="jejunostomia">
                            <Translate contentKey="generadorApp.pacienteDispositivoAtual.jejunostomia">Jejunostomia</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDispositivoAtualEntity.jejunostomia}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="colostomia">
                            <Translate contentKey="generadorApp.pacienteDispositivoAtual.colostomia">Colostomia</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDispositivoAtualEntity.colostomia}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/paciente-dispositivo-atual" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/paciente-dispositivo-atual/${pacienteDispositivoAtualEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ pacienteDispositivoAtual }: IRootState) => ({
  pacienteDispositivoAtualEntity: pacienteDispositivoAtual.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteDispositivoAtualDetail);
