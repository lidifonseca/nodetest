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
  IPadPtaTempUpdateState,
  getEntity,
  getPadPtaTempState,
  IPadPtaTempBaseState,
  updateEntity,
  createEntity,
  reset
} from './pad-pta-temp.reducer';
import { IPadPtaTemp } from 'app/shared/model/pad-pta-temp.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPadPtaTempUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PadPtaTempUpdate extends React.Component<IPadPtaTempUpdateProps, IPadPtaTempUpdateState> {
  constructor(props: Readonly<IPadPtaTempUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getPadPtaTempState(this.props.location),
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
      (fieldsBase['sessionId'] ? '&sessionId=' + fieldsBase['sessionId'] : '') +
      (fieldsBase['idPta'] ? '&idPta=' + fieldsBase['idPta'] : '') +
      (fieldsBase['idCid'] ? '&idCid=' + fieldsBase['idCid'] : '') +
      (fieldsBase['cidXPtaNovoId'] ? '&cidXPtaNovoId=' + fieldsBase['cidXPtaNovoId'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { padPtaTempEntity } = this.props;
      const entity = {
        ...padPtaTempEntity,
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
    this.props.history.push('/pad-pta-temp?' + this.getFiltersURL());
  };

  render() {
    const { padPtaTempEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Pta Temps</li>
          <li className="breadcrumb-item active">Pad Pta Temps edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...padPtaTempEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.padPtaTemp.home.createOrEditLabel">Create or edit a PadPtaTemp</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button
                  tag={Link}
                  id="cancel-save"
                  to={'/pad-pta-temp?' + this.getFiltersURL()}
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
                      <Label className="mt-2" for="pad-pta-temp-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="pad-pta-temp-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'sessionId' ? (
                          <Col md="sessionId">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="sessionIdLabel" for="pad-pta-temp-sessionId">
                                    <Translate contentKey="generadorApp.padPtaTemp.sessionId">Session Id</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-pta-temp-sessionId" type="text" name="sessionId" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="sessionId" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'idPta' ? (
                          <Col md="idPta">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idPtaLabel" for="pad-pta-temp-idPta">
                                    <Translate contentKey="generadorApp.padPtaTemp.idPta">Id Pta</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-pta-temp-idPta" type="string" className="form-control" name="idPta" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idPta" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'idCid' ? (
                          <Col md="idCid">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idCidLabel" for="pad-pta-temp-idCid">
                                    <Translate contentKey="generadorApp.padPtaTemp.idCid">Id Cid</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-pta-temp-idCid" type="string" className="form-control" name="idCid" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idCid" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'cidXPtaNovoId' ? (
                          <Col md="cidXPtaNovoId">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="cidXPtaNovoIdLabel" for="pad-pta-temp-cidXPtaNovoId">
                                    <Translate contentKey="generadorApp.padPtaTemp.cidXPtaNovoId">Cid X Pta Novo Id</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-pta-temp-cidXPtaNovoId" type="string" className="form-control" name="cidXPtaNovoId" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cidXPtaNovoId" value={this.state.fieldsBase[baseFilters]} />
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
  padPtaTempEntity: storeState.padPtaTemp.entity,
  loading: storeState.padPtaTemp.loading,
  updating: storeState.padPtaTemp.updating,
  updateSuccess: storeState.padPtaTemp.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadPtaTempUpdate);
