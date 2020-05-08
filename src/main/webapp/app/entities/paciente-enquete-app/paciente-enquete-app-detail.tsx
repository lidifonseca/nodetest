import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IPacienteEnqueteAppBaseState, getPacienteEnqueteAppState } from './paciente-enquete-app.reducer';
import { IPacienteEnqueteApp } from 'app/shared/model/paciente-enquete-app.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPacienteEnqueteAppState {
  fieldsBase: IPacienteEnqueteAppBaseState;
}

export interface IPacienteEnqueteAppDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteEnqueteAppDetail extends React.Component<IPacienteEnqueteAppDetailProps, IPacienteEnqueteAppState> {
  constructor(props: Readonly<IPacienteEnqueteAppDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getPacienteEnqueteAppState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { pacienteEnqueteAppEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Paciente Enquete Apps</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Enquete Apps</li>
          <li className="breadcrumb-item active">Paciente Enquete Apps details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.pacienteEnqueteApp.detail.title">PacienteEnqueteApp</Translate>[
                  <b>{pacienteEnqueteAppEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="votacao">
                            <Translate contentKey="generadorApp.pacienteEnqueteApp.votacao">Votacao</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteEnqueteAppEntity.votacao}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.pacienteEnqueteApp.paciente">Paciente</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteEnqueteAppEntity.paciente ? pacienteEnqueteAppEntity.paciente.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/paciente-enquete-app" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/paciente-enquete-app/${pacienteEnqueteAppEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ pacienteEnqueteApp }: IRootState) => ({
  pacienteEnqueteAppEntity: pacienteEnqueteApp.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteEnqueteAppDetail);
