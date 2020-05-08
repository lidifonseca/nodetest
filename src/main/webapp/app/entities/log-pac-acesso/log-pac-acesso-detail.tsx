import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, ILogPacAcessoBaseState, getLogPacAcessoState } from './log-pac-acesso.reducer';
import { ILogPacAcesso } from 'app/shared/model/log-pac-acesso.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILogPacAcessoState {
  fieldsBase: ILogPacAcessoBaseState;
}

export interface ILogPacAcessoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class LogPacAcessoDetail extends React.Component<ILogPacAcessoDetailProps, ILogPacAcessoState> {
  constructor(props: Readonly<ILogPacAcessoDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getLogPacAcessoState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { logPacAcessoEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Log Pac Acessos</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Log Pac Acessos</li>
          <li className="breadcrumb-item active">Log Pac Acessos details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.logPacAcesso.detail.title">LogPacAcesso</Translate>[<b>{logPacAcessoEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idPaciente">
                            <Translate contentKey="generadorApp.logPacAcesso.idPaciente">Id Paciente</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{logPacAcessoEntity.idPaciente}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="profissional">
                            <Translate contentKey="generadorApp.logPacAcesso.profissional">Profissional</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{logPacAcessoEntity.profissional}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="token">
                            <Translate contentKey="generadorApp.logPacAcesso.token">Token</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{logPacAcessoEntity.token}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ipLocal">
                            <Translate contentKey="generadorApp.logPacAcesso.ipLocal">Ip Local</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{logPacAcessoEntity.ipLocal}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="inforAcesso">
                            <Translate contentKey="generadorApp.logPacAcesso.inforAcesso">Infor Acesso</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{logPacAcessoEntity.inforAcesso}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/log-pac-acesso" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/log-pac-acesso/${logPacAcessoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ logPacAcesso }: IRootState) => ({
  logPacAcessoEntity: logPacAcesso.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LogPacAcessoDetail);
