import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IProfissionalNewBaseState, getProfissionalNewState } from './profissional-new.reducer';
import { IProfissionalNew } from 'app/shared/model/profissional-new.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

export interface IProfissionalNewState {
  fieldsBase: IProfissionalNewBaseState;
}

export interface IProfissionalNewDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
  activeTab: number;
}

export class ProfissionalNewDetail extends React.Component<IProfissionalNewDetailProps, IProfissionalNewState> {
  constructor(props: Readonly<IProfissionalNewDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getProfissionalNewState(this.props.location),
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
    const { profissionalNewEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Profissional News</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Profissional News</li>
          <li className="breadcrumb-item active">Profissional News details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.profissionalNew.detail.title">ProfissionalNew</Translate>[
                  <b>{profissionalNewEntity.id}</b>]
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
                              <span id="idCidade">
                                <Translate contentKey="generadorApp.profissionalNew.idCidade">Id Cidade</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{profissionalNewEntity.idCidade}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="idTempoExperiencia">
                                <Translate contentKey="generadorApp.profissionalNew.idTempoExperiencia">Id Tempo Experiencia</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{profissionalNewEntity.idTempoExperiencia}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="idBanco">
                                <Translate contentKey="generadorApp.profissionalNew.idBanco">Id Banco</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{profissionalNewEntity.idBanco}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="senha">
                                <Translate contentKey="generadorApp.profissionalNew.senha">Senha</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{profissionalNewEntity.senha}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="nome">
                                <Translate contentKey="generadorApp.profissionalNew.nome">Nome</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{profissionalNewEntity.nome}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="email">
                                <Translate contentKey="generadorApp.profissionalNew.email">Email</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{profissionalNewEntity.email}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="cpf">
                                <Translate contentKey="generadorApp.profissionalNew.cpf">Cpf</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{profissionalNewEntity.cpf}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="rg">
                                <Translate contentKey="generadorApp.profissionalNew.rg">Rg</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{profissionalNewEntity.rg}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="nomeEmpresa">
                                <Translate contentKey="generadorApp.profissionalNew.nomeEmpresa">Nome Empresa</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{profissionalNewEntity.nomeEmpresa}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="cnpj">
                                <Translate contentKey="generadorApp.profissionalNew.cnpj">Cnpj</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{profissionalNewEntity.cnpj}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="registro">
                                <Translate contentKey="generadorApp.profissionalNew.registro">Registro</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{profissionalNewEntity.registro}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="nascimento">
                                <Translate contentKey="generadorApp.profissionalNew.nascimento">Nascimento</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>
                              <TextFormat value={profissionalNewEntity.nascimento} type="date" format={APP_LOCAL_DATE_FORMAT} />
                            </dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="sexo">
                                <Translate contentKey="generadorApp.profissionalNew.sexo">Sexo</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{profissionalNewEntity.sexo}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="telefone1">
                                <Translate contentKey="generadorApp.profissionalNew.telefone1">Telefone 1</Translate>
                              </span>
                              <UncontrolledTooltip target="telefone1">
                                <Translate contentKey="generadorApp.profissionalNew.help.telefone1" />
                              </UncontrolledTooltip>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{profissionalNewEntity.telefone1}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="telefone2">
                                <Translate contentKey="generadorApp.profissionalNew.telefone2">Telefone 2</Translate>
                              </span>
                              <UncontrolledTooltip target="telefone2">
                                <Translate contentKey="generadorApp.profissionalNew.help.telefone2" />
                              </UncontrolledTooltip>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{profissionalNewEntity.telefone2}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="celular1">
                                <Translate contentKey="generadorApp.profissionalNew.celular1">Celular 1</Translate>
                              </span>
                              <UncontrolledTooltip target="celular1">
                                <Translate contentKey="generadorApp.profissionalNew.help.celular1" />
                              </UncontrolledTooltip>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{profissionalNewEntity.celular1}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="celular2">
                                <Translate contentKey="generadorApp.profissionalNew.celular2">Celular 2</Translate>
                              </span>
                              <UncontrolledTooltip target="celular2">
                                <Translate contentKey="generadorApp.profissionalNew.help.celular2" />
                              </UncontrolledTooltip>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{profissionalNewEntity.celular2}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="cep">
                                <Translate contentKey="generadorApp.profissionalNew.cep">Cep</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{profissionalNewEntity.cep}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="endereco">
                                <Translate contentKey="generadorApp.profissionalNew.endereco">Endereco</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{profissionalNewEntity.endereco}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="numero">
                                <Translate contentKey="generadorApp.profissionalNew.numero">Numero</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{profissionalNewEntity.numero}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="complemento">
                                <Translate contentKey="generadorApp.profissionalNew.complemento">Complemento</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{profissionalNewEntity.complemento}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="bairro">
                                <Translate contentKey="generadorApp.profissionalNew.bairro">Bairro</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{profissionalNewEntity.bairro}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="cidade">
                                <Translate contentKey="generadorApp.profissionalNew.cidade">Cidade</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{profissionalNewEntity.cidade}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="uf">
                                <Translate contentKey="generadorApp.profissionalNew.uf">Uf</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{profissionalNewEntity.uf}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="atendeCrianca">
                                <Translate contentKey="generadorApp.profissionalNew.atendeCrianca">Atende Crianca</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{profissionalNewEntity.atendeCrianca}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="atendeIdoso">
                                <Translate contentKey="generadorApp.profissionalNew.atendeIdoso">Atende Idoso</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{profissionalNewEntity.atendeIdoso}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="ag">
                                <Translate contentKey="generadorApp.profissionalNew.ag">Ag</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{profissionalNewEntity.ag}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="conta">
                                <Translate contentKey="generadorApp.profissionalNew.conta">Conta</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{profissionalNewEntity.conta}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="tipoConta">
                                <Translate contentKey="generadorApp.profissionalNew.tipoConta">Tipo Conta</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{profissionalNewEntity.tipoConta}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="origemCadastro">
                                <Translate contentKey="generadorApp.profissionalNew.origemCadastro">Origem Cadastro</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{profissionalNewEntity.origemCadastro}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="obs">
                                <Translate contentKey="generadorApp.profissionalNew.obs">Obs</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{profissionalNewEntity.obs}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="chavePrivada">
                                <Translate contentKey="generadorApp.profissionalNew.chavePrivada">Chave Privada</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{profissionalNewEntity.chavePrivada}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <span id="ativo">
                                <Translate contentKey="generadorApp.profissionalNew.ativo">Ativo</Translate>
                              </span>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{profissionalNewEntity.ativo}</dd>
                          </Col>
                        </Row>
                      </Col>

                      <Col md="12">
                        <Row>
                          <Col md="3">
                            <dt>
                              <Translate contentKey="generadorApp.profissionalNew.unidade">Unidade</Translate>
                            </dt>
                          </Col>
                          <Col md="9">
                            <dd>{profissionalNewEntity.unidade ? profissionalNewEntity.unidade.id : ''}</dd>
                          </Col>
                        </Row>
                      </Col>
                    </TabPane>
                  </TabContent>
                </Row>
                <Button tag={Link} to="/profissional-new" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/profissional-new/${profissionalNewEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ profissionalNew }: IRootState) => ({
  profissionalNewEntity: profissionalNew.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalNewDetail);
