import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import {
  ICepbrEnderecoUpdateState,
  getEntity,
  getCepbrEnderecoState,
  ICepbrEnderecoBaseState,
  updateEntity,
  createEntity,
  reset
} from './cepbr-endereco.reducer';
import { ICepbrEndereco } from 'app/shared/model/cepbr-endereco.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICepbrEnderecoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CepbrEnderecoUpdate extends React.Component<ICepbrEnderecoUpdateProps, ICepbrEnderecoUpdateState> {
  constructor(props: Readonly<ICepbrEnderecoUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getCepbrEnderecoState(this.props.location),
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
      (fieldsBase['cep'] ? '&cep=' + fieldsBase['cep'] : '') +
      (fieldsBase['logradouro'] ? '&logradouro=' + fieldsBase['logradouro'] : '') +
      (fieldsBase['tipoLogradouro'] ? '&tipoLogradouro=' + fieldsBase['tipoLogradouro'] : '') +
      (fieldsBase['complemento'] ? '&complemento=' + fieldsBase['complemento'] : '') +
      (fieldsBase['local'] ? '&local=' + fieldsBase['local'] : '') +
      ''
    );
  };
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
    this.props.history.push('/cepbr-endereco?' + this.getFiltersURL());
  };

  render() {
    const { cepbrEnderecoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
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
                  ...cepbrEnderecoEntity
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
                <Button
                  tag={Link}
                  id="cancel-save"
                  to={'/cepbr-endereco?' + this.getFiltersURL()}
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
                      <Row>
                        {baseFilters !== 'cep' ? (
                          <Col md="cep">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="cepLabel" for="cepbr-endereco-cep">
                                    <Translate contentKey="generadorApp.cepbrEndereco.cep">Cep</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="cepbr-endereco-cep" type="text" name="cep" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cep" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'logradouro' ? (
                          <Col md="logradouro">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="logradouroLabel" for="cepbr-endereco-logradouro">
                                    <Translate contentKey="generadorApp.cepbrEndereco.logradouro">Logradouro</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="cepbr-endereco-logradouro" type="text" name="logradouro" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="logradouro" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'tipoLogradouro' ? (
                          <Col md="tipoLogradouro">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="tipoLogradouroLabel" for="cepbr-endereco-tipoLogradouro">
                                    <Translate contentKey="generadorApp.cepbrEndereco.tipoLogradouro">Tipo Logradouro</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="cepbr-endereco-tipoLogradouro" type="text" name="tipoLogradouro" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="tipoLogradouro" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'complemento' ? (
                          <Col md="complemento">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="complementoLabel" for="cepbr-endereco-complemento">
                                    <Translate contentKey="generadorApp.cepbrEndereco.complemento">Complemento</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="cepbr-endereco-complemento" type="text" name="complemento" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="complemento" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'local' ? (
                          <Col md="local">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="localLabel" for="cepbr-endereco-local">
                                    <Translate contentKey="generadorApp.cepbrEndereco.local">Local</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="cepbr-endereco-local" type="text" name="local" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="local" value={this.state.fieldsBase[baseFilters]} />
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
  cepbrEnderecoEntity: storeState.cepbrEndereco.entity,
  loading: storeState.cepbrEndereco.loading,
  updating: storeState.cepbrEndereco.updating,
  updateSuccess: storeState.cepbrEndereco.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CepbrEnderecoUpdate);
