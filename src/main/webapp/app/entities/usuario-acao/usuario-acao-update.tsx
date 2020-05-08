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

import { ITela } from 'app/shared/model/tela.model';
import { getEntities as getTelas } from 'app/entities/tela/tela.reducer';
import { IAcao } from 'app/shared/model/acao.model';
import { getEntities as getAcaos } from 'app/entities/acao/acao.reducer';
import {
  IUsuarioAcaoUpdateState,
  getEntity,
  getUsuarioAcaoState,
  IUsuarioAcaoBaseState,
  updateEntity,
  createEntity,
  setBlob,
  reset
} from './usuario-acao.reducer';
import { IUsuarioAcao } from 'app/shared/model/usuario-acao.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUsuarioAcaoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class UsuarioAcaoUpdate extends React.Component<IUsuarioAcaoUpdateProps, IUsuarioAcaoUpdateState> {
  descricaoFileInput: React.RefObject<HTMLInputElement>;

  constructor(props: Readonly<IUsuarioAcaoUpdateProps>) {
    super(props);

    this.descricaoFileInput = React.createRef();

    this.state = {
      telaSelectValue: null,
      acaoSelectValue: null,
      fieldsBase: getUsuarioAcaoState(this.props.location),
      telaId: '0',
      acaoId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }

    if (
      nextProps.telas.length > 0 &&
      this.state.telaSelectValue === null &&
      nextProps.usuarioAcaoEntity.tela &&
      nextProps.usuarioAcaoEntity.tela.id
    ) {
      this.setState({
        telaSelectValue: nextProps.telas.map(p => (nextProps.usuarioAcaoEntity.tela.id === p.id ? { value: p.id, label: p.id } : null))
      });
    }

    if (
      nextProps.acaos.length > 0 &&
      this.state.acaoSelectValue === null &&
      nextProps.usuarioAcaoEntity.acao &&
      nextProps.usuarioAcaoEntity.acao.id
    ) {
      this.setState({
        acaoSelectValue: nextProps.acaos.map(p => (nextProps.usuarioAcaoEntity.acao.id === p.id ? { value: p.id, label: p.id } : null))
      });
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getTelas();
    this.props.getAcaos();
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
      const { usuarioAcaoEntity } = this.props;
      const entity = {
        ...usuarioAcaoEntity,
        tela: this.state.telaSelectValue ? this.state.telaSelectValue['value'] : null,
        acao: this.state.acaoSelectValue ? this.state.acaoSelectValue['value'] : null,
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
    this.props.history.push('/usuario-acao?' + this.getFiltersURL());
  };

  render() {
    const { usuarioAcaoEntity, telas, acaos, loading, updating } = this.props;
    const { isNew } = this.state;

    const { descricao } = usuarioAcaoEntity;
    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...usuarioAcaoEntity,
                  tela: usuarioAcaoEntity.tela ? usuarioAcaoEntity.tela.id : null,
                  acao: usuarioAcaoEntity.acao ? usuarioAcaoEntity.acao.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.usuarioAcao.home.createOrEditLabel">Create or edit a UsuarioAcao</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/usuario-acao?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Usuario Acaos</li>
            <li className="breadcrumb-item active">Usuario Acaos edit</li>
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
                        <Label className="mt-2" for="usuario-acao-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput id="usuario-acao-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'idAtendimento' ? (
                          <Col md="idAtendimento">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idAtendimentoLabel" for="usuario-acao-idAtendimento">
                                    <Translate contentKey="generadorApp.usuarioAcao.idAtendimento">Id Atendimento</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="usuario-acao-idAtendimento" type="string" className="form-control" name="idAtendimento" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idAtendimento" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'descricao' ? (
                          <Col md="descricao">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="descricaoLabel" for="usuario-acao-descricao">
                                    <Translate contentKey="generadorApp.usuarioAcao.descricao">Descricao</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="usuario-acao-descricao" type="textarea" name="descricao" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="descricao" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'tela' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="usuario-acao-tela">
                                    <Translate contentKey="generadorApp.usuarioAcao.tela">Tela</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="usuario-acao-tela"
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
                        {baseFilters !== 'acao' ? (
                          <Col md="12">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" for="usuario-acao-acao">
                                    <Translate contentKey="generadorApp.usuarioAcao.acao">Acao</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <Select
                                    id="usuario-acao-acao"
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
  telas: storeState.tela.entities,
  acaos: storeState.acao.entities,
  usuarioAcaoEntity: storeState.usuarioAcao.entity,
  loading: storeState.usuarioAcao.loading,
  updating: storeState.usuarioAcao.updating,
  updateSuccess: storeState.usuarioAcao.updateSuccess
});

const mapDispatchToProps = {
  getTelas,
  getAcaos,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UsuarioAcaoUpdate);
