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
import { getCidPtaState, ICidPtaBaseState, getEntities } from './cid-pta.reducer';
import { ICidPta } from 'app/shared/model/cid-pta.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ICidPtaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ICidPtaState extends ICidPtaBaseState, IPaginationBaseState {}

export class CidPta extends React.Component<ICidPtaProps, ICidPtaState> {
  private myFormRef: any;

  constructor(props: ICidPtaProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getCidPtaState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idDescPta: '',
        idCid: '',
        idAtividade: '',
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
      'idDescPta=' +
      this.state.idDescPta +
      '&' +
      'idCid=' +
      this.state.idCid +
      '&' +
      'idAtividade=' +
      this.state.idAtividade +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idDescPta, idCid, idAtividade, ativo, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(idDescPta, idCid, idAtividade, ativo, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { cidPtaList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Cid Ptas</span>
          <Button id="togglerFilterCidPta" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.cidPta.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.cidPta.home.createLabel">Create a new Cid Pta</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Cid Ptas</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterCidPta">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idDescPta' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idDescPtaLabel" for="cid-pta-idDescPta">
                              <Translate contentKey="generadorApp.cidPta.idDescPta">Id Desc Pta</Translate>
                            </Label>
                            <AvInput type="string" name="idDescPta" id="cid-pta-idDescPta" value={this.state.idDescPta} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idCid' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idCidLabel" for="cid-pta-idCid">
                              <Translate contentKey="generadorApp.cidPta.idCid">Id Cid</Translate>
                            </Label>
                            <AvInput type="string" name="idCid" id="cid-pta-idCid" value={this.state.idCid} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idAtividade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idAtividadeLabel" for="cid-pta-idAtividade">
                              <Translate contentKey="generadorApp.cidPta.idAtividade">Id Atividade</Translate>
                            </Label>
                            <AvInput type="string" name="idAtividade" id="cid-pta-idAtividade" value={this.state.idAtividade} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ativo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ativoLabel" check>
                              <AvInput id="cid-pta-ativo" type="checkbox" className="form-control" name="ativo" />
                              <Translate contentKey="generadorApp.cidPta.ativo">Ativo</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.cidPta.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.cidPta.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {cidPtaList && cidPtaList.length > 0 ? (
                <Table responsive aria-describedby="cid-pta-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'idDescPta' ? (
                        <th className="hand" onClick={this.sort('idDescPta')}>
                          <Translate contentKey="generadorApp.cidPta.idDescPta">Id Desc Pta</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idCid' ? (
                        <th className="hand" onClick={this.sort('idCid')}>
                          <Translate contentKey="generadorApp.cidPta.idCid">Id Cid</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idAtividade' ? (
                        <th className="hand" onClick={this.sort('idAtividade')}>
                          <Translate contentKey="generadorApp.cidPta.idAtividade">Id Atividade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ativo' ? (
                        <th className="hand" onClick={this.sort('ativo')}>
                          <Translate contentKey="generadorApp.cidPta.ativo">Ativo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {cidPtaList.map((cidPta, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${cidPta.id}`} color="link" size="sm">
                            {cidPta.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'idDescPta' ? <td>{cidPta.idDescPta}</td> : null}

                        {this.state.baseFilters !== 'idCid' ? <td>{cidPta.idCid}</td> : null}

                        {this.state.baseFilters !== 'idAtividade' ? <td>{cidPta.idAtividade}</td> : null}

                        {this.state.baseFilters !== 'ativo' ? <td>{cidPta.ativo ? 'true' : 'false'}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${cidPta.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${cidPta.id}/edit?${this.getFiltersURL()}`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${cidPta.id}/delete?${this.getFiltersURL()}`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.cidPta.home.notFound">No Cid Ptas found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={cidPtaList && cidPtaList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ cidPta, ...storeState }: IRootState) => ({
  cidPtaList: cidPta.entities,
  totalItems: cidPta.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CidPta);
