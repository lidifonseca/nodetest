import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IUnidadeEasyBaseState, getUnidadeEasyState } from './unidade-easy.reducer';
import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

export interface IUnidadeEasyState {
  fieldsBase: IUnidadeEasyBaseState;
}

export interface IUnidadeEasyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
  activeTab: number;
}

export class UnidadeEasyDetail extends React.Component<IUnidadeEasyDetailProps, IUnidadeEasyState> {
  constructor(props: Readonly<IUnidadeEasyDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getUnidadeEasyState(this.props.location),
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
    const { unidadeEasyEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Unidade Easies</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Unidade Easies</li>
          <li className="breadcrumb-item active">Unidade Easies details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.unidadeEasy.detail.title">UnidadeEasy</Translate>[<b>{unidadeEasyEntity.id}</b>]
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
                        <span className="d-sm-none">Default</span>
                        <span className="d-sm-block d-none">Default</span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId={0}></TabPane>
                    <TabPane tabId={1}></TabPane>
                    <TabPane tabId={2}>
                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="razaoSocial">
                                <Translate contentKey="generadorApp.unidadeEasy.razaoSocial">Razao Social</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{unidadeEasyEntity.razaoSocial}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="nomeFantasia">
                                <Translate contentKey="generadorApp.unidadeEasy.nomeFantasia">Nome Fantasia</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{unidadeEasyEntity.nomeFantasia}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="cnpj">
                                <Translate contentKey="generadorApp.unidadeEasy.cnpj">Cnpj</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{unidadeEasyEntity.cnpj}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="ie">
                                <Translate contentKey="generadorApp.unidadeEasy.ie">Ie</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{unidadeEasyEntity.ie}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="telefone1">
                                <Translate contentKey="generadorApp.unidadeEasy.telefone1">Telefone 1</Translate>
                              </span>
                              <UncontrolledTooltip target="telefone1">
                                <Translate contentKey="generadorApp.unidadeEasy.help.telefone1" />
                              </UncontrolledTooltip>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{unidadeEasyEntity.telefone1}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="telefone2">
                                <Translate contentKey="generadorApp.unidadeEasy.telefone2">Telefone 2</Translate>
                              </span>
                              <UncontrolledTooltip target="telefone2">
                                <Translate contentKey="generadorApp.unidadeEasy.help.telefone2" />
                              </UncontrolledTooltip>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{unidadeEasyEntity.telefone2}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="endereco">
                                <Translate contentKey="generadorApp.unidadeEasy.endereco">Endereco</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{unidadeEasyEntity.endereco}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="numero">
                                <Translate contentKey="generadorApp.unidadeEasy.numero">Numero</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{unidadeEasyEntity.numero}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="complemento">
                                <Translate contentKey="generadorApp.unidadeEasy.complemento">Complemento</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{unidadeEasyEntity.complemento}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="bairro">
                                <Translate contentKey="generadorApp.unidadeEasy.bairro">Bairro</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{unidadeEasyEntity.bairro}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="cidade">
                                <Translate contentKey="generadorApp.unidadeEasy.cidade">Cidade</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{unidadeEasyEntity.cidade}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="uf">
                                <Translate contentKey="generadorApp.unidadeEasy.uf">Uf</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{unidadeEasyEntity.uf}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="cep">
                                <Translate contentKey="generadorApp.unidadeEasy.cep">Cep</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{unidadeEasyEntity.cep}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="regans">
                                <Translate contentKey="generadorApp.unidadeEasy.regans">Regans</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{unidadeEasyEntity.regans}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="regcnes">
                                <Translate contentKey="generadorApp.unidadeEasy.regcnes">Regcnes</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{unidadeEasyEntity.regcnes}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="tissresponsavel">
                                <Translate contentKey="generadorApp.unidadeEasy.tissresponsavel">Tissresponsavel</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{unidadeEasyEntity.tissresponsavel}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="tissconselho">
                                <Translate contentKey="generadorApp.unidadeEasy.tissconselho">Tissconselho</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{unidadeEasyEntity.tissconselho}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="tissinscricao">
                                <Translate contentKey="generadorApp.unidadeEasy.tissinscricao">Tissinscricao</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{unidadeEasyEntity.tissinscricao}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="tisscbo">
                                <Translate contentKey="generadorApp.unidadeEasy.tisscbo">Tisscbo</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{unidadeEasyEntity.tisscbo}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="tisscoduf">
                                <Translate contentKey="generadorApp.unidadeEasy.tisscoduf">Tisscoduf</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{unidadeEasyEntity.tisscoduf}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="ativo">
                                <Translate contentKey="generadorApp.unidadeEasy.ativo">Ativo</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{unidadeEasyEntity.ativo}</dd>
                          </Col>
                        </Row>
                      </Col>
                    </TabPane>
                  </TabContent>
                </Row>
                <Button tag={Link} to="/unidade-easy" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/unidade-easy/${unidadeEasyEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ unidadeEasy }: IRootState) => ({
  unidadeEasyEntity: unidadeEasy.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UnidadeEasyDetail);
