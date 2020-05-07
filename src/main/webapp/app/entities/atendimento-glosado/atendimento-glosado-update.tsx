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
  IAtendimentoGlosadoUpdateState,
  getEntity,
  getAtendimentoGlosadoState,
  IAtendimentoGlosadoBaseState,
  updateEntity,
  createEntity,
  reset
} from './atendimento-glosado.reducer';
import { IAtendimentoGlosado } from 'app/shared/model/atendimento-glosado.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAtendimentoGlosadoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AtendimentoGlosadoUpdate extends React.Component<IAtendimentoGlosadoUpdateProps, IAtendimentoGlosadoUpdateState> {
  constructor(props: Readonly<IAtendimentoGlosadoUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getAtendimentoGlosadoState(this.props.location),
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
      (fieldsBase['idAtendimento'] ? '&idAtendimento=' + fieldsBase['idAtendimento'] : '') +
      (fieldsBase['glosado'] ? '&glosado=' + fieldsBase['glosado'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { atendimentoGlosadoEntity } = this.props;
      const entity = {
        ...atendimentoGlosadoEntity,
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
    this.props.history.push('/atendimento-glosado?' + this.getFiltersURL());
  };

  render() {
    const { atendimentoGlosadoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Atendimento Glosados</li>
          <li className="breadcrumb-item active">Atendimento Glosados edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...atendimentoGlosadoEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.atendimentoGlosado.home.createOrEditLabel">
                    Create or edit a AtendimentoGlosado
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
                  to={'/atendimento-glosado?' + this.getFiltersURL()}
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
                      <Label className="mt-2" for="atendimento-glosado-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput id="atendimento-glosado-id" type="hidden" className="form-control" name="id" required readOnly />
                            </Col>
                          </Row>
                        </AvGroup>
                      ) : null}
                      <Row>
                        {baseFilters !== 'idAtendimento' ? (
                          <Col md="idAtendimento">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idAtendimentoLabel" for="atendimento-glosado-idAtendimento">
                                    <Translate contentKey="generadorApp.atendimentoGlosado.idAtendimento">Id Atendimento</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="atendimento-glosado-idAtendimento"
                                    type="string"
                                    className="form-control"
                                    name="idAtendimento"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="idAtendimento" value={this.state.fieldsBase[baseFilters]} />
                        )}

                        {baseFilters !== 'glosado' ? (
                          <Col md="glosado">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="glosadoLabel" for="atendimento-glosado-glosado">
                                    <Translate contentKey="generadorApp.atendimentoGlosado.glosado">Glosado</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField id="atendimento-glosado-glosado" type="text" name="glosado" />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="glosado" value={this.state.fieldsBase[baseFilters]} />
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
  atendimentoGlosadoEntity: storeState.atendimentoGlosado.entity,
  loading: storeState.atendimentoGlosado.loading,
  updating: storeState.atendimentoGlosado.updating,
  updateSuccess: storeState.atendimentoGlosado.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AtendimentoGlosadoUpdate);
