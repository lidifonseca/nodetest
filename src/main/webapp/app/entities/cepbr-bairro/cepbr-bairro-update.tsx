import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICepbrCidade } from 'app/shared/model/cepbr-cidade.model';
import { getEntities as getCepbrCidades } from 'app/entities/cepbr-cidade/cepbr-cidade.reducer';
import { getEntity, updateEntity, createEntity, reset } from './cepbr-bairro.reducer';
import { ICepbrBairro } from 'app/shared/model/cepbr-bairro.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICepbrBairroUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICepbrBairroUpdateState {
  isNew: boolean;
  idCidadeId: string;
}

export class CepbrBairroUpdate extends React.Component<ICepbrBairroUpdateProps, ICepbrBairroUpdateState> {
  constructor(props: Readonly<ICepbrBairroUpdateProps>) {
    super(props);
    this.state = {
      idCidadeId: '0',
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

    this.props.getCepbrCidades();
  }

  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { cepbrBairroEntity } = this.props;
      const entity = {
        ...cepbrBairroEntity,
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
    this.props.history.push('/cepbr-bairro');
  };

  render() {
    const { cepbrBairroEntity, cepbrCidades, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Cepbr Bairros</li>
          <li className="breadcrumb-item active">Cepbr Bairros edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...cepbrBairroEntity,
                  idCidade: cepbrBairroEntity.idCidade ? cepbrBairroEntity.idCidade.id : null
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.cepbrBairro.home.createOrEditLabel">Create or edit a CepbrBairro</Translate>
                </span>

                <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
                <Button tag={Link} id="cancel-save" to="/cepbr-bairro" replace color="info" className="float-right jh-create-entity">
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
                      <Label className="mt-2" for="cepbr-bairro-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="cepbr-bairro-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}

                      <Col md="12">
                        <AvGroup>
                          <Row>
                            <Col md="3">
                              <Label className="mt-2" id="idBairroLabel" for="cepbr-bairro-idBairro">
                                <Translate contentKey="generadorApp.cepbrBairro.idBairro">Id Bairro</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="cepbr-bairro-idBairro"
                                type="string"
                                className="form-control"
                                name="idBairro"
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
                              <Label className="mt-2" id="bairroLabel" for="cepbr-bairro-bairro">
                                <Translate contentKey="generadorApp.cepbrBairro.bairro">Bairro</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvField
                                id="cepbr-bairro-bairro"
                                type="text"
                                name="bairro"
                                validate={{
                                  maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
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
                              <Label className="mt-2" for="cepbr-bairro-idCidade">
                                <Translate contentKey="generadorApp.cepbrBairro.idCidade">Id Cidade</Translate>
                              </Label>
                            </Col>
                            <Col md="9">
                              <AvInput id="cepbr-bairro-idCidade" type="select" className="form-control" name="idCidade">
                                <option value="null" key="0">
                                  {translate('generadorApp.cepbrBairro.idCidade.empty')}
                                </option>
                                {cepbrCidades
                                  ? cepbrCidades.map(otherEntity => (
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
  cepbrCidades: storeState.cepbrCidade.entities,
  cepbrBairroEntity: storeState.cepbrBairro.entity,
  loading: storeState.cepbrBairro.loading,
  updating: storeState.cepbrBairro.updating,
  updateSuccess: storeState.cepbrBairro.updateSuccess
});

const mapDispatchToProps = {
  getCepbrCidades,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CepbrBairroUpdate);
