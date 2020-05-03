import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICepbrCidade } from 'app/shared/model/cepbr-cidade.model';
import { getEntities as getCepbrCidades } from 'app/entities/cepbr-cidade/cepbr-cidade.reducer';
import { ICepbrBairro } from 'app/shared/model/cepbr-bairro.model';
import { getEntities as getCepbrBairros } from 'app/entities/cepbr-bairro/cepbr-bairro.reducer';
import { getEntity, updateEntity, createEntity, reset } from './cepbr-endereco.reducer';
import { ICepbrEndereco } from 'app/shared/model/cepbr-endereco.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICepbrEnderecoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICepbrEnderecoUpdateState {
  isNew: boolean;
  idCidadeId: string;
  idBairroId: string;
}

export class CepbrEnderecoUpdate extends React.Component<ICepbrEnderecoUpdateProps, ICepbrEnderecoUpdateState> {
  constructor(props: Readonly<ICepbrEnderecoUpdateProps>) {
    super(props);
    this.state = {
      idCidadeId: '0',
      idBairroId: '0',
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

    this.props.getCepbrCidades();
    this.props.getCepbrBairros();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { cepbrEnderecoEntity } = this.props;
      const entity = {
        ...cepbrEnderecoEntity,
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
    this.props.history.push('/cepbr-endereco');
  };

  render() {
    const { cepbrEnderecoEntity, cepbrCidades, cepbrBairros, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Cepbr Enderecos</li>
          <li className="breadcrumb-item active">Cepbr Enderecos edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...cepbrEnderecoEntity,
                  idCidade: cepbrEnderecoEntity.idCidade ? cepbrEnderecoEntity.idCidade.id : null,
                  idBairro: cepbrEnderecoEntity.idBairro ? cepbrEnderecoEntity.idBairro.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.cepbrEndereco.home.createOrEditLabel">Create or edit a CepbrEndereco</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/cepbr-endereco" replace color="info" className="float-right jh-create-entity">
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
                      <Label className="mt-2" for="cepbr-endereco-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="cepbr-endereco-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cepLabel" for="cepbr-endereco-cep">
                                <Translate contentKey="generadorApp.cepbrEndereco.cep">Cep</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="cepbr-endereco-cep"
                                type="text"
                                name="cep"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
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
                              <Label className="mt-2" id="logradouroLabel" for="cepbr-endereco-logradouro">
                                <Translate contentKey="generadorApp.cepbrEndereco.logradouro">Logradouro</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="cepbr-endereco-logradouro"
                                type="text"
                                name="logradouro"
                                validate={{
                                  maxLength: { value: 200, errorMessage: translate('entity.validation.maxlength', { max: 200 }) }
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
                              <Label className="mt-2" id="tipoLogradouroLabel" for="cepbr-endereco-tipoLogradouro">
                                <Translate contentKey="generadorApp.cepbrEndereco.tipoLogradouro">Tipo Logradouro</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="cepbr-endereco-tipoLogradouro"
                                type="text"
                                name="tipoLogradouro"
                                validate={{
                                  maxLength: { value: 80, errorMessage: translate('entity.validation.maxlength', { max: 80 }) }
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
                              <Label className="mt-2" id="complementoLabel" for="cepbr-endereco-complemento">
                                <Translate contentKey="generadorApp.cepbrEndereco.complemento">Complemento</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="cepbr-endereco-complemento"
                                type="text"
                                name="complemento"
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
                              <Label className="mt-2" id="localLabel" for="cepbr-endereco-local">
                                <Translate contentKey="generadorApp.cepbrEndereco.local">Local</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="cepbr-endereco-local"
                                type="text"
                                name="local"
                                validate={{
                                  maxLength: { value: 120, errorMessage: translate('entity.validation.maxlength', { max: 120 }) }
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
                              <Label className="mt-2" for="cepbr-endereco-idCidade">
                                <Translate contentKey="generadorApp.cepbrEndereco.idCidade">Id Cidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="cepbr-endereco-idCidade" type="select" className="form-control" name="idCidade">
                                <option value="null" key="0">
                                  {translate('generadorApp.cepbrEndereco.idCidade.empty')}
                                </option>
                                {cepbrCidades
                                  ? cepbrCidades.map(otherEntity => (
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
                              <Label className="mt-2" for="cepbr-endereco-idBairro">
                                <Translate contentKey="generadorApp.cepbrEndereco.idBairro">Id Bairro</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="cepbr-endereco-idBairro" type="select" className="form-control" name="idBairro">
                                <option value="null" key="0">
                                  {translate('generadorApp.cepbrEndereco.idBairro.empty')}
                                </option>
                                {cepbrBairros
                                  ? cepbrBairros.map(otherEntity => (
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
  cepbrCidades: storeState.cepbrCidade.entities,
  cepbrBairros: storeState.cepbrBairro.entities,
  cepbrEnderecoEntity: storeState.cepbrEndereco.entity,
  loading: storeState.cepbrEndereco.loading,
  updating: storeState.cepbrEndereco.updating,
  updateSuccess: storeState.cepbrEndereco.updateSuccess
});

const mapDispatchToProps = {
  getCepbrCidades,
  getCepbrBairros,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CepbrEnderecoUpdate);
