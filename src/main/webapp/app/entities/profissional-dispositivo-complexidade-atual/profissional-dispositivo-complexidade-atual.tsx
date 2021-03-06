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
import {
  getProfissionalDispositivoComplexidadeAtualState,
  IProfissionalDispositivoComplexidadeAtualBaseState,
  getEntities
} from './profissional-dispositivo-complexidade-atual.reducer';
import { IProfissionalDispositivoComplexidadeAtual } from 'app/shared/model/profissional-dispositivo-complexidade-atual.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IProfissionalDispositivoComplexidadeAtualProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IProfissionalDispositivoComplexidadeAtualState
  extends IProfissionalDispositivoComplexidadeAtualBaseState,
    IPaginationBaseState {}

export class ProfissionalDispositivoComplexidadeAtual extends React.Component<
  IProfissionalDispositivoComplexidadeAtualProps,
  IProfissionalDispositivoComplexidadeAtualState
> {
  private myFormRef: any;

  constructor(props: IProfissionalDispositivoComplexidadeAtualProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getProfissionalDispositivoComplexidadeAtualState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idProfissional: '',
        idProfissionalDispositivoComplexidade: ''
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
      'idProfissional=' +
      this.state.idProfissional +
      '&' +
      'idProfissionalDispositivoComplexidade=' +
      this.state.idProfissionalDispositivoComplexidade +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idProfissional, idProfissionalDispositivoComplexidade, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(idProfissional, idProfissionalDispositivoComplexidade, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { profissionalDispositivoComplexidadeAtualList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Profissional Dispositivo Complexidade Atuals</span>
          <Button id="togglerFilterProfissionalDispositivoComplexidadeAtual" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.profissionalDispositivoComplexidadeAtual.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.profissionalDispositivoComplexidadeAtual.home.createLabel">
              Create a new Profissional Dispositivo Complexidade Atual
            </Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Profissional Dispositivo Complexidade Atuals</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterProfissionalDispositivoComplexidadeAtual">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idProfissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idProfissionalLabel" for="profissional-dispositivo-complexidade-atual-idProfissional">
                              <Translate contentKey="generadorApp.profissionalDispositivoComplexidadeAtual.idProfissional">
                                Id Profissional
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idProfissional"
                              id="profissional-dispositivo-complexidade-atual-idProfissional"
                              value={this.state.idProfissional}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idProfissionalDispositivoComplexidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label
                              id="idProfissionalDispositivoComplexidadeLabel"
                              for="profissional-dispositivo-complexidade-atual-idProfissionalDispositivoComplexidade"
                            >
                              <Translate contentKey="generadorApp.profissionalDispositivoComplexidadeAtual.idProfissionalDispositivoComplexidade">
                                Id Profissional Dispositivo Complexidade
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idProfissionalDispositivoComplexidade"
                              id="profissional-dispositivo-complexidade-atual-idProfissionalDispositivoComplexidade"
                              value={this.state.idProfissionalDispositivoComplexidade}
                            />
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.profissionalDispositivoComplexidadeAtual.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.profissionalDispositivoComplexidadeAtual.home.btn_filter_clean">
                          Clean
                        </Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {profissionalDispositivoComplexidadeAtualList && profissionalDispositivoComplexidadeAtualList.length > 0 ? (
                <Table
                  responsive
                  aria-describedby="profissional-dispositivo-complexidade-atual-heading"
                  className={'table-hover table-striped mt-4'}
                >
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'idProfissional' ? (
                        <th className="hand" onClick={this.sort('idProfissional')}>
                          <Translate contentKey="generadorApp.profissionalDispositivoComplexidadeAtual.idProfissional">
                            Id Profissional
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idProfissionalDispositivoComplexidade' ? (
                        <th className="hand" onClick={this.sort('idProfissionalDispositivoComplexidade')}>
                          <Translate contentKey="generadorApp.profissionalDispositivoComplexidadeAtual.idProfissionalDispositivoComplexidade">
                            Id Profissional Dispositivo Complexidade
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {profissionalDispositivoComplexidadeAtualList.map((profissionalDispositivoComplexidadeAtual, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${profissionalDispositivoComplexidadeAtual.id}`} color="link" size="sm">
                            {profissionalDispositivoComplexidadeAtual.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'idProfissional' ? (
                          <td>{profissionalDispositivoComplexidadeAtual.idProfissional}</td>
                        ) : null}

                        {this.state.baseFilters !== 'idProfissionalDispositivoComplexidade' ? (
                          <td>{profissionalDispositivoComplexidadeAtual.idProfissionalDispositivoComplexidade}</td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button
                              tag={Link}
                              to={`${match.url}/${profissionalDispositivoComplexidadeAtual.id}?${this.getFiltersURL()}`}
                              color="info"
                              size="sm"
                            >
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${profissionalDispositivoComplexidadeAtual.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${profissionalDispositivoComplexidadeAtual.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.profissionalDispositivoComplexidadeAtual.home.notFound">
                    No Profissional Dispositivo Complexidade Atuals found
                  </Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div
              className={
                profissionalDispositivoComplexidadeAtualList && profissionalDispositivoComplexidadeAtualList.length > 0 ? '' : 'd-none'
              }
            >
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

const mapStateToProps = ({ profissionalDispositivoComplexidadeAtual, ...storeState }: IRootState) => ({
  profissionalDispositivoComplexidadeAtualList: profissionalDispositivoComplexidadeAtual.entities,
  totalItems: profissionalDispositivoComplexidadeAtual.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalDispositivoComplexidadeAtual);
