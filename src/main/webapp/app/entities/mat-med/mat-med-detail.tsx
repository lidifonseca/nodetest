import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './mat-med.reducer';
import { IMatMed } from 'app/shared/model/mat-med.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMatMedDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MatMedDetail extends React.Component<IMatMedDetailProps> {
  constructor(props: Readonly<IMatMedDetailProps>) {
    super(props);
    this.state = {
      ...this.state
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { matMedEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Mat Meds</li>
          <li className="breadcrumb-item active">Mat Meds details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Mat Meds</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.matMed.detail.title">MatMed</Translate>[<b>{matMedEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="nome">
                            <Translate contentKey="generadorApp.matMed.nome">Nome</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{matMedEntity.nome}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idTipoMatMed">
                            <Translate contentKey="generadorApp.matMed.idTipoMatMed">Id Tipo Mat Med</Translate>
                          </span>
                          <UncontrolledTooltip target="idTipoMatMed">
                            <Translate contentKey="generadorApp.matMed.help.idTipoMatMed" />
                          </UncontrolledTooltip>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{matMedEntity.idTipoMatMed}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="valor">
                            <Translate contentKey="generadorApp.matMed.valor">Valor</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{matMedEntity.valor}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativo">
                            <Translate contentKey="generadorApp.matMed.ativo">Ativo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{matMedEntity.ativo}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/mat-med" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/mat-med/${matMedEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ matMed }: IRootState) => ({
  matMedEntity: matMed.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MatMedDetail);
