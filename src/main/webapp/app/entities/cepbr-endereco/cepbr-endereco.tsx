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
import { getCepbrEnderecoState, ICepbrEnderecoBaseState, getEntities } from './cepbr-endereco.reducer';
import { ICepbrEndereco } from 'app/shared/model/cepbr-endereco.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ICepbrEnderecoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ICepbrEnderecoState extends ICepbrEnderecoBaseState, IPaginationBaseState {}

export class CepbrEndereco extends React.Component<ICepbrEnderecoProps, ICepbrEnderecoState> {
  private myFormRef: any;

  constructor(props: ICepbrEnderecoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getCepbrEnderecoState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        cep: '',
        logradouro: '',
        tipoLogradouro: '',
        complemento: '',
        local: ''
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
      'cep=' +
      this.state.cep +
      '&' +
      'logradouro=' +
      this.state.logradouro +
      '&' +
      'tipoLogradouro=' +
      this.state.tipoLogradouro +
      '&' +
      'complemento=' +
      this.state.complemento +
      '&' +
      'local=' +
      this.state.local +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { cep, logradouro, tipoLogradouro, complemento, local, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(cep, logradouro, tipoLogradouro, complemento, local, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { cepbrEnderecoList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Cepbr Enderecos</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Cepbr Enderecos</span>
              <Button id="togglerFilterCepbrEndereco" className="btn btn-primary float-right jh-create-entity">
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
                <Translate contentKey="generadorApp.cepbrEndereco.home.createLabel">Create a new Cepbr Endereco</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterCepbrEndereco">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'cep' ? (
                        <Col md="3">
                          <Row>
                            <Label id="cepLabel" for="cepbr-endereco-cep">
                              <Translate contentKey="generadorApp.cepbrEndereco.cep">Cep</Translate>
                            </Label>

                            <AvInput type="text" name="cep" id="cepbr-endereco-cep" value={this.state.cep} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'logradouro' ? (
                        <Col md="3">
                          <Row>
                            <Label id="logradouroLabel" for="cepbr-endereco-logradouro">
                              <Translate contentKey="generadorApp.cepbrEndereco.logradouro">Logradouro</Translate>
                            </Label>

                            <AvInput type="text" name="logradouro" id="cepbr-endereco-logradouro" value={this.state.logradouro} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'tipoLogradouro' ? (
                        <Col md="3">
                          <Row>
                            <Label id="tipoLogradouroLabel" for="cepbr-endereco-tipoLogradouro">
                              <Translate contentKey="generadorApp.cepbrEndereco.tipoLogradouro">Tipo Logradouro</Translate>
                            </Label>

                            <AvInput
                              type="text"
                              name="tipoLogradouro"
                              id="cepbr-endereco-tipoLogradouro"
                              value={this.state.tipoLogradouro}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'complemento' ? (
                        <Col md="3">
                          <Row>
                            <Label id="complementoLabel" for="cepbr-endereco-complemento">
                              <Translate contentKey="generadorApp.cepbrEndereco.complemento">Complemento</Translate>
                            </Label>

                            <AvInput type="text" name="complemento" id="cepbr-endereco-complemento" value={this.state.complemento} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'local' ? (
                        <Col md="3">
                          <Row>
                            <Label id="localLabel" for="cepbr-endereco-local">
                              <Translate contentKey="generadorApp.cepbrEndereco.local">Local</Translate>
                            </Label>

                            <AvInput type="text" name="local" id="cepbr-endereco-local" value={this.state.local} />
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

              {cepbrEnderecoList && cepbrEnderecoList.length > 0 ? (
                <Table responsive aria-describedby="cepbr-endereco-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'cep' ? (
                        <th className="hand" onClick={this.sort('cep')}>
                          <Translate contentKey="generadorApp.cepbrEndereco.cep">Cep</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'logradouro' ? (
                        <th className="hand" onClick={this.sort('logradouro')}>
                          <Translate contentKey="generadorApp.cepbrEndereco.logradouro">Logradouro</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'tipoLogradouro' ? (
                        <th className="hand" onClick={this.sort('tipoLogradouro')}>
                          <Translate contentKey="generadorApp.cepbrEndereco.tipoLogradouro">Tipo Logradouro</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'complemento' ? (
                        <th className="hand" onClick={this.sort('complemento')}>
                          <Translate contentKey="generadorApp.cepbrEndereco.complemento">Complemento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'local' ? (
                        <th className="hand" onClick={this.sort('local')}>
                          <Translate contentKey="generadorApp.cepbrEndereco.local">Local</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {cepbrEnderecoList.map((cepbrEndereco, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${cepbrEndereco.id}`} color="link" size="sm">
                            {cepbrEndereco.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'cep' ? <td>{cepbrEndereco.cep}</td> : null}

                        {this.state.baseFilters !== 'logradouro' ? <td>{cepbrEndereco.logradouro}</td> : null}

                        {this.state.baseFilters !== 'tipoLogradouro' ? <td>{cepbrEndereco.tipoLogradouro}</td> : null}

                        {this.state.baseFilters !== 'complemento' ? <td>{cepbrEndereco.complemento}</td> : null}

                        {this.state.baseFilters !== 'local' ? <td>{cepbrEndereco.local}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${cepbrEndereco.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${cepbrEndereco.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${cepbrEndereco.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.cepbrEndereco.home.notFound">No Cepbr Enderecos found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={cepbrEnderecoList && cepbrEnderecoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ cepbrEndereco, ...storeState }: IRootState) => ({
  cepbrEnderecoList: cepbrEndereco.entities,
  totalItems: cepbrEndereco.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CepbrEndereco);
