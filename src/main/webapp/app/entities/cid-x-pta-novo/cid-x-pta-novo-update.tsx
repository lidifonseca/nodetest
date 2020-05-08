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

import { ICid } from 'app/shared/model/cid.model';
import { getEntities as getCids } from 'app/entities/cid/cid.reducer';
import {
  ICidXPtaNovoUpdateState,
  getEntity,
  getCidXPtaNovoState,
  ICidXPtaNovoBaseState,
  updateEntity,
  createEntity,
  reset
} from './cid-x-pta-novo.reducer';
import { ICidXPtaNovo } from 'app/shared/model/cid-x-pta-novo.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICidXPtaNovoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CidXPtaNovoUpdate extends React.Component<ICidXPtaNovoUpdateProps, ICidXPtaNovoUpdateState> {
  constructor(props: Readonly<ICidXPtaNovoUpdateProps>) {
    super(props);

    this.state = {
      cidSelectValue: null,
      fieldsBase: getCidXPtaNovoState(this.props.location),
      cidId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }

    if (
      nextProps.cids.length > 0 &&
      this.state.cidSelectValue === null &&
      nextProps.cidXPtaNovoEntity.cid &&
      nextProps.cidXPtaNovoEntity.cid.id
    ) {
      this.setState({
        cidSelectValue: nextProps.cids.map(p => (nextProps.cidXPtaNovoEntity.cid.id === p.id ? { value: p.id, label: p.id } : null))
      });
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

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
      const { cidXPtaNovoEntity } = this.props;
      const entity = {
        ...cidXPtaNovoEntity,
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
    this.props.history.push('/cid-x-pta-novo?' + this.getFiltersURL());
  };

  render() {
    const { cidXPtaNovoEntity, cids, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...cidXPtaNovoEntity,
                  cid: cidXPtaNovoEntity.cid ? cidXPtaNovoEntity.cid.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.cidXPtaNovo.home.createOrEditLabel">Create or edit a CidXPtaNovo</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/cid-x-pta-novo?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Cid X Pta Novos</li>
            <li className="breadcrumb-item active">Cid X Pta Novos edit</li>
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
                      <Label className="mt-2" for="cid-x-pta-novo-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="cid-x-pta-novo-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <ComplexidadeComponentUpdate baseFilters />

                        <VersaoComponentUpdate baseFilters />

                        <ScoreComponentUpdate baseFilters />

                        <TituloComponentUpdate baseFilters />

                        <CidXPtaNovoPadItemIndiComponentUpdate baseFilter cidXPtaNovoPadItemIndis />

                        <CidComponentUpdate baseFilter cids />
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
  cids: storeState.cid.entities,
  cidXPtaNovoEntity: storeState.cidXPtaNovo.entity,
  loading: storeState.cidXPtaNovo.loading,
  updating: storeState.cidXPtaNovo.updating,
  updateSuccess: storeState.cidXPtaNovo.updateSuccess
});

const mapDispatchToProps = {
  getCids,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const ComplexidadeComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'complexidade' ? (
    <Col md="complexidade">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="complexidadeLabel" for="cid-x-pta-novo-complexidade">
              <Translate contentKey="generadorApp.cidXPtaNovo.complexidade">Complexidade</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="cid-x-pta-novo-complexidade" type="text" name="complexidade" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="complexidade" value={this.state.fieldsBase[baseFilters]} />
  );
};

const VersaoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'versao' ? (
    <Col md="versao">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="versaoLabel" for="cid-x-pta-novo-versao">
              <Translate contentKey="generadorApp.cidXPtaNovo.versao">Versao</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="cid-x-pta-novo-versao" type="string" className="form-control" name="versao" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="versao" value={this.state.fieldsBase[baseFilters]} />
  );
};

const ScoreComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'score' ? (
    <Col md="score">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="scoreLabel" for="cid-x-pta-novo-score">
              <Translate contentKey="generadorApp.cidXPtaNovo.score">Score</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="cid-x-pta-novo-score" type="string" className="form-control" name="score" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="score" value={this.state.fieldsBase[baseFilters]} />
  );
};

const TituloComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'titulo' ? (
    <Col md="titulo">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="tituloLabel" for="cid-x-pta-novo-titulo">
              <Translate contentKey="generadorApp.cidXPtaNovo.titulo">Titulo</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="cid-x-pta-novo-titulo" type="text" name="titulo" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="titulo" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CidXPtaNovoPadItemIndiComponentUpdate = ({ baseFilters, cidXPtaNovoPadItemIndis }) => {
  return baseFilters !== 'cidXPtaNovoPadItemIndi' ? (
    <Col md="12"></Col>
  ) : (
    <AvInput type="hidden" name="cidXPtaNovoPadItemIndi" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CidComponentUpdate = ({ baseFilters, cids }) => {
  return baseFilters !== 'cid' ? (
    <Col md="12">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" for="cid-x-pta-novo-cid">
              <Translate contentKey="generadorApp.cidXPtaNovo.cid">Cid</Translate>
            </Label>
          </Col>
          <Col md="9">
            <Select
              id="cid-x-pta-novo-cid"
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
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(CidXPtaNovoUpdate);
