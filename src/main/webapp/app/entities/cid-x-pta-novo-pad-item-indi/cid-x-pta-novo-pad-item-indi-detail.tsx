import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, ICidXPtaNovoPadItemIndiBaseState, getCidXPtaNovoPadItemIndiState } from './cid-x-pta-novo-pad-item-indi.reducer';
import { ICidXPtaNovoPadItemIndi } from 'app/shared/model/cid-x-pta-novo-pad-item-indi.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICidXPtaNovoPadItemIndiState {
  fieldsBase: ICidXPtaNovoPadItemIndiBaseState;
}

export interface ICidXPtaNovoPadItemIndiDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CidXPtaNovoPadItemIndiDetail extends React.Component<ICidXPtaNovoPadItemIndiDetailProps, ICidXPtaNovoPadItemIndiState> {
  constructor(props: Readonly<ICidXPtaNovoPadItemIndiDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getCidXPtaNovoPadItemIndiState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { cidXPtaNovoPadItemIndiEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Cid X Pta Novo Pad Item Indis</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Cid X Pta Novo Pad Item Indis</li>
          <li className="breadcrumb-item active">Cid X Pta Novo Pad Item Indis details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.detail.title">CidXPtaNovoPadItemIndi</Translate>[
                  <b>{cidXPtaNovoPadItemIndiEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="meta">
                            <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.meta">Meta</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cidXPtaNovoPadItemIndiEntity.meta}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="maximo">
                            <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.maximo">Maximo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cidXPtaNovoPadItemIndiEntity.maximo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="minimo">
                            <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.minimo">Minimo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cidXPtaNovoPadItemIndiEntity.minimo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="unidadeMedidaExtra">
                            <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.unidadeMedidaExtra">Unidade Medida Extra</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cidXPtaNovoPadItemIndiEntity.unidadeMedidaExtra}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="unidadeMedidaId">
                            <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.unidadeMedidaId">Unidade Medida Id</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cidXPtaNovoPadItemIndiEntity.unidadeMedidaId}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="score">
                            <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.score">Score</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cidXPtaNovoPadItemIndiEntity.score}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.padItemIndicadores">Pad Item Indicadores</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cidXPtaNovoPadItemIndiEntity.padItemIndicadores ? cidXPtaNovoPadItemIndiEntity.padItemIndicadores.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.categorias">Categorias</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cidXPtaNovoPadItemIndiEntity.categorias ? cidXPtaNovoPadItemIndiEntity.categorias.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndi.cidXPtaNovo">Cid X Pta Novo</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cidXPtaNovoPadItemIndiEntity.cidXPtaNovo ? cidXPtaNovoPadItemIndiEntity.cidXPtaNovo.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/cid-x-pta-novo-pad-item-indi" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/cid-x-pta-novo-pad-item-indi/${cidXPtaNovoPadItemIndiEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ cidXPtaNovoPadItemIndi }: IRootState) => ({
  cidXPtaNovoPadItemIndiEntity: cidXPtaNovoPadItemIndi.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CidXPtaNovoPadItemIndiDetail);
