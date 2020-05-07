import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEmpresaUpdateState, getEntity, getEmpresaState, IEmpresaBaseState, updateEntity, createEntity, reset } from './empresa.reducer';
import { IEmpresa } from 'app/shared/model/empresa.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmpresaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EmpresaUpdate extends React.Component<IEmpresaUpdateProps, IEmpresaUpdateState> {
  constructor(props: Readonly<IEmpresaUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getEmpresaState(this.props.location),
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

  getFiltersURL = (offset = null) => {
    const fieldsBase = this.state.fieldsBase;
    return (
      '_back=1' +
      (fieldsBase['baseFilters'] ? '&baseFilters=' + fieldsBase['baseFilters'] : '') +
      (fieldsBase['activePage'] ? '&page=' + fieldsBase['activePage'] : '') +
      (fieldsBase['itemsPerPage'] ? '&size=' + fieldsBase['itemsPerPage'] : '') +
      (fieldsBase['sort'] ? '&sort=' + (fieldsBase['sort'] + ',' + fieldsBase['order']) : '') +
      (offset !== null ? '&offset=' + offset : '') +
      (fieldsBase['empresa'] ? '&empresa=' + fieldsBase['empresa'] : '') +
      (fieldsBase['nome'] ? '&nome=' + fieldsBase['nome'] : '') +
      (fieldsBase['email'] ? '&email=' + fieldsBase['email'] : '') +
      (fieldsBase['cpf'] ? '&cpf=' + fieldsBase['cpf'] : '') +
      (fieldsBase['rg'] ? '&rg=' + fieldsBase['rg'] : '') +
      (fieldsBase['nascimento'] ? '&nascimento=' + fieldsBase['nascimento'] : '') +
      (fieldsBase['sexo'] ? '&sexo=' + fieldsBase['sexo'] : '') +
      (fieldsBase['telefone1'] ? '&telefone1=' + fieldsBase['telefone1'] : '') +
      (fieldsBase['telefone2'] ? '&telefone2=' + fieldsBase['telefone2'] : '') +
      (fieldsBase['celular1'] ? '&celular1=' + fieldsBase['celular1'] : '') +
      (fieldsBase['celular2'] ? '&celular2=' + fieldsBase['celular2'] : '') +
      (fieldsBase['cep'] ? '&cep=' + fieldsBase['cep'] : '') +
      (fieldsBase['endereco'] ? '&endereco=' + fieldsBase['endereco'] : '') +
      (fieldsBase['numero'] ? '&numero=' + fieldsBase['numero'] : '') +
      (fieldsBase['complemento'] ? '&complemento=' + fieldsBase['complemento'] : '') +
      (fieldsBase['bairro'] ? '&bairro=' + fieldsBase['bairro'] : '') +
      (fieldsBase['cidade'] ? '&cidade=' + fieldsBase['cidade'] : '') +
      (fieldsBase['uf'] ? '&uf=' + fieldsBase['uf'] : '') +
      (fieldsBase['tipo'] ? '&tipo=' + fieldsBase['tipo'] : '') +
      ''
    );
  };
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
    this.props.history.push('/empresa?' + this.getFiltersURL());
  };

  render() {
    const { empresaEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
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
                  ...empresaEntity
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
                <Button
                  tag={Link}
                  id="cancel-save"
                  to={'/empresa?' + this.getFiltersURL()}
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
                    <div>
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
                      <Row>
                        {baseFilters !== 'empresa' ? (
                          <Col md="empresa">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="empresaLabel" for="empresa-empresa">
                                    <Translate contentKey="generadorApp.empresa.empresa">Empresa</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="empresa-empresa" type="text" name="empresa" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="empresa" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'nome' ? (
                          <Col md="nome">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="nomeLabel" for="empresa-nome">
                                    <Translate contentKey="generadorApp.empresa.nome">Nome</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="empresa-nome" type="text" name="nome" />
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
                                  <Label className="mt-2" id="emailLabel" for="empresa-email">
                                    <Translate contentKey="generadorApp.empresa.email">Email</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="empresa-email" type="text" name="email" />
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
                                  <Label className="mt-2" id="cpfLabel" for="empresa-cpf">
                                    <Translate contentKey="generadorApp.empresa.cpf">Cpf</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="empresa-cpf" type="text" name="cpf" />
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
                                  <Label className="mt-2" id="rgLabel" for="empresa-rg">
                                    <Translate contentKey="generadorApp.empresa.rg">Rg</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="empresa-rg" type="text" name="rg" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="rg" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'nascimento' ? (
                          <Col md="nascimento">
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
                        ) : (
                          <AvInput type="hidden" name="nascimento" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'sexo' ? (
                          <Col md="sexo">
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
                        ) : (
                          <AvInput type="hidden" name="sexo" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'telefone1' ? (
                          <Col md="telefone1">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="telefone1Label" for="empresa-telefone1">
                                    <Translate contentKey="generadorApp.empresa.telefone1">Telefone 1</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="empresa-telefone1" type="text" name="telefone1" />
                                </Col>
                                <UncontrolledTooltip target="telefone1Label">
                                  <Translate contentKey="generadorApp.empresa.help.telefone1" />
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
                                  <Label className="mt-2" id="telefone2Label" for="empresa-telefone2">
                                    <Translate contentKey="generadorApp.empresa.telefone2">Telefone 2</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="empresa-telefone2" type="text" name="telefone2" />
                                </Col>
                                <UncontrolledTooltip target="telefone2Label">
                                  <Translate contentKey="generadorApp.empresa.help.telefone2" />
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
                                  <Label className="mt-2" id="celular1Label" for="empresa-celular1">
                                    <Translate contentKey="generadorApp.empresa.celular1">Celular 1</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="empresa-celular1" type="text" name="celular1" />
                                </Col>
                                <UncontrolledTooltip target="celular1Label">
                                  <Translate contentKey="generadorApp.empresa.help.celular1" />
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
                                  <Label className="mt-2" id="celular2Label" for="empresa-celular2">
                                    <Translate contentKey="generadorApp.empresa.celular2">Celular 2</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="empresa-celular2" type="text" name="celular2" />
                                </Col>
                                <UncontrolledTooltip target="celular2Label">
                                  <Translate contentKey="generadorApp.empresa.help.celular2" />
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
                                  <Label className="mt-2" id="cepLabel" for="empresa-cep">
                                    <Translate contentKey="generadorApp.empresa.cep">Cep</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="empresa-cep" type="text" name="cep" />
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
                                  <Label className="mt-2" id="enderecoLabel" for="empresa-endereco">
                                    <Translate contentKey="generadorApp.empresa.endereco">Endereco</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="empresa-endereco" type="text" name="endereco" />
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
                                  <Label className="mt-2" id="numeroLabel" for="empresa-numero">
                                    <Translate contentKey="generadorApp.empresa.numero">Numero</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="empresa-numero" type="text" name="numero" />
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
                                  <Label className="mt-2" id="complementoLabel" for="empresa-complemento">
                                    <Translate contentKey="generadorApp.empresa.complemento">Complemento</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="empresa-complemento" type="text" name="complemento" />
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
                                  <Label className="mt-2" id="bairroLabel" for="empresa-bairro">
                                    <Translate contentKey="generadorApp.empresa.bairro">Bairro</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="empresa-bairro" type="text" name="bairro" />
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
                                  <Label className="mt-2" id="cidadeLabel" for="empresa-cidade">
                                    <Translate contentKey="generadorApp.empresa.cidade">Cidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="empresa-cidade" type="text" name="cidade" />
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
                                  <Label className="mt-2" id="ufLabel" for="empresa-uf">
                                    <Translate contentKey="generadorApp.empresa.uf">Uf</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="empresa-uf" type="text" name="uf" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="uf" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'tipo' ? (
                          <Col md="tipo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="tipoLabel" for="empresa-tipo">
                                    <Translate contentKey="generadorApp.empresa.tipo">Tipo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="empresa-tipo" type="string" className="form-control" name="tipo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="tipo" value={this.state.fieldsBase[baseFilters]} />
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
  empresaEntity: storeState.empresa.entity,
  loading: storeState.empresa.loading,
  updating: storeState.empresa.updating,
  updateSuccess: storeState.empresa.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmpresaUpdate);
