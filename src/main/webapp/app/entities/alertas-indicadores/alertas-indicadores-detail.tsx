import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IAlertasIndicadoresBaseState, getAlertasIndicadoresState } from './alertas-indicadores.reducer';
import { IAlertasIndicadores } from 'app/shared/model/alertas-indicadores.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAlertasIndicadoresState {
  fieldsBase: IAlertasIndicadoresBaseState;
}

export interface IAlertasIndicadoresDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AlertasIndicadoresDetail extends React.Component<IAlertasIndicadoresDetailProps, IAlertasIndicadoresState> {
  constructor(props: Readonly<IAlertasIndicadoresDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getAlertasIndicadoresState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { alertasIndicadoresEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Alertas Indicadores</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Alertas Indicadores</li>
          <li className="breadcrumb-item active">Alertas Indicadores details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.alertasIndicadores.detail.title">AlertasIndicadores</Translate>[
                  <b>{alertasIndicadoresEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="pontuacao">
                            <Translate contentKey="generadorApp.alertasIndicadores.pontuacao">Pontuacao</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{alertasIndicadoresEntity.pontuacao}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="alteracaoEsperada">
                            <Translate contentKey="generadorApp.alertasIndicadores.alteracaoEsperada">Alteracao Esperada</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{alertasIndicadoresEntity.alteracaoEsperada ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="observacoes">
                            <Translate contentKey="generadorApp.alertasIndicadores.observacoes">Observacoes</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{alertasIndicadoresEntity.observacoes}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="usuarioId">
                            <Translate contentKey="generadorApp.alertasIndicadores.usuarioId">Usuario Id</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{alertasIndicadoresEntity.usuarioId}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.alertasIndicadores.padItemIndicadores">Pad Item Indicadores</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{alertasIndicadoresEntity.padItemIndicadores ? alertasIndicadoresEntity.padItemIndicadores.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/alertas-indicadores" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/alertas-indicadores/${alertasIndicadoresEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ alertasIndicadores }: IRootState) => ({
  alertasIndicadoresEntity: alertasIndicadores.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AlertasIndicadoresDetail);
