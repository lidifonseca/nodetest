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

import { ICategoriaAtividade } from 'app/shared/model/categoria-atividade.model';
import { getEntities as getCategoriaAtividades } from 'app/entities/categoria-atividade/categoria-atividade.reducer';
import { IAtendimento } from 'app/shared/model/atendimento.model';
import { getEntities as getAtendimentos } from 'app/entities/atendimento/atendimento.reducer';
import {
  IAtendimentoAtividadesUpdateState,
  getEntity,
  getAtendimentoAtividadesState,
  IAtendimentoAtividadesBaseState,
  updateEntity,
  createEntity,
  reset
} from './atendimento-atividades.reducer';
import { IAtendimentoAtividades } from 'app/shared/model/atendimento-atividades.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAtendimentoAtividadesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AtendimentoAtividadesUpdate extends React.Component<IAtendimentoAtividadesUpdateProps, IAtendimentoAtividadesUpdateState> {
  constructor(props: Readonly<IAtendimentoAtividadesUpdateProps>) {
    super(props);

    this.state = {
      categoriaAtividadeSelectValue: null,
      atendimentoSelectValue: null,
      fieldsBase: getAtendimentoAtividadesState(this.props.location),
      atividadeId: '0',
      atendimentoId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }

    if (
      nextProps.categoriaAtividades.length > 0 &&
      this.state.categoriaAtividadeSelectValue === null &&
      nextProps.atendimentoAtividadesEntity.categoriaAtividade &&
      nextProps.atendimentoAtividadesEntity.categoriaAtividade.id
    ) {
      this.setState({
        categoriaAtividadeSelectValue: nextProps.categoriaAtividades.map(p =>
          nextProps.atendimentoAtividadesEntity.categoriaAtividade.id === p.id ? { value: p.id, label: p.id } : null
        )
      });
    }

    if (
      nextProps.atendimentos.length > 0 &&
      this.state.atendimentoSelectValue === null &&
      nextProps.atendimentoAtividadesEntity.atendimento &&
      nextProps.atendimentoAtividadesEntity.atendimento.id
    ) {
      this.setState({
        atendimentoSelectValue: nextProps.atendimentos.map(p =>
          nextProps.atendimentoAtividadesEntity.atendimento.id === p.id ? { value: p.id, label: p.id } : null
        )
      });
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCategoriaAtividades();
    this.props.getAtendimentos();
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
    if (errors.length === 0) {
      const { atendimentoAtividadesEntity } = this.props;
      const entity = {
        ...atendimentoAtividadesEntity,
        categoriaAtividade: this.state.categoriaAtividadeSelectValue ? this.state.categoriaAtividadeSelectValue['value'] : null,
        atendimento: this.state.atendimentoSelectValue ? this.state.atendimentoSelectValue['value'] : null,
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
    this.props.history.push('/atendimento-atividades?' + this.getFiltersURL());
  };

  render() {
    const { atendimentoAtividadesEntity, categoriaAtividades, atendimentos, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...atendimentoAtividadesEntity,
                  atividade: atendimentoAtividadesEntity.atividade ? atendimentoAtividadesEntity.atividade.id : null,
                  atendimento: atendimentoAtividadesEntity.atendimento ? atendimentoAtividadesEntity.atendimento.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.atendimentoAtividades.home.createOrEditLabel">
                Create or edit a AtendimentoAtividades
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
              to={'/atendimento-atividades?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Atendimento Atividades</li>
            <li className="breadcrumb-item active">Atendimento Atividades edit</li>
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
                        <Label className="mt-2" for="atendimento-atividades-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput id="atendimento-atividades-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'feito' ? (
                          <Col md="feito">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="feitoLabel" for="atendimento-atividades-feito">
                                    <Translate contentKey="generadorApp.atendimentoAtividades.feito">Feito</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="atendimento-atividades-feito" type="string" className="form-control" name="feito" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="feito" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'atividade' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="atendimento-atividades-atividade">
                                    <Translate contentKey="generadorApp.atendimentoAtividades.atividade">Atividade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="atendimento-atividades-atividade"
                                    className={'css-select-control'}
                                    value={this.state.categoriaAtividadeSelectValue}
                                    options={
                                      categoriaAtividades
                                        ? categoriaAtividades.map(option => ({ value: option.id, label: option.id }))
                                        : null
                                    }
                                    onChange={options => this.setState({ categoriaAtividadeSelectValue: options })}
                                    name={'atividade'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="atividade" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'atendimento' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="atendimento-atividades-atendimento">
                                    <Translate contentKey="generadorApp.atendimentoAtividades.atendimento">Atendimento</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="atendimento-atividades-atendimento"
                                    className={'css-select-control'}
                                    value={this.state.atendimentoSelectValue}
                                    options={atendimentos ? atendimentos.map(option => ({ value: option.id, label: option.id })) : null}
                                    onChange={options => this.setState({ atendimentoSelectValue: options })}
                                    name={'atendimento'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="atendimento" value={this.state.fieldsBase[baseFilters]} />
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
  categoriaAtividades: storeState.categoriaAtividade.entities,
  atendimentos: storeState.atendimento.entities,
  atendimentoAtividadesEntity: storeState.atendimentoAtividades.entity,
  loading: storeState.atendimentoAtividades.loading,
  updating: storeState.atendimentoAtividades.updating,
  updateSuccess: storeState.atendimentoAtividades.updateSuccess
});

const mapDispatchToProps = {
  getCategoriaAtividades,
  getAtendimentos,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AtendimentoAtividadesUpdate);
