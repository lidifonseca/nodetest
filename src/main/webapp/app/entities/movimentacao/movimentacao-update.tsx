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
import { getEntity, updateEntity, createEntity, setBlob, reset } from './movimentacao.reducer';
import { IMovimentacao } from 'app/shared/model/movimentacao.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMovimentacaoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IMovimentacaoUpdateState {
  isNew: boolean;
  processoId: string;
}

export class MovimentacaoUpdate extends React.Component<IMovimentacaoUpdateProps, IMovimentacaoUpdateState> {
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
      const { movimentacaoEntity } = this.props;
      const entity = {
        ...movimentacaoEntity,
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
    this.props.history.push('/movimentacao');
  };

  render() {
    const { movimentacaoEntity, processos, loading, updating } = this.props;
    const { isNew } = this.state;

    const { movimento } = movimentacaoEntity;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="tjscrapperApp.movimentacao.home.createOrEditLabel">
              <Translate contentKey="tjscrapperApp.movimentacao.home.createOrEditLabel">Create or edit a Movimentacao</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : movimentacaoEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="movimentacao-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="movimentacao-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="dataLabel" for="movimentacao-data">
                    <Translate contentKey="tjscrapperApp.movimentacao.data">Data</Translate>
                  </Label>
                  <AvField id="movimentacao-data" type="date" className="form-control" name="data" />
                </AvGroup>
                <AvGroup>
                  <Label id="movimentoLabel" for="movimentacao-movimento">
                    <Translate contentKey="tjscrapperApp.movimentacao.movimento">Movimento</Translate>
                  </Label>
                  <AvInput id="movimentacao-movimento" type="textarea" name="movimento" />
                </AvGroup>
                <AvGroup>
                  <Label for="movimentacao-processo">
                    <Translate contentKey="tjscrapperApp.movimentacao.processo">Processo</Translate>
                  </Label>
                  <AvInput id="movimentacao-processo" type="select" className="form-control" name="processoId">
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
                <Button tag={Link} id="cancel-save" to="/movimentacao" replace color="info">
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
  movimentacaoEntity: storeState.movimentacao.entity,
  loading: storeState.movimentacao.loading,
  updating: storeState.movimentacao.updating,
  updateSuccess: storeState.movimentacao.updateSuccess
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
)(MovimentacaoUpdate);
