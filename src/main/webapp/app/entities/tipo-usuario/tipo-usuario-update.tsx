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
  ITipoUsuarioUpdateState,
  getEntity,
  getTipoUsuarioState,
  ITipoUsuarioBaseState,
  updateEntity,
  createEntity,
  reset
} from './tipo-usuario.reducer';
import { ITipoUsuario } from 'app/shared/model/tipo-usuario.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITipoUsuarioUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TipoUsuarioUpdate extends React.Component<ITipoUsuarioUpdateProps, ITipoUsuarioUpdateState> {
  constructor(props: Readonly<ITipoUsuarioUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getTipoUsuarioState(this.props.location),
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
      const { tipoUsuarioEntity } = this.props;
      const entity = {
        ...tipoUsuarioEntity,

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
    this.props.history.push('/tipo-usuario?' + this.getFiltersURL());
  };

  render() {
    const { tipoUsuarioEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...tipoUsuarioEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.tipoUsuario.home.createOrEditLabel">Create or edit a TipoUsuario</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/tipo-usuario?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Tipo Usuarios</li>
            <li className="breadcrumb-item active">Tipo Usuarios edit</li>
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
                      <Label className="mt-2" for="tipo-usuario-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="tipo-usuario-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <TipoUsuarioComponentUpdate baseFilters />

                        <AtivoComponentUpdate baseFilters />

                        <UsuarioComponentUpdate baseFilter usuarios />
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
  tipoUsuarioEntity: storeState.tipoUsuario.entity,
  loading: storeState.tipoUsuario.loading,
  updating: storeState.tipoUsuario.updating,
  updateSuccess: storeState.tipoUsuario.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const TipoUsuarioComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'tipoUsuario' ? (
    <Col md="tipoUsuario">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="tipoUsuarioLabel" for="tipo-usuario-tipoUsuario">
              <Translate contentKey="generadorApp.tipoUsuario.tipoUsuario">Tipo Usuario</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="tipo-usuario-tipoUsuario" type="text" name="tipoUsuario" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="tipoUsuario" value={this.state.fieldsBase[baseFilters]} />
  );
};

const AtivoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ativo' ? (
    <Col md="ativo">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="ativoLabel" for="tipo-usuario-ativo">
              <Translate contentKey="generadorApp.tipoUsuario.ativo">Ativo</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="tipo-usuario-ativo" type="string" className="form-control" name="ativo" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
  );
};

const UsuarioComponentUpdate = ({ baseFilters, usuarios }) => {
  return baseFilters !== 'usuario' ? (
    <Col md="12"></Col>
  ) : (
    <AvInput type="hidden" name="usuario" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TipoUsuarioUpdate);
