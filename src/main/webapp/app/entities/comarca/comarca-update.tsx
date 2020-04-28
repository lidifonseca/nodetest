import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEstado } from 'app/shared/model/estado.model';
import { getEntities as getEstados } from 'app/entities/estado/estado.reducer';
import { getEntity, updateEntity, createEntity, reset } from './comarca.reducer';
import { IComarca } from 'app/shared/model/comarca.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IComarcaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IComarcaUpdateState {
  isNew: boolean;
  estadoId: string;
}

export class ComarcaUpdate extends React.Component<IComarcaUpdateProps, IComarcaUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      estadoId: '0',
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

    this.props.getEstados();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { comarcaEntity } = this.props;
      const entity = {
        ...comarcaEntity,
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
    this.props.history.push('/comarca');
  };

  render() {
    const { comarcaEntity, estados, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="tjscrapperApp.comarca.home.createOrEditLabel">
              <Translate contentKey="tjscrapperApp.comarca.home.createOrEditLabel">Create or edit a Comarca</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : comarcaEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="comarca-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="comarca-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="tjidLabel" for="comarca-tjid">
                    <Translate contentKey="tjscrapperApp.comarca.tjid">Tjid</Translate>
                  </Label>
                  <AvField
                    id="comarca-tjid"
                    type="string"
                    className="form-control"
                    name="tjid"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="nomeLabel" for="comarca-nome">
                    <Translate contentKey="tjscrapperApp.comarca.nome">Nome</Translate>
                  </Label>
                  <AvField
                    id="comarca-nome"
                    type="text"
                    name="nome"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="comarca-estado">
                    <Translate contentKey="tjscrapperApp.comarca.estado">Estado</Translate>
                  </Label>
                  <AvInput id="comarca-estado" type="select" className="form-control" name="estadoId">
                    <option value="" key="0" />
                    {estados
                      ? estados.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/comarca" replace color="info">
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
  estados: storeState.estado.entities,
  comarcaEntity: storeState.comarca.entity,
  loading: storeState.comarca.loading,
  updating: storeState.comarca.updating,
  updateSuccess: storeState.comarca.updateSuccess
});

const mapDispatchToProps = {
  getEstados,
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
)(ComarcaUpdate);
