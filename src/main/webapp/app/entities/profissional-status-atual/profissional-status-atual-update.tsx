import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IStatusAtualProf } from 'app/shared/model/status-atual-prof.model';
import { getEntities as getStatusAtualProfs } from 'app/entities/status-atual-prof/status-atual-prof.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './profissional-status-atual.reducer';
import { IProfissionalStatusAtual } from 'app/shared/model/profissional-status-atual.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProfissionalStatusAtualUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IProfissionalStatusAtualUpdateState {
  isNew: boolean;
  idStatusAtualProfId: string;
}

export class ProfissionalStatusAtualUpdate extends React.Component<
  IProfissionalStatusAtualUpdateProps,
  IProfissionalStatusAtualUpdateState
> {
  constructor(props: Readonly<IProfissionalStatusAtualUpdateProps>) {
    super(props);
    this.state = {
      idStatusAtualProfId: '0',
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

    this.props.getStatusAtualProfs();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { profissionalStatusAtualEntity } = this.props;
      const entity = {
        ...profissionalStatusAtualEntity,
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
    this.props.history.push('/profissional-status-atual');
  };

  render() {
    const { profissionalStatusAtualEntity, statusAtualProfs, loading, updating } = this.props;
    const { isNew } = this.state;

    const { obs } = profissionalStatusAtualEntity;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Profissional Status Atuals</li>
          <li className="breadcrumb-item active">Profissional Status Atuals edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...profissionalStatusAtualEntity,
                  idStatusAtualProf: profissionalStatusAtualEntity.idStatusAtualProf
                    ? profissionalStatusAtualEntity.idStatusAtualProf.id
                    : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.profissionalStatusAtual.home.createOrEditLabel">
                    Create or edit a ProfissionalStatusAtual
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
                  to="/profissional-status-atual"
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
                      <Label className="mt-2" for="profissional-status-atual-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput
                                id="profissional-status-atual-id"
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
                              <Label className="mt-2" id="idProfissionalLabel" for="profissional-status-atual-idProfissional">
                                <Translate contentKey="generadorApp.profissionalStatusAtual.idProfissional">Id Profissional</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="profissional-status-atual-idProfissional" type="text" name="idProfissional" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="obsLabel" for="profissional-status-atual-obs">
                                <Translate contentKey="generadorApp.profissionalStatusAtual.obs">Obs</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="profissional-status-atual-obs" type="textarea" name="obs" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ativoLabel" for="profissional-status-atual-ativo">
                                <Translate contentKey="generadorApp.profissionalStatusAtual.ativo">Ativo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="profissional-status-atual-ativo" type="string" className="form-control" name="ativo" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="idUsuarioLabel" for="profissional-status-atual-idUsuario">
                                <Translate contentKey="generadorApp.profissionalStatusAtual.idUsuario">Id Usuario</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="profissional-status-atual-idUsuario"
                                type="text"
                                name="idUsuario"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') }
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
                              <Label className="mt-2" for="profissional-status-atual-idStatusAtualProf">
                                <Translate contentKey="generadorApp.profissionalStatusAtual.idStatusAtualProf">
                                  Id Status Atual Prof
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="profissional-status-atual-idStatusAtualProf"
                                type="select"
                                className="form-control"
                                name="idStatusAtualProf"
                              >
                                <option value="null" key="0">
                                  {translate('generadorApp.profissionalStatusAtual.idStatusAtualProf.empty')}
                                </option>
                                {statusAtualProfs
                                  ? statusAtualProfs.map(otherEntity => (
                                      <option value={otherEntity.id} key={otherEntity.id}>
                                        {otherEntity.id}
                                      </option>
                                    ))
                                  : null}
                              </AvInput>
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
  statusAtualProfs: storeState.statusAtualProf.entities,
  profissionalStatusAtualEntity: storeState.profissionalStatusAtual.entity,
  loading: storeState.profissionalStatusAtual.loading,
  updating: storeState.profissionalStatusAtual.updating,
  updateSuccess: storeState.profissionalStatusAtual.updateSuccess
});

const mapDispatchToProps = {
  getStatusAtualProfs,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalStatusAtualUpdate);
