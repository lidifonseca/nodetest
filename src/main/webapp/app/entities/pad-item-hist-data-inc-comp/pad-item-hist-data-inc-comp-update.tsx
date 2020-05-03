import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './pad-item-hist-data-inc-comp.reducer';
import { IPadItemHistDataIncComp } from 'app/shared/model/pad-item-hist-data-inc-comp.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPadItemHistDataIncCompUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPadItemHistDataIncCompUpdateState {
  isNew: boolean;
}

export class PadItemHistDataIncCompUpdate extends React.Component<IPadItemHistDataIncCompUpdateProps, IPadItemHistDataIncCompUpdateState> {
  constructor(props: Readonly<IPadItemHistDataIncCompUpdateProps>) {
    super(props);
    this.state = {
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

  saveEntity = (event: any, errors: any, values: any) => {
    values.dataPadItemIncompleto = convertDateTimeToServer(values.dataPadItemIncompleto);
    values.dataPadItemCompleto = convertDateTimeToServer(values.dataPadItemCompleto);

    if (errors.length === 0) {
      const { padItemHistDataIncCompEntity } = this.props;
      const entity = {
        ...padItemHistDataIncCompEntity,
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
    this.props.history.push('/pad-item-hist-data-inc-comp');
  };

  render() {
    const { padItemHistDataIncCompEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Item Hist Data Inc Comps</li>
          <li className="breadcrumb-item active">Pad Item Hist Data Inc Comps edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...padItemHistDataIncCompEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.padItemHistDataIncComp.home.createOrEditLabel">
                    Create or edit a PadItemHistDataIncComp
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
                  to="/pad-item-hist-data-inc-comp"
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
                    <Row>
                      {!isNew ? (
                        <AvGroup>
                          <Row>
                            {/*
                      <Col md="3">
                      <Label className="mt-2" for="pad-item-hist-data-inc-comp-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput
                                id="pad-item-hist-data-inc-comp-id"
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

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="idPadItemLabel" for="pad-item-hist-data-inc-comp-idPadItem">
                                <Translate contentKey="generadorApp.padItemHistDataIncComp.idPadItem">Id Pad Item</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="pad-item-hist-data-inc-comp-idPadItem" type="text" name="idPadItem" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label
                                className="mt-2"
                                id="dataPadItemIncompletoLabel"
                                for="pad-item-hist-data-inc-comp-dataPadItemIncompleto"
                              >
                                <Translate contentKey="generadorApp.padItemHistDataIncComp.dataPadItemIncompleto">
                                  Data Pad Item Incompleto
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="pad-item-hist-data-inc-comp-dataPadItemIncompleto"
                                type="datetime-local"
                                className="form-control"
                                name="dataPadItemIncompleto"
                                placeholder={'YYYY-MM-DD HH:mm'}
                                value={
                                  isNew ? null : convertDateTimeFromServer(this.props.padItemHistDataIncCompEntity.dataPadItemIncompleto)
                                }
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="dataPadItemCompletoLabel" for="pad-item-hist-data-inc-comp-dataPadItemCompleto">
                                <Translate contentKey="generadorApp.padItemHistDataIncComp.dataPadItemCompleto">
                                  Data Pad Item Completo
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="pad-item-hist-data-inc-comp-dataPadItemCompleto"
                                type="datetime-local"
                                className="form-control"
                                name="dataPadItemCompleto"
                                placeholder={'YYYY-MM-DD HH:mm'}
                                value={
                                  isNew ? null : convertDateTimeFromServer(this.props.padItemHistDataIncCompEntity.dataPadItemCompleto)
                                }
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>
                    </Row>
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
  padItemHistDataIncCompEntity: storeState.padItemHistDataIncComp.entity,
  loading: storeState.padItemHistDataIncComp.loading,
  updating: storeState.padItemHistDataIncComp.updating,
  updateSuccess: storeState.padItemHistDataIncComp.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadItemHistDataIncCompUpdate);
