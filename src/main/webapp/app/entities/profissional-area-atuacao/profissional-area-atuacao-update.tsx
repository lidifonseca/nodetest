import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './profissional-area-atuacao.reducer';
import { IProfissionalAreaAtuacao } from 'app/shared/model/profissional-area-atuacao.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProfissionalAreaAtuacaoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IProfissionalAreaAtuacaoUpdateState {
  isNew: boolean;
}

export class ProfissionalAreaAtuacaoUpdate extends React.Component<
  IProfissionalAreaAtuacaoUpdateProps,
  IProfissionalAreaAtuacaoUpdateState
> {
  constructor(props: Readonly<IProfissionalAreaAtuacaoUpdateProps>) {
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
      const { profissionalAreaAtuacaoEntity } = this.props;
      const entity = {
        ...profissionalAreaAtuacaoEntity,
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
    this.props.history.push('/profissional-area-atuacao');
  };

  render() {
    const { profissionalAreaAtuacaoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Profissional Area Atuacaos</li>
          <li className="breadcrumb-item active">Profissional Area Atuacaos edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...profissionalAreaAtuacaoEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.profissionalAreaAtuacao.home.createOrEditLabel">
                    Create or edit a ProfissionalAreaAtuacao
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
                  to="/profissional-area-atuacao"
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
                      <Label className="mt-2" for="profissional-area-atuacao-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput
                                id="profissional-area-atuacao-id"
                                type="hidden"
                                className="form-control"
                                name="id"
                                required
                                readOnly
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="idProfissionalLabel" for="profissional-area-atuacao-idProfissional">
                                <Translate contentKey="generadorApp.profissionalAreaAtuacao.idProfissional">Id Profissional</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="profissional-area-atuacao-idProfissional" type="text" name="idProfissional" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cepAreaLabel" for="profissional-area-atuacao-cepArea">
                                <Translate contentKey="generadorApp.profissionalAreaAtuacao.cepArea">Cep Area</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="profissional-area-atuacao-cepArea"
                                type="text"
                                name="cepArea"
                                validate={{
                                  maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
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
                              <Label className="mt-2" id="cepFimLabel" for="profissional-area-atuacao-cepFim">
                                <Translate contentKey="generadorApp.profissionalAreaAtuacao.cepFim">Cep Fim</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="profissional-area-atuacao-cepFim"
                                type="text"
                                name="cepFim"
                                validate={{
                                  maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
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
                              <Label className="mt-2" id="ativoLabel" for="profissional-area-atuacao-ativo">
                                <Translate contentKey="generadorApp.profissionalAreaAtuacao.ativo">Ativo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="profissional-area-atuacao-ativo" type="string" className="form-control" name="ativo" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cepIniLabel" for="profissional-area-atuacao-cepIni">
                                <Translate contentKey="generadorApp.profissionalAreaAtuacao.cepIni">Cep Ini</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="profissional-area-atuacao-cepIni"
                                type="text"
                                name="cepIni"
                                validate={{
                                  maxLength: { value: 45, errorMessage: translate('entity.validation.maxlength', { max: 45 }) }
                                }}
                              />
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
  profissionalAreaAtuacaoEntity: storeState.profissionalAreaAtuacao.entity,
  loading: storeState.profissionalAreaAtuacao.loading,
  updating: storeState.profissionalAreaAtuacao.updating,
  updateSuccess: storeState.profissionalAreaAtuacao.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalAreaAtuacaoUpdate);
