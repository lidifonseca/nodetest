/* eslint complexity: ["error", 300] */
import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { getEntities as getUnidadeEasies } from 'app/entities/unidade-easy/unidade-easy.reducer';
import { ITipoUsuario } from 'app/shared/model/tipo-usuario.model';
import { getEntities as getTipoUsuarios } from 'app/entities/tipo-usuario/tipo-usuario.reducer';
import { IUsuarioUpdateState, getEntity, getUsuarioState, IUsuarioBaseState, updateEntity, createEntity, reset } from './usuario.reducer';
import { IUsuario } from 'app/shared/model/usuario.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUsuarioUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class UsuarioUpdate extends React.Component<IUsuarioUpdateProps, IUsuarioUpdateState> {
  constructor(props: Readonly<IUsuarioUpdateProps>) {
    super(props);

    this.state = {
      unidadeEasySelectValue: null,
      tipoUsuarioSelectValue: null,
      fieldsBase: getUsuarioState(this.props.location),
      unidadeId: '0',
      tipoUsuarioId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }

    if (
      nextProps.unidadeEasies.length > 0 &&
      this.state.unidadeEasySelectValue === null &&
      nextProps.usuarioEntity.unidadeEasy &&
      nextProps.usuarioEntity.unidadeEasy.id
    ) {
      this.setState({
        unidadeEasySelectValue: nextProps.unidadeEasies.map(p =>
          nextProps.usuarioEntity.unidadeEasy.id === p.id ? { value: p.id, label: p.razaoSocial } : null
        )
      });
    }

    if (
      nextProps.tipoUsuarios.length > 0 &&
      this.state.tipoUsuarioSelectValue === null &&
      nextProps.usuarioEntity.tipoUsuario &&
      nextProps.usuarioEntity.tipoUsuario.id
    ) {
      this.setState({
        tipoUsuarioSelectValue: nextProps.tipoUsuarios.map(p =>
          nextProps.usuarioEntity.tipoUsuario.id === p.id ? { value: p.id, label: p.id } : null
        )
      });
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getUnidadeEasies();
    this.props.getTipoUsuarios();
  }

  getFiltersURL = (offset = null) => {
    const fieldsBase = this.state.fieldsBase;
    let url = '_back=1' + (offset !== null ? '&offset=' + offset : '');
    Object.keys(fieldsBase).map(key => {
      url += '&' + key + '=' + fieldsBase[key];
    });
    return url;
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { usuarioEntity } = this.props;
      const entity = {
        ...usuarioEntity,
        unidadeEasy: this.state.unidadeEasySelectValue ? this.state.unidadeEasySelectValue['value'] : null,
        tipoUsuario: this.state.tipoUsuarioSelectValue ? this.state.tipoUsuarioSelectValue['value'] : null,
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
    this.props.history.push('/usuario?' + this.getFiltersURL());
  };

  render() {
    const { usuarioEntity, unidadeEasies, tipoUsuarios, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...usuarioEntity,
                  unidade: usuarioEntity.unidade ? usuarioEntity.unidade.id : null,
                  tipoUsuario: usuarioEntity.tipoUsuario ? usuarioEntity.tipoUsuario.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.usuario.home.createOrEditLabel">Create or edit a Usuario</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/usuario?' + this.getFiltersURL()}
              replace
              color="info"
              className="float-right jh-create-entity"
            >
              <FontAwesomeIcon icon="arrow-left" />
              &nbsp;
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.back">Back</Translate>
              </span>
            </Button>
          </h2>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Inicio</Link>
            </li>
            <li className="breadcrumb-item active">Usuarios</li>
            <li className="breadcrumb-item active">Usuarios edit</li>
          </ol>

          <Panel>
            <PanelBody>
              <Row className="justify-content-center">
                <Col md="8">
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <div>
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
                      <Row>
                        {baseFilters !== 'idOperadora' ? (
                          <Col md="idOperadora">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idOperadoraLabel" for="usuario-idOperadora">
                                    <Translate contentKey="generadorApp.usuario.idOperadora">Id Operadora</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="usuario-idOperadora" type="text" name="idOperadora" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idOperadora" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'senha' ? (
                          <Col md="senha">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="senhaLabel" for="usuario-senha">
                                    <Translate contentKey="generadorApp.usuario.senha">Senha</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="usuario-senha" type="text" name="senha" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="senha" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'nome' ? (
                          <Col md="nome">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="nomeLabel" for="usuario-nome">
                                    <Translate contentKey="generadorApp.usuario.nome">Nome</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="usuario-nome" type="text" name="nome" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="nome" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'email' ? (
                          <Col md="email">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="emailLabel" for="usuario-email">
                                    <Translate contentKey="generadorApp.usuario.email">Email</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="usuario-email" type="text" name="email" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="email" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'telefone' ? (
                          <Col md="telefone">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="telefoneLabel" for="usuario-telefone">
                                    <Translate contentKey="generadorApp.usuario.telefone">Telefone</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="usuario-telefone" type="text" name="telefone" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="telefone" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'celular' ? (
                          <Col md="celular">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="celularLabel" for="usuario-celular">
                                    <Translate contentKey="generadorApp.usuario.celular">Celular</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="usuario-celular" type="text" name="celular" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="celular" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'cpf' ? (
                          <Col md="cpf">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="cpfLabel" for="usuario-cpf">
                                    <Translate contentKey="generadorApp.usuario.cpf">Cpf</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="usuario-cpf" type="text" name="cpf" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cpf" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'rg' ? (
                          <Col md="rg">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="rgLabel" for="usuario-rg">
                                    <Translate contentKey="generadorApp.usuario.rg">Rg</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="usuario-rg" type="text" name="rg" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="rg" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'sexo' ? (
                          <Col md="sexo">
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
                        ) : (
                          <AvInput type="hidden" name="sexo" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'nascimento' ? (
                          <Col md="nascimento">
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
                        ) : (
                          <AvInput type="hidden" name="nascimento" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verAtendimento' ? (
                          <Col md="verAtendimento">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="verAtendimentoLabel" check>
                                    <AvInput id="usuario-verAtendimento" type="checkbox" className="form-control" name="verAtendimento" />
                                    <Translate contentKey="generadorApp.usuario.verAtendimento">Ver Atendimento</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verAtendimento" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'cadAtendimento' ? (
                          <Col md="cadAtendimento">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="cadAtendimentoLabel" check>
                                    <AvInput id="usuario-cadAtendimento" type="checkbox" className="form-control" name="cadAtendimento" />
                                    <Translate contentKey="generadorApp.usuario.cadAtendimento">Cad Atendimento</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cadAtendimento" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ediAtendimento' ? (
                          <Col md="ediAtendimento">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="ediAtendimentoLabel" check>
                                    <AvInput id="usuario-ediAtendimento" type="checkbox" className="form-control" name="ediAtendimento" />
                                    <Translate contentKey="generadorApp.usuario.ediAtendimento">Edi Atendimento</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ediAtendimento" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'baixaManualAtendimento' ? (
                          <Col md="baixaManualAtendimento">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="baixaManualAtendimentoLabel" check>
                                    <AvInput
                                      id="usuario-baixaManualAtendimento"
                                      type="checkbox"
                                      className="form-control"
                                      name="baixaManualAtendimento"
                                    />
                                    <Translate contentKey="generadorApp.usuario.baixaManualAtendimento">Baixa Manual Atendimento</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="baixaManualAtendimento" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'delAtendimento' ? (
                          <Col md="delAtendimento">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="delAtendimentoLabel" check>
                                    <AvInput id="usuario-delAtendimento" type="checkbox" className="form-control" name="delAtendimento" />
                                    <Translate contentKey="generadorApp.usuario.delAtendimento">Del Atendimento</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="delAtendimento" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'relAtendimento' ? (
                          <Col md="relAtendimento">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="relAtendimentoLabel" check>
                                    <AvInput id="usuario-relAtendimento" type="checkbox" className="form-control" name="relAtendimento" />
                                    <Translate contentKey="generadorApp.usuario.relAtendimento">Rel Atendimento</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="relAtendimento" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verPad' ? (
                          <Col md="verPad">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="verPadLabel" check>
                                    <AvInput id="usuario-verPad" type="checkbox" className="form-control" name="verPad" />
                                    <Translate contentKey="generadorApp.usuario.verPad">Ver Pad</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verPad" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'cadPad' ? (
                          <Col md="cadPad">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="cadPadLabel" check>
                                    <AvInput id="usuario-cadPad" type="checkbox" className="form-control" name="cadPad" />
                                    <Translate contentKey="generadorApp.usuario.cadPad">Cad Pad</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cadPad" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ediPad' ? (
                          <Col md="ediPad">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="ediPadLabel" check>
                                    <AvInput id="usuario-ediPad" type="checkbox" className="form-control" name="ediPad" />
                                    <Translate contentKey="generadorApp.usuario.ediPad">Edi Pad</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ediPad" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'delPad' ? (
                          <Col md="delPad">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="delPadLabel" check>
                                    <AvInput id="usuario-delPad" type="checkbox" className="form-control" name="delPad" />
                                    <Translate contentKey="generadorApp.usuario.delPad">Del Pad</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="delPad" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'relPad' ? (
                          <Col md="relPad">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="relPadLabel" check>
                                    <AvInput id="usuario-relPad" type="checkbox" className="form-control" name="relPad" />
                                    <Translate contentKey="generadorApp.usuario.relPad">Rel Pad</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="relPad" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verDiario' ? (
                          <Col md="verDiario">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="verDiarioLabel" check>
                                    <AvInput id="usuario-verDiario" type="checkbox" className="form-control" name="verDiario" />
                                    <Translate contentKey="generadorApp.usuario.verDiario">Ver Diario</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verDiario" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'cadDiario' ? (
                          <Col md="cadDiario">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="cadDiarioLabel" check>
                                    <AvInput id="usuario-cadDiario" type="checkbox" className="form-control" name="cadDiario" />
                                    <Translate contentKey="generadorApp.usuario.cadDiario">Cad Diario</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cadDiario" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ediDiario' ? (
                          <Col md="ediDiario">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="ediDiarioLabel" check>
                                    <AvInput id="usuario-ediDiario" type="checkbox" className="form-control" name="ediDiario" />
                                    <Translate contentKey="generadorApp.usuario.ediDiario">Edi Diario</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ediDiario" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'delDiario' ? (
                          <Col md="delDiario">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="delDiarioLabel" check>
                                    <AvInput id="usuario-delDiario" type="checkbox" className="form-control" name="delDiario" />
                                    <Translate contentKey="generadorApp.usuario.delDiario">Del Diario</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="delDiario" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'relDiario' ? (
                          <Col md="relDiario">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="relDiarioLabel" check>
                                    <AvInput id="usuario-relDiario" type="checkbox" className="form-control" name="relDiario" />
                                    <Translate contentKey="generadorApp.usuario.relDiario">Rel Diario</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="relDiario" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verCategoria' ? (
                          <Col md="verCategoria">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="verCategoriaLabel" check>
                                    <AvInput id="usuario-verCategoria" type="checkbox" className="form-control" name="verCategoria" />
                                    <Translate contentKey="generadorApp.usuario.verCategoria">Ver Categoria</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verCategoria" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'cadCategoria' ? (
                          <Col md="cadCategoria">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="cadCategoriaLabel" check>
                                    <AvInput id="usuario-cadCategoria" type="checkbox" className="form-control" name="cadCategoria" />
                                    <Translate contentKey="generadorApp.usuario.cadCategoria">Cad Categoria</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cadCategoria" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ediCategoria' ? (
                          <Col md="ediCategoria">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="ediCategoriaLabel" check>
                                    <AvInput id="usuario-ediCategoria" type="checkbox" className="form-control" name="ediCategoria" />
                                    <Translate contentKey="generadorApp.usuario.ediCategoria">Edi Categoria</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ediCategoria" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'delCategoria' ? (
                          <Col md="delCategoria">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="delCategoriaLabel" check>
                                    <AvInput id="usuario-delCategoria" type="checkbox" className="form-control" name="delCategoria" />
                                    <Translate contentKey="generadorApp.usuario.delCategoria">Del Categoria</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="delCategoria" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verEspecialidade' ? (
                          <Col md="verEspecialidade">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="verEspecialidadeLabel" check>
                                    <AvInput
                                      id="usuario-verEspecialidade"
                                      type="checkbox"
                                      className="form-control"
                                      name="verEspecialidade"
                                    />
                                    <Translate contentKey="generadorApp.usuario.verEspecialidade">Ver Especialidade</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verEspecialidade" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'cadEspecialidade' ? (
                          <Col md="cadEspecialidade">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="cadEspecialidadeLabel" check>
                                    <AvInput
                                      id="usuario-cadEspecialidade"
                                      type="checkbox"
                                      className="form-control"
                                      name="cadEspecialidade"
                                    />
                                    <Translate contentKey="generadorApp.usuario.cadEspecialidade">Cad Especialidade</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cadEspecialidade" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ediEspecialidade' ? (
                          <Col md="ediEspecialidade">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="ediEspecialidadeLabel" check>
                                    <AvInput
                                      id="usuario-ediEspecialidade"
                                      type="checkbox"
                                      className="form-control"
                                      name="ediEspecialidade"
                                    />
                                    <Translate contentKey="generadorApp.usuario.ediEspecialidade">Edi Especialidade</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ediEspecialidade" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'delEspecialidade' ? (
                          <Col md="delEspecialidade">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="delEspecialidadeLabel" check>
                                    <AvInput
                                      id="usuario-delEspecialidade"
                                      type="checkbox"
                                      className="form-control"
                                      name="delEspecialidade"
                                    />
                                    <Translate contentKey="generadorApp.usuario.delEspecialidade">Del Especialidade</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="delEspecialidade" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'relEspecialidade' ? (
                          <Col md="relEspecialidade">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="relEspecialidadeLabel" check>
                                    <AvInput
                                      id="usuario-relEspecialidade"
                                      type="checkbox"
                                      className="form-control"
                                      name="relEspecialidade"
                                    />
                                    <Translate contentKey="generadorApp.usuario.relEspecialidade">Rel Especialidade</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="relEspecialidade" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verEspecialidadeValor' ? (
                          <Col md="verEspecialidadeValor">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="verEspecialidadeValorLabel" check>
                                    <AvInput
                                      id="usuario-verEspecialidadeValor"
                                      type="checkbox"
                                      className="form-control"
                                      name="verEspecialidadeValor"
                                    />
                                    <Translate contentKey="generadorApp.usuario.verEspecialidadeValor">Ver Especialidade Valor</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verEspecialidadeValor" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'cadEspecialidadeValor' ? (
                          <Col md="cadEspecialidadeValor">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="cadEspecialidadeValorLabel" check>
                                    <AvInput
                                      id="usuario-cadEspecialidadeValor"
                                      type="checkbox"
                                      className="form-control"
                                      name="cadEspecialidadeValor"
                                    />
                                    <Translate contentKey="generadorApp.usuario.cadEspecialidadeValor">Cad Especialidade Valor</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cadEspecialidadeValor" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ediEspecialidadeValor' ? (
                          <Col md="ediEspecialidadeValor">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="ediEspecialidadeValorLabel" check>
                                    <AvInput
                                      id="usuario-ediEspecialidadeValor"
                                      type="checkbox"
                                      className="form-control"
                                      name="ediEspecialidadeValor"
                                    />
                                    <Translate contentKey="generadorApp.usuario.ediEspecialidadeValor">Edi Especialidade Valor</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ediEspecialidadeValor" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'delEspecialidadeValor' ? (
                          <Col md="delEspecialidadeValor">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="delEspecialidadeValorLabel" check>
                                    <AvInput
                                      id="usuario-delEspecialidadeValor"
                                      type="checkbox"
                                      className="form-control"
                                      name="delEspecialidadeValor"
                                    />
                                    <Translate contentKey="generadorApp.usuario.delEspecialidadeValor">Del Especialidade Valor</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="delEspecialidadeValor" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'relEspecialidadeValor' ? (
                          <Col md="relEspecialidadeValor">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="relEspecialidadeValorLabel" check>
                                    <AvInput
                                      id="usuario-relEspecialidadeValor"
                                      type="checkbox"
                                      className="form-control"
                                      name="relEspecialidadeValor"
                                    />
                                    <Translate contentKey="generadorApp.usuario.relEspecialidadeValor">Rel Especialidade Valor</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="relEspecialidadeValor" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verOperadora' ? (
                          <Col md="verOperadora">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="verOperadoraLabel" check>
                                    <AvInput id="usuario-verOperadora" type="checkbox" className="form-control" name="verOperadora" />
                                    <Translate contentKey="generadorApp.usuario.verOperadora">Ver Operadora</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verOperadora" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'cadOperadora' ? (
                          <Col md="cadOperadora">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="cadOperadoraLabel" check>
                                    <AvInput id="usuario-cadOperadora" type="checkbox" className="form-control" name="cadOperadora" />
                                    <Translate contentKey="generadorApp.usuario.cadOperadora">Cad Operadora</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cadOperadora" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ediOperadora' ? (
                          <Col md="ediOperadora">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="ediOperadoraLabel" check>
                                    <AvInput id="usuario-ediOperadora" type="checkbox" className="form-control" name="ediOperadora" />
                                    <Translate contentKey="generadorApp.usuario.ediOperadora">Edi Operadora</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ediOperadora" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'delOperadora' ? (
                          <Col md="delOperadora">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="delOperadoraLabel" check>
                                    <AvInput id="usuario-delOperadora" type="checkbox" className="form-control" name="delOperadora" />
                                    <Translate contentKey="generadorApp.usuario.delOperadora">Del Operadora</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="delOperadora" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verPaciente' ? (
                          <Col md="verPaciente">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="verPacienteLabel" check>
                                    <AvInput id="usuario-verPaciente" type="checkbox" className="form-control" name="verPaciente" />
                                    <Translate contentKey="generadorApp.usuario.verPaciente">Ver Paciente</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verPaciente" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'cadPaciente' ? (
                          <Col md="cadPaciente">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="cadPacienteLabel" check>
                                    <AvInput id="usuario-cadPaciente" type="checkbox" className="form-control" name="cadPaciente" />
                                    <Translate contentKey="generadorApp.usuario.cadPaciente">Cad Paciente</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cadPaciente" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ediPaciente' ? (
                          <Col md="ediPaciente">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="ediPacienteLabel" check>
                                    <AvInput id="usuario-ediPaciente" type="checkbox" className="form-control" name="ediPaciente" />
                                    <Translate contentKey="generadorApp.usuario.ediPaciente">Edi Paciente</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ediPaciente" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'delPaciente' ? (
                          <Col md="delPaciente">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="delPacienteLabel" check>
                                    <AvInput id="usuario-delPaciente" type="checkbox" className="form-control" name="delPaciente" />
                                    <Translate contentKey="generadorApp.usuario.delPaciente">Del Paciente</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="delPaciente" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'relPaciente' ? (
                          <Col md="relPaciente">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="relPacienteLabel" check>
                                    <AvInput id="usuario-relPaciente" type="checkbox" className="form-control" name="relPaciente" />
                                    <Translate contentKey="generadorApp.usuario.relPaciente">Rel Paciente</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="relPaciente" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verProfissional' ? (
                          <Col md="verProfissional">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="verProfissionalLabel" check>
                                    <AvInput id="usuario-verProfissional" type="checkbox" className="form-control" name="verProfissional" />
                                    <Translate contentKey="generadorApp.usuario.verProfissional">Ver Profissional</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verProfissional" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'cadProfissional' ? (
                          <Col md="cadProfissional">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="cadProfissionalLabel" check>
                                    <AvInput id="usuario-cadProfissional" type="checkbox" className="form-control" name="cadProfissional" />
                                    <Translate contentKey="generadorApp.usuario.cadProfissional">Cad Profissional</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cadProfissional" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ediProfissional' ? (
                          <Col md="ediProfissional">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="ediProfissionalLabel" check>
                                    <AvInput id="usuario-ediProfissional" type="checkbox" className="form-control" name="ediProfissional" />
                                    <Translate contentKey="generadorApp.usuario.ediProfissional">Edi Profissional</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ediProfissional" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'delProfissional' ? (
                          <Col md="delProfissional">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="delProfissionalLabel" check>
                                    <AvInput id="usuario-delProfissional" type="checkbox" className="form-control" name="delProfissional" />
                                    <Translate contentKey="generadorApp.usuario.delProfissional">Del Profissional</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="delProfissional" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ativProfissional' ? (
                          <Col md="ativProfissional">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="ativProfissionalLabel" check>
                                    <AvInput
                                      id="usuario-ativProfissional"
                                      type="checkbox"
                                      className="form-control"
                                      name="ativProfissional"
                                    />
                                    <Translate contentKey="generadorApp.usuario.ativProfissional">Ativ Profissional</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ativProfissional" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'relProfissional' ? (
                          <Col md="relProfissional">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="relProfissionalLabel" check>
                                    <AvInput id="usuario-relProfissional" type="checkbox" className="form-control" name="relProfissional" />
                                    <Translate contentKey="generadorApp.usuario.relProfissional">Rel Profissional</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="relProfissional" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verPush' ? (
                          <Col md="verPush">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="verPushLabel" check>
                                    <AvInput id="usuario-verPush" type="checkbox" className="form-control" name="verPush" />
                                    <Translate contentKey="generadorApp.usuario.verPush">Ver Push</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verPush" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'cadPushPaciente' ? (
                          <Col md="cadPushPaciente">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="cadPushPacienteLabel" check>
                                    <AvInput id="usuario-cadPushPaciente" type="checkbox" className="form-control" name="cadPushPaciente" />
                                    <Translate contentKey="generadorApp.usuario.cadPushPaciente">Cad Push Paciente</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cadPushPaciente" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'cadPushProfissional' ? (
                          <Col md="cadPushProfissional">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="cadPushProfissionalLabel" check>
                                    <AvInput
                                      id="usuario-cadPushProfissional"
                                      type="checkbox"
                                      className="form-control"
                                      name="cadPushProfissional"
                                    />
                                    <Translate contentKey="generadorApp.usuario.cadPushProfissional">Cad Push Profissional</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cadPushProfissional" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verTermoPaciente' ? (
                          <Col md="verTermoPaciente">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="verTermoPacienteLabel" check>
                                    <AvInput
                                      id="usuario-verTermoPaciente"
                                      type="checkbox"
                                      className="form-control"
                                      name="verTermoPaciente"
                                    />
                                    <Translate contentKey="generadorApp.usuario.verTermoPaciente">Ver Termo Paciente</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verTermoPaciente" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ediTermoPaciente' ? (
                          <Col md="ediTermoPaciente">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="ediTermoPacienteLabel" check>
                                    <AvInput
                                      id="usuario-ediTermoPaciente"
                                      type="checkbox"
                                      className="form-control"
                                      name="ediTermoPaciente"
                                    />
                                    <Translate contentKey="generadorApp.usuario.ediTermoPaciente">Edi Termo Paciente</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ediTermoPaciente" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verTermoProfissional' ? (
                          <Col md="verTermoProfissional">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="verTermoProfissionalLabel" check>
                                    <AvInput
                                      id="usuario-verTermoProfissional"
                                      type="checkbox"
                                      className="form-control"
                                      name="verTermoProfissional"
                                    />
                                    <Translate contentKey="generadorApp.usuario.verTermoProfissional">Ver Termo Profissional</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verTermoProfissional" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ediTermoProfissional' ? (
                          <Col md="ediTermoProfissional">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="ediTermoProfissionalLabel" check>
                                    <AvInput
                                      id="usuario-ediTermoProfissional"
                                      type="checkbox"
                                      className="form-control"
                                      name="ediTermoProfissional"
                                    />
                                    <Translate contentKey="generadorApp.usuario.ediTermoProfissional">Edi Termo Profissional</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ediTermoProfissional" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verOutros' ? (
                          <Col md="verOutros">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="verOutrosLabel" check>
                                    <AvInput id="usuario-verOutros" type="checkbox" className="form-control" name="verOutros" />
                                    <Translate contentKey="generadorApp.usuario.verOutros">Ver Outros</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verOutros" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'cadOutros' ? (
                          <Col md="cadOutros">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="cadOutrosLabel" check>
                                    <AvInput id="usuario-cadOutros" type="checkbox" className="form-control" name="cadOutros" />
                                    <Translate contentKey="generadorApp.usuario.cadOutros">Cad Outros</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cadOutros" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ediOutros' ? (
                          <Col md="ediOutros">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="ediOutrosLabel" check>
                                    <AvInput id="usuario-ediOutros" type="checkbox" className="form-control" name="ediOutros" />
                                    <Translate contentKey="generadorApp.usuario.ediOutros">Edi Outros</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ediOutros" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'delOutros' ? (
                          <Col md="delOutros">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="delOutrosLabel" check>
                                    <AvInput id="usuario-delOutros" type="checkbox" className="form-control" name="delOutros" />
                                    <Translate contentKey="generadorApp.usuario.delOutros">Del Outros</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="delOutros" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'relOutros' ? (
                          <Col md="relOutros">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="relOutrosLabel" check>
                                    <AvInput id="usuario-relOutros" type="checkbox" className="form-control" name="relOutros" />
                                    <Translate contentKey="generadorApp.usuario.relOutros">Rel Outros</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="relOutros" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verUnidadeEasy' ? (
                          <Col md="verUnidadeEasy">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="verUnidadeEasyLabel" check>
                                    <AvInput id="usuario-verUnidadeEasy" type="checkbox" className="form-control" name="verUnidadeEasy" />
                                    <Translate contentKey="generadorApp.usuario.verUnidadeEasy">Ver Unidade Easy</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verUnidadeEasy" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'cadUnidadeEasy' ? (
                          <Col md="cadUnidadeEasy">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="cadUnidadeEasyLabel" check>
                                    <AvInput id="usuario-cadUnidadeEasy" type="checkbox" className="form-control" name="cadUnidadeEasy" />
                                    <Translate contentKey="generadorApp.usuario.cadUnidadeEasy">Cad Unidade Easy</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cadUnidadeEasy" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ediUnidadeEasy' ? (
                          <Col md="ediUnidadeEasy">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="ediUnidadeEasyLabel" check>
                                    <AvInput id="usuario-ediUnidadeEasy" type="checkbox" className="form-control" name="ediUnidadeEasy" />
                                    <Translate contentKey="generadorApp.usuario.ediUnidadeEasy">Edi Unidade Easy</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ediUnidadeEasy" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'delUnidadeEasy' ? (
                          <Col md="delUnidadeEasy">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="delUnidadeEasyLabel" check>
                                    <AvInput id="usuario-delUnidadeEasy" type="checkbox" className="form-control" name="delUnidadeEasy" />
                                    <Translate contentKey="generadorApp.usuario.delUnidadeEasy">Del Unidade Easy</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="delUnidadeEasy" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verUsuario' ? (
                          <Col md="verUsuario">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="verUsuarioLabel" check>
                                    <AvInput id="usuario-verUsuario" type="checkbox" className="form-control" name="verUsuario" />
                                    <Translate contentKey="generadorApp.usuario.verUsuario">Ver Usuario</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verUsuario" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'cadUsuario' ? (
                          <Col md="cadUsuario">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="cadUsuarioLabel" check>
                                    <AvInput id="usuario-cadUsuario" type="checkbox" className="form-control" name="cadUsuario" />
                                    <Translate contentKey="generadorApp.usuario.cadUsuario">Cad Usuario</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cadUsuario" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ediUsuario' ? (
                          <Col md="ediUsuario">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="ediUsuarioLabel" check>
                                    <AvInput id="usuario-ediUsuario" type="checkbox" className="form-control" name="ediUsuario" />
                                    <Translate contentKey="generadorApp.usuario.ediUsuario">Edi Usuario</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ediUsuario" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'delUsuario' ? (
                          <Col md="delUsuario">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="delUsuarioLabel" check>
                                    <AvInput id="usuario-delUsuario" type="checkbox" className="form-control" name="delUsuario" />
                                    <Translate contentKey="generadorApp.usuario.delUsuario">Del Usuario</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="delUsuario" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verPtaResultado' ? (
                          <Col md="verPtaResultado">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="verPtaResultadoLabel" check>
                                    <AvInput id="usuario-verPtaResultado" type="checkbox" className="form-control" name="verPtaResultado" />
                                    <Translate contentKey="generadorApp.usuario.verPtaResultado">Ver Pta Resultado</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verPtaResultado" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'cadPtaResultado' ? (
                          <Col md="cadPtaResultado">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="cadPtaResultadoLabel" check>
                                    <AvInput id="usuario-cadPtaResultado" type="checkbox" className="form-control" name="cadPtaResultado" />
                                    <Translate contentKey="generadorApp.usuario.cadPtaResultado">Cad Pta Resultado</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cadPtaResultado" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'delPtaResultado' ? (
                          <Col md="delPtaResultado">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="delPtaResultadoLabel" check>
                                    <AvInput id="usuario-delPtaResultado" type="checkbox" className="form-control" name="delPtaResultado" />
                                    <Translate contentKey="generadorApp.usuario.delPtaResultado">Del Pta Resultado</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="delPtaResultado" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verPtaAtividade' ? (
                          <Col md="verPtaAtividade">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="verPtaAtividadeLabel" check>
                                    <AvInput id="usuario-verPtaAtividade" type="checkbox" className="form-control" name="verPtaAtividade" />
                                    <Translate contentKey="generadorApp.usuario.verPtaAtividade">Ver Pta Atividade</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verPtaAtividade" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'cadPtaAtividade' ? (
                          <Col md="cadPtaAtividade">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="cadPtaAtividadeLabel" check>
                                    <AvInput id="usuario-cadPtaAtividade" type="checkbox" className="form-control" name="cadPtaAtividade" />
                                    <Translate contentKey="generadorApp.usuario.cadPtaAtividade">Cad Pta Atividade</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cadPtaAtividade" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'delPtaAtividade' ? (
                          <Col md="delPtaAtividade">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="delPtaAtividadeLabel" check>
                                    <AvInput id="usuario-delPtaAtividade" type="checkbox" className="form-control" name="delPtaAtividade" />
                                    <Translate contentKey="generadorApp.usuario.delPtaAtividade">Del Pta Atividade</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="delPtaAtividade" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'permissaoUsuario' ? (
                          <Col md="permissaoUsuario">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="permissaoUsuarioLabel" check>
                                    <AvInput
                                      id="usuario-permissaoUsuario"
                                      type="checkbox"
                                      className="form-control"
                                      name="permissaoUsuario"
                                    />
                                    <Translate contentKey="generadorApp.usuario.permissaoUsuario">Permissao Usuario</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="permissaoUsuario" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verProntuario' ? (
                          <Col md="verProntuario">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="verProntuarioLabel" check>
                                    <AvInput id="usuario-verProntuario" type="checkbox" className="form-control" name="verProntuario" />
                                    <Translate contentKey="generadorApp.usuario.verProntuario">Ver Prontuario</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verProntuario" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'cadProntuario' ? (
                          <Col md="cadProntuario">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="cadProntuarioLabel" check>
                                    <AvInput id="usuario-cadProntuario" type="checkbox" className="form-control" name="cadProntuario" />
                                    <Translate contentKey="generadorApp.usuario.cadProntuario">Cad Prontuario</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cadProntuario" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ediProntuario' ? (
                          <Col md="ediProntuario">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="ediProntuarioLabel" check>
                                    <AvInput id="usuario-ediProntuario" type="checkbox" className="form-control" name="ediProntuario" />
                                    <Translate contentKey="generadorApp.usuario.ediProntuario">Edi Prontuario</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ediProntuario" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'delProntuario' ? (
                          <Col md="delProntuario">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="delProntuarioLabel" check>
                                    <AvInput id="usuario-delProntuario" type="checkbox" className="form-control" name="delProntuario" />
                                    <Translate contentKey="generadorApp.usuario.delProntuario">Del Prontuario</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="delProntuario" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'delProntuarioFoto' ? (
                          <Col md="delProntuarioFoto">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="delProntuarioFotoLabel" check>
                                    <AvInput
                                      id="usuario-delProntuarioFoto"
                                      type="checkbox"
                                      className="form-control"
                                      name="delProntuarioFoto"
                                    />
                                    <Translate contentKey="generadorApp.usuario.delProntuarioFoto">Del Prontuario Foto</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="delProntuarioFoto" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'valoresFinanceiro' ? (
                          <Col md="valoresFinanceiro">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="valoresFinanceiroLabel" check>
                                    <AvInput
                                      id="usuario-valoresFinanceiro"
                                      type="checkbox"
                                      className="form-control"
                                      name="valoresFinanceiro"
                                    />
                                    <Translate contentKey="generadorApp.usuario.valoresFinanceiro">Valores Financeiro</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="valoresFinanceiro" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'autorizacaoValorFinanceiro' ? (
                          <Col md="autorizacaoValorFinanceiro">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="autorizacaoValorFinanceiroLabel" check>
                                    <AvInput
                                      id="usuario-autorizacaoValorFinanceiro"
                                      type="checkbox"
                                      className="form-control"
                                      name="autorizacaoValorFinanceiro"
                                    />
                                    <Translate contentKey="generadorApp.usuario.autorizacaoValorFinanceiro">
                                      Autorizacao Valor Financeiro
                                    </Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="autorizacaoValorFinanceiro" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'confirmarPagamentoFinanceiro' ? (
                          <Col md="confirmarPagamentoFinanceiro">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="confirmarPagamentoFinanceiroLabel" check>
                                    <AvInput
                                      id="usuario-confirmarPagamentoFinanceiro"
                                      type="checkbox"
                                      className="form-control"
                                      name="confirmarPagamentoFinanceiro"
                                    />
                                    <Translate contentKey="generadorApp.usuario.confirmarPagamentoFinanceiro">
                                      Confirmar Pagamento Financeiro
                                    </Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="confirmarPagamentoFinanceiro" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'gerenciarSorteios' ? (
                          <Col md="gerenciarSorteios">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="gerenciarSorteiosLabel" check>
                                    <AvInput
                                      id="usuario-gerenciarSorteios"
                                      type="checkbox"
                                      className="form-control"
                                      name="gerenciarSorteios"
                                    />
                                    <Translate contentKey="generadorApp.usuario.gerenciarSorteios">Gerenciar Sorteios</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="gerenciarSorteios" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'envioRecusa' ? (
                          <Col md="envioRecusa">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="envioRecusaLabel" check>
                                    <AvInput id="usuario-envioRecusa" type="checkbox" className="form-control" name="envioRecusa" />
                                    <Translate contentKey="generadorApp.usuario.envioRecusa">Envio Recusa</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="envioRecusa" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'envioIntercorrencia' ? (
                          <Col md="envioIntercorrencia">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="envioIntercorrenciaLabel" check>
                                    <AvInput
                                      id="usuario-envioIntercorrencia"
                                      type="checkbox"
                                      className="form-control"
                                      name="envioIntercorrencia"
                                    />
                                    <Translate contentKey="generadorApp.usuario.envioIntercorrencia">Envio Intercorrencia</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="envioIntercorrencia" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'envioCancelamento' ? (
                          <Col md="envioCancelamento">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="envioCancelamentoLabel" check>
                                    <AvInput
                                      id="usuario-envioCancelamento"
                                      type="checkbox"
                                      className="form-control"
                                      name="envioCancelamento"
                                    />
                                    <Translate contentKey="generadorApp.usuario.envioCancelamento">Envio Cancelamento</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="envioCancelamento" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'envioAvaliacao' ? (
                          <Col md="envioAvaliacao">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="envioAvaliacaoLabel" check>
                                    <AvInput id="usuario-envioAvaliacao" type="checkbox" className="form-control" name="envioAvaliacao" />
                                    <Translate contentKey="generadorApp.usuario.envioAvaliacao">Envio Avaliacao</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="envioAvaliacao" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'envioPedido' ? (
                          <Col md="envioPedido">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="envioPedidoLabel" check>
                                    <AvInput id="usuario-envioPedido" type="checkbox" className="form-control" name="envioPedido" />
                                    <Translate contentKey="generadorApp.usuario.envioPedido">Envio Pedido</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="envioPedido" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'alertaAtendimento' ? (
                          <Col md="alertaAtendimento">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="alertaAtendimentoLabel" check>
                                    <AvInput
                                      id="usuario-alertaAtendimento"
                                      type="checkbox"
                                      className="form-control"
                                      name="alertaAtendimento"
                                    />
                                    <Translate contentKey="generadorApp.usuario.alertaAtendimento">Alerta Atendimento</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="alertaAtendimento" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ativo' ? (
                          <Col md="ativo">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="ativoLabel" check>
                                    <AvInput id="usuario-ativo" type="checkbox" className="form-control" name="ativo" />
                                    <Translate contentKey="generadorApp.usuario.ativo">Ativo</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'envioGlosado' ? (
                          <Col md="envioGlosado">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="envioGlosadoLabel" check>
                                    <AvInput id="usuario-envioGlosado" type="checkbox" className="form-control" name="envioGlosado" />
                                    <Translate contentKey="generadorApp.usuario.envioGlosado">Envio Glosado</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="envioGlosado" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'emergencia' ? (
                          <Col md="emergencia">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="emergenciaLabel" check>
                                    <AvInput id="usuario-emergencia" type="checkbox" className="form-control" name="emergencia" />
                                    <Translate contentKey="generadorApp.usuario.emergencia">Emergencia</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="emergencia" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'token' ? (
                          <Col md="token">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="tokenLabel" check>
                                    <AvInput id="usuario-token" type="checkbox" className="form-control" name="token" />
                                    <Translate contentKey="generadorApp.usuario.token">Token</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="token" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'editAtendimento' ? (
                          <Col md="editAtendimento">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="editAtendimentoLabel" check>
                                    <AvInput id="usuario-editAtendimento" type="checkbox" className="form-control" name="editAtendimento" />
                                    <Translate contentKey="generadorApp.usuario.editAtendimento">Edit Atendimento</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="editAtendimento" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ouvirLigacao' ? (
                          <Col md="ouvirLigacao">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="ouvirLigacaoLabel" check>
                                    <AvInput id="usuario-ouvirLigacao" type="checkbox" className="form-control" name="ouvirLigacao" />
                                    <Translate contentKey="generadorApp.usuario.ouvirLigacao">Ouvir Ligacao</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ouvirLigacao" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verPainelIndicadores' ? (
                          <Col md="verPainelIndicadores">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="verPainelIndicadoresLabel" check>
                                    <AvInput
                                      id="usuario-verPainelIndicadores"
                                      type="checkbox"
                                      className="form-control"
                                      name="verPainelIndicadores"
                                    />
                                    <Translate contentKey="generadorApp.usuario.verPainelIndicadores">Ver Painel Indicadores</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verPainelIndicadores" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'prorrogarPad' ? (
                          <Col md="prorrogarPad">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="prorrogarPadLabel" check>
                                    <AvInput id="usuario-prorrogarPad" type="checkbox" className="form-control" name="prorrogarPad" />
                                    <Translate contentKey="generadorApp.usuario.prorrogarPad">Prorrogar Pad</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="prorrogarPad" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'cancelarAtendMassa' ? (
                          <Col md="cancelarAtendMassa">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="cancelarAtendMassaLabel" check>
                                    <AvInput
                                      id="usuario-cancelarAtendMassa"
                                      type="checkbox"
                                      className="form-control"
                                      name="cancelarAtendMassa"
                                    />
                                    <Translate contentKey="generadorApp.usuario.cancelarAtendMassa">Cancelar Atend Massa</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cancelarAtendMassa" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'cadMatMed' ? (
                          <Col md="cadMatMed">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="cadMatMedLabel" check>
                                    <AvInput id="usuario-cadMatMed" type="checkbox" className="form-control" name="cadMatMed" />
                                    <Translate contentKey="generadorApp.usuario.cadMatMed">Cad Mat Med</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cadMatMed" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ediMatMed' ? (
                          <Col md="ediMatMed">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="ediMatMedLabel" check>
                                    <AvInput id="usuario-ediMatMed" type="checkbox" className="form-control" name="ediMatMed" />
                                    <Translate contentKey="generadorApp.usuario.ediMatMed">Edi Mat Med</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ediMatMed" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'delMatMed' ? (
                          <Col md="delMatMed">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="delMatMedLabel" check>
                                    <AvInput id="usuario-delMatMed" type="checkbox" className="form-control" name="delMatMed" />
                                    <Translate contentKey="generadorApp.usuario.delMatMed">Del Mat Med</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="delMatMed" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verColPta' ? (
                          <Col md="verColPta">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="verColPtaLabel" check>
                                    <AvInput id="usuario-verColPta" type="checkbox" className="form-control" name="verColPta" />
                                    <Translate contentKey="generadorApp.usuario.verColPta">Ver Col Pta</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verColPta" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verColFoto' ? (
                          <Col md="verColFoto">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="verColFotoLabel" check>
                                    <AvInput id="usuario-verColFoto" type="checkbox" className="form-control" name="verColFoto" />
                                    <Translate contentKey="generadorApp.usuario.verColFoto">Ver Col Foto</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verColFoto" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verColLc' ? (
                          <Col md="verColLc">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="verColLcLabel" check>
                                    <AvInput id="usuario-verColLc" type="checkbox" className="form-control" name="verColLc" />
                                    <Translate contentKey="generadorApp.usuario.verColLc">Ver Col Lc</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verColLc" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verAtendCancelado' ? (
                          <Col md="verAtendCancelado">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="verAtendCanceladoLabel" check>
                                    <AvInput
                                      id="usuario-verAtendCancelado"
                                      type="checkbox"
                                      className="form-control"
                                      name="verAtendCancelado"
                                    />
                                    <Translate contentKey="generadorApp.usuario.verAtendCancelado">Ver Atend Cancelado</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verAtendCancelado" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'verAtendAgConfirmacao' ? (
                          <Col md="verAtendAgConfirmacao">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="verAtendAgConfirmacaoLabel" check>
                                    <AvInput
                                      id="usuario-verAtendAgConfirmacao"
                                      type="checkbox"
                                      className="form-control"
                                      name="verAtendAgConfirmacao"
                                    />
                                    <Translate contentKey="generadorApp.usuario.verAtendAgConfirmacao">Ver Atend Ag Confirmacao</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="verAtendAgConfirmacao" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ediGeoLocalizacaoAtendimento' ? (
                          <Col md="ediGeoLocalizacaoAtendimento">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="ediGeoLocalizacaoAtendimentoLabel" check>
                                    <AvInput
                                      id="usuario-ediGeoLocalizacaoAtendimento"
                                      type="checkbox"
                                      className="form-control"
                                      name="ediGeoLocalizacaoAtendimento"
                                    />
                                    <Translate contentKey="generadorApp.usuario.ediGeoLocalizacaoAtendimento">
                                      Edi Geo Localizacao Atendimento
                                    </Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ediGeoLocalizacaoAtendimento" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'copiarEvolucao' ? (
                          <Col md="copiarEvolucao">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="copiarEvolucaoLabel" check>
                                    <AvInput id="usuario-copiarEvolucao" type="checkbox" className="form-control" name="copiarEvolucao" />
                                    <Translate contentKey="generadorApp.usuario.copiarEvolucao">Copiar Evolucao</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="copiarEvolucao" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'copiarNomeProf' ? (
                          <Col md="copiarNomeProf">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="copiarNomeProfLabel" check>
                                    <AvInput id="usuario-copiarNomeProf" type="checkbox" className="form-control" name="copiarNomeProf" />
                                    <Translate contentKey="generadorApp.usuario.copiarNomeProf">Copiar Nome Prof</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="copiarNomeProf" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'copiarRegistroProf' ? (
                          <Col md="copiarRegistroProf">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="copiarRegistroProfLabel" check>
                                    <AvInput
                                      id="usuario-copiarRegistroProf"
                                      type="checkbox"
                                      className="form-control"
                                      name="copiarRegistroProf"
                                    />
                                    <Translate contentKey="generadorApp.usuario.copiarRegistroProf">Copiar Registro Prof</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="copiarRegistroProf" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'idAreaAtuacao' ? (
                          <Col md="idAreaAtuacao">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idAreaAtuacaoLabel" for="usuario-idAreaAtuacao">
                                    <Translate contentKey="generadorApp.usuario.idAreaAtuacao">Id Area Atuacao</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="usuario-idAreaAtuacao" type="text" name="idAreaAtuacao" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idAreaAtuacao" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'diario' ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="diario" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'pacienteDiario' ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="pacienteDiario" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'unidade' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="usuario-unidade">
                                    <Translate contentKey="generadorApp.usuario.unidade">Unidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="usuario-unidade"
                                    className={'css-select-control'}
                                    value={this.state.unidadeEasySelectValue}
                                    options={
                                      unidadeEasies ? unidadeEasies.map(option => ({ value: option.id, label: option.razaoSocial })) : null
                                    }
                                    onChange={options => this.setState({ unidadeEasySelectValue: options })}
                                    name={'unidade'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="unidade" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'tipoUsuario' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="usuario-tipoUsuario">
                                    <Translate contentKey="generadorApp.usuario.tipoUsuario">Tipo Usuario</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="usuario-tipoUsuario"
                                    className={'css-select-control'}
                                    value={this.state.tipoUsuarioSelectValue}
                                    options={tipoUsuarios ? tipoUsuarios.map(option => ({ value: option.id, label: option.id })) : null}
                                    onChange={options => this.setState({ tipoUsuarioSelectValue: options })}
                                    name={'tipoUsuario'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="tipoUsuario" value={this.state.fieldsBase[baseFilters]} />
                        )}
                      </Row>
                    </div>
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
  unidadeEasies: storeState.unidadeEasy.entities,
  tipoUsuarios: storeState.tipoUsuario.entities,
  usuarioEntity: storeState.usuario.entity,
  loading: storeState.usuario.loading,
  updating: storeState.usuario.updating,
  updateSuccess: storeState.usuario.updateSuccess
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getTipoUsuarios,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UsuarioUpdate);
