import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IPacienteDiarioTagsBaseState, getPacienteDiarioTagsState } from './paciente-diario-tags.reducer';
import { IPacienteDiarioTags } from 'app/shared/model/paciente-diario-tags.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPacienteDiarioTagsState {
  fieldsBase: IPacienteDiarioTagsBaseState;
}

export interface IPacienteDiarioTagsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteDiarioTagsDetail extends React.Component<IPacienteDiarioTagsDetailProps, IPacienteDiarioTagsState> {
  constructor(props: Readonly<IPacienteDiarioTagsDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getPacienteDiarioTagsState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { pacienteDiarioTagsEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Diario Tags</li>
          <li className="breadcrumb-item active">Paciente Diario Tags details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Paciente Diario Tags</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.pacienteDiarioTags.detail.title">PacienteDiarioTags</Translate>[
                  <b>{pacienteDiarioTagsEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idPacienteDiario">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.idPacienteDiario">Id Paciente Diario</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.idPacienteDiario}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idDiarioTags">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.idDiarioTags">Id Diario Tags</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.idDiarioTags}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="escalaDePlantao">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.escalaDePlantao">Escala De Plantao</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.escalaDePlantao}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="captacaoEdp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.captacaoEdp">Captacao Edp</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.captacaoEdp}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="implantacaoEdp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.implantacaoEdp">Implantacao Edp</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.implantacaoEdp}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="furoDeEscalaEdp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.furoDeEscalaEdp">Furo De Escala Edp</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.furoDeEscalaEdp}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="solicitacaoDeFolgaEdp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.solicitacaoDeFolgaEdp">
                              Solicitacao De Folga Edp
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.solicitacaoDeFolgaEdp}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="trocaDeProfissionalEdp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.trocaDeProfissionalEdp">
                              Troca De Profissional Edp
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.trocaDeProfissionalEdp}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="reclamacaoEdp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.reclamacaoEdp">Reclamacao Edp</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.reclamacaoEdp}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="elogioEdp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.elogioEdp">Elogio Edp</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.elogioEdp}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="recusaDeAtendimentoEdp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.recusaDeAtendimentoEdp">
                              Recusa De Atendimento Edp
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.recusaDeAtendimentoEdp}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="duplicidadeEdp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.duplicidadeEdp">Duplicidade Edp</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.duplicidadeEdp}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="monitorarEdp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarEdp">Monitorar Edp</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.monitorarEdp}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="pendenteEdp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteEdp">Pendente Edp</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.pendenteEdp}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="escalaMultiProfissional">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.escalaMultiProfissional">
                              Escala Multi Profissional
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.escalaMultiProfissional}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="captacaoEmp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.captacaoEmp">Captacao Emp</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.captacaoEmp}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="implantacaoEmp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.implantacaoEmp">Implantacao Emp</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.implantacaoEmp}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="solicitacaoDeFolgaEmp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.solicitacaoDeFolgaEmp">
                              Solicitacao De Folga Emp
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.solicitacaoDeFolgaEmp}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="trocaDeProfissionalEmp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.trocaDeProfissionalEmp">
                              Troca De Profissional Emp
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.trocaDeProfissionalEmp}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="reclamacaoEmp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.reclamacaoEmp">Reclamacao Emp</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.reclamacaoEmp}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="elogioEmp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.elogioEmp">Elogio Emp</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.elogioEmp}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="padIncompletoEmp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.padIncompletoEmp">Pad Incompleto Emp</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.padIncompletoEmp}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="visitaImprodutivaEmp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.visitaImprodutivaEmp">Visita Improdutiva Emp</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.visitaImprodutivaEmp}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="monitorarEmp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarEmp">Monitorar Emp</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.monitorarEmp}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="pendenteEmp">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteEmp">Pendente Emp</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.pendenteEmp}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="intercorrencia">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.intercorrencia">Intercorrencia</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.intercorrencia}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="clinicaInter">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.clinicaInter">Clinica Inter</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.clinicaInter}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="aphInter">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.aphInter">Aph Inter</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.aphInter}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="pendenteInter">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteInter">Pendente Inter</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.pendenteInter}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="solicitacoes">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.solicitacoes">Solicitacoes</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.solicitacoes}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="recargaDeOxigenioSolic">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.recargaDeOxigenioSolic">
                              Recarga De Oxigenio Solic
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.recargaDeOxigenioSolic}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="equipamentosSolic">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.equipamentosSolic">Equipamentos Solic</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.equipamentosSolic}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="matmedSolic">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.matmedSolic">Matmed Solic</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.matmedSolic}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="prontuarioSolic">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.prontuarioSolic">Prontuario Solic</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.prontuarioSolic}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="prescricoesSolic">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.prescricoesSolic">Prescricoes Solic</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.prescricoesSolic}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="examesSolic">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.examesSolic">Exames Solic</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.examesSolic}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ambulanciaSolic">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.ambulanciaSolic">Ambulancia Solic</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.ambulanciaSolic}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="atendimentoDeEquipeSolic">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.atendimentoDeEquipeSolic">
                              Atendimento De Equipe Solic
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.atendimentoDeEquipeSolic}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="monitorarSolic">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarSolic">Monitorar Solic</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.monitorarSolic}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="pendenteSolic">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteSolic">Pendente Solic</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.pendenteSolic}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="avaliacao">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.avaliacao">Avaliacao</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.avaliacao}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="residenciaAval">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.residenciaAval">Residencia Aval</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.residenciaAval}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="hospitalAval">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.hospitalAval">Hospital Aval</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.hospitalAval}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="monitorarAval">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarAval">Monitorar Aval</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.monitorarAval}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="captacaoAtivaAval">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.captacaoAtivaAval">Captacao Ativa Aval</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.captacaoAtivaAval}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="pendenteAval">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteAval">Pendente Aval</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.pendenteAval}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="implantacao">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.implantacao">Implantacao</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.implantacao}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="monitorarImpl">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarImpl">Monitorar Impl</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.monitorarImpl}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="pendenteImpl">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteImpl">Pendente Impl</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.pendenteImpl}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="alta">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.alta">Alta</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.alta}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="hospitalizacaoAlt">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.hospitalizacaoAlt">Hospitalizacao Alt</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.hospitalizacaoAlt}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="migracaoDeEmpresaAlt">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.migracaoDeEmpresaAlt">Migracao De Empresa Alt</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.migracaoDeEmpresaAlt}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="obitoEmCasaAlt">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.obitoEmCasaAlt">Obito Em Casa Alt</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.obitoEmCasaAlt}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="terminoDeAtendimentoAlt">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.terminoDeAtendimentoAlt">
                              Termino De Atendimento Alt
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.terminoDeAtendimentoAlt}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="atendimentoSuspensoAlt">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.atendimentoSuspensoAlt">
                              Atendimento Suspenso Alt
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.atendimentoSuspensoAlt}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="monitorarAlt">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarAlt">Monitorar Alt</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.monitorarAlt}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="pendenteAlt">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteAlt">Pendente Alt</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.pendenteAlt}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="eCommerceSegViagem">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.eCommerceSegViagem">E Commerce Seg Viagem</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.eCommerceSegViagem}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="monitorarEcsv">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarEcsv">Monitorar Ecsv</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.monitorarEcsv}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="pendenteEcsv">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteEcsv">Pendente Ecsv</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.pendenteEcsv}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="farmacia">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.farmacia">Farmacia</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.farmacia}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="matMedFarm">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.matMedFarm">Mat Med Farm</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.matMedFarm}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="receitaFarm">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.receitaFarm">Receita Farm</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.receitaFarm}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="prontuarioFarm">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.prontuarioFarm">Prontuario Farm</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.prontuarioFarm}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="romaneioManualFarm">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.romaneioManualFarm">Romaneio Manual Farm</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.romaneioManualFarm}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="outrosFarm">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.outrosFarm">Outros Farm</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.outrosFarm}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="monitorarFarm">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarFarm">Monitorar Farm</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.monitorarFarm}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="pendenteFarm">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteFarm">Pendente Farm</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.pendenteFarm}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="contatoTelefonico">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.contatoTelefonico">Contato Telefonico</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.contatoTelefonico}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativoContTel">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.ativoContTel">Ativo Cont Tel</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.ativoContTel}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="receptivoContTel">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.receptivoContTel">Receptivo Cont Tel</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.receptivoContTel}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="monitorarContTel">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarContTel">Monitorar Cont Tel</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.monitorarContTel}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="pendenteContTel">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteContTel">Pendente Cont Tel</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioTagsEntity.pendenteContTel}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="dtPost">
                            <Translate contentKey="generadorApp.pacienteDiarioTags.dtPost">Dt Post</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={pacienteDiarioTagsEntity.dtPost} type="date" format={APP_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/paciente-diario-tags" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/paciente-diario-tags/${pacienteDiarioTagsEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ pacienteDiarioTags }: IRootState) => ({
  pacienteDiarioTagsEntity: pacienteDiarioTags.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteDiarioTagsDetail);
