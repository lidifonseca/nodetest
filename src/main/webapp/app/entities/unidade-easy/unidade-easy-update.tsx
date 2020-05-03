import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './unidade-easy.reducer';
import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUnidadeEasyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IUnidadeEasyUpdateState {
  isNew: boolean;
}

export class UnidadeEasyUpdate extends React.Component<IUnidadeEasyUpdateProps, IUnidadeEasyUpdateState> {
  constructor(props: Readonly<IUnidadeEasyUpdateProps>) {
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
    this.props.history.push('/unidade-easy');
  };

  render() {
    const { unidadeEasyEntity, loading, updating } = this.props;
    const { isNew } = this.state;

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
                  ...unidadeEasyEntity
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
                <Button tag={Link} id="cancel-save" to="/unidade-easy" replace color="info" className="float-right jh-create-entity">
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

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="razaoSocialLabel" for="unidade-easy-razaoSocial">
                                <Translate contentKey="generadorApp.unidadeEasy.razaoSocial">Razao Social</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="unidade-easy-razaoSocial"
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
                              <Label className="mt-2" id="nomeFantasiaLabel" for="unidade-easy-nomeFantasia">
                                <Translate contentKey="generadorApp.unidadeEasy.nomeFantasia">Nome Fantasia</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="unidade-easy-nomeFantasia"
                                type="text"
                                name="nomeFantasia"
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
                              <Label className="mt-2" id="cnpjLabel" for="unidade-easy-cnpj">
                                <Translate contentKey="generadorApp.unidadeEasy.cnpj">Cnpj</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="unidade-easy-cnpj"
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
                              <Label className="mt-2" id="ieLabel" for="unidade-easy-ie">
                                <Translate contentKey="generadorApp.unidadeEasy.ie">Ie</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="unidade-easy-ie"
                                type="text"
                                name="ie"
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
                              <Label className="mt-2" id="telefone1Label" for="unidade-easy-telefone1">
                                <Translate contentKey="generadorApp.unidadeEasy.telefone1">Telefone 1</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="unidade-easy-telefone1"
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
                              <Label className="mt-2" id="telefone2Label" for="unidade-easy-telefone2">
                                <Translate contentKey="generadorApp.unidadeEasy.telefone2">Telefone 2</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="unidade-easy-telefone2"
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
                              <Label className="mt-2" id="enderecoLabel" for="unidade-easy-endereco">
                                <Translate contentKey="generadorApp.unidadeEasy.endereco">Endereco</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="unidade-easy-endereco"
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
                              <Label className="mt-2" id="numeroLabel" for="unidade-easy-numero">
                                <Translate contentKey="generadorApp.unidadeEasy.numero">Numero</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="unidade-easy-numero"
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
                              <Label className="mt-2" id="complementoLabel" for="unidade-easy-complemento">
                                <Translate contentKey="generadorApp.unidadeEasy.complemento">Complemento</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="unidade-easy-complemento"
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
                              <Label className="mt-2" id="bairroLabel" for="unidade-easy-bairro">
                                <Translate contentKey="generadorApp.unidadeEasy.bairro">Bairro</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="unidade-easy-bairro"
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
                              <Label className="mt-2" id="cidadeLabel" for="unidade-easy-cidade">
                                <Translate contentKey="generadorApp.unidadeEasy.cidade">Cidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="unidade-easy-cidade"
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
                              <Label className="mt-2" id="ufLabel" for="unidade-easy-uf">
                                <Translate contentKey="generadorApp.unidadeEasy.uf">Uf</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="unidade-easy-uf"
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
                              <Label className="mt-2" id="cepLabel" for="unidade-easy-cep">
                                <Translate contentKey="generadorApp.unidadeEasy.cep">Cep</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="unidade-easy-cep"
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
                              <Label className="mt-2" id="regansLabel" for="unidade-easy-regans">
                                <Translate contentKey="generadorApp.unidadeEasy.regans">Regans</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="unidade-easy-regans"
                                type="text"
                                name="regans"
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
                              <Label className="mt-2" id="regcnesLabel" for="unidade-easy-regcnes">
                                <Translate contentKey="generadorApp.unidadeEasy.regcnes">Regcnes</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="unidade-easy-regcnes"
                                type="text"
                                name="regcnes"
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
                              <Label className="mt-2" id="tissresponsavelLabel" for="unidade-easy-tissresponsavel">
                                <Translate contentKey="generadorApp.unidadeEasy.tissresponsavel">Tissresponsavel</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="unidade-easy-tissresponsavel"
                                type="text"
                                name="tissresponsavel"
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
                              <Label className="mt-2" id="tissconselhoLabel" for="unidade-easy-tissconselho">
                                <Translate contentKey="generadorApp.unidadeEasy.tissconselho">Tissconselho</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="unidade-easy-tissconselho"
                                type="text"
                                name="tissconselho"
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
                              <Label className="mt-2" id="tissinscricaoLabel" for="unidade-easy-tissinscricao">
                                <Translate contentKey="generadorApp.unidadeEasy.tissinscricao">Tissinscricao</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="unidade-easy-tissinscricao"
                                type="text"
                                name="tissinscricao"
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
                              <Label className="mt-2" id="tisscboLabel" for="unidade-easy-tisscbo">
                                <Translate contentKey="generadorApp.unidadeEasy.tisscbo">Tisscbo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="unidade-easy-tisscbo"
                                type="text"
                                name="tisscbo"
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
                              <Label className="mt-2" id="tisscodufLabel" for="unidade-easy-tisscoduf">
                                <Translate contentKey="generadorApp.unidadeEasy.tisscoduf">Tisscoduf</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="unidade-easy-tisscoduf"
                                type="text"
                                name="tisscoduf"
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

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="dataPostLabel" for="unidade-easy-dataPost">
                                <Translate contentKey="generadorApp.unidadeEasy.dataPost">Data Post</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="unidade-easy-dataPost"
                                type="datetime-local"
                                className="form-control"
                                name="dataPost"
                                placeholder={'YYYY-MM-DD HH:mm'}
                                value={isNew ? null : convertDateTimeFromServer(this.props.unidadeEasyEntity.dataPost)}
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
  unidadeEasyEntity: storeState.unidadeEasy.entity,
  loading: storeState.unidadeEasy.loading,
  updating: storeState.unidadeEasy.updating,
  updateSuccess: storeState.unidadeEasy.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UnidadeEasyUpdate);
