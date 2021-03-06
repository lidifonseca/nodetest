/* eslint complexity: ["error", 300] */
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
import { getProntuarioTipoMotivoState, IProntuarioTipoMotivoBaseState, getEntities } from './prontuario-tipo-motivo.reducer';
import { IProntuarioTipoMotivo } from 'app/shared/model/prontuario-tipo-motivo.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IProntuarioTipoMotivoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IProntuarioTipoMotivoState extends IProntuarioTipoMotivoBaseState, IPaginationBaseState {}

export class ProntuarioTipoMotivo extends React.Component<IProntuarioTipoMotivoProps, IProntuarioTipoMotivoState> {
  private myFormRef: any;

  constructor(props: IProntuarioTipoMotivoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getProntuarioTipoMotivoState(this.props.location)
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
        name: '',
        idTipoProntuario: ''
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
      'idTipoProntuario=' +
      this.state.idTipoProntuario +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { nome, idPai, ativo, classe, name, idTipoProntuario, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(nome, idPai, ativo, classe, name, idTipoProntuario, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { prontuarioTipoMotivoList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Prontuario Tipo Motivos</span>
          <Button id="togglerFilterProntuarioTipoMotivo" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.prontuarioTipoMotivo.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.prontuarioTipoMotivo.home.createLabel">Create a new Prontuario Tipo Motivo</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Prontuario Tipo Motivos</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterProntuarioTipoMotivo">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'nome' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="nomeLabel" for="prontuario-tipo-motivo-nome">
                              <Translate contentKey="generadorApp.prontuarioTipoMotivo.nome">Nome</Translate>
                            </Label>

                            <AvInput type="text" name="nome" id="prontuario-tipo-motivo-nome" value={this.state.nome} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idPai' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idPaiLabel" for="prontuario-tipo-motivo-idPai">
                              <Translate contentKey="generadorApp.prontuarioTipoMotivo.idPai">Id Pai</Translate>
                            </Label>
                            <AvInput type="string" name="idPai" id="prontuario-tipo-motivo-idPai" value={this.state.idPai} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ativo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ativoLabel" check>
                              <AvInput id="prontuario-tipo-motivo-ativo" type="checkbox" className="form-control" name="ativo" />
                              <Translate contentKey="generadorApp.prontuarioTipoMotivo.ativo">Ativo</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'classe' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="classeLabel" for="prontuario-tipo-motivo-classe">
                              <Translate contentKey="generadorApp.prontuarioTipoMotivo.classe">Classe</Translate>
                            </Label>

                            <AvInput type="text" name="classe" id="prontuario-tipo-motivo-classe" value={this.state.classe} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'name' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="nameLabel" for="prontuario-tipo-motivo-name">
                              <Translate contentKey="generadorApp.prontuarioTipoMotivo.name">Name</Translate>
                            </Label>

                            <AvInput type="text" name="name" id="prontuario-tipo-motivo-name" value={this.state.name} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'idTipoProntuario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idTipoProntuarioLabel" for="prontuario-tipo-motivo-idTipoProntuario">
                              <Translate contentKey="generadorApp.prontuarioTipoMotivo.idTipoProntuario">Id Tipo Prontuario</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idTipoProntuario"
                              id="prontuario-tipo-motivo-idTipoProntuario"
                              value={this.state.idTipoProntuario}
                            />
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.prontuarioTipoMotivo.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.prontuarioTipoMotivo.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {prontuarioTipoMotivoList && prontuarioTipoMotivoList.length > 0 ? (
                <Table responsive aria-describedby="prontuario-tipo-motivo-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'nome' ? (
                        <th className="hand" onClick={this.sort('nome')}>
                          <Translate contentKey="generadorApp.prontuarioTipoMotivo.nome">Nome</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idPai' ? (
                        <th className="hand" onClick={this.sort('idPai')}>
                          <Translate contentKey="generadorApp.prontuarioTipoMotivo.idPai">Id Pai</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ativo' ? (
                        <th className="hand" onClick={this.sort('ativo')}>
                          <Translate contentKey="generadorApp.prontuarioTipoMotivo.ativo">Ativo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'classe' ? (
                        <th className="hand" onClick={this.sort('classe')}>
                          <Translate contentKey="generadorApp.prontuarioTipoMotivo.classe">Classe</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'name' ? (
                        <th className="hand" onClick={this.sort('name')}>
                          <Translate contentKey="generadorApp.prontuarioTipoMotivo.name">Name</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'idTipoProntuario' ? (
                        <th className="hand" onClick={this.sort('idTipoProntuario')}>
                          <Translate contentKey="generadorApp.prontuarioTipoMotivo.idTipoProntuario">Id Tipo Prontuario</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {prontuarioTipoMotivoList.map((prontuarioTipoMotivo, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${prontuarioTipoMotivo.id}`} color="link" size="sm">
                            {prontuarioTipoMotivo.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'nome' ? <td>{prontuarioTipoMotivo.nome}</td> : null}

                        {this.state.baseFilters !== 'idPai' ? <td>{prontuarioTipoMotivo.idPai}</td> : null}

                        {this.state.baseFilters !== 'ativo' ? <td>{prontuarioTipoMotivo.ativo ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'classe' ? <td>{prontuarioTipoMotivo.classe}</td> : null}

                        {this.state.baseFilters !== 'name' ? <td>{prontuarioTipoMotivo.name}</td> : null}

                        {this.state.baseFilters !== 'idTipoProntuario' ? <td>{prontuarioTipoMotivo.idTipoProntuario}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button
                              tag={Link}
                              to={`${match.url}/${prontuarioTipoMotivo.id}?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${prontuarioTipoMotivo.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${prontuarioTipoMotivo.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.prontuarioTipoMotivo.home.notFound">No Prontuario Tipo Motivos found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={prontuarioTipoMotivoList && prontuarioTipoMotivoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ prontuarioTipoMotivo, ...storeState }: IRootState) => ({
  prontuarioTipoMotivoList: prontuarioTipoMotivo.entities,
  totalItems: prontuarioTipoMotivo.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProntuarioTipoMotivo);
