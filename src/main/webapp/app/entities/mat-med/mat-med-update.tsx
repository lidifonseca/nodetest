import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IMatMedUpdateState, getEntity, getMatMedState, IMatMedBaseState, updateEntity, createEntity, reset } from './mat-med.reducer';
import { IMatMed } from 'app/shared/model/mat-med.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMatMedUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MatMedUpdate extends React.Component<IMatMedUpdateProps, IMatMedUpdateState> {
  constructor(props: Readonly<IMatMedUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getMatMedState(this.props.location),
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
      (fieldsBase['idTipoMatMed'] ? '&idTipoMatMed=' + fieldsBase['idTipoMatMed'] : '') +
      (fieldsBase['valor'] ? '&valor=' + fieldsBase['valor'] : '') +
      (fieldsBase['ativo'] ? '&ativo=' + fieldsBase['ativo'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { matMedEntity } = this.props;
      const entity = {
        ...matMedEntity,
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
    this.props.history.push('/mat-med?' + this.getFiltersURL());
  };

  render() {
    const { matMedEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Mat Meds</li>
          <li className="breadcrumb-item active">Mat Meds edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...matMedEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.matMed.home.createOrEditLabel">Create or edit a MatMed</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button
                  tag={Link}
                  id="cancel-save"
                  to={'/mat-med?' + this.getFiltersURL()}
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
                      <Label className="mt-2" for="mat-med-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="mat-med-id" type="hidden" className="form-control" name="id" required readOnly />
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
                                  <Label className="mt-2" id="nomeLabel" for="mat-med-nome">
                                    <Translate contentKey="generadorApp.matMed.nome">Nome</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="mat-med-nome" type="text" name="nome" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="nome" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'idTipoMatMed' ? (
                          <Col md="idTipoMatMed">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idTipoMatMedLabel" for="mat-med-idTipoMatMed">
                                    <Translate contentKey="generadorApp.matMed.idTipoMatMed">Id Tipo Mat Med</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="mat-med-idTipoMatMed" type="string" className="form-control" name="idTipoMatMed" />
                                </Col>
                                <UncontrolledTooltip target="idTipoMatMedLabel">
                                  <Translate contentKey="generadorApp.matMed.help.idTipoMatMed" />
                                </UncontrolledTooltip>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idTipoMatMed" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'valor' ? (
                          <Col md="valor">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="valorLabel" for="mat-med-valor">
                                    <Translate contentKey="generadorApp.matMed.valor">Valor</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="mat-med-valor" type="text" name="valor" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="valor" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'ativo' ? (
                          <Col md="ativo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="ativoLabel" for="mat-med-ativo">
                                    <Translate contentKey="generadorApp.matMed.ativo">Ativo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="mat-med-ativo" type="string" className="form-control" name="ativo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
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
  matMedEntity: storeState.matMed.entity,
  loading: storeState.matMed.loading,
  updating: storeState.matMed.updating,
  updateSuccess: storeState.matMed.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MatMedUpdate);
