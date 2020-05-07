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
  getProntuarioTipoManifestacaoState,
  IProntuarioTipoManifestacaoBaseState,
  getEntities
} from './prontuario-tipo-manifestacao.reducer';
import { IProntuarioTipoManifestacao } from 'app/shared/model/prontuario-tipo-manifestacao.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IProntuarioTipoManifestacaoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IProntuarioTipoManifestacaoState extends IProntuarioTipoManifestacaoBaseState, IPaginationBaseState {}

export class ProntuarioTipoManifestacao extends React.Component<IProntuarioTipoManifestacaoProps, IProntuarioTipoManifestacaoState> {
  private myFormRef: any;

  constructor(props: IProntuarioTipoManifestacaoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getProntuarioTipoManifestacaoState(this.props.location)
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
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { nome, idPai, ativo, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(nome, idPai, ativo, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { prontuarioTipoManifestacaoList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Prontuario Tipo Manifestacaos</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Prontuario Tipo Manifestacaos</span>
              <Button id="togglerFilterProntuarioTipoManifestacao" className="btn btn-primary float-right jh-create-entity">
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
                <Translate contentKey="generadorApp.prontuarioTipoManifestacao.home.createLabel">
                  Create a new Prontuario Tipo Manifestacao
                </Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterProntuarioTipoManifestacao">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'nome' ? (
                        <Col md="3">
                          <Row>
                            <Label id="nomeLabel" for="prontuario-tipo-manifestacao-nome">
                              <Translate contentKey="generadorApp.prontuarioTipoManifestacao.nome">Nome</Translate>
                            </Label>

                            <AvInput type="text" name="nome" id="prontuario-tipo-manifestacao-nome" value={this.state.nome} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idPai' ? (
                        <Col md="3">
                          <Row>
                            <Label id="idPaiLabel" for="prontuario-tipo-manifestacao-idPai">
                              <Translate contentKey="generadorApp.prontuarioTipoManifestacao.idPai">Id Pai</Translate>
                            </Label>
                            <AvInput type="string" name="idPai" id="prontuario-tipo-manifestacao-idPai" value={this.state.idPai} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ativo' ? (
                        <Col md="3">
                          <Row>
                            <Label id="ativoLabel" for="prontuario-tipo-manifestacao-ativo">
                              <Translate contentKey="generadorApp.prontuarioTipoManifestacao.ativo">Ativo</Translate>
                            </Label>
                            <AvInput type="string" name="ativo" id="prontuario-tipo-manifestacao-ativo" value={this.state.ativo} />
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

              {prontuarioTipoManifestacaoList && prontuarioTipoManifestacaoList.length > 0 ? (
                <Table responsive aria-describedby="prontuario-tipo-manifestacao-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'nome' ? (
                        <th className="hand" onClick={this.sort('nome')}>
                          <Translate contentKey="generadorApp.prontuarioTipoManifestacao.nome">Nome</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idPai' ? (
                        <th className="hand" onClick={this.sort('idPai')}>
                          <Translate contentKey="generadorApp.prontuarioTipoManifestacao.idPai">Id Pai</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ativo' ? (
                        <th className="hand" onClick={this.sort('ativo')}>
                          <Translate contentKey="generadorApp.prontuarioTipoManifestacao.ativo">Ativo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {prontuarioTipoManifestacaoList.map((prontuarioTipoManifestacao, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${prontuarioTipoManifestacao.id}`} color="link" size="sm">
                            {prontuarioTipoManifestacao.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'nome' ? <td>{prontuarioTipoManifestacao.nome}</td> : null}

                        {this.state.baseFilters !== 'idPai' ? <td>{prontuarioTipoManifestacao.idPai}</td> : null}

                        {this.state.baseFilters !== 'ativo' ? <td>{prontuarioTipoManifestacao.ativo}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button
                              tag={Link}
                              to={`${match.url}/${prontuarioTipoManifestacao.id}?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${prontuarioTipoManifestacao.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${prontuarioTipoManifestacao.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.prontuarioTipoManifestacao.home.notFound">
                    No Prontuario Tipo Manifestacaos found
                  </Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={prontuarioTipoManifestacaoList && prontuarioTipoManifestacaoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ prontuarioTipoManifestacao, ...storeState }: IRootState) => ({
  prontuarioTipoManifestacaoList: prontuarioTipoManifestacao.entities,
  totalItems: prontuarioTipoManifestacao.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProntuarioTipoManifestacao);
