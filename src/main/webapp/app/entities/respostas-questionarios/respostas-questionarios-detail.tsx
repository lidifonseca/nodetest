import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IRespostasQuestionariosBaseState, getRespostasQuestionariosState } from './respostas-questionarios.reducer';
import { IRespostasQuestionarios } from 'app/shared/model/respostas-questionarios.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRespostasQuestionariosState {
  fieldsBase: IRespostasQuestionariosBaseState;
}

export interface IRespostasQuestionariosDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class RespostasQuestionariosDetail extends React.Component<IRespostasQuestionariosDetailProps, IRespostasQuestionariosState> {
  constructor(props: Readonly<IRespostasQuestionariosDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getRespostasQuestionariosState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { respostasQuestionariosEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Respostas Questionarios</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Respostas Questionarios</li>
          <li className="breadcrumb-item active">Respostas Questionarios details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.respostasQuestionarios.detail.title">RespostasQuestionarios</Translate>[
                  <b>{respostasQuestionariosEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="dataResposta">
                            <Translate contentKey="generadorApp.respostasQuestionarios.dataResposta">Data Resposta</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={respostasQuestionariosEntity.dataResposta} type="date" format={APP_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="informacaoAdicional">
                            <Translate contentKey="generadorApp.respostasQuestionarios.informacaoAdicional">Informacao Adicional</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{respostasQuestionariosEntity.informacaoAdicional}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="questionarioId">
                            <Translate contentKey="generadorApp.respostasQuestionarios.questionarioId">Questionario Id</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{respostasQuestionariosEntity.questionarioId}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/respostas-questionarios" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/respostas-questionarios/${respostasQuestionariosEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ respostasQuestionarios }: IRootState) => ({
  respostasQuestionariosEntity: respostasQuestionarios.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RespostasQuestionariosDetail);
