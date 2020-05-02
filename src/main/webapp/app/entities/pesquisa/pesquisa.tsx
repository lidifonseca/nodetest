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
  byteSize,
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
import { getEntities } from './pesquisa.reducer';
import { IPesquisa } from 'app/shared/model/pesquisa.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IProcesso } from 'app/shared/model/processo.model';
import { getEntities as getProcessos } from 'app/entities/processo/processo.reducer';
import { IComarca } from 'app/shared/model/comarca.model';
import { getEntities as getComarcas } from 'app/entities/comarca/comarca.reducer';
import { IEstado } from 'app/shared/model/estado.model';
import { getEntities as getEstados } from 'app/entities/estado/estado.reducer';

export interface IPesquisaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPesquisaBaseState {
  nome: any;
  classesIncluir: any;
  incluirMovimentacoes: any;
  descartarMovimentacoes: any;
  incluirMovimentacoesAll: any;
  anoInicial: any;
  anoFinal: any;
  csv: any;
  dataCriacao: any;
  dataFinalizacao: any;
  situacao: any;
  observacoes: any;
  csvTotal: any;
  csvVerificados: any;
  comarcaPorComarca: any;
  user: any;
  processo: any;
  comarcas: any;
  estado: any;
}
export interface IPesquisaState extends IPesquisaBaseState, IPaginationBaseState {}

export class Pesquisa extends React.Component<IPesquisaProps, IPesquisaState> {
  private myFormRef: any;

  getPesquisaState = (location): IPesquisaBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const nome = url.searchParams.get('nome') || '';
    const classesIncluir = url.searchParams.get('classesIncluir') || '';
    const incluirMovimentacoes = url.searchParams.get('incluirMovimentacoes') || '';
    const descartarMovimentacoes = url.searchParams.get('descartarMovimentacoes') || '';
    const incluirMovimentacoesAll = url.searchParams.get('incluirMovimentacoesAll') || '';
    const anoInicial = url.searchParams.get('anoInicial') || '';
    const anoFinal = url.searchParams.get('anoFinal') || '';
    const csv = url.searchParams.get('csv') || '';
    const dataCriacao = url.searchParams.get('dataCriacao') || '';
    const dataFinalizacao = url.searchParams.get('dataFinalizacao') || '';
    const situacao = url.searchParams.get('situacao') || '';
    const observacoes = url.searchParams.get('observacoes') || '';
    const csvTotal = url.searchParams.get('csvTotal') || '';
    const csvVerificados = url.searchParams.get('csvVerificados') || '';
    const comarcaPorComarca = url.searchParams.get('comarcaPorComarca') || '';

    const user = url.searchParams.get('user') || '';
    const processo = url.searchParams.get('processo') || '';
    const comarcas = url.searchParams.get('comarcas') || '';
    const estado = url.searchParams.get('estado') || '';

