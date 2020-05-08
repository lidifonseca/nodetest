import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IDiarioBaseState, getDiarioState } from './diario.reducer';
import { IDiario } from 'app/shared/model/diario.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDiarioState {
  fieldsBase: IDiarioBaseState;
}

export interface IDiarioDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DiarioDetail extends React.Component<IDiarioDetailProps, IDiarioState> {
  constructor(props: Readonly<IDiarioDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getDiarioState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { diarioEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Diarios</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Diarios</li>
          <li className="breadcrumb-item active">Diarios details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.diario.detail.title">Diario</Translate>[<b>{diarioEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="historico">
                            <Translate contentKey="generadorApp.diario.historico">Historico</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{diarioEntity.historico}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="gerarPdf">
                            <Translate contentKey="generadorApp.diario.gerarPdf">Gerar Pdf</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{diarioEntity.gerarPdf}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.diario.usuario">Usuario</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{diarioEntity.usuario ? diarioEntity.usuario.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.diario.paciente">Paciente</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{diarioEntity.paciente ? diarioEntity.paciente.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/diario" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/diario/${diarioEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ diario }: IRootState) => ({
  diarioEntity: diario.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DiarioDetail);
