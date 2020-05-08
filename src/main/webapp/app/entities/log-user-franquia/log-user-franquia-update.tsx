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

import { IAcao } from 'app/shared/model/acao.model';
import { getEntities as getAcaos } from 'app/entities/acao/acao.reducer';
import { ITela } from 'app/shared/model/tela.model';
import { getEntities as getTelas } from 'app/entities/tela/tela.reducer';
import { IFranquiaUsuario } from 'app/shared/model/franquia-usuario.model';
import { getEntities as getFranquiaUsuarios } from 'app/entities/franquia-usuario/franquia-usuario.reducer';
import {
  ILogUserFranquiaUpdateState,
  getEntity,
  getLogUserFranquiaState,
  ILogUserFranquiaBaseState,
  updateEntity,
  createEntity,
  setBlob,
  reset
} from './log-user-franquia.reducer';
import { ILogUserFranquia } from 'app/shared/model/log-user-franquia.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILogUserFranquiaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class LogUserFranquiaUpdate extends React.Component<ILogUserFranquiaUpdateProps, ILogUserFranquiaUpdateState> {
  descricaoFileInput: React.RefObject<HTMLInputElement>;

  constructor(props: Readonly<ILogUserFranquiaUpdateProps>) {
    super(props);

    this.descricaoFileInput = React.createRef();

    this.state = {
      acaoSelectValue: null,
      telaSelectValue: null,
      franquiaUsuarioSelectValue: null,
      fieldsBase: getLogUserFranquiaState(this.props.location),
      acaoId: '0',
      telaId: '0',
      usuarioId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }

    if (
      nextProps.acaos.length > 0 &&
      this.state.acaoSelectValue === null &&
      nextProps.logUserFranquiaEntity.acao &&
      nextProps.logUserFranquiaEntity.acao.id
    ) {
      this.setState({
        acaoSelectValue: nextProps.acaos.map(p => (nextProps.logUserFranquiaEntity.acao.id === p.id ? { value: p.id, label: p.id } : null))
      });
    }

    if (
      nextProps.telas.length > 0 &&
      this.state.telaSelectValue === null &&
      nextProps.logUserFranquiaEntity.tela &&
      nextProps.logUserFranquiaEntity.tela.id
    ) {
      this.setState({
        telaSelectValue: nextProps.telas.map(p => (nextProps.logUserFranquiaEntity.tela.id === p.id ? { value: p.id, label: p.id } : null))
      });
    }

    if (
      nextProps.franquiaUsuarios.length > 0 &&
      this.state.franquiaUsuarioSelectValue === null &&
      nextProps.logUserFranquiaEntity.franquiaUsuario &&
      nextProps.logUserFranquiaEntity.franquiaUsuario.id
    ) {
      this.setState({
        franquiaUsuarioSelectValue: nextProps.franquiaUsuarios.map(p =>
          nextProps.logUserFranquiaEntity.franquiaUsuario.id === p.id ? { value: p.id, label: p.id } : null
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

    this.props.getAcaos();
    this.props.getTelas();
    this.props.getFranquiaUsuarios();
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
      const { logUserFranquiaEntity } = this.props;
      const entity = {
        ...logUserFranquiaEntity,
        acao: this.state.acaoSelectValue ? this.state.acaoSelectValue['value'] : null,
        tela: this.state.telaSelectValue ? this.state.telaSelectValue['value'] : null,
        franquiaUsuario: this.state.franquiaUsuarioSelectValue ? this.state.franquiaUsuarioSelectValue['value'] : null,
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
    this.props.history.push('/log-user-franquia?' + this.getFiltersURL());
  };

  render() {
    const { logUserFranquiaEntity, acaos, telas, franquiaUsuarios, loading, updating } = this.props;
    const { isNew } = this.state;

    const { descricao } = logUserFranquiaEntity;
    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...logUserFranquiaEntity,
                  acao: logUserFranquiaEntity.acao ? logUserFranquiaEntity.acao.id : null,
                  tela: logUserFranquiaEntity.tela ? logUserFranquiaEntity.tela.id : null,
                  usuario: logUserFranquiaEntity.usuario ? logUserFranquiaEntity.usuario.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.logUserFranquia.home.createOrEditLabel">Create or edit a LogUserFranquia</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/log-user-franquia?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Log User Franquias</li>
            <li className="breadcrumb-item active">Log User Franquias edit</li>
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
                        <Label className="mt-2" for="log-user-franquia-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput id="log-user-franquia-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'descricao' ? (
                          <Col md="descricao">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="descricaoLabel" for="log-user-franquia-descricao">
                                    <Translate contentKey="generadorApp.logUserFranquia.descricao">Descricao</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="log-user-franquia-descricao" type="textarea" name="descricao" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="descricao" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'acao' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="log-user-franquia-acao">
                                    <Translate contentKey="generadorApp.logUserFranquia.acao">Acao</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="log-user-franquia-acao"
                                    className={'css-select-control'}
                                    value={this.state.acaoSelectValue}
                                    options={acaos ? acaos.map(option => ({ value: option.id, label: option.id })) : null}
                                    onChange={options => this.setState({ acaoSelectValue: options })}
                                    name={'acao'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="acao" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'tela' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="log-user-franquia-tela">
                                    <Translate contentKey="generadorApp.logUserFranquia.tela">Tela</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="log-user-franquia-tela"
                                    className={'css-select-control'}
                                    value={this.state.telaSelectValue}
                                    options={telas ? telas.map(option => ({ value: option.id, label: option.id })) : null}
                                    onChange={options => this.setState({ telaSelectValue: options })}
                                    name={'tela'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="tela" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'usuario' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="log-user-franquia-usuario">
                                    <Translate contentKey="generadorApp.logUserFranquia.usuario">Usuario</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="log-user-franquia-usuario"
                                    className={'css-select-control'}
                                    value={this.state.franquiaUsuarioSelectValue}
                                    options={
                                      franquiaUsuarios ? franquiaUsuarios.map(option => ({ value: option.id, label: option.id })) : null
                                    }
                                    onChange={options => this.setState({ franquiaUsuarioSelectValue: options })}
                                    name={'usuario'}
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="usuario" value={this.state.fieldsBase[baseFilters]} />
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
  acaos: storeState.acao.entities,
  telas: storeState.tela.entities,
  franquiaUsuarios: storeState.franquiaUsuario.entities,
  logUserFranquiaEntity: storeState.logUserFranquia.entity,
  loading: storeState.logUserFranquia.loading,
  updating: storeState.logUserFranquia.updating,
  updateSuccess: storeState.logUserFranquia.updateSuccess
});

const mapDispatchToProps = {
  getAcaos,
  getTelas,
  getFranquiaUsuarios,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LogUserFranquiaUpdate);
