import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IOcorrenciaProntuarioBaseState, getOcorrenciaProntuarioState } from './ocorrencia-prontuario.reducer';
import { IOcorrenciaProntuario } from 'app/shared/model/ocorrencia-prontuario.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOcorrenciaProntuarioState {
  fieldsBase: IOcorrenciaProntuarioBaseState;
}

export interface IOcorrenciaProntuarioDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class OcorrenciaProntuarioDetail extends React.Component<IOcorrenciaProntuarioDetailProps, IOcorrenciaProntuarioState> {
  constructor(props: Readonly<IOcorrenciaProntuarioDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getOcorrenciaProntuarioState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { ocorrenciaProntuarioEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Ocorrencia Prontuarios</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Ocorrencia Prontuarios</li>
          <li className="breadcrumb-item active">Ocorrencia Prontuarios details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.ocorrenciaProntuario.detail.title">OcorrenciaProntuario</Translate>[
                  <b>{ocorrenciaProntuarioEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="nome">
                            <Translate contentKey="generadorApp.ocorrenciaProntuario.nome">Nome</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{ocorrenciaProntuarioEntity.nome}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativo">
                            <Translate contentKey="generadorApp.ocorrenciaProntuario.ativo">Ativo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{ocorrenciaProntuarioEntity.ativo}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/ocorrencia-prontuario" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/ocorrencia-prontuario/${ocorrenciaProntuarioEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ ocorrenciaProntuario }: IRootState) => ({
  ocorrenciaProntuarioEntity: ocorrenciaProntuario.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OcorrenciaProntuarioDetail);
