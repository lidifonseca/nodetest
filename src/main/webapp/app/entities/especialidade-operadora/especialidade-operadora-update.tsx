import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IOperadora } from 'app/shared/model/operadora.model';
import { getEntities as getOperadoras } from 'app/entities/operadora/operadora.reducer';
import { IEspecialidade } from 'app/shared/model/especialidade.model';
import { getEntities as getEspecialidades } from 'app/entities/especialidade/especialidade.reducer';
import { getEntity, updateEntity, createEntity, reset } from './especialidade-operadora.reducer';
import { IEspecialidadeOperadora } from 'app/shared/model/especialidade-operadora.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEspecialidadeOperadoraUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEspecialidadeOperadoraUpdateState {
  isNew: boolean;
  idOperadoraId: string;
  idEspecialidadeId: string;
}

export class EspecialidadeOperadoraUpdate extends React.Component<IEspecialidadeOperadoraUpdateProps, IEspecialidadeOperadoraUpdateState> {
  constructor(props: Readonly<IEspecialidadeOperadoraUpdateProps>) {
    super(props);
    this.state = {
      idOperadoraId: '0',
      idEspecialidadeId: '0',
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

    this.props.getOperadoras();
    this.props.getEspecialidades();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { especialidadeOperadoraEntity } = this.props;
      const entity = {
        ...especialidadeOperadoraEntity,
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
    this.props.history.push('/especialidade-operadora');
  };

  render() {
    const { especialidadeOperadoraEntity, operadoras, especialidades, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Especialidade Operadoras</li>
          <li className="breadcrumb-item active">Especialidade Operadoras edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...especialidadeOperadoraEntity,
                  idOperadora: especialidadeOperadoraEntity.idOperadora ? especialidadeOperadoraEntity.idOperadora.id : null,
                  idEspecialidade: especialidadeOperadoraEntity.idEspecialidade ? especialidadeOperadoraEntity.idEspecialidade.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.especialidadeOperadora.home.createOrEditLabel">
                    Create or edit a EspecialidadeOperadora
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
                  to="/especialidade-operadora"
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
                      <Label className="mt-2" for="especialidade-operadora-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="especialidade-operadora-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="codTussLabel" for="especialidade-operadora-codTuss">
                                <Translate contentKey="generadorApp.especialidadeOperadora.codTuss">Cod Tuss</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="especialidade-operadora-codTuss"
                                type="text"
                                name="codTuss"
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
                              <Label className="mt-2" id="codDespesaLabel" for="especialidade-operadora-codDespesa">
                                <Translate contentKey="generadorApp.especialidadeOperadora.codDespesa">Cod Despesa</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="especialidade-operadora-codDespesa"
                                type="text"
                                name="codDespesa"
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
                              <Label className="mt-2" id="codTabelaLabel" for="especialidade-operadora-codTabela">
                                <Translate contentKey="generadorApp.especialidadeOperadora.codTabela">Cod Tabela</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="especialidade-operadora-codTabela"
                                type="text"
                                name="codTabela"
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
                              <Label className="mt-2" id="valorCustoLabel" for="especialidade-operadora-valorCusto">
                                <Translate contentKey="generadorApp.especialidadeOperadora.valorCusto">Valor Custo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="especialidade-operadora-valorCusto" type="string" className="form-control" name="valorCusto" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="valorVendaLabel" for="especialidade-operadora-valorVenda">
                                <Translate contentKey="generadorApp.especialidadeOperadora.valorVenda">Valor Venda</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="especialidade-operadora-valorVenda" type="string" className="form-control" name="valorVenda" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="descontoCustoLabel" for="especialidade-operadora-descontoCusto">
                                <Translate contentKey="generadorApp.especialidadeOperadora.descontoCusto">Desconto Custo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="especialidade-operadora-descontoCusto"
                                type="string"
                                className="form-control"
                                name="descontoCusto"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="descontoVendaLabel" for="especialidade-operadora-descontoVenda">
                                <Translate contentKey="generadorApp.especialidadeOperadora.descontoVenda">Desconto Venda</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="especialidade-operadora-descontoVenda"
                                type="string"
                                className="form-control"
                                name="descontoVenda"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ativoLabel" for="especialidade-operadora-ativo">
                                <Translate contentKey="generadorApp.especialidadeOperadora.ativo">Ativo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="especialidade-operadora-ativo" type="string" className="form-control" name="ativo" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>
                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" for="especialidade-operadora-idOperadora">
                                <Translate contentKey="generadorApp.especialidadeOperadora.idOperadora">Id Operadora</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="especialidade-operadora-idOperadora" type="select" className="form-control" name="idOperadora">
                                <option value="null" key="0">
                                  {translate('generadorApp.especialidadeOperadora.idOperadora.empty')}
                                </option>
                                {operadoras
                                  ? operadoras.map(otherEntity => (
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
                              <Label className="mt-2" for="especialidade-operadora-idEspecialidade">
                                <Translate contentKey="generadorApp.especialidadeOperadora.idEspecialidade">Id Especialidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="especialidade-operadora-idEspecialidade"
                                type="select"
                                className="form-control"
                                name="idEspecialidade"
                              >
                                <option value="null" key="0">
                                  {translate('generadorApp.especialidadeOperadora.idEspecialidade.empty')}
                                </option>
                                {especialidades
                                  ? especialidades.map(otherEntity => (
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
  operadoras: storeState.operadora.entities,
  especialidades: storeState.especialidade.entities,
  especialidadeOperadoraEntity: storeState.especialidadeOperadora.entity,
  loading: storeState.especialidadeOperadora.loading,
  updating: storeState.especialidadeOperadora.updating,
  updateSuccess: storeState.especialidadeOperadora.updateSuccess
});

const mapDispatchToProps = {
  getOperadoras,
  getEspecialidades,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EspecialidadeOperadoraUpdate);
