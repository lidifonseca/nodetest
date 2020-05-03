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
import { getEntities } from './profissional-status-atual.reducer';
import { IProfissionalStatusAtual } from 'app/shared/model/profissional-status-atual.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IStatusAtualProf } from 'app/shared/model/status-atual-prof.model';
import { getEntities as getStatusAtualProfs } from 'app/entities/status-atual-prof/status-atual-prof.reducer';

export interface IProfissionalStatusAtualProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IProfissionalStatusAtualBaseState {
  idProfissional: any;
  obs: any;
  ativo: any;
  dataPost: any;
  idUsuario: any;
  idStatusAtualProf: any;
}
export interface IProfissionalStatusAtualState extends IProfissionalStatusAtualBaseState, IPaginationBaseState {}

export class ProfissionalStatusAtual extends React.Component<IProfissionalStatusAtualProps, IProfissionalStatusAtualState> {
  private myFormRef: any;

  constructor(props: IProfissionalStatusAtualProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getProfissionalStatusAtualState(this.props.location)
    };
  }

  getProfissionalStatusAtualState = (location): IProfissionalStatusAtualBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const idProfissional = url.searchParams.get('idProfissional') || '';
    const obs = url.searchParams.get('obs') || '';
    const ativo = url.searchParams.get('ativo') || '';
    const dataPost = url.searchParams.get('dataPost') || '';
    const idUsuario = url.searchParams.get('idUsuario') || '';

    const idStatusAtualProf = url.searchParams.get('idStatusAtualProf') || '';

    return {
      idProfissional,
      obs,
      ativo,
      dataPost,
      idUsuario,
      idStatusAtualProf
    };
  };

  componentDidMount() {
    this.getEntities();

    this.props.getStatusAtualProfs();
  }

  cancelCourse = () => {
    this.setState(
      {
        idProfissional: '',
        obs: '',
        ativo: '',
        dataPost: '',
        idUsuario: '',
        idStatusAtualProf: ''
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
      'obs=' +
      this.state.obs +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'dataPost=' +
      this.state.dataPost +
      '&' +
      'idUsuario=' +
      this.state.idUsuario +
      '&' +
      'idStatusAtualProf=' +
      this.state.idStatusAtualProf +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idProfissional, obs, ativo, dataPost, idUsuario, idStatusAtualProf, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(
      idProfissional,
      obs,
      ativo,
      dataPost,
      idUsuario,
      idStatusAtualProf,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { statusAtualProfs, profissionalStatusAtualList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Profissional Status Atuals</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Profissional Status Atuals</span>
              <Button id="togglerFilterProfissionalStatusAtual" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.profissionalStatusAtual.home.createLabel">
                  Create a new Profissional Status Atual
                </Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterProfissionalStatusAtual">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="idProfissionalLabel" for="profissional-status-atual-idProfissional">
                            <Translate contentKey="generadorApp.profissionalStatusAtual.idProfissional">Id Profissional</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="idProfissional"
                            id="profissional-status-atual-idProfissional"
                            value={this.state.idProfissional}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="obsLabel" for="profissional-status-atual-obs">
                            <Translate contentKey="generadorApp.profissionalStatusAtual.obs">Obs</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="obs"
                            id="profissional-status-atual-obs"
                            value={this.state.obs}
                            validate={{
                              maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="profissional-status-atual-ativo">
                            <Translate contentKey="generadorApp.profissionalStatusAtual.ativo">Ativo</Translate>
                          </Label>
                          <AvInput type="string" name="ativo" id="profissional-status-atual-ativo" value={this.state.ativo} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataPostLabel" for="profissional-status-atual-dataPost">
                            <Translate contentKey="generadorApp.profissionalStatusAtual.dataPost">Data Post</Translate>
                          </Label>
                          <AvInput
                            id="profissional-status-atual-dataPost"
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
                        <Row>
                          <Label id="idUsuarioLabel" for="profissional-status-atual-idUsuario">
                            <Translate contentKey="generadorApp.profissionalStatusAtual.idUsuario">Id Usuario</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="idUsuario"
                            id="profissional-status-atual-idUsuario"
                            value={this.state.idUsuario}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') }
                            }}
                          />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="profissional-status-atual-idStatusAtualProf">
                              <Translate contentKey="generadorApp.profissionalStatusAtual.idStatusAtualProf">
                                Id Status Atual Prof
                              </Translate>
                            </Label>
                            <AvInput
                              id="profissional-status-atual-idStatusAtualProf"
                              type="select"
                              className="form-control"
                              name="idStatusAtualProfId"
                            >
                              <option value="" key="0" />
                              {statusAtualProfs
                                ? statusAtualProfs.map(otherEntity => (
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

              {profissionalStatusAtualList && profissionalStatusAtualList.length > 0 ? (
                <Table responsive aria-describedby="profissional-status-atual-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idProfissional')}>
                        <Translate contentKey="generadorApp.profissionalStatusAtual.idProfissional">Id Profissional</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('obs')}>
                        <Translate contentKey="generadorApp.profissionalStatusAtual.obs">Obs</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.profissionalStatusAtual.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataPost')}>
                        <Translate contentKey="generadorApp.profissionalStatusAtual.dataPost">Data Post</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idUsuario')}>
                        <Translate contentKey="generadorApp.profissionalStatusAtual.idUsuario">Id Usuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.profissionalStatusAtual.idStatusAtualProf">Id Status Atual Prof</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {profissionalStatusAtualList.map((profissionalStatusAtual, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${profissionalStatusAtual.id}`} color="link" size="sm">
                            {profissionalStatusAtual.id}
                          </Button>
                        </td>

                        <td>{profissionalStatusAtual.idProfissional}</td>

                        <td>{profissionalStatusAtual.obs}</td>

                        <td>{profissionalStatusAtual.ativo}</td>

                        <td>
                          <TextFormat type="date" value={profissionalStatusAtual.dataPost} format={APP_DATE_FORMAT} />
                        </td>

                        <td>{profissionalStatusAtual.idUsuario}</td>
                        <td>
                          {profissionalStatusAtual.idStatusAtualProf ? (
                            <Link to={`status-atual-prof/${profissionalStatusAtual.idStatusAtualProf.id}`}>
                              {profissionalStatusAtual.idStatusAtualProf.id}
                            </Link>
                          ) : (
                            ''
                          )}
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${profissionalStatusAtual.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${profissionalStatusAtual.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${profissionalStatusAtual.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.profissionalStatusAtual.home.notFound">No Profissional Status Atuals found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={profissionalStatusAtualList && profissionalStatusAtualList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ profissionalStatusAtual, ...storeState }: IRootState) => ({
  statusAtualProfs: storeState.statusAtualProf.entities,
  profissionalStatusAtualList: profissionalStatusAtual.entities,
  totalItems: profissionalStatusAtual.totalItems
});

const mapDispatchToProps = {
  getStatusAtualProfs,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalStatusAtual);
