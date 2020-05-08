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
  IProfissionalCategoriaContratoUpdateState,
  getEntity,
  getProfissionalCategoriaContratoState,
  IProfissionalCategoriaContratoBaseState,
  updateEntity,
  createEntity,
  reset
} from './profissional-categoria-contrato.reducer';
import { IProfissionalCategoriaContrato } from 'app/shared/model/profissional-categoria-contrato.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProfissionalCategoriaContratoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProfissionalCategoriaContratoUpdate extends React.Component<
  IProfissionalCategoriaContratoUpdateProps,
  IProfissionalCategoriaContratoUpdateState
> {
  constructor(props: Readonly<IProfissionalCategoriaContratoUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getProfissionalCategoriaContratoState(this.props.location),
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
      const { profissionalCategoriaContratoEntity } = this.props;
      const entity = {
        ...profissionalCategoriaContratoEntity,

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
    this.props.history.push('/profissional-categoria-contrato?' + this.getFiltersURL());
  };

  render() {
    const { profissionalCategoriaContratoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...profissionalCategoriaContratoEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.profissionalCategoriaContrato.home.createOrEditLabel">
                Create or edit a ProfissionalCategoriaContrato
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
              to={'/profissional-categoria-contrato?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Profissional Categoria Contratoes</li>
            <li className="breadcrumb-item active">Profissional Categoria Contratoes edit</li>
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
                        <Label className="mt-2" for="profissional-categoria-contrato-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput
                                id="profissional-categoria-contrato-id"
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
                        {baseFilters !== 'idProfissional' ? (
                          <Col md="idProfissional">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idProfissionalLabel" for="profissional-categoria-contrato-idProfissional">
                                    <Translate contentKey="generadorApp.profissionalCategoriaContrato.idProfissional">
                                      Id Profissional
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-categoria-contrato-idProfissional" type="text" name="idProfissional" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idProfissional" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'idCategoriaContrato' ? (
                          <Col md="idCategoriaContrato">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label
                                    className="mt-2"
                                    id="idCategoriaContratoLabel"
                                    for="profissional-categoria-contrato-idCategoriaContrato"
                                  >
                                    <Translate contentKey="generadorApp.profissionalCategoriaContrato.idCategoriaContrato">
                                      Id Categoria Contrato
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="profissional-categoria-contrato-idCategoriaContrato"
                                    type="string"
                                    className="form-control"
                                    name="idCategoriaContrato"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idCategoriaContrato" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'aceito' ? (
                          <Col md="aceito">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="aceitoLabel" for="profissional-categoria-contrato-aceito">
                                    <Translate contentKey="generadorApp.profissionalCategoriaContrato.aceito">Aceito</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="profissional-categoria-contrato-aceito"
                                    type="string"
                                    className="form-control"
                                    name="aceito"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="aceito" value={this.state.fieldsBase[baseFilters]} />
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
  profissionalCategoriaContratoEntity: storeState.profissionalCategoriaContrato.entity,
  loading: storeState.profissionalCategoriaContrato.loading,
  updating: storeState.profissionalCategoriaContrato.updating,
  updateSuccess: storeState.profissionalCategoriaContrato.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalCategoriaContratoUpdate);
