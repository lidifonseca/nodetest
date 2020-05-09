import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IMotivoPsBaseState, getMotivoPsState } from './motivo-ps.reducer';
import { IMotivoPs } from 'app/shared/model/motivo-ps.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMotivoPsState {
  fieldsBase: IMotivoPsBaseState;
}

export interface IMotivoPsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MotivoPsDetail extends React.Component<IMotivoPsDetailProps, IMotivoPsState> {
  constructor(props: Readonly<IMotivoPsDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getMotivoPsState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { motivoPsEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Motivo Ps</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Motivo Ps</li>
          <li className="breadcrumb-item active">Motivo Ps details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.motivoPs.detail.title">MotivoPs</Translate>[<b>{motivoPsEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="nome">
                            <Translate contentKey="generadorApp.motivoPs.nome">Nome</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{motivoPsEntity.nome}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idPai">
                            <Translate contentKey="generadorApp.motivoPs.idPai">Id Pai</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{motivoPsEntity.idPai}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativo">
                            <Translate contentKey="generadorApp.motivoPs.ativo">Ativo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{motivoPsEntity.ativo ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="classe">
                            <Translate contentKey="generadorApp.motivoPs.classe">Classe</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{motivoPsEntity.classe}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="name">
                            <Translate contentKey="generadorApp.motivoPs.name">Name</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{motivoPsEntity.name}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/motivo-ps" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/motivo-ps/${motivoPsEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ motivoPs }: IRootState) => ({
  motivoPsEntity: motivoPs.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MotivoPsDetail);
