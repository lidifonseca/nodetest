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
  IPacienteMotivoInternacaoUpdateState,
  getEntity,
  getPacienteMotivoInternacaoState,
  IPacienteMotivoInternacaoBaseState,
  updateEntity,
  createEntity,
  reset
} from './paciente-motivo-internacao.reducer';
import { IPacienteMotivoInternacao } from 'app/shared/model/paciente-motivo-internacao.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPacienteMotivoInternacaoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteMotivoInternacaoUpdate extends React.Component<
  IPacienteMotivoInternacaoUpdateProps,
  IPacienteMotivoInternacaoUpdateState
> {
  constructor(props: Readonly<IPacienteMotivoInternacaoUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getPacienteMotivoInternacaoState(this.props.location),
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
      const { pacienteMotivoInternacaoEntity } = this.props;
      const entity = {
        ...pacienteMotivoInternacaoEntity,

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
    this.props.history.push('/paciente-motivo-internacao?' + this.getFiltersURL());
  };

  render() {
    const { pacienteMotivoInternacaoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...pacienteMotivoInternacaoEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.pacienteMotivoInternacao.home.createOrEditLabel">
                Create or edit a PacienteMotivoInternacao
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
              to={'/paciente-motivo-internacao?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Paciente Motivo Internacaos</li>
            <li className="breadcrumb-item active">Paciente Motivo Internacaos edit</li>
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
                      <Label className="mt-2" for="paciente-motivo-internacao-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput
                                id="paciente-motivo-internacao-id"
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
                        <IdPacienteComponentUpdate baseFilters />

                        <IdMotivoInternacaoComponentUpdate baseFilters />
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
  pacienteMotivoInternacaoEntity: storeState.pacienteMotivoInternacao.entity,
  loading: storeState.pacienteMotivoInternacao.loading,
  updating: storeState.pacienteMotivoInternacao.updating,
  updateSuccess: storeState.pacienteMotivoInternacao.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const IdPacienteComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'idPaciente' ? (
    <Col md="idPaciente">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="idPacienteLabel" for="paciente-motivo-internacao-idPaciente">
              <Translate contentKey="generadorApp.pacienteMotivoInternacao.idPaciente">Id Paciente</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="paciente-motivo-internacao-idPaciente" type="string" className="form-control" name="idPaciente" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="idPaciente" value={this.state.fieldsBase[baseFilters]} />
  );
};

const IdMotivoInternacaoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'idMotivoInternacao' ? (
    <Col md="idMotivoInternacao">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="idMotivoInternacaoLabel" for="paciente-motivo-internacao-idMotivoInternacao">
              <Translate contentKey="generadorApp.pacienteMotivoInternacao.idMotivoInternacao">Id Motivo Internacao</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="paciente-motivo-internacao-idMotivoInternacao" type="string" className="form-control" name="idMotivoInternacao" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="idMotivoInternacao" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PacienteMotivoInternacaoUpdate);
