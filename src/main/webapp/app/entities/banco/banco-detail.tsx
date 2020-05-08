import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IBancoBaseState, getBancoState } from './banco.reducer';
import { IBanco } from 'app/shared/model/banco.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBancoState {
  fieldsBase: IBancoBaseState;
}

export interface IBancoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class BancoDetail extends React.Component<IBancoDetailProps, IBancoState> {
  constructor(props: Readonly<IBancoDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getBancoState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { bancoEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Bancos</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Bancos</li>
          <li className="breadcrumb-item active">Bancos details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.banco.detail.title">Banco</Translate>[<b>{bancoEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="codBanco">
                            <Translate contentKey="generadorApp.banco.codBanco">Cod Banco</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{bancoEntity.codBanco}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="banco">
                            <Translate contentKey="generadorApp.banco.banco">Banco</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{bancoEntity.banco}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/banco" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/banco/${bancoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ banco }: IRootState) => ({
  bancoEntity: banco.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BancoDetail);
