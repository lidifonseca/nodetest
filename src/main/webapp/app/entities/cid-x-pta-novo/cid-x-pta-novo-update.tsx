import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntities as getCidXPtaNovos } from 'app/entities/cid-x-pta-novo/cid-x-pta-novo.reducer';
import { ICid } from 'app/shared/model/cid.model';
import { getEntities as getCids } from 'app/entities/cid/cid.reducer';
import { getEntity, updateEntity, createEntity, reset } from './cid-x-pta-novo.reducer';
import { ICidXPtaNovo } from 'app/shared/model/cid-x-pta-novo.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICidXPtaNovoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICidXPtaNovoUpdateState {
  isNew: boolean;
  cidXPtaNovoId: string;
  cidXPtaNovoIdId: string;
  cidIdId: string;
}

export class CidXPtaNovoUpdate extends React.Component<ICidXPtaNovoUpdateProps, ICidXPtaNovoUpdateState> {
  constructor(props: Readonly<ICidXPtaNovoUpdateProps>) {
    super(props);
    this.state = {
      cidXPtaNovoId: '0',
      cidXPtaNovoIdId: '0',
      cidIdId: '0',
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

    this.props.getCidXPtaNovos();
    this.props.getCids();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { cidXPtaNovoEntity } = this.props;
      const entity = {
        ...cidXPtaNovoEntity,
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
    this.props.history.push('/cid-x-pta-novo');
  };

  render() {
    const { cidXPtaNovoEntity, cidXPtaNovos, cids, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Cid X Pta Novos</li>
          <li className="breadcrumb-item active">Cid X Pta Novos edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...cidXPtaNovoEntity,
                  cidXPtaNovo: cidXPtaNovoEntity.cidXPtaNovo ? cidXPtaNovoEntity.cidXPtaNovo.id : null,
                  cidXPtaNovoId: cidXPtaNovoEntity.cidXPtaNovoId ? cidXPtaNovoEntity.cidXPtaNovoId.id : null,
                  cidId: cidXPtaNovoEntity.cidId ? cidXPtaNovoEntity.cidId.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.cidXPtaNovo.home.createOrEditLabel">Create or edit a CidXPtaNovo</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/cid-x-pta-novo" replace color="info" className="float-right jh-create-entity">
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
                      <Label className="mt-2" for="cid-x-pta-novo-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="cid-x-pta-novo-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="complexidadeLabel" for="cid-x-pta-novo-complexidade">
                                <Translate contentKey="generadorApp.cidXPtaNovo.complexidade">Complexidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="cid-x-pta-novo-complexidade"
                                type="text"
                                name="complexidade"
                                validate={{
                                  maxLength: { value: 45, errorMessage: translate('entity.validation.maxlength', { max: 45 }) }
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
                              <Label className="mt-2" id="versaoLabel" for="cid-x-pta-novo-versao">
                                <Translate contentKey="generadorApp.cidXPtaNovo.versao">Versao</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="cid-x-pta-novo-versao" type="string" className="form-control" name="versao" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="scoreLabel" for="cid-x-pta-novo-score">
                                <Translate contentKey="generadorApp.cidXPtaNovo.score">Score</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="cid-x-pta-novo-score" type="string" className="form-control" name="score" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="tituloLabel" for="cid-x-pta-novo-titulo">
                                <Translate contentKey="generadorApp.cidXPtaNovo.titulo">Titulo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="cid-x-pta-novo-titulo"
                                type="text"
                                name="titulo"
                                validate={{
                                  maxLength: { value: 245, errorMessage: translate('entity.validation.maxlength', { max: 245 }) }
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
                              <Label className="mt-2" for="cid-x-pta-novo-cidId">
                                <Translate contentKey="generadorApp.cidXPtaNovo.cidId">Cid Id</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="cid-x-pta-novo-cidId" type="select" className="form-control" name="cidId">
                                <option value="null" key="0">
                                  {translate('generadorApp.cidXPtaNovo.cidId.empty')}
                                </option>
                                {cids
                                  ? cids.map(otherEntity => (
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
                              <Label className="mt-2" for="cid-x-pta-novo-cidXPtaNovoId">
                                <Translate contentKey="generadorApp.cidXPtaNovo.cidXPtaNovoId">Cid X Pta Novo Id</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="cid-x-pta-novo-cidXPtaNovoId" type="select" className="form-control" name="cidXPtaNovoId">
                                <option value="null" key="0">
                                  {translate('generadorApp.cidXPtaNovo.cidXPtaNovoId.empty')}
                                </option>
                                {cidXPtaNovos
                                  ? cidXPtaNovos.map(otherEntity => (
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
  cidXPtaNovos: storeState.cidXPtaNovo.entities,
  cids: storeState.cid.entities,
  cidXPtaNovoEntity: storeState.cidXPtaNovo.entity,
  loading: storeState.cidXPtaNovo.loading,
  updating: storeState.cidXPtaNovo.updating,
  updateSuccess: storeState.cidXPtaNovo.updateSuccess
});

const mapDispatchToProps = {
  getCidXPtaNovos,
  getCids,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CidXPtaNovoUpdate);
