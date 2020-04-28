import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProcesso } from 'app/shared/model/processo.model';
import { getEntities as getProcessos } from 'app/entities/processo/processo.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './parte.reducer';
import { IParte } from 'app/shared/model/parte.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IParteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IParteUpdateState {
  isNew: boolean;
  processoId: string;
}

export class ParteUpdate extends React.Component<IParteUpdateProps, IParteUpdateState> {
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

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { parteEntity } = this.props;
      const entity = {
        ...parteEntity,
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
    this.props.history.push('/parte');
  };

  render() {
    const { parteEntity, processos, loading, updating } = this.props;
    const { isNew } = this.state;

    const { advogados } = parteEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="tjscrapperApp.parte.home.createOrEditLabel">
              <Translate contentKey="tjscrapperApp.parte.home.createOrEditLabel">Create or edit a Parte</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : parteEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="parte-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="parte-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="categoriaLabel" for="parte-categoria">
                    <Translate contentKey="tjscrapperApp.parte.categoria">Categoria</Translate>
                  </Label>
                  <AvField id="parte-categoria" type="text" name="categoria" />
                </AvGroup>
                <AvGroup>
                  <Label id="participanteLabel" for="parte-participante">
                    <Translate contentKey="tjscrapperApp.parte.participante">Participante</Translate>
                  </Label>
                  <AvField id="parte-participante" type="text" name="participante" />
                </AvGroup>
                <AvGroup>
                  <Label id="advogadosLabel" for="parte-advogados">
                    <Translate contentKey="tjscrapperApp.parte.advogados">Advogados</Translate>
                  </Label>
                  <AvInput id="parte-advogados" type="textarea" name="advogados" />
                </AvGroup>
                <AvGroup>
                  <Label for="parte-processo">
                    <Translate contentKey="tjscrapperApp.parte.processo">Processo</Translate>
                  </Label>
                  <AvInput id="parte-processo" type="select" className="form-control" name="processoId">
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
                <Button tag={Link} id="cancel-save" to="/parte" replace color="info">
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
  parteEntity: storeState.parte.entity,
  loading: storeState.parte.loading,
  updating: storeState.parte.updating,
  updateSuccess: storeState.parte.updateSuccess
});

const mapDispatchToProps = {
  getProcessos,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParteUpdate);
