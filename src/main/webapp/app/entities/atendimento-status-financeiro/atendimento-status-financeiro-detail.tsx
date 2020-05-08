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
  IAtendimentoStatusFinanceiroBaseState,
  getAtendimentoStatusFinanceiroState
} from './atendimento-status-financeiro.reducer';
import { IAtendimentoStatusFinanceiro } from 'app/shared/model/atendimento-status-financeiro.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAtendimentoStatusFinanceiroState {
  fieldsBase: IAtendimentoStatusFinanceiroBaseState;
}

export interface IAtendimentoStatusFinanceiroDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AtendimentoStatusFinanceiroDetail extends React.Component<
  IAtendimentoStatusFinanceiroDetailProps,
  IAtendimentoStatusFinanceiroState
> {
  constructor(props: Readonly<IAtendimentoStatusFinanceiroDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getAtendimentoStatusFinanceiroState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { atendimentoStatusFinanceiroEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Atendimento Status Financeiros</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Atendimento Status Financeiros</li>
          <li className="breadcrumb-item active">Atendimento Status Financeiros details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.atendimentoStatusFinanceiro.detail.title">AtendimentoStatusFinanceiro</Translate>[
                  <b>{atendimentoStatusFinanceiroEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idAtendimento">
                            <Translate contentKey="generadorApp.atendimentoStatusFinanceiro.idAtendimento">Id Atendimento</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoStatusFinanceiroEntity.idAtendimento}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idStatusFinanceiro">
                            <Translate contentKey="generadorApp.atendimentoStatusFinanceiro.idStatusFinanceiro">
                              Id Status Financeiro
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoStatusFinanceiroEntity.idStatusFinanceiro}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/atendimento-status-financeiro" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button
                  tag={Link}
                  to={`/atendimento-status-financeiro/${atendimentoStatusFinanceiroEntity.id}/edit`}
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

const mapStateToProps = ({ atendimentoStatusFinanceiro }: IRootState) => ({
  atendimentoStatusFinanceiroEntity: atendimentoStatusFinanceiro.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AtendimentoStatusFinanceiroDetail);
