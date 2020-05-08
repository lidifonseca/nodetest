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
import { Translate, translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';

import { IRootState } from 'app/shared/reducers';
import { getCategoriaState, ICategoriaBaseState, getEntities } from './categoria.reducer';
import { ICategoria } from 'app/shared/model/categoria.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { getEntities as getUnidadeEasies } from 'app/entities/unidade-easy/unidade-easy.reducer';

export interface ICategoriaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ICategoriaState extends ICategoriaBaseState, IPaginationBaseState {}

export class Categoria extends React.Component<ICategoriaProps, ICategoriaState> {
  private myFormRef: any;

  constructor(props: ICategoriaProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getCategoriaState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getUnidadeEasies();
  }

  cancelCourse = () => {
    this.setState(
      {
        categoria: '',
        styleCategoria: '',
        icon: '',
        publicar: '',
        ordem: '',
        publicarSite: '',
        categoriaAtividade: '',
        categoriaContrato: '',
        cidXPtaNovoPadItemIndi: '',
        especialidade: '',
        unidade: ''
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
      'categoria=' +
      this.state.categoria +
      '&' +
      'styleCategoria=' +
      this.state.styleCategoria +
      '&' +
      'icon=' +
      this.state.icon +
      '&' +
      'publicar=' +
      this.state.publicar +
      '&' +
      'ordem=' +
      this.state.ordem +
      '&' +
      'publicarSite=' +
      this.state.publicarSite +
      '&' +
      'categoriaAtividade=' +
      this.state.categoriaAtividade +
      '&' +
      'categoriaContrato=' +
      this.state.categoriaContrato +
      '&' +
      'cidXPtaNovoPadItemIndi=' +
      this.state.cidXPtaNovoPadItemIndi +
      '&' +
      'especialidade=' +
      this.state.especialidade +
      '&' +
      'unidade=' +
      this.state.unidade +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      categoria,
      styleCategoria,
      icon,
      publicar,
      ordem,
      publicarSite,
      categoriaAtividade,
      categoriaContrato,
      cidXPtaNovoPadItemIndi,
      especialidade,
      unidade,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      categoria,
      styleCategoria,
      icon,
      publicar,
      ordem,
      publicarSite,
      categoriaAtividade,
      categoriaContrato,
      cidXPtaNovoPadItemIndi,
      especialidade,
      unidade,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { unidadeEasies, categoriaList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Categorias</span>
          <Button id="togglerFilterCategoria" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.categoria.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.categoria.home.createLabel">Create a new Categoria</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Categorias</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterCategoria">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'categoria' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="categoriaLabel" for="categoria-categoria">
                              <Translate contentKey="generadorApp.categoria.categoria">Categoria</Translate>
                            </Label>

                            <AvInput type="text" name="categoria" id="categoria-categoria" value={this.state.categoria} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'styleCategoria' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="styleCategoriaLabel" for="categoria-styleCategoria">
                              <Translate contentKey="generadorApp.categoria.styleCategoria">Style Categoria</Translate>
                            </Label>

                            <AvInput type="text" name="styleCategoria" id="categoria-styleCategoria" value={this.state.styleCategoria} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'icon' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="iconLabel" for="categoria-icon">
                              <Translate contentKey="generadorApp.categoria.icon">Icon</Translate>
                            </Label>

                            <AvInput type="text" name="icon" id="categoria-icon" value={this.state.icon} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'publicar' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="publicarLabel" for="categoria-publicar">
                              <Translate contentKey="generadorApp.categoria.publicar">Publicar</Translate>
                            </Label>
                            <AvInput type="string" name="publicar" id="categoria-publicar" value={this.state.publicar} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ordem' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ordemLabel" for="categoria-ordem">
                              <Translate contentKey="generadorApp.categoria.ordem">Ordem</Translate>
                            </Label>
                            <AvInput type="string" name="ordem" id="categoria-ordem" value={this.state.ordem} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'publicarSite' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="publicarSiteLabel" for="categoria-publicarSite">
                              <Translate contentKey="generadorApp.categoria.publicarSite">Publicar Site</Translate>
                            </Label>
                            <AvInput type="string" name="publicarSite" id="categoria-publicarSite" value={this.state.publicarSite} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'categoriaAtividade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'categoriaContrato' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cidXPtaNovoPadItemIndi' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'especialidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'unidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="categoria-unidade">
                                <Translate contentKey="generadorApp.categoria.unidade">Unidade</Translate>
                              </Label>
                              <Select
                                id="categoria-unidade"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  unidadeEasies
                                    ? unidadeEasies.map(p =>
                                        this.state.unidade.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.razaoSocial } : null
                                      )
                                    : null
                                }
                                options={
                                  unidadeEasies ? unidadeEasies.map(option => ({ value: option.id, label: option.razaoSocial })) : null
                                }
                                onChange={options => this.setState({ unidade: options.map(option => option['value']).join(',') })}
                                name={'unidade'}
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
                        <Translate contentKey="generadorApp.categoria.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.categoria.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {categoriaList && categoriaList.length > 0 ? (
                <Table responsive aria-describedby="categoria-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'categoria' ? (
                        <th className="hand" onClick={this.sort('categoria')}>
                          <Translate contentKey="generadorApp.categoria.categoria">Categoria</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'styleCategoria' ? (
                        <th className="hand" onClick={this.sort('styleCategoria')}>
                          <Translate contentKey="generadorApp.categoria.styleCategoria">Style Categoria</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'icon' ? (
                        <th className="hand" onClick={this.sort('icon')}>
                          <Translate contentKey="generadorApp.categoria.icon">Icon</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'publicar' ? (
                        <th className="hand" onClick={this.sort('publicar')}>
                          <Translate contentKey="generadorApp.categoria.publicar">Publicar</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ordem' ? (
                        <th className="hand" onClick={this.sort('ordem')}>
                          <Translate contentKey="generadorApp.categoria.ordem">Ordem</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'publicarSite' ? (
                        <th className="hand" onClick={this.sort('publicarSite')}>
                          <Translate contentKey="generadorApp.categoria.publicarSite">Publicar Site</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {categoriaList.map((categoria, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${categoria.id}`} color="link" size="sm">
                            {categoria.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'categoria' ? <td>{categoria.categoria}</td> : null}

                        {this.state.baseFilters !== 'styleCategoria' ? <td>{categoria.styleCategoria}</td> : null}

                        {this.state.baseFilters !== 'icon' ? <td>{categoria.icon}</td> : null}

                        {this.state.baseFilters !== 'publicar' ? <td>{categoria.publicar}</td> : null}

                        {this.state.baseFilters !== 'ordem' ? <td>{categoria.ordem}</td> : null}

                        {this.state.baseFilters !== 'publicarSite' ? <td>{categoria.publicarSite}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${categoria.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${categoria.id}/edit?${this.getFiltersURL()}`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${categoria.id}/delete?${this.getFiltersURL()}`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.categoria.home.notFound">No Categorias found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={categoriaList && categoriaList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ categoria, ...storeState }: IRootState) => ({
  unidadeEasies: storeState.unidadeEasy.entities,
  categoriaList: categoria.entities,
  totalItems: categoria.totalItems
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Categoria);
