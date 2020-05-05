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
import { getEntities } from './especialidade-operadora.reducer';
import { IEspecialidadeOperadora } from 'app/shared/model/especialidade-operadora.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IOperadora } from 'app/shared/model/operadora.model';
import { getEntities as getOperadoras } from 'app/entities/operadora/operadora.reducer';
import { IEspecialidade } from 'app/shared/model/especialidade.model';
import { getEntities as getEspecialidades } from 'app/entities/especialidade/especialidade.reducer';

export interface IEspecialidadeOperadoraProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IEspecialidadeOperadoraBaseState {
  codTuss: any;
  codDespesa: any;
  codTabela: any;
  valorCusto: any;
  valorVenda: any;
  descontoCusto: any;
  descontoVenda: any;
  ativo: any;
  idOperadora: any;
  idEspecialidade: any;
}
export interface IEspecialidadeOperadoraState extends IEspecialidadeOperadoraBaseState, IPaginationBaseState {}

export class EspecialidadeOperadora extends React.Component<IEspecialidadeOperadoraProps, IEspecialidadeOperadoraState> {
  private myFormRef: any;

  constructor(props: IEspecialidadeOperadoraProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getEspecialidadeOperadoraState(this.props.location)
    };
  }

  getEspecialidadeOperadoraState = (location): IEspecialidadeOperadoraBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const codTuss = url.searchParams.get('codTuss') || '';
    const codDespesa = url.searchParams.get('codDespesa') || '';
    const codTabela = url.searchParams.get('codTabela') || '';
    const valorCusto = url.searchParams.get('valorCusto') || '';
    const valorVenda = url.searchParams.get('valorVenda') || '';
    const descontoCusto = url.searchParams.get('descontoCusto') || '';
    const descontoVenda = url.searchParams.get('descontoVenda') || '';
    const ativo = url.searchParams.get('ativo') || '';

    const idOperadora = url.searchParams.get('idOperadora') || '';
    const idEspecialidade = url.searchParams.get('idEspecialidade') || '';

    return {
      codTuss,
      codDespesa,
      codTabela,
      valorCusto,
      valorVenda,
      descontoCusto,
      descontoVenda,
      ativo,
      idOperadora,
      idEspecialidade
    };
  };

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
        idOperadora: '',
        idEspecialidade: ''
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
      'idOperadora=' +
      this.state.idOperadora +
      '&' +
      'idEspecialidade=' +
      this.state.idEspecialidade +
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
      idOperadora,
      idEspecialidade,
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
      idOperadora,
      idEspecialidade,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { operadoras, especialidades, especialidadeOperadoraList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Especialidade Operadoras</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Especialidade Operadoras</span>
              <Button id="togglerFilterEspecialidadeOperadora" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.especialidadeOperadora.home.createLabel">
                  Create a new Especialidade Operadora
                </Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterEspecialidadeOperadora">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="codTussLabel" for="especialidade-operadora-codTuss">
                            <Translate contentKey="generadorApp.especialidadeOperadora.codTuss">Cod Tuss</Translate>
                          </Label>

                          <AvInput type="text" name="codTuss" id="especialidade-operadora-codTuss" value={this.state.codTuss} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="codDespesaLabel" for="especialidade-operadora-codDespesa">
                            <Translate contentKey="generadorApp.especialidadeOperadora.codDespesa">Cod Despesa</Translate>
                          </Label>

                          <AvInput type="text" name="codDespesa" id="especialidade-operadora-codDespesa" value={this.state.codDespesa} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="codTabelaLabel" for="especialidade-operadora-codTabela">
                            <Translate contentKey="generadorApp.especialidadeOperadora.codTabela">Cod Tabela</Translate>
                          </Label>

                          <AvInput type="text" name="codTabela" id="especialidade-operadora-codTabela" value={this.state.codTabela} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="valorCustoLabel" for="especialidade-operadora-valorCusto">
                            <Translate contentKey="generadorApp.especialidadeOperadora.valorCusto">Valor Custo</Translate>
                          </Label>
                          <AvInput type="string" name="valorCusto" id="especialidade-operadora-valorCusto" value={this.state.valorCusto} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="valorVendaLabel" for="especialidade-operadora-valorVenda">
                            <Translate contentKey="generadorApp.especialidadeOperadora.valorVenda">Valor Venda</Translate>
                          </Label>
                          <AvInput type="string" name="valorVenda" id="especialidade-operadora-valorVenda" value={this.state.valorVenda} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
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
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="especialidade-operadora-ativo">
                            <Translate contentKey="generadorApp.especialidadeOperadora.ativo">Ativo</Translate>
                          </Label>
                          <AvInput type="string" name="ativo" id="especialidade-operadora-ativo" value={this.state.ativo} />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="especialidade-operadora-idOperadora">
                              <Translate contentKey="generadorApp.especialidadeOperadora.idOperadora">Id Operadora</Translate>
                            </Label>
                            <AvInput id="especialidade-operadora-idOperadora" type="select" className="form-control" name="idOperadoraId">
                              <option value="" key="0" />
                              {operadoras
                                ? operadoras.map(otherEntity => (
                                    <option value={otherEntity.id} key={otherEntity.id}>
                                      {otherEntity.id}
                                    </option>
                                  ))
                                : null}
                            </AvInput>
                          </div>
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="especialidade-operadora-idEspecialidade">
                              <Translate contentKey="generadorApp.especialidadeOperadora.idEspecialidade">Id Especialidade</Translate>
                            </Label>
                            <AvInput
                              id="especialidade-operadora-idEspecialidade"
                              type="select"
                              className="form-control"
                              name="idEspecialidadeId"
                            >
                              <option value="" key="0" />
                              {especialidades
                                ? especialidades.map(otherEntity => (
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

              {especialidadeOperadoraList && especialidadeOperadoraList.length > 0 ? (
                <Table responsive aria-describedby="especialidade-operadora-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('codTuss')}>
                        <Translate contentKey="generadorApp.especialidadeOperadora.codTuss">Cod Tuss</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('codDespesa')}>
                        <Translate contentKey="generadorApp.especialidadeOperadora.codDespesa">Cod Despesa</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('codTabela')}>
                        <Translate contentKey="generadorApp.especialidadeOperadora.codTabela">Cod Tabela</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('valorCusto')}>
                        <Translate contentKey="generadorApp.especialidadeOperadora.valorCusto">Valor Custo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('valorVenda')}>
                        <Translate contentKey="generadorApp.especialidadeOperadora.valorVenda">Valor Venda</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('descontoCusto')}>
                        <Translate contentKey="generadorApp.especialidadeOperadora.descontoCusto">Desconto Custo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('descontoVenda')}>
                        <Translate contentKey="generadorApp.especialidadeOperadora.descontoVenda">Desconto Venda</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.especialidadeOperadora.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.especialidadeOperadora.idOperadora">Id Operadora</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.especialidadeOperadora.idEspecialidade">Id Especialidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

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

                        <td>{especialidadeOperadora.codTuss}</td>

                        <td>{especialidadeOperadora.codDespesa}</td>

                        <td>{especialidadeOperadora.codTabela}</td>

                        <td>{especialidadeOperadora.valorCusto}</td>

                        <td>{especialidadeOperadora.valorVenda}</td>

                        <td>{especialidadeOperadora.descontoCusto}</td>

                        <td>{especialidadeOperadora.descontoVenda}</td>

                        <td>{especialidadeOperadora.ativo}</td>
                        <td>
                          {especialidadeOperadora.idOperadora ? (
                            <Link to={`operadora/${especialidadeOperadora.idOperadora.id}`}>{especialidadeOperadora.idOperadora.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>
                        <td>
                          {especialidadeOperadora.idEspecialidade ? (
                            <Link to={`especialidade/${especialidadeOperadora.idEspecialidade.id}`}>
                              {especialidadeOperadora.idEspecialidade.id}
                            </Link>
                          ) : (
                            ''
                          )}
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${especialidadeOperadora.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${especialidadeOperadora.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${especialidadeOperadora.id}/delete`} color="danger" size="sm">
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