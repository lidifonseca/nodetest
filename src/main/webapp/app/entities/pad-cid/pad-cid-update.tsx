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

import { IPad } from 'app/shared/model/pad.model';
import { getEntities as getPads } from 'app/entities/pad/pad.reducer';
import { ICid } from 'app/shared/model/cid.model';
import { getEntities as getCids } from 'app/entities/cid/cid.reducer';
import { IPadCidUpdateState, getEntity, getPadCidState, IPadCidBaseState, updateEntity, createEntity, reset } from './pad-cid.reducer';
import { IPadCid } from 'app/shared/model/pad-cid.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPadCidUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PadCidUpdate extends React.Component<IPadCidUpdateProps, IPadCidUpdateState> {
  constructor(props: Readonly<IPadCidUpdateProps>) {
    super(props);

    this.state = {
      padSelectValue: null,
      cidSelectValue: null,
      fieldsBase: getPadCidState(this.props.location),
      padId: '0',
      cidId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }

    if (nextProps.pads.length > 0 && this.state.padSelectValue === null && nextProps.padCidEntity.pad && nextProps.padCidEntity.pad.id) {
      this.setState({
        padSelectValue: nextProps.pads.map(p => (nextProps.padCidEntity.pad.id === p.id ? { value: p.id, label: p.id } : null))
      });
    }

    if (nextProps.cids.length > 0 && this.state.cidSelectValue === null && nextProps.padCidEntity.cid && nextProps.padCidEntity.cid.id) {
      this.setState({
        cidSelectValue: nextProps.cids.map(p => (nextProps.padCidEntity.cid.id === p.id ? { value: p.id, label: p.id } : null))
      });
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getPads();
    this.props.getCids();
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
      const { padCidEntity } = this.props;
      const entity = {
        ...padCidEntity,
        pad: this.state.padSelectValue ? this.state.padSelectValue['value'] : null,
        cid: this.state.cidSelectValue ? this.state.cidSelectValue['value'] : null,
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
    this.props.history.push('/pad-cid?' + this.getFiltersURL());
  };

  render() {
    const { padCidEntity, pads, cids, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...padCidEntity,
                  pad: padCidEntity.pad ? padCidEntity.pad.id : null,
                  cid: padCidEntity.cid ? padCidEntity.cid.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.padCid.home.createOrEditLabel">Create or edit a PadCid</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/pad-cid?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Pad Cids</li>
            <li className="breadcrumb-item active">Pad Cids edit</li>
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
                        <Label className="mt-2" for="pad-cid-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput id="pad-cid-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'observacao' ? (
                          <Col md="observacao">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="observacaoLabel" for="pad-cid-observacao">
                                    <Translate contentKey="generadorApp.padCid.observacao">Observacao</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-cid-observacao" type="text" name="observacao" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="observacao" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ativo' ? (
                          <Col md="ativo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="ativoLabel" for="pad-cid-ativo">
                                    <Translate contentKey="generadorApp.padCid.ativo">Ativo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="pad-cid-ativo" type="string" className="form-control" name="ativo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'pad' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="pad-cid-pad">
                                    <Translate contentKey="generadorApp.padCid.pad">Pad</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="pad-cid-pad"
                                    className={'css-select-control'}
                                    value={this.state.padSelectValue}
                                    options={pads ? pads.map(option => ({ value: option.id, label: option.id })) : null}
                                    onChange={options => this.setState({ padSelectValue: options })}
                                    name={'pad'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="pad" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'cid' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="pad-cid-cid">
                                    <Translate contentKey="generadorApp.padCid.cid">Cid</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="pad-cid-cid"
                                    className={'css-select-control'}
                                    value={this.state.cidSelectValue}
                                    options={cids ? cids.map(option => ({ value: option.id, label: option.id })) : null}
                                    onChange={options => this.setState({ cidSelectValue: options })}
                                    name={'cid'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="cid" value={this.state.fieldsBase[baseFilters]} />
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
  pads: storeState.pad.entities,
  cids: storeState.cid.entities,
  padCidEntity: storeState.padCid.entity,
  loading: storeState.padCid.loading,
  updating: storeState.padCid.updating,
  updateSuccess: storeState.padCid.updateSuccess
});

const mapDispatchToProps = {
  getPads,
  getCids,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadCidUpdate);
