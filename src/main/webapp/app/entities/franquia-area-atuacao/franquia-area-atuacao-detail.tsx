import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './franquia-area-atuacao.reducer';
import { IFranquiaAreaAtuacao } from 'app/shared/model/franquia-area-atuacao.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFranquiaAreaAtuacaoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FranquiaAreaAtuacaoDetail extends React.Component<IFranquiaAreaAtuacaoDetailProps> {
  constructor(props: Readonly<IFranquiaAreaAtuacaoDetailProps>) {
    super(props);
    this.state = {
      ...this.state
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { franquiaAreaAtuacaoEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Franquia Area Atuacaos</li>
          <li className="breadcrumb-item active">Franquia Area Atuacaos details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Franquia Area Atuacaos</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.franquiaAreaAtuacao.detail.title">FranquiaAreaAtuacao</Translate>[
                  <b>{franquiaAreaAtuacaoEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cepIni">
                            <Translate contentKey="generadorApp.franquiaAreaAtuacao.cepIni">Cep Ini</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaAreaAtuacaoEntity.cepIni}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cepFim">
                            <Translate contentKey="generadorApp.franquiaAreaAtuacao.cepFim">Cep Fim</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaAreaAtuacaoEntity.cepFim}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativo">
                            <Translate contentKey="generadorApp.franquiaAreaAtuacao.ativo">Ativo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaAreaAtuacaoEntity.ativo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="dataPost">
                            <Translate contentKey="generadorApp.franquiaAreaAtuacao.dataPost">Data Post</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={franquiaAreaAtuacaoEntity.dataPost} type="date" format={APP_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.franquiaAreaAtuacao.idFranquia">Id Franquia</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{franquiaAreaAtuacaoEntity.idFranquia ? franquiaAreaAtuacaoEntity.idFranquia.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/franquia-area-atuacao" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/franquia-area-atuacao/${franquiaAreaAtuacaoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ franquiaAreaAtuacao }: IRootState) => ({
  franquiaAreaAtuacaoEntity: franquiaAreaAtuacao.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FranquiaAreaAtuacaoDetail);
