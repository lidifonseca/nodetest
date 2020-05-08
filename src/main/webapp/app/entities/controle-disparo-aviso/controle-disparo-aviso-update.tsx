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
  IControleDisparoAvisoUpdateState,
  getEntity,
  getControleDisparoAvisoState,
  IControleDisparoAvisoBaseState,
  updateEntity,
  createEntity,
  reset
} from './controle-disparo-aviso.reducer';
import { IControleDisparoAviso } from 'app/shared/model/controle-disparo-aviso.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IControleDisparoAvisoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ControleDisparoAvisoUpdate extends React.Component<IControleDisparoAvisoUpdateProps, IControleDisparoAvisoUpdateState> {
  constructor(props: Readonly<IControleDisparoAvisoUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getControleDisparoAvisoState(this.props.location),
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
      const { controleDisparoAvisoEntity } = this.props;
      const entity = {
        ...controleDisparoAvisoEntity,

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
    this.props.history.push('/controle-disparo-aviso?' + this.getFiltersURL());
  };

  render() {
    const { controleDisparoAvisoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...controleDisparoAvisoEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.controleDisparoAviso.home.createOrEditLabel">
                Create or edit a ControleDisparoAviso
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
              to={'/controle-disparo-aviso?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Controle Disparo Avisos</li>
            <li className="breadcrumb-item active">Controle Disparo Avisos edit</li>
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
                        <Label className="mt-2" for="controle-disparo-aviso-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput id="controle-disparo-aviso-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'idAtendimento' ? (
                          <Col md="idAtendimento">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idAtendimentoLabel" for="controle-disparo-aviso-idAtendimento">
                                    <Translate contentKey="generadorApp.controleDisparoAviso.idAtendimento">Id Atendimento</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="controle-disparo-aviso-idAtendimento"
                                    type="string"
                                    className="form-control"
                                    name="idAtendimento"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idAtendimento" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'qtdDisparo' ? (
                          <Col md="qtdDisparo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="qtdDisparoLabel" for="controle-disparo-aviso-qtdDisparo">
                                    <Translate contentKey="generadorApp.controleDisparoAviso.qtdDisparo">Qtd Disparo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="controle-disparo-aviso-qtdDisparo"
                                    type="string"
                                    className="form-control"
                                    name="qtdDisparo"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="qtdDisparo" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'avisopush' ? (
                          <Col md="avisopush">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="avisopushLabel" for="controle-disparo-aviso-avisopush">
                                    <Translate contentKey="generadorApp.controleDisparoAviso.avisopush">Avisopush</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="controle-disparo-aviso-avisopush" type="string" className="form-control" name="avisopush" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="avisopush" value={this.state.fieldsBase[baseFilters]} />
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
  controleDisparoAvisoEntity: storeState.controleDisparoAviso.entity,
  loading: storeState.controleDisparoAviso.loading,
  updating: storeState.controleDisparoAviso.updating,
  updateSuccess: storeState.controleDisparoAviso.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ControleDisparoAvisoUpdate);
