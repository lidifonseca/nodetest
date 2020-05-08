import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IPacienteDiagnosticoTempBaseState, getPacienteDiagnosticoTempState } from './paciente-diagnostico-temp.reducer';
import { IPacienteDiagnosticoTemp } from 'app/shared/model/paciente-diagnostico-temp.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPacienteDiagnosticoTempState {
  fieldsBase: IPacienteDiagnosticoTempBaseState;
}

export interface IPacienteDiagnosticoTempDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteDiagnosticoTempDetail extends React.Component<IPacienteDiagnosticoTempDetailProps, IPacienteDiagnosticoTempState> {
  constructor(props: Readonly<IPacienteDiagnosticoTempDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getPacienteDiagnosticoTempState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { pacienteDiagnosticoTempEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Paciente Diagnostico Temps</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Diagnostico Temps</li>
          <li className="breadcrumb-item active">Paciente Diagnostico Temps details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.detail.title">PacienteDiagnosticoTemp</Translate>[
                  <b>{pacienteDiagnosticoTempEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idCid">
                            <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.idCid">Id Cid</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiagnosticoTempEntity.idCid}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cidPrimario">
                            <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.cidPrimario">Cid Primario</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiagnosticoTempEntity.cidPrimario ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="complexidade">
                            <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.complexidade">Complexidade</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiagnosticoTempEntity.complexidade}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="createdAt">
                            <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.createdAt">Created At</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={pacienteDiagnosticoTempEntity.createdAt} type="date" format={APP_LOCAL_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="sessionId">
                            <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.sessionId">Session Id</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiagnosticoTempEntity.sessionId}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="observacao">
                            <Translate contentKey="generadorApp.pacienteDiagnosticoTemp.observacao">Observacao</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiagnosticoTempEntity.observacao}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/paciente-diagnostico-temp" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/paciente-diagnostico-temp/${pacienteDiagnosticoTempEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ pacienteDiagnosticoTemp }: IRootState) => ({
  pacienteDiagnosticoTempEntity: pacienteDiagnosticoTemp.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteDiagnosticoTempDetail);
