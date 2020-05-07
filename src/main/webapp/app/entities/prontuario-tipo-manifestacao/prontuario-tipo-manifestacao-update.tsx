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
  IProntuarioTipoManifestacaoUpdateState,
  getEntity,
  getProntuarioTipoManifestacaoState,
  IProntuarioTipoManifestacaoBaseState,
  updateEntity,
  createEntity,
  reset
} from './prontuario-tipo-manifestacao.reducer';
import { IProntuarioTipoManifestacao } from 'app/shared/model/prontuario-tipo-manifestacao.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProntuarioTipoManifestacaoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProntuarioTipoManifestacaoUpdate extends React.Component<
  IProntuarioTipoManifestacaoUpdateProps,
  IProntuarioTipoManifestacaoUpdateState
> {
  constructor(props: Readonly<IProntuarioTipoManifestacaoUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getProntuarioTipoManifestacaoState(this.props.location),
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
      (fieldsBase['nome'] ? '&nome=' + fieldsBase['nome'] : '') +
      (fieldsBase['idPai'] ? '&idPai=' + fieldsBase['idPai'] : '') +
      (fieldsBase['ativo'] ? '&ativo=' + fieldsBase['ativo'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { prontuarioTipoManifestacaoEntity } = this.props;
      const entity = {
        ...prontuarioTipoManifestacaoEntity,
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
    this.props.history.push('/prontuario-tipo-manifestacao?' + this.getFiltersURL());
  };

  render() {
    const { prontuarioTipoManifestacaoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Prontuario Tipo Manifestacaos</li>
          <li className="breadcrumb-item active">Prontuario Tipo Manifestacaos edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...prontuarioTipoManifestacaoEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.prontuarioTipoManifestacao.home.createOrEditLabel">
                    Create or edit a ProntuarioTipoManifestacao
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
                  to={'/prontuario-tipo-manifestacao?' + this.getFiltersURL()}
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
                      <Label className="mt-2" for="prontuario-tipo-manifestacao-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput
                                id="prontuario-tipo-manifestacao-id"
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
                        {baseFilters !== 'nome' ? (
                          <Col md="nome">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="nomeLabel" for="prontuario-tipo-manifestacao-nome">
                                    <Translate contentKey="generadorApp.prontuarioTipoManifestacao.nome">Nome</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="prontuario-tipo-manifestacao-nome" type="text" name="nome" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="nome" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'idPai' ? (
                          <Col md="idPai">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idPaiLabel" for="prontuario-tipo-manifestacao-idPai">
                                    <Translate contentKey="generadorApp.prontuarioTipoManifestacao.idPai">Id Pai</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="prontuario-tipo-manifestacao-idPai" type="string" className="form-control" name="idPai" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idPai" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'ativo' ? (
                          <Col md="ativo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="ativoLabel" for="prontuario-tipo-manifestacao-ativo">
                                    <Translate contentKey="generadorApp.prontuarioTipoManifestacao.ativo">Ativo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="prontuario-tipo-manifestacao-ativo" type="string" className="form-control" name="ativo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
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
  prontuarioTipoManifestacaoEntity: storeState.prontuarioTipoManifestacao.entity,
  loading: storeState.prontuarioTipoManifestacao.loading,
  updating: storeState.prontuarioTipoManifestacao.updating,
  updateSuccess: storeState.prontuarioTipoManifestacao.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProntuarioTipoManifestacaoUpdate);
