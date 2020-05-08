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
import { getMotivoInternacaoState, IMotivoInternacaoBaseState, getEntities } from './motivo-internacao.reducer';
import { IMotivoInternacao } from 'app/shared/model/motivo-internacao.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IMotivoInternacaoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IMotivoInternacaoState extends IMotivoInternacaoBaseState, IPaginationBaseState {}

export class MotivoInternacao extends React.Component<IMotivoInternacaoProps, IMotivoInternacaoState> {
  private myFormRef: any;

  constructor(props: IMotivoInternacaoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getMotivoInternacaoState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        nome: '',
        idPai: '',
        ativo: '',
        classe: '',
        name: ''
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
      'nome=' +
      this.state.nome +
      '&' +
      'idPai=' +
      this.state.idPai +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'classe=' +
      this.state.classe +
      '&' +
      'name=' +
      this.state.name +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { nome, idPai, ativo, classe, name, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(nome, idPai, ativo, classe, name, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { motivoInternacaoList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Motivo Internacaos</span>
          <Button id="togglerFilterMotivoInternacao" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.motivoInternacao.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.motivoInternacao.home.createLabel">Create a new Motivo Internacao</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Motivo Internacaos</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterMotivoInternacao">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'nome' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="nomeLabel" for="motivo-internacao-nome">
                              <Translate contentKey="generadorApp.motivoInternacao.nome">Nome</Translate>
                            </Label>

                            <AvInput type="text" name="nome" id="motivo-internacao-nome" value={this.state.nome} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idPai' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idPaiLabel" for="motivo-internacao-idPai">
                              <Translate contentKey="generadorApp.motivoInternacao.idPai">Id Pai</Translate>
                            </Label>
                            <AvInput type="string" name="idPai" id="motivo-internacao-idPai" value={this.state.idPai} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ativo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ativoLabel" for="motivo-internacao-ativo">
                              <Translate contentKey="generadorApp.motivoInternacao.ativo">Ativo</Translate>
                            </Label>
                            <AvInput type="string" name="ativo" id="motivo-internacao-ativo" value={this.state.ativo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'classe' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="classeLabel" for="motivo-internacao-classe">
                              <Translate contentKey="generadorApp.motivoInternacao.classe">Classe</Translate>
                            </Label>

                            <AvInput type="text" name="classe" id="motivo-internacao-classe" value={this.state.classe} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'name' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="nameLabel" for="motivo-internacao-name">
                              <Translate contentKey="generadorApp.motivoInternacao.name">Name</Translate>
                            </Label>

                            <AvInput type="text" name="name" id="motivo-internacao-name" value={this.state.name} />
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.motivoInternacao.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.motivoInternacao.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {motivoInternacaoList && motivoInternacaoList.length > 0 ? (
                <Table responsive aria-describedby="motivo-internacao-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'nome' ? (
                        <th className="hand" onClick={this.sort('nome')}>
                          <Translate contentKey="generadorApp.motivoInternacao.nome">Nome</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idPai' ? (
                        <th className="hand" onClick={this.sort('idPai')}>
                          <Translate contentKey="generadorApp.motivoInternacao.idPai">Id Pai</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ativo' ? (
                        <th className="hand" onClick={this.sort('ativo')}>
                          <Translate contentKey="generadorApp.motivoInternacao.ativo">Ativo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'classe' ? (
                        <th className="hand" onClick={this.sort('classe')}>
                          <Translate contentKey="generadorApp.motivoInternacao.classe">Classe</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'name' ? (
                        <th className="hand" onClick={this.sort('name')}>
                          <Translate contentKey="generadorApp.motivoInternacao.name">Name</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {motivoInternacaoList.map((motivoInternacao, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${motivoInternacao.id}`} color="link" size="sm">
                            {motivoInternacao.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'nome' ? <td>{motivoInternacao.nome}</td> : null}

                        {this.state.baseFilters !== 'idPai' ? <td>{motivoInternacao.idPai}</td> : null}

                        {this.state.baseFilters !== 'ativo' ? <td>{motivoInternacao.ativo}</td> : null}

                        {this.state.baseFilters !== 'classe' ? <td>{motivoInternacao.classe}</td> : null}

                        {this.state.baseFilters !== 'name' ? <td>{motivoInternacao.name}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${motivoInternacao.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${motivoInternacao.id}/edit?${this.getFiltersURL()}`}
                              color="primary"
                              size="sm"
                            >
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${motivoInternacao.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.motivoInternacao.home.notFound">No Motivo Internacaos found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={motivoInternacaoList && motivoInternacaoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ motivoInternacao, ...storeState }: IRootState) => ({
  motivoInternacaoList: motivoInternacao.entities,
  totalItems: motivoInternacao.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MotivoInternacao);
