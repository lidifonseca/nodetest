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
import { getEntities } from './motivo-internacao.reducer';
import { IMotivoInternacao } from 'app/shared/model/motivo-internacao.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IMotivoInternacaoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IMotivoInternacaoBaseState {
  nome: any;
  idPai: any;
  ativo: any;
  classe: any;
  name: any;
}
export interface IMotivoInternacaoState extends IMotivoInternacaoBaseState, IPaginationBaseState {}

export class MotivoInternacao extends React.Component<IMotivoInternacaoProps, IMotivoInternacaoState> {
  private myFormRef: any;

  constructor(props: IMotivoInternacaoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getMotivoInternacaoState(this.props.location)
    };
  }

  getMotivoInternacaoState = (location): IMotivoInternacaoBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const nome = url.searchParams.get('nome') || '';
    const idPai = url.searchParams.get('idPai') || '';
    const ativo = url.searchParams.get('ativo') || '';
    const classe = url.searchParams.get('classe') || '';
    const name = url.searchParams.get('name') || '';

    return {
      nome,
      idPai,
      ativo,
      classe,
      name
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
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Motivo Internacaos</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Motivo Internacaos</span>
              <Button id="togglerFilterMotivoInternacao" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.motivoInternacao.home.createLabel">Create a new Motivo Internacao</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterMotivoInternacao">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="nomeLabel" for="motivo-internacao-nome">
                            <Translate contentKey="generadorApp.motivoInternacao.nome">Nome</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="nome"
                            id="motivo-internacao-nome"
                            value={this.state.nome}
                            validate={{
                              maxLength: { value: 255, errorMessage: translate('entity.validation.maxlength', { max: 255 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idPaiLabel" for="motivo-internacao-idPai">
                            <Translate contentKey="generadorApp.motivoInternacao.idPai">Id Pai</Translate>
                          </Label>
                          <AvInput type="string" name="idPai" id="motivo-internacao-idPai" value={this.state.idPai} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="motivo-internacao-ativo">
                            <Translate contentKey="generadorApp.motivoInternacao.ativo">Ativo</Translate>
                          </Label>
                          <AvInput type="string" name="ativo" id="motivo-internacao-ativo" value={this.state.ativo} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="classeLabel" for="motivo-internacao-classe">
                            <Translate contentKey="generadorApp.motivoInternacao.classe">Classe</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="classe"
                            id="motivo-internacao-classe"
                            value={this.state.classe}
                            validate={{
                              maxLength: { value: 40, errorMessage: translate('entity.validation.maxlength', { max: 40 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="nameLabel" for="motivo-internacao-name">
                            <Translate contentKey="generadorApp.motivoInternacao.name">Name</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="name"
                            id="motivo-internacao-name"
                            value={this.state.name}
                            validate={{
                              maxLength: { value: 20, errorMessage: translate('entity.validation.maxlength', { max: 20 }) }
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

              {motivoInternacaoList && motivoInternacaoList.length > 0 ? (
                <Table responsive aria-describedby="motivo-internacao-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('nome')}>
                        <Translate contentKey="generadorApp.motivoInternacao.nome">Nome</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idPai')}>
                        <Translate contentKey="generadorApp.motivoInternacao.idPai">Id Pai</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.motivoInternacao.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('classe')}>
                        <Translate contentKey="generadorApp.motivoInternacao.classe">Classe</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('name')}>
                        <Translate contentKey="generadorApp.motivoInternacao.name">Name</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

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

                        <td>{motivoInternacao.nome}</td>

                        <td>{motivoInternacao.idPai}</td>

                        <td>{motivoInternacao.ativo}</td>

                        <td>{motivoInternacao.classe}</td>

                        <td>{motivoInternacao.name}</td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${motivoInternacao.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${motivoInternacao.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${motivoInternacao.id}/delete`} color="danger" size="sm">
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