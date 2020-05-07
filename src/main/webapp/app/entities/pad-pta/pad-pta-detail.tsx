import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IPadPtaBaseState, getPadPtaState } from './pad-pta.reducer';
import { IPadPta } from 'app/shared/model/pad-pta.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPadPtaState {
  fieldsBase: IPadPtaBaseState;
}

export interface IPadPtaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PadPtaDetail extends React.Component<IPadPtaDetailProps, IPadPtaState> {
  constructor(props: Readonly<IPadPtaDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getPadPtaState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { padPtaEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Ptas</li>
          <li className="breadcrumb-item active">Pad Ptas details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Pad Ptas</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.padPta.detail.title">PadPta</Translate>[<b>{padPtaEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idPad">
                            <Translate contentKey="generadorApp.padPta.idPad">Id Pad</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padPtaEntity.idPad}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idDescPta">
                            <Translate contentKey="generadorApp.padPta.idDescPta">Id Desc Pta</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padPtaEntity.idDescPta}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idCid">
                            <Translate contentKey="generadorApp.padPta.idCid">Id Cid</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padPtaEntity.idCid}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idCidXPtaNovo">
                            <Translate contentKey="generadorApp.padPta.idCidXPtaNovo">Id Cid X Pta Novo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padPtaEntity.idCidXPtaNovo}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/pad-pta" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/pad-pta/${padPtaEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ padPta }: IRootState) => ({
  padPtaEntity: padPta.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadPtaDetail);
