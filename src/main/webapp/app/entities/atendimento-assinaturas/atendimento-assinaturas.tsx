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
import { getAtendimentoAssinaturasState, IAtendimentoAssinaturasBaseState, getEntities } from './atendimento-assinaturas.reducer';
import { IAtendimentoAssinaturas } from 'app/shared/model/atendimento-assinaturas.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IAtendimento } from 'app/shared/model/atendimento.model';
import { getEntities as getAtendimentos } from 'app/entities/atendimento/atendimento.reducer';
import { IProfissional } from 'app/shared/model/profissional.model';
import { getEntities as getProfissionals } from 'app/entities/profissional/profissional.reducer';
import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';

export interface IAtendimentoAssinaturasProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IAtendimentoAssinaturasState extends IAtendimentoAssinaturasBaseState, IPaginationBaseState {}

export class AtendimentoAssinaturas extends React.Component<IAtendimentoAssinaturasProps, IAtendimentoAssinaturasState> {
  private myFormRef: any;

  constructor(props: IAtendimentoAssinaturasProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getAtendimentoAssinaturasState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getAtendimentos();
    this.props.getProfissionals();
    this.props.getPacientes();
  }

  cancelCourse = () => {
    this.setState(
      {
        arquivoAssinatura: '',
        atendimento: '',
        profissional: '',
        paciente: ''
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
      'arquivoAssinatura=' +
      this.state.arquivoAssinatura +
      '&' +
      'atendimento=' +
      this.state.atendimento +
      '&' +
      'profissional=' +
      this.state.profissional +
      '&' +
      'paciente=' +
      this.state.paciente +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { arquivoAssinatura, atendimento, profissional, paciente, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(arquivoAssinatura, atendimento, profissional, paciente, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { atendimentos, profissionals, pacientes, atendimentoAssinaturasList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Atendimento Assinaturas</span>
          <Button id="togglerFilterAtendimentoAssinaturas" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.atendimentoAssinaturas.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.atendimentoAssinaturas.home.createLabel">Create a new Atendimento Assinaturas</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Atendimento Assinaturas</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterAtendimentoAssinaturas">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'arquivoAssinatura' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="arquivoAssinaturaLabel" for="atendimento-assinaturas-arquivoAssinatura">
                              <Translate contentKey="generadorApp.atendimentoAssinaturas.arquivoAssinatura">Arquivo Assinatura</Translate>
                            </Label>

                            <AvInput
                              type="text"
                              name="arquivoAssinatura"
                              id="atendimento-assinaturas-arquivoAssinatura"
                              value={this.state.arquivoAssinatura}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'atendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="atendimento-assinaturas-atendimento">
                                <Translate contentKey="generadorApp.atendimentoAssinaturas.atendimento">Atendimento</Translate>
                              </Label>
                              <Select
                                id="atendimento-assinaturas-atendimento"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  atendimentos
                                    ? atendimentos.map(p =>
                                        this.state.atendimento.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null
                                      )
                                    : null
                                }
                                options={atendimentos ? atendimentos.map(option => ({ value: option.id, label: option.id })) : null}
                                onChange={options => this.setState({ atendimento: options.map(option => option['value']).join(',') })}
                                name={'atendimento'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'profissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="atendimento-assinaturas-profissional">
                                <Translate contentKey="generadorApp.atendimentoAssinaturas.profissional">Profissional</Translate>
                              </Label>
                              <Select
                                id="atendimento-assinaturas-profissional"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  profissionals
                                    ? profissionals.map(p =>
                                        this.state.profissional.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null
                                      )
                                    : null
                                }
                                options={profissionals ? profissionals.map(option => ({ value: option.id, label: option.id })) : null}
                                onChange={options => this.setState({ profissional: options.map(option => option['value']).join(',') })}
                                name={'profissional'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'paciente' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="atendimento-assinaturas-paciente">
                                <Translate contentKey="generadorApp.atendimentoAssinaturas.paciente">Paciente</Translate>
                              </Label>
                              <Select
                                id="atendimento-assinaturas-paciente"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  pacientes
                                    ? pacientes.map(p =>
                                        this.state.paciente.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null
                                      )
                                    : null
                                }
                                options={pacientes ? pacientes.map(option => ({ value: option.id, label: option.id })) : null}
                                onChange={options => this.setState({ paciente: options.map(option => option['value']).join(',') })}
                                name={'paciente'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.atendimentoAssinaturas.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.atendimentoAssinaturas.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {atendimentoAssinaturasList && atendimentoAssinaturasList.length > 0 ? (
                <Table responsive aria-describedby="atendimento-assinaturas-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'arquivoAssinatura' ? (
                        <th className="hand" onClick={this.sort('arquivoAssinatura')}>
                          <Translate contentKey="generadorApp.atendimentoAssinaturas.arquivoAssinatura">Arquivo Assinatura</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'atendimento' ? (
                        <th>
                          <Translate contentKey="generadorApp.atendimentoAssinaturas.atendimento">Atendimento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'profissional' ? (
                        <th>
                          <Translate contentKey="generadorApp.atendimentoAssinaturas.profissional">Profissional</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'paciente' ? (
                        <th>
                          <Translate contentKey="generadorApp.atendimentoAssinaturas.paciente">Paciente</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {atendimentoAssinaturasList.map((atendimentoAssinaturas, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${atendimentoAssinaturas.id}`} color="link" size="sm">
                            {atendimentoAssinaturas.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'arquivoAssinatura' ? <td>{atendimentoAssinaturas.arquivoAssinatura}</td> : null}

                        {this.state.baseFilters !== 'atendimento' ? (
                          <td>
                            {atendimentoAssinaturas.atendimento ? (
                              <Link to={`atendimento/${atendimentoAssinaturas.atendimento.id}`}>
                                {atendimentoAssinaturas.atendimento.id}
                              </Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'profissional' ? (
                          <td>
                            {atendimentoAssinaturas.profissional ? (
                              <Link to={`profissional/${atendimentoAssinaturas.profissional.id}`}>
                                {atendimentoAssinaturas.profissional.id}
                              </Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'paciente' ? (
                          <td>
                            {atendimentoAssinaturas.paciente ? (
                              <Link to={`paciente/${atendimentoAssinaturas.paciente.id}`}>{atendimentoAssinaturas.paciente.id}</Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button
                              tag={Link}
                              to={`${match.url}/${atendimentoAssinaturas.id}?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${atendimentoAssinaturas.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${atendimentoAssinaturas.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.atendimentoAssinaturas.home.notFound">No Atendimento Assinaturas found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={atendimentoAssinaturasList && atendimentoAssinaturasList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ atendimentoAssinaturas, ...storeState }: IRootState) => ({
  atendimentos: storeState.atendimento.entities,
  profissionals: storeState.profissional.entities,
  pacientes: storeState.paciente.entities,
  atendimentoAssinaturasList: atendimentoAssinaturas.entities,
  totalItems: atendimentoAssinaturas.totalItems
});

const mapDispatchToProps = {
  getAtendimentos,
  getProfissionals,
  getPacientes,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AtendimentoAssinaturas);
