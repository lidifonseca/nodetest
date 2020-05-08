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
  IFranquiaStatusAtualUpdateState,
  getEntity,
  getFranquiaStatusAtualState,
  IFranquiaStatusAtualBaseState,
  updateEntity,
  createEntity,
  reset
} from './franquia-status-atual.reducer';
import { IFranquiaStatusAtual } from 'app/shared/model/franquia-status-atual.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFranquiaStatusAtualUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FranquiaStatusAtualUpdate extends React.Component<IFranquiaStatusAtualUpdateProps, IFranquiaStatusAtualUpdateState> {
  constructor(props: Readonly<IFranquiaStatusAtualUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getFranquiaStatusAtualState(this.props.location),
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
      const { franquiaStatusAtualEntity } = this.props;
      const entity = {
        ...franquiaStatusAtualEntity,

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
    this.props.history.push('/franquia-status-atual?' + this.getFiltersURL());
  };

  render() {
    const { franquiaStatusAtualEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...franquiaStatusAtualEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.franquiaStatusAtual.home.createOrEditLabel">
                Create or edit a FranquiaStatusAtual
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
              to={'/franquia-status-atual?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Franquia Status Atuals</li>
            <li className="breadcrumb-item active">Franquia Status Atuals edit</li>
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
                      <Label className="mt-2" for="franquia-status-atual-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="franquia-status-atual-id" type="hidden" className="form-control" name="id" required readOnly />
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
  franquiaStatusAtualEntity: storeState.franquiaStatusAtual.entity,
  loading: storeState.franquiaStatusAtual.loading,
  updating: storeState.franquiaStatusAtual.updating,
  updateSuccess: storeState.franquiaStatusAtual.updateSuccess
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
            <Label className="mt-2" id="statusAtualLabel" for="franquia-status-atual-statusAtual">
              <Translate contentKey="generadorApp.franquiaStatusAtual.statusAtual">Status Atual</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="franquia-status-atual-statusAtual" type="string" className="form-control" name="statusAtual" />
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
            <Label className="mt-2" id="obsLabel" for="franquia-status-atual-obs">
              <Translate contentKey="generadorApp.franquiaStatusAtual.obs">Obs</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="franquia-status-atual-obs" type="text" name="obs" />
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
            <Label className="mt-2" id="ativoLabel" for="franquia-status-atual-ativo">
              <Translate contentKey="generadorApp.franquiaStatusAtual.ativo">Ativo</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="franquia-status-atual-ativo" type="string" className="form-control" name="ativo" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FranquiaStatusAtualUpdate);
