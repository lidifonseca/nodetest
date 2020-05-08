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
  IProntuarioMotivoInternacaoPsUpdateState,
  getEntity,
  getProntuarioMotivoInternacaoPsState,
  IProntuarioMotivoInternacaoPsBaseState,
  updateEntity,
  createEntity,
  reset
} from './prontuario-motivo-internacao-ps.reducer';
import { IProntuarioMotivoInternacaoPs } from 'app/shared/model/prontuario-motivo-internacao-ps.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProntuarioMotivoInternacaoPsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProntuarioMotivoInternacaoPsUpdate extends React.Component<
  IProntuarioMotivoInternacaoPsUpdateProps,
  IProntuarioMotivoInternacaoPsUpdateState
> {
  constructor(props: Readonly<IProntuarioMotivoInternacaoPsUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getProntuarioMotivoInternacaoPsState(this.props.location),
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
      const { prontuarioMotivoInternacaoPsEntity } = this.props;
      const entity = {
        ...prontuarioMotivoInternacaoPsEntity,

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
    this.props.history.push('/prontuario-motivo-internacao-ps?' + this.getFiltersURL());
  };

  render() {
    const { prontuarioMotivoInternacaoPsEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...prontuarioMotivoInternacaoPsEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.prontuarioMotivoInternacaoPs.home.createOrEditLabel">
                Create or edit a ProntuarioMotivoInternacaoPs
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
              to={'/prontuario-motivo-internacao-ps?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Prontuario Motivo Internacao Ps</li>
            <li className="breadcrumb-item active">Prontuario Motivo Internacao Ps edit</li>
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
                      <Label className="mt-2" for="prontuario-motivo-internacao-ps-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput
                                id="prontuario-motivo-internacao-ps-id"
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
                        <IdProntuarioComponentUpdate baseFilters />

                        <IdPacienteComponentUpdate baseFilters />

                        <IdMotivoComponentUpdate baseFilters />
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
  prontuarioMotivoInternacaoPsEntity: storeState.prontuarioMotivoInternacaoPs.entity,
  loading: storeState.prontuarioMotivoInternacaoPs.loading,
  updating: storeState.prontuarioMotivoInternacaoPs.updating,
  updateSuccess: storeState.prontuarioMotivoInternacaoPs.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const IdProntuarioComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'idProntuario' ? (
    <Col md="idProntuario">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="idProntuarioLabel" for="prontuario-motivo-internacao-ps-idProntuario">
              <Translate contentKey="generadorApp.prontuarioMotivoInternacaoPs.idProntuario">Id Prontuario</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="prontuario-motivo-internacao-ps-idProntuario" type="string" className="form-control" name="idProntuario" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="idProntuario" value={this.state.fieldsBase[baseFilters]} />
  );
};

const IdPacienteComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'idPaciente' ? (
    <Col md="idPaciente">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="idPacienteLabel" for="prontuario-motivo-internacao-ps-idPaciente">
              <Translate contentKey="generadorApp.prontuarioMotivoInternacaoPs.idPaciente">Id Paciente</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="prontuario-motivo-internacao-ps-idPaciente" type="string" className="form-control" name="idPaciente" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="idPaciente" value={this.state.fieldsBase[baseFilters]} />
  );
};

const IdMotivoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'idMotivo' ? (
    <Col md="idMotivo">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="idMotivoLabel" for="prontuario-motivo-internacao-ps-idMotivo">
              <Translate contentKey="generadorApp.prontuarioMotivoInternacaoPs.idMotivo">Id Motivo</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="prontuario-motivo-internacao-ps-idMotivo" type="string" className="form-control" name="idMotivo" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="idMotivo" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProntuarioMotivoInternacaoPsUpdate);
