import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IAtendimentoCepRecusadoBaseState, getAtendimentoCepRecusadoState } from './atendimento-cep-recusado.reducer';
import { IAtendimentoCepRecusado } from 'app/shared/model/atendimento-cep-recusado.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAtendimentoCepRecusadoState {
  fieldsBase: IAtendimentoCepRecusadoBaseState;
}

export interface IAtendimentoCepRecusadoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AtendimentoCepRecusadoDetail extends React.Component<IAtendimentoCepRecusadoDetailProps, IAtendimentoCepRecusadoState> {
  constructor(props: Readonly<IAtendimentoCepRecusadoDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getAtendimentoCepRecusadoState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { atendimentoCepRecusadoEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Atendimento Cep Recusados</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Atendimento Cep Recusados</li>
          <li className="breadcrumb-item active">Atendimento Cep Recusados details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.atendimentoCepRecusado.detail.title">AtendimentoCepRecusado</Translate>[
                  <b>{atendimentoCepRecusadoEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cep">
                            <Translate contentKey="generadorApp.atendimentoCepRecusado.cep">Cep</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoCepRecusadoEntity.cep}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.atendimentoCepRecusado.padItem">Pad Item</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoCepRecusadoEntity.padItem ? atendimentoCepRecusadoEntity.padItem.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/atendimento-cep-recusado" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/atendimento-cep-recusado/${atendimentoCepRecusadoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ atendimentoCepRecusado }: IRootState) => ({
  atendimentoCepRecusadoEntity: atendimentoCepRecusado.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AtendimentoCepRecusadoDetail);
