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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
import { getPadState, IPadBaseState, getEntities } from './pad.reducer';
import { IPad } from 'app/shared/model/pad.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { getEntities as getUnidadeEasies } from 'app/entities/unidade-easy/unidade-easy.reducer';
import { IOperadora } from 'app/shared/model/operadora.model';
import { getEntities as getOperadoras } from 'app/entities/operadora/operadora.reducer';
import { IFranquia } from 'app/shared/model/franquia.model';
import { getEntities as getFranquias } from 'app/entities/franquia/franquia.reducer';
import { IPaciente } from 'app/shared/model/paciente.model';
import { getEntities as getPacientes } from 'app/entities/paciente/paciente.reducer';

export interface IPadProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPadState extends IPadBaseState, IPaginationBaseState {
  dropdownButtons: {};
}

export class Pad extends React.Component<IPadProps, IPadState> {
  private myFormRef: any;

  constructor(props: IPadProps) {
    super(props);
    this.state = {
      dropdownButtons: {},
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getPadState(this.props.location)
    };
  }

  toggle = btn => {
    const dropdownButtons = this.state.dropdownButtons;
    dropdownButtons[btn] = !dropdownButtons[btn];
    this.setState({ dropdownButtons });
  };

  componentDidMount() {
    this.getEntities();

    this.props.getUnidadeEasies();
    this.props.getOperadoras();
    this.props.getFranquias();
    this.props.getPacientes();
  }

