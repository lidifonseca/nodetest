import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITipoOperadora } from 'app/shared/model/tipo-operadora.model';
import { getEntities as getTipoOperadoras } from 'app/entities/tipo-operadora/tipo-operadora.reducer';
import { getEntity, updateEntity, createEntity, reset } from './operadora.reducer';
import { IOperadora } from 'app/shared/model/operadora.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IOperadoraUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IOperadoraUpdateState {
  isNew: boolean;
  idTipoOperadoraId: string;
}

export class OperadoraUpdate extends React.Component<IOperadoraUpdateProps, IOperadoraUpdateState> {
  constructor(props: Readonly<IOperadoraUpdateProps>) {
    super(props);
    this.state = {
      idTipoOperadoraId: '0',
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

    this.props.getTipoOperadoras();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { operadoraEntity } = this.props;
      const entity = {
        ...operadoraEntity,
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
    this.props.history.push('/operadora');
  };

  render() {
    const { operadoraEntity, tipoOperadoras, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Operadoras</li>
          <li className="breadcrumb-item active">Operadoras edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...operadoraEntity,
                  idTipoOperadora: operadoraEntity.idTipoOperadora ? operadoraEntity.idTipoOperadora.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.operadora.home.createOrEditLabel">Create or edit a Operadora</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/operadora" replace color="info" className="float-right jh-create-entity">
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
                      <Label className="mt-2" for="operadora-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="operadora-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="nomeFantasiaLabel" for="operadora-nomeFantasia">
                                <Translate contentKey="generadorApp.operadora.nomeFantasia">Nome Fantasia</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="operadora-nomeFantasia"
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
                              <Label className="mt-2" id="razaoSocialLabel" for="operadora-razaoSocial">
                                <Translate contentKey="generadorApp.operadora.razaoSocial">Razao Social</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="operadora-razaoSocial"
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
                              <Label className="mt-2" id="cnpjLabel" for="operadora-cnpj">
                                <Translate contentKey="generadorApp.operadora.cnpj">Cnpj</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="operadora-cnpj"
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
                              <Label className="mt-2" id="ieLabel" for="operadora-ie">
                                <Translate contentKey="generadorApp.operadora.ie">Ie</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="operadora-ie"
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
                              <Label className="mt-2" id="siteLabel" for="operadora-site">
                                <Translate contentKey="generadorApp.operadora.site">Site</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="operadora-site"
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
  tipoOperadoras: storeState.tipoOperadora.entities,
  operadoraEntity: storeState.operadora.entity,
  loading: storeState.operadora.loading,
  updating: storeState.operadora.updating,
  updateSuccess: storeState.operadora.updateSuccess
});

const mapDispatchToProps = {
  getTipoOperadoras,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OperadoraUpdate);
