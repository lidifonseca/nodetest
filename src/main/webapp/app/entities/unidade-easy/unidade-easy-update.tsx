import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICategoria } from 'app/shared/model/categoria.model';
import { getEntities as getCategorias } from 'app/entities/categoria/categoria.reducer';
import {
  IUnidadeEasyUpdateState,
  getEntity,
  getUnidadeEasyState,
  IUnidadeEasyBaseState,
  updateEntity,
  createEntity,
  reset
} from './unidade-easy.reducer';
import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUnidadeEasyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class UnidadeEasyUpdate extends React.Component<IUnidadeEasyUpdateProps, IUnidadeEasyUpdateState> {
  constructor(props: Readonly<IUnidadeEasyUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getUnidadeEasyState(this.props.location),
      categoriaId: '0',
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

    this.props.getCategorias();
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
      (fieldsBase['razaoSocial'] ? '&razaoSocial=' + fieldsBase['razaoSocial'] : '') +
      (fieldsBase['nomeFantasia'] ? '&nomeFantasia=' + fieldsBase['nomeFantasia'] : '') +
      (fieldsBase['cnpj'] ? '&cnpj=' + fieldsBase['cnpj'] : '') +
      (fieldsBase['ie'] ? '&ie=' + fieldsBase['ie'] : '') +
      (fieldsBase['telefone1'] ? '&telefone1=' + fieldsBase['telefone1'] : '') +
      (fieldsBase['telefone2'] ? '&telefone2=' + fieldsBase['telefone2'] : '') +
      (fieldsBase['endereco'] ? '&endereco=' + fieldsBase['endereco'] : '') +
      (fieldsBase['numero'] ? '&numero=' + fieldsBase['numero'] : '') +
      (fieldsBase['complemento'] ? '&complemento=' + fieldsBase['complemento'] : '') +
      (fieldsBase['bairro'] ? '&bairro=' + fieldsBase['bairro'] : '') +
      (fieldsBase['cidade'] ? '&cidade=' + fieldsBase['cidade'] : '') +
      (fieldsBase['uf'] ? '&uf=' + fieldsBase['uf'] : '') +
      (fieldsBase['cep'] ? '&cep=' + fieldsBase['cep'] : '') +
      (fieldsBase['regans'] ? '&regans=' + fieldsBase['regans'] : '') +
      (fieldsBase['regcnes'] ? '&regcnes=' + fieldsBase['regcnes'] : '') +
      (fieldsBase['tissresponsavel'] ? '&tissresponsavel=' + fieldsBase['tissresponsavel'] : '') +
      (fieldsBase['tissconselho'] ? '&tissconselho=' + fieldsBase['tissconselho'] : '') +
      (fieldsBase['tissinscricao'] ? '&tissinscricao=' + fieldsBase['tissinscricao'] : '') +
      (fieldsBase['tisscbo'] ? '&tisscbo=' + fieldsBase['tisscbo'] : '') +
      (fieldsBase['tisscoduf'] ? '&tisscoduf=' + fieldsBase['tisscoduf'] : '') +
      (fieldsBase['ativo'] ? '&ativo=' + fieldsBase['ativo'] : '') +
      (fieldsBase['categoria'] ? '&categoria=' + fieldsBase['categoria'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { unidadeEasyEntity } = this.props;
      const entity = {
        ...unidadeEasyEntity,
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
    this.props.history.push('/unidade-easy?' + this.getFiltersURL());
  };

  render() {
    const { unidadeEasyEntity, categorias, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Unidade Easies</li>
          <li className="breadcrumb-item active">Unidade Easies edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...unidadeEasyEntity,
                  categoria: unidadeEasyEntity.categoria ? unidadeEasyEntity.categoria.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.unidadeEasy.home.createOrEditLabel">Create or edit a UnidadeEasy</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button
                  tag={Link}
                  id="cancel-save"
                  to={'/unidade-easy?' + this.getFiltersURL()}
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
                      <Label className="mt-2" for="unidade-easy-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="unidade-easy-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'razaoSocial' ? (
                          <Col md="razaoSocial">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="razaoSocialLabel" for="unidade-easy-razaoSocial">
                                    <Translate contentKey="generadorApp.unidadeEasy.razaoSocial">Razao Social</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="unidade-easy-razaoSocial" type="text" name="razaoSocial" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="razaoSocial" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'nomeFantasia' ? (
                          <Col md="nomeFantasia">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="nomeFantasiaLabel" for="unidade-easy-nomeFantasia">
                                    <Translate contentKey="generadorApp.unidadeEasy.nomeFantasia">Nome Fantasia</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="unidade-easy-nomeFantasia" type="text" name="nomeFantasia" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="nomeFantasia" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'cnpj' ? (
                          <Col md="cnpj">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="cnpjLabel" for="unidade-easy-cnpj">
                                    <Translate contentKey="generadorApp.unidadeEasy.cnpj">Cnpj</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="unidade-easy-cnpj" type="text" name="cnpj" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cnpj" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'ie' ? (
                          <Col md="ie">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="ieLabel" for="unidade-easy-ie">
                                    <Translate contentKey="generadorApp.unidadeEasy.ie">Ie</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="unidade-easy-ie" type="text" name="ie" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ie" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'telefone1' ? (
                          <Col md="telefone1">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="telefone1Label" for="unidade-easy-telefone1">
                                    <Translate contentKey="generadorApp.unidadeEasy.telefone1">Telefone 1</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="unidade-easy-telefone1" type="text" name="telefone1" />
                                </Col>
                                <UncontrolledTooltip target="telefone1Label">
                                  <Translate contentKey="generadorApp.unidadeEasy.help.telefone1" />
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
                                  <Label className="mt-2" id="telefone2Label" for="unidade-easy-telefone2">
                                    <Translate contentKey="generadorApp.unidadeEasy.telefone2">Telefone 2</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="unidade-easy-telefone2" type="text" name="telefone2" />
                                </Col>
                                <UncontrolledTooltip target="telefone2Label">
                                  <Translate contentKey="generadorApp.unidadeEasy.help.telefone2" />
                                </UncontrolledTooltip>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="telefone2" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'endereco' ? (
                          <Col md="endereco">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="enderecoLabel" for="unidade-easy-endereco">
                                    <Translate contentKey="generadorApp.unidadeEasy.endereco">Endereco</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="unidade-easy-endereco" type="text" name="endereco" />
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
                                  <Label className="mt-2" id="numeroLabel" for="unidade-easy-numero">
                                    <Translate contentKey="generadorApp.unidadeEasy.numero">Numero</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="unidade-easy-numero" type="text" name="numero" />
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
                                  <Label className="mt-2" id="complementoLabel" for="unidade-easy-complemento">
                                    <Translate contentKey="generadorApp.unidadeEasy.complemento">Complemento</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="unidade-easy-complemento" type="text" name="complemento" />
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
                                  <Label className="mt-2" id="bairroLabel" for="unidade-easy-bairro">
                                    <Translate contentKey="generadorApp.unidadeEasy.bairro">Bairro</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="unidade-easy-bairro" type="text" name="bairro" />
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
                                  <Label className="mt-2" id="cidadeLabel" for="unidade-easy-cidade">
                                    <Translate contentKey="generadorApp.unidadeEasy.cidade">Cidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="unidade-easy-cidade" type="text" name="cidade" />
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
                                  <Label className="mt-2" id="ufLabel" for="unidade-easy-uf">
                                    <Translate contentKey="generadorApp.unidadeEasy.uf">Uf</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="unidade-easy-uf" type="text" name="uf" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="uf" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'cep' ? (
                          <Col md="cep">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="cepLabel" for="unidade-easy-cep">
                                    <Translate contentKey="generadorApp.unidadeEasy.cep">Cep</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="unidade-easy-cep" type="text" name="cep" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cep" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'regans' ? (
                          <Col md="regans">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="regansLabel" for="unidade-easy-regans">
                                    <Translate contentKey="generadorApp.unidadeEasy.regans">Regans</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="unidade-easy-regans" type="text" name="regans" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="regans" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'regcnes' ? (
                          <Col md="regcnes">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="regcnesLabel" for="unidade-easy-regcnes">
                                    <Translate contentKey="generadorApp.unidadeEasy.regcnes">Regcnes</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="unidade-easy-regcnes" type="text" name="regcnes" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="regcnes" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'tissresponsavel' ? (
                          <Col md="tissresponsavel">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="tissresponsavelLabel" for="unidade-easy-tissresponsavel">
                                    <Translate contentKey="generadorApp.unidadeEasy.tissresponsavel">Tissresponsavel</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="unidade-easy-tissresponsavel" type="text" name="tissresponsavel" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="tissresponsavel" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'tissconselho' ? (
                          <Col md="tissconselho">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="tissconselhoLabel" for="unidade-easy-tissconselho">
                                    <Translate contentKey="generadorApp.unidadeEasy.tissconselho">Tissconselho</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="unidade-easy-tissconselho" type="text" name="tissconselho" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="tissconselho" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'tissinscricao' ? (
                          <Col md="tissinscricao">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="tissinscricaoLabel" for="unidade-easy-tissinscricao">
                                    <Translate contentKey="generadorApp.unidadeEasy.tissinscricao">Tissinscricao</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="unidade-easy-tissinscricao" type="text" name="tissinscricao" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="tissinscricao" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'tisscbo' ? (
                          <Col md="tisscbo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="tisscboLabel" for="unidade-easy-tisscbo">
                                    <Translate contentKey="generadorApp.unidadeEasy.tisscbo">Tisscbo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="unidade-easy-tisscbo" type="text" name="tisscbo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="tisscbo" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'tisscoduf' ? (
                          <Col md="tisscoduf">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="tisscodufLabel" for="unidade-easy-tisscoduf">
                                    <Translate contentKey="generadorApp.unidadeEasy.tisscoduf">Tisscoduf</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="unidade-easy-tisscoduf" type="text" name="tisscoduf" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="tisscoduf" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'ativo' ? (
                          <Col md="ativo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="ativoLabel" for="unidade-easy-ativo">
                                    <Translate contentKey="generadorApp.unidadeEasy.ativo">Ativo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="unidade-easy-ativo" type="string" className="form-control" name="ativo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'categoria' ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="categoria" value={this.state.fieldsBase[baseFilters]} />
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
  categorias: storeState.categoria.entities,
  unidadeEasyEntity: storeState.unidadeEasy.entity,
  loading: storeState.unidadeEasy.loading,
  updating: storeState.unidadeEasy.updating,
  updateSuccess: storeState.unidadeEasy.updateSuccess
});

const mapDispatchToProps = {
  getCategorias,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UnidadeEasyUpdate);
