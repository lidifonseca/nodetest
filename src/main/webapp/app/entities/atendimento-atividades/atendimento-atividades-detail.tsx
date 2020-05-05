import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './atendimento-atividades.reducer';
import { IAtendimentoAtividades } from 'app/shared/model/atendimento-atividades.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAtendimentoAtividadesDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AtendimentoAtividadesDetail extends React.Component<IAtendimentoAtividadesDetailProps> {
  constructor(props: Readonly<IAtendimentoAtividadesDetailProps>) {
    super(props);
    this.state = {
      ...this.state
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { atendimentoAtividadesEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Atendimento Atividades</li>
          <li className="breadcrumb-item active">Atendimento Atividades details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Atendimento Atividades</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.atendimentoAtividades.detail.title">AtendimentoAtividades</Translate>[
                  <b>{atendimentoAtividadesEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="feito">
                            <Translate contentKey="generadorApp.atendimentoAtividades.feito">Feito</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoAtividadesEntity.feito}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.atendimentoAtividades.idAtividade">Id Atividade</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoAtividadesEntity.idAtividade ? atendimentoAtividadesEntity.idAtividade.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.atendimentoAtividades.idAtendimento">Id Atendimento</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoAtividadesEntity.idAtendimento ? atendimentoAtividadesEntity.idAtendimento.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/atendimento-atividades" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/atendimento-atividades/${atendimentoAtividadesEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ atendimentoAtividades }: IRootState) => ({
  atendimentoAtividadesEntity: atendimentoAtividades.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AtendimentoAtividadesDetail);