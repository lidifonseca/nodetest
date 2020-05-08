import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IStatusAtendimentoBaseState, getStatusAtendimentoState } from './status-atendimento.reducer';
import { IStatusAtendimento } from 'app/shared/model/status-atendimento.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStatusAtendimentoState {
  fieldsBase: IStatusAtendimentoBaseState;
}

export interface IStatusAtendimentoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class StatusAtendimentoDetail extends React.Component<IStatusAtendimentoDetailProps, IStatusAtendimentoState> {
  constructor(props: Readonly<IStatusAtendimentoDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getStatusAtendimentoState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { statusAtendimentoEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Status Atendimentos</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Status Atendimentos</li>
          <li className="breadcrumb-item active">Status Atendimentos details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.statusAtendimento.detail.title">StatusAtendimento</Translate>[
                  <b>{statusAtendimentoEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="statusAtendimento">
                            <Translate contentKey="generadorApp.statusAtendimento.statusAtendimento">Status Atendimento</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{statusAtendimentoEntity.statusAtendimento}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="styleLabel">
                            <Translate contentKey="generadorApp.statusAtendimento.styleLabel">Style Label</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{statusAtendimentoEntity.styleLabel}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ordenacao">
                            <Translate contentKey="generadorApp.statusAtendimento.ordenacao">Ordenacao</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{statusAtendimentoEntity.ordenacao}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativo">
                            <Translate contentKey="generadorApp.statusAtendimento.ativo">Ativo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{statusAtendimentoEntity.ativo}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/status-atendimento" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/status-atendimento/${statusAtendimentoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ statusAtendimento }: IRootState) => ({
  statusAtendimentoEntity: statusAtendimento.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StatusAtendimentoDetail);
