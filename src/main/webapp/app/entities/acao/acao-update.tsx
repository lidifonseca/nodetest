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

import { IAcaoUpdateState, getEntity, getAcaoState, IAcaoBaseState, updateEntity, createEntity, reset } from './acao.reducer';
import { IAcao } from 'app/shared/model/acao.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAcaoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AcaoUpdate extends React.Component<IAcaoUpdateProps, IAcaoUpdateState> {
  constructor(props: Readonly<IAcaoUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getAcaoState(this.props.location),
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
      const { acaoEntity } = this.props;
      const entity = {
        ...acaoEntity,

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
    this.props.history.push('/acao?' + this.getFiltersURL());
  };

  render() {
    const { acaoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...acaoEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.acao.home.createOrEditLabel">Create or edit a Acao</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/acao?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Acaos</li>
            <li className="breadcrumb-item active">Acaos edit</li>
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
                      <Label className="mt-2" for="acao-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="acao-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <AcaoComponentUpdate baseFilters />

                        <LogUserComponentUpdate baseFilter logUsers />

                        <LogUserFranquiaComponentUpdate baseFilter logUserFranquias />

                        <UsuarioAcaoComponentUpdate baseFilter usuarioAcaos />
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
  acaoEntity: storeState.acao.entity,
  loading: storeState.acao.loading,
  updating: storeState.acao.updating,
  updateSuccess: storeState.acao.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const AcaoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'acao' ? (
    <Col md="acao">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="acaoLabel" for="acao-acao">
              <Translate contentKey="generadorApp.acao.acao">Acao</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="acao-acao" type="text" name="acao" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="acao" value={this.state.fieldsBase[baseFilters]} />
  );
};

const LogUserComponentUpdate = ({ baseFilters, logUsers }) => {
  return baseFilters !== 'logUser' ? (
    <Col md="12"></Col>
  ) : (
    <AvInput type="hidden" name="logUser" value={this.state.fieldsBase[baseFilters]} />
  );
};

const LogUserFranquiaComponentUpdate = ({ baseFilters, logUserFranquias }) => {
  return baseFilters !== 'logUserFranquia' ? (
    <Col md="12"></Col>
  ) : (
    <AvInput type="hidden" name="logUserFranquia" value={this.state.fieldsBase[baseFilters]} />
  );
};

const UsuarioAcaoComponentUpdate = ({ baseFilters, usuarioAcaos }) => {
  return baseFilters !== 'usuarioAcao' ? (
    <Col md="12"></Col>
  ) : (
    <AvInput type="hidden" name="usuarioAcao" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AcaoUpdate);
