import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './profissional.reducer';
import { IProfissional } from 'app/shared/model/profissional.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProfissionalDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProfissionalDetail extends React.Component<IProfissionalDetailProps> {
  constructor(props: Readonly<IProfissionalDetailProps>) {
    super(props);
    this.state = {
      ...this.state
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { profissionalEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Profissionals</li>
          <li className="breadcrumb-item active">Profissionals details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Profissionals</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.profissional.detail.title">Profissional</Translate>[<b>{profissionalEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idUnidade">
                            <Translate contentKey="generadorApp.profissional.idUnidade">Id Unidade</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.idUnidade}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idCidade">
                            <Translate contentKey="generadorApp.profissional.idCidade">Id Cidade</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.idCidade}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idTempoExperiencia">
                            <Translate contentKey="generadorApp.profissional.idTempoExperiencia">Id Tempo Experiencia</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.idTempoExperiencia}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idBanco">
                            <Translate contentKey="generadorApp.profissional.idBanco">Id Banco</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.idBanco}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="senha">
                            <Translate contentKey="generadorApp.profissional.senha">Senha</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.senha}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="nome">
                            <Translate contentKey="generadorApp.profissional.nome">Nome</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.nome}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="email">
                            <Translate contentKey="generadorApp.profissional.email">Email</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.email}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cpf">
                            <Translate contentKey="generadorApp.profissional.cpf">Cpf</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.cpf}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="rg">
                            <Translate contentKey="generadorApp.profissional.rg">Rg</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.rg}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="nomeEmpresa">
                            <Translate contentKey="generadorApp.profissional.nomeEmpresa">Nome Empresa</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.nomeEmpresa}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cnpj">
                            <Translate contentKey="generadorApp.profissional.cnpj">Cnpj</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.cnpj}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="registro">
                            <Translate contentKey="generadorApp.profissional.registro">Registro</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.registro}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="nascimento">
                            <Translate contentKey="generadorApp.profissional.nascimento">Nascimento</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={profissionalEntity.nascimento} type="date" format={APP_LOCAL_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="sexo">
                            <Translate contentKey="generadorApp.profissional.sexo">Sexo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.sexo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="telefone1">
                            <Translate contentKey="generadorApp.profissional.telefone1">Telefone 1</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.telefone1}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="telefone2">
                            <Translate contentKey="generadorApp.profissional.telefone2">Telefone 2</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.telefone2}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="celular1">
                            <Translate contentKey="generadorApp.profissional.celular1">Celular 1</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.celular1}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="celular2">
                            <Translate contentKey="generadorApp.profissional.celular2">Celular 2</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.celular2}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cep">
                            <Translate contentKey="generadorApp.profissional.cep">Cep</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.cep}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="endereco">
                            <Translate contentKey="generadorApp.profissional.endereco">Endereco</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.endereco}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="numero">
                            <Translate contentKey="generadorApp.profissional.numero">Numero</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.numero}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="complemento">
                            <Translate contentKey="generadorApp.profissional.complemento">Complemento</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.complemento}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="bairro">
                            <Translate contentKey="generadorApp.profissional.bairro">Bairro</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.bairro}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cidade">
                            <Translate contentKey="generadorApp.profissional.cidade">Cidade</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.cidade}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="uf">
                            <Translate contentKey="generadorApp.profissional.uf">Uf</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.uf}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="atendeCrianca">
                            <Translate contentKey="generadorApp.profissional.atendeCrianca">Atende Crianca</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.atendeCrianca}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="atendeIdoso">
                            <Translate contentKey="generadorApp.profissional.atendeIdoso">Atende Idoso</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.atendeIdoso}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ag">
                            <Translate contentKey="generadorApp.profissional.ag">Ag</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.ag}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="conta">
                            <Translate contentKey="generadorApp.profissional.conta">Conta</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.conta}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="tipoConta">
                            <Translate contentKey="generadorApp.profissional.tipoConta">Tipo Conta</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.tipoConta}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="origemCadastro">
                            <Translate contentKey="generadorApp.profissional.origemCadastro">Origem Cadastro</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.origemCadastro}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="obs">
                            <Translate contentKey="generadorApp.profissional.obs">Obs</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.obs}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="chavePrivada">
                            <Translate contentKey="generadorApp.profissional.chavePrivada">Chave Privada</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.chavePrivada}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativo">
                            <Translate contentKey="generadorApp.profissional.ativo">Ativo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.ativo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="dataPost">
                            <Translate contentKey="generadorApp.profissional.dataPost">Data Post</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={profissionalEntity.dataPost} type="date" format={APP_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="senhaOriginal">
                            <Translate contentKey="generadorApp.profissional.senhaOriginal">Senha Original</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.senhaOriginal}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="dataSenha">
                            <Translate contentKey="generadorApp.profissional.dataSenha">Data Senha</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={profissionalEntity.dataSenha} type="date" format={APP_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="expoToken">
                            <Translate contentKey="generadorApp.profissional.expoToken">Expo Token</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.expoToken}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="preferenciaAtendimento">
                            <Translate contentKey="generadorApp.profissional.preferenciaAtendimento">Preferencia Atendimento</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.preferenciaAtendimento}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="senhaChat">
                            <Translate contentKey="generadorApp.profissional.senhaChat">Senha Chat</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEntity.senhaChat}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/profissional" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/profissional/${profissionalEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ profissional }: IRootState) => ({
  profissionalEntity: profissional.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalDetail);
