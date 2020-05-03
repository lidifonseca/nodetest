import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './paciente-dispositivo-atual.reducer';
import { IPacienteDispositivoAtual } from 'app/shared/model/paciente-dispositivo-atual.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPacienteDispositivoAtualUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPacienteDispositivoAtualUpdateState {
  isNew: boolean;
}

export class PacienteDispositivoAtualUpdate extends React.Component<
  IPacienteDispositivoAtualUpdateProps,
  IPacienteDispositivoAtualUpdateState
> {
  constructor(props: Readonly<IPacienteDispositivoAtualUpdateProps>) {
    super(props);
    this.state = {
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

  saveEntity = (event: any, errors: any, values: any) => {
    values.dataPost = convertDateTimeToServer(values.dataPost);

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
    this.props.history.push('/paciente-dispositivo-atual');
  };

  render() {
    const { pacienteDispositivoAtualEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Paciente Dispositivo Atuals</li>
          <li className="breadcrumb-item active">Paciente Dispositivo Atuals edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
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
          <Panel>
            <PanelHeader>
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
                  to="/paciente-dispositivo-atual"
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
            </PanelHeader>
            <PanelBody>
              <Row className="justify-content-center">
                <Col md="8">
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <Row>
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

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="idPacienteLabel" for="paciente-dispositivo-atual-idPaciente">
                                <Translate contentKey="generadorApp.pacienteDispositivoAtual.idPaciente">Id Paciente</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-dispositivo-atual-idPaciente"
                                type="string"
                                className="form-control"
                                name="idPaciente"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label
                                className="mt-2"
                                id="idPacienteDispositivoLabel"
                                for="paciente-dispositivo-atual-idPacienteDispositivo"
                              >
                                <Translate contentKey="generadorApp.pacienteDispositivoAtual.idPacienteDispositivo">
                                  Id Paciente Dispositivo
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-dispositivo-atual-idPacienteDispositivo"
                                type="string"
                                className="form-control"
                                name="idPacienteDispositivo"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="tqtTraqueostomiaLabel" for="paciente-dispositivo-atual-tqtTraqueostomia">
                                <Translate contentKey="generadorApp.pacienteDispositivoAtual.tqtTraqueostomia">Tqt Traqueostomia</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-dispositivo-atual-tqtTraqueostomia"
                                type="string"
                                className="form-control"
                                name="tqtTraqueostomia"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="gttGastrostomiaLabel" for="paciente-dispositivo-atual-gttGastrostomia">
                                <Translate contentKey="generadorApp.pacienteDispositivoAtual.gttGastrostomia">Gtt Gastrostomia</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-dispositivo-atual-gttGastrostomia"
                                type="string"
                                className="form-control"
                                name="gttGastrostomia"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="sneSondaNasoenteralLabel" for="paciente-dispositivo-atual-sneSondaNasoenteral">
                                <Translate contentKey="generadorApp.pacienteDispositivoAtual.sneSondaNasoenteral">
                                  Sne Sonda Nasoenteral
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-dispositivo-atual-sneSondaNasoenteral"
                                type="string"
                                className="form-control"
                                name="sneSondaNasoenteral"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label
                                className="mt-2"
                                id="svdSondaVesicalDeDemoraLabel"
                                for="paciente-dispositivo-atual-svdSondaVesicalDeDemora"
                              >
                                <Translate contentKey="generadorApp.pacienteDispositivoAtual.svdSondaVesicalDeDemora">
                                  Svd Sonda Vesical De Demora
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-dispositivo-atual-svdSondaVesicalDeDemora"
                                type="string"
                                className="form-control"
                                name="svdSondaVesicalDeDemora"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label
                                className="mt-2"
                                id="svaSondaVesicalDeAlivioLabel"
                                for="paciente-dispositivo-atual-svaSondaVesicalDeAlivio"
                              >
                                <Translate contentKey="generadorApp.pacienteDispositivoAtual.svaSondaVesicalDeAlivio">
                                  Sva Sonda Vesical De Alivio
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-dispositivo-atual-svaSondaVesicalDeAlivio"
                                type="string"
                                className="form-control"
                                name="svaSondaVesicalDeAlivio"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="portACathLabel" for="paciente-dispositivo-atual-portACath">
                                <Translate contentKey="generadorApp.pacienteDispositivoAtual.portACath">Port A Cath</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-dispositivo-atual-portACath"
                                type="string"
                                className="form-control"
                                name="portACath"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label
                                className="mt-2"
                                id="piccAcessoVenosoCentralLabel"
                                for="paciente-dispositivo-atual-piccAcessoVenosoCentral"
                              >
                                <Translate contentKey="generadorApp.pacienteDispositivoAtual.piccAcessoVenosoCentral">
                                  Picc Acesso Venoso Central
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-dispositivo-atual-piccAcessoVenosoCentral"
                                type="string"
                                className="form-control"
                                name="piccAcessoVenosoCentral"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ventiladoresLabel" for="paciente-dispositivo-atual-ventiladores">
                                <Translate contentKey="generadorApp.pacienteDispositivoAtual.ventiladores">Ventiladores</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-dispositivo-atual-ventiladores"
                                type="string"
                                className="form-control"
                                name="ventiladores"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="uppUlceraPorPressaoLabel" for="paciente-dispositivo-atual-uppUlceraPorPressao">
                                <Translate contentKey="generadorApp.pacienteDispositivoAtual.uppUlceraPorPressao">
                                  Upp Ulcera Por Pressao
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-dispositivo-atual-uppUlceraPorPressao"
                                type="string"
                                className="form-control"
                                name="uppUlceraPorPressao"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label
                                className="mt-2"
                                id="avpAcessoVenosoPerifericoLabel"
                                for="paciente-dispositivo-atual-avpAcessoVenosoPeriferico"
                              >
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
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="uripenLabel" for="paciente-dispositivo-atual-uripen">
                                <Translate contentKey="generadorApp.pacienteDispositivoAtual.uripen">Uripen</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-dispositivo-atual-uripen"
                                type="string"
                                className="form-control"
                                name="uripen"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="fraldaGeriatricaLabel" for="paciente-dispositivo-atual-fraldaGeriatrica">
                                <Translate contentKey="generadorApp.pacienteDispositivoAtual.fraldaGeriatrica">Fralda Geriatrica</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-dispositivo-atual-fraldaGeriatrica"
                                type="string"
                                className="form-control"
                                name="fraldaGeriatrica"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="sngSondaNasogastricaLabel" for="paciente-dispositivo-atual-sngSondaNasogastrica">
                                <Translate contentKey="generadorApp.pacienteDispositivoAtual.sngSondaNasogastrica">
                                  Sng Sonda Nasogastrica
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-dispositivo-atual-sngSondaNasogastrica"
                                type="string"
                                className="form-control"
                                name="sngSondaNasogastrica"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="bipapLabel" for="paciente-dispositivo-atual-bipap">
                                <Translate contentKey="generadorApp.pacienteDispositivoAtual.bipap">Bipap</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-dispositivo-atual-bipap"
                                type="string"
                                className="form-control"
                                name="bipap"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cpapLabel" for="paciente-dispositivo-atual-cpap">
                                <Translate contentKey="generadorApp.pacienteDispositivoAtual.cpap">Cpap</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-dispositivo-atual-cpap"
                                type="string"
                                className="form-control"
                                name="cpap"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cistostomiaLabel" for="paciente-dispositivo-atual-cistostomia">
                                <Translate contentKey="generadorApp.pacienteDispositivoAtual.cistostomia">Cistostomia</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-dispositivo-atual-cistostomia"
                                type="string"
                                className="form-control"
                                name="cistostomia"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label
                                className="mt-2"
                                id="cateterNasalDeOxigenioLabel"
                                for="paciente-dispositivo-atual-cateterNasalDeOxigenio"
                              >
                                <Translate contentKey="generadorApp.pacienteDispositivoAtual.cateterNasalDeOxigenio">
                                  Cateter Nasal De Oxigenio
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-dispositivo-atual-cateterNasalDeOxigenio"
                                type="string"
                                className="form-control"
                                name="cateterNasalDeOxigenio"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="mascaraDeVentilacaoLabel" for="paciente-dispositivo-atual-mascaraDeVentilacao">
                                <Translate contentKey="generadorApp.pacienteDispositivoAtual.mascaraDeVentilacao">
                                  Mascara De Ventilacao
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-dispositivo-atual-mascaraDeVentilacao"
                                type="string"
                                className="form-control"
                                name="mascaraDeVentilacao"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="entubacaoOrotraquealLabel" for="paciente-dispositivo-atual-entubacaoOrotraqueal">
                                <Translate contentKey="generadorApp.pacienteDispositivoAtual.entubacaoOrotraqueal">
                                  Entubacao Orotraqueal
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-dispositivo-atual-entubacaoOrotraqueal"
                                type="string"
                                className="form-control"
                                name="entubacaoOrotraqueal"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ileostomiaLabel" for="paciente-dispositivo-atual-ileostomia">
                                <Translate contentKey="generadorApp.pacienteDispositivoAtual.ileostomia">Ileostomia</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-dispositivo-atual-ileostomia"
                                type="string"
                                className="form-control"
                                name="ileostomia"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="jejunostomiaLabel" for="paciente-dispositivo-atual-jejunostomia">
                                <Translate contentKey="generadorApp.pacienteDispositivoAtual.jejunostomia">Jejunostomia</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-dispositivo-atual-jejunostomia"
                                type="string"
                                className="form-control"
                                name="jejunostomia"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="colostomiaLabel" for="paciente-dispositivo-atual-colostomia">
                                <Translate contentKey="generadorApp.pacienteDispositivoAtual.colostomia">Colostomia</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-dispositivo-atual-colostomia"
                                type="string"
                                className="form-control"
                                name="colostomia"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="idUsuarioLabel" for="paciente-dispositivo-atual-idUsuario">
                                <Translate contentKey="generadorApp.pacienteDispositivoAtual.idUsuario">Id Usuario</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="paciente-dispositivo-atual-idUsuario"
                                type="string"
                                className="form-control"
                                name="idUsuario"
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') },
                                  number: { value: true, errorMessage: translate('entity.validation.number') }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="dataPostLabel" for="paciente-dispositivo-atual-dataPost">
                                <Translate contentKey="generadorApp.pacienteDispositivoAtual.dataPost">Data Post</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="paciente-dispositivo-atual-dataPost"
                                type="datetime-local"
                                className="form-control"
                                name="dataPost"
                                placeholder={'YYYY-MM-DD HH:mm'}
                                value={isNew ? null : convertDateTimeFromServer(this.props.pacienteDispositivoAtualEntity.dataPost)}
                                validate={{
                                  required: { value: true, errorMessage: translate('entity.validation.required') }
                                }}
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>
                    </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(PacienteDispositivoAtualUpdate);
