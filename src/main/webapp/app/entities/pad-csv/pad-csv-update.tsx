import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPadCsvUpdateState, getEntity, getPadCsvState, IPadCsvBaseState, updateEntity, createEntity, reset } from './pad-csv.reducer';
import { IPadCsv } from 'app/shared/model/pad-csv.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPadCsvUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PadCsvUpdate extends React.Component<IPadCsvUpdateProps, IPadCsvUpdateState> {
  constructor(props: Readonly<IPadCsvUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getPadCsvState(this.props.location),
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
      const { padCsvEntity } = this.props;
      const entity = {
        ...padCsvEntity,
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
    this.props.history.push('/pad-csv?' + this.getFiltersURL());
  };

  render() {
    const { padCsvEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Csvs</li>
          <li className="breadcrumb-item active">Pad Csvs edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...padCsvEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.padCsv.home.createOrEditLabel">Create or edit a PadCsv</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button
                  tag={Link}
                  id="cancel-save"
                  to={'/pad-csv?' + this.getFiltersURL()}
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
                      <Label className="mt-2" for="pad-csv-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="pad-csv-id" type="hidden" className="form-control" name="id" required readOnly />
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
                                  <Label className="mt-2" id="idFranquiaLabel" for="pad-csv-idFranquia">
                                    <Translate contentKey="generadorApp.padCsv.idFranquia">Id Franquia</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-csv-idFranquia" type="string" className="form-control" name="idFranquia" />
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
                                  <Label className="mt-2" id="idPacienteLabel" for="pad-csv-idPaciente">
                                    <Translate contentKey="generadorApp.padCsv.idPaciente">Id Paciente</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-csv-idPaciente" type="string" className="form-control" name="idPaciente" />
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
                                  <Label className="mt-2" id="nroPadLabel" for="pad-csv-nroPad">
                                    <Translate contentKey="generadorApp.padCsv.nroPad">Nro Pad</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-csv-nroPad" type="text" name="nroPad" />
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
                                  <Label className="mt-2" id="dataInicioLabel" for="pad-csv-dataInicio">
                                    <Translate contentKey="generadorApp.padCsv.dataInicio">Data Inicio</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-csv-dataInicio" type="text" name="dataInicio" />
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
                                  <Label className="mt-2" id="dataFimLabel" for="pad-csv-dataFim">
                                    <Translate contentKey="generadorApp.padCsv.dataFim">Data Fim</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-csv-dataFim" type="text" name="dataFim" />
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
                                  <Label className="mt-2" id="idEspecialidadeLabel" for="pad-csv-idEspecialidade">
                                    <Translate contentKey="generadorApp.padCsv.idEspecialidade">Id Especialidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-csv-idEspecialidade" type="string" className="form-control" name="idEspecialidade" />
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
                                  <Label className="mt-2" id="idPeriodicidadeLabel" for="pad-csv-idPeriodicidade">
                                    <Translate contentKey="generadorApp.padCsv.idPeriodicidade">Id Periodicidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-csv-idPeriodicidade" type="string" className="form-control" name="idPeriodicidade" />
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
                                  <Label className="mt-2" id="idPeriodoLabel" for="pad-csv-idPeriodo">
                                    <Translate contentKey="generadorApp.padCsv.idPeriodo">Id Periodo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-csv-idPeriodo" type="string" className="form-control" name="idPeriodo" />
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
                                  <Label className="mt-2" id="qtdSessoesLabel" for="pad-csv-qtdSessoes">
                                    <Translate contentKey="generadorApp.padCsv.qtdSessoes">Qtd Sessoes</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-csv-qtdSessoes" type="string" className="form-control" name="qtdSessoes" />
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
  padCsvEntity: storeState.padCsv.entity,
  loading: storeState.padCsv.loading,
  updating: storeState.padCsv.updating,
  updateSuccess: storeState.padCsv.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadCsvUpdate);
