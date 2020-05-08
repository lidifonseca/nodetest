import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import {
  IPadItemUpdateState,
  getEntity,
  getPadItemState,
  IPadItemBaseState,
  updateEntity,
  createEntity,
  setBlob,
  reset
} from './pad-item.reducer';
import { IPadItem } from 'app/shared/model/pad-item.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPadItemUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PadItemUpdate extends React.Component<IPadItemUpdateProps, IPadItemUpdateState> {
  observacaoFileInput: React.RefObject<HTMLInputElement>;

  constructor(props: Readonly<IPadItemUpdateProps>) {
    super(props);

    this.observacaoFileInput = React.createRef();

    this.state = {
      fieldsBase: getPadItemState(this.props.location),
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

  onBlobChange = (isAnImage, name, fileInput) => event => {
    const fileName = fileInput.current.files[0].name;
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType, fileName), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };
  getFiltersURL = (offset = null) => {
    const fieldsBase = this.state.fieldsBase;
    let url = '_back=1' + (offset !== null ? '&offset=' + offset : '');
    Object.keys(fieldsBase).map(key => {
      url += '&' + key + '=' + fieldsBase[key];
    });
    return url;
  };
  saveEntity = (event: any, errors: any, values: any) => {
    values.dataPadItemIncompleto = convertDateTimeToServer(values.dataPadItemIncompleto);
    values.dataPadItemCompleto = convertDateTimeToServer(values.dataPadItemCompleto);

    if (errors.length === 0) {
      const { padItemEntity } = this.props;
      const entity = {
        ...padItemEntity,

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
    this.props.history.push('/pad-item?' + this.getFiltersURL());
  };

  render() {
    const { padItemEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const { observacao } = padItemEntity;
    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...padItemEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.padItem.home.createOrEditLabel">Create or edit a PadItem</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/pad-item?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Pad Items</li>
            <li className="breadcrumb-item active">Pad Items edit</li>
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
                      <Label className="mt-2" for="pad-item-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="pad-item-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <IdPedidoComponentUpdate baseFilters />

                        <DataInicioComponentUpdate baseFilters />

                        <DataFimComponentUpdate baseFilters />

                        <QtdSessoesComponentUpdate baseFilters />

                        <ObservacaoComponentUpdate baseFilters />

                        <SubComponentUpdate baseFilters />

                        <AtivoComponentUpdate baseFilters />

                        <DataPadItemIncompletoComponentUpdate baseFilters />

                        <DataPadItemCompletoComponentUpdate baseFilters />

                        <NumGhcComponentUpdate baseFilters />

                        <CidXPtaNovoComponentUpdate baseFilters />

                        <CategoriaIdComponentUpdate baseFilters />

                        <ScoreComponentUpdate baseFilters />
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
  padItemEntity: storeState.padItem.entity,
  loading: storeState.padItem.loading,
  updating: storeState.padItem.updating,
  updateSuccess: storeState.padItem.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const IdPedidoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'idPedido' ? (
    <Col md="idPedido">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="idPedidoLabel" for="pad-item-idPedido">
              <Translate contentKey="generadorApp.padItem.idPedido">Id Pedido</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-item-idPedido" type="text" name="idPedido" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="idPedido" value={this.state.fieldsBase[baseFilters]} />
  );
};

const DataInicioComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'dataInicio' ? (
    <Col md="dataInicio">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="dataInicioLabel" for="pad-item-dataInicio">
              <Translate contentKey="generadorApp.padItem.dataInicio">Data Inicio</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-item-dataInicio" type="date" className="form-control" name="dataInicio" />
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
            <Label className="mt-2" id="dataFimLabel" for="pad-item-dataFim">
              <Translate contentKey="generadorApp.padItem.dataFim">Data Fim</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-item-dataFim" type="date" className="form-control" name="dataFim" />
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
            <Label className="mt-2" id="qtdSessoesLabel" for="pad-item-qtdSessoes">
              <Translate contentKey="generadorApp.padItem.qtdSessoes">Qtd Sessoes</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-item-qtdSessoes" type="string" className="form-control" name="qtdSessoes" />
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
            <Label className="mt-2" id="observacaoLabel" for="pad-item-observacao">
              <Translate contentKey="generadorApp.padItem.observacao">Observacao</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvInput id="pad-item-observacao" type="textarea" name="observacao" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="observacao" value={this.state.fieldsBase[baseFilters]} />
  );
};

const SubComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'sub' ? (
    <Col md="sub">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="subLabel" for="pad-item-sub">
              <Translate contentKey="generadorApp.padItem.sub">Sub</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-item-sub" type="string" className="form-control" name="sub" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="sub" value={this.state.fieldsBase[baseFilters]} />
  );
};

const AtivoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ativo' ? (
    <Col md="ativo">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="ativoLabel" for="pad-item-ativo">
              <Translate contentKey="generadorApp.padItem.ativo">Ativo</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-item-ativo" type="string" className="form-control" name="ativo" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
  );
};

const DataPadItemIncompletoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'dataPadItemIncompleto' ? (
    <Col md="dataPadItemIncompleto">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="dataPadItemIncompletoLabel" for="pad-item-dataPadItemIncompleto">
              <Translate contentKey="generadorApp.padItem.dataPadItemIncompleto">Data Pad Item Incompleto</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvInput
              id="pad-item-dataPadItemIncompleto"
              type="datetime-local"
              className="form-control"
              name="dataPadItemIncompleto"
              placeholder={'YYYY-MM-DD HH:mm'}
              value={isNew ? null : convertDateTimeFromServer(this.props.padItemEntity.dataPadItemIncompleto)}
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="dataPadItemIncompleto" value={this.state.fieldsBase[baseFilters]} />
  );
};

const DataPadItemCompletoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'dataPadItemCompleto' ? (
    <Col md="dataPadItemCompleto">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="dataPadItemCompletoLabel" for="pad-item-dataPadItemCompleto">
              <Translate contentKey="generadorApp.padItem.dataPadItemCompleto">Data Pad Item Completo</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvInput
              id="pad-item-dataPadItemCompleto"
              type="datetime-local"
              className="form-control"
              name="dataPadItemCompleto"
              placeholder={'YYYY-MM-DD HH:mm'}
              value={isNew ? null : convertDateTimeFromServer(this.props.padItemEntity.dataPadItemCompleto)}
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="dataPadItemCompleto" value={this.state.fieldsBase[baseFilters]} />
  );
};

const NumGhcComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'numGhc' ? (
    <Col md="numGhc">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="numGhcLabel" for="pad-item-numGhc">
              <Translate contentKey="generadorApp.padItem.numGhc">Num Ghc</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-item-numGhc" type="text" name="numGhc" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="numGhc" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CidXPtaNovoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cidXPtaNovo' ? (
    <Col md="cidXPtaNovo">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="cidXPtaNovoLabel" for="pad-item-cidXPtaNovo">
              <Translate contentKey="generadorApp.padItem.cidXPtaNovo">Cid X Pta Novo</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-item-cidXPtaNovo" type="string" className="form-control" name="cidXPtaNovo" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="cidXPtaNovo" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CategoriaIdComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'categoriaId' ? (
    <Col md="categoriaId">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="categoriaIdLabel" for="pad-item-categoriaId">
              <Translate contentKey="generadorApp.padItem.categoriaId">Categoria Id</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-item-categoriaId" type="string" className="form-control" name="categoriaId" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="categoriaId" value={this.state.fieldsBase[baseFilters]} />
  );
};

const ScoreComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'score' ? (
    <Col md="score">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="scoreLabel" for="pad-item-score">
              <Translate contentKey="generadorApp.padItem.score">Score</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-item-score" type="string" className="form-control" name="score" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="score" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PadItemUpdate);
