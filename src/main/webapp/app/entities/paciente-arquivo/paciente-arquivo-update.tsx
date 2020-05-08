import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';
import {
  IPacienteArquivoUpdateState,
  getEntity,
  getPacienteArquivoState,
  IPacienteArquivoBaseState,
  updateEntity,
  createEntity,
  setBlob,
  reset
} from './paciente-arquivo.reducer';
import { IPacienteArquivo } from 'app/shared/model/paciente-arquivo.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPacienteArquivoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteArquivoUpdate extends React.Component<IPacienteArquivoUpdateProps, IPacienteArquivoUpdateState> {
  arquivoFileInput: React.RefObject<HTMLInputElement>;

  constructor(props: Readonly<IPacienteArquivoUpdateProps>) {
    super(props);

    this.arquivoFileInput = React.createRef();

    this.state = {
      pacienteSelectValue: null,
      fieldsBase: getPacienteArquivoState(this.props.location),
      pacienteId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }
  componentDidUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }

    if (
      nextProps.pacientes.length > 0 &&
      this.state.pacienteSelectValue === null &&
      nextProps.pacienteArquivoEntity.paciente &&
      nextProps.pacienteArquivoEntity.paciente.id
    ) {
      this.setState({
        pacienteSelectValue: nextProps.pacientes.map(p =>
          nextProps.pacienteArquivoEntity.paciente.id === p.id ? { value: p.id, label: p.nome } : null
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

    this.props.getPacientes();
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
      const { pacienteArquivoEntity } = this.props;
      const entity = {
        ...pacienteArquivoEntity,
        paciente: this.state.pacienteSelectValue ? this.state.pacienteSelectValue['value'] : null,
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
    this.props.history.push('/paciente-arquivo?' + this.getFiltersURL());
  };

  render() {
    const { pacienteArquivoEntity, pacientes, loading, updating } = this.props;
    const { isNew } = this.state;

    const { arquivo, arquivoContentType, arquivoBase64 } = pacienteArquivoEntity;
    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...pacienteArquivoEntity,
                  paciente: pacienteArquivoEntity.paciente ? pacienteArquivoEntity.paciente.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.pacienteArquivo.home.createOrEditLabel">Create or edit a PacienteArquivo</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/paciente-arquivo?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Paciente Arquivos</li>
            <li className="breadcrumb-item active">Paciente Arquivos edit</li>
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
                      <Label className="mt-2" for="paciente-arquivo-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="paciente-arquivo-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        <ArquivoComponentUpdate baseFilters />

                        <AtivoComponentUpdate baseFilters />

                        <PacienteComponentUpdate baseFilter pacientes />
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
  pacientes: storeState.paciente.entities,
  pacienteArquivoEntity: storeState.pacienteArquivo.entity,
  loading: storeState.pacienteArquivo.loading,
  updating: storeState.pacienteArquivo.updating,
  updateSuccess: storeState.pacienteArquivo.updateSuccess
});

const mapDispatchToProps = {
  getPacientes,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const ArquivoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'arquivo' ? (
    <Col md="arquivo">
      <AvGroup>
        <Row>
          <Col md="12">
            <AvGroup>
              <Row>
                <Col md="3">
                  <Label className="mt-2" id="arquivoLabel" for="arquivo">
                    <Translate contentKey="generadorApp.pacienteArquivo.arquivo">Arquivo</Translate>
                  </Label>
                </Col>
                <Col md="9">
                  <br />
                  {arquivo || arquivoBase64 ? (
                    <div>
                      <Row>
                        <Col md="11"></Col>
                        <Col md="1">
                          <Button color="danger" onClick={this.clearBlob('arquivo')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                      <a rel="noopener noreferrer" target={'_blank'} href={`${arquivo}`}>
                        <img
                          src={`${arquivoBase64 ? 'data:' + arquivoContentType + ';base64,' + arquivoBase64 : arquivo}`}
                          style={{ maxHeight: '100px' }}
                        />
                      </a>
                      <br />
                    </div>
                  ) : null}
                  <input
                    id="file_arquivo"
                    type="file"
                    ref={this.arquivoFileInput}
                    onChange={this.onBlobChange(true, 'arquivo', this.arquivoFileInput)}
                    accept="image/*"
                  />
                  <AvInput type="hidden" name="arquivo" value={arquivo} />
                </Col>
              </Row>
            </AvGroup>
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="arquivo" value={this.state.fieldsBase[baseFilters]} />
  );
};

const AtivoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ativo' ? (
    <Col md="ativo">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="ativoLabel" for="paciente-arquivo-ativo">
              <Translate contentKey="generadorApp.pacienteArquivo.ativo">Ativo</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="paciente-arquivo-ativo" type="string" className="form-control" name="ativo" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
  );
};

const PacienteComponentUpdate = ({ baseFilters, pacientes }) => {
  return baseFilters !== 'paciente' ? (
    <Col md="12">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" for="paciente-arquivo-paciente">
              <Translate contentKey="generadorApp.pacienteArquivo.paciente">Paciente</Translate>
            </Label>
          </Col>
          <Col md="9">
            <Select
              id="paciente-arquivo-paciente"
              className={'css-select-control'}
              value={this.state.pacienteSelectValue}
              options={pacientes ? pacientes.map(option => ({ value: option.id, label: option.nome })) : null}
              onChange={options => this.setState({ pacienteSelectValue: options })}
              name={'paciente'}
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="paciente" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PacienteArquivoUpdate);
