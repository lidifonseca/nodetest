import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, IFilesPanicoBaseState, getFilesPanicoState } from './files-panico.reducer';
import { IFilesPanico } from 'app/shared/model/files-panico.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFilesPanicoState {
  fieldsBase: IFilesPanicoBaseState;
}

export interface IFilesPanicoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FilesPanicoDetail extends React.Component<IFilesPanicoDetailProps, IFilesPanicoState> {
  constructor(props: Readonly<IFilesPanicoDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getFilesPanicoState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { filesPanicoEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Files Panicos</li>
          <li className="breadcrumb-item active">Files Panicos details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Files Panicos</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.filesPanico.detail.title">FilesPanico</Translate>[<b>{filesPanicoEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idPanico">
                            <Translate contentKey="generadorApp.filesPanico.idPanico">Id Panico</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{filesPanicoEntity.idPanico}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idPaciente">
                            <Translate contentKey="generadorApp.filesPanico.idPaciente">Id Paciente</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{filesPanicoEntity.idPaciente}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="tipo">
                            <Translate contentKey="generadorApp.filesPanico.tipo">Tipo</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{filesPanicoEntity.tipo}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="imagem">
                            <Translate contentKey="generadorApp.filesPanico.imagem">Imagem</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{filesPanicoEntity.imagem}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="criadoEm">
                            <Translate contentKey="generadorApp.filesPanico.criadoEm">Criado Em</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>
                          <TextFormat value={filesPanicoEntity.criadoEm} type="date" format={APP_DATE_FORMAT} />
                        </dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/files-panico" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/files-panico/${filesPanicoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ filesPanico }: IRootState) => ({
  filesPanicoEntity: filesPanico.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FilesPanicoDetail);
