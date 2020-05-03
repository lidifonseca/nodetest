import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IIndicadores } from 'app/shared/model/indicadores.model';
import { getEntities as getIndicadores } from 'app/entities/indicadores/indicadores.reducer';
import { getEntity, updateEntity, createEntity, reset } from './indicadores-valores.reducer';
import { IIndicadoresValores } from 'app/shared/model/indicadores-valores.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IIndicadoresValoresUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IIndicadoresValoresUpdateState {
  isNew: boolean;
  indicadoresIdId: string;
}

export class IndicadoresValoresUpdate extends React.Component<IIndicadoresValoresUpdateProps, IIndicadoresValoresUpdateState> {
  constructor(props: Readonly<IIndicadoresValoresUpdateProps>) {
    super(props);
    this.state = {
      indicadoresIdId: '0',
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

    this.props.getIndicadores();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { indicadoresValoresEntity } = this.props;
      const entity = {
        ...indicadoresValoresEntity,
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
    this.props.history.push('/indicadores-valores');
  };

  render() {
    const { indicadoresValoresEntity, indicadores, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Indicadores Valores</li>
          <li className="breadcrumb-item active">Indicadores Valores edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...indicadoresValoresEntity,
                  indicadoresId: indicadoresValoresEntity.indicadoresId ? indicadoresValoresEntity.indicadoresId.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.indicadoresValores.home.createOrEditLabel">
                    Create or edit a IndicadoresValores
                  </Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/indicadores-valores" replace color="info" className="float-right jh-create-entity">
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
                      <Label className="mt-2" for="indicadores-valores-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="indicadores-valores-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="sexoLabel" for="indicadores-valores-sexo">
                                <Translate contentKey="generadorApp.indicadoresValores.sexo">Sexo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="indicadores-valores-sexo"
                                type="text"
                                name="sexo"
                                validate={{
                                  maxLength: { value: 45, errorMessage: translate('entity.validation.maxlength', { max: 45 }) }
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
                              <Label className="mt-2" id="vlMinimoLabel" for="indicadores-valores-vlMinimo">
                                <Translate contentKey="generadorApp.indicadoresValores.vlMinimo">Vl Minimo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="indicadores-valores-vlMinimo"
                                type="text"
                                name="vlMinimo"
                                validate={{
                                  maxLength: { value: 45, errorMessage: translate('entity.validation.maxlength', { max: 45 }) }
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
                              <Label className="mt-2" id="vlMaximoLabel" for="indicadores-valores-vlMaximo">
                                <Translate contentKey="generadorApp.indicadoresValores.vlMaximo">Vl Maximo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="indicadores-valores-vlMaximo"
                                type="text"
                                name="vlMaximo"
                                validate={{
                                  maxLength: { value: 45, errorMessage: translate('entity.validation.maxlength', { max: 45 }) }
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
                              <Label className="mt-2" id="unidadeMedidaLabel" for="indicadores-valores-unidadeMedida">
                                <Translate contentKey="generadorApp.indicadoresValores.unidadeMedida">Unidade Medida</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="indicadores-valores-unidadeMedida"
                                type="text"
                                name="unidadeMedida"
                                validate={{
                                  maxLength: { value: 45, errorMessage: translate('entity.validation.maxlength', { max: 45 }) }
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
                              <Label className="mt-2" id="idadeMinimaLabel" for="indicadores-valores-idadeMinima">
                                <Translate contentKey="generadorApp.indicadoresValores.idadeMinima">Idade Minima</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="indicadores-valores-idadeMinima"
                                type="text"
                                name="idadeMinima"
                                validate={{
                                  maxLength: { value: 45, errorMessage: translate('entity.validation.maxlength', { max: 45 }) }
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
                              <Label className="mt-2" id="idadeMaximaLabel" for="indicadores-valores-idadeMaxima">
                                <Translate contentKey="generadorApp.indicadoresValores.idadeMaxima">Idade Maxima</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="indicadores-valores-idadeMaxima"
                                type="text"
                                name="idadeMaxima"
                                validate={{
                                  maxLength: { value: 45, errorMessage: translate('entity.validation.maxlength', { max: 45 }) }
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
                              <Label className="mt-2" for="indicadores-valores-indicadoresId">
                                <Translate contentKey="generadorApp.indicadoresValores.indicadoresId">Indicadores Id</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="indicadores-valores-indicadoresId" type="select" className="form-control" name="indicadoresId">
                                <option value="null" key="0">
                                  {translate('generadorApp.indicadoresValores.indicadoresId.empty')}
                                </option>
                                {indicadores
                                  ? indicadores.map(otherEntity => (
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
  indicadores: storeState.indicadores.entities,
  indicadoresValoresEntity: storeState.indicadoresValores.entity,
  loading: storeState.indicadoresValores.loading,
  updating: storeState.indicadoresValores.updating,
  updateSuccess: storeState.indicadoresValores.updateSuccess
});

const mapDispatchToProps = {
  getIndicadores,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(IndicadoresValoresUpdate);
