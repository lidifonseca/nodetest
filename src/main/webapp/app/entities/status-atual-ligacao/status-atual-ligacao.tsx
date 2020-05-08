/* eslint complexity: ["error", 300] */
import React from 'react';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { connect } from 'react-redux';
import Select from 'react-select';
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
import { getStatusAtualLigacaoState, IStatusAtualLigacaoBaseState, getEntities } from './status-atual-ligacao.reducer';
import { IStatusAtualLigacao } from 'app/shared/model/status-atual-ligacao.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IStatusAtualLigacaoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IStatusAtualLigacaoState extends IStatusAtualLigacaoBaseState, IPaginationBaseState {}

export class StatusAtualLigacao extends React.Component<IStatusAtualLigacaoProps, IStatusAtualLigacaoState> {
  private myFormRef: any;

  constructor(props: IStatusAtualLigacaoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getStatusAtualLigacaoState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        statusAtualLigacao: '',
        styleLabel: ''
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
      'statusAtualLigacao=' +
      this.state.statusAtualLigacao +
      '&' +
      'styleLabel=' +
      this.state.styleLabel +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { statusAtualLigacao, styleLabel, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(statusAtualLigacao, styleLabel, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { statusAtualLigacaoList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Status Atual Ligacaos</span>
          <Button id="togglerFilterStatusAtualLigacao" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.statusAtualLigacao.home.btn_filter_open">Filters</Translate>
            &nbsp;
            <FontAwesomeIcon icon="caret-down" />
          </Button>{' '}
          &nbsp;
          <Link
            to={`${match.url}/new?${this.getFiltersURL()}`}
            className="btn btn-primary float-right jh-create-entity"
            id="jh-create-entity"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="generadorApp.statusAtualLigacao.home.createLabel">Create a new Status Atual Ligacao</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Status Atual Ligacaos</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterStatusAtualLigacao">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'statusAtualLigacao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="statusAtualLigacaoLabel" for="status-atual-ligacao-statusAtualLigacao">
                              <Translate contentKey="generadorApp.statusAtualLigacao.statusAtualLigacao">Status Atual Ligacao</Translate>
                            </Label>

                            <AvInput
                              type="text"
                              name="statusAtualLigacao"
                              id="status-atual-ligacao-statusAtualLigacao"
                              value={this.state.statusAtualLigacao}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'styleLabel' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="styleLabelLabel" for="status-atual-ligacao-styleLabel">
                              <Translate contentKey="generadorApp.statusAtualLigacao.styleLabel">Style Label</Translate>
                            </Label>

                            <AvInput type="text" name="styleLabel" id="status-atual-ligacao-styleLabel" value={this.state.styleLabel} />
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.statusAtualLigacao.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.statusAtualLigacao.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {statusAtualLigacaoList && statusAtualLigacaoList.length > 0 ? (
                <Table responsive aria-describedby="status-atual-ligacao-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'statusAtualLigacao' ? (
                        <th className="hand" onClick={this.sort('statusAtualLigacao')}>
                          <Translate contentKey="generadorApp.statusAtualLigacao.statusAtualLigacao">Status Atual Ligacao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'styleLabel' ? (
                        <th className="hand" onClick={this.sort('styleLabel')}>
                          <Translate contentKey="generadorApp.statusAtualLigacao.styleLabel">Style Label</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {statusAtualLigacaoList.map((statusAtualLigacao, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${statusAtualLigacao.id}`} color="link" size="sm">
                            {statusAtualLigacao.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'statusAtualLigacao' ? <td>{statusAtualLigacao.statusAtualLigacao}</td> : null}

                        {this.state.baseFilters !== 'styleLabel' ? <td>{statusAtualLigacao.styleLabel}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${statusAtualLigacao.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${statusAtualLigacao.id}/edit?${this.getFiltersURL()}`}
                              color="primary"
                              size="sm"
                            >
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${statusAtualLigacao.id}/delete?${this.getFiltersURL()}`}
                              color="danger"
                              size="sm"
                            >
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
                  <Translate contentKey="generadorApp.statusAtualLigacao.home.notFound">No Status Atual Ligacaos found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={statusAtualLigacaoList && statusAtualLigacaoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ statusAtualLigacao, ...storeState }: IRootState) => ({
  statusAtualLigacaoList: statusAtualLigacao.entities,
  totalItems: statusAtualLigacao.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StatusAtualLigacao);
