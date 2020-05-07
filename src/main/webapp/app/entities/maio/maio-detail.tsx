import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IMaioBaseState, getMaioState } from './maio.reducer';
import { IMaio } from 'app/shared/model/maio.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMaioState {
  fieldsBase: IMaioBaseState;
}

export interface IMaioDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MaioDetail extends React.Component<IMaioDetailProps, IMaioState> {
  constructor(props: Readonly<IMaioDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getMaioState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { maioEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Maios</li>
          <li className="breadcrumb-item active">Maios details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Maios</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.maio.detail.title">Maio</Translate>[<b>{maioEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idFranquia">
                            <Translate contentKey="generadorApp.maio.idFranquia">Id Franquia</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{maioEntity.idFranquia}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idPaciente">
                            <Translate contentKey="generadorApp.maio.idPaciente">Id Paciente</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{maioEntity.idPaciente}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="nroPad">
                            <Translate contentKey="generadorApp.maio.nroPad">Nro Pad</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{maioEntity.nroPad}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="dataInicio">
                            <Translate contentKey="generadorApp.maio.dataInicio">Data Inicio</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{maioEntity.dataInicio}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="dataFim">
                            <Translate contentKey="generadorApp.maio.dataFim">Data Fim</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{maioEntity.dataFim}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idEspecialidade">
                            <Translate contentKey="generadorApp.maio.idEspecialidade">Id Especialidade</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{maioEntity.idEspecialidade}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idPeriodicidade">
                            <Translate contentKey="generadorApp.maio.idPeriodicidade">Id Periodicidade</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{maioEntity.idPeriodicidade}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idPeriodo">
                            <Translate contentKey="generadorApp.maio.idPeriodo">Id Periodo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{maioEntity.idPeriodo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="qtdSessoes">
                            <Translate contentKey="generadorApp.maio.qtdSessoes">Qtd Sessoes</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{maioEntity.qtdSessoes}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/maio" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/maio/${maioEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ maio }: IRootState) => ({
  maioEntity: maio.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MaioDetail);
