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
  IProfissionalAreaAtuacaoUpdateState,
  getEntity,
  getProfissionalAreaAtuacaoState,
  IProfissionalAreaAtuacaoBaseState,
  updateEntity,
  createEntity,
  reset
} from './profissional-area-atuacao.reducer';
import { IProfissionalAreaAtuacao } from 'app/shared/model/profissional-area-atuacao.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProfissionalAreaAtuacaoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProfissionalAreaAtuacaoUpdate extends React.Component<
  IProfissionalAreaAtuacaoUpdateProps,
  IProfissionalAreaAtuacaoUpdateState
> {
  constructor(props: Readonly<IProfissionalAreaAtuacaoUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getProfissionalAreaAtuacaoState(this.props.location),
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
      const { profissionalAreaAtuacaoEntity } = this.props;
      const entity = {
        ...profissionalAreaAtuacaoEntity,

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
    this.props.history.push('/profissional-area-atuacao?' + this.getFiltersURL());
  };

  render() {
    const { profissionalAreaAtuacaoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...profissionalAreaAtuacaoEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.profissionalAreaAtuacao.home.createOrEditLabel">
                Create or edit a ProfissionalAreaAtuacao
              </Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/profissional-area-atuacao?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Profissional Area Atuacaos</li>
            <li className="breadcrumb-item active">Profissional Area Atuacaos edit</li>
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
                      <Label className="mt-2" for="profissional-area-atuacao-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput
                                id="profissional-area-atuacao-id"
                                type="hidden"
                                className="form-control"
                                name="id"
                                required
                                readOnly
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <IdProfissionalComponentUpdate baseFilters />

                        <CepAreaComponentUpdate baseFilters />

                        <CepFimComponentUpdate baseFilters />

                        <AtivoComponentUpdate baseFilters />

                        <CepIniComponentUpdate baseFilters />
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
  profissionalAreaAtuacaoEntity: storeState.profissionalAreaAtuacao.entity,
  loading: storeState.profissionalAreaAtuacao.loading,
  updating: storeState.profissionalAreaAtuacao.updating,
  updateSuccess: storeState.profissionalAreaAtuacao.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const IdProfissionalComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'idProfissional' ? (
    <Col md="idProfissional">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="idProfissionalLabel" for="profissional-area-atuacao-idProfissional">
              <Translate contentKey="generadorApp.profissionalAreaAtuacao.idProfissional">Id Profissional</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="profissional-area-atuacao-idProfissional" type="text" name="idProfissional" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="idProfissional" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CepAreaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cepArea' ? (
    <Col md="cepArea">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="cepAreaLabel" for="profissional-area-atuacao-cepArea">
              <Translate contentKey="generadorApp.profissionalAreaAtuacao.cepArea">Cep Area</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="profissional-area-atuacao-cepArea" type="text" name="cepArea" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="cepArea" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CepFimComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cepFim' ? (
    <Col md="cepFim">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="cepFimLabel" for="profissional-area-atuacao-cepFim">
              <Translate contentKey="generadorApp.profissionalAreaAtuacao.cepFim">Cep Fim</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="profissional-area-atuacao-cepFim" type="text" name="cepFim" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="cepFim" value={this.state.fieldsBase[baseFilters]} />
  );
};

const AtivoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ativo' ? (
    <Col md="ativo">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="ativoLabel" for="profissional-area-atuacao-ativo">
              <Translate contentKey="generadorApp.profissionalAreaAtuacao.ativo">Ativo</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="profissional-area-atuacao-ativo" type="string" className="form-control" name="ativo" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CepIniComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cepIni' ? (
    <Col md="cepIni">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="cepIniLabel" for="profissional-area-atuacao-cepIni">
              <Translate contentKey="generadorApp.profissionalAreaAtuacao.cepIni">Cep Ini</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="profissional-area-atuacao-cepIni" type="text" name="cepIni" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="cepIni" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalAreaAtuacaoUpdate);
