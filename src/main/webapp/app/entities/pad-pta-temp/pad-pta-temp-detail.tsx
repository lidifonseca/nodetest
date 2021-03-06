import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IPadPtaTempBaseState, getPadPtaTempState } from './pad-pta-temp.reducer';
import { IPadPtaTemp } from 'app/shared/model/pad-pta-temp.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPadPtaTempState {
  fieldsBase: IPadPtaTempBaseState;
}

export interface IPadPtaTempDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PadPtaTempDetail extends React.Component<IPadPtaTempDetailProps, IPadPtaTempState> {
  constructor(props: Readonly<IPadPtaTempDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getPadPtaTempState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { padPtaTempEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Pad Pta Temps</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Pta Temps</li>
          <li className="breadcrumb-item active">Pad Pta Temps details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.padPtaTemp.detail.title">PadPtaTemp</Translate>[<b>{padPtaTempEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="sessionId">
                            <Translate contentKey="generadorApp.padPtaTemp.sessionId">Session Id</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padPtaTempEntity.sessionId}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idPta">
                            <Translate contentKey="generadorApp.padPtaTemp.idPta">Id Pta</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padPtaTempEntity.idPta}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idCid">
                            <Translate contentKey="generadorApp.padPtaTemp.idCid">Id Cid</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padPtaTempEntity.idCid}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cidXPtaNovoId">
                            <Translate contentKey="generadorApp.padPtaTemp.cidXPtaNovoId">Cid X Pta Novo Id</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padPtaTempEntity.cidXPtaNovoId}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/pad-pta-temp" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/pad-pta-temp/${padPtaTempEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ padPtaTemp }: IRootState) => ({
  padPtaTempEntity: padPtaTemp.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadPtaTempDetail);
