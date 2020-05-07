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
import { getPadMatMedState, IPadMatMedBaseState, getEntities } from './pad-mat-med.reducer';
import { IPadMatMed } from 'app/shared/model/pad-mat-med.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPadMatMedProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPadMatMedState extends IPadMatMedBaseState, IPaginationBaseState {}

export class PadMatMed extends React.Component<IPadMatMedProps, IPadMatMedState> {
  private myFormRef: any;

  constructor(props: IPadMatMedProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getPadMatMedState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idPad: '',
        idMatMed: '',
        qtd: '',
        ativo: ''
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
      'idPad=' +
      this.state.idPad +
      '&' +
      'idMatMed=' +
      this.state.idMatMed +
      '&' +
      'qtd=' +
      this.state.qtd +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idPad, idMatMed, qtd, ativo, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(idPad, idMatMed, qtd, ativo, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { padMatMedList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Mat Meds</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Pad Mat Meds</span>
              <Button id="togglerFilterPadMatMed" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link
                to={`${match.url}/new?${this.getFiltersURL()}`}
                className="btn btn-primary float-right jh-create-entity"
                id="jh-create-entity"
              >
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.padMatMed.home.createLabel">Create a new Pad Mat Med</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPadMatMed">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idPad' ? (
                        <Col md="3">
                          <Row>
                            <Label id="idPadLabel" for="pad-mat-med-idPad">
                              <Translate contentKey="generadorApp.padMatMed.idPad">Id Pad</Translate>
                            </Label>
                            <AvInput type="string" name="idPad" id="pad-mat-med-idPad" value={this.state.idPad} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idMatMed' ? (
                        <Col md="3">
                          <Row>
                            <Label id="idMatMedLabel" for="pad-mat-med-idMatMed">
                              <Translate contentKey="generadorApp.padMatMed.idMatMed">Id Mat Med</Translate>
                            </Label>
                            <AvInput type="string" name="idMatMed" id="pad-mat-med-idMatMed" value={this.state.idMatMed} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'qtd' ? (
                        <Col md="3">
                          <Row>
                            <Label id="qtdLabel" for="pad-mat-med-qtd">
                              <Translate contentKey="generadorApp.padMatMed.qtd">Qtd</Translate>
                            </Label>
                            <AvInput type="string" name="qtd" id="pad-mat-med-qtd" value={this.state.qtd} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ativo' ? (
                        <Col md="3">
                          <Row>
                            <Label id="ativoLabel" for="pad-mat-med-ativo">
                              <Translate contentKey="generadorApp.padMatMed.ativo">Ativo</Translate>
                            </Label>
                            <AvInput type="string" name="ativo" id="pad-mat-med-ativo" value={this.state.ativo} />
                          </Row>
                        </Col>
                      ) : null}
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

              {padMatMedList && padMatMedList.length > 0 ? (
                <Table responsive aria-describedby="pad-mat-med-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'idPad' ? (
                        <th className="hand" onClick={this.sort('idPad')}>
                          <Translate contentKey="generadorApp.padMatMed.idPad">Id Pad</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idMatMed' ? (
                        <th className="hand" onClick={this.sort('idMatMed')}>
                          <Translate contentKey="generadorApp.padMatMed.idMatMed">Id Mat Med</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'qtd' ? (
                        <th className="hand" onClick={this.sort('qtd')}>
                          <Translate contentKey="generadorApp.padMatMed.qtd">Qtd</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ativo' ? (
                        <th className="hand" onClick={this.sort('ativo')}>
                          <Translate contentKey="generadorApp.padMatMed.ativo">Ativo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {padMatMedList.map((padMatMed, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${padMatMed.id}`} color="link" size="sm">
                            {padMatMed.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'idPad' ? <td>{padMatMed.idPad}</td> : null}

                        {this.state.baseFilters !== 'idMatMed' ? <td>{padMatMed.idMatMed}</td> : null}

                        {this.state.baseFilters !== 'qtd' ? <td>{padMatMed.qtd}</td> : null}

                        {this.state.baseFilters !== 'ativo' ? <td>{padMatMed.ativo}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${padMatMed.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${padMatMed.id}/edit?${this.getFiltersURL()}`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${padMatMed.id}/delete?${this.getFiltersURL()}`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.padMatMed.home.notFound">No Pad Mat Meds found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={padMatMedList && padMatMedList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ padMatMed, ...storeState }: IRootState) => ({
  padMatMedList: padMatMed.entities,
  totalItems: padMatMed.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadMatMed);
