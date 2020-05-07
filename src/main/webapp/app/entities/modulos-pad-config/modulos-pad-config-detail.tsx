import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IModulosPadConfigBaseState, getModulosPadConfigState } from './modulos-pad-config.reducer';
import { IModulosPadConfig } from 'app/shared/model/modulos-pad-config.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IModulosPadConfigState {
  fieldsBase: IModulosPadConfigBaseState;
}

export interface IModulosPadConfigDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ModulosPadConfigDetail extends React.Component<IModulosPadConfigDetailProps, IModulosPadConfigState> {
  constructor(props: Readonly<IModulosPadConfigDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getModulosPadConfigState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { modulosPadConfigEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Modulos Pad Configs</li>
          <li className="breadcrumb-item active">Modulos Pad Configs details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Modulos Pad Configs</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.modulosPadConfig.detail.title">ModulosPadConfig</Translate>[
                  <b>{modulosPadConfigEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idModulosPad">
                            <Translate contentKey="generadorApp.modulosPadConfig.idModulosPad">Id Modulos Pad</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{modulosPadConfigEntity.idModulosPad}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idEspecialidade">
                            <Translate contentKey="generadorApp.modulosPadConfig.idEspecialidade">Id Especialidade</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{modulosPadConfigEntity.idEspecialidade}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idPeriodicidade">
                            <Translate contentKey="generadorApp.modulosPadConfig.idPeriodicidade">Id Periodicidade</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{modulosPadConfigEntity.idPeriodicidade}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/modulos-pad-config" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/modulos-pad-config/${modulosPadConfigEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ modulosPadConfig }: IRootState) => ({
  modulosPadConfigEntity: modulosPadConfig.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ModulosPadConfigDetail);
