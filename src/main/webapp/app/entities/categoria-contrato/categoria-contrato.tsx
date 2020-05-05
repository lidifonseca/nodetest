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
      'contrato=' +
      this.state.contrato +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'idCategoria=' +
      this.state.idCategoria +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { contrato, ativo, idCategoria, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(contrato, ativo, idCategoria, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { categorias, categoriaContratoList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Categoria Contratoes</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Categoria Contratoes</span>
              <Button id="togglerFilterCategoriaContrato" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.categoriaContrato.home.createLabel">Create a new Categoria Contrato</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterCategoriaContrato">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="contratoLabel" for="categoria-contrato-contrato">
                            <Translate contentKey="generadorApp.categoriaContrato.contrato">Contrato</Translate>
                          </Label>

                          <AvInput type="text" name="contrato" id="categoria-contrato-contrato" value={this.state.contrato} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="categoria-contrato-ativo">
                            <Translate contentKey="generadorApp.categoriaContrato.ativo">Ativo</Translate>
                          </Label>
                          <AvInput type="string" name="ativo" id="categoria-contrato-ativo" value={this.state.ativo} />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="categoria-contrato-idCategoria">
                              <Translate contentKey="generadorApp.categoriaContrato.idCategoria">Id Categoria</Translate>
                            </Label>
                            <AvInput id="categoria-contrato-idCategoria" type="select" className="form-control" name="idCategoriaId">
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

              {categoriaContratoList && categoriaContratoList.length > 0 ? (
                <Table responsive aria-describedby="categoria-contrato-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('contrato')}>
                        <Translate contentKey="generadorApp.categoriaContrato.contrato">Contrato</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.categoriaContrato.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.categoriaContrato.idCategoria">Id Categoria</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

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

                        <td>{categoriaContrato.contrato}</td>

                        <td>{categoriaContrato.ativo}</td>
                        <td>
                          {categoriaContrato.idCategoria ? (
                            <Link to={`categoria/${categoriaContrato.idCategoria.id}`}>{categoriaContrato.idCategoria.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container"></div>
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
