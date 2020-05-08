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
                        <IdOperadoraComponentUpdate baseFilters />

                        <SenhaComponentUpdate baseFilters />

                        <NomeComponentUpdate baseFilters />

                        <EmailComponentUpdate baseFilters />

                        <TelefoneComponentUpdate baseFilters />

                        <CelularComponentUpdate baseFilters />

                        <CpfComponentUpdate baseFilters />

                        <RgComponentUpdate baseFilters />

                        <SexoComponentUpdate baseFilters />

                        <NascimentoComponentUpdate baseFilters />

                        <VerAtendimentoComponentUpdate baseFilters />

                        <CadAtendimentoComponentUpdate baseFilters />

                        <EdiAtendimentoComponentUpdate baseFilters />

                        <BaixaManualAtendimentoComponentUpdate baseFilters />

                        <DelAtendimentoComponentUpdate baseFilters />

                        <RelAtendimentoComponentUpdate baseFilters />

                        <VerPadComponentUpdate baseFilters />

                        <CadPadComponentUpdate baseFilters />

                        <EdiPadComponentUpdate baseFilters />

                        <DelPadComponentUpdate baseFilters />

                        <RelPadComponentUpdate baseFilters />

                        <VerDiarioComponentUpdate baseFilters />

                        <CadDiarioComponentUpdate baseFilters />

                        <EdiDiarioComponentUpdate baseFilters />

                        <DelDiarioComponentUpdate baseFilters />

                        <RelDiarioComponentUpdate baseFilters />

                        <VerCategoriaComponentUpdate baseFilters />

                        <CadCategoriaComponentUpdate baseFilters />

                        <EdiCategoriaComponentUpdate baseFilters />

                        <DelCategoriaComponentUpdate baseFilters />

                        <VerEspecialidadeComponentUpdate baseFilters />

                        <CadEspecialidadeComponentUpdate baseFilters />

                        <EdiEspecialidadeComponentUpdate baseFilters />

                        <DelEspecialidadeComponentUpdate baseFilters />

                        <RelEspecialidadeComponentUpdate baseFilters />

                        <VerEspecialidadeValorComponentUpdate baseFilters />

                        <CadEspecialidadeValorComponentUpdate baseFilters />

                        <EdiEspecialidadeValorComponentUpdate baseFilters />

                        <DelEspecialidadeValorComponentUpdate baseFilters />

                        <RelEspecialidadeValorComponentUpdate baseFilters />

                        <VerOperadoraComponentUpdate baseFilters />

                        <CadOperadoraComponentUpdate baseFilters />

                        <EdiOperadoraComponentUpdate baseFilters />

                        <DelOperadoraComponentUpdate baseFilters />

                        <VerPacienteComponentUpdate baseFilters />

                        <CadPacienteComponentUpdate baseFilters />

                        <EdiPacienteComponentUpdate baseFilters />

                        <DelPacienteComponentUpdate baseFilters />

                        <RelPacienteComponentUpdate baseFilters />

                        <VerProfissionalComponentUpdate baseFilters />

                        <CadProfissionalComponentUpdate baseFilters />

                        <EdiProfissionalComponentUpdate baseFilters />

                        <DelProfissionalComponentUpdate baseFilters />

                        <AtivProfissionalComponentUpdate baseFilters />

                        <RelProfissionalComponentUpdate baseFilters />

                        <VerPushComponentUpdate baseFilters />

                        <CadPushPacienteComponentUpdate baseFilters />

                        <CadPushProfissionalComponentUpdate baseFilters />

                        <VerTermoPacienteComponentUpdate baseFilters />

                        <EdiTermoPacienteComponentUpdate baseFilters />

                        <VerTermoProfissionalComponentUpdate baseFilters />

                        <EdiTermoProfissionalComponentUpdate baseFilters />

                        <VerOutrosComponentUpdate baseFilters />

                        <CadOutrosComponentUpdate baseFilters />

                        <EdiOutrosComponentUpdate baseFilters />

                        <DelOutrosComponentUpdate baseFilters />

                        <RelOutrosComponentUpdate baseFilters />

                        <VerUnidadeEasyComponentUpdate baseFilters />

                        <CadUnidadeEasyComponentUpdate baseFilters />

                        <EdiUnidadeEasyComponentUpdate baseFilters />

                        <DelUnidadeEasyComponentUpdate baseFilters />

                        <VerUsuarioComponentUpdate baseFilters />

                        <CadUsuarioComponentUpdate baseFilters />

                        <EdiUsuarioComponentUpdate baseFilters />

                        <DelUsuarioComponentUpdate baseFilters />

                        <VerPtaResultadoComponentUpdate baseFilters />

                        <CadPtaResultadoComponentUpdate baseFilters />

                        <DelPtaResultadoComponentUpdate baseFilters />

                        <VerPtaAtividadeComponentUpdate baseFilters />

                        <CadPtaAtividadeComponentUpdate baseFilters />

                        <DelPtaAtividadeComponentUpdate baseFilters />

                        <PermissaoUsuarioComponentUpdate baseFilters />

                        <VerProntuarioComponentUpdate baseFilters />

                        <CadProntuarioComponentUpdate baseFilters />

                        <EdiProntuarioComponentUpdate baseFilters />

                        <DelProntuarioComponentUpdate baseFilters />

                        <DelProntuarioFotoComponentUpdate baseFilters />

                        <ValoresFinanceiroComponentUpdate baseFilters />

                        <AutorizacaoValorFinanceiroComponentUpdate baseFilters />

                        <ConfirmarPagamentoFinanceiroComponentUpdate baseFilters />

                        <GerenciarSorteiosComponentUpdate baseFilters />

                        <EnvioRecusaComponentUpdate baseFilters />

                        <EnvioIntercorrenciaComponentUpdate baseFilters />

                        <EnvioCancelamentoComponentUpdate baseFilters />

                        <EnvioAvaliacaoComponentUpdate baseFilters />

                        <EnvioPedidoComponentUpdate baseFilters />

                        <AlertaAtendimentoComponentUpdate baseFilters />

                        <AtivoComponentUpdate baseFilters />

                        <EnvioGlosadoComponentUpdate baseFilters />

                        <EmergenciaComponentUpdate baseFilters />

                        <TokenComponentUpdate baseFilters />

                        <EditAtendimentoComponentUpdate baseFilters />

                        <OuvirLigacaoComponentUpdate baseFilters />

                        <VerPainelIndicadoresComponentUpdate baseFilters />

                        <ProrrogarPadComponentUpdate baseFilters />

                        <CancelarAtendMassaComponentUpdate baseFilters />

                        <CadMatMedComponentUpdate baseFilters />

                        <EdiMatMedComponentUpdate baseFilters />

                        <DelMatMedComponentUpdate baseFilters />

                        <VerColPtaComponentUpdate baseFilters />

                        <VerColFotoComponentUpdate baseFilters />

                        <VerColLcComponentUpdate baseFilters />

                        <VerAtendCanceladoComponentUpdate baseFilters />

                        <VerAtendAgConfirmacaoComponentUpdate baseFilters />

                        <EdiGeoLocalizacaoAtendimentoComponentUpdate baseFilters />

                        <CopiarEvolucaoComponentUpdate baseFilters />

                        <CopiarNomeProfComponentUpdate baseFilters />

                        <CopiarRegistroProfComponentUpdate baseFilters />

                        <IdAreaAtuacaoComponentUpdate baseFilters />

                        <DiarioComponentUpdate baseFilter diarios />

                        <PacienteDiarioComponentUpdate baseFilter pacienteDiarios />

                        <UnidadeComponentUpdate baseFilter unidadeEasies />

                        <TipoUsuarioComponentUpdate baseFilter tipoUsuarios />
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

const IdOperadoraComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'idOperadora' ? (
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
  );
};

const SenhaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'senha' ? (
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
  );
};

const NomeComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'nome' ? (
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
  );
};

const EmailComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'email' ? (
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
  );
};

const TelefoneComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'telefone' ? (
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
  );
};

const CelularComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'celular' ? (
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
  );
};

const CpfComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cpf' ? (
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
  );
};

const RgComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'rg' ? (
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
  );
};

const SexoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'sexo' ? (
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
  );
};

const NascimentoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'nascimento' ? (
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
  );
};

const VerAtendimentoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'verAtendimento' ? (
    <Col md="verAtendimento">
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
  ) : (
    <AvInput type="hidden" name="verAtendimento" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CadAtendimentoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cadAtendimento' ? (
    <Col md="cadAtendimento">
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
  ) : (
    <AvInput type="hidden" name="cadAtendimento" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EdiAtendimentoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ediAtendimento' ? (
    <Col md="ediAtendimento">
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
  ) : (
    <AvInput type="hidden" name="ediAtendimento" value={this.state.fieldsBase[baseFilters]} />
  );
};

const BaixaManualAtendimentoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'baixaManualAtendimento' ? (
    <Col md="baixaManualAtendimento">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="baixaManualAtendimentoLabel" for="usuario-baixaManualAtendimento">
              <Translate contentKey="generadorApp.usuario.baixaManualAtendimento">Baixa Manual Atendimento</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="usuario-baixaManualAtendimento" type="string" className="form-control" name="baixaManualAtendimento" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="baixaManualAtendimento" value={this.state.fieldsBase[baseFilters]} />
  );
};

const DelAtendimentoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'delAtendimento' ? (
    <Col md="delAtendimento">
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
  ) : (
    <AvInput type="hidden" name="delAtendimento" value={this.state.fieldsBase[baseFilters]} />
  );
};

const RelAtendimentoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'relAtendimento' ? (
    <Col md="relAtendimento">
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
  ) : (
    <AvInput type="hidden" name="relAtendimento" value={this.state.fieldsBase[baseFilters]} />
  );
};

const VerPadComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'verPad' ? (
    <Col md="verPad">
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
  ) : (
    <AvInput type="hidden" name="verPad" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CadPadComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cadPad' ? (
    <Col md="cadPad">
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
  ) : (
    <AvInput type="hidden" name="cadPad" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EdiPadComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ediPad' ? (
    <Col md="ediPad">
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
  ) : (
    <AvInput type="hidden" name="ediPad" value={this.state.fieldsBase[baseFilters]} />
  );
};

const DelPadComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'delPad' ? (
    <Col md="delPad">
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
  ) : (
    <AvInput type="hidden" name="delPad" value={this.state.fieldsBase[baseFilters]} />
  );
};

const RelPadComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'relPad' ? (
    <Col md="relPad">
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
  ) : (
    <AvInput type="hidden" name="relPad" value={this.state.fieldsBase[baseFilters]} />
  );
};

const VerDiarioComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'verDiario' ? (
    <Col md="verDiario">
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
  ) : (
    <AvInput type="hidden" name="verDiario" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CadDiarioComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cadDiario' ? (
    <Col md="cadDiario">
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
  ) : (
    <AvInput type="hidden" name="cadDiario" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EdiDiarioComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ediDiario' ? (
    <Col md="ediDiario">
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
  ) : (
    <AvInput type="hidden" name="ediDiario" value={this.state.fieldsBase[baseFilters]} />
  );
};

const DelDiarioComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'delDiario' ? (
    <Col md="delDiario">
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
  ) : (
    <AvInput type="hidden" name="delDiario" value={this.state.fieldsBase[baseFilters]} />
  );
};

const RelDiarioComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'relDiario' ? (
    <Col md="relDiario">
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
  ) : (
    <AvInput type="hidden" name="relDiario" value={this.state.fieldsBase[baseFilters]} />
  );
};

const VerCategoriaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'verCategoria' ? (
    <Col md="verCategoria">
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
  ) : (
    <AvInput type="hidden" name="verCategoria" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CadCategoriaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cadCategoria' ? (
    <Col md="cadCategoria">
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
  ) : (
    <AvInput type="hidden" name="cadCategoria" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EdiCategoriaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ediCategoria' ? (
    <Col md="ediCategoria">
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
  ) : (
    <AvInput type="hidden" name="ediCategoria" value={this.state.fieldsBase[baseFilters]} />
  );
};

const DelCategoriaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'delCategoria' ? (
    <Col md="delCategoria">
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
  ) : (
    <AvInput type="hidden" name="delCategoria" value={this.state.fieldsBase[baseFilters]} />
  );
};

const VerEspecialidadeComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'verEspecialidade' ? (
    <Col md="verEspecialidade">
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
  ) : (
    <AvInput type="hidden" name="verEspecialidade" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CadEspecialidadeComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cadEspecialidade' ? (
    <Col md="cadEspecialidade">
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
  ) : (
    <AvInput type="hidden" name="cadEspecialidade" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EdiEspecialidadeComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ediEspecialidade' ? (
    <Col md="ediEspecialidade">
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
  ) : (
    <AvInput type="hidden" name="ediEspecialidade" value={this.state.fieldsBase[baseFilters]} />
  );
};

const DelEspecialidadeComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'delEspecialidade' ? (
    <Col md="delEspecialidade">
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
  ) : (
    <AvInput type="hidden" name="delEspecialidade" value={this.state.fieldsBase[baseFilters]} />
  );
};

const RelEspecialidadeComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'relEspecialidade' ? (
    <Col md="relEspecialidade">
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
  ) : (
    <AvInput type="hidden" name="relEspecialidade" value={this.state.fieldsBase[baseFilters]} />
  );
};

const VerEspecialidadeValorComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'verEspecialidadeValor' ? (
    <Col md="verEspecialidadeValor">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="verEspecialidadeValorLabel" for="usuario-verEspecialidadeValor">
              <Translate contentKey="generadorApp.usuario.verEspecialidadeValor">Ver Especialidade Valor</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="usuario-verEspecialidadeValor" type="string" className="form-control" name="verEspecialidadeValor" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="verEspecialidadeValor" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CadEspecialidadeValorComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cadEspecialidadeValor' ? (
    <Col md="cadEspecialidadeValor">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="cadEspecialidadeValorLabel" for="usuario-cadEspecialidadeValor">
              <Translate contentKey="generadorApp.usuario.cadEspecialidadeValor">Cad Especialidade Valor</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="usuario-cadEspecialidadeValor" type="string" className="form-control" name="cadEspecialidadeValor" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="cadEspecialidadeValor" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EdiEspecialidadeValorComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ediEspecialidadeValor' ? (
    <Col md="ediEspecialidadeValor">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="ediEspecialidadeValorLabel" for="usuario-ediEspecialidadeValor">
              <Translate contentKey="generadorApp.usuario.ediEspecialidadeValor">Edi Especialidade Valor</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="usuario-ediEspecialidadeValor" type="string" className="form-control" name="ediEspecialidadeValor" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="ediEspecialidadeValor" value={this.state.fieldsBase[baseFilters]} />
  );
};

const DelEspecialidadeValorComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'delEspecialidadeValor' ? (
    <Col md="delEspecialidadeValor">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="delEspecialidadeValorLabel" for="usuario-delEspecialidadeValor">
              <Translate contentKey="generadorApp.usuario.delEspecialidadeValor">Del Especialidade Valor</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="usuario-delEspecialidadeValor" type="string" className="form-control" name="delEspecialidadeValor" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="delEspecialidadeValor" value={this.state.fieldsBase[baseFilters]} />
  );
};

const RelEspecialidadeValorComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'relEspecialidadeValor' ? (
    <Col md="relEspecialidadeValor">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="relEspecialidadeValorLabel" for="usuario-relEspecialidadeValor">
              <Translate contentKey="generadorApp.usuario.relEspecialidadeValor">Rel Especialidade Valor</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="usuario-relEspecialidadeValor" type="string" className="form-control" name="relEspecialidadeValor" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="relEspecialidadeValor" value={this.state.fieldsBase[baseFilters]} />
  );
};

const VerOperadoraComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'verOperadora' ? (
    <Col md="verOperadora">
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
  ) : (
    <AvInput type="hidden" name="verOperadora" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CadOperadoraComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cadOperadora' ? (
    <Col md="cadOperadora">
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
  ) : (
    <AvInput type="hidden" name="cadOperadora" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EdiOperadoraComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ediOperadora' ? (
    <Col md="ediOperadora">
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
  ) : (
    <AvInput type="hidden" name="ediOperadora" value={this.state.fieldsBase[baseFilters]} />
  );
};

const DelOperadoraComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'delOperadora' ? (
    <Col md="delOperadora">
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
  ) : (
    <AvInput type="hidden" name="delOperadora" value={this.state.fieldsBase[baseFilters]} />
  );
};

const VerPacienteComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'verPaciente' ? (
    <Col md="verPaciente">
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
  ) : (
    <AvInput type="hidden" name="verPaciente" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CadPacienteComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cadPaciente' ? (
    <Col md="cadPaciente">
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
  ) : (
    <AvInput type="hidden" name="cadPaciente" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EdiPacienteComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ediPaciente' ? (
    <Col md="ediPaciente">
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
  ) : (
    <AvInput type="hidden" name="ediPaciente" value={this.state.fieldsBase[baseFilters]} />
  );
};

const DelPacienteComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'delPaciente' ? (
    <Col md="delPaciente">
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
  ) : (
    <AvInput type="hidden" name="delPaciente" value={this.state.fieldsBase[baseFilters]} />
  );
};

const RelPacienteComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'relPaciente' ? (
    <Col md="relPaciente">
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
  ) : (
    <AvInput type="hidden" name="relPaciente" value={this.state.fieldsBase[baseFilters]} />
  );
};

const VerProfissionalComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'verProfissional' ? (
    <Col md="verProfissional">
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
  ) : (
    <AvInput type="hidden" name="verProfissional" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CadProfissionalComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cadProfissional' ? (
    <Col md="cadProfissional">
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
  ) : (
    <AvInput type="hidden" name="cadProfissional" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EdiProfissionalComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ediProfissional' ? (
    <Col md="ediProfissional">
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
  ) : (
    <AvInput type="hidden" name="ediProfissional" value={this.state.fieldsBase[baseFilters]} />
  );
};

const DelProfissionalComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'delProfissional' ? (
    <Col md="delProfissional">
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
  ) : (
    <AvInput type="hidden" name="delProfissional" value={this.state.fieldsBase[baseFilters]} />
  );
};

const AtivProfissionalComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ativProfissional' ? (
    <Col md="ativProfissional">
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
  ) : (
    <AvInput type="hidden" name="ativProfissional" value={this.state.fieldsBase[baseFilters]} />
  );
};

const RelProfissionalComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'relProfissional' ? (
    <Col md="relProfissional">
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
  ) : (
    <AvInput type="hidden" name="relProfissional" value={this.state.fieldsBase[baseFilters]} />
  );
};

const VerPushComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'verPush' ? (
    <Col md="verPush">
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
  ) : (
    <AvInput type="hidden" name="verPush" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CadPushPacienteComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cadPushPaciente' ? (
    <Col md="cadPushPaciente">
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
  ) : (
    <AvInput type="hidden" name="cadPushPaciente" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CadPushProfissionalComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cadPushProfissional' ? (
    <Col md="cadPushProfissional">
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
  ) : (
    <AvInput type="hidden" name="cadPushProfissional" value={this.state.fieldsBase[baseFilters]} />
  );
};

const VerTermoPacienteComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'verTermoPaciente' ? (
    <Col md="verTermoPaciente">
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
  ) : (
    <AvInput type="hidden" name="verTermoPaciente" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EdiTermoPacienteComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ediTermoPaciente' ? (
    <Col md="ediTermoPaciente">
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
  ) : (
    <AvInput type="hidden" name="ediTermoPaciente" value={this.state.fieldsBase[baseFilters]} />
  );
};

const VerTermoProfissionalComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'verTermoProfissional' ? (
    <Col md="verTermoProfissional">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="verTermoProfissionalLabel" for="usuario-verTermoProfissional">
              <Translate contentKey="generadorApp.usuario.verTermoProfissional">Ver Termo Profissional</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="usuario-verTermoProfissional" type="string" className="form-control" name="verTermoProfissional" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="verTermoProfissional" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EdiTermoProfissionalComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ediTermoProfissional' ? (
    <Col md="ediTermoProfissional">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="ediTermoProfissionalLabel" for="usuario-ediTermoProfissional">
              <Translate contentKey="generadorApp.usuario.ediTermoProfissional">Edi Termo Profissional</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="usuario-ediTermoProfissional" type="string" className="form-control" name="ediTermoProfissional" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="ediTermoProfissional" value={this.state.fieldsBase[baseFilters]} />
  );
};

const VerOutrosComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'verOutros' ? (
    <Col md="verOutros">
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
  ) : (
    <AvInput type="hidden" name="verOutros" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CadOutrosComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cadOutros' ? (
    <Col md="cadOutros">
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
  ) : (
    <AvInput type="hidden" name="cadOutros" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EdiOutrosComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ediOutros' ? (
    <Col md="ediOutros">
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
  ) : (
    <AvInput type="hidden" name="ediOutros" value={this.state.fieldsBase[baseFilters]} />
  );
};

const DelOutrosComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'delOutros' ? (
    <Col md="delOutros">
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
  ) : (
    <AvInput type="hidden" name="delOutros" value={this.state.fieldsBase[baseFilters]} />
  );
};

const RelOutrosComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'relOutros' ? (
    <Col md="relOutros">
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
  ) : (
    <AvInput type="hidden" name="relOutros" value={this.state.fieldsBase[baseFilters]} />
  );
};

const VerUnidadeEasyComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'verUnidadeEasy' ? (
    <Col md="verUnidadeEasy">
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
  ) : (
    <AvInput type="hidden" name="verUnidadeEasy" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CadUnidadeEasyComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cadUnidadeEasy' ? (
    <Col md="cadUnidadeEasy">
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
  ) : (
    <AvInput type="hidden" name="cadUnidadeEasy" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EdiUnidadeEasyComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ediUnidadeEasy' ? (
    <Col md="ediUnidadeEasy">
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
  ) : (
    <AvInput type="hidden" name="ediUnidadeEasy" value={this.state.fieldsBase[baseFilters]} />
  );
};

const DelUnidadeEasyComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'delUnidadeEasy' ? (
    <Col md="delUnidadeEasy">
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
  ) : (
    <AvInput type="hidden" name="delUnidadeEasy" value={this.state.fieldsBase[baseFilters]} />
  );
};

const VerUsuarioComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'verUsuario' ? (
    <Col md="verUsuario">
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
  ) : (
    <AvInput type="hidden" name="verUsuario" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CadUsuarioComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cadUsuario' ? (
    <Col md="cadUsuario">
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
  ) : (
    <AvInput type="hidden" name="cadUsuario" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EdiUsuarioComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ediUsuario' ? (
    <Col md="ediUsuario">
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
  ) : (
    <AvInput type="hidden" name="ediUsuario" value={this.state.fieldsBase[baseFilters]} />
  );
};

const DelUsuarioComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'delUsuario' ? (
    <Col md="delUsuario">
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
  ) : (
    <AvInput type="hidden" name="delUsuario" value={this.state.fieldsBase[baseFilters]} />
  );
};

const VerPtaResultadoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'verPtaResultado' ? (
    <Col md="verPtaResultado">
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
  ) : (
    <AvInput type="hidden" name="verPtaResultado" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CadPtaResultadoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cadPtaResultado' ? (
    <Col md="cadPtaResultado">
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
  ) : (
    <AvInput type="hidden" name="cadPtaResultado" value={this.state.fieldsBase[baseFilters]} />
  );
};

const DelPtaResultadoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'delPtaResultado' ? (
    <Col md="delPtaResultado">
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
  ) : (
    <AvInput type="hidden" name="delPtaResultado" value={this.state.fieldsBase[baseFilters]} />
  );
};

const VerPtaAtividadeComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'verPtaAtividade' ? (
    <Col md="verPtaAtividade">
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
  ) : (
    <AvInput type="hidden" name="verPtaAtividade" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CadPtaAtividadeComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cadPtaAtividade' ? (
    <Col md="cadPtaAtividade">
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
  ) : (
    <AvInput type="hidden" name="cadPtaAtividade" value={this.state.fieldsBase[baseFilters]} />
  );
};

const DelPtaAtividadeComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'delPtaAtividade' ? (
    <Col md="delPtaAtividade">
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
  ) : (
    <AvInput type="hidden" name="delPtaAtividade" value={this.state.fieldsBase[baseFilters]} />
  );
};

const PermissaoUsuarioComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'permissaoUsuario' ? (
    <Col md="permissaoUsuario">
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
  ) : (
    <AvInput type="hidden" name="permissaoUsuario" value={this.state.fieldsBase[baseFilters]} />
  );
};

const VerProntuarioComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'verProntuario' ? (
    <Col md="verProntuario">
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
  ) : (
    <AvInput type="hidden" name="verProntuario" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CadProntuarioComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cadProntuario' ? (
    <Col md="cadProntuario">
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
  ) : (
    <AvInput type="hidden" name="cadProntuario" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EdiProntuarioComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ediProntuario' ? (
    <Col md="ediProntuario">
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
  ) : (
    <AvInput type="hidden" name="ediProntuario" value={this.state.fieldsBase[baseFilters]} />
  );
};

const DelProntuarioComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'delProntuario' ? (
    <Col md="delProntuario">
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
  ) : (
    <AvInput type="hidden" name="delProntuario" value={this.state.fieldsBase[baseFilters]} />
  );
};

const DelProntuarioFotoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'delProntuarioFoto' ? (
    <Col md="delProntuarioFoto">
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
  ) : (
    <AvInput type="hidden" name="delProntuarioFoto" value={this.state.fieldsBase[baseFilters]} />
  );
};

const ValoresFinanceiroComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'valoresFinanceiro' ? (
    <Col md="valoresFinanceiro">
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
  ) : (
    <AvInput type="hidden" name="valoresFinanceiro" value={this.state.fieldsBase[baseFilters]} />
  );
};

const AutorizacaoValorFinanceiroComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'autorizacaoValorFinanceiro' ? (
    <Col md="autorizacaoValorFinanceiro">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="autorizacaoValorFinanceiroLabel" for="usuario-autorizacaoValorFinanceiro">
              <Translate contentKey="generadorApp.usuario.autorizacaoValorFinanceiro">Autorizacao Valor Financeiro</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="usuario-autorizacaoValorFinanceiro" type="string" className="form-control" name="autorizacaoValorFinanceiro" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="autorizacaoValorFinanceiro" value={this.state.fieldsBase[baseFilters]} />
  );
};

const ConfirmarPagamentoFinanceiroComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'confirmarPagamentoFinanceiro' ? (
    <Col md="confirmarPagamentoFinanceiro">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="confirmarPagamentoFinanceiroLabel" for="usuario-confirmarPagamentoFinanceiro">
              <Translate contentKey="generadorApp.usuario.confirmarPagamentoFinanceiro">Confirmar Pagamento Financeiro</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="usuario-confirmarPagamentoFinanceiro" type="string" className="form-control" name="confirmarPagamentoFinanceiro" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="confirmarPagamentoFinanceiro" value={this.state.fieldsBase[baseFilters]} />
  );
};

const GerenciarSorteiosComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'gerenciarSorteios' ? (
    <Col md="gerenciarSorteios">
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
  ) : (
    <AvInput type="hidden" name="gerenciarSorteios" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EnvioRecusaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'envioRecusa' ? (
    <Col md="envioRecusa">
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
  ) : (
    <AvInput type="hidden" name="envioRecusa" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EnvioIntercorrenciaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'envioIntercorrencia' ? (
    <Col md="envioIntercorrencia">
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
  ) : (
    <AvInput type="hidden" name="envioIntercorrencia" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EnvioCancelamentoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'envioCancelamento' ? (
    <Col md="envioCancelamento">
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
  ) : (
    <AvInput type="hidden" name="envioCancelamento" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EnvioAvaliacaoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'envioAvaliacao' ? (
    <Col md="envioAvaliacao">
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
  ) : (
    <AvInput type="hidden" name="envioAvaliacao" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EnvioPedidoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'envioPedido' ? (
    <Col md="envioPedido">
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
  ) : (
    <AvInput type="hidden" name="envioPedido" value={this.state.fieldsBase[baseFilters]} />
  );
};

const AlertaAtendimentoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'alertaAtendimento' ? (
    <Col md="alertaAtendimento">
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
  ) : (
    <AvInput type="hidden" name="alertaAtendimento" value={this.state.fieldsBase[baseFilters]} />
  );
};

const AtivoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ativo' ? (
    <Col md="ativo">
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
  ) : (
    <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EnvioGlosadoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'envioGlosado' ? (
    <Col md="envioGlosado">
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
  ) : (
    <AvInput type="hidden" name="envioGlosado" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EmergenciaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'emergencia' ? (
    <Col md="emergencia">
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
  ) : (
    <AvInput type="hidden" name="emergencia" value={this.state.fieldsBase[baseFilters]} />
  );
};

const TokenComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'token' ? (
    <Col md="token">
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
  ) : (
    <AvInput type="hidden" name="token" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EditAtendimentoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'editAtendimento' ? (
    <Col md="editAtendimento">
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
  ) : (
    <AvInput type="hidden" name="editAtendimento" value={this.state.fieldsBase[baseFilters]} />
  );
};

const OuvirLigacaoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ouvirLigacao' ? (
    <Col md="ouvirLigacao">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="ouvirLigacaoLabel" for="usuario-ouvirLigacao">
              <Translate contentKey="generadorApp.usuario.ouvirLigacao">Ouvir Ligacao</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="usuario-ouvirLigacao" type="string" className="form-control" name="ouvirLigacao" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="ouvirLigacao" value={this.state.fieldsBase[baseFilters]} />
  );
};

const VerPainelIndicadoresComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'verPainelIndicadores' ? (
    <Col md="verPainelIndicadores">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="verPainelIndicadoresLabel" for="usuario-verPainelIndicadores">
              <Translate contentKey="generadorApp.usuario.verPainelIndicadores">Ver Painel Indicadores</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="usuario-verPainelIndicadores" type="string" className="form-control" name="verPainelIndicadores" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="verPainelIndicadores" value={this.state.fieldsBase[baseFilters]} />
  );
};

const ProrrogarPadComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'prorrogarPad' ? (
    <Col md="prorrogarPad">
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
  ) : (
    <AvInput type="hidden" name="prorrogarPad" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CancelarAtendMassaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cancelarAtendMassa' ? (
    <Col md="cancelarAtendMassa">
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
  ) : (
    <AvInput type="hidden" name="cancelarAtendMassa" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CadMatMedComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cadMatMed' ? (
    <Col md="cadMatMed">
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
  ) : (
    <AvInput type="hidden" name="cadMatMed" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EdiMatMedComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ediMatMed' ? (
    <Col md="ediMatMed">
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
  ) : (
    <AvInput type="hidden" name="ediMatMed" value={this.state.fieldsBase[baseFilters]} />
  );
};

const DelMatMedComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'delMatMed' ? (
    <Col md="delMatMed">
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
  ) : (
    <AvInput type="hidden" name="delMatMed" value={this.state.fieldsBase[baseFilters]} />
  );
};

const VerColPtaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'verColPta' ? (
    <Col md="verColPta">
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
  ) : (
    <AvInput type="hidden" name="verColPta" value={this.state.fieldsBase[baseFilters]} />
  );
};

const VerColFotoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'verColFoto' ? (
    <Col md="verColFoto">
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
  ) : (
    <AvInput type="hidden" name="verColFoto" value={this.state.fieldsBase[baseFilters]} />
  );
};

const VerColLcComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'verColLc' ? (
    <Col md="verColLc">
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
  ) : (
    <AvInput type="hidden" name="verColLc" value={this.state.fieldsBase[baseFilters]} />
  );
};

const VerAtendCanceladoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'verAtendCancelado' ? (
    <Col md="verAtendCancelado">
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
  ) : (
    <AvInput type="hidden" name="verAtendCancelado" value={this.state.fieldsBase[baseFilters]} />
  );
};

const VerAtendAgConfirmacaoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'verAtendAgConfirmacao' ? (
    <Col md="verAtendAgConfirmacao">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="verAtendAgConfirmacaoLabel" for="usuario-verAtendAgConfirmacao">
              <Translate contentKey="generadorApp.usuario.verAtendAgConfirmacao">Ver Atend Ag Confirmacao</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="usuario-verAtendAgConfirmacao" type="string" className="form-control" name="verAtendAgConfirmacao" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="verAtendAgConfirmacao" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EdiGeoLocalizacaoAtendimentoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ediGeoLocalizacaoAtendimento' ? (
    <Col md="ediGeoLocalizacaoAtendimento">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="ediGeoLocalizacaoAtendimentoLabel" for="usuario-ediGeoLocalizacaoAtendimento">
              <Translate contentKey="generadorApp.usuario.ediGeoLocalizacaoAtendimento">Edi Geo Localizacao Atendimento</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="usuario-ediGeoLocalizacaoAtendimento" type="string" className="form-control" name="ediGeoLocalizacaoAtendimento" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="ediGeoLocalizacaoAtendimento" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CopiarEvolucaoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'copiarEvolucao' ? (
    <Col md="copiarEvolucao">
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
  ) : (
    <AvInput type="hidden" name="copiarEvolucao" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CopiarNomeProfComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'copiarNomeProf' ? (
    <Col md="copiarNomeProf">
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
  ) : (
    <AvInput type="hidden" name="copiarNomeProf" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CopiarRegistroProfComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'copiarRegistroProf' ? (
    <Col md="copiarRegistroProf">
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
  ) : (
    <AvInput type="hidden" name="copiarRegistroProf" value={this.state.fieldsBase[baseFilters]} />
  );
};

const IdAreaAtuacaoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'idAreaAtuacao' ? (
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
  );
};

const DiarioComponentUpdate = ({ baseFilters, diarios }) => {
  return baseFilters !== 'diario' ? (
    <Col md="12"></Col>
  ) : (
    <AvInput type="hidden" name="diario" value={this.state.fieldsBase[baseFilters]} />
  );
};

const PacienteDiarioComponentUpdate = ({ baseFilters, pacienteDiarios }) => {
  return baseFilters !== 'pacienteDiario' ? (
    <Col md="12"></Col>
  ) : (
    <AvInput type="hidden" name="pacienteDiario" value={this.state.fieldsBase[baseFilters]} />
  );
};

const UnidadeComponentUpdate = ({ baseFilters, unidadeEasies }) => {
  return baseFilters !== 'unidade' ? (
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
              options={unidadeEasies ? unidadeEasies.map(option => ({ value: option.id, label: option.razaoSocial })) : null}
              onChange={options => this.setState({ unidadeEasySelectValue: options })}
              name={'unidade'}
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="unidade" value={this.state.fieldsBase[baseFilters]} />
  );
};

const TipoUsuarioComponentUpdate = ({ baseFilters, tipoUsuarios }) => {
  return baseFilters !== 'tipoUsuario' ? (
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
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UsuarioUpdate);
