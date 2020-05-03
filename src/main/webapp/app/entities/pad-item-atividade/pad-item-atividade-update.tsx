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
import { IPadItem } from 'app/shared/model/pad-item.model';
import { getEntities as getPadItems } from 'app/entities/pad-item/pad-item.reducer';
import { getEntity, updateEntity, createEntity, reset } from './pad-item-atividade.reducer';
import { IPadItemAtividade } from 'app/shared/model/pad-item-atividade.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPadItemAtividadeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPadItemAtividadeUpdateState {
  isNew: boolean;
  idAtividadeId: string;
  idPadItemId: string;
}

export class PadItemAtividadeUpdate extends React.Component<IPadItemAtividadeUpdateProps, IPadItemAtividadeUpdateState> {
  constructor(props: Readonly<IPadItemAtividadeUpdateProps>) {
    super(props);
    this.state = {
      idAtividadeId: '0',
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

    this.props.getCategoriaAtividades();
    this.props.getPadItems();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    values.dataPost = convertDateTimeToServer(values.dataPost);

    if (errors.length === 0) {
      const { padItemAtividadeEntity } = this.props;
      const entity = {
        ...padItemAtividadeEntity,
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
    this.props.history.push('/pad-item-atividade');
  };

  render() {
    const { padItemAtividadeEntity, categoriaAtividades, padItems, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Item Atividades</li>
          <li className="breadcrumb-item active">Pad Item Atividades edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...padItemAtividadeEntity,
                  idAtividade: padItemAtividadeEntity.idAtividade ? padItemAtividadeEntity.idAtividade.id : null,
                  idPadItem: padItemAtividadeEntity.idPadItem ? padItemAtividadeEntity.idPadItem.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.padItemAtividade.home.createOrEditLabel">Create or edit a PadItemAtividade</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/pad-item-atividade" replace color="info" className="float-right jh-create-entity">
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
                      <Label className="mt-2" for="pad-item-atividade-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="pad-item-atividade-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="dataInicioLabel" for="pad-item-atividade-dataInicio">
                                <Translate contentKey="generadorApp.padItemAtividade.dataInicio">Data Inicio</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="pad-item-atividade-dataInicio" type="date" className="form-control" name="dataInicio" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="dataFimLabel" for="pad-item-atividade-dataFim">
                                <Translate contentKey="generadorApp.padItemAtividade.dataFim">Data Fim</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="pad-item-atividade-dataFim" type="date" className="form-control" name="dataFim" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="dataPostLabel" for="pad-item-atividade-dataPost">
                                <Translate contentKey="generadorApp.padItemAtividade.dataPost">Data Post</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="pad-item-atividade-dataPost"
                                type="datetime-local"
                                className="form-control"
                                name="dataPost"
                                placeholder={'YYYY-MM-DD HH:mm'}
                                value={isNew ? null : convertDateTimeFromServer(this.props.padItemAtividadeEntity.dataPost)}
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') }
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
                              <Label className="mt-2" for="pad-item-atividade-idAtividade">
                                <Translate contentKey="generadorApp.padItemAtividade.idAtividade">Id Atividade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="pad-item-atividade-idAtividade" type="select" className="form-control" name="idAtividade">
                                <option value="null" key="0">
                                  {translate('generadorApp.padItemAtividade.idAtividade.empty')}
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
                              <Label className="mt-2" for="pad-item-atividade-idPadItem">
                                <Translate contentKey="generadorApp.padItemAtividade.idPadItem">Id Pad Item</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="pad-item-atividade-idPadItem" type="select" className="form-control" name="idPadItem">
                                <option value="null" key="0">
                                  {translate('generadorApp.padItemAtividade.idPadItem.empty')}
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
  categoriaAtividades: storeState.categoriaAtividade.entities,
  padItems: storeState.padItem.entities,
  padItemAtividadeEntity: storeState.padItemAtividade.entity,
  loading: storeState.padItemAtividade.loading,
  updating: storeState.padItemAtividade.updating,
  updateSuccess: storeState.padItemAtividade.updateSuccess
});

const mapDispatchToProps = {
  getCategoriaAtividades,
  getPadItems,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadItemAtividadeUpdate);
