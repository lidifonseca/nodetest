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

import { IUf } from 'app/shared/model/uf.model';
import { getEntities as getUfs } from 'app/entities/uf/uf.reducer';
import { ICidadeUpdateState, getEntity, getCidadeState, ICidadeBaseState, updateEntity, createEntity, reset } from './cidade.reducer';
import { ICidade } from 'app/shared/model/cidade.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICidadeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CidadeUpdate extends React.Component<ICidadeUpdateProps, ICidadeUpdateState> {
  constructor(props: Readonly<ICidadeUpdateProps>) {
    super(props);

    this.state = {
      ufSelectValue: null,
      fieldsBase: getCidadeState(this.props.location),
      ufId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }

    if (nextProps.ufs.length > 0 && this.state.ufSelectValue === null && nextProps.cidadeEntity.uf && nextProps.cidadeEntity.uf.id) {
      this.setState({
        ufSelectValue: nextProps.ufs.map(p => (nextProps.cidadeEntity.uf.id === p.id ? { value: p.id, label: p.id } : null))
      });
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getUfs();
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
      const { cidadeEntity } = this.props;
      const entity = {
        ...cidadeEntity,
        uf: this.state.ufSelectValue ? this.state.ufSelectValue['value'] : null,
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
    this.props.history.push('/cidade?' + this.getFiltersURL());
  };

  render() {
    const { cidadeEntity, ufs, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...cidadeEntity,
                  uf: cidadeEntity.uf ? cidadeEntity.uf.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.cidade.home.createOrEditLabel">Create or edit a Cidade</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/cidade?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Cidades</li>
            <li className="breadcrumb-item active">Cidades edit</li>
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
                        <Label className="mt-2" for="cidade-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput id="cidade-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'descrCidade' ? (
                          <Col md="descrCidade">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="descrCidadeLabel" for="cidade-descrCidade">
                                    <Translate contentKey="generadorApp.cidade.descrCidade">Descr Cidade</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="cidade-descrCidade" type="text" name="descrCidade" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="descrCidade" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'atendimento' ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="atendimento" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'empresa' ? (
                          <Col md="12"></Col>
                        ) : (
                          <AvInput type="hidden" name="empresa" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'uf' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="cidade-uf">
                                    <Translate contentKey="generadorApp.cidade.uf">Uf</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="cidade-uf"
                                    className={'css-select-control'}
                                    value={this.state.ufSelectValue}
                                    options={ufs ? ufs.map(option => ({ value: option.id, label: option.id })) : null}
                                    onChange={options => this.setState({ ufSelectValue: options })}
                                    name={'uf'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="uf" value={this.state.fieldsBase[baseFilters]} />
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
  ufs: storeState.uf.entities,
  cidadeEntity: storeState.cidade.entity,
  loading: storeState.cidade.loading,
  updating: storeState.cidade.updating,
  updateSuccess: storeState.cidade.updateSuccess
});

const mapDispatchToProps = {
  getUfs,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CidadeUpdate);
