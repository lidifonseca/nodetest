import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './vw-api-atendimentos-aceite.reducer';
import { IVwApiAtendimentosAceite } from 'app/shared/model/vw-api-atendimentos-aceite.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVwApiAtendimentosAceiteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IVwApiAtendimentosAceiteUpdateState {
  isNew: boolean;
}

export class VwApiAtendimentosAceiteUpdate extends React.Component<
  IVwApiAtendimentosAceiteUpdateProps,
  IVwApiAtendimentosAceiteUpdateState
> {
  constructor(props: Readonly<IVwApiAtendimentosAceiteUpdateProps>) {
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
      const { vwApiAtendimentosAceiteEntity } = this.props;
      const entity = {
        ...vwApiAtendimentosAceiteEntity,
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
    this.props.history.push('/vw-api-atendimentos-aceite');
  };

  render() {
    const { vwApiAtendimentosAceiteEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Vw Api Atendimentos Aceites</li>
          <li className="breadcrumb-item active">Vw Api Atendimentos Aceites edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...vwApiAtendimentosAceiteEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.vwApiAtendimentosAceite.home.createOrEditLabel">
                    Create or edit a VwApiAtendimentosAceite
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
                  to="/vw-api-atendimentos-aceite"
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
                      <Label className="mt-2" for="vw-api-atendimentos-aceite-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput
                                id="vw-api-atendimentos-aceite-id"
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
                              <Label className="mt-2" id="idPadItemLabel" for="vw-api-atendimentos-aceite-idPadItem">
                                <Translate contentKey="generadorApp.vwApiAtendimentosAceite.idPadItem">Id Pad Item</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="vw-api-atendimentos-aceite-idPadItem"
                                type="string"
                                className="form-control"
                                name="idPadItem"
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
                              <Label className="mt-2" id="idPacienteLabel" for="vw-api-atendimentos-aceite-idPaciente">
                                <Translate contentKey="generadorApp.vwApiAtendimentosAceite.idPaciente">Id Paciente</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="vw-api-atendimentos-aceite-idPaciente"
                                type="string"
                                className="form-control"
                                name="idPaciente"
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
                              <Label className="mt-2" id="idPeriodoLabel" for="vw-api-atendimentos-aceite-idPeriodo">
                                <Translate contentKey="generadorApp.vwApiAtendimentosAceite.idPeriodo">Id Periodo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="vw-api-atendimentos-aceite-idPeriodo"
                                type="string"
                                className="form-control"
                                name="idPeriodo"
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
                              <Label className="mt-2" id="idPeriodicidadeLabel" for="vw-api-atendimentos-aceite-idPeriodicidade">
                                <Translate contentKey="generadorApp.vwApiAtendimentosAceite.idPeriodicidade">Id Periodicidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="vw-api-atendimentos-aceite-idPeriodicidade"
                                type="string"
                                className="form-control"
                                name="idPeriodicidade"
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
                              <Label className="mt-2" id="idProfissionalLabel" for="vw-api-atendimentos-aceite-idProfissional">
                                <Translate contentKey="generadorApp.vwApiAtendimentosAceite.idProfissional">Id Profissional</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="vw-api-atendimentos-aceite-idProfissional"
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
                              <Label className="mt-2" id="aceitoLabel" for="vw-api-atendimentos-aceite-aceito">
                                <Translate contentKey="generadorApp.vwApiAtendimentosAceite.aceito">Aceito</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="vw-api-atendimentos-aceite-aceito"
                                type="string"
                                className="form-control"
                                name="aceito"
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
                              <Label className="mt-2" id="bairroLabel" for="vw-api-atendimentos-aceite-bairro">
                                <Translate contentKey="generadorApp.vwApiAtendimentosAceite.bairro">Bairro</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="vw-api-atendimentos-aceite-bairro"
                                type="string"
                                className="form-control"
                                name="bairro"
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
                              <Label className="mt-2" id="cepLabel" for="vw-api-atendimentos-aceite-cep">
                                <Translate contentKey="generadorApp.vwApiAtendimentosAceite.cep">Cep</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="vw-api-atendimentos-aceite-cep"
                                type="string"
                                className="form-control"
                                name="cep"
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
                              <Label className="mt-2" id="cidadeLabel" for="vw-api-atendimentos-aceite-cidade">
                                <Translate contentKey="generadorApp.vwApiAtendimentosAceite.cidade">Cidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="vw-api-atendimentos-aceite-cidade"
                                type="string"
                                className="form-control"
                                name="cidade"
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
                              <Label className="mt-2" id="complementoLabel" for="vw-api-atendimentos-aceite-complemento">
                                <Translate contentKey="generadorApp.vwApiAtendimentosAceite.complemento">Complemento</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="vw-api-atendimentos-aceite-complemento"
                                type="string"
                                className="form-control"
                                name="complemento"
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
                              <Label className="mt-2" id="enderecoLabel" for="vw-api-atendimentos-aceite-endereco">
                                <Translate contentKey="generadorApp.vwApiAtendimentosAceite.endereco">Endereco</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="vw-api-atendimentos-aceite-endereco"
                                type="string"
                                className="form-control"
                                name="endereco"
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
                              <Label className="mt-2" id="especialidadeLabel" for="vw-api-atendimentos-aceite-especialidade">
                                <Translate contentKey="generadorApp.vwApiAtendimentosAceite.especialidade">Especialidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="vw-api-atendimentos-aceite-especialidade"
                                type="string"
                                className="form-control"
                                name="especialidade"
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
                              <Label className="mt-2" id="latitudeLabel" for="vw-api-atendimentos-aceite-latitude">
                                <Translate contentKey="generadorApp.vwApiAtendimentosAceite.latitude">Latitude</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="vw-api-atendimentos-aceite-latitude"
                                type="string"
                                className="form-control"
                                name="latitude"
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
                              <Label className="mt-2" id="longitudeLabel" for="vw-api-atendimentos-aceite-longitude">
                                <Translate contentKey="generadorApp.vwApiAtendimentosAceite.longitude">Longitude</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="vw-api-atendimentos-aceite-longitude"
                                type="string"
                                className="form-control"
                                name="longitude"
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
                              <Label className="mt-2" id="numeroLabel" for="vw-api-atendimentos-aceite-numero">
                                <Translate contentKey="generadorApp.vwApiAtendimentosAceite.numero">Numero</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="vw-api-atendimentos-aceite-numero"
                                type="string"
                                className="form-control"
                                name="numero"
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
                              <Label className="mt-2" id="pacienteLabel" for="vw-api-atendimentos-aceite-paciente">
                                <Translate contentKey="generadorApp.vwApiAtendimentosAceite.paciente">Paciente</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="vw-api-atendimentos-aceite-paciente"
                                type="string"
                                className="form-control"
                                name="paciente"
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
                              <Label className="mt-2" id="periodoLabel" for="vw-api-atendimentos-aceite-periodo">
                                <Translate contentKey="generadorApp.vwApiAtendimentosAceite.periodo">Periodo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="vw-api-atendimentos-aceite-periodo"
                                type="string"
                                className="form-control"
                                name="periodo"
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
                              <Label className="mt-2" id="periodicidadeLabel" for="vw-api-atendimentos-aceite-periodicidade">
                                <Translate contentKey="generadorApp.vwApiAtendimentosAceite.periodicidade">Periodicidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="vw-api-atendimentos-aceite-periodicidade"
                                type="string"
                                className="form-control"
                                name="periodicidade"
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
                              <Label className="mt-2" id="qtdSessoesLabel" for="vw-api-atendimentos-aceite-qtdSessoes">
                                <Translate contentKey="generadorApp.vwApiAtendimentosAceite.qtdSessoes">Qtd Sessoes</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="vw-api-atendimentos-aceite-qtdSessoes"
                                type="string"
                                className="form-control"
                                name="qtdSessoes"
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
                              <Label className="mt-2" id="ufLabel" for="vw-api-atendimentos-aceite-uf">
                                <Translate contentKey="generadorApp.vwApiAtendimentosAceite.uf">Uf</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="vw-api-atendimentos-aceite-uf"
                                type="string"
                                className="form-control"
                                name="uf"
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
                              <Label className="mt-2" id="valorLabel" for="vw-api-atendimentos-aceite-valor">
                                <Translate contentKey="generadorApp.vwApiAtendimentosAceite.valor">Valor</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="vw-api-atendimentos-aceite-valor"
                                type="string"
                                className="form-control"
                                name="valor"
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
  vwApiAtendimentosAceiteEntity: storeState.vwApiAtendimentosAceite.entity,
  loading: storeState.vwApiAtendimentosAceite.loading,
  updating: storeState.vwApiAtendimentosAceite.updating,
  updateSuccess: storeState.vwApiAtendimentosAceite.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VwApiAtendimentosAceiteUpdate);
