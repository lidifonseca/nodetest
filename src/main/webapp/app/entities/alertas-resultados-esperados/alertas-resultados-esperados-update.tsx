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

import { IResultados } from 'app/shared/model/resultados.model';
import { getEntities as getResultados } from 'app/entities/resultados/resultados.reducer';
import {
  IAlertasResultadosEsperadosUpdateState,
  getEntity,
  getAlertasResultadosEsperadosState,
  IAlertasResultadosEsperadosBaseState,
  updateEntity,
  createEntity,
  reset
} from './alertas-resultados-esperados.reducer';
import { IAlertasResultadosEsperados } from 'app/shared/model/alertas-resultados-esperados.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAlertasResultadosEsperadosUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AlertasResultadosEsperadosUpdate extends React.Component<
  IAlertasResultadosEsperadosUpdateProps,
  IAlertasResultadosEsperadosUpdateState
> {
  constructor(props: Readonly<IAlertasResultadosEsperadosUpdateProps>) {
    super(props);

    this.state = {
      resultadosSelectValue: null,
      fieldsBase: getAlertasResultadosEsperadosState(this.props.location),
      resultadosId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }

    if (
      nextProps.resultados.length > 0 &&
      this.state.resultadosSelectValue === null &&
      nextProps.alertasResultadosEsperadosEntity.resultados &&
      nextProps.alertasResultadosEsperadosEntity.resultados.id
    ) {
      this.setState({
        resultadosSelectValue: nextProps.resultados.map(p =>
          nextProps.alertasResultadosEsperadosEntity.resultados.id === p.id ? { value: p.id, label: p.id } : null
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

    this.props.getResultados();
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
      const { alertasResultadosEsperadosEntity } = this.props;
      const entity = {
        ...alertasResultadosEsperadosEntity,
        resultados: this.state.resultadosSelectValue ? this.state.resultadosSelectValue['value'] : null,
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
    this.props.history.push('/alertas-resultados-esperados?' + this.getFiltersURL());
  };

  render() {
    const { alertasResultadosEsperadosEntity, resultados, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...alertasResultadosEsperadosEntity,
                  resultados: alertasResultadosEsperadosEntity.resultados ? alertasResultadosEsperadosEntity.resultados.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.alertasResultadosEsperados.home.createOrEditLabel">
                Create or edit a AlertasResultadosEsperados
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
              to={'/alertas-resultados-esperados?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Alertas Resultados Esperados</li>
            <li className="breadcrumb-item active">Alertas Resultados Esperados edit</li>
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
                        <Label className="mt-2" for="alertas-resultados-esperados-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput
                                id="alertas-resultados-esperados-id"
                                type="hidden"
                                className="form-control"
                                name="id"
                                required
                                readOnly
                              />
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
                                  <Label className="mt-2" id="pontuacaoLabel" for="alertas-resultados-esperados-pontuacao">
                                    <Translate contentKey="generadorApp.alertasResultadosEsperados.pontuacao">Pontuacao</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="alertas-resultados-esperados-pontuacao"
                                    type="string"
                                    className="form-control"
                                    name="pontuacao"
                                  />
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
                                      id="alertas-resultados-esperados-alteracaoEsperada"
                                      type="checkbox"
                                      className="form-control"
                                      name="alteracaoEsperada"
                                    />
                                    <Translate contentKey="generadorApp.alertasResultadosEsperados.alteracaoEsperada">
                                      Alteracao Esperada
                                    </Translate>
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
                                  <Label className="mt-2" id="observacoesLabel" for="alertas-resultados-esperados-observacoes">
                                    <Translate contentKey="generadorApp.alertasResultadosEsperados.observacoes">Observacoes</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="alertas-resultados-esperados-observacoes" type="text" name="observacoes" />
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
                                  <Label className="mt-2" id="usuarioIdLabel" for="alertas-resultados-esperados-usuarioId">
                                    <Translate contentKey="generadorApp.alertasResultadosEsperados.usuarioId">Usuario Id</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="alertas-resultados-esperados-usuarioId"
                                    type="string"
                                    className="form-control"
                                    name="usuarioId"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="usuarioId" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'valor' ? (
                          <Col md="valor">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="valorLabel" for="alertas-resultados-esperados-valor">
                                    <Translate contentKey="generadorApp.alertasResultadosEsperados.valor">Valor</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="alertas-resultados-esperados-valor" type="string" className="form-control" name="valor" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="valor" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'resultados' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="alertas-resultados-esperados-resultados">
                                    <Translate contentKey="generadorApp.alertasResultadosEsperados.resultados">Resultados</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="alertas-resultados-esperados-resultados"
                                    className={'css-select-control'}
                                    value={this.state.resultadosSelectValue}
                                    options={resultados ? resultados.map(option => ({ value: option.id, label: option.id })) : null}
                                    onChange={options => this.setState({ resultadosSelectValue: options })}
                                    name={'resultados'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="resultados" value={this.state.fieldsBase[baseFilters]} />
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
  resultados: storeState.resultados.entities,
  alertasResultadosEsperadosEntity: storeState.alertasResultadosEsperados.entity,
  loading: storeState.alertasResultadosEsperados.loading,
  updating: storeState.alertasResultadosEsperados.updating,
  updateSuccess: storeState.alertasResultadosEsperados.updateSuccess
});

const mapDispatchToProps = {
  getResultados,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AlertasResultadosEsperadosUpdate);
