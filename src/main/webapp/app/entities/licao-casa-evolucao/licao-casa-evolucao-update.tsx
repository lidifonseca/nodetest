/* eslint complexity: ["error", 300] */
import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import {
  ILicaoCasaEvolucaoUpdateState,
  getEntity,
  getLicaoCasaEvolucaoState,
  ILicaoCasaEvolucaoBaseState,
  updateEntity,
  createEntity,
  reset
} from './licao-casa-evolucao.reducer';
import { ILicaoCasaEvolucao } from 'app/shared/model/licao-casa-evolucao.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILicaoCasaEvolucaoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class LicaoCasaEvolucaoUpdate extends React.Component<ILicaoCasaEvolucaoUpdateProps, ILicaoCasaEvolucaoUpdateState> {
  constructor(props: Readonly<ILicaoCasaEvolucaoUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getLicaoCasaEvolucaoState(this.props.location),
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

  getFiltersURL = (offset = null) => {
    const fieldsBase = this.state.fieldsBase;
    let url = '_back=1' + (offset !== null ? '&offset=' + offset : '');
    Object.keys(fieldsBase).map(key => {
      url += '&' + key + '=' + fieldsBase[key];
    });
    return url;
  };
  saveEntity = (event: any, errors: any, values: any) => {
    values.atualizadoEm = convertDateTimeToServer(values.atualizadoEm);
    values.realizadaEm = convertDateTimeToServer(values.realizadaEm);
    values.dataAgenda = convertDateTimeToServer(values.dataAgenda);

    if (errors.length === 0) {
      const { licaoCasaEvolucaoEntity } = this.props;
      const entity = {
        ...licaoCasaEvolucaoEntity,

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
    this.props.history.push('/licao-casa-evolucao?' + this.getFiltersURL());
  };

  render() {
    const { licaoCasaEvolucaoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...licaoCasaEvolucaoEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.licaoCasaEvolucao.home.createOrEditLabel">Create or edit a LicaoCasaEvolucao</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/licao-casa-evolucao?' + this.getFiltersURL()}
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
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Inicio</Link>
            </li>
            <li className="breadcrumb-item active">Licao Casa Evolucaos</li>
            <li className="breadcrumb-item active">Licao Casa Evolucaos edit</li>
          </ol>

          <Panel>
            <PanelBody>
              <Row className="justify-content-center">
                <Col md="8">
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <div>
                      {!isNew ? (
                        <AvGroup>
                          <Row>
                            {/*
                        <Col md="3">
                        <Label className="mt-2" for="licao-casa-evolucao-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput id="licao-casa-evolucao-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'licaoCasaId' ? (
                          <Col md="licaoCasaId">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="licaoCasaIdLabel" for="licao-casa-evolucao-licaoCasaId">
                                    <Translate contentKey="generadorApp.licaoCasaEvolucao.licaoCasaId">Licao Casa Id</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="licao-casa-evolucao-licaoCasaId" type="string" className="form-control" name="licaoCasaId" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="licaoCasaId" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'atualizadoEm' ? (
                          <Col md="atualizadoEm">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="atualizadoEmLabel" for="licao-casa-evolucao-atualizadoEm">
                                    <Translate contentKey="generadorApp.licaoCasaEvolucao.atualizadoEm">Atualizado Em</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput
                                    id="licao-casa-evolucao-atualizadoEm"
                                    type="datetime-local"
                                    className="form-control"
                                    name="atualizadoEm"
                                    placeholder={'YYYY-MM-DD HH:mm'}
                                    value={isNew ? null : convertDateTimeFromServer(this.props.licaoCasaEvolucaoEntity.atualizadoEm)}
                                    validate={{
                                      required: { value: true, errorMessage: translate('entity.validation.required') }
                                    }}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="atualizadoEm" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'realizada' ? (
                          <Col md="realizada">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="realizadaLabel" check>
                                    <AvInput id="licao-casa-evolucao-realizada" type="checkbox" className="form-control" name="realizada" />
                                    <Translate contentKey="generadorApp.licaoCasaEvolucao.realizada">Realizada</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="realizada" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'realizadaEm' ? (
                          <Col md="realizadaEm">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="realizadaEmLabel" for="licao-casa-evolucao-realizadaEm">
                                    <Translate contentKey="generadorApp.licaoCasaEvolucao.realizadaEm">Realizada Em</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput
                                    id="licao-casa-evolucao-realizadaEm"
                                    type="datetime-local"
                                    className="form-control"
                                    name="realizadaEm"
                                    placeholder={'YYYY-MM-DD HH:mm'}
                                    value={isNew ? null : convertDateTimeFromServer(this.props.licaoCasaEvolucaoEntity.realizadaEm)}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="realizadaEm" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'observacoes' ? (
                          <Col md="observacoes">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="observacoesLabel" for="licao-casa-evolucao-observacoes">
                                    <Translate contentKey="generadorApp.licaoCasaEvolucao.observacoes">Observacoes</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="licao-casa-evolucao-observacoes" type="text" name="observacoes" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="observacoes" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'instrucoes' ? (
                          <Col md="instrucoes">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="instrucoesLabel" for="licao-casa-evolucao-instrucoes">
                                    <Translate contentKey="generadorApp.licaoCasaEvolucao.instrucoes">Instrucoes</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="licao-casa-evolucao-instrucoes" type="text" name="instrucoes" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="instrucoes" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'dataAgenda' ? (
                          <Col md="dataAgenda">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="dataAgendaLabel" for="licao-casa-evolucao-dataAgenda">
                                    <Translate contentKey="generadorApp.licaoCasaEvolucao.dataAgenda">Data Agenda</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput
                                    id="licao-casa-evolucao-dataAgenda"
                                    type="datetime-local"
                                    className="form-control"
                                    name="dataAgenda"
                                    placeholder={'YYYY-MM-DD HH:mm'}
                                    value={isNew ? null : convertDateTimeFromServer(this.props.licaoCasaEvolucaoEntity.dataAgenda)}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="dataAgenda" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'qtdLembrete' ? (
                          <Col md="qtdLembrete">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="qtdLembreteLabel" check>
                                    <AvInput
                                      id="licao-casa-evolucao-qtdLembrete"
                                      type="checkbox"
                                      className="form-control"
                                      name="qtdLembrete"
                                    />
                                    <Translate contentKey="generadorApp.licaoCasaEvolucao.qtdLembrete">Qtd Lembrete</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="qtdLembrete" value={this.state.fieldsBase[baseFilters]} />
                        )}
                      </Row>
                    </div>
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
  licaoCasaEvolucaoEntity: storeState.licaoCasaEvolucao.entity,
  loading: storeState.licaoCasaEvolucao.loading,
  updating: storeState.licaoCasaEvolucao.updating,
  updateSuccess: storeState.licaoCasaEvolucao.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LicaoCasaEvolucaoUpdate);
