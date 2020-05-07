import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import {
  ITermosUsoUpdateState,
  getEntity,
  getTermosUsoState,
  ITermosUsoBaseState,
  updateEntity,
  createEntity,
  setBlob,
  reset
} from './termos-uso.reducer';
import { ITermosUso } from 'app/shared/model/termos-uso.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITermosUsoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TermosUsoUpdate extends React.Component<ITermosUsoUpdateProps, ITermosUsoUpdateState> {
  termosUsoFileInput: React.RefObject<HTMLInputElement>;

  constructor(props: Readonly<ITermosUsoUpdateProps>) {
    super(props);

    this.termosUsoFileInput = React.createRef();

    this.state = {
      fieldsBase: getTermosUsoState(this.props.location),
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

  onBlobChange = (isAnImage, name, fileInput) => event => {
    const fileName = fileInput.current.files[0].name;
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType, fileName), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };
  getFiltersURL = (offset = null) => {
    const fieldsBase = this.state.fieldsBase;
    return (
      '_back=1' +
      (fieldsBase['baseFilters'] ? '&baseFilters=' + fieldsBase['baseFilters'] : '') +
      (fieldsBase['activePage'] ? '&page=' + fieldsBase['activePage'] : '') +
      (fieldsBase['itemsPerPage'] ? '&size=' + fieldsBase['itemsPerPage'] : '') +
      (fieldsBase['sort'] ? '&sort=' + (fieldsBase['sort'] + ',' + fieldsBase['order']) : '') +
      (offset !== null ? '&offset=' + offset : '') +
      (fieldsBase['termosUso'] ? '&termosUso=' + fieldsBase['termosUso'] : '') +
      (fieldsBase['tipo'] ? '&tipo=' + fieldsBase['tipo'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { termosUsoEntity } = this.props;
      const entity = {
        ...termosUsoEntity,
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
    this.props.history.push('/termos-uso?' + this.getFiltersURL());
  };

  render() {
    const { termosUsoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const { termosUso } = termosUsoEntity;
    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Termos Usos</li>
          <li className="breadcrumb-item active">Termos Usos edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...termosUsoEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.termosUso.home.createOrEditLabel">Create or edit a TermosUso</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button
                  tag={Link}
                  id="cancel-save"
                  to={'/termos-uso?' + this.getFiltersURL()}
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
                      <Label className="mt-2" for="termos-uso-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="termos-uso-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'termosUso' ? (
                          <Col md="termosUso">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="termosUsoLabel" for="termos-uso-termosUso">
                                    <Translate contentKey="generadorApp.termosUso.termosUso">Termos Uso</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="termos-uso-termosUso" type="textarea" name="termosUso" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="termosUso" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'tipo' ? (
                          <Col md="tipo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="tipoLabel" for="termos-uso-tipo">
                                    <Translate contentKey="generadorApp.termosUso.tipo">Tipo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="termos-uso-tipo" type="string" className="form-control" name="tipo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="tipo" value={this.state.fieldsBase[baseFilters]} />
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
  termosUsoEntity: storeState.termosUso.entity,
  loading: storeState.termosUso.loading,
  updating: storeState.termosUso.updating,
  updateSuccess: storeState.termosUso.updateSuccess
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

export default connect(mapStateToProps, mapDispatchToProps)(TermosUsoUpdate);
