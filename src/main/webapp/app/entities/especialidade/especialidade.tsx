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
  byteSize,
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
import { getEspecialidadeState, IEspecialidadeBaseState, getEntities } from './especialidade.reducer';
import { IEspecialidade } from 'app/shared/model/especialidade.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { getEntities as getUnidadeEasies } from 'app/entities/unidade-easy/unidade-easy.reducer';
import { ICategoria } from 'app/shared/model/categoria.model';
import { getEntities as getCategorias } from 'app/entities/categoria/categoria.reducer';
import { ITipoEspecialidade } from 'app/shared/model/tipo-especialidade.model';
import { getEntities as getTipoEspecialidades } from 'app/entities/tipo-especialidade/tipo-especialidade.reducer';
import { ITipoUnidade } from 'app/shared/model/tipo-unidade.model';
import { getEntities as getTipoUnidades } from 'app/entities/tipo-unidade/tipo-unidade.reducer';

export interface IEspecialidadeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IEspecialidadeState extends IEspecialidadeBaseState, IPaginationBaseState {}

export class Especialidade extends React.Component<IEspecialidadeProps, IEspecialidadeState> {
  private myFormRef: any;

  constructor(props: IEspecialidadeProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getEspecialidadeState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getUnidadeEasies();
    this.props.getCategorias();
    this.props.getTipoEspecialidades();
    this.props.getTipoUnidades();
  }

