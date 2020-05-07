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
  IProfissionalComplexidadeAtualBaseState,
  getProfissionalComplexidadeAtualState
} from './profissional-complexidade-atual.reducer';
import { IProfissionalComplexidadeAtual } from 'app/shared/model/profissional-complexidade-atual.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProfissionalComplexidadeAtualState {
  fieldsBase: IProfissionalComplexidadeAtualBaseState;
}

export interface IProfissionalComplexidadeAtualDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProfissionalComplexidadeAtualDetail extends React.Component<
  IProfissionalComplexidadeAtualDetailProps,
  IProfissionalComplexidadeAtualState
> {
  constructor(props: Readonly<IProfissionalComplexidadeAtualDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getProfissionalComplexidadeAtualState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { profissionalComplexidadeAtualEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Profissional Complexidade Atuals</li>
          <li className="breadcrumb-item active">Profissional Complexidade Atuals details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Profissional Complexidade Atuals</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.profissionalComplexidadeAtual.detail.title">ProfissionalComplexidadeAtual</Translate>[
                  <b>{profissionalComplexidadeAtualEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idProfissional">
                            <Translate contentKey="generadorApp.profissionalComplexidadeAtual.idProfissional">Id Profissional</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalComplexidadeAtualEntity.idProfissional}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="baixa">
                            <Translate contentKey="generadorApp.profissionalComplexidadeAtual.baixa">Baixa</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalComplexidadeAtualEntity.baixa}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="media">
                            <Translate contentKey="generadorApp.profissionalComplexidadeAtual.media">Media</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalComplexidadeAtualEntity.media}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="alta">
                            <Translate contentKey="generadorApp.profissionalComplexidadeAtual.alta">Alta</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalComplexidadeAtualEntity.alta}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ventilacaoMecanica">
                            <Translate contentKey="generadorApp.profissionalComplexidadeAtual.ventilacaoMecanica">
                              Ventilacao Mecanica
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalComplexidadeAtualEntity.ventilacaoMecanica}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="telemonitoramente">
                            <Translate contentKey="generadorApp.profissionalComplexidadeAtual.telemonitoramente">
                              Telemonitoramente
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalComplexidadeAtualEntity.telemonitoramente}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/profissional-complexidade-atual" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button
                  tag={Link}
                  to={`/profissional-complexidade-atual/${profissionalComplexidadeAtualEntity.id}/edit`}
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

const mapStateToProps = ({ profissionalComplexidadeAtual }: IRootState) => ({
  profissionalComplexidadeAtualEntity: profissionalComplexidadeAtual.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalComplexidadeAtualDetail);
