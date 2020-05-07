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
import { Translate, translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';

import { IRootState } from 'app/shared/reducers';
import { getJulhoState, IJulhoBaseState, getEntities } from './julho.reducer';
import { IJulho } from 'app/shared/model/julho.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IJulhoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IJulhoState extends IJulhoBaseState, IPaginationBaseState {}

export class Julho extends React.Component<IJulhoProps, IJulhoState> {
  private myFormRef: any;

  constructor(props: IJulhoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getJulhoState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        dataInicio: '',
        dataFim: '',
        especialidade: '',
        periodicidade: '',
        periodo: '',
        qtd: ''
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
      'baseFilters=' +
      this.state.baseFilters +
      '&page=' +
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
      'dataInicio=' +
      this.state.dataInicio +
      '&' +
      'dataFim=' +
      this.state.dataFim +
      '&' +
      'especialidade=' +
      this.state.especialidade +
      '&' +
      'periodicidade=' +
      this.state.periodicidade +
      '&' +
      'periodo=' +
      this.state.periodo +
      '&' +
      'qtd=' +
      this.state.qtd +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { dataInicio, dataFim, especialidade, periodicidade, periodo, qtd, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(
      dataInicio,
      dataFim,
      especialidade,
      periodicidade,
      periodo,
      qtd,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { julhoList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Julhos</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Julhos</span>
              <Button id="togglerFilterJulho" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link
                to={`${match.url}/new?${this.getFiltersURL()}`}
                className="btn btn-primary float-right jh-create-entity"
                id="jh-create-entity"
              >
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.julho.home.createLabel">Create a new Julho</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterJulho">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'dataInicio' ? (
                        <Col md="3">
                          <Row>
                            <Label id="dataInicioLabel" for="julho-dataInicio">
                              <Translate contentKey="generadorApp.julho.dataInicio">Data Inicio</Translate>
                            </Label>

                            <AvInput type="text" name="dataInicio" id="julho-dataInicio" value={this.state.dataInicio} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dataFim' ? (
                        <Col md="3">
                          <Row>
                            <Label id="dataFimLabel" for="julho-dataFim">
                              <Translate contentKey="generadorApp.julho.dataFim">Data Fim</Translate>
                            </Label>

                            <AvInput type="text" name="dataFim" id="julho-dataFim" value={this.state.dataFim} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'especialidade' ? (
                        <Col md="3">
                          <Row>
                            <Label id="especialidadeLabel" for="julho-especialidade">
                              <Translate contentKey="generadorApp.julho.especialidade">Especialidade</Translate>
                            </Label>
                            <AvInput type="string" name="especialidade" id="julho-especialidade" value={this.state.especialidade} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'periodicidade' ? (
                        <Col md="3">
                          <Row>
                            <Label id="periodicidadeLabel" for="julho-periodicidade">
                              <Translate contentKey="generadorApp.julho.periodicidade">Periodicidade</Translate>
                            </Label>
                            <AvInput type="string" name="periodicidade" id="julho-periodicidade" value={this.state.periodicidade} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'periodo' ? (
                        <Col md="3">
                          <Row>
                            <Label id="periodoLabel" for="julho-periodo">
                              <Translate contentKey="generadorApp.julho.periodo">Periodo</Translate>
                            </Label>
                            <AvInput type="string" name="periodo" id="julho-periodo" value={this.state.periodo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'qtd' ? (
                        <Col md="3">
                          <Row>
                            <Label id="qtdLabel" for="julho-qtd">
                              <Translate contentKey="generadorApp.julho.qtd">Qtd</Translate>
                            </Label>
                            <AvInput type="string" name="qtd" id="julho-qtd" value={this.state.qtd} />
                          </Row>
                        </Col>
                      ) : null}
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

              {julhoList && julhoList.length > 0 ? (
                <Table responsive aria-describedby="julho-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'dataInicio' ? (
                        <th className="hand" onClick={this.sort('dataInicio')}>
                          <Translate contentKey="generadorApp.julho.dataInicio">Data Inicio</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'dataFim' ? (
                        <th className="hand" onClick={this.sort('dataFim')}>
                          <Translate contentKey="generadorApp.julho.dataFim">Data Fim</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'especialidade' ? (
                        <th className="hand" onClick={this.sort('especialidade')}>
                          <Translate contentKey="generadorApp.julho.especialidade">Especialidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'periodicidade' ? (
                        <th className="hand" onClick={this.sort('periodicidade')}>
                          <Translate contentKey="generadorApp.julho.periodicidade">Periodicidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'periodo' ? (
                        <th className="hand" onClick={this.sort('periodo')}>
                          <Translate contentKey="generadorApp.julho.periodo">Periodo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'qtd' ? (
                        <th className="hand" onClick={this.sort('qtd')}>
                          <Translate contentKey="generadorApp.julho.qtd">Qtd</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {julhoList.map((julho, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${julho.id}`} color="link" size="sm">
                            {julho.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'dataInicio' ? <td>{julho.dataInicio}</td> : null}

                        {this.state.baseFilters !== 'dataFim' ? <td>{julho.dataFim}</td> : null}

                        {this.state.baseFilters !== 'especialidade' ? <td>{julho.especialidade}</td> : null}

                        {this.state.baseFilters !== 'periodicidade' ? <td>{julho.periodicidade}</td> : null}

                        {this.state.baseFilters !== 'periodo' ? <td>{julho.periodo}</td> : null}

                        {this.state.baseFilters !== 'qtd' ? <td>{julho.qtd}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${julho.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${julho.id}/edit?${this.getFiltersURL()}`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${julho.id}/delete?${this.getFiltersURL()}`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.julho.home.notFound">No Julhos found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={julhoList && julhoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ julho, ...storeState }: IRootState) => ({
  julhoList: julho.entities,
  totalItems: julho.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Julho);
