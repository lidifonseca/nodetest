/* eslint complexity: ["error", 300] */
import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import {
  IFranquiaUpdateState,
  getEntity,
  getFranquiaState,
  IFranquiaBaseState,
  updateEntity,
  createEntity,
  reset
} from './franquia.reducer';
import { IFranquia } from 'app/shared/model/franquia.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFranquiaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FranquiaUpdate extends React.Component<IFranquiaUpdateProps, IFranquiaUpdateState> {
  constructor(props: Readonly<IFranquiaUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getFranquiaState(this.props.location),
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
    let url = '_back=1' + (offset !== null ? '&offset=' + offset : '');
    Object.keys(fieldsBase).map(key => {
      url += '&' + key + '=' + fieldsBase[key];
    });
    return url;
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { franquiaEntity } = this.props;
      const entity = {
        ...franquiaEntity,

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
    this.props.history.push('/franquia?' + this.getFiltersURL());
  };

  render() {
    const { franquiaEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...franquiaEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.franquia.home.createOrEditLabel">Create or edit a Franquia</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/franquia?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Franquias</li>
            <li className="breadcrumb-item active">Franquias edit</li>
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
                        <Label className="mt-2" for="franquia-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput id="franquia-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'idCidade' ? (
                          <Col md="idCidade">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idCidadeLabel" for="franquia-idCidade">
                                    <Translate contentKey="generadorApp.franquia.idCidade">Id Cidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="franquia-idCidade" type="text" name="idCidade" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idCidade" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'nomeFantasia' ? (
                          <Col md="nomeFantasia">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="nomeFantasiaLabel" for="franquia-nomeFantasia">
                                    <Translate contentKey="generadorApp.franquia.nomeFantasia">Nome Fantasia</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="franquia-nomeFantasia" type="text" name="nomeFantasia" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="nomeFantasia" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'razaoSocial' ? (
                          <Col md="razaoSocial">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="razaoSocialLabel" for="franquia-razaoSocial">
                                    <Translate contentKey="generadorApp.franquia.razaoSocial">Razao Social</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="franquia-razaoSocial" type="text" name="razaoSocial" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="razaoSocial" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'cnpj' ? (
                          <Col md="cnpj">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="cnpjLabel" for="franquia-cnpj">
                                    <Translate contentKey="generadorApp.franquia.cnpj">Cnpj</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="franquia-cnpj" type="text" name="cnpj" />
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
                                  <Label className="mt-2" id="ieLabel" for="franquia-ie">
                                    <Translate contentKey="generadorApp.franquia.ie">Ie</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="franquia-ie" type="text" name="ie" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ie" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'site' ? (
                          <Col md="site">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="siteLabel" for="franquia-site">
                                    <Translate contentKey="generadorApp.franquia.site">Site</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="franquia-site" type="text" name="site" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="site" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'telefone1' ? (
                          <Col md="telefone1">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="telefone1Label" for="franquia-telefone1">
                                    <Translate contentKey="generadorApp.franquia.telefone1">Telefone 1</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="franquia-telefone1" type="text" name="telefone1" />
                                </Col>
                                <UncontrolledTooltip target="telefone1Label">
                                  <Translate contentKey="generadorApp.franquia.help.telefone1" />
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
                                  <Label className="mt-2" id="telefone2Label" for="franquia-telefone2">
                                    <Translate contentKey="generadorApp.franquia.telefone2">Telefone 2</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="franquia-telefone2" type="text" name="telefone2" />
                                </Col>
                                <UncontrolledTooltip target="telefone2Label">
                                  <Translate contentKey="generadorApp.franquia.help.telefone2" />
                                </UncontrolledTooltip>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="telefone2" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'celular' ? (
                          <Col md="celular">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="celularLabel" for="franquia-celular">
                                    <Translate contentKey="generadorApp.franquia.celular">Celular</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="franquia-celular" type="text" name="celular" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="celular" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'cep' ? (
                          <Col md="cep">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="cepLabel" for="franquia-cep">
                                    <Translate contentKey="generadorApp.franquia.cep">Cep</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="franquia-cep" type="text" name="cep" />
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
                                  <Label className="mt-2" id="enderecoLabel" for="franquia-endereco">
                                    <Translate contentKey="generadorApp.franquia.endereco">Endereco</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="franquia-endereco" type="text" name="endereco" />
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
                                  <Label className="mt-2" id="numeroLabel" for="franquia-numero">
                                    <Translate contentKey="generadorApp.franquia.numero">Numero</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="franquia-numero" type="text" name="numero" />
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
                                  <Label className="mt-2" id="complementoLabel" for="franquia-complemento">
                                    <Translate contentKey="generadorApp.franquia.complemento">Complemento</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="franquia-complemento" type="text" name="complemento" />
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
                                  <Label className="mt-2" id="bairroLabel" for="franquia-bairro">
                                    <Translate contentKey="generadorApp.franquia.bairro">Bairro</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="franquia-bairro" type="text" name="bairro" />
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
                                  <Label className="mt-2" id="cidadeLabel" for="franquia-cidade">
                                    <Translate contentKey="generadorApp.franquia.cidade">Cidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="franquia-cidade" type="text" name="cidade" />
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
                                  <Label className="mt-2" id="ufLabel" for="franquia-uf">
                                    <Translate contentKey="generadorApp.franquia.uf">Uf</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="franquia-uf" type="text" name="uf" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="uf" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'observacao' ? (
                          <Col md="observacao">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="observacaoLabel" for="franquia-observacao">
                                    <Translate contentKey="generadorApp.franquia.observacao">Observacao</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="franquia-observacao" type="text" name="observacao" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="observacao" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ativo' ? (
                          <Col md="ativo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="ativoLabel" for="franquia-ativo">
                                    <Translate contentKey="generadorApp.franquia.ativo">Ativo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="franquia-ativo" type="string" className="form-control" name="ativo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'franquiaAreaAtuacao' ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="franquiaAreaAtuacao" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'franquiaStatusAtual' ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="franquiaStatusAtual" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'franquiaUsuario' ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="franquiaUsuario" value={this.state.fieldsBase[baseFilters]} />
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
  franquiaEntity: storeState.franquia.entity,
  loading: storeState.franquia.loading,
  updating: storeState.franquia.updating,
  updateSuccess: storeState.franquia.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FranquiaUpdate);
