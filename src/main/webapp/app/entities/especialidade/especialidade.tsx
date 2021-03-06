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
import { IProfissional } from 'app/shared/model/profissional.model';
import { getEntities as getProfissionals } from 'app/entities/profissional/profissional.reducer';

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
    this.props.getProfissionals();
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
        categoria: '',
        tipoEspecialidade: '',
        tipoUnidade: '',
        profissional: ''
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
      'categoria=' +
      this.state.categoria +
      '&' +
      'tipoEspecialidade=' +
      this.state.tipoEspecialidade +
      '&' +
      'tipoUnidade=' +
      this.state.tipoUnidade +
      '&' +
      'profissional=' +
      this.state.profissional +
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
      categoria,
      tipoEspecialidade,
      tipoUnidade,
      profissional,
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
      categoria,
      tipoEspecialidade,
      tipoUnidade,
      profissional,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { unidadeEasies, categorias, tipoEspecialidades, tipoUnidades, profissionals, especialidadeList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Especialidades</span>
          <Button id="togglerFilterEspecialidade" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.especialidade.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.especialidade.home.createLabel">Create a new Especialidade</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Especialidades</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterEspecialidade">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'icon' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="iconLabel" for="especialidade-icon">
                              <Translate contentKey="generadorApp.especialidade.icon">Icon</Translate>
                            </Label>

                            <AvInput type="text" name="icon" id="especialidade-icon" value={this.state.icon} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'especialidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="especialidadeLabel" for="especialidade-especialidade">
                              <Translate contentKey="generadorApp.especialidade.especialidade">Especialidade</Translate>
                            </Label>

                            <AvInput type="text" name="especialidade" id="especialidade-especialidade" value={this.state.especialidade} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'descricao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="descricaoLabel" for="especialidade-descricao">
                              <Translate contentKey="generadorApp.especialidade.descricao">Descricao</Translate>
                            </Label>
                            <AvInput id="especialidade-descricao" type="textarea" name="descricao" />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'duracao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="duracaoLabel" for="especialidade-duracao">
                              <Translate contentKey="generadorApp.especialidade.duracao">Duracao</Translate>
                            </Label>
                            <AvInput type="string" name="duracao" id="especialidade-duracao" value={this.state.duracao} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'importante' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="importanteLabel" for="especialidade-importante">
                              <Translate contentKey="generadorApp.especialidade.importante">Importante</Translate>
                            </Label>

                            <AvInput type="text" name="importante" id="especialidade-importante" value={this.state.importante} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ativo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ativoLabel" check>
                              <AvInput id="especialidade-ativo" type="checkbox" className="form-control" name="ativo" />
                              <Translate contentKey="generadorApp.especialidade.ativo">Ativo</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'atendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'especialidadeOperadora' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'especialidadeUnidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'especialidadeValor' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'pacientePedido' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'padItem' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'unidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="especialidade-unidade">
                                <Translate contentKey="generadorApp.especialidade.unidade">Unidade</Translate>
                              </Label>
                              <Select
                                id="especialidade-unidade"
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
                              <Label for="especialidade-categoria">
                                <Translate contentKey="generadorApp.especialidade.categoria">Categoria</Translate>
                              </Label>
                              <Select
                                id="especialidade-categoria"
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

                      {this.state.baseFilters !== 'tipoEspecialidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="especialidade-tipoEspecialidade">
                                <Translate contentKey="generadorApp.especialidade.tipoEspecialidade">Tipo Especialidade</Translate>
                              </Label>
                              <Select
                                id="especialidade-tipoEspecialidade"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  tipoEspecialidades
                                    ? tipoEspecialidades.map(p =>
                                        this.state.tipoEspecialidade.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null
                                      )
                                    : null
                                }
                                options={
                                  tipoEspecialidades ? tipoEspecialidades.map(option => ({ value: option.id, label: option.id })) : null
                                }
                                onChange={options => this.setState({ tipoEspecialidade: options.map(option => option['value']).join(',') })}
                                name={'tipoEspecialidade'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'tipoUnidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="especialidade-tipoUnidade">
                                <Translate contentKey="generadorApp.especialidade.tipoUnidade">Tipo Unidade</Translate>
                              </Label>
                              <Select
                                id="especialidade-tipoUnidade"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  tipoUnidades
                                    ? tipoUnidades.map(p =>
                                        this.state.tipoUnidade.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null
                                      )
                                    : null
                                }
                                options={tipoUnidades ? tipoUnidades.map(option => ({ value: option.id, label: option.id })) : null}
                                onChange={options => this.setState({ tipoUnidade: options.map(option => option['value']).join(',') })}
                                name={'tipoUnidade'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'profissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.especialidade.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.especialidade.home.btn_filter_clean">Clean</Translate>
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
                      {this.state.baseFilters !== 'icon' ? (
                        <th className="hand" onClick={this.sort('icon')}>
                          <Translate contentKey="generadorApp.especialidade.icon">Icon</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'especialidade' ? (
                        <th className="hand" onClick={this.sort('especialidade')}>
                          <Translate contentKey="generadorApp.especialidade.especialidade">Especialidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'descricao' ? (
                        <th className="hand" onClick={this.sort('descricao')}>
                          <Translate contentKey="generadorApp.especialidade.descricao">Descricao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'duracao' ? (
                        <th className="hand" onClick={this.sort('duracao')}>
                          <Translate contentKey="generadorApp.especialidade.duracao">Duracao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'importante' ? (
                        <th className="hand" onClick={this.sort('importante')}>
                          <Translate contentKey="generadorApp.especialidade.importante">Importante</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ativo' ? (
                        <th className="hand" onClick={this.sort('ativo')}>
                          <Translate contentKey="generadorApp.especialidade.ativo">Ativo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'unidade' ? (
                        <th>
                          <Translate contentKey="generadorApp.especialidade.unidade">Unidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'categoria' ? (
                        <th>
                          <Translate contentKey="generadorApp.especialidade.categoria">Categoria</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'tipoEspecialidade' ? (
                        <th>
                          <Translate contentKey="generadorApp.especialidade.tipoEspecialidade">Tipo Especialidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'tipoUnidade' ? (
                        <th>
                          <Translate contentKey="generadorApp.especialidade.tipoUnidade">Tipo Unidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

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

                        {this.state.baseFilters !== 'icon' ? <td>{especialidade.icon}</td> : null}

                        {this.state.baseFilters !== 'especialidade' ? <td>{especialidade.especialidade}</td> : null}

                        {this.state.baseFilters !== 'descricao' ? (
                          <td>{especialidade.descricao ? Buffer.from(especialidade.descricao).toString() : null}</td>
                        ) : null}

                        {this.state.baseFilters !== 'duracao' ? <td>{especialidade.duracao}</td> : null}

                        {this.state.baseFilters !== 'importante' ? <td>{especialidade.importante}</td> : null}

                        {this.state.baseFilters !== 'ativo' ? <td>{especialidade.ativo ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'unidade' ? (
                          <td>
                            {especialidade.unidade ? (
                              <Link to={`unidade-easy/${especialidade.unidade.id}`}>{especialidade.unidade.razaoSocial}</Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'categoria' ? (
                          <td>
                            {especialidade.categoria ? (
                              <Link to={`categoria/${especialidade.categoria.id}`}>{especialidade.categoria.id}</Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'tipoEspecialidade' ? (
                          <td>
                            {especialidade.tipoEspecialidade ? (
                              <Link to={`tipo-especialidade/${especialidade.tipoEspecialidade.id}`}>
                                {especialidade.tipoEspecialidade.id}
                              </Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'tipoUnidade' ? (
                          <td>
                            {especialidade.tipoUnidade ? (
                              <Link to={`tipo-unidade/${especialidade.tipoUnidade.id}`}>{especialidade.tipoUnidade.id}</Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${especialidade.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${especialidade.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${especialidade.id}/delete?${this.getFiltersURL()}`}
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
  profissionals: storeState.profissional.entities,
  especialidadeList: especialidade.entities,
  totalItems: especialidade.totalItems
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getCategorias,
  getTipoEspecialidades,
  getTipoUnidades,
  getProfissionals,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Especialidade);
