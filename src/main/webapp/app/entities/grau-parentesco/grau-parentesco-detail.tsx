import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IGrauParentescoBaseState, getGrauParentescoState } from './grau-parentesco.reducer';
import { IGrauParentesco } from 'app/shared/model/grau-parentesco.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGrauParentescoState {
  fieldsBase: IGrauParentescoBaseState;
}

export interface IGrauParentescoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class GrauParentescoDetail extends React.Component<IGrauParentescoDetailProps, IGrauParentescoState> {
  constructor(props: Readonly<IGrauParentescoDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getGrauParentescoState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { grauParentescoEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Grau Parentescos</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Grau Parentescos</li>
          <li className="breadcrumb-item active">Grau Parentescos details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.grauParentesco.detail.title">GrauParentesco</Translate>[
                  <b>{grauParentescoEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="grauParentesco">
                            <Translate contentKey="generadorApp.grauParentesco.grauParentesco">Grau Parentesco</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{grauParentescoEntity.grauParentesco}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/grau-parentesco" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/grau-parentesco/${grauParentescoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ grauParentesco }: IRootState) => ({
  grauParentescoEntity: grauParentesco.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GrauParentescoDetail);
