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
  IUsuarioStatusAtualUpdateState,
  getEntity,
  getUsuarioStatusAtualState,
  IUsuarioStatusAtualBaseState,
  updateEntity,
  createEntity,
  reset
} from './usuario-status-atual.reducer';
import { IUsuarioStatusAtual } from 'app/shared/model/usuario-status-atual.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUsuarioStatusAtualUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class UsuarioStatusAtualUpdate extends React.Component<IUsuarioStatusAtualUpdateProps, IUsuarioStatusAtualUpdateState> {
  constructor(props: Readonly<IUsuarioStatusAtualUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getUsuarioStatusAtualState(this.props.location),
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
      const { usuarioStatusAtualEntity } = this.props;
      const entity = {
        ...usuarioStatusAtualEntity,

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
    this.props.history.push('/usuario-status-atual?' + this.getFiltersURL());
  };

  render() {
    const { usuarioStatusAtualEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...usuarioStatusAtualEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.usuarioStatusAtual.home.createOrEditLabel">Create or edit a UsuarioStatusAtual</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/usuario-status-atual?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Usuario Status Atuals</li>
            <li className="breadcrumb-item active">Usuario Status Atuals edit</li>
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
                      <Label className="mt-2" for="usuario-status-atual-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="usuario-status-atual-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <StatusAtualComponentUpdate baseFilters />

                        <ObsComponentUpdate baseFilters />

                        <AtivoComponentUpdate baseFilters />
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
  usuarioStatusAtualEntity: storeState.usuarioStatusAtual.entity,
  loading: storeState.usuarioStatusAtual.loading,
  updating: storeState.usuarioStatusAtual.updating,
  updateSuccess: storeState.usuarioStatusAtual.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const StatusAtualComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'statusAtual' ? (
    <Col md="statusAtual">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="statusAtualLabel" for="usuario-status-atual-statusAtual">
              <Translate contentKey="generadorApp.usuarioStatusAtual.statusAtual">Status Atual</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="usuario-status-atual-statusAtual" type="string" className="form-control" name="statusAtual" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="statusAtual" value={this.state.fieldsBase[baseFilters]} />
  );
};

const ObsComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'obs' ? (
    <Col md="obs">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="obsLabel" for="usuario-status-atual-obs">
              <Translate contentKey="generadorApp.usuarioStatusAtual.obs">Obs</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="usuario-status-atual-obs" type="text" name="obs" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="obs" value={this.state.fieldsBase[baseFilters]} />
  );
};

const AtivoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ativo' ? (
    <Col md="ativo">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="ativoLabel" for="usuario-status-atual-ativo">
              <Translate contentKey="generadorApp.usuarioStatusAtual.ativo">Ativo</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="usuario-status-atual-ativo" type="string" className="form-control" name="ativo" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UsuarioStatusAtualUpdate);
