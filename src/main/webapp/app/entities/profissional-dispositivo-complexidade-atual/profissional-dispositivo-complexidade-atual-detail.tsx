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
  IProfissionalDispositivoComplexidadeAtualBaseState,
  getProfissionalDispositivoComplexidadeAtualState
} from './profissional-dispositivo-complexidade-atual.reducer';
import { IProfissionalDispositivoComplexidadeAtual } from 'app/shared/model/profissional-dispositivo-complexidade-atual.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProfissionalDispositivoComplexidadeAtualState {
  fieldsBase: IProfissionalDispositivoComplexidadeAtualBaseState;
}

export interface IProfissionalDispositivoComplexidadeAtualDetailProps
  extends StateProps,
    DispatchProps,
    RouteComponentProps<{ id: string }> {}

export class ProfissionalDispositivoComplexidadeAtualDetail extends React.Component<
  IProfissionalDispositivoComplexidadeAtualDetailProps,
  IProfissionalDispositivoComplexidadeAtualState
> {
  constructor(props: Readonly<IProfissionalDispositivoComplexidadeAtualDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getProfissionalDispositivoComplexidadeAtualState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { profissionalDispositivoComplexidadeAtualEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Profissional Dispositivo Complexidade Atuals</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Profissional Dispositivo Complexidade Atuals</li>
          <li className="breadcrumb-item active">Profissional Dispositivo Complexidade Atuals details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.profissionalDispositivoComplexidadeAtual.detail.title">
                    ProfissionalDispositivoComplexidadeAtual
                  </Translate>
                  [<b>{profissionalDispositivoComplexidadeAtualEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idProfissional">
                            <Translate contentKey="generadorApp.profissionalDispositivoComplexidadeAtual.idProfissional">
                              Id Profissional
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalDispositivoComplexidadeAtualEntity.idProfissional}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idProfissionalDispositivoComplexidade">
                            <Translate contentKey="generadorApp.profissionalDispositivoComplexidadeAtual.idProfissionalDispositivoComplexidade">
                              Id Profissional Dispositivo Complexidade
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalDispositivoComplexidadeAtualEntity.idProfissionalDispositivoComplexidade}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/profissional-dispositivo-complexidade-atual" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button
                  tag={Link}
                  to={`/profissional-dispositivo-complexidade-atual/${profissionalDispositivoComplexidadeAtualEntity.id}/edit`}
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

const mapStateToProps = ({ profissionalDispositivoComplexidadeAtual }: IRootState) => ({
  profissionalDispositivoComplexidadeAtualEntity: profissionalDispositivoComplexidadeAtual.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalDispositivoComplexidadeAtualDetail);
