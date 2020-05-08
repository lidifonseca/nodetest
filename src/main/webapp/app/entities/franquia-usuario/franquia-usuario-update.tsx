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

import { IFranquia } from 'app/shared/model/franquia.model';
import { getEntities as getFranquias } from 'app/entities/franquia/franquia.reducer';
import {
  IFranquiaUsuarioUpdateState,
  getEntity,
  getFranquiaUsuarioState,
  IFranquiaUsuarioBaseState,
  updateEntity,
  createEntity,
  reset
} from './franquia-usuario.reducer';
import { IFranquiaUsuario } from 'app/shared/model/franquia-usuario.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFranquiaUsuarioUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FranquiaUsuarioUpdate extends React.Component<IFranquiaUsuarioUpdateProps, IFranquiaUsuarioUpdateState> {
  constructor(props: Readonly<IFranquiaUsuarioUpdateProps>) {
    super(props);

    this.state = {
      franquiaSelectValue: null,
      fieldsBase: getFranquiaUsuarioState(this.props.location),
      franquiaId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }

    if (
      nextProps.franquias.length > 0 &&
      this.state.franquiaSelectValue === null &&
      nextProps.franquiaUsuarioEntity.franquia &&
      nextProps.franquiaUsuarioEntity.franquia.id
    ) {
      this.setState({
        franquiaSelectValue: nextProps.franquias.map(p =>
          nextProps.franquiaUsuarioEntity.franquia.id === p.id ? { value: p.id, label: p.id } : null
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

    this.props.getFranquias();
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
      const { franquiaUsuarioEntity } = this.props;
      const entity = {
        ...franquiaUsuarioEntity,
        franquia: this.state.franquiaSelectValue ? this.state.franquiaSelectValue['value'] : null,
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
    this.props.history.push('/franquia-usuario?' + this.getFiltersURL());
  };

  render() {
    const { franquiaUsuarioEntity, franquias, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...franquiaUsuarioEntity,
                  franquia: franquiaUsuarioEntity.franquia ? franquiaUsuarioEntity.franquia.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.franquiaUsuario.home.createOrEditLabel">Create or edit a FranquiaUsuario</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/franquia-usuario?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Franquia Usuarios</li>
            <li className="breadcrumb-item active">Franquia Usuarios edit</li>
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
                      <Row>
                        <SenhaComponentUpdate baseFilters />

                        <NomeComponentUpdate baseFilters />

                        <EmailComponentUpdate baseFilters />

                        <VerProfissionalComponentUpdate baseFilters />

                        <CadProfissionalComponentUpdate baseFilters />

                        <EdiProfissionalComponentUpdate baseFilters />

                        <DelProfissionalComponentUpdate baseFilters />

                        <RelProfissionalComponentUpdate baseFilters />

                        <VerPacienteComponentUpdate baseFilters />

                        <CadPacienteComponentUpdate baseFilters />

                        <EdiPacienteComponentUpdate baseFilters />

                        <DelPacienteComponentUpdate baseFilters />

                        <RelPacienteComponentUpdate baseFilters />

                        <VerPadComponentUpdate baseFilters />

                        <CadPadComponentUpdate baseFilters />

                        <EdiPadComponentUpdate baseFilters />

                        <DelPadComponentUpdate baseFilters />

                        <RelPadComponentUpdate baseFilters />

                        <VerAtendimentoComponentUpdate baseFilters />

                        <CadAtendimentoComponentUpdate baseFilters />

                        <EdiAtendimentoComponentUpdate baseFilters />

                        <DelAtendimentoComponentUpdate baseFilters />

                        <RelAtendimentoComponentUpdate baseFilters />

                        <VerPushComponentUpdate baseFilters />

                        <CadPushComponentUpdate baseFilters />

                        <VerEspecialidadeValorComponentUpdate baseFilters />

                        <CadEspecialidadeValorComponentUpdate baseFilters />

                        <EdiEspecialidadeValorComponentUpdate baseFilters />

                        <DelEspecialidadeValorComponentUpdate baseFilters />

                        <VerUsuarioComponentUpdate baseFilters />

                        <CadUsuarioComponentUpdate baseFilters />

                        <EdiUsuarioComponentUpdate baseFilters />

                        <DelUsuarioComponentUpdate baseFilters />

                        <EnvioRecusaComponentUpdate baseFilters />

                        <EnvioIntercorrenciaComponentUpdate baseFilters />

                        <EnvioCancelamentoComponentUpdate baseFilters />

                        <AtivoComponentUpdate baseFilters />

                        <LogUserFranquiaComponentUpdate baseFilter logUserFranquias />

                        <FranquiaComponentUpdate baseFilter franquias />
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

const SenhaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'senha' ? (
    <Col md="senha">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="senhaLabel" for="franquia-usuario-senha">
              <Translate contentKey="generadorApp.franquiaUsuario.senha">Senha</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="franquia-usuario-senha" type="text" name="senha" />
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
            <Label className="mt-2" id="nomeLabel" for="franquia-usuario-nome">
              <Translate contentKey="generadorApp.franquiaUsuario.nome">Nome</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="franquia-usuario-nome" type="text" name="nome" />
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
            <Label className="mt-2" id="emailLabel" for="franquia-usuario-email">
              <Translate contentKey="generadorApp.franquiaUsuario.email">Email</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="franquia-usuario-email" type="text" name="email" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="email" value={this.state.fieldsBase[baseFilters]} />
  );
};

const VerProfissionalComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'verProfissional' ? (
    <Col md="verProfissional">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="verProfissionalLabel" for="franquia-usuario-verProfissional">
              <Translate contentKey="generadorApp.franquiaUsuario.verProfissional">Ver Profissional</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="franquia-usuario-verProfissional" type="string" className="form-control" name="verProfissional" />
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
            <Label className="mt-2" id="cadProfissionalLabel" for="franquia-usuario-cadProfissional">
              <Translate contentKey="generadorApp.franquiaUsuario.cadProfissional">Cad Profissional</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="franquia-usuario-cadProfissional" type="string" className="form-control" name="cadProfissional" />
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
            <Label className="mt-2" id="ediProfissionalLabel" for="franquia-usuario-ediProfissional">
              <Translate contentKey="generadorApp.franquiaUsuario.ediProfissional">Edi Profissional</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="franquia-usuario-ediProfissional" type="string" className="form-control" name="ediProfissional" />
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
            <Label className="mt-2" id="delProfissionalLabel" for="franquia-usuario-delProfissional">
              <Translate contentKey="generadorApp.franquiaUsuario.delProfissional">Del Profissional</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="franquia-usuario-delProfissional" type="string" className="form-control" name="delProfissional" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="delProfissional" value={this.state.fieldsBase[baseFilters]} />
  );
};

const RelProfissionalComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'relProfissional' ? (
    <Col md="relProfissional">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="relProfissionalLabel" for="franquia-usuario-relProfissional">
              <Translate contentKey="generadorApp.franquiaUsuario.relProfissional">Rel Profissional</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="franquia-usuario-relProfissional" type="string" className="form-control" name="relProfissional" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="relProfissional" value={this.state.fieldsBase[baseFilters]} />
  );
};

const VerPacienteComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'verPaciente' ? (
    <Col md="verPaciente">
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
  ) : (
    <AvInput type="hidden" name="relPaciente" value={this.state.fieldsBase[baseFilters]} />
  );
};

const VerPadComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'verPad' ? (
    <Col md="verPad">
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
  ) : (
    <AvInput type="hidden" name="relPad" value={this.state.fieldsBase[baseFilters]} />
  );
};

const VerAtendimentoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'verAtendimento' ? (
    <Col md="verAtendimento">
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
  ) : (
    <AvInput type="hidden" name="ediAtendimento" value={this.state.fieldsBase[baseFilters]} />
  );
};

const DelAtendimentoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'delAtendimento' ? (
    <Col md="delAtendimento">
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
  ) : (
    <AvInput type="hidden" name="relAtendimento" value={this.state.fieldsBase[baseFilters]} />
  );
};

const VerPushComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'verPush' ? (
    <Col md="verPush">
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
  ) : (
    <AvInput type="hidden" name="verPush" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CadPushComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cadPush' ? (
    <Col md="cadPush">
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
  ) : (
    <AvInput type="hidden" name="cadPush" value={this.state.fieldsBase[baseFilters]} />
  );
};

const VerEspecialidadeValorComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'verEspecialidadeValor' ? (
    <Col md="verEspecialidadeValor">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="verEspecialidadeValorLabel" for="franquia-usuario-verEspecialidadeValor">
              <Translate contentKey="generadorApp.franquiaUsuario.verEspecialidadeValor">Ver Especialidade Valor</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="franquia-usuario-verEspecialidadeValor" type="string" className="form-control" name="verEspecialidadeValor" />
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
            <Label className="mt-2" id="cadEspecialidadeValorLabel" for="franquia-usuario-cadEspecialidadeValor">
              <Translate contentKey="generadorApp.franquiaUsuario.cadEspecialidadeValor">Cad Especialidade Valor</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="franquia-usuario-cadEspecialidadeValor" type="string" className="form-control" name="cadEspecialidadeValor" />
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
            <Label className="mt-2" id="ediEspecialidadeValorLabel" for="franquia-usuario-ediEspecialidadeValor">
              <Translate contentKey="generadorApp.franquiaUsuario.ediEspecialidadeValor">Edi Especialidade Valor</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="franquia-usuario-ediEspecialidadeValor" type="string" className="form-control" name="ediEspecialidadeValor" />
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
            <Label className="mt-2" id="delEspecialidadeValorLabel" for="franquia-usuario-delEspecialidadeValor">
              <Translate contentKey="generadorApp.franquiaUsuario.delEspecialidadeValor">Del Especialidade Valor</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="franquia-usuario-delEspecialidadeValor" type="string" className="form-control" name="delEspecialidadeValor" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="delEspecialidadeValor" value={this.state.fieldsBase[baseFilters]} />
  );
};

const VerUsuarioComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'verUsuario' ? (
    <Col md="verUsuario">
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
  ) : (
    <AvInput type="hidden" name="delUsuario" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EnvioRecusaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'envioRecusa' ? (
    <Col md="envioRecusa">
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
            <Label className="mt-2" id="envioIntercorrenciaLabel" for="franquia-usuario-envioIntercorrencia">
              <Translate contentKey="generadorApp.franquiaUsuario.envioIntercorrencia">Envio Intercorrencia</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="franquia-usuario-envioIntercorrencia" type="string" className="form-control" name="envioIntercorrencia" />
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
            <Label className="mt-2" id="envioCancelamentoLabel" for="franquia-usuario-envioCancelamento">
              <Translate contentKey="generadorApp.franquiaUsuario.envioCancelamento">Envio Cancelamento</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="franquia-usuario-envioCancelamento" type="string" className="form-control" name="envioCancelamento" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="envioCancelamento" value={this.state.fieldsBase[baseFilters]} />
  );
};

const AtivoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ativo' ? (
    <Col md="ativo">
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
  ) : (
    <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
  );
};

const LogUserFranquiaComponentUpdate = ({ baseFilters, logUserFranquias }) => {
  return baseFilters !== 'logUserFranquia' ? (
    <Col md="12"></Col>
  ) : (
    <AvInput type="hidden" name="logUserFranquia" value={this.state.fieldsBase[baseFilters]} />
  );
};

const FranquiaComponentUpdate = ({ baseFilters, franquias }) => {
  return baseFilters !== 'franquia' ? (
    <Col md="12">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" for="franquia-usuario-franquia">
              <Translate contentKey="generadorApp.franquiaUsuario.franquia">Franquia</Translate>
            </Label>
          </Col>
          <Col md="9">
            <Select
              id="franquia-usuario-franquia"
              className={'css-select-control'}
              value={this.state.franquiaSelectValue}
              options={franquias ? franquias.map(option => ({ value: option.id, label: option.id })) : null}
              onChange={options => this.setState({ franquiaSelectValue: options })}
              name={'franquia'}
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="franquia" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FranquiaUsuarioUpdate);
