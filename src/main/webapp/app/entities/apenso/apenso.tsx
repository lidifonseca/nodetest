import React from 'react';
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
import { getEntities } from './apenso.reducer';
import { IApenso } from 'app/shared/model/apenso.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IProcesso } from 'app/shared/model/processo.model';
import { getEntities as getProcessos } from 'app/entities/processo/processo.reducer';

export interface IApensoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IApensoBaseState {
  numero: any;
  clase: any;
  apensamento: any;
  motivo: any;
  processo: any;
}
export interface IApensoState extends IApensoBaseState, IPaginationBaseState {}

export class Apenso extends React.Component<IApensoProps, IApensoState> {
  private myFormRef: any;

  getApensoState = (location): IApensoBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const numero = url.searchParams.get('numero') || '';
    const clase = url.searchParams.get('clase') || '';
    const apensamento = url.searchParams.get('apensamento') || '';
    const motivo = url.searchParams.get('motivo') || '';

    const processo = url.searchParams.get('processo') || '';

    return {
      numero,
      clase,
      apensamento,
      motivo,
      processo
    };
  };

  state: IApensoState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE),
    ...this.getApensoState(this.props.location)
  };

  componentDidMount() {
    this.getEntities();

    this.props.getProcessos();
  }

  cancelCourse = () => {
    this.setState(
      {
        numero: '',
        clase: '',
        apensamento: '',
        motivo: '',
        processo: ''
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
      'numero=' +
      this.state.numero +
      '&' +
      'clase=' +
      this.state.clase +
      '&' +
      'apensamento=' +
      this.state.apensamento +
      '&' +
      'motivo=' +
      this.state.motivo +
      '&' +
      'processo=' +
      this.state.processo +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { numero, clase, apensamento, motivo, processo, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(numero, clase, apensamento, motivo, processo, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { processos, apensoList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Apensos</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Apensos</span>
              <Button id="togglerFilterApenso" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.apenso.home.createLabel">Create a new Apenso</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterApenso">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <div className="col-md-3">
                        <Label id="numeroLabel" for="apenso-numero">
                          <Translate contentKey="generadorApp.apenso.numero">Numero</Translate>
                        </Label>

                        <AvInput
                          type="text"
                          name="numero"
                          id="apenso-numero"
                          value={this.state.numero}
                          validate={{
                            required: { value: true, errorMessage: translate('entity.validation.required') }
                          }}
                        />
                      </div>

                      <div className="col-md-3">
                        <Label id="claseLabel" for="apenso-clase">
                          <Translate contentKey="generadorApp.apenso.clase">Clase</Translate>
                        </Label>

                        <AvInput type="text" name="clase" id="apenso-clase" value={this.state.clase} />
                        <UncontrolledTooltip target="claseLabel">
                          <Translate contentKey="generadorApp.apenso.help.clase" />
                        </UncontrolledTooltip>
                      </div>

                      <div className="col-md-3">
                        <Label id="apensamentoLabel" for="apenso-apensamento">
                          <Translate contentKey="generadorApp.apenso.apensamento">Apensamento</Translate>
                        </Label>
                        <AvInput type="date" name="apensamento" id="apenso-apensamento" value={this.state.apensamento} />
                      </div>

                      <div className="col-md-3">
                        <Label id="motivoLabel" for="apenso-motivo">
                          <Translate contentKey="generadorApp.apenso.motivo">Motivo</Translate>
                        </Label>

                        <AvInput type="text" name="motivo" id="apenso-motivo" value={this.state.motivo} />
                      </div>
                      <div className="col-md-3">
                        <div>
                          <Label for="apenso-processo">
                            <Translate contentKey="generadorApp.apenso.processo">Processo</Translate>
                          </Label>
                          <AvInput id="apenso-processo" type="select" className="form-control" name="processoId">
                            <option value="" key="0" />
                            {processos
                              ? processos.map(otherEntity => (
                                  <option value={otherEntity.id} key={otherEntity.id}>
                                    {otherEntity.id}
                                  </option>
                                ))
                              : null}
                          </AvInput>
                        </div>
                      </div>
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

              {apensoList && apensoList.length > 0 ? (
                <Table responsive aria-describedby="apenso-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('numero')}>
                        <Translate contentKey="generadorApp.apenso.numero">Numero</Translate> <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('clase')}>
                        <Translate contentKey="generadorApp.apenso.clase">Clase</Translate> <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('apensamento')}>
                        <Translate contentKey="generadorApp.apenso.apensamento">Apensamento</Translate> <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('motivo')}>
                        <Translate contentKey="generadorApp.apenso.motivo">Motivo</Translate> <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.apenso.processo">Processo</Translate> <FontAwesomeIcon icon="sort" />
                      </th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {apensoList.map((apenso, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${apenso.id}`} color="link" size="sm">
                            {apenso.id}
                          </Button>
                        </td>
                        <td>{apenso.numero}</td>
                        <td>{apenso.clase}</td>
                        <td>
                          <TextFormat type="date" value={apenso.apensamento} format={APP_LOCAL_DATE_FORMAT} />
                        </td>
                        <td>{apenso.motivo}</td>
                        <td>{apenso.processoId ? <Link to={`processo/${apenso.processoId}`}>{apenso.processoId}</Link> : ''}</td>
                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${apenso.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${apenso.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${apenso.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.apenso.home.notFound">No Apensos found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={apensoList && apensoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ apenso, ...storeState }: IRootState) => ({
  processos: storeState.processo.entities,
  apensoList: apenso.entities,
  totalItems: apenso.totalItems
});

const mapDispatchToProps = {
  getProcessos,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Apenso);
