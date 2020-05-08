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
  IPadItemAlertaUpdateState,
  getEntity,
  getPadItemAlertaState,
  IPadItemAlertaBaseState,
  updateEntity,
  createEntity,
  reset
} from './pad-item-alerta.reducer';
import { IPadItemAlerta } from 'app/shared/model/pad-item-alerta.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPadItemAlertaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PadItemAlertaUpdate extends React.Component<IPadItemAlertaUpdateProps, IPadItemAlertaUpdateState> {
  constructor(props: Readonly<IPadItemAlertaUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getPadItemAlertaState(this.props.location),
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
    values.envioEmailEm = convertDateTimeToServer(values.envioEmailEm);
    values.visualizadoEm = convertDateTimeToServer(values.visualizadoEm);
    values.criadoEm = convertDateTimeToServer(values.criadoEm);

    if (errors.length === 0) {
      const { padItemAlertaEntity } = this.props;
      const entity = {
        ...padItemAlertaEntity,

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
    this.props.history.push('/pad-item-alerta?' + this.getFiltersURL());
  };

  render() {
    const { padItemAlertaEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...padItemAlertaEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.padItemAlerta.home.createOrEditLabel">Create or edit a PadItemAlerta</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/pad-item-alerta?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Pad Item Alertas</li>
            <li className="breadcrumb-item active">Pad Item Alertas edit</li>
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
                      <Label className="mt-2" for="pad-item-alerta-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="pad-item-alerta-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <PadItemMetaIdComponentUpdate baseFilters />

                        <EnvioEmailEmComponentUpdate baseFilters />

                        <VisualizadoEmComponentUpdate baseFilters />

                        <CriadoEmComponentUpdate baseFilters />

                        <AtivoComponentUpdate baseFilters />

                        <MensagemComponentUpdate baseFilters />
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
  padItemAlertaEntity: storeState.padItemAlerta.entity,
  loading: storeState.padItemAlerta.loading,
  updating: storeState.padItemAlerta.updating,
  updateSuccess: storeState.padItemAlerta.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const PadItemMetaIdComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'padItemMetaId' ? (
    <Col md="padItemMetaId">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="padItemMetaIdLabel" for="pad-item-alerta-padItemMetaId">
              <Translate contentKey="generadorApp.padItemAlerta.padItemMetaId">Pad Item Meta Id</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-item-alerta-padItemMetaId" type="string" className="form-control" name="padItemMetaId" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="padItemMetaId" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EnvioEmailEmComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'envioEmailEm' ? (
    <Col md="envioEmailEm">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="envioEmailEmLabel" for="pad-item-alerta-envioEmailEm">
              <Translate contentKey="generadorApp.padItemAlerta.envioEmailEm">Envio Email Em</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvInput
              id="pad-item-alerta-envioEmailEm"
              type="datetime-local"
              className="form-control"
              name="envioEmailEm"
              placeholder={'YYYY-MM-DD HH:mm'}
              value={isNew ? null : convertDateTimeFromServer(this.props.padItemAlertaEntity.envioEmailEm)}
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="envioEmailEm" value={this.state.fieldsBase[baseFilters]} />
  );
};

const VisualizadoEmComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'visualizadoEm' ? (
    <Col md="visualizadoEm">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="visualizadoEmLabel" for="pad-item-alerta-visualizadoEm">
              <Translate contentKey="generadorApp.padItemAlerta.visualizadoEm">Visualizado Em</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvInput
              id="pad-item-alerta-visualizadoEm"
              type="datetime-local"
              className="form-control"
              name="visualizadoEm"
              placeholder={'YYYY-MM-DD HH:mm'}
              value={isNew ? null : convertDateTimeFromServer(this.props.padItemAlertaEntity.visualizadoEm)}
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="visualizadoEm" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CriadoEmComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'criadoEm' ? (
    <Col md="criadoEm">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="criadoEmLabel" for="pad-item-alerta-criadoEm">
              <Translate contentKey="generadorApp.padItemAlerta.criadoEm">Criado Em</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvInput
              id="pad-item-alerta-criadoEm"
              type="datetime-local"
              className="form-control"
              name="criadoEm"
              placeholder={'YYYY-MM-DD HH:mm'}
              value={isNew ? null : convertDateTimeFromServer(this.props.padItemAlertaEntity.criadoEm)}
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="criadoEm" value={this.state.fieldsBase[baseFilters]} />
  );
};

const AtivoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ativo' ? (
    <Col md="ativo">
      <AvGroup>
        <Row>
          <Col md="12">
            <Label className="mt-2" id="ativoLabel" check>
              <AvInput id="pad-item-alerta-ativo" type="checkbox" className="form-control" name="ativo" />
              <Translate contentKey="generadorApp.padItemAlerta.ativo">Ativo</Translate>
            </Label>
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
  );
};

const MensagemComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'mensagem' ? (
    <Col md="mensagem">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="mensagemLabel" for="pad-item-alerta-mensagem">
              <Translate contentKey="generadorApp.padItemAlerta.mensagem">Mensagem</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-item-alerta-mensagem" type="text" name="mensagem" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="mensagem" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PadItemAlertaUpdate);
