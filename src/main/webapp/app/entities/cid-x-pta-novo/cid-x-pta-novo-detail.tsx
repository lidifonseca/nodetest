import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './cid-x-pta-novo.reducer';
import { ICidXPtaNovo } from 'app/shared/model/cid-x-pta-novo.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICidXPtaNovoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CidXPtaNovoDetail extends React.Component<ICidXPtaNovoDetailProps> {
  constructor(props: Readonly<ICidXPtaNovoDetailProps>) {
    super(props);
    this.state = {
      ...this.state
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { cidXPtaNovoEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Cid X Pta Novos</li>
          <li className="breadcrumb-item active">Cid X Pta Novos details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Cid X Pta Novos</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.cidXPtaNovo.detail.title">CidXPtaNovo</Translate>[<b>{cidXPtaNovoEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="complexidade">
                            <Translate contentKey="generadorApp.cidXPtaNovo.complexidade">Complexidade</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cidXPtaNovoEntity.complexidade}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="versao">
                            <Translate contentKey="generadorApp.cidXPtaNovo.versao">Versao</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cidXPtaNovoEntity.versao}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="score">
                            <Translate contentKey="generadorApp.cidXPtaNovo.score">Score</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cidXPtaNovoEntity.score}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="titulo">
                            <Translate contentKey="generadorApp.cidXPtaNovo.titulo">Titulo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cidXPtaNovoEntity.titulo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.cidXPtaNovo.cidId">Cid Id</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cidXPtaNovoEntity.cidId ? cidXPtaNovoEntity.cidId.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.cidXPtaNovo.cidXPtaNovoId">Cid X Pta Novo Id</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cidXPtaNovoEntity.cidXPtaNovoId ? cidXPtaNovoEntity.cidXPtaNovoId.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/cid-x-pta-novo" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/cid-x-pta-novo/${cidXPtaNovoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ cidXPtaNovo }: IRootState) => ({
  cidXPtaNovoEntity: cidXPtaNovo.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CidXPtaNovoDetail);
