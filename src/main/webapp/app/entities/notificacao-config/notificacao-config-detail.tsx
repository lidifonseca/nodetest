import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './notificacao-config.reducer';
import { INotificacaoConfig } from 'app/shared/model/notificacao-config.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INotificacaoConfigDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class NotificacaoConfigDetail extends React.Component<INotificacaoConfigDetailProps> {
  constructor(props: Readonly<INotificacaoConfigDetailProps>) {
    super(props);
    this.state = {
      ...this.state
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { notificacaoConfigEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Notificacao Configs</li>
          <li className="breadcrumb-item active">Notificacao Configs details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Notificacao Configs</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.notificacaoConfig.detail.title">NotificacaoConfig</Translate>[
                  <b>{notificacaoConfigEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="criadoEm">
                            <Translate contentKey="generadorApp.notificacaoConfig.criadoEm">Criado Em</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={notificacaoConfigEntity.criadoEm} type="date" format={APP_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="titulo">
                            <Translate contentKey="generadorApp.notificacaoConfig.titulo">Titulo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{notificacaoConfigEntity.titulo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="referencia">
                            <Translate contentKey="generadorApp.notificacaoConfig.referencia">Referencia</Translate>
                          </span>
                          <UncontrolledTooltip target="referencia">
                            <Translate contentKey="generadorApp.notificacaoConfig.help.referencia" />
                          </UncontrolledTooltip>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{notificacaoConfigEntity.referencia}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="descricao">
                            <Translate contentKey="generadorApp.notificacaoConfig.descricao">Descricao</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{notificacaoConfigEntity.descricao}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativo">
                            <Translate contentKey="generadorApp.notificacaoConfig.ativo">Ativo</Translate>
                          </span>
                          <UncontrolledTooltip target="ativo">
                            <Translate contentKey="generadorApp.notificacaoConfig.help.ativo" />
                          </UncontrolledTooltip>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{notificacaoConfigEntity.ativo ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="envioObrigatorio">
                            <Translate contentKey="generadorApp.notificacaoConfig.envioObrigatorio">Envio Obrigatorio</Translate>
                          </span>
                          <UncontrolledTooltip target="envioObrigatorio">
                            <Translate contentKey="generadorApp.notificacaoConfig.help.envioObrigatorio" />
                          </UncontrolledTooltip>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{notificacaoConfigEntity.envioObrigatorio ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="serveProfissional">
                            <Translate contentKey="generadorApp.notificacaoConfig.serveProfissional">Serve Profissional</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{notificacaoConfigEntity.serveProfissional ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="servePaciente">
                            <Translate contentKey="generadorApp.notificacaoConfig.servePaciente">Serve Paciente</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{notificacaoConfigEntity.servePaciente ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/notificacao-config" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/notificacao-config/${notificacaoConfigEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ notificacaoConfig }: IRootState) => ({
  notificacaoConfigEntity: notificacaoConfig.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NotificacaoConfigDetail);
