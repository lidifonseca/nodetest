import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICepbrEstado } from 'app/shared/model/cepbr-estado.model';
import { getEntities as getCepbrEstados } from 'app/entities/cepbr-estado/cepbr-estado.reducer';
import { getEntity, updateEntity, createEntity, reset } from './cepbr-cidade.reducer';
import { ICepbrCidade } from 'app/shared/model/cepbr-cidade.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICepbrCidadeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICepbrCidadeUpdateState {
  isNew: boolean;
  ufId: string;
}

export class CepbrCidadeUpdate extends React.Component<ICepbrCidadeUpdateProps, ICepbrCidadeUpdateState> {
  constructor(props: Readonly<ICepbrCidadeUpdateProps>) {
    super(props);
    this.state = {
      ufId: '0',
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

    this.props.getCepbrEstados();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { cepbrCidadeEntity } = this.props;
      const entity = {
        ...cepbrCidadeEntity,
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
    this.props.history.push('/cepbr-cidade');
  };

  render() {
    const { cepbrCidadeEntity, cepbrEstados, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Cepbr Cidades</li>
          <li className="breadcrumb-item active">Cepbr Cidades edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...cepbrCidadeEntity,
                  uf: cepbrCidadeEntity.uf ? cepbrCidadeEntity.uf.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.cepbrCidade.home.createOrEditLabel">Create or edit a CepbrCidade</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/cepbr-cidade" replace color="info" className="float-right jh-create-entity">
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
                      <Label className="mt-2" for="cepbr-cidade-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="cepbr-cidade-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="idCidadeLabel" for="cepbr-cidade-idCidade">
                                <Translate contentKey="generadorApp.cepbrCidade.idCidade">Id Cidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="cepbr-cidade-idCidade"
                                type="string"
                                className="form-control"
                                name="idCidade"
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
                              <Label className="mt-2" id="cidadeLabel" for="cepbr-cidade-cidade">
                                <Translate contentKey="generadorApp.cepbrCidade.cidade">Cidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="cepbr-cidade-cidade"
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
                              <Label className="mt-2" id="codIbgeLabel" for="cepbr-cidade-codIbge">
                                <Translate contentKey="generadorApp.cepbrCidade.codIbge">Cod Ibge</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="cepbr-cidade-codIbge"
                                type="text"
                                name="codIbge"
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
                              <Label className="mt-2" id="areaLabel" for="cepbr-cidade-area">
                                <Translate contentKey="generadorApp.cepbrCidade.area">Area</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="cepbr-cidade-area"
                                type="string"
                                className="form-control"
                                name="area"
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
                              <Label className="mt-2" for="cepbr-cidade-uf">
                                <Translate contentKey="generadorApp.cepbrCidade.uf">Uf</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="cepbr-cidade-uf" type="select" className="form-control" name="uf">
                                <option value="null" key="0">
                                  {translate('generadorApp.cepbrCidade.uf.empty')}
                                </option>
                                {cepbrEstados
                                  ? cepbrEstados.map(otherEntity => (
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
  cepbrEstados: storeState.cepbrEstado.entities,
  cepbrCidadeEntity: storeState.cepbrCidade.entity,
  loading: storeState.cepbrCidade.loading,
  updating: storeState.cepbrCidade.updating,
  updateSuccess: storeState.cepbrCidade.updateSuccess
});

const mapDispatchToProps = {
  getCepbrEstados,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CepbrCidadeUpdate);
