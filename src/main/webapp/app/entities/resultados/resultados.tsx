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
import { getResultadosState, IResultadosBaseState, getEntities } from './resultados.reducer';
import { IResultados } from 'app/shared/model/resultados.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IResultadosProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IResultadosState extends IResultadosBaseState, IPaginationBaseState {}

export class Resultados extends React.Component<IResultadosProps, IResultadosState> {
  private myFormRef: any;

  constructor(props: IResultadosProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getResultadosState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        objetivo: '',
        valor: '',
        prazo: '',
        complemento: '',
        dataCadastro: '',
        dataVencimentoPrazo: ''
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
      'objetivo=' +
      this.state.objetivo +
      '&' +
      'valor=' +
      this.state.valor +
      '&' +
      'prazo=' +
      this.state.prazo +
      '&' +
      'complemento=' +
      this.state.complemento +
      '&' +
      'dataCadastro=' +
      this.state.dataCadastro +
      '&' +
      'dataVencimentoPrazo=' +
      this.state.dataVencimentoPrazo +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { objetivo, valor, prazo, complemento, dataCadastro, dataVencimentoPrazo, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(
      objetivo,
      valor,
      prazo,
      complemento,
      dataCadastro,
      dataVencimentoPrazo,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { resultadosList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Resultados</span>
          <Button id="togglerFilterResultados" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.resultados.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.resultados.home.createLabel">Create a new Resultados</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Resultados</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterResultados">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'objetivo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="objetivoLabel" for="resultados-objetivo">
                              <Translate contentKey="generadorApp.resultados.objetivo">Objetivo</Translate>
                            </Label>

                            <AvInput type="text" name="objetivo" id="resultados-objetivo" value={this.state.objetivo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'valor' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="valorLabel" for="resultados-valor">
                              <Translate contentKey="generadorApp.resultados.valor">Valor</Translate>
                            </Label>

                            <AvInput type="text" name="valor" id="resultados-valor" value={this.state.valor} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'prazo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="prazoLabel" for="resultados-prazo">
                              <Translate contentKey="generadorApp.resultados.prazo">Prazo</Translate>
                            </Label>

                            <AvInput type="text" name="prazo" id="resultados-prazo" value={this.state.prazo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'complemento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="complementoLabel" for="resultados-complemento">
                              <Translate contentKey="generadorApp.resultados.complemento">Complemento</Translate>
                            </Label>

                            <AvInput type="text" name="complemento" id="resultados-complemento" value={this.state.complemento} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dataCadastro' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="dataCadastroLabel" for="resultados-dataCadastro">
                              <Translate contentKey="generadorApp.resultados.dataCadastro">Data Cadastro</Translate>
                            </Label>
                            <AvInput
                              id="resultados-dataCadastro"
                              type="datetime-local"
                              className="form-control"
                              name="dataCadastro"
                              placeholder={'YYYY-MM-DD HH:mm'}
                              value={this.state.dataCadastro ? convertDateTimeFromServer(this.state.dataCadastro) : null}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dataVencimentoPrazo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="dataVencimentoPrazoLabel" for="resultados-dataVencimentoPrazo">
                              <Translate contentKey="generadorApp.resultados.dataVencimentoPrazo">Data Vencimento Prazo</Translate>
                            </Label>
                            <AvInput
                              type="date"
                              name="dataVencimentoPrazo"
                              id="resultados-dataVencimentoPrazo"
                              value={this.state.dataVencimentoPrazo}
                            />
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.resultados.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.resultados.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {resultadosList && resultadosList.length > 0 ? (
                <Table responsive aria-describedby="resultados-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'objetivo' ? (
                        <th className="hand" onClick={this.sort('objetivo')}>
                          <Translate contentKey="generadorApp.resultados.objetivo">Objetivo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'valor' ? (
                        <th className="hand" onClick={this.sort('valor')}>
                          <Translate contentKey="generadorApp.resultados.valor">Valor</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'prazo' ? (
                        <th className="hand" onClick={this.sort('prazo')}>
                          <Translate contentKey="generadorApp.resultados.prazo">Prazo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'complemento' ? (
                        <th className="hand" onClick={this.sort('complemento')}>
                          <Translate contentKey="generadorApp.resultados.complemento">Complemento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'dataCadastro' ? (
                        <th className="hand" onClick={this.sort('dataCadastro')}>
                          <Translate contentKey="generadorApp.resultados.dataCadastro">Data Cadastro</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'dataVencimentoPrazo' ? (
                        <th className="hand" onClick={this.sort('dataVencimentoPrazo')}>
                          <Translate contentKey="generadorApp.resultados.dataVencimentoPrazo">Data Vencimento Prazo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {resultadosList.map((resultados, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${resultados.id}`} color="link" size="sm">
                            {resultados.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'objetivo' ? <td>{resultados.objetivo}</td> : null}

                        {this.state.baseFilters !== 'valor' ? <td>{resultados.valor}</td> : null}

                        {this.state.baseFilters !== 'prazo' ? <td>{resultados.prazo}</td> : null}

                        {this.state.baseFilters !== 'complemento' ? <td>{resultados.complemento}</td> : null}

                        {this.state.baseFilters !== 'dataCadastro' ? (
                          <td>
                            <TextFormat type="date" value={resultados.dataCadastro} format={APP_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'dataVencimentoPrazo' ? (
                          <td>
                            <TextFormat type="date" value={resultados.dataVencimentoPrazo} format={APP_LOCAL_DATE_FORMAT} />
                          </td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${resultados.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${resultados.id}/edit?${this.getFiltersURL()}`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${resultados.id}/delete?${this.getFiltersURL()}`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.resultados.home.notFound">No Resultados found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={resultadosList && resultadosList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ resultados, ...storeState }: IRootState) => ({
  resultadosList: resultados.entities,
  totalItems: resultados.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Resultados);
