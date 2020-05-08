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
import { getCidadeState, ICidadeBaseState, getEntities } from './cidade.reducer';
import { ICidade } from 'app/shared/model/cidade.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IUf } from 'app/shared/model/uf.model';
import { getEntities as getUfs } from 'app/entities/uf/uf.reducer';

export interface ICidadeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ICidadeState extends ICidadeBaseState, IPaginationBaseState {}

export class Cidade extends React.Component<ICidadeProps, ICidadeState> {
  private myFormRef: any;

  constructor(props: ICidadeProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getCidadeState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getUfs();
  }

  cancelCourse = () => {
    this.setState(
      {
        descrCidade: '',
        atendimento: '',
        empresa: '',
        uf: ''
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
      'descrCidade=' +
      this.state.descrCidade +
      '&' +
      'atendimento=' +
      this.state.atendimento +
      '&' +
      'empresa=' +
      this.state.empresa +
      '&' +
      'uf=' +
      this.state.uf +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { descrCidade, atendimento, empresa, uf, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(descrCidade, atendimento, empresa, uf, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { ufs, cidadeList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Cidades</span>
          <Button id="togglerFilterCidade" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.cidade.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.cidade.home.createLabel">Create a new Cidade</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Cidades</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterCidade">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'descrCidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="descrCidadeLabel" for="cidade-descrCidade">
                              <Translate contentKey="generadorApp.cidade.descrCidade">Descr Cidade</Translate>
                            </Label>

                            <AvInput type="text" name="descrCidade" id="cidade-descrCidade" value={this.state.descrCidade} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'atendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'empresa' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'uf' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="cidade-uf">
                                <Translate contentKey="generadorApp.cidade.uf">Uf</Translate>
                              </Label>
                              <Select
                                id="cidade-uf"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  ufs
                                    ? ufs.map(p => (this.state.uf.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null))
                                    : null
                                }
                                options={ufs ? ufs.map(option => ({ value: option.id, label: option.id })) : null}
                                onChange={options => this.setState({ uf: options.map(option => option['value']).join(',') })}
                                name={'uf'}
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
                        <Translate contentKey="generadorApp.cidade.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.cidade.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {cidadeList && cidadeList.length > 0 ? (
                <Table responsive aria-describedby="cidade-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'descrCidade' ? (
                        <th className="hand" onClick={this.sort('descrCidade')}>
                          <Translate contentKey="generadorApp.cidade.descrCidade">Descr Cidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'uf' ? (
                        <th>
                          <Translate contentKey="generadorApp.cidade.uf">Uf</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {cidadeList.map((cidade, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${cidade.id}`} color="link" size="sm">
                            {cidade.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'descrCidade' ? <td>{cidade.descrCidade}</td> : null}

                        {this.state.baseFilters !== 'uf' ? (
                          <td>{cidade.uf ? <Link to={`uf/${cidade.uf.id}`}>{cidade.uf.id}</Link> : ''}</td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${cidade.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${cidade.id}/edit?${this.getFiltersURL()}`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${cidade.id}/delete?${this.getFiltersURL()}`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.cidade.home.notFound">No Cidades found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={cidadeList && cidadeList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ cidade, ...storeState }: IRootState) => ({
  ufs: storeState.uf.entities,
  cidadeList: cidade.entities,
  totalItems: cidade.totalItems
});

const mapDispatchToProps = {
  getUfs,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Cidade);
