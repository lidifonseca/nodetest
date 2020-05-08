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
  IPushnotificationEnviosUpdateState,
  getEntity,
  getPushnotificationEnviosState,
  IPushnotificationEnviosBaseState,
  updateEntity,
  createEntity,
  reset
} from './pushnotification-envios.reducer';
import { IPushnotificationEnvios } from 'app/shared/model/pushnotification-envios.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPushnotificationEnviosUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PushnotificationEnviosUpdate extends React.Component<IPushnotificationEnviosUpdateProps, IPushnotificationEnviosUpdateState> {
  constructor(props: Readonly<IPushnotificationEnviosUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getPushnotificationEnviosState(this.props.location),
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
    values.ultimoEnvio = convertDateTimeToServer(values.ultimoEnvio);

    if (errors.length === 0) {
      const { pushnotificationEnviosEntity } = this.props;
      const entity = {
        ...pushnotificationEnviosEntity,

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
    this.props.history.push('/pushnotification-envios?' + this.getFiltersURL());
  };

  render() {
    const { pushnotificationEnviosEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...pushnotificationEnviosEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.pushnotificationEnvios.home.createOrEditLabel">
                Create or edit a PushnotificationEnvios
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
              to={'/pushnotification-envios?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Pushnotification Envios</li>
            <li className="breadcrumb-item active">Pushnotification Envios edit</li>
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
                      <Label className="mt-2" for="pushnotification-envios-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="pushnotification-envios-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <ReferenciaComponentUpdate baseFilters />

                        <UltimoEnvioComponentUpdate baseFilters />
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
  pushnotificationEnviosEntity: storeState.pushnotificationEnvios.entity,
  loading: storeState.pushnotificationEnvios.loading,
  updating: storeState.pushnotificationEnvios.updating,
  updateSuccess: storeState.pushnotificationEnvios.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const ReferenciaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'referencia' ? (
    <Col md="referencia">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="referenciaLabel" for="pushnotification-envios-referencia">
              <Translate contentKey="generadorApp.pushnotificationEnvios.referencia">Referencia</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pushnotification-envios-referencia" type="text" name="referencia" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="referencia" value={this.state.fieldsBase[baseFilters]} />
  );
};

const UltimoEnvioComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ultimoEnvio' ? (
    <Col md="ultimoEnvio">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="ultimoEnvioLabel" for="pushnotification-envios-ultimoEnvio">
              <Translate contentKey="generadorApp.pushnotificationEnvios.ultimoEnvio">Ultimo Envio</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvInput
              id="pushnotification-envios-ultimoEnvio"
              type="datetime-local"
              className="form-control"
              name="ultimoEnvio"
              placeholder={'YYYY-MM-DD HH:mm'}
              value={isNew ? null : convertDateTimeFromServer(this.props.pushnotificationEnviosEntity.ultimoEnvio)}
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="ultimoEnvio" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PushnotificationEnviosUpdate);
