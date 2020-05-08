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
  IPacienteDiarioTagsUpdateState,
  getEntity,
  getPacienteDiarioTagsState,
  IPacienteDiarioTagsBaseState,
  updateEntity,
  createEntity,
  reset
} from './paciente-diario-tags.reducer';
import { IPacienteDiarioTags } from 'app/shared/model/paciente-diario-tags.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPacienteDiarioTagsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteDiarioTagsUpdate extends React.Component<IPacienteDiarioTagsUpdateProps, IPacienteDiarioTagsUpdateState> {
  constructor(props: Readonly<IPacienteDiarioTagsUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getPacienteDiarioTagsState(this.props.location),
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
    values.dtPost = convertDateTimeToServer(values.dtPost);

    if (errors.length === 0) {
      const { pacienteDiarioTagsEntity } = this.props;
      const entity = {
        ...pacienteDiarioTagsEntity,

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
    this.props.history.push('/paciente-diario-tags?' + this.getFiltersURL());
  };

  render() {
    const { pacienteDiarioTagsEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...pacienteDiarioTagsEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.pacienteDiarioTags.home.createOrEditLabel">Create or edit a PacienteDiarioTags</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/paciente-diario-tags?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Paciente Diario Tags</li>
            <li className="breadcrumb-item active">Paciente Diario Tags edit</li>
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
                        <Label className="mt-2" for="paciente-diario-tags-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput id="paciente-diario-tags-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'idPacienteDiario' ? (
                          <Col md="idPacienteDiario">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idPacienteDiarioLabel" for="paciente-diario-tags-idPacienteDiario">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.idPacienteDiario">Id Paciente Diario</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-idPacienteDiario"
                                    type="string"
                                    className="form-control"
                                    name="idPacienteDiario"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idPacienteDiario" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'idDiarioTags' ? (
                          <Col md="idDiarioTags">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idDiarioTagsLabel" for="paciente-diario-tags-idDiarioTags">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.idDiarioTags">Id Diario Tags</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-idDiarioTags"
                                    type="string"
                                    className="form-control"
                                    name="idDiarioTags"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idDiarioTags" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'escalaDePlantao' ? (
                          <Col md="escalaDePlantao">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="escalaDePlantaoLabel" for="paciente-diario-tags-escalaDePlantao">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.escalaDePlantao">Escala De Plantao</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-escalaDePlantao"
                                    type="string"
                                    className="form-control"
                                    name="escalaDePlantao"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="escalaDePlantao" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'captacaoEdp' ? (
                          <Col md="captacaoEdp">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="captacaoEdpLabel" for="paciente-diario-tags-captacaoEdp">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.captacaoEdp">Captacao Edp</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-captacaoEdp"
                                    type="string"
                                    className="form-control"
                                    name="captacaoEdp"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="captacaoEdp" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'implantacaoEdp' ? (
                          <Col md="implantacaoEdp">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="implantacaoEdpLabel" for="paciente-diario-tags-implantacaoEdp">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.implantacaoEdp">Implantacao Edp</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-implantacaoEdp"
                                    type="string"
                                    className="form-control"
                                    name="implantacaoEdp"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="implantacaoEdp" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'furoDeEscalaEdp' ? (
                          <Col md="furoDeEscalaEdp">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="furoDeEscalaEdpLabel" for="paciente-diario-tags-furoDeEscalaEdp">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.furoDeEscalaEdp">Furo De Escala Edp</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-furoDeEscalaEdp"
                                    type="string"
                                    className="form-control"
                                    name="furoDeEscalaEdp"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="furoDeEscalaEdp" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'solicitacaoDeFolgaEdp' ? (
                          <Col md="solicitacaoDeFolgaEdp">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="solicitacaoDeFolgaEdpLabel" for="paciente-diario-tags-solicitacaoDeFolgaEdp">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.solicitacaoDeFolgaEdp">
                                      Solicitacao De Folga Edp
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-solicitacaoDeFolgaEdp"
                                    type="string"
                                    className="form-control"
                                    name="solicitacaoDeFolgaEdp"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="solicitacaoDeFolgaEdp" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'trocaDeProfissionalEdp' ? (
                          <Col md="trocaDeProfissionalEdp">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label
                                    className="mt-2"
                                    id="trocaDeProfissionalEdpLabel"
                                    for="paciente-diario-tags-trocaDeProfissionalEdp"
                                  >
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.trocaDeProfissionalEdp">
                                      Troca De Profissional Edp
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-trocaDeProfissionalEdp"
                                    type="string"
                                    className="form-control"
                                    name="trocaDeProfissionalEdp"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="trocaDeProfissionalEdp" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'reclamacaoEdp' ? (
                          <Col md="reclamacaoEdp">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="reclamacaoEdpLabel" for="paciente-diario-tags-reclamacaoEdp">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.reclamacaoEdp">Reclamacao Edp</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-reclamacaoEdp"
                                    type="string"
                                    className="form-control"
                                    name="reclamacaoEdp"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="reclamacaoEdp" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'elogioEdp' ? (
                          <Col md="elogioEdp">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="elogioEdpLabel" for="paciente-diario-tags-elogioEdp">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.elogioEdp">Elogio Edp</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-diario-tags-elogioEdp" type="string" className="form-control" name="elogioEdp" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="elogioEdp" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'recusaDeAtendimentoEdp' ? (
                          <Col md="recusaDeAtendimentoEdp">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label
                                    className="mt-2"
                                    id="recusaDeAtendimentoEdpLabel"
                                    for="paciente-diario-tags-recusaDeAtendimentoEdp"
                                  >
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.recusaDeAtendimentoEdp">
                                      Recusa De Atendimento Edp
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-recusaDeAtendimentoEdp"
                                    type="string"
                                    className="form-control"
                                    name="recusaDeAtendimentoEdp"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="recusaDeAtendimentoEdp" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'duplicidadeEdp' ? (
                          <Col md="duplicidadeEdp">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="duplicidadeEdpLabel" for="paciente-diario-tags-duplicidadeEdp">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.duplicidadeEdp">Duplicidade Edp</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-duplicidadeEdp"
                                    type="string"
                                    className="form-control"
                                    name="duplicidadeEdp"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="duplicidadeEdp" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'monitorarEdp' ? (
                          <Col md="monitorarEdp">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="monitorarEdpLabel" for="paciente-diario-tags-monitorarEdp">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarEdp">Monitorar Edp</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-monitorarEdp"
                                    type="string"
                                    className="form-control"
                                    name="monitorarEdp"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="monitorarEdp" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'pendenteEdp' ? (
                          <Col md="pendenteEdp">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="pendenteEdpLabel" for="paciente-diario-tags-pendenteEdp">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteEdp">Pendente Edp</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-pendenteEdp"
                                    type="string"
                                    className="form-control"
                                    name="pendenteEdp"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="pendenteEdp" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'escalaMultiProfissional' ? (
                          <Col md="escalaMultiProfissional">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label
                                    className="mt-2"
                                    id="escalaMultiProfissionalLabel"
                                    for="paciente-diario-tags-escalaMultiProfissional"
                                  >
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.escalaMultiProfissional">
                                      Escala Multi Profissional
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-escalaMultiProfissional"
                                    type="string"
                                    className="form-control"
                                    name="escalaMultiProfissional"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="escalaMultiProfissional" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'captacaoEmp' ? (
                          <Col md="captacaoEmp">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="captacaoEmpLabel" for="paciente-diario-tags-captacaoEmp">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.captacaoEmp">Captacao Emp</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-captacaoEmp"
                                    type="string"
                                    className="form-control"
                                    name="captacaoEmp"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="captacaoEmp" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'implantacaoEmp' ? (
                          <Col md="implantacaoEmp">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="implantacaoEmpLabel" for="paciente-diario-tags-implantacaoEmp">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.implantacaoEmp">Implantacao Emp</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-implantacaoEmp"
                                    type="string"
                                    className="form-control"
                                    name="implantacaoEmp"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="implantacaoEmp" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'solicitacaoDeFolgaEmp' ? (
                          <Col md="solicitacaoDeFolgaEmp">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="solicitacaoDeFolgaEmpLabel" for="paciente-diario-tags-solicitacaoDeFolgaEmp">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.solicitacaoDeFolgaEmp">
                                      Solicitacao De Folga Emp
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-solicitacaoDeFolgaEmp"
                                    type="string"
                                    className="form-control"
                                    name="solicitacaoDeFolgaEmp"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="solicitacaoDeFolgaEmp" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'trocaDeProfissionalEmp' ? (
                          <Col md="trocaDeProfissionalEmp">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label
                                    className="mt-2"
                                    id="trocaDeProfissionalEmpLabel"
                                    for="paciente-diario-tags-trocaDeProfissionalEmp"
                                  >
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.trocaDeProfissionalEmp">
                                      Troca De Profissional Emp
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-trocaDeProfissionalEmp"
                                    type="string"
                                    className="form-control"
                                    name="trocaDeProfissionalEmp"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="trocaDeProfissionalEmp" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'reclamacaoEmp' ? (
                          <Col md="reclamacaoEmp">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="reclamacaoEmpLabel" for="paciente-diario-tags-reclamacaoEmp">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.reclamacaoEmp">Reclamacao Emp</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-reclamacaoEmp"
                                    type="string"
                                    className="form-control"
                                    name="reclamacaoEmp"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="reclamacaoEmp" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'elogioEmp' ? (
                          <Col md="elogioEmp">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="elogioEmpLabel" for="paciente-diario-tags-elogioEmp">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.elogioEmp">Elogio Emp</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-diario-tags-elogioEmp" type="string" className="form-control" name="elogioEmp" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="elogioEmp" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'padIncompletoEmp' ? (
                          <Col md="padIncompletoEmp">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="padIncompletoEmpLabel" for="paciente-diario-tags-padIncompletoEmp">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.padIncompletoEmp">Pad Incompleto Emp</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-padIncompletoEmp"
                                    type="string"
                                    className="form-control"
                                    name="padIncompletoEmp"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="padIncompletoEmp" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'visitaImprodutivaEmp' ? (
                          <Col md="visitaImprodutivaEmp">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="visitaImprodutivaEmpLabel" for="paciente-diario-tags-visitaImprodutivaEmp">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.visitaImprodutivaEmp">
                                      Visita Improdutiva Emp
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-visitaImprodutivaEmp"
                                    type="string"
                                    className="form-control"
                                    name="visitaImprodutivaEmp"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="visitaImprodutivaEmp" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'monitorarEmp' ? (
                          <Col md="monitorarEmp">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="monitorarEmpLabel" for="paciente-diario-tags-monitorarEmp">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarEmp">Monitorar Emp</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-monitorarEmp"
                                    type="string"
                                    className="form-control"
                                    name="monitorarEmp"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="monitorarEmp" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'pendenteEmp' ? (
                          <Col md="pendenteEmp">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="pendenteEmpLabel" for="paciente-diario-tags-pendenteEmp">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteEmp">Pendente Emp</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-pendenteEmp"
                                    type="string"
                                    className="form-control"
                                    name="pendenteEmp"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="pendenteEmp" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'intercorrencia' ? (
                          <Col md="intercorrencia">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="intercorrenciaLabel" for="paciente-diario-tags-intercorrencia">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.intercorrencia">Intercorrencia</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-intercorrencia"
                                    type="string"
                                    className="form-control"
                                    name="intercorrencia"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="intercorrencia" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'clinicaInter' ? (
                          <Col md="clinicaInter">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="clinicaInterLabel" for="paciente-diario-tags-clinicaInter">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.clinicaInter">Clinica Inter</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-clinicaInter"
                                    type="string"
                                    className="form-control"
                                    name="clinicaInter"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="clinicaInter" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'aphInter' ? (
                          <Col md="aphInter">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="aphInterLabel" for="paciente-diario-tags-aphInter">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.aphInter">Aph Inter</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-diario-tags-aphInter" type="string" className="form-control" name="aphInter" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="aphInter" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'pendenteInter' ? (
                          <Col md="pendenteInter">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="pendenteInterLabel" for="paciente-diario-tags-pendenteInter">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteInter">Pendente Inter</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-pendenteInter"
                                    type="string"
                                    className="form-control"
                                    name="pendenteInter"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="pendenteInter" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'solicitacoes' ? (
                          <Col md="solicitacoes">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="solicitacoesLabel" for="paciente-diario-tags-solicitacoes">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.solicitacoes">Solicitacoes</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-solicitacoes"
                                    type="string"
                                    className="form-control"
                                    name="solicitacoes"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="solicitacoes" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'recargaDeOxigenioSolic' ? (
                          <Col md="recargaDeOxigenioSolic">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label
                                    className="mt-2"
                                    id="recargaDeOxigenioSolicLabel"
                                    for="paciente-diario-tags-recargaDeOxigenioSolic"
                                  >
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.recargaDeOxigenioSolic">
                                      Recarga De Oxigenio Solic
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-recargaDeOxigenioSolic"
                                    type="string"
                                    className="form-control"
                                    name="recargaDeOxigenioSolic"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="recargaDeOxigenioSolic" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'equipamentosSolic' ? (
                          <Col md="equipamentosSolic">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="equipamentosSolicLabel" for="paciente-diario-tags-equipamentosSolic">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.equipamentosSolic">Equipamentos Solic</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-equipamentosSolic"
                                    type="string"
                                    className="form-control"
                                    name="equipamentosSolic"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="equipamentosSolic" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'matmedSolic' ? (
                          <Col md="matmedSolic">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="matmedSolicLabel" for="paciente-diario-tags-matmedSolic">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.matmedSolic">Matmed Solic</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-matmedSolic"
                                    type="string"
                                    className="form-control"
                                    name="matmedSolic"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="matmedSolic" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'prontuarioSolic' ? (
                          <Col md="prontuarioSolic">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="prontuarioSolicLabel" for="paciente-diario-tags-prontuarioSolic">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.prontuarioSolic">Prontuario Solic</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-prontuarioSolic"
                                    type="string"
                                    className="form-control"
                                    name="prontuarioSolic"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="prontuarioSolic" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'prescricoesSolic' ? (
                          <Col md="prescricoesSolic">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="prescricoesSolicLabel" for="paciente-diario-tags-prescricoesSolic">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.prescricoesSolic">Prescricoes Solic</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-prescricoesSolic"
                                    type="string"
                                    className="form-control"
                                    name="prescricoesSolic"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="prescricoesSolic" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'examesSolic' ? (
                          <Col md="examesSolic">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="examesSolicLabel" for="paciente-diario-tags-examesSolic">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.examesSolic">Exames Solic</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-examesSolic"
                                    type="string"
                                    className="form-control"
                                    name="examesSolic"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="examesSolic" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ambulanciaSolic' ? (
                          <Col md="ambulanciaSolic">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="ambulanciaSolicLabel" for="paciente-diario-tags-ambulanciaSolic">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.ambulanciaSolic">Ambulancia Solic</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-ambulanciaSolic"
                                    type="string"
                                    className="form-control"
                                    name="ambulanciaSolic"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ambulanciaSolic" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'atendimentoDeEquipeSolic' ? (
                          <Col md="atendimentoDeEquipeSolic">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label
                                    className="mt-2"
                                    id="atendimentoDeEquipeSolicLabel"
                                    for="paciente-diario-tags-atendimentoDeEquipeSolic"
                                  >
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.atendimentoDeEquipeSolic">
                                      Atendimento De Equipe Solic
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-atendimentoDeEquipeSolic"
                                    type="string"
                                    className="form-control"
                                    name="atendimentoDeEquipeSolic"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="atendimentoDeEquipeSolic" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'monitorarSolic' ? (
                          <Col md="monitorarSolic">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="monitorarSolicLabel" for="paciente-diario-tags-monitorarSolic">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarSolic">Monitorar Solic</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-monitorarSolic"
                                    type="string"
                                    className="form-control"
                                    name="monitorarSolic"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="monitorarSolic" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'pendenteSolic' ? (
                          <Col md="pendenteSolic">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="pendenteSolicLabel" for="paciente-diario-tags-pendenteSolic">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteSolic">Pendente Solic</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-pendenteSolic"
                                    type="string"
                                    className="form-control"
                                    name="pendenteSolic"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="pendenteSolic" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'avaliacao' ? (
                          <Col md="avaliacao">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="avaliacaoLabel" for="paciente-diario-tags-avaliacao">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.avaliacao">Avaliacao</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-diario-tags-avaliacao" type="string" className="form-control" name="avaliacao" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="avaliacao" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'residenciaAval' ? (
                          <Col md="residenciaAval">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="residenciaAvalLabel" for="paciente-diario-tags-residenciaAval">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.residenciaAval">Residencia Aval</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-residenciaAval"
                                    type="string"
                                    className="form-control"
                                    name="residenciaAval"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="residenciaAval" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'hospitalAval' ? (
                          <Col md="hospitalAval">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="hospitalAvalLabel" for="paciente-diario-tags-hospitalAval">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.hospitalAval">Hospital Aval</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-hospitalAval"
                                    type="string"
                                    className="form-control"
                                    name="hospitalAval"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="hospitalAval" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'monitorarAval' ? (
                          <Col md="monitorarAval">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="monitorarAvalLabel" for="paciente-diario-tags-monitorarAval">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarAval">Monitorar Aval</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-monitorarAval"
                                    type="string"
                                    className="form-control"
                                    name="monitorarAval"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="monitorarAval" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'captacaoAtivaAval' ? (
                          <Col md="captacaoAtivaAval">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="captacaoAtivaAvalLabel" for="paciente-diario-tags-captacaoAtivaAval">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.captacaoAtivaAval">
                                      Captacao Ativa Aval
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-captacaoAtivaAval"
                                    type="string"
                                    className="form-control"
                                    name="captacaoAtivaAval"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="captacaoAtivaAval" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'pendenteAval' ? (
                          <Col md="pendenteAval">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="pendenteAvalLabel" for="paciente-diario-tags-pendenteAval">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteAval">Pendente Aval</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-pendenteAval"
                                    type="string"
                                    className="form-control"
                                    name="pendenteAval"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="pendenteAval" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'implantacao' ? (
                          <Col md="implantacao">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="implantacaoLabel" for="paciente-diario-tags-implantacao">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.implantacao">Implantacao</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-implantacao"
                                    type="string"
                                    className="form-control"
                                    name="implantacao"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="implantacao" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'monitorarImpl' ? (
                          <Col md="monitorarImpl">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="monitorarImplLabel" for="paciente-diario-tags-monitorarImpl">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarImpl">Monitorar Impl</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-monitorarImpl"
                                    type="string"
                                    className="form-control"
                                    name="monitorarImpl"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="monitorarImpl" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'pendenteImpl' ? (
                          <Col md="pendenteImpl">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="pendenteImplLabel" for="paciente-diario-tags-pendenteImpl">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteImpl">Pendente Impl</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-pendenteImpl"
                                    type="string"
                                    className="form-control"
                                    name="pendenteImpl"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="pendenteImpl" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'alta' ? (
                          <Col md="alta">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="altaLabel" for="paciente-diario-tags-alta">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.alta">Alta</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-diario-tags-alta" type="string" className="form-control" name="alta" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="alta" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'hospitalizacaoAlt' ? (
                          <Col md="hospitalizacaoAlt">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="hospitalizacaoAltLabel" for="paciente-diario-tags-hospitalizacaoAlt">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.hospitalizacaoAlt">Hospitalizacao Alt</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-hospitalizacaoAlt"
                                    type="string"
                                    className="form-control"
                                    name="hospitalizacaoAlt"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="hospitalizacaoAlt" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'migracaoDeEmpresaAlt' ? (
                          <Col md="migracaoDeEmpresaAlt">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="migracaoDeEmpresaAltLabel" for="paciente-diario-tags-migracaoDeEmpresaAlt">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.migracaoDeEmpresaAlt">
                                      Migracao De Empresa Alt
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-migracaoDeEmpresaAlt"
                                    type="string"
                                    className="form-control"
                                    name="migracaoDeEmpresaAlt"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="migracaoDeEmpresaAlt" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'obitoEmCasaAlt' ? (
                          <Col md="obitoEmCasaAlt">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="obitoEmCasaAltLabel" for="paciente-diario-tags-obitoEmCasaAlt">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.obitoEmCasaAlt">Obito Em Casa Alt</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-obitoEmCasaAlt"
                                    type="string"
                                    className="form-control"
                                    name="obitoEmCasaAlt"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="obitoEmCasaAlt" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'terminoDeAtendimentoAlt' ? (
                          <Col md="terminoDeAtendimentoAlt">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label
                                    className="mt-2"
                                    id="terminoDeAtendimentoAltLabel"
                                    for="paciente-diario-tags-terminoDeAtendimentoAlt"
                                  >
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.terminoDeAtendimentoAlt">
                                      Termino De Atendimento Alt
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-terminoDeAtendimentoAlt"
                                    type="string"
                                    className="form-control"
                                    name="terminoDeAtendimentoAlt"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="terminoDeAtendimentoAlt" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'atendimentoSuspensoAlt' ? (
                          <Col md="atendimentoSuspensoAlt">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label
                                    className="mt-2"
                                    id="atendimentoSuspensoAltLabel"
                                    for="paciente-diario-tags-atendimentoSuspensoAlt"
                                  >
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.atendimentoSuspensoAlt">
                                      Atendimento Suspenso Alt
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-atendimentoSuspensoAlt"
                                    type="string"
                                    className="form-control"
                                    name="atendimentoSuspensoAlt"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="atendimentoSuspensoAlt" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'monitorarAlt' ? (
                          <Col md="monitorarAlt">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="monitorarAltLabel" for="paciente-diario-tags-monitorarAlt">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarAlt">Monitorar Alt</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-monitorarAlt"
                                    type="string"
                                    className="form-control"
                                    name="monitorarAlt"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="monitorarAlt" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'pendenteAlt' ? (
                          <Col md="pendenteAlt">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="pendenteAltLabel" for="paciente-diario-tags-pendenteAlt">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteAlt">Pendente Alt</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-pendenteAlt"
                                    type="string"
                                    className="form-control"
                                    name="pendenteAlt"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="pendenteAlt" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'eCommerceSegViagem' ? (
                          <Col md="eCommerceSegViagem">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="eCommerceSegViagemLabel" for="paciente-diario-tags-eCommerceSegViagem">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.eCommerceSegViagem">
                                      E Commerce Seg Viagem
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-eCommerceSegViagem"
                                    type="string"
                                    className="form-control"
                                    name="eCommerceSegViagem"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="eCommerceSegViagem" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'monitorarEcsv' ? (
                          <Col md="monitorarEcsv">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="monitorarEcsvLabel" for="paciente-diario-tags-monitorarEcsv">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarEcsv">Monitorar Ecsv</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-monitorarEcsv"
                                    type="string"
                                    className="form-control"
                                    name="monitorarEcsv"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="monitorarEcsv" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'pendenteEcsv' ? (
                          <Col md="pendenteEcsv">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="pendenteEcsvLabel" for="paciente-diario-tags-pendenteEcsv">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteEcsv">Pendente Ecsv</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-pendenteEcsv"
                                    type="string"
                                    className="form-control"
                                    name="pendenteEcsv"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="pendenteEcsv" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'farmacia' ? (
                          <Col md="farmacia">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="farmaciaLabel" for="paciente-diario-tags-farmacia">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.farmacia">Farmacia</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-diario-tags-farmacia" type="string" className="form-control" name="farmacia" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="farmacia" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'matMedFarm' ? (
                          <Col md="matMedFarm">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="matMedFarmLabel" for="paciente-diario-tags-matMedFarm">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.matMedFarm">Mat Med Farm</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-diario-tags-matMedFarm" type="string" className="form-control" name="matMedFarm" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="matMedFarm" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'receitaFarm' ? (
                          <Col md="receitaFarm">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="receitaFarmLabel" for="paciente-diario-tags-receitaFarm">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.receitaFarm">Receita Farm</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-receitaFarm"
                                    type="string"
                                    className="form-control"
                                    name="receitaFarm"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="receitaFarm" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'prontuarioFarm' ? (
                          <Col md="prontuarioFarm">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="prontuarioFarmLabel" for="paciente-diario-tags-prontuarioFarm">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.prontuarioFarm">Prontuario Farm</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-prontuarioFarm"
                                    type="string"
                                    className="form-control"
                                    name="prontuarioFarm"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="prontuarioFarm" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'romaneioManualFarm' ? (
                          <Col md="romaneioManualFarm">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="romaneioManualFarmLabel" for="paciente-diario-tags-romaneioManualFarm">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.romaneioManualFarm">
                                      Romaneio Manual Farm
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-romaneioManualFarm"
                                    type="string"
                                    className="form-control"
                                    name="romaneioManualFarm"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="romaneioManualFarm" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'outrosFarm' ? (
                          <Col md="outrosFarm">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="outrosFarmLabel" for="paciente-diario-tags-outrosFarm">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.outrosFarm">Outros Farm</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="paciente-diario-tags-outrosFarm" type="string" className="form-control" name="outrosFarm" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="outrosFarm" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'monitorarFarm' ? (
                          <Col md="monitorarFarm">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="monitorarFarmLabel" for="paciente-diario-tags-monitorarFarm">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarFarm">Monitorar Farm</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-monitorarFarm"
                                    type="string"
                                    className="form-control"
                                    name="monitorarFarm"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="monitorarFarm" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'pendenteFarm' ? (
                          <Col md="pendenteFarm">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="pendenteFarmLabel" for="paciente-diario-tags-pendenteFarm">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteFarm">Pendente Farm</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-pendenteFarm"
                                    type="string"
                                    className="form-control"
                                    name="pendenteFarm"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="pendenteFarm" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'contatoTelefonico' ? (
                          <Col md="contatoTelefonico">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="contatoTelefonicoLabel" for="paciente-diario-tags-contatoTelefonico">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.contatoTelefonico">Contato Telefonico</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-contatoTelefonico"
                                    type="string"
                                    className="form-control"
                                    name="contatoTelefonico"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="contatoTelefonico" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ativoContTel' ? (
                          <Col md="ativoContTel">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="ativoContTelLabel" for="paciente-diario-tags-ativoContTel">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.ativoContTel">Ativo Cont Tel</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-ativoContTel"
                                    type="string"
                                    className="form-control"
                                    name="ativoContTel"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ativoContTel" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'receptivoContTel' ? (
                          <Col md="receptivoContTel">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="receptivoContTelLabel" for="paciente-diario-tags-receptivoContTel">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.receptivoContTel">Receptivo Cont Tel</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-receptivoContTel"
                                    type="string"
                                    className="form-control"
                                    name="receptivoContTel"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="receptivoContTel" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'monitorarContTel' ? (
                          <Col md="monitorarContTel">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="monitorarContTelLabel" for="paciente-diario-tags-monitorarContTel">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.monitorarContTel">Monitorar Cont Tel</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-monitorarContTel"
                                    type="string"
                                    className="form-control"
                                    name="monitorarContTel"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="monitorarContTel" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'pendenteContTel' ? (
                          <Col md="pendenteContTel">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="pendenteContTelLabel" for="paciente-diario-tags-pendenteContTel">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.pendenteContTel">Pendente Cont Tel</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="paciente-diario-tags-pendenteContTel"
                                    type="string"
                                    className="form-control"
                                    name="pendenteContTel"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="pendenteContTel" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'dtPost' ? (
                          <Col md="dtPost">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="dtPostLabel" for="paciente-diario-tags-dtPost">
                                    <Translate contentKey="generadorApp.pacienteDiarioTags.dtPost">Dt Post</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput
                                    id="paciente-diario-tags-dtPost"
                                    type="datetime-local"
                                    className="form-control"
                                    name="dtPost"
                                    placeholder={'YYYY-MM-DD HH:mm'}
                                    value={isNew ? null : convertDateTimeFromServer(this.props.pacienteDiarioTagsEntity.dtPost)}
                                    validate={{
                                      required: { value: true, errorMessage: translate('entity.validation.required') }
                                    }}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="dtPost" value={this.state.fieldsBase[baseFilters]} />
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
  pacienteDiarioTagsEntity: storeState.pacienteDiarioTags.entity,
  loading: storeState.pacienteDiarioTags.loading,
  updating: storeState.pacienteDiarioTags.updating,
  updateSuccess: storeState.pacienteDiarioTags.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PacienteDiarioTagsUpdate);
