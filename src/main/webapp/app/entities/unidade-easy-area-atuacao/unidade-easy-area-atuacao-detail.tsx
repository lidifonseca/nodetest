import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IUnidadeEasyAreaAtuacaoBaseState, getUnidadeEasyAreaAtuacaoState } from './unidade-easy-area-atuacao.reducer';
import { IUnidadeEasyAreaAtuacao } from 'app/shared/model/unidade-easy-area-atuacao.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUnidadeEasyAreaAtuacaoState {
  fieldsBase: IUnidadeEasyAreaAtuacaoBaseState;
}

export interface IUnidadeEasyAreaAtuacaoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class UnidadeEasyAreaAtuacaoDetail extends React.Component<IUnidadeEasyAreaAtuacaoDetailProps, IUnidadeEasyAreaAtuacaoState> {
  constructor(props: Readonly<IUnidadeEasyAreaAtuacaoDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getUnidadeEasyAreaAtuacaoState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { unidadeEasyAreaAtuacaoEntity } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header ml-3">Unidade Easy Area Atuacaos</span>
        </h2>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Unidade Easy Area Atuacaos</li>
          <li className="breadcrumb-item active">Unidade Easy Area Atuacaos details</li>
        </ol>
        <Panel>
          <PanelHeader></PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.unidadeEasyAreaAtuacao.detail.title">UnidadeEasyAreaAtuacao</Translate>[
                  <b>{unidadeEasyAreaAtuacaoEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cepInicial">
                            <Translate contentKey="generadorApp.unidadeEasyAreaAtuacao.cepInicial">Cep Inicial</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{unidadeEasyAreaAtuacaoEntity.cepInicial}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cepFinal">
                            <Translate contentKey="generadorApp.unidadeEasyAreaAtuacao.cepFinal">Cep Final</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{unidadeEasyAreaAtuacaoEntity.cepFinal}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.unidadeEasyAreaAtuacao.unidade">Unidade</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{unidadeEasyAreaAtuacaoEntity.unidade ? unidadeEasyAreaAtuacaoEntity.unidade.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/unidade-easy-area-atuacao" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/unidade-easy-area-atuacao/${unidadeEasyAreaAtuacaoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ unidadeEasyAreaAtuacao }: IRootState) => ({
  unidadeEasyAreaAtuacaoEntity: unidadeEasyAreaAtuacao.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UnidadeEasyAreaAtuacaoDetail);
