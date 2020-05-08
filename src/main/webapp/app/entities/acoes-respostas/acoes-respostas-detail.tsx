import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IAcoesRespostasBaseState, getAcoesRespostasState } from './acoes-respostas.reducer';
import { IAcoesRespostas } from 'app/shared/model/acoes-respostas.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAcoesRespostasState {
  fieldsBase: IAcoesRespostasBaseState;
}

export interface IAcoesRespostasDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AcoesRespostasDetail extends React.Component<IAcoesRespostasDetailProps, IAcoesRespostasState> {
  constructor(props: Readonly<IAcoesRespostasDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getAcoesRespostasState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { acoesRespostasEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Acoes Respostas</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Acoes Respostas</li>
          <li className="breadcrumb-item active">Acoes Respostas details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.acoesRespostas.detail.title">AcoesRespostas</Translate>[
                  <b>{acoesRespostasEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="abrirCampoPersonalizado">
                            <Translate contentKey="generadorApp.acoesRespostas.abrirCampoPersonalizado">
                              Abrir Campo Personalizado
                            </Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{acoesRespostasEntity.abrirCampoPersonalizado ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="condicaoSexo">
                            <Translate contentKey="generadorApp.acoesRespostas.condicaoSexo">Condicao Sexo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{acoesRespostasEntity.condicaoSexo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="observacoes">
                            <Translate contentKey="generadorApp.acoesRespostas.observacoes">Observacoes</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{acoesRespostasEntity.observacoes}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="tipoCampo1">
                            <Translate contentKey="generadorApp.acoesRespostas.tipoCampo1">Tipo Campo 1</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{acoesRespostasEntity.tipoCampo1}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="tipoCampo2">
                            <Translate contentKey="generadorApp.acoesRespostas.tipoCampo2">Tipo Campo 2</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{acoesRespostasEntity.tipoCampo2}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.acoesRespostas.respostas">Respostas</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{acoesRespostasEntity.respostas ? acoesRespostasEntity.respostas.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.acoesRespostas.perguntasQuestionario">Perguntas Questionario</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{acoesRespostasEntity.perguntasQuestionario ? acoesRespostasEntity.perguntasQuestionario.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/acoes-respostas" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/acoes-respostas/${acoesRespostasEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ acoesRespostas }: IRootState) => ({
  acoesRespostasEntity: acoesRespostas.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AcoesRespostasDetail);
