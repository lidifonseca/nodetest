import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './tipo-prontuario.reducer';
import { ITipoProntuario } from 'app/shared/model/tipo-prontuario.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITipoProntuarioDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TipoProntuarioDetail extends React.Component<ITipoProntuarioDetailProps> {
  constructor(props: Readonly<ITipoProntuarioDetailProps>) {
    super(props);
    this.state = {
      ...this.state
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { tipoProntuarioEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Tipo Prontuarios</li>
          <li className="breadcrumb-item active">Tipo Prontuarios details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Tipo Prontuarios</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.tipoProntuario.detail.title">TipoProntuario</Translate>[
                  <b>{tipoProntuarioEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="prontuario">
                            <Translate contentKey="generadorApp.tipoProntuario.prontuario">Prontuario</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{tipoProntuarioEntity.prontuario}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativo">
                            <Translate contentKey="generadorApp.tipoProntuario.ativo">Ativo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{tipoProntuarioEntity.ativo}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/tipo-prontuario" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/tipo-prontuario/${tipoProntuarioEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ tipoProntuario }: IRootState) => ({
  tipoProntuarioEntity: tipoProntuario.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TipoProntuarioDetail);