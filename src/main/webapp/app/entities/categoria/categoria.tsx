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
import { getEntities } from './categoria.reducer';
import { ICategoria } from 'app/shared/model/categoria.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ICategoriaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ICategoriaBaseState {
  categoria: any;
  styleCategoria: any;
  icon: any;
  publicar: any;
  dataPost: any;
  ordem: any;
  publicarSite: any;
  categoriaAtividade: any;
  categoriaContrato: any;
  categoriaUnidade: any;
  cidXPtaNovoPadItemIndi: any;
  especialidade: any;
}
export interface ICategoriaState extends ICategoriaBaseState, IPaginationBaseState {}

export class Categoria extends React.Component<ICategoriaProps, ICategoriaState> {
  private myFormRef: any;

  constructor(props: ICategoriaProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getCategoriaState(this.props.location)
    };
  }

  getCategoriaState = (location): ICategoriaBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const categoria = url.searchParams.get('categoria') || '';
    const styleCategoria = url.searchParams.get('styleCategoria') || '';
    const icon = url.searchParams.get('icon') || '';
    const publicar = url.searchParams.get('publicar') || '';
    const dataPost = url.searchParams.get('dataPost') || '';
    const ordem = url.searchParams.get('ordem') || '';
    const publicarSite = url.searchParams.get('publicarSite') || '';

    const categoriaAtividade = url.searchParams.get('categoriaAtividade') || '';
    const categoriaContrato = url.searchParams.get('categoriaContrato') || '';
    const categoriaUnidade = url.searchParams.get('categoriaUnidade') || '';
    const cidXPtaNovoPadItemIndi = url.searchParams.get('cidXPtaNovoPadItemIndi') || '';
    const especialidade = url.searchParams.get('especialidade') || '';

    return {
      categoria,
      styleCategoria,
      icon,
      publicar,
      dataPost,
      ordem,
      publicarSite,
      categoriaAtividade,
      categoriaContrato,
      categoriaUnidade,
      cidXPtaNovoPadItemIndi,
      especialidade
    };
  };

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        categoria: '',
        styleCategoria: '',
        icon: '',
        publicar: '',
        dataPost: '',
        ordem: '',
        publicarSite: '',
        categoriaAtividade: '',
        categoriaContrato: '',
        categoriaUnidade: '',
        cidXPtaNovoPadItemIndi: '',
        especialidade: ''
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
      'dataPost=' +
      this.state.dataPost +
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
      'categoriaUnidade=' +
      this.state.categoriaUnidade +
      '&' +
      'cidXPtaNovoPadItemIndi=' +
      this.state.cidXPtaNovoPadItemIndi +
      '&' +
      'especialidade=' +
      this.state.especialidade +
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
      dataPost,
      ordem,
      publicarSite,
      categoriaAtividade,
      categoriaContrato,
      categoriaUnidade,
      cidXPtaNovoPadItemIndi,
      especialidade,
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
      dataPost,
      ordem,
      publicarSite,
      categoriaAtividade,
      categoriaContrato,
      categoriaUnidade,
      cidXPtaNovoPadItemIndi,
      especialidade,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { categoriaList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Categorias</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Categorias</span>
              <Button id="togglerFilterCategoria" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.categoria.home.createLabel">Create a new Categoria</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterCategoria">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="categoriaLabel" for="categoria-categoria">
                            <Translate contentKey="generadorApp.categoria.categoria">Categoria</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="categoria"
                            id="categoria-categoria"
                            value={this.state.categoria}
                            validate={{
                              maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="styleCategoriaLabel" for="categoria-styleCategoria">
                            <Translate contentKey="generadorApp.categoria.styleCategoria">Style Categoria</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="styleCategoria"
                            id="categoria-styleCategoria"
                            value={this.state.styleCategoria}
                            validate={{
                              maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="iconLabel" for="categoria-icon">
                            <Translate contentKey="generadorApp.categoria.icon">Icon</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="icon"
                            id="categoria-icon"
                            value={this.state.icon}
                            validate={{
                              maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="publicarLabel" for="categoria-publicar">
                            <Translate contentKey="generadorApp.categoria.publicar">Publicar</Translate>
                          </Label>
                          <AvInput type="string" name="publicar" id="categoria-publicar" value={this.state.publicar} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataPostLabel" for="categoria-dataPost">
                            <Translate contentKey="generadorApp.categoria.dataPost">Data Post</Translate>
                          </Label>
                          <AvInput
                            id="categoria-dataPost"
                            type="datetime-local"
                            className="form-control"
                            name="dataPost"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.dataPost ? convertDateTimeFromServer(this.state.dataPost) : null}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ordemLabel" for="categoria-ordem">
                            <Translate contentKey="generadorApp.categoria.ordem">Ordem</Translate>
                          </Label>
                          <AvInput type="string" name="ordem" id="categoria-ordem" value={this.state.ordem} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="publicarSiteLabel" for="categoria-publicarSite">
                            <Translate contentKey="generadorApp.categoria.publicarSite">Publicar Site</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="publicarSite"
                            id="categoria-publicarSite"
                            value={this.state.publicarSite}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
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

              {categoriaList && categoriaList.length > 0 ? (
                <Table responsive aria-describedby="categoria-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('categoria')}>
                        <Translate contentKey="generadorApp.categoria.categoria">Categoria</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('styleCategoria')}>
                        <Translate contentKey="generadorApp.categoria.styleCategoria">Style Categoria</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('icon')}>
                        <Translate contentKey="generadorApp.categoria.icon">Icon</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('publicar')}>
                        <Translate contentKey="generadorApp.categoria.publicar">Publicar</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataPost')}>
                        <Translate contentKey="generadorApp.categoria.dataPost">Data Post</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ordem')}>
                        <Translate contentKey="generadorApp.categoria.ordem">Ordem</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('publicarSite')}>
                        <Translate contentKey="generadorApp.categoria.publicarSite">Publicar Site</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

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

                        <td>{categoria.categoria}</td>

                        <td>{categoria.styleCategoria}</td>

                        <td>{categoria.icon}</td>

                        <td>{categoria.publicar}</td>

                        <td>
                          <TextFormat type="date" value={categoria.dataPost} format={APP_DATE_FORMAT} />
                        </td>

                        <td>{categoria.ordem}</td>

                        <td>{categoria.publicarSite}</td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${categoria.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${categoria.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${categoria.id}/delete`} color="danger" size="sm">
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
  categoriaList: categoria.entities,
  totalItems: categoria.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Categoria);
