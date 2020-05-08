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
  IFranquiaAreaAtuacaoUpdateState,
  getEntity,
  getFranquiaAreaAtuacaoState,
  IFranquiaAreaAtuacaoBaseState,
  updateEntity,
  createEntity,
  reset
} from './franquia-area-atuacao.reducer';
import { IFranquiaAreaAtuacao } from 'app/shared/model/franquia-area-atuacao.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFranquiaAreaAtuacaoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FranquiaAreaAtuacaoUpdate extends React.Component<IFranquiaAreaAtuacaoUpdateProps, IFranquiaAreaAtuacaoUpdateState> {
  constructor(props: Readonly<IFranquiaAreaAtuacaoUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getFranquiaAreaAtuacaoState(this.props.location),
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
      const { franquiaAreaAtuacaoEntity } = this.props;
      const entity = {
        ...franquiaAreaAtuacaoEntity,

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
    this.props.history.push('/franquia-area-atuacao?' + this.getFiltersURL());
  };

  render() {
    const { franquiaAreaAtuacaoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...franquiaAreaAtuacaoEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.franquiaAreaAtuacao.home.createOrEditLabel">
                Create or edit a FranquiaAreaAtuacao
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
              to={'/franquia-area-atuacao?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Franquia Area Atuacaos</li>
            <li className="breadcrumb-item active">Franquia Area Atuacaos edit</li>
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
                      <Label className="mt-2" for="franquia-area-atuacao-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="franquia-area-atuacao-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <CepIniComponentUpdate baseFilters />

                        <CepFimComponentUpdate baseFilters />

                        <AtivoComponentUpdate baseFilters />
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
  franquiaAreaAtuacaoEntity: storeState.franquiaAreaAtuacao.entity,
  loading: storeState.franquiaAreaAtuacao.loading,
  updating: storeState.franquiaAreaAtuacao.updating,
  updateSuccess: storeState.franquiaAreaAtuacao.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const CepIniComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cepIni' ? (
    <Col md="cepIni">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="cepIniLabel" for="franquia-area-atuacao-cepIni">
              <Translate contentKey="generadorApp.franquiaAreaAtuacao.cepIni">Cep Ini</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="franquia-area-atuacao-cepIni" type="text" name="cepIni" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="cepIni" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CepFimComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cepFim' ? (
    <Col md="cepFim">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="cepFimLabel" for="franquia-area-atuacao-cepFim">
              <Translate contentKey="generadorApp.franquiaAreaAtuacao.cepFim">Cep Fim</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="franquia-area-atuacao-cepFim" type="text" name="cepFim" />
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
            <Label className="mt-2" id="ativoLabel" for="franquia-area-atuacao-ativo">
              <Translate contentKey="generadorApp.franquiaAreaAtuacao.ativo">Ativo</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="franquia-area-atuacao-ativo" type="string" className="form-control" name="ativo" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(FranquiaAreaAtuacaoUpdate);
