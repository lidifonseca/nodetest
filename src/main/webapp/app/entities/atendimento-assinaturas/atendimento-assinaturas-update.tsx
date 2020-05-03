import React from 'react';
import { connect } from 'react-redux';
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
import { getEntity, updateEntity, createEntity, reset } from './atendimento-assinaturas.reducer';
import { IAtendimentoAssinaturas } from 'app/shared/model/atendimento-assinaturas.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAtendimentoAssinaturasUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAtendimentoAssinaturasUpdateState {
  isNew: boolean;
  idAtendimentoId: string;
  idProfissionalId: string;
  idPacienteId: string;
}

export class AtendimentoAssinaturasUpdate extends React.Component<IAtendimentoAssinaturasUpdateProps, IAtendimentoAssinaturasUpdateState> {
  constructor(props: Readonly<IAtendimentoAssinaturasUpdateProps>) {
    super(props);
    this.state = {
      idAtendimentoId: '0',
      idProfissionalId: '0',
      idPacienteId: '0',
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

    this.props.getAtendimentos();
    this.props.getProfissionals();
    this.props.getPacientes();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    values.dataPost = convertDateTimeToServer(values.dataPost);

    if (errors.length === 0) {
      const { atendimentoAssinaturasEntity } = this.props;
      const entity = {
        ...atendimentoAssinaturasEntity,
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
    this.props.history.push('/atendimento-assinaturas');
  };

  render() {
    const { atendimentoAssinaturasEntity, atendimentos, profissionals, pacientes, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Atendimento Assinaturas</li>
          <li className="breadcrumb-item active">Atendimento Assinaturas edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...atendimentoAssinaturasEntity,
                  idAtendimento: atendimentoAssinaturasEntity.idAtendimento ? atendimentoAssinaturasEntity.idAtendimento.id : null,
                  idProfissional: atendimentoAssinaturasEntity.idProfissional ? atendimentoAssinaturasEntity.idProfissional.id : null,
                  idPaciente: atendimentoAssinaturasEntity.idPaciente ? atendimentoAssinaturasEntity.idPaciente.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
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
                  to="/atendimento-assinaturas"
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

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="arquivoAssinaturaLabel" for="atendimento-assinaturas-arquivoAssinatura">
                                <Translate contentKey="generadorApp.atendimentoAssinaturas.arquivoAssinatura">Arquivo Assinatura</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="atendimento-assinaturas-arquivoAssinatura"
                                type="text"
                                name="arquivoAssinatura"
                                validate={{
                                  maxLength: { value: 150, errorMessage: translate('entity.validation.maxlength', { max: 150 }) }
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
                              <Label className="mt-2" id="dataPostLabel" for="atendimento-assinaturas-dataPost">
                                <Translate contentKey="generadorApp.atendimentoAssinaturas.dataPost">Data Post</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="atendimento-assinaturas-dataPost"
                                type="datetime-local"
                                className="form-control"
                                name="dataPost"
                                placeholder={'YYYY-MM-DD HH:mm'}
                                value={isNew ? null : convertDateTimeFromServer(this.props.atendimentoAssinaturasEntity.dataPost)}
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
                              <Label className="mt-2" for="atendimento-assinaturas-idAtendimento">
                                <Translate contentKey="generadorApp.atendimentoAssinaturas.idAtendimento">Id Atendimento</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="atendimento-assinaturas-idAtendimento"
                                type="select"
                                className="form-control"
                                name="idAtendimento"
                              >
                                <option value="null" key="0">
                                  {translate('generadorApp.atendimentoAssinaturas.idAtendimento.empty')}
                                </option>
                                {atendimentos
                                  ? atendimentos.map(otherEntity => (
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

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" for="atendimento-assinaturas-idProfissional">
                                <Translate contentKey="generadorApp.atendimentoAssinaturas.idProfissional">Id Profissional</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="atendimento-assinaturas-idProfissional"
                                type="select"
                                className="form-control"
                                name="idProfissional"
                              >
                                <option value="null" key="0">
                                  {translate('generadorApp.atendimentoAssinaturas.idProfissional.empty')}
                                </option>
                                {profissionals
                                  ? profissionals.map(otherEntity => (
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

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" for="atendimento-assinaturas-idPaciente">
                                <Translate contentKey="generadorApp.atendimentoAssinaturas.idPaciente">Id Paciente</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="atendimento-assinaturas-idPaciente" type="select" className="form-control" name="idPaciente">
                                <option value="null" key="0">
                                  {translate('generadorApp.atendimentoAssinaturas.idPaciente.empty')}
                                </option>
                                {pacientes
                                  ? pacientes.map(otherEntity => (
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
