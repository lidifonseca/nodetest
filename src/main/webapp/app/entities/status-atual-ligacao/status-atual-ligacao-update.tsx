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
  IStatusAtualLigacaoUpdateState,
  getEntity,
  getStatusAtualLigacaoState,
  IStatusAtualLigacaoBaseState,
  updateEntity,
  createEntity,
  reset
} from './status-atual-ligacao.reducer';
import { IStatusAtualLigacao } from 'app/shared/model/status-atual-ligacao.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IStatusAtualLigacaoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class StatusAtualLigacaoUpdate extends React.Component<IStatusAtualLigacaoUpdateProps, IStatusAtualLigacaoUpdateState> {
  constructor(props: Readonly<IStatusAtualLigacaoUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getStatusAtualLigacaoState(this.props.location),
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
      const { statusAtualLigacaoEntity } = this.props;
      const entity = {
        ...statusAtualLigacaoEntity,

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
    this.props.history.push('/status-atual-ligacao?' + this.getFiltersURL());
  };

  render() {
    const { statusAtualLigacaoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...statusAtualLigacaoEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.statusAtualLigacao.home.createOrEditLabel">Create or edit a StatusAtualLigacao</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/status-atual-ligacao?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Status Atual Ligacaos</li>
            <li className="breadcrumb-item active">Status Atual Ligacaos edit</li>
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
                      <Label className="mt-2" for="status-atual-ligacao-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="status-atual-ligacao-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <StatusAtualLigacaoComponentUpdate baseFilters />

                        <StyleLabelComponentUpdate baseFilters />
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
  statusAtualLigacaoEntity: storeState.statusAtualLigacao.entity,
  loading: storeState.statusAtualLigacao.loading,
  updating: storeState.statusAtualLigacao.updating,
  updateSuccess: storeState.statusAtualLigacao.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const StatusAtualLigacaoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'statusAtualLigacao' ? (
    <Col md="statusAtualLigacao">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="statusAtualLigacaoLabel" for="status-atual-ligacao-statusAtualLigacao">
              <Translate contentKey="generadorApp.statusAtualLigacao.statusAtualLigacao">Status Atual Ligacao</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="status-atual-ligacao-statusAtualLigacao" type="text" name="statusAtualLigacao" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="statusAtualLigacao" value={this.state.fieldsBase[baseFilters]} />
  );
};

const StyleLabelComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'styleLabel' ? (
    <Col md="styleLabel">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="styleLabelLabel" for="status-atual-ligacao-styleLabel">
              <Translate contentKey="generadorApp.statusAtualLigacao.styleLabel">Style Label</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="status-atual-ligacao-styleLabel" type="text" name="styleLabel" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="styleLabel" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(StatusAtualLigacaoUpdate);
