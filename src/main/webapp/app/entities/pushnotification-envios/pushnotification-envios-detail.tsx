import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IPushnotificationEnviosBaseState, getPushnotificationEnviosState } from './pushnotification-envios.reducer';
import { IPushnotificationEnvios } from 'app/shared/model/pushnotification-envios.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPushnotificationEnviosState {
  fieldsBase: IPushnotificationEnviosBaseState;
}

export interface IPushnotificationEnviosDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PushnotificationEnviosDetail extends React.Component<IPushnotificationEnviosDetailProps, IPushnotificationEnviosState> {
  constructor(props: Readonly<IPushnotificationEnviosDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getPushnotificationEnviosState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { pushnotificationEnviosEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Pushnotification Envios</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pushnotification Envios</li>
          <li className="breadcrumb-item active">Pushnotification Envios details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.pushnotificationEnvios.detail.title">PushnotificationEnvios</Translate>[
                  <b>{pushnotificationEnviosEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="referencia">
                            <Translate contentKey="generadorApp.pushnotificationEnvios.referencia">Referencia</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pushnotificationEnviosEntity.referencia}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ultimoEnvio">
                            <Translate contentKey="generadorApp.pushnotificationEnvios.ultimoEnvio">Ultimo Envio</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={pushnotificationEnviosEntity.ultimoEnvio} type="date" format={APP_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/pushnotification-envios" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/pushnotification-envios/${pushnotificationEnviosEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ pushnotificationEnvios }: IRootState) => ({
  pushnotificationEnviosEntity: pushnotificationEnvios.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PushnotificationEnviosDetail);
