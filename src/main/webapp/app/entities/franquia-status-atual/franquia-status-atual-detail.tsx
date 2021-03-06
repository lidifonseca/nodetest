import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IFranquiaStatusAtualBaseState, getFranquiaStatusAtualState } from './franquia-status-atual.reducer';
import { IFranquiaStatusAtual } from 'app/shared/model/franquia-status-atual.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFranquiaStatusAtualState {
  fieldsBase: IFranquiaStatusAtualBaseState;
}

export interface IFranquiaStatusAtualDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FranquiaStatusAtualDetail extends React.Component<IFranquiaStatusAtualDetailProps, IFranquiaStatusAtualState> {
  constructor(props: Readonly<IFranquiaStatusAtualDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getFranquiaStatusAtualState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { franquiaStatusAtualEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Franquia Status Atuals</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Franquia Status Atuals</li>
          <li className="breadcrumb-item active">Franquia Status Atuals details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.franquiaStatusAtual.detail.title">FranquiaStatusAtual</Translate>[
                  <b>{franquiaStatusAtualEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="statusAtual">
                            <Translate contentKey="generadorApp.franquiaStatusAtual.statusAtual">Status Atual</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaStatusAtualEntity.statusAtual}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="obs">
                            <Translate contentKey="generadorApp.franquiaStatusAtual.obs">Obs</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaStatusAtualEntity.obs}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativo">
                            <Translate contentKey="generadorApp.franquiaStatusAtual.ativo">Ativo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaStatusAtualEntity.ativo ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.franquiaStatusAtual.franquia">Franquia</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaStatusAtualEntity.franquia ? franquiaStatusAtualEntity.franquia.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/franquia-status-atual" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/franquia-status-atual/${franquiaStatusAtualEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ franquiaStatusAtual }: IRootState) => ({
  franquiaStatusAtualEntity: franquiaStatusAtual.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FranquiaStatusAtualDetail);
