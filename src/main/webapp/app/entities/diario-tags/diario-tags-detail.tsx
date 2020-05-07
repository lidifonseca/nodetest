import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IDiarioTagsBaseState, getDiarioTagsState } from './diario-tags.reducer';
import { IDiarioTags } from 'app/shared/model/diario-tags.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDiarioTagsState {
  fieldsBase: IDiarioTagsBaseState;
}

export interface IDiarioTagsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DiarioTagsDetail extends React.Component<IDiarioTagsDetailProps, IDiarioTagsState> {
  constructor(props: Readonly<IDiarioTagsDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getDiarioTagsState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { diarioTagsEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Diario Tags</li>
          <li className="breadcrumb-item active">Diario Tags details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Diario Tags</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.diarioTags.detail.title">DiarioTags</Translate>[<b>{diarioTagsEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="nome">
                            <Translate contentKey="generadorApp.diarioTags.nome">Nome</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{diarioTagsEntity.nome}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idPai">
                            <Translate contentKey="generadorApp.diarioTags.idPai">Id Pai</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{diarioTagsEntity.idPai}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="nomeId">
                            <Translate contentKey="generadorApp.diarioTags.nomeId">Nome Id</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{diarioTagsEntity.nomeId}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativo">
                            <Translate contentKey="generadorApp.diarioTags.ativo">Ativo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{diarioTagsEntity.ativo}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/diario-tags" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/diario-tags/${diarioTagsEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ diarioTags }: IRootState) => ({
  diarioTagsEntity: diarioTags.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DiarioTagsDetail);
