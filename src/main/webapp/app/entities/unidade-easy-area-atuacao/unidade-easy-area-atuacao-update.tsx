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

import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { getEntities as getUnidadeEasies } from 'app/entities/unidade-easy/unidade-easy.reducer';
import {
  IUnidadeEasyAreaAtuacaoUpdateState,
  getEntity,
  getUnidadeEasyAreaAtuacaoState,
  IUnidadeEasyAreaAtuacaoBaseState,
  updateEntity,
  createEntity,
  reset
} from './unidade-easy-area-atuacao.reducer';
import { IUnidadeEasyAreaAtuacao } from 'app/shared/model/unidade-easy-area-atuacao.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUnidadeEasyAreaAtuacaoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class UnidadeEasyAreaAtuacaoUpdate extends React.Component<IUnidadeEasyAreaAtuacaoUpdateProps, IUnidadeEasyAreaAtuacaoUpdateState> {
  constructor(props: Readonly<IUnidadeEasyAreaAtuacaoUpdateProps>) {
    super(props);

    this.state = {
      unidadeEasySelectValue: null,
      fieldsBase: getUnidadeEasyAreaAtuacaoState(this.props.location),
      unidadeId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }

    if (
      nextProps.unidadeEasies.length > 0 &&
      this.state.unidadeEasySelectValue === null &&
      nextProps.unidadeEasyAreaAtuacaoEntity.unidadeEasy &&
      nextProps.unidadeEasyAreaAtuacaoEntity.unidadeEasy.id
    ) {
      this.setState({
        unidadeEasySelectValue: nextProps.unidadeEasies.map(p =>
          nextProps.unidadeEasyAreaAtuacaoEntity.unidadeEasy.id === p.id ? { value: p.id, label: p.razaoSocial } : null
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

    this.props.getUnidadeEasies();
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
      const { unidadeEasyAreaAtuacaoEntity } = this.props;
      const entity = {
        ...unidadeEasyAreaAtuacaoEntity,
        unidadeEasy: this.state.unidadeEasySelectValue ? this.state.unidadeEasySelectValue['value'] : null,
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
    this.props.history.push('/unidade-easy-area-atuacao?' + this.getFiltersURL());
  };

  render() {
    const { unidadeEasyAreaAtuacaoEntity, unidadeEasies, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...unidadeEasyAreaAtuacaoEntity,
                  unidade: unidadeEasyAreaAtuacaoEntity.unidade ? unidadeEasyAreaAtuacaoEntity.unidade.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.unidadeEasyAreaAtuacao.home.createOrEditLabel">
                Create or edit a UnidadeEasyAreaAtuacao
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
              to={'/unidade-easy-area-atuacao?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Unidade Easy Area Atuacaos</li>
            <li className="breadcrumb-item active">Unidade Easy Area Atuacaos edit</li>
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
                      <Label className="mt-2" for="unidade-easy-area-atuacao-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput
                                id="unidade-easy-area-atuacao-id"
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
                        <CepInicialComponentUpdate baseFilters />

                        <CepFinalComponentUpdate baseFilters />

                        <UnidadeComponentUpdate baseFilter unidadeEasies />
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
  unidadeEasies: storeState.unidadeEasy.entities,
  unidadeEasyAreaAtuacaoEntity: storeState.unidadeEasyAreaAtuacao.entity,
  loading: storeState.unidadeEasyAreaAtuacao.loading,
  updating: storeState.unidadeEasyAreaAtuacao.updating,
  updateSuccess: storeState.unidadeEasyAreaAtuacao.updateSuccess
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const CepInicialComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cepInicial' ? (
    <Col md="cepInicial">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="cepInicialLabel" for="unidade-easy-area-atuacao-cepInicial">
              <Translate contentKey="generadorApp.unidadeEasyAreaAtuacao.cepInicial">Cep Inicial</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="unidade-easy-area-atuacao-cepInicial" type="text" name="cepInicial" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="cepInicial" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CepFinalComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cepFinal' ? (
    <Col md="cepFinal">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="cepFinalLabel" for="unidade-easy-area-atuacao-cepFinal">
              <Translate contentKey="generadorApp.unidadeEasyAreaAtuacao.cepFinal">Cep Final</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="unidade-easy-area-atuacao-cepFinal" type="text" name="cepFinal" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="cepFinal" value={this.state.fieldsBase[baseFilters]} />
  );
};

const UnidadeComponentUpdate = ({ baseFilters, unidadeEasies }) => {
  return baseFilters !== 'unidade' ? (
    <Col md="12">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" for="unidade-easy-area-atuacao-unidade">
              <Translate contentKey="generadorApp.unidadeEasyAreaAtuacao.unidade">Unidade</Translate>
            </Label>
          </Col>
          <Col md="9">
            <Select
              id="unidade-easy-area-atuacao-unidade"
              className={'css-select-control'}
              value={this.state.unidadeEasySelectValue}
              options={unidadeEasies ? unidadeEasies.map(option => ({ value: option.id, label: option.razaoSocial })) : null}
              onChange={options => this.setState({ unidadeEasySelectValue: options })}
              name={'unidade'}
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="unidade" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(UnidadeEasyAreaAtuacaoUpdate);
