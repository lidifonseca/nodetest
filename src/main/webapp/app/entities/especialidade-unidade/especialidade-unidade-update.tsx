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
import {
  IEspecialidadeUnidadeUpdateState,
  getEntity,
  getEspecialidadeUnidadeState,
  IEspecialidadeUnidadeBaseState,
  updateEntity,
  createEntity,
  reset
} from './especialidade-unidade.reducer';
import { IEspecialidadeUnidade } from 'app/shared/model/especialidade-unidade.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEspecialidadeUnidadeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EspecialidadeUnidadeUpdate extends React.Component<IEspecialidadeUnidadeUpdateProps, IEspecialidadeUnidadeUpdateState> {
  constructor(props: Readonly<IEspecialidadeUnidadeUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getEspecialidadeUnidadeState(this.props.location),
      unidadeId: '0',
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
      (fieldsBase['valorBaixaUrg'] ? '&valorBaixaUrg=' + fieldsBase['valorBaixaUrg'] : '') +
      (fieldsBase['valorAltaUrg'] ? '&valorAltaUrg=' + fieldsBase['valorAltaUrg'] : '') +
      (fieldsBase['valorPagar'] ? '&valorPagar=' + fieldsBase['valorPagar'] : '') +
      (fieldsBase['publicar'] ? '&publicar=' + fieldsBase['publicar'] : '') +
      (fieldsBase['comentarioPreco'] ? '&comentarioPreco=' + fieldsBase['comentarioPreco'] : '') +
      (fieldsBase['unidade'] ? '&unidade=' + fieldsBase['unidade'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { especialidadeUnidadeEntity } = this.props;
      const entity = {
        ...especialidadeUnidadeEntity,
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
    this.props.history.push('/especialidade-unidade?' + this.getFiltersURL());
  };

  render() {
    const { especialidadeUnidadeEntity, unidadeEasies, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Especialidade Unidades</li>
          <li className="breadcrumb-item active">Especialidade Unidades edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...especialidadeUnidadeEntity,
                  unidade: especialidadeUnidadeEntity.unidade ? especialidadeUnidadeEntity.unidade.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.especialidadeUnidade.home.createOrEditLabel">
                    Create or edit a EspecialidadeUnidade
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
                  to={'/especialidade-unidade?' + this.getFiltersURL()}
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
                      <Label className="mt-2" for="especialidade-unidade-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="especialidade-unidade-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'valorBaixaUrg' ? (
                          <Col md="valorBaixaUrg">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="valorBaixaUrgLabel" for="especialidade-unidade-valorBaixaUrg">
                                    <Translate contentKey="generadorApp.especialidadeUnidade.valorBaixaUrg">Valor Baixa Urg</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="especialidade-unidade-valorBaixaUrg"
                                    type="string"
                                    className="form-control"
                                    name="valorBaixaUrg"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="valorBaixaUrg" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'valorAltaUrg' ? (
                          <Col md="valorAltaUrg">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="valorAltaUrgLabel" for="especialidade-unidade-valorAltaUrg">
                                    <Translate contentKey="generadorApp.especialidadeUnidade.valorAltaUrg">Valor Alta Urg</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="especialidade-unidade-valorAltaUrg"
                                    type="string"
                                    className="form-control"
                                    name="valorAltaUrg"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="valorAltaUrg" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'valorPagar' ? (
                          <Col md="valorPagar">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="valorPagarLabel" for="especialidade-unidade-valorPagar">
                                    <Translate contentKey="generadorApp.especialidadeUnidade.valorPagar">Valor Pagar</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="especialidade-unidade-valorPagar" type="string" className="form-control" name="valorPagar" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="valorPagar" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'publicar' ? (
                          <Col md="publicar">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="publicarLabel" for="especialidade-unidade-publicar">
                                    <Translate contentKey="generadorApp.especialidadeUnidade.publicar">Publicar</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="especialidade-unidade-publicar" type="string" className="form-control" name="publicar" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="publicar" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'comentarioPreco' ? (
                          <Col md="comentarioPreco">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="comentarioPrecoLabel" for="especialidade-unidade-comentarioPreco">
                                    <Translate contentKey="generadorApp.especialidadeUnidade.comentarioPreco">Comentario Preco</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="especialidade-unidade-comentarioPreco" type="text" name="comentarioPreco" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="comentarioPreco" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'unidade' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="especialidade-unidade-unidade">
                                    <Translate contentKey="generadorApp.especialidadeUnidade.unidade">Unidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="especialidade-unidade-unidade" type="select" className="form-control" name="unidade">
                                    <option value="null" key="0">
                                      {translate('generadorApp.especialidadeUnidade.unidade.empty')}
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
  especialidadeUnidadeEntity: storeState.especialidadeUnidade.entity,
  loading: storeState.especialidadeUnidade.loading,
  updating: storeState.especialidadeUnidade.updating,
  updateSuccess: storeState.especialidadeUnidade.updateSuccess
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EspecialidadeUnidadeUpdate);
