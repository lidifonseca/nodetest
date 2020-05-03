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
import { getEntities } from './especialidade-valor.reducer';
import { IEspecialidadeValor } from 'app/shared/model/especialidade-valor.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IEspecialidade } from 'app/shared/model/especialidade.model';
import { getEntities as getEspecialidades } from 'app/entities/especialidade/especialidade.reducer';

export interface IEspecialidadeValorProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IEspecialidadeValorBaseState {
  idFranquia: any;
  valor: any;
  ativo: any;
  idEspecialidade: any;
}
export interface IEspecialidadeValorState extends IEspecialidadeValorBaseState, IPaginationBaseState {}

export class EspecialidadeValor extends React.Component<IEspecialidadeValorProps, IEspecialidadeValorState> {
  private myFormRef: any;

  constructor(props: IEspecialidadeValorProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getEspecialidadeValorState(this.props.location)
    };
  }

  getEspecialidadeValorState = (location): IEspecialidadeValorBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const idFranquia = url.searchParams.get('idFranquia') || '';
    const valor = url.searchParams.get('valor') || '';
    const ativo = url.searchParams.get('ativo') || '';

    const idEspecialidade = url.searchParams.get('idEspecialidade') || '';

    return {
      idFranquia,
      valor,
      ativo,
      idEspecialidade
    };
  };

  componentDidMount() {
    this.getEntities();

    this.props.getEspecialidades();
  }

  cancelCourse = () => {
    this.setState(
      {
        idFranquia: '',
        valor: '',
        ativo: '',
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
      'idFranquia=' +
      this.state.idFranquia +
      '&' +
      'valor=' +
      this.state.valor +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'idEspecialidade=' +
      this.state.idEspecialidade +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idFranquia, valor, ativo, idEspecialidade, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(idFranquia, valor, ativo, idEspecialidade, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { especialidades, especialidadeValorList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Especialidade Valors</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Especialidade Valors</span>
              <Button id="togglerFilterEspecialidadeValor" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.especialidadeValor.home.createLabel">Create a new Especialidade Valor</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterEspecialidadeValor">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="idFranquiaLabel" for="especialidade-valor-idFranquia">
                            <Translate contentKey="generadorApp.especialidadeValor.idFranquia">Id Franquia</Translate>
                          </Label>

                          <AvInput type="text" name="idFranquia" id="especialidade-valor-idFranquia" value={this.state.idFranquia} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="valorLabel" for="especialidade-valor-valor">
                            <Translate contentKey="generadorApp.especialidadeValor.valor">Valor</Translate>
                          </Label>
                          <AvInput type="string" name="valor" id="especialidade-valor-valor" value={this.state.valor} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="especialidade-valor-ativo">
                            <Translate contentKey="generadorApp.especialidadeValor.ativo">Ativo</Translate>
                          </Label>
                          <AvInput type="string" name="ativo" id="especialidade-valor-ativo" value={this.state.ativo} />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="especialidade-valor-idEspecialidade">
                              <Translate contentKey="generadorApp.especialidadeValor.idEspecialidade">Id Especialidade</Translate>
                            </Label>
                            <AvInput
                              id="especialidade-valor-idEspecialidade"
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

              {especialidadeValorList && especialidadeValorList.length > 0 ? (
                <Table responsive aria-describedby="especialidade-valor-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idFranquia')}>
                        <Translate contentKey="generadorApp.especialidadeValor.idFranquia">Id Franquia</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('valor')}>
                        <Translate contentKey="generadorApp.especialidadeValor.valor">Valor</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.especialidadeValor.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.especialidadeValor.idEspecialidade">Id Especialidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {especialidadeValorList.map((especialidadeValor, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${especialidadeValor.id}`} color="link" size="sm">
                            {especialidadeValor.id}
                          </Button>
                        </td>

                        <td>{especialidadeValor.idFranquia}</td>

                        <td>{especialidadeValor.valor}</td>

                        <td>{especialidadeValor.ativo}</td>
                        <td>
                          {especialidadeValor.idEspecialidade ? (
                            <Link to={`especialidade/${especialidadeValor.idEspecialidade.id}`}>
                              {especialidadeValor.idEspecialidade.id}
                            </Link>
                          ) : (
                            ''
                          )}
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${especialidadeValor.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${especialidadeValor.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${especialidadeValor.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.especialidadeValor.home.notFound">No Especialidade Valors found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={especialidadeValorList && especialidadeValorList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ especialidadeValor, ...storeState }: IRootState) => ({
  especialidades: storeState.especialidade.entities,
  especialidadeValorList: especialidadeValor.entities,
  totalItems: especialidadeValor.totalItems
});

const mapDispatchToProps = {
  getEspecialidades,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EspecialidadeValor);
