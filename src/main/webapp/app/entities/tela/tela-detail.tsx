import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, ITelaBaseState, getTelaState } from './tela.reducer';
import { ITela } from 'app/shared/model/tela.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITelaState {
  fieldsBase: ITelaBaseState;
}

export interface ITelaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TelaDetail extends React.Component<ITelaDetailProps, ITelaState> {
  constructor(props: Readonly<ITelaDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getTelaState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { telaEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Telas</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Telas</li>
          <li className="breadcrumb-item active">Telas details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.tela.detail.title">Tela</Translate>[<b>{telaEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="tela">
                            <Translate contentKey="generadorApp.tela.tela">Tela</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{telaEntity.tela}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/tela" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/tela/${telaEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ tela }: IRootState) => ({
  telaEntity: tela.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TelaDetail);
