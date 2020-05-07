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
  ICidXPtaNovoUpdateState,
  getEntity,
  getCidXPtaNovoState,
  ICidXPtaNovoBaseState,
  updateEntity,
  createEntity,
  reset
} from './cid-x-pta-novo.reducer';
import { ICidXPtaNovo } from 'app/shared/model/cid-x-pta-novo.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICidXPtaNovoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CidXPtaNovoUpdate extends React.Component<ICidXPtaNovoUpdateProps, ICidXPtaNovoUpdateState> {
  constructor(props: Readonly<ICidXPtaNovoUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getCidXPtaNovoState(this.props.location),
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
      (fieldsBase['complexidade'] ? '&complexidade=' + fieldsBase['complexidade'] : '') +
      (fieldsBase['versao'] ? '&versao=' + fieldsBase['versao'] : '') +
      (fieldsBase['score'] ? '&score=' + fieldsBase['score'] : '') +
      (fieldsBase['titulo'] ? '&titulo=' + fieldsBase['titulo'] : '') +
      ''
    );
  };
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
    this.props.history.push('/cid-x-pta-novo?' + this.getFiltersURL());
  };

  render() {
    const { cidXPtaNovoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
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
                  ...cidXPtaNovoEntity
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
                <Button
                  tag={Link}
                  id="cancel-save"
                  to={'/cid-x-pta-novo?' + this.getFiltersURL()}
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
                      <Row>
                        {baseFilters !== 'complexidade' ? (
                          <Col md="complexidade">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="complexidadeLabel" for="cid-x-pta-novo-complexidade">
                                    <Translate contentKey="generadorApp.cidXPtaNovo.complexidade">Complexidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="cid-x-pta-novo-complexidade" type="text" name="complexidade" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="complexidade" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'versao' ? (
                          <Col md="versao">
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
                        ) : (
                          <AvInput type="hidden" name="versao" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'score' ? (
                          <Col md="score">
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
                        ) : (
                          <AvInput type="hidden" name="score" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'titulo' ? (
                          <Col md="titulo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="tituloLabel" for="cid-x-pta-novo-titulo">
                                    <Translate contentKey="generadorApp.cidXPtaNovo.titulo">Titulo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="cid-x-pta-novo-titulo" type="text" name="titulo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="titulo" value={this.state.fieldsBase[baseFilters]} />
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
  cidXPtaNovoEntity: storeState.cidXPtaNovo.entity,
  loading: storeState.cidXPtaNovo.loading,
  updating: storeState.cidXPtaNovo.updating,
  updateSuccess: storeState.cidXPtaNovo.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CidXPtaNovoUpdate);
