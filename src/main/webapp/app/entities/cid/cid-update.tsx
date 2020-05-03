import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './cid.reducer';
import { ICid } from 'app/shared/model/cid.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICidUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICidUpdateState {
  isNew: boolean;
}

export class CidUpdate extends React.Component<ICidUpdateProps, ICidUpdateState> {
  constructor(props: Readonly<ICidUpdateProps>) {
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
    if (errors.length === 0) {
      const { cidEntity } = this.props;
      const entity = {
        ...cidEntity,
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
    this.props.history.push('/cid');
  };

  render() {
    const { cidEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Cids</li>
          <li className="breadcrumb-item active">Cids edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...cidEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.cid.home.createOrEditLabel">Create or edit a Cid</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/cid" replace color="info" className="float-right jh-create-entity">
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
                      <Label className="mt-2" for="cid-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="cid-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="codigoLabel" for="cid-codigo">
                                <Translate contentKey="generadorApp.cid.codigo">Codigo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="cid-codigo"
                                type="text"
                                name="codigo"
                                validate={{
                                  maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="diagnosticoLabel" for="cid-diagnostico">
                                <Translate contentKey="generadorApp.cid.diagnostico">Diagnostico</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="cid-diagnostico"
                                type="text"
                                name="diagnostico"
                                validate={{
                                  maxLength: { value: 400, errorMessage: translate('entity.validation.maxlength', { max: 400 }) }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="grLabel" for="cid-gr">
                                <Translate contentKey="generadorApp.cid.gr">Gr</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="cid-gr"
                                type="text"
                                name="gr"
                                validate={{
                                  maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="tempLabel" for="cid-temp">
                                <Translate contentKey="generadorApp.cid.temp">Temp</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="cid-temp"
                                type="text"
                                name="temp"
                                validate={{
                                  maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="apelidoLabel" for="cid-apelido">
                                <Translate contentKey="generadorApp.cid.apelido">Apelido</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="cid-apelido"
                                type="text"
                                name="apelido"
                                validate={{
                                  maxLength: { value: 30, errorMessage: translate('entity.validation.maxlength', { max: 30 }) }
                                }}
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
  cidEntity: storeState.cid.entity,
  loading: storeState.cid.loading,
  updating: storeState.cid.updating,
  updateSuccess: storeState.cid.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CidUpdate);
