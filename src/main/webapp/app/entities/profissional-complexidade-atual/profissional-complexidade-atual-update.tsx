import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './profissional-complexidade-atual.reducer';
import { IProfissionalComplexidadeAtual } from 'app/shared/model/profissional-complexidade-atual.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProfissionalComplexidadeAtualUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IProfissionalComplexidadeAtualUpdateState {
  isNew: boolean;
}

export class ProfissionalComplexidadeAtualUpdate extends React.Component<
  IProfissionalComplexidadeAtualUpdateProps,
  IProfissionalComplexidadeAtualUpdateState
> {
  constructor(props: Readonly<IProfissionalComplexidadeAtualUpdateProps>) {
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
      const { profissionalComplexidadeAtualEntity } = this.props;
      const entity = {
        ...profissionalComplexidadeAtualEntity,
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
    this.props.history.push('/profissional-complexidade-atual');
  };

  render() {
    const { profissionalComplexidadeAtualEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Profissional Complexidade Atuals</li>
          <li className="breadcrumb-item active">Profissional Complexidade Atuals edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...profissionalComplexidadeAtualEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.profissionalComplexidadeAtual.home.createOrEditLabel">
                    Create or edit a ProfissionalComplexidadeAtual
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
                  to="/profissional-complexidade-atual"
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
                      <Label className="mt-2" for="profissional-complexidade-atual-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput
                                id="profissional-complexidade-atual-id"
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
                              <Label className="mt-2" id="idProfissionalLabel" for="profissional-complexidade-atual-idProfissional">
                                <Translate contentKey="generadorApp.profissionalComplexidadeAtual.idProfissional">
                                  Id Profissional
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="profissional-complexidade-atual-idProfissional"
                                type="string"
                                className="form-control"
                                name="idProfissional"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
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
                              <Label className="mt-2" id="baixaLabel" for="profissional-complexidade-atual-baixa">
                                <Translate contentKey="generadorApp.profissionalComplexidadeAtual.baixa">Baixa</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="profissional-complexidade-atual-baixa" type="string" className="form-control" name="baixa" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="mediaLabel" for="profissional-complexidade-atual-media">
                                <Translate contentKey="generadorApp.profissionalComplexidadeAtual.media">Media</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="profissional-complexidade-atual-media" type="string" className="form-control" name="media" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="altaLabel" for="profissional-complexidade-atual-alta">
                                <Translate contentKey="generadorApp.profissionalComplexidadeAtual.alta">Alta</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="profissional-complexidade-atual-alta" type="string" className="form-control" name="alta" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ventilacaoMecanicaLabel" for="profissional-complexidade-atual-ventilacaoMecanica">
                                <Translate contentKey="generadorApp.profissionalComplexidadeAtual.ventilacaoMecanica">
                                  Ventilacao Mecanica
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="profissional-complexidade-atual-ventilacaoMecanica"
                                type="string"
                                className="form-control"
                                name="ventilacaoMecanica"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="telemonitoramenteLabel" for="profissional-complexidade-atual-telemonitoramente">
                                <Translate contentKey="generadorApp.profissionalComplexidadeAtual.telemonitoramente">
                                  Telemonitoramente
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="profissional-complexidade-atual-telemonitoramente"
                                type="string"
                                className="form-control"
                                name="telemonitoramente"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
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
                              <Label className="mt-2" id="idUsuarioLabel" for="profissional-complexidade-atual-idUsuario">
                                <Translate contentKey="generadorApp.profissionalComplexidadeAtual.idUsuario">Id Usuario</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="profissional-complexidade-atual-idUsuario"
                                type="string"
                                className="form-control"
                                name="idUsuario"
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
  profissionalComplexidadeAtualEntity: storeState.profissionalComplexidadeAtual.entity,
  loading: storeState.profissionalComplexidadeAtual.loading,
  updating: storeState.profissionalComplexidadeAtual.updating,
  updateSuccess: storeState.profissionalComplexidadeAtual.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalComplexidadeAtualUpdate);
