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
import { getEntities } from './diario-tags.reducer';
import { IDiarioTags } from 'app/shared/model/diario-tags.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IDiarioTagsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IDiarioTagsBaseState {
  nome: any;
  idPai: any;
  nomeId: any;
  ativo: any;
}
export interface IDiarioTagsState extends IDiarioTagsBaseState, IPaginationBaseState {}

export class DiarioTags extends React.Component<IDiarioTagsProps, IDiarioTagsState> {
  private myFormRef: any;

  constructor(props: IDiarioTagsProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getDiarioTagsState(this.props.location)
    };
  }

  getDiarioTagsState = (location): IDiarioTagsBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const nome = url.searchParams.get('nome') || '';
    const idPai = url.searchParams.get('idPai') || '';
    const nomeId = url.searchParams.get('nomeId') || '';
    const ativo = url.searchParams.get('ativo') || '';

    return {
      nome,
      idPai,
      nomeId,
      ativo
    };
  };

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        nome: '',
        idPai: '',
        nomeId: '',
        ativo: ''
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
      'nome=' +
      this.state.nome +
      '&' +
      'idPai=' +
      this.state.idPai +
      '&' +
      'nomeId=' +
      this.state.nomeId +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { nome, idPai, nomeId, ativo, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(nome, idPai, nomeId, ativo, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { diarioTagsList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Diario Tags</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Diario Tags</span>
              <Button id="togglerFilterDiarioTags" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.diarioTags.home.createLabel">Create a new Diario Tags</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterDiarioTags">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="nomeLabel" for="diario-tags-nome">
                            <Translate contentKey="generadorApp.diarioTags.nome">Nome</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="nome"
                            id="diario-tags-nome"
                            value={this.state.nome}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              maxLength: { value: 45, errorMessage: translate('entity.validation.maxlength', { max: 45 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idPaiLabel" for="diario-tags-idPai">
                            <Translate contentKey="generadorApp.diarioTags.idPai">Id Pai</Translate>
                          </Label>
                          <AvInput type="string" name="idPai" id="diario-tags-idPai" value={this.state.idPai} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="nomeIdLabel" for="diario-tags-nomeId">
                            <Translate contentKey="generadorApp.diarioTags.nomeId">Nome Id</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="nomeId"
                            id="diario-tags-nomeId"
                            value={this.state.nomeId}
                            validate={{
                              maxLength: { value: 45, errorMessage: translate('entity.validation.maxlength', { max: 45 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="diario-tags-ativo">
                            <Translate contentKey="generadorApp.diarioTags.ativo">Ativo</Translate>
                          </Label>
                          <AvInput type="string" name="ativo" id="diario-tags-ativo" value={this.state.ativo} />
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

              {diarioTagsList && diarioTagsList.length > 0 ? (
                <Table responsive aria-describedby="diario-tags-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('nome')}>
                        <Translate contentKey="generadorApp.diarioTags.nome">Nome</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idPai')}>
                        <Translate contentKey="generadorApp.diarioTags.idPai">Id Pai</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('nomeId')}>
                        <Translate contentKey="generadorApp.diarioTags.nomeId">Nome Id</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.diarioTags.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {diarioTagsList.map((diarioTags, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${diarioTags.id}`} color="link" size="sm">
                            {diarioTags.id}
                          </Button>
                        </td>

                        <td>{diarioTags.nome}</td>

                        <td>{diarioTags.idPai}</td>

                        <td>{diarioTags.nomeId}</td>

                        <td>{diarioTags.ativo}</td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${diarioTags.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${diarioTags.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${diarioTags.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.diarioTags.home.notFound">No Diario Tags found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={diarioTagsList && diarioTagsList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ diarioTags, ...storeState }: IRootState) => ({
  diarioTagsList: diarioTags.entities,
  totalItems: diarioTags.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DiarioTags);