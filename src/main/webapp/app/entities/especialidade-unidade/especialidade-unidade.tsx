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
import { getEspecialidadeUnidadeState, IEspecialidadeUnidadeBaseState, getEntities } from './especialidade-unidade.reducer';
import { IEspecialidadeUnidade } from 'app/shared/model/especialidade-unidade.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { getEntities as getUnidadeEasies } from 'app/entities/unidade-easy/unidade-easy.reducer';
import { IEspecialidade } from 'app/shared/model/especialidade.model';
import { getEntities as getEspecialidades } from 'app/entities/especialidade/especialidade.reducer';

export interface IEspecialidadeUnidadeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IEspecialidadeUnidadeState extends IEspecialidadeUnidadeBaseState, IPaginationBaseState {}

export class EspecialidadeUnidade extends React.Component<IEspecialidadeUnidadeProps, IEspecialidadeUnidadeState> {
  private myFormRef: any;

  constructor(props: IEspecialidadeUnidadeProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getEspecialidadeUnidadeState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getUnidadeEasies();
    this.props.getEspecialidades();
  }

  cancelCourse = () => {
    this.setState(
      {
        valorBaixaUrg: '',
        valorAltaUrg: '',
        valorPagar: '',
        publicar: '',
        comentarioPreco: '',
        unidade: '',
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
      'valorBaixaUrg=' +
      this.state.valorBaixaUrg +
      '&' +
      'valorAltaUrg=' +
      this.state.valorAltaUrg +
      '&' +
      'valorPagar=' +
      this.state.valorPagar +
      '&' +
      'publicar=' +
      this.state.publicar +
      '&' +
      'comentarioPreco=' +
      this.state.comentarioPreco +
      '&' +
      'unidade=' +
      this.state.unidade +
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
      valorBaixaUrg,
      valorAltaUrg,
      valorPagar,
      publicar,
      comentarioPreco,
      unidade,
      especialidade,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      valorBaixaUrg,
      valorAltaUrg,
      valorPagar,
      publicar,
      comentarioPreco,
      unidade,
      especialidade,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { unidadeEasies, especialidades, especialidadeUnidadeList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Especialidade Unidades</span>
          <Button id="togglerFilterEspecialidadeUnidade" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.especialidadeUnidade.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.especialidadeUnidade.home.createLabel">Create a new Especialidade Unidade</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Especialidade Unidades</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterEspecialidadeUnidade">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'valorBaixaUrg' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="valorBaixaUrgLabel" for="especialidade-unidade-valorBaixaUrg">
                              <Translate contentKey="generadorApp.especialidadeUnidade.valorBaixaUrg">Valor Baixa Urg</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="valorBaixaUrg"
                              id="especialidade-unidade-valorBaixaUrg"
                              value={this.state.valorBaixaUrg}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'valorAltaUrg' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="valorAltaUrgLabel" for="especialidade-unidade-valorAltaUrg">
                              <Translate contentKey="generadorApp.especialidadeUnidade.valorAltaUrg">Valor Alta Urg</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="valorAltaUrg"
                              id="especialidade-unidade-valorAltaUrg"
                              value={this.state.valorAltaUrg}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'valorPagar' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="valorPagarLabel" for="especialidade-unidade-valorPagar">
                              <Translate contentKey="generadorApp.especialidadeUnidade.valorPagar">Valor Pagar</Translate>
                            </Label>
                            <AvInput type="string" name="valorPagar" id="especialidade-unidade-valorPagar" value={this.state.valorPagar} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'publicar' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="publicarLabel" for="especialidade-unidade-publicar">
                              <Translate contentKey="generadorApp.especialidadeUnidade.publicar">Publicar</Translate>
                            </Label>
                            <AvInput type="string" name="publicar" id="especialidade-unidade-publicar" value={this.state.publicar} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'comentarioPreco' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="comentarioPrecoLabel" for="especialidade-unidade-comentarioPreco">
                              <Translate contentKey="generadorApp.especialidadeUnidade.comentarioPreco">Comentario Preco</Translate>
                            </Label>

                            <AvInput
                              type="text"
                              name="comentarioPreco"
                              id="especialidade-unidade-comentarioPreco"
                              value={this.state.comentarioPreco}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'unidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="especialidade-unidade-unidade">
                                <Translate contentKey="generadorApp.especialidadeUnidade.unidade">Unidade</Translate>
                              </Label>
                              <Select
                                id="especialidade-unidade-unidade"
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

                      {this.state.baseFilters !== 'especialidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="especialidade-unidade-especialidade">
                                <Translate contentKey="generadorApp.especialidadeUnidade.especialidade">Especialidade</Translate>
                              </Label>
                              <Select
                                id="especialidade-unidade-especialidade"
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
                        <Translate contentKey="generadorApp.especialidadeUnidade.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.especialidadeUnidade.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {especialidadeUnidadeList && especialidadeUnidadeList.length > 0 ? (
                <Table responsive aria-describedby="especialidade-unidade-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'valorBaixaUrg' ? (
                        <th className="hand" onClick={this.sort('valorBaixaUrg')}>
                          <Translate contentKey="generadorApp.especialidadeUnidade.valorBaixaUrg">Valor Baixa Urg</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'valorAltaUrg' ? (
                        <th className="hand" onClick={this.sort('valorAltaUrg')}>
                          <Translate contentKey="generadorApp.especialidadeUnidade.valorAltaUrg">Valor Alta Urg</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'valorPagar' ? (
                        <th className="hand" onClick={this.sort('valorPagar')}>
                          <Translate contentKey="generadorApp.especialidadeUnidade.valorPagar">Valor Pagar</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'publicar' ? (
                        <th className="hand" onClick={this.sort('publicar')}>
                          <Translate contentKey="generadorApp.especialidadeUnidade.publicar">Publicar</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'comentarioPreco' ? (
                        <th className="hand" onClick={this.sort('comentarioPreco')}>
                          <Translate contentKey="generadorApp.especialidadeUnidade.comentarioPreco">Comentario Preco</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'unidade' ? (
                        <th>
                          <Translate contentKey="generadorApp.especialidadeUnidade.unidade">Unidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'especialidade' ? (
                        <th>
                          <Translate contentKey="generadorApp.especialidadeUnidade.especialidade">Especialidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {especialidadeUnidadeList.map((especialidadeUnidade, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${especialidadeUnidade.id}`} color="link" size="sm">
                            {especialidadeUnidade.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'valorBaixaUrg' ? <td>{especialidadeUnidade.valorBaixaUrg}</td> : null}

                        {this.state.baseFilters !== 'valorAltaUrg' ? <td>{especialidadeUnidade.valorAltaUrg}</td> : null}

                        {this.state.baseFilters !== 'valorPagar' ? <td>{especialidadeUnidade.valorPagar}</td> : null}

                        {this.state.baseFilters !== 'publicar' ? <td>{especialidadeUnidade.publicar}</td> : null}

                        {this.state.baseFilters !== 'comentarioPreco' ? <td>{especialidadeUnidade.comentarioPreco}</td> : null}

                        {this.state.baseFilters !== 'unidade' ? (
                          <td>
                            {especialidadeUnidade.unidade ? (
                              <Link to={`unidade-easy/${especialidadeUnidade.unidade.id}`}>{especialidadeUnidade.unidade.id}</Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'especialidade' ? (
                          <td>
                            {especialidadeUnidade.especialidade ? (
                              <Link to={`especialidade/${especialidadeUnidade.especialidade.id}`}>
                                {especialidadeUnidade.especialidade.id}
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
                              to={`${match.url}/${especialidadeUnidade.id}?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${especialidadeUnidade.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${especialidadeUnidade.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.especialidadeUnidade.home.notFound">No Especialidade Unidades found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={especialidadeUnidadeList && especialidadeUnidadeList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ especialidadeUnidade, ...storeState }: IRootState) => ({
  unidadeEasies: storeState.unidadeEasy.entities,
  especialidades: storeState.especialidade.entities,
  especialidadeUnidadeList: especialidadeUnidade.entities,
  totalItems: especialidadeUnidade.totalItems
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getEspecialidades,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EspecialidadeUnidade);
