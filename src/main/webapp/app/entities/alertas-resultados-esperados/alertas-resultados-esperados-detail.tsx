import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import {
  getEntity,
  IAlertasResultadosEsperadosBaseState,
  getAlertasResultadosEsperadosState
} from './alertas-resultados-esperados.reducer';
import { IAlertasResultadosEsperados } from 'app/shared/model/alertas-resultados-esperados.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAlertasResultadosEsperadosState {
  fieldsBase: IAlertasResultadosEsperadosBaseState;
}

export interface IAlertasResultadosEsperadosDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AlertasResultadosEsperadosDetail extends React.Component<
  IAlertasResultadosEsperadosDetailProps,
  IAlertasResultadosEsperadosState
> {
  constructor(props: Readonly<IAlertasResultadosEsperadosDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getAlertasResultadosEsperadosState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { alertasResultadosEsperadosEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Alertas Resultados Esperados</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Alertas Resultados Esperados</li>
          <li className="breadcrumb-item active">Alertas Resultados Esperados details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.alertasResultadosEsperados.detail.title">AlertasResultadosEsperados</Translate>[
                  <b>{alertasResultadosEsperadosEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="pontuacao">
                            <Translate contentKey="generadorApp.alertasResultadosEsperados.pontuacao">Pontuacao</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{alertasResultadosEsperadosEntity.pontuacao}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="alteracaoEsperada">
                            <Translate contentKey="generadorApp.alertasResultadosEsperados.alteracaoEsperada">Alteracao Esperada</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{alertasResultadosEsperadosEntity.alteracaoEsperada ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="observacoes">
                            <Translate contentKey="generadorApp.alertasResultadosEsperados.observacoes">Observacoes</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{alertasResultadosEsperadosEntity.observacoes}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="usuarioId">
                            <Translate contentKey="generadorApp.alertasResultadosEsperados.usuarioId">Usuario Id</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{alertasResultadosEsperadosEntity.usuarioId}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="valor">
                            <Translate contentKey="generadorApp.alertasResultadosEsperados.valor">Valor</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{alertasResultadosEsperadosEntity.valor}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/alertas-resultados-esperados" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/alertas-resultados-esperados/${alertasResultadosEsperadosEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ alertasResultadosEsperados }: IRootState) => ({
  alertasResultadosEsperadosEntity: alertasResultadosEsperados.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AlertasResultadosEsperadosDetail);
