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
  ICepbrBairroUpdateState,
  getEntity,
  getCepbrBairroState,
  ICepbrBairroBaseState,
  updateEntity,
  createEntity,
  reset
} from './cepbr-bairro.reducer';
import { ICepbrBairro } from 'app/shared/model/cepbr-bairro.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICepbrBairroUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CepbrBairroUpdate extends React.Component<ICepbrBairroUpdateProps, ICepbrBairroUpdateState> {
  constructor(props: Readonly<ICepbrBairroUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getCepbrBairroState(this.props.location),
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
      (fieldsBase['idBairro'] ? '&idBairro=' + fieldsBase['idBairro'] : '') +
      (fieldsBase['bairro'] ? '&bairro=' + fieldsBase['bairro'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { cepbrBairroEntity } = this.props;
      const entity = {
        ...cepbrBairroEntity,
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
    this.props.history.push('/cepbr-bairro?' + this.getFiltersURL());
  };

  render() {
    const { cepbrBairroEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Cepbr Bairros</li>
          <li className="breadcrumb-item active">Cepbr Bairros edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...cepbrBairroEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.cepbrBairro.home.createOrEditLabel">Create or edit a CepbrBairro</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button
                  tag={Link}
                  id="cancel-save"
                  to={'/cepbr-bairro?' + this.getFiltersURL()}
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
                      <Label className="mt-2" for="cepbr-bairro-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="cepbr-bairro-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'idBairro' ? (
                          <Col md="idBairro">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idBairroLabel" for="cepbr-bairro-idBairro">
                                    <Translate contentKey="generadorApp.cepbrBairro.idBairro">Id Bairro</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="cepbr-bairro-idBairro" type="string" className="form-control" name="idBairro" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idBairro" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'bairro' ? (
                          <Col md="bairro">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="bairroLabel" for="cepbr-bairro-bairro">
                                    <Translate contentKey="generadorApp.cepbrBairro.bairro">Bairro</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="cepbr-bairro-bairro" type="text" name="bairro" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="bairro" value={this.state.fieldsBase[baseFilters]} />
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
  cepbrBairroEntity: storeState.cepbrBairro.entity,
  loading: storeState.cepbrBairro.loading,
  updating: storeState.cepbrBairro.updating,
  updateSuccess: storeState.cepbrBairro.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CepbrBairroUpdate);
