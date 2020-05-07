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
import { getLicaoCasaEvolucaoState, ILicaoCasaEvolucaoBaseState, getEntities } from './licao-casa-evolucao.reducer';
import { ILicaoCasaEvolucao } from 'app/shared/model/licao-casa-evolucao.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ILicaoCasaEvolucaoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ILicaoCasaEvolucaoState extends ILicaoCasaEvolucaoBaseState, IPaginationBaseState {}

export class LicaoCasaEvolucao extends React.Component<ILicaoCasaEvolucaoProps, ILicaoCasaEvolucaoState> {
  private myFormRef: any;

  constructor(props: ILicaoCasaEvolucaoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getLicaoCasaEvolucaoState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        licaoCasaId: '',
        atualizadoEm: '',
        realizada: '',
        realizadaEm: '',
        observacoes: '',
        instrucoes: '',
        dataAgenda: '',
        qtdLembrete: ''
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
      'licaoCasaId=' +
      this.state.licaoCasaId +
      '&' +
      'atualizadoEm=' +
      this.state.atualizadoEm +
      '&' +
      'realizada=' +
      this.state.realizada +
      '&' +
      'realizadaEm=' +
      this.state.realizadaEm +
      '&' +
      'observacoes=' +
      this.state.observacoes +
      '&' +
      'instrucoes=' +
      this.state.instrucoes +
      '&' +
      'dataAgenda=' +
      this.state.dataAgenda +
      '&' +
      'qtdLembrete=' +
      this.state.qtdLembrete +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      licaoCasaId,
      atualizadoEm,
      realizada,
      realizadaEm,
      observacoes,
      instrucoes,
      dataAgenda,
      qtdLembrete,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      licaoCasaId,
      atualizadoEm,
      realizada,
      realizadaEm,
      observacoes,
      instrucoes,
      dataAgenda,
      qtdLembrete,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { licaoCasaEvolucaoList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Licao Casa Evolucaos</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Licao Casa Evolucaos</span>
              <Button id="togglerFilterLicaoCasaEvolucao" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link
                to={`${match.url}/new?${this.getFiltersURL()}`}
                className="btn btn-primary float-right jh-create-entity"
                id="jh-create-entity"
              >
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.licaoCasaEvolucao.home.createLabel">Create a new Licao Casa Evolucao</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterLicaoCasaEvolucao">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'licaoCasaId' ? (
                        <Col md="3">
                          <Row>
                            <Label id="licaoCasaIdLabel" for="licao-casa-evolucao-licaoCasaId">
                              <Translate contentKey="generadorApp.licaoCasaEvolucao.licaoCasaId">Licao Casa Id</Translate>
                            </Label>
                            <AvInput type="string" name="licaoCasaId" id="licao-casa-evolucao-licaoCasaId" value={this.state.licaoCasaId} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'atualizadoEm' ? (
                        <Col md="3">
                          <Row>
                            <Label id="atualizadoEmLabel" for="licao-casa-evolucao-atualizadoEm">
                              <Translate contentKey="generadorApp.licaoCasaEvolucao.atualizadoEm">Atualizado Em</Translate>
                            </Label>
                            <AvInput
                              id="licao-casa-evolucao-atualizadoEm"
                              type="datetime-local"
                              className="form-control"
                              name="atualizadoEm"
                              placeholder={'YYYY-MM-DD HH:mm'}
                              value={this.state.atualizadoEm ? convertDateTimeFromServer(this.state.atualizadoEm) : null}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'realizada' ? (
                        <Col md="3">
                          <Row>
                            <Label id="realizadaLabel" check>
                              <AvInput id="licao-casa-evolucao-realizada" type="checkbox" className="form-control" name="realizada" />
                              <Translate contentKey="generadorApp.licaoCasaEvolucao.realizada">Realizada</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'realizadaEm' ? (
                        <Col md="3">
                          <Row>
                            <Label id="realizadaEmLabel" for="licao-casa-evolucao-realizadaEm">
                              <Translate contentKey="generadorApp.licaoCasaEvolucao.realizadaEm">Realizada Em</Translate>
                            </Label>
                            <AvInput
                              id="licao-casa-evolucao-realizadaEm"
                              type="datetime-local"
                              className="form-control"
                              name="realizadaEm"
                              placeholder={'YYYY-MM-DD HH:mm'}
                              value={this.state.realizadaEm ? convertDateTimeFromServer(this.state.realizadaEm) : null}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'observacoes' ? (
                        <Col md="3">
                          <Row>
                            <Label id="observacoesLabel" for="licao-casa-evolucao-observacoes">
                              <Translate contentKey="generadorApp.licaoCasaEvolucao.observacoes">Observacoes</Translate>
                            </Label>

                            <AvInput type="text" name="observacoes" id="licao-casa-evolucao-observacoes" value={this.state.observacoes} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'instrucoes' ? (
                        <Col md="3">
                          <Row>
                            <Label id="instrucoesLabel" for="licao-casa-evolucao-instrucoes">
                              <Translate contentKey="generadorApp.licaoCasaEvolucao.instrucoes">Instrucoes</Translate>
                            </Label>

                            <AvInput type="text" name="instrucoes" id="licao-casa-evolucao-instrucoes" value={this.state.instrucoes} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dataAgenda' ? (
                        <Col md="3">
                          <Row>
                            <Label id="dataAgendaLabel" for="licao-casa-evolucao-dataAgenda">
                              <Translate contentKey="generadorApp.licaoCasaEvolucao.dataAgenda">Data Agenda</Translate>
                            </Label>
                            <AvInput
                              id="licao-casa-evolucao-dataAgenda"
                              type="datetime-local"
                              className="form-control"
                              name="dataAgenda"
                              placeholder={'YYYY-MM-DD HH:mm'}
                              value={this.state.dataAgenda ? convertDateTimeFromServer(this.state.dataAgenda) : null}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'qtdLembrete' ? (
                        <Col md="3">
                          <Row>
                            <Label id="qtdLembreteLabel" check>
                              <AvInput id="licao-casa-evolucao-qtdLembrete" type="checkbox" className="form-control" name="qtdLembrete" />
                              <Translate contentKey="generadorApp.licaoCasaEvolucao.qtdLembrete">Qtd Lembrete</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}
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

              {licaoCasaEvolucaoList && licaoCasaEvolucaoList.length > 0 ? (
                <Table responsive aria-describedby="licao-casa-evolucao-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'licaoCasaId' ? (
                        <th className="hand" onClick={this.sort('licaoCasaId')}>
                          <Translate contentKey="generadorApp.licaoCasaEvolucao.licaoCasaId">Licao Casa Id</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'atualizadoEm' ? (
                        <th className="hand" onClick={this.sort('atualizadoEm')}>
                          <Translate contentKey="generadorApp.licaoCasaEvolucao.atualizadoEm">Atualizado Em</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'realizada' ? (
                        <th className="hand" onClick={this.sort('realizada')}>
                          <Translate contentKey="generadorApp.licaoCasaEvolucao.realizada">Realizada</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'realizadaEm' ? (
                        <th className="hand" onClick={this.sort('realizadaEm')}>
                          <Translate contentKey="generadorApp.licaoCasaEvolucao.realizadaEm">Realizada Em</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'observacoes' ? (
                        <th className="hand" onClick={this.sort('observacoes')}>
                          <Translate contentKey="generadorApp.licaoCasaEvolucao.observacoes">Observacoes</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'instrucoes' ? (
                        <th className="hand" onClick={this.sort('instrucoes')}>
                          <Translate contentKey="generadorApp.licaoCasaEvolucao.instrucoes">Instrucoes</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'dataAgenda' ? (
                        <th className="hand" onClick={this.sort('dataAgenda')}>
                          <Translate contentKey="generadorApp.licaoCasaEvolucao.dataAgenda">Data Agenda</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'qtdLembrete' ? (
                        <th className="hand" onClick={this.sort('qtdLembrete')}>
                          <Translate contentKey="generadorApp.licaoCasaEvolucao.qtdLembrete">Qtd Lembrete</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {licaoCasaEvolucaoList.map((licaoCasaEvolucao, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${licaoCasaEvolucao.id}`} color="link" size="sm">
                            {licaoCasaEvolucao.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'licaoCasaId' ? <td>{licaoCasaEvolucao.licaoCasaId}</td> : null}

                        {this.state.baseFilters !== 'atualizadoEm' ? (
                          <td>
                            <TextFormat type="date" value={licaoCasaEvolucao.atualizadoEm} format={APP_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'realizada' ? <td>{licaoCasaEvolucao.realizada ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'realizadaEm' ? (
                          <td>
                            <TextFormat type="date" value={licaoCasaEvolucao.realizadaEm} format={APP_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'observacoes' ? <td>{licaoCasaEvolucao.observacoes}</td> : null}

                        {this.state.baseFilters !== 'instrucoes' ? <td>{licaoCasaEvolucao.instrucoes}</td> : null}

                        {this.state.baseFilters !== 'dataAgenda' ? (
                          <td>
                            <TextFormat type="date" value={licaoCasaEvolucao.dataAgenda} format={APP_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'qtdLembrete' ? <td>{licaoCasaEvolucao.qtdLembrete ? 'true' : 'false'}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${licaoCasaEvolucao.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${licaoCasaEvolucao.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${licaoCasaEvolucao.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.licaoCasaEvolucao.home.notFound">No Licao Casa Evolucaos found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={licaoCasaEvolucaoList && licaoCasaEvolucaoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ licaoCasaEvolucao, ...storeState }: IRootState) => ({
  licaoCasaEvolucaoList: licaoCasaEvolucao.entities,
  totalItems: licaoCasaEvolucao.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LicaoCasaEvolucao);
