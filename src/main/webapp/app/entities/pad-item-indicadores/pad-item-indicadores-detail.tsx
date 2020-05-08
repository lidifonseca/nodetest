import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IPadItemIndicadoresBaseState, getPadItemIndicadoresState } from './pad-item-indicadores.reducer';
import { IPadItemIndicadores } from 'app/shared/model/pad-item-indicadores.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPadItemIndicadoresState {
  fieldsBase: IPadItemIndicadoresBaseState;
}

export interface IPadItemIndicadoresDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PadItemIndicadoresDetail extends React.Component<IPadItemIndicadoresDetailProps, IPadItemIndicadoresState> {
  constructor(props: Readonly<IPadItemIndicadoresDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getPadItemIndicadoresState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { padItemIndicadoresEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Pad Item Indicadores</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Item Indicadores</li>
          <li className="breadcrumb-item active">Pad Item Indicadores details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.padItemIndicadores.detail.title">PadItemIndicadores</Translate>[
                  <b>{padItemIndicadoresEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idUnidadeMedida">
                            <Translate contentKey="generadorApp.padItemIndicadores.idUnidadeMedida">Id Unidade Medida</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemIndicadoresEntity.idUnidadeMedida}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="titulo">
                            <Translate contentKey="generadorApp.padItemIndicadores.titulo">Titulo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemIndicadoresEntity.titulo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="descricao">
                            <Translate contentKey="generadorApp.padItemIndicadores.descricao">Descricao</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemIndicadoresEntity.descricao}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="meta">
                            <Translate contentKey="generadorApp.padItemIndicadores.meta">Meta</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemIndicadoresEntity.meta}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="maximoSt">
                            <Translate contentKey="generadorApp.padItemIndicadores.maximoSt">Maximo St</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemIndicadoresEntity.maximoSt}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="minimoSt">
                            <Translate contentKey="generadorApp.padItemIndicadores.minimoSt">Minimo St</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemIndicadoresEntity.minimoSt}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/pad-item-indicadores" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/pad-item-indicadores/${padItemIndicadoresEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ padItemIndicadores }: IRootState) => ({
  padItemIndicadoresEntity: padItemIndicadores.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadItemIndicadoresDetail);
