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

import { IAtendimento } from 'app/shared/model/atendimento.model';
import { getEntities as getAtendimentos } from 'app/entities/atendimento/atendimento.reducer';
import { IProfissional } from 'app/shared/model/profissional.model';
import { getEntities as getProfissionals } from 'app/entities/profissional/profissional.reducer';
import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';
import {
  IAtendimentoAssinaturasUpdateState,
  getEntity,
  getAtendimentoAssinaturasState,
  IAtendimentoAssinaturasBaseState,
  updateEntity,
  createEntity,
  reset
} from './atendimento-assinaturas.reducer';
import { IAtendimentoAssinaturas } from 'app/shared/model/atendimento-assinaturas.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAtendimentoAssinaturasUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AtendimentoAssinaturasUpdate extends React.Component<IAtendimentoAssinaturasUpdateProps, IAtendimentoAssinaturasUpdateState> {
  constructor(props: Readonly<IAtendimentoAssinaturasUpdateProps>) {
    super(props);

    this.state = {
      atendimentoSelectValue: null,
      profissionalSelectValue: null,
      pacienteSelectValue: null,
      fieldsBase: getAtendimentoAssinaturasState(this.props.location),
      atendimentoId: '0',
      profissionalId: '0',
      pacienteId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }

    if (
      nextProps.atendimentos.length > 0 &&
      this.state.atendimentoSelectValue === null &&
      nextProps.atendimentoAssinaturasEntity.atendimento &&
      nextProps.atendimentoAssinaturasEntity.atendimento.id
    ) {
      this.setState({
        atendimentoSelectValue: nextProps.atendimentos.map(p =>
          nextProps.atendimentoAssinaturasEntity.atendimento.id === p.id ? { value: p.id, label: p.id } : null
        )
      });
    }

    if (
      nextProps.profissionals.length > 0 &&
      this.state.profissionalSelectValue === null &&
      nextProps.atendimentoAssinaturasEntity.profissional &&
      nextProps.atendimentoAssinaturasEntity.profissional.id
    ) {
      this.setState({
        profissionalSelectValue: nextProps.profissionals.map(p =>
          nextProps.atendimentoAssinaturasEntity.profissional.id === p.id ? { value: p.id, label: p.id } : null
        )
      });
    }

    if (
      nextProps.pacientes.length > 0 &&
      this.state.pacienteSelectValue === null &&
      nextProps.atendimentoAssinaturasEntity.paciente &&
      nextProps.atendimentoAssinaturasEntity.paciente.id
    ) {
      this.setState({
        pacienteSelectValue: nextProps.pacientes.map(p =>
          nextProps.atendimentoAssinaturasEntity.paciente.id === p.id ? { value: p.id, label: p.id } : null
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

    this.props.getAtendimentos();
    this.props.getProfissionals();
    this.props.getPacientes();
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
      const { atendimentoAssinaturasEntity } = this.props;
      const entity = {
        ...atendimentoAssinaturasEntity,
        atendimento: this.state.atendimentoSelectValue ? this.state.atendimentoSelectValue['value'] : null,
        profissional: this.state.profissionalSelectValue ? this.state.profissionalSelectValue['value'] : null,
        paciente: this.state.pacienteSelectValue ? this.state.pacienteSelectValue['value'] : null,
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
    this.props.history.push('/atendimento-assinaturas?' + this.getFiltersURL());
  };

  render() {
    const { atendimentoAssinaturasEntity, atendimentos, profissionals, pacientes, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...atendimentoAssinaturasEntity,
                  atendimento: atendimentoAssinaturasEntity.atendimento ? atendimentoAssinaturasEntity.atendimento.id : null,
                  profissional: atendimentoAssinaturasEntity.profissional ? atendimentoAssinaturasEntity.profissional.id : null,
                  paciente: atendimentoAssinaturasEntity.paciente ? atendimentoAssinaturasEntity.paciente.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.atendimentoAssinaturas.home.createOrEditLabel">
                Create or edit a AtendimentoAssinaturas
              </Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/atendimento-assinaturas?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Atendimento Assinaturas</li>
            <li className="breadcrumb-item active">Atendimento Assinaturas edit</li>
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
                        <Label className="mt-2" for="atendimento-assinaturas-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput id="atendimento-assinaturas-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'arquivoAssinatura' ? (
                          <Col md="arquivoAssinatura">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="arquivoAssinaturaLabel" for="atendimento-assinaturas-arquivoAssinatura">
                                    <Translate contentKey="generadorApp.atendimentoAssinaturas.arquivoAssinatura">
                                      Arquivo Assinatura
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="atendimento-assinaturas-arquivoAssinatura" type="text" name="arquivoAssinatura" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="arquivoAssinatura" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'atendimento' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="atendimento-assinaturas-atendimento">
                                    <Translate contentKey="generadorApp.atendimentoAssinaturas.atendimento">Atendimento</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="atendimento-assinaturas-atendimento"
                                    className={'css-select-control'}
                                    value={this.state.atendimentoSelectValue}
                                    options={atendimentos ? atendimentos.map(option => ({ value: option.id, label: option.id })) : null}
                                    onChange={options => this.setState({ atendimentoSelectValue: options })}
                                    name={'atendimento'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="atendimento" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'profissional' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="atendimento-assinaturas-profissional">
                                    <Translate contentKey="generadorApp.atendimentoAssinaturas.profissional">Profissional</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="atendimento-assinaturas-profissional"
                                    className={'css-select-control'}
                                    value={this.state.profissionalSelectValue}
                                    options={profissionals ? profissionals.map(option => ({ value: option.id, label: option.id })) : null}
                                    onChange={options => this.setState({ profissionalSelectValue: options })}
                                    name={'profissional'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="profissional" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'paciente' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="atendimento-assinaturas-paciente">
                                    <Translate contentKey="generadorApp.atendimentoAssinaturas.paciente">Paciente</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="atendimento-assinaturas-paciente"
                                    className={'css-select-control'}
                                    value={this.state.pacienteSelectValue}
                                    options={pacientes ? pacientes.map(option => ({ value: option.id, label: option.id })) : null}
                                    onChange={options => this.setState({ pacienteSelectValue: options })}
                                    name={'paciente'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="paciente" value={this.state.fieldsBase[baseFilters]} />
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
  atendimentos: storeState.atendimento.entities,
  profissionals: storeState.profissional.entities,
  pacientes: storeState.paciente.entities,
  atendimentoAssinaturasEntity: storeState.atendimentoAssinaturas.entity,
  loading: storeState.atendimentoAssinaturas.loading,
  updating: storeState.atendimentoAssinaturas.updating,
  updateSuccess: storeState.atendimentoAssinaturas.updateSuccess
});

const mapDispatchToProps = {
  getAtendimentos,
  getProfissionals,
  getPacientes,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AtendimentoAssinaturasUpdate);
