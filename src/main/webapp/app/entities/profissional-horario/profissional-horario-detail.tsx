import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IProfissionalHorarioBaseState, getProfissionalHorarioState } from './profissional-horario.reducer';
import { IProfissionalHorario } from 'app/shared/model/profissional-horario.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProfissionalHorarioState {
  fieldsBase: IProfissionalHorarioBaseState;
}

export interface IProfissionalHorarioDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProfissionalHorarioDetail extends React.Component<IProfissionalHorarioDetailProps, IProfissionalHorarioState> {
  constructor(props: Readonly<IProfissionalHorarioDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getProfissionalHorarioState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { profissionalHorarioEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Profissional Horarios</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Profissional Horarios</li>
          <li className="breadcrumb-item active">Profissional Horarios details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.profissionalHorario.detail.title">ProfissionalHorario</Translate>[
                  <b>{profissionalHorarioEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idAtendimento">
                            <Translate contentKey="generadorApp.profissionalHorario.idAtendimento">Id Atendimento</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalHorarioEntity.idAtendimento}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idProfissional">
                            <Translate contentKey="generadorApp.profissionalHorario.idProfissional">Id Profissional</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalHorarioEntity.idProfissional}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="horario">
                            <Translate contentKey="generadorApp.profissionalHorario.horario">Horario</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={profissionalHorarioEntity.horario} type="date" format={APP_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="confirm">
                            <Translate contentKey="generadorApp.profissionalHorario.confirm">Confirm</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalHorarioEntity.confirm}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/profissional-horario" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/profissional-horario/${profissionalHorarioEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ profissionalHorario }: IRootState) => ({
  profissionalHorarioEntity: profissionalHorario.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalHorarioDetail);
