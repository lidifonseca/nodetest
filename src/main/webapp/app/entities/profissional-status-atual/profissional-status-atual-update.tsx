/* eslint complexity: ["error", 300] */
import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IStatusAtualProf } from 'app/shared/model/status-atual-prof.model';
import { getEntities as getStatusAtualProfs } from 'app/entities/status-atual-prof/status-atual-prof.reducer';
import {
  IProfissionalStatusAtualUpdateState,
  getEntity,
  getProfissionalStatusAtualState,
  IProfissionalStatusAtualBaseState,
  updateEntity,
  createEntity,
  setBlob,
  reset
} from './profissional-status-atual.reducer';
import { IProfissionalStatusAtual } from 'app/shared/model/profissional-status-atual.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProfissionalStatusAtualUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProfissionalStatusAtualUpdate extends React.Component<
  IProfissionalStatusAtualUpdateProps,
  IProfissionalStatusAtualUpdateState
> {
  obsFileInput: React.RefObject<HTMLInputElement>;

  constructor(props: Readonly<IProfissionalStatusAtualUpdateProps>) {
    super(props);

    this.obsFileInput = React.createRef();

    this.state = {
      statusAtualProfSelectValue: null,
      fieldsBase: getProfissionalStatusAtualState(this.props.location),
      statusAtualProfId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }

    if (
      nextProps.statusAtualProfs.length > 0 &&
      this.state.statusAtualProfSelectValue === null &&
      nextProps.profissionalStatusAtualEntity.statusAtualProf &&
      nextProps.profissionalStatusAtualEntity.statusAtualProf.id
    ) {
      this.setState({
        statusAtualProfSelectValue: nextProps.statusAtualProfs.map(p =>
          nextProps.profissionalStatusAtualEntity.statusAtualProf.id === p.id ? { value: p.id, label: p.id } : null
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

    this.props.getStatusAtualProfs();
  }

  onBlobChange = (isAnImage, name, fileInput) => event => {
    const fileName = fileInput.current.files[0].name;
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType, fileName), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };
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
      const { profissionalStatusAtualEntity } = this.props;
      const entity = {
        ...profissionalStatusAtualEntity,
        statusAtualProf: this.state.statusAtualProfSelectValue ? this.state.statusAtualProfSelectValue['value'] : null,
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
    this.props.history.push('/profissional-status-atual?' + this.getFiltersURL());
  };

  render() {
    const { profissionalStatusAtualEntity, statusAtualProfs, loading, updating } = this.props;
    const { isNew } = this.state;

    const { obs } = profissionalStatusAtualEntity;
    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...profissionalStatusAtualEntity,
                  statusAtualProf: profissionalStatusAtualEntity.statusAtualProf ? profissionalStatusAtualEntity.statusAtualProf.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.profissionalStatusAtual.home.createOrEditLabel">
                Create or edit a ProfissionalStatusAtual
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
              to={'/profissional-status-atual?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Profissional Status Atuals</li>
            <li className="breadcrumb-item active">Profissional Status Atuals edit</li>
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
                        <Label className="mt-2" for="profissional-status-atual-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput
                                id="profissional-status-atual-id"
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
                        {baseFilters !== 'idProfissional' ? (
                          <Col md="idProfissional">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idProfissionalLabel" for="profissional-status-atual-idProfissional">
                                    <Translate contentKey="generadorApp.profissionalStatusAtual.idProfissional">Id Profissional</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-status-atual-idProfissional" type="text" name="idProfissional" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idProfissional" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'obs' ? (
                          <Col md="obs">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="obsLabel" for="profissional-status-atual-obs">
                                    <Translate contentKey="generadorApp.profissionalStatusAtual.obs">Obs</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="profissional-status-atual-obs" type="textarea" name="obs" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="obs" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ativo' ? (
                          <Col md="ativo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="ativoLabel" for="profissional-status-atual-ativo">
                                    <Translate contentKey="generadorApp.profissionalStatusAtual.ativo">Ativo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-status-atual-ativo" type="string" className="form-control" name="ativo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'statusAtualProf' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="profissional-status-atual-statusAtualProf">
                                    <Translate contentKey="generadorApp.profissionalStatusAtual.statusAtualProf">
                                      Status Atual Prof
                                    </Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="profissional-status-atual-statusAtualProf"
                                    className={'css-select-control'}
                                    value={this.state.statusAtualProfSelectValue}
                                    options={
                                      statusAtualProfs ? statusAtualProfs.map(option => ({ value: option.id, label: option.id })) : null
                                    }
                                    onChange={options => this.setState({ statusAtualProfSelectValue: options })}
                                    name={'statusAtualProf'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="statusAtualProf" value={this.state.fieldsBase[baseFilters]} />
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
  statusAtualProfs: storeState.statusAtualProf.entities,
  profissionalStatusAtualEntity: storeState.profissionalStatusAtual.entity,
  loading: storeState.profissionalStatusAtual.loading,
  updating: storeState.profissionalStatusAtual.updating,
  updateSuccess: storeState.profissionalStatusAtual.updateSuccess
});

const mapDispatchToProps = {
  getStatusAtualProfs,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalStatusAtualUpdate);
