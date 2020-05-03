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
import { getEntities } from './indicadores-valores.reducer';
import { IIndicadoresValores } from 'app/shared/model/indicadores-valores.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IIndicadores } from 'app/shared/model/indicadores.model';
import { getEntities as getIndicadores } from 'app/entities/indicadores/indicadores.reducer';

export interface IIndicadoresValoresProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IIndicadoresValoresBaseState {
  sexo: any;
  vlMinimo: any;
  vlMaximo: any;
  unidadeMedida: any;
  idadeMinima: any;
  idadeMaxima: any;
  indicadoresId: any;
}
export interface IIndicadoresValoresState extends IIndicadoresValoresBaseState, IPaginationBaseState {}

export class IndicadoresValores extends React.Component<IIndicadoresValoresProps, IIndicadoresValoresState> {
  private myFormRef: any;

  constructor(props: IIndicadoresValoresProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getIndicadoresValoresState(this.props.location)
    };
  }

  getIndicadoresValoresState = (location): IIndicadoresValoresBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const sexo = url.searchParams.get('sexo') || '';
    const vlMinimo = url.searchParams.get('vlMinimo') || '';
    const vlMaximo = url.searchParams.get('vlMaximo') || '';
    const unidadeMedida = url.searchParams.get('unidadeMedida') || '';
    const idadeMinima = url.searchParams.get('idadeMinima') || '';
    const idadeMaxima = url.searchParams.get('idadeMaxima') || '';

    const indicadoresId = url.searchParams.get('indicadoresId') || '';

    return {
      sexo,
      vlMinimo,
      vlMaximo,
      unidadeMedida,
      idadeMinima,
      idadeMaxima,
      indicadoresId
    };
  };

  componentDidMount() {
    this.getEntities();

    this.props.getIndicadores();
  }

  cancelCourse = () => {
    this.setState(
      {
        sexo: '',
        vlMinimo: '',
        vlMaximo: '',
        unidadeMedida: '',
        idadeMinima: '',
        idadeMaxima: '',
        indicadoresId: ''
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
      'indicadoresId=' +
      this.state.indicadoresId +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      sexo,
      vlMinimo,
      vlMaximo,
      unidadeMedida,
      idadeMinima,
      idadeMaxima,
      indicadoresId,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      sexo,
      vlMinimo,
      vlMaximo,
      unidadeMedida,
      idadeMinima,
      idadeMaxima,
      indicadoresId,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { indicadores, indicadoresValoresList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Indicadores Valores</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Indicadores Valores</span>
              <Button id="togglerFilterIndicadoresValores" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.indicadoresValores.home.createLabel">Create a new Indicadores Valores</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterIndicadoresValores">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="sexoLabel" for="indicadores-valores-sexo">
                            <Translate contentKey="generadorApp.indicadoresValores.sexo">Sexo</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="sexo"
                            id="indicadores-valores-sexo"
                            value={this.state.sexo}
                            validate={{
                              maxLength: { value: 45, errorMessage: translate('entity.validation.maxlength', { max: 45 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="vlMinimoLabel" for="indicadores-valores-vlMinimo">
                            <Translate contentKey="generadorApp.indicadoresValores.vlMinimo">Vl Minimo</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="vlMinimo"
                            id="indicadores-valores-vlMinimo"
                            value={this.state.vlMinimo}
                            validate={{
                              maxLength: { value: 45, errorMessage: translate('entity.validation.maxlength', { max: 45 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="vlMaximoLabel" for="indicadores-valores-vlMaximo">
                            <Translate contentKey="generadorApp.indicadoresValores.vlMaximo">Vl Maximo</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="vlMaximo"
                            id="indicadores-valores-vlMaximo"
                            value={this.state.vlMaximo}
                            validate={{
                              maxLength: { value: 45, errorMessage: translate('entity.validation.maxlength', { max: 45 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="unidadeMedidaLabel" for="indicadores-valores-unidadeMedida">
                            <Translate contentKey="generadorApp.indicadoresValores.unidadeMedida">Unidade Medida</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="unidadeMedida"
                            id="indicadores-valores-unidadeMedida"
                            value={this.state.unidadeMedida}
                            validate={{
                              maxLength: { value: 45, errorMessage: translate('entity.validation.maxlength', { max: 45 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idadeMinimaLabel" for="indicadores-valores-idadeMinima">
                            <Translate contentKey="generadorApp.indicadoresValores.idadeMinima">Idade Minima</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="idadeMinima"
                            id="indicadores-valores-idadeMinima"
                            value={this.state.idadeMinima}
                            validate={{
                              maxLength: { value: 45, errorMessage: translate('entity.validation.maxlength', { max: 45 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idadeMaximaLabel" for="indicadores-valores-idadeMaxima">
                            <Translate contentKey="generadorApp.indicadoresValores.idadeMaxima">Idade Maxima</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="idadeMaxima"
                            id="indicadores-valores-idadeMaxima"
                            value={this.state.idadeMaxima}
                            validate={{
                              maxLength: { value: 45, errorMessage: translate('entity.validation.maxlength', { max: 45 }) }
                            }}
                          />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="indicadores-valores-indicadoresId">
                              <Translate contentKey="generadorApp.indicadoresValores.indicadoresId">Indicadores Id</Translate>
                            </Label>
                            <AvInput id="indicadores-valores-indicadoresId" type="select" className="form-control" name="indicadoresIdId">
                              <option value="" key="0" />
                              {indicadores
                                ? indicadores.map(otherEntity => (
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

              {indicadoresValoresList && indicadoresValoresList.length > 0 ? (
                <Table responsive aria-describedby="indicadores-valores-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('sexo')}>
                        <Translate contentKey="generadorApp.indicadoresValores.sexo">Sexo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('vlMinimo')}>
                        <Translate contentKey="generadorApp.indicadoresValores.vlMinimo">Vl Minimo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('vlMaximo')}>
                        <Translate contentKey="generadorApp.indicadoresValores.vlMaximo">Vl Maximo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('unidadeMedida')}>
                        <Translate contentKey="generadorApp.indicadoresValores.unidadeMedida">Unidade Medida</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idadeMinima')}>
                        <Translate contentKey="generadorApp.indicadoresValores.idadeMinima">Idade Minima</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idadeMaxima')}>
                        <Translate contentKey="generadorApp.indicadoresValores.idadeMaxima">Idade Maxima</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.indicadoresValores.indicadoresId">Indicadores Id</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

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

                        <td>{indicadoresValores.sexo}</td>

                        <td>{indicadoresValores.vlMinimo}</td>

                        <td>{indicadoresValores.vlMaximo}</td>

                        <td>{indicadoresValores.unidadeMedida}</td>

                        <td>{indicadoresValores.idadeMinima}</td>

                        <td>{indicadoresValores.idadeMaxima}</td>
                        <td>
                          {indicadoresValores.indicadoresId ? (
                            <Link to={`indicadores/${indicadoresValores.indicadoresId.id}`}>{indicadoresValores.indicadoresId.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${indicadoresValores.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${indicadoresValores.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${indicadoresValores.id}/delete`} color="danger" size="sm">
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
  indicadores: storeState.indicadores.entities,
  indicadoresValoresList: indicadoresValores.entities,
  totalItems: indicadoresValores.totalItems
});

const mapDispatchToProps = {
  getIndicadores,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(IndicadoresValores);
