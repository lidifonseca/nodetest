import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './profissional-dispositivo-complexidade-atual.reducer';
import { IProfissionalDispositivoComplexidadeAtual } from 'app/shared/model/profissional-dispositivo-complexidade-atual.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProfissionalDispositivoComplexidadeAtualUpdateProps
  extends StateProps,
    DispatchProps,
    RouteComponentProps<{ id: string }> {}

export interface IProfissionalDispositivoComplexidadeAtualUpdateState {
  isNew: boolean;
}

export class ProfissionalDispositivoComplexidadeAtualUpdate extends React.Component<
  IProfissionalDispositivoComplexidadeAtualUpdateProps,
  IProfissionalDispositivoComplexidadeAtualUpdateState
> {
  constructor(props: Readonly<IProfissionalDispositivoComplexidadeAtualUpdateProps>) {
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
      const { profissionalDispositivoComplexidadeAtualEntity } = this.props;
      const entity = {
        ...profissionalDispositivoComplexidadeAtualEntity,
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
    this.props.history.push('/profissional-dispositivo-complexidade-atual');
  };

  render() {
    const { profissionalDispositivoComplexidadeAtualEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Profissional Dispositivo Complexidade Atuals</li>
          <li className="breadcrumb-item active">Profissional Dispositivo Complexidade Atuals edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...profissionalDispositivoComplexidadeAtualEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.profissionalDispositivoComplexidadeAtual.home.createOrEditLabel">
                    Create or edit a ProfissionalDispositivoComplexidadeAtual
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
                  to="/profissional-dispositivo-complexidade-atual"
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
                      <Label className="mt-2" for="profissional-dispositivo-complexidade-atual-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput
                                id="profissional-dispositivo-complexidade-atual-id"
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
                              <Label
                                className="mt-2"
                                id="idProfissionalLabel"
                                for="profissional-dispositivo-complexidade-atual-idProfissional"
                              >
                                <Translate contentKey="generadorApp.profissionalDispositivoComplexidadeAtual.idProfissional">
                                  Id Profissional
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="profissional-dispositivo-complexidade-atual-idProfissional"
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
                              <Label
                                className="mt-2"
                                id="idProfissionalDispositivoComplexidadeLabel"
                                for="profissional-dispositivo-complexidade-atual-idProfissionalDispositivoComplexidade"
                              >
                                <Translate contentKey="generadorApp.profissionalDispositivoComplexidadeAtual.idProfissionalDispositivoComplexidade">
                                  Id Profissional Dispositivo Complexidade
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="profissional-dispositivo-complexidade-atual-idProfissionalDispositivoComplexidade"
                                type="string"
                                className="form-control"
                                name="idProfissionalDispositivoComplexidade"
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
                              <Label className="mt-2" id="idUsuarioLabel" for="profissional-dispositivo-complexidade-atual-idUsuario">
                                <Translate contentKey="generadorApp.profissionalDispositivoComplexidadeAtual.idUsuario">
                                  Id Usuario
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="profissional-dispositivo-complexidade-atual-idUsuario"
                                type="string"
                                className="form-control"
                                name="idUsuario"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
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
  profissionalDispositivoComplexidadeAtualEntity: storeState.profissionalDispositivoComplexidadeAtual.entity,
  loading: storeState.profissionalDispositivoComplexidadeAtual.loading,
  updating: storeState.profissionalDispositivoComplexidadeAtual.updating,
  updateSuccess: storeState.profissionalDispositivoComplexidadeAtual.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalDispositivoComplexidadeAtualUpdate);
