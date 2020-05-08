import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, ITipoEspecialidadeBaseState, getTipoEspecialidadeState } from './tipo-especialidade.reducer';
import { ITipoEspecialidade } from 'app/shared/model/tipo-especialidade.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITipoEspecialidadeState {
  fieldsBase: ITipoEspecialidadeBaseState;
}

export interface ITipoEspecialidadeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TipoEspecialidadeDetail extends React.Component<ITipoEspecialidadeDetailProps, ITipoEspecialidadeState> {
  constructor(props: Readonly<ITipoEspecialidadeDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getTipoEspecialidadeState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { tipoEspecialidadeEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Tipo Especialidades</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Tipo Especialidades</li>
          <li className="breadcrumb-item active">Tipo Especialidades details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.tipoEspecialidade.detail.title">TipoEspecialidade</Translate>[
                  <b>{tipoEspecialidadeEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="tipoEspecialidade">
                            <Translate contentKey="generadorApp.tipoEspecialidade.tipoEspecialidade">Tipo Especialidade</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{tipoEspecialidadeEntity.tipoEspecialidade}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/tipo-especialidade" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/tipo-especialidade/${tipoEspecialidadeEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ tipoEspecialidade }: IRootState) => ({
  tipoEspecialidadeEntity: tipoEspecialidade.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TipoEspecialidadeDetail);
