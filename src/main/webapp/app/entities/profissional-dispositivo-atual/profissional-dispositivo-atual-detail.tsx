import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import {
  getEntity,
  IProfissionalDispositivoAtualBaseState,
  getProfissionalDispositivoAtualState
} from './profissional-dispositivo-atual.reducer';
import { IProfissionalDispositivoAtual } from 'app/shared/model/profissional-dispositivo-atual.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProfissionalDispositivoAtualState {
  fieldsBase: IProfissionalDispositivoAtualBaseState;
}

export interface IProfissionalDispositivoAtualDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProfissionalDispositivoAtualDetail extends React.Component<
  IProfissionalDispositivoAtualDetailProps,
  IProfissionalDispositivoAtualState
> {
  constructor(props: Readonly<IProfissionalDispositivoAtualDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getProfissionalDispositivoAtualState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { profissionalDispositivoAtualEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Profissional Dispositivo Atuals</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Profissional Dispositivo Atuals</li>
          <li className="breadcrumb-item active">Profissional Dispositivo Atuals details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.profissionalDispositivoAtual.detail.title">ProfissionalDispositivoAtual</Translate>[
                  <b>{profissionalDispositivoAtualEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idProfissional">
                            <Translate contentKey="generadorApp.profissionalDispositivoAtual.idProfissional">Id Profissional</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalDispositivoAtualEntity.idProfissional}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="tqtTraqueostomia">
                            <Translate contentKey="generadorApp.profissionalDispositivoAtual.tqtTraqueostomia">Tqt Traqueostomia</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalDispositivoAtualEntity.tqtTraqueostomia}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="gttGastrostomia">
                            <Translate contentKey="generadorApp.profissionalDispositivoAtual.gttGastrostomia">Gtt Gastrostomia</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalDispositivoAtualEntity.gttGastrostomia}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="sneSondaNasoenteral">
                            <Translate contentKey="generadorApp.profissionalDispositivoAtual.sneSondaNasoenteral">
                              Sne Sonda Nasoenteral
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalDispositivoAtualEntity.sneSondaNasoenteral}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="svdSondaVesicalDeDemora">
                            <Translate contentKey="generadorApp.profissionalDispositivoAtual.svdSondaVesicalDeDemora">
                              Svd Sonda Vesical De Demora
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalDispositivoAtualEntity.svdSondaVesicalDeDemora}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="svaSondaVesicalDeAlivio">
                            <Translate contentKey="generadorApp.profissionalDispositivoAtual.svaSondaVesicalDeAlivio">
                              Sva Sonda Vesical De Alivio
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalDispositivoAtualEntity.svaSondaVesicalDeAlivio}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="portACath">
                            <Translate contentKey="generadorApp.profissionalDispositivoAtual.portACath">Port A Cath</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalDispositivoAtualEntity.portACath}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="piccAcessoVenosoCentral">
                            <Translate contentKey="generadorApp.profissionalDispositivoAtual.piccAcessoVenosoCentral">
                              Picc Acesso Venoso Central
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalDispositivoAtualEntity.piccAcessoVenosoCentral}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ventiladores">
                            <Translate contentKey="generadorApp.profissionalDispositivoAtual.ventiladores">Ventiladores</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalDispositivoAtualEntity.ventiladores}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="uppUlceraPorPressao">
                            <Translate contentKey="generadorApp.profissionalDispositivoAtual.uppUlceraPorPressao">
                              Upp Ulcera Por Pressao
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalDispositivoAtualEntity.uppUlceraPorPressao}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="avpAcessoVenosoPeriferico">
                            <Translate contentKey="generadorApp.profissionalDispositivoAtual.avpAcessoVenosoPeriferico">
                              Avp Acesso Venoso Periferico
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalDispositivoAtualEntity.avpAcessoVenosoPeriferico}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="uripen">
                            <Translate contentKey="generadorApp.profissionalDispositivoAtual.uripen">Uripen</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalDispositivoAtualEntity.uripen}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="fraldaGeriatrica">
                            <Translate contentKey="generadorApp.profissionalDispositivoAtual.fraldaGeriatrica">Fralda Geriatrica</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalDispositivoAtualEntity.fraldaGeriatrica}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="sngSondaNasogastrica">
                            <Translate contentKey="generadorApp.profissionalDispositivoAtual.sngSondaNasogastrica">
                              Sng Sonda Nasogastrica
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalDispositivoAtualEntity.sngSondaNasogastrica}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="bipap">
                            <Translate contentKey="generadorApp.profissionalDispositivoAtual.bipap">Bipap</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalDispositivoAtualEntity.bipap}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cpap">
                            <Translate contentKey="generadorApp.profissionalDispositivoAtual.cpap">Cpap</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalDispositivoAtualEntity.cpap}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cistostomia">
                            <Translate contentKey="generadorApp.profissionalDispositivoAtual.cistostomia">Cistostomia</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalDispositivoAtualEntity.cistostomia}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cateterNasalDeOxigenio">
                            <Translate contentKey="generadorApp.profissionalDispositivoAtual.cateterNasalDeOxigenio">
                              Cateter Nasal De Oxigenio
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalDispositivoAtualEntity.cateterNasalDeOxigenio}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="mascaraDeVentilacao">
                            <Translate contentKey="generadorApp.profissionalDispositivoAtual.mascaraDeVentilacao">
                              Mascara De Ventilacao
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalDispositivoAtualEntity.mascaraDeVentilacao}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="entubacaoOrotraqueal">
                            <Translate contentKey="generadorApp.profissionalDispositivoAtual.entubacaoOrotraqueal">
                              Entubacao Orotraqueal
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalDispositivoAtualEntity.entubacaoOrotraqueal}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/profissional-dispositivo-atual" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button
                  tag={Link}
                  to={`/profissional-dispositivo-atual/${profissionalDispositivoAtualEntity.id}/edit`}
                  replace
                  color="primary"
                >
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

const mapStateToProps = ({ profissionalDispositivoAtual }: IRootState) => ({
  profissionalDispositivoAtualEntity: profissionalDispositivoAtual.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalDispositivoAtualDetail);
