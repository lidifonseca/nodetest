import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IFranquia } from 'app/shared/model/franquia.model';
import { getEntities as getFranquias } from 'app/entities/franquia/franquia.reducer';
import { getEntity, updateEntity, createEntity, reset } from './franquia-usuario.reducer';
import { IFranquiaUsuario } from 'app/shared/model/franquia-usuario.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFranquiaUsuarioUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IFranquiaUsuarioUpdateState {
  isNew: boolean;
  idFranquiaId: string;
}

export class FranquiaUsuarioUpdate extends React.Component<IFranquiaUsuarioUpdateProps, IFranquiaUsuarioUpdateState> {
  constructor(props: Readonly<IFranquiaUsuarioUpdateProps>) {
    super(props);
    this.state = {
      idFranquiaId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getFranquias();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    values.dataPost = convertDateTimeToServer(values.dataPost);

    if (errors.length === 0) {
      const { franquiaUsuarioEntity } = this.props;
      const entity = {
        ...franquiaUsuarioEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/franquia-usuario');
  };

  render() {
    const { franquiaUsuarioEntity, franquias, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Franquia Usuarios</li>
          <li className="breadcrumb-item active">Franquia Usuarios edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...franquiaUsuarioEntity,
                  idFranquia: franquiaUsuarioEntity.idFranquia ? franquiaUsuarioEntity.idFranquia.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.franquiaUsuario.home.createOrEditLabel">Create or edit a FranquiaUsuario</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/franquia-usuario" replace color="info" className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
              </h2>
            </PanelHeader>
            <PanelBody>
              <Row className="justify-content-center">
                <Col md="8">
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <Row>
                      {!isNew ? (
                        <AvGroup>
                          <Row>
                            {/*
                      <Col md="3">
                      <Label className="mt-2" for="franquia-usuario-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="franquia-usuario-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="senhaLabel" for="franquia-usuario-senha">
                                <Translate contentKey="generadorApp.franquiaUsuario.senha">Senha</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="franquia-usuario-senha"
                                type="text"
                                name="senha"
                                validate={{
                                  maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="nomeLabel" for="franquia-usuario-nome">
                                <Translate contentKey="generadorApp.franquiaUsuario.nome">Nome</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="franquia-usuario-nome"
                                type="text"
                                name="nome"
                                validate={{
                                  maxLength: { value: 60, errorMessage: translate('entity.validation.maxlength', { max: 60 }) }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="emailLabel" for="franquia-usuario-email">
                                <Translate contentKey="generadorApp.franquiaUsuario.email">Email</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="franquia-usuario-email"
                                type="text"
                                name="email"
                                validate={{
                                  maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="verProfissionalLabel" for="franquia-usuario-verProfissional">
                                <Translate contentKey="generadorApp.franquiaUsuario.verProfissional">Ver Profissional</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="franquia-usuario-verProfissional"
                                type="string"
                                className="form-control"
                                name="verProfissional"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cadProfissionalLabel" for="franquia-usuario-cadProfissional">
                                <Translate contentKey="generadorApp.franquiaUsuario.cadProfissional">Cad Profissional</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="franquia-usuario-cadProfissional"
                                type="string"
                                className="form-control"
                                name="cadProfissional"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ediProfissionalLabel" for="franquia-usuario-ediProfissional">
                                <Translate contentKey="generadorApp.franquiaUsuario.ediProfissional">Edi Profissional</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="franquia-usuario-ediProfissional"
                                type="string"
                                className="form-control"
                                name="ediProfissional"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="delProfissionalLabel" for="franquia-usuario-delProfissional">
                                <Translate contentKey="generadorApp.franquiaUsuario.delProfissional">Del Profissional</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="franquia-usuario-delProfissional"
                                type="string"
                                className="form-control"
                                name="delProfissional"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="relProfissionalLabel" for="franquia-usuario-relProfissional">
                                <Translate contentKey="generadorApp.franquiaUsuario.relProfissional">Rel Profissional</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="franquia-usuario-relProfissional"
                                type="string"
                                className="form-control"
                                name="relProfissional"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="verPacienteLabel" for="franquia-usuario-verPaciente">
                                <Translate contentKey="generadorApp.franquiaUsuario.verPaciente">Ver Paciente</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="franquia-usuario-verPaciente" type="string" className="form-control" name="verPaciente" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cadPacienteLabel" for="franquia-usuario-cadPaciente">
                                <Translate contentKey="generadorApp.franquiaUsuario.cadPaciente">Cad Paciente</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="franquia-usuario-cadPaciente" type="string" className="form-control" name="cadPaciente" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ediPacienteLabel" for="franquia-usuario-ediPaciente">
                                <Translate contentKey="generadorApp.franquiaUsuario.ediPaciente">Edi Paciente</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="franquia-usuario-ediPaciente" type="string" className="form-control" name="ediPaciente" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="delPacienteLabel" for="franquia-usuario-delPaciente">
                                <Translate contentKey="generadorApp.franquiaUsuario.delPaciente">Del Paciente</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="franquia-usuario-delPaciente" type="string" className="form-control" name="delPaciente" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="relPacienteLabel" for="franquia-usuario-relPaciente">
                                <Translate contentKey="generadorApp.franquiaUsuario.relPaciente">Rel Paciente</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="franquia-usuario-relPaciente" type="string" className="form-control" name="relPaciente" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="verPadLabel" for="franquia-usuario-verPad">
                                <Translate contentKey="generadorApp.franquiaUsuario.verPad">Ver Pad</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="franquia-usuario-verPad" type="string" className="form-control" name="verPad" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cadPadLabel" for="franquia-usuario-cadPad">
                                <Translate contentKey="generadorApp.franquiaUsuario.cadPad">Cad Pad</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="franquia-usuario-cadPad" type="string" className="form-control" name="cadPad" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ediPadLabel" for="franquia-usuario-ediPad">
                                <Translate contentKey="generadorApp.franquiaUsuario.ediPad">Edi Pad</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="franquia-usuario-ediPad" type="string" className="form-control" name="ediPad" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="delPadLabel" for="franquia-usuario-delPad">
                                <Translate contentKey="generadorApp.franquiaUsuario.delPad">Del Pad</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="franquia-usuario-delPad" type="string" className="form-control" name="delPad" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="relPadLabel" for="franquia-usuario-relPad">
                                <Translate contentKey="generadorApp.franquiaUsuario.relPad">Rel Pad</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="franquia-usuario-relPad" type="string" className="form-control" name="relPad" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="verAtendimentoLabel" for="franquia-usuario-verAtendimento">
                                <Translate contentKey="generadorApp.franquiaUsuario.verAtendimento">Ver Atendimento</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="franquia-usuario-verAtendimento" type="string" className="form-control" name="verAtendimento" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cadAtendimentoLabel" for="franquia-usuario-cadAtendimento">
                                <Translate contentKey="generadorApp.franquiaUsuario.cadAtendimento">Cad Atendimento</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="franquia-usuario-cadAtendimento" type="string" className="form-control" name="cadAtendimento" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ediAtendimentoLabel" for="franquia-usuario-ediAtendimento">
                                <Translate contentKey="generadorApp.franquiaUsuario.ediAtendimento">Edi Atendimento</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="franquia-usuario-ediAtendimento" type="string" className="form-control" name="ediAtendimento" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="delAtendimentoLabel" for="franquia-usuario-delAtendimento">
                                <Translate contentKey="generadorApp.franquiaUsuario.delAtendimento">Del Atendimento</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="franquia-usuario-delAtendimento" type="string" className="form-control" name="delAtendimento" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="relAtendimentoLabel" for="franquia-usuario-relAtendimento">
                                <Translate contentKey="generadorApp.franquiaUsuario.relAtendimento">Rel Atendimento</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="franquia-usuario-relAtendimento" type="string" className="form-control" name="relAtendimento" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="verPushLabel" for="franquia-usuario-verPush">
                                <Translate contentKey="generadorApp.franquiaUsuario.verPush">Ver Push</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="franquia-usuario-verPush" type="string" className="form-control" name="verPush" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cadPushLabel" for="franquia-usuario-cadPush">
                                <Translate contentKey="generadorApp.franquiaUsuario.cadPush">Cad Push</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="franquia-usuario-cadPush" type="string" className="form-control" name="cadPush" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="verEspecialidadeValorLabel" for="franquia-usuario-verEspecialidadeValor">
                                <Translate contentKey="generadorApp.franquiaUsuario.verEspecialidadeValor">
                                  Ver Especialidade Valor
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="franquia-usuario-verEspecialidadeValor"
                                type="string"
                                className="form-control"
                                name="verEspecialidadeValor"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cadEspecialidadeValorLabel" for="franquia-usuario-cadEspecialidadeValor">
                                <Translate contentKey="generadorApp.franquiaUsuario.cadEspecialidadeValor">
                                  Cad Especialidade Valor
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="franquia-usuario-cadEspecialidadeValor"
                                type="string"
                                className="form-control"
                                name="cadEspecialidadeValor"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ediEspecialidadeValorLabel" for="franquia-usuario-ediEspecialidadeValor">
                                <Translate contentKey="generadorApp.franquiaUsuario.ediEspecialidadeValor">
                                  Edi Especialidade Valor
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="franquia-usuario-ediEspecialidadeValor"
                                type="string"
                                className="form-control"
                                name="ediEspecialidadeValor"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="delEspecialidadeValorLabel" for="franquia-usuario-delEspecialidadeValor">
                                <Translate contentKey="generadorApp.franquiaUsuario.delEspecialidadeValor">
                                  Del Especialidade Valor
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="franquia-usuario-delEspecialidadeValor"
                                type="string"
                                className="form-control"
                                name="delEspecialidadeValor"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="verUsuarioLabel" for="franquia-usuario-verUsuario">
                                <Translate contentKey="generadorApp.franquiaUsuario.verUsuario">Ver Usuario</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="franquia-usuario-verUsuario" type="string" className="form-control" name="verUsuario" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cadUsuarioLabel" for="franquia-usuario-cadUsuario">
                                <Translate contentKey="generadorApp.franquiaUsuario.cadUsuario">Cad Usuario</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="franquia-usuario-cadUsuario" type="string" className="form-control" name="cadUsuario" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ediUsuarioLabel" for="franquia-usuario-ediUsuario">
                                <Translate contentKey="generadorApp.franquiaUsuario.ediUsuario">Edi Usuario</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="franquia-usuario-ediUsuario" type="string" className="form-control" name="ediUsuario" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="delUsuarioLabel" for="franquia-usuario-delUsuario">
                                <Translate contentKey="generadorApp.franquiaUsuario.delUsuario">Del Usuario</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="franquia-usuario-delUsuario" type="string" className="form-control" name="delUsuario" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="envioRecusaLabel" for="franquia-usuario-envioRecusa">
                                <Translate contentKey="generadorApp.franquiaUsuario.envioRecusa">Envio Recusa</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="franquia-usuario-envioRecusa" type="string" className="form-control" name="envioRecusa" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="envioIntercorrenciaLabel" for="franquia-usuario-envioIntercorrencia">
                                <Translate contentKey="generadorApp.franquiaUsuario.envioIntercorrencia">Envio Intercorrencia</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="franquia-usuario-envioIntercorrencia"
                                type="string"
                                className="form-control"
                                name="envioIntercorrencia"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="envioCancelamentoLabel" for="franquia-usuario-envioCancelamento">
                                <Translate contentKey="generadorApp.franquiaUsuario.envioCancelamento">Envio Cancelamento</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="franquia-usuario-envioCancelamento"
                                type="string"
                                className="form-control"
                                name="envioCancelamento"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ativoLabel" for="franquia-usuario-ativo">
                                <Translate contentKey="generadorApp.franquiaUsuario.ativo">Ativo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="franquia-usuario-ativo" type="string" className="form-control" name="ativo" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="dataPostLabel" for="franquia-usuario-dataPost">
                                <Translate contentKey="generadorApp.franquiaUsuario.dataPost">Data Post</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="franquia-usuario-dataPost"
                                type="datetime-local"
                                className="form-control"
                                name="dataPost"
                                placeholder={'YYYY-MM-DD HH:mm'}
                                value={isNew ? null : convertDateTimeFromServer(this.props.franquiaUsuarioEntity.dataPost)}
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>
                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" for="franquia-usuario-idFranquia">
                                <Translate contentKey="generadorApp.franquiaUsuario.idFranquia">Id Franquia</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="franquia-usuario-idFranquia" type="select" className="form-control" name="idFranquia">
                                <option value="null" key="0">
                                  {translate('generadorApp.franquiaUsuario.idFranquia.empty')}
                                </option>
                                {franquias
                                  ? franquias.map(otherEntity => (
                                      <option value={otherEntity.id} key={otherEntity.id}>
                                        {otherEntity.id}
                                      </option>
                                    ))
                                  : null}
                              </AvInput>
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>
                    </Row>
                  )}
                </Col>
              </Row>
            </PanelBody>
          </Panel>
        </AvForm>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  franquias: storeState.franquia.entities,
  franquiaUsuarioEntity: storeState.franquiaUsuario.entity,
  loading: storeState.franquiaUsuario.loading,
  updating: storeState.franquiaUsuario.updating,
  updateSuccess: storeState.franquiaUsuario.updateSuccess
});

const mapDispatchToProps = {
  getFranquias,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FranquiaUsuarioUpdate);
