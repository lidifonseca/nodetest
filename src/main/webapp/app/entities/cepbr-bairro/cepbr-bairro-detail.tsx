import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, ICepbrBairroBaseState, getCepbrBairroState } from './cepbr-bairro.reducer';
import { ICepbrBairro } from 'app/shared/model/cepbr-bairro.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICepbrBairroState {
  fieldsBase: ICepbrBairroBaseState;
}

export interface ICepbrBairroDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CepbrBairroDetail extends React.Component<ICepbrBairroDetailProps, ICepbrBairroState> {
  constructor(props: Readonly<ICepbrBairroDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getCepbrBairroState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { cepbrBairroEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Cepbr Bairros</li>
          <li className="breadcrumb-item active">Cepbr Bairros details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Cepbr Bairros</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.cepbrBairro.detail.title">CepbrBairro</Translate>[<b>{cepbrBairroEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idBairro">
                            <Translate contentKey="generadorApp.cepbrBairro.idBairro">Id Bairro</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cepbrBairroEntity.idBairro}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="bairro">
                            <Translate contentKey="generadorApp.cepbrBairro.bairro">Bairro</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cepbrBairroEntity.bairro}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/cepbr-bairro" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/cepbr-bairro/${cepbrBairroEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ cepbrBairro }: IRootState) => ({
  cepbrBairroEntity: cepbrBairro.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CepbrBairroDetail);
