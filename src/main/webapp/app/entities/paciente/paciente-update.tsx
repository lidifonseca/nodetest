import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './paciente.reducer';
import { IPaciente } from 'app/shared/model/paciente.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPacienteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPacienteUpdateState {
  isNew: boolean;
}

export class PacienteUpdate extends React.Component<IPacienteUpdateProps, IPacienteUpdateState> {
  constructor(props: Readonly<IPacienteUpdateProps>) {
    super(props);
    this.state = {
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
  }

  saveEntity = (event: any, errors: any, values: any) => {
    values.dataPost = convertDateTimeToServer(values.dataPost);

    if (errors.length === 0) {
      const { pacienteEntity } = this.props;
      const entity = {
        ...pacienteEntity,
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
    this.props.history.push('/paciente');
  };

  render() {
    const { pacienteEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pacientes</li>
          <li className="breadcrumb-item active">Pacientes edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...pacienteEntity
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
                <Button tag={Link} id="cancel-save" to="/paciente" replace color="info" className="float-right jh-create-entity">
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

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="idUnidadeLabel" for="paciente-idUnidade">
                                <Translate contentKey="generadorApp.paciente.idUnidade">Id Unidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-idUnidade"
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
                              <Label className="mt-2" id="idFranquiaLabel" for="paciente-idFranquia">
                                <Translate contentKey="generadorApp.paciente.idFranquia">Id Franquia</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="paciente-idFranquia" type="text" name="idFranquia" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="idCidadeLabel" for="paciente-idCidade">
                                <Translate contentKey="generadorApp.paciente.idCidade">Id Cidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="paciente-idCidade" type="text" name="idCidade" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="idCidadeFamiliarLabel" for="paciente-idCidadeFamiliar">
                                <Translate contentKey="generadorApp.paciente.idCidadeFamiliar">Id Cidade Familiar</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="paciente-idCidadeFamiliar" type="text" name="idCidadeFamiliar" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="idGrauParentescoLabel" for="paciente-idGrauParentesco">
                                <Translate contentKey="generadorApp.paciente.idGrauParentesco">Id Grau Parentesco</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-idGrauParentesco"
                                type="string"
                                className="form-control"
                                name="idGrauParentesco"
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
                              <Label className="mt-2" id="senhaLabel" for="paciente-senha">
                                <Translate contentKey="generadorApp.paciente.senha">Senha</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-senha"
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
                              <Label className="mt-2" id="nomeLabel" for="paciente-nome">
                                <Translate contentKey="generadorApp.paciente.nome">Nome</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-nome"
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
                              <Label className="mt-2" id="emailLabel" for="paciente-email">
                                <Translate contentKey="generadorApp.paciente.email">Email</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-email"
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
                              <Label className="mt-2" id="cpfLabel" for="paciente-cpf">
                                <Translate contentKey="generadorApp.paciente.cpf">Cpf</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-cpf"
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
                              <Label className="mt-2" id="rgLabel" for="paciente-rg">
                                <Translate contentKey="generadorApp.paciente.rg">Rg</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-rg"
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
                              <Label className="mt-2" id="registroLabel" for="paciente-registro">
                                <Translate contentKey="generadorApp.paciente.registro">Registro</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-registro"
                                type="text"
                                name="registro"
                                validate={{
                                  maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) }
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
                              <Label className="mt-2" id="nascimentoLabel" for="paciente-nascimento">
                                <Translate contentKey="generadorApp.paciente.nascimento">Nascimento</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="paciente-nascimento" type="date" className="form-control" name="nascimento" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="sexoLabel" for="paciente-sexo">
                                <Translate contentKey="generadorApp.paciente.sexo">Sexo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="paciente-sexo" type="string" className="form-control" name="sexo" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="telefoneLabel" for="paciente-telefone">
                                <Translate contentKey="generadorApp.paciente.telefone">Telefone</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-telefone"
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
                              <Label className="mt-2" id="telefone2Label" for="paciente-telefone2">
                                <Translate contentKey="generadorApp.paciente.telefone2">Telefone 2</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-telefone2"
                                type="text"
                                name="telefone2"
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
                              <Label className="mt-2" id="celularLabel" for="paciente-celular">
                                <Translate contentKey="generadorApp.paciente.celular">Celular</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-celular"
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
                              <Label className="mt-2" id="celular1Label" for="paciente-celular1">
                                <Translate contentKey="generadorApp.paciente.celular1">Celular 1</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-celular1"
                                type="text"
                                name="celular1"
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
                              <Label className="mt-2" id="cepLabel" for="paciente-cep">
                                <Translate contentKey="generadorApp.paciente.cep">Cep</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-cep"
                                type="text"
                                name="cep"
                                validate={{
                                  maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
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
                              <Label className="mt-2" id="enderecoLabel" for="paciente-endereco">
                                <Translate contentKey="generadorApp.paciente.endereco">Endereco</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-endereco"
                                type="text"
                                name="endereco"
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
                              <Label className="mt-2" id="numeroLabel" for="paciente-numero">
                                <Translate contentKey="generadorApp.paciente.numero">Numero</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-numero"
                                type="text"
                                name="numero"
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
                              <Label className="mt-2" id="complementoLabel" for="paciente-complemento">
                                <Translate contentKey="generadorApp.paciente.complemento">Complemento</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-complemento"
                                type="text"
                                name="complemento"
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
                              <Label className="mt-2" id="bairroLabel" for="paciente-bairro">
                                <Translate contentKey="generadorApp.paciente.bairro">Bairro</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-bairro"
                                type="text"
                                name="bairro"
                                validate={{
                                  maxLength: { value: 40, errorMessage: translate('entity.validation.maxlength', { max: 40 }) }
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
                              <Label className="mt-2" id="cidadeLabel" for="paciente-cidade">
                                <Translate contentKey="generadorApp.paciente.cidade">Cidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-cidade"
                                type="text"
                                name="cidade"
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
                              <Label className="mt-2" id="ufLabel" for="paciente-uf">
                                <Translate contentKey="generadorApp.paciente.uf">Uf</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-uf"
                                type="text"
                                name="uf"
                                validate={{
                                  maxLength: { value: 5, errorMessage: translate('entity.validation.maxlength', { max: 5 }) }
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
                              <Label className="mt-2" id="latitudeLabel" for="paciente-latitude">
                                <Translate contentKey="generadorApp.paciente.latitude">Latitude</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-latitude"
                                type="text"
                                name="latitude"
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
                              <Label className="mt-2" id="longitudeLabel" for="paciente-longitude">
                                <Translate contentKey="generadorApp.paciente.longitude">Longitude</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-longitude"
                                type="text"
                                name="longitude"
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
                              <Label className="mt-2" id="responsavelFamiliarLabel" for="paciente-responsavelFamiliar">
                                <Translate contentKey="generadorApp.paciente.responsavelFamiliar">Responsavel Familiar</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-responsavelFamiliar"
                                type="text"
                                name="responsavelFamiliar"
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
                              <Label className="mt-2" id="emailFamiliarLabel" for="paciente-emailFamiliar">
                                <Translate contentKey="generadorApp.paciente.emailFamiliar">Email Familiar</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-emailFamiliar"
                                type="text"
                                name="emailFamiliar"
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
                              <Label className="mt-2" id="cpfFamiliarLabel" for="paciente-cpfFamiliar">
                                <Translate contentKey="generadorApp.paciente.cpfFamiliar">Cpf Familiar</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-cpfFamiliar"
                                type="text"
                                name="cpfFamiliar"
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
                              <Label className="mt-2" id="rgFamiliarLabel" for="paciente-rgFamiliar">
                                <Translate contentKey="generadorApp.paciente.rgFamiliar">Rg Familiar</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-rgFamiliar"
                                type="text"
                                name="rgFamiliar"
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
                              <Label className="mt-2" id="nascimentoFamiliarLabel" for="paciente-nascimentoFamiliar">
                                <Translate contentKey="generadorApp.paciente.nascimentoFamiliar">Nascimento Familiar</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="paciente-nascimentoFamiliar" type="date" className="form-control" name="nascimentoFamiliar" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="sexoFamiliarLabel" for="paciente-sexoFamiliar">
                                <Translate contentKey="generadorApp.paciente.sexoFamiliar">Sexo Familiar</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="paciente-sexoFamiliar" type="string" className="form-control" name="sexoFamiliar" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="telefoneFamiliarLabel" for="paciente-telefoneFamiliar">
                                <Translate contentKey="generadorApp.paciente.telefoneFamiliar">Telefone Familiar</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-telefoneFamiliar"
                                type="text"
                                name="telefoneFamiliar"
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
                              <Label className="mt-2" id="telefone2FamiliarLabel" for="paciente-telefone2Familiar">
                                <Translate contentKey="generadorApp.paciente.telefone2Familiar">Telefone 2 Familiar</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-telefone2Familiar"
                                type="text"
                                name="telefone2Familiar"
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
                              <Label className="mt-2" id="celularFamiliarLabel" for="paciente-celularFamiliar">
                                <Translate contentKey="generadorApp.paciente.celularFamiliar">Celular Familiar</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-celularFamiliar"
                                type="text"
                                name="celularFamiliar"
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
                              <Label className="mt-2" id="celular2FamiliarLabel" for="paciente-celular2Familiar">
                                <Translate contentKey="generadorApp.paciente.celular2Familiar">Celular 2 Familiar</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-celular2Familiar"
                                type="text"
                                name="celular2Familiar"
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
                              <Label className="mt-2" id="cepFamiliarLabel" for="paciente-cepFamiliar">
                                <Translate contentKey="generadorApp.paciente.cepFamiliar">Cep Familiar</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-cepFamiliar"
                                type="text"
                                name="cepFamiliar"
                                validate={{
                                  maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
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
                              <Label className="mt-2" id="enderecoFamiliarLabel" for="paciente-enderecoFamiliar">
                                <Translate contentKey="generadorApp.paciente.enderecoFamiliar">Endereco Familiar</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-enderecoFamiliar"
                                type="text"
                                name="enderecoFamiliar"
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
                              <Label className="mt-2" id="numeroFamiliarLabel" for="paciente-numeroFamiliar">
                                <Translate contentKey="generadorApp.paciente.numeroFamiliar">Numero Familiar</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-numeroFamiliar"
                                type="text"
                                name="numeroFamiliar"
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
                              <Label className="mt-2" id="complementoFamiliarLabel" for="paciente-complementoFamiliar">
                                <Translate contentKey="generadorApp.paciente.complementoFamiliar">Complemento Familiar</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-complementoFamiliar"
                                type="text"
                                name="complementoFamiliar"
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
                              <Label className="mt-2" id="bairroFamiliarLabel" for="paciente-bairroFamiliar">
                                <Translate contentKey="generadorApp.paciente.bairroFamiliar">Bairro Familiar</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-bairroFamiliar"
                                type="text"
                                name="bairroFamiliar"
                                validate={{
                                  maxLength: { value: 40, errorMessage: translate('entity.validation.maxlength', { max: 40 }) }
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
                              <Label className="mt-2" id="cidadeFamiliarLabel" for="paciente-cidadeFamiliar">
                                <Translate contentKey="generadorApp.paciente.cidadeFamiliar">Cidade Familiar</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-cidadeFamiliar"
                                type="text"
                                name="cidadeFamiliar"
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
                              <Label className="mt-2" id="ufFamiliarLabel" for="paciente-ufFamiliar">
                                <Translate contentKey="generadorApp.paciente.ufFamiliar">Uf Familiar</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-ufFamiliar"
                                type="text"
                                name="ufFamiliar"
                                validate={{
                                  maxLength: { value: 5, errorMessage: translate('entity.validation.maxlength', { max: 5 }) }
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
                              <Label className="mt-2" id="latitudeFamiliarLabel" for="paciente-latitudeFamiliar">
                                <Translate contentKey="generadorApp.paciente.latitudeFamiliar">Latitude Familiar</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-latitudeFamiliar"
                                type="text"
                                name="latitudeFamiliar"
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
                              <Label className="mt-2" id="longitudeFamiliarLabel" for="paciente-longitudeFamiliar">
                                <Translate contentKey="generadorApp.paciente.longitudeFamiliar">Longitude Familiar</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-longitudeFamiliar"
                                type="text"
                                name="longitudeFamiliar"
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
                              <Label className="mt-2" id="observacaoLabel" for="paciente-observacao">
                                <Translate contentKey="generadorApp.paciente.observacao">Observacao</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-observacao"
                                type="text"
                                name="observacao"
                                validate={{
                                  maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
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
                              <Label className="mt-2" id="aphLabel" for="paciente-aph">
                                <Translate contentKey="generadorApp.paciente.aph">Aph</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-aph"
                                type="string"
                                className="form-control"
                                name="aph"
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
                              <Label className="mt-2" id="nivelComplexidadeLabel" for="paciente-nivelComplexidade">
                                <Translate contentKey="generadorApp.paciente.nivelComplexidade">Nivel Complexidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="paciente-nivelComplexidade" type="string" className="form-control" name="nivelComplexidade" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="passagemPsLabel" for="paciente-passagemPs">
                                <Translate contentKey="generadorApp.paciente.passagemPs">Passagem Ps</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="paciente-passagemPs" type="string" className="form-control" name="passagemPs" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="obsPsLabel" for="paciente-obsPs">
                                <Translate contentKey="generadorApp.paciente.obsPs">Obs Ps</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-obsPs"
                                type="text"
                                name="obsPs"
                                validate={{
                                  maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
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
                              <Label className="mt-2" id="passagemInternacaoLabel" for="paciente-passagemInternacao">
                                <Translate contentKey="generadorApp.paciente.passagemInternacao">Passagem Internacao</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="paciente-passagemInternacao" type="string" className="form-control" name="passagemInternacao" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="obsInternacaoLabel" for="paciente-obsInternacao">
                                <Translate contentKey="generadorApp.paciente.obsInternacao">Obs Internacao</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-obsInternacao"
                                type="text"
                                name="obsInternacao"
                                validate={{
                                  maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
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
                              <Label className="mt-2" id="custoTotalLabel" for="paciente-custoTotal">
                                <Translate contentKey="generadorApp.paciente.custoTotal">Custo Total</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="paciente-custoTotal" type="string" className="form-control" name="custoTotal" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="observacaoFamiliarLabel" for="paciente-observacaoFamiliar">
                                <Translate contentKey="generadorApp.paciente.observacaoFamiliar">Observacao Familiar</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-observacaoFamiliar"
                                type="text"
                                name="observacaoFamiliar"
                                validate={{
                                  maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
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
                              <Label className="mt-2" id="mesmoEnderecoLabel" for="paciente-mesmoEndereco">
                                <Translate contentKey="generadorApp.paciente.mesmoEndereco">Mesmo Endereco</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="paciente-mesmoEndereco" type="string" className="form-control" name="mesmoEndereco" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="acessoFamiliarLabel" for="paciente-acessoFamiliar">
                                <Translate contentKey="generadorApp.paciente.acessoFamiliar">Acesso Familiar</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="paciente-acessoFamiliar" type="string" className="form-control" name="acessoFamiliar" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="comResponsavelLabel" for="paciente-comResponsavel">
                                <Translate contentKey="generadorApp.paciente.comResponsavel">Com Responsavel</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="paciente-comResponsavel" type="string" className="form-control" name="comResponsavel" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cadastroCompletoLabel" for="paciente-cadastroCompleto">
                                <Translate contentKey="generadorApp.paciente.cadastroCompleto">Cadastro Completo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="paciente-cadastroCompleto" type="string" className="form-control" name="cadastroCompleto" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ativoLabel" for="paciente-ativo">
                                <Translate contentKey="generadorApp.paciente.ativo">Ativo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="paciente-ativo" type="string" className="form-control" name="ativo" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="dataPostLabel" for="paciente-dataPost">
                                <Translate contentKey="generadorApp.paciente.dataPost">Data Post</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="paciente-dataPost"
                                type="datetime-local"
                                className="form-control"
                                name="dataPost"
                                placeholder={'YYYY-MM-DD HH:mm'}
                                value={isNew ? null : convertDateTimeFromServer(this.props.pacienteEntity.dataPost)}
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
                              <Label className="mt-2" id="detalhesLabel" for="paciente-detalhes">
                                <Translate contentKey="generadorApp.paciente.detalhes">Detalhes</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-detalhes"
                                type="text"
                                name="detalhes"
                                validate={{
                                  maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
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
                              <Label className="mt-2" id="tipohospitalLabel" for="paciente-tipohospital">
                                <Translate contentKey="generadorApp.paciente.tipohospital">Tipohospital</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="paciente-tipohospital" type="string" className="form-control" name="tipohospital" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="liminarLabel" for="paciente-liminar">
                                <Translate contentKey="generadorApp.paciente.liminar">Liminar</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-liminar"
                                type="text"
                                name="liminar"
                                validate={{
                                  maxLength: { value: 50, errorMessage: translate('entity.validation.maxlength', { max: 50 }) }
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
                              <Label className="mt-2" id="expoTokenLabel" for="paciente-expoToken">
                                <Translate contentKey="generadorApp.paciente.expoToken">Expo Token</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-expoToken"
                                type="text"
                                name="expoToken"
                                validate={{
                                  maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
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
                              <Label className="mt-2" id="profissionalPrefLabel" for="paciente-profissionalPref">
                                <Translate contentKey="generadorApp.paciente.profissionalPref">Profissional Pref</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="paciente-profissionalPref" type="string" className="form-control" name="profissionalPref" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="senhaChatLabel" for="paciente-senhaChat">
                                <Translate contentKey="generadorApp.paciente.senhaChat">Senha Chat</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-senhaChat"
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
  pacienteEntity: storeState.paciente.entity,
  loading: storeState.paciente.loading,
  updating: storeState.paciente.updating,
  updateSuccess: storeState.paciente.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteUpdate);
