import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IPacienteGrauParentescoBaseState, getPacienteGrauParentescoState } from './paciente-grau-parentesco.reducer';
import { IPacienteGrauParentesco } from 'app/shared/model/paciente-grau-parentesco.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPacienteGrauParentescoState {
  fieldsBase: IPacienteGrauParentescoBaseState;
}

export interface IPacienteGrauParentescoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteGrauParentescoDetail extends React.Component<IPacienteGrauParentescoDetailProps, IPacienteGrauParentescoState> {
  constructor(props: Readonly<IPacienteGrauParentescoDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getPacienteGrauParentescoState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { pacienteGrauParentescoEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Paciente Grau Parentescos</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Grau Parentescos</li>
          <li className="breadcrumb-item active">Paciente Grau Parentescos details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.pacienteGrauParentesco.detail.title">PacienteGrauParentesco</Translate>[
                  <b>{pacienteGrauParentescoEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="grauParentesco">
                            <Translate contentKey="generadorApp.pacienteGrauParentesco.grauParentesco">Grau Parentesco</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteGrauParentescoEntity.grauParentesco}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativo">
                            <Translate contentKey="generadorApp.pacienteGrauParentesco.ativo">Ativo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteGrauParentescoEntity.ativo ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/paciente-grau-parentesco" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/paciente-grau-parentesco/${pacienteGrauParentescoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ pacienteGrauParentesco }: IRootState) => ({
  pacienteGrauParentescoEntity: pacienteGrauParentesco.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteGrauParentescoDetail);
