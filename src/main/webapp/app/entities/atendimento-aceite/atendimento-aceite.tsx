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
import { getEntities } from './atendimento-aceite.reducer';
import { IAtendimentoAceite } from 'app/shared/model/atendimento-aceite.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IProfissional } from 'app/shared/model/profissional.model';
import { getEntities as getProfissionals } from 'app/entities/profissional/profissional.reducer';
import { IAtendimento } from 'app/shared/model/atendimento.model';
import { getEntities as getAtendimentos } from 'app/entities/atendimento/atendimento.reducer';

export interface IAtendimentoAceiteProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IAtendimentoAceiteBaseState {
  msgPush: any;
  dataPost: any;
  idProfissional: any;
  idAtendimento: any;
}
export interface IAtendimentoAceiteState extends IAtendimentoAceiteBaseState, IPaginationBaseState {}

export class AtendimentoAceite extends React.Component<IAtendimentoAceiteProps, IAtendimentoAceiteState> {
  private myFormRef: any;

  constructor(props: IAtendimentoAceiteProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getAtendimentoAceiteState(this.props.location)
    };
  }

  getAtendimentoAceiteState = (location): IAtendimentoAceiteBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const msgPush = url.searchParams.get('msgPush') || '';
    const dataPost = url.searchParams.get('dataPost') || '';

    const idProfissional = url.searchParams.get('idProfissional') || '';
    const idAtendimento = url.searchParams.get('idAtendimento') || '';

    return {
      msgPush,
      dataPost,
      idProfissional,
      idAtendimento
    };
  };

  componentDidMount() {
    this.getEntities();

    this.props.getProfissionals();
    this.props.getAtendimentos();
  }

  cancelCourse = () => {
    this.setState(
      {
        msgPush: '',
        dataPost: '',
        idProfissional: '',
        idAtendimento: ''
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
      'msgPush=' +
      this.state.msgPush +
      '&' +
      'dataPost=' +
      this.state.dataPost +
      '&' +
      'idProfissional=' +
      this.state.idProfissional +
      '&' +
      'idAtendimento=' +
      this.state.idAtendimento +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { msgPush, dataPost, idProfissional, idAtendimento, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(msgPush, dataPost, idProfissional, idAtendimento, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { profissionals, atendimentos, atendimentoAceiteList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Atendimento Aceites</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Atendimento Aceites</span>
              <Button id="togglerFilterAtendimentoAceite" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.atendimentoAceite.home.createLabel">Create a new Atendimento Aceite</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterAtendimentoAceite">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="msgPushLabel" for="atendimento-aceite-msgPush">
                            <Translate contentKey="generadorApp.atendimentoAceite.msgPush">Msg Push</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="msgPush"
                            id="atendimento-aceite-msgPush"
                            value={this.state.msgPush}
                            validate={{
                              maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataPostLabel" for="atendimento-aceite-dataPost">
                            <Translate contentKey="generadorApp.atendimentoAceite.dataPost">Data Post</Translate>
                          </Label>
                          <AvInput
                            id="atendimento-aceite-dataPost"
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
                          <div>
                            <Label for="atendimento-aceite-idProfissional">
                              <Translate contentKey="generadorApp.atendimentoAceite.idProfissional">Id Profissional</Translate>
                            </Label>
                            <AvInput id="atendimento-aceite-idProfissional" type="select" className="form-control" name="idProfissionalId">
                              <option value="" key="0" />
                              {profissionals
                                ? profissionals.map(otherEntity => (
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
                            <Label for="atendimento-aceite-idAtendimento">
                              <Translate contentKey="generadorApp.atendimentoAceite.idAtendimento">Id Atendimento</Translate>
                            </Label>
                            <AvInput id="atendimento-aceite-idAtendimento" type="select" className="form-control" name="idAtendimentoId">
                              <option value="" key="0" />
                              {atendimentos
                                ? atendimentos.map(otherEntity => (
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

              {atendimentoAceiteList && atendimentoAceiteList.length > 0 ? (
                <Table responsive aria-describedby="atendimento-aceite-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('msgPush')}>
                        <Translate contentKey="generadorApp.atendimentoAceite.msgPush">Msg Push</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataPost')}>
                        <Translate contentKey="generadorApp.atendimentoAceite.dataPost">Data Post</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.atendimentoAceite.idProfissional">Id Profissional</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.atendimentoAceite.idAtendimento">Id Atendimento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {atendimentoAceiteList.map((atendimentoAceite, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${atendimentoAceite.id}`} color="link" size="sm">
                            {atendimentoAceite.id}
                          </Button>
                        </td>

                        <td>{atendimentoAceite.msgPush}</td>

                        <td>
                          <TextFormat type="date" value={atendimentoAceite.dataPost} format={APP_DATE_FORMAT} />
                        </td>
                        <td>
                          {atendimentoAceite.idProfissional ? (
                            <Link to={`profissional/${atendimentoAceite.idProfissional.id}`}>{atendimentoAceite.idProfissional.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>
                        <td>
                          {atendimentoAceite.idAtendimento ? (
                            <Link to={`atendimento/${atendimentoAceite.idAtendimento.id}`}>{atendimentoAceite.idAtendimento.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${atendimentoAceite.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${atendimentoAceite.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${atendimentoAceite.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.atendimentoAceite.home.notFound">No Atendimento Aceites found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={atendimentoAceiteList && atendimentoAceiteList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ atendimentoAceite, ...storeState }: IRootState) => ({
  profissionals: storeState.profissional.entities,
  atendimentos: storeState.atendimento.entities,
  atendimentoAceiteList: atendimentoAceite.entities,
  totalItems: atendimentoAceite.totalItems
});

const mapDispatchToProps = {
  getProfissionals,
  getAtendimentos,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AtendimentoAceite);
