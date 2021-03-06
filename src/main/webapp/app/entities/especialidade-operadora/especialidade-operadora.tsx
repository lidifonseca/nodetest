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
import { getEspecialidadeOperadoraState, IEspecialidadeOperadoraBaseState, getEntities } from './especialidade-operadora.reducer';
import { IEspecialidadeOperadora } from 'app/shared/model/especialidade-operadora.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IOperadora } from 'app/shared/model/operadora.model';
import { getEntities as getOperadoras } from 'app/entities/operadora/operadora.reducer';
import { IEspecialidade } from 'app/shared/model/especialidade.model';
import { getEntities as getEspecialidades } from 'app/entities/especialidade/especialidade.reducer';

export interface IEspecialidadeOperadoraProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IEspecialidadeOperadoraState extends IEspecialidadeOperadoraBaseState, IPaginationBaseState {}

export class EspecialidadeOperadora extends React.Component<IEspecialidadeOperadoraProps, IEspecialidadeOperadoraState> {
  private myFormRef: any;

  constructor(props: IEspecialidadeOperadoraProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getEspecialidadeOperadoraState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getOperadoras();
    this.props.getEspecialidades();
  }

  cancelCourse = () => {
    this.setState(
      {
        codTuss: '',
        codDespesa: '',
        codTabela: '',
        valorCusto: '',
        valorVenda: '',
        descontoCusto: '',
        descontoVenda: '',
        ativo: '',
        operadora: '',
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
      'codTuss=' +
      this.state.codTuss +
      '&' +
      'codDespesa=' +
      this.state.codDespesa +
      '&' +
      'codTabela=' +
      this.state.codTabela +
      '&' +
      'valorCusto=' +
      this.state.valorCusto +
      '&' +
      'valorVenda=' +
      this.state.valorVenda +
      '&' +
      'descontoCusto=' +
      this.state.descontoCusto +
      '&' +
      'descontoVenda=' +
      this.state.descontoVenda +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'operadora=' +
      this.state.operadora +
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
      codTuss,
      codDespesa,
      codTabela,
      valorCusto,
      valorVenda,
      descontoCusto,
      descontoVenda,
      ativo,
      operadora,
      especialidade,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      codTuss,
      codDespesa,
      codTabela,
      valorCusto,
      valorVenda,
      descontoCusto,
      descontoVenda,
      ativo,
      operadora,
      especialidade,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { operadoras, especialidades, especialidadeOperadoraList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Especialidade Operadoras</span>
          <Button id="togglerFilterEspecialidadeOperadora" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.especialidadeOperadora.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.especialidadeOperadora.home.createLabel">Create a new Especialidade Operadora</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Especialidade Operadoras</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterEspecialidadeOperadora">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'codTuss' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="codTussLabel" for="especialidade-operadora-codTuss">
                              <Translate contentKey="generadorApp.especialidadeOperadora.codTuss">Cod Tuss</Translate>
                            </Label>

                            <AvInput type="text" name="codTuss" id="especialidade-operadora-codTuss" value={this.state.codTuss} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'codDespesa' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="codDespesaLabel" for="especialidade-operadora-codDespesa">
                              <Translate contentKey="generadorApp.especialidadeOperadora.codDespesa">Cod Despesa</Translate>
                            </Label>

                            <AvInput type="text" name="codDespesa" id="especialidade-operadora-codDespesa" value={this.state.codDespesa} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'codTabela' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="codTabelaLabel" for="especialidade-operadora-codTabela">
                              <Translate contentKey="generadorApp.especialidadeOperadora.codTabela">Cod Tabela</Translate>
                            </Label>

                            <AvInput type="text" name="codTabela" id="especialidade-operadora-codTabela" value={this.state.codTabela} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'valorCusto' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="valorCustoLabel" for="especialidade-operadora-valorCusto">
                              <Translate contentKey="generadorApp.especialidadeOperadora.valorCusto">Valor Custo</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="valorCusto"
                              id="especialidade-operadora-valorCusto"
                              value={this.state.valorCusto}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'valorVenda' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="valorVendaLabel" for="especialidade-operadora-valorVenda">
                              <Translate contentKey="generadorApp.especialidadeOperadora.valorVenda">Valor Venda</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="valorVenda"
                              id="especialidade-operadora-valorVenda"
                              value={this.state.valorVenda}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'descontoCusto' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="descontoCustoLabel" for="especialidade-operadora-descontoCusto">
                              <Translate contentKey="generadorApp.especialidadeOperadora.descontoCusto">Desconto Custo</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="descontoCusto"
                              id="especialidade-operadora-descontoCusto"
                              value={this.state.descontoCusto}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'descontoVenda' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="descontoVendaLabel" for="especialidade-operadora-descontoVenda">
                              <Translate contentKey="generadorApp.especialidadeOperadora.descontoVenda">Desconto Venda</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="descontoVenda"
                              id="especialidade-operadora-descontoVenda"
                              value={this.state.descontoVenda}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ativo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ativoLabel" check>
                              <AvInput id="especialidade-operadora-ativo" type="checkbox" className="form-control" name="ativo" />
                              <Translate contentKey="generadorApp.especialidadeOperadora.ativo">Ativo</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'operadora' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="especialidade-operadora-operadora">
                                <Translate contentKey="generadorApp.especialidadeOperadora.operadora">Operadora</Translate>
                              </Label>
                              <Select
                                id="especialidade-operadora-operadora"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  operadoras
                                    ? operadoras.map(p =>
                                        this.state.operadora.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null
                                      )
                                    : null
                                }
                                options={operadoras ? operadoras.map(option => ({ value: option.id, label: option.id })) : null}
                                onChange={options => this.setState({ operadora: options.map(option => option['value']).join(',') })}
                                name={'operadora'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'especialidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="especialidade-operadora-especialidade">
                                <Translate contentKey="generadorApp.especialidadeOperadora.especialidade">Especialidade</Translate>
                              </Label>
                              <Select
                                id="especialidade-operadora-especialidade"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  especialidades
                                    ? especialidades.map(p =>
                                        this.state.especialidade.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null
                                      )
                                    : null
                                }
                                options={especialidades ? especialidades.map(option => ({ value: option.id, label: option.id })) : null}
                                onChange={options => this.setState({ especialidade: options.map(option => option['value']).join(',') })}
                                name={'especialidade'}
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
                        <Translate contentKey="generadorApp.especialidadeOperadora.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.especialidadeOperadora.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {especialidadeOperadoraList && especialidadeOperadoraList.length > 0 ? (
                <Table responsive aria-describedby="especialidade-operadora-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'codTuss' ? (
                        <th className="hand" onClick={this.sort('codTuss')}>
                          <Translate contentKey="generadorApp.especialidadeOperadora.codTuss">Cod Tuss</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'codDespesa' ? (
                        <th className="hand" onClick={this.sort('codDespesa')}>
                          <Translate contentKey="generadorApp.especialidadeOperadora.codDespesa">Cod Despesa</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'codTabela' ? (
                        <th className="hand" onClick={this.sort('codTabela')}>
                          <Translate contentKey="generadorApp.especialidadeOperadora.codTabela">Cod Tabela</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'valorCusto' ? (
                        <th className="hand" onClick={this.sort('valorCusto')}>
                          <Translate contentKey="generadorApp.especialidadeOperadora.valorCusto">Valor Custo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'valorVenda' ? (
                        <th className="hand" onClick={this.sort('valorVenda')}>
                          <Translate contentKey="generadorApp.especialidadeOperadora.valorVenda">Valor Venda</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'descontoCusto' ? (
                        <th className="hand" onClick={this.sort('descontoCusto')}>
                          <Translate contentKey="generadorApp.especialidadeOperadora.descontoCusto">Desconto Custo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'descontoVenda' ? (
                        <th className="hand" onClick={this.sort('descontoVenda')}>
                          <Translate contentKey="generadorApp.especialidadeOperadora.descontoVenda">Desconto Venda</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ativo' ? (
                        <th className="hand" onClick={this.sort('ativo')}>
                          <Translate contentKey="generadorApp.especialidadeOperadora.ativo">Ativo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'operadora' ? (
                        <th>
                          <Translate contentKey="generadorApp.especialidadeOperadora.operadora">Operadora</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'especialidade' ? (
                        <th>
                          <Translate contentKey="generadorApp.especialidadeOperadora.especialidade">Especialidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {especialidadeOperadoraList.map((especialidadeOperadora, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${especialidadeOperadora.id}`} color="link" size="sm">
                            {especialidadeOperadora.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'codTuss' ? <td>{especialidadeOperadora.codTuss}</td> : null}

                        {this.state.baseFilters !== 'codDespesa' ? <td>{especialidadeOperadora.codDespesa}</td> : null}

                        {this.state.baseFilters !== 'codTabela' ? <td>{especialidadeOperadora.codTabela}</td> : null}

                        {this.state.baseFilters !== 'valorCusto' ? <td>{especialidadeOperadora.valorCusto}</td> : null}

                        {this.state.baseFilters !== 'valorVenda' ? <td>{especialidadeOperadora.valorVenda}</td> : null}

                        {this.state.baseFilters !== 'descontoCusto' ? <td>{especialidadeOperadora.descontoCusto}</td> : null}

                        {this.state.baseFilters !== 'descontoVenda' ? <td>{especialidadeOperadora.descontoVenda}</td> : null}

                        {this.state.baseFilters !== 'ativo' ? <td>{especialidadeOperadora.ativo ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'operadora' ? (
                          <td>
                            {especialidadeOperadora.operadora ? (
                              <Link to={`operadora/${especialidadeOperadora.operadora.id}`}>{especialidadeOperadora.operadora.id}</Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'especialidade' ? (
                          <td>
                            {especialidadeOperadora.especialidade ? (
                              <Link to={`especialidade/${especialidadeOperadora.especialidade.id}`}>
                                {especialidadeOperadora.especialidade.id}
                              </Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button
                              tag={Link}
                              to={`${match.url}/${especialidadeOperadora.id}?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${especialidadeOperadora.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${especialidadeOperadora.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.especialidadeOperadora.home.notFound">No Especialidade Operadoras found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={especialidadeOperadoraList && especialidadeOperadoraList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ especialidadeOperadora, ...storeState }: IRootState) => ({
  operadoras: storeState.operadora.entities,
  especialidades: storeState.especialidade.entities,
  especialidadeOperadoraList: especialidadeOperadora.entities,
  totalItems: especialidadeOperadora.totalItems
});

const mapDispatchToProps = {
  getOperadoras,
  getEspecialidades,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EspecialidadeOperadora);
