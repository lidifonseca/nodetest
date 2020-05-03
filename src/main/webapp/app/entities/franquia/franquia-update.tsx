import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './franquia.reducer';
import { IFranquia } from 'app/shared/model/franquia.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFranquiaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IFranquiaUpdateState {
  isNew: boolean;
}

export class FranquiaUpdate extends React.Component<IFranquiaUpdateProps, IFranquiaUpdateState> {
  constructor(props: Readonly<IFranquiaUpdateProps>) {
    super(props);
    this.state = {
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

  saveEntity = (event: any, errors: any, values: any) => {
    values.dataPost = convertDateTimeToServer(values.dataPost);

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
    this.props.history.push('/franquia');
  };

  render() {
    const { franquiaEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Franquias</li>
          <li className="breadcrumb-item active">Franquias edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
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
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.franquia.home.createOrEditLabel">Create or edit a Franquia</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/franquia" replace color="info" className="float-right jh-create-entity">
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

                      <Col md="12">
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

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="nomeFantasiaLabel" for="franquia-nomeFantasia">
                                <Translate contentKey="generadorApp.franquia.nomeFantasia">Nome Fantasia</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="franquia-nomeFantasia"
                                type="text"
                                name="nomeFantasia"
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
                              <Label className="mt-2" id="razaoSocialLabel" for="franquia-razaoSocial">
                                <Translate contentKey="generadorApp.franquia.razaoSocial">Razao Social</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="franquia-razaoSocial"
                                type="text"
                                name="razaoSocial"
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
                              <Label className="mt-2" id="cnpjLabel" for="franquia-cnpj">
                                <Translate contentKey="generadorApp.franquia.cnpj">Cnpj</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="franquia-cnpj"
                                type="text"
                                name="cnpj"
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
                              <Label className="mt-2" id="ieLabel" for="franquia-ie">
                                <Translate contentKey="generadorApp.franquia.ie">Ie</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="franquia-ie"
                                type="text"
                                name="ie"
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
                              <Label className="mt-2" id="siteLabel" for="franquia-site">
                                <Translate contentKey="generadorApp.franquia.site">Site</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="franquia-site"
                                type="text"
                                name="site"
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
                              <Label className="mt-2" id="telefone1Label" for="franquia-telefone1">
                                <Translate contentKey="generadorApp.franquia.telefone1">Telefone 1</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="franquia-telefone1"
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
                              <Label className="mt-2" id="telefone2Label" for="franquia-telefone2">
                                <Translate contentKey="generadorApp.franquia.telefone2">Telefone 2</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="franquia-telefone2"
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
                              <Label className="mt-2" id="celularLabel" for="franquia-celular">
                                <Translate contentKey="generadorApp.franquia.celular">Celular</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="franquia-celular"
                                type="text"
                                name="celular"
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
                              <Label className="mt-2" id="cepLabel" for="franquia-cep">
                                <Translate contentKey="generadorApp.franquia.cep">Cep</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="franquia-cep"
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
                              <Label className="mt-2" id="enderecoLabel" for="franquia-endereco">
                                <Translate contentKey="generadorApp.franquia.endereco">Endereco</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="franquia-endereco"
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
                              <Label className="mt-2" id="numeroLabel" for="franquia-numero">
                                <Translate contentKey="generadorApp.franquia.numero">Numero</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="franquia-numero"
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
                              <Label className="mt-2" id="complementoLabel" for="franquia-complemento">
                                <Translate contentKey="generadorApp.franquia.complemento">Complemento</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="franquia-complemento"
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
                              <Label className="mt-2" id="bairroLabel" for="franquia-bairro">
                                <Translate contentKey="generadorApp.franquia.bairro">Bairro</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="franquia-bairro"
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
                              <Label className="mt-2" id="cidadeLabel" for="franquia-cidade">
                                <Translate contentKey="generadorApp.franquia.cidade">Cidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="franquia-cidade"
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
                              <Label className="mt-2" id="ufLabel" for="franquia-uf">
                                <Translate contentKey="generadorApp.franquia.uf">Uf</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="franquia-uf"
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
                              <Label className="mt-2" id="observacaoLabel" for="franquia-observacao">
                                <Translate contentKey="generadorApp.franquia.observacao">Observacao</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="franquia-observacao"
                                type="text"
                                name="observacao"
                                validate={{
                                  maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
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

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="dataPostLabel" for="franquia-dataPost">
                                <Translate contentKey="generadorApp.franquia.dataPost">Data Post</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="franquia-dataPost"
                                type="datetime-local"
                                className="form-control"
                                name="dataPost"
                                placeholder={'YYYY-MM-DD HH:mm'}
                                value={isNew ? null : convertDateTimeFromServer(this.props.franquiaEntity.dataPost)}
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') }
                                }}
                              />
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
