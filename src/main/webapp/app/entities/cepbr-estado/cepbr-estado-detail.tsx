import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, ICepbrEstadoBaseState, getCepbrEstadoState } from './cepbr-estado.reducer';
import { ICepbrEstado } from 'app/shared/model/cepbr-estado.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICepbrEstadoState {
  fieldsBase: ICepbrEstadoBaseState;
}

export interface ICepbrEstadoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CepbrEstadoDetail extends React.Component<ICepbrEstadoDetailProps, ICepbrEstadoState> {
  constructor(props: Readonly<ICepbrEstadoDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getCepbrEstadoState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { cepbrEstadoEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Cepbr Estados</li>
          <li className="breadcrumb-item active">Cepbr Estados details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Cepbr Estados</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.cepbrEstado.detail.title">CepbrEstado</Translate>[<b>{cepbrEstadoEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="uf">
                            <Translate contentKey="generadorApp.cepbrEstado.uf">Uf</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cepbrEstadoEntity.uf}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="estado">
                            <Translate contentKey="generadorApp.cepbrEstado.estado">Estado</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cepbrEstadoEntity.estado}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="codIbge">
                            <Translate contentKey="generadorApp.cepbrEstado.codIbge">Cod Ibge</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cepbrEstadoEntity.codIbge}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/cepbr-estado" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/cepbr-estado/${cepbrEstadoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ cepbrEstado }: IRootState) => ({
  cepbrEstadoEntity: cepbrEstado.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CepbrEstadoDetail);
