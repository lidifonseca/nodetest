import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IPadItemResultadoBaseState, getPadItemResultadoState } from './pad-item-resultado.reducer';
import { IPadItemResultado } from 'app/shared/model/pad-item-resultado.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPadItemResultadoState {
  fieldsBase: IPadItemResultadoBaseState;
}

export interface IPadItemResultadoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PadItemResultadoDetail extends React.Component<IPadItemResultadoDetailProps, IPadItemResultadoState> {
  constructor(props: Readonly<IPadItemResultadoDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getPadItemResultadoState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { padItemResultadoEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Pad Item Resultados</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Item Resultados</li>
          <li className="breadcrumb-item active">Pad Item Resultados details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.padItemResultado.detail.title">PadItemResultado</Translate>[
                  <b>{padItemResultadoEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="resultado">
                            <Translate contentKey="generadorApp.padItemResultado.resultado">Resultado</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemResultadoEntity.resultado}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="dataFim">
                            <Translate contentKey="generadorApp.padItemResultado.dataFim">Data Fim</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={padItemResultadoEntity.dataFim} type="date" format={APP_LOCAL_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="resultadoAnalisado">
                            <Translate contentKey="generadorApp.padItemResultado.resultadoAnalisado">Resultado Analisado</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemResultadoEntity.resultadoAnalisado ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="usuarioId">
                            <Translate contentKey="generadorApp.padItemResultado.usuarioId">Usuario Id</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemResultadoEntity.usuarioId}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.padItemResultado.padItem">Pad Item</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemResultadoEntity.padItem ? padItemResultadoEntity.padItem.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/pad-item-resultado" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/pad-item-resultado/${padItemResultadoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ padItemResultado }: IRootState) => ({
  padItemResultadoEntity: padItemResultado.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadItemResultadoDetail);
