import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IAtendimentoAssinaturasBaseState, getAtendimentoAssinaturasState } from './atendimento-assinaturas.reducer';
import { IAtendimentoAssinaturas } from 'app/shared/model/atendimento-assinaturas.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAtendimentoAssinaturasState {
  fieldsBase: IAtendimentoAssinaturasBaseState;
}

export interface IAtendimentoAssinaturasDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AtendimentoAssinaturasDetail extends React.Component<IAtendimentoAssinaturasDetailProps, IAtendimentoAssinaturasState> {
  constructor(props: Readonly<IAtendimentoAssinaturasDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getAtendimentoAssinaturasState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { atendimentoAssinaturasEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Atendimento Assinaturas</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Atendimento Assinaturas</li>
          <li className="breadcrumb-item active">Atendimento Assinaturas details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.atendimentoAssinaturas.detail.title">AtendimentoAssinaturas</Translate>[
                  <b>{atendimentoAssinaturasEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="arquivoAssinatura">
                            <Translate contentKey="generadorApp.atendimentoAssinaturas.arquivoAssinatura">Arquivo Assinatura</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoAssinaturasEntity.arquivoAssinatura}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.atendimentoAssinaturas.atendimento">Atendimento</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoAssinaturasEntity.atendimento ? atendimentoAssinaturasEntity.atendimento.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.atendimentoAssinaturas.profissional">Profissional</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoAssinaturasEntity.profissional ? atendimentoAssinaturasEntity.profissional.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.atendimentoAssinaturas.paciente">Paciente</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoAssinaturasEntity.paciente ? atendimentoAssinaturasEntity.paciente.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/atendimento-assinaturas" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/atendimento-assinaturas/${atendimentoAssinaturasEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ atendimentoAssinaturas }: IRootState) => ({
  atendimentoAssinaturasEntity: atendimentoAssinaturas.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AtendimentoAssinaturasDetail);
