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

import {
  IPacienteDispositivoComplexidadeUpdateState,
  getEntity,
  getPacienteDispositivoComplexidadeState,
  IPacienteDispositivoComplexidadeBaseState,
  updateEntity,
  createEntity,
  reset
} from './paciente-dispositivo-complexidade.reducer';
import { IPacienteDispositivoComplexidade } from 'app/shared/model/paciente-dispositivo-complexidade.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPacienteDispositivoComplexidadeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteDispositivoComplexidadeUpdate extends React.Component<
  IPacienteDispositivoComplexidadeUpdateProps,
  IPacienteDispositivoComplexidadeUpdateState
> {
  constructor(props: Readonly<IPacienteDispositivoComplexidadeUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getPacienteDispositivoComplexidadeState(this.props.location),
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
    let url = '_back=1' + (offset !== null ? '&offset=' + offset : '');
    Object.keys(fieldsBase).map(key => {
      url += '&' + key + '=' + fieldsBase[key];
    });
    return url;
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { pacienteDispositivoComplexidadeEntity } = this.props;
      const entity = {
        ...pacienteDispositivoComplexidadeEntity,

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
    this.props.history.push('/paciente-dispositivo-complexidade?' + this.getFiltersURL());
  };

  render() {
    const { pacienteDispositivoComplexidadeEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...pacienteDispositivoComplexidadeEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.pacienteDispositivoComplexidade.home.createOrEditLabel">
                Create or edit a PacienteDispositivoComplexidade
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
              to={'/paciente-dispositivo-complexidade?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Paciente Dispositivo Complexidades</li>
            <li className="breadcrumb-item active">Paciente Dispositivo Complexidades edit</li>
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
                      <Label className="mt-2" for="paciente-dispositivo-complexidade-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput
                                id="paciente-dispositivo-complexidade-id"
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
                        <CaracteristicaComponentUpdate baseFilters />

                        <AtivoComponentUpdate baseFilters />

                        <TipoComponentUpdate baseFilters />
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
  pacienteDispositivoComplexidadeEntity: storeState.pacienteDispositivoComplexidade.entity,
  loading: storeState.pacienteDispositivoComplexidade.loading,
  updating: storeState.pacienteDispositivoComplexidade.updating,
  updateSuccess: storeState.pacienteDispositivoComplexidade.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const CaracteristicaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'caracteristica' ? (
    <Col md="caracteristica">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="caracteristicaLabel" for="paciente-dispositivo-complexidade-caracteristica">
              <Translate contentKey="generadorApp.pacienteDispositivoComplexidade.caracteristica">Caracteristica</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="paciente-dispositivo-complexidade-caracteristica" type="text" name="caracteristica" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="caracteristica" value={this.state.fieldsBase[baseFilters]} />
  );
};

const AtivoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ativo' ? (
    <Col md="ativo">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="ativoLabel" for="paciente-dispositivo-complexidade-ativo">
              <Translate contentKey="generadorApp.pacienteDispositivoComplexidade.ativo">Ativo</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="paciente-dispositivo-complexidade-ativo" type="string" className="form-control" name="ativo" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
  );
};

const TipoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'tipo' ? (
    <Col md="tipo">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="tipoLabel" for="paciente-dispositivo-complexidade-tipo">
              <Translate contentKey="generadorApp.pacienteDispositivoComplexidade.tipo">Tipo</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="paciente-dispositivo-complexidade-tipo" type="text" name="tipo" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="tipo" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PacienteDispositivoComplexidadeUpdate);
