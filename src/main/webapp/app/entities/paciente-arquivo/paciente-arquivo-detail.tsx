import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IPacienteArquivoBaseState, getPacienteArquivoState } from './paciente-arquivo.reducer';
import { IPacienteArquivo } from 'app/shared/model/paciente-arquivo.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPacienteArquivoState {
  fieldsBase: IPacienteArquivoBaseState;
}

export interface IPacienteArquivoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteArquivoDetail extends React.Component<IPacienteArquivoDetailProps, IPacienteArquivoState> {
  constructor(props: Readonly<IPacienteArquivoDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getPacienteArquivoState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { pacienteArquivoEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Arquivos</li>
          <li className="breadcrumb-item active">Paciente Arquivos details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Paciente Arquivos</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.pacienteArquivo.detail.title">PacienteArquivo</Translate>[
                  <b>{pacienteArquivoEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="arquivo">
                            <Translate contentKey="generadorApp.pacienteArquivo.arquivo">Arquivo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          {pacienteArquivoEntity.arquivo ? (
                            <div>
                              <a onClick={openFile(pacienteArquivoEntity.arquivoContentType, pacienteArquivoEntity.arquivo)}>
                                <img
                                  src={`data:${pacienteArquivoEntity.arquivoContentType};base64,${pacienteArquivoEntity.arquivo}`}
                                  style={{ maxHeight: '30px' }}
                                />
                              </a>
                              <span>
                                {pacienteArquivoEntity.arquivoContentType}, {byteSize(pacienteArquivoEntity.arquivo)}
                              </span>
                            </div>
                          ) : null}
                        </dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="ativo">
                            <Translate contentKey="generadorApp.pacienteArquivo.ativo">Ativo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteArquivoEntity.ativo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.pacienteArquivo.paciente">Paciente</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{pacienteArquivoEntity.paciente ? pacienteArquivoEntity.paciente.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/paciente-arquivo" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/paciente-arquivo/${pacienteArquivoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ pacienteArquivo }: IRootState) => ({
  pacienteArquivoEntity: pacienteArquivo.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteArquivoDetail);