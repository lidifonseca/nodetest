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

import { ICidXPtaNovoPadItemIndi } from 'app/shared/model/cid-x-pta-novo-pad-item-indi.model';
import { getEntities as getCidXPtaNovoPadItemIndis } from 'app/entities/cid-x-pta-novo-pad-item-indi/cid-x-pta-novo-pad-item-indi.reducer';
import {
  IAlertasIndicadoresUpdateState,
  getEntity,
  getAlertasIndicadoresState,
  IAlertasIndicadoresBaseState,
  updateEntity,
  createEntity,
  reset
} from './alertas-indicadores.reducer';
import { IAlertasIndicadores } from 'app/shared/model/alertas-indicadores.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAlertasIndicadoresUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AlertasIndicadoresUpdate extends React.Component<IAlertasIndicadoresUpdateProps, IAlertasIndicadoresUpdateState> {
  constructor(props: Readonly<IAlertasIndicadoresUpdateProps>) {
    super(props);

    this.state = {
      cidXPtaNovoPadItemIndiSelectValue: null,
      fieldsBase: getAlertasIndicadoresState(this.props.location),
      padItemIndicadoresId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }

    if (
      nextProps.cidXPtaNovoPadItemIndis.length > 0 &&
      this.state.cidXPtaNovoPadItemIndiSelectValue === null &&
      nextProps.alertasIndicadoresEntity.cidXPtaNovoPadItemIndi &&
      nextProps.alertasIndicadoresEntity.cidXPtaNovoPadItemIndi.id
    ) {
      this.setState({
        cidXPtaNovoPadItemIndiSelectValue: nextProps.cidXPtaNovoPadItemIndis.map(p =>
          nextProps.alertasIndicadoresEntity.cidXPtaNovoPadItemIndi.id === p.id ? { value: p.id, label: p.id } : null
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

    this.props.getCidXPtaNovoPadItemIndis();
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
      const { alertasIndicadoresEntity } = this.props;
      const entity = {
        ...alertasIndicadoresEntity,
        cidXPtaNovoPadItemIndi: this.state.cidXPtaNovoPadItemIndiSelectValue ? this.state.cidXPtaNovoPadItemIndiSelectValue['value'] : null,
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
    this.props.history.push('/alertas-indicadores?' + this.getFiltersURL());
  };

  render() {
    const { alertasIndicadoresEntity, cidXPtaNovoPadItemIndis, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...alertasIndicadoresEntity,
                  padItemIndicadores: alertasIndicadoresEntity.padItemIndicadores ? alertasIndicadoresEntity.padItemIndicadores.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.alertasIndicadores.home.createOrEditLabel">Create or edit a AlertasIndicadores</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/alertas-indicadores?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Alertas Indicadores</li>
            <li className="breadcrumb-item active">Alertas Indicadores edit</li>
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
                        <Label className="mt-2" for="alertas-indicadores-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput id="alertas-indicadores-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'pontuacao' ? (
                          <Col md="pontuacao">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="pontuacaoLabel" for="alertas-indicadores-pontuacao">
                                    <Translate contentKey="generadorApp.alertasIndicadores.pontuacao">Pontuacao</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="alertas-indicadores-pontuacao" type="string" className="form-control" name="pontuacao" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="pontuacao" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'alteracaoEsperada' ? (
                          <Col md="alteracaoEsperada">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="alteracaoEsperadaLabel" check>
                                    <AvInput
                                      id="alertas-indicadores-alteracaoEsperada"
                                      type="checkbox"
                                      className="form-control"
                                      name="alteracaoEsperada"
                                    />
                                    <Translate contentKey="generadorApp.alertasIndicadores.alteracaoEsperada">Alteracao Esperada</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="alteracaoEsperada" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'observacoes' ? (
                          <Col md="observacoes">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="observacoesLabel" for="alertas-indicadores-observacoes">
                                    <Translate contentKey="generadorApp.alertasIndicadores.observacoes">Observacoes</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="alertas-indicadores-observacoes" type="text" name="observacoes" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="observacoes" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'usuarioId' ? (
                          <Col md="usuarioId">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="usuarioIdLabel" for="alertas-indicadores-usuarioId">
                                    <Translate contentKey="generadorApp.alertasIndicadores.usuarioId">Usuario Id</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="alertas-indicadores-usuarioId" type="string" className="form-control" name="usuarioId" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="usuarioId" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'padItemIndicadores' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="alertas-indicadores-padItemIndicadores">
                                    <Translate contentKey="generadorApp.alertasIndicadores.padItemIndicadores">
                                      Pad Item Indicadores
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="alertas-indicadores-padItemIndicadores"
                                    className={'css-select-control'}
                                    value={this.state.cidXPtaNovoPadItemIndiSelectValue}
                                    options={
                                      cidXPtaNovoPadItemIndis
                                        ? cidXPtaNovoPadItemIndis.map(option => ({ value: option.id, label: option.id }))
                                        : null
                                    }
                                    onChange={options => this.setState({ cidXPtaNovoPadItemIndiSelectValue: options })}
                                    name={'padItemIndicadores'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="padItemIndicadores" value={this.state.fieldsBase[baseFilters]} />
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
  cidXPtaNovoPadItemIndis: storeState.cidXPtaNovoPadItemIndi.entities,
  alertasIndicadoresEntity: storeState.alertasIndicadores.entity,
  loading: storeState.alertasIndicadores.loading,
  updating: storeState.alertasIndicadores.updating,
  updateSuccess: storeState.alertasIndicadores.updateSuccess
});

const mapDispatchToProps = {
  getCidXPtaNovoPadItemIndis,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AlertasIndicadoresUpdate);
