import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IFranquia } from 'app/shared/model/franquia.model';
import { getEntities as getFranquias } from 'app/entities/franquia/franquia.reducer';
import { getEntity, updateEntity, createEntity, reset } from './franquia-area-atuacao.reducer';
import { IFranquiaAreaAtuacao } from 'app/shared/model/franquia-area-atuacao.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFranquiaAreaAtuacaoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IFranquiaAreaAtuacaoUpdateState {
  isNew: boolean;
  idFranquiaId: string;
}

export class FranquiaAreaAtuacaoUpdate extends React.Component<IFranquiaAreaAtuacaoUpdateProps, IFranquiaAreaAtuacaoUpdateState> {
  constructor(props: Readonly<IFranquiaAreaAtuacaoUpdateProps>) {
    super(props);
    this.state = {
      idFranquiaId: '0',
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

    this.props.getFranquias();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { franquiaAreaAtuacaoEntity } = this.props;
      const entity = {
        ...franquiaAreaAtuacaoEntity,
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
    this.props.history.push('/franquia-area-atuacao');
  };

  render() {
    const { franquiaAreaAtuacaoEntity, franquias, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Franquia Area Atuacaos</li>
          <li className="breadcrumb-item active">Franquia Area Atuacaos edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...franquiaAreaAtuacaoEntity,
                  idFranquia: franquiaAreaAtuacaoEntity.idFranquia ? franquiaAreaAtuacaoEntity.idFranquia.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.franquiaAreaAtuacao.home.createOrEditLabel">
                    Create or edit a FranquiaAreaAtuacao
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
                  to="/franquia-area-atuacao"
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
                      <Label className="mt-2" for="franquia-area-atuacao-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="franquia-area-atuacao-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="cepIniLabel" for="franquia-area-atuacao-cepIni">
                                <Translate contentKey="generadorApp.franquiaAreaAtuacao.cepIni">Cep Ini</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="franquia-area-atuacao-cepIni"
                                type="text"
                                name="cepIni"
                                validate={{
                                  maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
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
                              <Label className="mt-2" id="cepFimLabel" for="franquia-area-atuacao-cepFim">
                                <Translate contentKey="generadorApp.franquiaAreaAtuacao.cepFim">Cep Fim</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="franquia-area-atuacao-cepFim"
                                type="text"
                                name="cepFim"
                                validate={{
                                  maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
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
                              <Label className="mt-2" id="ativoLabel" for="franquia-area-atuacao-ativo">
                                <Translate contentKey="generadorApp.franquiaAreaAtuacao.ativo">Ativo</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField id="franquia-area-atuacao-ativo" type="string" className="form-control" name="ativo" />
                            </Col>
                          </Row>
                        </AvGroup>
                      </Col>
                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" for="franquia-area-atuacao-idFranquia">
                                <Translate contentKey="generadorApp.franquiaAreaAtuacao.idFranquia">Id Franquia</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="franquia-area-atuacao-idFranquia" type="select" className="form-control" name="idFranquia">
                                <option value="null" key="0">
                                  {translate('generadorApp.franquiaAreaAtuacao.idFranquia.empty')}
                                </option>
                                {franquias
                                  ? franquias.map(otherEntity => (
                                      <option value={otherEntity.id} key={otherEntity.id}>
                                        {otherEntity.id}
                                      </option>
                                    ))
                                  : null}
                              </AvInput>
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
  franquias: storeState.franquia.entities,
  franquiaAreaAtuacaoEntity: storeState.franquiaAreaAtuacao.entity,
  loading: storeState.franquiaAreaAtuacao.loading,
  updating: storeState.franquiaAreaAtuacao.updating,
  updateSuccess: storeState.franquiaAreaAtuacao.updateSuccess
});

const mapDispatchToProps = {
  getFranquias,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FranquiaAreaAtuacaoUpdate);
