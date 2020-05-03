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
import { getEntities } from './categoria-atividade.reducer';
import { ICategoriaAtividade } from 'app/shared/model/categoria-atividade.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { ICategoria } from 'app/shared/model/categoria.model';
import { getEntities as getCategorias } from 'app/entities/categoria/categoria.reducer';

export interface ICategoriaAtividadeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ICategoriaAtividadeBaseState {
  atividade: any;
  idUnidade: any;
  atendimentoAtividades: any;
  padItemAtividade: any;
  idCategoria: any;
}
export interface ICategoriaAtividadeState extends ICategoriaAtividadeBaseState, IPaginationBaseState {}

export class CategoriaAtividade extends React.Component<ICategoriaAtividadeProps, ICategoriaAtividadeState> {
  private myFormRef: any;

  constructor(props: ICategoriaAtividadeProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getCategoriaAtividadeState(this.props.location)
    };
  }

  getCategoriaAtividadeState = (location): ICategoriaAtividadeBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const atividade = url.searchParams.get('atividade') || '';
    const idUnidade = url.searchParams.get('idUnidade') || '';

    const atendimentoAtividades = url.searchParams.get('atendimentoAtividades') || '';
    const padItemAtividade = url.searchParams.get('padItemAtividade') || '';
    const idCategoria = url.searchParams.get('idCategoria') || '';

    return {
      atividade,
      idUnidade,
      atendimentoAtividades,
      padItemAtividade,
      idCategoria
    };
  };

  componentDidMount() {
    this.getEntities();

    this.props.getCategorias();
  }

  cancelCourse = () => {
    this.setState(
      {
        atividade: '',
        idUnidade: '',
        atendimentoAtividades: '',
        padItemAtividade: '',
        idCategoria: ''
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
      'atividade=' +
      this.state.atividade +
      '&' +
      'idUnidade=' +
      this.state.idUnidade +
      '&' +
      'atendimentoAtividades=' +
      this.state.atendimentoAtividades +
      '&' +
      'padItemAtividade=' +
      this.state.padItemAtividade +
      '&' +
      'idCategoria=' +
      this.state.idCategoria +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      atividade,
      idUnidade,
      atendimentoAtividades,
      padItemAtividade,
      idCategoria,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      atividade,
      idUnidade,
      atendimentoAtividades,
      padItemAtividade,
      idCategoria,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { categorias, categoriaAtividadeList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Categoria Atividades</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Categoria Atividades</span>
              <Button id="togglerFilterCategoriaAtividade" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.categoriaAtividade.home.createLabel">Create a new Categoria Atividade</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterCategoriaAtividade">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="atividadeLabel" for="categoria-atividade-atividade">
                            <Translate contentKey="generadorApp.categoriaAtividade.atividade">Atividade</Translate>
                          </Label>

                          <AvInput type="text" name="atividade" id="categoria-atividade-atividade" value={this.state.atividade} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idUnidadeLabel" for="categoria-atividade-idUnidade">
                            <Translate contentKey="generadorApp.categoriaAtividade.idUnidade">Id Unidade</Translate>
                          </Label>
                          <AvInput type="string" name="idUnidade" id="categoria-atividade-idUnidade" value={this.state.idUnidade} />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="categoria-atividade-idCategoria">
                              <Translate contentKey="generadorApp.categoriaAtividade.idCategoria">Id Categoria</Translate>
                            </Label>
                            <AvInput id="categoria-atividade-idCategoria" type="select" className="form-control" name="idCategoriaId">
                              <option value="" key="0" />
                              {categorias
                                ? categorias.map(otherEntity => (
                                    <option value={otherEntity.id} key={otherEntity.id}>
                                      {otherEntity.id}
                                    </option>
                                  ))
                                : null}
                            </AvInput>
                          </div>
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

              {categoriaAtividadeList && categoriaAtividadeList.length > 0 ? (
                <Table responsive aria-describedby="categoria-atividade-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('atividade')}>
                        <Translate contentKey="generadorApp.categoriaAtividade.atividade">Atividade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idUnidade')}>
                        <Translate contentKey="generadorApp.categoriaAtividade.idUnidade">Id Unidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.categoriaAtividade.idCategoria">Id Categoria</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

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

                        <td>{categoriaAtividade.atividade}</td>

                        <td>{categoriaAtividade.idUnidade}</td>
                        <td>
                          {categoriaAtividade.idCategoria ? (
                            <Link to={`categoria/${categoriaAtividade.idCategoria.id}`}>{categoriaAtividade.idCategoria.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${categoriaAtividade.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${categoriaAtividade.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${categoriaAtividade.id}/delete`} color="danger" size="sm">
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
  categorias: storeState.categoria.entities,
  categoriaAtividadeList: categoriaAtividade.entities,
  totalItems: categoriaAtividade.totalItems
});

const mapDispatchToProps = {
  getCategorias,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CategoriaAtividade);
