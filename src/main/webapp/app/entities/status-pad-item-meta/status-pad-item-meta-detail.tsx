import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IStatusPadItemMetaBaseState, getStatusPadItemMetaState } from './status-pad-item-meta.reducer';
import { IStatusPadItemMeta } from 'app/shared/model/status-pad-item-meta.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStatusPadItemMetaState {
  fieldsBase: IStatusPadItemMetaBaseState;
}

export interface IStatusPadItemMetaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class StatusPadItemMetaDetail extends React.Component<IStatusPadItemMetaDetailProps, IStatusPadItemMetaState> {
  constructor(props: Readonly<IStatusPadItemMetaDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getStatusPadItemMetaState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { statusPadItemMetaEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Status Pad Item Metas</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Status Pad Item Metas</li>
          <li className="breadcrumb-item active">Status Pad Item Metas details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.statusPadItemMeta.detail.title">StatusPadItemMeta</Translate>[
                  <b>{statusPadItemMetaEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="statusItemMeta">
                            <Translate contentKey="generadorApp.statusPadItemMeta.statusItemMeta">Status Item Meta</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{statusPadItemMetaEntity.statusItemMeta}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="styleLabel">
                            <Translate contentKey="generadorApp.statusPadItemMeta.styleLabel">Style Label</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{statusPadItemMetaEntity.styleLabel}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ordenacao">
                            <Translate contentKey="generadorApp.statusPadItemMeta.ordenacao">Ordenacao</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{statusPadItemMetaEntity.ordenacao}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativo">
                            <Translate contentKey="generadorApp.statusPadItemMeta.ativo">Ativo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{statusPadItemMetaEntity.ativo ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/status-pad-item-meta" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/status-pad-item-meta/${statusPadItemMetaEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ statusPadItemMeta }: IRootState) => ({
  statusPadItemMetaEntity: statusPadItemMeta.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StatusPadItemMetaDetail);
