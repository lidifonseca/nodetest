import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './cid-x-pta-novo-pad-item-indicadores.reducer';
import { ICidXPtaNovoPadItemIndicadores } from 'app/shared/model/cid-x-pta-novo-pad-item-indicadores.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICidXPtaNovoPadItemIndicadoresDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CidXPtaNovoPadItemIndicadoresDetail extends React.Component<ICidXPtaNovoPadItemIndicadoresDetailProps> {
  constructor(props: Readonly<ICidXPtaNovoPadItemIndicadoresDetailProps>) {
    super(props);
    this.state = {
      ...this.state
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { cidXPtaNovoPadItemIndicadoresEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Cid X Pta Novo Pad Item Indicadores</li>
          <li className="breadcrumb-item active">Cid X Pta Novo Pad Item Indicadores details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Cid X Pta Novo Pad Item Indicadores</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.detail.title">CidXPtaNovoPadItemIndicadores</Translate>[
                  <b>{cidXPtaNovoPadItemIndicadoresEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="meta">
                            <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.meta">Meta</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cidXPtaNovoPadItemIndicadoresEntity.meta}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="maximo">
                            <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.maximo">Maximo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cidXPtaNovoPadItemIndicadoresEntity.maximo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="minimo">
                            <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.minimo">Minimo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cidXPtaNovoPadItemIndicadoresEntity.minimo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="unidadeMedidaExtra">
                            <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.unidadeMedidaExtra">
                              Unidade Medida Extra
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cidXPtaNovoPadItemIndicadoresEntity.unidadeMedidaExtra}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="unidadeMedidaId">
                            <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.unidadeMedidaId">Unidade Medida Id</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cidXPtaNovoPadItemIndicadoresEntity.unidadeMedidaId}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="score">
                            <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.score">Score</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cidXPtaNovoPadItemIndicadoresEntity.score}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.padItemIndicadoresId">
                            Pad Item Indicadores Id
                          </Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          {cidXPtaNovoPadItemIndicadoresEntity.padItemIndicadoresId
                            ? cidXPtaNovoPadItemIndicadoresEntity.padItemIndicadoresId.id
                            : ''}
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.categoriasId">Categorias Id</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          {cidXPtaNovoPadItemIndicadoresEntity.categoriasId ? cidXPtaNovoPadItemIndicadoresEntity.categoriasId.id : ''}
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.cidXPtaNovoPadItemIndicadores.cidXPtaNovoId">Cid X Pta Novo Id</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          {cidXPtaNovoPadItemIndicadoresEntity.cidXPtaNovoId ? cidXPtaNovoPadItemIndicadoresEntity.cidXPtaNovoId.id : ''}
                        </dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/cid-x-pta-novo-pad-item-indicadores" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button
                  tag={Link}
                  to={`/cid-x-pta-novo-pad-item-indicadores/${cidXPtaNovoPadItemIndicadoresEntity.id}/edit`}
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

const mapStateToProps = ({ cidXPtaNovoPadItemIndicadores }: IRootState) => ({
  cidXPtaNovoPadItemIndicadoresEntity: cidXPtaNovoPadItemIndicadores.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CidXPtaNovoPadItemIndicadoresDetail);
