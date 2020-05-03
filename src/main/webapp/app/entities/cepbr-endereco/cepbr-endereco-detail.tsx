import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './cepbr-endereco.reducer';
import { ICepbrEndereco } from 'app/shared/model/cepbr-endereco.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICepbrEnderecoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CepbrEnderecoDetail extends React.Component<ICepbrEnderecoDetailProps> {
  constructor(props: Readonly<ICepbrEnderecoDetailProps>) {
    super(props);
    this.state = {
      ...this.state
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { cepbrEnderecoEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Cepbr Enderecos</li>
          <li className="breadcrumb-item active">Cepbr Enderecos details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Cepbr Enderecos</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.cepbrEndereco.detail.title">CepbrEndereco</Translate>[<b>{cepbrEnderecoEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="cep">
                            <Translate contentKey="generadorApp.cepbrEndereco.cep">Cep</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cepbrEnderecoEntity.cep}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="logradouro">
                            <Translate contentKey="generadorApp.cepbrEndereco.logradouro">Logradouro</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cepbrEnderecoEntity.logradouro}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="tipoLogradouro">
                            <Translate contentKey="generadorApp.cepbrEndereco.tipoLogradouro">Tipo Logradouro</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cepbrEnderecoEntity.tipoLogradouro}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="complemento">
                            <Translate contentKey="generadorApp.cepbrEndereco.complemento">Complemento</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cepbrEnderecoEntity.complemento}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="local">
                            <Translate contentKey="generadorApp.cepbrEndereco.local">Local</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cepbrEnderecoEntity.local}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.cepbrEndereco.idCidade">Id Cidade</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cepbrEnderecoEntity.idCidade ? cepbrEnderecoEntity.idCidade.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.cepbrEndereco.idBairro">Id Bairro</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{cepbrEnderecoEntity.idBairro ? cepbrEnderecoEntity.idBairro.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/cepbr-endereco" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/cepbr-endereco/${cepbrEnderecoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ cepbrEndereco }: IRootState) => ({
  cepbrEnderecoEntity: cepbrEndereco.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CepbrEnderecoDetail);
