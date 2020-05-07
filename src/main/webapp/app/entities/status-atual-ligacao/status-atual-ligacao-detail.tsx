import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IStatusAtualLigacaoBaseState, getStatusAtualLigacaoState } from './status-atual-ligacao.reducer';
import { IStatusAtualLigacao } from 'app/shared/model/status-atual-ligacao.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStatusAtualLigacaoState {
  fieldsBase: IStatusAtualLigacaoBaseState;
}

export interface IStatusAtualLigacaoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class StatusAtualLigacaoDetail extends React.Component<IStatusAtualLigacaoDetailProps, IStatusAtualLigacaoState> {
  constructor(props: Readonly<IStatusAtualLigacaoDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getStatusAtualLigacaoState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { statusAtualLigacaoEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Status Atual Ligacaos</li>
          <li className="breadcrumb-item active">Status Atual Ligacaos details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Status Atual Ligacaos</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.statusAtualLigacao.detail.title">StatusAtualLigacao</Translate>[
                  <b>{statusAtualLigacaoEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="statusAtualLigacao">
                            <Translate contentKey="generadorApp.statusAtualLigacao.statusAtualLigacao">Status Atual Ligacao</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{statusAtualLigacaoEntity.statusAtualLigacao}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="styleLabel">
                            <Translate contentKey="generadorApp.statusAtualLigacao.styleLabel">Style Label</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{statusAtualLigacaoEntity.styleLabel}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/status-atual-ligacao" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/status-atual-ligacao/${statusAtualLigacaoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ statusAtualLigacao }: IRootState) => ({
  statusAtualLigacaoEntity: statusAtualLigacao.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StatusAtualLigacaoDetail);