  cancelCourse = () => {
    this.setState(
      {
        nroPad: '',
        dataInicio: '',
        dataFim: '',
        dataConferido: '',
        ativo: '',
        statusPad: '',
        padCid: '',
        padItem: '',
        unidade: '',
        operadora: '',
        franquia: '',
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
      'nroPad=' +
      this.state.nroPad +
      '&' +
      'dataInicio=' +
      this.state.dataInicio +
      '&' +
      'dataFim=' +
      this.state.dataFim +
      '&' +
      'dataConferido=' +
      this.state.dataConferido +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'statusPad=' +
      this.state.statusPad +
      '&' +
      'padCid=' +
      this.state.padCid +
      '&' +
      'padItem=' +
      this.state.padItem +
      '&' +
      'unidade=' +
      this.state.unidade +
      '&' +
      'operadora=' +
      this.state.operadora +
      '&' +
      'franquia=' +
      this.state.franquia +
      '&' +
      'paciente=' +
      this.state.paciente +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      nroPad,
      dataInicio,
      dataFim,
      dataConferido,
      ativo,
      statusPad,
      padCid,
      padItem,
      unidade,
      operadora,
      franquia,
      paciente,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      nroPad,
      dataInicio,
      dataFim,
      dataConferido,
      ativo,
      statusPad,
      padCid,
      padItem,
      unidade,
      operadora,
      franquia,
      paciente,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { unidadeEasies, operadoras, franquias, pacientes, padList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Pads</span>
          <Button id="togglerFilterPad" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.pad.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.pad.home.createLabel">Create a new Pad</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pads</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPad">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'nroPad' ? (
                        <Col md="6">
                          <Row className="mr-1 mt-1">
                            <Label id="nroPadLabel" for="pad-nroPad">
                              <Translate contentKey="generadorApp.pad.nroPad">Nro Pad</Translate>
                            </Label>

                            <AvInput type="text" name="nroPad" id="pad-nroPad" value={this.state.nroPad} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'operadora' ? (
                        <Col md="6">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="pad-operadora">
                                <Translate contentKey="generadorApp.pad.operadora">Operadora</Translate>
                              </Label>
                              <Select
                                id="pad-operadora"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  operadoras
                                    ? operadoras.map(p =>
                                        this.state.operadora.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.nomeFantasia } : null
                                      )
                                    : null
                                }
                                options={operadoras ? operadoras.map(option => ({ value: option.id, label: option.nomeFantasia })) : null}
                                onChange={options => this.setState({ operadora: options.map(option => option['value']).join(',') })}
                                name={'operadora'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'paciente' ? (
                        <Col md="6">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="pad-paciente">
                                <Translate contentKey="generadorApp.pad.paciente">Paciente</Translate>
                              </Label>
                              <Select
                                id="pad-paciente"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  pacientes
                                    ? pacientes.map(p =>
                                        this.state.paciente.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.nome } : null
                                      )
                                    : null
                                }
                                options={pacientes ? pacientes.map(option => ({ value: option.id, label: option.nome })) : null}
                                onChange={options => this.setState({ paciente: options.map(option => option['value']).join(',') })}
                                name={'paciente'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dataInicio' ? (
                        <Col md="6">
                          <Row className="mr-1 mt-1">
                            <Label id="dataInicioLabel" for="pad-dataInicio">
                              <Translate contentKey="generadorApp.pad.dataInicio">Data Inicio</Translate>
                            </Label>
                            <AvInput type="date" name="dataInicio" id="pad-dataInicio" value={this.state.dataInicio} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dataFim' ? (
                        <Col md="6">
                          <Row className="mr-1 mt-1">
                            <Label id="dataFimLabel" for="pad-dataFim">
                              <Translate contentKey="generadorApp.pad.dataFim">Data Fim</Translate>
                            </Label>
                            <AvInput type="date" name="dataFim" id="pad-dataFim" value={this.state.dataFim} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ativo' ? (
                        <Col md="6">
                          <Row className="mr-1 mt-1">
                            <Label id="ativoLabel" check>
                              <AvInput id="pad-ativo" type="checkbox" className="form-control" name="ativo" />
                              <Translate contentKey="generadorApp.pad.ativo">Ativo</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'statusPad' ? (
                        <Col md="6">
                          <Row className="mr-1 mt-1">
                            <Label id="statusPadLabel" for="pad-statusPad">
                              <Translate contentKey="generadorApp.pad.statusPad">Status Pad</Translate>
                            </Label>
                            <AvInput type="string" name="statusPad" id="pad-statusPad" value={this.state.statusPad} />
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.pad.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.pad.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {padList && padList.length > 0 ? (
                <Table responsive aria-describedby="pad-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('nroPad')}>
                        <Translate contentKey="generadorApp.pad.nroPad"></Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.pad.operadora">Operadora</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.pad.paciente">Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataInicio')}>
                        <Translate contentKey="generadorApp.pad.dataInicio"></Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataFim')}>
                        <Translate contentKey="generadorApp.pad.dataFim"></Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.pad.ativo"></Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('statusPad')}>
                        <Translate contentKey="generadorApp.pad.statusPad"></Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {padList.map((pad, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${pad.id}`} color="link" size="sm">
                            {pad.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'nroPad' ? <td>{pad.nroPad}</td> : null}

                        {this.state.baseFilters !== 'operadora' ? (
                          <td>{pad.operadora ? <Link to={`operadora/${pad.operadora.id}`}>{pad.operadora.nomeFantasia}</Link> : ''}</td>
                        ) : null}

                        {this.state.baseFilters !== 'paciente' ? (
                          <td>{pad.paciente ? <Link to={`paciente/${pad.paciente.id}`}>{pad.paciente.nome}</Link> : ''}</td>
                        ) : null}

                        {this.state.baseFilters !== 'dataInicio' ? (
                          <td>
                            <TextFormat type="date" value={pad.dataInicio} format={APP_LOCAL_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'dataFim' ? (
                          <td>
                            <TextFormat type="date" value={pad.dataFim} format={APP_LOCAL_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'ativo' ? <td>{pad.ativo ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'statusPad' ? <td>{pad.statusPad}</td> : null}

                        <td className="text-right">
                          <Dropdown isOpen={this.state.dropdownButtons[i]} toggle={() => this.toggle(i)}>
                            <DropdownToggle caret>
                              <Translate contentKey="generadorApp.pad.dropdown_btn">Actions</Translate>
                            </DropdownToggle>
                            <DropdownMenu right>
                              <DropdownItem tag={Link} to={`${match.url}/${pad.id}`} color="info" size="sm">
                                <FontAwesomeIcon icon="eye" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.pad.listButtons.VisualizarPTA">VisualizarPTA</Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem tag={Link} to={`${match.url}/${pad.id}`} color="info" size="sm">
                                <FontAwesomeIcon icon="eye" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.pad.listButtons.detalhes">Detalhes</Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem tag={Link} to={`${match.url}/${pad.id}/delete`} color="info" size="sm">
                                <FontAwesomeIcon icon="file" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.pad.listButtons.RelatorioConsolidado">RelatórioConsolidado</Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem tag={Link} to={`${match.url}/${pad.id}/edit`} color="info" size="sm">
                                <FontAwesomeIcon icon="pencil-alt" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.pad.listButtons.edit">Editar</Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem tag={Link} to={`/pad-status-atual?baseFilters=pad&pad=${pad.id}`} color="info" size="sm">
                                <FontAwesomeIcon icon="upload" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.pad.listButtons.Status">Status</Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem tag={Link} to={`/pad-arquivo?baseFilters=pad&pad=${pad.id}`} color="info" size="sm">
                                <FontAwesomeIcon icon="upload" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.pad.listButtons.Aditivos">Aditivos</Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem tag={Link} to={`${match.url}/${pad.id}/delete`} color="info" size="sm">
                                <FontAwesomeIcon icon="list" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.pad.listButtons.ResultadosEsperados">ResultadosEsperados</Translate>
                                </span>
                              </DropdownItem>
                              <DropdownItem tag={Link} to={`${match.url}/${pad.id}/delete`} color="info" size="sm">
                                <FontAwesomeIcon icon="list" />{' '}
                                <span className="d-none d-md-inline">
                                  <Translate contentKey="generadorApp.pad.listButtons.AtividadesdosAtendimentos">
                                    AtividadesdosAtendimentos
                                  </Translate>
                                </span>
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="alert alert-warning">
                  <Translate contentKey="generadorApp.pad.home.notFound">No Pads found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={padList && padList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ pad, ...storeState }: IRootState) => ({
  unidadeEasies: storeState.unidadeEasy.entities,
  operadoras: storeState.operadora.entities,
  franquias: storeState.franquia.entities,
  pacientes: storeState.paciente.entities,
  padList: pad.entities,
  totalItems: pad.totalItems
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getOperadoras,
  getFranquias,
  getPacientes,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Pad);
