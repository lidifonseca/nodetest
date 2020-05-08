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

import { IRespostas } from 'app/shared/model/respostas.model';
import { getEntities as getRespostas } from 'app/entities/respostas/respostas.reducer';
import { IPerguntasQuestionario } from 'app/shared/model/perguntas-questionario.model';
import { getEntities as getPerguntasQuestionarios } from 'app/entities/perguntas-questionario/perguntas-questionario.reducer';
import {
  IAcoesRespostasUpdateState,
  getEntity,
  getAcoesRespostasState,
  IAcoesRespostasBaseState,
  updateEntity,
  createEntity,
  reset
} from './acoes-respostas.reducer';
import { IAcoesRespostas } from 'app/shared/model/acoes-respostas.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAcoesRespostasUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AcoesRespostasUpdate extends React.Component<IAcoesRespostasUpdateProps, IAcoesRespostasUpdateState> {
  constructor(props: Readonly<IAcoesRespostasUpdateProps>) {
    super(props);

    this.state = {
      respostasSelectValue: null,
      perguntasQuestionarioSelectValue: null,
      fieldsBase: getAcoesRespostasState(this.props.location),
      respostasId: '0',
      perguntasQuestionarioId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }

    if (
      nextProps.respostas.length > 0 &&
      this.state.respostasSelectValue === null &&
      nextProps.acoesRespostasEntity.respostas &&
      nextProps.acoesRespostasEntity.respostas.id
    ) {
      this.setState({
        respostasSelectValue: nextProps.respostas.map(p =>
          nextProps.acoesRespostasEntity.respostas.id === p.id ? { value: p.id, label: p.id } : null
        )
      });
    }

    if (
      nextProps.perguntasQuestionarios.length > 0 &&
      this.state.perguntasQuestionarioSelectValue === null &&
      nextProps.acoesRespostasEntity.perguntasQuestionario &&
      nextProps.acoesRespostasEntity.perguntasQuestionario.id
    ) {
      this.setState({
        perguntasQuestionarioSelectValue: nextProps.perguntasQuestionarios.map(p =>
          nextProps.acoesRespostasEntity.perguntasQuestionario.id === p.id ? { value: p.id, label: p.id } : null
        )
      });
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getRespostas();
    this.props.getPerguntasQuestionarios();
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
      const { acoesRespostasEntity } = this.props;
      const entity = {
        ...acoesRespostasEntity,
        respostas: this.state.respostasSelectValue ? this.state.respostasSelectValue['value'] : null,
        perguntasQuestionario: this.state.perguntasQuestionarioSelectValue ? this.state.perguntasQuestionarioSelectValue['value'] : null,
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
    this.props.history.push('/acoes-respostas?' + this.getFiltersURL());
  };

  render() {
    const { acoesRespostasEntity, respostas, perguntasQuestionarios, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...acoesRespostasEntity,
                  respostas: acoesRespostasEntity.respostas ? acoesRespostasEntity.respostas.id : null,
                  perguntasQuestionario: acoesRespostasEntity.perguntasQuestionario ? acoesRespostasEntity.perguntasQuestionario.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.acoesRespostas.home.createOrEditLabel">Create or edit a AcoesRespostas</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/acoes-respostas?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Acoes Respostas</li>
            <li className="breadcrumb-item active">Acoes Respostas edit</li>
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
                      <Label className="mt-2" for="acoes-respostas-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="acoes-respostas-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <AbrirCampoPersonalizadoComponentUpdate baseFilters />

                        <CondicaoSexoComponentUpdate baseFilters />

                        <ObservacoesComponentUpdate baseFilters />

                        <TipoCampo1ComponentUpdate baseFilters />

                        <TipoCampo2ComponentUpdate baseFilters />

                        <RespostasComponentUpdate baseFilter respostas />

                        <PerguntasQuestionarioComponentUpdate baseFilter perguntasQuestionarios />
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
  respostas: storeState.respostas.entities,
  perguntasQuestionarios: storeState.perguntasQuestionario.entities,
  acoesRespostasEntity: storeState.acoesRespostas.entity,
  loading: storeState.acoesRespostas.loading,
  updating: storeState.acoesRespostas.updating,
  updateSuccess: storeState.acoesRespostas.updateSuccess
});

const mapDispatchToProps = {
  getRespostas,
  getPerguntasQuestionarios,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const AbrirCampoPersonalizadoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'abrirCampoPersonalizado' ? (
    <Col md="abrirCampoPersonalizado">
      <AvGroup>
        <Row>
          <Col md="12">
            <Label className="mt-2" id="abrirCampoPersonalizadoLabel" check>
              <AvInput
                id="acoes-respostas-abrirCampoPersonalizado"
                type="checkbox"
                className="form-control"
                name="abrirCampoPersonalizado"
              />
              <Translate contentKey="generadorApp.acoesRespostas.abrirCampoPersonalizado">Abrir Campo Personalizado</Translate>
            </Label>
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="abrirCampoPersonalizado" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CondicaoSexoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'condicaoSexo' ? (
    <Col md="condicaoSexo">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="condicaoSexoLabel" for="acoes-respostas-condicaoSexo">
              <Translate contentKey="generadorApp.acoesRespostas.condicaoSexo">Condicao Sexo</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="acoes-respostas-condicaoSexo" type="text" name="condicaoSexo" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="condicaoSexo" value={this.state.fieldsBase[baseFilters]} />
  );
};

const ObservacoesComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'observacoes' ? (
    <Col md="observacoes">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="observacoesLabel" for="acoes-respostas-observacoes">
              <Translate contentKey="generadorApp.acoesRespostas.observacoes">Observacoes</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="acoes-respostas-observacoes" type="text" name="observacoes" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="observacoes" value={this.state.fieldsBase[baseFilters]} />
  );
};

const TipoCampo1ComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'tipoCampo1' ? (
    <Col md="tipoCampo1">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="tipoCampo1Label" for="acoes-respostas-tipoCampo1">
              <Translate contentKey="generadorApp.acoesRespostas.tipoCampo1">Tipo Campo 1</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="acoes-respostas-tipoCampo1" type="text" name="tipoCampo1" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="tipoCampo1" value={this.state.fieldsBase[baseFilters]} />
  );
};

const TipoCampo2ComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'tipoCampo2' ? (
    <Col md="tipoCampo2">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="tipoCampo2Label" for="acoes-respostas-tipoCampo2">
              <Translate contentKey="generadorApp.acoesRespostas.tipoCampo2">Tipo Campo 2</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="acoes-respostas-tipoCampo2" type="text" name="tipoCampo2" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="tipoCampo2" value={this.state.fieldsBase[baseFilters]} />
  );
};

