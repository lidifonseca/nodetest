import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, ITermosUsoBaseState, getTermosUsoState } from './termos-uso.reducer';
import { ITermosUso } from 'app/shared/model/termos-uso.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITermosUsoState {
  fieldsBase: ITermosUsoBaseState;
}

export interface ITermosUsoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TermosUsoDetail extends React.Component<ITermosUsoDetailProps, ITermosUsoState> {
  constructor(props: Readonly<ITermosUsoDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getTermosUsoState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { termosUsoEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Termos Usos</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Termos Usos</li>
          <li className="breadcrumb-item active">Termos Usos details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.termosUso.detail.title">TermosUso</Translate>[<b>{termosUsoEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="termosUso">
                            <Translate contentKey="generadorApp.termosUso.termosUso">Termos Uso</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{termosUsoEntity.termosUso}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="tipo">
                            <Translate contentKey="generadorApp.termosUso.tipo">Tipo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{termosUsoEntity.tipo}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/termos-uso" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/termos-uso/${termosUsoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ termosUso }: IRootState) => ({
  termosUsoEntity: termosUso.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TermosUsoDetail);
