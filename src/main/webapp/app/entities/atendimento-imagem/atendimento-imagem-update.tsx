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
  IAtendimentoImagemUpdateState,
  getEntity,
  getAtendimentoImagemState,
  IAtendimentoImagemBaseState,
  updateEntity,
  createEntity,
  reset
} from './atendimento-imagem.reducer';
import { IAtendimentoImagem } from 'app/shared/model/atendimento-imagem.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAtendimentoImagemUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AtendimentoImagemUpdate extends React.Component<IAtendimentoImagemUpdateProps, IAtendimentoImagemUpdateState> {
  constructor(props: Readonly<IAtendimentoImagemUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getAtendimentoImagemState(this.props.location),
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
      (fieldsBase['atendimentoId'] ? '&atendimentoId=' + fieldsBase['atendimentoId'] : '') +
      (fieldsBase['imagem'] ? '&imagem=' + fieldsBase['imagem'] : '') +
      (fieldsBase['criadoEm'] ? '&criadoEm=' + fieldsBase['criadoEm'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    values.criadoEm = convertDateTimeToServer(values.criadoEm);

    if (errors.length === 0) {
      const { atendimentoImagemEntity } = this.props;
      const entity = {
        ...atendimentoImagemEntity,
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
    this.props.history.push('/atendimento-imagem?' + this.getFiltersURL());
  };

  render() {
    const { atendimentoImagemEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Atendimento Imagems</li>
          <li className="breadcrumb-item active">Atendimento Imagems edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...atendimentoImagemEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.atendimentoImagem.home.createOrEditLabel">
                    Create or edit a AtendimentoImagem
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
                  to={'/atendimento-imagem?' + this.getFiltersURL()}
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
                      <Label className="mt-2" for="atendimento-imagem-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="atendimento-imagem-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'atendimentoId' ? (
                          <Col md="atendimentoId">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="atendimentoIdLabel" for="atendimento-imagem-atendimentoId">
                                    <Translate contentKey="generadorApp.atendimentoImagem.atendimentoId">Atendimento Id</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="atendimento-imagem-atendimentoId"
                                    type="string"
                                    className="form-control"
                                    name="atendimentoId"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="atendimentoId" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'imagem' ? (
                          <Col md="imagem">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="imagemLabel" for="atendimento-imagem-imagem">
                                    <Translate contentKey="generadorApp.atendimentoImagem.imagem">Imagem</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="atendimento-imagem-imagem" type="text" name="imagem" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="imagem" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'criadoEm' ? (
                          <Col md="criadoEm">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="criadoEmLabel" for="atendimento-imagem-criadoEm">
                                    <Translate contentKey="generadorApp.atendimentoImagem.criadoEm">Criado Em</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput
                                    id="atendimento-imagem-criadoEm"
                                    type="datetime-local"
                                    className="form-control"
                                    name="criadoEm"
                                    placeholder={'YYYY-MM-DD HH:mm'}
                                    value={isNew ? null : convertDateTimeFromServer(this.props.atendimentoImagemEntity.criadoEm)}
                                    validate={{
                                      required: { value: true, errorMessage: translate('entity.validation.required') }
                                    }}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="criadoEm" value={this.state.fieldsBase[baseFilters]} />
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
  atendimentoImagemEntity: storeState.atendimentoImagem.entity,
  loading: storeState.atendimentoImagem.loading,
  updating: storeState.atendimentoImagem.updating,
  updateSuccess: storeState.atendimentoImagem.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AtendimentoImagemUpdate);
