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
import { getCategoriaAtividadeState, ICategoriaAtividadeBaseState, getEntities } from './categoria-atividade.reducer';
import { ICategoriaAtividade } from 'app/shared/model/categoria-atividade.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { getEntities as getUnidadeEasies } from 'app/entities/unidade-easy/unidade-easy.reducer';
import { ICategoria } from 'app/shared/model/categoria.model';
import { getEntities as getCategorias } from 'app/entities/categoria/categoria.reducer';

export interface ICategoriaAtividadeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ICategoriaAtividadeState extends ICategoriaAtividadeBaseState, IPaginationBaseState {}

export class CategoriaAtividade extends React.Component<ICategoriaAtividadeProps, ICategoriaAtividadeState> {
  private myFormRef: any;

  constructor(props: ICategoriaAtividadeProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getCategoriaAtividadeState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getUnidadeEasies();
    this.props.getCategorias();
  }

  cancelCourse = () => {
    this.setState(
      {
        atividade: '',
        atendimentoAtividades: '',
        padItemAtividade: '',
        unidade: '',
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
      'atividade=' +
      this.state.atividade +
      '&' +
      'atendimentoAtividades=' +
      this.state.atendimentoAtividades +
      '&' +
      'padItemAtividade=' +
      this.state.padItemAtividade +
      '&' +
      'unidade=' +
      this.state.unidade +
      '&' +
      'categoria=' +
      this.state.categoria +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { atividade, atendimentoAtividades, padItemAtividade, unidade, categoria, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(
      atividade,
      atendimentoAtividades,
      padItemAtividade,
      unidade,
      categoria,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { unidadeEasies, categorias, categoriaAtividadeList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Categoria Atividades</span>
          <Button id="togglerFilterCategoriaAtividade" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.categoriaAtividade.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.categoriaAtividade.home.createLabel">Create a new Categoria Atividade</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Categoria Atividades</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterCategoriaAtividade">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'atividade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="atividadeLabel" for="categoria-atividade-atividade">
                              <Translate contentKey="generadorApp.categoriaAtividade.atividade">Atividade</Translate>
                            </Label>

                            <AvInput type="text" name="atividade" id="categoria-atividade-atividade" value={this.state.atividade} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'atendimentoAtividades' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'padItemAtividade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'unidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="categoria-atividade-unidade">
                                <Translate contentKey="generadorApp.categoriaAtividade.unidade">Unidade</Translate>
                              </Label>
                              <Select
                                id="categoria-atividade-unidade"
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

                      {this.state.baseFilters !== 'categoria' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="categoria-atividade-categoria">
                                <Translate contentKey="generadorApp.categoriaAtividade.categoria">Categoria</Translate>
                              </Label>
                              <Select
                                id="categoria-atividade-categoria"
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
                        <Translate contentKey="generadorApp.categoriaAtividade.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.categoriaAtividade.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {categoriaAtividadeList && categoriaAtividadeList.length > 0 ? (
                <Table responsive aria-describedby="categoria-atividade-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'atividade' ? (
                        <th className="hand" onClick={this.sort('atividade')}>
                          <Translate contentKey="generadorApp.categoriaAtividade.atividade">Atividade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'unidade' ? (
                        <th>
                          <Translate contentKey="generadorApp.categoriaAtividade.unidade">Unidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'categoria' ? (
                        <th>
                          <Translate contentKey="generadorApp.categoriaAtividade.categoria">Categoria</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {categoriaAtividadeList.map((categoriaAtividade, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${categoriaAtividade.id}`} color="link" size="sm">
                            {categoriaAtividade.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'atividade' ? <td>{categoriaAtividade.atividade}</td> : null}

                        {this.state.baseFilters !== 'unidade' ? (
                          <td>
                            {categoriaAtividade.unidade ? (
                              <Link to={`unidade-easy/${categoriaAtividade.unidade.id}`}>{categoriaAtividade.unidade.id}</Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'categoria' ? (
                          <td>
                            {categoriaAtividade.categoria ? (
                              <Link to={`categoria/${categoriaAtividade.categoria.id}`}>{categoriaAtividade.categoria.id}</Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${categoriaAtividade.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${categoriaAtividade.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${categoriaAtividade.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.categoriaAtividade.home.notFound">No Categoria Atividades found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={categoriaAtividadeList && categoriaAtividadeList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ categoriaAtividade, ...storeState }: IRootState) => ({
  unidadeEasies: storeState.unidadeEasy.entities,
  categorias: storeState.categoria.entities,
  categoriaAtividadeList: categoriaAtividade.entities,
  totalItems: categoriaAtividade.totalItems
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getCategorias,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CategoriaAtividade);
