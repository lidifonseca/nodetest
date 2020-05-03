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
import { getEntities } from './cepbr-cidade.reducer';
import { ICepbrCidade } from 'app/shared/model/cepbr-cidade.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { ICepbrEstado } from 'app/shared/model/cepbr-estado.model';
import { getEntities as getCepbrEstados } from 'app/entities/cepbr-estado/cepbr-estado.reducer';

export interface ICepbrCidadeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ICepbrCidadeBaseState {
  idCidade: any;
  cidade: any;
  codIbge: any;
  area: any;
  cepbrBairro: any;
  cepbrEndereco: any;
  uf: any;
}
export interface ICepbrCidadeState extends ICepbrCidadeBaseState, IPaginationBaseState {}

export class CepbrCidade extends React.Component<ICepbrCidadeProps, ICepbrCidadeState> {
  private myFormRef: any;

  constructor(props: ICepbrCidadeProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getCepbrCidadeState(this.props.location)
    };
  }

  getCepbrCidadeState = (location): ICepbrCidadeBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const idCidade = url.searchParams.get('idCidade') || '';
    const cidade = url.searchParams.get('cidade') || '';
    const codIbge = url.searchParams.get('codIbge') || '';
    const area = url.searchParams.get('area') || '';

    const cepbrBairro = url.searchParams.get('cepbrBairro') || '';
    const cepbrEndereco = url.searchParams.get('cepbrEndereco') || '';
    const uf = url.searchParams.get('uf') || '';

    return {
      idCidade,
      cidade,
      codIbge,
      area,
      cepbrBairro,
      cepbrEndereco,
      uf
    };
  };

  componentDidMount() {
    this.getEntities();

    this.props.getCepbrEstados();
  }

  cancelCourse = () => {
    this.setState(
      {
        idCidade: '',
        cidade: '',
        codIbge: '',
        area: '',
        cepbrBairro: '',
        cepbrEndereco: '',
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
      'idCidade=' +
      this.state.idCidade +
      '&' +
      'cidade=' +
      this.state.cidade +
      '&' +
      'codIbge=' +
      this.state.codIbge +
      '&' +
      'area=' +
      this.state.area +
      '&' +
      'cepbrBairro=' +
      this.state.cepbrBairro +
      '&' +
      'cepbrEndereco=' +
      this.state.cepbrEndereco +
      '&' +
      'uf=' +
      this.state.uf +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idCidade, cidade, codIbge, area, cepbrBairro, cepbrEndereco, uf, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(
      idCidade,
      cidade,
      codIbge,
      area,
      cepbrBairro,
      cepbrEndereco,
      uf,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { cepbrEstados, cepbrCidadeList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Cepbr Cidades</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Cepbr Cidades</span>
              <Button id="togglerFilterCepbrCidade" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.cepbrCidade.home.createLabel">Create a new Cepbr Cidade</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterCepbrCidade">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="idCidadeLabel" for="cepbr-cidade-idCidade">
                            <Translate contentKey="generadorApp.cepbrCidade.idCidade">Id Cidade</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="idCidade"
                            id="cepbr-cidade-idCidade"
                            value={this.state.idCidade}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cidadeLabel" for="cepbr-cidade-cidade">
                            <Translate contentKey="generadorApp.cepbrCidade.cidade">Cidade</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="cidade"
                            id="cepbr-cidade-cidade"
                            value={this.state.cidade}
                            validate={{
                              maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="codIbgeLabel" for="cepbr-cidade-codIbge">
                            <Translate contentKey="generadorApp.cepbrCidade.codIbge">Cod Ibge</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="codIbge"
                            id="cepbr-cidade-codIbge"
                            value={this.state.codIbge}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="areaLabel" for="cepbr-cidade-area">
                            <Translate contentKey="generadorApp.cepbrCidade.area">Area</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="area"
                            id="cepbr-cidade-area"
                            value={this.state.area}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="cepbr-cidade-uf">
                              <Translate contentKey="generadorApp.cepbrCidade.uf">Uf</Translate>
                            </Label>
                            <AvInput id="cepbr-cidade-uf" type="select" className="form-control" name="ufId">
                              <option value="" key="0" />
                              {cepbrEstados
                                ? cepbrEstados.map(otherEntity => (
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

              {cepbrCidadeList && cepbrCidadeList.length > 0 ? (
                <Table responsive aria-describedby="cepbr-cidade-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idCidade')}>
                        <Translate contentKey="generadorApp.cepbrCidade.idCidade">Id Cidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cidade')}>
                        <Translate contentKey="generadorApp.cepbrCidade.cidade">Cidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('codIbge')}>
                        <Translate contentKey="generadorApp.cepbrCidade.codIbge">Cod Ibge</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('area')}>
                        <Translate contentKey="generadorApp.cepbrCidade.area">Area</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.cepbrCidade.uf">Uf</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {cepbrCidadeList.map((cepbrCidade, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${cepbrCidade.id}`} color="link" size="sm">
                            {cepbrCidade.id}
                          </Button>
                        </td>

                        <td>{cepbrCidade.idCidade}</td>

                        <td>{cepbrCidade.cidade}</td>

                        <td>{cepbrCidade.codIbge}</td>

                        <td>{cepbrCidade.area}</td>
                        <td>{cepbrCidade.uf ? <Link to={`cepbr-estado/${cepbrCidade.uf.id}`}>{cepbrCidade.uf.id}</Link> : ''}</td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${cepbrCidade.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${cepbrCidade.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${cepbrCidade.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.cepbrCidade.home.notFound">No Cepbr Cidades found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={cepbrCidadeList && cepbrCidadeList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ cepbrCidade, ...storeState }: IRootState) => ({
  cepbrEstados: storeState.cepbrEstado.entities,
  cepbrCidadeList: cepbrCidade.entities,
  totalItems: cepbrCidade.totalItems
});

const mapDispatchToProps = {
  getCepbrEstados,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CepbrCidade);
