import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IPerguntasQuestionarioBaseState, getPerguntasQuestionarioState } from './perguntas-questionario.reducer';
import { IPerguntasQuestionario } from 'app/shared/model/perguntas-questionario.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPerguntasQuestionarioState {
  fieldsBase: IPerguntasQuestionarioBaseState;
}

export interface IPerguntasQuestionarioDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PerguntasQuestionarioDetail extends React.Component<IPerguntasQuestionarioDetailProps, IPerguntasQuestionarioState> {
  constructor(props: Readonly<IPerguntasQuestionarioDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getPerguntasQuestionarioState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { perguntasQuestionarioEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Perguntas Questionarios</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Perguntas Questionarios</li>
          <li className="breadcrumb-item active">Perguntas Questionarios details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.perguntasQuestionario.detail.title">PerguntasQuestionario</Translate>[
                  <b>{perguntasQuestionarioEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="pergunta">
                            <Translate contentKey="generadorApp.perguntasQuestionario.pergunta">Pergunta</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{perguntasQuestionarioEntity.pergunta}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="tipoResposta">
                            <Translate contentKey="generadorApp.perguntasQuestionario.tipoResposta">Tipo Resposta</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{perguntasQuestionarioEntity.tipoResposta}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="obrigatorio">
                            <Translate contentKey="generadorApp.perguntasQuestionario.obrigatorio">Obrigatorio</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{perguntasQuestionarioEntity.obrigatorio ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="tipoCampo">
                            <Translate contentKey="generadorApp.perguntasQuestionario.tipoCampo">Tipo Campo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{perguntasQuestionarioEntity.tipoCampo}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/perguntas-questionario" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/perguntas-questionario/${perguntasQuestionarioEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ perguntasQuestionario }: IRootState) => ({
  perguntasQuestionarioEntity: perguntasQuestionario.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PerguntasQuestionarioDetail);
