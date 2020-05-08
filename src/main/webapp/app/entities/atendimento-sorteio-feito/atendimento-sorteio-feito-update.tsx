/* eslint complexity: ["error", 300] */
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

import { IPadItem } from 'app/shared/model/pad-item.model';
import { getEntities as getPadItems } from 'app/entities/pad-item/pad-item.reducer';
import {
  IAtendimentoSorteioFeitoUpdateState,
  getEntity,
  getAtendimentoSorteioFeitoState,
  IAtendimentoSorteioFeitoBaseState,
  updateEntity,
  createEntity,
  reset
} from './atendimento-sorteio-feito.reducer';
import { IAtendimentoSorteioFeito } from 'app/shared/model/atendimento-sorteio-feito.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAtendimentoSorteioFeitoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AtendimentoSorteioFeitoUpdate extends React.Component<
  IAtendimentoSorteioFeitoUpdateProps,
  IAtendimentoSorteioFeitoUpdateState
> {
  constructor(props: Readonly<IAtendimentoSorteioFeitoUpdateProps>) {
    super(props);

    this.state = {
      padItemSelectValue: null,
      fieldsBase: getAtendimentoSorteioFeitoState(this.props.location),
      padItemId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }

    if (
      nextProps.padItems.length > 0 &&
      this.state.padItemSelectValue === null &&
      nextProps.atendimentoSorteioFeitoEntity.padItem &&
      nextProps.atendimentoSorteioFeitoEntity.padItem.id
    ) {
      this.setState({
        padItemSelectValue: nextProps.padItems.map(p =>
          nextProps.atendimentoSorteioFeitoEntity.padItem.id === p.id ? { value: p.id, label: p.id } : null
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
      const { atendimentoSorteioFeitoEntity } = this.props;
      const entity = {
        ...atendimentoSorteioFeitoEntity,
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
    this.props.history.push('/atendimento-sorteio-feito?' + this.getFiltersURL());
  };

  render() {
    const { atendimentoSorteioFeitoEntity, padItems, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...atendimentoSorteioFeitoEntity,
                  padItem: atendimentoSorteioFeitoEntity.padItem ? atendimentoSorteioFeitoEntity.padItem.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.atendimentoSorteioFeito.home.createOrEditLabel">
                Create or edit a AtendimentoSorteioFeito
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
              to={'/atendimento-sorteio-feito?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Atendimento Sorteio Feitos</li>
            <li className="breadcrumb-item active">Atendimento Sorteio Feitos edit</li>
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
                        <Label className="mt-2" for="atendimento-sorteio-feito-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput
                                id="atendimento-sorteio-feito-id"
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
                        {baseFilters !== 'sorteioFeito' ? (
                          <Col md="sorteioFeito">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="sorteioFeitoLabel" for="atendimento-sorteio-feito-sorteioFeito">
                                    <Translate contentKey="generadorApp.atendimentoSorteioFeito.sorteioFeito">Sorteio Feito</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="atendimento-sorteio-feito-sorteioFeito"
                                    type="string"
                                    className="form-control"
                                    name="sorteioFeito"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="sorteioFeito" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'padItem' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="atendimento-sorteio-feito-padItem">
                                    <Translate contentKey="generadorApp.atendimentoSorteioFeito.padItem">Pad Item</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="atendimento-sorteio-feito-padItem"
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
                        )}
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
  padItems: storeState.padItem.entities,
  atendimentoSorteioFeitoEntity: storeState.atendimentoSorteioFeito.entity,
  loading: storeState.atendimentoSorteioFeito.loading,
  updating: storeState.atendimentoSorteioFeito.updating,
  updateSuccess: storeState.atendimentoSorteioFeito.updateSuccess
});

const mapDispatchToProps = {
  getPadItems,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AtendimentoSorteioFeitoUpdate);
