import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IFranquiaBaseState, getFranquiaState } from './franquia.reducer';
import { IFranquia } from 'app/shared/model/franquia.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

export interface IFranquiaState {
  fieldsBase: IFranquiaBaseState;
}

export interface IFranquiaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
  activeTab: number;
}

export class FranquiaDetail extends React.Component<IFranquiaDetailProps, IFranquiaState> {
  constructor(props: Readonly<IFranquiaDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getFranquiaState(this.props.location),
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
    const { franquiaEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Franquias</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Franquias</li>
          <li className="breadcrumb-item active">Franquias details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.franquia.detail.title">Franquia</Translate>[<b>{franquiaEntity.id}</b>]
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
                              <span id="idCidade">
                                <Translate contentKey="generadorApp.franquia.idCidade">Id Cidade</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{franquiaEntity.idCidade}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="nomeFantasia">
                                <Translate contentKey="generadorApp.franquia.nomeFantasia">Nome Fantasia</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{franquiaEntity.nomeFantasia}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="razaoSocial">
                                <Translate contentKey="generadorApp.franquia.razaoSocial">Razao Social</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{franquiaEntity.razaoSocial}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="cnpj">
                                <Translate contentKey="generadorApp.franquia.cnpj">Cnpj</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{franquiaEntity.cnpj}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="ie">
                                <Translate contentKey="generadorApp.franquia.ie">Ie</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{franquiaEntity.ie}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="site">
                                <Translate contentKey="generadorApp.franquia.site">Site</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{franquiaEntity.site}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="telefone1">
                                <Translate contentKey="generadorApp.franquia.telefone1">Telefone 1</Translate>
                              </span>
                              <UncontrolledTooltip target="telefone1">
                                <Translate contentKey="generadorApp.franquia.help.telefone1" />
                              </UncontrolledTooltip>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{franquiaEntity.telefone1}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="telefone2">
                                <Translate contentKey="generadorApp.franquia.telefone2">Telefone 2</Translate>
                              </span>
                              <UncontrolledTooltip target="telefone2">
                                <Translate contentKey="generadorApp.franquia.help.telefone2" />
                              </UncontrolledTooltip>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{franquiaEntity.telefone2}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="celular">
                                <Translate contentKey="generadorApp.franquia.celular">Celular</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{franquiaEntity.celular}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="cep">
                                <Translate contentKey="generadorApp.franquia.cep">Cep</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{franquiaEntity.cep}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="endereco">
                                <Translate contentKey="generadorApp.franquia.endereco">Endereco</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{franquiaEntity.endereco}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="numero">
                                <Translate contentKey="generadorApp.franquia.numero">Numero</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{franquiaEntity.numero}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="complemento">
                                <Translate contentKey="generadorApp.franquia.complemento">Complemento</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{franquiaEntity.complemento}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="bairro">
                                <Translate contentKey="generadorApp.franquia.bairro">Bairro</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{franquiaEntity.bairro}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="cidade">
                                <Translate contentKey="generadorApp.franquia.cidade">Cidade</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{franquiaEntity.cidade}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="uf">
                                <Translate contentKey="generadorApp.franquia.uf">Uf</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{franquiaEntity.uf}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="observacao">
                                <Translate contentKey="generadorApp.franquia.observacao">Observacao</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{franquiaEntity.observacao}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="ativo">
                                <Translate contentKey="generadorApp.franquia.ativo">Ativo</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{franquiaEntity.ativo ? 'true' : 'false'}</dd>
                          </Col>
                        </Row>
                      </Col>
                    </TabPane>
                  </TabContent>
                </Row>
                <Button tag={Link} to="/franquia" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/franquia/${franquiaEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ franquia }: IRootState) => ({
  franquiaEntity: franquia.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FranquiaDetail);
