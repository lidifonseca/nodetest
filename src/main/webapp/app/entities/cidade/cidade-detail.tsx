import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, ICidadeBaseState, getCidadeState } from './cidade.reducer';
import { ICidade } from 'app/shared/model/cidade.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICidadeState {
  fieldsBase: ICidadeBaseState;
}

export interface ICidadeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CidadeDetail extends React.Component<ICidadeDetailProps, ICidadeState> {
  constructor(props: Readonly<ICidadeDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getCidadeState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { cidadeEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Cidades</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Cidades</li>
          <li className="breadcrumb-item active">Cidades details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.cidade.detail.title">Cidade</Translate>[<b>{cidadeEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="descrCidade">
                            <Translate contentKey="generadorApp.cidade.descrCidade">Descr Cidade</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cidadeEntity.descrCidade}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.cidade.uf">Uf</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cidadeEntity.uf ? cidadeEntity.uf.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/cidade" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/cidade/${cidadeEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ cidade }: IRootState) => ({
  cidadeEntity: cidade.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CidadeDetail);
