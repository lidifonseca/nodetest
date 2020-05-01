import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './apenso.reducer';
import { IApenso } from 'app/shared/model/apenso.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

export interface IApensoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
  activeTab: number;
}

export class ApensoDetail extends React.Component<IApensoDetailProps> {
  constructor(props: Readonly<IApensoDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      activeTab: 0
    };
  }

  toggleTab(tab: number) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { apensoEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Apensos</li>
          <li className="breadcrumb-item active">Apensos details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Apensos</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.apenso.detail.title">Apenso</Translate> [<b>{apensoEntity.id}</b>]
                </h2>
                <dl className="jh-entity-details">
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === 0 })}
                        onClick={() => {
                          this.toggleTab(0);
                        }}
                      >
                        <span className="d-sm-none"> segundo</span>
                        <span className="d-sm-block d-none">segundo</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === 1 })}
                        onClick={() => {
                          this.toggleTab(1);
                        }}
                      >
                        <span className="d-sm-none">Default</span>
                        <span className="d-sm-block d-none">Default</span>
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId={0}>
                      <dt>
                        <span id="apensamento">
                          <Translate contentKey="generadorApp.apenso.apensamento">Apensamento</Translate>
                        </span>
                      </dt>
                      <dd>
                        <TextFormat value={apensoEntity.apensamento} type="date" format={APP_LOCAL_DATE_FORMAT} />
                      </dd>

                      <dt>
                        <Translate contentKey="generadorApp.apenso.processo">Processo</Translate>
                      </dt>
                      <dd>{apensoEntity.processoId ? apensoEntity.processoId : ''}</dd>
                    </TabPane>
                    <TabPane tabId={1}>
                      <dt>
                        <span id="numero">
                          <Translate contentKey="generadorApp.apenso.numero">Numero</Translate>
                        </span>
                        <UncontrolledTooltip target="numero">
                          <Translate contentKey="generadorApp.apenso.help.numero" />
                        </UncontrolledTooltip>
                      </dt>
                      <dd>{apensoEntity.numero}</dd>

                      <dt>
                        <span id="clase">
                          <Translate contentKey="generadorApp.apenso.clase">Clase</Translate>
                        </span>
                        <UncontrolledTooltip target="clase">
                          <Translate contentKey="generadorApp.apenso.help.clase" />
                        </UncontrolledTooltip>
                      </dt>
                      <dd>{apensoEntity.clase}</dd>

                      <dt>
                        <span id="motivo">
                          <Translate contentKey="generadorApp.apenso.motivo">Motivo</Translate>
                        </span>
                      </dt>
                      <dd>{apensoEntity.motivo}</dd>
                    </TabPane>
                  </TabContent>
                </dl>
                <Button tag={Link} to="/apenso" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/apenso/${apensoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ apenso }: IRootState) => ({
  apensoEntity: apenso.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApensoDetail);
