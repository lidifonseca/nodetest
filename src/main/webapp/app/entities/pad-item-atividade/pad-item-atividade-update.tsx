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

import { ICategoriaAtividade } from 'app/shared/model/categoria-atividade.model';
import { getEntities as getCategoriaAtividades } from 'app/entities/categoria-atividade/categoria-atividade.reducer';
import { IPadItem } from 'app/shared/model/pad-item.model';
import { getEntities as getPadItems } from 'app/entities/pad-item/pad-item.reducer';
import {
  IPadItemAtividadeUpdateState,
  getEntity,
  getPadItemAtividadeState,
  IPadItemAtividadeBaseState,
  updateEntity,
  createEntity,
  reset
} from './pad-item-atividade.reducer';
import { IPadItemAtividade } from 'app/shared/model/pad-item-atividade.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPadItemAtividadeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PadItemAtividadeUpdate extends React.Component<IPadItemAtividadeUpdateProps, IPadItemAtividadeUpdateState> {
  constructor(props: Readonly<IPadItemAtividadeUpdateProps>) {
    super(props);

    this.state = {
      categoriaAtividadeSelectValue: null,
      padItemSelectValue: null,
      fieldsBase: getPadItemAtividadeState(this.props.location),
      atividadeId: '0',
      padItemId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }

    if (
      nextProps.categoriaAtividades.length > 0 &&
      this.state.categoriaAtividadeSelectValue === null &&
      nextProps.padItemAtividadeEntity.categoriaAtividade &&
      nextProps.padItemAtividadeEntity.categoriaAtividade.id
    ) {
      this.setState({
        categoriaAtividadeSelectValue: nextProps.categoriaAtividades.map(p =>
          nextProps.padItemAtividadeEntity.categoriaAtividade.id === p.id ? { value: p.id, label: p.id } : null
        )
      });
    }

    if (
      nextProps.padItems.length > 0 &&
      this.state.padItemSelectValue === null &&
      nextProps.padItemAtividadeEntity.padItem &&
      nextProps.padItemAtividadeEntity.padItem.id
    ) {
      this.setState({
        padItemSelectValue: nextProps.padItems.map(p =>
          nextProps.padItemAtividadeEntity.padItem.id === p.id ? { value: p.id, label: p.id } : null
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

    this.props.getCategoriaAtividades();
    this.props.getPadItems();
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
      const { padItemAtividadeEntity } = this.props;
      const entity = {
        ...padItemAtividadeEntity,
        categoriaAtividade: this.state.categoriaAtividadeSelectValue ? this.state.categoriaAtividadeSelectValue['value'] : null,
        padItem: this.state.padItemSelectValue ? this.state.padItemSelectValue['value'] : null,
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
    this.props.history.push('/pad-item-atividade?' + this.getFiltersURL());
  };

  render() {
    const { padItemAtividadeEntity, categoriaAtividades, padItems, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...padItemAtividadeEntity,
                  atividade: padItemAtividadeEntity.atividade ? padItemAtividadeEntity.atividade.id : null,
                  padItem: padItemAtividadeEntity.padItem ? padItemAtividadeEntity.padItem.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.padItemAtividade.home.createOrEditLabel">Create or edit a PadItemAtividade</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/pad-item-atividade?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Pad Item Atividades</li>
            <li className="breadcrumb-item active">Pad Item Atividades edit</li>
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
                      <Label className="mt-2" for="pad-item-atividade-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="pad-item-atividade-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <DataInicioComponentUpdate baseFilters />

                        <DataFimComponentUpdate baseFilters />

                        <AtividadeComponentUpdate baseFilter categoriaAtividades />

                        <PadItemComponentUpdate baseFilter padItems />
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
  categoriaAtividades: storeState.categoriaAtividade.entities,
  padItems: storeState.padItem.entities,
  padItemAtividadeEntity: storeState.padItemAtividade.entity,
  loading: storeState.padItemAtividade.loading,
  updating: storeState.padItemAtividade.updating,
  updateSuccess: storeState.padItemAtividade.updateSuccess
});

const mapDispatchToProps = {
  getCategoriaAtividades,
  getPadItems,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const DataInicioComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'dataInicio' ? (
    <Col md="dataInicio">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="dataInicioLabel" for="pad-item-atividade-dataInicio">
              <Translate contentKey="generadorApp.padItemAtividade.dataInicio">Data Inicio</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-item-atividade-dataInicio" type="date" className="form-control" name="dataInicio" />
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
            <Label className="mt-2" id="dataFimLabel" for="pad-item-atividade-dataFim">
              <Translate contentKey="generadorApp.padItemAtividade.dataFim">Data Fim</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="pad-item-atividade-dataFim" type="date" className="form-control" name="dataFim" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="dataFim" value={this.state.fieldsBase[baseFilters]} />
  );
};

const AtividadeComponentUpdate = ({ baseFilters, categoriaAtividades }) => {
  return baseFilters !== 'atividade' ? (
    <Col md="12">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" for="pad-item-atividade-atividade">
              <Translate contentKey="generadorApp.padItemAtividade.atividade">Atividade</Translate>
            </Label>
          </Col>
          <Col md="9">
            <Select
              id="pad-item-atividade-atividade"
              className={'css-select-control'}
              value={this.state.categoriaAtividadeSelectValue}
              options={categoriaAtividades ? categoriaAtividades.map(option => ({ value: option.id, label: option.id })) : null}
              onChange={options => this.setState({ categoriaAtividadeSelectValue: options })}
              name={'atividade'}
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="atividade" value={this.state.fieldsBase[baseFilters]} />
  );
};

const PadItemComponentUpdate = ({ baseFilters, padItems }) => {
  return baseFilters !== 'padItem' ? (
    <Col md="12">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" for="pad-item-atividade-padItem">
              <Translate contentKey="generadorApp.padItemAtividade.padItem">Pad Item</Translate>
            </Label>
          </Col>
          <Col md="9">
            <Select
              id="pad-item-atividade-padItem"
              className={'css-select-control'}
              value={this.state.padItemSelectValue}
              options={padItems ? padItems.map(option => ({ value: option.id, label: option.id })) : null}
              onChange={options => this.setState({ padItemSelectValue: options })}
              name={'padItem'}
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="padItem" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PadItemAtividadeUpdate);
