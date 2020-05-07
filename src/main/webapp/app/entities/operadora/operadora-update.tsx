import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { getEntities as getUnidadeEasies } from 'app/entities/unidade-easy/unidade-easy.reducer';
import { ITipoOperadora } from 'app/shared/model/tipo-operadora.model';
import { getEntities as getTipoOperadoras } from 'app/entities/tipo-operadora/tipo-operadora.reducer';
import {
  IOperadoraUpdateState,
  getEntity,
  getOperadoraState,
  IOperadoraBaseState,
  updateEntity,
  createEntity,
  reset
} from './operadora.reducer';
import { IOperadora } from 'app/shared/model/operadora.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IOperadoraUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class OperadoraUpdate extends React.Component<IOperadoraUpdateProps, IOperadoraUpdateState> {
  constructor(props: Readonly<IOperadoraUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getOperadoraState(this.props.location),
      unidadeId: '0',
      tipoOperadoraId: '0',
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

    this.props.getUnidadeEasies();
    this.props.getTipoOperadoras();
  }

  getFiltersURL = (offset = null) => {
    const fieldsBase = this.state.fieldsBase;
    return (
      '_back=1' +
      (fieldsBase['baseFilters'] ? '&baseFilters=' + fieldsBase['baseFilters'] : '') +
      (fieldsBase['activePage'] ? '&page=' + fieldsBase['activePage'] : '') +
      (fieldsBase['itemsPerPage'] ? '&size=' + fieldsBase['itemsPerPage'] : '') +
      (fieldsBase['sort'] ? '&sort=' + (fieldsBase['sort'] + ',' + fieldsBase['order']) : '') +
      (offset !== null ? '&offset=' + offset : '') +
      (fieldsBase['nomeFantasia'] ? '&nomeFantasia=' + fieldsBase['nomeFantasia'] : '') +
      (fieldsBase['razaoSocial'] ? '&razaoSocial=' + fieldsBase['razaoSocial'] : '') +
      (fieldsBase['cnpj'] ? '&cnpj=' + fieldsBase['cnpj'] : '') +
      (fieldsBase['ie'] ? '&ie=' + fieldsBase['ie'] : '') +
      (fieldsBase['site'] ? '&site=' + fieldsBase['site'] : '') +
      (fieldsBase['ativo'] ? '&ativo=' + fieldsBase['ativo'] : '') +
      (fieldsBase['endereco'] ? '&endereco=' + fieldsBase['endereco'] : '') +
      (fieldsBase['contatoCentralAtendimento'] ? '&contatoCentralAtendimento=' + fieldsBase['contatoCentralAtendimento'] : '') +
      (fieldsBase['emailCentralAtendimento'] ? '&emailCentralAtendimento=' + fieldsBase['emailCentralAtendimento'] : '') +
      (fieldsBase['nomeContatoComercial'] ? '&nomeContatoComercial=' + fieldsBase['nomeContatoComercial'] : '') +
      (fieldsBase['contatoComercial'] ? '&contatoComercial=' + fieldsBase['contatoComercial'] : '') +
      (fieldsBase['emailComercial'] ? '&emailComercial=' + fieldsBase['emailComercial'] : '') +
      (fieldsBase['nomeContatoFinanceiro'] ? '&nomeContatoFinanceiro=' + fieldsBase['nomeContatoFinanceiro'] : '') +
      (fieldsBase['contatoFinanceiro'] ? '&contatoFinanceiro=' + fieldsBase['contatoFinanceiro'] : '') +
      (fieldsBase['emailFinanceiro'] ? '&emailFinanceiro=' + fieldsBase['emailFinanceiro'] : '') +
      (fieldsBase['unidade'] ? '&unidade=' + fieldsBase['unidade'] : '') +
      (fieldsBase['tipoOperadora'] ? '&tipoOperadora=' + fieldsBase['tipoOperadora'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { operadoraEntity } = this.props;
      const entity = {
        ...operadoraEntity,
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
    this.props.history.push('/operadora?' + this.getFiltersURL());
  };

  render() {
    const { operadoraEntity, unidadeEasies, tipoOperadoras, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Operadoras</li>
          <li className="breadcrumb-item active">Operadoras edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...operadoraEntity,
                  unidade: operadoraEntity.unidade ? operadoraEntity.unidade.id : null,
                  tipoOperadora: operadoraEntity.tipoOperadora ? operadoraEntity.tipoOperadora.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.operadora.home.createOrEditLabel">Create or edit a Operadora</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button
                  tag={Link}
                  id="cancel-save"
                  to={'/operadora?' + this.getFiltersURL()}
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
                    <div>
                      {!isNew ? (
                        <AvGroup>
                          <Row>
                            {/*
                      <Col md="3">
                      <Label className="mt-2" for="operadora-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="operadora-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'tipoOperadora' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" for="operadora-tipoOperadora">
                                    <Translate contentKey="generadorApp.operadora.tipoOperadora">Tipo Operadora</Translate>
                                  </Label>
                                </Col>
                                <Col md="12">
                                  <AvInput id="operadora-tipoOperadora" type="select" className="form-control" name="tipoOperadora">
                                    <option value="null" key="0">
                                      {translate('generadorApp.operadora.tipoOperadora.empty')}
                                    </option>
                                    {tipoOperadoras
                                      ? tipoOperadoras.map(otherEntity => (
                                          <option value={otherEntity.id} key={otherEntity.id}>
                                            {otherEntity.tipo}
                                          </option>
                                        ))
                                      : null}
                                  </AvInput>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="tipoOperadora" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'unidade' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" for="operadora-unidade">
                                    <Translate contentKey="generadorApp.operadora.unidade">Unidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="12">
                                  <AvInput id="operadora-unidade" type="select" className="form-control" name="unidade">
                                    <option value="null" key="0">
                                      {translate('generadorApp.operadora.unidade.empty')}
                                    </option>
                                    {unidadeEasies
                                      ? unidadeEasies.map(otherEntity => (
                                          <option value={otherEntity.id} key={otherEntity.id}>
                                            {otherEntity.razaoSocial}
                                          </option>
                                        ))
                                      : null}
                                  </AvInput>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="unidade" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'nomeFantasia' ? (
                          <Col md="nomeFantasia">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="nomeFantasiaLabel" for="operadora-nomeFantasia">
                                    <Translate contentKey="generadorApp.operadora.nomeFantasia">Nome Fantasia</Translate>
                                  </Label>
                                </Col>
                                <Col md="12">
                                  <AvField id="operadora-nomeFantasia" type="text" name="nomeFantasia" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="nomeFantasia" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'razaoSocial' ? (
                          <Col md="razaoSocial">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="razaoSocialLabel" for="operadora-razaoSocial">
                                    <Translate contentKey="generadorApp.operadora.razaoSocial">Razao Social</Translate>
                                  </Label>
                                </Col>
                                <Col md="12">
                                  <AvField id="operadora-razaoSocial" type="text" name="razaoSocial" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="razaoSocial" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'endereco' ? (
                          <Col md="endereco">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="enderecoLabel" for="operadora-endereco">
                                    <Translate contentKey="generadorApp.operadora.endereco">Endereco</Translate>
                                  </Label>
                                </Col>
                                <Col md="12">
                                  <AvField id="operadora-endereco" type="text" name="endereco" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="endereco" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'cnpj' ? (
                          <Col md="cnpj">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="cnpjLabel" for="operadora-cnpj">
                                    <Translate contentKey="generadorApp.operadora.cnpj">Cnpj</Translate>
                                  </Label>
                                </Col>
                                <Col md="12">
                                  <AvField id="operadora-cnpj" type="text" name="cnpj" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cnpj" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'ie' ? (
                          <Col md="ie">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="ieLabel" for="operadora-ie">
                                    <Translate contentKey="generadorApp.operadora.ie">Ie</Translate>
                                  </Label>
                                </Col>
                                <Col md="12">
                                  <AvField id="operadora-ie" type="text" name="ie" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ie" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'site' ? (
                          <Col md="site">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="siteLabel" for="operadora-site">
                                    <Translate contentKey="generadorApp.operadora.site">Site</Translate>
                                  </Label>
                                </Col>
                                <Col md="12">
                                  <AvField id="operadora-site" type="text" name="site" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="site" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'contatoCentralAtendimento' ? (
                          <Col md="contatoCentralAtendimento">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="contatoCentralAtendimentoLabel" for="operadora-contatoCentralAtendimento">
                                    <Translate contentKey="generadorApp.operadora.contatoCentralAtendimento">
                                      Contato Central Atendimento
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="12">
                                  <AvField id="operadora-contatoCentralAtendimento" type="text" name="contatoCentralAtendimento" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="contatoCentralAtendimento" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'emailCentralAtendimento' ? (
                          <Col md="emailCentralAtendimento">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="emailCentralAtendimentoLabel" for="operadora-emailCentralAtendimento">
                                    <Translate contentKey="generadorApp.operadora.emailCentralAtendimento">
                                      Email Central Atendimento
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="12">
                                  <AvField id="operadora-emailCentralAtendimento" type="text" name="emailCentralAtendimento" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="emailCentralAtendimento" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'nomeContatoComercial' ? (
                          <Col md="nomeContatoComercial">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="nomeContatoComercialLabel" for="operadora-nomeContatoComercial">
                                    <Translate contentKey="generadorApp.operadora.nomeContatoComercial">Nome Contato Comercial</Translate>
                                  </Label>
                                </Col>
                                <Col md="12">
                                  <AvField id="operadora-nomeContatoComercial" type="text" name="nomeContatoComercial" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="nomeContatoComercial" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'contatoComercial' ? (
                          <Col md="contatoComercial">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="contatoComercialLabel" for="operadora-contatoComercial">
                                    <Translate contentKey="generadorApp.operadora.contatoComercial">Contato Comercial</Translate>
                                  </Label>
                                </Col>
                                <Col md="12">
                                  <AvField id="operadora-contatoComercial" type="text" name="contatoComercial" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="contatoComercial" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'emailComercial' ? (
                          <Col md="emailComercial">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="emailComercialLabel" for="operadora-emailComercial">
                                    <Translate contentKey="generadorApp.operadora.emailComercial">Email Comercial</Translate>
                                  </Label>
                                </Col>
                                <Col md="12">
                                  <AvField id="operadora-emailComercial" type="text" name="emailComercial" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="emailComercial" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'nomeContatoFinanceiro' ? (
                          <Col md="nomeContatoFinanceiro">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="nomeContatoFinanceiroLabel" for="operadora-nomeContatoFinanceiro">
                                    <Translate contentKey="generadorApp.operadora.nomeContatoFinanceiro">Nome Contato Financeiro</Translate>
                                  </Label>
                                </Col>
                                <Col md="12">
                                  <AvField id="operadora-nomeContatoFinanceiro" type="text" name="nomeContatoFinanceiro" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="nomeContatoFinanceiro" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'contatoFinanceiro' ? (
                          <Col md="contatoFinanceiro">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="contatoFinanceiroLabel" for="operadora-contatoFinanceiro">
                                    <Translate contentKey="generadorApp.operadora.contatoFinanceiro">Contato Financeiro</Translate>
                                  </Label>
                                </Col>
                                <Col md="12">
                                  <AvField id="operadora-contatoFinanceiro" type="text" name="contatoFinanceiro" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="contatoFinanceiro" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'emailFinanceiro' ? (
                          <Col md="emailFinanceiro">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="emailFinanceiroLabel" for="operadora-emailFinanceiro">
                                    <Translate contentKey="generadorApp.operadora.emailFinanceiro">Email Financeiro</Translate>
                                  </Label>
                                </Col>
                                <Col md="12">
                                  <AvField id="operadora-emailFinanceiro" type="text" name="emailFinanceiro" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="emailFinanceiro" value={this.state.fieldsBase[baseFilters]} />
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
  unidadeEasies: storeState.unidadeEasy.entities,
  tipoOperadoras: storeState.tipoOperadora.entities,
  operadoraEntity: storeState.operadora.entity,
  loading: storeState.operadora.loading,
  updating: storeState.operadora.updating,
  updateSuccess: storeState.operadora.updateSuccess
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getTipoOperadoras,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OperadoraUpdate);
