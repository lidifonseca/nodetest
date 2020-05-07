import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, INotificacaoConfigUsuarioBaseState, getNotificacaoConfigUsuarioState } from './notificacao-config-usuario.reducer';
import { INotificacaoConfigUsuario } from 'app/shared/model/notificacao-config-usuario.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INotificacaoConfigUsuarioState {
  fieldsBase: INotificacaoConfigUsuarioBaseState;
}

export interface INotificacaoConfigUsuarioDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class NotificacaoConfigUsuarioDetail extends React.Component<INotificacaoConfigUsuarioDetailProps, INotificacaoConfigUsuarioState> {
  constructor(props: Readonly<INotificacaoConfigUsuarioDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getNotificacaoConfigUsuarioState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { notificacaoConfigUsuarioEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Notificacao Config Usuarios</li>
          <li className="breadcrumb-item active">Notificacao Config Usuarios details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Notificacao Config Usuarios</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.notificacaoConfigUsuario.detail.title">NotificacaoConfigUsuario</Translate>[
                  <b>{notificacaoConfigUsuarioEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="notificacaoConfigId">
                            <Translate contentKey="generadorApp.notificacaoConfigUsuario.notificacaoConfigId">
                              Notificacao Config Id
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{notificacaoConfigUsuarioEntity.notificacaoConfigId}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="profissionalId">
                            <Translate contentKey="generadorApp.notificacaoConfigUsuario.profissionalId">Profissional Id</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{notificacaoConfigUsuarioEntity.profissionalId}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="pacienteId">
                            <Translate contentKey="generadorApp.notificacaoConfigUsuario.pacienteId">Paciente Id</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{notificacaoConfigUsuarioEntity.pacienteId}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="atualizadoEm">
                            <Translate contentKey="generadorApp.notificacaoConfigUsuario.atualizadoEm">Atualizado Em</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={notificacaoConfigUsuarioEntity.atualizadoEm} type="date" format={APP_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="atualizadoPor">
                            <Translate contentKey="generadorApp.notificacaoConfigUsuario.atualizadoPor">Atualizado Por</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{notificacaoConfigUsuarioEntity.atualizadoPor}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="enviarPush">
                            <Translate contentKey="generadorApp.notificacaoConfigUsuario.enviarPush">Enviar Push</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{notificacaoConfigUsuarioEntity.enviarPush ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="enviarEmail">
                            <Translate contentKey="generadorApp.notificacaoConfigUsuario.enviarEmail">Enviar Email</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{notificacaoConfigUsuarioEntity.enviarEmail ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="observacao">
                            <Translate contentKey="generadorApp.notificacaoConfigUsuario.observacao">Observacao</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{notificacaoConfigUsuarioEntity.observacao}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/notificacao-config-usuario" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/notificacao-config-usuario/${notificacaoConfigUsuarioEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ notificacaoConfigUsuario }: IRootState) => ({
  notificacaoConfigUsuarioEntity: notificacaoConfigUsuario.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NotificacaoConfigUsuarioDetail);
