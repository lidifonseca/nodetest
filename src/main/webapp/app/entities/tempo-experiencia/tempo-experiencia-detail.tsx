import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, ITempoExperienciaBaseState, getTempoExperienciaState } from './tempo-experiencia.reducer';
import { ITempoExperiencia } from 'app/shared/model/tempo-experiencia.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITempoExperienciaState {
  fieldsBase: ITempoExperienciaBaseState;
}

export interface ITempoExperienciaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TempoExperienciaDetail extends React.Component<ITempoExperienciaDetailProps, ITempoExperienciaState> {
  constructor(props: Readonly<ITempoExperienciaDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getTempoExperienciaState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { tempoExperienciaEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Tempo Experiencias</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Tempo Experiencias</li>
          <li className="breadcrumb-item active">Tempo Experiencias details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.tempoExperiencia.detail.title">TempoExperiencia</Translate>[
                  <b>{tempoExperienciaEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="tempoExperiencia">
                            <Translate contentKey="generadorApp.tempoExperiencia.tempoExperiencia">Tempo Experiencia</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{tempoExperienciaEntity.tempoExperiencia}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/tempo-experiencia" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/tempo-experiencia/${tempoExperienciaEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ tempoExperiencia }: IRootState) => ({
  tempoExperienciaEntity: tempoExperiencia.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TempoExperienciaDetail);
