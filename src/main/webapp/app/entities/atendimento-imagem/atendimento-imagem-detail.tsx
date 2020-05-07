import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IAtendimentoImagemBaseState, getAtendimentoImagemState } from './atendimento-imagem.reducer';
import { IAtendimentoImagem } from 'app/shared/model/atendimento-imagem.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAtendimentoImagemState {
  fieldsBase: IAtendimentoImagemBaseState;
}

export interface IAtendimentoImagemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AtendimentoImagemDetail extends React.Component<IAtendimentoImagemDetailProps, IAtendimentoImagemState> {
  constructor(props: Readonly<IAtendimentoImagemDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getAtendimentoImagemState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { atendimentoImagemEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Atendimento Imagems</li>
          <li className="breadcrumb-item active">Atendimento Imagems details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Atendimento Imagems</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.atendimentoImagem.detail.title">AtendimentoImagem</Translate>[
                  <b>{atendimentoImagemEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="atendimentoId">
                            <Translate contentKey="generadorApp.atendimentoImagem.atendimentoId">Atendimento Id</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoImagemEntity.atendimentoId}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="imagem">
                            <Translate contentKey="generadorApp.atendimentoImagem.imagem">Imagem</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{atendimentoImagemEntity.imagem}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="criadoEm">
                            <Translate contentKey="generadorApp.atendimentoImagem.criadoEm">Criado Em</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={atendimentoImagemEntity.criadoEm} type="date" format={APP_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/atendimento-imagem" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/atendimento-imagem/${atendimentoImagemEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ atendimentoImagem }: IRootState) => ({
  atendimentoImagemEntity: atendimentoImagem.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AtendimentoImagemDetail);
