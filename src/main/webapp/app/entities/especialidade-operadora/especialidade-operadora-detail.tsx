import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IEspecialidadeOperadoraBaseState, getEspecialidadeOperadoraState } from './especialidade-operadora.reducer';
import { IEspecialidadeOperadora } from 'app/shared/model/especialidade-operadora.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEspecialidadeOperadoraState {
  fieldsBase: IEspecialidadeOperadoraBaseState;
}

export interface IEspecialidadeOperadoraDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EspecialidadeOperadoraDetail extends React.Component<IEspecialidadeOperadoraDetailProps, IEspecialidadeOperadoraState> {
  constructor(props: Readonly<IEspecialidadeOperadoraDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getEspecialidadeOperadoraState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { especialidadeOperadoraEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Especialidade Operadoras</li>
          <li className="breadcrumb-item active">Especialidade Operadoras details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Especialidade Operadoras</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.especialidadeOperadora.detail.title">EspecialidadeOperadora</Translate>[
                  <b>{especialidadeOperadoraEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="codTuss">
                            <Translate contentKey="generadorApp.especialidadeOperadora.codTuss">Cod Tuss</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{especialidadeOperadoraEntity.codTuss}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="codDespesa">
                            <Translate contentKey="generadorApp.especialidadeOperadora.codDespesa">Cod Despesa</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{especialidadeOperadoraEntity.codDespesa}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="codTabela">
                            <Translate contentKey="generadorApp.especialidadeOperadora.codTabela">Cod Tabela</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{especialidadeOperadoraEntity.codTabela}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="valorCusto">
                            <Translate contentKey="generadorApp.especialidadeOperadora.valorCusto">Valor Custo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{especialidadeOperadoraEntity.valorCusto}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="valorVenda">
                            <Translate contentKey="generadorApp.especialidadeOperadora.valorVenda">Valor Venda</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{especialidadeOperadoraEntity.valorVenda}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="descontoCusto">
                            <Translate contentKey="generadorApp.especialidadeOperadora.descontoCusto">Desconto Custo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{especialidadeOperadoraEntity.descontoCusto}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="descontoVenda">
                            <Translate contentKey="generadorApp.especialidadeOperadora.descontoVenda">Desconto Venda</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{especialidadeOperadoraEntity.descontoVenda}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativo">
                            <Translate contentKey="generadorApp.especialidadeOperadora.ativo">Ativo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{especialidadeOperadoraEntity.ativo}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/especialidade-operadora" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/especialidade-operadora/${especialidadeOperadoraEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ especialidadeOperadora }: IRootState) => ({
  especialidadeOperadoraEntity: especialidadeOperadora.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EspecialidadeOperadoraDetail);
