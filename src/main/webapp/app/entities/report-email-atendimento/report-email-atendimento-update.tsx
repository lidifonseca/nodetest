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
  IReportEmailAtendimentoUpdateState,
  getEntity,
  getReportEmailAtendimentoState,
  IReportEmailAtendimentoBaseState,
  updateEntity,
  createEntity,
  reset
} from './report-email-atendimento.reducer';
import { IReportEmailAtendimento } from 'app/shared/model/report-email-atendimento.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IReportEmailAtendimentoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ReportEmailAtendimentoUpdate extends React.Component<IReportEmailAtendimentoUpdateProps, IReportEmailAtendimentoUpdateState> {
  constructor(props: Readonly<IReportEmailAtendimentoUpdateProps>) {
    super(props);

    this.state = {
      fieldsBase: getReportEmailAtendimentoState(this.props.location),
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
      const { reportEmailAtendimentoEntity } = this.props;
      const entity = {
        ...reportEmailAtendimentoEntity,

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
    this.props.history.push('/report-email-atendimento?' + this.getFiltersURL());
  };

  render() {
    const { reportEmailAtendimentoEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    const baseFilters = this.state.fieldsBase && this.state.fieldsBase['baseFilters'] ? this.state.fieldsBase['baseFilters'] : null;
    return (
      <div>
        <AvForm
          model={
            isNew
              ? {}
              : {
                  ...reportEmailAtendimentoEntity
                }
          }
          onSubmit={this.saveEntity}
        >
          <h2 id="page-heading">
            <span className="page-header ml-3">
              <Translate contentKey="generadorApp.reportEmailAtendimento.home.createOrEditLabel">
                Create or edit a ReportEmailAtendimento
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
              to={'/report-email-atendimento?' + this.getFiltersURL()}
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
            <li className="breadcrumb-item active">Report Email Atendimentos</li>
            <li className="breadcrumb-item active">Report Email Atendimentos edit</li>
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
                        <Label className="mt-2" for="report-email-atendimento-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        </Col> */}
                            <Col md="12">
                              <AvInput
                                id="report-email-atendimento-id"
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
                        {baseFilters !== 'idAtendimento' ? (
                          <Col md="idAtendimento">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="idAtendimentoLabel" for="report-email-atendimento-idAtendimento">
                                    <Translate contentKey="generadorApp.reportEmailAtendimento.idAtendimento">Id Atendimento</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="report-email-atendimento-idAtendimento"
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
                        {baseFilters !== 'tipoReport' ? (
                          <Col md="tipoReport">
                            <AvGroup>
                              <Row>
                                <Col md="3">
                                  <Label className="mt-2" id="tipoReportLabel" for="report-email-atendimento-tipoReport">
                                    <Translate contentKey="generadorApp.reportEmailAtendimento.tipoReport">Tipo Report</Translate>
                                  </Label>
                                </Col>
                                <Col md="9">
                                  <AvField
                                    id="report-email-atendimento-tipoReport"
                                    type="string"
                                    className="form-control"
                                    name="tipoReport"
                                  />
                                </Col>
                              </Row>
                            </AvGroup>
                          </Col>
                        ) : (
                          <AvInput type="hidden" name="tipoReport" value={this.state.fieldsBase[baseFilters]} />
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
  reportEmailAtendimentoEntity: storeState.reportEmailAtendimento.entity,
  loading: storeState.reportEmailAtendimento.loading,
  updating: storeState.reportEmailAtendimento.updating,
  updateSuccess: storeState.reportEmailAtendimento.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReportEmailAtendimentoUpdate);
