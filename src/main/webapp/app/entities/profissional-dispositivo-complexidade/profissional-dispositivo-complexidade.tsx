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
  getProfissionalDispositivoComplexidadeState,
  IProfissionalDispositivoComplexidadeBaseState,
  getEntities
} from './profissional-dispositivo-complexidade.reducer';
import { IProfissionalDispositivoComplexidade } from 'app/shared/model/profissional-dispositivo-complexidade.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IProfissionalDispositivoComplexidadeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IProfissionalDispositivoComplexidadeState extends IProfissionalDispositivoComplexidadeBaseState, IPaginationBaseState {}

export class ProfissionalDispositivoComplexidade extends React.Component<
  IProfissionalDispositivoComplexidadeProps,
  IProfissionalDispositivoComplexidadeState
> {
  private myFormRef: any;

  constructor(props: IProfissionalDispositivoComplexidadeProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getProfissionalDispositivoComplexidadeState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        caracteristica: '',
        ativo: '',
        tipo: ''
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
      'caracteristica=' +
      this.state.caracteristica +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'tipo=' +
      this.state.tipo +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { caracteristica, ativo, tipo, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(caracteristica, ativo, tipo, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { profissionalDispositivoComplexidadeList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Profissional Dispositivo Complexidades</span>
          <Button id="togglerFilterProfissionalDispositivoComplexidade" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.profissionalDispositivoComplexidade.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.profissionalDispositivoComplexidade.home.createLabel">
              Create a new Profissional Dispositivo Complexidade
            </Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Profissional Dispositivo Complexidades</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterProfissionalDispositivoComplexidade">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'caracteristica' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="caracteristicaLabel" for="profissional-dispositivo-complexidade-caracteristica">
                              <Translate contentKey="generadorApp.profissionalDispositivoComplexidade.caracteristica">
                                Caracteristica
                              </Translate>
                            </Label>

                            <AvInput
                              type="text"
                              name="caracteristica"
                              id="profissional-dispositivo-complexidade-caracteristica"
                              value={this.state.caracteristica}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ativo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ativoLabel" check>
                              <AvInput
                                id="profissional-dispositivo-complexidade-ativo"
                                type="checkbox"
                                className="form-control"
                                name="ativo"
                              />
                              <Translate contentKey="generadorApp.profissionalDispositivoComplexidade.ativo">Ativo</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'tipo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="tipoLabel" for="profissional-dispositivo-complexidade-tipo">
                              <Translate contentKey="generadorApp.profissionalDispositivoComplexidade.tipo">Tipo</Translate>
                            </Label>

                            <AvInput type="text" name="tipo" id="profissional-dispositivo-complexidade-tipo" value={this.state.tipo} />
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.profissionalDispositivoComplexidade.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.profissionalDispositivoComplexidade.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {profissionalDispositivoComplexidadeList && profissionalDispositivoComplexidadeList.length > 0 ? (
                <Table
                  responsive
                  aria-describedby="profissional-dispositivo-complexidade-heading"
                  className={'table-hover table-striped mt-4'}
                >
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'caracteristica' ? (
                        <th className="hand" onClick={this.sort('caracteristica')}>
                          <Translate contentKey="generadorApp.profissionalDispositivoComplexidade.caracteristica">Caracteristica</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ativo' ? (
                        <th className="hand" onClick={this.sort('ativo')}>
                          <Translate contentKey="generadorApp.profissionalDispositivoComplexidade.ativo">Ativo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'tipo' ? (
                        <th className="hand" onClick={this.sort('tipo')}>
                          <Translate contentKey="generadorApp.profissionalDispositivoComplexidade.tipo">Tipo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {profissionalDispositivoComplexidadeList.map((profissionalDispositivoComplexidade, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${profissionalDispositivoComplexidade.id}`} color="link" size="sm">
                            {profissionalDispositivoComplexidade.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'caracteristica' ? <td>{profissionalDispositivoComplexidade.caracteristica}</td> : null}

                        {this.state.baseFilters !== 'ativo' ? (
                          <td>{profissionalDispositivoComplexidade.ativo ? 'true' : 'false'}</td>
                        ) : null}

                        {this.state.baseFilters !== 'tipo' ? <td>{profissionalDispositivoComplexidade.tipo}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button
                              tag={Link}
                              to={`${match.url}/${profissionalDispositivoComplexidade.id}?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${profissionalDispositivoComplexidade.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${profissionalDispositivoComplexidade.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.profissionalDispositivoComplexidade.home.notFound">
                    No Profissional Dispositivo Complexidades found
                  </Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={profissionalDispositivoComplexidadeList && profissionalDispositivoComplexidadeList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ profissionalDispositivoComplexidade, ...storeState }: IRootState) => ({
  profissionalDispositivoComplexidadeList: profissionalDispositivoComplexidade.entities,
  totalItems: profissionalDispositivoComplexidade.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalDispositivoComplexidade);
