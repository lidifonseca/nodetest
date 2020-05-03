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
import { getEntities } from './atendimento-atividades.reducer';
import { IAtendimentoAtividades } from 'app/shared/model/atendimento-atividades.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { ICategoriaAtividade } from 'app/shared/model/categoria-atividade.model';
import { getEntities as getCategoriaAtividades } from 'app/entities/categoria-atividade/categoria-atividade.reducer';
import { IAtendimento } from 'app/shared/model/atendimento.model';
import { getEntities as getAtendimentos } from 'app/entities/atendimento/atendimento.reducer';

export interface IAtendimentoAtividadesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IAtendimentoAtividadesBaseState {
  feito: any;
  dataPost: any;
  idAtividade: any;
  idAtendimento: any;
}
export interface IAtendimentoAtividadesState extends IAtendimentoAtividadesBaseState, IPaginationBaseState {}

export class AtendimentoAtividades extends React.Component<IAtendimentoAtividadesProps, IAtendimentoAtividadesState> {
  private myFormRef: any;

  constructor(props: IAtendimentoAtividadesProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getAtendimentoAtividadesState(this.props.location)
    };
  }

  getAtendimentoAtividadesState = (location): IAtendimentoAtividadesBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const feito = url.searchParams.get('feito') || '';
    const dataPost = url.searchParams.get('dataPost') || '';

    const idAtividade = url.searchParams.get('idAtividade') || '';
    const idAtendimento = url.searchParams.get('idAtendimento') || '';

    return {
      feito,
      dataPost,
      idAtividade,
      idAtendimento
    };
  };

  componentDidMount() {
    this.getEntities();

    this.props.getCategoriaAtividades();
    this.props.getAtendimentos();
  }

  cancelCourse = () => {
    this.setState(
      {
        feito: '',
        dataPost: '',
        idAtividade: '',
        idAtendimento: ''
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
      'feito=' +
      this.state.feito +
      '&' +
      'dataPost=' +
      this.state.dataPost +
      '&' +
      'idAtividade=' +
      this.state.idAtividade +
      '&' +
      'idAtendimento=' +
      this.state.idAtendimento +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { feito, dataPost, idAtividade, idAtendimento, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(feito, dataPost, idAtividade, idAtendimento, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { categoriaAtividades, atendimentos, atendimentoAtividadesList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Atendimento Atividades</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Atendimento Atividades</span>
              <Button id="togglerFilterAtendimentoAtividades" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.atendimentoAtividades.home.createLabel">Create a new Atendimento Atividades</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterAtendimentoAtividades">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="feitoLabel" for="atendimento-atividades-feito">
                            <Translate contentKey="generadorApp.atendimentoAtividades.feito">Feito</Translate>
                          </Label>
                          <AvInput type="string" name="feito" id="atendimento-atividades-feito" value={this.state.feito} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataPostLabel" for="atendimento-atividades-dataPost">
                            <Translate contentKey="generadorApp.atendimentoAtividades.dataPost">Data Post</Translate>
                          </Label>
                          <AvInput
                            id="atendimento-atividades-dataPost"
                            type="datetime-local"
                            className="form-control"
                            name="dataPost"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.dataPost ? convertDateTimeFromServer(this.state.dataPost) : null}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') }
                            }}
                          />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="atendimento-atividades-idAtividade">
                              <Translate contentKey="generadorApp.atendimentoAtividades.idAtividade">Id Atividade</Translate>
                            </Label>
                            <AvInput id="atendimento-atividades-idAtividade" type="select" className="form-control" name="idAtividadeId">
                              <option value="" key="0" />
                              {categoriaAtividades
                                ? categoriaAtividades.map(otherEntity => (
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
                            <Label for="atendimento-atividades-idAtendimento">
                              <Translate contentKey="generadorApp.atendimentoAtividades.idAtendimento">Id Atendimento</Translate>
                            </Label>
                            <AvInput
                              id="atendimento-atividades-idAtendimento"
                              type="select"
                              className="form-control"
                              name="idAtendimentoId"
                            >
                              <option value="" key="0" />
                              {atendimentos
                                ? atendimentos.map(otherEntity => (
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

              {atendimentoAtividadesList && atendimentoAtividadesList.length > 0 ? (
                <Table responsive aria-describedby="atendimento-atividades-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('feito')}>
                        <Translate contentKey="generadorApp.atendimentoAtividades.feito">Feito</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataPost')}>
                        <Translate contentKey="generadorApp.atendimentoAtividades.dataPost">Data Post</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.atendimentoAtividades.idAtividade">Id Atividade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.atendimentoAtividades.idAtendimento">Id Atendimento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {atendimentoAtividadesList.map((atendimentoAtividades, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${atendimentoAtividades.id}`} color="link" size="sm">
                            {atendimentoAtividades.id}
                          </Button>
                        </td>

                        <td>{atendimentoAtividades.feito}</td>

                        <td>
                          <TextFormat type="date" value={atendimentoAtividades.dataPost} format={APP_DATE_FORMAT} />
                        </td>
                        <td>
                          {atendimentoAtividades.idAtividade ? (
                            <Link to={`categoria-atividade/${atendimentoAtividades.idAtividade.id}`}>
                              {atendimentoAtividades.idAtividade.id}
                            </Link>
                          ) : (
                            ''
                          )}
                        </td>
                        <td>
                          {atendimentoAtividades.idAtendimento ? (
                            <Link to={`atendimento/${atendimentoAtividades.idAtendimento.id}`}>
                              {atendimentoAtividades.idAtendimento.id}
                            </Link>
                          ) : (
                            ''
                          )}
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${atendimentoAtividades.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${atendimentoAtividades.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${atendimentoAtividades.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.atendimentoAtividades.home.notFound">No Atendimento Atividades found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={atendimentoAtividadesList && atendimentoAtividadesList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ atendimentoAtividades, ...storeState }: IRootState) => ({
  categoriaAtividades: storeState.categoriaAtividade.entities,
  atendimentos: storeState.atendimento.entities,
  atendimentoAtividadesList: atendimentoAtividades.entities,
  totalItems: atendimentoAtividades.totalItems
});

const mapDispatchToProps = {
  getCategoriaAtividades,
  getAtendimentos,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AtendimentoAtividades);
