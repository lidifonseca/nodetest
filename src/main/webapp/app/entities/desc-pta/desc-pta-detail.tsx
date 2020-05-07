import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IDescPtaBaseState, getDescPtaState } from './desc-pta.reducer';
import { IDescPta } from 'app/shared/model/desc-pta.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDescPtaState {
  fieldsBase: IDescPtaBaseState;
}

export interface IDescPtaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class DescPtaDetail extends React.Component<IDescPtaDetailProps, IDescPtaState> {
  constructor(props: Readonly<IDescPtaDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getDescPtaState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { descPtaEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Desc Ptas</li>
          <li className="breadcrumb-item active">Desc Ptas details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Desc Ptas</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.descPta.detail.title">DescPta</Translate>[<b>{descPtaEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="nome">
                            <Translate contentKey="generadorApp.descPta.nome">Nome</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{descPtaEntity.nome}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="resultadoEsperado">
                            <Translate contentKey="generadorApp.descPta.resultadoEsperado">Resultado Esperado</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{descPtaEntity.resultadoEsperado}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativo">
                            <Translate contentKey="generadorApp.descPta.ativo">Ativo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{descPtaEntity.ativo}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/desc-pta" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/desc-pta/${descPtaEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ descPta }: IRootState) => ({
  descPtaEntity: descPta.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DescPtaDetail);
