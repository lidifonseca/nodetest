import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, ICidBaseState, getCidState } from './cid.reducer';
import { ICid } from 'app/shared/model/cid.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICidState {
  fieldsBase: ICidBaseState;
}

export interface ICidDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CidDetail extends React.Component<ICidDetailProps, ICidState> {
  constructor(props: Readonly<ICidDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getCidState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { cidEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Cids</li>
          <li className="breadcrumb-item active">Cids details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Cids</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.cid.detail.title">Cid</Translate>[<b>{cidEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="codigo">
                            <Translate contentKey="generadorApp.cid.codigo">Codigo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cidEntity.codigo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="diagnostico">
                            <Translate contentKey="generadorApp.cid.diagnostico">Diagnostico</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cidEntity.diagnostico}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="gr">
                            <Translate contentKey="generadorApp.cid.gr">Gr</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cidEntity.gr}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="temp">
                            <Translate contentKey="generadorApp.cid.temp">Temp</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cidEntity.temp}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="apelido">
                            <Translate contentKey="generadorApp.cid.apelido">Apelido</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cidEntity.apelido}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/cid" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/cid/${cidEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ cid }: IRootState) => ({
  cidEntity: cid.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CidDetail);
