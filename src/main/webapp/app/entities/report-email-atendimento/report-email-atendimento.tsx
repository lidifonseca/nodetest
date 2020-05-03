/* eslint complexity: ["error", 100] */
import React from 'react';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import {
  Button,
  Col,
  Row,
  Table,
  Label,
  UncontrolledTooltip,
  UncontrolledCollapse,
  CardHeader,
  CardBody,
  UncontrolledAlert
} from 'reactstrap';
import { AvForm, div, AvInput } from 'availity-reactstrap-validation';
import {
  Translate,
  translate,
  ICrudGetAllAction,
  TextFormat,
  getSortState,
  IPaginationBaseState,
  JhiPagination,
  JhiItemCount
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './report-email-atendimento.reducer';
import { IReportEmailAtendimento } from 'app/shared/model/report-email-atendimento.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IReportEmailAtendimentoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IReportEmailAtendimentoBaseState {
  idAtendimento: any;
  tipoReport: any;
  dataPost: any;
}
export interface IReportEmailAtendimentoState extends IReportEmailAtendimentoBaseState, IPaginationBaseState {}

export class ReportEmailAtendimento extends React.Component<IReportEmailAtendimentoProps, IReportEmailAtendimentoState> {
  private myFormRef: any;

  constructor(props: IReportEmailAtendimentoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getReportEmailAtendimentoState(this.props.location)
    };
  }

  getReportEmailAtendimentoState = (location): IReportEmailAtendimentoBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const idAtendimento = url.searchParams.get('idAtendimento') || '';
    const tipoReport = url.searchParams.get('tipoReport') || '';
    const dataPost = url.searchParams.get('dataPost') || '';

    return {
      idAtendimento,
      tipoReport,
      dataPost
    };
  };

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idAtendimento: '',
        tipoReport: '',
        dataPost: ''
      },
      () => this.sortEntities()
    );
  };

  filterEntity = (event, errors, values) => {
    this.setState(
      {
        ...this.state,
        ...values
      },
      () => this.sortEntities()
    );
  };

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(this.props.location.pathname + '?' + this.getFiltersURL());
  }

  getFiltersURL = (offset = null) => {
    return (
      'page=' +
      this.state.activePage +
      '&' +
      'size=' +
      this.state.itemsPerPage +
      '&' +
      (offset !== null ? 'offset=' + offset + '&' : '') +
      'sort=' +
      this.state.sort +
      ',' +
      this.state.order +
      '&' +
      'idAtendimento=' +
      this.state.idAtendimento +
      '&' +
      'tipoReport=' +
      this.state.tipoReport +
      '&' +
      'dataPost=' +
      this.state.dataPost +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idAtendimento, tipoReport, dataPost, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(idAtendimento, tipoReport, dataPost, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { reportEmailAtendimentoList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Report Email Atendimentos</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Report Email Atendimentos</span>
              <Button id="togglerFilterReportEmailAtendimento" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.reportEmailAtendimento.home.createLabel">
                  Create a new Report Email Atendimento
                </Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterReportEmailAtendimento">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="idAtendimentoLabel" for="report-email-atendimento-idAtendimento">
                            <Translate contentKey="generadorApp.reportEmailAtendimento.idAtendimento">Id Atendimento</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="idAtendimento"
                            id="report-email-atendimento-idAtendimento"
                            value={this.state.idAtendimento}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="tipoReportLabel" for="report-email-atendimento-tipoReport">
                            <Translate contentKey="generadorApp.reportEmailAtendimento.tipoReport">Tipo Report</Translate>
                          </Label>
                          <AvInput type="string" name="tipoReport" id="report-email-atendimento-tipoReport" value={this.state.tipoReport} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataPostLabel" for="report-email-atendimento-dataPost">
                            <Translate contentKey="generadorApp.reportEmailAtendimento.dataPost">Data Post</Translate>
                          </Label>
                          <AvInput
                            id="report-email-atendimento-dataPost"
                            type="datetime-local"
                            className="form-control"
                            name="dataPost"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.dataPost ? convertDateTimeFromServer(this.state.dataPost) : null}
                          />
                        </Row>
                      </Col>
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="entity.validation.filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="entity.validation.clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {reportEmailAtendimentoList && reportEmailAtendimentoList.length > 0 ? (
                <Table responsive aria-describedby="report-email-atendimento-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idAtendimento')}>
                        <Translate contentKey="generadorApp.reportEmailAtendimento.idAtendimento">Id Atendimento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('tipoReport')}>
                        <Translate contentKey="generadorApp.reportEmailAtendimento.tipoReport">Tipo Report</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataPost')}>
                        <Translate contentKey="generadorApp.reportEmailAtendimento.dataPost">Data Post</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {reportEmailAtendimentoList.map((reportEmailAtendimento, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${reportEmailAtendimento.id}`} color="link" size="sm">
                            {reportEmailAtendimento.id}
                          </Button>
                        </td>

                        <td>{reportEmailAtendimento.idAtendimento}</td>

                        <td>{reportEmailAtendimento.tipoReport}</td>

                        <td>
                          <TextFormat type="date" value={reportEmailAtendimento.dataPost} format={APP_DATE_FORMAT} />
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${reportEmailAtendimento.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${reportEmailAtendimento.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${reportEmailAtendimento.id}/delete`} color="danger" size="sm">
                              <FontAwesomeIcon icon="trash" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.delete">Delete</Translate>
                              </span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="alert alert-warning">
                  <Translate contentKey="generadorApp.reportEmailAtendimento.home.notFound">No Report Email Atendimentos found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={reportEmailAtendimentoList && reportEmailAtendimentoList.length > 0 ? '' : 'd-none'}>
              <Row className="justify-content-center">
                <JhiItemCount page={this.state.activePage} total={totalItems} itemsPerPage={this.state.itemsPerPage} i18nEnabled />
              </Row>
              <Row className="justify-content-center">
                <JhiPagination
                  activePage={this.state.activePage}
                  onSelect={this.handlePagination}
                  maxButtons={5}
                  itemsPerPage={this.state.itemsPerPage}
                  totalItems={this.props.totalItems}
                />
              </Row>
            </div>
          </PanelFooter>
        </Panel>
      </div>
    );
  }
}

const mapStateToProps = ({ reportEmailAtendimento, ...storeState }: IRootState) => ({
  reportEmailAtendimentoList: reportEmailAtendimento.entities,
  totalItems: reportEmailAtendimento.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReportEmailAtendimento);