const RespostasComponentUpdate = ({ baseFilters, respostas }) => {
  return baseFilters !== 'respostas' ? (
    <Col md="12">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" for="acoes-respostas-respostas">
              <Translate contentKey="generadorApp.acoesRespostas.respostas">Respostas</Translate>
            </Label>
          </Col>
          <Col md="9">
            <Select
              id="acoes-respostas-respostas"
              className={'css-select-control'}
              value={this.state.respostasSelectValue}
              options={respostas ? respostas.map(option => ({ value: option.id, label: option.id })) : null}
              onChange={options => this.setState({ respostasSelectValue: options })}
              name={'respostas'}
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="respostas" value={this.state.fieldsBase[baseFilters]} />
  );
};

const PerguntasQuestionarioComponentUpdate = ({ baseFilters, perguntasQuestionarios }) => {
  return baseFilters !== 'perguntasQuestionario' ? (
    <Col md="12">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" for="acoes-respostas-perguntasQuestionario">
              <Translate contentKey="generadorApp.acoesRespostas.perguntasQuestionario">Perguntas Questionario</Translate>
            </Label>
          </Col>
          <Col md="9">
            <Select
              id="acoes-respostas-perguntasQuestionario"
              className={'css-select-control'}
              value={this.state.perguntasQuestionarioSelectValue}
              options={perguntasQuestionarios ? perguntasQuestionarios.map(option => ({ value: option.id, label: option.id })) : null}
              onChange={options => this.setState({ perguntasQuestionarioSelectValue: options })}
              name={'perguntasQuestionario'}
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="perguntasQuestionario" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AcoesRespostasUpdate);
