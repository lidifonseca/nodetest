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

import {
  IProfissionalAreaAtuacaoNewUpdateState,
  getEntity,
  getProfissionalAreaAtuacaoNewState,
  IProfissionalAreaAtuacaoNewBaseState,
  updateEntity,
  createEntity,
  reset
} from './profissional-area-atuacao-new.reducer';
import { IProfissionalAreaAtuacaoNew } from 'app/shared/model/profissional-area-atuacao-new.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProfissionalAreaAtuacaoNewUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProfissionalAreaAtuacaoNewUpdate extends React.Component<
  IProfissionalAreaAtuacaoNewUpdateProps,
  IProfissionalAreaAtuacaoNewUpdateState
> {
  constructor(props: Readonly<IProfissionalAreaAtuacaoNewUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getProfissionalAreaAtuacaoNewState(this.props.location),
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
    let url = '_back=1' + (offset !== null ? '&offset=' + offset : '');
    Object.keys(fieldsBase).map(key => {
      url += '&' + key + '=' + fieldsBase[key];
    });
    return url;
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { profissionalAreaAtuacaoNewEntity } = this.props;
      const entity = {
        ...profissionalAreaAtuacaoNewEntity,

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
    this.props.history.push('/profissional-area-atuacao-new?' + this.getFiltersURL());
  };

  render() {
    const { profissionalAreaAtuacaoNewEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...profissionalAreaAtuacaoNewEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.profissionalAreaAtuacaoNew.home.createOrEditLabel">
                Create or edit a ProfissionalAreaAtuacaoNew
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
              to={'/profissional-area-atuacao-new?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Profissional Area Atuacao News</li>
            <li className="breadcrumb-item active">Profissional Area Atuacao News edit</li>
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
                        <Label className="mt-2" for="profissional-area-atuacao-new-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput
                                id="profissional-area-atuacao-new-id"
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
                      <Row>
                        {baseFilters !== 'idProfissional' ? (
                          <Col md="idProfissional">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idProfissionalLabel" for="profissional-area-atuacao-new-idProfissional">
                                    <Translate contentKey="generadorApp.profissionalAreaAtuacaoNew.idProfissional">
                                      Id Profissional
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-area-atuacao-new-idProfissional" type="text" name="idProfissional" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idProfissional" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'cepArea' ? (
                          <Col md="cepArea">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="cepAreaLabel" for="profissional-area-atuacao-new-cepArea">
                                    <Translate contentKey="generadorApp.profissionalAreaAtuacaoNew.cepArea">Cep Area</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-area-atuacao-new-cepArea" type="text" name="cepArea" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cepArea" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'cepFim' ? (
                          <Col md="cepFim">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="cepFimLabel" for="profissional-area-atuacao-new-cepFim">
                                    <Translate contentKey="generadorApp.profissionalAreaAtuacaoNew.cepFim">Cep Fim</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-area-atuacao-new-cepFim" type="text" name="cepFim" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cepFim" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ativo' ? (
                          <Col md="ativo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="ativoLabel" for="profissional-area-atuacao-new-ativo">
                                    <Translate contentKey="generadorApp.profissionalAreaAtuacaoNew.ativo">Ativo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-area-atuacao-new-ativo" type="string" className="form-control" name="ativo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'cepIni' ? (
                          <Col md="cepIni">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="cepIniLabel" for="profissional-area-atuacao-new-cepIni">
                                    <Translate contentKey="generadorApp.profissionalAreaAtuacaoNew.cepIni">Cep Ini</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-area-atuacao-new-cepIni" type="text" name="cepIni" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cepIni" value={this.state.fieldsBase[baseFilters]} />
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
  profissionalAreaAtuacaoNewEntity: storeState.profissionalAreaAtuacaoNew.entity,
  loading: storeState.profissionalAreaAtuacaoNew.loading,
  updating: storeState.profissionalAreaAtuacaoNew.updating,
  updateSuccess: storeState.profissionalAreaAtuacaoNew.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalAreaAtuacaoNewUpdate);
