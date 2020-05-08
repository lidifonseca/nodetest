import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IPacienteOperadoraBaseState, getPacienteOperadoraState } from './paciente-operadora.reducer';
import { IPacienteOperadora } from 'app/shared/model/paciente-operadora.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPacienteOperadoraState {
  fieldsBase: IPacienteOperadoraBaseState;
}

export interface IPacienteOperadoraDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteOperadoraDetail extends React.Component<IPacienteOperadoraDetailProps, IPacienteOperadoraState> {
  constructor(props: Readonly<IPacienteOperadoraDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getPacienteOperadoraState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { pacienteOperadoraEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Paciente Operadoras</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Operadoras</li>
          <li className="breadcrumb-item active">Paciente Operadoras details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.pacienteOperadora.detail.title">PacienteOperadora</Translate>[
                  <b>{pacienteOperadoraEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="registro">
                            <Translate contentKey="generadorApp.pacienteOperadora.registro">Registro</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteOperadoraEntity.registro}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativo">
                            <Translate contentKey="generadorApp.pacienteOperadora.ativo">Ativo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteOperadoraEntity.ativo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.pacienteOperadora.paciente">Paciente</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteOperadoraEntity.paciente ? pacienteOperadoraEntity.paciente.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.pacienteOperadora.operadora">Operadora</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteOperadoraEntity.operadora ? pacienteOperadoraEntity.operadora.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/paciente-operadora" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/paciente-operadora/${pacienteOperadoraEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ pacienteOperadora }: IRootState) => ({
  pacienteOperadoraEntity: pacienteOperadora.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteOperadoraDetail);
