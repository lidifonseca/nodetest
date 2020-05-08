/* eslint complexity: ["error", 300] */
import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { getEntities as getUnidadeEasies } from 'app/entities/unidade-easy/unidade-easy.reducer';
import {
  IProfissionalUpdateState,
  getEntity,
  getProfissionalState,
  IProfissionalBaseState,
  updateEntity,
  createEntity,
  setBlob,
  reset
} from './profissional.reducer';
import { IProfissional } from 'app/shared/model/profissional.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProfissionalUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProfissionalUpdate extends React.Component<IProfissionalUpdateProps, IProfissionalUpdateState> {
  obsFileInput: React.RefObject<HTMLInputElement>;

  constructor(props: Readonly<IProfissionalUpdateProps>) {
    super(props);

    this.obsFileInput = React.createRef();

    this.state = {
      unidadeEasySelectValue: null,
      fieldsBase: getProfissionalState(this.props.location),
      unidadeId: '0',
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
      nextProps.profissionalEntity.unidadeEasy &&
      nextProps.profissionalEntity.unidadeEasy.id
    ) {
      this.setState({
        unidadeEasySelectValue: nextProps.unidadeEasies.map(p =>
          nextProps.profissionalEntity.unidadeEasy.id === p.id ? { value: p.id, label: p.razaoSocial } : null
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
  }

  onBlobChange = (isAnImage, name, fileInput) => event => {
    const fileName = fileInput.current.files[0].name;
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType, fileName), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };
  getFiltersURL = (offset = null) => {
    const fieldsBase = this.state.fieldsBase;
    let url = '_back=1' + (offset !== null ? '&offset=' + offset : '');
    Object.keys(fieldsBase).map(key => {
      url += '&' + key + '=' + fieldsBase[key];
    });
    return url;
  };
  saveEntity = (event: any, errors: any, values: any) => {
    values.dataSenha = convertDateTimeToServer(values.dataSenha);

    if (errors.length === 0) {
      const { profissionalEntity } = this.props;
      const entity = {
        ...profissionalEntity,
        unidadeEasy: this.state.unidadeEasySelectValue ? this.state.unidadeEasySelectValue['value'] : null,
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
    this.props.history.push('/profissional?' + this.getFiltersURL());
  };

  render() {
    const { profissionalEntity, unidadeEasies, loading, updating } = this.props;
    const { isNew } = this.state;

    const { obs } = profissionalEntity;
    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...profissionalEntity,
                  unidade: profissionalEntity.unidade ? profissionalEntity.unidade.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.profissional.home.createOrEditLabel">Create or edit a Profissional</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/profissional?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Profissionals</li>
            <li className="breadcrumb-item active">Profissionals edit</li>
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
                        <Label className="mt-2" for="profissional-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput id="profissional-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'idCidade' ? (
                          <Col md="idCidade">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idCidadeLabel" for="profissional-idCidade">
                                    <Translate contentKey="generadorApp.profissional.idCidade">Id Cidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-idCidade" type="text" name="idCidade" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idCidade" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'idTempoExperiencia' ? (
                          <Col md="idTempoExperiencia">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idTempoExperienciaLabel" for="profissional-idTempoExperiencia">
                                    <Translate contentKey="generadorApp.profissional.idTempoExperiencia">Id Tempo Experiencia</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="profissional-idTempoExperiencia"
                                    type="string"
                                    className="form-control"
                                    name="idTempoExperiencia"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idTempoExperiencia" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'idBanco' ? (
                          <Col md="idBanco">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idBancoLabel" for="profissional-idBanco">
                                    <Translate contentKey="generadorApp.profissional.idBanco">Id Banco</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-idBanco" type="string" className="form-control" name="idBanco" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idBanco" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'senha' ? (
                          <Col md="senha">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="senhaLabel" for="profissional-senha">
                                    <Translate contentKey="generadorApp.profissional.senha">Senha</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-senha" type="text" name="senha" />
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
                                  <Label className="mt-2" id="nomeLabel" for="profissional-nome">
                                    <Translate contentKey="generadorApp.profissional.nome">Nome</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-nome" type="text" name="nome" />
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
                                  <Label className="mt-2" id="emailLabel" for="profissional-email">
                                    <Translate contentKey="generadorApp.profissional.email">Email</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-email" type="text" name="email" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="email" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'cpf' ? (
                          <Col md="cpf">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="cpfLabel" for="profissional-cpf">
                                    <Translate contentKey="generadorApp.profissional.cpf">Cpf</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-cpf" type="text" name="cpf" />
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
                                  <Label className="mt-2" id="rgLabel" for="profissional-rg">
                                    <Translate contentKey="generadorApp.profissional.rg">Rg</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-rg" type="text" name="rg" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="rg" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'nomeEmpresa' ? (
                          <Col md="nomeEmpresa">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="nomeEmpresaLabel" for="profissional-nomeEmpresa">
                                    <Translate contentKey="generadorApp.profissional.nomeEmpresa">Nome Empresa</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-nomeEmpresa" type="text" name="nomeEmpresa" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="nomeEmpresa" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'cnpj' ? (
                          <Col md="cnpj">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="cnpjLabel" for="profissional-cnpj">
                                    <Translate contentKey="generadorApp.profissional.cnpj">Cnpj</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-cnpj" type="text" name="cnpj" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cnpj" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'registro' ? (
                          <Col md="registro">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="registroLabel" for="profissional-registro">
                                    <Translate contentKey="generadorApp.profissional.registro">Registro</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-registro" type="text" name="registro" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="registro" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'nascimento' ? (
                          <Col md="nascimento">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="nascimentoLabel" for="profissional-nascimento">
                                    <Translate contentKey="generadorApp.profissional.nascimento">Nascimento</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-nascimento" type="date" className="form-control" name="nascimento" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="nascimento" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'sexo' ? (
                          <Col md="sexo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="sexoLabel" for="profissional-sexo">
                                    <Translate contentKey="generadorApp.profissional.sexo">Sexo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-sexo" type="string" className="form-control" name="sexo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="sexo" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'telefone1' ? (
                          <Col md="telefone1">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="telefone1Label" for="profissional-telefone1">
                                    <Translate contentKey="generadorApp.profissional.telefone1">Telefone 1</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-telefone1" type="text" name="telefone1" />
                                </Col>
                                <UncontrolledTooltip target="telefone1Label">
                                  <Translate contentKey="generadorApp.profissional.help.telefone1" />
                                </UncontrolledTooltip>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="telefone1" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'telefone2' ? (
                          <Col md="telefone2">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="telefone2Label" for="profissional-telefone2">
                                    <Translate contentKey="generadorApp.profissional.telefone2">Telefone 2</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-telefone2" type="text" name="telefone2" />
                                </Col>
                                <UncontrolledTooltip target="telefone2Label">
                                  <Translate contentKey="generadorApp.profissional.help.telefone2" />
                                </UncontrolledTooltip>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="telefone2" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'celular1' ? (
                          <Col md="celular1">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="celular1Label" for="profissional-celular1">
                                    <Translate contentKey="generadorApp.profissional.celular1">Celular 1</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-celular1" type="text" name="celular1" />
                                </Col>
                                <UncontrolledTooltip target="celular1Label">
                                  <Translate contentKey="generadorApp.profissional.help.celular1" />
                                </UncontrolledTooltip>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="celular1" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'celular2' ? (
                          <Col md="celular2">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="celular2Label" for="profissional-celular2">
                                    <Translate contentKey="generadorApp.profissional.celular2">Celular 2</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-celular2" type="text" name="celular2" />
                                </Col>
                                <UncontrolledTooltip target="celular2Label">
                                  <Translate contentKey="generadorApp.profissional.help.celular2" />
                                </UncontrolledTooltip>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="celular2" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'cep' ? (
                          <Col md="cep">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="cepLabel" for="profissional-cep">
                                    <Translate contentKey="generadorApp.profissional.cep">Cep</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-cep" type="text" name="cep" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cep" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'endereco' ? (
                          <Col md="endereco">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="enderecoLabel" for="profissional-endereco">
                                    <Translate contentKey="generadorApp.profissional.endereco">Endereco</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-endereco" type="text" name="endereco" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="endereco" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'numero' ? (
                          <Col md="numero">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="numeroLabel" for="profissional-numero">
                                    <Translate contentKey="generadorApp.profissional.numero">Numero</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-numero" type="text" name="numero" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="numero" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'complemento' ? (
                          <Col md="complemento">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="complementoLabel" for="profissional-complemento">
                                    <Translate contentKey="generadorApp.profissional.complemento">Complemento</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-complemento" type="text" name="complemento" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="complemento" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'bairro' ? (
                          <Col md="bairro">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="bairroLabel" for="profissional-bairro">
                                    <Translate contentKey="generadorApp.profissional.bairro">Bairro</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-bairro" type="text" name="bairro" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="bairro" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'cidade' ? (
                          <Col md="cidade">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="cidadeLabel" for="profissional-cidade">
                                    <Translate contentKey="generadorApp.profissional.cidade">Cidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-cidade" type="text" name="cidade" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cidade" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'uf' ? (
                          <Col md="uf">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="ufLabel" for="profissional-uf">
                                    <Translate contentKey="generadorApp.profissional.uf">Uf</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-uf" type="text" name="uf" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="uf" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'atendeCrianca' ? (
                          <Col md="atendeCrianca">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="atendeCriancaLabel" for="profissional-atendeCrianca">
                                    <Translate contentKey="generadorApp.profissional.atendeCrianca">Atende Crianca</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-atendeCrianca" type="string" className="form-control" name="atendeCrianca" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="atendeCrianca" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'atendeIdoso' ? (
                          <Col md="atendeIdoso">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="atendeIdosoLabel" for="profissional-atendeIdoso">
                                    <Translate contentKey="generadorApp.profissional.atendeIdoso">Atende Idoso</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-atendeIdoso" type="string" className="form-control" name="atendeIdoso" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="atendeIdoso" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ag' ? (
                          <Col md="ag">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="agLabel" for="profissional-ag">
                                    <Translate contentKey="generadorApp.profissional.ag">Ag</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-ag" type="text" name="ag" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ag" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'conta' ? (
                          <Col md="conta">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="contaLabel" for="profissional-conta">
                                    <Translate contentKey="generadorApp.profissional.conta">Conta</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-conta" type="text" name="conta" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="conta" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'tipoConta' ? (
                          <Col md="tipoConta">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="tipoContaLabel" for="profissional-tipoConta">
                                    <Translate contentKey="generadorApp.profissional.tipoConta">Tipo Conta</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-tipoConta" type="text" name="tipoConta" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="tipoConta" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'origemCadastro' ? (
                          <Col md="origemCadastro">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="origemCadastroLabel" for="profissional-origemCadastro">
                                    <Translate contentKey="generadorApp.profissional.origemCadastro">Origem Cadastro</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-origemCadastro" type="text" name="origemCadastro" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="origemCadastro" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'obs' ? (
                          <Col md="obs">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="obsLabel" for="profissional-obs">
                                    <Translate contentKey="generadorApp.profissional.obs">Obs</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="profissional-obs" type="textarea" name="obs" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="obs" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'chavePrivada' ? (
                          <Col md="chavePrivada">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="chavePrivadaLabel" for="profissional-chavePrivada">
                                    <Translate contentKey="generadorApp.profissional.chavePrivada">Chave Privada</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-chavePrivada" type="text" name="chavePrivada" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="chavePrivada" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ativo' ? (
                          <Col md="ativo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="ativoLabel" for="profissional-ativo">
                                    <Translate contentKey="generadorApp.profissional.ativo">Ativo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-ativo" type="string" className="form-control" name="ativo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'senhaOriginal' ? (
                          <Col md="senhaOriginal">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="senhaOriginalLabel" for="profissional-senhaOriginal">
                                    <Translate contentKey="generadorApp.profissional.senhaOriginal">Senha Original</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-senhaOriginal" type="text" name="senhaOriginal" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="senhaOriginal" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'dataSenha' ? (
                          <Col md="dataSenha">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="dataSenhaLabel" for="profissional-dataSenha">
                                    <Translate contentKey="generadorApp.profissional.dataSenha">Data Senha</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput
                                    id="profissional-dataSenha"
                                    type="datetime-local"
                                    className="form-control"
                                    name="dataSenha"
                                    placeholder={'YYYY-MM-DD HH:mm'}
                                    value={isNew ? null : convertDateTimeFromServer(this.props.profissionalEntity.dataSenha)}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="dataSenha" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'expoToken' ? (
                          <Col md="expoToken">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="expoTokenLabel" for="profissional-expoToken">
                                    <Translate contentKey="generadorApp.profissional.expoToken">Expo Token</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-expoToken" type="text" name="expoToken" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="expoToken" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'preferenciaAtendimento' ? (
                          <Col md="preferenciaAtendimento">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="preferenciaAtendimentoLabel" for="profissional-preferenciaAtendimento">
                                    <Translate contentKey="generadorApp.profissional.preferenciaAtendimento">
                                      Preferencia Atendimento
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="profissional-preferenciaAtendimento"
                                    type="string"
                                    className="form-control"
                                    name="preferenciaAtendimento"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="preferenciaAtendimento" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'atendimentoAceite' ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="atendimentoAceite" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'atendimentoAssinaturas' ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="atendimentoAssinaturas" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'unidade' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="profissional-unidade">
                                    <Translate contentKey="generadorApp.profissional.unidade">Unidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="profissional-unidade"
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
  profissionalEntity: storeState.profissional.entity,
  loading: storeState.profissional.loading,
  updating: storeState.profissional.updating,
  updateSuccess: storeState.profissional.updateSuccess
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalUpdate);
