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
  IEspecialidadeOperadoraUpdateState,
  getEntity,
  getEspecialidadeOperadoraState,
  IEspecialidadeOperadoraBaseState,
  updateEntity,
  createEntity,
  reset
} from './especialidade-operadora.reducer';
import { IEspecialidadeOperadora } from 'app/shared/model/especialidade-operadora.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEspecialidadeOperadoraUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class EspecialidadeOperadoraUpdate extends React.Component<IEspecialidadeOperadoraUpdateProps, IEspecialidadeOperadoraUpdateState> {
  constructor(props: Readonly<IEspecialidadeOperadoraUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getEspecialidadeOperadoraState(this.props.location),
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
      const { especialidadeOperadoraEntity } = this.props;
      const entity = {
        ...especialidadeOperadoraEntity,

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
    this.props.history.push('/especialidade-operadora?' + this.getFiltersURL());
  };

  render() {
    const { especialidadeOperadoraEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...especialidadeOperadoraEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.especialidadeOperadora.home.createOrEditLabel">
                Create or edit a EspecialidadeOperadora
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
              to={'/especialidade-operadora?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Especialidade Operadoras</li>
            <li className="breadcrumb-item active">Especialidade Operadoras edit</li>
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
                      <Label className="mt-2" for="especialidade-operadora-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="especialidade-operadora-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <CodTussComponentUpdate baseFilters />

                        <CodDespesaComponentUpdate baseFilters />

                        <CodTabelaComponentUpdate baseFilters />

                        <ValorCustoComponentUpdate baseFilters />

                        <ValorVendaComponentUpdate baseFilters />

                        <DescontoCustoComponentUpdate baseFilters />

                        <DescontoVendaComponentUpdate baseFilters />

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
  especialidadeOperadoraEntity: storeState.especialidadeOperadora.entity,
  loading: storeState.especialidadeOperadora.loading,
  updating: storeState.especialidadeOperadora.updating,
  updateSuccess: storeState.especialidadeOperadora.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const CodTussComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'codTuss' ? (
    <Col md="codTuss">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="codTussLabel" for="especialidade-operadora-codTuss">
              <Translate contentKey="generadorApp.especialidadeOperadora.codTuss">Cod Tuss</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="especialidade-operadora-codTuss" type="text" name="codTuss" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="codTuss" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CodDespesaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'codDespesa' ? (
    <Col md="codDespesa">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="codDespesaLabel" for="especialidade-operadora-codDespesa">
              <Translate contentKey="generadorApp.especialidadeOperadora.codDespesa">Cod Despesa</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="especialidade-operadora-codDespesa" type="text" name="codDespesa" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="codDespesa" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CodTabelaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'codTabela' ? (
    <Col md="codTabela">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="codTabelaLabel" for="especialidade-operadora-codTabela">
              <Translate contentKey="generadorApp.especialidadeOperadora.codTabela">Cod Tabela</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="especialidade-operadora-codTabela" type="text" name="codTabela" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="codTabela" value={this.state.fieldsBase[baseFilters]} />
  );
};

const ValorCustoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'valorCusto' ? (
    <Col md="valorCusto">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="valorCustoLabel" for="especialidade-operadora-valorCusto">
              <Translate contentKey="generadorApp.especialidadeOperadora.valorCusto">Valor Custo</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="especialidade-operadora-valorCusto" type="string" className="form-control" name="valorCusto" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="valorCusto" value={this.state.fieldsBase[baseFilters]} />
  );
};

const ValorVendaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'valorVenda' ? (
    <Col md="valorVenda">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="valorVendaLabel" for="especialidade-operadora-valorVenda">
              <Translate contentKey="generadorApp.especialidadeOperadora.valorVenda">Valor Venda</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="especialidade-operadora-valorVenda" type="string" className="form-control" name="valorVenda" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="valorVenda" value={this.state.fieldsBase[baseFilters]} />
  );
};

const DescontoCustoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'descontoCusto' ? (
    <Col md="descontoCusto">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="descontoCustoLabel" for="especialidade-operadora-descontoCusto">
              <Translate contentKey="generadorApp.especialidadeOperadora.descontoCusto">Desconto Custo</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="especialidade-operadora-descontoCusto" type="string" className="form-control" name="descontoCusto" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="descontoCusto" value={this.state.fieldsBase[baseFilters]} />
  );
};

const DescontoVendaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'descontoVenda' ? (
    <Col md="descontoVenda">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="descontoVendaLabel" for="especialidade-operadora-descontoVenda">
              <Translate contentKey="generadorApp.especialidadeOperadora.descontoVenda">Desconto Venda</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="especialidade-operadora-descontoVenda" type="string" className="form-control" name="descontoVenda" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="descontoVenda" value={this.state.fieldsBase[baseFilters]} />
  );
};

const AtivoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ativo' ? (
    <Col md="ativo">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="ativoLabel" for="especialidade-operadora-ativo">
              <Translate contentKey="generadorApp.especialidadeOperadora.ativo">Ativo</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="especialidade-operadora-ativo" type="string" className="form-control" name="ativo" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(EspecialidadeOperadoraUpdate);
