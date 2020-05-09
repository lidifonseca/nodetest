/* eslint complexity: ["error", 300] */
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
  IImagemProntuarioUpdateState,
  getEntity,
  getImagemProntuarioState,
  IImagemProntuarioBaseState,
  updateEntity,
  createEntity,
  reset
} from './imagem-prontuario.reducer';
import { IImagemProntuario } from 'app/shared/model/imagem-prontuario.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IImagemProntuarioUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ImagemProntuarioUpdate extends React.Component<IImagemProntuarioUpdateProps, IImagemProntuarioUpdateState> {
  constructor(props: Readonly<IImagemProntuarioUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getImagemProntuarioState(this.props.location),
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
      const { imagemProntuarioEntity } = this.props;
      const entity = {
        ...imagemProntuarioEntity,

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
    this.props.history.push('/imagem-prontuario?' + this.getFiltersURL());
  };

  render() {
    const { imagemProntuarioEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...imagemProntuarioEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.imagemProntuario.home.createOrEditLabel">Create or edit a ImagemProntuario</Translate>
            </span>

            <Button color="primary" id="save-entity" type="submit" disabled={updating} className="float-right jh-create-entity">
              <FontAwesomeIcon icon="save" />
              &nbsp;
              <Translate contentKey="entity.action.save">Save</Translate>
            </Button>
            <Button
              tag={Link}
              id="cancel-save"
              to={'/imagem-prontuario?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Imagem Prontuarios</li>
            <li className="breadcrumb-item active">Imagem Prontuarios edit</li>
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
                        <Label className="mt-2" for="imagem-prontuario-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput id="imagem-prontuario-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'idProntuario' ? (
                          <Col md="idProntuario">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idProntuarioLabel" for="imagem-prontuario-idProntuario">
                                    <Translate contentKey="generadorApp.imagemProntuario.idProntuario">Id Prontuario</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="imagem-prontuario-idProntuario" type="text" name="idProntuario" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idProntuario" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'imagem' ? (
                          <Col md="imagem">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="imagemLabel" for="imagem-prontuario-imagem">
                                    <Translate contentKey="generadorApp.imagemProntuario.imagem">Imagem</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="imagem-prontuario-imagem" type="text" name="imagem" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="imagem" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'ativo' ? (
                          <Col md="ativo">
                            <AvGroup>
                              <Row>
                                <Col md="12">
                                  <Label className="mt-2" id="ativoLabel" check>
                                    <AvInput id="imagem-prontuario-ativo" type="checkbox" className="form-control" name="ativo" />
                                    <Translate contentKey="generadorApp.imagemProntuario.ativo">Ativo</Translate>
                                  </Label>
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
                        )}
                        {baseFilters !== 'diretorio' ? (
                          <Col md="diretorio">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="diretorioLabel" for="imagem-prontuario-diretorio">
                                    <Translate contentKey="generadorApp.imagemProntuario.diretorio">Diretorio</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="imagem-prontuario-diretorio" type="text" name="diretorio" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="diretorio" value={this.state.fieldsBase[baseFilters]} />
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
  imagemProntuarioEntity: storeState.imagemProntuario.entity,
  loading: storeState.imagemProntuario.loading,
  updating: storeState.imagemProntuario.updating,
  updateSuccess: storeState.imagemProntuario.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ImagemProntuarioUpdate);
