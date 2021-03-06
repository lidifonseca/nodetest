import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IApiInputBaseState, getApiInputState } from './api-input.reducer';
import { IApiInput } from 'app/shared/model/api-input.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IApiInputState {
  fieldsBase: IApiInputBaseState;
}

export interface IApiInputDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ApiInputDetail extends React.Component<IApiInputDetailProps, IApiInputState> {
  constructor(props: Readonly<IApiInputDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getApiInputState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { apiInputEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Api Inputs</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Api Inputs</li>
          <li className="breadcrumb-item active">Api Inputs details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.apiInput.detail.title">ApiInput</Translate>[<b>{apiInputEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idApiName">
                            <Translate contentKey="generadorApp.apiInput.idApiName">Id Api Name</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{apiInputEntity.idApiName}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="apiInput">
                            <Translate contentKey="generadorApp.apiInput.apiInput">Api Input</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{apiInputEntity.apiInput}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="apiType">
                            <Translate contentKey="generadorApp.apiInput.apiType">Api Type</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{apiInputEntity.apiType}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="obs">
                            <Translate contentKey="generadorApp.apiInput.obs">Obs</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{apiInputEntity.obs}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativo">
                            <Translate contentKey="generadorApp.apiInput.ativo">Ativo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{apiInputEntity.ativo ? 'true' : 'false'}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/api-input" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/api-input/${apiInputEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ apiInput }: IRootState) => ({
  apiInputEntity: apiInput.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApiInputDetail);
