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
import { getEntities } from './cepbr-bairro.reducer';
import { ICepbrBairro } from 'app/shared/model/cepbr-bairro.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { ICepbrCidade } from 'app/shared/model/cepbr-cidade.model';
import { getEntities as getCepbrCidades } from 'app/entities/cepbr-cidade/cepbr-cidade.reducer';

export interface ICepbrBairroProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ICepbrBairroBaseState {
  idBairro: any;
  bairro: any;
  cepbrEndereco: any;
  idCidade: any;
}
export interface ICepbrBairroState extends ICepbrBairroBaseState, IPaginationBaseState {}

export class CepbrBairro extends React.Component<ICepbrBairroProps, ICepbrBairroState> {
  private myFormRef: any;

  constructor(props: ICepbrBairroProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getCepbrBairroState(this.props.location)
    };
  }

  getCepbrBairroState = (location): ICepbrBairroBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const idBairro = url.searchParams.get('idBairro') || '';
    const bairro = url.searchParams.get('bairro') || '';

    const cepbrEndereco = url.searchParams.get('cepbrEndereco') || '';
    const idCidade = url.searchParams.get('idCidade') || '';

    return {
      idBairro,
      bairro,
      cepbrEndereco,
      idCidade
    };
  };

  componentDidMount() {
    this.getEntities();

    this.props.getCepbrCidades();
  }

  cancelCourse = () => {
    this.setState(
      {
        idBairro: '',
        bairro: '',
        cepbrEndereco: '',
        idCidade: ''
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
      'idBairro=' +
      this.state.idBairro +
      '&' +
      'bairro=' +
      this.state.bairro +
      '&' +
      'cepbrEndereco=' +
      this.state.cepbrEndereco +
      '&' +
      'idCidade=' +
      this.state.idCidade +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idBairro, bairro, cepbrEndereco, idCidade, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(idBairro, bairro, cepbrEndereco, idCidade, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { cepbrCidades, cepbrBairroList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Cepbr Bairros</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Cepbr Bairros</span>
              <Button id="togglerFilterCepbrBairro" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.cepbrBairro.home.createLabel">Create a new Cepbr Bairro</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterCepbrBairro">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="idBairroLabel" for="cepbr-bairro-idBairro">
                            <Translate contentKey="generadorApp.cepbrBairro.idBairro">Id Bairro</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="idBairro"
                            id="cepbr-bairro-idBairro"
                            value={this.state.idBairro}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="bairroLabel" for="cepbr-bairro-bairro">
                            <Translate contentKey="generadorApp.cepbrBairro.bairro">Bairro</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="bairro"
                            id="cepbr-bairro-bairro"
                            value={this.state.bairro}
                            validate={{
                              maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
                            }}
                          />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="cepbr-bairro-idCidade">
                              <Translate contentKey="generadorApp.cepbrBairro.idCidade">Id Cidade</Translate>
                            </Label>
                            <AvInput id="cepbr-bairro-idCidade" type="select" className="form-control" name="idCidadeId">
                              <option value="" key="0" />
                              {cepbrCidades
                                ? cepbrCidades.map(otherEntity => (
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

              {cepbrBairroList && cepbrBairroList.length > 0 ? (
                <Table responsive aria-describedby="cepbr-bairro-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idBairro')}>
                        <Translate contentKey="generadorApp.cepbrBairro.idBairro">Id Bairro</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('bairro')}>
                        <Translate contentKey="generadorApp.cepbrBairro.bairro">Bairro</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.cepbrBairro.idCidade">Id Cidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {cepbrBairroList.map((cepbrBairro, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${cepbrBairro.id}`} color="link" size="sm">
                            {cepbrBairro.id}
                          </Button>
                        </td>

                        <td>{cepbrBairro.idBairro}</td>

                        <td>{cepbrBairro.bairro}</td>
                        <td>
                          {cepbrBairro.idCidade ? (
                            <Link to={`cepbr-cidade/${cepbrBairro.idCidade.id}`}>{cepbrBairro.idCidade.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${cepbrBairro.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${cepbrBairro.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${cepbrBairro.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.cepbrBairro.home.notFound">No Cepbr Bairros found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={cepbrBairroList && cepbrBairroList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ cepbrBairro, ...storeState }: IRootState) => ({
  cepbrCidades: storeState.cepbrCidade.entities,
  cepbrBairroList: cepbrBairro.entities,
  totalItems: cepbrBairro.totalItems
});

const mapDispatchToProps = {
  getCepbrCidades,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CepbrBairro);
