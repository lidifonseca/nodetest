import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IFranquiaUsuarioBaseState, getFranquiaUsuarioState } from './franquia-usuario.reducer';
import { IFranquiaUsuario } from 'app/shared/model/franquia-usuario.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFranquiaUsuarioState {
  fieldsBase: IFranquiaUsuarioBaseState;
}

export interface IFranquiaUsuarioDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FranquiaUsuarioDetail extends React.Component<IFranquiaUsuarioDetailProps, IFranquiaUsuarioState> {
  constructor(props: Readonly<IFranquiaUsuarioDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getFranquiaUsuarioState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { franquiaUsuarioEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Franquia Usuarios</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Franquia Usuarios</li>
          <li className="breadcrumb-item active">Franquia Usuarios details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.franquiaUsuario.detail.title">FranquiaUsuario</Translate>[
                  <b>{franquiaUsuarioEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="senha">
                            <Translate contentKey="generadorApp.franquiaUsuario.senha">Senha</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.senha}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="nome">
                            <Translate contentKey="generadorApp.franquiaUsuario.nome">Nome</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.nome}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="email">
                            <Translate contentKey="generadorApp.franquiaUsuario.email">Email</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.email}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="verProfissional">
                            <Translate contentKey="generadorApp.franquiaUsuario.verProfissional">Ver Profissional</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.verProfissional}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cadProfissional">
                            <Translate contentKey="generadorApp.franquiaUsuario.cadProfissional">Cad Profissional</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.cadProfissional}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ediProfissional">
                            <Translate contentKey="generadorApp.franquiaUsuario.ediProfissional">Edi Profissional</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.ediProfissional}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="delProfissional">
                            <Translate contentKey="generadorApp.franquiaUsuario.delProfissional">Del Profissional</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.delProfissional}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="relProfissional">
                            <Translate contentKey="generadorApp.franquiaUsuario.relProfissional">Rel Profissional</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.relProfissional}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="verPaciente">
                            <Translate contentKey="generadorApp.franquiaUsuario.verPaciente">Ver Paciente</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.verPaciente}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cadPaciente">
                            <Translate contentKey="generadorApp.franquiaUsuario.cadPaciente">Cad Paciente</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.cadPaciente}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ediPaciente">
                            <Translate contentKey="generadorApp.franquiaUsuario.ediPaciente">Edi Paciente</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.ediPaciente}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="delPaciente">
                            <Translate contentKey="generadorApp.franquiaUsuario.delPaciente">Del Paciente</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.delPaciente}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="relPaciente">
                            <Translate contentKey="generadorApp.franquiaUsuario.relPaciente">Rel Paciente</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.relPaciente}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="verPad">
                            <Translate contentKey="generadorApp.franquiaUsuario.verPad">Ver Pad</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.verPad}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cadPad">
                            <Translate contentKey="generadorApp.franquiaUsuario.cadPad">Cad Pad</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.cadPad}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ediPad">
                            <Translate contentKey="generadorApp.franquiaUsuario.ediPad">Edi Pad</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.ediPad}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="delPad">
                            <Translate contentKey="generadorApp.franquiaUsuario.delPad">Del Pad</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.delPad}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="relPad">
                            <Translate contentKey="generadorApp.franquiaUsuario.relPad">Rel Pad</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.relPad}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="verAtendimento">
                            <Translate contentKey="generadorApp.franquiaUsuario.verAtendimento">Ver Atendimento</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.verAtendimento}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cadAtendimento">
                            <Translate contentKey="generadorApp.franquiaUsuario.cadAtendimento">Cad Atendimento</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.cadAtendimento}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ediAtendimento">
                            <Translate contentKey="generadorApp.franquiaUsuario.ediAtendimento">Edi Atendimento</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.ediAtendimento}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="delAtendimento">
                            <Translate contentKey="generadorApp.franquiaUsuario.delAtendimento">Del Atendimento</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.delAtendimento}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="relAtendimento">
                            <Translate contentKey="generadorApp.franquiaUsuario.relAtendimento">Rel Atendimento</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.relAtendimento}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="verPush">
                            <Translate contentKey="generadorApp.franquiaUsuario.verPush">Ver Push</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.verPush}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cadPush">
                            <Translate contentKey="generadorApp.franquiaUsuario.cadPush">Cad Push</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.cadPush}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="verEspecialidadeValor">
                            <Translate contentKey="generadorApp.franquiaUsuario.verEspecialidadeValor">Ver Especialidade Valor</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.verEspecialidadeValor}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cadEspecialidadeValor">
                            <Translate contentKey="generadorApp.franquiaUsuario.cadEspecialidadeValor">Cad Especialidade Valor</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.cadEspecialidadeValor}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ediEspecialidadeValor">
                            <Translate contentKey="generadorApp.franquiaUsuario.ediEspecialidadeValor">Edi Especialidade Valor</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.ediEspecialidadeValor}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="delEspecialidadeValor">
                            <Translate contentKey="generadorApp.franquiaUsuario.delEspecialidadeValor">Del Especialidade Valor</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.delEspecialidadeValor}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="verUsuario">
                            <Translate contentKey="generadorApp.franquiaUsuario.verUsuario">Ver Usuario</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.verUsuario}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cadUsuario">
                            <Translate contentKey="generadorApp.franquiaUsuario.cadUsuario">Cad Usuario</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.cadUsuario}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ediUsuario">
                            <Translate contentKey="generadorApp.franquiaUsuario.ediUsuario">Edi Usuario</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.ediUsuario}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="delUsuario">
                            <Translate contentKey="generadorApp.franquiaUsuario.delUsuario">Del Usuario</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.delUsuario}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="envioRecusa">
                            <Translate contentKey="generadorApp.franquiaUsuario.envioRecusa">Envio Recusa</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.envioRecusa}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="envioIntercorrencia">
                            <Translate contentKey="generadorApp.franquiaUsuario.envioIntercorrencia">Envio Intercorrencia</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.envioIntercorrencia}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="envioCancelamento">
                            <Translate contentKey="generadorApp.franquiaUsuario.envioCancelamento">Envio Cancelamento</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.envioCancelamento}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativo">
                            <Translate contentKey="generadorApp.franquiaUsuario.ativo">Ativo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.ativo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.franquiaUsuario.franquia">Franquia</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaUsuarioEntity.franquia ? franquiaUsuarioEntity.franquia.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/franquia-usuario" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/franquia-usuario/${franquiaUsuarioEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ franquiaUsuario }: IRootState) => ({
  franquiaUsuarioEntity: franquiaUsuario.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FranquiaUsuarioDetail);
