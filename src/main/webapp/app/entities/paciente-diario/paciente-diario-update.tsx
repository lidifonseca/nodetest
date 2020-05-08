import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import {
  IPacienteDiarioUpdateState,
  getEntity,
  getPacienteDiarioState,
  IPacienteDiarioBaseState,
  updateEntity,
  createEntity,
  setBlob,
  reset
} from './paciente-diario.reducer';
import { IPacienteDiario } from 'app/shared/model/paciente-diario.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPacienteDiarioUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteDiarioUpdate extends React.Component<IPacienteDiarioUpdateProps, IPacienteDiarioUpdateState> {
  historicoFileInput: React.RefObject<HTMLInputElement>;

  constructor(props: Readonly<IPacienteDiarioUpdateProps>) {
    super(props);

    this.historicoFileInput = React.createRef();

    this.state = {
      fieldsBase: getPacienteDiarioState(this.props.location),
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

  onBlobChange = (isAnImage, name, fileInput) => event => {
    const fileName = fileInput.current.files[0].name;
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType, fileName), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };
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
      const { pacienteDiarioEntity } = this.props;
      const entity = {
        ...pacienteDiarioEntity,

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
    this.props.history.push('/paciente-diario?' + this.getFiltersURL());
  };

  render() {
    const { pacienteDiarioEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const { historico } = pacienteDiarioEntity;
    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...pacienteDiarioEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.pacienteDiario.home.createOrEditLabel">Create or edit a PacienteDiario</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/paciente-diario?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Paciente Diarios</li>
            <li className="breadcrumb-item active">Paciente Diarios edit</li>
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
                      <Label className="mt-2" for="paciente-diario-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="paciente-diario-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <IdOperadoraComponentUpdate baseFilters />

                        <HistoricoComponentUpdate baseFilters />

                        <AtivoComponentUpdate baseFilters />
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
  pacienteDiarioEntity: storeState.pacienteDiario.entity,
  loading: storeState.pacienteDiario.loading,
  updating: storeState.pacienteDiario.updating,
  updateSuccess: storeState.pacienteDiario.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const IdOperadoraComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'idOperadora' ? (
    <Col md="idOperadora">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="idOperadoraLabel" for="paciente-diario-idOperadora">
              <Translate contentKey="generadorApp.pacienteDiario.idOperadora">Id Operadora</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="paciente-diario-idOperadora" type="string" className="form-control" name="idOperadora" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="idOperadora" value={this.state.fieldsBase[baseFilters]} />
  );
};

const HistoricoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'historico' ? (
    <Col md="historico">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="historicoLabel" for="paciente-diario-historico">
              <Translate contentKey="generadorApp.pacienteDiario.historico">Historico</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvInput id="paciente-diario-historico" type="textarea" name="historico" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="historico" value={this.state.fieldsBase[baseFilters]} />
  );
};

const AtivoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ativo' ? (
    <Col md="ativo">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="ativoLabel" for="paciente-diario-ativo">
              <Translate contentKey="generadorApp.pacienteDiario.ativo">Ativo</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="paciente-diario-ativo" type="string" className="form-control" name="ativo" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PacienteDiarioUpdate);
