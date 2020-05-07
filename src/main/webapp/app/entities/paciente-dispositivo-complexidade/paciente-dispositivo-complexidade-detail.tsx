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
  IPacienteDispositivoComplexidadeBaseState,
  getPacienteDispositivoComplexidadeState
} from './paciente-dispositivo-complexidade.reducer';
import { IPacienteDispositivoComplexidade } from 'app/shared/model/paciente-dispositivo-complexidade.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPacienteDispositivoComplexidadeState {
  fieldsBase: IPacienteDispositivoComplexidadeBaseState;
}

export interface IPacienteDispositivoComplexidadeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteDispositivoComplexidadeDetail extends React.Component<
  IPacienteDispositivoComplexidadeDetailProps,
  IPacienteDispositivoComplexidadeState
> {
  constructor(props: Readonly<IPacienteDispositivoComplexidadeDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getPacienteDispositivoComplexidadeState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { pacienteDispositivoComplexidadeEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Dispositivo Complexidades</li>
          <li className="breadcrumb-item active">Paciente Dispositivo Complexidades details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Paciente Dispositivo Complexidades</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.pacienteDispositivoComplexidade.detail.title">
                    PacienteDispositivoComplexidade
                  </Translate>
                  [<b>{pacienteDispositivoComplexidadeEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="caracteristica">
                            <Translate contentKey="generadorApp.pacienteDispositivoComplexidade.caracteristica">Caracteristica</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDispositivoComplexidadeEntity.caracteristica}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativo">
                            <Translate contentKey="generadorApp.pacienteDispositivoComplexidade.ativo">Ativo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDispositivoComplexidadeEntity.ativo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="tipo">
                            <Translate contentKey="generadorApp.pacienteDispositivoComplexidade.tipo">Tipo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteDispositivoComplexidadeEntity.tipo}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/paciente-dispositivo-complexidade" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button
                  tag={Link}
                  to={`/paciente-dispositivo-complexidade/${pacienteDispositivoComplexidadeEntity.id}/edit`}
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

const mapStateToProps = ({ pacienteDispositivoComplexidade }: IRootState) => ({
  pacienteDispositivoComplexidadeEntity: pacienteDispositivoComplexidade.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteDispositivoComplexidadeDetail);
