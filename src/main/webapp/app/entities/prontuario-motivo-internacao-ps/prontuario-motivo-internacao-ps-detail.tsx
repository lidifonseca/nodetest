import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import {
  getEntity,
  IProntuarioMotivoInternacaoPsBaseState,
  getProntuarioMotivoInternacaoPsState
} from './prontuario-motivo-internacao-ps.reducer';
import { IProntuarioMotivoInternacaoPs } from 'app/shared/model/prontuario-motivo-internacao-ps.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProntuarioMotivoInternacaoPsState {
  fieldsBase: IProntuarioMotivoInternacaoPsBaseState;
}

export interface IProntuarioMotivoInternacaoPsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProntuarioMotivoInternacaoPsDetail extends React.Component<
  IProntuarioMotivoInternacaoPsDetailProps,
  IProntuarioMotivoInternacaoPsState
> {
  constructor(props: Readonly<IProntuarioMotivoInternacaoPsDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getProntuarioMotivoInternacaoPsState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { prontuarioMotivoInternacaoPsEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Prontuario Motivo Internacao Ps</li>
          <li className="breadcrumb-item active">Prontuario Motivo Internacao Ps details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Prontuario Motivo Internacao Ps</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.prontuarioMotivoInternacaoPs.detail.title">ProntuarioMotivoInternacaoPs</Translate>[
                  <b>{prontuarioMotivoInternacaoPsEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idProntuario">
                            <Translate contentKey="generadorApp.prontuarioMotivoInternacaoPs.idProntuario">Id Prontuario</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{prontuarioMotivoInternacaoPsEntity.idProntuario}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idPaciente">
                            <Translate contentKey="generadorApp.prontuarioMotivoInternacaoPs.idPaciente">Id Paciente</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{prontuarioMotivoInternacaoPsEntity.idPaciente}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idMotivo">
                            <Translate contentKey="generadorApp.prontuarioMotivoInternacaoPs.idMotivo">Id Motivo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{prontuarioMotivoInternacaoPsEntity.idMotivo}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/prontuario-motivo-internacao-ps" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button
                  tag={Link}
                  to={`/prontuario-motivo-internacao-ps/${prontuarioMotivoInternacaoPsEntity.id}/edit`}
                  replace
                  color="primary"
                >
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

const mapStateToProps = ({ prontuarioMotivoInternacaoPs }: IRootState) => ({
  prontuarioMotivoInternacaoPsEntity: prontuarioMotivoInternacaoPs.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProntuarioMotivoInternacaoPsDetail);
