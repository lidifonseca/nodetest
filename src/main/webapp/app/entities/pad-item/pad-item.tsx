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
import { getPadItemState, IPadItemBaseState, getEntities } from './pad-item.reducer';
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

export interface IPadItemState extends IPadItemBaseState, IPaginationBaseState {}

export class PadItem extends React.Component<IPadItemProps, IPadItemState> {
  private myFormRef: any;

  constructor(props: IPadItemProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getPadItemState(this.props.location)
    };
  }

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
        atendimento: '',
        atendimentoCepRecusado: '',
        atendimentoSorteioFeito: '',
        padItemAtividade: '',
        padItemCepRecusado: '',
        padItemResultado: '',
        padItemSorteioFeito: '',
        pad: '',
        especialidade: '',
        periodicidade: '',
        periodo: ''
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
      'pad=' +
      this.state.pad +
      '&' +
      'especialidade=' +
      this.state.especialidade +
      '&' +
      'periodicidade=' +
      this.state.periodicidade +
      '&' +
      'periodo=' +
      this.state.periodo +
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
      atendimento,
      atendimentoCepRecusado,
      atendimentoSorteioFeito,
      padItemAtividade,
      padItemCepRecusado,
      padItemResultado,
      padItemSorteioFeito,
      pad,
      especialidade,
      periodicidade,
      periodo,
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
      atendimento,
      atendimentoCepRecusado,
      atendimentoSorteioFeito,
      padItemAtividade,
      padItemCepRecusado,
      padItemResultado,
      padItemSorteioFeito,
      pad,
      especialidade,
      periodicidade,
      periodo,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { pads, especialidades, periodicidades, periodos, padItemList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Pad Items</span>
          <Button id="togglerFilterPadItem" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.padItem.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.padItem.home.createLabel">Create a new Pad Item</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Items</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPadItem">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idPedido' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idPedidoLabel" for="pad-item-idPedido">
                              <Translate contentKey="generadorApp.padItem.idPedido">Id Pedido</Translate>
                            </Label>

                            <AvInput type="text" name="idPedido" id="pad-item-idPedido" value={this.state.idPedido} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dataInicio' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="dataInicioLabel" for="pad-item-dataInicio">
                              <Translate contentKey="generadorApp.padItem.dataInicio">Data Inicio</Translate>
                            </Label>
                            <AvInput type="date" name="dataInicio" id="pad-item-dataInicio" value={this.state.dataInicio} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dataFim' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="dataFimLabel" for="pad-item-dataFim">
                              <Translate contentKey="generadorApp.padItem.dataFim">Data Fim</Translate>
                            </Label>
                            <AvInput type="date" name="dataFim" id="pad-item-dataFim" value={this.state.dataFim} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'qtdSessoes' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="qtdSessoesLabel" for="pad-item-qtdSessoes">
                              <Translate contentKey="generadorApp.padItem.qtdSessoes">Qtd Sessoes</Translate>
                            </Label>
                            <AvInput type="string" name="qtdSessoes" id="pad-item-qtdSessoes" value={this.state.qtdSessoes} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'observacao' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="observacaoLabel" for="pad-item-observacao">
                              <Translate contentKey="generadorApp.padItem.observacao">Observacao</Translate>
                            </Label>
                            <AvInput id="pad-item-observacao" type="textarea" name="observacao" />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'sub' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="subLabel" for="pad-item-sub">
                              <Translate contentKey="generadorApp.padItem.sub">Sub</Translate>
                            </Label>
                            <AvInput type="string" name="sub" id="pad-item-sub" value={this.state.sub} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ativo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ativoLabel" for="pad-item-ativo">
                              <Translate contentKey="generadorApp.padItem.ativo">Ativo</Translate>
                            </Label>
                            <AvInput type="string" name="ativo" id="pad-item-ativo" value={this.state.ativo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'dataPadItemIncompleto' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'dataPadItemCompleto' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
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
                      ) : null}

                      {this.state.baseFilters !== 'numGhc' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="numGhcLabel" for="pad-item-numGhc">
                              <Translate contentKey="generadorApp.padItem.numGhc">Num Ghc</Translate>
                            </Label>

                            <AvInput type="text" name="numGhc" id="pad-item-numGhc" value={this.state.numGhc} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'atendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'atendimentoCepRecusado' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'atendimentoSorteioFeito' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'padItemAtividade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'padItemCepRecusado' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'padItemResultado' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'padItemSorteioFeito' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1"></Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'pad' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="pad-item-pad">
                                <Translate contentKey="generadorApp.padItem.pad">Pad</Translate>
                              </Label>
                              <Select
                                id="pad-item-pad"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  pads
                                    ? pads.map(p => (this.state.pad.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null))
                                    : null
                                }
                                options={pads ? pads.map(option => ({ value: option.id, label: option.id })) : null}
                                onChange={options => this.setState({ pad: options.map(option => option['value']).join(',') })}
                                name={'pad'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'especialidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="pad-item-especialidade">
                                <Translate contentKey="generadorApp.padItem.especialidade">Especialidade</Translate>
                              </Label>
                              <Select
                                id="pad-item-especialidade"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  especialidades
                                    ? especialidades.map(p =>
                                        this.state.especialidade.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null
                                      )
                                    : null
                                }
                                options={especialidades ? especialidades.map(option => ({ value: option.id, label: option.id })) : null}
                                onChange={options => this.setState({ especialidade: options.map(option => option['value']).join(',') })}
                                name={'especialidade'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'periodicidade' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="pad-item-periodicidade">
                                <Translate contentKey="generadorApp.padItem.periodicidade">Periodicidade</Translate>
                              </Label>
                              <Select
                                id="pad-item-periodicidade"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  periodicidades
                                    ? periodicidades.map(p =>
                                        this.state.periodicidade.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null
                                      )
                                    : null
                                }
                                options={periodicidades ? periodicidades.map(option => ({ value: option.id, label: option.id })) : null}
                                onChange={options => this.setState({ periodicidade: options.map(option => option['value']).join(',') })}
                                name={'periodicidade'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'periodo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="pad-item-periodo">
                                <Translate contentKey="generadorApp.padItem.periodo">Periodo</Translate>
                              </Label>
                              <Select
                                id="pad-item-periodo"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  periodos
                                    ? periodos.map(p =>
                                        this.state.periodo.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null
                                      )
                                    : null
                                }
                                options={periodos ? periodos.map(option => ({ value: option.id, label: option.id })) : null}
                                onChange={options => this.setState({ periodo: options.map(option => option['value']).join(',') })}
                                name={'periodo'}
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
                        <Translate contentKey="generadorApp.padItem.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.padItem.home.btn_filter_clean">Clean</Translate>
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
                      {this.state.baseFilters !== 'idPedido' ? (
                        <th className="hand" onClick={this.sort('idPedido')}>
                          <Translate contentKey="generadorApp.padItem.idPedido">Id Pedido</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'dataInicio' ? (
                        <th className="hand" onClick={this.sort('dataInicio')}>
                          <Translate contentKey="generadorApp.padItem.dataInicio">Data Inicio</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'dataFim' ? (
                        <th className="hand" onClick={this.sort('dataFim')}>
                          <Translate contentKey="generadorApp.padItem.dataFim">Data Fim</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'qtdSessoes' ? (
                        <th className="hand" onClick={this.sort('qtdSessoes')}>
                          <Translate contentKey="generadorApp.padItem.qtdSessoes">Qtd Sessoes</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'observacao' ? (
                        <th className="hand" onClick={this.sort('observacao')}>
                          <Translate contentKey="generadorApp.padItem.observacao">Observacao</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'sub' ? (
                        <th className="hand" onClick={this.sort('sub')}>
                          <Translate contentKey="generadorApp.padItem.sub">Sub</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ativo' ? (
                        <th className="hand" onClick={this.sort('ativo')}>
                          <Translate contentKey="generadorApp.padItem.ativo">Ativo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'dataPadItemIncompleto' ? (
                        <th className="hand" onClick={this.sort('dataPadItemIncompleto')}>
                          <Translate contentKey="generadorApp.padItem.dataPadItemIncompleto">Data Pad Item Incompleto</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'dataPadItemCompleto' ? (
                        <th className="hand" onClick={this.sort('dataPadItemCompleto')}>
                          <Translate contentKey="generadorApp.padItem.dataPadItemCompleto">Data Pad Item Completo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'numGhc' ? (
                        <th className="hand" onClick={this.sort('numGhc')}>
                          <Translate contentKey="generadorApp.padItem.numGhc">Num Ghc</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'pad' ? (
                        <th>
                          <Translate contentKey="generadorApp.padItem.pad">Pad</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'especialidade' ? (
                        <th>
                          <Translate contentKey="generadorApp.padItem.especialidade">Especialidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'periodicidade' ? (
                        <th>
                          <Translate contentKey="generadorApp.padItem.periodicidade">Periodicidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'periodo' ? (
                        <th>
                          <Translate contentKey="generadorApp.padItem.periodo">Periodo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

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

                        {this.state.baseFilters !== 'idPedido' ? <td>{padItem.idPedido}</td> : null}

                        {this.state.baseFilters !== 'dataInicio' ? (
                          <td>
                            <TextFormat type="date" value={padItem.dataInicio} format={APP_LOCAL_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'dataFim' ? (
                          <td>
                            <TextFormat type="date" value={padItem.dataFim} format={APP_LOCAL_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'qtdSessoes' ? <td>{padItem.qtdSessoes}</td> : null}

                        {this.state.baseFilters !== 'observacao' ? (
                          <td>{padItem.observacao ? Buffer.from(padItem.observacao).toString() : null}</td>
                        ) : null}

                        {this.state.baseFilters !== 'sub' ? <td>{padItem.sub}</td> : null}

                        {this.state.baseFilters !== 'ativo' ? <td>{padItem.ativo}</td> : null}

                        {this.state.baseFilters !== 'dataPadItemIncompleto' ? (
                          <td>
                            <TextFormat type="date" value={padItem.dataPadItemIncompleto} format={APP_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'dataPadItemCompleto' ? (
                          <td>
                            <TextFormat type="date" value={padItem.dataPadItemCompleto} format={APP_DATE_FORMAT} />
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'numGhc' ? <td>{padItem.numGhc}</td> : null}

                        {this.state.baseFilters !== 'pad' ? (
                          <td>{padItem.pad ? <Link to={`pad/${padItem.pad.id}`}>{padItem.pad.id}</Link> : ''}</td>
                        ) : null}

                        {this.state.baseFilters !== 'especialidade' ? (
                          <td>
                            {padItem.especialidade ? (
                              <Link to={`especialidade/${padItem.especialidade.id}`}>{padItem.especialidade.id}</Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'periodicidade' ? (
                          <td>
                            {padItem.periodicidade ? (
                              <Link to={`periodicidade/${padItem.periodicidade.id}`}>{padItem.periodicidade.id}</Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        {this.state.baseFilters !== 'periodo' ? (
                          <td>{padItem.periodo ? <Link to={`periodo/${padItem.periodo.id}`}>{padItem.periodo.id}</Link> : ''}</td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${padItem.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${padItem.id}/edit?${this.getFiltersURL()}`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${padItem.id}/delete?${this.getFiltersURL()}`} color="danger" size="sm">
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
