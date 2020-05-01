import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

import { IProcesso } from 'app/shared/model/processo.model';
import { getEntities as getProcessos } from 'app/entities/processo/processo.reducer';
import { getEntity, updateEntity, createEntity, reset } from './apenso.reducer';
import { IApenso } from 'app/shared/model/apenso.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IApensoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IApensoUpdateState {
  activeTab: number;
  isNew: boolean;
  processoId: string;
}

export class ApensoUpdate extends React.Component<IApensoUpdateProps, IApensoUpdateState> {
  constructor(props: Readonly<IApensoUpdateProps>) {
    super(props);
    this.state = {
      activeTab: 0,
      processoId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  toggleTab(tab: number) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
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

  saveEntity = (event: any, errors: any, values: any) => {
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
        <AvForm model={isNew ? {} : apensoEntity} onSubmit={this.saveEntity}>
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  {' '}
                  <Translate contentKey="generadorApp.apenso.home.createOrEditLabel">Create or edit a Apenso</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/apenso" replace color="info" className="float-right jh-create-entity">
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
                            {/* <Col md="3">
                          <Label className="mt-2" for="apenso-id"><Translate contentKey="global.field.id">ID</Translate></Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput id="apenso-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      {!isNew ? (
                        <Nav tabs>
                          <NavItem>
                            <NavLink
                              className={classnames({ active: this.state.activeTab === 0 })}
                              onClick={() => {
                                this.toggleTab(0);
                              }}
                            >
                              <span className="d-sm-none"> primeiro</span>
                              <span className="d-sm-block d-none">primeiro</span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames({ active: this.state.activeTab === 1 })}
                              onClick={() => {
                                this.toggleTab(1);
                              }}
                            >
                              <span className="d-sm-none"> segundo</span>
                              <span className="d-sm-block d-none">segundo</span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames({ active: this.state.activeTab === 2 })}
                              onClick={() => {
                                this.toggleTab(2);
                              }}
                            >
                              <span className="d-sm-none">Default</span>
                              <span className="d-sm-block d-none">Default</span>
                            </NavLink>
                          </NavItem>
                        </Nav>
                      ) : null}
                      <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId={0}>
                          {isNew ? (
                            <Row className="justify-content-center mb-3">
                              <Col md="12">
                                <h2 id="generadorApp.apenso.home.formTabs_1">primeiro</h2>
                              </Col>
                            </Row>
                          ) : null}

                          <AvGroup>
                            <Row>
                              <Col md="12">
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
                                  <UncontrolledTooltip target="numeroLabel">
                                    <Translate contentKey="generadorApp.apenso.help.numero" />
                                  </UncontrolledTooltip>
                                </Row>
                              </Col>
                            </Row>
                          </AvGroup>

                          <AvGroup>
                            <Row>
                              <Col md="12">
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
                              </Col>
                            </Row>
                          </AvGroup>

                          {isNew ? (
                            <Button
                              color="primary"
                              className={'float-right jh-create-entity'}
                              onClick={() => {
                                this.toggleTab(1);
                              }}
                            >
                              <span className="d-sm-none">segundo</span>
                              <span className="d-sm-block d-none">
                                segundo &nbsp;
                                <FontAwesomeIcon icon="arrow-right" />
                              </span>
                            </Button>
                          ) : null}
                        </TabPane>
                        <TabPane tabId={1}>
                          {isNew ? (
                            <Row className="justify-content-center mb-3">
                              <Col md="12">
                                <h2 id="generadorApp.apenso.home.formTabs_3">segundo</h2>
                              </Col>
                            </Row>
                          ) : null}

                          <AvGroup>
                            <Row>
                              <Col md="12">
                                <Row>
                                  <Col md="3">
                                    <Label className="mt-2" id="claseLabel" for="apenso-clase">
                                      <Translate contentKey="generadorApp.apenso.clase">Clase</Translate>
                                    </Label>
                                  </Col>
                                  <Col md="9">
                                    <AvField id="apenso-clase" type="text" name="clase" />
                                  </Col>
                                  <UncontrolledTooltip target="claseLabel">
                                    <Translate contentKey="generadorApp.apenso.help.clase" />
                                  </UncontrolledTooltip>
                                </Row>
                              </Col>
                            </Row>
                          </AvGroup>

                          {isNew ? (
                            <Button
                              color="primary"
                              className={'float-right jh-create-entity'}
                              onClick={() => {
                                this.toggleTab(2);
                              }}
                            >
                              <span className="d-sm-none">Default</span>
                              <span className="d-sm-block d-none">
                                Default &nbsp;
                                <FontAwesomeIcon icon="arrow-right" />
                              </span>
                            </Button>
                          ) : null}

                          {isNew ? (
                            <Button
                              color="info"
                              className={'float-right jh-create-entity'}
                              onClick={() => {
                                this.toggleTab(0);
                              }}
                            >
                              <span className="d-sm-none"> primeiro </span>
                              <span className="d-sm-block d-none">
                                <FontAwesomeIcon icon="arrow-left" />
                                &nbsp; primeiro
                              </span>
                            </Button>
                          ) : null}
                        </TabPane>
                        <TabPane tabId={2}>
                          {isNew ? (
                            <Row className="justify-content-center mb-3">
                              <Col md="12">
                                <h2 id="generadorApp.apenso.home.formTabs_default">Default</h2>
                              </Col>
                            </Row>
                          ) : null}

                          <AvGroup>
                            <Row>
                              <Col md="6">
                                <Row>
                                  <Col md="12">
                                    <Label className="mt-2" id="apensamentoLabel" for="apenso-apensamento">
                                      <Translate contentKey="generadorApp.apenso.apensamento">Apensamento</Translate>
                                    </Label>
                                  </Col>
                                  <Col md="12">
                                    <AvField id="apenso-apensamento" type="date" className="form-control" name="apensamento" />
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </AvGroup>
                          <AvGroup>
                            <Row>
                              <Col md="6">
                                <Row>
                                  <Col md="12">
                                    <Label className="mt-2" for="apenso-processo">
                                      <Translate contentKey="generadorApp.apenso.processo">Processo</Translate>
                                    </Label>
                                  </Col>
                                  <Col md="12">
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
                              </Col>
                            </Row>
                          </AvGroup>

                          {isNew ? (
                            <Button
                              color="primary"
                              id="save-entity"
                              type="submit"
                              disabled={updating}
                              className="btn btn-primary float-right jh-create-entity"
                            >
                              <FontAwesomeIcon icon="save" />
                              &nbsp;
                              <Translate contentKey="entity.action.save">Save</Translate>
                            </Button>
                          ) : null}

                          {isNew ? (
                            <Button
                              color="info"
                              className={'float-right jh-create-entity '}
                              onClick={() => {
                                this.toggleTab(1);
                              }}
                            >
                              <span className="d-sm-none"> segundo </span>
                              <span className="d-sm-block d-none">
                                <FontAwesomeIcon icon="arrow-left" />
                                &nbsp; segundo
                              </span>
                            </Button>
                          ) : null}
                        </TabPane>
                      </TabContent>
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
