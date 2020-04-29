import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProcesso } from 'app/shared/model/processo.model';
import { getEntities as getProcessos } from 'app/entities/processo/processo.reducer';
import { getEntity, updateEntity, createEntity, reset } from './apenso.reducer';
import { IApenso } from 'app/shared/model/apenso.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IApensoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IApensoUpdateState {
  isNew: boolean;
  processoId: string;
}

export class ApensoUpdate extends React.Component<IApensoUpdateProps, IApensoUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      processoId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
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

    this.props.getProcessos();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { apensoEntity } = this.props;
      const entity = {
        ...apensoEntity,
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
    this.props.history.push('/apenso');
  };

  render() {
    const { apensoEntity, processos, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Apensos</li>
          <li className="breadcrumb-item active">Apensos edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Apensos</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row className="justify-content-center">
              <Col md="8">
                <h2 id="generadorApp.apenso.home.createOrEditLabel">
                  <Translate contentKey="generadorApp.apenso.home.createOrEditLabel">Create or edit a Apenso</Translate>
                </h2>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col md="8">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <AvForm model={isNew ? {} : apensoEntity} onSubmit={this.saveEntity}>
                    {!isNew ? (
                      <AvGroup>
                        <Row>
                          <Col md="3">
                            <Label className="mt-2" for="apenso-id">
                              <Translate contentKey="global.field.id">ID</Translate>
                            </Label>
                          </Col>
                          <Col md="9">
                            <AvInput id="apenso-id" type="text" className="form-control" name="id" required readOnly />
                          </Col>
                        </Row>
                      </AvGroup>
                    ) : null}
                    <AvGroup>
                      <Row>
                        <Col md="3">
                          <Label className="mt-2" id="numeroLabel" for="apenso-numero">
                            <Translate contentKey="generadorApp.apenso.numero">Numero</Translate>
                          </Label>
                        </Col>
                        <Col md="9">
                          <AvField
                            id="apenso-numero"
                            type="text"
                            name="numero"
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') }
                            }}
                          />
                        </Col>
                      </Row>
                    </AvGroup>
                    <AvGroup>
                      <Row>
                        <Col md="3">
                          <Label className="mt-2" id="claseLabel" for="apenso-clase">
                            <Translate contentKey="generadorApp.apenso.clase">Clase</Translate>
                          </Label>
                        </Col>
                        <Col md="9">
                          <AvField id="apenso-clase" type="text" name="clase" />
                        </Col>
                      </Row>
                    </AvGroup>
                    <AvGroup>
                      <Row>
                        <Col md="3">
                          <Label className="mt-2" id="apensamentoLabel" for="apenso-apensamento">
                            <Translate contentKey="generadorApp.apenso.apensamento">Apensamento</Translate>
                          </Label>
                        </Col>
                        <Col md="9">
                          <AvField id="apenso-apensamento" type="date" className="form-control" name="apensamento" />
                        </Col>
                      </Row>
                    </AvGroup>
                    <AvGroup>
                      <Row>
                        <Col md="3">
                          <Label className="mt-2" id="motivoLabel" for="apenso-motivo">
                            <Translate contentKey="generadorApp.apenso.motivo">Motivo</Translate>
                          </Label>
                        </Col>
                        <Col md="9">
                          <AvField id="apenso-motivo" type="text" name="motivo" />
                        </Col>
                      </Row>
                    </AvGroup>
                    <AvGroup>
                      <Row>
                        <Col md="3">
                          <Label className="mt-2" for="apenso-processo">
                            <Translate contentKey="generadorApp.apenso.processo">Processo</Translate>
                          </Label>
                        </Col>
                        <Col md="9">
                          <AvInput id="apenso-processo" type="select" className="form-control" name="processoId">
                            <option value="" key="0" />
                            {processos
                              ? processos.map(otherEntity => (
                                  <option value={otherEntity.id} key={otherEntity.id}>
                                    {otherEntity.id}
                                  </option>
                                ))
                              : null}
                          </AvInput>
                        </Col>
                      </Row>
                    </AvGroup>
                    <Button tag={Link} id="cancel-save" to="/apenso" replace color="info">
                      <FontAwesomeIcon icon="arrow-left" />
                      &nbsp;
                      <span className="d-none d-md-inline">
                        <Translate contentKey="entity.action.back">Back</Translate>
                      </span>
                    </Button>
                    &nbsp;
                    <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                      <FontAwesomeIcon icon="save" />
                      &nbsp;
                      <Translate contentKey="entity.action.save">Save</Translate>
                    </Button>
                  </AvForm>
                )}
              </Col>
            </Row>
          </PanelBody>
        </Panel>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  processos: storeState.processo.entities,
  apensoEntity: storeState.apenso.entity,
  loading: storeState.apenso.loading,
  updating: storeState.apenso.updating,
  updateSuccess: storeState.apenso.updateSuccess
});

const mapDispatchToProps = {
  getProcessos,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApensoUpdate);
