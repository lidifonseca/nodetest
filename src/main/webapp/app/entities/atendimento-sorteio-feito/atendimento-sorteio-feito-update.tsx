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
  IAtendimentoSorteioFeitoUpdateState,
  getEntity,
  getAtendimentoSorteioFeitoState,
  IAtendimentoSorteioFeitoBaseState,
  updateEntity,
  createEntity,
  reset
} from './atendimento-sorteio-feito.reducer';
import { IAtendimentoSorteioFeito } from 'app/shared/model/atendimento-sorteio-feito.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAtendimentoSorteioFeitoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AtendimentoSorteioFeitoUpdate extends React.Component<
  IAtendimentoSorteioFeitoUpdateProps,
  IAtendimentoSorteioFeitoUpdateState
> {
  constructor(props: Readonly<IAtendimentoSorteioFeitoUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getAtendimentoSorteioFeitoState(this.props.location),
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
      (fieldsBase['sorteioFeito'] ? '&sorteioFeito=' + fieldsBase['sorteioFeito'] : '') +
      ''
    );
  };
  saveEntity = (event: any, errors: any, values: any) => {
    if (errors.length === 0) {
      const { atendimentoSorteioFeitoEntity } = this.props;
      const entity = {
        ...atendimentoSorteioFeitoEntity,
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
    this.props.history.push('/atendimento-sorteio-feito?' + this.getFiltersURL());
  };

  render() {
    const { atendimentoSorteioFeitoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Atendimento Sorteio Feitos</li>
          <li className="breadcrumb-item active">Atendimento Sorteio Feitos edit</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...atendimentoSorteioFeitoEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <Panel>
            <PanelHeader>
              <h2 id="page-heading">
                <span className="page-header ml-3">
                  <Translate contentKey="generadorApp.atendimentoSorteioFeito.home.createOrEditLabel">
                    Create or edit a AtendimentoSorteioFeito
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
                  to={'/atendimento-sorteio-feito?' + this.getFiltersURL()}
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
                      <Label className="mt-2" for="atendimento-sorteio-feito-id">
                        <Translate contentKey="global.field.id">ID</Translate>
                      </Label>
                      </Col> */}
                            <Col md="12">
                              <AvInput
                                id="atendimento-sorteio-feito-id"
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
                        {baseFilters !== 'sorteioFeito' ? (
                          <Col md="sorteioFeito">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="sorteioFeitoLabel" for="atendimento-sorteio-feito-sorteioFeito">
                                    <Translate contentKey="generadorApp.atendimentoSorteioFeito.sorteioFeito">Sorteio Feito</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="atendimento-sorteio-feito-sorteioFeito"
                                    type="string"
                                    className="form-control"
                                    name="sorteioFeito"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="sorteioFeito" value={this.state.fieldsBase[baseFilters]} />
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
  atendimentoSorteioFeitoEntity: storeState.atendimentoSorteioFeito.entity,
  loading: storeState.atendimentoSorteioFeito.loading,
  updating: storeState.atendimentoSorteioFeito.updating,
  updateSuccess: storeState.atendimentoSorteioFeito.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AtendimentoSorteioFeitoUpdate);
