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
import { getEntities } from './pad-item-sorteio-feito.reducer';
import { IPadItemSorteioFeito } from 'app/shared/model/pad-item-sorteio-feito.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IPadItem } from 'app/shared/model/pad-item.model';
import { getEntities as getPadItems } from 'app/entities/pad-item/pad-item.reducer';

export interface IPadItemSorteioFeitoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPadItemSorteioFeitoBaseState {
  sorteioFeito: any;
  idPadItem: any;
}
export interface IPadItemSorteioFeitoState extends IPadItemSorteioFeitoBaseState, IPaginationBaseState {}

export class PadItemSorteioFeito extends React.Component<IPadItemSorteioFeitoProps, IPadItemSorteioFeitoState> {
  private myFormRef: any;

  constructor(props: IPadItemSorteioFeitoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getPadItemSorteioFeitoState(this.props.location)
    };
  }

  getPadItemSorteioFeitoState = (location): IPadItemSorteioFeitoBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const sorteioFeito = url.searchParams.get('sorteioFeito') || '';

    const idPadItem = url.searchParams.get('idPadItem') || '';

    return {
      sorteioFeito,
      idPadItem
    };
  };

  componentDidMount() {
    this.getEntities();

    this.props.getPadItems();
  }

  cancelCourse = () => {
    this.setState(
      {
        sorteioFeito: '',
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
      'sorteioFeito=' +
      this.state.sorteioFeito +
      '&' +
      'idPadItem=' +
      this.state.idPadItem +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { sorteioFeito, idPadItem, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(sorteioFeito, idPadItem, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { padItems, padItemSorteioFeitoList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Item Sorteio Feitos</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Pad Item Sorteio Feitos</span>
              <Button id="togglerFilterPadItemSorteioFeito" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.padItemSorteioFeito.home.createLabel">Create a new Pad Item Sorteio Feito</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPadItemSorteioFeito">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="sorteioFeitoLabel" for="pad-item-sorteio-feito-sorteioFeito">
                            <Translate contentKey="generadorApp.padItemSorteioFeito.sorteioFeito">Sorteio Feito</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="sorteioFeito"
                            id="pad-item-sorteio-feito-sorteioFeito"
                            value={this.state.sorteioFeito}
                          />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="pad-item-sorteio-feito-idPadItem">
                              <Translate contentKey="generadorApp.padItemSorteioFeito.idPadItem">Id Pad Item</Translate>
                            </Label>
                            <AvInput id="pad-item-sorteio-feito-idPadItem" type="select" className="form-control" name="idPadItemId">
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

              {padItemSorteioFeitoList && padItemSorteioFeitoList.length > 0 ? (
                <Table responsive aria-describedby="pad-item-sorteio-feito-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('sorteioFeito')}>
                        <Translate contentKey="generadorApp.padItemSorteioFeito.sorteioFeito">Sorteio Feito</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.padItemSorteioFeito.idPadItem">Id Pad Item</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {padItemSorteioFeitoList.map((padItemSorteioFeito, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${padItemSorteioFeito.id}`} color="link" size="sm">
                            {padItemSorteioFeito.id}
                          </Button>
                        </td>

                        <td>{padItemSorteioFeito.sorteioFeito}</td>
                        <td>
                          {padItemSorteioFeito.idPadItem ? (
                            <Link to={`pad-item/${padItemSorteioFeito.idPadItem.id}`}>{padItemSorteioFeito.idPadItem.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${padItemSorteioFeito.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${padItemSorteioFeito.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${padItemSorteioFeito.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.padItemSorteioFeito.home.notFound">No Pad Item Sorteio Feitos found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={padItemSorteioFeitoList && padItemSorteioFeitoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ padItemSorteioFeito, ...storeState }: IRootState) => ({
  padItems: storeState.padItem.entities,
  padItemSorteioFeitoList: padItemSorteioFeito.entities,
  totalItems: padItemSorteioFeito.totalItems
});

const mapDispatchToProps = {
  getPadItems,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadItemSorteioFeito);
