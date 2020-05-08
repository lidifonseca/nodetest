import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IReportEmailAtendimentoBaseState, getReportEmailAtendimentoState } from './report-email-atendimento.reducer';
import { IReportEmailAtendimento } from 'app/shared/model/report-email-atendimento.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReportEmailAtendimentoState {
  fieldsBase: IReportEmailAtendimentoBaseState;
}

export interface IReportEmailAtendimentoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ReportEmailAtendimentoDetail extends React.Component<IReportEmailAtendimentoDetailProps, IReportEmailAtendimentoState> {
  constructor(props: Readonly<IReportEmailAtendimentoDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getReportEmailAtendimentoState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { reportEmailAtendimentoEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Report Email Atendimentos</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Report Email Atendimentos</li>
          <li className="breadcrumb-item active">Report Email Atendimentos details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.reportEmailAtendimento.detail.title">ReportEmailAtendimento</Translate>[
                  <b>{reportEmailAtendimentoEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idAtendimento">
                            <Translate contentKey="generadorApp.reportEmailAtendimento.idAtendimento">Id Atendimento</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{reportEmailAtendimentoEntity.idAtendimento}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="tipoReport">
                            <Translate contentKey="generadorApp.reportEmailAtendimento.tipoReport">Tipo Report</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{reportEmailAtendimentoEntity.tipoReport}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/report-email-atendimento" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/report-email-atendimento/${reportEmailAtendimentoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ reportEmailAtendimento }: IRootState) => ({
  reportEmailAtendimentoEntity: reportEmailAtendimento.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReportEmailAtendimentoDetail);
