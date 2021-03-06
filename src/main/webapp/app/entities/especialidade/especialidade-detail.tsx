import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IEspecialidadeBaseState, getEspecialidadeState } from './especialidade.reducer';
import { IEspecialidade } from 'app/shared/model/especialidade.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEspecialidadeState {
  fieldsBase: IEspecialidadeBaseState;
}

export interface IEspecialidadeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EspecialidadeDetail extends React.Component<IEspecialidadeDetailProps, IEspecialidadeState> {
  constructor(props: Readonly<IEspecialidadeDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getEspecialidadeState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { especialidadeEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Especialidades</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Especialidades</li>
          <li className="breadcrumb-item active">Especialidades details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.especialidade.detail.title">Especialidade</Translate>[<b>{especialidadeEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="icon">
                            <Translate contentKey="generadorApp.especialidade.icon">Icon</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{especialidadeEntity.icon}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="especialidade">
                            <Translate contentKey="generadorApp.especialidade.especialidade">Especialidade</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{especialidadeEntity.especialidade}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="descricao">
                            <Translate contentKey="generadorApp.especialidade.descricao">Descricao</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{especialidadeEntity.descricao}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="duracao">
                            <Translate contentKey="generadorApp.especialidade.duracao">Duracao</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{especialidadeEntity.duracao}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="importante">
                            <Translate contentKey="generadorApp.especialidade.importante">Importante</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{especialidadeEntity.importante}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativo">
                            <Translate contentKey="generadorApp.especialidade.ativo">Ativo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{especialidadeEntity.ativo ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.especialidade.unidade">Unidade</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{especialidadeEntity.unidade ? especialidadeEntity.unidade.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.especialidade.categoria">Categoria</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{especialidadeEntity.categoria ? especialidadeEntity.categoria.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.especialidade.tipoEspecialidade">Tipo Especialidade</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{especialidadeEntity.tipoEspecialidade ? especialidadeEntity.tipoEspecialidade.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.especialidade.tipoUnidade">Tipo Unidade</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{especialidadeEntity.tipoUnidade ? especialidadeEntity.tipoUnidade.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/especialidade" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/especialidade/${especialidadeEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ especialidade }: IRootState) => ({
  especialidadeEntity: especialidade.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EspecialidadeDetail);
