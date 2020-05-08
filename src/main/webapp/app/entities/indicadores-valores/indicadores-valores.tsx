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
import { getIndicadoresValoresState, IIndicadoresValoresBaseState, getEntities } from './indicadores-valores.reducer';
import { IIndicadoresValores } from 'app/shared/model/indicadores-valores.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IIndicadoresValoresProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IIndicadoresValoresState extends IIndicadoresValoresBaseState, IPaginationBaseState {}

export class IndicadoresValores extends React.Component<IIndicadoresValoresProps, IIndicadoresValoresState> {
  private myFormRef: any;

  constructor(props: IIndicadoresValoresProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getIndicadoresValoresState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        sexo: '',
        vlMinimo: '',
        vlMaximo: '',
        unidadeMedida: '',
        idadeMinima: '',
        idadeMaxima: ''
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
      'sexo=' +
      this.state.sexo +
      '&' +
      'vlMinimo=' +
      this.state.vlMinimo +
      '&' +
      'vlMaximo=' +
      this.state.vlMaximo +
      '&' +
      'unidadeMedida=' +
      this.state.unidadeMedida +
      '&' +
      'idadeMinima=' +
      this.state.idadeMinima +
      '&' +
      'idadeMaxima=' +
      this.state.idadeMaxima +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { sexo, vlMinimo, vlMaximo, unidadeMedida, idadeMinima, idadeMaxima, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(
      sexo,
      vlMinimo,
      vlMaximo,
      unidadeMedida,
      idadeMinima,
      idadeMaxima,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { indicadoresValoresList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Indicadores Valores</span>
          <Button id="togglerFilterIndicadoresValores" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.indicadoresValores.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.indicadoresValores.home.createLabel">Create a new Indicadores Valores</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Indicadores Valores</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterIndicadoresValores">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'sexo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="sexoLabel" for="indicadores-valores-sexo">
                              <Translate contentKey="generadorApp.indicadoresValores.sexo">Sexo</Translate>
                            </Label>

                            <AvInput type="text" name="sexo" id="indicadores-valores-sexo" value={this.state.sexo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'vlMinimo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="vlMinimoLabel" for="indicadores-valores-vlMinimo">
                              <Translate contentKey="generadorApp.indicadoresValores.vlMinimo">Vl Minimo</Translate>
                            </Label>

                            <AvInput type="text" name="vlMinimo" id="indicadores-valores-vlMinimo" value={this.state.vlMinimo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'vlMaximo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="vlMaximoLabel" for="indicadores-valores-vlMaximo">
                              <Translate contentKey="generadorApp.indicadoresValores.vlMaximo">Vl Maximo</Translate>
                            </Label>

                            <AvInput type="text" name="vlMaximo" id="indicadores-valores-vlMaximo" value={this.state.vlMaximo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'unidadeMedida' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="unidadeMedidaLabel" for="indicadores-valores-unidadeMedida">
                              <Translate contentKey="generadorApp.indicadoresValores.unidadeMedida">Unidade Medida</Translate>
                            </Label>

                            <AvInput
                              type="text"
                              name="unidadeMedida"
                              id="indicadores-valores-unidadeMedida"
                              value={this.state.unidadeMedida}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idadeMinima' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idadeMinimaLabel" for="indicadores-valores-idadeMinima">
                              <Translate contentKey="generadorApp.indicadoresValores.idadeMinima">Idade Minima</Translate>
                            </Label>

                            <AvInput type="text" name="idadeMinima" id="indicadores-valores-idadeMinima" value={this.state.idadeMinima} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idadeMaxima' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idadeMaximaLabel" for="indicadores-valores-idadeMaxima">
                              <Translate contentKey="generadorApp.indicadoresValores.idadeMaxima">Idade Maxima</Translate>
                            </Label>

                            <AvInput type="text" name="idadeMaxima" id="indicadores-valores-idadeMaxima" value={this.state.idadeMaxima} />
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.indicadoresValores.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.indicadoresValores.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {indicadoresValoresList && indicadoresValoresList.length > 0 ? (
                <Table responsive aria-describedby="indicadores-valores-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'sexo' ? (
                        <th className="hand" onClick={this.sort('sexo')}>
                          <Translate contentKey="generadorApp.indicadoresValores.sexo">Sexo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'vlMinimo' ? (
                        <th className="hand" onClick={this.sort('vlMinimo')}>
                          <Translate contentKey="generadorApp.indicadoresValores.vlMinimo">Vl Minimo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'vlMaximo' ? (
                        <th className="hand" onClick={this.sort('vlMaximo')}>
                          <Translate contentKey="generadorApp.indicadoresValores.vlMaximo">Vl Maximo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'unidadeMedida' ? (
                        <th className="hand" onClick={this.sort('unidadeMedida')}>
                          <Translate contentKey="generadorApp.indicadoresValores.unidadeMedida">Unidade Medida</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idadeMinima' ? (
                        <th className="hand" onClick={this.sort('idadeMinima')}>
                          <Translate contentKey="generadorApp.indicadoresValores.idadeMinima">Idade Minima</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idadeMaxima' ? (
                        <th className="hand" onClick={this.sort('idadeMaxima')}>
                          <Translate contentKey="generadorApp.indicadoresValores.idadeMaxima">Idade Maxima</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {indicadoresValoresList.map((indicadoresValores, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${indicadoresValores.id}`} color="link" size="sm">
                            {indicadoresValores.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'sexo' ? <td>{indicadoresValores.sexo}</td> : null}

                        {this.state.baseFilters !== 'vlMinimo' ? <td>{indicadoresValores.vlMinimo}</td> : null}

                        {this.state.baseFilters !== 'vlMaximo' ? <td>{indicadoresValores.vlMaximo}</td> : null}

                        {this.state.baseFilters !== 'unidadeMedida' ? <td>{indicadoresValores.unidadeMedida}</td> : null}

                        {this.state.baseFilters !== 'idadeMinima' ? <td>{indicadoresValores.idadeMinima}</td> : null}

                        {this.state.baseFilters !== 'idadeMaxima' ? <td>{indicadoresValores.idadeMaxima}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${indicadoresValores.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${indicadoresValores.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${indicadoresValores.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.indicadoresValores.home.notFound">No Indicadores Valores found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={indicadoresValoresList && indicadoresValoresList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ indicadoresValores, ...storeState }: IRootState) => ({
  indicadoresValoresList: indicadoresValores.entities,
  totalItems: indicadoresValores.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(IndicadoresValores);
