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
import { getEntities } from './status-pad-item-meta.reducer';
import { IStatusPadItemMeta } from 'app/shared/model/status-pad-item-meta.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IStatusPadItemMetaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IStatusPadItemMetaBaseState {
  statusItemMeta: any;
  styleLabel: any;
  ordenacao: any;
  ativo: any;
  dataPost: any;
}
export interface IStatusPadItemMetaState extends IStatusPadItemMetaBaseState, IPaginationBaseState {}

export class StatusPadItemMeta extends React.Component<IStatusPadItemMetaProps, IStatusPadItemMetaState> {
  private myFormRef: any;

  constructor(props: IStatusPadItemMetaProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getStatusPadItemMetaState(this.props.location)
    };
  }

  getStatusPadItemMetaState = (location): IStatusPadItemMetaBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const statusItemMeta = url.searchParams.get('statusItemMeta') || '';
    const styleLabel = url.searchParams.get('styleLabel') || '';
    const ordenacao = url.searchParams.get('ordenacao') || '';
    const ativo = url.searchParams.get('ativo') || '';
    const dataPost = url.searchParams.get('dataPost') || '';

    return {
      statusItemMeta,
      styleLabel,
      ordenacao,
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
        statusItemMeta: '',
        styleLabel: '',
        ordenacao: '',
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
      'statusItemMeta=' +
      this.state.statusItemMeta +
      '&' +
      'styleLabel=' +
      this.state.styleLabel +
      '&' +
      'ordenacao=' +
      this.state.ordenacao +
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
    const { statusItemMeta, styleLabel, ordenacao, ativo, dataPost, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(statusItemMeta, styleLabel, ordenacao, ativo, dataPost, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { statusPadItemMetaList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Status Pad Item Metas</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Status Pad Item Metas</span>
              <Button id="togglerFilterStatusPadItemMeta" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.statusPadItemMeta.home.createLabel">Create a new Status Pad Item Meta</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterStatusPadItemMeta">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="statusItemMetaLabel" for="status-pad-item-meta-statusItemMeta">
                            <Translate contentKey="generadorApp.statusPadItemMeta.statusItemMeta">Status Item Meta</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="statusItemMeta"
                            id="status-pad-item-meta-statusItemMeta"
                            value={this.state.statusItemMeta}
                            validate={{
                              maxLength: { value: 200, errorMessage: translate('entity.validation.maxlength', { max: 200 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="styleLabelLabel" for="status-pad-item-meta-styleLabel">
                            <Translate contentKey="generadorApp.statusPadItemMeta.styleLabel">Style Label</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="styleLabel"
                            id="status-pad-item-meta-styleLabel"
                            value={this.state.styleLabel}
                            validate={{
                              maxLength: { value: 40, errorMessage: translate('entity.validation.maxlength', { max: 40 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ordenacaoLabel" for="status-pad-item-meta-ordenacao">
                            <Translate contentKey="generadorApp.statusPadItemMeta.ordenacao">Ordenacao</Translate>
                          </Label>
                          <AvInput type="string" name="ordenacao" id="status-pad-item-meta-ordenacao" value={this.state.ordenacao} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="status-pad-item-meta-ativo">
                            <Translate contentKey="generadorApp.statusPadItemMeta.ativo">Ativo</Translate>
                          </Label>
                          <AvInput type="string" name="ativo" id="status-pad-item-meta-ativo" value={this.state.ativo} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataPostLabel" for="status-pad-item-meta-dataPost">
                            <Translate contentKey="generadorApp.statusPadItemMeta.dataPost">Data Post</Translate>
                          </Label>
                          <AvInput
                            id="status-pad-item-meta-dataPost"
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

              {statusPadItemMetaList && statusPadItemMetaList.length > 0 ? (
                <Table responsive aria-describedby="status-pad-item-meta-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('statusItemMeta')}>
                        <Translate contentKey="generadorApp.statusPadItemMeta.statusItemMeta">Status Item Meta</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('styleLabel')}>
                        <Translate contentKey="generadorApp.statusPadItemMeta.styleLabel">Style Label</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ordenacao')}>
                        <Translate contentKey="generadorApp.statusPadItemMeta.ordenacao">Ordenacao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.statusPadItemMeta.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataPost')}>
                        <Translate contentKey="generadorApp.statusPadItemMeta.dataPost">Data Post</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {statusPadItemMetaList.map((statusPadItemMeta, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${statusPadItemMeta.id}`} color="link" size="sm">
                            {statusPadItemMeta.id}
                          </Button>
                        </td>

                        <td>{statusPadItemMeta.statusItemMeta}</td>

                        <td>{statusPadItemMeta.styleLabel}</td>

                        <td>{statusPadItemMeta.ordenacao}</td>

                        <td>{statusPadItemMeta.ativo}</td>

                        <td>
                          <TextFormat type="date" value={statusPadItemMeta.dataPost} format={APP_DATE_FORMAT} />
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${statusPadItemMeta.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${statusPadItemMeta.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${statusPadItemMeta.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.statusPadItemMeta.home.notFound">No Status Pad Item Metas found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={statusPadItemMetaList && statusPadItemMetaList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ statusPadItemMeta, ...storeState }: IRootState) => ({
  statusPadItemMetaList: statusPadItemMeta.entities,
  totalItems: statusPadItemMeta.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StatusPadItemMeta);
