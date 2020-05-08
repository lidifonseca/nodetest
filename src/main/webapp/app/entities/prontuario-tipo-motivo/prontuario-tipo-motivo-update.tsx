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
  IProntuarioTipoMotivoUpdateState,
  getEntity,
  getProntuarioTipoMotivoState,
  IProntuarioTipoMotivoBaseState,
  updateEntity,
  createEntity,
  reset
} from './prontuario-tipo-motivo.reducer';
import { IProntuarioTipoMotivo } from 'app/shared/model/prontuario-tipo-motivo.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProntuarioTipoMotivoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProntuarioTipoMotivoUpdate extends React.Component<IProntuarioTipoMotivoUpdateProps, IProntuarioTipoMotivoUpdateState> {
  constructor(props: Readonly<IProntuarioTipoMotivoUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getProntuarioTipoMotivoState(this.props.location),
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
      const { prontuarioTipoMotivoEntity } = this.props;
      const entity = {
        ...prontuarioTipoMotivoEntity,

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
    this.props.history.push('/prontuario-tipo-motivo?' + this.getFiltersURL());
  };

  render() {
    const { prontuarioTipoMotivoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...prontuarioTipoMotivoEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.prontuarioTipoMotivo.home.createOrEditLabel">
                Create or edit a ProntuarioTipoMotivo
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
              to={'/prontuario-tipo-motivo?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Prontuario Tipo Motivos</li>
            <li className="breadcrumb-item active">Prontuario Tipo Motivos edit</li>
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
                      <Label className="mt-2" for="prontuario-tipo-motivo-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="prontuario-tipo-motivo-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <NomeComponentUpdate baseFilters />

                        <IdPaiComponentUpdate baseFilters />

                        <AtivoComponentUpdate baseFilters />

                        <ClasseComponentUpdate baseFilters />

                        <NameComponentUpdate baseFilters />

                        <IdTipoProntuarioComponentUpdate baseFilters />
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
  prontuarioTipoMotivoEntity: storeState.prontuarioTipoMotivo.entity,
  loading: storeState.prontuarioTipoMotivo.loading,
  updating: storeState.prontuarioTipoMotivo.updating,
  updateSuccess: storeState.prontuarioTipoMotivo.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const NomeComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'nome' ? (
    <Col md="nome">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="nomeLabel" for="prontuario-tipo-motivo-nome">
              <Translate contentKey="generadorApp.prontuarioTipoMotivo.nome">Nome</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="prontuario-tipo-motivo-nome" type="text" name="nome" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="nome" value={this.state.fieldsBase[baseFilters]} />
  );
};

const IdPaiComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'idPai' ? (
    <Col md="idPai">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="idPaiLabel" for="prontuario-tipo-motivo-idPai">
              <Translate contentKey="generadorApp.prontuarioTipoMotivo.idPai">Id Pai</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="prontuario-tipo-motivo-idPai" type="string" className="form-control" name="idPai" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="idPai" value={this.state.fieldsBase[baseFilters]} />
  );
};

const AtivoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ativo' ? (
    <Col md="ativo">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="ativoLabel" for="prontuario-tipo-motivo-ativo">
              <Translate contentKey="generadorApp.prontuarioTipoMotivo.ativo">Ativo</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="prontuario-tipo-motivo-ativo" type="string" className="form-control" name="ativo" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
  );
};

const ClasseComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'classe' ? (
    <Col md="classe">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="classeLabel" for="prontuario-tipo-motivo-classe">
              <Translate contentKey="generadorApp.prontuarioTipoMotivo.classe">Classe</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="prontuario-tipo-motivo-classe" type="text" name="classe" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="classe" value={this.state.fieldsBase[baseFilters]} />
  );
};

const NameComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'name' ? (
    <Col md="name">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="nameLabel" for="prontuario-tipo-motivo-name">
              <Translate contentKey="generadorApp.prontuarioTipoMotivo.name">Name</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="prontuario-tipo-motivo-name" type="text" name="name" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="name" value={this.state.fieldsBase[baseFilters]} />
  );
};

const IdTipoProntuarioComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'idTipoProntuario' ? (
    <Col md="idTipoProntuario">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="idTipoProntuarioLabel" for="prontuario-tipo-motivo-idTipoProntuario">
              <Translate contentKey="generadorApp.prontuarioTipoMotivo.idTipoProntuario">Id Tipo Prontuario</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="prontuario-tipo-motivo-idTipoProntuario" type="string" className="form-control" name="idTipoProntuario" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="idTipoProntuario" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProntuarioTipoMotivoUpdate);
