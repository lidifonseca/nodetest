import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, ILogUserFranquiaBaseState, getLogUserFranquiaState } from './log-user-franquia.reducer';
import { ILogUserFranquia } from 'app/shared/model/log-user-franquia.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILogUserFranquiaState {
  fieldsBase: ILogUserFranquiaBaseState;
}

export interface ILogUserFranquiaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class LogUserFranquiaDetail extends React.Component<ILogUserFranquiaDetailProps, ILogUserFranquiaState> {
  constructor(props: Readonly<ILogUserFranquiaDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getLogUserFranquiaState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { logUserFranquiaEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Log User Franquias</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Log User Franquias</li>
          <li className="breadcrumb-item active">Log User Franquias details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.logUserFranquia.detail.title">LogUserFranquia</Translate>[
                  <b>{logUserFranquiaEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="descricao">
                            <Translate contentKey="generadorApp.logUserFranquia.descricao">Descricao</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{logUserFranquiaEntity.descricao}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.logUserFranquia.acao">Acao</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{logUserFranquiaEntity.acao ? logUserFranquiaEntity.acao.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.logUserFranquia.tela">Tela</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{logUserFranquiaEntity.tela ? logUserFranquiaEntity.tela.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.logUserFranquia.usuario">Usuario</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{logUserFranquiaEntity.usuario ? logUserFranquiaEntity.usuario.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/log-user-franquia" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/log-user-franquia/${logUserFranquiaEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ logUserFranquia }: IRootState) => ({
  logUserFranquiaEntity: logUserFranquia.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LogUserFranquiaDetail);
