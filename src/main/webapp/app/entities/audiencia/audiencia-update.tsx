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
import { getEntity, updateEntity, createEntity, reset } from './audiencia.reducer';
import { IAudiencia } from 'app/shared/model/audiencia.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAudienciaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAudienciaUpdateState {
  isNew: boolean;
  processoId: string;
}

export class AudienciaUpdate extends React.Component<IAudienciaUpdateProps, IAudienciaUpdateState> {
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
      const { audienciaEntity } = this.props;
      const entity = {
        ...audienciaEntity,
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
    this.props.history.push('/audiencia');
  };

  render() {
    const { audienciaEntity, processos, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="tjscrapperApp.audiencia.home.createOrEditLabel">
              <Translate contentKey="tjscrapperApp.audiencia.home.createOrEditLabel">Create or edit a Audiencia</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : audienciaEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="audiencia-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="audiencia-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="dataLabel" for="audiencia-data">
                    <Translate contentKey="tjscrapperApp.audiencia.data">Data</Translate>
                  </Label>
                  <AvField id="audiencia-data" type="date" className="form-control" name="data" />
                </AvGroup>
                <AvGroup>
                  <Label id="audenciaLabel" for="audiencia-audencia">
                    <Translate contentKey="tjscrapperApp.audiencia.audencia">Audencia</Translate>
                  </Label>
                  <AvField id="audiencia-audencia" type="text" name="audencia" />
                </AvGroup>
                <AvGroup>
                  <Label id="situacaoLabel" for="audiencia-situacao">
                    <Translate contentKey="tjscrapperApp.audiencia.situacao">Situacao</Translate>
                  </Label>
                  <AvField id="audiencia-situacao" type="text" name="situacao" />
                </AvGroup>
                <AvGroup>
                  <Label id="quatidadePessoasLabel" for="audiencia-quatidadePessoas">
                    <Translate contentKey="tjscrapperApp.audiencia.quatidadePessoas">Quatidade Pessoas</Translate>
                  </Label>
                  <AvField id="audiencia-quatidadePessoas" type="string" className="form-control" name="quatidadePessoas" />
                </AvGroup>
                <AvGroup>
                  <Label for="audiencia-processo">
                    <Translate contentKey="tjscrapperApp.audiencia.processo">Processo</Translate>
                  </Label>
                  <AvInput id="audiencia-processo" type="select" className="form-control" name="processoId">
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
                <Button tag={Link} id="cancel-save" to="/audiencia" replace color="info">
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
  audienciaEntity: storeState.audiencia.entity,
  loading: storeState.audiencia.loading,
  updating: storeState.audiencia.updating,
  updateSuccess: storeState.audiencia.updateSuccess
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
)(AudienciaUpdate);
