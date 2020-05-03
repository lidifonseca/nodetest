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
import { getEntities } from './cid.reducer';
import { ICid } from 'app/shared/model/cid.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ICidProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ICidBaseState {
  codigo: any;
  diagnostico: any;
  gr: any;
  temp: any;
  apelido: any;
  cidXPtaNovo: any;
  pacienteDiagnostico: any;
  padCid: any;
}
export interface ICidState extends ICidBaseState, IPaginationBaseState {}

export class Cid extends React.Component<ICidProps, ICidState> {
  private myFormRef: any;

  constructor(props: ICidProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getCidState(this.props.location)
    };
  }

  getCidState = (location): ICidBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const codigo = url.searchParams.get('codigo') || '';
    const diagnostico = url.searchParams.get('diagnostico') || '';
    const gr = url.searchParams.get('gr') || '';
    const temp = url.searchParams.get('temp') || '';
    const apelido = url.searchParams.get('apelido') || '';

    const cidXPtaNovo = url.searchParams.get('cidXPtaNovo') || '';
    const pacienteDiagnostico = url.searchParams.get('pacienteDiagnostico') || '';
    const padCid = url.searchParams.get('padCid') || '';

    return {
      codigo,
      diagnostico,
      gr,
      temp,
      apelido,
      cidXPtaNovo,
      pacienteDiagnostico,
      padCid
    };
  };

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        codigo: '',
        diagnostico: '',
        gr: '',
        temp: '',
        apelido: '',
        cidXPtaNovo: '',
        pacienteDiagnostico: '',
        padCid: ''
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
      'codigo=' +
      this.state.codigo +
      '&' +
      'diagnostico=' +
      this.state.diagnostico +
      '&' +
      'gr=' +
      this.state.gr +
      '&' +
      'temp=' +
      this.state.temp +
      '&' +
      'apelido=' +
      this.state.apelido +
      '&' +
      'cidXPtaNovo=' +
      this.state.cidXPtaNovo +
      '&' +
      'pacienteDiagnostico=' +
      this.state.pacienteDiagnostico +
      '&' +
      'padCid=' +
      this.state.padCid +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      codigo,
      diagnostico,
      gr,
      temp,
      apelido,
      cidXPtaNovo,
      pacienteDiagnostico,
      padCid,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      codigo,
      diagnostico,
      gr,
      temp,
      apelido,
      cidXPtaNovo,
      pacienteDiagnostico,
      padCid,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { cidList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Cids</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Cids</span>
              <Button id="togglerFilterCid" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.cid.home.createLabel">Create a new Cid</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterCid">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="codigoLabel" for="cid-codigo">
                            <Translate contentKey="generadorApp.cid.codigo">Codigo</Translate>
                          </Label>

                          <AvInput type="text" name="codigo" id="cid-codigo" value={this.state.codigo} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="diagnosticoLabel" for="cid-diagnostico">
                            <Translate contentKey="generadorApp.cid.diagnostico">Diagnostico</Translate>
                          </Label>

                          <AvInput type="text" name="diagnostico" id="cid-diagnostico" value={this.state.diagnostico} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="grLabel" for="cid-gr">
                            <Translate contentKey="generadorApp.cid.gr">Gr</Translate>
                          </Label>

                          <AvInput type="text" name="gr" id="cid-gr" value={this.state.gr} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="tempLabel" for="cid-temp">
                            <Translate contentKey="generadorApp.cid.temp">Temp</Translate>
                          </Label>

                          <AvInput type="text" name="temp" id="cid-temp" value={this.state.temp} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="apelidoLabel" for="cid-apelido">
                            <Translate contentKey="generadorApp.cid.apelido">Apelido</Translate>
                          </Label>

                          <AvInput type="text" name="apelido" id="cid-apelido" value={this.state.apelido} />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
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

              {cidList && cidList.length > 0 ? (
                <Table responsive aria-describedby="cid-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('codigo')}>
                        <Translate contentKey="generadorApp.cid.codigo">Codigo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('diagnostico')}>
                        <Translate contentKey="generadorApp.cid.diagnostico">Diagnostico</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('gr')}>
                        <Translate contentKey="generadorApp.cid.gr">Gr</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('temp')}>
                        <Translate contentKey="generadorApp.cid.temp">Temp</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('apelido')}>
                        <Translate contentKey="generadorApp.cid.apelido">Apelido</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {cidList.map((cid, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${cid.id}`} color="link" size="sm">
                            {cid.id}
                          </Button>
                        </td>

                        <td>{cid.codigo}</td>

                        <td>{cid.diagnostico}</td>

                        <td>{cid.gr}</td>

                        <td>{cid.temp}</td>

                        <td>{cid.apelido}</td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${cid.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${cid.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${cid.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.cid.home.notFound">No Cids found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={cidList && cidList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ cid, ...storeState }: IRootState) => ({
  cidList: cid.entities,
  totalItems: cid.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Cid);
