import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IRespostasBaseState, getRespostasState } from './respostas.reducer';
import { IRespostas } from 'app/shared/model/respostas.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRespostasState {
  fieldsBase: IRespostasBaseState;
}

export interface IRespostasDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class RespostasDetail extends React.Component<IRespostasDetailProps, IRespostasState> {
  constructor(props: Readonly<IRespostasDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getRespostasState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { respostasEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Respostas</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Respostas</li>
          <li className="breadcrumb-item active">Respostas details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.respostas.detail.title">Respostas</Translate>[<b>{respostasEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="resposta">
                            <Translate contentKey="generadorApp.respostas.resposta">Resposta</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{respostasEntity.resposta}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="pontuacao">
                            <Translate contentKey="generadorApp.respostas.pontuacao">Pontuacao</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{respostasEntity.pontuacao}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="respostaAtiva">
                            <Translate contentKey="generadorApp.respostas.respostaAtiva">Resposta Ativa</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{respostasEntity.respostaAtiva ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.respostas.perguntasQuestionario">Perguntas Questionario</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{respostasEntity.perguntasQuestionario ? respostasEntity.perguntasQuestionario.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/respostas" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/respostas/${respostasEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ respostas }: IRootState) => ({
  respostasEntity: respostas.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RespostasDetail);
