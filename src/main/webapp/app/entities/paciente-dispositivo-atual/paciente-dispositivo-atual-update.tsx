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

import {
  IPacienteDispositivoAtualUpdateState,
  getEntity,
  getPacienteDispositivoAtualState,
  IPacienteDispositivoAtualBaseState,
  updateEntity,
  createEntity,
  reset
} from './paciente-dispositivo-atual.reducer';
import { IPacienteDispositivoAtual } from 'app/shared/model/paciente-dispositivo-atual.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPacienteDispositivoAtualUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PacienteDispositivoAtualUpdate extends React.Component<
  IPacienteDispositivoAtualUpdateProps,
  IPacienteDispositivoAtualUpdateState
> {
  constructor(props: Readonly<IPacienteDispositivoAtualUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getPacienteDispositivoAtualState(this.props.location),
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
      const { pacienteDispositivoAtualEntity } = this.props;
      const entity = {
        ...pacienteDispositivoAtualEntity,

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
    this.props.history.push('/paciente-dispositivo-atual?' + this.getFiltersURL());
  };

  render() {
    const { pacienteDispositivoAtualEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...pacienteDispositivoAtualEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.pacienteDispositivoAtual.home.createOrEditLabel">
                Create or edit a PacienteDispositivoAtual
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
              to={'/paciente-dispositivo-atual?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Paciente Dispositivo Atuals</li>
            <li className="breadcrumb-item active">Paciente Dispositivo Atuals edit</li>
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
                      <Label className="mt-2" for="paciente-dispositivo-atual-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput
                                id="paciente-dispositivo-atual-id"
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
                        <IdPacienteComponentUpdate baseFilters />

                        <IdPacienteDispositivoComponentUpdate baseFilters />

                        <TqtTraqueostomiaComponentUpdate baseFilters />

                        <GttGastrostomiaComponentUpdate baseFilters />

                        <SneSondaNasoenteralComponentUpdate baseFilters />

                        <SvdSondaVesicalDeDemoraComponentUpdate baseFilters />

                        <SvaSondaVesicalDeAlivioComponentUpdate baseFilters />

                        <PortACathComponentUpdate baseFilters />

                        <PiccAcessoVenosoCentralComponentUpdate baseFilters />

                        <VentiladoresComponentUpdate baseFilters />

                        <UppUlceraPorPressaoComponentUpdate baseFilters />

                        <AvpAcessoVenosoPerifericoComponentUpdate baseFilters />

                        <UripenComponentUpdate baseFilters />

                        <FraldaGeriatricaComponentUpdate baseFilters />

                        <SngSondaNasogastricaComponentUpdate baseFilters />

                        <BipapComponentUpdate baseFilters />

                        <CpapComponentUpdate baseFilters />

                        <CistostomiaComponentUpdate baseFilters />

                        <CateterNasalDeOxigenioComponentUpdate baseFilters />

                        <MascaraDeVentilacaoComponentUpdate baseFilters />

                        <EntubacaoOrotraquealComponentUpdate baseFilters />

                        <IleostomiaComponentUpdate baseFilters />

                        <JejunostomiaComponentUpdate baseFilters />

                        <ColostomiaComponentUpdate baseFilters />
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
  pacienteDispositivoAtualEntity: storeState.pacienteDispositivoAtual.entity,
  loading: storeState.pacienteDispositivoAtual.loading,
  updating: storeState.pacienteDispositivoAtual.updating,
  updateSuccess: storeState.pacienteDispositivoAtual.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

const IdPacienteComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'idPaciente' ? (
    <Col md="idPaciente">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="idPacienteLabel" for="paciente-dispositivo-atual-idPaciente">
              <Translate contentKey="generadorApp.pacienteDispositivoAtual.idPaciente">Id Paciente</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="paciente-dispositivo-atual-idPaciente" type="string" className="form-control" name="idPaciente" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="idPaciente" value={this.state.fieldsBase[baseFilters]} />
  );
};

const IdPacienteDispositivoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'idPacienteDispositivo' ? (
    <Col md="idPacienteDispositivo">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="idPacienteDispositivoLabel" for="paciente-dispositivo-atual-idPacienteDispositivo">
              <Translate contentKey="generadorApp.pacienteDispositivoAtual.idPacienteDispositivo">Id Paciente Dispositivo</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField
              id="paciente-dispositivo-atual-idPacienteDispositivo"
              type="string"
              className="form-control"
              name="idPacienteDispositivo"
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="idPacienteDispositivo" value={this.state.fieldsBase[baseFilters]} />
  );
};

const TqtTraqueostomiaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'tqtTraqueostomia' ? (
    <Col md="tqtTraqueostomia">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="tqtTraqueostomiaLabel" for="paciente-dispositivo-atual-tqtTraqueostomia">
              <Translate contentKey="generadorApp.pacienteDispositivoAtual.tqtTraqueostomia">Tqt Traqueostomia</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="paciente-dispositivo-atual-tqtTraqueostomia" type="string" className="form-control" name="tqtTraqueostomia" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="tqtTraqueostomia" value={this.state.fieldsBase[baseFilters]} />
  );
};

const GttGastrostomiaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'gttGastrostomia' ? (
    <Col md="gttGastrostomia">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="gttGastrostomiaLabel" for="paciente-dispositivo-atual-gttGastrostomia">
              <Translate contentKey="generadorApp.pacienteDispositivoAtual.gttGastrostomia">Gtt Gastrostomia</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="paciente-dispositivo-atual-gttGastrostomia" type="string" className="form-control" name="gttGastrostomia" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="gttGastrostomia" value={this.state.fieldsBase[baseFilters]} />
  );
};

const SneSondaNasoenteralComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'sneSondaNasoenteral' ? (
    <Col md="sneSondaNasoenteral">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="sneSondaNasoenteralLabel" for="paciente-dispositivo-atual-sneSondaNasoenteral">
              <Translate contentKey="generadorApp.pacienteDispositivoAtual.sneSondaNasoenteral">Sne Sonda Nasoenteral</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField
              id="paciente-dispositivo-atual-sneSondaNasoenteral"
              type="string"
              className="form-control"
              name="sneSondaNasoenteral"
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="sneSondaNasoenteral" value={this.state.fieldsBase[baseFilters]} />
  );
};

const SvdSondaVesicalDeDemoraComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'svdSondaVesicalDeDemora' ? (
    <Col md="svdSondaVesicalDeDemora">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="svdSondaVesicalDeDemoraLabel" for="paciente-dispositivo-atual-svdSondaVesicalDeDemora">
              <Translate contentKey="generadorApp.pacienteDispositivoAtual.svdSondaVesicalDeDemora">Svd Sonda Vesical De Demora</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField
              id="paciente-dispositivo-atual-svdSondaVesicalDeDemora"
              type="string"
              className="form-control"
              name="svdSondaVesicalDeDemora"
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="svdSondaVesicalDeDemora" value={this.state.fieldsBase[baseFilters]} />
  );
};

const SvaSondaVesicalDeAlivioComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'svaSondaVesicalDeAlivio' ? (
    <Col md="svaSondaVesicalDeAlivio">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="svaSondaVesicalDeAlivioLabel" for="paciente-dispositivo-atual-svaSondaVesicalDeAlivio">
              <Translate contentKey="generadorApp.pacienteDispositivoAtual.svaSondaVesicalDeAlivio">Sva Sonda Vesical De Alivio</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField
              id="paciente-dispositivo-atual-svaSondaVesicalDeAlivio"
              type="string"
              className="form-control"
              name="svaSondaVesicalDeAlivio"
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="svaSondaVesicalDeAlivio" value={this.state.fieldsBase[baseFilters]} />
  );
};

const PortACathComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'portACath' ? (
    <Col md="portACath">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="portACathLabel" for="paciente-dispositivo-atual-portACath">
              <Translate contentKey="generadorApp.pacienteDispositivoAtual.portACath">Port A Cath</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="paciente-dispositivo-atual-portACath" type="string" className="form-control" name="portACath" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="portACath" value={this.state.fieldsBase[baseFilters]} />
  );
};

const PiccAcessoVenosoCentralComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'piccAcessoVenosoCentral' ? (
    <Col md="piccAcessoVenosoCentral">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="piccAcessoVenosoCentralLabel" for="paciente-dispositivo-atual-piccAcessoVenosoCentral">
              <Translate contentKey="generadorApp.pacienteDispositivoAtual.piccAcessoVenosoCentral">Picc Acesso Venoso Central</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField
              id="paciente-dispositivo-atual-piccAcessoVenosoCentral"
              type="string"
              className="form-control"
              name="piccAcessoVenosoCentral"
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="piccAcessoVenosoCentral" value={this.state.fieldsBase[baseFilters]} />
  );
};

const VentiladoresComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ventiladores' ? (
    <Col md="ventiladores">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="ventiladoresLabel" for="paciente-dispositivo-atual-ventiladores">
              <Translate contentKey="generadorApp.pacienteDispositivoAtual.ventiladores">Ventiladores</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="paciente-dispositivo-atual-ventiladores" type="string" className="form-control" name="ventiladores" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="ventiladores" value={this.state.fieldsBase[baseFilters]} />
  );
};

const UppUlceraPorPressaoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'uppUlceraPorPressao' ? (
    <Col md="uppUlceraPorPressao">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="uppUlceraPorPressaoLabel" for="paciente-dispositivo-atual-uppUlceraPorPressao">
              <Translate contentKey="generadorApp.pacienteDispositivoAtual.uppUlceraPorPressao">Upp Ulcera Por Pressao</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField
              id="paciente-dispositivo-atual-uppUlceraPorPressao"
              type="string"
              className="form-control"
              name="uppUlceraPorPressao"
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="uppUlceraPorPressao" value={this.state.fieldsBase[baseFilters]} />
  );
};

const AvpAcessoVenosoPerifericoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'avpAcessoVenosoPeriferico' ? (
    <Col md="avpAcessoVenosoPeriferico">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="avpAcessoVenosoPerifericoLabel" for="paciente-dispositivo-atual-avpAcessoVenosoPeriferico">
              <Translate contentKey="generadorApp.pacienteDispositivoAtual.avpAcessoVenosoPeriferico">
                Avp Acesso Venoso Periferico
              </Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField
              id="paciente-dispositivo-atual-avpAcessoVenosoPeriferico"
              type="string"
              className="form-control"
              name="avpAcessoVenosoPeriferico"
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="avpAcessoVenosoPeriferico" value={this.state.fieldsBase[baseFilters]} />
  );
};

const UripenComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'uripen' ? (
    <Col md="uripen">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="uripenLabel" for="paciente-dispositivo-atual-uripen">
              <Translate contentKey="generadorApp.pacienteDispositivoAtual.uripen">Uripen</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="paciente-dispositivo-atual-uripen" type="string" className="form-control" name="uripen" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="uripen" value={this.state.fieldsBase[baseFilters]} />
  );
};

const FraldaGeriatricaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'fraldaGeriatrica' ? (
    <Col md="fraldaGeriatrica">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="fraldaGeriatricaLabel" for="paciente-dispositivo-atual-fraldaGeriatrica">
              <Translate contentKey="generadorApp.pacienteDispositivoAtual.fraldaGeriatrica">Fralda Geriatrica</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="paciente-dispositivo-atual-fraldaGeriatrica" type="string" className="form-control" name="fraldaGeriatrica" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="fraldaGeriatrica" value={this.state.fieldsBase[baseFilters]} />
  );
};

const SngSondaNasogastricaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'sngSondaNasogastrica' ? (
    <Col md="sngSondaNasogastrica">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="sngSondaNasogastricaLabel" for="paciente-dispositivo-atual-sngSondaNasogastrica">
              <Translate contentKey="generadorApp.pacienteDispositivoAtual.sngSondaNasogastrica">Sng Sonda Nasogastrica</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField
              id="paciente-dispositivo-atual-sngSondaNasogastrica"
              type="string"
              className="form-control"
              name="sngSondaNasogastrica"
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="sngSondaNasogastrica" value={this.state.fieldsBase[baseFilters]} />
  );
};

const BipapComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'bipap' ? (
    <Col md="bipap">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="bipapLabel" for="paciente-dispositivo-atual-bipap">
              <Translate contentKey="generadorApp.pacienteDispositivoAtual.bipap">Bipap</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="paciente-dispositivo-atual-bipap" type="string" className="form-control" name="bipap" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="bipap" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CpapComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cpap' ? (
    <Col md="cpap">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="cpapLabel" for="paciente-dispositivo-atual-cpap">
              <Translate contentKey="generadorApp.pacienteDispositivoAtual.cpap">Cpap</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="paciente-dispositivo-atual-cpap" type="string" className="form-control" name="cpap" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="cpap" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CistostomiaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cistostomia' ? (
    <Col md="cistostomia">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="cistostomiaLabel" for="paciente-dispositivo-atual-cistostomia">
              <Translate contentKey="generadorApp.pacienteDispositivoAtual.cistostomia">Cistostomia</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="paciente-dispositivo-atual-cistostomia" type="string" className="form-control" name="cistostomia" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="cistostomia" value={this.state.fieldsBase[baseFilters]} />
  );
};

const CateterNasalDeOxigenioComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'cateterNasalDeOxigenio' ? (
    <Col md="cateterNasalDeOxigenio">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="cateterNasalDeOxigenioLabel" for="paciente-dispositivo-atual-cateterNasalDeOxigenio">
              <Translate contentKey="generadorApp.pacienteDispositivoAtual.cateterNasalDeOxigenio">Cateter Nasal De Oxigenio</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField
              id="paciente-dispositivo-atual-cateterNasalDeOxigenio"
              type="string"
              className="form-control"
              name="cateterNasalDeOxigenio"
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="cateterNasalDeOxigenio" value={this.state.fieldsBase[baseFilters]} />
  );
};

const MascaraDeVentilacaoComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'mascaraDeVentilacao' ? (
    <Col md="mascaraDeVentilacao">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="mascaraDeVentilacaoLabel" for="paciente-dispositivo-atual-mascaraDeVentilacao">
              <Translate contentKey="generadorApp.pacienteDispositivoAtual.mascaraDeVentilacao">Mascara De Ventilacao</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField
              id="paciente-dispositivo-atual-mascaraDeVentilacao"
              type="string"
              className="form-control"
              name="mascaraDeVentilacao"
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="mascaraDeVentilacao" value={this.state.fieldsBase[baseFilters]} />
  );
};

const EntubacaoOrotraquealComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'entubacaoOrotraqueal' ? (
    <Col md="entubacaoOrotraqueal">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="entubacaoOrotraquealLabel" for="paciente-dispositivo-atual-entubacaoOrotraqueal">
              <Translate contentKey="generadorApp.pacienteDispositivoAtual.entubacaoOrotraqueal">Entubacao Orotraqueal</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField
              id="paciente-dispositivo-atual-entubacaoOrotraqueal"
              type="string"
              className="form-control"
              name="entubacaoOrotraqueal"
            />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="entubacaoOrotraqueal" value={this.state.fieldsBase[baseFilters]} />
  );
};

const IleostomiaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'ileostomia' ? (
    <Col md="ileostomia">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="ileostomiaLabel" for="paciente-dispositivo-atual-ileostomia">
              <Translate contentKey="generadorApp.pacienteDispositivoAtual.ileostomia">Ileostomia</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="paciente-dispositivo-atual-ileostomia" type="string" className="form-control" name="ileostomia" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="ileostomia" value={this.state.fieldsBase[baseFilters]} />
  );
};

const JejunostomiaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'jejunostomia' ? (
    <Col md="jejunostomia">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="jejunostomiaLabel" for="paciente-dispositivo-atual-jejunostomia">
              <Translate contentKey="generadorApp.pacienteDispositivoAtual.jejunostomia">Jejunostomia</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="paciente-dispositivo-atual-jejunostomia" type="string" className="form-control" name="jejunostomia" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="jejunostomia" value={this.state.fieldsBase[baseFilters]} />
  );
};

const ColostomiaComponentUpdate = ({ baseFilters }) => {
  return baseFilters !== 'colostomia' ? (
    <Col md="colostomia">
      <AvGroup>
        <Row>
          <Col md="3">
            <Label className="mt-2" id="colostomiaLabel" for="paciente-dispositivo-atual-colostomia">
              <Translate contentKey="generadorApp.pacienteDispositivoAtual.colostomia">Colostomia</Translate>
            </Label>
          </Col>
          <Col md="9">
            <AvField id="paciente-dispositivo-atual-colostomia" type="string" className="form-control" name="colostomia" />
          </Col>
        </Row>
      </AvGroup>
    </Col>
  ) : (
    <AvInput type="hidden" name="colostomia" value={this.state.fieldsBase[baseFilters]} />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PacienteDispositivoAtualUpdate);