  cancelCourse = () => {
    this.setState(
      {
        icon: '',
        especialidade: '',
        descricao: '',
        duracao: '',
        importante: '',
        ativo: '',
        atendimento: '',
        especialidadeOperadora: '',
        especialidadeUnidade: '',
        especialidadeValor: '',
        pacientePedido: '',
        padItem: '',
        unidade: '',
        idCategoria: '',
        idTipoEspecialidade: '',
        idTipoUnidade: ''
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
      'icon=' +
      this.state.icon +
      '&' +
      'especialidade=' +
      this.state.especialidade +
      '&' +
      'descricao=' +
      this.state.descricao +
      '&' +
      'duracao=' +
      this.state.duracao +
      '&' +
      'importante=' +
      this.state.importante +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'atendimento=' +
      this.state.atendimento +
      '&' +
      'especialidadeOperadora=' +
      this.state.especialidadeOperadora +
      '&' +
      'especialidadeUnidade=' +
      this.state.especialidadeUnidade +
      '&' +
      'especialidadeValor=' +
      this.state.especialidadeValor +
      '&' +
      'pacientePedido=' +
      this.state.pacientePedido +
      '&' +
      'padItem=' +
      this.state.padItem +
      '&' +
      'unidade=' +
      this.state.unidade +
      '&' +
      'idCategoria=' +
      this.state.idCategoria +
      '&' +
      'idTipoEspecialidade=' +
      this.state.idTipoEspecialidade +
      '&' +
      'idTipoUnidade=' +
      this.state.idTipoUnidade +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      icon,
      especialidade,
      descricao,
      duracao,
      importante,
      ativo,
      atendimento,
      especialidadeOperadora,
      especialidadeUnidade,
      especialidadeValor,
      pacientePedido,
      padItem,
      unidade,
      idCategoria,
      idTipoEspecialidade,
      idTipoUnidade,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      icon,
      especialidade,
      descricao,
      duracao,
      importante,
      ativo,
      atendimento,
      especialidadeOperadora,
      especialidadeUnidade,
      especialidadeValor,
      pacientePedido,
      padItem,
      unidade,
      idCategoria,
      idTipoEspecialidade,
      idTipoUnidade,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { unidadeEasies, categorias, tipoEspecialidades, tipoUnidades, especialidadeList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Especialidades</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Especialidades</span>
              <Button id="togglerFilterEspecialidade" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.especialidade.home.createLabel">Create a new Especialidade</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterEspecialidade">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="iconLabel" for="especialidade-icon">
                            <Translate contentKey="generadorApp.especialidade.icon">Icon</Translate>
                          </Label>

                          <AvInput type="text" name="icon" id="especialidade-icon" value={this.state.icon} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="especialidadeLabel" for="especialidade-especialidade">
                            <Translate contentKey="generadorApp.especialidade.especialidade">Especialidade</Translate>
                          </Label>

                          <AvInput type="text" name="especialidade" id="especialidade-especialidade" value={this.state.especialidade} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="descricaoLabel" for="especialidade-descricao">
                            <Translate contentKey="generadorApp.especialidade.descricao">Descricao</Translate>
                          </Label>
                          <AvInput id="especialidade-descricao" type="textarea" name="descricao" />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="duracaoLabel" for="especialidade-duracao">
                            <Translate contentKey="generadorApp.especialidade.duracao">Duracao</Translate>
                          </Label>
                          <AvInput type="string" name="duracao" id="especialidade-duracao" value={this.state.duracao} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="importanteLabel" for="especialidade-importante">
                            <Translate contentKey="generadorApp.especialidade.importante">Importante</Translate>
                          </Label>

                          <AvInput type="text" name="importante" id="especialidade-importante" value={this.state.importante} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="especialidade-ativo">
                            <Translate contentKey="generadorApp.especialidade.ativo">Ativo</Translate>
                          </Label>
                          <AvInput type="string" name="ativo" id="especialidade-ativo" value={this.state.ativo} />
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

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="especialidade-unidade">
                              <Translate contentKey="generadorApp.especialidade.unidade">Unidade</Translate>
                            </Label>
                            <AvInput id="especialidade-unidade" type="select" className="form-control" name="unidadeId">
                              <option value="" key="0" />
                              {unidadeEasies
                                ? unidadeEasies.map(otherEntity => (
                                    <option value={otherEntity.id} key={otherEntity.id}>
                                      {otherEntity.razaoSocial}
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
                            <Label for="especialidade-idCategoria">
                              <Translate contentKey="generadorApp.especialidade.idCategoria">Id Categoria</Translate>
                            </Label>
                            <AvInput id="especialidade-idCategoria" type="select" className="form-control" name="idCategoriaId">
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

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="especialidade-idTipoEspecialidade">
                              <Translate contentKey="generadorApp.especialidade.idTipoEspecialidade">Id Tipo Especialidade</Translate>
                            </Label>
                            <AvInput
                              id="especialidade-idTipoEspecialidade"
                              type="select"
                              className="form-control"
                              name="idTipoEspecialidadeId"
                            >
                              <option value="" key="0" />
                              {tipoEspecialidades
                                ? tipoEspecialidades.map(otherEntity => (
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
                            <Label for="especialidade-idTipoUnidade">
                              <Translate contentKey="generadorApp.especialidade.idTipoUnidade">Id Tipo Unidade</Translate>
                            </Label>
                            <AvInput id="especialidade-idTipoUnidade" type="select" className="form-control" name="idTipoUnidadeId">
                              <option value="" key="0" />
                              {tipoUnidades
                                ? tipoUnidades.map(otherEntity => (
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

              {especialidadeList && especialidadeList.length > 0 ? (
                <Table responsive aria-describedby="especialidade-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('icon')}>
                        <Translate contentKey="generadorApp.especialidade.icon">Icon</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('especialidade')}>
                        <Translate contentKey="generadorApp.especialidade.especialidade">Especialidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('descricao')}>
                        <Translate contentKey="generadorApp.especialidade.descricao">Descricao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('duracao')}>
                        <Translate contentKey="generadorApp.especialidade.duracao">Duracao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('importante')}>
                        <Translate contentKey="generadorApp.especialidade.importante">Importante</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.especialidade.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.especialidade.unidade">Unidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.especialidade.idCategoria">Id Categoria</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.especialidade.idTipoEspecialidade">Id Tipo Especialidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.especialidade.idTipoUnidade">Id Tipo Unidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {especialidadeList.map((especialidade, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${especialidade.id}`} color="link" size="sm">
                            {especialidade.id}
                          </Button>
                        </td>

                        <td>{especialidade.icon}</td>

                        <td>{especialidade.especialidade}</td>

                        <td>{especialidade.descricao}</td>

                        <td>{especialidade.duracao}</td>

                        <td>{especialidade.importante}</td>

                        <td>{especialidade.ativo}</td>
                        <td>
                          {especialidade.unidade ? (
                            <Link to={`unidade-easy/${especialidade.unidade.id}`}>{especialidade.unidade.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>
                        <td>
                          {especialidade.idCategoria ? (
                            <Link to={`categoria/${especialidade.idCategoria.id}`}>{especialidade.idCategoria.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>
                        <td>
                          {especialidade.idTipoEspecialidade ? (
                            <Link to={`tipo-especialidade/${especialidade.idTipoEspecialidade.id}`}>
                              {especialidade.idTipoEspecialidade.id}
                            </Link>
                          ) : (
                            ''
                          )}
                        </td>
                        <td>
                          {especialidade.idTipoUnidade ? (
                            <Link to={`tipo-unidade/${especialidade.idTipoUnidade.id}`}>{especialidade.idTipoUnidade.id}</Link>
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
                  <Translate contentKey="generadorApp.especialidade.home.notFound">No Especialidades found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={especialidadeList && especialidadeList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ especialidade, ...storeState }: IRootState) => ({
  unidadeEasies: storeState.unidadeEasy.entities,
  categorias: storeState.categoria.entities,
  tipoEspecialidades: storeState.tipoEspecialidade.entities,
  tipoUnidades: storeState.tipoUnidade.entities,
  especialidadeList: especialidade.entities,
  totalItems: especialidade.totalItems
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getCategorias,
  getTipoEspecialidades,
  getTipoUnidades,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Especialidade);