import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPadItem } from 'app/shared/model/pad-item.model';
import { getEntities as getPadItems } from 'app/entities/pad-item/pad-item.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './pad-item-resultado.reducer';
import { IPadItemResultado } from 'app/shared/model/pad-item-resultado.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPadItemResultadoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPadItemResultadoUpdateState {
  isNew: boolean;
  idPadItemId: string;
}

export class PadItemResultadoUpdate extends React.Component<IPadItemResultadoUpdateProps, IPadItemResultadoUpdateState> {
  constructor(props: Readonly<IPadItemResultadoUpdateProps>) {
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

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { padItemResultadoEntity } = this.props;
      const entity = {
        ...padItemResultadoEntity,
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
    this.props.history.push('/pad-item-resultado');
  };

  render() {
    const { padItemResultadoEntity, padItems, loading, updating } = this.props;
    const { isNew } = this.state;

    const { resultado } = padItemResultadoEntity;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Item Resultados</li>
          <li className="breadcrumb-item active">Pad Item Resultados edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...padItemResultadoEntity,
                  idPadItem: padItemResultadoEntity.idPadItem ? padItemResultadoEntity.idPadItem.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.padItemResultado.home.createOrEditLabel">Create or edit a PadItemResultado</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/pad-item-resultado" replace color="info" className="float-right jh-create-entity">
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
                      <Label className="mt-2" for="pad-item-resultado-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="pad-item-resultado-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="resultadoLabel" for="pad-item-resultado-resultado">
                                <Translate contentKey="generadorApp.padItemResultado.resultado">Resultado</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="pad-item-resultado-resultado" type="textarea" name="resultado" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="dataFimLabel" for="pad-item-resultado-dataFim">
                                <Translate contentKey="generadorApp.padItemResultado.dataFim">Data Fim</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="pad-item-resultado-dataFim" type="date" className="form-control" name="dataFim" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="12">
                              <Label className="mt-2" id="resultadoAnalisadoLabel" check>
                                <AvInput
                                  id="pad-item-resultado-resultadoAnalisado"
                                  type="checkbox"
                                  className="form-control"
                                  name="resultadoAnalisado"
                                />
                                <Translate contentKey="generadorApp.padItemResultado.resultadoAnalisado">Resultado Analisado</Translate>
                              </Label>
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="usuarioIdLabel" for="pad-item-resultado-usuarioId">
                                <Translate contentKey="generadorApp.padItemResultado.usuarioId">Usuario Id</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="pad-item-resultado-usuarioId" type="string" className="form-control" name="usuarioId" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>
                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" for="pad-item-resultado-idPadItem">
                                <Translate contentKey="generadorApp.padItemResultado.idPadItem">Id Pad Item</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="pad-item-resultado-idPadItem" type="select" className="form-control" name="idPadItem">
                                <option value="null" key="0">
                                  {translate('generadorApp.padItemResultado.idPadItem.empty')}
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
  padItemResultadoEntity: storeState.padItemResultado.entity,
  loading: storeState.padItemResultado.loading,
  updating: storeState.padItemResultado.updating,
  updateSuccess: storeState.padItemResultado.updateSuccess
});

const mapDispatchToProps = {
  getPadItems,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadItemResultadoUpdate);
