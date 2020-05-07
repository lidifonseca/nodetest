import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IJulhoUpdateState, getEntity, getJulhoState, IJulhoBaseState, updateEntity, createEntity, reset } from './julho.reducer';
import { IJulho } from 'app/shared/model/julho.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IJulhoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class JulhoUpdate extends React.Component<IJulhoUpdateProps, IJulhoUpdateState> {
  constructor(props: Readonly<IJulhoUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getJulhoState(this.props.location),
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
      (fieldsBase['dataInicio'] ? '&dataInicio=' + fieldsBase['dataInicio'] : '') +
      (fieldsBase['dataFim'] ? '&dataFim=' + fieldsBase['dataFim'] : '') +
      (fieldsBase['especialidade'] ? '&especialidade=' + fieldsBase['especialidade'] : '') +
      (fieldsBase['periodicidade'] ? '&periodicidade=' + fieldsBase['periodicidade'] : '') +
      (fieldsBase['periodo'] ? '&periodo=' + fieldsBase['periodo'] : '') +
      (fieldsBase['qtd'] ? '&qtd=' + fieldsBase['qtd'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { julhoEntity } = this.props;
      const entity = {
        ...julhoEntity,
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
    this.props.history.push('/julho?' + this.getFiltersURL());
  };

  render() {
    const { julhoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Julhos</li>
          <li className="breadcrumb-item active">Julhos edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...julhoEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.julho.home.createOrEditLabel">Create or edit a Julho</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button
                  tag={Link}
                  id="cancel-save"
                  to={'/julho?' + this.getFiltersURL()}
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
                      <Label className="mt-2" for="julho-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="julho-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'dataInicio' ? (
                          <Col md="dataInicio">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="dataInicioLabel" for="julho-dataInicio">
                                    <Translate contentKey="generadorApp.julho.dataInicio">Data Inicio</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="julho-dataInicio" type="text" name="dataInicio" />
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
                                  <Label className="mt-2" id="dataFimLabel" for="julho-dataFim">
                                    <Translate contentKey="generadorApp.julho.dataFim">Data Fim</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="julho-dataFim" type="text" name="dataFim" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="dataFim" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'especialidade' ? (
                          <Col md="especialidade">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="especialidadeLabel" for="julho-especialidade">
                                    <Translate contentKey="generadorApp.julho.especialidade">Especialidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="julho-especialidade" type="string" className="form-control" name="especialidade" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="especialidade" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'periodicidade' ? (
                          <Col md="periodicidade">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="periodicidadeLabel" for="julho-periodicidade">
                                    <Translate contentKey="generadorApp.julho.periodicidade">Periodicidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="julho-periodicidade" type="string" className="form-control" name="periodicidade" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="periodicidade" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'periodo' ? (
                          <Col md="periodo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="periodoLabel" for="julho-periodo">
                                    <Translate contentKey="generadorApp.julho.periodo">Periodo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="julho-periodo" type="string" className="form-control" name="periodo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="periodo" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'qtd' ? (
                          <Col md="qtd">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="qtdLabel" for="julho-qtd">
                                    <Translate contentKey="generadorApp.julho.qtd">Qtd</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="julho-qtd" type="string" className="form-control" name="qtd" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="qtd" value={this.state.fieldsBase[baseFilters]} />
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
  julhoEntity: storeState.julho.entity,
  loading: storeState.julho.loading,
  updating: storeState.julho.updating,
  updateSuccess: storeState.julho.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(JulhoUpdate);
