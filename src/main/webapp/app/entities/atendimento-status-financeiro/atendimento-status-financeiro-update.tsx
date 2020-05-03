import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './atendimento-status-financeiro.reducer';
import { IAtendimentoStatusFinanceiro } from 'app/shared/model/atendimento-status-financeiro.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAtendimentoStatusFinanceiroUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAtendimentoStatusFinanceiroUpdateState {
  isNew: boolean;
}

export class AtendimentoStatusFinanceiroUpdate extends React.Component<
  IAtendimentoStatusFinanceiroUpdateProps,
  IAtendimentoStatusFinanceiroUpdateState
> {
  constructor(props: Readonly<IAtendimentoStatusFinanceiroUpdateProps>) {
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
      const { atendimentoStatusFinanceiroEntity } = this.props;
      const entity = {
        ...atendimentoStatusFinanceiroEntity,
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
    this.props.history.push('/atendimento-status-financeiro');
  };

  render() {
    const { atendimentoStatusFinanceiroEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Atendimento Status Financeiros</li>
          <li className="breadcrumb-item active">Atendimento Status Financeiros edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...atendimentoStatusFinanceiroEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.atendimentoStatusFinanceiro.home.createOrEditLabel">
                    Create or edit a AtendimentoStatusFinanceiro
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
                  to="/atendimento-status-financeiro"
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
                      <Label className="mt-2" for="atendimento-status-financeiro-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput
                                id="atendimento-status-financeiro-id"
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
                              <Label className="mt-2" id="idAtendimentoLabel" for="atendimento-status-financeiro-idAtendimento">
                                <Translate contentKey="generadorApp.atendimentoStatusFinanceiro.idAtendimento">Id Atendimento</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="atendimento-status-financeiro-idAtendimento"
                                type="string"
                                className="form-control"
                                name="idAtendimento"
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
                              <Label className="mt-2" id="idStatusFinanceiroLabel" for="atendimento-status-financeiro-idStatusFinanceiro">
                                <Translate contentKey="generadorApp.atendimentoStatusFinanceiro.idStatusFinanceiro">
                                  Id Status Financeiro
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="atendimento-status-financeiro-idStatusFinanceiro"
                                type="string"
                                className="form-control"
                                name="idStatusFinanceiro"
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
                              <Label className="mt-2" id="idUsuarioLabel" for="atendimento-status-financeiro-idUsuario">
                                <Translate contentKey="generadorApp.atendimentoStatusFinanceiro.idUsuario">Id Usuario</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="atendimento-status-financeiro-idUsuario"
                                type="string"
                                className="form-control"
                                name="idUsuario"
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
  atendimentoStatusFinanceiroEntity: storeState.atendimentoStatusFinanceiro.entity,
  loading: storeState.atendimentoStatusFinanceiro.loading,
  updating: storeState.atendimentoStatusFinanceiro.updating,
  updateSuccess: storeState.atendimentoStatusFinanceiro.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AtendimentoStatusFinanceiroUpdate);
