import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IJunhoUpdateState, getEntity, getJunhoState, IJunhoBaseState, updateEntity, createEntity, reset } from './junho.reducer';
import { IJunho } from 'app/shared/model/junho.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IJunhoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class JunhoUpdate extends React.Component<IJunhoUpdateProps, IJunhoUpdateState> {
  constructor(props: Readonly<IJunhoUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getJunhoState(this.props.location),
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
      (fieldsBase['idFranquia'] ? '&idFranquia=' + fieldsBase['idFranquia'] : '') +
      (fieldsBase['idPaciente'] ? '&idPaciente=' + fieldsBase['idPaciente'] : '') +
      (fieldsBase['nroPad'] ? '&nroPad=' + fieldsBase['nroPad'] : '') +
      (fieldsBase['dataInicio'] ? '&dataInicio=' + fieldsBase['dataInicio'] : '') +
      (fieldsBase['dataFim'] ? '&dataFim=' + fieldsBase['dataFim'] : '') +
      (fieldsBase['idEspecialidade'] ? '&idEspecialidade=' + fieldsBase['idEspecialidade'] : '') +
      (fieldsBase['idPeriodicidade'] ? '&idPeriodicidade=' + fieldsBase['idPeriodicidade'] : '') +
      (fieldsBase['idPeriodo'] ? '&idPeriodo=' + fieldsBase['idPeriodo'] : '') +
      (fieldsBase['qtdSessoes'] ? '&qtdSessoes=' + fieldsBase['qtdSessoes'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { junhoEntity } = this.props;
      const entity = {
        ...junhoEntity,
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
    this.props.history.push('/junho?' + this.getFiltersURL());
  };

  render() {
    const { junhoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Junhos</li>
          <li className="breadcrumb-item active">Junhos edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...junhoEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.junho.home.createOrEditLabel">Create or edit a Junho</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button
                  tag={Link}
                  id="cancel-save"
                  to={'/junho?' + this.getFiltersURL()}
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
                      <Label className="mt-2" for="junho-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="junho-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'idFranquia' ? (
                          <Col md="idFranquia">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idFranquiaLabel" for="junho-idFranquia">
                                    <Translate contentKey="generadorApp.junho.idFranquia">Id Franquia</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="junho-idFranquia" type="string" className="form-control" name="idFranquia" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idFranquia" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'idPaciente' ? (
                          <Col md="idPaciente">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idPacienteLabel" for="junho-idPaciente">
                                    <Translate contentKey="generadorApp.junho.idPaciente">Id Paciente</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="junho-idPaciente" type="string" className="form-control" name="idPaciente" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idPaciente" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'nroPad' ? (
                          <Col md="nroPad">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="nroPadLabel" for="junho-nroPad">
                                    <Translate contentKey="generadorApp.junho.nroPad">Nro Pad</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="junho-nroPad" type="text" name="nroPad" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="nroPad" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'dataInicio' ? (
                          <Col md="dataInicio">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="dataInicioLabel" for="junho-dataInicio">
                                    <Translate contentKey="generadorApp.junho.dataInicio">Data Inicio</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="junho-dataInicio" type="text" name="dataInicio" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="dataInicio" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'dataFim' ? (
                          <Col md="dataFim">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="dataFimLabel" for="junho-dataFim">
                                    <Translate contentKey="generadorApp.junho.dataFim">Data Fim</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="junho-dataFim" type="text" name="dataFim" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="dataFim" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'idEspecialidade' ? (
                          <Col md="idEspecialidade">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idEspecialidadeLabel" for="junho-idEspecialidade">
                                    <Translate contentKey="generadorApp.junho.idEspecialidade">Id Especialidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="junho-idEspecialidade" type="string" className="form-control" name="idEspecialidade" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idEspecialidade" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'idPeriodicidade' ? (
                          <Col md="idPeriodicidade">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idPeriodicidadeLabel" for="junho-idPeriodicidade">
                                    <Translate contentKey="generadorApp.junho.idPeriodicidade">Id Periodicidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="junho-idPeriodicidade" type="string" className="form-control" name="idPeriodicidade" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idPeriodicidade" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'idPeriodo' ? (
                          <Col md="idPeriodo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idPeriodoLabel" for="junho-idPeriodo">
                                    <Translate contentKey="generadorApp.junho.idPeriodo">Id Periodo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="junho-idPeriodo" type="string" className="form-control" name="idPeriodo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idPeriodo" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'qtdSessoes' ? (
                          <Col md="qtdSessoes">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="qtdSessoesLabel" for="junho-qtdSessoes">
                                    <Translate contentKey="generadorApp.junho.qtdSessoes">Qtd Sessoes</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="junho-qtdSessoes" type="string" className="form-control" name="qtdSessoes" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="qtdSessoes" value={this.state.fieldsBase[baseFilters]} />
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
  junhoEntity: storeState.junho.entity,
  loading: storeState.junho.loading,
  updating: storeState.junho.updating,
  updateSuccess: storeState.junho.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(JunhoUpdate);
