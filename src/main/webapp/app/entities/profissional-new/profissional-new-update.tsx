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
  IProfissionalNewUpdateState,
  getEntity,
  getProfissionalNewState,
  IProfissionalNewBaseState,
  updateEntity,
  createEntity,
  setBlob,
  reset
} from './profissional-new.reducer';
import { IProfissionalNew } from 'app/shared/model/profissional-new.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProfissionalNewUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProfissionalNewUpdate extends React.Component<IProfissionalNewUpdateProps, IProfissionalNewUpdateState> {
  obsFileInput: React.RefObject<HTMLInputElement>;

  constructor(props: Readonly<IProfissionalNewUpdateProps>) {
    super(props);

    this.obsFileInput = React.createRef();

    this.state = {
      unidadeEasySelectValue: null,
      fieldsBase: getProfissionalNewState(this.props.location),
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
      nextProps.profissionalNewEntity.unidadeEasy &&
      nextProps.profissionalNewEntity.unidadeEasy.id
    ) {
      this.setState({
        unidadeEasySelectValue: nextProps.unidadeEasies.map(p =>
          nextProps.profissionalNewEntity.unidadeEasy.id === p.id ? { value: p.id, label: p.razaoSocial } : null
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
    if (errors.length === 0) {
      const { profissionalNewEntity } = this.props;
      const entity = {
        ...profissionalNewEntity,
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
    this.props.history.push('/profissional-new?' + this.getFiltersURL());
  };

  render() {
    const { profissionalNewEntity, unidadeEasies, loading, updating } = this.props;
    const { isNew } = this.state;

    const { obs } = profissionalNewEntity;
    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...profissionalNewEntity,
                  unidade: profissionalNewEntity.unidade ? profissionalNewEntity.unidade.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.profissionalNew.home.createOrEditLabel">Create or edit a ProfissionalNew</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/profissional-new?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Profissional News</li>
            <li className="breadcrumb-item active">Profissional News edit</li>
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
                        <Label className="mt-2" for="profissional-new-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput id="profissional-new-id" type="hidden" className="form-control" name="id" required readOnly />
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
                                  <Label className="mt-2" id="idCidadeLabel" for="profissional-new-idCidade">
                                    <Translate contentKey="generadorApp.profissionalNew.idCidade">Id Cidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-new-idCidade" type="text" name="idCidade" />
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
                                  <Label className="mt-2" id="idTempoExperienciaLabel" for="profissional-new-idTempoExperiencia">
                                    <Translate contentKey="generadorApp.profissionalNew.idTempoExperiencia">Id Tempo Experiencia</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="profissional-new-idTempoExperiencia"
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
                                  <Label className="mt-2" id="idBancoLabel" for="profissional-new-idBanco">
                                    <Translate contentKey="generadorApp.profissionalNew.idBanco">Id Banco</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-new-idBanco" type="string" className="form-control" name="idBanco" />
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
                                  <Label className="mt-2" id="senhaLabel" for="profissional-new-senha">
                                    <Translate contentKey="generadorApp.profissionalNew.senha">Senha</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-new-senha" type="text" name="senha" />
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
                                  <Label className="mt-2" id="nomeLabel" for="profissional-new-nome">
                                    <Translate contentKey="generadorApp.profissionalNew.nome">Nome</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-new-nome" type="text" name="nome" />
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
                                  <Label className="mt-2" id="emailLabel" for="profissional-new-email">
                                    <Translate contentKey="generadorApp.profissionalNew.email">Email</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-new-email" type="text" name="email" />
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
                                  <Label className="mt-2" id="cpfLabel" for="profissional-new-cpf">
                                    <Translate contentKey="generadorApp.profissionalNew.cpf">Cpf</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-new-cpf" type="text" name="cpf" />
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
                                  <Label className="mt-2" id="rgLabel" for="profissional-new-rg">
                                    <Translate contentKey="generadorApp.profissionalNew.rg">Rg</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-new-rg" type="text" name="rg" />
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
                                  <Label className="mt-2" id="nomeEmpresaLabel" for="profissional-new-nomeEmpresa">
                                    <Translate contentKey="generadorApp.profissionalNew.nomeEmpresa">Nome Empresa</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-new-nomeEmpresa" type="text" name="nomeEmpresa" />
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
                                  <Label className="mt-2" id="cnpjLabel" for="profissional-new-cnpj">
                                    <Translate contentKey="generadorApp.profissionalNew.cnpj">Cnpj</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-new-cnpj" type="text" name="cnpj" />
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
                                  <Label className="mt-2" id="registroLabel" for="profissional-new-registro">
                                    <Translate contentKey="generadorApp.profissionalNew.registro">Registro</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-new-registro" type="text" name="registro" />
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
                                  <Label className="mt-2" id="nascimentoLabel" for="profissional-new-nascimento">
                                    <Translate contentKey="generadorApp.profissionalNew.nascimento">Nascimento</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-new-nascimento" type="date" className="form-control" name="nascimento" />
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
                                  <Label className="mt-2" id="sexoLabel" for="profissional-new-sexo">
                                    <Translate contentKey="generadorApp.profissionalNew.sexo">Sexo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-new-sexo" type="string" className="form-control" name="sexo" />
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
                                  <Label className="mt-2" id="telefone1Label" for="profissional-new-telefone1">
                                    <Translate contentKey="generadorApp.profissionalNew.telefone1">Telefone 1</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-new-telefone1" type="text" name="telefone1" />
                                </Col>
                                <UncontrolledTooltip target="telefone1Label">
                                  <Translate contentKey="generadorApp.profissionalNew.help.telefone1" />
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
                                  <Label className="mt-2" id="telefone2Label" for="profissional-new-telefone2">
                                    <Translate contentKey="generadorApp.profissionalNew.telefone2">Telefone 2</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-new-telefone2" type="text" name="telefone2" />
                                </Col>
                                <UncontrolledTooltip target="telefone2Label">
                                  <Translate contentKey="generadorApp.profissionalNew.help.telefone2" />
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
                                  <Label className="mt-2" id="celular1Label" for="profissional-new-celular1">
                                    <Translate contentKey="generadorApp.profissionalNew.celular1">Celular 1</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-new-celular1" type="text" name="celular1" />
                                </Col>
                                <UncontrolledTooltip target="celular1Label">
                                  <Translate contentKey="generadorApp.profissionalNew.help.celular1" />
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
                                  <Label className="mt-2" id="celular2Label" for="profissional-new-celular2">
                                    <Translate contentKey="generadorApp.profissionalNew.celular2">Celular 2</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-new-celular2" type="text" name="celular2" />
                                </Col>
                                <UncontrolledTooltip target="celular2Label">
                                  <Translate contentKey="generadorApp.profissionalNew.help.celular2" />
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
                                  <Label className="mt-2" id="cepLabel" for="profissional-new-cep">
                                    <Translate contentKey="generadorApp.profissionalNew.cep">Cep</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-new-cep" type="text" name="cep" />
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
                                  <Label className="mt-2" id="enderecoLabel" for="profissional-new-endereco">
                                    <Translate contentKey="generadorApp.profissionalNew.endereco">Endereco</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-new-endereco" type="text" name="endereco" />
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
                                  <Label className="mt-2" id="numeroLabel" for="profissional-new-numero">
                                    <Translate contentKey="generadorApp.profissionalNew.numero">Numero</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-new-numero" type="text" name="numero" />
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
                                  <Label className="mt-2" id="complementoLabel" for="profissional-new-complemento">
                                    <Translate contentKey="generadorApp.profissionalNew.complemento">Complemento</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-new-complemento" type="text" name="complemento" />
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
                                  <Label className="mt-2" id="bairroLabel" for="profissional-new-bairro">
                                    <Translate contentKey="generadorApp.profissionalNew.bairro">Bairro</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-new-bairro" type="text" name="bairro" />
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
                                  <Label className="mt-2" id="cidadeLabel" for="profissional-new-cidade">
                                    <Translate contentKey="generadorApp.profissionalNew.cidade">Cidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-new-cidade" type="text" name="cidade" />
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
                                  <Label className="mt-2" id="ufLabel" for="profissional-new-uf">
                                    <Translate contentKey="generadorApp.profissionalNew.uf">Uf</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-new-uf" type="text" name="uf" />
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
                                  <Label className="mt-2" id="atendeCriancaLabel" for="profissional-new-atendeCrianca">
                                    <Translate contentKey="generadorApp.profissionalNew.atendeCrianca">Atende Crianca</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="profissional-new-atendeCrianca"
                                    type="string"
                                    className="form-control"
                                    name="atendeCrianca"
                                  />
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
                                  <Label className="mt-2" id="atendeIdosoLabel" for="profissional-new-atendeIdoso">
                                    <Translate contentKey="generadorApp.profissionalNew.atendeIdoso">Atende Idoso</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-new-atendeIdoso" type="string" className="form-control" name="atendeIdoso" />
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
                                  <Label className="mt-2" id="agLabel" for="profissional-new-ag">
                                    <Translate contentKey="generadorApp.profissionalNew.ag">Ag</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-new-ag" type="text" name="ag" />
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
                                  <Label className="mt-2" id="contaLabel" for="profissional-new-conta">
                                    <Translate contentKey="generadorApp.profissionalNew.conta">Conta</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-new-conta" type="text" name="conta" />
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
                                  <Label className="mt-2" id="tipoContaLabel" for="profissional-new-tipoConta">
                                    <Translate contentKey="generadorApp.profissionalNew.tipoConta">Tipo Conta</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-new-tipoConta" type="text" name="tipoConta" />
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
                                  <Label className="mt-2" id="origemCadastroLabel" for="profissional-new-origemCadastro">
                                    <Translate contentKey="generadorApp.profissionalNew.origemCadastro">Origem Cadastro</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-new-origemCadastro" type="text" name="origemCadastro" />
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
                                  <Label className="mt-2" id="obsLabel" for="profissional-new-obs">
                                    <Translate contentKey="generadorApp.profissionalNew.obs">Obs</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="profissional-new-obs" type="textarea" name="obs" />
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
                                  <Label className="mt-2" id="chavePrivadaLabel" for="profissional-new-chavePrivada">
                                    <Translate contentKey="generadorApp.profissionalNew.chavePrivada">Chave Privada</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-new-chavePrivada" type="text" name="chavePrivada" />
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
                                  <Label className="mt-2" id="ativoLabel" for="profissional-new-ativo">
                                    <Translate contentKey="generadorApp.profissionalNew.ativo">Ativo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-new-ativo" type="string" className="form-control" name="ativo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'unidade' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="profissional-new-unidade">
                                    <Translate contentKey="generadorApp.profissionalNew.unidade">Unidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="profissional-new-unidade"
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
  profissionalNewEntity: storeState.profissionalNew.entity,
  loading: storeState.profissionalNew.loading,
  updating: storeState.profissionalNew.updating,
  updateSuccess: storeState.profissionalNew.updateSuccess
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalNewUpdate);
