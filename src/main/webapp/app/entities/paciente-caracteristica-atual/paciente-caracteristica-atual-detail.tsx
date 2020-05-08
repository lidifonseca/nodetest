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
  IPacienteCaracteristicaAtualBaseState,
  getPacienteCaracteristicaAtualState
} from './paciente-caracteristica-atual.reducer';
import { IPacienteCaracteristicaAtual } from 'app/shared/model/paciente-caracteristica-atual.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPacienteCaracteristicaAtualState {
  fieldsBase: IPacienteCaracteristicaAtualBaseState;
}

export interface IPacienteCaracteristicaAtualDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteCaracteristicaAtualDetail extends React.Component<
  IPacienteCaracteristicaAtualDetailProps,
  IPacienteCaracteristicaAtualState
> {
  constructor(props: Readonly<IPacienteCaracteristicaAtualDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getPacienteCaracteristicaAtualState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { pacienteCaracteristicaAtualEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Paciente Caracteristica Atuals</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Caracteristica Atuals</li>
          <li className="breadcrumb-item active">Paciente Caracteristica Atuals details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.pacienteCaracteristicaAtual.detail.title">PacienteCaracteristicaAtual</Translate>[
                  <b>{pacienteCaracteristicaAtualEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idPaciente">
                            <Translate contentKey="generadorApp.pacienteCaracteristicaAtual.idPaciente">Id Paciente</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteCaracteristicaAtualEntity.idPaciente}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idPacienteCaracteristica">
                            <Translate contentKey="generadorApp.pacienteCaracteristicaAtual.idPacienteCaracteristica">
                              Id Paciente Caracteristica
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteCaracteristicaAtualEntity.idPacienteCaracteristica}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/paciente-caracteristica-atual" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button
                  tag={Link}
                  to={`/paciente-caracteristica-atual/${pacienteCaracteristicaAtualEntity.id}/edit`}
                  replace
                  color="primary"
                >
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

const mapStateToProps = ({ pacienteCaracteristicaAtual }: IRootState) => ({
  pacienteCaracteristicaAtualEntity: pacienteCaracteristicaAtual.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteCaracteristicaAtualDetail);
