import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, ICategoriaBaseState, getCategoriaState } from './categoria.reducer';
import { ICategoria } from 'app/shared/model/categoria.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICategoriaState {
  fieldsBase: ICategoriaBaseState;
}

export interface ICategoriaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CategoriaDetail extends React.Component<ICategoriaDetailProps, ICategoriaState> {
  constructor(props: Readonly<ICategoriaDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getCategoriaState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { categoriaEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Categorias</li>
          <li className="breadcrumb-item active">Categorias details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Categorias</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.categoria.detail.title">Categoria</Translate>[<b>{categoriaEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="categoria">
                            <Translate contentKey="generadorApp.categoria.categoria">Categoria</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{categoriaEntity.categoria}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="styleCategoria">
                            <Translate contentKey="generadorApp.categoria.styleCategoria">Style Categoria</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{categoriaEntity.styleCategoria}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="icon">
                            <Translate contentKey="generadorApp.categoria.icon">Icon</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{categoriaEntity.icon}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="publicar">
                            <Translate contentKey="generadorApp.categoria.publicar">Publicar</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{categoriaEntity.publicar}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ordem">
                            <Translate contentKey="generadorApp.categoria.ordem">Ordem</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{categoriaEntity.ordem}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="publicarSite">
                            <Translate contentKey="generadorApp.categoria.publicarSite">Publicar Site</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{categoriaEntity.publicarSite}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.categoria.unidade">Unidade</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          {categoriaEntity.unidades
                            ? categoriaEntity.unidades.map((val, i) => (
                                <span key={val.id}>
                                  <a>{val.razaoSocial}</a>
                                  {i === categoriaEntity.unidades.length - 1 ? '' : ', '}
                                </span>
                              ))
                            : null}
                        </dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/categoria" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/categoria/${categoriaEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ categoria }: IRootState) => ({
  categoriaEntity: categoria.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CategoriaDetail);
