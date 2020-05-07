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
import {
  getProntuarioMotivoManifestacaoState,
  IProntuarioMotivoManifestacaoBaseState,
  getEntities
} from './prontuario-motivo-manifestacao.reducer';
import { IProntuarioMotivoManifestacao } from 'app/shared/model/prontuario-motivo-manifestacao.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IProntuarioMotivoManifestacaoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IProntuarioMotivoManifestacaoState extends IProntuarioMotivoManifestacaoBaseState, IPaginationBaseState {}

export class ProntuarioMotivoManifestacao extends React.Component<IProntuarioMotivoManifestacaoProps, IProntuarioMotivoManifestacaoState> {
  private myFormRef: any;

  constructor(props: IProntuarioMotivoManifestacaoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getProntuarioMotivoManifestacaoState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idProntuario: '',
        idPaciente: '',
        idMotivo: '',
        idMotivoFilho: '',
        idManifestacao: '',
        idManifestacaoFilho: '',
        sugestao: '',
        informacaoAdicional: ''
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
      'idProntuario=' +
      this.state.idProntuario +
      '&' +
      'idPaciente=' +
      this.state.idPaciente +
      '&' +
      'idMotivo=' +
      this.state.idMotivo +
      '&' +
      'idMotivoFilho=' +
      this.state.idMotivoFilho +
      '&' +
      'idManifestacao=' +
      this.state.idManifestacao +
      '&' +
      'idManifestacaoFilho=' +
      this.state.idManifestacaoFilho +
      '&' +
      'sugestao=' +
      this.state.sugestao +
      '&' +
      'informacaoAdicional=' +
      this.state.informacaoAdicional +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      idProntuario,
      idPaciente,
      idMotivo,
      idMotivoFilho,
      idManifestacao,
      idManifestacaoFilho,
      sugestao,
      informacaoAdicional,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      idProntuario,
      idPaciente,
      idMotivo,
      idMotivoFilho,
      idManifestacao,
      idManifestacaoFilho,
      sugestao,
      informacaoAdicional,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { prontuarioMotivoManifestacaoList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Prontuario Motivo Manifestacaos</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Prontuario Motivo Manifestacaos</span>
              <Button id="togglerFilterProntuarioMotivoManifestacao" className="btn btn-primary float-right jh-create-entity">
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
                <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.home.createLabel">
                  Create a new Prontuario Motivo Manifestacao
                </Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterProntuarioMotivoManifestacao">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idProntuario' ? (
                        <Col md="3">
                          <Row>
                            <Label id="idProntuarioLabel" for="prontuario-motivo-manifestacao-idProntuario">
                              <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.idProntuario">Id Prontuario</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idProntuario"
                              id="prontuario-motivo-manifestacao-idProntuario"
                              value={this.state.idProntuario}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idPaciente' ? (
                        <Col md="3">
                          <Row>
                            <Label id="idPacienteLabel" for="prontuario-motivo-manifestacao-idPaciente">
                              <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.idPaciente">Id Paciente</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idPaciente"
                              id="prontuario-motivo-manifestacao-idPaciente"
                              value={this.state.idPaciente}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idMotivo' ? (
                        <Col md="3">
                          <Row>
                            <Label id="idMotivoLabel" for="prontuario-motivo-manifestacao-idMotivo">
                              <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.idMotivo">Id Motivo</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idMotivo"
                              id="prontuario-motivo-manifestacao-idMotivo"
                              value={this.state.idMotivo}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idMotivoFilho' ? (
                        <Col md="3">
                          <Row>
                            <Label id="idMotivoFilhoLabel" for="prontuario-motivo-manifestacao-idMotivoFilho">
                              <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.idMotivoFilho">Id Motivo Filho</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idMotivoFilho"
                              id="prontuario-motivo-manifestacao-idMotivoFilho"
                              value={this.state.idMotivoFilho}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idManifestacao' ? (
                        <Col md="3">
                          <Row>
                            <Label id="idManifestacaoLabel" for="prontuario-motivo-manifestacao-idManifestacao">
                              <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.idManifestacao">Id Manifestacao</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idManifestacao"
                              id="prontuario-motivo-manifestacao-idManifestacao"
                              value={this.state.idManifestacao}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idManifestacaoFilho' ? (
                        <Col md="3">
                          <Row>
                            <Label id="idManifestacaoFilhoLabel" for="prontuario-motivo-manifestacao-idManifestacaoFilho">
                              <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.idManifestacaoFilho">
                                Id Manifestacao Filho
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idManifestacaoFilho"
                              id="prontuario-motivo-manifestacao-idManifestacaoFilho"
                              value={this.state.idManifestacaoFilho}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'sugestao' ? (
                        <Col md="3">
                          <Row>
                            <Label id="sugestaoLabel" for="prontuario-motivo-manifestacao-sugestao">
                              <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.sugestao">Sugestao</Translate>
                            </Label>
                            <AvInput id="prontuario-motivo-manifestacao-sugestao" type="textarea" name="sugestao" />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'informacaoAdicional' ? (
                        <Col md="3">
                          <Row>
                            <Label id="informacaoAdicionalLabel" for="prontuario-motivo-manifestacao-informacaoAdicional">
                              <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.informacaoAdicional">
                                Informacao Adicional
                              </Translate>
                            </Label>
                            <AvInput id="prontuario-motivo-manifestacao-informacaoAdicional" type="textarea" name="informacaoAdicional" />
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

              {prontuarioMotivoManifestacaoList && prontuarioMotivoManifestacaoList.length > 0 ? (
                <Table responsive aria-describedby="prontuario-motivo-manifestacao-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'idProntuario' ? (
                        <th className="hand" onClick={this.sort('idProntuario')}>
                          <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.idProntuario">Id Prontuario</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idPaciente' ? (
                        <th className="hand" onClick={this.sort('idPaciente')}>
                          <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.idPaciente">Id Paciente</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idMotivo' ? (
                        <th className="hand" onClick={this.sort('idMotivo')}>
                          <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.idMotivo">Id Motivo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idMotivoFilho' ? (
                        <th className="hand" onClick={this.sort('idMotivoFilho')}>
                          <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.idMotivoFilho">Id Motivo Filho</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idManifestacao' ? (
                        <th className="hand" onClick={this.sort('idManifestacao')}>
                          <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.idManifestacao">Id Manifestacao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idManifestacaoFilho' ? (
                        <th className="hand" onClick={this.sort('idManifestacaoFilho')}>
                          <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.idManifestacaoFilho">
                            Id Manifestacao Filho
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'sugestao' ? (
                        <th className="hand" onClick={this.sort('sugestao')}>
                          <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.sugestao">Sugestao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'informacaoAdicional' ? (
                        <th className="hand" onClick={this.sort('informacaoAdicional')}>
                          <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.informacaoAdicional">
                            Informacao Adicional
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {prontuarioMotivoManifestacaoList.map((prontuarioMotivoManifestacao, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${prontuarioMotivoManifestacao.id}`} color="link" size="sm">
                            {prontuarioMotivoManifestacao.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'idProntuario' ? <td>{prontuarioMotivoManifestacao.idProntuario}</td> : null}

                        {this.state.baseFilters !== 'idPaciente' ? <td>{prontuarioMotivoManifestacao.idPaciente}</td> : null}

                        {this.state.baseFilters !== 'idMotivo' ? <td>{prontuarioMotivoManifestacao.idMotivo}</td> : null}

                        {this.state.baseFilters !== 'idMotivoFilho' ? <td>{prontuarioMotivoManifestacao.idMotivoFilho}</td> : null}

                        {this.state.baseFilters !== 'idManifestacao' ? <td>{prontuarioMotivoManifestacao.idManifestacao}</td> : null}

                        {this.state.baseFilters !== 'idManifestacaoFilho' ? (
                          <td>{prontuarioMotivoManifestacao.idManifestacaoFilho}</td>
                        ) : null}

                        {this.state.baseFilters !== 'sugestao' ? (
                          <td>
                            {prontuarioMotivoManifestacao.sugestao ? Buffer.from(prontuarioMotivoManifestacao.sugestao).toString() : null}
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'informacaoAdicional' ? (
                          <td>
                            {prontuarioMotivoManifestacao.informacaoAdicional
                              ? Buffer.from(prontuarioMotivoManifestacao.informacaoAdicional).toString()
                              : null}
                          </td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button
                              tag={Link}
                              to={`${match.url}/${prontuarioMotivoManifestacao.id}?${this.getFiltersURL()}`}
                              color="info"
                              size="sm"
                            >
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${prontuarioMotivoManifestacao.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${prontuarioMotivoManifestacao.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.prontuarioMotivoManifestacao.home.notFound">
                    No Prontuario Motivo Manifestacaos found
                  </Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={prontuarioMotivoManifestacaoList && prontuarioMotivoManifestacaoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ prontuarioMotivoManifestacao, ...storeState }: IRootState) => ({
  prontuarioMotivoManifestacaoList: prontuarioMotivoManifestacao.entities,
  totalItems: prontuarioMotivoManifestacao.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProntuarioMotivoManifestacao);
