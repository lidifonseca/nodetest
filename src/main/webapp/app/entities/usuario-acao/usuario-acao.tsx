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
import { getUsuarioAcaoState, IUsuarioAcaoBaseState, getEntities } from './usuario-acao.reducer';
import { IUsuarioAcao } from 'app/shared/model/usuario-acao.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { ITela } from 'app/shared/model/tela.model';
import { getEntities as getTelas } from 'app/entities/tela/tela.reducer';
import { IAcao } from 'app/shared/model/acao.model';
import { getEntities as getAcaos } from 'app/entities/acao/acao.reducer';

export interface IUsuarioAcaoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IUsuarioAcaoState extends IUsuarioAcaoBaseState, IPaginationBaseState {}

export class UsuarioAcao extends React.Component<IUsuarioAcaoProps, IUsuarioAcaoState> {
  private myFormRef: any;

  constructor(props: IUsuarioAcaoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getUsuarioAcaoState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getTelas();
    this.props.getAcaos();
  }

  cancelCourse = () => {
    this.setState(
      {
        idAtendimento: '',
        descricao: '',
        tela: '',
        acao: ''
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
      'idAtendimento=' +
      this.state.idAtendimento +
      '&' +
      'descricao=' +
      this.state.descricao +
      '&' +
      'tela=' +
      this.state.tela +
      '&' +
      'acao=' +
      this.state.acao +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idAtendimento, descricao, tela, acao, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(idAtendimento, descricao, tela, acao, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { telas, acaos, usuarioAcaoList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Usuario Acaos</span>
          <Button id="togglerFilterUsuarioAcao" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.usuarioAcao.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.usuarioAcao.home.createLabel">Create a new Usuario Acao</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Usuario Acaos</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterUsuarioAcao">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idAtendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idAtendimentoLabel" for="usuario-acao-idAtendimento">
                              <Translate contentKey="generadorApp.usuarioAcao.idAtendimento">Id Atendimento</Translate>
                            </Label>
                            <AvInput type="string" name="idAtendimento" id="usuario-acao-idAtendimento" value={this.state.idAtendimento} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'descricao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="descricaoLabel" for="usuario-acao-descricao">
                              <Translate contentKey="generadorApp.usuarioAcao.descricao">Descricao</Translate>
                            </Label>
                            <AvInput id="usuario-acao-descricao" type="textarea" name="descricao" />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'tela' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="usuario-acao-tela">
                                <Translate contentKey="generadorApp.usuarioAcao.tela">Tela</Translate>
                              </Label>
                              <Select
                                id="usuario-acao-tela"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  telas
                                    ? telas.map(p =>
                                        this.state.tela.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null
                                      )
                                    : null
                                }
                                options={telas ? telas.map(option => ({ value: option.id, label: option.id })) : null}
                                onChange={options => this.setState({ tela: options.map(option => option['value']).join(',') })}
                                name={'tela'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'acao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="usuario-acao-acao">
                                <Translate contentKey="generadorApp.usuarioAcao.acao">Acao</Translate>
                              </Label>
                              <Select
                                id="usuario-acao-acao"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  acaos
                                    ? acaos.map(p =>
                                        this.state.acao.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null
                                      )
                                    : null
                                }
                                options={acaos ? acaos.map(option => ({ value: option.id, label: option.id })) : null}
                                onChange={options => this.setState({ acao: options.map(option => option['value']).join(',') })}
                                name={'acao'}
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
                        <Translate contentKey="generadorApp.usuarioAcao.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.usuarioAcao.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {usuarioAcaoList && usuarioAcaoList.length > 0 ? (
                <Table responsive aria-describedby="usuario-acao-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'idAtendimento' ? (
                        <th className="hand" onClick={this.sort('idAtendimento')}>
                          <Translate contentKey="generadorApp.usuarioAcao.idAtendimento">Id Atendimento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'descricao' ? (
                        <th className="hand" onClick={this.sort('descricao')}>
                          <Translate contentKey="generadorApp.usuarioAcao.descricao">Descricao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'tela' ? (
                        <th>
                          <Translate contentKey="generadorApp.usuarioAcao.tela">Tela</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'acao' ? (
                        <th>
                          <Translate contentKey="generadorApp.usuarioAcao.acao">Acao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {usuarioAcaoList.map((usuarioAcao, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${usuarioAcao.id}`} color="link" size="sm">
                            {usuarioAcao.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'idAtendimento' ? <td>{usuarioAcao.idAtendimento}</td> : null}

                        {this.state.baseFilters !== 'descricao' ? (
                          <td>{usuarioAcao.descricao ? Buffer.from(usuarioAcao.descricao).toString() : null}</td>
                        ) : null}

                        {this.state.baseFilters !== 'tela' ? (
                          <td>{usuarioAcao.tela ? <Link to={`tela/${usuarioAcao.tela.id}`}>{usuarioAcao.tela.id}</Link> : ''}</td>
                        ) : null}

                        {this.state.baseFilters !== 'acao' ? (
                          <td>{usuarioAcao.acao ? <Link to={`acao/${usuarioAcao.acao.id}`}>{usuarioAcao.acao.id}</Link> : ''}</td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${usuarioAcao.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${usuarioAcao.id}/edit?${this.getFiltersURL()}`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${usuarioAcao.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.usuarioAcao.home.notFound">No Usuario Acaos found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={usuarioAcaoList && usuarioAcaoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ usuarioAcao, ...storeState }: IRootState) => ({
  telas: storeState.tela.entities,
  acaos: storeState.acao.entities,
  usuarioAcaoList: usuarioAcao.entities,
  totalItems: usuarioAcao.totalItems
});

const mapDispatchToProps = {
  getTelas,
  getAcaos,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UsuarioAcao);
