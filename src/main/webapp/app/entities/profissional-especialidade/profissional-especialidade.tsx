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
import { getProfissionalEspecialidadeState, IProfissionalEspecialidadeBaseState, getEntities } from './profissional-especialidade.reducer';
import { IProfissionalEspecialidade } from 'app/shared/model/profissional-especialidade.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IProfissionalEspecialidadeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IProfissionalEspecialidadeState extends IProfissionalEspecialidadeBaseState, IPaginationBaseState {}

export class ProfissionalEspecialidade extends React.Component<IProfissionalEspecialidadeProps, IProfissionalEspecialidadeState> {
  private myFormRef: any;

  constructor(props: IProfissionalEspecialidadeProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getProfissionalEspecialidadeState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idEspecialidade: '',
        idProfissional: ''
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
      'idEspecialidade=' +
      this.state.idEspecialidade +
      '&' +
      'idProfissional=' +
      this.state.idProfissional +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idEspecialidade, idProfissional, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(idEspecialidade, idProfissional, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { profissionalEspecialidadeList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Profissional Especialidades</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Profissional Especialidades</span>
              <Button id="togglerFilterProfissionalEspecialidade" className="btn btn-primary float-right jh-create-entity">
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
                <Translate contentKey="generadorApp.profissionalEspecialidade.home.createLabel">
                  Create a new Profissional Especialidade
                </Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterProfissionalEspecialidade">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idEspecialidade' ? (
                        <Col md="3">
                          <Row>
                            <Label id="idEspecialidadeLabel" for="profissional-especialidade-idEspecialidade">
                              <Translate contentKey="generadorApp.profissionalEspecialidade.idEspecialidade">Id Especialidade</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idEspecialidade"
                              id="profissional-especialidade-idEspecialidade"
                              value={this.state.idEspecialidade}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idProfissional' ? (
                        <Col md="3">
                          <Row>
                            <Label id="idProfissionalLabel" for="profissional-especialidade-idProfissional">
                              <Translate contentKey="generadorApp.profissionalEspecialidade.idProfissional">Id Profissional</Translate>
                            </Label>

                            <AvInput
                              type="text"
                              name="idProfissional"
                              id="profissional-especialidade-idProfissional"
                              value={this.state.idProfissional}
                            />
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

              {profissionalEspecialidadeList && profissionalEspecialidadeList.length > 0 ? (
                <Table responsive aria-describedby="profissional-especialidade-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'idEspecialidade' ? (
                        <th className="hand" onClick={this.sort('idEspecialidade')}>
                          <Translate contentKey="generadorApp.profissionalEspecialidade.idEspecialidade">Id Especialidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idProfissional' ? (
                        <th className="hand" onClick={this.sort('idProfissional')}>
                          <Translate contentKey="generadorApp.profissionalEspecialidade.idProfissional">Id Profissional</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {profissionalEspecialidadeList.map((profissionalEspecialidade, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${profissionalEspecialidade.id}`} color="link" size="sm">
                            {profissionalEspecialidade.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'idEspecialidade' ? <td>{profissionalEspecialidade.idEspecialidade}</td> : null}

                        {this.state.baseFilters !== 'idProfissional' ? <td>{profissionalEspecialidade.idProfissional}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button
                              tag={Link}
                              to={`${match.url}/${profissionalEspecialidade.id}?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${profissionalEspecialidade.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${profissionalEspecialidade.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.profissionalEspecialidade.home.notFound">
                    No Profissional Especialidades found
                  </Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={profissionalEspecialidadeList && profissionalEspecialidadeList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ profissionalEspecialidade, ...storeState }: IRootState) => ({
  profissionalEspecialidadeList: profissionalEspecialidade.entities,
  totalItems: profissionalEspecialidade.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalEspecialidade);
