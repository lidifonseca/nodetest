import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IUsuarioPainelGerencialBaseState, getUsuarioPainelGerencialState } from './usuario-painel-gerencial.reducer';
import { IUsuarioPainelGerencial } from 'app/shared/model/usuario-painel-gerencial.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUsuarioPainelGerencialState {
  fieldsBase: IUsuarioPainelGerencialBaseState;
}

export interface IUsuarioPainelGerencialDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class UsuarioPainelGerencialDetail extends React.Component<IUsuarioPainelGerencialDetailProps, IUsuarioPainelGerencialState> {
  constructor(props: Readonly<IUsuarioPainelGerencialDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getUsuarioPainelGerencialState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { usuarioPainelGerencialEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Usuario Painel Gerencials</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Usuario Painel Gerencials</li>
          <li className="breadcrumb-item active">Usuario Painel Gerencials details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.usuarioPainelGerencial.detail.title">UsuarioPainelGerencial</Translate>[
                  <b>{usuarioPainelGerencialEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="verCronicos">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.verCronicos">Ver Cronicos</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.verCronicos ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="verPacientesAtivosCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.verPacientesAtivosCr">
                              Ver Pacientes Ativos Cr
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.verPacientesAtivosCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="filtroPacientesAtivosCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroPacientesAtivosCr">
                              Filtro Pacientes Ativos Cr
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.filtroPacientesAtivosCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="verNumHospCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumHospCr">Ver Num Hosp Cr</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.verNumHospCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="filtroNumHospCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumHospCr">Filtro Num Hosp Cr</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.filtroNumHospCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="verNumDesospCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumDesospCr">Ver Num Desosp Cr</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.verNumDesospCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="filtroNumDesospCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumDesospCr">Filtro Num Desosp Cr</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.filtroNumDesospCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="verNumPsCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumPsCr">Ver Num Ps Cr</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.verNumPsCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="filtroNumPsCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumPsCr">Filtro Num Ps Cr</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.filtroNumPsCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="verNumObitoCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumObitoCr">Ver Num Obito Cr</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.verNumObitoCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="filtroNumObitoCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumObitoCr">Filtro Num Obito Cr</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.filtroNumObitoCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="verIndCliEstaveisCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.verIndCliEstaveisCr">
                              Ver Ind Cli Estaveis Cr
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.verIndCliEstaveisCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="filtroIndCliEstaveisCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroIndCliEstaveisCr">
                              Filtro Ind Cli Estaveis Cr
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.filtroIndCliEstaveisCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="verNumConsMedInternasCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumConsMedInternasCr">
                              Ver Num Cons Med Internas Cr
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.verNumConsMedInternasCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="filtroNumConsMedInternasCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumConsMedInternasCr">
                              Filtro Num Cons Med Internas Cr
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.filtroNumConsMedInternasCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="verNumConsMedExternasCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumConsMedExternasCr">
                              Ver Num Cons Med Externas Cr
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.verNumConsMedExternasCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="filtroNumConsMedExternasCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumConsMedExternasCr">
                              Filtro Num Cons Med Externas Cr
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.filtroNumConsMedExternasCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="verNumLaboratorialCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumLaboratorialCr">
                              Ver Num Laboratorial Cr
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.verNumLaboratorialCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="filtroNumLaboratorialCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumLaboratorialCr">
                              Filtro Num Laboratorial Cr
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.filtroNumLaboratorialCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="verNumImagemCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumImagemCr">Ver Num Imagem Cr</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.verNumImagemCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="filtroNumImagemCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumImagemCr">Filtro Num Imagem Cr</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.filtroNumImagemCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="verNumOutrosCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumOutrosCr">Ver Num Outros Cr</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.verNumOutrosCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="filtroNumOutrosCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumOutrosCr">Filtro Num Outros Cr</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.filtroNumOutrosCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="verNumAtCatCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumAtCatCr">Ver Num At Cat Cr</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.verNumAtCatCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="filtroNumAtCatCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumAtCatCr">Filtro Num At Cat Cr</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.filtroNumAtCatCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="verNumCatCompCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.verNumCatCompCr">Ver Num Cat Comp Cr</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.verNumCatCompCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="filtroNumCatCompCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroNumCatCompCr">
                              Filtro Num Cat Comp Cr
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.filtroNumCatCompCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="verAtCmSucessoCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.verAtCmSucessoCr">Ver At Cm Sucesso Cr</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.verAtCmSucessoCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="filtroAtCmSucessoCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroAtCmSucessoCr">
                              Filtro At Cm Sucesso Cr
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.filtroAtCmSucessoCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="verMediaPadAbertoCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.verMediaPadAbertoCr">
                              Ver Media Pad Aberto Cr
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.verMediaPadAbertoCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="filtroMediaPadAbertoCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroMediaPadAbertoCr">
                              Filtro Media Pad Aberto Cr
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.filtroMediaPadAbertoCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="verAtIntercorrenciaCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.verAtIntercorrenciaCr">
                              Ver At Intercorrencia Cr
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.verAtIntercorrenciaCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="filtroAtIntercorrenciaCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroAtIntercorrenciaCr">
                              Filtro At Intercorrencia Cr
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.filtroAtIntercorrenciaCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="verTempoMedioAtCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.verTempoMedioAtCr">Ver Tempo Medio At Cr</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.verTempoMedioAtCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="filtroTempoMedioAtCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroTempoMedioAtCr">
                              Filtro Tempo Medio At Cr
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.filtroTempoMedioAtCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="verMediaPtaCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.verMediaPtaCr">Ver Media Pta Cr</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.verMediaPtaCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="filtroMediaPtaCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroMediaPtaCr">Filtro Media Pta Cr</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.filtroMediaPtaCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="verIndicadorUsoAppCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.verIndicadorUsoAppCr">
                              Ver Indicador Uso App Cr
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.verIndicadorUsoAppCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="filtroIndicadorUsoAppCr">
                            <Translate contentKey="generadorApp.usuarioPainelGerencial.filtroIndicadorUsoAppCr">
                              Filtro Indicador Uso App Cr
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{usuarioPainelGerencialEntity.filtroIndicadorUsoAppCr ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/usuario-painel-gerencial" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/usuario-painel-gerencial/${usuarioPainelGerencialEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ usuarioPainelGerencial }: IRootState) => ({
  usuarioPainelGerencialEntity: usuarioPainelGerencial.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UsuarioPainelGerencialDetail);
