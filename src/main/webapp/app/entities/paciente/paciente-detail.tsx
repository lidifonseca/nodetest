import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IPacienteBaseState, getPacienteState } from './paciente.reducer';
import { IPaciente } from 'app/shared/model/paciente.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

export interface IPacienteState {
  fieldsBase: IPacienteBaseState;
}

export interface IPacienteDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
  activeTab: number;
}

export class PacienteDetail extends React.Component<IPacienteDetailProps, IPacienteState> {
  constructor(props: Readonly<IPacienteDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getPacienteState(this.props.location),
      activeTab: 0
    };
  }

  toggleTab(tab: number) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { pacienteEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pacientes</li>
          <li className="breadcrumb-item active">Pacientes details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Pacientes</span>
              <Button className="float-right jh-create-entity" tag={Link} to={`/paciente/${pacienteEntity.id}`} color="info" size="sm">
                <FontAwesomeIcon icon="eye" />{' '}
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.view">View</Translate>
                </span>
              </Button>
              <Button
                className="float-right jh-create-entity"
                tag={Link}
                to={`/paciente/${pacienteEntity.id}/edit`}
                color="primary"
                size="sm"
              >
                <FontAwesomeIcon icon="pencil-alt" />{' '}
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.edit">Edit</Translate>
                </span>
              </Button>
              <Button
                className="float-right jh-create-entity"
                tag={Link}
                to={`/paciente/${pacienteEntity.id}/delete`}
                color="danger"
                size="sm"
              >
                <FontAwesomeIcon icon="trash" />{' '}
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.delete">Delete</Translate>
                </span>
              </Button>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.paciente.detail.title">Paciente</Translate>
                  <small>&nbsp; {pacienteEntity['nome']}</small>
                </h2>
                <Row className="jh-entity-details">
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === 0 })}
                        onClick={() => {
                          this.toggleTab(0);
                        }}
                      >
                        <span className="d-sm-none"> TELEFONE2</span>
                        <span className="d-sm-block d-none">TELEFONE2</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === 1 })}
                        onClick={() => {
                          this.toggleTab(1);
                        }}
                      >
                        <span className="d-sm-none"> CELULAR1</span>
                        <span className="d-sm-block d-none">CELULAR1</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === 2 })}
                        onClick={() => {
                          this.toggleTab(2);
                        }}
                      >
                        <span className="d-sm-none"> TELEFONE2_FAMILIAR</span>
                        <span className="d-sm-block d-none">TELEFONE2_FAMILIAR</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === 3 })}
                        onClick={() => {
                          this.toggleTab(3);
                        }}
                      >
                        <span className="d-sm-none"> CELULAR2_FAMILIAR</span>
                        <span className="d-sm-block d-none">CELULAR2_FAMILIAR</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === 4 })}
                        onClick={() => {
                          this.toggleTab(4);
                        }}
                      >
                        <span className="d-sm-none">Default</span>
                        <span className="d-sm-block d-none">Default</span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId={0}></TabPane>
                    <TabPane tabId={1}></TabPane>
                    <TabPane tabId={2}></TabPane>
                    <TabPane tabId={3}></TabPane>
                    <TabPane tabId={4}>
                      <Col md="6">
                        <Row>
                          <Col md="12">
                            <dt>
                              <Translate contentKey="generadorApp.paciente.cidade">Cidade</Translate>
                            </dt>
                          </Col>
                          <Col md="12">
                            <dd>{pacienteEntity.cidade ? pacienteEntity.cidade.id : ''}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="6">
                        <Row>
                          <Col md="12">
                            <dt>
                              <span id="nome">
                                <Translate contentKey="generadorApp.paciente.nome">Nome</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="12">
                            <dd>{pacienteEntity.nome}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="6">
                        <Row>
                          <Col md="12">
                            <dt>
                              <span id="email">
                                <Translate contentKey="generadorApp.paciente.email">Email</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="12">
                            <dd>{pacienteEntity.email}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="6">
                        <Row>
                          <Col md="12">
                            <dt>
                              <span id="cpf">
                                <Translate contentKey="generadorApp.paciente.cpf">Cpf</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="12">
                            <dd>{pacienteEntity.cpf}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="6">
                        <Row>
                          <Col md="12">
                            <dt>
                              <span id="rg">
                                <Translate contentKey="generadorApp.paciente.rg">Rg</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="12">
                            <dd>{pacienteEntity.rg}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="6">
                        <Row>
                          <Col md="12">
                            <dt>
                              <span id="registro">
                                <Translate contentKey="generadorApp.paciente.registro">Registro</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="12">
                            <dd>{pacienteEntity.registro}</dd>
                          </Col>
                        </Row>
                      </Col>
                    </TabPane>
                  </TabContent>
                </Row>
                <Button tag={Link} to="/paciente" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/paciente/${pacienteEntity.id}/edit`} replace color="primary">
                  <FontAwesomeIcon icon="pencil-alt" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.edit">Edit</Translate>
                  </span>
                </Button>
              </Col>
            </Row>
          </PanelBody>
        </Panel>
      </div>
    );
  }
}

const mapStateToProps = ({ paciente }: IRootState) => ({
  pacienteEntity: paciente.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteDetail);
