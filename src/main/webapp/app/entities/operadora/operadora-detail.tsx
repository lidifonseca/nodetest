import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './operadora.reducer';
import { IOperadora } from 'app/shared/model/operadora.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOperadoraDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class OperadoraDetail extends React.Component<IOperadoraDetailProps> {
  constructor(props: Readonly<IOperadoraDetailProps>) {
    super(props);
    this.state = {
      ...this.state
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { operadoraEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Operadoras</li>
          <li className="breadcrumb-item active">Operadoras details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Operadoras</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.operadora.detail.title">Operadora</Translate>[<b>{operadoraEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="nomeFantasia">
                            <Translate contentKey="generadorApp.operadora.nomeFantasia">Nome Fantasia</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{operadoraEntity.nomeFantasia}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="razaoSocial">
                            <Translate contentKey="generadorApp.operadora.razaoSocial">Razao Social</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{operadoraEntity.razaoSocial}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cnpj">
                            <Translate contentKey="generadorApp.operadora.cnpj">Cnpj</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{operadoraEntity.cnpj}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ie">
                            <Translate contentKey="generadorApp.operadora.ie">Ie</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{operadoraEntity.ie}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="site">
                            <Translate contentKey="generadorApp.operadora.site">Site</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{operadoraEntity.site}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativo">
                            <Translate contentKey="generadorApp.operadora.ativo">Ativo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{operadoraEntity.ativo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="dataPost">
                            <Translate contentKey="generadorApp.operadora.dataPost">Data Post</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={operadoraEntity.dataPost} type="date" format={APP_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idUnidade">
                            <Translate contentKey="generadorApp.operadora.idUnidade">Id Unidade</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{operadoraEntity.idUnidade}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="endereco">
                            <Translate contentKey="generadorApp.operadora.endereco">Endereco</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{operadoraEntity.endereco}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="contatoCentralAtendimento">
                            <Translate contentKey="generadorApp.operadora.contatoCentralAtendimento">Contato Central Atendimento</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{operadoraEntity.contatoCentralAtendimento}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="emailCentralAtendimento">
                            <Translate contentKey="generadorApp.operadora.emailCentralAtendimento">Email Central Atendimento</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{operadoraEntity.emailCentralAtendimento}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="nomeContatoComercial">
                            <Translate contentKey="generadorApp.operadora.nomeContatoComercial">Nome Contato Comercial</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{operadoraEntity.nomeContatoComercial}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="contatoComercial">
                            <Translate contentKey="generadorApp.operadora.contatoComercial">Contato Comercial</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{operadoraEntity.contatoComercial}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="emailComercial">
                            <Translate contentKey="generadorApp.operadora.emailComercial">Email Comercial</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{operadoraEntity.emailComercial}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="nomeContatoFinanceiro">
                            <Translate contentKey="generadorApp.operadora.nomeContatoFinanceiro">Nome Contato Financeiro</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{operadoraEntity.nomeContatoFinanceiro}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="contatoFinanceiro">
                            <Translate contentKey="generadorApp.operadora.contatoFinanceiro">Contato Financeiro</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{operadoraEntity.contatoFinanceiro}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="emailFinanceiro">
                            <Translate contentKey="generadorApp.operadora.emailFinanceiro">Email Financeiro</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{operadoraEntity.emailFinanceiro}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idTipoOperadora">
                            <Translate contentKey="generadorApp.operadora.idTipoOperadora">Id Tipo Operadora</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{operadoraEntity.idTipoOperadora}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/operadora" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/operadora/${operadoraEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ operadora }: IRootState) => ({
  operadoraEntity: operadora.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OperadoraDetail);
