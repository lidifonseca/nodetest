import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IPacienteDiagnosticoBaseState, getPacienteDiagnosticoState } from './paciente-diagnostico.reducer';
import { IPacienteDiagnostico } from 'app/shared/model/paciente-diagnostico.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPacienteDiagnosticoState {
  fieldsBase: IPacienteDiagnosticoBaseState;
}

export interface IPacienteDiagnosticoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteDiagnosticoDetail extends React.Component<IPacienteDiagnosticoDetailProps, IPacienteDiagnosticoState> {
  constructor(props: Readonly<IPacienteDiagnosticoDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getPacienteDiagnosticoState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { pacienteDiagnosticoEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Paciente Diagnosticos</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Diagnosticos</li>
          <li className="breadcrumb-item active">Paciente Diagnosticos details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.pacienteDiagnostico.detail.title">PacienteDiagnostico</Translate>[
                  <b>{pacienteDiagnosticoEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="observacao">
                            <Translate contentKey="generadorApp.pacienteDiagnostico.observacao">Observacao</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiagnosticoEntity.observacao}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativo">
                            <Translate contentKey="generadorApp.pacienteDiagnostico.ativo">Ativo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiagnosticoEntity.ativo ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cidPrimario">
                            <Translate contentKey="generadorApp.pacienteDiagnostico.cidPrimario">Cid Primario</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiagnosticoEntity.cidPrimario ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="complexidade">
                            <Translate contentKey="generadorApp.pacienteDiagnostico.complexidade">Complexidade</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiagnosticoEntity.complexidade}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cidComAlta">
                            <Translate contentKey="generadorApp.pacienteDiagnostico.cidComAlta">Cid Com Alta</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiagnosticoEntity.cidComAlta ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.pacienteDiagnostico.paciente">Paciente</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiagnosticoEntity.paciente ? pacienteDiagnosticoEntity.paciente.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.pacienteDiagnostico.c">C</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiagnosticoEntity.c ? pacienteDiagnosticoEntity.c.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/paciente-diagnostico" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/paciente-diagnostico/${pacienteDiagnosticoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ pacienteDiagnostico }: IRootState) => ({
  pacienteDiagnosticoEntity: pacienteDiagnostico.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteDiagnosticoDetail);