    return {
      nome,
      classesIncluir,
      incluirMovimentacoes,
      descartarMovimentacoes,
      incluirMovimentacoesAll,
      anoInicial,
      anoFinal,
      csv,
      dataCriacao,
      dataFinalizacao,
      situacao,
      observacoes,
      csvTotal,
      csvVerificados,
      comarcaPorComarca,
      user,
      processo,
      comarcas,
      estado
    };
  };

  state: IPesquisaState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE),
    ...this.getPesquisaState(this.props.location)
  };

  componentDidMount() {
    this.getEntities();

    this.props.getUsers();
    this.props.getProcessos();
    this.props.getComarcas();
    this.props.getEstados();
  }

  cancelCourse = () => {
    this.setState(
      {
        nome: '',
        classesIncluir: '',
        incluirMovimentacoes: '',
        descartarMovimentacoes: '',
        incluirMovimentacoesAll: '',
        anoInicial: '',
        anoFinal: '',
        csv: '',
        dataCriacao: '',
        dataFinalizacao: '',
        situacao: '',
        observacoes: '',
        csvTotal: '',
        csvVerificados: '',
        comarcaPorComarca: '',
        user: '',
        processo: '',
        comarcas: '',
        estado: ''
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
      'classesIncluir=' +
      this.state.classesIncluir +
      '&' +
      'incluirMovimentacoes=' +
      this.state.incluirMovimentacoes +
      '&' +
      'descartarMovimentacoes=' +
      this.state.descartarMovimentacoes +
      '&' +
      'incluirMovimentacoesAll=' +
      this.state.incluirMovimentacoesAll +
      '&' +
      'anoInicial=' +
      this.state.anoInicial +
      '&' +
      'anoFinal=' +
      this.state.anoFinal +
      '&' +
      'csv=' +
      this.state.csv +
      '&' +
      'dataCriacao=' +
      this.state.dataCriacao +
      '&' +
      'dataFinalizacao=' +
      this.state.dataFinalizacao +
      '&' +
      'situacao=' +
      this.state.situacao +
      '&' +
      'observacoes=' +
      this.state.observacoes +
      '&' +
      'csvTotal=' +
      this.state.csvTotal +
      '&' +
      'csvVerificados=' +
      this.state.csvVerificados +
      '&' +
      'comarcaPorComarca=' +
      this.state.comarcaPorComarca +
      '&' +
      'user=' +
      this.state.user +
      '&' +
      'processo=' +
      this.state.processo +
      '&' +
      'comarcas=' +
      this.state.comarcas +
      '&' +
      'estado=' +
      this.state.estado +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      nome,
      classesIncluir,
      incluirMovimentacoes,
      descartarMovimentacoes,
      incluirMovimentacoesAll,
      anoInicial,
      anoFinal,
      csv,
      dataCriacao,
      dataFinalizacao,
      situacao,
      observacoes,
      csvTotal,
      csvVerificados,
      comarcaPorComarca,
      user,
      processo,
      comarcas,
      estado,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      nome,
      classesIncluir,
      incluirMovimentacoes,
      descartarMovimentacoes,
      incluirMovimentacoesAll,
      anoInicial,
      anoFinal,
      csv,
      dataCriacao,
      dataFinalizacao,
      situacao,
      observacoes,
      csvTotal,
      csvVerificados,
      comarcaPorComarca,
      user,
      processo,
      comarcas,
      estado,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { users, processos, comarcas, estados, pesquisaList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pesquisas</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Pesquisas</span>
              <Button id="togglerFilterPesquisa" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.pesquisa.home.createLabel">Create a new Pesquisa</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPesquisa">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <div className="col-md-3">
                        <Label id="nomeLabel" for="pesquisa-nome">
                          <Translate contentKey="generadorApp.pesquisa.nome">Nome</Translate>
                        </Label>

                        <AvInput type="text" name="nome" id="pesquisa-nome" value={this.state.nome} />
                      </div>

                      <div className="col-md-3">
                        <Label id="classesIncluirLabel" for="pesquisa-classesIncluir">
                          <Translate contentKey="generadorApp.pesquisa.classesIncluir">Classes Incluir</Translate>
                        </Label>
                        <AvInput id="pesquisa-classesIncluir" type="textarea" name="classesIncluir" />
                      </div>

                      <div className="col-md-3">
                        <Label id="incluirMovimentacoesLabel" for="pesquisa-incluirMovimentacoes">
                          <Translate contentKey="generadorApp.pesquisa.incluirMovimentacoes">Incluir Movimentacoes</Translate>
                        </Label>
                        <AvInput id="pesquisa-incluirMovimentacoes" type="textarea" name="incluirMovimentacoes" />
                      </div>

                      <div className="col-md-3">
                        <Label id="descartarMovimentacoesLabel" for="pesquisa-descartarMovimentacoes">
                          <Translate contentKey="generadorApp.pesquisa.descartarMovimentacoes">Descartar Movimentacoes</Translate>
                        </Label>
                        <AvInput id="pesquisa-descartarMovimentacoes" type="textarea" name="descartarMovimentacoes" />
                      </div>

                      <div className="col-md-3">
                        <Label id="incluirMovimentacoesAllLabel" check>
                          <AvInput
                            id="pesquisa-incluirMovimentacoesAll"
                            type="checkbox"
                            className="form-control"
                            name="incluirMovimentacoesAll"
                          />
                          <Translate contentKey="generadorApp.pesquisa.incluirMovimentacoesAll">Incluir Movimentacoes All</Translate>
                        </Label>
                      </div>

                      <div className="col-md-3">
                        <Label id="anoInicialLabel" for="pesquisa-anoInicial">
                          <Translate contentKey="generadorApp.pesquisa.anoInicial">Ano Inicial</Translate>
                        </Label>
                        <AvInput type="string" name="anoInicial" id="pesquisa-anoInicial" value={this.state.anoInicial} />
                      </div>

                      <div className="col-md-3">
                        <Label id="anoFinalLabel" for="pesquisa-anoFinal">
                          <Translate contentKey="generadorApp.pesquisa.anoFinal">Ano Final</Translate>
                        </Label>
                        <AvInput type="string" name="anoFinal" id="pesquisa-anoFinal" value={this.state.anoFinal} />
                      </div>

                      <div className="col-md-3">
                        <Label id="csvLabel" for="pesquisa-csv">
                          <Translate contentKey="generadorApp.pesquisa.csv">Csv</Translate>
                        </Label>
                        <AvInput id="pesquisa-csv" type="textarea" name="csv" />
                      </div>

                      <div className="col-md-3">
                        <Label id="dataCriacaoLabel" for="pesquisa-dataCriacao">
                          <Translate contentKey="generadorApp.pesquisa.dataCriacao">Data Criacao</Translate>
                        </Label>
                        <AvInput
                          id="pesquisa-dataCriacao"
                          type="datetime-local"
                          className="form-control"
                          name="dataCriacao"
                          placeholder={'YYYY-MM-DD HH:mm'}
                          value={isNew ? null : convertDateTimeFromServer(this.props.pesquisaEntity.dataCriacao)}
                          validate={{
                            required: { value: true, errorMessage: translate('entity.validation.required') }
                          }}
                        />
                      </div>

                      <div className="col-md-3">
                        <Label id="dataFinalizacaoLabel" for="pesquisa-dataFinalizacao">
                          <Translate contentKey="generadorApp.pesquisa.dataFinalizacao">Data Finalizacao</Translate>
                        </Label>
                        <AvInput
                          id="pesquisa-dataFinalizacao"
                          type="datetime-local"
                          className="form-control"
                          name="dataFinalizacao"
                          placeholder={'YYYY-MM-DD HH:mm'}
                          value={isNew ? null : convertDateTimeFromServer(this.props.pesquisaEntity.dataFinalizacao)}
                        />
                      </div>

                      <div className="col-md-3">
                        <Label id="situacaoLabel" for="pesquisa-situacao">
                          <Translate contentKey="generadorApp.pesquisa.situacao">Situacao</Translate>
                        </Label>
                        <AvInput
                          id="pesquisa-situacao"
                          type="select"
                          className="form-control"
                          name="situacao"
                          value={(!isNew && pesquisaEntity.situacao) || 'AGUARDANDO'}
                        >
                          <option value="AGUARDANDO">{translate('generadorApp.Situacao.AGUARDANDO')}</option>
                          <option value="COLETANDO">{translate('generadorApp.Situacao.COLETANDO')}</option>
                          <option value="SUCESSO">{translate('generadorApp.Situacao.SUCESSO')}</option>
                          <option value="ERRO">{translate('generadorApp.Situacao.ERRO')}</option>
                          <option value="CANCELADA">{translate('generadorApp.Situacao.CANCELADA')}</option>
                        </AvInput>
                      </div>

                      <div className="col-md-3">
                        <Label id="observacoesLabel" for="pesquisa-observacoes">
                          <Translate contentKey="generadorApp.pesquisa.observacoes">Observacoes</Translate>
                        </Label>

                        <AvInput type="text" name="observacoes" id="pesquisa-observacoes" value={this.state.observacoes} />
                      </div>

                      <div className="col-md-3">
                        <Label id="csvTotalLabel" for="pesquisa-csvTotal">
                          <Translate contentKey="generadorApp.pesquisa.csvTotal">Csv Total</Translate>
                        </Label>
                        <AvInput type="string" name="csvTotal" id="pesquisa-csvTotal" value={this.state.csvTotal} />
                      </div>

                      <div className="col-md-3">
                        <Label id="csvVerificadosLabel" for="pesquisa-csvVerificados">
                          <Translate contentKey="generadorApp.pesquisa.csvVerificados">Csv Verificados</Translate>
                        </Label>
                        <AvInput type="string" name="csvVerificados" id="pesquisa-csvVerificados" value={this.state.csvVerificados} />
                      </div>

                      <div className="col-md-3">
                        <Label id="comarcaPorComarcaLabel" check>
                          <AvInput id="pesquisa-comarcaPorComarca" type="checkbox" className="form-control" name="comarcaPorComarca" />
                          <Translate contentKey="generadorApp.pesquisa.comarcaPorComarca">Comarca Por Comarca</Translate>
                        </Label>
                      </div>
                      <div className="col-md-3">
                        <div>
                          <Label for="pesquisa-user">
                            <Translate contentKey="generadorApp.pesquisa.user">User</Translate>
                          </Label>
                          <AvInput id="pesquisa-user" type="select" className="form-control" name="userId">
                            <option value="" key="0" />
                            {users
                              ? users.map(otherEntity => (
                                  <option value={otherEntity.id} key={otherEntity.id}>
                                    {otherEntity.id}
                                  </option>
                                ))
                              : null}
                          </AvInput>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div>
                          <Label for="pesquisa-processo">
                            <Translate contentKey="generadorApp.pesquisa.processo">Processo</Translate>
                          </Label>
                          <AvInput
                            id="pesquisa-processo"
                            type="select"
                            multiple
                            className="form-control"
                            name="processos"
                            value={pesquisaEntity.processos && pesquisaEntity.processos.map(e => e.id)}
                          >
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
                      <div className="col-md-3">
                        <div>
                          <Label for="pesquisa-comarcas">
                            <Translate contentKey="generadorApp.pesquisa.comarcas">Comarcas</Translate>
                          </Label>
                          <AvInput id="pesquisa-comarcas" type="select" className="form-control" name="comarcasId">
                            <option value="" key="0" />
                            {comarcas
                              ? comarcas.map(otherEntity => (
                                  <option value={otherEntity.id} key={otherEntity.id}>
                                    {otherEntity.id}
                                  </option>
                                ))
                              : null}
                          </AvInput>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div>
                          <Label for="pesquisa-estado">
                            <Translate contentKey="generadorApp.pesquisa.estado">Estado</Translate>
                          </Label>
                          <AvInput id="pesquisa-estado" type="select" className="form-control" name="estadoId">
                            <option value="" key="0" />
                            {estados
                              ? estados.map(otherEntity => (
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

              {pesquisaList && pesquisaList.length > 0 ? (
                <Table responsive aria-describedby="pesquisa-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('nome')}>
                        <Translate contentKey="generadorApp.pesquisa.nome">Nome</Translate> <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('classesIncluir')}>
                        <Translate contentKey="generadorApp.pesquisa.classesIncluir">Classes Incluir</Translate>{' '}
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('incluirMovimentacoes')}>
                        <Translate contentKey="generadorApp.pesquisa.incluirMovimentacoes">Incluir Movimentacoes</Translate>{' '}
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('descartarMovimentacoes')}>
                        <Translate contentKey="generadorApp.pesquisa.descartarMovimentacoes">Descartar Movimentacoes</Translate>{' '}
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('incluirMovimentacoesAll')}>
                        <Translate contentKey="generadorApp.pesquisa.incluirMovimentacoesAll">Incluir Movimentacoes All</Translate>{' '}
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('anoInicial')}>
                        <Translate contentKey="generadorApp.pesquisa.anoInicial">Ano Inicial</Translate> <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('anoFinal')}>
                        <Translate contentKey="generadorApp.pesquisa.anoFinal">Ano Final</Translate> <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('csv')}>
                        <Translate contentKey="generadorApp.pesquisa.csv">Csv</Translate> <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataCriacao')}>
                        <Translate contentKey="generadorApp.pesquisa.dataCriacao">Data Criacao</Translate> <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataFinalizacao')}>
                        <Translate contentKey="generadorApp.pesquisa.dataFinalizacao">Data Finalizacao</Translate>{' '}
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('situacao')}>
                        <Translate contentKey="generadorApp.pesquisa.situacao">Situacao</Translate> <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('observacoes')}>
                        <Translate contentKey="generadorApp.pesquisa.observacoes">Observacoes</Translate> <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('csvTotal')}>
                        <Translate contentKey="generadorApp.pesquisa.csvTotal">Csv Total</Translate> <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('csvVerificados')}>
                        <Translate contentKey="generadorApp.pesquisa.csvVerificados">Csv Verificados</Translate>{' '}
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('comarcaPorComarca')}>
                        <Translate contentKey="generadorApp.pesquisa.comarcaPorComarca">Comarca Por Comarca</Translate>{' '}
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.pesquisa.user">User</Translate> <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.pesquisa.comarcas">Comarcas</Translate> <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.pesquisa.estado">Estado</Translate> <FontAwesomeIcon icon="sort" />
                      </th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {pesquisaList.map((pesquisa, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${pesquisa.id}`} color="link" size="sm">
                            {pesquisa.id}
                          </Button>
                        </td>
                        <td>{pesquisa.nome}</td>
                        <td>{pesquisa.classesIncluir}</td>
                        <td>{pesquisa.incluirMovimentacoes}</td>
                        <td>{pesquisa.descartarMovimentacoes}</td>
                        <td>{pesquisa.incluirMovimentacoesAll ? 'true' : 'false'}</td>
                        <td>{pesquisa.anoInicial}</td>
                        <td>{pesquisa.anoFinal}</td>
                        <td>{pesquisa.csv}</td>
                        <td>
                          <TextFormat type="date" value={pesquisa.dataCriacao} format={APP_DATE_FORMAT} />
                        </td>
                        <td>
                          <TextFormat type="date" value={pesquisa.dataFinalizacao} format={APP_DATE_FORMAT} />
                        </td>
                        <td>
                          <Translate contentKey={`generadorApp.Situacao.${pesquisa.situacao}`} />
                        </td>
                        <td>{pesquisa.observacoes}</td>
                        <td>{pesquisa.csvTotal}</td>
                        <td>{pesquisa.csvVerificados}</td>
                        <td>{pesquisa.comarcaPorComarca ? 'true' : 'false'}</td>
                        <td>{pesquisa.userId ? pesquisa.userId : ''}</td>
                        <td>{pesquisa.comarcasId ? <Link to={`comarca/${pesquisa.comarcasId}`}>{pesquisa.comarcasId}</Link> : ''}</td>
                        <td>{pesquisa.estadoId ? <Link to={`estado/${pesquisa.estadoId}`}>{pesquisa.estadoId}</Link> : ''}</td>
                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${pesquisa.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${pesquisa.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${pesquisa.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.pesquisa.home.notFound">No Pesquisas found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={pesquisaList && pesquisaList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ pesquisa, ...storeState }: IRootState) => ({
  users: storeState.userManagement.users,
  processos: storeState.processo.entities,
  comarcas: storeState.comarca.entities,
  estados: storeState.estado.entities,
  pesquisaList: pesquisa.entities,
  totalItems: pesquisa.totalItems
});

const mapDispatchToProps = {
  getUsers,
  getProcessos,
  getComarcas,
  getEstados,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Pesquisa);
