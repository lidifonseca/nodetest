/* eslint complexity: ["error", 300] */
import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import {
  ITipoExameUpdateState,
  getEntity,
  getTipoExameState,
  ITipoExameBaseState,
  updateEntity,
  createEntity,
  reset
} from './tipo-exame.reducer';
import { ITipoExame } from 'app/shared/model/tipo-exame.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITipoExameUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TipoExameUpdate extends React.Component<ITipoExameUpdateProps, ITipoExameUpdateState> {
  constructor(props: Readonly<ITipoExameUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getTipoExameState(this.props.location),
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
    let url = '_back=1' + (offset !== null ? '&offset=' + offset : '');
    Object.keys(fieldsBase).map(key => {
      url += '&' + key + '=' + fieldsBase[key];
    });
    return url;
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { tipoExameEntity } = this.props;
      const entity = {
        ...tipoExameEntity,

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
    this.props.history.push('/tipo-exame?' + this.getFiltersURL());
  };

  render() {
    const { tipoExameEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...tipoExameEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.tipoExame.home.createOrEditLabel">Create or edit a TipoExame</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/tipo-exame?' + this.getFiltersURL()}
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
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Inicio</Link>
            </li>
            <li className="breadcrumb-item active">Tipo Exames</li>
            <li className="breadcrumb-item active">Tipo Exames edit</li>
          </ol>

          <Panel>
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
                        <Label className="mt-2" for="tipo-exame-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput id="tipo-exame-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'exame' ? (
                          <Col md="exame">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="exameLabel" for="tipo-exame-exame">
                                    <Translate contentKey="generadorApp.tipoExame.exame">Exame</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="tipo-exame-exame" type="text" name="exame" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="exame" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'idPai' ? (
                          <Col md="idPai">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idPaiLabel" for="tipo-exame-idPai">
                                    <Translate contentKey="generadorApp.tipoExame.idPai">Id Pai</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="tipo-exame-idPai" type="string" className="form-control" name="idPai" />
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
                                <Col md="12">
                                  <Label className="mt-2" id="ativoLabel" check>
                                    <AvInput id="tipo-exame-ativo" type="checkbox" className="form-control" name="ativo" />
                                    <Translate contentKey="generadorApp.tipoExame.ativo">Ativo</Translate>
                                  </Label>
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
  tipoExameEntity: storeState.tipoExame.entity,
  loading: storeState.tipoExame.loading,
  updating: storeState.tipoExame.updating,
  updateSuccess: storeState.tipoExame.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TipoExameUpdate);
