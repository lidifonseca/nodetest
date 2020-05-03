import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './atendimento-acompanhamento-push.reducer';
import { IAtendimentoAcompanhamentoPush } from 'app/shared/model/atendimento-acompanhamento-push.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAtendimentoAcompanhamentoPushDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AtendimentoAcompanhamentoPushDetail extends React.Component<IAtendimentoAcompanhamentoPushDetailProps> {
  constructor(props: Readonly<IAtendimentoAcompanhamentoPushDetailProps>) {
    super(props);
    this.state = {
      ...this.state
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { atendimentoAcompanhamentoPushEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Atendimento Acompanhamento Pushes</li>
          <li className="breadcrumb-item active">Atendimento Acompanhamento Pushes details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Atendimento Acompanhamento Pushes</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.atendimentoAcompanhamentoPush.detail.title">AtendimentoAcompanhamentoPush</Translate>[
                  <b>{atendimentoAcompanhamentoPushEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="atendimentoId">
                            <Translate contentKey="generadorApp.atendimentoAcompanhamentoPush.atendimentoId">Atendimento Id</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoAcompanhamentoPushEntity.atendimentoId}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="pacienteId">
                            <Translate contentKey="generadorApp.atendimentoAcompanhamentoPush.pacienteId">Paciente Id</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoAcompanhamentoPushEntity.pacienteId}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="profissionalId">
                            <Translate contentKey="generadorApp.atendimentoAcompanhamentoPush.profissionalId">Profissional Id</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoAcompanhamentoPushEntity.profissionalId}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="timestampAtendimento">
                            <Translate contentKey="generadorApp.atendimentoAcompanhamentoPush.timestampAtendimento">
                              Timestamp Atendimento
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat
                            value={atendimentoAcompanhamentoPushEntity.timestampAtendimento}
                            type="date"
                            format={APP_DATE_FORMAT}
                          />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="nomePaciente">
                            <Translate contentKey="generadorApp.atendimentoAcompanhamentoPush.nomePaciente">Nome Paciente</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoAcompanhamentoPushEntity.nomePaciente}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="nomeProfissioinal">
                            <Translate contentKey="generadorApp.atendimentoAcompanhamentoPush.nomeProfissioinal">
                              Nome Profissioinal
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoAcompanhamentoPushEntity.nomeProfissioinal}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="timestampConfirmacao">
                            <Translate contentKey="generadorApp.atendimentoAcompanhamentoPush.timestampConfirmacao">
                              Timestamp Confirmacao
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat
                            value={atendimentoAcompanhamentoPushEntity.timestampConfirmacao}
                            type="date"
                            format={APP_DATE_FORMAT}
                          />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="dataPost">
                            <Translate contentKey="generadorApp.atendimentoAcompanhamentoPush.dataPost">Data Post</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={atendimentoAcompanhamentoPushEntity.dataPost} type="date" format={APP_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/atendimento-acompanhamento-push" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button
                  tag={Link}
                  to={`/atendimento-acompanhamento-push/${atendimentoAcompanhamentoPushEntity.id}/edit`}
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

const mapStateToProps = ({ atendimentoAcompanhamentoPush }: IRootState) => ({
  atendimentoAcompanhamentoPushEntity: atendimentoAcompanhamentoPush.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AtendimentoAcompanhamentoPushDetail);
