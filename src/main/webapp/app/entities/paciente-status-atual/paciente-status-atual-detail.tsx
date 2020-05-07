import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IPacienteStatusAtualBaseState, getPacienteStatusAtualState } from './paciente-status-atual.reducer';
import { IPacienteStatusAtual } from 'app/shared/model/paciente-status-atual.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPacienteStatusAtualState {
  fieldsBase: IPacienteStatusAtualBaseState;
}

export interface IPacienteStatusAtualDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteStatusAtualDetail extends React.Component<IPacienteStatusAtualDetailProps, IPacienteStatusAtualState> {
  constructor(props: Readonly<IPacienteStatusAtualDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getPacienteStatusAtualState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { pacienteStatusAtualEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Status Atuals</li>
          <li className="breadcrumb-item active">Paciente Status Atuals details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Paciente Status Atuals</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.pacienteStatusAtual.detail.title">PacienteStatusAtual</Translate>[
                  <b>{pacienteStatusAtualEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="dataStatus">
                            <Translate contentKey="generadorApp.pacienteStatusAtual.dataStatus">Data Status</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={pacienteStatusAtualEntity.dataStatus} type="date" format={APP_LOCAL_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="observacao">
                            <Translate contentKey="generadorApp.pacienteStatusAtual.observacao">Observacao</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteStatusAtualEntity.observacao}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativo">
                            <Translate contentKey="generadorApp.pacienteStatusAtual.ativo">Ativo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteStatusAtualEntity.ativo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.pacienteStatusAtual.paciente">Paciente</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteStatusAtualEntity.paciente ? pacienteStatusAtualEntity.paciente.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.pacienteStatusAtual.status">Status</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteStatusAtualEntity.status ? pacienteStatusAtualEntity.status.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/paciente-status-atual" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/paciente-status-atual/${pacienteStatusAtualEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ pacienteStatusAtual }: IRootState) => ({
  pacienteStatusAtualEntity: pacienteStatusAtual.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteStatusAtualDetail);
