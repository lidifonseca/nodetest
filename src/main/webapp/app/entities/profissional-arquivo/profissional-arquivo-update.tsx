import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import {
  IProfissionalArquivoUpdateState,
  getEntity,
  getProfissionalArquivoState,
  IProfissionalArquivoBaseState,
  updateEntity,
  createEntity,
  reset
} from './profissional-arquivo.reducer';
import { IProfissionalArquivo } from 'app/shared/model/profissional-arquivo.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProfissionalArquivoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProfissionalArquivoUpdate extends React.Component<IProfissionalArquivoUpdateProps, IProfissionalArquivoUpdateState> {
  constructor(props: Readonly<IProfissionalArquivoUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getProfissionalArquivoState(this.props.location),
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
    return (
      '_back=1' +
      (fieldsBase['baseFilters'] ? '&baseFilters=' + fieldsBase['baseFilters'] : '') +
      (fieldsBase['activePage'] ? '&page=' + fieldsBase['activePage'] : '') +
      (fieldsBase['itemsPerPage'] ? '&size=' + fieldsBase['itemsPerPage'] : '') +
      (fieldsBase['sort'] ? '&sort=' + (fieldsBase['sort'] + ',' + fieldsBase['order']) : '') +
      (offset !== null ? '&offset=' + offset : '') +
      (fieldsBase['idProfissional'] ? '&idProfissional=' + fieldsBase['idProfissional'] : '') +
      (fieldsBase['arquivo'] ? '&arquivo=' + fieldsBase['arquivo'] : '') +
      (fieldsBase['ativo'] ? '&ativo=' + fieldsBase['ativo'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { profissionalArquivoEntity } = this.props;
      const entity = {
        ...profissionalArquivoEntity,
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
    this.props.history.push('/profissional-arquivo?' + this.getFiltersURL());
  };

  render() {
    const { profissionalArquivoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Profissional Arquivos</li>
          <li className="breadcrumb-item active">Profissional Arquivos edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...profissionalArquivoEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.profissionalArquivo.home.createOrEditLabel">
                    Create or edit a ProfissionalArquivo
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
                  to={'/profissional-arquivo?' + this.getFiltersURL()}
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
                    <div>
                      {!isNew ? (
                        <AvGroup>
                          <Row>
                            {/*
                      <Col md="3">
                      <Label className="mt-2" for="profissional-arquivo-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="profissional-arquivo-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'idProfissional' ? (
                          <Col md="idProfissional">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idProfissionalLabel" for="profissional-arquivo-idProfissional">
                                    <Translate contentKey="generadorApp.profissionalArquivo.idProfissional">Id Profissional</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-arquivo-idProfissional" type="text" name="idProfissional" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idProfissional" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'arquivo' ? (
                          <Col md="arquivo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="arquivoLabel" for="profissional-arquivo-arquivo">
                                    <Translate contentKey="generadorApp.profissionalArquivo.arquivo">Arquivo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-arquivo-arquivo" type="text" name="arquivo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="arquivo" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'ativo' ? (
                          <Col md="ativo">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="ativoLabel" for="profissional-arquivo-ativo">
                                    <Translate contentKey="generadorApp.profissionalArquivo.ativo">Ativo</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="profissional-arquivo-ativo" type="string" className="form-control" name="ativo" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="ativo" value={this.state.fieldsBase[baseFilters]} />
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
  profissionalArquivoEntity: storeState.profissionalArquivo.entity,
  loading: storeState.profissionalArquivo.loading,
  updating: storeState.profissionalArquivo.updating,
  updateSuccess: storeState.profissionalArquivo.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalArquivoUpdate);
