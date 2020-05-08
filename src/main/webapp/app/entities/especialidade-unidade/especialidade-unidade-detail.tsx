import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IEspecialidadeUnidadeBaseState, getEspecialidadeUnidadeState } from './especialidade-unidade.reducer';
import { IEspecialidadeUnidade } from 'app/shared/model/especialidade-unidade.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEspecialidadeUnidadeState {
  fieldsBase: IEspecialidadeUnidadeBaseState;
}

export interface IEspecialidadeUnidadeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EspecialidadeUnidadeDetail extends React.Component<IEspecialidadeUnidadeDetailProps, IEspecialidadeUnidadeState> {
  constructor(props: Readonly<IEspecialidadeUnidadeDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getEspecialidadeUnidadeState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { especialidadeUnidadeEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Especialidade Unidades</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Especialidade Unidades</li>
          <li className="breadcrumb-item active">Especialidade Unidades details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.especialidadeUnidade.detail.title">EspecialidadeUnidade</Translate>[
                  <b>{especialidadeUnidadeEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="valorBaixaUrg">
                            <Translate contentKey="generadorApp.especialidadeUnidade.valorBaixaUrg">Valor Baixa Urg</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{especialidadeUnidadeEntity.valorBaixaUrg}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="valorAltaUrg">
                            <Translate contentKey="generadorApp.especialidadeUnidade.valorAltaUrg">Valor Alta Urg</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{especialidadeUnidadeEntity.valorAltaUrg}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="valorPagar">
                            <Translate contentKey="generadorApp.especialidadeUnidade.valorPagar">Valor Pagar</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{especialidadeUnidadeEntity.valorPagar}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="publicar">
                            <Translate contentKey="generadorApp.especialidadeUnidade.publicar">Publicar</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{especialidadeUnidadeEntity.publicar}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="comentarioPreco">
                            <Translate contentKey="generadorApp.especialidadeUnidade.comentarioPreco">Comentario Preco</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{especialidadeUnidadeEntity.comentarioPreco}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.especialidadeUnidade.unidade">Unidade</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{especialidadeUnidadeEntity.unidade ? especialidadeUnidadeEntity.unidade.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/especialidade-unidade" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/especialidade-unidade/${especialidadeUnidadeEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ especialidadeUnidade }: IRootState) => ({
  especialidadeUnidadeEntity: especialidadeUnidade.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EspecialidadeUnidadeDetail);
