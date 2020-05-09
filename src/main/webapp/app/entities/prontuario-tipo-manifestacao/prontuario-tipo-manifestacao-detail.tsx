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
  IProntuarioTipoManifestacaoBaseState,
  getProntuarioTipoManifestacaoState
} from './prontuario-tipo-manifestacao.reducer';
import { IProntuarioTipoManifestacao } from 'app/shared/model/prontuario-tipo-manifestacao.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProntuarioTipoManifestacaoState {
  fieldsBase: IProntuarioTipoManifestacaoBaseState;
}

export interface IProntuarioTipoManifestacaoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProntuarioTipoManifestacaoDetail extends React.Component<
  IProntuarioTipoManifestacaoDetailProps,
  IProntuarioTipoManifestacaoState
> {
  constructor(props: Readonly<IProntuarioTipoManifestacaoDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getProntuarioTipoManifestacaoState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { prontuarioTipoManifestacaoEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Prontuario Tipo Manifestacaos</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Prontuario Tipo Manifestacaos</li>
          <li className="breadcrumb-item active">Prontuario Tipo Manifestacaos details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.prontuarioTipoManifestacao.detail.title">ProntuarioTipoManifestacao</Translate>[
                  <b>{prontuarioTipoManifestacaoEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="nome">
                            <Translate contentKey="generadorApp.prontuarioTipoManifestacao.nome">Nome</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{prontuarioTipoManifestacaoEntity.nome}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idPai">
                            <Translate contentKey="generadorApp.prontuarioTipoManifestacao.idPai">Id Pai</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{prontuarioTipoManifestacaoEntity.idPai}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativo">
                            <Translate contentKey="generadorApp.prontuarioTipoManifestacao.ativo">Ativo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{prontuarioTipoManifestacaoEntity.ativo ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/prontuario-tipo-manifestacao" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/prontuario-tipo-manifestacao/${prontuarioTipoManifestacaoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ prontuarioTipoManifestacao }: IRootState) => ({
  prontuarioTipoManifestacaoEntity: prontuarioTipoManifestacao.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProntuarioTipoManifestacaoDetail);
