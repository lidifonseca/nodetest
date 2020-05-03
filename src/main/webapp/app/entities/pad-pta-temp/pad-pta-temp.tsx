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
import { getEntities } from './pad-pta-temp.reducer';
import { IPadPtaTemp } from 'app/shared/model/pad-pta-temp.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPadPtaTempProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPadPtaTempBaseState {
  sessionId: any;
  idPta: any;
  idCid: any;
  idUsuario: any;
  cidXPtaNovoId: any;
}
export interface IPadPtaTempState extends IPadPtaTempBaseState, IPaginationBaseState {}

export class PadPtaTemp extends React.Component<IPadPtaTempProps, IPadPtaTempState> {
  private myFormRef: any;

  constructor(props: IPadPtaTempProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getPadPtaTempState(this.props.location)
    };
  }

  getPadPtaTempState = (location): IPadPtaTempBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const sessionId = url.searchParams.get('sessionId') || '';
    const idPta = url.searchParams.get('idPta') || '';
    const idCid = url.searchParams.get('idCid') || '';
    const idUsuario = url.searchParams.get('idUsuario') || '';
    const cidXPtaNovoId = url.searchParams.get('cidXPtaNovoId') || '';

    return {
      sessionId,
      idPta,
      idCid,
      idUsuario,
      cidXPtaNovoId
    };
  };

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        sessionId: '',
        idPta: '',
        idCid: '',
        idUsuario: '',
        cidXPtaNovoId: ''
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
      'sessionId=' +
      this.state.sessionId +
      '&' +
      'idPta=' +
      this.state.idPta +
      '&' +
      'idCid=' +
      this.state.idCid +
      '&' +
      'idUsuario=' +
      this.state.idUsuario +
      '&' +
      'cidXPtaNovoId=' +
      this.state.cidXPtaNovoId +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { sessionId, idPta, idCid, idUsuario, cidXPtaNovoId, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(sessionId, idPta, idCid, idUsuario, cidXPtaNovoId, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { padPtaTempList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Pta Temps</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Pad Pta Temps</span>
              <Button id="togglerFilterPadPtaTemp" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.padPtaTemp.home.createLabel">Create a new Pad Pta Temp</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPadPtaTemp">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="sessionIdLabel" for="pad-pta-temp-sessionId">
                            <Translate contentKey="generadorApp.padPtaTemp.sessionId">Session Id</Translate>
                          </Label>

                          <AvInput type="text" name="sessionId" id="pad-pta-temp-sessionId" value={this.state.sessionId} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idPtaLabel" for="pad-pta-temp-idPta">
                            <Translate contentKey="generadorApp.padPtaTemp.idPta">Id Pta</Translate>
                          </Label>
                          <AvInput type="string" name="idPta" id="pad-pta-temp-idPta" value={this.state.idPta} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idCidLabel" for="pad-pta-temp-idCid">
                            <Translate contentKey="generadorApp.padPtaTemp.idCid">Id Cid</Translate>
                          </Label>
                          <AvInput type="string" name="idCid" id="pad-pta-temp-idCid" value={this.state.idCid} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idUsuarioLabel" for="pad-pta-temp-idUsuario">
                            <Translate contentKey="generadorApp.padPtaTemp.idUsuario">Id Usuario</Translate>
                          </Label>
                          <AvInput type="string" name="idUsuario" id="pad-pta-temp-idUsuario" value={this.state.idUsuario} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cidXPtaNovoIdLabel" for="pad-pta-temp-cidXPtaNovoId">
                            <Translate contentKey="generadorApp.padPtaTemp.cidXPtaNovoId">Cid X Pta Novo Id</Translate>
                          </Label>
                          <AvInput type="string" name="cidXPtaNovoId" id="pad-pta-temp-cidXPtaNovoId" value={this.state.cidXPtaNovoId} />
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

              {padPtaTempList && padPtaTempList.length > 0 ? (
                <Table responsive aria-describedby="pad-pta-temp-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('sessionId')}>
                        <Translate contentKey="generadorApp.padPtaTemp.sessionId">Session Id</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idPta')}>
                        <Translate contentKey="generadorApp.padPtaTemp.idPta">Id Pta</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idCid')}>
                        <Translate contentKey="generadorApp.padPtaTemp.idCid">Id Cid</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idUsuario')}>
                        <Translate contentKey="generadorApp.padPtaTemp.idUsuario">Id Usuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cidXPtaNovoId')}>
                        <Translate contentKey="generadorApp.padPtaTemp.cidXPtaNovoId">Cid X Pta Novo Id</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {padPtaTempList.map((padPtaTemp, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${padPtaTemp.id}`} color="link" size="sm">
                            {padPtaTemp.id}
                          </Button>
                        </td>

                        <td>{padPtaTemp.sessionId}</td>

                        <td>{padPtaTemp.idPta}</td>

                        <td>{padPtaTemp.idCid}</td>

                        <td>{padPtaTemp.idUsuario}</td>

                        <td>{padPtaTemp.cidXPtaNovoId}</td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${padPtaTemp.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${padPtaTemp.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${padPtaTemp.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.padPtaTemp.home.notFound">No Pad Pta Temps found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={padPtaTempList && padPtaTempList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ padPtaTemp, ...storeState }: IRootState) => ({
  padPtaTempList: padPtaTemp.entities,
  totalItems: padPtaTemp.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadPtaTemp);
