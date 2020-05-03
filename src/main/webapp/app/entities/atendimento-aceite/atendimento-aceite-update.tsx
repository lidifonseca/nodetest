import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProfissional } from 'app/shared/model/profissional.model';
import { getEntities as getProfissionals } from 'app/entities/profissional/profissional.reducer';
import { IAtendimento } from 'app/shared/model/atendimento.model';
import { getEntities as getAtendimentos } from 'app/entities/atendimento/atendimento.reducer';
import { getEntity, updateEntity, createEntity, reset } from './atendimento-aceite.reducer';
import { IAtendimentoAceite } from 'app/shared/model/atendimento-aceite.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAtendimentoAceiteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAtendimentoAceiteUpdateState {
  isNew: boolean;
  idProfissionalId: string;
  idAtendimentoId: string;
}

export class AtendimentoAceiteUpdate extends React.Component<IAtendimentoAceiteUpdateProps, IAtendimentoAceiteUpdateState> {
  constructor(props: Readonly<IAtendimentoAceiteUpdateProps>) {
    super(props);
    this.state = {
      idProfissionalId: '0',
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

    this.props.getProfissionals();
    this.props.getAtendimentos();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { atendimentoAceiteEntity } = this.props;
      const entity = {
        ...atendimentoAceiteEntity,
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
    this.props.history.push('/atendimento-aceite');
  };

  render() {
    const { atendimentoAceiteEntity, profissionals, atendimentos, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Atendimento Aceites</li>
          <li className="breadcrumb-item active">Atendimento Aceites edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...atendimentoAceiteEntity,
                  idProfissional: atendimentoAceiteEntity.idProfissional ? atendimentoAceiteEntity.idProfissional.id : null,
                  idAtendimento: atendimentoAceiteEntity.idAtendimento ? atendimentoAceiteEntity.idAtendimento.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.atendimentoAceite.home.createOrEditLabel">
                    Create or edit a AtendimentoAceite
                  </Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/atendimento-aceite" replace color="info" className="float-right jh-create-entity">
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
                      <Label className="mt-2" for="atendimento-aceite-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="atendimento-aceite-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="msgPushLabel" for="atendimento-aceite-msgPush">
                                <Translate contentKey="generadorApp.atendimentoAceite.msgPush">Msg Push</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="atendimento-aceite-msgPush"
                                type="text"
                                name="msgPush"
                                validate={{
                                  maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
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
                              <Label className="mt-2" for="atendimento-aceite-idProfissional">
                                <Translate contentKey="generadorApp.atendimentoAceite.idProfissional">Id Profissional</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="atendimento-aceite-idProfissional" type="select" className="form-control" name="idProfissional">
                                <option value="null" key="0">
                                  {translate('generadorApp.atendimentoAceite.idProfissional.empty')}
                                </option>
                                {profissionals
                                  ? profissionals.map(otherEntity => (
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
                              <Label className="mt-2" for="atendimento-aceite-idAtendimento">
                                <Translate contentKey="generadorApp.atendimentoAceite.idAtendimento">Id Atendimento</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="atendimento-aceite-idAtendimento" type="select" className="form-control" name="idAtendimento">
                                <option value="null" key="0">
                                  {translate('generadorApp.atendimentoAceite.idAtendimento.empty')}
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
  profissionals: storeState.profissional.entities,
  atendimentos: storeState.atendimento.entities,
  atendimentoAceiteEntity: storeState.atendimentoAceite.entity,
  loading: storeState.atendimentoAceite.loading,
  updating: storeState.atendimentoAceite.updating,
  updateSuccess: storeState.atendimentoAceite.updateSuccess
});

const mapDispatchToProps = {
  getProfissionals,
  getAtendimentos,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AtendimentoAceiteUpdate);
