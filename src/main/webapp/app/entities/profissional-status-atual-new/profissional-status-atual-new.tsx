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
import {
  byteSize,
  Translate,
  translate,
  ICrudGetAllAction,
  getSortState,
  IPaginationBaseState,
  JhiPagination,
  JhiItemCount
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './profissional-status-atual-new.reducer';
import { IProfissionalStatusAtualNew } from 'app/shared/model/profissional-status-atual-new.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IProfissionalStatusAtualNewProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IProfissionalStatusAtualNewBaseState {
  idProfissional: any;
  idStatusAtualProf: any;
  obs: any;
  ativo: any;
  idUsuario: any;
}
export interface IProfissionalStatusAtualNewState extends IProfissionalStatusAtualNewBaseState, IPaginationBaseState {}

export class ProfissionalStatusAtualNew extends React.Component<IProfissionalStatusAtualNewProps, IProfissionalStatusAtualNewState> {
  private myFormRef: any;

  constructor(props: IProfissionalStatusAtualNewProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getProfissionalStatusAtualNewState(this.props.location)
    };
  }

  getProfissionalStatusAtualNewState = (location): IProfissionalStatusAtualNewBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const idProfissional = url.searchParams.get('idProfissional') || '';
    const idStatusAtualProf = url.searchParams.get('idStatusAtualProf') || '';
    const obs = url.searchParams.get('obs') || '';
    const ativo = url.searchParams.get('ativo') || '';
    const idUsuario = url.searchParams.get('idUsuario') || '';

    return {
      idProfissional,
      idStatusAtualProf,
      obs,
      ativo,
      idUsuario
    };
  };

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idProfissional: '',
        idStatusAtualProf: '',
        obs: '',
        ativo: '',
        idUsuario: ''
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
      'idProfissional=' +
      this.state.idProfissional +
      '&' +
      'idStatusAtualProf=' +
      this.state.idStatusAtualProf +
      '&' +
      'obs=' +
      this.state.obs +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'idUsuario=' +
      this.state.idUsuario +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idProfissional, idStatusAtualProf, obs, ativo, idUsuario, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(idProfissional, idStatusAtualProf, obs, ativo, idUsuario, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { profissionalStatusAtualNewList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Profissional Status Atual News</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Profissional Status Atual News</span>
              <Button id="togglerFilterProfissionalStatusAtualNew" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.profissionalStatusAtualNew.home.createLabel">
                  Create a new Profissional Status Atual New
                </Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterProfissionalStatusAtualNew">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="idProfissionalLabel" for="profissional-status-atual-new-idProfissional">
                            <Translate contentKey="generadorApp.profissionalStatusAtualNew.idProfissional">Id Profissional</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="idProfissional"
                            id="profissional-status-atual-new-idProfissional"
                            value={this.state.idProfissional}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idStatusAtualProfLabel" for="profissional-status-atual-new-idStatusAtualProf">
                            <Translate contentKey="generadorApp.profissionalStatusAtualNew.idStatusAtualProf">
                              Id Status Atual Prof
                            </Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="idStatusAtualProf"
                            id="profissional-status-atual-new-idStatusAtualProf"
                            value={this.state.idStatusAtualProf}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="obsLabel" for="profissional-status-atual-new-obs">
                            <Translate contentKey="generadorApp.profissionalStatusAtualNew.obs">Obs</Translate>
                          </Label>
                          <AvInput id="profissional-status-atual-new-obs" type="textarea" name="obs" />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="profissional-status-atual-new-ativo">
                            <Translate contentKey="generadorApp.profissionalStatusAtualNew.ativo">Ativo</Translate>
                          </Label>
                          <AvInput type="string" name="ativo" id="profissional-status-atual-new-ativo" value={this.state.ativo} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idUsuarioLabel" for="profissional-status-atual-new-idUsuario">
                            <Translate contentKey="generadorApp.profissionalStatusAtualNew.idUsuario">Id Usuario</Translate>
                          </Label>

                          <AvInput type="text" name="idUsuario" id="profissional-status-atual-new-idUsuario" value={this.state.idUsuario} />
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

              {profissionalStatusAtualNewList && profissionalStatusAtualNewList.length > 0 ? (
                <Table responsive aria-describedby="profissional-status-atual-new-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idProfissional')}>
                        <Translate contentKey="generadorApp.profissionalStatusAtualNew.idProfissional">Id Profissional</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idStatusAtualProf')}>
                        <Translate contentKey="generadorApp.profissionalStatusAtualNew.idStatusAtualProf">Id Status Atual Prof</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('obs')}>
                        <Translate contentKey="generadorApp.profissionalStatusAtualNew.obs">Obs</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.profissionalStatusAtualNew.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idUsuario')}>
                        <Translate contentKey="generadorApp.profissionalStatusAtualNew.idUsuario">Id Usuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {profissionalStatusAtualNewList.map((profissionalStatusAtualNew, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${profissionalStatusAtualNew.id}`} color="link" size="sm">
                            {profissionalStatusAtualNew.id}
                          </Button>
                        </td>

                        <td>{profissionalStatusAtualNew.idProfissional}</td>

                        <td>{profissionalStatusAtualNew.idStatusAtualProf}</td>

                        <td>{profissionalStatusAtualNew.obs}</td>

                        <td>{profissionalStatusAtualNew.ativo}</td>

                        <td>{profissionalStatusAtualNew.idUsuario}</td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${profissionalStatusAtualNew.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${profissionalStatusAtualNew.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${profissionalStatusAtualNew.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.profissionalStatusAtualNew.home.notFound">
                    No Profissional Status Atual News found
                  </Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={profissionalStatusAtualNewList && profissionalStatusAtualNewList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ profissionalStatusAtualNew, ...storeState }: IRootState) => ({
  profissionalStatusAtualNewList: profissionalStatusAtualNew.entities,
  totalItems: profissionalStatusAtualNew.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalStatusAtualNew);
