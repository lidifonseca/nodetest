import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, ILogUserBaseState, getLogUserState } from './log-user.reducer';
import { ILogUser } from 'app/shared/model/log-user.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILogUserState {
  fieldsBase: ILogUserBaseState;
}

export interface ILogUserDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class LogUserDetail extends React.Component<ILogUserDetailProps, ILogUserState> {
  constructor(props: Readonly<ILogUserDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getLogUserState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { logUserEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Log Users</li>
          <li className="breadcrumb-item active">Log Users details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Log Users</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.logUser.detail.title">LogUser</Translate>[<b>{logUserEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idUsuario">
                            <Translate contentKey="generadorApp.logUser.idUsuario">Id Usuario</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{logUserEntity.idUsuario}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="descricao">
                            <Translate contentKey="generadorApp.logUser.descricao">Descricao</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{logUserEntity.descricao}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.logUser.idAcao">Id Acao</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{logUserEntity.idAcao ? logUserEntity.idAcao.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.logUser.idTela">Id Tela</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{logUserEntity.idTela ? logUserEntity.idTela.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/log-user" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/log-user/${logUserEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ logUser }: IRootState) => ({
  logUserEntity: logUser.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LogUserDetail);
