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
import { getEntities } from './tipo-especialidade.reducer';
import { ITipoEspecialidade } from 'app/shared/model/tipo-especialidade.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ITipoEspecialidadeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ITipoEspecialidadeBaseState {
  tipoEspecialidade: any;
  dataPost: any;
  especialidade: any;
}
export interface ITipoEspecialidadeState extends ITipoEspecialidadeBaseState, IPaginationBaseState {}

export class TipoEspecialidade extends React.Component<ITipoEspecialidadeProps, ITipoEspecialidadeState> {
  private myFormRef: any;

  constructor(props: ITipoEspecialidadeProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getTipoEspecialidadeState(this.props.location)
    };
  }

  getTipoEspecialidadeState = (location): ITipoEspecialidadeBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const tipoEspecialidade = url.searchParams.get('tipoEspecialidade') || '';
    const dataPost = url.searchParams.get('dataPost') || '';

    const especialidade = url.searchParams.get('especialidade') || '';

    return {
      tipoEspecialidade,
      dataPost,
      especialidade
    };
  };

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        tipoEspecialidade: '',
        dataPost: '',
        especialidade: ''
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
      'tipoEspecialidade=' +
      this.state.tipoEspecialidade +
      '&' +
      'dataPost=' +
      this.state.dataPost +
      '&' +
      'especialidade=' +
      this.state.especialidade +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { tipoEspecialidade, dataPost, especialidade, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(tipoEspecialidade, dataPost, especialidade, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { tipoEspecialidadeList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Tipo Especialidades</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Tipo Especialidades</span>
              <Button id="togglerFilterTipoEspecialidade" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.tipoEspecialidade.home.createLabel">Create a new Tipo Especialidade</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterTipoEspecialidade">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="tipoEspecialidadeLabel" for="tipo-especialidade-tipoEspecialidade">
                            <Translate contentKey="generadorApp.tipoEspecialidade.tipoEspecialidade">Tipo Especialidade</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="tipoEspecialidade"
                            id="tipo-especialidade-tipoEspecialidade"
                            value={this.state.tipoEspecialidade}
                            validate={{
                              maxLength: { value: 30, errorMessage: translate('entity.validation.maxlength', { max: 30 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataPostLabel" for="tipo-especialidade-dataPost">
                            <Translate contentKey="generadorApp.tipoEspecialidade.dataPost">Data Post</Translate>
                          </Label>
                          <AvInput
                            id="tipo-especialidade-dataPost"
                            type="datetime-local"
                            className="form-control"
                            name="dataPost"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.dataPost ? convertDateTimeFromServer(this.state.dataPost) : null}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') }
                            }}
                          />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
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

              {tipoEspecialidadeList && tipoEspecialidadeList.length > 0 ? (
                <Table responsive aria-describedby="tipo-especialidade-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('tipoEspecialidade')}>
                        <Translate contentKey="generadorApp.tipoEspecialidade.tipoEspecialidade">Tipo Especialidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataPost')}>
                        <Translate contentKey="generadorApp.tipoEspecialidade.dataPost">Data Post</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {tipoEspecialidadeList.map((tipoEspecialidade, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${tipoEspecialidade.id}`} color="link" size="sm">
                            {tipoEspecialidade.id}
                          </Button>
                        </td>

                        <td>{tipoEspecialidade.tipoEspecialidade}</td>

                        <td>
                          <TextFormat type="date" value={tipoEspecialidade.dataPost} format={APP_DATE_FORMAT} />
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${tipoEspecialidade.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${tipoEspecialidade.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${tipoEspecialidade.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.tipoEspecialidade.home.notFound">No Tipo Especialidades found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={tipoEspecialidadeList && tipoEspecialidadeList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ tipoEspecialidade, ...storeState }: IRootState) => ({
  tipoEspecialidadeList: tipoEspecialidade.entities,
  totalItems: tipoEspecialidade.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TipoEspecialidade);
