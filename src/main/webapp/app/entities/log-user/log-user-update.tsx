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
import {
  ILogUserUpdateState,
  getEntity,
  getLogUserState,
  ILogUserBaseState,
  updateEntity,
  createEntity,
  setBlob,
  reset
} from './log-user.reducer';
import { ILogUser } from 'app/shared/model/log-user.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILogUserUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class LogUserUpdate extends React.Component<ILogUserUpdateProps, ILogUserUpdateState> {
  descricaoFileInput: React.RefObject<HTMLInputElement>;

  constructor(props: Readonly<ILogUserUpdateProps>) {
    super(props);

    this.descricaoFileInput = React.createRef();

    this.state = {
      acaoSelectValue: null,
      telaSelectValue: null,
      fieldsBase: getLogUserState(this.props.location),
      acaoId: '0',
      telaId: '0',
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
      nextProps.logUserEntity.acao &&
      nextProps.logUserEntity.acao.id
    ) {
      this.setState({
        acaoSelectValue: nextProps.acaos.map(p => (nextProps.logUserEntity.acao.id === p.id ? { value: p.id, label: p.id } : null))
      });
    }

    if (
      nextProps.telas.length > 0 &&
      this.state.telaSelectValue === null &&
      nextProps.logUserEntity.tela &&
      nextProps.logUserEntity.tela.id
    ) {
      this.setState({
        telaSelectValue: nextProps.telas.map(p => (nextProps.logUserEntity.tela.id === p.id ? { value: p.id, label: p.id } : null))
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
      const { logUserEntity } = this.props;
      const entity = {
        ...logUserEntity,
        acao: this.state.acaoSelectValue ? this.state.acaoSelectValue['value'] : null,
        tela: this.state.telaSelectValue ? this.state.telaSelectValue['value'] : null,
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
    this.props.history.push('/log-user?' + this.getFiltersURL());
  };

  render() {
    const { logUserEntity, acaos, telas, loading, updating } = this.props;
    const { isNew } = this.state;

    const { descricao } = logUserEntity;
    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...logUserEntity,
                  acao: logUserEntity.acao ? logUserEntity.acao.id : null,
                  tela: logUserEntity.tela ? logUserEntity.tela.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.logUser.home.createOrEditLabel">Create or edit a LogUser</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/log-user?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Log Users</li>
            <li className="breadcrumb-item active">Log Users edit</li>
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
                      <Label className="mt-2" for="log-user-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="log-user-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <DescricaoComponentUpdate baseFilters />

                        <AcaoComponentUpdate baseFilter acaos />

                        <TelaComponentUpdate baseFilter telas />
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
  logUserEntity: storeState.logUser.entity,
  loading: storeState.logUser.loading,
  updating: storeState.logUser.updating,
  updateSuccess: storeState.logUser.updateSuccess
});

const mapDispatchToProps = {
  getAcaos,
  getTelas,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const DescricaoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'descricao' ? (
    <Col md="descricao">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="descricaoLabel" for="log-user-descricao">
              <Translate contentKey="generadorApp.logUser.descricao">Descricao</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvInput id="log-user-descricao" type="textarea" name="descricao" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="descricao" value={this.state.fieldsBase[baseFilters]} />
  );
};

const AcaoComponentUpdate = ({ baseFilters, acaos }) => {
  return baseFilters !== 'acao' ? (
    <Col md="12">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" for="log-user-acao">
              <Translate contentKey="generadorApp.logUser.acao">Acao</Translate>
            </Label>
          </Col>
          <Col md="9">
            <Select
              id="log-user-acao"
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
  );
};

const TelaComponentUpdate = ({ baseFilters, telas }) => {
  return baseFilters !== 'tela' ? (
    <Col md="12">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" for="log-user-tela">
              <Translate contentKey="generadorApp.logUser.tela">Tela</Translate>
            </Label>
          </Col>
          <Col md="9">
            <Select
              id="log-user-tela"
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
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LogUserUpdate);
