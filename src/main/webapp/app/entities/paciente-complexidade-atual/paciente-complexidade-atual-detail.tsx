import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IPacienteComplexidadeAtualBaseState, getPacienteComplexidadeAtualState } from './paciente-complexidade-atual.reducer';
import { IPacienteComplexidadeAtual } from 'app/shared/model/paciente-complexidade-atual.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPacienteComplexidadeAtualState {
  fieldsBase: IPacienteComplexidadeAtualBaseState;
}

export interface IPacienteComplexidadeAtualDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteComplexidadeAtualDetail extends React.Component<
  IPacienteComplexidadeAtualDetailProps,
  IPacienteComplexidadeAtualState
> {
  constructor(props: Readonly<IPacienteComplexidadeAtualDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getPacienteComplexidadeAtualState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { pacienteComplexidadeAtualEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Complexidade Atuals</li>
          <li className="breadcrumb-item active">Paciente Complexidade Atuals details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Paciente Complexidade Atuals</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.pacienteComplexidadeAtual.detail.title">PacienteComplexidadeAtual</Translate>[
                  <b>{pacienteComplexidadeAtualEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idPaciente">
                            <Translate contentKey="generadorApp.pacienteComplexidadeAtual.idPaciente">Id Paciente</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteComplexidadeAtualEntity.idPaciente}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idPacienteComplexidade">
                            <Translate contentKey="generadorApp.pacienteComplexidadeAtual.idPacienteComplexidade">
                              Id Paciente Complexidade
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteComplexidadeAtualEntity.idPacienteComplexidade}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="baixa">
                            <Translate contentKey="generadorApp.pacienteComplexidadeAtual.baixa">Baixa</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteComplexidadeAtualEntity.baixa}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="media">
                            <Translate contentKey="generadorApp.pacienteComplexidadeAtual.media">Media</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteComplexidadeAtualEntity.media}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="alta">
                            <Translate contentKey="generadorApp.pacienteComplexidadeAtual.alta">Alta</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteComplexidadeAtualEntity.alta}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ventilacaoMecanica">
                            <Translate contentKey="generadorApp.pacienteComplexidadeAtual.ventilacaoMecanica">
                              Ventilacao Mecanica
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteComplexidadeAtualEntity.ventilacaoMecanica}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="telemonitoramente">
                            <Translate contentKey="generadorApp.pacienteComplexidadeAtual.telemonitoramente">Telemonitoramente</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteComplexidadeAtualEntity.telemonitoramente}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/paciente-complexidade-atual" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/paciente-complexidade-atual/${pacienteComplexidadeAtualEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ pacienteComplexidadeAtual }: IRootState) => ({
  pacienteComplexidadeAtualEntity: pacienteComplexidadeAtual.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteComplexidadeAtualDetail);
