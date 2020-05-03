import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICidade } from 'app/shared/model/cidade.model';
import { getEntities as getCidades } from 'app/entities/cidade/cidade.reducer';
import { getEntity, updateEntity, createEntity, reset } from './empresa.reducer';
import { IEmpresa } from 'app/shared/model/empresa.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmpresaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEmpresaUpdateState {
  isNew: boolean;
  idCidadeId: string;
}

export class EmpresaUpdate extends React.Component<IEmpresaUpdateProps, IEmpresaUpdateState> {
  constructor(props: Readonly<IEmpresaUpdateProps>) {
    super(props);
    this.state = {
      idCidadeId: '0',
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

    this.props.getCidades();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { empresaEntity } = this.props;
      const entity = {
        ...empresaEntity,
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
    this.props.history.push('/empresa');
  };

  render() {
    const { empresaEntity, cidades, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Empresas</li>
          <li className="breadcrumb-item active">Empresas edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...empresaEntity,
                  idCidade: empresaEntity.idCidade ? empresaEntity.idCidade.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.empresa.home.createOrEditLabel">Create or edit a Empresa</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/empresa" replace color="info" className="float-right jh-create-entity">
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
                      <Label className="mt-2" for="empresa-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="empresa-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="empresaLabel" for="empresa-empresa">
                                <Translate contentKey="generadorApp.empresa.empresa">Empresa</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="empresa-empresa"
                                type="text"
                                name="empresa"
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
                              <Label className="mt-2" id="nomeLabel" for="empresa-nome">
                                <Translate contentKey="generadorApp.empresa.nome">Nome</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="empresa-nome"
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
                              <Label className="mt-2" id="emailLabel" for="empresa-email">
                                <Translate contentKey="generadorApp.empresa.email">Email</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="empresa-email"
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
                              <Label className="mt-2" id="cpfLabel" for="empresa-cpf">
                                <Translate contentKey="generadorApp.empresa.cpf">Cpf</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="empresa-cpf"
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
                              <Label className="mt-2" id="rgLabel" for="empresa-rg">
                                <Translate contentKey="generadorApp.empresa.rg">Rg</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="empresa-rg"
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
                              <Label className="mt-2" id="nascimentoLabel" for="empresa-nascimento">
                                <Translate contentKey="generadorApp.empresa.nascimento">Nascimento</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="empresa-nascimento" type="date" className="form-control" name="nascimento" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="sexoLabel" for="empresa-sexo">
                                <Translate contentKey="generadorApp.empresa.sexo">Sexo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="empresa-sexo" type="string" className="form-control" name="sexo" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="telefone1Label" for="empresa-telefone1">
                                <Translate contentKey="generadorApp.empresa.telefone1">Telefone 1</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="empresa-telefone1"
                                type="text"
                                name="telefone1"
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
                              <Label className="mt-2" id="telefone2Label" for="empresa-telefone2">
                                <Translate contentKey="generadorApp.empresa.telefone2">Telefone 2</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="empresa-telefone2"
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
                              <Label className="mt-2" id="celular1Label" for="empresa-celular1">
                                <Translate contentKey="generadorApp.empresa.celular1">Celular 1</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="empresa-celular1"
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
                              <Label className="mt-2" id="celular2Label" for="empresa-celular2">
                                <Translate contentKey="generadorApp.empresa.celular2">Celular 2</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="empresa-celular2"
                                type="text"
                                name="celular2"
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
                              <Label className="mt-2" id="cepLabel" for="empresa-cep">
                                <Translate contentKey="generadorApp.empresa.cep">Cep</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="empresa-cep"
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
                              <Label className="mt-2" id="enderecoLabel" for="empresa-endereco">
                                <Translate contentKey="generadorApp.empresa.endereco">Endereco</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="empresa-endereco"
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
                              <Label className="mt-2" id="numeroLabel" for="empresa-numero">
                                <Translate contentKey="generadorApp.empresa.numero">Numero</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="empresa-numero"
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
                              <Label className="mt-2" id="complementoLabel" for="empresa-complemento">
                                <Translate contentKey="generadorApp.empresa.complemento">Complemento</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="empresa-complemento"
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
                              <Label className="mt-2" id="bairroLabel" for="empresa-bairro">
                                <Translate contentKey="generadorApp.empresa.bairro">Bairro</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="empresa-bairro"
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
                              <Label className="mt-2" id="cidadeLabel" for="empresa-cidade">
                                <Translate contentKey="generadorApp.empresa.cidade">Cidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="empresa-cidade"
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
                              <Label className="mt-2" id="ufLabel" for="empresa-uf">
                                <Translate contentKey="generadorApp.empresa.uf">Uf</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="empresa-uf"
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
                              <Label className="mt-2" id="tipoLabel" for="empresa-tipo">
                                <Translate contentKey="generadorApp.empresa.tipo">Tipo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="empresa-tipo"
                                type="string"
                                className="form-control"
                                name="tipo"
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
                              <Label className="mt-2" for="empresa-idCidade">
                                <Translate contentKey="generadorApp.empresa.idCidade">Id Cidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="empresa-idCidade" type="select" className="form-control" name="idCidade">
                                <option value="null" key="0">
                                  {translate('generadorApp.empresa.idCidade.empty')}
                                </option>
                                {cidades
                                  ? cidades.map(otherEntity => (
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
  cidades: storeState.cidade.entities,
  empresaEntity: storeState.empresa.entity,
  loading: storeState.empresa.loading,
  updating: storeState.empresa.updating,
  updateSuccess: storeState.empresa.updateSuccess
});

const mapDispatchToProps = {
  getCidades,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmpresaUpdate);
