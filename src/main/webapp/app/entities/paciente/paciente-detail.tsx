import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './paciente.reducer';
import { IPaciente } from 'app/shared/model/paciente.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPacienteDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteDetail extends React.Component<IPacienteDetailProps> {
  constructor(props: Readonly<IPacienteDetailProps>) {
    super(props);
    this.state = {
      ...this.state
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { pacienteEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pacientes</li>
          <li className="breadcrumb-item active">Pacientes details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Pacientes</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.paciente.detail.title">Paciente</Translate>
                  <small>&nbsp; {pacienteEntity['nome']}</small>
                </h2>
                <Row className="jh-entity-details">
                  <Col md="6">
                    <Row>
                      <Col md="12">
                        <dt>
                          <Translate contentKey="generadorApp.paciente.cidade">Cidade</Translate>
                        </dt>
                      </Col>
                      <Col md="12">
                        <dd>{pacienteEntity.cidade ? pacienteEntity.cidade.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="6">
                    <Row>
                      <Col md="12">
                        <dt>
                          <span id="nome">
                            <Translate contentKey="generadorApp.paciente.nome">Nome</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="12">
                        <dd>{pacienteEntity.nome}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="6">
                    <Row>
                      <Col md="12">
                        <dt>
                          <span id="email">
                            <Translate contentKey="generadorApp.paciente.email">Email</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="12">
                        <dd>{pacienteEntity.email}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="6">
                    <Row>
                      <Col md="12">
                        <dt>
                          <span id="cpf">
                            <Translate contentKey="generadorApp.paciente.cpf">Cpf</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="12">
                        <dd>{pacienteEntity.cpf}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="6">
                    <Row>
                      <Col md="12">
                        <dt>
                          <span id="rg">
                            <Translate contentKey="generadorApp.paciente.rg">Rg</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="12">
                        <dd>{pacienteEntity.rg}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="6">
                    <Row>
                      <Col md="12">
                        <dt>
                          <span id="registro">
                            <Translate contentKey="generadorApp.paciente.registro">Registro</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="12">
                        <dd>{pacienteEntity.registro}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/paciente" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/paciente/${pacienteEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ paciente }: IRootState) => ({
  pacienteEntity: paciente.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteDetail);
