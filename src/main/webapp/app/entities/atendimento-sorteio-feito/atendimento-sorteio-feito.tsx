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
import { getAtendimentoSorteioFeitoState, IAtendimentoSorteioFeitoBaseState, getEntities } from './atendimento-sorteio-feito.reducer';
import { IAtendimentoSorteioFeito } from 'app/shared/model/atendimento-sorteio-feito.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IPadItem } from 'app/shared/model/pad-item.model';
import { getEntities as getPadItems } from 'app/entities/pad-item/pad-item.reducer';

export interface IAtendimentoSorteioFeitoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IAtendimentoSorteioFeitoState extends IAtendimentoSorteioFeitoBaseState, IPaginationBaseState {}

export class AtendimentoSorteioFeito extends React.Component<IAtendimentoSorteioFeitoProps, IAtendimentoSorteioFeitoState> {
  private myFormRef: any;

  constructor(props: IAtendimentoSorteioFeitoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getAtendimentoSorteioFeitoState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getPadItems();
  }

  cancelCourse = () => {
    this.setState(
      {
        sorteioFeito: '',
        padItem: ''
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
      'sorteioFeito=' +
      this.state.sorteioFeito +
      '&' +
      'padItem=' +
      this.state.padItem +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { sorteioFeito, padItem, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(sorteioFeito, padItem, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { padItems, atendimentoSorteioFeitoList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Atendimento Sorteio Feitos</span>
          <Button id="togglerFilterAtendimentoSorteioFeito" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.atendimentoSorteioFeito.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.atendimentoSorteioFeito.home.createLabel">Create a new Atendimento Sorteio Feito</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Atendimento Sorteio Feitos</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterAtendimentoSorteioFeito">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'sorteioFeito' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="sorteioFeitoLabel" for="atendimento-sorteio-feito-sorteioFeito">
                              <Translate contentKey="generadorApp.atendimentoSorteioFeito.sorteioFeito">Sorteio Feito</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="sorteioFeito"
                              id="atendimento-sorteio-feito-sorteioFeito"
                              value={this.state.sorteioFeito}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'padItem' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="atendimento-sorteio-feito-padItem">
                                <Translate contentKey="generadorApp.atendimentoSorteioFeito.padItem">Pad Item</Translate>
                              </Label>
                              <Select
                                id="atendimento-sorteio-feito-padItem"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  padItems
                                    ? padItems.map(p =>
                                        this.state.padItem.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null
                                      )
                                    : null
                                }
                                options={padItems ? padItems.map(option => ({ value: option.id, label: option.id })) : null}
                                onChange={options => this.setState({ padItem: options.map(option => option['value']).join(',') })}
                                name={'padItem'}
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
                        <Translate contentKey="generadorApp.atendimentoSorteioFeito.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.atendimentoSorteioFeito.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {atendimentoSorteioFeitoList && atendimentoSorteioFeitoList.length > 0 ? (
                <Table responsive aria-describedby="atendimento-sorteio-feito-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'sorteioFeito' ? (
                        <th className="hand" onClick={this.sort('sorteioFeito')}>
                          <Translate contentKey="generadorApp.atendimentoSorteioFeito.sorteioFeito">Sorteio Feito</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'padItem' ? (
                        <th>
                          <Translate contentKey="generadorApp.atendimentoSorteioFeito.padItem">Pad Item</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {atendimentoSorteioFeitoList.map((atendimentoSorteioFeito, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${atendimentoSorteioFeito.id}`} color="link" size="sm">
                            {atendimentoSorteioFeito.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'sorteioFeito' ? <td>{atendimentoSorteioFeito.sorteioFeito}</td> : null}

                        {this.state.baseFilters !== 'padItem' ? (
                          <td>
                            {atendimentoSorteioFeito.padItem ? (
                              <Link to={`pad-item/${atendimentoSorteioFeito.padItem.id}`}>{atendimentoSorteioFeito.padItem.id}</Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button
                              tag={Link}
                              to={`${match.url}/${atendimentoSorteioFeito.id}?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${atendimentoSorteioFeito.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${atendimentoSorteioFeito.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.atendimentoSorteioFeito.home.notFound">No Atendimento Sorteio Feitos found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={atendimentoSorteioFeitoList && atendimentoSorteioFeitoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ atendimentoSorteioFeito, ...storeState }: IRootState) => ({
  padItems: storeState.padItem.entities,
  atendimentoSorteioFeitoList: atendimentoSorteioFeito.entities,
  totalItems: atendimentoSorteioFeito.totalItems
});

const mapDispatchToProps = {
  getPadItems,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AtendimentoSorteioFeito);
