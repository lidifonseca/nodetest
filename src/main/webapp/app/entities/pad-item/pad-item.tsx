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
import { getEntities } from './pad-item.reducer';
import { IPadItem } from 'app/shared/model/pad-item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IPad } from 'app/shared/model/pad.model';
import { getEntities as getPads } from 'app/entities/pad/pad.reducer';
import { IEspecialidade } from 'app/shared/model/especialidade.model';
import { getEntities as getEspecialidades } from 'app/entities/especialidade/especialidade.reducer';
import { IPeriodicidade } from 'app/shared/model/periodicidade.model';
import { getEntities as getPeriodicidades } from 'app/entities/periodicidade/periodicidade.reducer';
import { IPeriodo } from 'app/shared/model/periodo.model';
import { getEntities as getPeriodos } from 'app/entities/periodo/periodo.reducer';

export interface IPadItemProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPadItemBaseState {
  idPedido: any;
  dataInicio: any;
  dataFim: any;
  qtdSessoes: any;
  observacao: any;
  sub: any;
  ativo: any;
  dataPadItemIncompleto: any;
  dataPadItemCompleto: any;
  numGhc: any;
  cidXPtaNovo: any;
  categoriaId: any;
  score: any;
  atendimento: any;
  atendimentoCepRecusado: any;
  atendimentoSorteioFeito: any;
  padItemAtividade: any;
  padItemCepRecusado: any;
  padItemResultado: any;
  padItemSorteioFeito: any;
  idPad: any;
  idEspecialidade: any;
  idPeriodicidade: any;
  idPeriodo: any;
}
export interface IPadItemState extends IPadItemBaseState, IPaginationBaseState {}

export class PadItem extends React.Component<IPadItemProps, IPadItemState> {
  private myFormRef: any;

