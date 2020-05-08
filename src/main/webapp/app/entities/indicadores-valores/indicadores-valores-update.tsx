/* eslint complexity: ["error", 300] */
import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IIndicadores } from 'app/shared/model/indicadores.model';
import { getEntities as getIndicadores } from 'app/entities/indicadores/indicadores.reducer';
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
      indicadoresSelectValue: null,
      fieldsBase: getIndicadoresValoresState(this.props.location),
      indicadoresId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }

    if (
      nextProps.indicadores.length > 0 &&
      this.state.indicadoresSelectValue === null &&
      nextProps.indicadoresValoresEntity.indicadores &&
      nextProps.indicadoresValoresEntity.indicadores.id
    ) {
      this.setState({
        indicadoresSelectValue: nextProps.indicadores.map(p =>
          nextProps.indicadoresValoresEntity.indicadores.id === p.id ? { value: p.id, label: p.id } : null
        )
      });
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
      const { indicadoresValoresEntity } = this.props;
      const entity = {
        ...indicadoresValoresEntity,
        indicadores: this.state.indicadoresSelectValue ? this.state.indicadoresSelectValue['value'] : null,
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
    const { indicadoresValoresEntity, indicadores, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...indicadoresValoresEntity,
                  indicadores: indicadoresValoresEntity.indicadores ? indicadoresValoresEntity.indicadores.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.indicadoresValores.home.createOrEditLabel">Create or edit a IndicadoresValores</Translate>
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
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Inicio</Link>
            </li>
            <li className="breadcrumb-item active">Indicadores Valores</li>
            <li className="breadcrumb-item active">Indicadores Valores edit</li>
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
                        {baseFilters !== 'indicadores' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="indicadores-valores-indicadores">
                                    <Translate contentKey="generadorApp.indicadoresValores.indicadores">Indicadores</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="indicadores-valores-indicadores"
                                    className={'css-select-control'}
                                    value={this.state.indicadoresSelectValue}
                                    options={indicadores ? indicadores.map(option => ({ value: option.id, label: option.id })) : null}
                                    onChange={options => this.setState({ indicadoresSelectValue: options })}
                                    name={'indicadores'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="indicadores" value={this.state.fieldsBase[baseFilters]} />
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
