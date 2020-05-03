import React from 'react';
import { connect } from 'react-redux';
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
import { getEntity, updateEntity, createEntity, reset } from './atendimento-atividades.reducer';
import { IAtendimentoAtividades } from 'app/shared/model/atendimento-atividades.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAtendimentoAtividadesUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAtendimentoAtividadesUpdateState {
  isNew: boolean;
  idAtividadeId: string;
  idAtendimentoId: string;
}

export class AtendimentoAtividadesUpdate extends React.Component<IAtendimentoAtividadesUpdateProps, IAtendimentoAtividadesUpdateState> {
  constructor(props: Readonly<IAtendimentoAtividadesUpdateProps>) {
    super(props);
    this.state = {
      idAtividadeId: '0',
      idAtendimentoId: '0',
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

    this.props.getCategoriaAtividades();
    this.props.getAtendimentos();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { atendimentoAtividadesEntity } = this.props;
      const entity = {
        ...atendimentoAtividadesEntity,
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
    this.props.history.push('/atendimento-atividades');
  };

  render() {
    const { atendimentoAtividadesEntity, categoriaAtividades, atendimentos, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Atendimento Atividades</li>
          <li className="breadcrumb-item active">Atendimento Atividades edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...atendimentoAtividadesEntity,
                  idAtividade: atendimentoAtividadesEntity.idAtividade ? atendimentoAtividadesEntity.idAtividade.id : null,
                  idAtendimento: atendimentoAtividadesEntity.idAtendimento ? atendimentoAtividadesEntity.idAtendimento.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
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
                  to="/atendimento-atividades"
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

                      <Col md="12">
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
                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" for="atendimento-atividades-idAtividade">
                                <Translate contentKey="generadorApp.atendimentoAtividades.idAtividade">Id Atividade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="atendimento-atividades-idAtividade" type="select" className="form-control" name="idAtividade">
                                <option value="null" key="0">
                                  {translate('generadorApp.atendimentoAtividades.idAtividade.empty')}
                                </option>
                                {categoriaAtividades
                                  ? categoriaAtividades.map(otherEntity => (
                                      <option value={otherEntity.id} key={otherEntity.id}>
                                        {otherEntity.id}
                                      </option>
                                    ))
                                  : null}
                              </AvInput>
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" for="atendimento-atividades-idAtendimento">
                                <Translate contentKey="generadorApp.atendimentoAtividades.idAtendimento">Id Atendimento</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="atendimento-atividades-idAtendimento"
                                type="select"
                                className="form-control"
                                name="idAtendimento"
                              >
                                <option value="null" key="0">
                                  {translate('generadorApp.atendimentoAtividades.idAtendimento.empty')}
                                </option>
                                {atendimentos
                                  ? atendimentos.map(otherEntity => (
                                      <option value={otherEntity.id} key={otherEntity.id}>
                                        {otherEntity.id}
                                      </option>
                                    ))
                                  : null}
                              </AvInput>
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