  constructor(props: IPadItemProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getPadItemState(this.props.location)
    };
  }

  getPadItemState = (location): IPadItemBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const idPedido = url.searchParams.get('idPedido') || '';
    const dataInicio = url.searchParams.get('dataInicio') || '';
    const dataFim = url.searchParams.get('dataFim') || '';
    const qtdSessoes = url.searchParams.get('qtdSessoes') || '';
    const observacao = url.searchParams.get('observacao') || '';
    const sub = url.searchParams.get('sub') || '';
    const ativo = url.searchParams.get('ativo') || '';
    const dataPadItemIncompleto = url.searchParams.get('dataPadItemIncompleto') || '';
    const dataPadItemCompleto = url.searchParams.get('dataPadItemCompleto') || '';
    const numGhc = url.searchParams.get('numGhc') || '';
    const cidXPtaNovo = url.searchParams.get('cidXPtaNovo') || '';
    const categoriaId = url.searchParams.get('categoriaId') || '';
    const score = url.searchParams.get('score') || '';

    const atendimento = url.searchParams.get('atendimento') || '';
    const atendimentoCepRecusado = url.searchParams.get('atendimentoCepRecusado') || '';
    const atendimentoSorteioFeito = url.searchParams.get('atendimentoSorteioFeito') || '';
    const padItemAtividade = url.searchParams.get('padItemAtividade') || '';
    const padItemCepRecusado = url.searchParams.get('padItemCepRecusado') || '';
    const padItemResultado = url.searchParams.get('padItemResultado') || '';
    const padItemSorteioFeito = url.searchParams.get('padItemSorteioFeito') || '';
    const idPad = url.searchParams.get('idPad') || '';
    const idEspecialidade = url.searchParams.get('idEspecialidade') || '';
    const idPeriodicidade = url.searchParams.get('idPeriodicidade') || '';
    const idPeriodo = url.searchParams.get('idPeriodo') || '';

    return {
      idPedido,
      dataInicio,
      dataFim,
      qtdSessoes,
      observacao,
      sub,
      ativo,
      dataPadItemIncompleto,
      dataPadItemCompleto,
      numGhc,
      cidXPtaNovo,
      categoriaId,
      score,
      atendimento,
      atendimentoCepRecusado,
      atendimentoSorteioFeito,
      padItemAtividade,
      padItemCepRecusado,
      padItemResultado,
      padItemSorteioFeito,
      idPad,
      idEspecialidade,
      idPeriodicidade,
      idPeriodo
    };
  };

  componentDidMount() {
    this.getEntities();

    this.props.getPads();
    this.props.getEspecialidades();
    this.props.getPeriodicidades();
    this.props.getPeriodos();
  }

  cancelCourse = () => {
    this.setState(
      {
        idPedido: '',
        dataInicio: '',
        dataFim: '',
        qtdSessoes: '',
        observacao: '',
        sub: '',
        ativo: '',
        dataPadItemIncompleto: '',
        dataPadItemCompleto: '',
        numGhc: '',
        cidXPtaNovo: '',
        categoriaId: '',
        score: '',
        atendimento: '',
        atendimentoCepRecusado: '',
        atendimentoSorteioFeito: '',
        padItemAtividade: '',
        padItemCepRecusado: '',
        padItemResultado: '',
        padItemSorteioFeito: '',
        idPad: '',
        idEspecialidade: '',
        idPeriodicidade: '',
        idPeriodo: ''
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
      'idPedido=' +
      this.state.idPedido +
      '&' +
      'dataInicio=' +
      this.state.dataInicio +
      '&' +
      'dataFim=' +
      this.state.dataFim +
      '&' +
      'qtdSessoes=' +
      this.state.qtdSessoes +
      '&' +
      'observacao=' +
      this.state.observacao +
      '&' +
      'sub=' +
      this.state.sub +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'dataPadItemIncompleto=' +
      this.state.dataPadItemIncompleto +
      '&' +
      'dataPadItemCompleto=' +
      this.state.dataPadItemCompleto +
      '&' +
      'numGhc=' +
      this.state.numGhc +
      '&' +
      'cidXPtaNovo=' +
      this.state.cidXPtaNovo +
      '&' +
      'categoriaId=' +
      this.state.categoriaId +
      '&' +
      'score=' +
      this.state.score +
      '&' +
      'atendimento=' +
      this.state.atendimento +
      '&' +
      'atendimentoCepRecusado=' +
      this.state.atendimentoCepRecusado +
      '&' +
      'atendimentoSorteioFeito=' +
      this.state.atendimentoSorteioFeito +
      '&' +
      'padItemAtividade=' +
      this.state.padItemAtividade +
      '&' +
      'padItemCepRecusado=' +
      this.state.padItemCepRecusado +
      '&' +
      'padItemResultado=' +
      this.state.padItemResultado +
      '&' +
      'padItemSorteioFeito=' +
      this.state.padItemSorteioFeito +
      '&' +
      'idPad=' +
      this.state.idPad +
      '&' +
      'idEspecialidade=' +
      this.state.idEspecialidade +
      '&' +
      'idPeriodicidade=' +
      this.state.idPeriodicidade +
      '&' +
      'idPeriodo=' +
      this.state.idPeriodo +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      idPedido,
      dataInicio,
      dataFim,
      qtdSessoes,
      observacao,
      sub,
      ativo,
      dataPadItemIncompleto,
      dataPadItemCompleto,
      numGhc,
      cidXPtaNovo,
      categoriaId,
      score,
      atendimento,
      atendimentoCepRecusado,
      atendimentoSorteioFeito,
      padItemAtividade,
      padItemCepRecusado,
      padItemResultado,
      padItemSorteioFeito,
      idPad,
      idEspecialidade,
      idPeriodicidade,
      idPeriodo,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      idPedido,
      dataInicio,
      dataFim,
      qtdSessoes,
      observacao,
      sub,
      ativo,
      dataPadItemIncompleto,
      dataPadItemCompleto,
      numGhc,
      cidXPtaNovo,
      categoriaId,
      score,
      atendimento,
      atendimentoCepRecusado,
      atendimentoSorteioFeito,
      padItemAtividade,
      padItemCepRecusado,
      padItemResultado,
      padItemSorteioFeito,
      idPad,
      idEspecialidade,
      idPeriodicidade,
      idPeriodo,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { pads, especialidades, periodicidades, periodos, padItemList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Items</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Pad Items</span>
              <Button id="togglerFilterPadItem" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.padItem.home.createLabel">Create a new Pad Item</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPadItem">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="idPedidoLabel" for="pad-item-idPedido">
                            <Translate contentKey="generadorApp.padItem.idPedido">Id Pedido</Translate>
                          </Label>

                          <AvInput type="text" name="idPedido" id="pad-item-idPedido" value={this.state.idPedido} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataInicioLabel" for="pad-item-dataInicio">
                            <Translate contentKey="generadorApp.padItem.dataInicio">Data Inicio</Translate>
                          </Label>
                          <AvInput type="date" name="dataInicio" id="pad-item-dataInicio" value={this.state.dataInicio} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataFimLabel" for="pad-item-dataFim">
                            <Translate contentKey="generadorApp.padItem.dataFim">Data Fim</Translate>
                          </Label>
                          <AvInput type="date" name="dataFim" id="pad-item-dataFim" value={this.state.dataFim} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="qtdSessoesLabel" for="pad-item-qtdSessoes">
                            <Translate contentKey="generadorApp.padItem.qtdSessoes">Qtd Sessoes</Translate>
                          </Label>
                          <AvInput type="string" name="qtdSessoes" id="pad-item-qtdSessoes" value={this.state.qtdSessoes} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="observacaoLabel" for="pad-item-observacao">
                            <Translate contentKey="generadorApp.padItem.observacao">Observacao</Translate>
                          </Label>
                          <AvInput id="pad-item-observacao" type="textarea" name="observacao" />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="subLabel" for="pad-item-sub">
                            <Translate contentKey="generadorApp.padItem.sub">Sub</Translate>
                          </Label>
                          <AvInput type="string" name="sub" id="pad-item-sub" value={this.state.sub} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="pad-item-ativo">
                            <Translate contentKey="generadorApp.padItem.ativo">Ativo</Translate>
                          </Label>
                          <AvInput type="string" name="ativo" id="pad-item-ativo" value={this.state.ativo} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataPadItemIncompletoLabel" for="pad-item-dataPadItemIncompleto">
                            <Translate contentKey="generadorApp.padItem.dataPadItemIncompleto">Data Pad Item Incompleto</Translate>
                          </Label>
                          <AvInput
                            id="pad-item-dataPadItemIncompleto"
                            type="datetime-local"
                            className="form-control"
                            name="dataPadItemIncompleto"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.dataPadItemIncompleto ? convertDateTimeFromServer(this.state.dataPadItemIncompleto) : null}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataPadItemCompletoLabel" for="pad-item-dataPadItemCompleto">
                            <Translate contentKey="generadorApp.padItem.dataPadItemCompleto">Data Pad Item Completo</Translate>
                          </Label>
                          <AvInput
                            id="pad-item-dataPadItemCompleto"
                            type="datetime-local"
                            className="form-control"
                            name="dataPadItemCompleto"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.dataPadItemCompleto ? convertDateTimeFromServer(this.state.dataPadItemCompleto) : null}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="numGhcLabel" for="pad-item-numGhc">
                            <Translate contentKey="generadorApp.padItem.numGhc">Num Ghc</Translate>
                          </Label>

                          <AvInput type="text" name="numGhc" id="pad-item-numGhc" value={this.state.numGhc} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cidXPtaNovoLabel" for="pad-item-cidXPtaNovo">
                            <Translate contentKey="generadorApp.padItem.cidXPtaNovo">Cid X Pta Novo</Translate>
                          </Label>
                          <AvInput type="string" name="cidXPtaNovo" id="pad-item-cidXPtaNovo" value={this.state.cidXPtaNovo} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="categoriaIdLabel" for="pad-item-categoriaId">
                            <Translate contentKey="generadorApp.padItem.categoriaId">Categoria Id</Translate>
                          </Label>
                          <AvInput type="string" name="categoriaId" id="pad-item-categoriaId" value={this.state.categoriaId} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="scoreLabel" for="pad-item-score">
                            <Translate contentKey="generadorApp.padItem.score">Score</Translate>
                          </Label>
                          <AvInput type="string" name="score" id="pad-item-score" value={this.state.score} />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row></Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="pad-item-idPad">
                              <Translate contentKey="generadorApp.padItem.idPad">Id Pad</Translate>
                            </Label>
                            <AvInput id="pad-item-idPad" type="select" className="form-control" name="idPadId">
                              <option value="" key="0" />
                              {pads
                                ? pads.map(otherEntity => (
                                    <option value={otherEntity.id} key={otherEntity.id}>
                                      {otherEntity.id}
                                    </option>
                                  ))
                                : null}
                            </AvInput>
                          </div>
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="pad-item-idEspecialidade">
                              <Translate contentKey="generadorApp.padItem.idEspecialidade">Id Especialidade</Translate>
                            </Label>
                            <AvInput id="pad-item-idEspecialidade" type="select" className="form-control" name="idEspecialidadeId">
                              <option value="" key="0" />
                              {especialidades
                                ? especialidades.map(otherEntity => (
                                    <option value={otherEntity.id} key={otherEntity.id}>
                                      {otherEntity.id}
                                    </option>
                                  ))
                                : null}
                            </AvInput>
                          </div>
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="pad-item-idPeriodicidade">
                              <Translate contentKey="generadorApp.padItem.idPeriodicidade">Id Periodicidade</Translate>
                            </Label>
                            <AvInput id="pad-item-idPeriodicidade" type="select" className="form-control" name="idPeriodicidadeId">
                              <option value="" key="0" />
                              {periodicidades
                                ? periodicidades.map(otherEntity => (
                                    <option value={otherEntity.id} key={otherEntity.id}>
                                      {otherEntity.id}
                                    </option>
                                  ))
                                : null}
                            </AvInput>
                          </div>
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="pad-item-idPeriodo">
                              <Translate contentKey="generadorApp.padItem.idPeriodo">Id Periodo</Translate>
                            </Label>
                            <AvInput id="pad-item-idPeriodo" type="select" className="form-control" name="idPeriodoId">
                              <option value="" key="0" />
                              {periodos
                                ? periodos.map(otherEntity => (
                                    <option value={otherEntity.id} key={otherEntity.id}>
                                      {otherEntity.id}
                                    </option>
                                  ))
                                : null}
                            </AvInput>
                          </div>
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

              {padItemList && padItemList.length > 0 ? (
                <Table responsive aria-describedby="pad-item-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idPedido')}>
                        <Translate contentKey="generadorApp.padItem.idPedido">Id Pedido</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataInicio')}>
                        <Translate contentKey="generadorApp.padItem.dataInicio">Data Inicio</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataFim')}>
                        <Translate contentKey="generadorApp.padItem.dataFim">Data Fim</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('qtdSessoes')}>
                        <Translate contentKey="generadorApp.padItem.qtdSessoes">Qtd Sessoes</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('observacao')}>
                        <Translate contentKey="generadorApp.padItem.observacao">Observacao</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('sub')}>
                        <Translate contentKey="generadorApp.padItem.sub">Sub</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.padItem.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataPadItemIncompleto')}>
                        <Translate contentKey="generadorApp.padItem.dataPadItemIncompleto">Data Pad Item Incompleto</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataPadItemCompleto')}>
                        <Translate contentKey="generadorApp.padItem.dataPadItemCompleto">Data Pad Item Completo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('numGhc')}>
                        <Translate contentKey="generadorApp.padItem.numGhc">Num Ghc</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cidXPtaNovo')}>
                        <Translate contentKey="generadorApp.padItem.cidXPtaNovo">Cid X Pta Novo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('categoriaId')}>
                        <Translate contentKey="generadorApp.padItem.categoriaId">Categoria Id</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('score')}>
                        <Translate contentKey="generadorApp.padItem.score">Score</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.padItem.idPad">Id Pad</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.padItem.idEspecialidade">Id Especialidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.padItem.idPeriodicidade">Id Periodicidade</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.padItem.idPeriodo">Id Periodo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {padItemList.map((padItem, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${padItem.id}`} color="link" size="sm">
                            {padItem.id}
                          </Button>
                        </td>

                        <td>{padItem.idPedido}</td>

                        <td>
                          <TextFormat type="date" value={padItem.dataInicio} format={APP_LOCAL_DATE_FORMAT} />
                        </td>

                        <td>
                          <TextFormat type="date" value={padItem.dataFim} format={APP_LOCAL_DATE_FORMAT} />
                        </td>

                        <td>{padItem.qtdSessoes}</td>

                        <td>{padItem.observacao}</td>

                        <td>{padItem.sub}</td>

                        <td>{padItem.ativo}</td>

                        <td>
                          <TextFormat type="date" value={padItem.dataPadItemIncompleto} format={APP_DATE_FORMAT} />
                        </td>

                        <td>
                          <TextFormat type="date" value={padItem.dataPadItemCompleto} format={APP_DATE_FORMAT} />
                        </td>

                        <td>{padItem.numGhc}</td>

                        <td>{padItem.cidXPtaNovo}</td>

                        <td>{padItem.categoriaId}</td>

                        <td>{padItem.score}</td>
                        <td>{padItem.idPad ? <Link to={`pad/${padItem.idPad.id}`}>{padItem.idPad.id}</Link> : ''}</td>
                        <td>
                          {padItem.idEspecialidade ? (
                            <Link to={`especialidade/${padItem.idEspecialidade.id}`}>{padItem.idEspecialidade.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>
                        <td>
                          {padItem.idPeriodicidade ? (
                            <Link to={`periodicidade/${padItem.idPeriodicidade.id}`}>{padItem.idPeriodicidade.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>
                        <td>{padItem.idPeriodo ? <Link to={`periodo/${padItem.idPeriodo.id}`}>{padItem.idPeriodo.id}</Link> : ''}</td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${padItem.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${padItem.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${padItem.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.padItem.home.notFound">No Pad Items found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={padItemList && padItemList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ padItem, ...storeState }: IRootState) => ({
  pads: storeState.pad.entities,
  especialidades: storeState.especialidade.entities,
  periodicidades: storeState.periodicidade.entities,
  periodos: storeState.periodo.entities,
  padItemList: padItem.entities,
  totalItems: padItem.totalItems
});

const mapDispatchToProps = {
  getPads,
  getEspecialidades,
  getPeriodicidades,
  getPeriodos,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadItem);
