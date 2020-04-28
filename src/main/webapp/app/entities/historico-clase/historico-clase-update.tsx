import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProcesso } from 'app/shared/model/processo.model';
import { getEntities as getProcessos } from 'app/entities/processo/processo.reducer';
import { getEntity, updateEntity, createEntity, reset } from './historico-clase.reducer';
import { IHistoricoClase } from 'app/shared/model/historico-clase.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IHistoricoClaseUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IHistoricoClaseUpdateState {
  isNew: boolean;
  processoId: string;
}

export class HistoricoClaseUpdate extends React.Component<IHistoricoClaseUpdateProps, IHistoricoClaseUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      processoId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
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

    this.props.getProcessos();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { historicoClaseEntity } = this.props;
      const entity = {
        ...historicoClaseEntity,
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
    this.props.history.push('/historico-clase');
  };

  render() {
    const { historicoClaseEntity, processos, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="tjscrapperApp.historicoClase.home.createOrEditLabel">
              <Translate contentKey="tjscrapperApp.historicoClase.home.createOrEditLabel">Create or edit a HistoricoClase</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : historicoClaseEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="historico-clase-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="historico-clase-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="dataLabel" for="historico-clase-data">
                    <Translate contentKey="tjscrapperApp.historicoClase.data">Data</Translate>
                  </Label>
                  <AvField id="historico-clase-data" type="date" className="form-control" name="data" />
                </AvGroup>
                <AvGroup>
                  <Label id="tipoLabel" for="historico-clase-tipo">
                    <Translate contentKey="tjscrapperApp.historicoClase.tipo">Tipo</Translate>
                  </Label>
                  <AvField id="historico-clase-tipo" type="text" name="tipo" />
                </AvGroup>
                <AvGroup>
                  <Label id="classeLabel" for="historico-clase-classe">
                    <Translate contentKey="tjscrapperApp.historicoClase.classe">Classe</Translate>
                  </Label>
                  <AvField id="historico-clase-classe" type="text" name="classe" />
                </AvGroup>
                <AvGroup>
                  <Label id="areaLabel" for="historico-clase-area">
                    <Translate contentKey="tjscrapperApp.historicoClase.area">Area</Translate>
                  </Label>
                  <AvField id="historico-clase-area" type="text" name="area" />
                </AvGroup>
                <AvGroup>
                  <Label id="motivoLabel" for="historico-clase-motivo">
                    <Translate contentKey="tjscrapperApp.historicoClase.motivo">Motivo</Translate>
                  </Label>
                  <AvField id="historico-clase-motivo" type="text" name="motivo" />
                </AvGroup>
                <AvGroup>
                  <Label for="historico-clase-processo">
                    <Translate contentKey="tjscrapperApp.historicoClase.processo">Processo</Translate>
                  </Label>
                  <AvInput id="historico-clase-processo" type="select" className="form-control" name="processoId">
                    <option value="" key="0" />
                    {processos
                      ? processos.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/historico-clase" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  processos: storeState.processo.entities,
  historicoClaseEntity: storeState.historicoClase.entity,
  loading: storeState.historicoClase.loading,
  updating: storeState.historicoClase.updating,
  updateSuccess: storeState.historicoClase.updateSuccess
});

const mapDispatchToProps = {
  getProcessos,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoricoClaseUpdate);
