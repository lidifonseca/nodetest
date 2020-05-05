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
        idUsuario: '',
        idAtendimento: '',
        descricao: '',
        idTela: '',
        idAcao: ''
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
      'idUsuario=' +
      this.state.idUsuario +
      '&' +
      'idAtendimento=' +
      this.state.idAtendimento +
      '&' +
      'descricao=' +
      this.state.descricao +
      '&' +
      'idTela=' +
      this.state.idTela +
      '&' +
      'idAcao=' +
      this.state.idAcao +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idUsuario, idAtendimento, descricao, idTela, idAcao, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(idUsuario, idAtendimento, descricao, idTela, idAcao, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { telas, acaos, usuarioAcaoList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Usuario Acaos</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Usuario Acaos</span>
              <Button id="togglerFilterUsuarioAcao" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.usuarioAcao.home.createLabel">Create a new Usuario Acao</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterUsuarioAcao">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="idUsuarioLabel" for="usuario-acao-idUsuario">
                            <Translate contentKey="generadorApp.usuarioAcao.idUsuario">Id Usuario</Translate>
                          </Label>

                          <AvInput type="text" name="idUsuario" id="usuario-acao-idUsuario" value={this.state.idUsuario} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idAtendimentoLabel" for="usuario-acao-idAtendimento">
                            <Translate contentKey="generadorApp.usuarioAcao.idAtendimento">Id Atendimento</Translate>
                          </Label>
                          <AvInput type="string" name="idAtendimento" id="usuario-acao-idAtendimento" value={this.state.idAtendimento} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="descricaoLabel" for="usuario-acao-descricao">
                            <Translate contentKey="generadorApp.usuarioAcao.descricao">Descricao</Translate>
                          </Label>
                          <AvInput id="usuario-acao-descricao" type="textarea" name="descricao" />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="usuario-acao-idTela">
                              <Translate contentKey="generadorApp.usuarioAcao.idTela">Id Tela</Translate>
                            </Label>
                            <AvInput id="usuario-acao-idTela" type="select" className="form-control" name="idTelaId">
                              <option value="" key="0" />
                              {telas
                                ? telas.map(otherEntity => (
                                    <option value={otherEntity.id} key={otherEntity.id}>
                                      {otherEntity.id}
                                    </option>
                                  ))
                                : null}
                            </AvInput>
                          </div>
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="usuario-acao-idAcao">
                              <Translate contentKey="generadorApp.usuarioAcao.idAcao">Id Acao</Translate>
                            </Label>
                            <AvInput id="usuario-acao-idAcao" type="select" className="form-control" name="idAcaoId">
                              <option value="" key="0" />
                              {acaos
                                ? acaos.map(otherEntity => (
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

              {usuarioAcaoList && usuarioAcaoList.length > 0 ? (
                <Table responsive aria-describedby="usuario-acao-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idUsuario')}>
                        <Translate contentKey="generadorApp.usuarioAcao.idUsuario">Id Usuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idAtendimento')}>
                        <Translate contentKey="generadorApp.usuarioAcao.idAtendimento">Id Atendimento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('descricao')}>
                        <Translate contentKey="generadorApp.usuarioAcao.descricao">Descricao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.usuarioAcao.idTela">Id Tela</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.usuarioAcao.idAcao">Id Acao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

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

                        <td>{usuarioAcao.idUsuario}</td>

                        <td>{usuarioAcao.idAtendimento}</td>

                        <td>{usuarioAcao.descricao}</td>
                        <td>{usuarioAcao.idTela ? <Link to={`tela/${usuarioAcao.idTela.id}`}>{usuarioAcao.idTela.id}</Link> : ''}</td>
                        <td>{usuarioAcao.idAcao ? <Link to={`acao/${usuarioAcao.idAcao.id}`}>{usuarioAcao.idAcao.id}</Link> : ''}</td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container"></div>
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
