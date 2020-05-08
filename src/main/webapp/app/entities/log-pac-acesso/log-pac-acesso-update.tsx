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

import {
  ILogPacAcessoUpdateState,
  getEntity,
  getLogPacAcessoState,
  ILogPacAcessoBaseState,
  updateEntity,
  createEntity,
  setBlob,
  reset
} from './log-pac-acesso.reducer';
import { ILogPacAcesso } from 'app/shared/model/log-pac-acesso.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILogPacAcessoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class LogPacAcessoUpdate extends React.Component<ILogPacAcessoUpdateProps, ILogPacAcessoUpdateState> {
  inforAcessoFileInput: React.RefObject<HTMLInputElement>;

  constructor(props: Readonly<ILogPacAcessoUpdateProps>) {
    super(props);

    this.inforAcessoFileInput = React.createRef();

    this.state = {
      fieldsBase: getLogPacAcessoState(this.props.location),
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }
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
      const { logPacAcessoEntity } = this.props;
      const entity = {
        ...logPacAcessoEntity,

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
    this.props.history.push('/log-pac-acesso?' + this.getFiltersURL());
  };

  render() {
    const { logPacAcessoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const { inforAcesso } = logPacAcessoEntity;
    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...logPacAcessoEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.logPacAcesso.home.createOrEditLabel">Create or edit a LogPacAcesso</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/log-pac-acesso?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Log Pac Acessos</li>
            <li className="breadcrumb-item active">Log Pac Acessos edit</li>
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
                        <Label className="mt-2" for="log-pac-acesso-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput id="log-pac-acesso-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'idPaciente' ? (
                          <Col md="idPaciente">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idPacienteLabel" for="log-pac-acesso-idPaciente">
                                    <Translate contentKey="generadorApp.logPacAcesso.idPaciente">Id Paciente</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="log-pac-acesso-idPaciente" type="string" className="form-control" name="idPaciente" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idPaciente" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'profissional' ? (
                          <Col md="profissional">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="profissionalLabel" for="log-pac-acesso-profissional">
                                    <Translate contentKey="generadorApp.logPacAcesso.profissional">Profissional</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="log-pac-acesso-profissional" type="text" name="profissional" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="profissional" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'token' ? (
                          <Col md="token">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="tokenLabel" for="log-pac-acesso-token">
                                    <Translate contentKey="generadorApp.logPacAcesso.token">Token</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="log-pac-acesso-token" type="text" name="token" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="token" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ipLocal' ? (
                          <Col md="ipLocal">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="ipLocalLabel" for="log-pac-acesso-ipLocal">
                                    <Translate contentKey="generadorApp.logPacAcesso.ipLocal">Ip Local</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="log-pac-acesso-ipLocal" type="text" name="ipLocal" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ipLocal" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'inforAcesso' ? (
                          <Col md="inforAcesso">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="inforAcessoLabel" for="log-pac-acesso-inforAcesso">
                                    <Translate contentKey="generadorApp.logPacAcesso.inforAcesso">Infor Acesso</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvInput id="log-pac-acesso-inforAcesso" type="textarea" name="inforAcesso" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="inforAcesso" value={this.state.fieldsBase[baseFilters]} />
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
  logPacAcessoEntity: storeState.logPacAcesso.entity,
  loading: storeState.logPacAcesso.loading,
  updating: storeState.logPacAcesso.updating,
  updateSuccess: storeState.logPacAcesso.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LogPacAcessoUpdate);
