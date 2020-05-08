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
import { IEspecialidade } from 'app/shared/model/especialidade.model';
import { getEntities as getEspecialidades } from 'app/entities/especialidade/especialidade.reducer';
import {
  IEspecialidadeUnidadeUpdateState,
  getEntity,
  getEspecialidadeUnidadeState,
  IEspecialidadeUnidadeBaseState,
  updateEntity,
  createEntity,
  reset
} from './especialidade-unidade.reducer';
import { IEspecialidadeUnidade } from 'app/shared/model/especialidade-unidade.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEspecialidadeUnidadeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EspecialidadeUnidadeUpdate extends React.Component<IEspecialidadeUnidadeUpdateProps, IEspecialidadeUnidadeUpdateState> {
  constructor(props: Readonly<IEspecialidadeUnidadeUpdateProps>) {
    super(props);

    this.state = {
      unidadeEasySelectValue: null,
      especialidadeSelectValue: null,
      fieldsBase: getEspecialidadeUnidadeState(this.props.location),
      unidadeId: '0',
      especialidadeId: '0',
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
      nextProps.especialidadeUnidadeEntity.unidadeEasy &&
      nextProps.especialidadeUnidadeEntity.unidadeEasy.id
    ) {
      this.setState({
        unidadeEasySelectValue: nextProps.unidadeEasies.map(p =>
          nextProps.especialidadeUnidadeEntity.unidadeEasy.id === p.id ? { value: p.id, label: p.razaoSocial } : null
        )
      });
    }

    if (
      nextProps.especialidades.length > 0 &&
      this.state.especialidadeSelectValue === null &&
      nextProps.especialidadeUnidadeEntity.especialidade &&
      nextProps.especialidadeUnidadeEntity.especialidade.id
    ) {
      this.setState({
        especialidadeSelectValue: nextProps.especialidades.map(p =>
          nextProps.especialidadeUnidadeEntity.especialidade.id === p.id ? { value: p.id, label: p.id } : null
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
    this.props.getEspecialidades();
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
      const { especialidadeUnidadeEntity } = this.props;
      const entity = {
        ...especialidadeUnidadeEntity,
        unidadeEasy: this.state.unidadeEasySelectValue ? this.state.unidadeEasySelectValue['value'] : null,
        especialidade: this.state.especialidadeSelectValue ? this.state.especialidadeSelectValue['value'] : null,
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
    this.props.history.push('/especialidade-unidade?' + this.getFiltersURL());
  };

  render() {
    const { especialidadeUnidadeEntity, unidadeEasies, especialidades, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...especialidadeUnidadeEntity,
                  unidade: especialidadeUnidadeEntity.unidade ? especialidadeUnidadeEntity.unidade.id : null,
                  especialidade: especialidadeUnidadeEntity.especialidade ? especialidadeUnidadeEntity.especialidade.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.especialidadeUnidade.home.createOrEditLabel">
                Create or edit a EspecialidadeUnidade
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
              to={'/especialidade-unidade?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Especialidade Unidades</li>
            <li className="breadcrumb-item active">Especialidade Unidades edit</li>
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
                      <Label className="mt-2" for="especialidade-unidade-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="especialidade-unidade-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <ValorBaixaUrgComponentUpdate baseFilters />

                        <ValorAltaUrgComponentUpdate baseFilters />

                        <ValorPagarComponentUpdate baseFilters />

                        <PublicarComponentUpdate baseFilters />

                        <ComentarioPrecoComponentUpdate baseFilters />

                        <UnidadeComponentUpdate baseFilter unidadeEasies />

                        <EspecialidadeComponentUpdate baseFilter especialidades />
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
  especialidades: storeState.especialidade.entities,
  especialidadeUnidadeEntity: storeState.especialidadeUnidade.entity,
  loading: storeState.especialidadeUnidade.loading,
  updating: storeState.especialidadeUnidade.updating,
  updateSuccess: storeState.especialidadeUnidade.updateSuccess
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getEspecialidades,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const ValorBaixaUrgComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'valorBaixaUrg' ? (
    <Col md="valorBaixaUrg">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="valorBaixaUrgLabel" for="especialidade-unidade-valorBaixaUrg">
              <Translate contentKey="generadorApp.especialidadeUnidade.valorBaixaUrg">Valor Baixa Urg</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="especialidade-unidade-valorBaixaUrg" type="string" className="form-control" name="valorBaixaUrg" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="valorBaixaUrg" value={this.state.fieldsBase[baseFilters]} />
  );
};

const ValorAltaUrgComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'valorAltaUrg' ? (
    <Col md="valorAltaUrg">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="valorAltaUrgLabel" for="especialidade-unidade-valorAltaUrg">
              <Translate contentKey="generadorApp.especialidadeUnidade.valorAltaUrg">Valor Alta Urg</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="especialidade-unidade-valorAltaUrg" type="string" className="form-control" name="valorAltaUrg" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="valorAltaUrg" value={this.state.fieldsBase[baseFilters]} />
  );
};

const ValorPagarComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'valorPagar' ? (
    <Col md="valorPagar">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="valorPagarLabel" for="especialidade-unidade-valorPagar">
              <Translate contentKey="generadorApp.especialidadeUnidade.valorPagar">Valor Pagar</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="especialidade-unidade-valorPagar" type="string" className="form-control" name="valorPagar" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="valorPagar" value={this.state.fieldsBase[baseFilters]} />
  );
};

const PublicarComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'publicar' ? (
    <Col md="publicar">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="publicarLabel" for="especialidade-unidade-publicar">
              <Translate contentKey="generadorApp.especialidadeUnidade.publicar">Publicar</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="especialidade-unidade-publicar" type="string" className="form-control" name="publicar" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="publicar" value={this.state.fieldsBase[baseFilters]} />
  );
};

const ComentarioPrecoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'comentarioPreco' ? (
    <Col md="comentarioPreco">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="comentarioPrecoLabel" for="especialidade-unidade-comentarioPreco">
              <Translate contentKey="generadorApp.especialidadeUnidade.comentarioPreco">Comentario Preco</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="especialidade-unidade-comentarioPreco" type="text" name="comentarioPreco" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="comentarioPreco" value={this.state.fieldsBase[baseFilters]} />
  );
};

const UnidadeComponentUpdate = ({ baseFilters, unidadeEasies }) => {
  return baseFilters !== 'unidade' ? (
    <Col md="12">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" for="especialidade-unidade-unidade">
              <Translate contentKey="generadorApp.especialidadeUnidade.unidade">Unidade</Translate>
            </Label>
          </Col>
          <Col md="9">
            <Select
              id="especialidade-unidade-unidade"
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

const EspecialidadeComponentUpdate = ({ baseFilters, especialidades }) => {
  return baseFilters !== 'especialidade' ? (
    <Col md="12">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" for="especialidade-unidade-especialidade">
              <Translate contentKey="generadorApp.especialidadeUnidade.especialidade">Especialidade</Translate>
            </Label>
          </Col>
          <Col md="9">
            <Select
              id="especialidade-unidade-especialidade"
              className={'css-select-control'}
              value={this.state.especialidadeSelectValue}
              options={especialidades ? especialidades.map(option => ({ value: option.id, label: option.id })) : null}
              onChange={options => this.setState({ especialidadeSelectValue: options })}
              name={'especialidade'}
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="especialidade" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EspecialidadeUnidadeUpdate);
