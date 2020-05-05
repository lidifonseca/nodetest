import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './api-return.reducer';
import { IApiReturn } from 'app/shared/model/api-return.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IApiReturnDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ApiReturnDetail extends React.Component<IApiReturnDetailProps> {
  constructor(props: Readonly<IApiReturnDetailProps>) {
    super(props);
    this.state = {
      ...this.state
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { apiReturnEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Api Returns</li>
          <li className="breadcrumb-item active">Api Returns details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Api Returns</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.apiReturn.detail.title">ApiReturn</Translate>[<b>{apiReturnEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idApiName">
                            <Translate contentKey="generadorApp.apiReturn.idApiName">Id Api Name</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{apiReturnEntity.idApiName}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="apiReturn">
                            <Translate contentKey="generadorApp.apiReturn.apiReturn">Api Return</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{apiReturnEntity.apiReturn}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="apiType">
                            <Translate contentKey="generadorApp.apiReturn.apiType">Api Type</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{apiReturnEntity.apiType}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="obs">
                            <Translate contentKey="generadorApp.apiReturn.obs">Obs</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{apiReturnEntity.obs}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativo">
                            <Translate contentKey="generadorApp.apiReturn.ativo">Ativo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{apiReturnEntity.ativo}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/api-return" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/api-return/${apiReturnEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ apiReturn }: IRootState) => ({
  apiReturnEntity: apiReturn.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApiReturnDetail);