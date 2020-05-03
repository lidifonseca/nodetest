import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITipoUsuario } from 'app/shared/model/tipo-usuario.model';
import { getEntities as getTipoUsuarios } from 'app/entities/tipo-usuario/tipo-usuario.reducer';
import { getEntity, updateEntity, createEntity, reset } from './usuario.reducer';
import { IUsuario } from 'app/shared/model/usuario.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUsuarioUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IUsuarioUpdateState {
  isNew: boolean;
  idTipoUsuarioId: string;
}

export class UsuarioUpdate extends React.Component<IUsuarioUpdateProps, IUsuarioUpdateState> {
  constructor(props: Readonly<IUsuarioUpdateProps>) {
    super(props);
    this.state = {
      idTipoUsuarioId: '0',
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

    this.props.getTipoUsuarios();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    values.dataPost = convertDateTimeToServer(values.dataPost);

    if (errors.length === 0) {
      const { usuarioEntity } = this.props;
      const entity = {
        ...usuarioEntity,
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
    this.props.history.push('/usuario');
  };

  render() {
    const { usuarioEntity, tipoUsuarios, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Usuarios</li>
          <li className="breadcrumb-item active">Usuarios edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...usuarioEntity,
                  idTipoUsuario: usuarioEntity.idTipoUsuario ? usuarioEntity.idTipoUsuario.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.usuario.home.createOrEditLabel">Create or edit a Usuario</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/usuario" replace color="info" className="float-right jh-create-entity">
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
                      <Label className="mt-2" for="usuario-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="usuario-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="idUnidadeLabel" for="usuario-idUnidade">
                                <Translate contentKey="generadorApp.usuario.idUnidade">Id Unidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="usuario-idUnidade"
                                type="text"
                                name="idUnidade"
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
                              <Label className="mt-2" id="idOperadoraLabel" for="usuario-idOperadora">
                                <Translate contentKey="generadorApp.usuario.idOperadora">Id Operadora</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="usuario-idOperadora"
                                type="text"
                                name="idOperadora"
                                validate={{
                                  maxLength: { value: 1000, errorMessage: translate('entity.validation.maxlength', { max: 1000 }) }
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
                              <Label className="mt-2" id="senhaLabel" for="usuario-senha">
                                <Translate contentKey="generadorApp.usuario.senha">Senha</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="usuario-senha"
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
                              <Label className="mt-2" id="nomeLabel" for="usuario-nome">
                                <Translate contentKey="generadorApp.usuario.nome">Nome</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="usuario-nome"
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
                              <Label className="mt-2" id="emailLabel" for="usuario-email">
                                <Translate contentKey="generadorApp.usuario.email">Email</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="usuario-email"
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
                              <Label className="mt-2" id="telefoneLabel" for="usuario-telefone">
                                <Translate contentKey="generadorApp.usuario.telefone">Telefone</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="usuario-telefone"
                                type="text"
                                name="telefone"
                                validate={{
                                  maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
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
                              <Label className="mt-2" id="celularLabel" for="usuario-celular">
                                <Translate contentKey="generadorApp.usuario.celular">Celular</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="usuario-celular"
                                type="text"
                                name="celular"
                                validate={{
                                  maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
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
                              <Label className="mt-2" id="cpfLabel" for="usuario-cpf">
                                <Translate contentKey="generadorApp.usuario.cpf">Cpf</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="usuario-cpf"
                                type="text"
                                name="cpf"
                                validate={{
                                  maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
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
                              <Label className="mt-2" id="rgLabel" for="usuario-rg">
                                <Translate contentKey="generadorApp.usuario.rg">Rg</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="usuario-rg"
                                type="text"
                                name="rg"
                                validate={{
                                  maxLength: { value: 30, errorMessage: translate('entity.validation.maxlength', { max: 30 }) }
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
                              <Label className="mt-2" id="sexoLabel" for="usuario-sexo">
                                <Translate contentKey="generadorApp.usuario.sexo">Sexo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-sexo" type="string" className="form-control" name="sexo" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="nascimentoLabel" for="usuario-nascimento">
                                <Translate contentKey="generadorApp.usuario.nascimento">Nascimento</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-nascimento" type="date" className="form-control" name="nascimento" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="verAtendimentoLabel" for="usuario-verAtendimento">
                                <Translate contentKey="generadorApp.usuario.verAtendimento">Ver Atendimento</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-verAtendimento" type="string" className="form-control" name="verAtendimento" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cadAtendimentoLabel" for="usuario-cadAtendimento">
                                <Translate contentKey="generadorApp.usuario.cadAtendimento">Cad Atendimento</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-cadAtendimento" type="string" className="form-control" name="cadAtendimento" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ediAtendimentoLabel" for="usuario-ediAtendimento">
                                <Translate contentKey="generadorApp.usuario.ediAtendimento">Edi Atendimento</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-ediAtendimento" type="string" className="form-control" name="ediAtendimento" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="baixaManualAtendimentoLabel" for="usuario-baixaManualAtendimento">
                                <Translate contentKey="generadorApp.usuario.baixaManualAtendimento">Baixa Manual Atendimento</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="usuario-baixaManualAtendimento"
                                type="string"
                                className="form-control"
                                name="baixaManualAtendimento"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="delAtendimentoLabel" for="usuario-delAtendimento">
                                <Translate contentKey="generadorApp.usuario.delAtendimento">Del Atendimento</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-delAtendimento" type="string" className="form-control" name="delAtendimento" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="relAtendimentoLabel" for="usuario-relAtendimento">
                                <Translate contentKey="generadorApp.usuario.relAtendimento">Rel Atendimento</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-relAtendimento" type="string" className="form-control" name="relAtendimento" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="verPadLabel" for="usuario-verPad">
                                <Translate contentKey="generadorApp.usuario.verPad">Ver Pad</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-verPad" type="string" className="form-control" name="verPad" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cadPadLabel" for="usuario-cadPad">
                                <Translate contentKey="generadorApp.usuario.cadPad">Cad Pad</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-cadPad" type="string" className="form-control" name="cadPad" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ediPadLabel" for="usuario-ediPad">
                                <Translate contentKey="generadorApp.usuario.ediPad">Edi Pad</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-ediPad" type="string" className="form-control" name="ediPad" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="delPadLabel" for="usuario-delPad">
                                <Translate contentKey="generadorApp.usuario.delPad">Del Pad</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-delPad" type="string" className="form-control" name="delPad" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="relPadLabel" for="usuario-relPad">
                                <Translate contentKey="generadorApp.usuario.relPad">Rel Pad</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-relPad" type="string" className="form-control" name="relPad" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="verDiarioLabel" for="usuario-verDiario">
                                <Translate contentKey="generadorApp.usuario.verDiario">Ver Diario</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-verDiario" type="string" className="form-control" name="verDiario" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cadDiarioLabel" for="usuario-cadDiario">
                                <Translate contentKey="generadorApp.usuario.cadDiario">Cad Diario</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-cadDiario" type="string" className="form-control" name="cadDiario" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ediDiarioLabel" for="usuario-ediDiario">
                                <Translate contentKey="generadorApp.usuario.ediDiario">Edi Diario</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-ediDiario" type="string" className="form-control" name="ediDiario" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="delDiarioLabel" for="usuario-delDiario">
                                <Translate contentKey="generadorApp.usuario.delDiario">Del Diario</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-delDiario" type="string" className="form-control" name="delDiario" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="relDiarioLabel" for="usuario-relDiario">
                                <Translate contentKey="generadorApp.usuario.relDiario">Rel Diario</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-relDiario" type="string" className="form-control" name="relDiario" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="verCategoriaLabel" for="usuario-verCategoria">
                                <Translate contentKey="generadorApp.usuario.verCategoria">Ver Categoria</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-verCategoria" type="string" className="form-control" name="verCategoria" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cadCategoriaLabel" for="usuario-cadCategoria">
                                <Translate contentKey="generadorApp.usuario.cadCategoria">Cad Categoria</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-cadCategoria" type="string" className="form-control" name="cadCategoria" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ediCategoriaLabel" for="usuario-ediCategoria">
                                <Translate contentKey="generadorApp.usuario.ediCategoria">Edi Categoria</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-ediCategoria" type="string" className="form-control" name="ediCategoria" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="delCategoriaLabel" for="usuario-delCategoria">
                                <Translate contentKey="generadorApp.usuario.delCategoria">Del Categoria</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-delCategoria" type="string" className="form-control" name="delCategoria" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="verEspecialidadeLabel" for="usuario-verEspecialidade">
                                <Translate contentKey="generadorApp.usuario.verEspecialidade">Ver Especialidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-verEspecialidade" type="string" className="form-control" name="verEspecialidade" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cadEspecialidadeLabel" for="usuario-cadEspecialidade">
                                <Translate contentKey="generadorApp.usuario.cadEspecialidade">Cad Especialidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-cadEspecialidade" type="string" className="form-control" name="cadEspecialidade" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ediEspecialidadeLabel" for="usuario-ediEspecialidade">
                                <Translate contentKey="generadorApp.usuario.ediEspecialidade">Edi Especialidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-ediEspecialidade" type="string" className="form-control" name="ediEspecialidade" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="delEspecialidadeLabel" for="usuario-delEspecialidade">
                                <Translate contentKey="generadorApp.usuario.delEspecialidade">Del Especialidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-delEspecialidade" type="string" className="form-control" name="delEspecialidade" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="relEspecialidadeLabel" for="usuario-relEspecialidade">
                                <Translate contentKey="generadorApp.usuario.relEspecialidade">Rel Especialidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-relEspecialidade" type="string" className="form-control" name="relEspecialidade" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="verEspecialidadeValorLabel" for="usuario-verEspecialidadeValor">
                                <Translate contentKey="generadorApp.usuario.verEspecialidadeValor">Ver Especialidade Valor</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="usuario-verEspecialidadeValor"
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
                              <Label className="mt-2" id="cadEspecialidadeValorLabel" for="usuario-cadEspecialidadeValor">
                                <Translate contentKey="generadorApp.usuario.cadEspecialidadeValor">Cad Especialidade Valor</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="usuario-cadEspecialidadeValor"
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
                              <Label className="mt-2" id="ediEspecialidadeValorLabel" for="usuario-ediEspecialidadeValor">
                                <Translate contentKey="generadorApp.usuario.ediEspecialidadeValor">Edi Especialidade Valor</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="usuario-ediEspecialidadeValor"
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
                              <Label className="mt-2" id="delEspecialidadeValorLabel" for="usuario-delEspecialidadeValor">
                                <Translate contentKey="generadorApp.usuario.delEspecialidadeValor">Del Especialidade Valor</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="usuario-delEspecialidadeValor"
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
                              <Label className="mt-2" id="relEspecialidadeValorLabel" for="usuario-relEspecialidadeValor">
                                <Translate contentKey="generadorApp.usuario.relEspecialidadeValor">Rel Especialidade Valor</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="usuario-relEspecialidadeValor"
                                type="string"
                                className="form-control"
                                name="relEspecialidadeValor"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="verOperadoraLabel" for="usuario-verOperadora">
                                <Translate contentKey="generadorApp.usuario.verOperadora">Ver Operadora</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-verOperadora" type="string" className="form-control" name="verOperadora" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cadOperadoraLabel" for="usuario-cadOperadora">
                                <Translate contentKey="generadorApp.usuario.cadOperadora">Cad Operadora</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-cadOperadora" type="string" className="form-control" name="cadOperadora" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ediOperadoraLabel" for="usuario-ediOperadora">
                                <Translate contentKey="generadorApp.usuario.ediOperadora">Edi Operadora</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-ediOperadora" type="string" className="form-control" name="ediOperadora" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="delOperadoraLabel" for="usuario-delOperadora">
                                <Translate contentKey="generadorApp.usuario.delOperadora">Del Operadora</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-delOperadora" type="string" className="form-control" name="delOperadora" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="verPacienteLabel" for="usuario-verPaciente">
                                <Translate contentKey="generadorApp.usuario.verPaciente">Ver Paciente</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-verPaciente" type="string" className="form-control" name="verPaciente" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cadPacienteLabel" for="usuario-cadPaciente">
                                <Translate contentKey="generadorApp.usuario.cadPaciente">Cad Paciente</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-cadPaciente" type="string" className="form-control" name="cadPaciente" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ediPacienteLabel" for="usuario-ediPaciente">
                                <Translate contentKey="generadorApp.usuario.ediPaciente">Edi Paciente</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-ediPaciente" type="string" className="form-control" name="ediPaciente" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="delPacienteLabel" for="usuario-delPaciente">
                                <Translate contentKey="generadorApp.usuario.delPaciente">Del Paciente</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-delPaciente" type="string" className="form-control" name="delPaciente" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="relPacienteLabel" for="usuario-relPaciente">
                                <Translate contentKey="generadorApp.usuario.relPaciente">Rel Paciente</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-relPaciente" type="string" className="form-control" name="relPaciente" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="verProfissionalLabel" for="usuario-verProfissional">
                                <Translate contentKey="generadorApp.usuario.verProfissional">Ver Profissional</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-verProfissional" type="string" className="form-control" name="verProfissional" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cadProfissionalLabel" for="usuario-cadProfissional">
                                <Translate contentKey="generadorApp.usuario.cadProfissional">Cad Profissional</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-cadProfissional" type="string" className="form-control" name="cadProfissional" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ediProfissionalLabel" for="usuario-ediProfissional">
                                <Translate contentKey="generadorApp.usuario.ediProfissional">Edi Profissional</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-ediProfissional" type="string" className="form-control" name="ediProfissional" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="delProfissionalLabel" for="usuario-delProfissional">
                                <Translate contentKey="generadorApp.usuario.delProfissional">Del Profissional</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-delProfissional" type="string" className="form-control" name="delProfissional" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ativProfissionalLabel" for="usuario-ativProfissional">
                                <Translate contentKey="generadorApp.usuario.ativProfissional">Ativ Profissional</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-ativProfissional" type="string" className="form-control" name="ativProfissional" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="relProfissionalLabel" for="usuario-relProfissional">
                                <Translate contentKey="generadorApp.usuario.relProfissional">Rel Profissional</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-relProfissional" type="string" className="form-control" name="relProfissional" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="verPushLabel" for="usuario-verPush">
                                <Translate contentKey="generadorApp.usuario.verPush">Ver Push</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-verPush" type="string" className="form-control" name="verPush" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cadPushPacienteLabel" for="usuario-cadPushPaciente">
                                <Translate contentKey="generadorApp.usuario.cadPushPaciente">Cad Push Paciente</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-cadPushPaciente" type="string" className="form-control" name="cadPushPaciente" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cadPushProfissionalLabel" for="usuario-cadPushProfissional">
                                <Translate contentKey="generadorApp.usuario.cadPushProfissional">Cad Push Profissional</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-cadPushProfissional" type="string" className="form-control" name="cadPushProfissional" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="verTermoPacienteLabel" for="usuario-verTermoPaciente">
                                <Translate contentKey="generadorApp.usuario.verTermoPaciente">Ver Termo Paciente</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-verTermoPaciente" type="string" className="form-control" name="verTermoPaciente" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ediTermoPacienteLabel" for="usuario-ediTermoPaciente">
                                <Translate contentKey="generadorApp.usuario.ediTermoPaciente">Edi Termo Paciente</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-ediTermoPaciente" type="string" className="form-control" name="ediTermoPaciente" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="verTermoProfissionalLabel" for="usuario-verTermoProfissional">
                                <Translate contentKey="generadorApp.usuario.verTermoProfissional">Ver Termo Profissional</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="usuario-verTermoProfissional"
                                type="string"
                                className="form-control"
                                name="verTermoProfissional"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ediTermoProfissionalLabel" for="usuario-ediTermoProfissional">
                                <Translate contentKey="generadorApp.usuario.ediTermoProfissional">Edi Termo Profissional</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="usuario-ediTermoProfissional"
                                type="string"
                                className="form-control"
                                name="ediTermoProfissional"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="verOutrosLabel" for="usuario-verOutros">
                                <Translate contentKey="generadorApp.usuario.verOutros">Ver Outros</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-verOutros" type="string" className="form-control" name="verOutros" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cadOutrosLabel" for="usuario-cadOutros">
                                <Translate contentKey="generadorApp.usuario.cadOutros">Cad Outros</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-cadOutros" type="string" className="form-control" name="cadOutros" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ediOutrosLabel" for="usuario-ediOutros">
                                <Translate contentKey="generadorApp.usuario.ediOutros">Edi Outros</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-ediOutros" type="string" className="form-control" name="ediOutros" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="delOutrosLabel" for="usuario-delOutros">
                                <Translate contentKey="generadorApp.usuario.delOutros">Del Outros</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-delOutros" type="string" className="form-control" name="delOutros" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="relOutrosLabel" for="usuario-relOutros">
                                <Translate contentKey="generadorApp.usuario.relOutros">Rel Outros</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-relOutros" type="string" className="form-control" name="relOutros" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="verUnidadeEasyLabel" for="usuario-verUnidadeEasy">
                                <Translate contentKey="generadorApp.usuario.verUnidadeEasy">Ver Unidade Easy</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-verUnidadeEasy" type="string" className="form-control" name="verUnidadeEasy" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cadUnidadeEasyLabel" for="usuario-cadUnidadeEasy">
                                <Translate contentKey="generadorApp.usuario.cadUnidadeEasy">Cad Unidade Easy</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-cadUnidadeEasy" type="string" className="form-control" name="cadUnidadeEasy" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ediUnidadeEasyLabel" for="usuario-ediUnidadeEasy">
                                <Translate contentKey="generadorApp.usuario.ediUnidadeEasy">Edi Unidade Easy</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-ediUnidadeEasy" type="string" className="form-control" name="ediUnidadeEasy" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="delUnidadeEasyLabel" for="usuario-delUnidadeEasy">
                                <Translate contentKey="generadorApp.usuario.delUnidadeEasy">Del Unidade Easy</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-delUnidadeEasy" type="string" className="form-control" name="delUnidadeEasy" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="verUsuarioLabel" for="usuario-verUsuario">
                                <Translate contentKey="generadorApp.usuario.verUsuario">Ver Usuario</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-verUsuario" type="string" className="form-control" name="verUsuario" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cadUsuarioLabel" for="usuario-cadUsuario">
                                <Translate contentKey="generadorApp.usuario.cadUsuario">Cad Usuario</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-cadUsuario" type="string" className="form-control" name="cadUsuario" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ediUsuarioLabel" for="usuario-ediUsuario">
                                <Translate contentKey="generadorApp.usuario.ediUsuario">Edi Usuario</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-ediUsuario" type="string" className="form-control" name="ediUsuario" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="delUsuarioLabel" for="usuario-delUsuario">
                                <Translate contentKey="generadorApp.usuario.delUsuario">Del Usuario</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-delUsuario" type="string" className="form-control" name="delUsuario" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="verPtaResultadoLabel" for="usuario-verPtaResultado">
                                <Translate contentKey="generadorApp.usuario.verPtaResultado">Ver Pta Resultado</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-verPtaResultado" type="string" className="form-control" name="verPtaResultado" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cadPtaResultadoLabel" for="usuario-cadPtaResultado">
                                <Translate contentKey="generadorApp.usuario.cadPtaResultado">Cad Pta Resultado</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-cadPtaResultado" type="string" className="form-control" name="cadPtaResultado" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="delPtaResultadoLabel" for="usuario-delPtaResultado">
                                <Translate contentKey="generadorApp.usuario.delPtaResultado">Del Pta Resultado</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-delPtaResultado" type="string" className="form-control" name="delPtaResultado" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="verPtaAtividadeLabel" for="usuario-verPtaAtividade">
                                <Translate contentKey="generadorApp.usuario.verPtaAtividade">Ver Pta Atividade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-verPtaAtividade" type="string" className="form-control" name="verPtaAtividade" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cadPtaAtividadeLabel" for="usuario-cadPtaAtividade">
                                <Translate contentKey="generadorApp.usuario.cadPtaAtividade">Cad Pta Atividade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-cadPtaAtividade" type="string" className="form-control" name="cadPtaAtividade" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="delPtaAtividadeLabel" for="usuario-delPtaAtividade">
                                <Translate contentKey="generadorApp.usuario.delPtaAtividade">Del Pta Atividade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-delPtaAtividade" type="string" className="form-control" name="delPtaAtividade" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="permissaoUsuarioLabel" for="usuario-permissaoUsuario">
                                <Translate contentKey="generadorApp.usuario.permissaoUsuario">Permissao Usuario</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-permissaoUsuario" type="string" className="form-control" name="permissaoUsuario" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="verProntuarioLabel" for="usuario-verProntuario">
                                <Translate contentKey="generadorApp.usuario.verProntuario">Ver Prontuario</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-verProntuario" type="string" className="form-control" name="verProntuario" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cadProntuarioLabel" for="usuario-cadProntuario">
                                <Translate contentKey="generadorApp.usuario.cadProntuario">Cad Prontuario</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-cadProntuario" type="string" className="form-control" name="cadProntuario" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ediProntuarioLabel" for="usuario-ediProntuario">
                                <Translate contentKey="generadorApp.usuario.ediProntuario">Edi Prontuario</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-ediProntuario" type="string" className="form-control" name="ediProntuario" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="delProntuarioLabel" for="usuario-delProntuario">
                                <Translate contentKey="generadorApp.usuario.delProntuario">Del Prontuario</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-delProntuario" type="string" className="form-control" name="delProntuario" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="delProntuarioFotoLabel" for="usuario-delProntuarioFoto">
                                <Translate contentKey="generadorApp.usuario.delProntuarioFoto">Del Prontuario Foto</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-delProntuarioFoto" type="string" className="form-control" name="delProntuarioFoto" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="valoresFinanceiroLabel" for="usuario-valoresFinanceiro">
                                <Translate contentKey="generadorApp.usuario.valoresFinanceiro">Valores Financeiro</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-valoresFinanceiro" type="string" className="form-control" name="valoresFinanceiro" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="autorizacaoValorFinanceiroLabel" for="usuario-autorizacaoValorFinanceiro">
                                <Translate contentKey="generadorApp.usuario.autorizacaoValorFinanceiro">
                                  Autorizacao Valor Financeiro
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="usuario-autorizacaoValorFinanceiro"
                                type="string"
                                className="form-control"
                                name="autorizacaoValorFinanceiro"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="confirmarPagamentoFinanceiroLabel" for="usuario-confirmarPagamentoFinanceiro">
                                <Translate contentKey="generadorApp.usuario.confirmarPagamentoFinanceiro">
                                  Confirmar Pagamento Financeiro
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="usuario-confirmarPagamentoFinanceiro"
                                type="string"
                                className="form-control"
                                name="confirmarPagamentoFinanceiro"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="gerenciarSorteiosLabel" for="usuario-gerenciarSorteios">
                                <Translate contentKey="generadorApp.usuario.gerenciarSorteios">Gerenciar Sorteios</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-gerenciarSorteios" type="string" className="form-control" name="gerenciarSorteios" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="envioRecusaLabel" for="usuario-envioRecusa">
                                <Translate contentKey="generadorApp.usuario.envioRecusa">Envio Recusa</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-envioRecusa" type="string" className="form-control" name="envioRecusa" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="envioIntercorrenciaLabel" for="usuario-envioIntercorrencia">
                                <Translate contentKey="generadorApp.usuario.envioIntercorrencia">Envio Intercorrencia</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-envioIntercorrencia" type="string" className="form-control" name="envioIntercorrencia" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="envioCancelamentoLabel" for="usuario-envioCancelamento">
                                <Translate contentKey="generadorApp.usuario.envioCancelamento">Envio Cancelamento</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-envioCancelamento" type="string" className="form-control" name="envioCancelamento" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="envioAvaliacaoLabel" for="usuario-envioAvaliacao">
                                <Translate contentKey="generadorApp.usuario.envioAvaliacao">Envio Avaliacao</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-envioAvaliacao" type="string" className="form-control" name="envioAvaliacao" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="envioPedidoLabel" for="usuario-envioPedido">
                                <Translate contentKey="generadorApp.usuario.envioPedido">Envio Pedido</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-envioPedido" type="string" className="form-control" name="envioPedido" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="alertaAtendimentoLabel" for="usuario-alertaAtendimento">
                                <Translate contentKey="generadorApp.usuario.alertaAtendimento">Alerta Atendimento</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-alertaAtendimento" type="string" className="form-control" name="alertaAtendimento" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ativoLabel" for="usuario-ativo">
                                <Translate contentKey="generadorApp.usuario.ativo">Ativo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-ativo" type="string" className="form-control" name="ativo" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="dataPostLabel" for="usuario-dataPost">
                                <Translate contentKey="generadorApp.usuario.dataPost">Data Post</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="usuario-dataPost"
                                type="datetime-local"
                                className="form-control"
                                name="dataPost"
                                placeholder={'YYYY-MM-DD HH:mm'}
                                value={isNew ? null : convertDateTimeFromServer(this.props.usuarioEntity.dataPost)}
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
                              <Label className="mt-2" id="envioGlosadoLabel" for="usuario-envioGlosado">
                                <Translate contentKey="generadorApp.usuario.envioGlosado">Envio Glosado</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-envioGlosado" type="string" className="form-control" name="envioGlosado" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="emergenciaLabel" for="usuario-emergencia">
                                <Translate contentKey="generadorApp.usuario.emergencia">Emergencia</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-emergencia" type="string" className="form-control" name="emergencia" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="tokenLabel" for="usuario-token">
                                <Translate contentKey="generadorApp.usuario.token">Token</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-token" type="string" className="form-control" name="token" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="editAtendimentoLabel" for="usuario-editAtendimento">
                                <Translate contentKey="generadorApp.usuario.editAtendimento">Edit Atendimento</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-editAtendimento" type="string" className="form-control" name="editAtendimento" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ouvirLigacaoLabel" for="usuario-ouvirLigacao">
                                <Translate contentKey="generadorApp.usuario.ouvirLigacao">Ouvir Ligacao</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="usuario-ouvirLigacao"
                                type="string"
                                className="form-control"
                                name="ouvirLigacao"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
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
                              <Label className="mt-2" id="verPainelIndicadoresLabel" for="usuario-verPainelIndicadores">
                                <Translate contentKey="generadorApp.usuario.verPainelIndicadores">Ver Painel Indicadores</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="usuario-verPainelIndicadores"
                                type="string"
                                className="form-control"
                                name="verPainelIndicadores"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="prorrogarPadLabel" for="usuario-prorrogarPad">
                                <Translate contentKey="generadorApp.usuario.prorrogarPad">Prorrogar Pad</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-prorrogarPad" type="string" className="form-control" name="prorrogarPad" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cancelarAtendMassaLabel" for="usuario-cancelarAtendMassa">
                                <Translate contentKey="generadorApp.usuario.cancelarAtendMassa">Cancelar Atend Massa</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-cancelarAtendMassa" type="string" className="form-control" name="cancelarAtendMassa" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cadMatMedLabel" for="usuario-cadMatMed">
                                <Translate contentKey="generadorApp.usuario.cadMatMed">Cad Mat Med</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-cadMatMed" type="string" className="form-control" name="cadMatMed" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ediMatMedLabel" for="usuario-ediMatMed">
                                <Translate contentKey="generadorApp.usuario.ediMatMed">Edi Mat Med</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-ediMatMed" type="string" className="form-control" name="ediMatMed" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="delMatMedLabel" for="usuario-delMatMed">
                                <Translate contentKey="generadorApp.usuario.delMatMed">Del Mat Med</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-delMatMed" type="string" className="form-control" name="delMatMed" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="verColPtaLabel" for="usuario-verColPta">
                                <Translate contentKey="generadorApp.usuario.verColPta">Ver Col Pta</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-verColPta" type="string" className="form-control" name="verColPta" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="verColFotoLabel" for="usuario-verColFoto">
                                <Translate contentKey="generadorApp.usuario.verColFoto">Ver Col Foto</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-verColFoto" type="string" className="form-control" name="verColFoto" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="verColLcLabel" for="usuario-verColLc">
                                <Translate contentKey="generadorApp.usuario.verColLc">Ver Col Lc</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-verColLc" type="string" className="form-control" name="verColLc" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="verAtendCanceladoLabel" for="usuario-verAtendCancelado">
                                <Translate contentKey="generadorApp.usuario.verAtendCancelado">Ver Atend Cancelado</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-verAtendCancelado" type="string" className="form-control" name="verAtendCancelado" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="verAtendAgConfirmacaoLabel" for="usuario-verAtendAgConfirmacao">
                                <Translate contentKey="generadorApp.usuario.verAtendAgConfirmacao">Ver Atend Ag Confirmacao</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="usuario-verAtendAgConfirmacao"
                                type="string"
                                className="form-control"
                                name="verAtendAgConfirmacao"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ediGeoLocalizacaoAtendimentoLabel" for="usuario-ediGeoLocalizacaoAtendimento">
                                <Translate contentKey="generadorApp.usuario.ediGeoLocalizacaoAtendimento">
                                  Edi Geo Localizacao Atendimento
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="usuario-ediGeoLocalizacaoAtendimento"
                                type="string"
                                className="form-control"
                                name="ediGeoLocalizacaoAtendimento"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="copiarEvolucaoLabel" for="usuario-copiarEvolucao">
                                <Translate contentKey="generadorApp.usuario.copiarEvolucao">Copiar Evolucao</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-copiarEvolucao" type="string" className="form-control" name="copiarEvolucao" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="copiarNomeProfLabel" for="usuario-copiarNomeProf">
                                <Translate contentKey="generadorApp.usuario.copiarNomeProf">Copiar Nome Prof</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-copiarNomeProf" type="string" className="form-control" name="copiarNomeProf" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="copiarRegistroProfLabel" for="usuario-copiarRegistroProf">
                                <Translate contentKey="generadorApp.usuario.copiarRegistroProf">Copiar Registro Prof</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-copiarRegistroProf" type="string" className="form-control" name="copiarRegistroProf" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="idAreaAtuacaoLabel" for="usuario-idAreaAtuacao">
                                <Translate contentKey="generadorApp.usuario.idAreaAtuacao">Id Area Atuacao</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="usuario-idAreaAtuacao"
                                type="text"
                                name="idAreaAtuacao"
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
                              <Label className="mt-2" id="envioCidSemPtaLabel" for="usuario-envioCidSemPta">
                                <Translate contentKey="generadorApp.usuario.envioCidSemPta">Envio Cid Sem Pta</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-envioCidSemPta" type="string" className="form-control" name="envioCidSemPta" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="envioAnaliseResultadoEsperadoLabel" for="usuario-envioAnaliseResultadoEsperado">
                                <Translate contentKey="generadorApp.usuario.envioAnaliseResultadoEsperado">
                                  Envio Analise Resultado Esperado
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="usuario-envioAnaliseResultadoEsperado"
                                type="string"
                                className="form-control"
                                name="envioAnaliseResultadoEsperado"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="envioDescumprimentoLabel" for="usuario-envioDescumprimento">
                                <Translate contentKey="generadorApp.usuario.envioDescumprimento">Envio Descumprimento</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="usuario-envioDescumprimento" type="string" className="form-control" name="envioDescumprimento" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="12">
                              <Label className="mt-2" id="envioMelhoraTempoLabel" check>
                                <AvInput id="usuario-envioMelhoraTempo" type="checkbox" className="form-control" name="envioMelhoraTempo" />
                                <Translate contentKey="generadorApp.usuario.envioMelhoraTempo">Envio Melhora Tempo</Translate>
                              </Label>
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="senhaChatLabel" for="usuario-senhaChat">
                                <Translate contentKey="generadorApp.usuario.senhaChat">Senha Chat</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="usuario-senhaChat"
                                type="text"
                                name="senhaChat"
                                validate={{
                                  maxLength: { value: 45, errorMessage: translate('entity.validation.maxlength', { max: 45 }) }
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
                              <Label className="mt-2" for="usuario-idTipoUsuario">
                                <Translate contentKey="generadorApp.usuario.idTipoUsuario">Id Tipo Usuario</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="usuario-idTipoUsuario" type="select" className="form-control" name="idTipoUsuario">
                                <option value="null" key="0">
                                  {translate('generadorApp.usuario.idTipoUsuario.empty')}
                                </option>
                                {tipoUsuarios
                                  ? tipoUsuarios.map(otherEntity => (
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
  tipoUsuarios: storeState.tipoUsuario.entities,
  usuarioEntity: storeState.usuario.entity,
  loading: storeState.usuario.loading,
  updating: storeState.usuario.updating,
  updateSuccess: storeState.usuario.updateSuccess
});

const mapDispatchToProps = {
  getTipoUsuarios,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UsuarioUpdate);
