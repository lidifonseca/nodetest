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
  IPadItemResultadoUpdateState,
  getEntity,
  getPadItemResultadoState,
  IPadItemResultadoBaseState,
  updateEntity,
  createEntity,
  setBlob,
  reset
} from './pad-item-resultado.reducer';
import { IPadItemResultado } from 'app/shared/model/pad-item-resultado.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPadItemResultadoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PadItemResultadoUpdate extends React.Component<IPadItemResultadoUpdateProps, IPadItemResultadoUpdateState> {
  resultadoFileInput: React.RefObject<HTMLInputElement>;

  constructor(props: Readonly<IPadItemResultadoUpdateProps>) {
    super(props);

    this.resultadoFileInput = React.createRef();

    this.state = {
      fieldsBase: getPadItemResultadoState(this.props.location),
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
    if (errors.length === 0) {
      const { padItemResultadoEntity } = this.props;
      const entity = {
        ...padItemResultadoEntity,

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
    this.props.history.push('/pad-item-resultado?' + this.getFiltersURL());
  };

  render() {
    const { padItemResultadoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const { resultado } = padItemResultadoEntity;
    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...padItemResultadoEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.padItemResultado.home.createOrEditLabel">Create or edit a PadItemResultado</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/pad-item-resultado?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Pad Item Resultados</li>
            <li className="breadcrumb-item active">Pad Item Resultados edit</li>
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
                      <Label className="mt-2" for="pad-item-resultado-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="pad-item-resultado-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <ResultadoComponentUpdate baseFilters />

                        <DataFimComponentUpdate baseFilters />

                        <ResultadoAnalisadoComponentUpdate baseFilters />

                        <UsuarioIdComponentUpdate baseFilters />
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
  padItemResultadoEntity: storeState.padItemResultado.entity,
  loading: storeState.padItemResultado.loading,
  updating: storeState.padItemResultado.updating,
  updateSuccess: storeState.padItemResultado.updateSuccess
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

const ResultadoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'resultado' ? (
    <Col md="resultado">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="resultadoLabel" for="pad-item-resultado-resultado">
              <Translate contentKey="generadorApp.padItemResultado.resultado">Resultado</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvInput id="pad-item-resultado-resultado" type="textarea" name="resultado" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="resultado" value={this.state.fieldsBase[baseFilters]} />
  );
};

const DataFimComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'dataFim' ? (
    <Col md="dataFim">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="dataFimLabel" for="pad-item-resultado-dataFim">
              <Translate contentKey="generadorApp.padItemResultado.dataFim">Data Fim</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-item-resultado-dataFim" type="date" className="form-control" name="dataFim" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="dataFim" value={this.state.fieldsBase[baseFilters]} />
  );
};

const ResultadoAnalisadoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'resultadoAnalisado' ? (
    <Col md="resultadoAnalisado">
      <AvGroup>
        <Row>
          <Col md="12">
            <Label className="mt-2" id="resultadoAnalisadoLabel" check>
              <AvInput id="pad-item-resultado-resultadoAnalisado" type="checkbox" className="form-control" name="resultadoAnalisado" />
              <Translate contentKey="generadorApp.padItemResultado.resultadoAnalisado">Resultado Analisado</Translate>
            </Label>
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="resultadoAnalisado" value={this.state.fieldsBase[baseFilters]} />
  );
};

const UsuarioIdComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'usuarioId' ? (
    <Col md="usuarioId">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="usuarioIdLabel" for="pad-item-resultado-usuarioId">
              <Translate contentKey="generadorApp.padItemResultado.usuarioId">Usuario Id</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-item-resultado-usuarioId" type="string" className="form-control" name="usuarioId" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="usuarioId" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PadItemResultadoUpdate);
