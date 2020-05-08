import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction, openFile } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, ICategoriaContratoBaseState, getCategoriaContratoState } from './categoria-contrato.reducer';
import { ICategoriaContrato } from 'app/shared/model/categoria-contrato.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICategoriaContratoState {
  fieldsBase: ICategoriaContratoBaseState;
}

export interface ICategoriaContratoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CategoriaContratoDetail extends React.Component<ICategoriaContratoDetailProps, ICategoriaContratoState> {
  constructor(props: Readonly<ICategoriaContratoDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getCategoriaContratoState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { categoriaContratoEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Categoria Contratoes</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Categoria Contratoes</li>
          <li className="breadcrumb-item active">Categoria Contratoes details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.categoriaContrato.detail.title">CategoriaContrato</Translate>[
                  <b>{categoriaContratoEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="contrato">
                            <Translate contentKey="generadorApp.categoriaContrato.contrato">Contrato</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          {categoriaContratoEntity.contrato ? (
                            <div>
                              <a rel="noopener noreferrer" target={'_blank'} href={`${categoriaContratoEntity.contrato}`}>
                                <Translate contentKey="entity.action.open">Open</Translate>&nbsp;
                              </a>
                              <a rel="noopener noreferrer" target={'_blank'} href={`${categoriaContratoEntity.contrato}`}>
                                {categoriaContratoEntity.contratoContentType.includes('image/') ? (
                                  <img src={`${categoriaContratoEntity.contrato}`} style={{ maxHeight: '30px' }} />
                                ) : (
                                  <Translate contentKey="entity.action.open">Open</Translate>
                                )}
                              </a>
                            </div>
                          ) : null}
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativo">
                            <Translate contentKey="generadorApp.categoriaContrato.ativo">Ativo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{categoriaContratoEntity.ativo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.categoriaContrato.categoria">Categoria</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{categoriaContratoEntity.categoria ? categoriaContratoEntity.categoria.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/categoria-contrato" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/categoria-contrato/${categoriaContratoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ categoriaContrato }: IRootState) => ({
  categoriaContratoEntity: categoriaContrato.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CategoriaContratoDetail);
