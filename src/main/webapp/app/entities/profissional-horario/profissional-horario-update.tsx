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
  IProfissionalHorarioUpdateState,
  getEntity,
  getProfissionalHorarioState,
  IProfissionalHorarioBaseState,
  updateEntity,
  createEntity,
  reset
} from './profissional-horario.reducer';
import { IProfissionalHorario } from 'app/shared/model/profissional-horario.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProfissionalHorarioUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProfissionalHorarioUpdate extends React.Component<IProfissionalHorarioUpdateProps, IProfissionalHorarioUpdateState> {
  constructor(props: Readonly<IProfissionalHorarioUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getProfissionalHorarioState(this.props.location),
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
      (fieldsBase['idAtendimento'] ? '&idAtendimento=' + fieldsBase['idAtendimento'] : '') +
      (fieldsBase['idProfissional'] ? '&idProfissional=' + fieldsBase['idProfissional'] : '') +
      (fieldsBase['horario'] ? '&horario=' + fieldsBase['horario'] : '') +
      (fieldsBase['confirm'] ? '&confirm=' + fieldsBase['confirm'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    values.horario = convertDateTimeToServer(values.horario);

    if (errors.length === 0) {
      const { profissionalHorarioEntity } = this.props;
      const entity = {
        ...profissionalHorarioEntity,
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
    this.props.history.push('/profissional-horario?' + this.getFiltersURL());
  };

  render() {
    const { profissionalHorarioEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Profissional Horarios</li>
          <li className="breadcrumb-item active">Profissional Horarios edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...profissionalHorarioEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.profissionalHorario.home.createOrEditLabel">
                    Create or edit a ProfissionalHorario
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
                  to={'/profissional-horario?' + this.getFiltersURL()}
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
                      <Label className="mt-2" for="profissional-horario-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="profissional-horario-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'idAtendimento' ? (
                          <Col md="idAtendimento">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idAtendimentoLabel" for="profissional-horario-idAtendimento">
                                    <Translate contentKey="generadorApp.profissionalHorario.idAtendimento">Id Atendimento</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="profissional-horario-idAtendimento"
                                    type="string"
                                    className="form-control"
                                    name="idAtendimento"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idAtendimento" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'idProfissional' ? (
                          <Col md="idProfissional">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idProfissionalLabel" for="profissional-horario-idProfissional">
                                    <Translate contentKey="generadorApp.profissionalHorario.idProfissional">Id Profissional</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="profissional-horario-idProfissional"
                                    type="string"
                                    className="form-control"
                                    name="idProfissional"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idProfissional" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'horario' ? (
                          <Col md="horario">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="horarioLabel" for="profissional-horario-horario">
                                    <Translate contentKey="generadorApp.profissionalHorario.horario">Horario</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput
                                    id="profissional-horario-horario"
                                    type="datetime-local"
                                    className="form-control"
                                    name="horario"
                                    placeholder={'YYYY-MM-DD HH:mm'}
                                    value={isNew ? null : convertDateTimeFromServer(this.props.profissionalHorarioEntity.horario)}
                                    validate={{
                                      required: { value: true, errorMessage: translate('entity.validation.required') }
                                    }}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="horario" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'confirm' ? (
                          <Col md="confirm">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="confirmLabel" for="profissional-horario-confirm">
                                    <Translate contentKey="generadorApp.profissionalHorario.confirm">Confirm</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-horario-confirm" type="string" className="form-control" name="confirm" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="confirm" value={this.state.fieldsBase[baseFilters]} />
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
  profissionalHorarioEntity: storeState.profissionalHorario.entity,
  loading: storeState.profissionalHorario.loading,
  updating: storeState.profissionalHorario.updating,
  updateSuccess: storeState.profissionalHorario.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalHorarioUpdate);
