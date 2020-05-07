import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IPadItemCepRecusadoBaseState, getPadItemCepRecusadoState } from './pad-item-cep-recusado.reducer';
import { IPadItemCepRecusado } from 'app/shared/model/pad-item-cep-recusado.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPadItemCepRecusadoState {
  fieldsBase: IPadItemCepRecusadoBaseState;
}

export interface IPadItemCepRecusadoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PadItemCepRecusadoDetail extends React.Component<IPadItemCepRecusadoDetailProps, IPadItemCepRecusadoState> {
  constructor(props: Readonly<IPadItemCepRecusadoDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getPadItemCepRecusadoState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { padItemCepRecusadoEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Item Cep Recusados</li>
          <li className="breadcrumb-item active">Pad Item Cep Recusados details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Pad Item Cep Recusados</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.padItemCepRecusado.detail.title">PadItemCepRecusado</Translate>[
                  <b>{padItemCepRecusadoEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cep">
                            <Translate contentKey="generadorApp.padItemCepRecusado.cep">Cep</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemCepRecusadoEntity.cep}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/pad-item-cep-recusado" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/pad-item-cep-recusado/${padItemCepRecusadoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ padItemCepRecusado }: IRootState) => ({
  padItemCepRecusadoEntity: padItemCepRecusado.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadItemCepRecusadoDetail);
