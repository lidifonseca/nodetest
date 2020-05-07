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
  IIndicadoresValoresUpdateState,
  getEntity,
  getIndicadoresValoresState,
  IIndicadoresValoresBaseState,
  updateEntity,
  createEntity,
  reset
} from './indicadores-valores.reducer';
import { IIndicadoresValores } from 'app/shared/model/indicadores-valores.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IIndicadoresValoresUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class IndicadoresValoresUpdate extends React.Component<IIndicadoresValoresUpdateProps, IIndicadoresValoresUpdateState> {
  constructor(props: Readonly<IIndicadoresValoresUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getIndicadoresValoresState(this.props.location),
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
      (fieldsBase['sexo'] ? '&sexo=' + fieldsBase['sexo'] : '') +
      (fieldsBase['vlMinimo'] ? '&vlMinimo=' + fieldsBase['vlMinimo'] : '') +
      (fieldsBase['vlMaximo'] ? '&vlMaximo=' + fieldsBase['vlMaximo'] : '') +
      (fieldsBase['unidadeMedida'] ? '&unidadeMedida=' + fieldsBase['unidadeMedida'] : '') +
      (fieldsBase['idadeMinima'] ? '&idadeMinima=' + fieldsBase['idadeMinima'] : '') +
      (fieldsBase['idadeMaxima'] ? '&idadeMaxima=' + fieldsBase['idadeMaxima'] : '') +
      ''
    );
  };
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
    this.props.history.push('/indicadores-valores?' + this.getFiltersURL());
  };

  render() {
    const { indicadoresValoresEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
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
                  ...indicadoresValoresEntity
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
                <Button
                  tag={Link}
                  id="cancel-save"
                  to={'/indicadores-valores?' + this.getFiltersURL()}
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
                      <Row>
                        {baseFilters !== 'sexo' ? (
                          <Col md="sexo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="sexoLabel" for="indicadores-valores-sexo">
                                    <Translate contentKey="generadorApp.indicadoresValores.sexo">Sexo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="indicadores-valores-sexo" type="text" name="sexo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="sexo" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'vlMinimo' ? (
                          <Col md="vlMinimo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="vlMinimoLabel" for="indicadores-valores-vlMinimo">
                                    <Translate contentKey="generadorApp.indicadoresValores.vlMinimo">Vl Minimo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="indicadores-valores-vlMinimo" type="text" name="vlMinimo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="vlMinimo" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'vlMaximo' ? (
                          <Col md="vlMaximo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="vlMaximoLabel" for="indicadores-valores-vlMaximo">
                                    <Translate contentKey="generadorApp.indicadoresValores.vlMaximo">Vl Maximo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="indicadores-valores-vlMaximo" type="text" name="vlMaximo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="vlMaximo" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'unidadeMedida' ? (
                          <Col md="unidadeMedida">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="unidadeMedidaLabel" for="indicadores-valores-unidadeMedida">
                                    <Translate contentKey="generadorApp.indicadoresValores.unidadeMedida">Unidade Medida</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="indicadores-valores-unidadeMedida" type="text" name="unidadeMedida" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="unidadeMedida" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'idadeMinima' ? (
                          <Col md="idadeMinima">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idadeMinimaLabel" for="indicadores-valores-idadeMinima">
                                    <Translate contentKey="generadorApp.indicadoresValores.idadeMinima">Idade Minima</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="indicadores-valores-idadeMinima" type="text" name="idadeMinima" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idadeMinima" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'idadeMaxima' ? (
                          <Col md="idadeMaxima">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idadeMaximaLabel" for="indicadores-valores-idadeMaxima">
                                    <Translate contentKey="generadorApp.indicadoresValores.idadeMaxima">Idade Maxima</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="indicadores-valores-idadeMaxima" type="text" name="idadeMaxima" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idadeMaxima" value={this.state.fieldsBase[baseFilters]} />
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
  indicadoresValoresEntity: storeState.indicadoresValores.entity,
  loading: storeState.indicadoresValores.loading,
  updating: storeState.indicadoresValores.updating,
  updateSuccess: storeState.indicadoresValores.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(IndicadoresValoresUpdate);
