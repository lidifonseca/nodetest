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
  ICepbrCidadeUpdateState,
  getEntity,
  getCepbrCidadeState,
  ICepbrCidadeBaseState,
  updateEntity,
  createEntity,
  reset
} from './cepbr-cidade.reducer';
import { ICepbrCidade } from 'app/shared/model/cepbr-cidade.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICepbrCidadeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CepbrCidadeUpdate extends React.Component<ICepbrCidadeUpdateProps, ICepbrCidadeUpdateState> {
  constructor(props: Readonly<ICepbrCidadeUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getCepbrCidadeState(this.props.location),
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
      (fieldsBase['idCidade'] ? '&idCidade=' + fieldsBase['idCidade'] : '') +
      (fieldsBase['cidade'] ? '&cidade=' + fieldsBase['cidade'] : '') +
      (fieldsBase['codIbge'] ? '&codIbge=' + fieldsBase['codIbge'] : '') +
      (fieldsBase['area'] ? '&area=' + fieldsBase['area'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { cepbrCidadeEntity } = this.props;
      const entity = {
        ...cepbrCidadeEntity,
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
    this.props.history.push('/cepbr-cidade?' + this.getFiltersURL());
  };

  render() {
    const { cepbrCidadeEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Cepbr Cidades</li>
          <li className="breadcrumb-item active">Cepbr Cidades edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...cepbrCidadeEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.cepbrCidade.home.createOrEditLabel">Create or edit a CepbrCidade</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button
                  tag={Link}
                  id="cancel-save"
                  to={'/cepbr-cidade?' + this.getFiltersURL()}
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
                      <Label className="mt-2" for="cepbr-cidade-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="cepbr-cidade-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'idCidade' ? (
                          <Col md="idCidade">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idCidadeLabel" for="cepbr-cidade-idCidade">
                                    <Translate contentKey="generadorApp.cepbrCidade.idCidade">Id Cidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="cepbr-cidade-idCidade" type="string" className="form-control" name="idCidade" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idCidade" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'cidade' ? (
                          <Col md="cidade">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="cidadeLabel" for="cepbr-cidade-cidade">
                                    <Translate contentKey="generadorApp.cepbrCidade.cidade">Cidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="cepbr-cidade-cidade" type="text" name="cidade" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cidade" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'codIbge' ? (
                          <Col md="codIbge">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="codIbgeLabel" for="cepbr-cidade-codIbge">
                                    <Translate contentKey="generadorApp.cepbrCidade.codIbge">Cod Ibge</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="cepbr-cidade-codIbge" type="text" name="codIbge" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="codIbge" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'area' ? (
                          <Col md="area">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="areaLabel" for="cepbr-cidade-area">
                                    <Translate contentKey="generadorApp.cepbrCidade.area">Area</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="cepbr-cidade-area" type="string" className="form-control" name="area" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="area" value={this.state.fieldsBase[baseFilters]} />
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
  cepbrCidadeEntity: storeState.cepbrCidade.entity,
  loading: storeState.cepbrCidade.loading,
  updating: storeState.cepbrCidade.updating,
  updateSuccess: storeState.cepbrCidade.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CepbrCidadeUpdate);
