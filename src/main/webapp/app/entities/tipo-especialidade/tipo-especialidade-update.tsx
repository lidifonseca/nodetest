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
  ITipoEspecialidadeUpdateState,
  getEntity,
  getTipoEspecialidadeState,
  ITipoEspecialidadeBaseState,
  updateEntity,
  createEntity,
  reset
} from './tipo-especialidade.reducer';
import { ITipoEspecialidade } from 'app/shared/model/tipo-especialidade.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITipoEspecialidadeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TipoEspecialidadeUpdate extends React.Component<ITipoEspecialidadeUpdateProps, ITipoEspecialidadeUpdateState> {
  constructor(props: Readonly<ITipoEspecialidadeUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getTipoEspecialidadeState(this.props.location),
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
      const { tipoEspecialidadeEntity } = this.props;
      const entity = {
        ...tipoEspecialidadeEntity,

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
    this.props.history.push('/tipo-especialidade?' + this.getFiltersURL());
  };

  render() {
    const { tipoEspecialidadeEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...tipoEspecialidadeEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.tipoEspecialidade.home.createOrEditLabel">Create or edit a TipoEspecialidade</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/tipo-especialidade?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Tipo Especialidades</li>
            <li className="breadcrumb-item active">Tipo Especialidades edit</li>
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
                      <Label className="mt-2" for="tipo-especialidade-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="tipo-especialidade-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <TipoEspecialidadeComponentUpdate baseFilters />

                        <EspecialidadeComponentUpdate baseFilter especialidades />
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
  tipoEspecialidadeEntity: storeState.tipoEspecialidade.entity,
  loading: storeState.tipoEspecialidade.loading,
  updating: storeState.tipoEspecialidade.updating,
  updateSuccess: storeState.tipoEspecialidade.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const TipoEspecialidadeComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'tipoEspecialidade' ? (
    <Col md="tipoEspecialidade">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="tipoEspecialidadeLabel" for="tipo-especialidade-tipoEspecialidade">
              <Translate contentKey="generadorApp.tipoEspecialidade.tipoEspecialidade">Tipo Especialidade</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="tipo-especialidade-tipoEspecialidade" type="text" name="tipoEspecialidade" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="tipoEspecialidade" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EspecialidadeComponentUpdate = ({ baseFilters, especialidades }) => {
  return baseFilters !== 'especialidade' ? (
    <Col md="12"></Col>
  ) : (
    <AvInput type="hidden" name="especialidade" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TipoEspecialidadeUpdate);
