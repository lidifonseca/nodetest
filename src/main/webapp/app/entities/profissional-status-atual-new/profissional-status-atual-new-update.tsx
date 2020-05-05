import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import {
  getEntity,
  getProfissionalStatusAtualNewState,
  IProfissionalStatusAtualNewBaseState,
  updateEntity,
  createEntity,
  setBlob,
  reset
} from './profissional-status-atual-new.reducer';
import { IProfissionalStatusAtualNew } from 'app/shared/model/profissional-status-atual-new.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProfissionalStatusAtualNewUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IProfissionalStatusAtualNewUpdateState {
  fieldsBase: IProfissionalStatusAtualNewBaseState;
  isNew: boolean;
}

export class ProfissionalStatusAtualNewUpdate extends React.Component<
  IProfissionalStatusAtualNewUpdateProps,
  IProfissionalStatusAtualNewUpdateState
> {
  constructor(props: Readonly<IProfissionalStatusAtualNewUpdateProps>) {
    super(props);
    this.state = {
      fieldsBase: getProfissionalStatusAtualNewState(this.props.location),
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

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { profissionalStatusAtualNewEntity } = this.props;
      const entity = {
        ...profissionalStatusAtualNewEntity,
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
    this.props.history.push('/profissional-status-atual-new');
  };

  render() {
    const { profissionalStatusAtualNewEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const { obs } = profissionalStatusAtualNewEntity;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Profissional Status Atual News</li>
          <li className="breadcrumb-item active">Profissional Status Atual News edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...profissionalStatusAtualNewEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.profissionalStatusAtualNew.home.createOrEditLabel">
                    Create or edit a ProfissionalStatusAtualNew
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
                  to="/profissional-status-atual-new"
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
                      <Label className="mt-2" for="profissional-status-atual-new-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput
                                id="profissional-status-atual-new-id"
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
                        {!this.state.fieldsBase.idProfissional ? (
                          <Col md="idProfissional">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idProfissionalLabel" for="profissional-status-atual-new-idProfissional">
                                    <Translate contentKey="generadorApp.profissionalStatusAtualNew.idProfissional">
                                      Id Profissional
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-status-atual-new-idProfissional" type="text" name="idProfissional" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idProfissional" value={this.state.fieldsBase.idProfissional} />
                        )}

                        {!this.state.fieldsBase.idStatusAtualProf ? (
                          <Col md="idStatusAtualProf">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idStatusAtualProfLabel" for="profissional-status-atual-new-idStatusAtualProf">
                                    <Translate contentKey="generadorApp.profissionalStatusAtualNew.idStatusAtualProf">
                                      Id Status Atual Prof
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="profissional-status-atual-new-idStatusAtualProf"
                                    type="string"
                                    className="form-control"
                                    name="idStatusAtualProf"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idStatusAtualProf" value={this.state.fieldsBase.idStatusAtualProf} />
                        )}

                        {!this.state.fieldsBase.obs ? (
                          <Col md="obs">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="obsLabel" for="profissional-status-atual-new-obs">
                                    <Translate contentKey="generadorApp.profissionalStatusAtualNew.obs">Obs</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="profissional-status-atual-new-obs" type="textarea" name="obs" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="obs" value={this.state.fieldsBase.obs} />
                        )}

                        {!this.state.fieldsBase.ativo ? (
                          <Col md="ativo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="ativoLabel" for="profissional-status-atual-new-ativo">
                                    <Translate contentKey="generadorApp.profissionalStatusAtualNew.ativo">Ativo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-status-atual-new-ativo" type="string" className="form-control" name="ativo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ativo" value={this.state.fieldsBase.ativo} />
                        )}

                        {!this.state.fieldsBase.idUsuario ? (
                          <Col md="idUsuario">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idUsuarioLabel" for="profissional-status-atual-new-idUsuario">
                                    <Translate contentKey="generadorApp.profissionalStatusAtualNew.idUsuario">Id Usuario</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-status-atual-new-idUsuario" type="text" name="idUsuario" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idUsuario" value={this.state.fieldsBase.idUsuario} />
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
  profissionalStatusAtualNewEntity: storeState.profissionalStatusAtualNew.entity,
  loading: storeState.profissionalStatusAtualNew.loading,
  updating: storeState.profissionalStatusAtualNew.updating,
  updateSuccess: storeState.profissionalStatusAtualNew.updateSuccess
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalStatusAtualNewUpdate);