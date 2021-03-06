import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IEmpresaBaseState, getEmpresaState } from './empresa.reducer';
import { IEmpresa } from 'app/shared/model/empresa.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

export interface IEmpresaState {
  fieldsBase: IEmpresaBaseState;
}

export interface IEmpresaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
  activeTab: number;
}

export class EmpresaDetail extends React.Component<IEmpresaDetailProps, IEmpresaState> {
  constructor(props: Readonly<IEmpresaDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getEmpresaState(this.props.location),
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
    const { empresaEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Empresas</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Empresas</li>
          <li className="breadcrumb-item active">Empresas details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.empresa.detail.title">Empresa</Translate>[<b>{empresaEntity.id}</b>]
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
                        <span className="d-sm-none"> TELEFONE1</span>
                        <span className="d-sm-block d-none">TELEFONE1</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === 1 })}
                        onClick={() => {
                          this.toggleTab(1);
                        }}
                      >
                        <span className="d-sm-none"> TELEFONE2</span>
                        <span className="d-sm-block d-none">TELEFONE2</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === 2 })}
                        onClick={() => {
                          this.toggleTab(2);
                        }}
                      >
                        <span className="d-sm-none"> CELULAR1</span>
                        <span className="d-sm-block d-none">CELULAR1</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === 3 })}
                        onClick={() => {
                          this.toggleTab(3);
                        }}
                      >
                        <span className="d-sm-none"> CELULAR2</span>
                        <span className="d-sm-block d-none">CELULAR2</span>
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
                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="empresa">
                                <Translate contentKey="generadorApp.empresa.empresa">Empresa</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{empresaEntity.empresa}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="nome">
                                <Translate contentKey="generadorApp.empresa.nome">Nome</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{empresaEntity.nome}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="email">
                                <Translate contentKey="generadorApp.empresa.email">Email</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{empresaEntity.email}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="cpf">
                                <Translate contentKey="generadorApp.empresa.cpf">Cpf</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{empresaEntity.cpf}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="rg">
                                <Translate contentKey="generadorApp.empresa.rg">Rg</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{empresaEntity.rg}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="nascimento">
                                <Translate contentKey="generadorApp.empresa.nascimento">Nascimento</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>
                              <TextFormat value={empresaEntity.nascimento} type="date" format={APP_LOCAL_DATE_FORMAT} />
                            </dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="sexo">
                                <Translate contentKey="generadorApp.empresa.sexo">Sexo</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{empresaEntity.sexo}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="telefone1">
                                <Translate contentKey="generadorApp.empresa.telefone1">Telefone 1</Translate>
                              </span>
                              <UncontrolledTooltip target="telefone1">
                                <Translate contentKey="generadorApp.empresa.help.telefone1" />
                              </UncontrolledTooltip>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{empresaEntity.telefone1}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="telefone2">
                                <Translate contentKey="generadorApp.empresa.telefone2">Telefone 2</Translate>
                              </span>
                              <UncontrolledTooltip target="telefone2">
                                <Translate contentKey="generadorApp.empresa.help.telefone2" />
                              </UncontrolledTooltip>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{empresaEntity.telefone2}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="celular1">
                                <Translate contentKey="generadorApp.empresa.celular1">Celular 1</Translate>
                              </span>
                              <UncontrolledTooltip target="celular1">
                                <Translate contentKey="generadorApp.empresa.help.celular1" />
                              </UncontrolledTooltip>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{empresaEntity.celular1}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="celular2">
                                <Translate contentKey="generadorApp.empresa.celular2">Celular 2</Translate>
                              </span>
                              <UncontrolledTooltip target="celular2">
                                <Translate contentKey="generadorApp.empresa.help.celular2" />
                              </UncontrolledTooltip>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{empresaEntity.celular2}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="cep">
                                <Translate contentKey="generadorApp.empresa.cep">Cep</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{empresaEntity.cep}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="endereco">
                                <Translate contentKey="generadorApp.empresa.endereco">Endereco</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{empresaEntity.endereco}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="numero">
                                <Translate contentKey="generadorApp.empresa.numero">Numero</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{empresaEntity.numero}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="complemento">
                                <Translate contentKey="generadorApp.empresa.complemento">Complemento</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{empresaEntity.complemento}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="bairro">
                                <Translate contentKey="generadorApp.empresa.bairro">Bairro</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{empresaEntity.bairro}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="uf">
                                <Translate contentKey="generadorApp.empresa.uf">Uf</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{empresaEntity.uf}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="tipo">
                                <Translate contentKey="generadorApp.empresa.tipo">Tipo</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{empresaEntity.tipo}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <Translate contentKey="generadorApp.empresa.cidade">Cidade</Translate>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{empresaEntity.cidade ? empresaEntity.cidade.id : ''}</dd>
                          </Col>
                        </Row>
                      </Col>
                    </TabPane>
                  </TabContent>
                </Row>
                <Button tag={Link} to="/empresa" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/empresa/${empresaEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ empresa }: IRootState) => ({
  empresaEntity: empresa.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmpresaDetail);
