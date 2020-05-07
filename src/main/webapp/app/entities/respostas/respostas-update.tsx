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
  IRespostasUpdateState,
  getEntity,
  getRespostasState,
  IRespostasBaseState,
  updateEntity,
  createEntity,
  reset
} from './respostas.reducer';
import { IRespostas } from 'app/shared/model/respostas.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRespostasUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class RespostasUpdate extends React.Component<IRespostasUpdateProps, IRespostasUpdateState> {
  constructor(props: Readonly<IRespostasUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getRespostasState(this.props.location),
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
      (fieldsBase['resposta'] ? '&resposta=' + fieldsBase['resposta'] : '') +
      (fieldsBase['pontuacao'] ? '&pontuacao=' + fieldsBase['pontuacao'] : '') +
      (fieldsBase['respostaAtiva'] ? '&respostaAtiva=' + fieldsBase['respostaAtiva'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { respostasEntity } = this.props;
      const entity = {
        ...respostasEntity,
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
    this.props.history.push('/respostas?' + this.getFiltersURL());
  };

  render() {
    const { respostasEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Respostas</li>
          <li className="breadcrumb-item active">Respostas edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...respostasEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.respostas.home.createOrEditLabel">Create or edit a Respostas</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button
                  tag={Link}
                  id="cancel-save"
                  to={'/respostas?' + this.getFiltersURL()}
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
                      <Label className="mt-2" for="respostas-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="respostas-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'resposta' ? (
                          <Col md="resposta">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="respostaLabel" for="respostas-resposta">
                                    <Translate contentKey="generadorApp.respostas.resposta">Resposta</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="respostas-resposta" type="text" name="resposta" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="resposta" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'pontuacao' ? (
                          <Col md="pontuacao">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="pontuacaoLabel" for="respostas-pontuacao">
                                    <Translate contentKey="generadorApp.respostas.pontuacao">Pontuacao</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="respostas-pontuacao" type="string" className="form-control" name="pontuacao" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="pontuacao" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'respostaAtiva' ? (
                          <Col md="respostaAtiva">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="respostaAtivaLabel" check>
                                    <AvInput id="respostas-respostaAtiva" type="checkbox" className="form-control" name="respostaAtiva" />
                                    <Translate contentKey="generadorApp.respostas.respostaAtiva">Resposta Ativa</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="respostaAtiva" value={this.state.fieldsBase[baseFilters]} />
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
  respostasEntity: storeState.respostas.entity,
  loading: storeState.respostas.loading,
  updating: storeState.respostas.updating,
  updateSuccess: storeState.respostas.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RespostasUpdate);
