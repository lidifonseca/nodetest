import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './profissional-dispositivo-atual.reducer';
import { IProfissionalDispositivoAtual } from 'app/shared/model/profissional-dispositivo-atual.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProfissionalDispositivoAtualUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IProfissionalDispositivoAtualUpdateState {
  isNew: boolean;
}

export class ProfissionalDispositivoAtualUpdate extends React.Component<
  IProfissionalDispositivoAtualUpdateProps,
  IProfissionalDispositivoAtualUpdateState
> {
  constructor(props: Readonly<IProfissionalDispositivoAtualUpdateProps>) {
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
      const { profissionalDispositivoAtualEntity } = this.props;
      const entity = {
        ...profissionalDispositivoAtualEntity,
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
    this.props.history.push('/profissional-dispositivo-atual');
  };

  render() {
    const { profissionalDispositivoAtualEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Profissional Dispositivo Atuals</li>
          <li className="breadcrumb-item active">Profissional Dispositivo Atuals edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...profissionalDispositivoAtualEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.profissionalDispositivoAtual.home.createOrEditLabel">
                    Create or edit a ProfissionalDispositivoAtual
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
                  to="/profissional-dispositivo-atual"
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
                      <Label className="mt-2" for="profissional-dispositivo-atual-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput
                                id="profissional-dispositivo-atual-id"
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
                              <Label className="mt-2" id="idProfissionalLabel" for="profissional-dispositivo-atual-idProfissional">
                                <Translate contentKey="generadorApp.profissionalDispositivoAtual.idProfissional">Id Profissional</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="profissional-dispositivo-atual-idProfissional"
                                type="string"
                                className="form-control"
                                name="idProfissional"
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
                              <Label className="mt-2" id="tqtTraqueostomiaLabel" for="profissional-dispositivo-atual-tqtTraqueostomia">
                                <Translate contentKey="generadorApp.profissionalDispositivoAtual.tqtTraqueostomia">
                                  Tqt Traqueostomia
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="profissional-dispositivo-atual-tqtTraqueostomia"
                                type="string"
                                className="form-control"
                                name="tqtTraqueostomia"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="gttGastrostomiaLabel" for="profissional-dispositivo-atual-gttGastrostomia">
                                <Translate contentKey="generadorApp.profissionalDispositivoAtual.gttGastrostomia">
                                  Gtt Gastrostomia
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="profissional-dispositivo-atual-gttGastrostomia"
                                type="string"
                                className="form-control"
                                name="gttGastrostomia"
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
                                id="sneSondaNasoenteralLabel"
                                for="profissional-dispositivo-atual-sneSondaNasoenteral"
                              >
                                <Translate contentKey="generadorApp.profissionalDispositivoAtual.sneSondaNasoenteral">
                                  Sne Sonda Nasoenteral
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="profissional-dispositivo-atual-sneSondaNasoenteral"
                                type="string"
                                className="form-control"
                                name="sneSondaNasoenteral"
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
                                for="profissional-dispositivo-atual-svdSondaVesicalDeDemora"
                              >
                                <Translate contentKey="generadorApp.profissionalDispositivoAtual.svdSondaVesicalDeDemora">
                                  Svd Sonda Vesical De Demora
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="profissional-dispositivo-atual-svdSondaVesicalDeDemora"
                                type="string"
                                className="form-control"
                                name="svdSondaVesicalDeDemora"
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
                                for="profissional-dispositivo-atual-svaSondaVesicalDeAlivio"
                              >
                                <Translate contentKey="generadorApp.profissionalDispositivoAtual.svaSondaVesicalDeAlivio">
                                  Sva Sonda Vesical De Alivio
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="profissional-dispositivo-atual-svaSondaVesicalDeAlivio"
                                type="string"
                                className="form-control"
                                name="svaSondaVesicalDeAlivio"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="portACathLabel" for="profissional-dispositivo-atual-portACath">
                                <Translate contentKey="generadorApp.profissionalDispositivoAtual.portACath">Port A Cath</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="profissional-dispositivo-atual-portACath"
                                type="string"
                                className="form-control"
                                name="portACath"
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
                                for="profissional-dispositivo-atual-piccAcessoVenosoCentral"
                              >
                                <Translate contentKey="generadorApp.profissionalDispositivoAtual.piccAcessoVenosoCentral">
                                  Picc Acesso Venoso Central
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="profissional-dispositivo-atual-piccAcessoVenosoCentral"
                                type="string"
                                className="form-control"
                                name="piccAcessoVenosoCentral"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="ventiladoresLabel" for="profissional-dispositivo-atual-ventiladores">
                                <Translate contentKey="generadorApp.profissionalDispositivoAtual.ventiladores">Ventiladores</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="profissional-dispositivo-atual-ventiladores"
                                type="string"
                                className="form-control"
                                name="ventiladores"
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
                                id="uppUlceraPorPressaoLabel"
                                for="profissional-dispositivo-atual-uppUlceraPorPressao"
                              >
                                <Translate contentKey="generadorApp.profissionalDispositivoAtual.uppUlceraPorPressao">
                                  Upp Ulcera Por Pressao
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="profissional-dispositivo-atual-uppUlceraPorPressao"
                                type="string"
                                className="form-control"
                                name="uppUlceraPorPressao"
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
                                for="profissional-dispositivo-atual-avpAcessoVenosoPeriferico"
                              >
                                <Translate contentKey="generadorApp.profissionalDispositivoAtual.avpAcessoVenosoPeriferico">
                                  Avp Acesso Venoso Periferico
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="profissional-dispositivo-atual-avpAcessoVenosoPeriferico"
                                type="string"
                                className="form-control"
                                name="avpAcessoVenosoPeriferico"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="uripenLabel" for="profissional-dispositivo-atual-uripen">
                                <Translate contentKey="generadorApp.profissionalDispositivoAtual.uripen">Uripen</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="profissional-dispositivo-atual-uripen" type="string" className="form-control" name="uripen" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="fraldaGeriatricaLabel" for="profissional-dispositivo-atual-fraldaGeriatrica">
                                <Translate contentKey="generadorApp.profissionalDispositivoAtual.fraldaGeriatrica">
                                  Fralda Geriatrica
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="profissional-dispositivo-atual-fraldaGeriatrica"
                                type="string"
                                className="form-control"
                                name="fraldaGeriatrica"
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
                                id="sngSondaNasogastricaLabel"
                                for="profissional-dispositivo-atual-sngSondaNasogastrica"
                              >
                                <Translate contentKey="generadorApp.profissionalDispositivoAtual.sngSondaNasogastrica">
                                  Sng Sonda Nasogastrica
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="profissional-dispositivo-atual-sngSondaNasogastrica"
                                type="string"
                                className="form-control"
                                name="sngSondaNasogastrica"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="bipapLabel" for="profissional-dispositivo-atual-bipap">
                                <Translate contentKey="generadorApp.profissionalDispositivoAtual.bipap">Bipap</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="profissional-dispositivo-atual-bipap" type="string" className="form-control" name="bipap" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cpapLabel" for="profissional-dispositivo-atual-cpap">
                                <Translate contentKey="generadorApp.profissionalDispositivoAtual.cpap">Cpap</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="profissional-dispositivo-atual-cpap" type="string" className="form-control" name="cpap" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cistostomiaLabel" for="profissional-dispositivo-atual-cistostomia">
                                <Translate contentKey="generadorApp.profissionalDispositivoAtual.cistostomia">Cistostomia</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="profissional-dispositivo-atual-cistostomia"
                                type="string"
                                className="form-control"
                                name="cistostomia"
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
                                for="profissional-dispositivo-atual-cateterNasalDeOxigenio"
                              >
                                <Translate contentKey="generadorApp.profissionalDispositivoAtual.cateterNasalDeOxigenio">
                                  Cateter Nasal De Oxigenio
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="profissional-dispositivo-atual-cateterNasalDeOxigenio"
                                type="string"
                                className="form-control"
                                name="cateterNasalDeOxigenio"
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
                                id="mascaraDeVentilacaoLabel"
                                for="profissional-dispositivo-atual-mascaraDeVentilacao"
                              >
                                <Translate contentKey="generadorApp.profissionalDispositivoAtual.mascaraDeVentilacao">
                                  Mascara De Ventilacao
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="profissional-dispositivo-atual-mascaraDeVentilacao"
                                type="string"
                                className="form-control"
                                name="mascaraDeVentilacao"
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
                                id="entubacaoOrotraquealLabel"
                                for="profissional-dispositivo-atual-entubacaoOrotraqueal"
                              >
                                <Translate contentKey="generadorApp.profissionalDispositivoAtual.entubacaoOrotraqueal">
                                  Entubacao Orotraqueal
                                </Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="profissional-dispositivo-atual-entubacaoOrotraqueal"
                                type="string"
                                className="form-control"
                                name="entubacaoOrotraqueal"
                              />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="idUsuarioLabel" for="profissional-dispositivo-atual-idUsuario">
                                <Translate contentKey="generadorApp.profissionalDispositivoAtual.idUsuario">Id Usuario</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="profissional-dispositivo-atual-idUsuario"
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
                              <Label className="mt-2" id="dataPostLabel" for="profissional-dispositivo-atual-dataPost">
                                <Translate contentKey="generadorApp.profissionalDispositivoAtual.dataPost">Data Post</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput
                                id="profissional-dispositivo-atual-dataPost"
                                type="datetime-local"
                                className="form-control"
                                name="dataPost"
                                placeholder={'YYYY-MM-DD HH:mm'}
                                value={isNew ? null : convertDateTimeFromServer(this.props.profissionalDispositivoAtualEntity.dataPost)}
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
  profissionalDispositivoAtualEntity: storeState.profissionalDispositivoAtual.entity,
  loading: storeState.profissionalDispositivoAtual.loading,
  updating: storeState.profissionalDispositivoAtual.updating,
  updateSuccess: storeState.profissionalDispositivoAtual.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalDispositivoAtualUpdate);
