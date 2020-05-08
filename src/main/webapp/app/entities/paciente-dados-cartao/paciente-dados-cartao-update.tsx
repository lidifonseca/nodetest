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
  IPacienteDadosCartaoUpdateState,
  getEntity,
  getPacienteDadosCartaoState,
  IPacienteDadosCartaoBaseState,
  updateEntity,
  createEntity,
  reset
} from './paciente-dados-cartao.reducer';
import { IPacienteDadosCartao } from 'app/shared/model/paciente-dados-cartao.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPacienteDadosCartaoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteDadosCartaoUpdate extends React.Component<IPacienteDadosCartaoUpdateProps, IPacienteDadosCartaoUpdateState> {
  constructor(props: Readonly<IPacienteDadosCartaoUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getPacienteDadosCartaoState(this.props.location),
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
      const { pacienteDadosCartaoEntity } = this.props;
      const entity = {
        ...pacienteDadosCartaoEntity,

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
    this.props.history.push('/paciente-dados-cartao?' + this.getFiltersURL());
  };

  render() {
    const { pacienteDadosCartaoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...pacienteDadosCartaoEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.pacienteDadosCartao.home.createOrEditLabel">
                Create or edit a PacienteDadosCartao
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
              to={'/paciente-dados-cartao?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Paciente Dados Cartaos</li>
            <li className="breadcrumb-item active">Paciente Dados Cartaos edit</li>
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
                      <Label className="mt-2" for="paciente-dados-cartao-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="paciente-dados-cartao-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <BandeiraComponentUpdate baseFilters />

                        <NumeroCartaoComponentUpdate baseFilters />

                        <ValidadeComponentUpdate baseFilters />

                        <CodAtivacaoComponentUpdate baseFilters />

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
  pacienteDadosCartaoEntity: storeState.pacienteDadosCartao.entity,
  loading: storeState.pacienteDadosCartao.loading,
  updating: storeState.pacienteDadosCartao.updating,
  updateSuccess: storeState.pacienteDadosCartao.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const BandeiraComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'bandeira' ? (
    <Col md="bandeira">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="bandeiraLabel" for="paciente-dados-cartao-bandeira">
              <Translate contentKey="generadorApp.pacienteDadosCartao.bandeira">Bandeira</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="paciente-dados-cartao-bandeira" type="text" name="bandeira" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="bandeira" value={this.state.fieldsBase[baseFilters]} />
  );
};

const NumeroCartaoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'numeroCartao' ? (
    <Col md="numeroCartao">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="numeroCartaoLabel" for="paciente-dados-cartao-numeroCartao">
              <Translate contentKey="generadorApp.pacienteDadosCartao.numeroCartao">Numero Cartao</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="paciente-dados-cartao-numeroCartao" type="text" name="numeroCartao" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="numeroCartao" value={this.state.fieldsBase[baseFilters]} />
  );
};

const ValidadeComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'validade' ? (
    <Col md="validade">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="validadeLabel" for="paciente-dados-cartao-validade">
              <Translate contentKey="generadorApp.pacienteDadosCartao.validade">Validade</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="paciente-dados-cartao-validade" type="date" className="form-control" name="validade" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="validade" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CodAtivacaoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'codAtivacao' ? (
    <Col md="codAtivacao">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="codAtivacaoLabel" for="paciente-dados-cartao-codAtivacao">
              <Translate contentKey="generadorApp.pacienteDadosCartao.codAtivacao">Cod Ativacao</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="paciente-dados-cartao-codAtivacao" type="string" className="form-control" name="codAtivacao" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="codAtivacao" value={this.state.fieldsBase[baseFilters]} />
  );
};

const AtivoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ativo' ? (
    <Col md="ativo">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="ativoLabel" for="paciente-dados-cartao-ativo">
              <Translate contentKey="generadorApp.pacienteDadosCartao.ativo">Ativo</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="paciente-dados-cartao-ativo" type="string" className="form-control" name="ativo" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PacienteDadosCartaoUpdate);
