import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './phinxlog.reducer';
import { IPhinxlog } from 'app/shared/model/phinxlog.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPhinxlogDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PhinxlogDetail extends React.Component<IPhinxlogDetailProps> {
  constructor(props: Readonly<IPhinxlogDetailProps>) {
    super(props);
    this.state = {
      ...this.state
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { phinxlogEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Phinxlogs</li>
          <li className="breadcrumb-item active">Phinxlogs details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Phinxlogs</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.phinxlog.detail.title">Phinxlog</Translate>[<b>{phinxlogEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="version">
                            <Translate contentKey="generadorApp.phinxlog.version">Version</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{phinxlogEntity.version}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="migrationName">
                            <Translate contentKey="generadorApp.phinxlog.migrationName">Migration Name</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{phinxlogEntity.migrationName}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="startTime">
                            <Translate contentKey="generadorApp.phinxlog.startTime">Start Time</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={phinxlogEntity.startTime} type="date" format={APP_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="endTime">
                            <Translate contentKey="generadorApp.phinxlog.endTime">End Time</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={phinxlogEntity.endTime} type="date" format={APP_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="breakpoint">
                            <Translate contentKey="generadorApp.phinxlog.breakpoint">Breakpoint</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{phinxlogEntity.breakpoint ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/phinxlog" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/phinxlog/${phinxlogEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ phinxlog }: IRootState) => ({
  phinxlogEntity: phinxlog.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PhinxlogDetail);