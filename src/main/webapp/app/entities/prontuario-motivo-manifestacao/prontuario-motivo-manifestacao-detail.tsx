import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import {
  getEntity,
  IProntuarioMotivoManifestacaoBaseState,
  getProntuarioMotivoManifestacaoState
} from './prontuario-motivo-manifestacao.reducer';
import { IProntuarioMotivoManifestacao } from 'app/shared/model/prontuario-motivo-manifestacao.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProntuarioMotivoManifestacaoState {
  fieldsBase: IProntuarioMotivoManifestacaoBaseState;
}

export interface IProntuarioMotivoManifestacaoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProntuarioMotivoManifestacaoDetail extends React.Component<
  IProntuarioMotivoManifestacaoDetailProps,
  IProntuarioMotivoManifestacaoState
> {
  constructor(props: Readonly<IProntuarioMotivoManifestacaoDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getProntuarioMotivoManifestacaoState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { prontuarioMotivoManifestacaoEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Prontuario Motivo Manifestacaos</li>
          <li className="breadcrumb-item active">Prontuario Motivo Manifestacaos details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Prontuario Motivo Manifestacaos</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.detail.title">ProntuarioMotivoManifestacao</Translate>[
                  <b>{prontuarioMotivoManifestacaoEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idProntuario">
                            <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.idProntuario">Id Prontuario</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{prontuarioMotivoManifestacaoEntity.idProntuario}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idPaciente">
                            <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.idPaciente">Id Paciente</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{prontuarioMotivoManifestacaoEntity.idPaciente}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idMotivo">
                            <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.idMotivo">Id Motivo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{prontuarioMotivoManifestacaoEntity.idMotivo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idMotivoFilho">
                            <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.idMotivoFilho">Id Motivo Filho</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{prontuarioMotivoManifestacaoEntity.idMotivoFilho}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idManifestacao">
                            <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.idManifestacao">Id Manifestacao</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{prontuarioMotivoManifestacaoEntity.idManifestacao}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idManifestacaoFilho">
                            <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.idManifestacaoFilho">
                              Id Manifestacao Filho
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{prontuarioMotivoManifestacaoEntity.idManifestacaoFilho}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="sugestao">
                            <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.sugestao">Sugestao</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{prontuarioMotivoManifestacaoEntity.sugestao}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idUsuario">
                            <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.idUsuario">Id Usuario</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{prontuarioMotivoManifestacaoEntity.idUsuario}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="informacaoAdicional">
                            <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.informacaoAdicional">
                              Informacao Adicional
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{prontuarioMotivoManifestacaoEntity.informacaoAdicional}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/prontuario-motivo-manifestacao" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button
                  tag={Link}
                  to={`/prontuario-motivo-manifestacao/${prontuarioMotivoManifestacaoEntity.id}/edit`}
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

const mapStateToProps = ({ prontuarioMotivoManifestacao }: IRootState) => ({
  prontuarioMotivoManifestacaoEntity: prontuarioMotivoManifestacao.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProntuarioMotivoManifestacaoDetail);
