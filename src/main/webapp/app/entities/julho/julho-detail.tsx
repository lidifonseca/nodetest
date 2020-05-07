import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IJulhoBaseState, getJulhoState } from './julho.reducer';
import { IJulho } from 'app/shared/model/julho.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IJulhoState {
  fieldsBase: IJulhoBaseState;
}

export interface IJulhoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class JulhoDetail extends React.Component<IJulhoDetailProps, IJulhoState> {
  constructor(props: Readonly<IJulhoDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getJulhoState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { julhoEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Julhos</li>
          <li className="breadcrumb-item active">Julhos details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Julhos</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.julho.detail.title">Julho</Translate>[<b>{julhoEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="dataInicio">
                            <Translate contentKey="generadorApp.julho.dataInicio">Data Inicio</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{julhoEntity.dataInicio}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="dataFim">
                            <Translate contentKey="generadorApp.julho.dataFim">Data Fim</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{julhoEntity.dataFim}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="especialidade">
                            <Translate contentKey="generadorApp.julho.especialidade">Especialidade</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{julhoEntity.especialidade}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="periodicidade">
                            <Translate contentKey="generadorApp.julho.periodicidade">Periodicidade</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{julhoEntity.periodicidade}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="periodo">
                            <Translate contentKey="generadorApp.julho.periodo">Periodo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{julhoEntity.periodo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="qtd">
                            <Translate contentKey="generadorApp.julho.qtd">Qtd</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{julhoEntity.qtd}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/julho" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/julho/${julhoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ julho }: IRootState) => ({
  julhoEntity: julho.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(JulhoDetail);
