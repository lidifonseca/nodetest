import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IPadItemAtividadeBaseState, getPadItemAtividadeState } from './pad-item-atividade.reducer';
import { IPadItemAtividade } from 'app/shared/model/pad-item-atividade.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPadItemAtividadeState {
  fieldsBase: IPadItemAtividadeBaseState;
}

export interface IPadItemAtividadeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PadItemAtividadeDetail extends React.Component<IPadItemAtividadeDetailProps, IPadItemAtividadeState> {
  constructor(props: Readonly<IPadItemAtividadeDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getPadItemAtividadeState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { padItemAtividadeEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Item Atividades</li>
          <li className="breadcrumb-item active">Pad Item Atividades details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Pad Item Atividades</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.padItemAtividade.detail.title">PadItemAtividade</Translate>[
                  <b>{padItemAtividadeEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="dataInicio">
                            <Translate contentKey="generadorApp.padItemAtividade.dataInicio">Data Inicio</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={padItemAtividadeEntity.dataInicio} type="date" format={APP_LOCAL_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="dataFim">
                            <Translate contentKey="generadorApp.padItemAtividade.dataFim">Data Fim</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={padItemAtividadeEntity.dataFim} type="date" format={APP_LOCAL_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/pad-item-atividade" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/pad-item-atividade/${padItemAtividadeEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ padItemAtividade }: IRootState) => ({
  padItemAtividadeEntity: padItemAtividade.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadItemAtividadeDetail);
