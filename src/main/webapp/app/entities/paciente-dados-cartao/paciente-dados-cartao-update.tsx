import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';
import { getEntity, updateEntity, createEntity, reset } from './paciente-dados-cartao.reducer';
import { IPacienteDadosCartao } from 'app/shared/model/paciente-dados-cartao.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPacienteDadosCartaoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPacienteDadosCartaoUpdateState {
  isNew: boolean;
  idPacienteId: string;
}

export class PacienteDadosCartaoUpdate extends React.Component<IPacienteDadosCartaoUpdateProps, IPacienteDadosCartaoUpdateState> {
  constructor(props: Readonly<IPacienteDadosCartaoUpdateProps>) {
    super(props);
    this.state = {
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

    this.props.getPacientes();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { pacienteDadosCartaoEntity } = this.props;
      const entity = {
        ...pacienteDadosCartaoEntity,
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
    this.props.history.push('/paciente-dados-cartao');
  };

  render() {
    const { pacienteDadosCartaoEntity, pacientes, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Dados Cartaos</li>
          <li className="breadcrumb-item active">Paciente Dados Cartaos edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...pacienteDadosCartaoEntity,
                  idPaciente: pacienteDadosCartaoEntity.idPaciente ? pacienteDadosCartaoEntity.idPaciente.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.pacienteDadosCartao.home.createOrEditLabel">
                    Create or edit a PacienteDadosCartao
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
                  to="/paciente-dados-cartao"
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
                      <Label className="mt-2" for="paciente-dados-cartao-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="paciente-dados-cartao-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="bandeiraLabel" for="paciente-dados-cartao-bandeira">
                                <Translate contentKey="generadorApp.pacienteDadosCartao.bandeira">Bandeira</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-dados-cartao-bandeira"
                                type="text"
                                name="bandeira"
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
                              <Label className="mt-2" id="numeroCartaoLabel" for="paciente-dados-cartao-numeroCartao">
                                <Translate contentKey="generadorApp.pacienteDadosCartao.numeroCartao">Numero Cartao</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-dados-cartao-numeroCartao"
                                type="text"
                                name="numeroCartao"
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
                              <Label className="mt-2" id="validadeLabel" for="paciente-dados-cartao-validade">
                                <Translate contentKey="generadorApp.pacienteDadosCartao.validade">Validade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="paciente-dados-cartao-validade" type="date" className="form-control" name="validade" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="codAtivacaoLabel" for="paciente-dados-cartao-codAtivacao">
                                <Translate contentKey="generadorApp.pacienteDadosCartao.codAtivacao">Cod Ativacao</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="paciente-dados-cartao-codAtivacao" type="string" className="form-control" name="codAtivacao" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ativoLabel" for="paciente-dados-cartao-ativo">
                                <Translate contentKey="generadorApp.pacienteDadosCartao.ativo">Ativo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="paciente-dados-cartao-ativo" type="string" className="form-control" name="ativo" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>
                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" for="paciente-dados-cartao-idPaciente">
                                <Translate contentKey="generadorApp.pacienteDadosCartao.idPaciente">Id Paciente</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="paciente-dados-cartao-idPaciente" type="select" className="form-control" name="idPaciente">
                                <option value="null" key="0">
                                  {translate('generadorApp.pacienteDadosCartao.idPaciente.empty')}
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
  pacientes: storeState.paciente.entities,
  pacienteDadosCartaoEntity: storeState.pacienteDadosCartao.entity,
  loading: storeState.pacienteDadosCartao.loading,
  updating: storeState.pacienteDadosCartao.updating,
  updateSuccess: storeState.pacienteDadosCartao.updateSuccess
});

const mapDispatchToProps = {
  getPacientes,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteDadosCartaoUpdate);
