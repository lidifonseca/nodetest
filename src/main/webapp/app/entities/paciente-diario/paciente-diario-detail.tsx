import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IPacienteDiarioBaseState, getPacienteDiarioState } from './paciente-diario.reducer';
import { IPacienteDiario } from 'app/shared/model/paciente-diario.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPacienteDiarioState {
  fieldsBase: IPacienteDiarioBaseState;
}

export interface IPacienteDiarioDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteDiarioDetail extends React.Component<IPacienteDiarioDetailProps, IPacienteDiarioState> {
  constructor(props: Readonly<IPacienteDiarioDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getPacienteDiarioState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { pacienteDiarioEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Diarios</li>
          <li className="breadcrumb-item active">Paciente Diarios details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Paciente Diarios</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.pacienteDiario.detail.title">PacienteDiario</Translate>[
                  <b>{pacienteDiarioEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idOperadora">
                            <Translate contentKey="generadorApp.pacienteDiario.idOperadora">Id Operadora</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioEntity.idOperadora}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="historico">
                            <Translate contentKey="generadorApp.pacienteDiario.historico">Historico</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioEntity.historico}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativo">
                            <Translate contentKey="generadorApp.pacienteDiario.ativo">Ativo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioEntity.ativo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.pacienteDiario.idPaciente">Id Paciente</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioEntity.idPaciente ? pacienteDiarioEntity.idPaciente.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.pacienteDiario.idUsuario">Id Usuario</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDiarioEntity.idUsuario ? pacienteDiarioEntity.idUsuario.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/paciente-diario" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/paciente-diario/${pacienteDiarioEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ pacienteDiario }: IRootState) => ({
  pacienteDiarioEntity: pacienteDiario.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteDiarioDetail);