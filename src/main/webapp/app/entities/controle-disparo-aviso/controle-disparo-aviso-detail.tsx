import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IControleDisparoAvisoBaseState, getControleDisparoAvisoState } from './controle-disparo-aviso.reducer';
import { IControleDisparoAviso } from 'app/shared/model/controle-disparo-aviso.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IControleDisparoAvisoState {
  fieldsBase: IControleDisparoAvisoBaseState;
}

export interface IControleDisparoAvisoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ControleDisparoAvisoDetail extends React.Component<IControleDisparoAvisoDetailProps, IControleDisparoAvisoState> {
  constructor(props: Readonly<IControleDisparoAvisoDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getControleDisparoAvisoState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { controleDisparoAvisoEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Controle Disparo Avisos</li>
          <li className="breadcrumb-item active">Controle Disparo Avisos details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Controle Disparo Avisos</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.controleDisparoAviso.detail.title">ControleDisparoAviso</Translate>[
                  <b>{controleDisparoAvisoEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idAtendimento">
                            <Translate contentKey="generadorApp.controleDisparoAviso.idAtendimento">Id Atendimento</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{controleDisparoAvisoEntity.idAtendimento}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="qtdDisparo">
                            <Translate contentKey="generadorApp.controleDisparoAviso.qtdDisparo">Qtd Disparo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{controleDisparoAvisoEntity.qtdDisparo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="avisopush">
                            <Translate contentKey="generadorApp.controleDisparoAviso.avisopush">Avisopush</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{controleDisparoAvisoEntity.avisopush}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/controle-disparo-aviso" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/controle-disparo-aviso/${controleDisparoAvisoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ controleDisparoAviso }: IRootState) => ({
  controleDisparoAvisoEntity: controleDisparoAviso.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ControleDisparoAvisoDetail);
