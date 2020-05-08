/* eslint complexity: ["error", 100] */
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
import {
  openFile,
  Translate,
  translate,
  ICrudGetAllAction,
  getSortState,
  IPaginationBaseState,
  JhiPagination,
  JhiItemCount
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';

import { IRootState } from 'app/shared/reducers';
import { getCategoriaContratoState, ICategoriaContratoBaseState, getEntities } from './categoria-contrato.reducer';
import { ICategoriaContrato } from 'app/shared/model/categoria-contrato.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { ICategoria } from 'app/shared/model/categoria.model';
import { getEntities as getCategorias } from 'app/entities/categoria/categoria.reducer';

export interface ICategoriaContratoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ICategoriaContratoState extends ICategoriaContratoBaseState, IPaginationBaseState {}

export class CategoriaContrato extends React.Component<ICategoriaContratoProps, ICategoriaContratoState> {
  private myFormRef: any;

  constructor(props: ICategoriaContratoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getCategoriaContratoState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getCategorias();
  }

  cancelCourse = () => {
    this.setState(
      {
        contrato: '',
        ativo: '',
        categoria: ''
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
      'contrato=' +
      this.state.contrato +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'categoria=' +
      this.state.categoria +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { contrato, ativo, categoria, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(contrato, ativo, categoria, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { categorias, categoriaContratoList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Categoria Contratoes</span>
          <Button id="togglerFilterCategoriaContrato" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.categoriaContrato.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.categoriaContrato.home.createLabel">Create a new Categoria Contrato</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Categoria Contratoes</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterCategoriaContrato">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'contrato' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ativo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ativoLabel" for="categoria-contrato-ativo">
                              <Translate contentKey="generadorApp.categoriaContrato.ativo">Ativo</Translate>
                            </Label>
                            <AvInput type="string" name="ativo" id="categoria-contrato-ativo" value={this.state.ativo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'categoria' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="categoria-contrato-categoria">
                                <Translate contentKey="generadorApp.categoriaContrato.categoria">Categoria</Translate>
                              </Label>
                              <Select
                                id="categoria-contrato-categoria"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  categorias
                                    ? categorias.map(p =>
                                        this.state.categoria.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null
                                      )
                                    : null
                                }
                                options={categorias ? categorias.map(option => ({ value: option.id, label: option.id })) : null}
                                onChange={options => this.setState({ categoria: options.map(option => option['value']).join(',') })}
                                name={'categoria'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.categoriaContrato.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.categoriaContrato.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {categoriaContratoList && categoriaContratoList.length > 0 ? (
                <Table responsive aria-describedby="categoria-contrato-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'contrato' ? (
                        <th className="hand" onClick={this.sort('contrato')}>
                          <Translate contentKey="generadorApp.categoriaContrato.contrato">Contrato</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ativo' ? (
                        <th className="hand" onClick={this.sort('ativo')}>
                          <Translate contentKey="generadorApp.categoriaContrato.ativo">Ativo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'categoria' ? (
                        <th>
                          <Translate contentKey="generadorApp.categoriaContrato.categoria">Categoria</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {categoriaContratoList.map((categoriaContrato, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${categoriaContrato.id}`} color="link" size="sm">
                            {categoriaContrato.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'contrato' ? (
                          <td>
                            {categoriaContrato.contrato ? (
                              <div>
                                <a rel="noopener noreferrer" target={'_blank'} href={`${categoriaContrato.contrato}`}>
                                  {categoriaContrato.contratoContentType && categoriaContrato.contratoContentType.includes('image/') ? (
                                    <img src={`${categoriaContrato.contrato}`} style={{ maxHeight: '30px' }} />
                                  ) : (
                                    <Translate contentKey="entity.action.open">Open</Translate>
                                  )}
                                </a>
                              </div>
                            ) : null}
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'ativo' ? <td>{categoriaContrato.ativo}</td> : null}

                        {this.state.baseFilters !== 'categoria' ? (
                          <td>
                            {categoriaContrato.categoria ? (
                              <Link to={`categoria/${categoriaContrato.categoria.id}`}>{categoriaContrato.categoria.id}</Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${categoriaContrato.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${categoriaContrato.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${categoriaContrato.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.categoriaContrato.home.notFound">No Categoria Contratoes found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={categoriaContratoList && categoriaContratoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ categoriaContrato, ...storeState }: IRootState) => ({
  categorias: storeState.categoria.entities,
  categoriaContratoList: categoriaContrato.entities,
  totalItems: categoriaContrato.totalItems
});

const mapDispatchToProps = {
  getCategorias,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CategoriaContrato);
