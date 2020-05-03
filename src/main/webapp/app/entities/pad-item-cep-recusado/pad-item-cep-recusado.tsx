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
import { getEntities } from './pad-item-cep-recusado.reducer';
import { IPadItemCepRecusado } from 'app/shared/model/pad-item-cep-recusado.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IPadItem } from 'app/shared/model/pad-item.model';
import { getEntities as getPadItems } from 'app/entities/pad-item/pad-item.reducer';

export interface IPadItemCepRecusadoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPadItemCepRecusadoBaseState {
  cep: any;
  idPadItem: any;
}
export interface IPadItemCepRecusadoState extends IPadItemCepRecusadoBaseState, IPaginationBaseState {}

export class PadItemCepRecusado extends React.Component<IPadItemCepRecusadoProps, IPadItemCepRecusadoState> {
  private myFormRef: any;

  constructor(props: IPadItemCepRecusadoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getPadItemCepRecusadoState(this.props.location)
    };
  }

  getPadItemCepRecusadoState = (location): IPadItemCepRecusadoBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const cep = url.searchParams.get('cep') || '';

    const idPadItem = url.searchParams.get('idPadItem') || '';

    return {
      cep,
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
        cep: '',
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
      'cep=' +
      this.state.cep +
      '&' +
      'idPadItem=' +
      this.state.idPadItem +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { cep, idPadItem, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(cep, idPadItem, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { padItems, padItemCepRecusadoList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Item Cep Recusados</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Pad Item Cep Recusados</span>
              <Button id="togglerFilterPadItemCepRecusado" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.padItemCepRecusado.home.createLabel">Create a new Pad Item Cep Recusado</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPadItemCepRecusado">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="cepLabel" for="pad-item-cep-recusado-cep">
                            <Translate contentKey="generadorApp.padItemCepRecusado.cep">Cep</Translate>
                          </Label>

                          <AvInput type="text" name="cep" id="pad-item-cep-recusado-cep" value={this.state.cep} />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="pad-item-cep-recusado-idPadItem">
                              <Translate contentKey="generadorApp.padItemCepRecusado.idPadItem">Id Pad Item</Translate>
                            </Label>
                            <AvInput id="pad-item-cep-recusado-idPadItem" type="select" className="form-control" name="idPadItemId">
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

              {padItemCepRecusadoList && padItemCepRecusadoList.length > 0 ? (
                <Table responsive aria-describedby="pad-item-cep-recusado-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cep')}>
                        <Translate contentKey="generadorApp.padItemCepRecusado.cep">Cep</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.padItemCepRecusado.idPadItem">Id Pad Item</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {padItemCepRecusadoList.map((padItemCepRecusado, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${padItemCepRecusado.id}`} color="link" size="sm">
                            {padItemCepRecusado.id}
                          </Button>
                        </td>

                        <td>{padItemCepRecusado.cep}</td>
                        <td>
                          {padItemCepRecusado.idPadItem ? (
                            <Link to={`pad-item/${padItemCepRecusado.idPadItem.id}`}>{padItemCepRecusado.idPadItem.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${padItemCepRecusado.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${padItemCepRecusado.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${padItemCepRecusado.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.padItemCepRecusado.home.notFound">No Pad Item Cep Recusados found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={padItemCepRecusadoList && padItemCepRecusadoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ padItemCepRecusado, ...storeState }: IRootState) => ({
  padItems: storeState.padItem.entities,
  padItemCepRecusadoList: padItemCepRecusado.entities,
  totalItems: padItemCepRecusado.totalItems
});

const mapDispatchToProps = {
  getPadItems,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadItemCepRecusado);
