import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, ISegmentosPerguntasBaseState, getSegmentosPerguntasState } from './segmentos-perguntas.reducer';
import { ISegmentosPerguntas } from 'app/shared/model/segmentos-perguntas.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISegmentosPerguntasState {
  fieldsBase: ISegmentosPerguntasBaseState;
}

export interface ISegmentosPerguntasDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class SegmentosPerguntasDetail extends React.Component<ISegmentosPerguntasDetailProps, ISegmentosPerguntasState> {
  constructor(props: Readonly<ISegmentosPerguntasDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getSegmentosPerguntasState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { segmentosPerguntasEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Segmentos Perguntas</li>
          <li className="breadcrumb-item active">Segmentos Perguntas details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Segmentos Perguntas</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.segmentosPerguntas.detail.title">SegmentosPerguntas</Translate>[
                  <b>{segmentosPerguntasEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="segmento">
                            <Translate contentKey="generadorApp.segmentosPerguntas.segmento">Segmento</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{segmentosPerguntasEntity.segmento}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/segmentos-perguntas" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/segmentos-perguntas/${segmentosPerguntasEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ segmentosPerguntas }: IRootState) => ({
  segmentosPerguntasEntity: segmentosPerguntas.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SegmentosPerguntasDetail);
