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
  IPadItemAtividadeUpdateState,
  getEntity,
  getPadItemAtividadeState,
  IPadItemAtividadeBaseState,
  updateEntity,
  createEntity,
  reset
} from './pad-item-atividade.reducer';
import { IPadItemAtividade } from 'app/shared/model/pad-item-atividade.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPadItemAtividadeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PadItemAtividadeUpdate extends React.Component<IPadItemAtividadeUpdateProps, IPadItemAtividadeUpdateState> {
  constructor(props: Readonly<IPadItemAtividadeUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getPadItemAtividadeState(this.props.location),
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
      const { padItemAtividadeEntity } = this.props;
      const entity = {
        ...padItemAtividadeEntity,

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
    this.props.history.push('/pad-item-atividade?' + this.getFiltersURL());
  };

  render() {
    const { padItemAtividadeEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...padItemAtividadeEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.padItemAtividade.home.createOrEditLabel">Create or edit a PadItemAtividade</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/pad-item-atividade?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Pad Item Atividades</li>
            <li className="breadcrumb-item active">Pad Item Atividades edit</li>
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
                      <Label className="mt-2" for="pad-item-atividade-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="pad-item-atividade-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <DataInicioComponentUpdate baseFilters />

                        <DataFimComponentUpdate baseFilters />
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
  padItemAtividadeEntity: storeState.padItemAtividade.entity,
  loading: storeState.padItemAtividade.loading,
  updating: storeState.padItemAtividade.updating,
  updateSuccess: storeState.padItemAtividade.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const DataInicioComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'dataInicio' ? (
    <Col md="dataInicio">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="dataInicioLabel" for="pad-item-atividade-dataInicio">
              <Translate contentKey="generadorApp.padItemAtividade.dataInicio">Data Inicio</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-item-atividade-dataInicio" type="date" className="form-control" name="dataInicio" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="dataInicio" value={this.state.fieldsBase[baseFilters]} />
  );
};

const DataFimComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'dataFim' ? (
    <Col md="dataFim">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="dataFimLabel" for="pad-item-atividade-dataFim">
              <Translate contentKey="generadorApp.padItemAtividade.dataFim">Data Fim</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-item-atividade-dataFim" type="date" className="form-control" name="dataFim" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="dataFim" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PadItemAtividadeUpdate);
