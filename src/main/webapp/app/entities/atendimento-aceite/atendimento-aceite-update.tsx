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

import { IProfissional } from 'app/shared/model/profissional.model';
import { getEntities as getProfissionals } from 'app/entities/profissional/profissional.reducer';
import { IAtendimento } from 'app/shared/model/atendimento.model';
import { getEntities as getAtendimentos } from 'app/entities/atendimento/atendimento.reducer';
import {
  IAtendimentoAceiteUpdateState,
  getEntity,
  getAtendimentoAceiteState,
  IAtendimentoAceiteBaseState,
  updateEntity,
  createEntity,
  reset
} from './atendimento-aceite.reducer';
import { IAtendimentoAceite } from 'app/shared/model/atendimento-aceite.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAtendimentoAceiteUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AtendimentoAceiteUpdate extends React.Component<IAtendimentoAceiteUpdateProps, IAtendimentoAceiteUpdateState> {
  constructor(props: Readonly<IAtendimentoAceiteUpdateProps>) {
    super(props);

    this.state = {
      profissionalSelectValue: null,
      atendimentoSelectValue: null,
      fieldsBase: getAtendimentoAceiteState(this.props.location),
      profissionalId: '0',
      atendimentoId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }

    if (
      nextProps.profissionals.length > 0 &&
      this.state.profissionalSelectValue === null &&
      nextProps.atendimentoAceiteEntity.profissional &&
      nextProps.atendimentoAceiteEntity.profissional.id
    ) {
      this.setState({
        profissionalSelectValue: nextProps.profissionals.map(p =>
          nextProps.atendimentoAceiteEntity.profissional.id === p.id ? { value: p.id, label: p.id } : null
        )
      });
    }

    if (
      nextProps.atendimentos.length > 0 &&
      this.state.atendimentoSelectValue === null &&
      nextProps.atendimentoAceiteEntity.atendimento &&
      nextProps.atendimentoAceiteEntity.atendimento.id
    ) {
      this.setState({
        atendimentoSelectValue: nextProps.atendimentos.map(p =>
          nextProps.atendimentoAceiteEntity.atendimento.id === p.id ? { value: p.id, label: p.id } : null
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

    this.props.getProfissionals();
    this.props.getAtendimentos();
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
      const { atendimentoAceiteEntity } = this.props;
      const entity = {
        ...atendimentoAceiteEntity,
        profissional: this.state.profissionalSelectValue ? this.state.profissionalSelectValue['value'] : null,
        atendimento: this.state.atendimentoSelectValue ? this.state.atendimentoSelectValue['value'] : null,
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
    this.props.history.push('/atendimento-aceite?' + this.getFiltersURL());
  };

  render() {
    const { atendimentoAceiteEntity, profissionals, atendimentos, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...atendimentoAceiteEntity,
                  profissional: atendimentoAceiteEntity.profissional ? atendimentoAceiteEntity.profissional.id : null,
                  atendimento: atendimentoAceiteEntity.atendimento ? atendimentoAceiteEntity.atendimento.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.atendimentoAceite.home.createOrEditLabel">Create or edit a AtendimentoAceite</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/atendimento-aceite?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Atendimento Aceites</li>
            <li className="breadcrumb-item active">Atendimento Aceites edit</li>
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
                      <Label className="mt-2" for="atendimento-aceite-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="atendimento-aceite-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <MsgPushComponentUpdate baseFilters />

                        <ProfissionalComponentUpdate baseFilter profissionals />

                        <AtendimentoComponentUpdate baseFilter atendimentos />
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
  profissionals: storeState.profissional.entities,
  atendimentos: storeState.atendimento.entities,
  atendimentoAceiteEntity: storeState.atendimentoAceite.entity,
  loading: storeState.atendimentoAceite.loading,
  updating: storeState.atendimentoAceite.updating,
  updateSuccess: storeState.atendimentoAceite.updateSuccess
});

const mapDispatchToProps = {
  getProfissionals,
  getAtendimentos,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const MsgPushComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'msgPush' ? (
    <Col md="msgPush">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="msgPushLabel" for="atendimento-aceite-msgPush">
              <Translate contentKey="generadorApp.atendimentoAceite.msgPush">Msg Push</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="atendimento-aceite-msgPush" type="text" name="msgPush" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="msgPush" value={this.state.fieldsBase[baseFilters]} />
  );
};

const ProfissionalComponentUpdate = ({ baseFilters, profissionals }) => {
  return baseFilters !== 'profissional' ? (
    <Col md="12">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" for="atendimento-aceite-profissional">
              <Translate contentKey="generadorApp.atendimentoAceite.profissional">Profissional</Translate>
            </Label>
          </Col>
          <Col md="9">
            <Select
              id="atendimento-aceite-profissional"
              className={'css-select-control'}
              value={this.state.profissionalSelectValue}
              options={profissionals ? profissionals.map(option => ({ value: option.id, label: option.id })) : null}
              onChange={options => this.setState({ profissionalSelectValue: options })}
              name={'profissional'}
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="profissional" value={this.state.fieldsBase[baseFilters]} />
  );
};

const AtendimentoComponentUpdate = ({ baseFilters, atendimentos }) => {
  return baseFilters !== 'atendimento' ? (
    <Col md="12">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" for="atendimento-aceite-atendimento">
              <Translate contentKey="generadorApp.atendimentoAceite.atendimento">Atendimento</Translate>
            </Label>
          </Col>
          <Col md="9">
            <Select
              id="atendimento-aceite-atendimento"
              className={'css-select-control'}
              value={this.state.atendimentoSelectValue}
              options={atendimentos ? atendimentos.map(option => ({ value: option.id, label: option.id })) : null}
              onChange={options => this.setState({ atendimentoSelectValue: options })}
              name={'atendimento'}
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="atendimento" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AtendimentoAceiteUpdate);
