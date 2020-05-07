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
  IMotivoPsUpdateState,
  getEntity,
  getMotivoPsState,
  IMotivoPsBaseState,
  updateEntity,
  createEntity,
  reset
} from './motivo-ps.reducer';
import { IMotivoPs } from 'app/shared/model/motivo-ps.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMotivoPsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MotivoPsUpdate extends React.Component<IMotivoPsUpdateProps, IMotivoPsUpdateState> {
  constructor(props: Readonly<IMotivoPsUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getMotivoPsState(this.props.location),
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
      (fieldsBase['nome'] ? '&nome=' + fieldsBase['nome'] : '') +
      (fieldsBase['idPai'] ? '&idPai=' + fieldsBase['idPai'] : '') +
      (fieldsBase['ativo'] ? '&ativo=' + fieldsBase['ativo'] : '') +
      (fieldsBase['classe'] ? '&classe=' + fieldsBase['classe'] : '') +
      (fieldsBase['name'] ? '&name=' + fieldsBase['name'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { motivoPsEntity } = this.props;
      const entity = {
        ...motivoPsEntity,
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
    this.props.history.push('/motivo-ps?' + this.getFiltersURL());
  };

  render() {
    const { motivoPsEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Motivo Ps</li>
          <li className="breadcrumb-item active">Motivo Ps edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...motivoPsEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.motivoPs.home.createOrEditLabel">Create or edit a MotivoPs</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button
                  tag={Link}
                  id="cancel-save"
                  to={'/motivo-ps?' + this.getFiltersURL()}
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
                      <Label className="mt-2" for="motivo-ps-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="motivo-ps-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'nome' ? (
                          <Col md="nome">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="nomeLabel" for="motivo-ps-nome">
                                    <Translate contentKey="generadorApp.motivoPs.nome">Nome</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="motivo-ps-nome" type="text" name="nome" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="nome" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'idPai' ? (
                          <Col md="idPai">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idPaiLabel" for="motivo-ps-idPai">
                                    <Translate contentKey="generadorApp.motivoPs.idPai">Id Pai</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="motivo-ps-idPai" type="string" className="form-control" name="idPai" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idPai" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'ativo' ? (
                          <Col md="ativo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="ativoLabel" for="motivo-ps-ativo">
                                    <Translate contentKey="generadorApp.motivoPs.ativo">Ativo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="motivo-ps-ativo" type="string" className="form-control" name="ativo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'classe' ? (
                          <Col md="classe">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="classeLabel" for="motivo-ps-classe">
                                    <Translate contentKey="generadorApp.motivoPs.classe">Classe</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="motivo-ps-classe" type="text" name="classe" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="classe" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'name' ? (
                          <Col md="name">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="nameLabel" for="motivo-ps-name">
                                    <Translate contentKey="generadorApp.motivoPs.name">Name</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="motivo-ps-name" type="text" name="name" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="name" value={this.state.fieldsBase[baseFilters]} />
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
  motivoPsEntity: storeState.motivoPs.entity,
  loading: storeState.motivoPs.loading,
  updating: storeState.motivoPs.updating,
  updateSuccess: storeState.motivoPs.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MotivoPsUpdate);
