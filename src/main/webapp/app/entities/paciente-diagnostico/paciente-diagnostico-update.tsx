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

import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';
import { ICid } from 'app/shared/model/cid.model';
import { getEntities as getCids } from 'app/entities/cid/cid.reducer';
import {
  IPacienteDiagnosticoUpdateState,
  getEntity,
  getPacienteDiagnosticoState,
  IPacienteDiagnosticoBaseState,
  updateEntity,
  createEntity,
  reset
} from './paciente-diagnostico.reducer';
import { IPacienteDiagnostico } from 'app/shared/model/paciente-diagnostico.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPacienteDiagnosticoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteDiagnosticoUpdate extends React.Component<IPacienteDiagnosticoUpdateProps, IPacienteDiagnosticoUpdateState> {
  constructor(props: Readonly<IPacienteDiagnosticoUpdateProps>) {
    super(props);

    this.state = {
      pacienteSelectValue: null,
      cidSelectValue: null,
      fieldsBase: getPacienteDiagnosticoState(this.props.location),
      pacienteId: '0',
      cId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }

    if (
      nextProps.pacientes.length > 0 &&
      this.state.pacienteSelectValue === null &&
      nextProps.pacienteDiagnosticoEntity.paciente &&
      nextProps.pacienteDiagnosticoEntity.paciente.id
    ) {
      this.setState({
        pacienteSelectValue: nextProps.pacientes.map(p =>
          nextProps.pacienteDiagnosticoEntity.paciente.id === p.id ? { value: p.id, label: p.id } : null
        )
      });
    }

    if (
      nextProps.cids.length > 0 &&
      this.state.cidSelectValue === null &&
      nextProps.pacienteDiagnosticoEntity.cid &&
      nextProps.pacienteDiagnosticoEntity.cid.id
    ) {
      this.setState({
        cidSelectValue: nextProps.cids.map(p => (nextProps.pacienteDiagnosticoEntity.cid.id === p.id ? { value: p.id, label: p.id } : null))
      });
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getPacientes();
    this.props.getCids();
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
      const { pacienteDiagnosticoEntity } = this.props;
      const entity = {
        ...pacienteDiagnosticoEntity,
        paciente: this.state.pacienteSelectValue ? this.state.pacienteSelectValue['value'] : null,
        cid: this.state.cidSelectValue ? this.state.cidSelectValue['value'] : null,
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
    this.props.history.push('/paciente-diagnostico?' + this.getFiltersURL());
  };

  render() {
    const { pacienteDiagnosticoEntity, pacientes, cids, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...pacienteDiagnosticoEntity,
                  paciente: pacienteDiagnosticoEntity.paciente ? pacienteDiagnosticoEntity.paciente.id : null,
                  c: pacienteDiagnosticoEntity.c ? pacienteDiagnosticoEntity.c.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.pacienteDiagnostico.home.createOrEditLabel">
                Create or edit a PacienteDiagnostico
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
              to={'/paciente-diagnostico?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Paciente Diagnosticos</li>
            <li className="breadcrumb-item active">Paciente Diagnosticos edit</li>
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
                        <Label className="mt-2" for="paciente-diagnostico-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput id="paciente-diagnostico-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'observacao' ? (
                          <Col md="observacao">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="observacaoLabel" for="paciente-diagnostico-observacao">
                                    <Translate contentKey="generadorApp.pacienteDiagnostico.observacao">Observacao</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-diagnostico-observacao" type="text" name="observacao" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="observacao" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ativo' ? (
                          <Col md="ativo">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="ativoLabel" check>
                                    <AvInput id="paciente-diagnostico-ativo" type="checkbox" className="form-control" name="ativo" />
                                    <Translate contentKey="generadorApp.pacienteDiagnostico.ativo">Ativo</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'cidPrimario' ? (
                          <Col md="cidPrimario">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="cidPrimarioLabel" check>
                                    <AvInput
                                      id="paciente-diagnostico-cidPrimario"
                                      type="checkbox"
                                      className="form-control"
                                      name="cidPrimario"
                                    />
                                    <Translate contentKey="generadorApp.pacienteDiagnostico.cidPrimario">Cid Primario</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cidPrimario" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'complexidade' ? (
                          <Col md="complexidade">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="complexidadeLabel" for="paciente-diagnostico-complexidade">
                                    <Translate contentKey="generadorApp.pacienteDiagnostico.complexidade">Complexidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-diagnostico-complexidade" type="text" name="complexidade" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="complexidade" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'cidComAlta' ? (
                          <Col md="cidComAlta">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="cidComAltaLabel" check>
                                    <AvInput
                                      id="paciente-diagnostico-cidComAlta"
                                      type="checkbox"
                                      className="form-control"
                                      name="cidComAlta"
                                    />
                                    <Translate contentKey="generadorApp.pacienteDiagnostico.cidComAlta">Cid Com Alta</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cidComAlta" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'paciente' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="paciente-diagnostico-paciente">
                                    <Translate contentKey="generadorApp.pacienteDiagnostico.paciente">Paciente</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="paciente-diagnostico-paciente"
                                    className={'css-select-control'}
                                    value={this.state.pacienteSelectValue}
                                    options={pacientes ? pacientes.map(option => ({ value: option.id, label: option.id })) : null}
                                    onChange={options => this.setState({ pacienteSelectValue: options })}
                                    name={'paciente'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="paciente" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'c' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="paciente-diagnostico-c">
                                    <Translate contentKey="generadorApp.pacienteDiagnostico.c">C</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="paciente-diagnostico-c"
                                    className={'css-select-control'}
                                    value={this.state.cidSelectValue}
                                    options={cids ? cids.map(option => ({ value: option.id, label: option.id })) : null}
                                    onChange={options => this.setState({ cidSelectValue: options })}
                                    name={'c'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="c" value={this.state.fieldsBase[baseFilters]} />
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
  pacientes: storeState.paciente.entities,
  cids: storeState.cid.entities,
  pacienteDiagnosticoEntity: storeState.pacienteDiagnostico.entity,
  loading: storeState.pacienteDiagnostico.loading,
  updating: storeState.pacienteDiagnostico.updating,
  updateSuccess: storeState.pacienteDiagnostico.updateSuccess
});

const mapDispatchToProps = {
  getPacientes,
  getCids,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteDiagnosticoUpdate);
