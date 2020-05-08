import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, ILicaoCasaEvolucaoBaseState, getLicaoCasaEvolucaoState } from './licao-casa-evolucao.reducer';
import { ILicaoCasaEvolucao } from 'app/shared/model/licao-casa-evolucao.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILicaoCasaEvolucaoState {
  fieldsBase: ILicaoCasaEvolucaoBaseState;
}

export interface ILicaoCasaEvolucaoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class LicaoCasaEvolucaoDetail extends React.Component<ILicaoCasaEvolucaoDetailProps, ILicaoCasaEvolucaoState> {
  constructor(props: Readonly<ILicaoCasaEvolucaoDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getLicaoCasaEvolucaoState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { licaoCasaEvolucaoEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Licao Casa Evolucaos</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Licao Casa Evolucaos</li>
          <li className="breadcrumb-item active">Licao Casa Evolucaos details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.licaoCasaEvolucao.detail.title">LicaoCasaEvolucao</Translate>[
                  <b>{licaoCasaEvolucaoEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="licaoCasaId">
                            <Translate contentKey="generadorApp.licaoCasaEvolucao.licaoCasaId">Licao Casa Id</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{licaoCasaEvolucaoEntity.licaoCasaId}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="atualizadoEm">
                            <Translate contentKey="generadorApp.licaoCasaEvolucao.atualizadoEm">Atualizado Em</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={licaoCasaEvolucaoEntity.atualizadoEm} type="date" format={APP_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="realizada">
                            <Translate contentKey="generadorApp.licaoCasaEvolucao.realizada">Realizada</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{licaoCasaEvolucaoEntity.realizada ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="realizadaEm">
                            <Translate contentKey="generadorApp.licaoCasaEvolucao.realizadaEm">Realizada Em</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={licaoCasaEvolucaoEntity.realizadaEm} type="date" format={APP_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="observacoes">
                            <Translate contentKey="generadorApp.licaoCasaEvolucao.observacoes">Observacoes</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{licaoCasaEvolucaoEntity.observacoes}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="instrucoes">
                            <Translate contentKey="generadorApp.licaoCasaEvolucao.instrucoes">Instrucoes</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{licaoCasaEvolucaoEntity.instrucoes}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="dataAgenda">
                            <Translate contentKey="generadorApp.licaoCasaEvolucao.dataAgenda">Data Agenda</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={licaoCasaEvolucaoEntity.dataAgenda} type="date" format={APP_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="qtdLembrete">
                            <Translate contentKey="generadorApp.licaoCasaEvolucao.qtdLembrete">Qtd Lembrete</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{licaoCasaEvolucaoEntity.qtdLembrete ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/licao-casa-evolucao" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/licao-casa-evolucao/${licaoCasaEvolucaoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ licaoCasaEvolucao }: IRootState) => ({
  licaoCasaEvolucaoEntity: licaoCasaEvolucao.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LicaoCasaEvolucaoDetail);
