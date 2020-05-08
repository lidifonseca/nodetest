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
  IFilesPanicoUpdateState,
  getEntity,
  getFilesPanicoState,
  IFilesPanicoBaseState,
  updateEntity,
  createEntity,
  reset
} from './files-panico.reducer';
import { IFilesPanico } from 'app/shared/model/files-panico.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFilesPanicoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FilesPanicoUpdate extends React.Component<IFilesPanicoUpdateProps, IFilesPanicoUpdateState> {
  constructor(props: Readonly<IFilesPanicoUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getFilesPanicoState(this.props.location),
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
    values.criadoEm = convertDateTimeToServer(values.criadoEm);

    if (errors.length === 0) {
      const { filesPanicoEntity } = this.props;
      const entity = {
        ...filesPanicoEntity,

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
    this.props.history.push('/files-panico?' + this.getFiltersURL());
  };

  render() {
    const { filesPanicoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...filesPanicoEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.filesPanico.home.createOrEditLabel">Create or edit a FilesPanico</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/files-panico?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Files Panicos</li>
            <li className="breadcrumb-item active">Files Panicos edit</li>
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
                      <Label className="mt-2" for="files-panico-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="files-panico-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <IdPanicoComponentUpdate baseFilters />

                        <IdPacienteComponentUpdate baseFilters />

                        <TipoComponentUpdate baseFilters />

                        <ImagemComponentUpdate baseFilters />

                        <CriadoEmComponentUpdate baseFilters />
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
  filesPanicoEntity: storeState.filesPanico.entity,
  loading: storeState.filesPanico.loading,
  updating: storeState.filesPanico.updating,
  updateSuccess: storeState.filesPanico.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const IdPanicoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'idPanico' ? (
    <Col md="idPanico">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="idPanicoLabel" for="files-panico-idPanico">
              <Translate contentKey="generadorApp.filesPanico.idPanico">Id Panico</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="files-panico-idPanico" type="string" className="form-control" name="idPanico" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="idPanico" value={this.state.fieldsBase[baseFilters]} />
  );
};

const IdPacienteComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'idPaciente' ? (
    <Col md="idPaciente">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="idPacienteLabel" for="files-panico-idPaciente">
              <Translate contentKey="generadorApp.filesPanico.idPaciente">Id Paciente</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="files-panico-idPaciente" type="string" className="form-control" name="idPaciente" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="idPaciente" value={this.state.fieldsBase[baseFilters]} />
  );
};

const TipoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'tipo' ? (
    <Col md="tipo">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="tipoLabel" for="files-panico-tipo">
              <Translate contentKey="generadorApp.filesPanico.tipo">Tipo</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="files-panico-tipo" type="text" name="tipo" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="tipo" value={this.state.fieldsBase[baseFilters]} />
  );
};

const ImagemComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'imagem' ? (
    <Col md="imagem">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="imagemLabel" for="files-panico-imagem">
              <Translate contentKey="generadorApp.filesPanico.imagem">Imagem</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="files-panico-imagem" type="text" name="imagem" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="imagem" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CriadoEmComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'criadoEm' ? (
    <Col md="criadoEm">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="criadoEmLabel" for="files-panico-criadoEm">
              <Translate contentKey="generadorApp.filesPanico.criadoEm">Criado Em</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvInput
              id="files-panico-criadoEm"
              type="datetime-local"
              className="form-control"
              name="criadoEm"
              placeholder={'YYYY-MM-DD HH:mm'}
              value={isNew ? null : convertDateTimeFromServer(this.props.filesPanicoEntity.criadoEm)}
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
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FilesPanicoUpdate);
