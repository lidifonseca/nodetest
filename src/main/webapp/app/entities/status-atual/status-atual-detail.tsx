import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IStatusAtualBaseState, getStatusAtualState } from './status-atual.reducer';
import { IStatusAtual } from 'app/shared/model/status-atual.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStatusAtualState {
  fieldsBase: IStatusAtualBaseState;
}

export interface IStatusAtualDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class StatusAtualDetail extends React.Component<IStatusAtualDetailProps, IStatusAtualState> {
  constructor(props: Readonly<IStatusAtualDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getStatusAtualState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { statusAtualEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Status Atuals</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Status Atuals</li>
          <li className="breadcrumb-item active">Status Atuals details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.statusAtual.detail.title">StatusAtual</Translate>[<b>{statusAtualEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="statusAtual">
                            <Translate contentKey="generadorApp.statusAtual.statusAtual">Status Atual</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{statusAtualEntity.statusAtual}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="styleLabel">
                            <Translate contentKey="generadorApp.statusAtual.styleLabel">Style Label</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{statusAtualEntity.styleLabel}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/status-atual" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/status-atual/${statusAtualEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ statusAtual }: IRootState) => ({
  statusAtualEntity: statusAtual.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StatusAtualDetail);
