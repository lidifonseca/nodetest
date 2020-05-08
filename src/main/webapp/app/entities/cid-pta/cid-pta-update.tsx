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

import { ICidPtaUpdateState, getEntity, getCidPtaState, ICidPtaBaseState, updateEntity, createEntity, reset } from './cid-pta.reducer';
import { ICidPta } from 'app/shared/model/cid-pta.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICidPtaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CidPtaUpdate extends React.Component<ICidPtaUpdateProps, ICidPtaUpdateState> {
  constructor(props: Readonly<ICidPtaUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getCidPtaState(this.props.location),
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
      const { cidPtaEntity } = this.props;
      const entity = {
        ...cidPtaEntity,

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
    this.props.history.push('/cid-pta?' + this.getFiltersURL());
  };

  render() {
    const { cidPtaEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...cidPtaEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.cidPta.home.createOrEditLabel">Create or edit a CidPta</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/cid-pta?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Cid Ptas</li>
            <li className="breadcrumb-item active">Cid Ptas edit</li>
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
                      <Label className="mt-2" for="cid-pta-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="cid-pta-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <IdDescPtaComponentUpdate baseFilters />

                        <IdCidComponentUpdate baseFilters />

                        <IdAtividadeComponentUpdate baseFilters />

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
  cidPtaEntity: storeState.cidPta.entity,
  loading: storeState.cidPta.loading,
  updating: storeState.cidPta.updating,
  updateSuccess: storeState.cidPta.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const IdDescPtaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'idDescPta' ? (
    <Col md="idDescPta">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="idDescPtaLabel" for="cid-pta-idDescPta">
              <Translate contentKey="generadorApp.cidPta.idDescPta">Id Desc Pta</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="cid-pta-idDescPta" type="string" className="form-control" name="idDescPta" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="idDescPta" value={this.state.fieldsBase[baseFilters]} />
  );
};

const IdCidComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'idCid' ? (
    <Col md="idCid">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="idCidLabel" for="cid-pta-idCid">
              <Translate contentKey="generadorApp.cidPta.idCid">Id Cid</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="cid-pta-idCid" type="string" className="form-control" name="idCid" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="idCid" value={this.state.fieldsBase[baseFilters]} />
  );
};

const IdAtividadeComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'idAtividade' ? (
    <Col md="idAtividade">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="idAtividadeLabel" for="cid-pta-idAtividade">
              <Translate contentKey="generadorApp.cidPta.idAtividade">Id Atividade</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="cid-pta-idAtividade" type="string" className="form-control" name="idAtividade" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="idAtividade" value={this.state.fieldsBase[baseFilters]} />
  );
};

const AtivoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ativo' ? (
    <Col md="ativo">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="ativoLabel" for="cid-pta-ativo">
              <Translate contentKey="generadorApp.cidPta.ativo">Ativo</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="cid-pta-ativo" type="string" className="form-control" name="ativo" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CidPtaUpdate);
