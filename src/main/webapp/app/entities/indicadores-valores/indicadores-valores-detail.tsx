import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IIndicadoresValoresBaseState, getIndicadoresValoresState } from './indicadores-valores.reducer';
import { IIndicadoresValores } from 'app/shared/model/indicadores-valores.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IIndicadoresValoresState {
  fieldsBase: IIndicadoresValoresBaseState;
}

export interface IIndicadoresValoresDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class IndicadoresValoresDetail extends React.Component<IIndicadoresValoresDetailProps, IIndicadoresValoresState> {
  constructor(props: Readonly<IIndicadoresValoresDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getIndicadoresValoresState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { indicadoresValoresEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Indicadores Valores</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Indicadores Valores</li>
          <li className="breadcrumb-item active">Indicadores Valores details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.indicadoresValores.detail.title">IndicadoresValores</Translate>[
                  <b>{indicadoresValoresEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="sexo">
                            <Translate contentKey="generadorApp.indicadoresValores.sexo">Sexo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{indicadoresValoresEntity.sexo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="vlMinimo">
                            <Translate contentKey="generadorApp.indicadoresValores.vlMinimo">Vl Minimo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{indicadoresValoresEntity.vlMinimo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="vlMaximo">
                            <Translate contentKey="generadorApp.indicadoresValores.vlMaximo">Vl Maximo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{indicadoresValoresEntity.vlMaximo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="unidadeMedida">
                            <Translate contentKey="generadorApp.indicadoresValores.unidadeMedida">Unidade Medida</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{indicadoresValoresEntity.unidadeMedida}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idadeMinima">
                            <Translate contentKey="generadorApp.indicadoresValores.idadeMinima">Idade Minima</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{indicadoresValoresEntity.idadeMinima}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idadeMaxima">
                            <Translate contentKey="generadorApp.indicadoresValores.idadeMaxima">Idade Maxima</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{indicadoresValoresEntity.idadeMaxima}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/indicadores-valores" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/indicadores-valores/${indicadoresValoresEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ indicadoresValores }: IRootState) => ({
  indicadoresValoresEntity: indicadoresValores.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(IndicadoresValoresDetail);
