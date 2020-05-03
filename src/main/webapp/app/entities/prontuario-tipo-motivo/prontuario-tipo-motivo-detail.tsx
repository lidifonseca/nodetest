import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './prontuario-tipo-motivo.reducer';
import { IProntuarioTipoMotivo } from 'app/shared/model/prontuario-tipo-motivo.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProntuarioTipoMotivoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProntuarioTipoMotivoDetail extends React.Component<IProntuarioTipoMotivoDetailProps> {
  constructor(props: Readonly<IProntuarioTipoMotivoDetailProps>) {
    super(props);
    this.state = {
      ...this.state
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { prontuarioTipoMotivoEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Prontuario Tipo Motivos</li>
          <li className="breadcrumb-item active">Prontuario Tipo Motivos details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Prontuario Tipo Motivos</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.prontuarioTipoMotivo.detail.title">ProntuarioTipoMotivo</Translate>[
                  <b>{prontuarioTipoMotivoEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="nome">
                            <Translate contentKey="generadorApp.prontuarioTipoMotivo.nome">Nome</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{prontuarioTipoMotivoEntity.nome}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idPai">
                            <Translate contentKey="generadorApp.prontuarioTipoMotivo.idPai">Id Pai</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{prontuarioTipoMotivoEntity.idPai}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativo">
                            <Translate contentKey="generadorApp.prontuarioTipoMotivo.ativo">Ativo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{prontuarioTipoMotivoEntity.ativo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="classe">
                            <Translate contentKey="generadorApp.prontuarioTipoMotivo.classe">Classe</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{prontuarioTipoMotivoEntity.classe}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="name">
                            <Translate contentKey="generadorApp.prontuarioTipoMotivo.name">Name</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{prontuarioTipoMotivoEntity.name}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idTipoProntuario">
                            <Translate contentKey="generadorApp.prontuarioTipoMotivo.idTipoProntuario">Id Tipo Prontuario</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{prontuarioTipoMotivoEntity.idTipoProntuario}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/prontuario-tipo-motivo" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/prontuario-tipo-motivo/${prontuarioTipoMotivoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ prontuarioTipoMotivo }: IRootState) => ({
  prontuarioTipoMotivoEntity: prontuarioTipoMotivo.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProntuarioTipoMotivoDetail);
