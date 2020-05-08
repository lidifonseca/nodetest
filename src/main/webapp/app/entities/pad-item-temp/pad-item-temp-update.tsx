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
  IPadItemTempUpdateState,
  getEntity,
  getPadItemTempState,
  IPadItemTempBaseState,
  updateEntity,
  createEntity,
  reset
} from './pad-item-temp.reducer';
import { IPadItemTemp } from 'app/shared/model/pad-item-temp.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPadItemTempUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PadItemTempUpdate extends React.Component<IPadItemTempUpdateProps, IPadItemTempUpdateState> {
  constructor(props: Readonly<IPadItemTempUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getPadItemTempState(this.props.location),
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
      const { padItemTempEntity } = this.props;
      const entity = {
        ...padItemTempEntity,

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
    this.props.history.push('/pad-item-temp?' + this.getFiltersURL());
  };

  render() {
    const { padItemTempEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...padItemTempEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.padItemTemp.home.createOrEditLabel">Create or edit a PadItemTemp</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/pad-item-temp?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Pad Item Temps</li>
            <li className="breadcrumb-item active">Pad Item Temps edit</li>
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
                      <Label className="mt-2" for="pad-item-temp-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="pad-item-temp-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <SessionIdComponentUpdate baseFilters />

                        <IdEspecialidadeComponentUpdate baseFilters />

                        <IdPeriodicidadeComponentUpdate baseFilters />

                        <IdPeriodoComponentUpdate baseFilters />

                        <DataInicioComponentUpdate baseFilters />

                        <DataFimComponentUpdate baseFilters />

                        <QtdSessoesComponentUpdate baseFilters />

                        <ObservacaoComponentUpdate baseFilters />

                        <CidXPtaNovoIdComponentUpdate baseFilters />

                        <CategoriaIdComponentUpdate baseFilters />

                        <NumGhcComponentUpdate baseFilters />
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
  padItemTempEntity: storeState.padItemTemp.entity,
  loading: storeState.padItemTemp.loading,
  updating: storeState.padItemTemp.updating,
  updateSuccess: storeState.padItemTemp.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const SessionIdComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'sessionId' ? (
    <Col md="sessionId">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="sessionIdLabel" for="pad-item-temp-sessionId">
              <Translate contentKey="generadorApp.padItemTemp.sessionId">Session Id</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-item-temp-sessionId" type="text" name="sessionId" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="sessionId" value={this.state.fieldsBase[baseFilters]} />
  );
};

const IdEspecialidadeComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'idEspecialidade' ? (
    <Col md="idEspecialidade">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="idEspecialidadeLabel" for="pad-item-temp-idEspecialidade">
              <Translate contentKey="generadorApp.padItemTemp.idEspecialidade">Id Especialidade</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-item-temp-idEspecialidade" type="string" className="form-control" name="idEspecialidade" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="idEspecialidade" value={this.state.fieldsBase[baseFilters]} />
  );
};

const IdPeriodicidadeComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'idPeriodicidade' ? (
    <Col md="idPeriodicidade">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="idPeriodicidadeLabel" for="pad-item-temp-idPeriodicidade">
              <Translate contentKey="generadorApp.padItemTemp.idPeriodicidade">Id Periodicidade</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-item-temp-idPeriodicidade" type="string" className="form-control" name="idPeriodicidade" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="idPeriodicidade" value={this.state.fieldsBase[baseFilters]} />
  );
};

const IdPeriodoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'idPeriodo' ? (
    <Col md="idPeriodo">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="idPeriodoLabel" for="pad-item-temp-idPeriodo">
              <Translate contentKey="generadorApp.padItemTemp.idPeriodo">Id Periodo</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-item-temp-idPeriodo" type="string" className="form-control" name="idPeriodo" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="idPeriodo" value={this.state.fieldsBase[baseFilters]} />
  );
};

const DataInicioComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'dataInicio' ? (
    <Col md="dataInicio">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="dataInicioLabel" for="pad-item-temp-dataInicio">
              <Translate contentKey="generadorApp.padItemTemp.dataInicio">Data Inicio</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-item-temp-dataInicio" type="date" className="form-control" name="dataInicio" />
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
            <Label className="mt-2" id="dataFimLabel" for="pad-item-temp-dataFim">
              <Translate contentKey="generadorApp.padItemTemp.dataFim">Data Fim</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-item-temp-dataFim" type="date" className="form-control" name="dataFim" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="dataFim" value={this.state.fieldsBase[baseFilters]} />
  );
};

const QtdSessoesComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'qtdSessoes' ? (
    <Col md="qtdSessoes">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="qtdSessoesLabel" for="pad-item-temp-qtdSessoes">
              <Translate contentKey="generadorApp.padItemTemp.qtdSessoes">Qtd Sessoes</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-item-temp-qtdSessoes" type="string" className="form-control" name="qtdSessoes" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="qtdSessoes" value={this.state.fieldsBase[baseFilters]} />
  );
};

const ObservacaoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'observacao' ? (
    <Col md="observacao">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="observacaoLabel" for="pad-item-temp-observacao">
              <Translate contentKey="generadorApp.padItemTemp.observacao">Observacao</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-item-temp-observacao" type="text" name="observacao" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="observacao" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CidXPtaNovoIdComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cidXPtaNovoId' ? (
    <Col md="cidXPtaNovoId">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="cidXPtaNovoIdLabel" for="pad-item-temp-cidXPtaNovoId">
              <Translate contentKey="generadorApp.padItemTemp.cidXPtaNovoId">Cid X Pta Novo Id</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-item-temp-cidXPtaNovoId" type="string" className="form-control" name="cidXPtaNovoId" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="cidXPtaNovoId" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CategoriaIdComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'categoriaId' ? (
    <Col md="categoriaId">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="categoriaIdLabel" for="pad-item-temp-categoriaId">
              <Translate contentKey="generadorApp.padItemTemp.categoriaId">Categoria Id</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-item-temp-categoriaId" type="string" className="form-control" name="categoriaId" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="categoriaId" value={this.state.fieldsBase[baseFilters]} />
  );
};

const NumGhcComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'numGhc' ? (
    <Col md="numGhc">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="numGhcLabel" for="pad-item-temp-numGhc">
              <Translate contentKey="generadorApp.padItemTemp.numGhc">Num Ghc</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-item-temp-numGhc" type="text" name="numGhc" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="numGhc" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PadItemTempUpdate);
