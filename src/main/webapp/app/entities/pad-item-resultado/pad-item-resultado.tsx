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
import { getPadItemResultadoState, IPadItemResultadoBaseState, getEntities } from './pad-item-resultado.reducer';
import { IPadItemResultado } from 'app/shared/model/pad-item-resultado.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IPadItem } from 'app/shared/model/pad-item.model';
import { getEntities as getPadItems } from 'app/entities/pad-item/pad-item.reducer';

export interface IPadItemResultadoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPadItemResultadoState extends IPadItemResultadoBaseState, IPaginationBaseState {}

export class PadItemResultado extends React.Component<IPadItemResultadoProps, IPadItemResultadoState> {
  private myFormRef: any;

  constructor(props: IPadItemResultadoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getPadItemResultadoState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getPadItems();
  }

  cancelCourse = () => {
    this.setState(
      {
        resultado: '',
        dataFim: '',
        resultadoAnalisado: '',
        usuarioId: '',
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
      'resultado=' +
      this.state.resultado +
      '&' +
      'dataFim=' +
      this.state.dataFim +
      '&' +
      'resultadoAnalisado=' +
      this.state.resultadoAnalisado +
      '&' +
      'usuarioId=' +
      this.state.usuarioId +
      '&' +
      'padItem=' +
      this.state.padItem +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { resultado, dataFim, resultadoAnalisado, usuarioId, padItem, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(resultado, dataFim, resultadoAnalisado, usuarioId, padItem, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { padItems, padItemResultadoList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Pad Item Resultados</span>
          <Button id="togglerFilterPadItemResultado" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.padItemResultado.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.padItemResultado.home.createLabel">Create a new Pad Item Resultado</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Item Resultados</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPadItemResultado">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'resultado' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="resultadoLabel" for="pad-item-resultado-resultado">
                              <Translate contentKey="generadorApp.padItemResultado.resultado">Resultado</Translate>
                            </Label>
                            <AvInput id="pad-item-resultado-resultado" type="textarea" name="resultado" />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dataFim' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="dataFimLabel" for="pad-item-resultado-dataFim">
                              <Translate contentKey="generadorApp.padItemResultado.dataFim">Data Fim</Translate>
                            </Label>
                            <AvInput type="date" name="dataFim" id="pad-item-resultado-dataFim" value={this.state.dataFim} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'resultadoAnalisado' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="resultadoAnalisadoLabel" check>
                              <AvInput
                                id="pad-item-resultado-resultadoAnalisado"
                                type="checkbox"
                                className="form-control"
                                name="resultadoAnalisado"
                              />
                              <Translate contentKey="generadorApp.padItemResultado.resultadoAnalisado">Resultado Analisado</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'usuarioId' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="usuarioIdLabel" for="pad-item-resultado-usuarioId">
                              <Translate contentKey="generadorApp.padItemResultado.usuarioId">Usuario Id</Translate>
                            </Label>
                            <AvInput type="string" name="usuarioId" id="pad-item-resultado-usuarioId" value={this.state.usuarioId} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'padItem' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="pad-item-resultado-padItem">
                                <Translate contentKey="generadorApp.padItemResultado.padItem">Pad Item</Translate>
                              </Label>
                              <Select
                                id="pad-item-resultado-padItem"
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
                        <Translate contentKey="generadorApp.padItemResultado.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.padItemResultado.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {padItemResultadoList && padItemResultadoList.length > 0 ? (
                <Table responsive aria-describedby="pad-item-resultado-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'resultado' ? (
                        <th className="hand" onClick={this.sort('resultado')}>
                          <Translate contentKey="generadorApp.padItemResultado.resultado">Resultado</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'dataFim' ? (
                        <th className="hand" onClick={this.sort('dataFim')}>
                          <Translate contentKey="generadorApp.padItemResultado.dataFim">Data Fim</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'resultadoAnalisado' ? (
                        <th className="hand" onClick={this.sort('resultadoAnalisado')}>
                          <Translate contentKey="generadorApp.padItemResultado.resultadoAnalisado">Resultado Analisado</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'usuarioId' ? (
                        <th className="hand" onClick={this.sort('usuarioId')}>
                          <Translate contentKey="generadorApp.padItemResultado.usuarioId">Usuario Id</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'padItem' ? (
                        <th>
                          <Translate contentKey="generadorApp.padItemResultado.padItem">Pad Item</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {padItemResultadoList.map((padItemResultado, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${padItemResultado.id}`} color="link" size="sm">
                            {padItemResultado.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'resultado' ? (
                          <td>{padItemResultado.resultado ? Buffer.from(padItemResultado.resultado).toString() : null}</td>
                        ) : null}

                        {this.state.baseFilters !== 'dataFim' ? (
                          <td>
                            <TextFormat type="date" value={padItemResultado.dataFim} format={APP_LOCAL_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'resultadoAnalisado' ? (
                          <td>{padItemResultado.resultadoAnalisado ? 'true' : 'false'}</td>
                        ) : null}

                        {this.state.baseFilters !== 'usuarioId' ? <td>{padItemResultado.usuarioId}</td> : null}

                        {this.state.baseFilters !== 'padItem' ? (
                          <td>
                            {padItemResultado.padItem ? (
                              <Link to={`pad-item/${padItemResultado.padItem.id}`}>{padItemResultado.padItem.id}</Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${padItemResultado.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${padItemResultado.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${padItemResultado.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.padItemResultado.home.notFound">No Pad Item Resultados found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={padItemResultadoList && padItemResultadoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ padItemResultado, ...storeState }: IRootState) => ({
  padItems: storeState.padItem.entities,
  padItemResultadoList: padItemResultado.entities,
  totalItems: padItemResultado.totalItems
});

const mapDispatchToProps = {
  getPadItems,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadItemResultado);
