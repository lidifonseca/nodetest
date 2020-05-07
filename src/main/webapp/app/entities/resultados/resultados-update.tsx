import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import {
  IResultadosUpdateState,
  getEntity,
  getResultadosState,
  IResultadosBaseState,
  updateEntity,
  createEntity,
  reset
} from './resultados.reducer';
import { IResultados } from 'app/shared/model/resultados.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IResultadosUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ResultadosUpdate extends React.Component<IResultadosUpdateProps, IResultadosUpdateState> {
  constructor(props: Readonly<IResultadosUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getResultadosState(this.props.location),
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
    return (
      '_back=1' +
      (fieldsBase['baseFilters'] ? '&baseFilters=' + fieldsBase['baseFilters'] : '') +
      (fieldsBase['activePage'] ? '&page=' + fieldsBase['activePage'] : '') +
      (fieldsBase['itemsPerPage'] ? '&size=' + fieldsBase['itemsPerPage'] : '') +
      (fieldsBase['sort'] ? '&sort=' + (fieldsBase['sort'] + ',' + fieldsBase['order']) : '') +
      (offset !== null ? '&offset=' + offset : '') +
      (fieldsBase['objetivo'] ? '&objetivo=' + fieldsBase['objetivo'] : '') +
      (fieldsBase['valor'] ? '&valor=' + fieldsBase['valor'] : '') +
      (fieldsBase['prazo'] ? '&prazo=' + fieldsBase['prazo'] : '') +
      (fieldsBase['complemento'] ? '&complemento=' + fieldsBase['complemento'] : '') +
      (fieldsBase['dataCadastro'] ? '&dataCadastro=' + fieldsBase['dataCadastro'] : '') +
      (fieldsBase['dataVencimentoPrazo'] ? '&dataVencimentoPrazo=' + fieldsBase['dataVencimentoPrazo'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    values.dataCadastro = convertDateTimeToServer(values.dataCadastro);

    if (errors.length === 0) {
      const { resultadosEntity } = this.props;
      const entity = {
        ...resultadosEntity,
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
    this.props.history.push('/resultados?' + this.getFiltersURL());
  };

  render() {
    const { resultadosEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Resultados</li>
          <li className="breadcrumb-item active">Resultados edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...resultadosEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.resultados.home.createOrEditLabel">Create or edit a Resultados</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button
                  tag={Link}
                  id="cancel-save"
                  to={'/resultados?' + this.getFiltersURL()}
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
                      <Label className="mt-2" for="resultados-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="resultados-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'objetivo' ? (
                          <Col md="objetivo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="objetivoLabel" for="resultados-objetivo">
                                    <Translate contentKey="generadorApp.resultados.objetivo">Objetivo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="resultados-objetivo" type="text" name="objetivo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="objetivo" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'valor' ? (
                          <Col md="valor">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="valorLabel" for="resultados-valor">
                                    <Translate contentKey="generadorApp.resultados.valor">Valor</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="resultados-valor" type="text" name="valor" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="valor" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'prazo' ? (
                          <Col md="prazo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="prazoLabel" for="resultados-prazo">
                                    <Translate contentKey="generadorApp.resultados.prazo">Prazo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="resultados-prazo" type="text" name="prazo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="prazo" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'complemento' ? (
                          <Col md="complemento">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="complementoLabel" for="resultados-complemento">
                                    <Translate contentKey="generadorApp.resultados.complemento">Complemento</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="resultados-complemento" type="text" name="complemento" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="complemento" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'dataCadastro' ? (
                          <Col md="dataCadastro">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="dataCadastroLabel" for="resultados-dataCadastro">
                                    <Translate contentKey="generadorApp.resultados.dataCadastro">Data Cadastro</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput
                                    id="resultados-dataCadastro"
                                    type="datetime-local"
                                    className="form-control"
                                    name="dataCadastro"
                                    placeholder={'YYYY-MM-DD HH:mm'}
                                    value={isNew ? null : convertDateTimeFromServer(this.props.resultadosEntity.dataCadastro)}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="dataCadastro" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'dataVencimentoPrazo' ? (
                          <Col md="dataVencimentoPrazo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="dataVencimentoPrazoLabel" for="resultados-dataVencimentoPrazo">
                                    <Translate contentKey="generadorApp.resultados.dataVencimentoPrazo">Data Vencimento Prazo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="resultados-dataVencimentoPrazo"
                                    type="date"
                                    className="form-control"
                                    name="dataVencimentoPrazo"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="dataVencimentoPrazo" value={this.state.fieldsBase[baseFilters]} />
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
  resultadosEntity: storeState.resultados.entity,
  loading: storeState.resultados.loading,
  updating: storeState.resultados.updating,
  updateSuccess: storeState.resultados.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ResultadosUpdate);
