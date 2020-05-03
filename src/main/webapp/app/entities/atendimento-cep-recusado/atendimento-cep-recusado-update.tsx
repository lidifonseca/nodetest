import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPadItem } from 'app/shared/model/pad-item.model';
import { getEntities as getPadItems } from 'app/entities/pad-item/pad-item.reducer';
import { getEntity, updateEntity, createEntity, reset } from './atendimento-cep-recusado.reducer';
import { IAtendimentoCepRecusado } from 'app/shared/model/atendimento-cep-recusado.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAtendimentoCepRecusadoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAtendimentoCepRecusadoUpdateState {
  isNew: boolean;
  idPadItemId: string;
}

export class AtendimentoCepRecusadoUpdate extends React.Component<IAtendimentoCepRecusadoUpdateProps, IAtendimentoCepRecusadoUpdateState> {
  constructor(props: Readonly<IAtendimentoCepRecusadoUpdateProps>) {
    super(props);
    this.state = {
      idPadItemId: '0',
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

    this.props.getPadItems();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { atendimentoCepRecusadoEntity } = this.props;
      const entity = {
        ...atendimentoCepRecusadoEntity,
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
    this.props.history.push('/atendimento-cep-recusado');
  };

  render() {
    const { atendimentoCepRecusadoEntity, padItems, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Atendimento Cep Recusados</li>
          <li className="breadcrumb-item active">Atendimento Cep Recusados edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...atendimentoCepRecusadoEntity,
                  idPadItem: atendimentoCepRecusadoEntity.idPadItem ? atendimentoCepRecusadoEntity.idPadItem.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.atendimentoCepRecusado.home.createOrEditLabel">
                    Create or edit a AtendimentoCepRecusado
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
                  to="/atendimento-cep-recusado"
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
                      <Label className="mt-2" for="atendimento-cep-recusado-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput
                                id="atendimento-cep-recusado-id"
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
                              <Label className="mt-2" id="cepLabel" for="atendimento-cep-recusado-cep">
                                <Translate contentKey="generadorApp.atendimentoCepRecusado.cep">Cep</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="atendimento-cep-recusado-cep"
                                type="text"
                                name="cep"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
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
                              <Label className="mt-2" for="atendimento-cep-recusado-idPadItem">
                                <Translate contentKey="generadorApp.atendimentoCepRecusado.idPadItem">Id Pad Item</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="atendimento-cep-recusado-idPadItem" type="select" className="form-control" name="idPadItem">
                                <option value="null" key="0">
                                  {translate('generadorApp.atendimentoCepRecusado.idPadItem.empty')}
                                </option>
                                {padItems
                                  ? padItems.map(otherEntity => (
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
  padItems: storeState.padItem.entities,
  atendimentoCepRecusadoEntity: storeState.atendimentoCepRecusado.entity,
  loading: storeState.atendimentoCepRecusado.loading,
  updating: storeState.atendimentoCepRecusado.updating,
  updateSuccess: storeState.atendimentoCepRecusado.updateSuccess
});

const mapDispatchToProps = {
  getPadItems,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AtendimentoCepRecusadoUpdate);
