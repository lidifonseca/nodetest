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
  IProfissionalComplexidadeAtualUpdateState,
  getEntity,
  getProfissionalComplexidadeAtualState,
  IProfissionalComplexidadeAtualBaseState,
  updateEntity,
  createEntity,
  reset
} from './profissional-complexidade-atual.reducer';
import { IProfissionalComplexidadeAtual } from 'app/shared/model/profissional-complexidade-atual.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProfissionalComplexidadeAtualUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProfissionalComplexidadeAtualUpdate extends React.Component<
  IProfissionalComplexidadeAtualUpdateProps,
  IProfissionalComplexidadeAtualUpdateState
> {
  constructor(props: Readonly<IProfissionalComplexidadeAtualUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getProfissionalComplexidadeAtualState(this.props.location),
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
      const { profissionalComplexidadeAtualEntity } = this.props;
      const entity = {
        ...profissionalComplexidadeAtualEntity,

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
    this.props.history.push('/profissional-complexidade-atual?' + this.getFiltersURL());
  };

  render() {
    const { profissionalComplexidadeAtualEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...profissionalComplexidadeAtualEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.profissionalComplexidadeAtual.home.createOrEditLabel">
                Create or edit a ProfissionalComplexidadeAtual
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
              to={'/profissional-complexidade-atual?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Profissional Complexidade Atuals</li>
            <li className="breadcrumb-item active">Profissional Complexidade Atuals edit</li>
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
                        <Label className="mt-2" for="profissional-complexidade-atual-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput
                                id="profissional-complexidade-atual-id"
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
                                  <Label className="mt-2" id="idProfissionalLabel" for="profissional-complexidade-atual-idProfissional">
                                    <Translate contentKey="generadorApp.profissionalComplexidadeAtual.idProfissional">
                                      Id Profissional
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="profissional-complexidade-atual-idProfissional"
                                    type="string"
                                    className="form-control"
                                    name="idProfissional"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idProfissional" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'baixa' ? (
                          <Col md="baixa">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="baixaLabel" for="profissional-complexidade-atual-baixa">
                                    <Translate contentKey="generadorApp.profissionalComplexidadeAtual.baixa">Baixa</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-complexidade-atual-baixa" type="string" className="form-control" name="baixa" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="baixa" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'media' ? (
                          <Col md="media">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="mediaLabel" for="profissional-complexidade-atual-media">
                                    <Translate contentKey="generadorApp.profissionalComplexidadeAtual.media">Media</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-complexidade-atual-media" type="string" className="form-control" name="media" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="media" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'alta' ? (
                          <Col md="alta">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="altaLabel" for="profissional-complexidade-atual-alta">
                                    <Translate contentKey="generadorApp.profissionalComplexidadeAtual.alta">Alta</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-complexidade-atual-alta" type="string" className="form-control" name="alta" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="alta" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ventilacaoMecanica' ? (
                          <Col md="ventilacaoMecanica">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label
                                    className="mt-2"
                                    id="ventilacaoMecanicaLabel"
                                    for="profissional-complexidade-atual-ventilacaoMecanica"
                                  >
                                    <Translate contentKey="generadorApp.profissionalComplexidadeAtual.ventilacaoMecanica">
                                      Ventilacao Mecanica
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="profissional-complexidade-atual-ventilacaoMecanica"
                                    type="string"
                                    className="form-control"
                                    name="ventilacaoMecanica"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ventilacaoMecanica" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'telemonitoramente' ? (
                          <Col md="telemonitoramente">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label
                                    className="mt-2"
                                    id="telemonitoramenteLabel"
                                    for="profissional-complexidade-atual-telemonitoramente"
                                  >
                                    <Translate contentKey="generadorApp.profissionalComplexidadeAtual.telemonitoramente">
                                      Telemonitoramente
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="profissional-complexidade-atual-telemonitoramente"
                                    type="string"
                                    className="form-control"
                                    name="telemonitoramente"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="telemonitoramente" value={this.state.fieldsBase[baseFilters]} />
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
  profissionalComplexidadeAtualEntity: storeState.profissionalComplexidadeAtual.entity,
  loading: storeState.profissionalComplexidadeAtual.loading,
  updating: storeState.profissionalComplexidadeAtual.updating,
  updateSuccess: storeState.profissionalComplexidadeAtual.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalComplexidadeAtualUpdate);
