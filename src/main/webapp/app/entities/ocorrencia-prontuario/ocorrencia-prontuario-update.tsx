import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './ocorrencia-prontuario.reducer';
import { IOcorrenciaProntuario } from 'app/shared/model/ocorrencia-prontuario.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IOcorrenciaProntuarioUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IOcorrenciaProntuarioUpdateState {
  isNew: boolean;
}

export class OcorrenciaProntuarioUpdate extends React.Component<IOcorrenciaProntuarioUpdateProps, IOcorrenciaProntuarioUpdateState> {
  constructor(props: Readonly<IOcorrenciaProntuarioUpdateProps>) {
    super(props);
    this.state = {
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { ocorrenciaProntuarioEntity } = this.props;
      const entity = {
        ...ocorrenciaProntuarioEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/ocorrencia-prontuario');
  };

  render() {
    const { ocorrenciaProntuarioEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Ocorrencia Prontuarios</li>
          <li className="breadcrumb-item active">Ocorrencia Prontuarios edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...ocorrenciaProntuarioEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.ocorrenciaProntuario.home.createOrEditLabel">
                    Create or edit a OcorrenciaProntuario
                  </Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button
                  tag={Link}
                  id="cancel-save"
                  to="/ocorrencia-prontuario"
                  replace
                  color="info"
                  className="float-right jh-create-entity"
                >
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
              </h2>
            </PanelHeader>
            <PanelBody>
              <Row className="justify-content-center">
                <Col md="8">
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <Row>
                      {!isNew ? (
                        <AvGroup>
                          <Row>
                            {/*
                      <Col md="3">
                      <Label className="mt-2" for="ocorrencia-prontuario-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="ocorrencia-prontuario-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="nomeLabel" for="ocorrencia-prontuario-nome">
                                <Translate contentKey="generadorApp.ocorrenciaProntuario.nome">Nome</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="ocorrencia-prontuario-nome"
                                type="text"
                                name="nome"
                                validate={{
                                  maxLength: { value: 45, errorMessage: translate('entity.validation.maxlength', { max: 45 }) }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ativoLabel" for="ocorrencia-prontuario-ativo">
                                <Translate contentKey="generadorApp.ocorrenciaProntuario.ativo">Ativo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="ocorrencia-prontuario-ativo"
                                type="text"
                                name="ativo"
                                validate={{
                                  maxLength: { value: 1, errorMessage: translate('entity.validation.maxlength', { max: 1 }) }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="dataPostLabel" for="ocorrencia-prontuario-dataPost">
                                <Translate contentKey="generadorApp.ocorrenciaProntuario.dataPost">Data Post</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="ocorrencia-prontuario-dataPost" type="date" className="form-control" name="dataPost" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>
                    </Row>
                  )}
                </Col>
              </Row>
            </PanelBody>
          </Panel>
        </AvForm>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  ocorrenciaProntuarioEntity: storeState.ocorrenciaProntuario.entity,
  loading: storeState.ocorrenciaProntuario.loading,
  updating: storeState.ocorrenciaProntuario.updating,
  updateSuccess: storeState.ocorrenciaProntuario.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OcorrenciaProntuarioUpdate);
