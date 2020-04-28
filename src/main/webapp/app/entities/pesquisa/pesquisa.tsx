import React from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {
  Button, Row, Table, UncontrolledTooltip, Badge, UncontrolledDropdown, Progress,
  DropdownToggle, DropdownMenu, DropdownItem, Tag
} from 'reactstrap';
import {
  TextFormat,
  getSortState,
  IPaginationBaseState,
  JhiPagination,
  JhiItemCount
} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './pesquisa.scss';
import {IRootState} from 'app/shared/reducers';
import {getEntities, getPesquisaCSV, getPesquisaProcessoCSV, insertObservacaoPesquisa} from './pesquisa.reducer';
import {
  APP_LOCAL_DATETIME_FORMAT,
} from 'app/config/constants';
import {ITEMS_PER_PAGE} from 'app/shared/util/pagination.constants';
import {Panel, PanelBody, PanelFooter, PanelHeader} from "app/shared/layout/panel/panel";
import ModalEditarPesquisa from './pesquisa-update-dados';
import moment from "moment";

export interface IPesquisaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

export type IPesquisaState = IPaginationBaseState;

export class Pesquisa extends React.Component<IPesquisaProps, IPesquisaState> {
  timerId = null;
  constructor(props) {
    super(props);
    this.getEntitiesAvanco = this.getEntitiesAvanco.bind(this);
    this.timerId = 0;
  }

  state: IPesquisaState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE),
    sort: 'id',
    order: 'desc',
  };

  componentDidMount() {
    this.getEntities();
    const that = this;
    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => that.getEntitiesAvanco(that), 60000);
  }

  componentWillUnmount() {
    clearTimeout(this.timerId);
  }

  getEntitiesAvanco(that) {
    that.getEntities();
    that.timerId = setTimeout(() => that.getEntitiesAvanco(that), 60000);
  }

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
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({activePage}, () => this.sortEntities());

  getEntities = () => {
    const {activePage, itemsPerPage, sort, order} = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  getPesquisaCSV = (pesquisaId) => {
    this.props.getPesquisaCSV(pesquisaId);
  };
  getPesquisaProcessoCSV = (pesquisaId) => {
    this.props.getPesquisaProcessoCSV(pesquisaId);
  };d

  situacaoColor = (situacao) => {
    switch (situacao) {
      case "SUCESSO":
        return "green";
      case "ERRO":
        return "danger";
      case "COLETANDO":
        return "info";
      default:
        return "indigo";
    }
  };
  insertObservacaoPesquisa = (event, errors, values, id) => {
    const {activePage, itemsPerPage, sort, order} = this.state;
    this.props.insertObservacaoPesquisa(
      id,
      values.nome,
      values.observacao,
      [activePage - 1, itemsPerPage, sort + "," + order]
    );
  };

  restDuration = (inicialDate, finalDate) => {
    const initialDate = new Date(inicialDate);
    const offsetinitialDate = initialDate.getTimezoneOffset() * 60 * 1000;
    const withOffsetinitialDate = initialDate.getTime();
    const withoutOffsetinitialDate = withOffsetinitialDate - offsetinitialDate;

    const finalityDate = new Date(finalDate);
    const offsetinfinalityDate = finalityDate.getTimezoneOffset() * 60 * 1000;
    const withOffsetfinalityDate = finalityDate.getTime();
    const withoutOffsetifinalityDate = withOffsetfinalityDate - offsetinfinalityDate;


    const startDate = moment(withoutOffsetinitialDate);
    const timeEnd = moment(withoutOffsetifinalityDate);
    const diff = timeEnd.diff(startDate);
    const diffDuration = moment.duration(diff);
    let duration = '';
    duration = diffDuration.days() > 0 ? diffDuration.days() + ' d ' : '';
    duration += diffDuration.hours() > 0 ? diffDuration.hours() + ' h ' : '';
    duration += diffDuration.minutes() > 0 ? diffDuration.minutes() + ' m ' : '';
    duration += diffDuration.seconds() > 0 ? diffDuration.seconds() + ' s ' : '';

    return duration;
  };

  situacaoIcon = (situacao) => {
    switch (situacao) {
      case "SUCESSO":
        return "fa fa-check";
      case "ERRO":
        return "fa fa-exclamation-triangle";
      case "COLETANDO":
        return "fas fa-spinner fa-pulse";
      default:
        return "indigo";
    }
  };

  render() {
    const {pesquisaList, match, totalItems} = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
          <li className="breadcrumb-item active">Pesquisas</li>
        </ol>
        <h1 className="page-header">Listagem de pesquisas <small></small></h1>
        <Panel>
          <PanelHeader>
            <span>Pesquisas</span>
            <Link to={`/configuracoes`} className="btn-sm btn btn-success float-right jh-create-entity">
              <FontAwesomeIcon icon="search"/> Nova pesquisa
            </Link>
          </PanelHeader>
          <PanelBody>
            {pesquisaList && pesquisaList.length > 0 ? (
              <Table className={"table-striped"} responsive aria-describedby="pesquisa-heading">
                <thead>
                <tr>
                  <th className="hand align-middle" onClick={this.sort('id')} style={{width: '5%'}}>
                    No. <FontAwesomeIcon icon="sort"/>
                  </th>
                  <th className="hand align-middle" onClick={this.sort('nome')} style={{width: '20%'}}>
                    Nome da pequisa <FontAwesomeIcon icon="sort"/>
                  </th>
                  <th className="hand align-middle" style={{width: '10%'}}>
                    Comarca-UF
                  </th>
                  <th className="hand align-middle" style={{width: '10%'}}>
                    Usuário
                  </th>
                  <th className="hand align-middle" onClick={this.sort('' +
                    'situacao')} style={{width: '12%'}}>
                    Situação <FontAwesomeIcon icon="sort"/>
                  </th>
                  <th className="hand align-middle" style={{width: '22%'}}>
                    Observações
                  </th>
                  <th style={{width: '21%'}} className="align-middle text-center">Ações</th>
                </tr>
                </thead>
                <tbody>
                {pesquisaList.map((pesquisa, i) => (
                  <tr key={`entity-${i}`}>
                    <td className={"align-middle"} id={"pesquisaId" + pesquisa.id}>
                      <strong>{pesquisa.id}</strong>
                      <UncontrolledTooltip placement="right" target={"pesquisaId" + pesquisa.id}>
                        <b>Detalhes</b>
                        <div className="text-left">
                          <b>Comarca: </b>
                          { pesquisa.comarcaTjId === null ? ('Todas'): pesquisa.comarcaNome }
                        </div>
                        <div className="text-left">
                          <b>Iniciado: </b>
                          <TextFormat type="date" value={pesquisa.dataCriacao} format={APP_LOCAL_DATETIME_FORMAT}/>
                        </div>
                        {pesquisa.dataFinalizacao !== null ?
                          (
                            <div className="text-left">
                              <b>Finalizado: </b>
                              <TextFormat type="date" value={pesquisa.dataFinalizacao}
                                          format={APP_LOCAL_DATETIME_FORMAT}/>
                            </div>
                          ) : null
                        }
                        {pesquisa.dataFinalizacao !== null ?
                          <div className="text-left">
                            <b>Duração: </b>
                            {this.restDuration(pesquisa.dataCriacao, pesquisa.dataFinalizacao)}
                          </div>
                          :
                          ('')}

                        {pesquisa.classesIncluir ?
                          (<div className="text-left">
                            <b>Classes a incluir: </b>
                            {JSON.parse(pesquisa.classesIncluir).map((classe, j, classesArray) => {
                              if (j !== classesArray.length - 1) {
                                return classe + ', ';
                              }
                              return classe;
                            })}
                          </div>)
                          : null}
                        {pesquisa.incluirMovimentacoes ?
                          (<div className="text-left">
                            <b>Movimentações selecionadas: </b>
                            <div>
                               {JSON.parse(pesquisa.incluirMovimentacoes).map((movimentacaoGrupo, j, movimentacoesArray) => {
                                 let grupo = "Grupo " + (j + 1) + ": ";
                                 return grupo + JSON.stringify(movimentacaoGrupo);
                               })}
                            </div>

                          </div>)
                          : null}
                        {pesquisa.descartarMovimentacoes ?
                          (<div className="text-left">
                            <b>Movimentações descartadas: </b>
                            {JSON.parse(pesquisa.descartarMovimentacoes).map((movimentacaoDescartar, j, movimentacaoDescartarArray) => {
                              if (j !== movimentacaoDescartarArray.length - 1) {
                                return movimentacaoDescartar + ', ';
                              }
                              return movimentacaoDescartar;
                            })}
                          </div>)
                          : null}
                        {pesquisa.anoInicial || pesquisa.anoFinal ?
                          (
                            <div className="text-left">
                              <b>Período de busca: </b>
                              {pesquisa.anoInicial} - {pesquisa.anoFinal}
                            </div>
                          ) : null}
                        <div className="text-left">
                          <b>CNPJ Analisados/Totais: </b>
                          {pesquisa.csvVerificados + '/' + pesquisa.csvTotal}
                        </div>
                        <div className="text-left" hidden={pesquisa.estadoSigla !== "SP"}>
                          <b>Comarca por comarca: </b>
                          {pesquisa.comarcaPorComarca === true ? " Sim" : " Não"}
                        </div>
                      </UncontrolledTooltip>
                    </td>
                    <td className={"align-middle"}>
                      <Badge color="dark">
                        {pesquisa.quantidadeResultados}
                      </Badge>&nbsp;
                      <span className={"text-left align-middle"}>
                        {pesquisa.nome}
                      </span>
                    </td>
                    <td className={"align-middle"}>
                      {pesquisa.comarcaNome === null ? 'Todas' : pesquisa.comarcaNome}{'-' + pesquisa.estadoSigla}
                    </td>
                    <td className={"align-middle"}>{pesquisa.userLogin}</td>
                    <td className={"align-middle font-weight-bold text-" + this.situacaoColor(pesquisa.situacao)}>
                      {pesquisa.situacao === 'COLETANDO' ?
                        <div style={{textAlign: "center"}}>
                         <Progress animated color="success" value={pesquisa.csvVerificados} max={pesquisa.csvTotal}/>
                            <small className="text-black progressBar-process">
                              {pesquisa.csvVerificados + '/' + pesquisa.csvTotal}
                            </small>
                        </div>
                        :
                        <span>
                          <i className={this.situacaoIcon(pesquisa.situacao)}>&nbsp;</i>
                          {pesquisa.situacao}
                        </span>
                        }
                    </td>
                    <td className={"align-middle"}>{pesquisa.observacoes}</td>
                    <td className="align-middle text-center">
                      <div className="btn-group flex-btn-group-container">
                        <Button id={"btn-csv-processos-" + pesquisa.id} tag={Link}
                                to={`processo/${pesquisa.estadoSigla}/pesquisa/${pesquisa.id}`}
                                className="btn btn-sm btn-success">
                          <span>
                             <i className="fa fa-list" aria-hidden={"true"}></i>
                          </span>
                          <UncontrolledTooltip placement="top" target={"btn-csv-processos-" + pesquisa.id}>
                            Visualizar processos
                          </UncontrolledTooltip>
                        </Button>
                        &nbsp;
                        <Button id={"btn-reutilizar-" + pesquisa.id} tag={Link}
                                to={'configuracoes?' + (pesquisa.anoInicial ? `anoInicial=${pesquisa.anoInicial}&` : '&')
                                + (pesquisa.anoFinal ? `anoFinal=${pesquisa.anoFinal}&` : '&')
                                + (pesquisa.estadoId ? `estado=${pesquisa.estadoId}&` : '&')
                                + (pesquisa.comarcaTjId ? `comarcaTjId=${pesquisa.comarcaTjId}&` : 'comarcaTjId=-1&')
                                + (pesquisa.classesIncluir ? `classesIncluir=${pesquisa.classesIncluir}&` : '&')
                                + (pesquisa.incluirMovimentacoes ? `incluirMovimentacoes=${pesquisa.incluirMovimentacoes}&` : '&')
                                + (pesquisa.descartarMovimentacoes ? `descartarMovimentacoes=${pesquisa.descartarMovimentacoes}&` : '&')
                                + (pesquisa.incluirMovimentacoesAll ? `incluirMovimentacoesAll=${pesquisa.incluirMovimentacoesAll}&` : '&')
                                + (pesquisa.comarcaPorComarca ? `comarcaPorComarca=${pesquisa.comarcaPorComarca}&` : '&')
                                }
                                className="btn btn-sm btn-dark">
                          <span>
                             <i className="fa fa-history" aria-hidden={"true"}></i>
                          </span>
                          <UncontrolledTooltip placement="top" target={"btn-reutilizar-" + pesquisa.id}>
                            Reutilizar pesquisa
                          </UncontrolledTooltip>
                        </Button>
                        &nbsp;
                        <ModalEditarPesquisa
                          insertObservacaoPesquisa={(event, errors, values) => this.insertObservacaoPesquisa(event, errors, values, pesquisa.id)}
                          nomePesquisa={pesquisa.nome}
                          observacaoPesquisa={pesquisa.observacoes}/>
                        &nbsp;
                        <UncontrolledDropdown size="sm" className="d-inline-block">
                          <DropdownToggle caret>
                            Mais
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem onClick={() => this.getPesquisaProcessoCSV(pesquisa.id)}>
                              <FontAwesomeIcon icon="download"/>&nbsp;CSV processos
                            </DropdownItem>
                            <DropdownItem onClick={() => this.getPesquisaCSV(pesquisa.id)}>
                              <FontAwesomeIcon icon="download"/>&nbsp;CSV consulta
                            </DropdownItem>
                            <DropdownItem tag={Link} to={`${match.url}/${pesquisa.id}/delete/${this.props.history.location.search}`}>
                              <FontAwesomeIcon icon="trash"/>&nbsp;Excluir
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                    </td>
                  </tr>
                ))}
                </tbody>
              </Table>
            ) : (
              <div className="alert alert-warning">Nenhuma pesquisa foi realizada</div>
            )}
          </PanelBody>
          <PanelFooter>
            <div className={pesquisaList && pesquisaList.length > 0 ? '' : 'd-none'}>
              <Row className="justify-content-center">
                <JhiItemCount
                  page={this.state.activePage}
                  total={totalItems}
                  itemsPerPage={this.state.itemsPerPage}
                  i18nEnabled/>
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

const mapStateToProps = ({pesquisa}: IRootState) => ({
  pesquisaList: pesquisa.entities,
  totalItems: pesquisa.totalItems,
  csvError: pesquisa.csvError
});

const mapDispatchToProps = {
  getEntities, getPesquisaCSV, getPesquisaProcessoCSV, insertObservacaoPesquisa
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pesquisa);
