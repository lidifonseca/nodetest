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
import { getEntities } from './pad-item-atividade.reducer';
import { IPadItemAtividade } from 'app/shared/model/pad-item-atividade.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { ICategoriaAtividade } from 'app/shared/model/categoria-atividade.model';
import { getEntities as getCategoriaAtividades } from 'app/entities/categoria-atividade/categoria-atividade.reducer';
import { IPadItem } from 'app/shared/model/pad-item.model';
import { getEntities as getPadItems } from 'app/entities/pad-item/pad-item.reducer';

export interface IPadItemAtividadeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPadItemAtividadeBaseState {
  dataInicio: any;
  dataFim: any;
  idAtividade: any;
  idPadItem: any;
}
export interface IPadItemAtividadeState extends IPadItemAtividadeBaseState, IPaginationBaseState {}

export class PadItemAtividade extends React.Component<IPadItemAtividadeProps, IPadItemAtividadeState> {
  private myFormRef: any;

  constructor(props: IPadItemAtividadeProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getPadItemAtividadeState(this.props.location)
    };
  }

  getPadItemAtividadeState = (location): IPadItemAtividadeBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const dataInicio = url.searchParams.get('dataInicio') || '';
    const dataFim = url.searchParams.get('dataFim') || '';

    const idAtividade = url.searchParams.get('idAtividade') || '';
    const idPadItem = url.searchParams.get('idPadItem') || '';

    return {
      dataInicio,
      dataFim,
      idAtividade,
      idPadItem
    };
  };

  componentDidMount() {
    this.getEntities();

    this.props.getCategoriaAtividades();
    this.props.getPadItems();
  }

  cancelCourse = () => {
    this.setState(
      {
        dataInicio: '',
        dataFim: '',
        idAtividade: '',
        idPadItem: ''
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
      'dataInicio=' +
      this.state.dataInicio +
      '&' +
      'dataFim=' +
      this.state.dataFim +
      '&' +
      'idAtividade=' +
      this.state.idAtividade +
      '&' +
      'idPadItem=' +
      this.state.idPadItem +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { dataInicio, dataFim, idAtividade, idPadItem, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(dataInicio, dataFim, idAtividade, idPadItem, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { categoriaAtividades, padItems, padItemAtividadeList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Item Atividades</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Pad Item Atividades</span>
              <Button id="togglerFilterPadItemAtividade" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.padItemAtividade.home.createLabel">Create a new Pad Item Atividade</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPadItemAtividade">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="dataInicioLabel" for="pad-item-atividade-dataInicio">
                            <Translate contentKey="generadorApp.padItemAtividade.dataInicio">Data Inicio</Translate>
                          </Label>
                          <AvInput type="date" name="dataInicio" id="pad-item-atividade-dataInicio" value={this.state.dataInicio} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataFimLabel" for="pad-item-atividade-dataFim">
                            <Translate contentKey="generadorApp.padItemAtividade.dataFim">Data Fim</Translate>
                          </Label>
                          <AvInput type="date" name="dataFim" id="pad-item-atividade-dataFim" value={this.state.dataFim} />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="pad-item-atividade-idAtividade">
                              <Translate contentKey="generadorApp.padItemAtividade.idAtividade">Id Atividade</Translate>
                            </Label>
                            <AvInput id="pad-item-atividade-idAtividade" type="select" className="form-control" name="idAtividadeId">
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
                            <Label for="pad-item-atividade-idPadItem">
                              <Translate contentKey="generadorApp.padItemAtividade.idPadItem">Id Pad Item</Translate>
                            </Label>
                            <AvInput id="pad-item-atividade-idPadItem" type="select" className="form-control" name="idPadItemId">
                              <option value="" key="0" />
                              {padItems
                                ? padItems.map(otherEntity => (
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

              {padItemAtividadeList && padItemAtividadeList.length > 0 ? (
                <Table responsive aria-describedby="pad-item-atividade-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataInicio')}>
                        <Translate contentKey="generadorApp.padItemAtividade.dataInicio">Data Inicio</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataFim')}>
                        <Translate contentKey="generadorApp.padItemAtividade.dataFim">Data Fim</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.padItemAtividade.idAtividade">Id Atividade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.padItemAtividade.idPadItem">Id Pad Item</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {padItemAtividadeList.map((padItemAtividade, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${padItemAtividade.id}`} color="link" size="sm">
                            {padItemAtividade.id}
                          </Button>
                        </td>

                        <td>
                          <TextFormat type="date" value={padItemAtividade.dataInicio} format={APP_LOCAL_DATE_FORMAT} />
                        </td>

                        <td>
                          <TextFormat type="date" value={padItemAtividade.dataFim} format={APP_LOCAL_DATE_FORMAT} />
                        </td>
                        <td>
                          {padItemAtividade.idAtividade ? (
                            <Link to={`categoria-atividade/${padItemAtividade.idAtividade.id}`}>{padItemAtividade.idAtividade.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>
                        <td>
                          {padItemAtividade.idPadItem ? (
                            <Link to={`pad-item/${padItemAtividade.idPadItem.id}`}>{padItemAtividade.idPadItem.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${padItemAtividade.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${padItemAtividade.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${padItemAtividade.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.padItemAtividade.home.notFound">No Pad Item Atividades found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={padItemAtividadeList && padItemAtividadeList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ padItemAtividade, ...storeState }: IRootState) => ({
  categoriaAtividades: storeState.categoriaAtividade.entities,
  padItems: storeState.padItem.entities,
  padItemAtividadeList: padItemAtividade.entities,
  totalItems: padItemAtividade.totalItems
});

const mapDispatchToProps = {
  getCategoriaAtividades,
  getPadItems,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadItemAtividade);