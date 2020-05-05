import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import {
  getEntity,
  IProfissionalStatusAtualNewBaseState,
  getProfissionalStatusAtualNewState
} from './profissional-status-atual-new.reducer';
import { IProfissionalStatusAtualNew } from 'app/shared/model/profissional-status-atual-new.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProfissionalStatusAtualNewState {
  fieldsBase: IProfissionalStatusAtualNewBaseState;
}

export interface IProfissionalStatusAtualNewDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProfissionalStatusAtualNewDetail extends React.Component<
  IProfissionalStatusAtualNewDetailProps,
  IProfissionalStatusAtualNewState
> {
  constructor(props: Readonly<IProfissionalStatusAtualNewDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getProfissionalStatusAtualNewState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { profissionalStatusAtualNewEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Profissional Status Atual News</li>
          <li className="breadcrumb-item active">Profissional Status Atual News details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Profissional Status Atual News</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.profissionalStatusAtualNew.detail.title">ProfissionalStatusAtualNew</Translate>[
                  <b>{profissionalStatusAtualNewEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idProfissional">
                            <Translate contentKey="generadorApp.profissionalStatusAtualNew.idProfissional">Id Profissional</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalStatusAtualNewEntity.idProfissional}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idStatusAtualProf">
                            <Translate contentKey="generadorApp.profissionalStatusAtualNew.idStatusAtualProf">
                              Id Status Atual Prof
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalStatusAtualNewEntity.idStatusAtualProf}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="obs">
                            <Translate contentKey="generadorApp.profissionalStatusAtualNew.obs">Obs</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalStatusAtualNewEntity.obs}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativo">
                            <Translate contentKey="generadorApp.profissionalStatusAtualNew.ativo">Ativo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalStatusAtualNewEntity.ativo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idUsuario">
                            <Translate contentKey="generadorApp.profissionalStatusAtualNew.idUsuario">Id Usuario</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalStatusAtualNewEntity.idUsuario}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/profissional-status-atual-new" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button
                  tag={Link}
                  to={`/profissional-status-atual-new/${profissionalStatusAtualNewEntity.id}/edit`}
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

const mapStateToProps = ({ profissionalStatusAtualNew }: IRootState) => ({
  profissionalStatusAtualNewEntity: profissionalStatusAtualNew.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalStatusAtualNewDetail);
