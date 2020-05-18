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

import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { getEntities as getUnidadeEasies } from 'app/entities/unidade-easy/unidade-easy.reducer';
import { IFranquia } from 'app/shared/model/franquia.model';
import { getEntities as getFranquias } from 'app/entities/franquia/franquia.reducer';
import { ICidade } from 'app/shared/model/cidade.model';
import { getEntities as getCidades } from 'app/entities/cidade/cidade.reducer';
import { IGrauParentesco } from 'app/shared/model/grau-parentesco.model';
import { getEntities as getGrauParentescos } from 'app/entities/grau-parentesco/grau-parentesco.reducer';
import { IProfissional } from 'app/shared/model/profissional.model';
import { getEntities as getProfissionals } from 'app/entities/profissional/profissional.reducer';
import { IPacienteHospital } from 'app/shared/model/paciente-hospital.model';
import { getEntities as getPacienteHospitals } from 'app/entities/paciente-hospital/paciente-hospital.reducer';
import {
  IPacienteUpdateState,
  getEntity,
  getPacienteState,
  IPacienteBaseState,
  updateEntity,
  createEntity,
  setBlob,
  reset
} from './paciente.reducer';
import { IPaciente } from 'app/shared/model/paciente.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPacienteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteUpdate extends React.Component<IPacienteUpdateProps, IPacienteUpdateState> {
  observacaoFileInput: React.RefObject<HTMLInputElement>;

  detalhesFileInput: React.RefObject<HTMLInputElement>;

  constructor(props: Readonly<IPacienteUpdateProps>) {
    super(props);

    this.observacaoFileInput = React.createRef();

    this.detalhesFileInput = React.createRef();

    this.state = {
      unidadeEasySelectValue: null,
      franquiaSelectValue: null,
      cidadeSelectValue: null,
      grauParentescoSelectValue: null,
      profissionalSelectValue: null,
      pacienteHospitalSelectValue: null,
      fieldsBase: {
        ...getPacienteState(this.props.location)
      },
      activeTab: 0,
      unidadeId: '0',
      franquiaId: '0',
      cidadeId: '0',
      cidadeFamiliarId: '0',
      grauParentescoId: '0',
      profissionalPrefId: '0',
      tipohospitalId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  toggleTab(tab: number) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }

    if (
      nextProps.unidadeEasies.length > 0 &&
      this.state.unidadeEasySelectValue === null &&
      nextProps.pacienteEntity.unidadeEasy &&
      nextProps.pacienteEntity.unidadeEasy.id
    ) {
      this.setState({
        unidadeEasySelectValue: nextProps.unidadeEasies.map(p =>
          nextProps.pacienteEntity.unidadeEasy.id === p.id ? { value: p.id, label: p.razaoSocial } : null
        )
      });
    }

    if (
      nextProps.franquias.length > 0 &&
      this.state.franquiaSelectValue === null &&
      nextProps.pacienteEntity.franquia &&
      nextProps.pacienteEntity.franquia.id
    ) {
      this.setState({
        franquiaSelectValue: nextProps.franquias.map(p =>
          nextProps.pacienteEntity.franquia.id === p.id ? { value: p.id, label: p.nomeFantasia } : null
        )
      });
    }

    if (
      nextProps.cidades.length > 0 &&
      this.state.cidadeSelectValue === null &&
      nextProps.pacienteEntity.cidade &&
      nextProps.pacienteEntity.cidade.id
    ) {
      this.setState({
        cidadeSelectValue: nextProps.cidades.map(p =>
          nextProps.pacienteEntity.cidade.id === p.id ? { value: p.id, label: p.descrCidade } : null
        )
      });
    }

    if (
      nextProps.grauParentescos.length > 0 &&
      this.state.grauParentescoSelectValue === null &&
      nextProps.pacienteEntity.grauParentesco &&
      nextProps.pacienteEntity.grauParentesco.id
    ) {
      this.setState({
        grauParentescoSelectValue: nextProps.grauParentescos.map(p =>
          nextProps.pacienteEntity.grauParentesco.id === p.id ? { value: p.id, label: p.grauParentesco } : null
        )
      });
    }

    if (
      nextProps.profissionals.length > 0 &&
      this.state.profissionalSelectValue === null &&
      nextProps.pacienteEntity.profissional &&
      nextProps.pacienteEntity.profissional.id
    ) {
      this.setState({
        profissionalSelectValue: nextProps.profissionals.map(p =>
          nextProps.pacienteEntity.profissional.id === p.id ? { value: p.id, label: p.nome } : null
        )
      });
    }

    if (
      nextProps.pacienteHospitals.length > 0 &&
      this.state.pacienteHospitalSelectValue === null &&
      nextProps.pacienteEntity.pacienteHospital &&
      nextProps.pacienteEntity.pacienteHospital.id
    ) {
      this.setState({
        pacienteHospitalSelectValue: nextProps.pacienteHospitals.map(p =>
          nextProps.pacienteEntity.pacienteHospital.id === p.id ? { value: p.id, label: p.servico } : null
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
    this.props.getFranquias();
    this.props.getCidades();
    this.props.getGrauParentescos();
    this.props.getProfissionals();
    this.props.getPacienteHospitals();
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
      const { pacienteEntity } = this.props;
      const entity = {
        ...pacienteEntity,
        unidadeEasy: this.state.unidadeEasySelectValue ? this.state.unidadeEasySelectValue['value'] : null,
        franquia: this.state.franquiaSelectValue ? this.state.franquiaSelectValue['value'] : null,
        cidade: this.state.cidadeSelectValue ? this.state.cidadeSelectValue['value'] : null,
        grauParentesco: this.state.grauParentescoSelectValue ? this.state.grauParentescoSelectValue['value'] : null,
        profissional: this.state.profissionalSelectValue ? this.state.profissionalSelectValue['value'] : null,
        pacienteHospital: this.state.pacienteHospitalSelectValue ? this.state.pacienteHospitalSelectValue['value'] : null,
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
    this.props.history.push('/paciente?' + this.getFiltersURL());
  };

  render() {
    const {
      pacienteEntity,
      unidadeEasies,
      franquias,
      cidades,
      grauParentescos,
      profissionals,
      pacienteHospitals,
      loading,
      updating
    } = this.props;
    const { isNew } = this.state;

    const { observacao, detalhes } = pacienteEntity;
    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...pacienteEntity,
                  activeTab: 0,
                  unidade: pacienteEntity.unidade ? pacienteEntity.unidade.id : null,
                  franquia: pacienteEntity.franquia ? pacienteEntity.franquia.id : null,
                  cidade: pacienteEntity.cidade ? pacienteEntity.cidade.id : null,
                  cidadeFamiliar: pacienteEntity.cidadeFamiliar ? pacienteEntity.cidadeFamiliar.id : null,
                  grauParentesco: pacienteEntity.grauParentesco ? pacienteEntity.grauParentesco.id : null,
                  profissionalPref: pacienteEntity.profissionalPref ? pacienteEntity.profissionalPref.id : null,
                  tipohospital: pacienteEntity.tipohospital ? pacienteEntity.tipohospital.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.paciente.home.createOrEditLabel">Create or edit a Paciente</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button
                  tag={Link}
                  id="cancel-save"
                  to={'/paciente?' + this.getFiltersURL()}
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
                <li className="breadcrumb-item active">
                  <Link to={'/paciente'}>Pacientes</Link>
                </li>
                <li className="breadcrumb-item active">Pacientes edit</li>
              </ol>
            </PanelHeader>
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
                        <Label className="mt-2" for="paciente-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput id="paciente-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      {!isNew ? (
                        <Nav tabs>
                          <NavItem>
                            <NavLink
                              className={classnames({ active: this.state.activeTab === 0 })}
                              onClick={() => {
                                this.toggleTab(0);
                              }}
                            >
                              <span className="d-sm-none"> DadosDoPaciente</span>
                              <span className="d-sm-block d-none">DadosDoPaciente</span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames({ active: this.state.activeTab === 1 })}
                              onClick={() => {
                                this.toggleTab(1);
                              }}
                            >
                              <span className="d-sm-none"> DadosDoFamiliar</span>
                              <span className="d-sm-block d-none">DadosDoFamiliar</span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames({ active: this.state.activeTab === 2 })}
                              onClick={() => {
                                this.toggleTab(2);
                              }}
                            >
                              <span className="d-sm-none">Default</span>
                              <span className="d-sm-block d-none">Default</span>
                            </NavLink>
                          </NavItem>
                        </Nav>
                      ) : null}
                      <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId={0}>
                          {isNew ? (
                            <Row className="justify-content-center mb-3">
                              <Col md="12">
                                <h2 id="generadorApp.paciente.home.formTabs_1">DadosDoPaciente</h2>
                              </Col>
                            </Row>
                          ) : null}

                          <Row>
                            {baseFilters !== 'unidade' ? (
                              <Col md="6">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" for="paciente-unidade">
                                        <Translate contentKey="generadorApp.paciente.unidade">Unidade</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <Select
                                        id="paciente-unidade"
                                        className={'css-select-control'}
                                        value={this.state.unidadeEasySelectValue}
                                        options={
                                          unidadeEasies
                                            ? unidadeEasies.map(option => ({ value: option.id, label: option.razaoSocial }))
                                            : null
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
                            {baseFilters !== 'email' ? (
                              <Col md="email">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" id="emailLabel" for="paciente-email">
                                        <Translate contentKey="generadorApp.paciente.email">Email</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvField id="paciente-email" type="text" name="email" />
                                    </Col>
                                  </Row>
                                </AvGroup>
                              </Col>
                            ) : (
                              <AvInput type="hidden" name="email" value={this.state.fieldsBase[baseFilters]} />
                            )}
                            {baseFilters !== 'nome' ? (
                              <Col md="nome">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" id="nomeLabel" for="paciente-nome">
                                        <Translate contentKey="generadorApp.paciente.nome">Nome</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvField id="paciente-nome" type="text" name="nome" />
                                    </Col>
                                  </Row>
                                </AvGroup>
                              </Col>
                            ) : (
                              <AvInput type="hidden" name="nome" value={this.state.fieldsBase[baseFilters]} />
                            )}
                            {baseFilters !== 'cpf' ? (
                              <Col md="cpf">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" id="cpfLabel" for="paciente-cpf">
                                        <Translate contentKey="generadorApp.paciente.cpf">Cpf</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvField id="paciente-cpf" type="text" name="cpf" />
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
                                    <Col md="12">
                                      <Label className="mt-2" id="rgLabel" for="paciente-rg">
                                        <Translate contentKey="generadorApp.paciente.rg">Rg</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvField id="paciente-rg" type="text" name="rg" />
                                    </Col>
                                  </Row>
                                </AvGroup>
                              </Col>
                            ) : (
                              <AvInput type="hidden" name="rg" value={this.state.fieldsBase[baseFilters]} />
                            )}
                            {baseFilters !== 'cep' ? (
                              <Col md="cep">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" id="cepLabel" for="paciente-cep">
                                        <Translate contentKey="generadorApp.paciente.cep">Cep</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvField id="paciente-cep" type="text" name="cep" />
                                    </Col>
                                  </Row>
                                </AvGroup>
                              </Col>
                            ) : (
                              <AvInput type="hidden" name="cep" value={this.state.fieldsBase[baseFilters]} />
                            )}
                            {baseFilters !== 'nascimento' ? (
                              <Col md="nascimento">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" id="nascimentoLabel" for="paciente-nascimento">
                                        <Translate contentKey="generadorApp.paciente.nascimento">Nascimento</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvField id="paciente-nascimento" type="date" className="form-control" name="nascimento" />
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
                                    <Col md="12">
                                      <Label className="mt-2" id="sexoLabel" for="paciente-sexo">
                                        <Translate contentKey="generadorApp.paciente.sexo">Sexo</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvField id="paciente-sexo" type="string" className="form-control" name="sexo" />
                                    </Col>
                                  </Row>
                                </AvGroup>
                              </Col>
                            ) : (
                              <AvInput type="hidden" name="sexo" value={this.state.fieldsBase[baseFilters]} />
                            )}
                            {baseFilters !== 'endereco' ? (
                              <Col md="endereco">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" id="enderecoLabel" for="paciente-endereco">
                                        <Translate contentKey="generadorApp.paciente.endereco">Endereco</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvField id="paciente-endereco" type="text" name="endereco" />
                                    </Col>
                                  </Row>
                                </AvGroup>
                              </Col>
                            ) : (
                              <AvInput type="hidden" name="endereco" value={this.state.fieldsBase[baseFilters]} />
                            )}
                            {baseFilters !== 'telefone' ? (
                              <Col md="telefone">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" id="telefoneLabel" for="paciente-telefone">
                                        <Translate contentKey="generadorApp.paciente.telefone">Telefone</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvField id="paciente-telefone" type="text" name="telefone" />
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
                                    <Col md="12">
                                      <Label className="mt-2" id="celularLabel" for="paciente-celular">
                                        <Translate contentKey="generadorApp.paciente.celular">Celular</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvField id="paciente-celular" type="text" name="celular" />
                                    </Col>
                                  </Row>
                                </AvGroup>
                              </Col>
                            ) : (
                              <AvInput type="hidden" name="celular" value={this.state.fieldsBase[baseFilters]} />
                            )}
                            {baseFilters !== 'bairro' ? (
                              <Col md="bairro">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" id="bairroLabel" for="paciente-bairro">
                                        <Translate contentKey="generadorApp.paciente.bairro">Bairro</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvField id="paciente-bairro" type="text" name="bairro" />
                                    </Col>
                                  </Row>
                                </AvGroup>
                              </Col>
                            ) : (
                              <AvInput type="hidden" name="bairro" value={this.state.fieldsBase[baseFilters]} />
                            )}
                            {baseFilters !== 'numero' ? (
                              <Col md="numero">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" id="numeroLabel" for="paciente-numero">
                                        <Translate contentKey="generadorApp.paciente.numero">Numero</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvField id="paciente-numero" type="text" name="numero" />
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
                                    <Col md="12">
                                      <Label className="mt-2" id="complementoLabel" for="paciente-complemento">
                                        <Translate contentKey="generadorApp.paciente.complemento">Complemento</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvField id="paciente-complemento" type="text" name="complemento" />
                                    </Col>
                                  </Row>
                                </AvGroup>
                              </Col>
                            ) : (
                              <AvInput type="hidden" name="complemento" value={this.state.fieldsBase[baseFilters]} />
                            )}
                            {baseFilters !== 'cidade' ? (
                              <Col md="8">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" for="paciente-cidade">
                                        <Translate contentKey="generadorApp.paciente.cidade">Cidade</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <Select
                                        id="paciente-cidade"
                                        className={'css-select-control'}
                                        value={this.state.cidadeSelectValue}
                                        options={cidades ? cidades.map(option => ({ value: option.id, label: option.descrCidade })) : null}
                                        onChange={options => this.setState({ cidadeSelectValue: options })}
                                        name={'cidade'}
                                      />
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
                                    <Col md="12">
                                      <Label className="mt-2" id="ufLabel" for="paciente-uf">
                                        <Translate contentKey="generadorApp.paciente.uf">Uf</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvField id="paciente-uf" type="text" name="uf" />
                                    </Col>
                                  </Row>
                                </AvGroup>
                              </Col>
                            ) : (
                              <AvInput type="hidden" name="uf" value={this.state.fieldsBase[baseFilters]} />
                            )}
                            {baseFilters !== 'profissionalPref' ? (
                              <Col md="6">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" for="paciente-profissionalPref">
                                        <Translate contentKey="generadorApp.paciente.profissionalPref">Profissional Pref</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <Select
                                        id="paciente-profissionalPref"
                                        className={'css-select-control'}
                                        value={this.state.profissionalSelectValue}
                                        options={
                                          profissionals ? profissionals.map(option => ({ value: option.id, label: option.nome })) : null
                                        }
                                        onChange={options => this.setState({ profissionalSelectValue: options })}
                                        name={'profissionalPref'}
                                      />
                                    </Col>
                                  </Row>
                                </AvGroup>
                              </Col>
                            ) : (
                              <AvInput type="hidden" name="profissionalPref" value={this.state.fieldsBase[baseFilters]} />
                            )}
                            {baseFilters !== 'tipohospital' ? (
                              <Col md="6">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" for="paciente-tipohospital">
                                        <Translate contentKey="generadorApp.paciente.tipohospital">Tipohospital</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <Select
                                        id="paciente-tipohospital"
                                        className={'css-select-control'}
                                        value={this.state.pacienteHospitalSelectValue}
                                        options={
                                          pacienteHospitals
                                            ? pacienteHospitals.map(option => ({ value: option.id, label: option.servico }))
                                            : null
                                        }
                                        onChange={options => this.setState({ pacienteHospitalSelectValue: options })}
                                        name={'tipohospital'}
                                      />
                                    </Col>
                                  </Row>
                                </AvGroup>
                              </Col>
                            ) : (
                              <AvInput type="hidden" name="tipohospital" value={this.state.fieldsBase[baseFilters]} />
                            )}
                            {baseFilters !== 'liminar' ? (
                              <Col md="liminar">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" id="liminarLabel" for="paciente-liminar">
                                        <Translate contentKey="generadorApp.paciente.liminar">Liminar</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvField id="paciente-liminar" type="text" name="liminar" />
                                    </Col>
                                  </Row>
                                </AvGroup>
                              </Col>
                            ) : (
                              <AvInput type="hidden" name="liminar" value={this.state.fieldsBase[baseFilters]} />
                            )}
                            {baseFilters !== 'detalhes' ? (
                              <Col md="detalhes">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" id="detalhesLabel" for="paciente-detalhes">
                                        <Translate contentKey="generadorApp.paciente.detalhes">Detalhes</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvInput
                                        id="paciente-detalhes"
                                        type="textarea"
                                        name="detalhes"
                                        validate={{
                                          maxLength: { value: 60, errorMessage: translate('entity.validation.maxlength', { max: 60 }) }
                                        }}
                                      />
                                    </Col>
                                  </Row>
                                </AvGroup>
                              </Col>
                            ) : (
                              <AvInput type="hidden" name="detalhes" value={this.state.fieldsBase[baseFilters]} />
                            )}
                            {baseFilters !== 'observacao' ? (
                              <Col md="observacao">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" id="observacaoLabel" for="paciente-observacao">
                                        <Translate contentKey="generadorApp.paciente.observacao">Observacao</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvInput
                                        id="paciente-observacao"
                                        type="textarea"
                                        name="observacao"
                                        validate={{
                                          maxLength: { value: 60, errorMessage: translate('entity.validation.maxlength', { max: 60 }) }
                                        }}
                                      />
                                    </Col>
                                  </Row>
                                </AvGroup>
                              </Col>
                            ) : (
                              <AvInput type="hidden" name="observacao" value={this.state.fieldsBase[baseFilters]} />
                            )}
                          </Row>

                          {isNew ? (
                            <Button
                              color="primary"
                              className={'float-right jh-create-entity'}
                              onClick={() => {
                                this.toggleTab(1);
                              }}
                            >
                              <span className="d-sm-none">DadosDoFamiliar</span>
                              <span className="d-sm-block d-none">
                                DadosDoFamiliar &nbsp;
                                <FontAwesomeIcon icon="arrow-right" />
                              </span>
                            </Button>
                          ) : null}
                        </TabPane>
                        <TabPane tabId={1}>
                          {isNew ? (
                            <Row className="justify-content-center mb-3">
                              <Col md="12">
                                <h2 id="generadorApp.paciente.home.formTabs_57">DadosDoFamiliar</h2>
                              </Col>
                            </Row>
                          ) : null}

                          <Row>
                            {baseFilters !== 'cepFamiliar' ? (
                              <Col md="cepFamiliar">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" id="cepFamiliarLabel" for="paciente-cepFamiliar">
                                        <Translate contentKey="generadorApp.paciente.cepFamiliar">Cep Familiar</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvField id="paciente-cepFamiliar" type="text" name="cepFamiliar" />
                                    </Col>
                                  </Row>
                                </AvGroup>
                              </Col>
                            ) : (
                              <AvInput type="hidden" name="cepFamiliar" value={this.state.fieldsBase[baseFilters]} />
                            )}
                            {baseFilters !== 'enderecoFamiliar' ? (
                              <Col md="enderecoFamiliar">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" id="enderecoFamiliarLabel" for="paciente-enderecoFamiliar">
                                        <Translate contentKey="generadorApp.paciente.enderecoFamiliar">Endereco Familiar</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvField id="paciente-enderecoFamiliar" type="text" name="enderecoFamiliar" />
                                    </Col>
                                  </Row>
                                </AvGroup>
                              </Col>
                            ) : (
                              <AvInput type="hidden" name="enderecoFamiliar" value={this.state.fieldsBase[baseFilters]} />
                            )}
                            {baseFilters !== 'numeroFamiliar' ? (
                              <Col md="numeroFamiliar">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" id="numeroFamiliarLabel" for="paciente-numeroFamiliar">
                                        <Translate contentKey="generadorApp.paciente.numeroFamiliar">Numero Familiar</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvField id="paciente-numeroFamiliar" type="text" name="numeroFamiliar" />
                                    </Col>
                                  </Row>
                                </AvGroup>
                              </Col>
                            ) : (
                              <AvInput type="hidden" name="numeroFamiliar" value={this.state.fieldsBase[baseFilters]} />
                            )}
                            {baseFilters !== 'complementoFamiliar' ? (
                              <Col md="complementoFamiliar">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" id="complementoFamiliarLabel" for="paciente-complementoFamiliar">
                                        <Translate contentKey="generadorApp.paciente.complementoFamiliar">Complemento Familiar</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvField id="paciente-complementoFamiliar" type="text" name="complementoFamiliar" />
                                    </Col>
                                  </Row>
                                </AvGroup>
                              </Col>
                            ) : (
                              <AvInput type="hidden" name="complementoFamiliar" value={this.state.fieldsBase[baseFilters]} />
                            )}
                            {baseFilters !== 'cidadeFamiliar' ? (
                              <Col md="12">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" for="paciente-cidadeFamiliar">
                                        <Translate contentKey="generadorApp.paciente.cidadeFamiliar">Cidade Familiar</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <Select
                                        id="paciente-cidadeFamiliar"
                                        className={'css-select-control'}
                                        value={this.state.cidadeSelectValue}
                                        options={cidades ? cidades.map(option => ({ value: option.id, label: option.descrCidade })) : null}
                                        onChange={options => this.setState({ cidadeSelectValue: options })}
                                        name={'cidadeFamiliar'}
                                      />
                                    </Col>
                                  </Row>
                                </AvGroup>
                              </Col>
                            ) : (
                              <AvInput type="hidden" name="cidadeFamiliar" value={this.state.fieldsBase[baseFilters]} />
                            )}
                            {baseFilters !== 'bairroFamiliar' ? (
                              <Col md="bairroFamiliar">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" id="bairroFamiliarLabel" for="paciente-bairroFamiliar">
                                        <Translate contentKey="generadorApp.paciente.bairroFamiliar">Bairro Familiar</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvField id="paciente-bairroFamiliar" type="text" name="bairroFamiliar" />
                                    </Col>
                                  </Row>
                                </AvGroup>
                              </Col>
                            ) : (
                              <AvInput type="hidden" name="bairroFamiliar" value={this.state.fieldsBase[baseFilters]} />
                            )}
                            {baseFilters !== 'ufFamiliar' ? (
                              <Col md="ufFamiliar">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" id="ufFamiliarLabel" for="paciente-ufFamiliar">
                                        <Translate contentKey="generadorApp.paciente.ufFamiliar">Uf Familiar</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvField id="paciente-ufFamiliar" type="text" name="ufFamiliar" />
                                    </Col>
                                  </Row>
                                </AvGroup>
                              </Col>
                            ) : (
                              <AvInput type="hidden" name="ufFamiliar" value={this.state.fieldsBase[baseFilters]} />
                            )}
                            {baseFilters !== 'latitudeFamiliar' ? (
                              <Col md="latitudeFamiliar">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" id="latitudeFamiliarLabel" for="paciente-latitudeFamiliar">
                                        <Translate contentKey="generadorApp.paciente.latitudeFamiliar">Latitude Familiar</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvField id="paciente-latitudeFamiliar" type="text" name="latitudeFamiliar" />
                                    </Col>
                                  </Row>
                                </AvGroup>
                              </Col>
                            ) : (
                              <AvInput type="hidden" name="latitudeFamiliar" value={this.state.fieldsBase[baseFilters]} />
                            )}
                            {baseFilters !== 'longitudeFamiliar' ? (
                              <Col md="longitudeFamiliar">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" id="longitudeFamiliarLabel" for="paciente-longitudeFamiliar">
                                        <Translate contentKey="generadorApp.paciente.longitudeFamiliar">Longitude Familiar</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvField id="paciente-longitudeFamiliar" type="text" name="longitudeFamiliar" />
                                    </Col>
                                  </Row>
                                </AvGroup>
                              </Col>
                            ) : (
                              <AvInput type="hidden" name="longitudeFamiliar" value={this.state.fieldsBase[baseFilters]} />
                            )}
                            {baseFilters !== 'acessoFamiliar' ? (
                              <Col md="acessoFamiliar">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" id="acessoFamiliarLabel" for="paciente-acessoFamiliar">
                                        <Translate contentKey="generadorApp.paciente.acessoFamiliar">Acesso Familiar</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvField id="paciente-acessoFamiliar" type="string" className="form-control" name="acessoFamiliar" />
                                    </Col>
                                  </Row>
                                </AvGroup>
                              </Col>
                            ) : (
                              <AvInput type="hidden" name="acessoFamiliar" value={this.state.fieldsBase[baseFilters]} />
                            )}
                            {baseFilters !== 'emailFamiliar' ? (
                              <Col md="emailFamiliar">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" id="emailFamiliarLabel" for="paciente-emailFamiliar">
                                        <Translate contentKey="generadorApp.paciente.emailFamiliar">Email Familiar</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvField id="paciente-emailFamiliar" type="text" name="emailFamiliar" />
                                    </Col>
                                  </Row>
                                </AvGroup>
                              </Col>
                            ) : (
                              <AvInput type="hidden" name="emailFamiliar" value={this.state.fieldsBase[baseFilters]} />
                            )}
                            {baseFilters !== 'cpfFamiliar' ? (
                              <Col md="cpfFamiliar">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" id="cpfFamiliarLabel" for="paciente-cpfFamiliar">
                                        <Translate contentKey="generadorApp.paciente.cpfFamiliar">Cpf Familiar</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvField id="paciente-cpfFamiliar" type="text" name="cpfFamiliar" />
                                    </Col>
                                  </Row>
                                </AvGroup>
                              </Col>
                            ) : (
                              <AvInput type="hidden" name="cpfFamiliar" value={this.state.fieldsBase[baseFilters]} />
                            )}
                            {baseFilters !== 'rgFamiliar' ? (
                              <Col md="rgFamiliar">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" id="rgFamiliarLabel" for="paciente-rgFamiliar">
                                        <Translate contentKey="generadorApp.paciente.rgFamiliar">Rg Familiar</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvField id="paciente-rgFamiliar" type="text" name="rgFamiliar" />
                                    </Col>
                                  </Row>
                                </AvGroup>
                              </Col>
                            ) : (
                              <AvInput type="hidden" name="rgFamiliar" value={this.state.fieldsBase[baseFilters]} />
                            )}
                            {baseFilters !== 'nascimentoFamiliar' ? (
                              <Col md="nascimentoFamiliar">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" id="nascimentoFamiliarLabel" for="paciente-nascimentoFamiliar">
                                        <Translate contentKey="generadorApp.paciente.nascimentoFamiliar">Nascimento Familiar</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvField
                                        id="paciente-nascimentoFamiliar"
                                        type="date"
                                        className="form-control"
                                        name="nascimentoFamiliar"
                                        validate={{
                                          maxLength: { value: 60, errorMessage: translate('entity.validation.maxlength', { max: 60 }) }
                                        }}
                                      />
                                    </Col>
                                  </Row>
                                </AvGroup>
                              </Col>
                            ) : (
                              <AvInput type="hidden" name="nascimentoFamiliar" value={this.state.fieldsBase[baseFilters]} />
                            )}
                            {baseFilters !== 'sexoFamiliar' ? (
                              <Col md="sexoFamiliar">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" id="sexoFamiliarLabel" for="paciente-sexoFamiliar">
                                        <Translate contentKey="generadorApp.paciente.sexoFamiliar">Sexo Familiar</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvField id="paciente-sexoFamiliar" type="string" className="form-control" name="sexoFamiliar" />
                                    </Col>
                                  </Row>
                                </AvGroup>
                              </Col>
                            ) : (
                              <AvInput type="hidden" name="sexoFamiliar" value={this.state.fieldsBase[baseFilters]} />
                            )}
                            {baseFilters !== 'telefoneFamiliar' ? (
                              <Col md="telefoneFamiliar">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" id="telefoneFamiliarLabel" for="paciente-telefoneFamiliar">
                                        <Translate contentKey="generadorApp.paciente.telefoneFamiliar">Telefone Familiar</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvField id="paciente-telefoneFamiliar" type="text" name="telefoneFamiliar" />
                                    </Col>
                                  </Row>
                                </AvGroup>
                              </Col>
                            ) : (
                              <AvInput type="hidden" name="telefoneFamiliar" value={this.state.fieldsBase[baseFilters]} />
                            )}
                            {baseFilters !== 'celularFamiliar' ? (
                              <Col md="celularFamiliar">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" id="celularFamiliarLabel" for="paciente-celularFamiliar">
                                        <Translate contentKey="generadorApp.paciente.celularFamiliar">Celular Familiar</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvField id="paciente-celularFamiliar" type="text" name="celularFamiliar" />
                                    </Col>
                                  </Row>
                                </AvGroup>
                              </Col>
                            ) : (
                              <AvInput type="hidden" name="celularFamiliar" value={this.state.fieldsBase[baseFilters]} />
                            )}
                            {baseFilters !== 'observacaoFamiliar' ? (
                              <Col md="observacaoFamiliar">
                                <AvGroup>
                                  <Row>
                                    <Col md="12">
                                      <Label className="mt-2" id="observacaoFamiliarLabel" for="paciente-observacaoFamiliar">
                                        <Translate contentKey="generadorApp.paciente.observacaoFamiliar">Observacao Familiar</Translate>
                                      </Label>
                                    </Col>
                                    <Col md="12">
                                      <AvField id="paciente-observacaoFamiliar" type="text" name="observacaoFamiliar" />
                                    </Col>
                                  </Row>
                                </AvGroup>
                              </Col>
                            ) : (
                              <AvInput type="hidden" name="observacaoFamiliar" value={this.state.fieldsBase[baseFilters]} />
                            )}
                          </Row>

                          {isNew ? (
                            <Button
                              color="primary"
                              className={'float-right jh-create-entity'}
                              onClick={() => {
                                this.toggleTab(2);
                              }}
                            >
                              <span className="d-sm-none">Default</span>
                              <span className="d-sm-block d-none">
                                Default &nbsp;
                                <FontAwesomeIcon icon="arrow-right" />
                              </span>
                            </Button>
                          ) : null}

                          {isNew ? (
                            <Button
                              color="info"
                              className={'float-right jh-create-entity'}
                              onClick={() => {
                                this.toggleTab(0);
                              }}
                            >
                              <span className="d-sm-none"> DadosDoPaciente </span>
                              <span className="d-sm-block d-none">
                                <FontAwesomeIcon icon="arrow-left" />
                                &nbsp; DadosDoPaciente
                              </span>
                            </Button>
                          ) : null}
                        </TabPane>
                        <TabPane tabId={2}>
                          {isNew ? (
                            <Row className="justify-content-center mb-3">
                              <Col md="12">
                                <h2 id="generadorApp.paciente.home.formTabs_default">Default</h2>
                              </Col>
                            </Row>
                          ) : null}

                          {baseFilters !== 'comResponsavel' ? (
                            <Col md="comResponsavel">
                              <AvGroup>
                                <Row>
                                  <Col md="12">
                                    <Label className="mt-2" id="comResponsavelLabel" for="paciente-comResponsavel">
                                      <Translate contentKey="generadorApp.paciente.comResponsavel">Com Responsavel</Translate>
                                    </Label>
                                  </Col>
                                  <Col md="12">
                                    <AvField id="paciente-comResponsavel" type="string" className="form-control" name="comResponsavel" />
                                  </Col>
                                </Row>
                              </AvGroup>
                            </Col>
                          ) : (
                            <AvInput type="hidden" name="comResponsavel" value={this.state.fieldsBase[baseFilters]} />
                          )}
                          {baseFilters !== 'grauParentesco' ? (
                            <Col md="12">
                              <AvGroup>
                                <Row>
                                  <Col md="12">
                                    <Label className="mt-2" for="paciente-grauParentesco">
                                      <Translate contentKey="generadorApp.paciente.grauParentesco">Grau Parentesco</Translate>
                                    </Label>
                                  </Col>
                                  <Col md="12">
                                    <Select
                                      id="paciente-grauParentesco"
                                      className={'css-select-control'}
                                      value={this.state.grauParentescoSelectValue}
                                      options={
                                        grauParentescos
                                          ? grauParentescos.map(option => ({ value: option.id, label: option.grauParentesco }))
                                          : null
                                      }
                                      onChange={options => this.setState({ grauParentescoSelectValue: options })}
                                      name={'grauParentesco'}
                                    />
                                  </Col>
                                </Row>
                              </AvGroup>
                            </Col>
                          ) : (
                            <AvInput type="hidden" name="grauParentesco" value={this.state.fieldsBase[baseFilters]} />
                          )}
                          {baseFilters !== 'responsavelFamiliar' ? (
                            <Col md="responsavelFamiliar">
                              <AvGroup>
                                <Row>
                                  <Col md="12">
                                    <Label className="mt-2" id="responsavelFamiliarLabel" for="paciente-responsavelFamiliar">
                                      <Translate contentKey="generadorApp.paciente.responsavelFamiliar">Responsavel Familiar</Translate>
                                    </Label>
                                  </Col>
                                  <Col md="12">
                                    <AvField id="paciente-responsavelFamiliar" type="text" name="responsavelFamiliar" />
                                  </Col>
                                </Row>
                              </AvGroup>
                            </Col>
                          ) : (
                            <AvInput type="hidden" name="responsavelFamiliar" value={this.state.fieldsBase[baseFilters]} />
                          )}
                          {baseFilters !== 'franquia' ? (
                            <Col md="12">
                              <AvGroup>
                                <Row>
                                  <Col md="12">
                                    <Label className="mt-2" for="paciente-franquia">
                                      <Translate contentKey="generadorApp.paciente.franquia">Franquia</Translate>
                                    </Label>
                                  </Col>
                                  <Col md="12">
                                    <Select
                                      id="paciente-franquia"
                                      className={'css-select-control'}
                                      value={this.state.franquiaSelectValue}
                                      options={
                                        franquias ? franquias.map(option => ({ value: option.id, label: option.nomeFantasia })) : null
                                      }
                                      onChange={options => this.setState({ franquiaSelectValue: options })}
                                      name={'franquia'}
                                    />
                                  </Col>
                                </Row>
                              </AvGroup>
                            </Col>
                          ) : (
                            <AvInput type="hidden" name="franquia" value={this.state.fieldsBase[baseFilters]} />
                          )}
                          {baseFilters !== 'senha' ? (
                            <Col md="senha">
                              <AvGroup>
                                <Row>
                                  <Col md="12">
                                    <Label className="mt-2" id="senhaLabel" for="paciente-senha">
                                      <Translate contentKey="generadorApp.paciente.senha">Senha</Translate>
                                    </Label>
                                  </Col>
                                  <Col md="12">
                                    <AvField id="paciente-senha" type="text" name="senha" />
                                  </Col>
                                </Row>
                              </AvGroup>
                            </Col>
                          ) : (
                            <AvInput type="hidden" name="senha" value={this.state.fieldsBase[baseFilters]} />
                          )}
                          {baseFilters !== 'registro' ? (
                            <Col md="registro">
                              <AvGroup>
                                <Row>
                                  <Col md="12">
                                    <Label className="mt-2" id="registroLabel" for="paciente-registro">
                                      <Translate contentKey="generadorApp.paciente.registro">Registro</Translate>
                                    </Label>
                                  </Col>
                                  <Col md="12">
                                    <AvField id="paciente-registro" type="text" name="registro" />
                                  </Col>
                                </Row>
                              </AvGroup>
                            </Col>
                          ) : (
                            <AvInput type="hidden" name="registro" value={this.state.fieldsBase[baseFilters]} />
                          )}
                          {baseFilters !== 'latitude' ? (
                            <Col md="latitude">
                              <AvGroup>
                                <Row>
                                  <Col md="12">
                                    <Label className="mt-2" id="latitudeLabel" for="paciente-latitude">
                                      <Translate contentKey="generadorApp.paciente.latitude">Latitude</Translate>
                                    </Label>
                                  </Col>
                                  <Col md="12">
                                    <AvField id="paciente-latitude" type="text" name="latitude" />
                                  </Col>
                                </Row>
                              </AvGroup>
                            </Col>
                          ) : (
                            <AvInput type="hidden" name="latitude" value={this.state.fieldsBase[baseFilters]} />
                          )}
                          {baseFilters !== 'longitude' ? (
                            <Col md="longitude">
                              <AvGroup>
                                <Row>
                                  <Col md="12">
                                    <Label className="mt-2" id="longitudeLabel" for="paciente-longitude">
                                      <Translate contentKey="generadorApp.paciente.longitude">Longitude</Translate>
                                    </Label>
                                  </Col>
                                  <Col md="12">
                                    <AvField id="paciente-longitude" type="text" name="longitude" />
                                  </Col>
                                </Row>
                              </AvGroup>
                            </Col>
                          ) : (
                            <AvInput type="hidden" name="longitude" value={this.state.fieldsBase[baseFilters]} />
                          )}
                          {baseFilters !== 'aph' ? (
                            <Col md="aph">
                              <AvGroup>
                                <Row>
                                  <Col md="12">
                                    <Label className="mt-2" id="aphLabel" for="paciente-aph">
                                      <Translate contentKey="generadorApp.paciente.aph">Aph</Translate>
                                    </Label>
                                  </Col>
                                  <Col md="12">
                                    <AvField id="paciente-aph" type="string" className="form-control" name="aph" />
                                  </Col>
                                </Row>
                              </AvGroup>
                            </Col>
                          ) : (
                            <AvInput type="hidden" name="aph" value={this.state.fieldsBase[baseFilters]} />
                          )}
                          {baseFilters !== 'nivelComplexidade' ? (
                            <Col md="nivelComplexidade">
                              <AvGroup>
                                <Row>
                                  <Col md="12">
                                    <Label className="mt-2" id="nivelComplexidadeLabel" for="paciente-nivelComplexidade">
                                      <Translate contentKey="generadorApp.paciente.nivelComplexidade">Nivel Complexidade</Translate>
                                    </Label>
                                  </Col>
                                  <Col md="12">
                                    <AvField
                                      id="paciente-nivelComplexidade"
                                      type="string"
                                      className="form-control"
                                      name="nivelComplexidade"
                                    />
                                  </Col>
                                </Row>
                              </AvGroup>
                            </Col>
                          ) : (
                            <AvInput type="hidden" name="nivelComplexidade" value={this.state.fieldsBase[baseFilters]} />
                          )}
                          {baseFilters !== 'passagemPs' ? (
                            <Col md="passagemPs">
                              <AvGroup>
                                <Row>
                                  <Col md="12">
                                    <Label className="mt-2" id="passagemPsLabel" for="paciente-passagemPs">
                                      <Translate contentKey="generadorApp.paciente.passagemPs">Passagem Ps</Translate>
                                    </Label>
                                  </Col>
                                  <Col md="12">
                                    <AvField id="paciente-passagemPs" type="string" className="form-control" name="passagemPs" />
                                  </Col>
                                </Row>
                              </AvGroup>
                            </Col>
                          ) : (
                            <AvInput type="hidden" name="passagemPs" value={this.state.fieldsBase[baseFilters]} />
                          )}
                          {baseFilters !== 'obsPs' ? (
                            <Col md="obsPs">
                              <AvGroup>
                                <Row>
                                  <Col md="12">
                                    <Label className="mt-2" id="obsPsLabel" for="paciente-obsPs">
                                      <Translate contentKey="generadorApp.paciente.obsPs">Obs Ps</Translate>
                                    </Label>
                                  </Col>
                                  <Col md="12">
                                    <AvField id="paciente-obsPs" type="text" name="obsPs" />
                                  </Col>
                                </Row>
                              </AvGroup>
                            </Col>
                          ) : (
                            <AvInput type="hidden" name="obsPs" value={this.state.fieldsBase[baseFilters]} />
                          )}
                          {baseFilters !== 'passagemInternacao' ? (
                            <Col md="passagemInternacao">
                              <AvGroup>
                                <Row>
                                  <Col md="12">
                                    <Label className="mt-2" id="passagemInternacaoLabel" for="paciente-passagemInternacao">
                                      <Translate contentKey="generadorApp.paciente.passagemInternacao">Passagem Internacao</Translate>
                                    </Label>
                                  </Col>
                                  <Col md="12">
                                    <AvField
                                      id="paciente-passagemInternacao"
                                      type="string"
                                      className="form-control"
                                      name="passagemInternacao"
                                    />
                                  </Col>
                                </Row>
                              </AvGroup>
                            </Col>
                          ) : (
                            <AvInput type="hidden" name="passagemInternacao" value={this.state.fieldsBase[baseFilters]} />
                          )}
                          {baseFilters !== 'obsInternacao' ? (
                            <Col md="obsInternacao">
                              <AvGroup>
                                <Row>
                                  <Col md="12">
                                    <Label className="mt-2" id="obsInternacaoLabel" for="paciente-obsInternacao">
                                      <Translate contentKey="generadorApp.paciente.obsInternacao">Obs Internacao</Translate>
                                    </Label>
                                  </Col>
                                  <Col md="12">
                                    <AvField id="paciente-obsInternacao" type="text" name="obsInternacao" />
                                  </Col>
                                </Row>
                              </AvGroup>
                            </Col>
                          ) : (
                            <AvInput type="hidden" name="obsInternacao" value={this.state.fieldsBase[baseFilters]} />
                          )}
                          {baseFilters !== 'custoTotal' ? (
                            <Col md="custoTotal">
                              <AvGroup>
                                <Row>
                                  <Col md="12">
                                    <Label className="mt-2" id="custoTotalLabel" for="paciente-custoTotal">
                                      <Translate contentKey="generadorApp.paciente.custoTotal">Custo Total</Translate>
                                    </Label>
                                  </Col>
                                  <Col md="12">
                                    <AvField id="paciente-custoTotal" type="string" className="form-control" name="custoTotal" />
                                  </Col>
                                </Row>
                              </AvGroup>
                            </Col>
                          ) : (
                            <AvInput type="hidden" name="custoTotal" value={this.state.fieldsBase[baseFilters]} />
                          )}
                          {baseFilters !== 'mesmoEndereco' ? (
                            <Col md="mesmoEndereco">
                              <AvGroup>
                                <Row>
                                  <Col md="12">
                                    <Label className="mt-2" id="mesmoEnderecoLabel" for="paciente-mesmoEndereco">
                                      <Translate contentKey="generadorApp.paciente.mesmoEndereco">Mesmo Endereco</Translate>
                                    </Label>
                                  </Col>
                                  <Col md="12">
                                    <AvField id="paciente-mesmoEndereco" type="string" className="form-control" name="mesmoEndereco" />
                                  </Col>
                                </Row>
                              </AvGroup>
                            </Col>
                          ) : (
                            <AvInput type="hidden" name="mesmoEndereco" value={this.state.fieldsBase[baseFilters]} />
                          )}
                          {baseFilters !== 'cadastroCompleto' ? (
                            <Col md="cadastroCompleto">
                              <AvGroup>
                                <Row>
                                  <Col md="12">
                                    <Label className="mt-2" id="cadastroCompletoLabel" for="paciente-cadastroCompleto">
                                      <Translate contentKey="generadorApp.paciente.cadastroCompleto">Cadastro Completo</Translate>
                                    </Label>
                                  </Col>
                                  <Col md="12">
                                    <AvField
                                      id="paciente-cadastroCompleto"
                                      type="string"
                                      className="form-control"
                                      name="cadastroCompleto"
                                    />
                                  </Col>
                                </Row>
                              </AvGroup>
                            </Col>
                          ) : (
                            <AvInput type="hidden" name="cadastroCompleto" value={this.state.fieldsBase[baseFilters]} />
                          )}
                          {baseFilters !== 'ativo' ? (
                            <Col md="ativo">
                              <AvGroup>
                                <Row>
                                  <Col md="12">
                                    <Label className="mt-2" id="ativoLabel" check>
                                      <AvInput id="paciente-ativo" type="checkbox" className="form-control" name="ativo" />
                                      <Translate contentKey="generadorApp.paciente.ativo">Ativo</Translate>
                                    </Label>
                                  </Col>
                                </Row>
                              </AvGroup>
                            </Col>
                          ) : (
                            <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
                          )}
                          {baseFilters !== 'expoToken' ? (
                            <Col md="expoToken">
                              <AvGroup>
                                <Row>
                                  <Col md="12">
                                    <Label className="mt-2" id="expoTokenLabel" for="paciente-expoToken">
                                      <Translate contentKey="generadorApp.paciente.expoToken">Expo Token</Translate>
                                    </Label>
                                  </Col>
                                  <Col md="12">
                                    <AvField id="paciente-expoToken" type="text" name="expoToken" />
                                  </Col>
                                </Row>
                              </AvGroup>
                            </Col>
                          ) : (
                            <AvInput type="hidden" name="expoToken" value={this.state.fieldsBase[baseFilters]} />
                          )}

                          {isNew ? (
                            <Button
                              color="primary"
                              id="save-entity"
                              type="submit"
                              disabled={updating}
                              className="btn btn-primary float-right jh-create-entity"
                            >
                              <FontAwesomeIcon icon="save" />
                              &nbsp;
                              <Translate contentKey="entity.action.save">Save</Translate>
                            </Button>
                          ) : null}

                          {isNew ? (
                            <Button
                              color="info"
                              className={'float-right jh-create-entity '}
                              onClick={() => {
                                this.toggleTab(1);
                              }}
                            >
                              <span className=" d-sm-none"> DadosDoFamiliar </span>
                              <span className="d-sm-block d-none">
                                <FontAwesomeIcon icon="arrow-left" />
                                &nbsp; DadosDoFamiliar
                              </span>
                            </Button>
                          ) : null}
                        </TabPane>
                      </TabContent>
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
  franquias: storeState.franquia.entities,
  cidades: storeState.cidade.entities,
  grauParentescos: storeState.grauParentesco.entities,
  profissionals: storeState.profissional.entities,
  pacienteHospitals: storeState.pacienteHospital.entities,
  pacienteEntity: storeState.paciente.entity,
  loading: storeState.paciente.loading,
  updating: storeState.paciente.updating,
  updateSuccess: storeState.paciente.updateSuccess
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getFranquias,
  getCidades,
  getGrauParentescos,
  getProfissionals,
  getPacienteHospitals,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteUpdate);
