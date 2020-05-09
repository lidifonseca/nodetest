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
  ITipoPreferenciaAtendimentoBaseState,
  getTipoPreferenciaAtendimentoState
} from './tipo-preferencia-atendimento.reducer';
import { ITipoPreferenciaAtendimento } from 'app/shared/model/tipo-preferencia-atendimento.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITipoPreferenciaAtendimentoState {
  fieldsBase: ITipoPreferenciaAtendimentoBaseState;
}

export interface ITipoPreferenciaAtendimentoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TipoPreferenciaAtendimentoDetail extends React.Component<
  ITipoPreferenciaAtendimentoDetailProps,
  ITipoPreferenciaAtendimentoState
> {
  constructor(props: Readonly<ITipoPreferenciaAtendimentoDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getTipoPreferenciaAtendimentoState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { tipoPreferenciaAtendimentoEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Tipo Preferencia Atendimentos</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Tipo Preferencia Atendimentos</li>
          <li className="breadcrumb-item active">Tipo Preferencia Atendimentos details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.tipoPreferenciaAtendimento.detail.title">TipoPreferenciaAtendimento</Translate>[
                  <b>{tipoPreferenciaAtendimentoEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="nome">
                            <Translate contentKey="generadorApp.tipoPreferenciaAtendimento.nome">Nome</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{tipoPreferenciaAtendimentoEntity.nome}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativo">
                            <Translate contentKey="generadorApp.tipoPreferenciaAtendimento.ativo">Ativo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{tipoPreferenciaAtendimentoEntity.ativo ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/tipo-preferencia-atendimento" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/tipo-preferencia-atendimento/${tipoPreferenciaAtendimentoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ tipoPreferenciaAtendimento }: IRootState) => ({
  tipoPreferenciaAtendimentoEntity: tipoPreferenciaAtendimento.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TipoPreferenciaAtendimentoDetail);
