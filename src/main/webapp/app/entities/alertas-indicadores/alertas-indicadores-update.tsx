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
      fieldsBase: getAlertasIndicadoresState(this.props.location),
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
      (fieldsBase['pontuacao'] ? '&pontuacao=' + fieldsBase['pontuacao'] : '') +
      (fieldsBase['alteracaoEsperada'] ? '&alteracaoEsperada=' + fieldsBase['alteracaoEsperada'] : '') +
      (fieldsBase['observacoes'] ? '&observacoes=' + fieldsBase['observacoes'] : '') +
      (fieldsBase['usuarioId'] ? '&usuarioId=' + fieldsBase['usuarioId'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { alertasIndicadoresEntity } = this.props;
      const entity = {
        ...alertasIndicadoresEntity,
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
    const { alertasIndicadoresEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Alertas Indicadores</li>
          <li className="breadcrumb-item active">Alertas Indicadores edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...alertasIndicadoresEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.alertasIndicadores.home.createOrEditLabel">
                    Create or edit a AlertasIndicadores
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
  alertasIndicadoresEntity: storeState.alertasIndicadores.entity,
  loading: storeState.alertasIndicadores.loading,
  updating: storeState.alertasIndicadores.updating,
  updateSuccess: storeState.alertasIndicadores.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AlertasIndicadoresUpdate);
