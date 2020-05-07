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
  IUnidadeEasyAreaAtuacaoUpdateState,
  getEntity,
  getUnidadeEasyAreaAtuacaoState,
  IUnidadeEasyAreaAtuacaoBaseState,
  updateEntity,
  createEntity,
  reset
} from './unidade-easy-area-atuacao.reducer';
import { IUnidadeEasyAreaAtuacao } from 'app/shared/model/unidade-easy-area-atuacao.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUnidadeEasyAreaAtuacaoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class UnidadeEasyAreaAtuacaoUpdate extends React.Component<IUnidadeEasyAreaAtuacaoUpdateProps, IUnidadeEasyAreaAtuacaoUpdateState> {
  constructor(props: Readonly<IUnidadeEasyAreaAtuacaoUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getUnidadeEasyAreaAtuacaoState(this.props.location),
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
      (fieldsBase['cepInicial'] ? '&cepInicial=' + fieldsBase['cepInicial'] : '') +
      (fieldsBase['cepFinal'] ? '&cepFinal=' + fieldsBase['cepFinal'] : '') +
      (fieldsBase['unidade'] ? '&unidade=' + fieldsBase['unidade'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { unidadeEasyAreaAtuacaoEntity } = this.props;
      const entity = {
        ...unidadeEasyAreaAtuacaoEntity,
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
    this.props.history.push('/unidade-easy-area-atuacao?' + this.getFiltersURL());
  };

  render() {
    const { unidadeEasyAreaAtuacaoEntity, unidadeEasies, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Unidade Easy Area Atuacaos</li>
          <li className="breadcrumb-item active">Unidade Easy Area Atuacaos edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...unidadeEasyAreaAtuacaoEntity,
                  unidade: unidadeEasyAreaAtuacaoEntity.unidade ? unidadeEasyAreaAtuacaoEntity.unidade.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.unidadeEasyAreaAtuacao.home.createOrEditLabel">
                    Create or edit a UnidadeEasyAreaAtuacao
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
                  to={'/unidade-easy-area-atuacao?' + this.getFiltersURL()}
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
                      <Label className="mt-2" for="unidade-easy-area-atuacao-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput
                                id="unidade-easy-area-atuacao-id"
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
                      <Row>
                        {baseFilters !== 'cepInicial' ? (
                          <Col md="cepInicial">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="cepInicialLabel" for="unidade-easy-area-atuacao-cepInicial">
                                    <Translate contentKey="generadorApp.unidadeEasyAreaAtuacao.cepInicial">Cep Inicial</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="unidade-easy-area-atuacao-cepInicial" type="text" name="cepInicial" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cepInicial" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'cepFinal' ? (
                          <Col md="cepFinal">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="cepFinalLabel" for="unidade-easy-area-atuacao-cepFinal">
                                    <Translate contentKey="generadorApp.unidadeEasyAreaAtuacao.cepFinal">Cep Final</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="unidade-easy-area-atuacao-cepFinal" type="text" name="cepFinal" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cepFinal" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'unidade' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="unidade-easy-area-atuacao-unidade">
                                    <Translate contentKey="generadorApp.unidadeEasyAreaAtuacao.unidade">Unidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="unidade-easy-area-atuacao-unidade" type="select" className="form-control" name="unidade">
                                    <option value="null" key="0">
                                      {translate('generadorApp.unidadeEasyAreaAtuacao.unidade.empty')}
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
  unidadeEasyAreaAtuacaoEntity: storeState.unidadeEasyAreaAtuacao.entity,
  loading: storeState.unidadeEasyAreaAtuacao.loading,
  updating: storeState.unidadeEasyAreaAtuacao.updating,
  updateSuccess: storeState.unidadeEasyAreaAtuacao.updateSuccess
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

export default connect(mapStateToProps, mapDispatchToProps)(UnidadeEasyAreaAtuacaoUpdate);
