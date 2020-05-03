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
import { getEntities } from './cid-pta.reducer';
import { ICidPta } from 'app/shared/model/cid-pta.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ICidPtaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ICidPtaBaseState {
  idDescPta: any;
  idCid: any;
  idAtividade: any;
  ativo: any;
  dataPost: any;
}
export interface ICidPtaState extends ICidPtaBaseState, IPaginationBaseState {}

export class CidPta extends React.Component<ICidPtaProps, ICidPtaState> {
  private myFormRef: any;

  constructor(props: ICidPtaProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getCidPtaState(this.props.location)
    };
  }

  getCidPtaState = (location): ICidPtaBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const idDescPta = url.searchParams.get('idDescPta') || '';
    const idCid = url.searchParams.get('idCid') || '';
    const idAtividade = url.searchParams.get('idAtividade') || '';
    const ativo = url.searchParams.get('ativo') || '';
    const dataPost = url.searchParams.get('dataPost') || '';

    return {
      idDescPta,
      idCid,
      idAtividade,
      ativo,
      dataPost
    };
  };

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idDescPta: '',
        idCid: '',
        idAtividade: '',
        ativo: '',
        dataPost: ''
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
      'idDescPta=' +
      this.state.idDescPta +
      '&' +
      'idCid=' +
      this.state.idCid +
      '&' +
      'idAtividade=' +
      this.state.idAtividade +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'dataPost=' +
      this.state.dataPost +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idDescPta, idCid, idAtividade, ativo, dataPost, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(idDescPta, idCid, idAtividade, ativo, dataPost, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { cidPtaList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Cid Ptas</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Cid Ptas</span>
              <Button id="togglerFilterCidPta" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.cidPta.home.createLabel">Create a new Cid Pta</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterCidPta">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="idDescPtaLabel" for="cid-pta-idDescPta">
                            <Translate contentKey="generadorApp.cidPta.idDescPta">Id Desc Pta</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="idDescPta"
                            id="cid-pta-idDescPta"
                            value={this.state.idDescPta}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idCidLabel" for="cid-pta-idCid">
                            <Translate contentKey="generadorApp.cidPta.idCid">Id Cid</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="idCid"
                            id="cid-pta-idCid"
                            value={this.state.idCid}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idAtividadeLabel" for="cid-pta-idAtividade">
                            <Translate contentKey="generadorApp.cidPta.idAtividade">Id Atividade</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="idAtividade"
                            id="cid-pta-idAtividade"
                            value={this.state.idAtividade}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="cid-pta-ativo">
                            <Translate contentKey="generadorApp.cidPta.ativo">Ativo</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="ativo"
                            id="cid-pta-ativo"
                            value={this.state.ativo}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataPostLabel" for="cid-pta-dataPost">
                            <Translate contentKey="generadorApp.cidPta.dataPost">Data Post</Translate>
                          </Label>
                          <AvInput
                            id="cid-pta-dataPost"
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

              {cidPtaList && cidPtaList.length > 0 ? (
                <Table responsive aria-describedby="cid-pta-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idDescPta')}>
                        <Translate contentKey="generadorApp.cidPta.idDescPta">Id Desc Pta</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idCid')}>
                        <Translate contentKey="generadorApp.cidPta.idCid">Id Cid</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idAtividade')}>
                        <Translate contentKey="generadorApp.cidPta.idAtividade">Id Atividade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.cidPta.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataPost')}>
                        <Translate contentKey="generadorApp.cidPta.dataPost">Data Post</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {cidPtaList.map((cidPta, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${cidPta.id}`} color="link" size="sm">
                            {cidPta.id}
                          </Button>
                        </td>

                        <td>{cidPta.idDescPta}</td>

                        <td>{cidPta.idCid}</td>

                        <td>{cidPta.idAtividade}</td>

                        <td>{cidPta.ativo}</td>

                        <td>
                          <TextFormat type="date" value={cidPta.dataPost} format={APP_DATE_FORMAT} />
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${cidPta.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${cidPta.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${cidPta.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.cidPta.home.notFound">No Cid Ptas found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={cidPtaList && cidPtaList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ cidPta, ...storeState }: IRootState) => ({
  cidPtaList: cidPta.entities,
  totalItems: cidPta.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CidPta);
